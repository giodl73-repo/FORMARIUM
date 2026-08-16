"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const reconciliation = require("../volumes/01-structure-quantity-choice/proof-set-composition-reconciliation.js");
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
const resultId = "c".repeat(64);
const f1 = relations[0];
const f2 = relations[1];
const f4 = relations[3];
const f6 = relations[5];

function request(overrides = {}) {
  return { problem: "Review an explicit relation and reconcile its bounded result.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
    seeds: [f1.source], relations: [f1.id], exclusions: [], ...overrides };
}

function build(requestValue) {
  return reconciliation.buildReconciliation(lab.runComposition(requestValue, labPayload),
    labPayload, readingPayload, resultId);
}

const basicResult = lab.runComposition(request(), labPayload);
const basic = reconciliation.buildReconciliation(basicResult, labPayload, readingPayload, resultId);
assert.equal(basic.schema, "factorium-composition-reconciliation-v0");
assert.equal(basic.state, "incomplete");
assert.equal(basic.relations[0].decision, "admitted");
assert.equal(basic.relations[0].check.outcome, "unresolved");
assert.deepEqual(basic.budgets.map((budget) => [budget.name, budget.used, budget.cap, budget.status]),
  [["depth", 1, 1, "reached"], ["edges", 1, 1, "reached"],
    ["nodes", 3, 6, "remaining"], ["work", 9, 9, "reached"]]);
assert.equal(basic.boundary.includes("Unselected routes were not considered"), true);

const conflict = build(request({ exclusions: [f1.target],
  budget: { depth: 1, edges: 1, nodes: 6, work: 10 } }));
assert.equal(conflict.state, "contradictory");
assert.equal(conflict.relations[0].decision, "admitted");
assert.equal(conflict.exclusions[0].decision, "conflict");

const frontier = build(request({ seeds: [f2.source, f6.source], relations: [f2.id, f6.id],
  budget: { depth: 1, edges: 1, nodes: 4, work: 13 } }));
assert.equal(frontier.state, "truncated");
assert.deepEqual(frontier.relations.map((item) => [item.id, item.decision]),
  [[f2.id, "admitted"], [f6.id, "stopped"]]);
assert.match(frontier.relations[1].rawReason, /^edge-budget-before-/);

const capacity = build(request({ budget: { depth: 1, edges: 1, nodes: 6, work: 8 } }));
assert.equal(capacity.relations[0].decision, "capacity-limited");
assert.equal(capacity.relations[0].rawReason, "atomic-relation-needs-6-work-slots");

const unreachable = build(request({ relations: [f2.id] }));
assert.equal(unreachable.relations[0].decision, "predecessor-unreached");

const reverse = build(request({ direction: "reverse", seeds: [f4.target], relations: [f4.id] }));
assert.equal(reverse.relations[0].predecessor.artifact, f4.target);
assert.equal(reverse.relations[0].derived.artifact, f4.source);
assert.equal(reverse.relations[0].canonicalSource.artifact, f4.source);

const reordered = structuredClone(basicResult);
for (const key of ["nodes", "edges", "frontiers", "unresolvedRelations", "conflicts", "inactiveExclusions"])
  reordered.graph[key].reverse();
reordered.evaluation.reverse();
assert.equal(lab.canonicalize(reconciliation.buildReconciliation(reordered,
  labPayload, readingPayload, resultId)), lab.canonicalize(basic), "result order invariant");

const overlap = structuredClone(basicResult);
overlap.graph.frontiers.push({ artifact: f1.target, relation: f1.id,
  reason: `edge-budget-before-${f1.id}` });
assert.throws(() => reconciliation.buildReconciliation(overlap,
  labPayload, readingPayload, resultId), /exactly one result decision/);
const unselected = structuredClone(basicResult);
unselected.graph.frontiers.push({ artifact: f2.target, relation: f2.id,
  reason: `edge-budget-before-${f2.id}` });
assert.throws(() => reconciliation.buildReconciliation(unselected,
  labPayload, readingPayload, resultId), /unselected frontier/);
const rewritten = structuredClone(basicResult);
rewritten.graph.edges[0].target = f2.target;
assert.throws(() => reconciliation.buildReconciliation(rewritten,
  labPayload, readingPayload, resultId), /does not match its relation/);
const drifted = structuredClone(readingPayload);
drifted.referenceSha256 = "d".repeat(64);
assert.throws(() => reconciliation.buildReconciliation(basicResult,
  labPayload, drifted, resultId), /identity mismatch/);

console.log("OK basic=admitted conflict=1 frontier=1 capacity=1 unreachable=1 reverse=preserved partition=exact");
