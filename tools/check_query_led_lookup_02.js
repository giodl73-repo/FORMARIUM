"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const campaign = readJson("campaign-02.json");
const outputPath = path.join(fixtureRoot, "baseline-lookups-02.json");
const outputBytes = fs.readFileSync(outputPath);
const output = JSON.parse(outputBytes.toString("utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-42", "search-index.json"), "utf8"));
const paths = new Set(index.map((record) => record.path));
const digest = crypto.createHash("sha256").update(outputBytes).digest("hex");

assert.equal(digest, "92d058de1b8e2bb0809b96d381b80cdddfaf2cecfae3de6664f09f67798294cb");
assert.equal(output.campaign_id, campaign.campaign_id);
assert.equal(output.campaign_revision, campaign.revision);
assert.equal(output.evidence_class, "internal-authored-rehearsal");
assert.equal(output.executed_against.edition, "sim-42");
assert.equal(output.executed_against.source_commit, campaign.baseline_source_commit);
assert.equal(output.executed_against.site_identity, campaign.baseline_site_identity);
assert.equal(output.executed_against.search_index_sha256, campaign.baseline_search_index_sha256);
assert.equal(output.executed_against.search_records, 185);
assert.equal(output.lookups.length, 24);

const campaignIds = campaign.packets.map((packet) => packet.id);
assert.deepEqual(output.lookups.map((lookup) => lookup.packet_id), campaignIds);
for (const lookup of output.lookups) {
  assert.equal(lookup.queries.length, 2, `${lookup.packet_id} query count`);
  for (const query of lookup.queries) {
    assert.ok(query.query.length > 0, `${lookup.packet_id} query text`);
    assert.ok(query.match_count >= query.first_five.length, `${lookup.packet_id} match count`);
    assert.ok(query.first_five.length <= 5, `${lookup.packet_id} first-five bound`);
    query.first_five.forEach((record) =>
      assert.ok(paths.has(record.path), `${lookup.packet_id} result path is in sim-42`));
  }
}

for (const prohibited of [
  "reader_success", "reader_time", "comprehension", "confidence",
  "preference", "usefulness", "return_intent", "simulated_success_rate"
]) {
  assert.ok(!outputBytes.toString("utf8").includes(`"${prohibited}"`),
    `lookup output contains prohibited measure ${prohibited}`);
}

console.log(`OK campaign=QLD-02 lookups=24 queries=48 records=185 digest=${digest}`);

