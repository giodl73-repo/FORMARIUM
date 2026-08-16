"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const closureMap = require("../volumes/01-structure-quantity-choice/proof-set-composition-map.js");

const sha = "1".repeat(64);
const relationText = fs.readFileSync("reference/factorium-relations-v0.factorium", "utf8");
const relations = relationText.split(/\r?\n/).filter((line) => line.startsWith("relation "))
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
    assert.equal(fields.length, 7, "relation fields");
    return {
      id: fields[0], verb: fields[1], source: fields[2], target: fields[3],
      scope: fields[4], qualifiers: fields[5], scopeHref: "entries/scope.html"
    };
  });
const labPayload = {
  schema: "factorium-composition-lab-payload-v0",
  referenceSha256: sha,
  relationsSha256: sha,
  relations
};
const artifacts = [...new Set(relations.flatMap((relation) =>
  [relation.source, relation.target, relation.scope]))].sort();
const bindings = artifacts.map((artifact) => ({
  artifact,
  label: artifact.split(/[/:]/).pop().replace(/-/g, " "),
  pageTitle: artifact.split(":")[1].split("/")[0].replace(/-/g, " "),
  kind: artifact.startsWith("view:") ? "view" : "anchor",
  href: "entries/record.html"
}));
const readingPayload = {
  schema: "factorium-composition-reading-payload-v0",
  referenceSha256: sha,
  relationsSha256: sha,
  bindings
};

function request(overrides = {}) {
  const f1 = relations[0];
  return {
    problem: "Review a system dependency and its required interaction contract.",
    contextId: "synthetic-map-check",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward",
    budget: { depth: 2, edges: 2, nodes: 12, work: 24 },
    seeds: [f1.source],
    relations: [f1.id],
    exclusions: [],
    ...overrides
  };
}

function mapped(runRequest, payload = labPayload, reading = readingPayload) {
  const result = lab.runComposition(runRequest, payload);
  return { result, map: closureMap.buildClosureMap(result, payload, reading, "a".repeat(64)) };
}

const f1 = relations[0];
const basic = mapped(request());
assert.equal(basic.map.nodes.length, 3, "default unique nodes");
assert.equal(basic.map.traversals.length, 1, "default typed traversal");
assert.equal(basic.map.evaluations.length, 1, "default evaluation scope");
assert.equal(basic.map.frontiers.length, 0, "default has no frontier");
assert.equal(basic.map.traversals[0].predecessor, f1.source);
assert.equal(basic.map.traversals[0].derived, f1.target);
assert.equal(new Set(basic.map.layout.positions.map((position) =>
  `${position.x}:${position.y}`)).size, basic.map.layout.positions.length,
"layout coordinates are unique");

const reverse = mapped(request({
  direction: "reverse", seeds: [f1.target]
}));
assert.equal(reverse.map.traversals[0].canonicalSource, f1.source,
  "reverse retains canonical source");
assert.equal(reverse.map.traversals[0].canonicalTarget, f1.target,
  "reverse retains canonical target");
assert.equal(reverse.map.traversals[0].predecessor, f1.target,
  "reverse traversal starts at target");
assert.equal(reverse.map.traversals[0].derived, f1.source,
  "reverse traversal derives source");

const conflict = mapped(request({ exclusions: [f1.target] }));
assert.equal(conflict.map.conflicts.length, 1, "conflict retained");
assert.equal(conflict.map.nodes.find((node) => node.artifact === f1.target).role,
  "conflict", "conflicted admitted node is marked");
assert.equal(conflict.map.nodes.find((node) => node.artifact === f1.target).disposition,
  "rejected", "conflicted projection is rejected");

const f2 = relations[1];
const f6 = relations[5];
const frontier = mapped(request({
  seeds: [f2.source, f6.source], relations: [f2.id, f6.id],
  budget: { depth: 2, edges: 1, nodes: 12, work: 16 }
}));
assert.equal(frontier.map.frontiers.length, 1, "finite edge budget yields frontier");
assert.equal(frontier.map.frontiers[0].relation, f6.id, "stable relation order stops F6");
assert.equal(frontier.map.frontiers[0].alreadyAdmitted, false,
  "unadmitted frontier gets a ghost");
assert.equal(frontier.map.layout.positions.filter((position) =>
  position.kind === "frontier").length, 1, "one frontier ghost position");

const unresolved = mapped(request({ relations: [f1.id, f2.id] }));
assert.equal(unresolved.map.unresolvedRelations.length, 1,
  "missing predecessor remains boundary record");
assert.equal(unresolved.map.unresolvedRelations[0].predecessorAdmitted, false,
  "missing predecessor is not fabricated");
assert.ok(!unresolved.map.nodes.some((node) =>
  node.artifact === unresolved.map.unresolvedRelations[0].predecessor),
"unresolved predecessor is absent from graph nodes");

const inactive = mapped(request({ exclusions: [f2.source] }));
assert.equal(inactive.map.inactiveExclusions.length, 1, "inactive exclusion retained");
assert.ok(!inactive.map.nodes.some((node) => node.artifact === f2.source),
  "inactive exclusion does not mutate graph");

const chainedPayload = JSON.parse(JSON.stringify(labPayload));
chainedPayload.relations[1].source = chainedPayload.relations[0].target;
const chained = mapped(request({
  relations: [f1.id, f2.id], budget: { depth: 2, edges: 2, nodes: 12, work: 24 }
}), chainedPayload, readingPayload);
assert.equal(chained.map.traversals.length, 2, "two-edge chain admitted");
assert.equal(chained.map.nodes.filter((node) => node.artifact === f1.target).length, 1,
  "shared node appears exactly once");

const reordered = JSON.parse(JSON.stringify(basic.result));
for (const key of ["nodes", "edges", "frontiers", "unresolvedRelations",
  "conflicts", "inactiveExclusions"]) reordered.graph[key].reverse();
reordered.projections.reverse();
reordered.evaluation.reverse();
assert.deepEqual(closureMap.buildClosureMap(reordered, labPayload, readingPayload,
  "a".repeat(64)), basic.map, "result array order does not change map record");

const unknown = JSON.parse(JSON.stringify(basic.result));
unknown.graph.nodes[0].artifact = "factor:unknown/missing";
assert.throws(() => closureMap.buildClosureMap(unknown, labPayload, readingPayload,
  "a".repeat(64)), /Unknown graph node/, "unknown artifact fails closed");
const duplicateCheck = JSON.parse(JSON.stringify(basic.result));
duplicateCheck.evaluation.push(duplicateCheck.evaluation[0]);
assert.throws(() => closureMap.buildClosureMap(duplicateCheck, labPayload, readingPayload,
  "a".repeat(64)), /Duplicate evaluation/, "duplicate boundary record fails closed");
const badReading = JSON.parse(JSON.stringify(readingPayload));
badReading.relationsSha256 = "2".repeat(64);
assert.throws(() => closureMap.buildClosureMap(basic.result, labPayload, badReading,
  "a".repeat(64)), /identity mismatch/, "digest mismatch fails closed");
assert.ok(closureMap.wrapLabel("one two three four five", 8).length >= 2,
  "long labels wrap deterministically");

console.log(`OK nodes=${basic.map.nodes.length} traversals=${basic.map.traversals.length} ` +
  `frontier=${frontier.map.frontiers.length} unresolved=${unresolved.map.unresolvedRelations.length}`);
