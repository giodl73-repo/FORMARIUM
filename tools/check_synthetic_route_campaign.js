"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-02.json"), "utf8"));
const profiles = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-01.json"), "utf8"));
const contract = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "result-contract-02.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-42", "manifest.json"), "utf8"));
const indexBytes = fs.readFileSync(path.join(root, "target", "proof-set-sim-42", "search-index.json"));
const digest = crypto.createHash("sha256").update(indexBytes).digest("hex");

assert.equal(campaign.campaign_id, "SUJ-02");
assert.equal(campaign.revision, 1);
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.baseline_edition, "sim-42");
assert.equal(campaign.baseline_source_commit, manifest.source_commit);
assert.equal(campaign.baseline_site_identity, manifest.output.site_identity);
assert.equal(campaign.baseline_search_index_sha256, digest);
assert.equal(campaign.prompts.length, 25);
assert.equal(contract.contract_id, "SUJ-RC-02");
assert.equal(contract.status, "frozen-before-execution");
assert.equal(contract.required_result_fields.length, 20);

const profileIds = new Set(profiles.personas.map((profile) => profile.id));
const promptIds = new Set();
const linkedProfiles = new Set();
const takeawayCounts = {};
for (const [index, prompt] of campaign.prompts.entries()) {
  assert.equal(prompt.id, `SUJ-02-${String(index + 1).padStart(2, "0")}`);
  assert.ok(!promptIds.has(prompt.id)); promptIds.add(prompt.id);
  assert.ok(profileIds.has(prompt.profile_id));
  assert.ok(!linkedProfiles.has(prompt.profile_id)); linkedProfiles.add(prompt.profile_id);
  assert.ok(["orient", "distinguish", "explain", "decide-or-check", "trace-or-compose"].includes(prompt.takeaway));
  assert.equal(prompt.queries.length, 2);
  assert.ok(prompt.prompt.endsWith("?"));
  takeawayCounts[prompt.takeaway] = (takeawayCounts[prompt.takeaway] || 0) + 1;
}
assert.equal(linkedProfiles.size, 25);
assert.deepEqual(takeawayCounts, { orient: 5, explain: 5, "trace-or-compose": 5, distinguish: 5, "decide-or-check": 5 });
assert.equal(campaign.prompts.reduce((sum, prompt) => sum + prompt.queries.length, 0), 50);

console.log("OK campaign=SUJ-02 profiles=25 prompts=25 queries=50 takeaways=5x5 baseline=sim-42");
