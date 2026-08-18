"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { splitSyntacticClauses } = require("./synthetic_syntactic_clause_split.js");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-08.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-08");
assert.equal(artifact.status, "frozen-before-execution");
assert.equal(artifact.assignments.length, 10);
assert.equal(artifact.lens_policy.vocabulary_insertion, false);
assert.equal(artifact.lens_policy.semantic_decomposition, false);
assert.equal(artifact.lookup_policy.merged_ranking, false);
assert.equal(artifact.owner_test.required_two_family_assignments, 10);
assert.equal(artifact.owner_test.allowed_control_family_losses, 0);
assert.equal(artifact.owner_test.required_incremental_assignments, 4);
for (const assignment of artifact.assignments) {
  const expected = [{ kind: "whole-question", query: assignment.task }, ...splitSyntacticClauses(assignment.task).map((query) => ({ kind: "syntactic-clause", query }))];
  assert.deepEqual(assignment.lenses, expected, `${assignment.id} lens drift`);
  assert.ok(assignment.lenses.length >= 3 && assignment.lenses.length <= 4, `${assignment.id} lens count`);
  for (const lens of assignment.lenses) assert.ok(assignment.task.toLowerCase().includes(lens.query.toLowerCase()), `${assignment.id} inserted vocabulary`);
}
console.log(`OK campaign=SUJ-08 assignments=10 lenses=${artifact.assignments.reduce((sum, item) => sum + item.lenses.length, 0)} frozen=true`);
