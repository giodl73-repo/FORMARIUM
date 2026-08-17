"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-31");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const html = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");

assert.equal(manifest.edition, "sim-31");
assert.equal(manifest.selection_checks.combined_projection_records, 175);
assert.equal(manifest.selection_checks.book_one_spine_records, 24);
assert.equal(manifest.selection_checks.book_one_specialized_depth_records, 151);
assert.equal(manifest.search_checks.indexed_records, 185);
assert.equal(manifest.search_checks.application_guides, 10);
assert.equal(manifest.search_checks.missing_rendered_targets, 0);
assert.equal(manifest.site_checks.source_pages, 217);
assert.equal(manifest.site_checks.indexed_entry_pages, 185);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.product_books, 2);
assert.equal(manifest.site_checks.tables_start_targets, 2);
assert.equal(manifest.site_checks.reader_start_targets, 2);
assert.equal(manifest.site_checks.product_authority,
  "Factorium Tables canonical; Reader and Factor Guides are linked projections");

const libraryOffset = html.indexOf('id="library"');
const readerOffset = html.indexOf('id="reader"');
const problemOffset = html.indexOf('id="problems"');
const searchOffset = html.indexOf('id="search"');
const contentsOffset = html.indexOf('id="contents"');
assert.ok(libraryOffset > -1 && readerOffset > libraryOffset);
assert.ok(problemOffset > readerOffset && searchOffset > readerOffset && contentsOffset > searchOffset);
assert.equal((html.match(/class="site-book-card /g) || []).length, 2);
assert.ok(html.indexOf('data-book="tables"') < html.indexOf('data-book="reader"'),
  "Tables must appear before Reader");
assert.match(html, /Primary reference · dictionary and thesaurus/);
assert.match(html, /Teaching companion · selected route/);
assert.match(html, /The Tables define and distinguish/);
assert.match(html, /The Reader teaches and demonstrates/);
assert.match(html, /Factor Guides apply selected Tables/);
assert.match(html, /Search the Tables/);
assert.match(html, /Browse the Tables/);
assert.match(html, /24-record teaching spine/);
assert.match(html, /151 additional canonical Tables/);
assert.match(html, /Rankings do not change authority/);

const tableCard = html.match(/<article[^>]+data-book="tables"[\s\S]*?<\/article>/)[0];
const readerCard = html.match(/<article[^>]+data-book="reader"[\s\S]*?<\/article>/)[0];
assert.equal((tableCard.match(/<a /g) || []).length, 2);
assert.equal((readerCard.match(/<a /g) || []).length, 2);
for (const href of ['href="#search"', 'href="#contents"', 'href="#reader"', 'href="#problems"']) {
  assert.ok(html.includes(href), `missing two-book route ${href}`);
}

const entryPages = fs.readdirSync(path.join(siteRoot, "entries")).filter((name) => name.endsWith(".html"));
assert.ok(entryPages.length > 0);
const sample = fs.readFileSync(path.join(siteRoot, "entries", entryPages[0]), "utf8");
assert.match(sample, /href="\.\.\/index\.html#library">Tables<\/a>/);
assert.match(sample, /href="\.\.\/index\.html#reader">Reader<\/a>/);
const searchRecords = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
assert.ok(searchRecords.some((record) => record.title === "The Factorium Reader Quickstart"));
assert.ok(!searchRecords.some((record) => record.title === "Book One Candidate Quickstart"));
const quickstartRecord = searchRecords.find((record) => record.title === "The Factorium Reader Quickstart");
const quickstartPage = fs.readFileSync(path.join(siteRoot, quickstartRecord.href), "utf8");
assert.match(quickstartPage, /The Factorium Reader Quickstart/);
assert.match(quickstartPage, /internal <code>sim-31<\/code> Reader projection/);
const search = require(path.resolve(
  __dirname,
  "../volumes/01-structure-quantity-choice/proof-set-search-candidate.js"
));
const ordinaryResults = search.searchRecords(
  searchRecords,
  "why did operation differ from the plan?",
  "",
  ""
).slice(0, 5);
assert.equal(ordinaryResults[0].title, "The Factorium Reader Quickstart");
assert.ok(ordinaryResults.some((record) => /Bounded-Question/.test(record.title)));

console.log(
  `OK edition=sim-31 books=2 tables=2 reader=2 canonical=175 search=185 pages=237 ` +
  `identity=${manifest.site_checks.identity}`
);
