"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const candidateRoot = path.resolve(process.argv[2] || "target/proof-set-sim-48");
const baselineRoot = path.resolve(process.argv[3] || "target/proof-set-sim-47");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "scale-meaning-chooser-01.json"), "utf8"));
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "scale-meaning-chooser-result-01.json"), "utf8"));
const chooser = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-scale-chooser.js"));
const search = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-search-families.js"));
const manifest = JSON.parse(fs.readFileSync(path.join(candidateRoot, "manifest.json"), "utf8"));
const candidateBytes = fs.readFileSync(path.join(candidateRoot, "search-index.json"));
const baselineBytes = fs.readFileSync(path.join(baselineRoot, "search-index.json"));
const records = JSON.parse(candidateBytes.toString("utf8"));
const baseline = JSON.parse(baselineBytes.toString("utf8"));

assert.equal(manifest.edition, plan.candidate_edition);
assert.equal(result.edition, manifest.edition);
assert.equal(result.source_commit, manifest.source_commit);
assert.equal(result.search_records, manifest.search_checks.indexed_records);
assert.equal(result.generated_pages, manifest.site_checks.handoff_note_pages);
assert.equal(result.missing_targets, manifest.site_checks.missing_local_targets);
assert.equal(result.search_index_sha256, manifest.output.search_index_sha256);
assert.equal(result.standalone_sha256, manifest.output.sha256);
assert.equal(result.site_identity, manifest.site_checks.identity);
assert.equal(result.literal_ranking_unchanged, true);
assert.equal(result.canonical_reference_changed, false);
assert.equal(result.content_or_relations_changed, false);
assert.equal(result.reader_evidence_claimed, false);
assert.equal(result.competitive_evidence_claimed, false);
assert.deepEqual(candidateBytes, baselineBytes);
const routes = chooser.routesForQuery("  SCALE  ", records);
assert.deepEqual(routes.map((route) => ({ label: route.label, target: route.path })), plan.routes);
for (const query of ["", "scales", "scale factor", "temperature scale", "evaluation scale"]) assert.equal(chooser.routesForQuery(query, records), null, query || "empty");
for (const query of ["scale", "scales", "scale factor", "temperature scale"]) {
  assert.deepEqual(search.searchRecords(records, query, "", "").map((record) => record.path), search.searchRecords(baseline, query, "", "").map((record) => record.path), query);
}
assert.equal(manifest.search_checks.scale_chooser_query, "scale");
assert.equal(manifest.search_checks.scale_chooser_routes, 3);
assert.deepEqual(manifest.search_checks.scale_chooser_targets, plan.routes.map((route) => route.target));
assert.equal(manifest.search_checks.scale_chooser_semantics, "explicit-meaning-choice-not-classification-or-equivalence");
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.workspace_dirty_at_render, false);
console.log(`OK edition=${manifest.edition} query=scale routes=3 ranking=unchanged missing=0 identity=${manifest.site_checks.identity}`);
