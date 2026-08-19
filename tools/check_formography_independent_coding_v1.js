"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const directory = path.join(root, "docs", "research", "formography", "independent-coding-v1");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const protocol = readJson("coding-protocol-v1.json");
const schema = readJson("coding-output-schema-v1.json");
const adjudication = readJson("independent-coding-adjudication-v1.json");
const coders = ["v1c1", "v1c2", "v1c3"].map((id) => readJson(`coder-${id}-output-v1.json`));
const caseIds = protocol.cases.map((item) => item.case_id);
const owners = new Map(protocol.cases.map((item) => [item.case_id, item.owner_reference]));
const allowedStatuses = new Set(protocol.core_status_values);
const allowedAuthorities = new Set(protocol.authority_classes);
const allowedExtensions = new Set(protocol.extension_categories);
const allowedFailures = new Set(protocol.failure_categories);
const allowedPreferences = new Set([
  "formography",
  "governed-property-graph",
  "tie",
  "neither",
]);

const wordCount = (text) => text.trim().split(/\s+/).length;
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const majority = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
};

const conformance = {};
for (const coder of coders) {
  assert.deepEqual(coder.cases.map((item) => item.case_id), caseIds);
  for (const field of schema.required_top_level) assert.ok(coder[field] !== undefined, `${coder.coder_id}.${field}`);
  let conformant = true;
  for (const record of coder.cases) {
    for (const field of schema.case_required) {
      assert.ok(Object.hasOwn(record, field), `${coder.coder_id}.${record.case_id}.${field}`);
    }
    assert.equal(record.owner_reference, owners.get(record.case_id));
    assert.ok(record.extension_source_anchor.trim(), `${coder.coder_id}.${record.case_id}.extension_source_anchor`);
    assert.ok(record.failure_condition.trim(), `${coder.coder_id}.${record.case_id}.failure_condition`);
    if (!allowedAuthorities.has(record.authority_class)) conformant = false;
    for (const category of protocol.core_categories) {
      assert.ok(record.core_categories[category], `${coder.coder_id}.${record.case_id}.${category}`);
      if (!allowedStatuses.has(record.core_categories[category].status)) conformant = false;
      assert.ok(record.core_categories[category].source_anchor);
    }
    if (!allowedExtensions.has(record.primary_extension_category)) conformant = false;
    if (record.secondary_extension_category !== null && !allowedExtensions.has(record.secondary_extension_category)) conformant = false;
    if (!allowedFailures.has(record.primary_failure_category)) conformant = false;
    for (const field of ["authority_preserved", "projection_loss_declared", "unresolved_state_retained", "generic_property_graph_sufficient"]) {
      assert.equal(typeof record[field], "boolean");
    }
  }
  for (const field of schema.terminology_required) {
    assert.ok(coder.terminology_test[field] !== undefined, `${coder.coder_id}.terminology_test.${field}`);
  }
  for (const field of ["formography_explanation", "governed_property_graph_explanation", "reason"]) {
    assert.equal(typeof coder.terminology_test[field], "string");
    assert.ok(coder.terminology_test[field].trim(), `${coder.coder_id}.terminology_test.${field}`);
  }
  assert.ok(allowedPreferences.has(coder.terminology_test.preference));
  assert.ok(
    Number.isInteger(coder.terminology_test.confidence) &&
      coder.terminology_test.confidence >= 0 &&
      coder.terminology_test.confidence <= 100,
    `${coder.coder_id}.terminology_test.confidence`,
  );
  const formWords = wordCount(coder.terminology_test.formography_explanation);
  const graphWords = wordCount(coder.terminology_test.governed_property_graph_explanation);
  if (formWords < 35 || formWords > 55 || graphWords < 35 || graphWords > 55) conformant = false;
  if (coder.response_conformance && Object.values(coder.response_conformance).some((value) => value === false)) conformant = false;
  conformance[coder.coder_id] = conformant;
}
assert.deepEqual(conformance, {V1C1: true, V1C2: false, V1C3: true});

const extensions = {};
const failures = {};
for (const caseId of caseIds) {
  extensions[caseId] = majority(coders.map((coder) => coder.cases.find((item) => item.case_id === caseId).primary_extension_category));
  failures[caseId] = majority(coders.map((coder) => coder.cases.find((item) => item.case_id === caseId).primary_failure_category));
}
assert.deepEqual(Object.fromEntries(Object.entries(extensions).map(([key, value]) => [key, value[0]])), adjudication.extension_majorities);
assert.deepEqual(Object.fromEntries(Object.entries(failures).map(([key, value]) => [key, value[0]])), adjudication.failure_majorities);
for (const value of [...Object.values(extensions), ...Object.values(failures)]) assert.ok(value[1] >= 2);

const allRecords = coders.flatMap((coder) => coder.cases);
assert.equal(allRecords.filter((item) => item.authority_preserved && item.projection_loss_declared).length, 9);
assert.equal(allRecords.filter((item) => item.unresolved_state_retained).length, 8);
assert.deepEqual({
  sufficient: allRecords.filter((item) => item.generic_property_graph_sufficient).length,
  insufficient: allRecords.filter((item) => !item.generic_property_graph_sufficient).length,
}, adjudication.graph_sufficiency_distribution);

const preferences = Object.fromEntries(["formography", "governed-property-graph", "tie", "neither"].map((value) => [
  value,
  coders.filter((coder) => coder.terminology_test.preference === value).length,
]));
assert.deepEqual(preferences, adjudication.terminology.preferences);
const medians = {
  formography: median(coders.map((coder) => wordCount(coder.terminology_test.formography_explanation))),
  "governed-property-graph": median(coders.map((coder) => wordCount(coder.terminology_test.governed_property_graph_explanation))),
};
assert.deepEqual(medians, adjudication.terminology.median_words);

assert.equal(adjudication.thresholds.majority_primary_extension_category.passed, true);
assert.equal(adjudication.thresholds.majority_primary_failure_category.passed, true);
assert.equal(adjudication.thresholds.all_unresolved_state_retained.passed, false);
assert.equal(adjudication.thresholds.all_records_protocol_conformant.passed, false);
assert.equal(adjudication.promotion_gate_passed, false);

console.log(
  `OK coders=3 cases=3 conformant=2/3 extensions=3/3-majority failures=3/3-majority unresolved=8/9 graph=6/9-sufficient terminology=graph:2/3 words=${medians.formography}/${medians["governed-property-graph"]} promotion=false verdict=${adjudication.verdict}`,
);
