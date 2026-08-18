"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const contract = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "philosophy", "philosopher-factorium-comparison-01.json"), "utf8"));
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "philosophy", "philosopher-factorium-comparison-01-result.json"), "utf8"));

assert.equal(contract.campaign_id, "PFC-01");
assert.equal(contract.status, "frozen-before-source-review");
assert.equal(contract.cohort.length, 16);
assert.equal(result.campaign_id, contract.campaign_id);
assert.equal(result.rows.length, contract.cohort.length);
assert.deepEqual(result.rows.map(({ id }) => id), contract.cohort.map(({ id }) => id));
assert.equal(result.evidence_level.includes("no reader evidence"), true);
assert.deepEqual(result.portfolio_decision.admit_now, []);
assert.equal(result.portfolio_decision.counter_sample_required, true);

const allowed = new Set(contract.coverage_values);
for (const row of result.rows) {
  assert.ok(allowed.has(row.coverage), `invalid coverage: ${row.id}`);
  assert.ok(row.question && row.concepts.length && row.distinctions.length, `incomplete row: ${row.id}`);
  assert.ok(row.owners.length, `missing owners: ${row.id}`);
  for (const owner of row.owners) {
    assert.ok(fs.existsSync(path.join(root, owner)), `missing owner: ${owner}`);
  }
  assert.ok(row.loss, `missing mapping loss: ${row.id}`);
}

for (const family of result.gap_families) {
  assert.equal(family.count, family.recurs_in.length, `bad recurrence count: ${family.id}`);
  assert.ok(family.count >= 3, `below admission screen: ${family.id}`);
  for (const id of family.recurs_in) {
    assert.ok(contract.cohort.some((row) => row.id === id), `unknown recurrence row: ${id}`);
  }
}

console.log(`OK campaign=PFC-01 rows=${result.rows.length} gap_families=${result.gap_families.length} admitted=0 reader_evidence=false`);
