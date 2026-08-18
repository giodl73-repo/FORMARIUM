"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const contract = read("result-contract-04.json");
const output = read("results-04.json");
const rerun = read("repair-rerun-04-sim-44.json");

assert.equal(output.results.length, 25);
assert.equal(output.custody.frozen_commit, "87d3daa");
assert.equal(output.custody.campaign_sha256, sha("campaign-04.json"));
assert.equal(output.custody.contract_sha256, sha("result-contract-04.json"));
assert.equal(output.custody.browser_sha256, sha("browser-routes-04.json"));
assert.equal(output.custody.analysis_sha256, sha("analysis-04.json"));
assert.deepEqual(output.summary.route_state, { "destination-reached": 15, "entrance-only": 10, "route-broken": 0 });
assert.deepEqual(output.summary.by_entrance, { "know-term": { assignments: 12, reached: 12 }, "have-question": { assignments: 10, reached: 3 }, "learn-or-explore": { assignments: 3, reached: 0 } });
assert.equal(output.summary.original_task_visible, 0);
assert.equal(output.summary.explicit_handoff_package, 0);
assert.equal(output.summary.viewport_overflow, 0);
assert.equal(output.summary.hypotheses.intended_route_falsified, true);
assert.equal(output.summary.hypotheses.behavioral_hypothesis_tested, false);
assert.equal(output.summary.owner_test.affected_assignments, 25);
assert.equal(output.summary.owner_test.affected_entrances, 3);
assert.equal(output.summary.owner_test.admitted, true);
assert.equal(rerun.repair_build.edition, "sim-44");
assert.equal(rerun.traces.length, 25);
assert.equal(rerun.traces.filter((trace) => trace.route_state === "destination-reached").length, 15);
assert.equal(rerun.traces.filter((trace) => trace.route_state === "entrance-only").length, 10);
assert.equal(rerun.traces.filter((trace) => trace.original_task_visible).length, 0);
assert.equal(rerun.traces.filter((trace) => trace.explicit_handoff_package).length, 25);
assert.equal(rerun.traces.filter((trace) => trace.viewport_overflow).length, 0);

for (const result of output.results) {
  for (const field of [...contract.required_mechanical_fields, ...contract.required_authored_fields]) assert.ok(Object.hasOwn(result, field));
  assert.ok(contract.change_dispositions.includes(result.change_disposition));
  assert.match(result.claim_boundary, /Mechanical fields/);
}
const serialized = JSON.stringify(output);
for (const prohibited of contract.prohibited_measure_keys) assert.ok(!serialized.includes(`\"${prohibited}\":`));

console.log("OK campaign=SUJ-04 baseline-handoff=0 rerun-handoff=25 reached=15 task-visible=0 overflow=0 repair=ephemeral-handoff-note");
