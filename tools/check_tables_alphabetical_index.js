"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-35");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const html = fs.readFileSync(path.join(siteRoot, "tables.html"), "utf8");

assert.equal(manifest.edition, "sim-35");
assert.equal(manifest.site_checks.tables_index_pages, 1);
assert.equal(manifest.site_checks.tables_index_canonical_families, 53);
assert.equal(manifest.site_checks.tables_index_curated_records, 27);
assert.equal(manifest.site_checks.tables_index_letters, 17);
assert.equal(manifest.site_checks.tables_index_owned_views, 95);
assert.equal(manifest.site_checks.tables_index_guides, 0);
assert.equal(manifest.site_checks.tables_index_reader_records, 0);
assert.equal(manifest.site_checks.tables_index_order,
  "normalized-selected-title");
assert.equal(manifest.site_checks.tables_index_semantics,
  "alphabetical-presentation-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const canonical = records.filter((record) => record.recordClass === "canonical-entry")
  .sort((left, right) =>
    left.title.toLowerCase().localeCompare(right.title.toLowerCase()) ||
    left.path.localeCompare(right.path));
const curated = records.filter((record) => record.recordClass === "curated-record")
  .sort((left, right) =>
    left.title.toLowerCase().localeCompare(right.title.toLowerCase()) ||
    left.path.localeCompare(right.path));
assert.equal(canonical.length, 53);
assert.equal(curated.length, 27);

const canonicalBlock = html.match(
  /<div class="tables-index__canonical">([\s\S]*?)<\/div>/
);
const curatedBlock = html.match(
  /<section class="tables-index__curated"[\s\S]*?<ol>([\s\S]*?)<\/ol>/
);
assert.ok(canonicalBlock && curatedBlock);
const pathsIn = (text) => [...text.matchAll(/data-index-path="([^"]+)"/g)]
  .map((match) => match[1]);
assert.deepEqual(pathsIn(canonicalBlock[1]), canonical.map((record) => record.path),
  "canonical entries are normalized-title ordered");
assert.deepEqual(pathsIn(curatedBlock[1]), curated.map((record) => record.path),
  "curated records are normalized-title ordered");
assert.equal(new Set([...pathsIn(canonicalBlock[1]), ...pathsIn(curatedBlock[1])]).size,
  80, "index membership is duplicate free");

const expectedLetters = [...new Set(canonical.map((record) =>
  record.title.match(/[A-Za-z0-9]/)[0].toUpperCase()))];
const letterLinks = [...html.matchAll(
  /<a href="#tables-index-letter-([a-z0-9])">([A-Z0-9])<\/a>/g
)];
assert.deepEqual(letterLinks.map((match) => match[2]), expectedLetters);
assert.equal(letterLinks.length, 17);
for (const letter of expectedLetters) {
  assert.match(html, new RegExp(`id="tables-index-letter-${letter.toLowerCase()}"`));
}

const forbidden = records.filter((record) =>
  ["specialized-view", "guide", "reader-record"].includes(record.recordClass));
for (const record of forbidden) {
  assert.ok(!pathsIn(html).includes(record.path),
    `forbidden top-level index member: ${record.path}`);
}

let ownedViews = 0;
for (const record of canonical) {
  const family = records.filter((candidate) =>
    candidate.familyKey === record.path &&
    candidate.recordClass === "specialized-view");
  ownedViews += family.length;
  const escapedPath = record.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(canonicalBlock[1], new RegExp(
    `data-index-path="${escapedPath}"[\\s\\S]*?${family.length} specialized view`
  ));
  assert.ok(fs.existsSync(path.join(siteRoot, record.href)),
    `canonical destination missing: ${record.path}`);
}
assert.equal(ownedViews, 95);

const home = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
assert.match(home, /href="tables\.html">Browse the Tables<\/a>/);
assert.match(home, />Book contents and guided use<\/h2>/);
const entry = records.find((record) => record.recordClass === "canonical-entry");
const entryHtml = fs.readFileSync(path.join(siteRoot, entry.href), "utf8");
assert.match(entryHtml, /href="\.\.\/tables\.html">Browse Tables<\/a>/);
assert.match(entryHtml, /href="\.\.\/tables\.html">Index<\/a>/);

console.log(
  `OK edition=sim-35 canonical=53 views=95 letters=17 curated=27 ` +
  `excluded=${forbidden.length} identity=${manifest.site_checks.identity}`
);
