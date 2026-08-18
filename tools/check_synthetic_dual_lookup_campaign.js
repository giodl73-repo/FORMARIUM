"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-06.json"), "utf8"));
assert.equal(campaign.campaign_id, "SUJ-06");
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.assignments.length, 10);
assert.ok(campaign.assignments.every((assignment) => assignment.queries.length === 2));
assert.equal(new Set(campaign.assignments.flatMap((assignment) => assignment.queries)).size, 20);
assert.equal(campaign.route_policy.query_count, 2);
assert.equal(campaign.route_policy.ownership_groups_per_query, 10);
assert.equal(campaign.route_policy.ranking, "independent-existing-order");
assert.equal(campaign.route_policy.merged_ranking, false);
assert.equal(campaign.route_policy.semantic_decomposition, false);
assert.equal(campaign.route_policy.persistence, "none");
assert.equal(campaign.owner_test.required_union_assignments, 8);
assert.equal(campaign.owner_test.required_incremental_assignments, 6);
console.log("OK campaign=SUJ-06 assignments=10 queries=20 independent-rankings=true semantics=none persistence=none");
