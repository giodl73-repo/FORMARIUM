"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "campaign-01.json"), "utf8"));
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "result-01.json"), "utf8"));
const screenBytes = fs.readFileSync(path.join(root, result.screen_path));
const screen = JSON.parse(screenBytes.toString("utf8"));
const allowed = new Set(campaign.dispositions);

assert.equal(result.status, "complete");
assert.equal(crypto.createHash("sha256").update(screenBytes).digest("hex"), result.screen_sha256);
assert.equal(result.coverage.entries_processed, campaign.reference.entries);
assert.equal(result.coverage.senses_processed, campaign.reference.senses);
assert.equal(result.dispositions.length, result.coverage.recurring_review_candidates);
assert.equal(new Set(result.dispositions.map((item) => item.label)).size, result.dispositions.length);
assert.ok(result.dispositions.every((item) => allowed.has(item.disposition) && item.reason.length > 0));
assert.equal(Object.values(result.disposition_counts).reduce((a, b) => a + b, 0), result.dispositions.length);
assert.equal(result.disposition_method.high_signal_candidates_manually_reviewed, result.coverage.recurring_high_signal_remainder);
assert.equal(result.disposition_method.automatic_admission, false);
assert.equal(result.decision.owner_level_content_gap_admitted, false);
assert.equal(result.decision.new_anchor_batch, false);
assert.equal(result.decision.new_view_batch, false);
assert.equal(result.decision.maintained_edition, "sim-46");
assert.equal(screen.sense_results.length, campaign.reference.senses);
assert.equal(screen.recurring_candidates.length, result.dispositions.length);
console.log(`OK campaign=LXC-01 entries=${result.coverage.entries_processed} senses=${result.coverage.senses_processed} matched=${result.coverage.senses_with_exact_noun_match} candidates=${result.dispositions.length} content-gap=false edition=sim-46`);
