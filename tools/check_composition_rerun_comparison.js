"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const continuations = require("../volumes/01-structure-quantity-choice/proof-set-composition-continuations.js");
const comparisons = require("../volumes/01-structure-quantity-choice/proof-set-composition-rerun-comparison.js");
const labAllowlist = require("./composition_lab_allowlist.js");

const root = path.resolve(__dirname, "..");
const referencePath = path.join(root, "reference", "factorium-reference-v0.factorium");
const relationsPath = path.join(root, "reference", "factorium-relations-v0.factorium");
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const relations = labAllowlist.relationLines(fs.readFileSync(relationsPath, "utf8"), root)
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
    return { id: fields[0], verb: fields[1], source: fields[2], target: fields[3],
      scope: fields[4], qualifiers: fields[5], scopeHref: fields[6] };
  });
const labPayload = { schema: "factorium-composition-lab-payload-v0",
  referenceSha256: sha256(referencePath), relationsSha256: sha256(relationsPath), relations };
const artifacts = [...new Set(relations.flatMap((relation) =>
  [relation.source, relation.target, relation.scope]))].sort();
const readingPayload = { schema: "factorium-composition-reading-payload-v0",
  referenceSha256: labPayload.referenceSha256, relationsSha256: labPayload.relationsSha256,
  bindings: artifacts.map((artifact) => ({ artifact, label: artifact.split(/[/:]/).pop(),
    pageTitle: `Page ${artifact}`, href: `entries/${artifact.replace(/[:/]/g, "-")}.html`,
    kind: artifact.startsWith("view:") ? "view" : "anchor" })) };
const [f1, f2] = relations;
const f6 = relations[5];
let identityIndex = 0;
const identified = (result) => ({ result, sha256: (++identityIndex).toString(16).padStart(64, "0") });

function request(overrides = {}) {
  return { problem: "Compare one explicit rerun without scoring the structural change.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
    seeds: [f1.source], relations: [f1.id], exclusions: [], ...overrides };
}

function run(requestValue) {
  return identified(lab.runComposition(requestValue, labPayload));
}

function parity(source) {
  const expected = continuations.buildContinuations(source.result, labPayload, readingPayload,
    source.sha256).actions;
  const actual = comparisons.buildSourceActions(source, labPayload, readingPayload);
  assert.equal(lab.canonicalize(actual), lab.canonicalize(expected),
    "comparison reconstructs exact continuation bytes");
  return actual;
}

const frontierRequest = request({ seeds: [f2.source, f6.source], relations: [f2.id, f6.id],
  budget: { depth: 1, edges: 1, nodes: 4, work: 13 } });
const frontierBefore = run(frontierRequest);
const frontierAction = parity(frontierBefore)[0];
const frontierAfter = run({ ...frontierRequest,
  budget: { ...frontierRequest.budget, edges: 2 } });
const frontier = comparisons.buildRerunComparison(frontierBefore, frontierAfter, [frontierAction],
  labPayload, readingPayload);
assert.equal(frontier.schema, "factorium-composition-rerun-comparison-v0");
assert.equal(frontier.actions[0].disposition, "present-in-executed-request");
assert.deepEqual(frontier.requestChanges[0], { control: "budget.edges", operation: "replace",
  before: 1, after: 2, source: "continuation-action", actionIds: [frontierAction.id] });
assert.equal(frontier.result.relations.changed[0].beforeDecision, "stopped");
assert.equal(frontier.result.relations.changed[0].afterDecision, "stopped");
assert.equal(frontier.result.relations.changed[0].beforeLabel, "stopped at edge budget");
assert.equal(frontier.result.relations.changed[0].afterLabel, "stopped at node budget");
assert.equal(frontier.result.metrics.before.frontiers, 1);
assert.equal(frontier.result.metrics.after.frontiers, 1);

const workRequest = request({ budget: { depth: 1, edges: 1, nodes: 6, work: 8 } });
const workBefore = run(workRequest);
const workAction = parity(workBefore)[0];
const workAfter = run({ ...workRequest, budget: { ...workRequest.budget, work: 9 } });
const work = comparisons.buildRerunComparison(workBefore, workAfter, [workAction],
  labPayload, readingPayload);
