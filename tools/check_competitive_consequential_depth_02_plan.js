"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "competitive-reference", "campaign-02.json"), "utf8"));
const captures = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "competitive-reference", "captures-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-48", "manifest.json"), "utf8"));

assert.equal(campaign.campaign_id, "CAD-02");
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.packets.length, 6);
assert.deepEqual(campaign.packets.map(({ query }) => query), ["force", "power", "value", "model", "system", "evidence"]);
assert.equal(Object.keys(campaign.binary_dimensions).length, 5);
assert.equal(campaign.capture_source.campaign, captures.campaign_id);
assert.equal(campaign.capture_source.immutable_replay, true);
assert.equal(campaign.capture_source.no_new_network_capture, true);
assert.equal(campaign.candidate.edition, manifest.edition);
assert.equal(campaign.candidate.source_commit, manifest.source_commit);
assert.equal(campaign.candidate.site_identity, manifest.site_checks.identity);
assert.equal(campaign.candidate.search_index_sha256, manifest.output.search_index_sha256);
assert.equal(campaign.weighted_aggregate_allowed, false);
assert.equal(campaign.reader_evidence_claimed, false);
assert.equal(campaign.market_evidence_claimed, false);

for (const { query } of campaign.packets) {
  const row = captures.queries.find(item => item.query === query);
  assert.ok(row, `missing retained capture: ${query}`);
  assert.ok(row.factorium?.available, `missing Factorium capture: ${query}`);
  assert.ok(row.merriam_webster_thesaurus?.available, `missing MW capture: ${query}`);
}

console.log(`OK campaign=${campaign.campaign_id} packets=6 products=2 dimensions=5 edition=${manifest.edition} immutable=true`);
