"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const candidateRoot = path.resolve(process.argv[2] || "target/proof-set-sim-47");
const baselineRoot = path.resolve(process.argv[3] || "target/proof-set-sim-46");
const plan = JSON.parse(fs.readFileSync(path.join(workspace, "fixtures", "lexical-closure", "lookup-alias-test-01.json"), "utf8"));
const aliases = require(path.join(workspace, "volumes", "01-structure-quantity-choice", "proof-set-lookup-aliases.js"));
const search = require(path.join(workspace, "volumes", "01-structure-quantity-choice", "proof-set-search-families.js"));
const manifest = JSON.parse(fs.readFileSync(path.join(candidateRoot, "manifest.json"), "utf8"));
const candidateBytes = fs.readFileSync(path.join(candidateRoot, "search-index.json"));
const baselineBytes = fs.readFileSync(path.join(baselineRoot, "search-index.json"));
const records = JSON.parse(candidateBytes.toString("utf8"));
const baselineRecords = JSON.parse(baselineBytes.toString("utf8"));

assert.equal(manifest.edition, plan.candidate_edition);
assert.equal(crypto.createHash("sha256").update(candidateBytes).digest("hex"), plan.baseline.search_index_sha256);
assert.deepEqual(candidateBytes, baselineBytes, "search index remains byte-identical to sim-46");
for (const item of plan.aliases) {
  const routes = aliases.routesForQuery(item.query, records);
  assert.deepEqual(routes.map((route) => route.path), item.targets, `${item.query} exact routes`);
  assert.deepEqual(
    search.searchRecords(records, item.query, "", "").map((record) => record.path),
    search.searchRecords(baselineRecords, item.query, "", "").map((record) => record.path),
    `${item.query} complete literal ranking remains unchanged`
  );
}
for (const query of ["", "electric powers", "the force field", "reference frame", "organizations", "organisation chart"]) {
  assert.equal(aliases.routesForQuery(query, records), null, `${query || "empty"} does not activate`);
}
assert.deepEqual(manifest.search_checks.lookup_alias_phrases, plan.aliases.map((item) => item.query));
assert.equal(manifest.search_checks.lookup_alias_routes, 7);
assert.deepEqual(manifest.search_checks.lookup_alias_targets.sort(), [...new Set(plan.aliases.flatMap((item) => item.targets))].sort());
assert.equal(manifest.search_checks.lookup_alias_semantics, "language-route-to-existing-owner-not-equivalence-or-closure");
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.workspace_dirty_at_render, false);
console.log(`OK edition=${manifest.edition} aliases=5 routes=7 targets=4 ranking=unchanged missing=0 identity=${manifest.site_checks.identity}`);

