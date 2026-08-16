"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const crypto = require("node:crypto");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const reading = require("../volumes/01-structure-quantity-choice/proof-set-composition-reading.js");

const relationText = fs.readFileSync("reference/factorium-relations-v0.factorium", "utf8");
const referenceText = fs.readFileSync("reference/factorium-reference-v0.factorium", "utf8");
const sha = (text) => crypto.createHash("sha256").update(text).digest("hex");
const relations = relationText.split(/\r?\n/).filter((line) => line.startsWith("relation "))
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
    assert.equal(fields.length, 7, "relation fields");
    return {
      id: fields[0], verb: fields[1], source: fields[2], target: fields[3],
      scope: fields[4], qualifiers: fields[5], scopeHref: `entries/${fields[6].replace(/[/.]/g, "-")}.html`
    };
  });
const labPayload = {
  schema: "factorium-composition-lab-payload-v0",
  referenceSha256: sha(referenceText), relationsSha256: sha(relationText), relations
};

const bindings = [];
const seen = new Set();
for (const relation of relations) {
  for (const artifact of [relation.source, relation.target, relation.scope]) {
    if (seen.has(artifact)) continue;
    seen.add(artifact);
    const isView = artifact.startsWith("view:");
    const owner = isView ? artifact.slice(5) : artifact.split(":")[1].split("/")[0];
    bindings.push({
      artifact,
      label: artifact.split("/").pop().split(":").pop().replace(/-/g, " "),
      pageTitle: owner.replace(/-/g, " "),
      kind: isView ? "view" : "anchor",
      href: `entries/${isView ? "view" : "entry"}-${owner}.html`
    });
  }
}
bindings.sort((left, right) => left.artifact.localeCompare(right.artifact));
const readingPayload = {
  schema: "factorium-composition-reading-payload-v0",
  referenceSha256: labPayload.referenceSha256,
  relationsSha256: labPayload.relationsSha256,
  bindings
};
const resultIdentity = "a".repeat(64);

function request(overrides = {}) {
  const relation = relations[0];
  return {
    problem: "Review one declared dependency and its interaction contract.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward",
    budget: { depth: 1, edges: 1, nodes: 6 },
    seeds: [relation.source], relations: [relation.id], exclusions: [],
    ...overrides
  };
}

const f1 = relations[0];
const basicResult = lab.runComposition(request(), labPayload);
const basic = reading.buildReadingRoute(basicResult, readingPayload, resultIdentity);
assert.equal(basic.pages.length, 2, "two deduplicated book pages");
assert.deepEqual(basic.pages.map((page) => page.stage), ["start", "evaluate"],
  "anchor precedes evaluative view");
assert.equal(basic.pages[0].bindings.length, 2, "both endpoint factors remain visible");
assert.deepEqual(basic.pages[0].bindings.map((binding) => binding.graphRole).sort(),
  ["required", "seed"], "seed and derived roles remain distinct");

const reverseResult = lab.runComposition(request({
  direction: "reverse", seeds: [f1.target]
}), labPayload);
const reverse = reading.buildReadingRoute(reverseResult, readingPayload, "b".repeat(64));
assert.deepEqual(reverse.pages.map((page) => page.href), basic.pages.map((page) => page.href),
  "direction preserves exact owning pages");
assert.equal(reverse.pages[0].bindings.find((binding) => binding.artifact === f1.target).graphRole,
  "seed", "reverse-selected endpoint remains the seed");

const conflictResult = lab.runComposition(request({ exclusions: [f1.target] }), labPayload);
const conflict = reading.buildReadingRoute(conflictResult, readingPayload, "c".repeat(64));
assert.equal(conflict.pages[0].bindings.find((binding) => binding.artifact === f1.target).disposition,
  "rejected", "conflicting factor remains linked and marked rejected");

const f2 = relations[1];
const frontierResult = lab.runComposition(request({
  seeds: [f1.source, f2.source], relations: [f1.id, f2.id]
}), labPayload);
const frontier = reading.buildReadingRoute(frontierResult, readingPayload, "d".repeat(64));
assert.ok(frontierResult.graph.frontiers.some((item) => item.artifact === f2.target),
  "fixture has an unadmitted frontier");
assert.ok(!frontier.pages.flatMap((page) => page.bindings)
  .some((binding) => binding.artifact === f2.target), "frontier target is not projected");

const reorderedResult = JSON.parse(JSON.stringify(basicResult));
reorderedResult.graph.nodes.reverse();
assert.deepEqual(
  reading.buildReadingRoute(reorderedResult, readingPayload, resultIdentity), basic,
  "graph-node order does not change the route"
);

const continueResult = JSON.parse(JSON.stringify(basicResult));
continueResult.graph.nodes.push({
  artifact: f2.source, class: "required", depth: 1,
  origin: "relation:synthetic-test", predecessor: f1.source
});
const continued = reading.buildReadingRoute(continueResult, readingPayload, "e".repeat(64));
assert.deepEqual(continued.pages.map((page) => page.stage), ["start", "continue", "evaluate"],
  "stage ordering handles a required factor from another anchor");

const unknownResult = JSON.parse(JSON.stringify(basicResult));
unknownResult.graph.nodes.push({ artifact: "factor:unknown/missing", class: "required", origin: "seed" });
assert.throws(() => reading.buildReadingRoute(unknownResult, readingPayload, resultIdentity),
  /No reading binding/, "unknown artifact fails closed");
const duplicatePayload = JSON.parse(JSON.stringify(readingPayload));
duplicatePayload.bindings[1].artifact = duplicatePayload.bindings[0].artifact;
assert.throws(() => reading.validatePayload(duplicatePayload), /Duplicate reading binding/,
  "duplicate binding fails closed");

console.log(`OK bindings=${bindings.length} basic_pages=${basic.pages.length} ` +
  `frontier_pages=${frontier.pages.length} conflict=${conflictResult.state}`);
