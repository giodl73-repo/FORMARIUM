"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const guides = require("../volumes/01-structure-quantity-choice/proof-set-composition-guide.js");

const relationText = fs.readFileSync("reference/factorium-relations-v0.factorium", "utf8");
const referenceText = fs.readFileSync("reference/factorium-reference-v0.factorium", "utf8");
const sha = (text) => crypto.createHash("sha256").update(text).digest("hex");
const relations = relationText.split(/\r?\n/).filter((line) => line.startsWith("relation "))
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
    assert.equal(fields.length, 7, "relation fields");
    return {
      id: fields[0], verb: fields[1], source: fields[2], target: fields[3],
      scope: fields[4], qualifiers: fields[5], scopeHref: fields[6]
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
const f1 = relations[0];
const f2 = relations[1];

function request(overrides = {}) {
  return {
    problem: "Review one declared dependency and its interaction contract.",
    contextId: "synthetic-query-lab",
    contextSelections: "boundary=declared-system,reference-frame=not-applicable",
    direction: "forward",
    budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
    seeds: [f1.source], relations: [f1.id], exclusions: [],
    ...overrides
  };
}

const basicResult = lab.runComposition(request(), labPayload);
const basic = guides.buildGuideSkeleton(basicResult, labPayload, readingPayload, resultIdentity);
assert.equal(basic.schema, "factorium-composition-guide-skeleton-v0");
assert.equal(basic.resultSha256, resultIdentity, "guide inherits result identity");
assert.equal(basic.brief.status, "incomplete-guide-skeleton");
assert.equal(basic.brief.decisionStatus, "missing");
assert.equal(basic.canonicalTrace.length, 2, "anchor and evaluative view form the trace");
assert.deepEqual(basic.canonicalTrace.map((page) => page.stage), ["start", "evaluate"]);
assert.equal(basic.canonicalTrace[0].bindings.length, 2,
  "deduplicated anchor retains both exact factors");
assert.equal(basic.workingSet.relations.length, 1);
assert.equal(basic.evaluationLedger.length, 1);
assert.equal(basic.evaluationLedger[0].outcome, "unresolved");
assert.equal(basic.missingWork.length, 8, "all Factor Guide gaps remain explicit");
assert.ok(basic.missingWork.every((record) => record.status === "missing"));
assert.deepEqual(basic.lossManifest.absent,
  guides.MISSING_WORK.map((record) => record[0]).sort(), "loss uses stable missing-work codes");
assert.deepEqual(basic.lossManifest.retained, guides.RETAINED.slice().sort());

const reorderedResult = JSON.parse(JSON.stringify(basicResult));
reorderedResult.graph.nodes.reverse();
reorderedResult.projections.reverse();
reorderedResult.evaluation.reverse();
assert.deepEqual(
  guides.buildGuideSkeleton(reorderedResult, labPayload, readingPayload, resultIdentity), basic,
  "input record order does not change the guide manifest"
);

const conflictResult = lab.runComposition(request({
  exclusions: [f1.target], budget: { depth: 1, edges: 1, nodes: 6, work: 10 }
}), labPayload);
const conflict = guides.buildGuideSkeleton(conflictResult, labPayload, readingPayload, "b".repeat(64));
assert.equal(conflict.brief.state, "contradictory");
assert.equal(conflict.closureBoundary.conflicts.length, 1);
assert.equal(conflict.workingSet.rows.find((row) => row.artifact === f1.target).disposition,
  "rejected", "conflicting required node remains in the working set");

const frontierResult = lab.runComposition(request({
  seeds: [f1.source, f2.source], relations: [f1.id, f2.id],
  budget: { depth: 1, edges: 1, nodes: 8, work: 13 }
}), labPayload);
const frontier = guides.buildGuideSkeleton(frontierResult, labPayload, readingPayload, "c".repeat(64));
assert.equal(frontier.brief.state, "truncated");
assert.equal(frontier.closureBoundary.frontiers.length, 1);
assert.ok(!frontier.canonicalTrace.flatMap((page) => page.bindings)
  .some((binding) => binding.artifact === f2.target), "frontier does not enter canonical trace");

const unreachableResult = lab.runComposition(request({ relations: [f2.id] }), labPayload);
const unreachable = guides.buildGuideSkeleton(unreachableResult, labPayload, readingPayload, "d".repeat(64));
assert.equal(unreachable.closureBoundary.unresolvedRelations.length, 1);
assert.equal(unreachable.workingSet.relations.length, 0, "unreachable relation is not admitted");

const mismatchedReading = JSON.parse(JSON.stringify(readingPayload));
mismatchedReading.referenceSha256 = "e".repeat(64);
assert.throws(() => guides.buildGuideSkeleton(
  basicResult, labPayload, mismatchedReading, resultIdentity), /reference identity mismatch/);

const unknown = JSON.parse(JSON.stringify(basicResult));
unknown.graph.nodes.push({ artifact: "factor:unknown/missing", class: "required", origin: "seed" });
unknown.projections.push({
  artifact: "factor:unknown/missing", disposition: "selected", loss: "simulation-draft"
});
assert.throws(() => guides.buildGuideSkeleton(
  unknown, labPayload, readingPayload, resultIdentity), /No guide binding/);

const evaluated = JSON.parse(JSON.stringify(basicResult));
evaluated.evaluation[0].outcome = "passed";
assert.throws(() => guides.buildGuideSkeleton(
  evaluated, labPayload, readingPayload, resultIdentity), /substantive check outcomes/);

const completed = JSON.parse(JSON.stringify(basicResult));
completed.state = "complete";
assert.throws(() => guides.buildGuideSkeleton(
  completed, labPayload, readingPayload, resultIdentity), /complete state/);

console.log(`OK missing=${basic.missingWork.length} trace=${basic.canonicalTrace.length} ` +
  `frontier=${frontier.brief.state} conflict=${conflict.brief.state}`);
