"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const labAllowlist = require("./composition_lab_allowlist.js");

const root = path.resolve(__dirname, "..");
const referencePath = path.join(root, "reference", "factorium-reference-v0.factorium");
const relationsPath = path.join(root, "reference", "factorium-relations-v0.factorium");

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function relationPayload() {
  const relations = labAllowlist.relationLines(fs.readFileSync(relationsPath, "utf8"), root)
    .map((line) => {
      const fields = line.slice("relation ".length).split(" | ");
      assert.equal(fields.length, 7, "typed relation field count");
      return {
        id: fields[0],
        verb: fields[1],
        source: fields[2],
        target: fields[3],
        scope: fields[4],
        qualifiers: fields[5],
        scopeHref: fields[6]
      };
    });
  return {
    schema: "factorium-composition-lab-payload-v0",
    referenceSha256: sha256(referencePath),
    relationsSha256: sha256(relationsPath),
    relations
  };
}

const payload = relationPayload();
assert.equal(payload.relations.length, 6, "Lab allowlist remains six relations");
assert.equal(fs.readFileSync(relationsPath, "utf8").split(/\r?\n/)
  .filter((line) => line.startsWith("relation ")).length, 9,
"canonical sidecar contains three separately admitted cross-entry relations");
assert.ok(!payload.relations.some((relation) =>
  relation.id === "f27-causal-scope-qualifies-outcome"),
"F32 relation is not interactively exposed");
assert.ok(!payload.relations.some((relation) =>
  relation.id === "f27-evidence-qualifies-evaluation"),
"F29 relation is not interactively exposed");
assert.ok(!payload.relations.some((relation) =>
  relation.id === "f27-constraint-filters-feasibility"),
"F31 relation is not interactively exposed");
const f1 = payload.relations[0];
const f2 = payload.relations[1];

function request(overrides = {}) {
  return {
    problem: "Review one declared dependency and its required interaction.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward",
    budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
    seeds: [f1.source],
    relations: [f1.id],
    exclusions: [],
    ...overrides
  };
}

function identity(result) {
  return crypto.createHash("sha256").update(lab.canonicalize(result)).digest("hex");
}

const basic = lab.runComposition(request(), payload);
assert.equal(basic.state, "incomplete", "unresolved check prevents completion");
assert.equal(basic.graph.edges.length, 1, "F1 is admitted");
assert.equal(basic.graph.nodes.length, 3, "seed, target, and scope are retained");
assert.equal(basic.evaluation.length, 1, "relation scope creates one check");
assert.equal(basic.evaluation[0].outcome, "unresolved", "lab invents no check result");
assert.equal(basic.projections.length, 3, "all working nodes flatten");

const reorderedA = lab.runComposition(request({
  budget: { depth: 1, edges: 2, nodes: 8, work: 18 },
  seeds: [f2.source, f1.source],
  relations: [f2.id, f1.id]
}), payload);
const reorderedB = lab.runComposition(request({
  budget: { depth: 1, edges: 2, nodes: 8, work: 18 },
  seeds: [f1.source, f2.source],
  relations: [f1.id, f2.id]
}), payload);
assert.equal(lab.canonicalize(reorderedA), lab.canonicalize(reorderedB),
  "set order normalizes to identical result bytes");
assert.equal(identity(reorderedA), identity(reorderedB),
  "set order normalizes to identical identity");

const changedContext = lab.runComposition(request({
  contextSelections: "boundary=alternate-system,reference-frame=not-applicable"
}), payload);
assert.equal(lab.canonicalize(changedContext.graph), lab.canonicalize(basic.graph),
  "context does not silently change graph semantics");
assert.notEqual(identity(changedContext), identity(basic),
  "context change changes result identity");

const reverse = lab.runComposition(request({
  direction: "reverse",
  seeds: [f1.target]
}), payload);
assert.ok(reverse.graph.nodes.some((node) => node.artifact === f1.source),
  "reverse traversal derives the canonical source");
assert.notEqual(identity(reverse), identity(basic), "direction changes identity");

const truncated = lab.runComposition(request({
  seeds: [f1.source, f2.source],
  relations: [f1.id, f2.id],
  budget: { depth: 1, edges: 1, nodes: 8, work: 13 }
}), payload);
assert.equal(truncated.state, "truncated", "exact edge budget produces truncation");
assert.equal(truncated.graph.edges.length, 1, "one edge consumes the budget");
assert.equal(truncated.graph.frontiers.length, 1, "next eligible target remains visible");
assert.equal(truncated.graph.frontiers[0].relation, f2.id, "frontier names stopped relation");

const contradictory = lab.runComposition(request({
  exclusions: [f1.target], budget: { depth: 1, edges: 1, nodes: 6, work: 10 }
}), payload);
assert.equal(contradictory.state, "contradictory", "required exclusion conflicts");
assert.ok(contradictory.graph.nodes.some((node) => node.artifact === f1.target),
  "conflicted required node remains in graph");
assert.equal(
  contradictory.projections.find((projection) => projection.artifact === f1.target).disposition,
  "rejected",
  "projection records requested rejection"
);

const workBound = lab.runComposition(request({ budget: { depth: 1, edges: 1, nodes: 6, work: 8 } }), payload);
assert.equal(workBound.state, "incomplete", "atomic work shortage is not a reached-budget frontier");
assert.equal(workBound.graph.edges.length, 0, "work cap admits no partial relation");
assert.equal(workBound.graph.nodes.length, 1, "work cap retains only the seed node");
assert.equal(workBound.work, 3, "result stays within the declared work cap");
assert.match(workBound.graph.unresolvedRelations[0].reason, /^atomic-relation-needs-6-work-slots$/);
assert.throws(() => lab.runComposition(request({
  seeds: [f1.source, f2.source], budget: { depth: 1, edges: 1, nodes: 6, work: 5 }
}), payload), /seed records/, "seed floor fails closed");

const unreachable = lab.runComposition(request({ relations: [f2.id] }), payload);
assert.equal(unreachable.state, "incomplete", "unreachable predecessor remains incomplete");
assert.equal(unreachable.graph.edges.length, 0, "unreachable edge is not admitted");
assert.equal(unreachable.graph.unresolvedRelations[0].relation, f2.id,
  "unreachable allowlist choice remains visible");

const suggestiveProblem = lab.runComposition(request({
  problem: "Delegate authority and assess compliance, but select only the dependency edge."
}), payload);
assert.deepEqual(suggestiveProblem.graph.edges.map((edge) => edge.id), [f1.id],
  "ordinary-language problem does not discover relations");

for (const invalid of [
  request({ seeds: [] }),
  request({ seeds: ["factor:unknown/value"] }),
  request({ relations: ["f9-invented"] }),
  request({ relations: [f1.id, f1.id] }),
  request({ contextSelections: "boundary=declared-system" }),
  request({ contextSelections: "reference-frame" }),
  request({ budget: { depth: 0, edges: 1, nodes: 3, work: 9 } }),
  request({ exclusions: ["factor:unknown/value"] })
]) {
  assert.throws(() => lab.runComposition(invalid, payload), "invalid request fails closed");
}

console.log(
  `OK relations=${payload.relations.length} basic=${identity(basic)} ` +
  `truncated=${identity(truncated)} contradictory=${identity(contradictory)}`
);
