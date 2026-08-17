"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const read = (name) => fs.readFileSync(path.join(fixtureRoot, name));
const json = (name) => JSON.parse(read(name).toString("utf8"));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

const campaign = json("campaign-02.json");
const contract = json("result-contract-02.json");
const lookups = json("baseline-lookups-02.json");
const analysis = json("baseline-analysis-02.json");
const baselineBytes = read("baseline-results-02.json");
const baseline = JSON.parse(baselineBytes.toString("utf8"));

assert.equal(sha256(read("baseline-lookups-02.json")), "92d058de1b8e2bb0809b96d381b80cdddfaf2cecfae3de6664f09f67798294cb");
assert.equal(campaign.status, "frozen-before-baseline");
assert.equal(baseline.campaign_id, "QLD-02");
assert.equal(baseline.result_contract, "QLD-RC-02");
assert.equal(baseline.baseline_custody.edition, "sim-42");
assert.equal(baseline.baseline_custody.source_commit, campaign.baseline_source_commit);
assert.equal(baseline.baseline_custody.site_identity, campaign.baseline_site_identity);
assert.equal(baseline.baseline_custody.search_index_sha256, campaign.baseline_search_index_sha256);
assert.equal(Object.keys(analysis.entries).length, 24);
assert.equal(baseline.results.length, 24);
assert.deepEqual(baseline.results.map((result) => result.packet_id), campaign.packets.map((packet) => packet.id));
assert.equal(lookups.lookups.reduce((sum, lookup) => sum + lookup.queries.length, 0), 48);

for (const result of baseline.results) {
  for (const field of contract.required_result_fields) assert.ok(Object.hasOwn(result, field), `${result.packet_id} missing ${field}`);
  assert.ok(contract.closure_states.includes(result.closure_state), `${result.packet_id} closure`);
  assert.ok(contract.packet_dispositions.includes(result.packet_disposition), `${result.packet_id} disposition`);
  for (const gap of result.gaps) {
    assert.ok(Object.hasOwn(contract.gap_codes, gap.code), `${result.packet_id} gap code`);
    assert.ok(contract.gap_dispositions.includes(gap.disposition), `${result.packet_id} gap disposition`);
  }
  for (const measure of contract.prohibited_measures) {
    assert.ok(!Object.hasOwn(result.mechanical_observations, measure), `${result.packet_id} contains ${measure}`);
  }
}

assert.deepEqual(baseline.summary.closure_states, { complete: 10, incomplete: 14, contradictory: 0, truncated: 0 });
assert.equal(baseline.summary.gap_codes["QG-0"], 20);
assert.equal(baseline.summary.gap_codes["QG-1"], 1);
assert.equal(baseline.summary.gap_codes["QG-3"], 2);
assert.equal(baseline.summary.gap_codes["QG-4"], 0);
assert.equal(baseline.summary.gap_codes["QG-5"], 0);
assert.equal(baseline.summary.gap_codes["QG-6"], 1);
assert.equal(baseline.summary.gap_codes["QG-7"], 1);
assert.equal(baseline.summary.manual_concepts, 4);

const gaps = baseline.results.flatMap((result) => result.gaps);
assert.equal(gaps.filter((gap) => gap.disposition === "repair").length, 0);
assert.equal(gaps.filter((gap) => gap.disposition === "defer").length, 3);
assert.equal(gaps.filter((gap) => gap.disposition === "external").length, 1);
assert.equal(gaps.filter((gap) => gap.disposition === "no-change").length, 21);

console.log(
  `OK campaign=QLD-02 results=24 queries=48 complete=10 incomplete=14 ` +
  `qg0=20 qg1=1 qg3=2 qg6=1 qg7=1 manual=4 digest=${sha256(baselineBytes)}`,
);
