"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "syntactic-clause-lookup-baseline-07.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-07");
assert.equal(artifact.results.length, 10);
assert.equal(artifact.summary.assignments, 10);
assert.equal(artifact.summary.clauses, 26);
assert.equal(artifact.summary.splittable_assignments, artifact.results.filter((result) => result.clauses.length >= 2 && result.clauses.length <= 3).length);
assert.equal(artifact.summary.two_intended_family_assignments, artifact.results.filter((result) => result.union_intended_count >= 2).length);
assert.equal(artifact.summary.incremental_assignments_beyond_suj06, artifact.results.filter((result) => result.added_intended_families_beyond_suj06.length > 0).length);
assert.equal(artifact.summary.regressions_from_suj06, artifact.results.filter((result) => result.regression_from_suj06).length);
for (const result of artifact.results) {
  assert.equal(result.lists.length, result.clauses.length, `${result.assignment_id} list count`);
  for (const list of result.lists) {
    assert.ok(list.families.length <= 10, `${result.assignment_id} list limit`);
    assert.deepEqual(list.families.map((family) => family.rank), list.families.map((_, index) => index + 1), `${result.assignment_id} rank order`);
  }
}
console.log(`OK campaign=SUJ-07 coverage=${artifact.summary.two_intended_family_assignments}/10 incremental=${artifact.summary.incremental_assignments_beyond_suj06}/10 admitted=${artifact.summary.admitted}`);
