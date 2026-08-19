"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const directory = path.join(root, "docs", "research", "formography", "independent-coding-v0");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

const protocol = readJson("coding-protocol-v0.json");
const schema = readJson("coding-output-schema-v0.json");
const adjudication = readJson("independent-coding-adjudication-v0.json");
const coders = ["c1", "c2", "c3"].map((id) => readJson(`coder-${id}-output-v0.json`));
const expectedCases = protocol.cases.map((item) => item.case_id);
const expectedOwners = new Map(protocol.cases.map((item) => [item.case_id, item.reference_entry]));
const allowedPreferences = new Set(protocol.terminology_test.allowed_preference);

const hasValue = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== null && value !== undefined && value !== "";
};

const graphSufficient = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value?.value === "boolean") return value.value;
  if (typeof value?.verdict === "boolean") return value.verdict;
  throw new Error("Unrecognized generic_property_graph_sufficient shape");
};

for (const [index, coder] of coders.entries()) {
  assert.equal(coder.coder_id, `C${index + 1}`);
  assert.match(coder.independence_attestation, /source firewall|obeyed|strictly/i);
  assert.deepEqual(coder.cases.map((item) => item.case_id), expectedCases);
  for (const field of schema.required_top_level) assert.ok(hasValue(coder[field]), `${coder.coder_id}.${field}`);
  for (const caseRecord of coder.cases) {
    for (const field of schema.case_record.required) {
      assert.ok(hasValue(caseRecord[field]), `${coder.coder_id}.${caseRecord.case_id}.${field}`);
    }
    for (const field of schema.case_record.structured_failure) {
      assert.ok(hasValue(caseRecord.structured_failure[field]), `${coder.coder_id}.${caseRecord.case_id}.structured_failure.${field}`);
    }
    assert.equal(graphSufficient(caseRecord.generic_property_graph_sufficient), true);
  }
  assert.ok(allowedPreferences.has(coder.terminology_comparison.preference));
  assert.ok(Number.isInteger(coder.terminology_comparison.confidence));
  assert.ok(coder.terminology_comparison.confidence >= 0 && coder.terminology_comparison.confidence <= 100);
}

const exactOwnerCounts = Object.fromEntries(expectedCases.map((caseId) => [
  caseId,
  coders.filter((coder) => coder.cases.find((item) => item.case_id === caseId).form_owner === expectedOwners.get(caseId)).length,
]));
assert.deepEqual(exactOwnerCounts, {
  "access-authorization": 2,
  "amount-concentration-composition": 2,
  "choice-alternative-selection": 2,
});

const preferences = Object.fromEntries([...allowedPreferences].map((preference) => [
  preference,
  coders.filter((coder) => coder.terminology_comparison.preference === preference).length,
]));
assert.deepEqual(preferences, adjudication.terminology_distribution);

assert.equal(adjudication.thresholds.same_canonical_owner_every_case.passed, false);
assert.equal(adjudication.thresholds.majority_required_core_categories.passed, true);
assert.equal(adjudication.thresholds.authority_and_projection_loss_preserved.passed, true);
assert.equal(adjudication.thresholds.graph_sufficiency_answered.passed, true);
assert.equal(adjudication.thresholds.majority_essential_domain_extension.passed, false);
assert.equal(adjudication.promotion_gate_passed, false);
assert.equal(adjudication.verdict, "PAUSE_FIELD_PROMOTION_REVISE_AND_RERUN_INDEPENDENT_PROTOCOL");

console.log(
  `OK coders=${coders.length} cases=${expectedCases.length} graph-sufficient=9/9 exact-owner=2/3-per-case terminology=formography:${preferences.formography},graph:${preferences["governed-property-graph"]},neither:${preferences.neither},tie:${preferences.tie} promotion=false verdict=${adjudication.verdict}`,
);
