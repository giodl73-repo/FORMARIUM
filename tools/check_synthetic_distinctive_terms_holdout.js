"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-11.json"), "utf8"));
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "distinctive-terms-holdout-11.json"), "utf8"));
const summary = artifact.summary;

assert.equal(artifact.campaign_id, "SUJ-11");
assert.equal(artifact.custody.frozen_commit, "6597980");
assert.equal(summary.development_attempts, 25);
assert.equal(summary.holdout_attempts, campaign.holdout.query_attempts);
assert.equal(summary.development_dashboard_candidate_hit, true);
assert.equal(summary.development_current_hits, 16);
assert.equal(summary.development_candidate_hits, 19);
assert.equal(summary.holdout_current_hits, 44);
assert.equal(summary.holdout_candidate_hits, 45);
assert.equal(summary.holdout_candidate_only_gains, 3);
assert.equal(summary.holdout_current_only_losses, 2);
assert.equal(summary.holdout_net_gain, 1);
assert.equal(summary.holdout_dashboard_candidate_hit, false);
assert.ok(summary.holdout_candidate_only_gains < campaign.admission.minimum_holdout_candidate_only_gains);
assert.ok(summary.holdout_net_gain < campaign.admission.minimum_holdout_net_gain_over_losses);
assert.ok(summary.holdout_current_only_losses <= campaign.admission.maximum_holdout_current_only_losses);
assert.equal(summary.passed, false);
console.log(`OK campaign=SUJ-11 holdout=${summary.holdout_current_hits}->${summary.holdout_candidate_hits}/48 gains=${summary.holdout_candidate_only_gains} losses=${summary.holdout_current_only_losses} net=${summary.holdout_net_gain} dashboard=fail null=retained`);
