"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "dual-lookup-baseline-06.json"), "utf8"));
assert.equal(result.campaign_id, "SUJ-06");
assert.equal(result.custody.frozen_commit, "5269f7f");
assert.equal(result.results.length, 10);
assert.ok(result.results.every((row) => row.lists.length === 2));
assert.ok(result.results.every((row) => row.lists.every((list) => list.families.length <= 10)));
assert.equal(result.summary.assignments, 10);
assert.equal(result.summary.queries, 20);
assert.equal(result.summary.union_gate_passed, result.summary.union_two_intended >= result.summary.required_union_assignments);
assert.equal(result.summary.incremental_gate_passed, result.summary.second_query_adds_intended >= result.summary.required_incremental_assignments);
assert.equal(result.summary.admitted, result.summary.union_gate_passed && result.summary.incremental_gate_passed);
console.log(`OK campaign=SUJ-06 union=${result.summary.union_two_intended}/10 incremental=${result.summary.second_query_adds_intended}/10 admitted=${result.summary.admitted}`);
