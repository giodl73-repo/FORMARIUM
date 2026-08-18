"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "whole-question-clause-lenses-baseline-08.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-08");
assert.equal(artifact.results.length, 10);
assert.equal(artifact.summary.assignments, 10);
assert.equal(artifact.summary.lenses, 36);
assert.equal(artifact.summary.feasible_assignments, artifact.results.filter((result) => result.lists.length >= 3 && result.lists.length <= 4).length);
assert.equal(artifact.summary.two_intended_family_assignments, artifact.results.filter((result) => result.union_intended_count >= 2).length);
assert.equal(artifact.summary.incremental_assignments_beyond_suj06, artifact.results.filter((result) => result.added_intended_families_beyond_suj06.length > 0).length);
assert.equal(artifact.summary.control_loss_assignments, artifact.results.filter((result) => result.lost_intended_families_from_suj06.length > 0).length);
assert.equal(artifact.summary.control_families_lost, artifact.results.reduce((sum, result) => sum + result.lost_intended_families_from_suj06.length, 0));
for (const result of artifact.results) {
  assert.equal(result.lists[0].kind, "whole-question", `${result.assignment_id} primary kind`);
  for (const list of result.lists) {
    assert.ok(list.families.length <= 10, `${result.assignment_id} list limit`);
    assert.deepEqual(list.families.map((family) => family.rank), list.families.map((_, index) => index + 1), `${result.assignment_id} rank order`);
  }
}
console.log(`OK campaign=SUJ-08 coverage=${artifact.summary.two_intended_family_assignments}/10 incremental=${artifact.summary.incremental_assignments_beyond_suj06}/10 losses=${artifact.summary.control_families_lost} admitted=${artifact.summary.admitted}`);
