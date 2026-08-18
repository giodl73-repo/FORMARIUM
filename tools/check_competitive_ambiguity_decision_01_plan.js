"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "competitive-reference", "campaign-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-48", "manifest.json"), "utf8"));

assert.equal(plan.campaign_id, "CAD-01");
assert.equal(plan.status, "frozen-before-execution");
assert.equal(plan.queries.length, 12);
assert.equal(new Set(plan.queries).size, 12);
assert.equal(plan.comparators.length, 5);
assert.equal(plan.binary_dimensions.length, 9);
assert.equal(plan.candidate.edition, manifest.edition);
assert.equal(plan.candidate.source_commit, manifest.source_commit);
assert.equal(plan.candidate.site_identity, manifest.site_checks.identity);
assert.equal(plan.candidate.search_index_sha256, manifest.output.search_index_sha256);
assert.equal(plan.capture.maximum_result_opens, 2);
assert.equal(plan.capture.no_query_rewriting, true);
assert.equal(plan.capture.no_candidate_tuning, true);
assert.equal(plan.reader_evidence_claimed, false);
assert.equal(plan.market_evidence_claimed, false);
console.log(`OK campaign=${plan.campaign_id} queries=12 comparators=5 dimensions=9 edition=${manifest.edition} frozen=true`);
