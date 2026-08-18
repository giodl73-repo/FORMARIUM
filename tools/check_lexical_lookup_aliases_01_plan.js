"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "lookup-alias-test-01.json"), "utf8"));
const baseline = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-46", "manifest.json"), "utf8"));
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "result-01.json"), "utf8"));

assert.equal(plan.status, "frozen-before-implementation");
assert.equal(plan.aliases.length, 5);
assert.equal(plan.aliases.reduce((count, item) => count + item.targets.length, 0), 7);
assert.deepEqual(plan.aliases.map((item) => item.query), [...plan.aliases.map((item) => item.query)].sort());
assert.equal(new Set(plan.aliases.flatMap((item) => item.targets)).size, 4);
assert.equal(plan.activation, "exact-normalized-query");
assert.equal(plan.ambiguous_aliases_show_all_targets, true);
assert.equal(plan.literal_ranking_unchanged, true);
assert.equal(plan.canonical_reference_unchanged, true);
assert.equal(plan.content_and_relations_unchanged, true);
assert.equal(plan.reader_evidence_claimed, false);
assert.equal(baseline.edition, plan.baseline.edition);
assert.equal(baseline.output.sha256, plan.baseline.standalone_sha256);
assert.equal(baseline.output.search_index_sha256, plan.baseline.search_index_sha256);
assert.equal(baseline.output.site_identity, plan.baseline.site_identity);
assert.deepEqual(result.decision.alias_candidates_for_separate_product_test.sort(), plan.aliases.map((item) => item.query).sort());
console.log("OK campaign=LXA-01 aliases=5 routes=7 targets=4 baseline=sim-46 canonical=false ranking=unchanged frozen=true");
