"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "recognized-foothold-connections-baseline-09.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-09");
assert.equal(artifact.results.length, 10);
assert.equal(artifact.summary.eligible_assignments, artifact.results.filter((result) => result.eligible).length);
assert.equal(artifact.summary.deficient_assignments, artifact.results.filter((result) => result.base_below_two).length);
assert.equal(artifact.summary.expanded_deficient_assignments, artifact.results.filter((result) => result.deficient_task_gains_second).length);
assert.equal(artifact.summary.two_family_assignments_after_expansion, artifact.results.filter((result) => result.exposes_two_after_expansion).length);
for (const result of artifact.results) {
  assert.ok(result.first_ten_families.length <= 10, `${result.assignment_id} search limit`);
  assert.equal(result.routes.length, result.recognized_footholds.length, `${result.assignment_id} route count`);
  for (const route of result.routes) assert.ok(route.connections.length <= 6, `${result.assignment_id} preview limit`);
}
console.log(`OK campaign=SUJ-09 eligible=${artifact.summary.eligible_assignments}/10 expanded=${artifact.summary.expanded_deficient_assignments}/${artifact.summary.deficient_assignments} coverage=${artifact.summary.two_family_assignments_after_expansion}/10 admitted=${artifact.summary.admitted}`);
