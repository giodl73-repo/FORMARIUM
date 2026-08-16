"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-guide.js"), "utf8");
const sourceRuntime = fs.readFileSync(path.resolve(
  "volumes/01-structure-quantity-choice/proof-set-composition-guide.js"), "utf8");

assert.ok(Number(manifest.edition.replace("sim-", "")) >= 28,
  "guide skeleton is retained from sim-28 onward");
assert.equal(manifest.status,
  "internal simulation rendering; not reader evidence or preview-01");
assert.deepEqual(manifest.composition_guide_skeleton_checks, {
  schema: "factorium-composition-guide-skeleton-v0",
  projection_input: "identified local result plus digest-bound lab and reading payloads",
  placement: "after closure map and before canonical reading route",
  required_missing_work_records: 8,
  check_outcomes: "unresolved-only",
  profiles: ["compact", "abbreviated", "book", "full"],
  default_profile: "book",
  identity: "inherits local result SHA-256",
  canonical_guide: false,
  recommendation: false,
  storage: "none",
  specification: "specs/COMPOSITION-GUIDE-SKELETON.md"
});
assert.equal(manifest.site_checks.composition_guide_skeleton_pages, 1);
assert.equal(manifest.site_checks.composition_guide_missing_work_records, 8);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.ok(manifest.search_checks.indexed_records >= 129,
  "guide contract does not become a canonical search destination");
assert.ok(manifest.source_count >= 156, "guide contract is retained as a supporting source");

assert.match(page, /Read the guide-skeleton contract/);
assert.match(page, /<script src="assets\/composition-guide\.js"><\/script>/);
assert.ok(page.indexOf('src="assets/composition-map.js"') <
  page.indexOf('src="assets/composition-guide.js"'), "map hook loads before guide hook");
assert.ok(page.indexOf('src="assets/composition-rerun-comparison.js"') <
  page.indexOf('src="assets/composition-guide.js"'), "guide wraps the complete sim-27 runtime");
assert.equal(runtime, sourceRuntime, "generated guide runtime matches reviewed source");
assert.match(runtime, /factorium-composition-guide-skeleton-v0/);
assert.match(runtime, /8 requirements missing/);
assert.match(runtime, /rejects substantive check outcomes/);
assert.match(css, /\.composition-guide-skeleton/);
assert.match(css, /\.guide-skeleton__missing/);
assert.match(css, /\.guide-skeleton__boundary-list/);

const guideSource = manifest.sources.find((source) =>
  source.path === "specs/COMPOSITION-GUIDE-SKELETON.md");
assert.ok(guideSource && /^[a-f0-9]{64}$/.test(guideSource.sha256),
  "manifest retains exact guide contract source");
assert.ok(manifest.site_assets.some((asset) => asset.path === "assets/composition-guide.js"),
  "site manifest retains the guide runtime");

console.log(`OK edition=${manifest.edition} sources=${manifest.source_count} ` +
  `missing=${manifest.composition_guide_skeleton_checks.required_missing_work_records}`);
