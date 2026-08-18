"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "reciprocal-connection-repair-rerun-10-sim-46.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-10");
assert.equal(artifact.source_campaign_id, "SUJ-09");
assert.equal(artifact.results.length, 10);
assert.equal(artifact.summary.eligible_assignments, 9);
assert.equal(artifact.summary.deficient_assignments, 8);
assert.equal(artifact.summary.expanded_deficient_assignments, 7);
assert.equal(artifact.summary.two_family_assignments_after_expansion, 9);
assert.deepEqual(artifact.summary.changed_tasks, ["SUJ-02-04", "SUJ-02-23"]);
assert.equal(artifact.summary.lost_baseline_intended_families, 0);
assert.equal(artifact.summary.dashboard_search_gap_remains, true);
assert.equal(artifact.summary.passed, true);
console.log("OK campaign=SUJ-10 expanded=7/8 coverage=9/10 changed=02-04,02-23 losses=0 dashboard-gap=retained passed=true");
