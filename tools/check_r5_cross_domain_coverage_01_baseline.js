"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const load = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const freeze = load("fixtures/coverage/r5-cross-domain-coverage-01.json");
const baseline = load("fixtures/coverage/r5-cross-domain-coverage-01-baseline.json");
assert.equal(baseline.results.length, 24);
assert.deepEqual(baseline.results.map((r) => r.packet), freeze.packets.map((p) => p.id));
assert.deepEqual(baseline.summary.states, { complete: 10, incomplete: 14, contradictory: 0, truncated: 0 });
assert.deepEqual(baseline.summary.qg, { "QG-0": 15, "QG-3": 2, "QG-6": 3, "QG-7": 3, "QG-8": 1 });
assert.deepEqual(baseline.summary.dispositions, { "no-change": 18, external: 3, research: 2, defer: 1 });
for (const result of baseline.results) {
  assert.ok(result.route.length >= 2, `${result.packet} route`);
  assert.ok(["complete", "incomplete", "contradictory", "truncated"].includes(result.state));
  assert.match(result.qg, /^QG-[0-9]$/);
  assert.ok(result.reason.length > 60, `${result.packet} reason`);
}
const candidates = baseline.results.filter((r) => r.key === "economic-income-use-stock-boundary");
assert.deepEqual(candidates.map((r) => r.packet), ["R5C-01-19", "R5C-01-21"]);
assert.ok(candidates.every((r) => r.qg === "QG-3" && r.disposition === "research"));
assert.match(baseline.summary.candidate_owner_test_next, /no-new-sense specialized view/i);
assert.equal(baseline.reader_evidence_claimed, false);
assert.equal(baseline.domain_completeness_claimed, false);
console.log("OK campaign=R5C-01 packets=24 complete=10 incomplete=14 qg=15/2/3/3/1 candidate=economic-income-use-stock-boundary admission=research-only");