assert.equal(work.result.relations.changed[0].beforeDecision, "capacity-limited");
assert.equal(work.result.relations.changed[0].afterDecision, "admitted");
assert.equal(work.result.state.changed, false, "admission does not invent a complete state");

const nodeBefore = run(request({ seeds: [f1.source, f2.source], relations: [f1.id],
  budget: { depth: 1, edges: 1, nodes: 3, work: 16 } }));
parity(nodeBefore);
const unreachableRequest = request({ relations: [f2.id] });
const unreachableBefore = run(unreachableRequest);
const seedAction = parity(unreachableBefore)[0];
const unreachableAfter = run({ ...unreachableRequest, seeds: [f1.source, f2.source],
  budget: { depth: 1, edges: 1, nodes: 6, work: 12 } });
const seeded = comparisons.buildRerunComparison(unreachableBefore, unreachableAfter, [seedAction],
  labPayload, readingPayload);
assert.equal(seeded.actions[0].disposition, "present-in-executed-request");
assert.equal(seeded.requestChanges.find((change) => change.control === "seeds").artifact.artifact,
  f2.source);
assert.ok(seeded.requestChanges.some((change) => change.control === "budget.work" &&
  change.source === "additional-control-edit"));

const conflictRequest = request({ exclusions: [f1.target],
  budget: { depth: 1, edges: 1, nodes: 6, work: 10 } });
const conflictBefore = run(conflictRequest);
const conflictAction = parity(conflictBefore)[0];
const conflictAfter = run({ ...conflictRequest, exclusions: [] });
const conflict = comparisons.buildRerunComparison(conflictBefore, conflictAfter, [conflictAction],
  labPayload, readingPayload);
assert.equal(conflict.result.exclusions.changed[0].beforeDecision, "conflict");
assert.equal(conflict.result.exclusions.changed[0].afterDecision, "not-selected");
assert.deepEqual(conflict.result.state, { before: "contradictory", after: "incomplete", changed: true });

const inactiveBefore = run(request({ exclusions: [f2.target] }));
parity(inactiveBefore);

const supersededAfter = run({ ...frontierRequest,
  problem: `${frontierRequest.problem} Additional edit.`,
  budget: { ...frontierRequest.budget, edges: 3 } });
const superseded = comparisons.buildRerunComparison(frontierBefore, supersededAfter, [frontierAction],
  labPayload, readingPayload);
assert.equal(superseded.actions[0].disposition, "superseded-before-run");
assert.equal(superseded.counts.actionsSuperseded, 1);
assert.equal(superseded.counts.additionalControlEdits, 2);
assert.ok(superseded.requestChanges.every((change) => change.source === "additional-control-edit"));

const same = comparisons.buildRerunComparison(frontierBefore, frontierBefore, [frontierAction],
  labPayload, readingPayload);
assert.equal(same.actions[0].disposition, "superseded-before-run");
assert.equal(same.requestChanges.length, 0);

const reorderedBefore = structuredClone(frontierBefore);
for (const key of ["nodes", "edges", "frontiers", "unresolvedRelations", "conflicts", "inactiveExclusions"])
  reorderedBefore.result.graph[key].reverse();
reorderedBefore.result.evaluation.reverse();
reorderedBefore.result.projections.reverse();
const reordered = comparisons.buildRerunComparison(reorderedBefore, frontierAfter, [frontierAction],
  labPayload, readingPayload);
assert.equal(lab.canonicalize(reordered), lab.canonicalize(frontier), "result array order is invariant");

const drifted = structuredClone(frontierAfter);
drifted.result.graph.frontiers[0].reason = "invented-boundary";
assert.throws(() => comparisons.buildRerunComparison(frontierBefore, drifted, [frontierAction],
  labPayload, readingPayload), /Comparison frontier drift/);
assert.throws(() => comparisons.buildRerunComparison(frontierBefore, frontierAfter, [],
  labPayload, readingPayload), /requires an applied continuation action/);

console.log("OK parity=frontier,work,node,seed,conflict,inactive present=1 superseded=1 additional=2 order=invariant drift=rejected");
