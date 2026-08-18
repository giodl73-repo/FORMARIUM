"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-09.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-09");
assert.equal(artifact.status, "frozen-before-execution");
assert.equal(artifact.assignments.length, 10);
assert.equal(artifact.route_policy.connection_preview_limit, 6);
assert.equal(artifact.route_policy.traversal_depth, 1);
assert.equal(artifact.route_policy.foothold_selection_in_product, "none");
assert.equal(artifact.route_policy.connection_semantics, "untyped-navigation-only");
assert.equal(artifact.route_policy.closure, false);
assert.equal(artifact.owner_test.required_eligible_assignments, 9);
assert.equal(artifact.owner_test.required_expanded_deficient_assignments, 6);
assert.equal(artifact.owner_test.required_two_family_assignments, 8);
assert.equal(new Set(artifact.assignments.map((item) => item.task_id)).size, 10);
console.log("OK campaign=SUJ-09 assignments=10 eligible-gate=9 expansion-gate=6 coverage-gate=8 frozen=true");
