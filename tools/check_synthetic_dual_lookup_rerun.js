"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "dual-lookup-rerun-06-sim-45.json"), "utf8"));
assert.equal(result.campaign_id, "SUJ-06");
assert.equal(result.custody.frozen_commit, "5269f7f");
assert.equal(result.custody.implementation_commit, "e54a36e");
assert.equal(result.custody.build.edition, "sim-45");
assert.equal(result.traces.length, 10);
assert.deepEqual(result.summary, {
  assignments: 10,
  union_two_intended: 9,
  second_query_adds_intended: 8,
  rankings_match_baseline: 10,
  boundary_visible: 10,
  url_state_unchanged: 10,
  storage_empty: 10,
  viewport_overflow: 0,
  admitted_gates_preserved: true
});
assert.ok(result.traces.every((trace) => trace.query_one_families.length > 0 && trace.query_one_families.length <= 10 && trace.query_two_families.length > 0 && trace.query_two_families.length <= 10));
assert.ok(result.traces.every((trace) => trace.comparison_families.every((family) => ["Literal search 1", "Literal search 2", "Both literal searches"].includes(family.presence))));
console.log("OK campaign=SUJ-06 sim-45 union=9/10 incremental=8/10 rankings=10/10 boundary=10/10 overflow=0");
