"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-32");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));

assert.equal(manifest.edition, "sim-32");
assert.equal(manifest.selection_checks.combined_projection_records, 175);
assert.equal(manifest.site_checks.table_navigator_pages, 175);
assert.equal(manifest.site_checks.table_canonical_entry_pages, 53);
assert.equal(manifest.site_checks.table_specialized_view_pages, 95);
assert.equal(manifest.site_checks.table_curated_record_pages, 27);
assert.equal(manifest.site_checks.table_owner_links, 95);
assert.equal(manifest.site_checks.table_contrast_routes, 47);
assert.equal(manifest.site_checks.table_cross_reference_routes, 63);
assert.equal(manifest.site_checks.table_authored_connections, 399);
assert.equal(manifest.site_checks.table_connection_preview_links, 345);
assert.equal(manifest.site_checks.table_connection_semantics,
  "authored-untyped-navigation-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const tableRecords = records.filter((record) => record.path.startsWith("tables/"));
assert.equal(tableRecords.length, 175);
let navigators = 0;
let ownerLinks = 0;
let contrastRoutes = 0;
let crossReferenceRoutes = 0;
let previewLinks = 0;
for (const record of tableRecords) {
  const html = fs.readFileSync(path.join(siteRoot, record.href), "utf8");
  assert.equal((html.match(/class="table-navigator"/g) || []).length, 1,
    `navigator count drift: ${record.path}`);
  assert.match(html, /href="\.\.\/index\.html#search">Search Tables<\/a>/);
  assert.match(html, /href="\.\.\/index\.html#contents">Browse Tables<\/a>/);
  assert.match(html, /Authored connections are navigation, not synonym, broader\/narrower, equivalence, dependency, or closure claims\./);
  assert.ok(html.indexOf('class="table-navigator"') < html.indexOf("<h1"),
    `navigator must precede source content: ${record.path}`);
  navigators += 1;
  ownerLinks += (html.match(/class="table-navigator__owner"/g) || []).length;
  contrastRoutes += (html.match(/>Compare nearby terms<\/a>/g) || []).length;
  crossReferenceRoutes += (html.match(/>All cross-references \(\d+\)<\/a>/g) || []).length;
  const connectionBlock = html.match(/<div class="table-navigator__connections">([\s\S]*?)<\/div>/);
  if (connectionBlock) previewLinks += (connectionBlock[1].match(/<li><a /g) || []).length;
}
assert.equal(navigators, 175);
assert.equal(ownerLinks, 95);
assert.equal(contrastRoutes, 47);
assert.equal(crossReferenceRoutes, 63);
assert.equal(previewLinks, 345);

for (const record of records.filter((item) => !item.path.startsWith("tables/"))) {
  const html = fs.readFileSync(path.join(siteRoot, record.href), "utf8");
  assert.ok(!html.includes('class="table-navigator"'),
    `non-Table received navigator: ${record.path}`);
}

const entry = records.find((record) => record.path ===
  "tables/entries/amount-concentration-composition.md");
const entryHtml = fs.readFileSync(path.join(siteRoot, entry.href), "utf8");
assert.match(entryHtml, /data-table-class="Canonical entry"/);
assert.match(entryHtml, />Compare nearby terms<\/a>/);
assert.match(entryHtml, />All cross-references \(9\)<\/a>/);
const entryConnections = entryHtml.match(/<div class="table-navigator__connections">([\s\S]*?)<\/div>/);
assert.ok(entryConnections);
assert.equal((entryConnections[1].match(/<li><a /g) || []).length, 6);

const view = records.find((record) => record.path ===
  "tables/constraints/evaluation-threshold-acceptance.md");
const viewHtml = fs.readFileSync(path.join(siteRoot, view.href), "utf8");
assert.match(viewHtml, /data-table-class="Specialized constraint view"/);
assert.match(viewHtml,
  /class="table-navigator__owner" href="tables-entries-evaluation-measure-scale-criterion\.html"><span>Owning Table<\/span>Evaluation Measure, Scale, Criterion, and Score<\/a>/);

console.log(
  `OK edition=sim-32 navigators=175 entries=53 views=95 curated=27 owners=95 ` +
  `contrast=47 crossrefs=63 connections=399 preview=345 identity=${manifest.site_checks.identity}`
);
