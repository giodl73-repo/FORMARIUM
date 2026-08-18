"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const campaign = read("campaign-03.json");
const output = read("results-03.json");

assert.equal(output.campaign_id, "SUJ-03");
assert.equal(output.custody.frozen_commit, "f40803e");
assert.equal(output.custody.campaign_sha256, sha("campaign-03.json"));
assert.equal(output.custody.analysis_sha256, sha("analysis-03.json"));
assert.equal(output.results.length, 25);
assert.equal(output.summary.authored_response_fields, 300);
assert.equal(output.summary.participant_responses, 0);
assert.deepEqual(output.summary.entrance, { "have-question": 10, "know-term": 12, "learn-or-explore": 3 });
assert.deepEqual(output.summary.density, { abbreviated: 8, book: 9, compact: 4, full: 4 });
assert.equal(output.summary.admitted_batch, "homepage-intent-router-only");
assert.ok(output.summary.deferred.includes("status-language-search-repair"));

for (const result of output.results) {
  assert.match(result.evidence_label, /authored/i);
  assert.match(result.claim_boundary, /does not report/i);
  assert.equal(Object.keys(result.authored_response).length, 14);
  assert.ok(campaign.questions[0].values.includes(result.authored_response.entrance));
}

const serialized = JSON.stringify(output);
for (const prohibited of campaign.prohibited_claims) {
  assert.ok(!serialized.includes(`\"${prohibited}\":`), `prohibited measured claim key: ${prohibited}`);
}

console.log("OK campaign=SUJ-03 results=25 authored-fields=300 entrances=12-term+10-question+3-learn admitted=router-only participants=0");
