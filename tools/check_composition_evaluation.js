"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const evaluation = require("../volumes/01-structure-quantity-choice/proof-set-composition-evaluation.js");

const relationText = fs.readFileSync("reference/factorium-relations-v0.factorium", "utf8");
const referenceText = fs.readFileSync("reference/factorium-reference-v0.factorium", "utf8");
const sha = (text) => crypto.createHash("sha256").update(text).digest("hex");
const relations = relationText.split(/\r?\n/).filter((line) => line.startsWith("relation "))
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
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

function record(checkId, outcome = "pass", overrides = {}) {
  return {
    checkId,
    outcome,
    evidenceReference: "Local test record A-17",
    observation: "The declared interface was present at the inspected boundary.",
    rationale: "The observation directly addresses the selected structural check.",
    ...overrides
  };
}

function identity(value) {
  return crypto.createHash("sha256").update(evaluation.canonicalize(value)).digest("hex");
}

const resultIdentity = "a".repeat(64);
const basicResult = lab.runComposition(request(), labPayload);
const before = lab.canonicalize(basicResult);
const basic = evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id)]
  });
assert.equal(basic.schema, "factorium-composition-evaluation-record-v0");
assert.equal(basic.status, "fully-recorded");
assert.deepEqual(basic.coverage, { recorded: 1, total: 1 });
assert.deepEqual(basic.outcomes, { pass: 1, fail: 0, unresolved: 0 });
assert.equal(basic.records[0].evidenceStatus, "user-declared-unverified");
assert.equal(basic.resultSha256, resultIdentity);
assert.equal(lab.canonicalize(basicResult), before, "evaluation does not mutate the base result");
assert.equal(basicResult.state, "incomplete", "recorded pass does not complete the base result");

const repeated = evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id)]
  });
assert.equal(evaluation.canonicalize(repeated), evaluation.canonicalize(basic));
assert.equal(identity(repeated), identity(basic), "unchanged input has stable identity");

const twoResult = lab.runComposition(request({
  seeds: [f1.source, f2.source], relations: [f1.id, f2.id],
  budget: { depth: 1, edges: 2, nodes: 8, work: 18 }
}), labPayload);
assert.equal(twoResult.evaluation.length, 2, "fixture has two admitted checks");
const partial = evaluation.buildEvaluationRecord(twoResult, "b".repeat(64),
  labPayload, readingPayload, {
    boundResultSha256: "b".repeat(64),
    records: [record(twoResult.evaluation[1].id, "fail")]
  });
assert.equal(partial.status, "partially-recorded");
assert.deepEqual(partial.coverage, { recorded: 1, total: 2 });
assert.equal(partial.unrecordedCheckIds.length, 1);
assert.deepEqual(partial.outcomes, { pass: 0, fail: 1, unresolved: 0 });

const mixed = evaluation.buildEvaluationRecord(twoResult, "b".repeat(64),
  labPayload, readingPayload, {
    boundResultSha256: "b".repeat(64),
    records: [
      record(twoResult.evaluation[1].id, "unresolved", {
        evidenceReference: "Pending source request 42",
        observation: "The required source record was not available during this review.",
        rationale: "Without the source record the declared check remains unresolved."
      }),
      record(twoResult.evaluation[0].id, "fail")
    ]
  });
assert.equal(mixed.status, "fully-recorded");
assert.deepEqual(mixed.outcomes, { pass: 0, fail: 1, unresolved: 1 });
assert.deepEqual(mixed.records.map((item) => item.checkId),
  mixed.records.map((item) => item.checkId).sort(), "records sort by check ID");
assert.equal(mixed.unrecordedCheckIds.length, 0);

const normalized = evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id, "unresolved", {
      evidenceReference: "  Source\n  record  ",
      observation: "  Observation   contains\tseveral whitespace runs.  ",
      rationale: "  The source remains incomplete for this declared check.  "
    })]
  });
assert.equal(normalized.records[0].evidenceReference, "Source record");
assert.equal(normalized.records[0].observation,
  "Observation contains several whitespace runs.");

assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, { boundResultSha256: "c".repeat(64), records: [record(basicResult.evaluation[0].id)] }),
/stale for the bound result/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, { boundResultSha256: resultIdentity, records: [] }),
/Select at least one/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, { boundResultSha256: resultIdentity, records: [record("unknown-check")] }),
/Unknown or stale/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id), record(basicResult.evaluation[0].id)]
  }), /Duplicate evaluation check/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id, "approved")]
  }), /Invalid evaluation outcome/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id, "pass", { evidenceReference: "x" })]
  }), /Evidence reference must contain 3-240/);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, readingPayload, {
    boundResultSha256: resultIdentity,
    records: [record(basicResult.evaluation[0].id, "pass", { observation: "valid text\u0000hidden" })]
  }), /control character/);

const noCheckResult = lab.runComposition(request({
  budget: { depth: 1, edges: 1, nodes: 6, work: 8 }
}), labPayload);
assert.equal(noCheckResult.evaluation.length, 0);
assert.throws(() => evaluation.buildEvaluationRecord(noCheckResult, "d".repeat(64),
  labPayload, readingPayload, {
    boundResultSha256: "d".repeat(64), records: [record("none")]
  }), /No admitted checks/);

const mismatched = JSON.parse(JSON.stringify(readingPayload));
mismatched.relationsSha256 = "e".repeat(64);
assert.throws(() => evaluation.buildEvaluationRecord(basicResult, resultIdentity,
  labPayload, mismatched, {
    boundResultSha256: resultIdentity, records: [record(basicResult.evaluation[0].id)]
  }), /relation identity mismatch/);

console.log(`OK full=${basic.coverage.recorded}/${basic.coverage.total} ` +
  `partial=${partial.coverage.recorded}/${partial.coverage.total} mixed=${mixed.outcomes.fail}f+${mixed.outcomes.unresolved}u`);
