"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "target", "proof-set-sim-51");
const read = (relative) => fs.readFileSync(path.join(site, relative), "utf8");
const manifest = JSON.parse(read("manifest.json"));

assert.equal(manifest.edition, "sim-51");
assert.match(manifest.status, /internal simulation/i);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.indexed_entry_pages, 191);
assert.equal(manifest.site_checks.chapter_pages, 20);

const home = read("index.html");
const tables = read("tables.html");
const reader = read("reader.html");
for (const html of [home, tables, reader]) {
  assert.match(html, /Tabula Facta/);
  assert.match(html, /identity preview/i);
  assert.match(html, /candidate name/i);
  assert.match(html, /not a locked rename/i);
}
assert.match(home, /<h3>Tabula Facta<\/h3>/);
assert.match(home, /<h3>The Factorium Reader<\/h3>/);
assert.match(tables, /<h1>Tabula Facta A-Z<\/h1>/);
assert.match(reader, /<h1>The Factorium Reader<\/h1>/);
assert.match(reader, /Factor Tables remain authoritative/);
assert.match(reader, /Factorium identities and source records are unchanged/);

const historicalHome = fs.readFileSync(path.join(root, "target", "proof-set-sim-50", "index.html"), "utf8");
assert.doesNotMatch(historicalHome, /Tabula Facta/);
assert.match(historicalHome, /<h1>Factorium<\/h1>/);
assert.ok(fs.existsSync(path.join(site, "entries", "tables-roots-purpose.html")));

console.log("OK sim51=Tabula-Facta-candidate reader=Factorium authority=Factor-Tables historical-sim50=unchanged missing=0");

