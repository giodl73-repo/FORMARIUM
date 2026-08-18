"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixture = (relative) => fs.readFileSync(path.join(root, relative));
const campaign = JSON.parse(fixture("fixtures/synthetic-users/campaign-11.json"));
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

assert.equal(campaign.campaign_id, "SUJ-11");
assert.equal(campaign.status, "frozen-before-holdout-execution");
assert.equal(campaign.candidate.k1, 1.2);
assert.equal(campaign.candidate.b, 0.75);
assert.equal(campaign.candidate.query_expansion, false);
assert.equal(campaign.candidate.aliases, false);
assert.equal(campaign.candidate.semantic_inference, false);
assert.equal(campaign.admission.default_replacement_allowed, false);
assert.equal(sha(fixture(campaign.development.campaign_path)), campaign.development.campaign_sha256);
assert.equal(sha(fixture(campaign.development.analysis_path)), campaign.development.analysis_sha256);
assert.equal(sha(fixture(campaign.holdout.campaign_path)), campaign.holdout.campaign_sha256);
assert.equal(sha(fixture(campaign.holdout.result_path)), campaign.holdout.result_sha256);
console.log("OK campaign=SUJ-11 development=25 holdout=48 bm25=1.2/0.75 default=preserved frozen=true");
