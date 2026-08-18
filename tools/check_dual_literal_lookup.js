"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-45");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "assets", "dual-lookup.js"), "utf8");

assert.equal(manifest.edition, "sim-45");
assert.equal(manifest.site_checks.dual_lookup_pages, 1);
assert.equal(manifest.site_checks.dual_lookup_query_panels, 2);
assert.equal(manifest.site_checks.dual_lookup_family_limit_per_query, 10);
assert.equal(manifest.site_checks.dual_lookup_rankings, "independent-existing-order");
assert.equal(manifest.site_checks.dual_lookup_comparison, "canonical-family-identity-only");
assert.equal(manifest.site_checks.dual_lookup_merged_ranking, false);
assert.equal(manifest.site_checks.dual_lookup_semantic_decomposition, false);
assert.equal(manifest.site_checks.dual_lookup_storage, "none");
assert.equal(manifest.site_checks.dual_lookup_network, "none");
assert.equal(manifest.site_checks.dual_lookup_authority_change, false);
assert.equal((html.match(/id="compare-searches"/g) || []).length, 1);
assert.equal((html.match(/id="dual-lookup-query-(?:one|two)"/g) || []).length, 2);
assert.match(html, /not a merged ranking/);
assert.match(html, /assets\/dual-lookup\.js/);
assert.match(script, /slice\(0, 10\)/);
assert.match(script, /FactoriumSearchFamilies/);
for (const prohibited of ["localStorage", "sessionStorage", "fetch(", "XMLHttpRequest", "document.cookie", "history.", "URLSearchParams"]) assert.ok(!script.includes(prohibited));

console.log("OK edition=sim-45 dual-lookup=1 panels=2 limit=10 merged-ranking=false semantics=false storage=none authority=unchanged");
