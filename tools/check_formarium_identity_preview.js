"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "target", "proof-set-sim-65");
const read = (relative) => fs.readFileSync(path.join(site, relative), "utf8");
const manifest = JSON.parse(read("manifest.json"));

assert.equal(manifest.edition, "sim-65");
assert.match(manifest.status, /internal simulation/i);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.indexed_entry_pages, 191);
assert.equal(manifest.site_checks.chapter_pages, 20);
assert.equal(manifest.site_checks.pointer_entry_pages, 250);
assert.equal(manifest.rendering_checks.repository_source_links, 88);
assert.equal(
  manifest.site_checks.product_authority,
  "Formarium Tables canonical; Reader and Factor Guides are linked projections",
);

const home = read("index.html");
const tables = read("tables.html");
const reader = read("reader.html");
const terms = read("terms.html");
const compose = read("compose.html");
const pointer = read(path.join("pointers", "actor.html"));
const quickstart = read(path.join("entries", "volumes-01-structure-quantity-choice-book-one-sim-quickstart.html"));

const siteHtmlFiles = fs
  .readdirSync(site, {recursive: true, withFileTypes: true})
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => path.join(entry.parentPath, entry.name))
  .filter((file) => path.basename(file) !== "proof-set-sim-65.html");
assert.equal(
  siteHtmlFiles.length,
  1 +
    manifest.site_checks.chapter_pages +
    manifest.site_checks.source_pages +
    manifest.site_checks.pointer_entry_pages +
    4,
);
for (const file of siteHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  assert.match(html, /class="site-brand"[^>]*>Formarium\b/);
  assert.match(html, /class="identity-preview"/);
  assert.match(html, /public feedback identity/i);
}

for (const html of [home, tables, reader, terms, compose, pointer, quickstart]) {
  assert.match(html, /Formarium/);
  assert.match(html, /public feedback identity/i);
  assert.doesNotMatch(html, /Tabula Facta/);
}

assert.match(home, /<h1>Formarium<\/h1>/);
assert.match(home, /<h3>Formarium Tables<\/h3>/);
assert.match(home, /<h3>The Formarium Reader<\/h3>/);
assert.match(home, /What brings you to Formarium\?/);
assert.match(tables, /<h1>Formarium Tables A-Z<\/h1>/);
assert.match(reader, /<h1>The Formarium Reader<\/h1>/);
assert.match(reader, /Factorium schema names, file formats, and canonical IDs remain compatibility internals/);
assert.match(terms, /Pointer Entries · Formarium/);
assert.match(pointer, /href="\.\.\/index\.html">Formarium<\/a>/);
assert.match(read(path.join("assets", "handoff.js")), /Current Formarium page/);

const sim64Home = fs.readFileSync(
  path.join(root, "target", "proof-set-sim-64", "index.html"),
  "utf8",
);
assert.match(sim64Home, /<h1>Factorium<\/h1>/);
assert.doesNotMatch(sim64Home, /Formarium/);

console.log(
  "OK sim65=Formarium books=Formarium-Tables/Formarium-Reader pointers=250 historical-sim64=unchanged missing=0",
);
