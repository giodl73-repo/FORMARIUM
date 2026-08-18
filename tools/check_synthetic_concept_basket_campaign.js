"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-05.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-44", "manifest.json"), "utf8"));

assert.equal(campaign.campaign_id, "SUJ-05");
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.assignments.length, 10);
assert.equal(new Set(campaign.assignments.map((assignment) => assignment.id)).size, 10);
assert.ok(campaign.assignments.every((assignment) => assignment.query && assignment.intended_paths.length >= 2));
assert.ok(campaign.assignments.every((assignment) => assignment.frozen_sequence.length === 5));
assert.equal(campaign.route_policy.query_attempts, 1);
assert.equal(campaign.route_policy.ownership_groups_inspected, 10);
assert.equal(campaign.route_policy.collection_limit, 5);
assert.equal(campaign.route_policy.selection, "explicit-user-action-only");
assert.equal(campaign.route_policy.relation_semantics, "none");
assert.equal(campaign.route_policy.closure, "none");
assert.equal(campaign.route_policy.persistence, "none");
assert.equal(campaign.baseline.site_identity, manifest.output.site_identity);
assert.equal(campaign.baseline.search_index_sha256, manifest.output.search_index_sha256);

console.log("OK campaign=SUJ-05 assignments=10 explicit-selection=true semantics=none closure=none persistence=none");
