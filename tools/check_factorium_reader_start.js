"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-38");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const reader = fs.readFileSync(path.join(siteRoot, "reader.html"), "utf8");

assert.equal(manifest.edition, "sim-38");
assert.equal(manifest.site_checks.reader_primary_start_links, 1);
assert.equal(manifest.site_checks.reader_optional_quickstart_links, 1);
assert.equal(manifest.site_checks.reader_primary_start_position, 1);
assert.equal(manifest.site_checks.reader_primary_start_path, "tables/roots/purpose.md");
assert.equal(manifest.site_checks.reader_primary_start_state, "none");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const purpose = records.find((record) => record.path === "tables/roots/purpose.md");
assert.ok(purpose);
const actions = reader.match(/<div class="reader-route__actions">([\s\S]*?)<\/div>/)[1];
const links = [...actions.matchAll(/<a(?: class="([^"]+)")?(?: data-reader-start="([^"]+)")? href="([^"]+)">([^<]+)<\/a>/g)];
assert.equal(links.length, 5);
assert.deepEqual(links.map((link) => link[4]), [
  "Begin with Purpose", "Read the quickstart", "Read the complete method",
  "Try worked questions", "Browse Tables A-Z",
]);
assert.equal(links[0][1], "reader-route__primary");
assert.equal(links[0][2], "sequence");
assert.equal(links[0][3], purpose.href);
assert.equal(links[1][2], "quickstart");
assert.match(links[1][3], /book-one-sim-quickstart\.html$/);
assert.ok(fs.existsSync(path.join(siteRoot, links[0][3])));
assert.ok(fs.existsSync(path.join(siteRoot, links[1][3])));

const purposeHtml = fs.readFileSync(path.join(siteRoot, purpose.href), "utf8");
assert.match(purposeHtml, /class="reader-sequence"[^>]*data-reader-step="1"/);
assert.match(purposeHtml, /The Factorium Reader · Step 1 of 24/);

console.log(`OK edition=sim-38 primary=${purpose.path} optional=quickstart ` +
  `identity=${manifest.site_checks.identity}`);
