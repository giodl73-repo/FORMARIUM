"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const continuations = require("../volumes/01-structure-quantity-choice/proof-set-composition-continuations.js");
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
const resultId = "f".repeat(64);
const [f1, f2] = relations;
const f6 = relations[5];

function request(overrides = {}) {
  return { problem: "Review one result and choose an explicit next request edit.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
    seeds: [f1.source], relations: [f1.id], exclusions: [], ...overrides };
}

function build(requestValue) {
  const result = lab.runComposition(requestValue, labPayload);
  return continuations.buildContinuations(result, labPayload, readingPayload, resultId);
}

const basic = build(request());
assert.equal(basic.schema, "factorium-composition-continuations-v0");
assert.deepEqual(basic.counts, { total: 0, available: 0, unavailable: 0 });

const frontier = build(request({ seeds: [f2.source, f6.source], relations: [f2.id, f6.id],
  budget: { depth: 1, edges: 1, nodes: 4, work: 13 } }));
assert.equal(frontier.actions.length, 1);
assert.deepEqual(frontier.actions[0].target, { control: "edges", before: 1, after: 2 });
assert.equal(frontier.actions[0].available, true);

const work = build(request({ budget: { depth: 1, edges: 1, nodes: 6, work: 8 } }));
assert.deepEqual(work.actions[0].target, { control: "work", before: 8, after: 9 });
assert.equal(work.actions[0].sourceReason, "atomic-relation-needs-6-work-slots");

const node = build(request({ seeds: [f1.source, f2.source], relations: [f1.id],
  budget: { depth: 1, edges: 1, nodes: 3, work: 16 } }));
assert.deepEqual(node.actions[0].target, { control: "nodes", before: 3, after: 4 });
assert.equal(node.actions[0].sourceReason, "atomic-relation-needs-2-node-slots");

const unreachable = build(request({ relations: [f2.id] }));
assert.equal(unreachable.actions[0].kind, "add-seed");
assert.equal(unreachable.actions[0].target.artifact, f2.source);
assert.match(unreachable.actions[0].label, /^Add /);

const conflict = build(request({ exclusions: [f1.target],
  budget: { depth: 1, edges: 1, nodes: 6, work: 10 } }));
assert.equal(conflict.actions[0].kind, "remove-exclusion");
assert.equal(conflict.actions[0].target.artifact, f1.target);

const reorderedRequest = request({ seeds: [f6.source, f2.source], relations: [f6.id, f2.id],
  budget: { depth: 1, edges: 1, nodes: 4, work: 13 } });
assert.equal(lab.canonicalize(build(reorderedRequest)), lab.canonicalize(frontier),
  "set order does not change continuation bytes");
const drifted = structuredClone(readingPayload);
drifted.relationsSha256 = "a".repeat(64);
const result = lab.runComposition(request(), labPayload);
assert.throws(() => continuations.buildContinuations(result, labPayload, drifted, resultId),
  /identity mismatch/);

const foreignBoundary = structuredClone(result);
foreignBoundary.graph.frontiers.push({ relation: "relation:foreign", artifact: f1.target,
  reason: "edge-budget-before-relation:foreign" });
assert.throws(() => continuations.buildContinuations(foreignBoundary, labPayload, readingPayload, resultId),
  /Unselected relation boundary/);
const driftedEdge = lab.runComposition(request(), labPayload);
driftedEdge.graph.edges[0].target = f2.target;
assert.throws(() => continuations.buildContinuations(driftedEdge, labPayload, readingPayload, resultId),
  /Admitted edge drift/);
const driftedConflict = lab.runComposition(request({ exclusions: [f1.target],
  budget: { depth: 1, edges: 1, nodes: 6, work: 10 } }), labPayload);
driftedConflict.graph.conflicts[0].reason = "invented-conflict";
assert.throws(() => continuations.buildContinuations(driftedConflict, labPayload, readingPayload, resultId),
  /Unknown exclusion conflict reason/);

console.log("OK basic=none frontier=edges work=9 nodes=4 unreachable=seed conflict=remove order=invariant drift=rejected");
