"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { splitSyntacticClauses } = require("./synthetic_syntactic_clause_split.js");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-07.json"), "utf8"));

assert.equal(campaign.campaign_id, "SUJ-07");
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.assignments.length, 10);
assert.equal(campaign.split_policy.fallback_query, false);
assert.equal(campaign.split_policy.vocabulary_insertion, false);
assert.equal(campaign.split_policy.semantic_decomposition, false);
assert.equal(campaign.lookup_policy.merged_ranking, false);
assert.deepEqual(campaign.owner_test, {
  required_splittable_assignments: 10,
  required_two_family_assignments: 10,
  required_incremental_assignments: 4,
  required_regressions: 0,
  owner: "search-publication-shell",
  smallest_candidate: "visible-editable-syntactic-clause-helper",
  prohibited: ["hidden-query-generation", "semantic-decomposition-claim", "merged-ranking", "automatic-selection", "inferred-relation", "closure", "query-persistence", "canonical-write"]
});
for (const assignment of campaign.assignments) {
  assert.deepEqual(assignment.clauses, splitSyntacticClauses(assignment.task), `${assignment.id} split drift`);
  assert.ok(assignment.clauses.length >= 2 && assignment.clauses.length <= 3, `${assignment.id} clause count`);
  for (const clause of assignment.clauses) assert.ok(assignment.task.toLowerCase().includes(clause.toLowerCase()), `${assignment.id} inserted vocabulary`);
}
console.log(`OK campaign=SUJ-07 assignments=10 clauses=${campaign.assignments.reduce((sum, item) => sum + item.clauses.length, 0)} frozen=true`);
