"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-test-01.json"), "utf8"));
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-result-01.json"), "utf8"));

assert.equal(result.status, "complete");
assert.equal(result.plan_revision, plan.revision);
assert.equal(result.tasks.length, plan.tasks.length);
assert.deepEqual(result.tasks.map((task) => task.id), plan.tasks.map((task) => task.id));
assert.equal(result.candidate_search_index_sha256, plan.artifact.search_index_sha256);
assert.equal(result.baseline_search_index_sha256, plan.artifact.search_index_sha256);
assert.equal(result.ranking_control_pass, true);
assert.equal(result.destination_gate_pass, true);
assert.equal(result.automatic_repair, false);
assert.equal(result.reader_evidence_claimed, false);
for (const [category, gate] of Object.entries(plan.categories)) {
  assert.equal(result.categories[category].tasks, 5);
  assert.equal(result.categories[category].required_passes, gate.required_passes);
  assert.equal(result.categories[category].gate_pass, result.categories[category].passes >= gate.required_passes);
}
assert.ok(result.tasks.every((task) => ["pass", "ranking-window-gap", "lexical-vocabulary-gap", "mixed-ranking-and-vocabulary-gap", "ranking-control-regression", "alias-owner-set-mismatch", "authored-destination-structure-gap"].includes(task.disposition)));
const expectedVerdict = Object.values(result.categories).every((category) => category.gate_pass) ? "SURVIVES" : "FALSIFIED";
assert.equal(result.hypothesis_verdict, expectedVerdict);
console.log(`OK campaign=THS-01 verdict=${result.hypothesis_verdict} tasks=20 misses=${result.tasks.filter((task) => !task.pass).length} ranking=true destination=true`);
