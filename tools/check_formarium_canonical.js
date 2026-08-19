"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "target", "proof-set-sim-66");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");
const manifest = JSON.parse(
  fs.readFileSync(path.join(site, "manifest.json"), "utf8"),
);

assert.equal(manifest.edition, "sim-66");
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.pointer_entry_pages, 250);
assert.equal(manifest.site_checks.tables_index_pointer_entries, 250);
assert.equal(manifest.rendering_checks.repository_source_links, 98);
assert.equal(
  manifest.site_checks.product_authority,
  "Formarium Tables canonical; Reader and Factor Guides are linked projections",
);

const sourcePaths = new Set(manifest.sources.map((source) => source.path));
for (const expected of [
  "tables/entries/formarium-entry-publication.md",
  "tables/procedures/formarium-entry-publication.md",
  "tables/scales/formarium-editorial-maturity.md",
]) {
  assert.ok(sourcePaths.has(expected), `missing canonical source ${expected}`);
}
assert.ok(!sourcePaths.has("tables/entries/factorium-entry-publication.md"));

const reference = read("reference/formarium-reference-v3.formarium");
const relations = read("reference/formarium-relations-v1.formarium");
const assurance = read("reference/formarium-assurance-v3.formarium");
assert.match(reference, /^formarium-reference-v3\n/);
assert.match(reference, /^entry formarium-entry-publication \|/m);
assert.doesNotMatch(reference, /^entry factorium-entry-publication \|/m);
assert.match(relations, /^formarium-relations-v1\n/);
assert.match(assurance, /^formarium-assurance-v3\n/);
assert.match(assurance, /^review entry:formarium-entry-publication \|/m);

const referenceSha256 = sha256(reference);
const relationSha256 = sha256(relations);
const queryDirectory = path.join(root, "fixtures", "composition");
const queries = fs
  .readdirSync(queryDirectory)
  .filter((name) => name.endsWith(".formarium-query"));
assert.equal(queries.length, 11);
for (const name of queries) {
  const query = fs.readFileSync(path.join(queryDirectory, name), "utf8");
  assert.match(query, /^formarium-composition-query-v1\n/);
  assert.match(
    query,
    new RegExp(`^source ${referenceSha256} \\| ${relationSha256}$`, "m"),
  );
}

const pointerRegistry = read(
  "volumes/01-structure-quantity-choice/formarium-pointer-registry-v1.formarium",
);
assert.match(pointerRegistry, /^formarium-pointer-registry-v1\n/);
assert.equal(
  pointerRegistry.split(/\r?\n/).filter((line) => line.startsWith("pointer "))
    .length,
  250,
);

const generatedFiles = fs
  .readdirSync(site, { recursive: true, withFileTypes: true })
  .filter(
    (entry) =>
      entry.isFile() && /\.(?:html|js|json)$/.test(entry.name),
  )
  .map((entry) => path.join(entry.parentPath, entry.name));
for (const file of generatedFiles) {
  const text = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(text, /\bFactorium\b|FACTORIUM_/);
  if (file.endsWith(".html")) {
    assert.match(
      text,
      /rel="license" href="https:\/\/creativecommons\.org\/licenses\/by-nc\/4\.0\/"/,
      `missing content license notice in ${file}`,
    );
  }
}

const home = fs.readFileSync(path.join(site, "index.html"), "utf8");
const reader = fs.readFileSync(path.join(site, "reader.html"), "utf8");
const tables = fs.readFileSync(path.join(site, "tables.html"), "utf8");
assert.match(home, /<a class="site-brand"[^>]*>Formarium<\/a>/);
assert.doesNotMatch(home, /identity-preview|feedback preview/i);
assert.match(home, /data-formarium-handoff/);
assert.match(
  home,
  /Content &copy; 2026 Gio Della-Libera.+CC BY-NC 4\.0/,
);
assert.match(reader, /Formarium schemas and file formats are canonical/);
assert.match(
  tables,
  /<h2 id="tables-index-pointers-heading">Pointer entry points<\/h2>/,
);
const tablePointerLinks = [
  ...tables.matchAll(
    /data-pointer-slug="([^"]+)"><a href="pointers\/([^"]+)\.html">/g,
  ),
];
assert.equal(tablePointerLinks.length, 250);
assert.equal(new Set(tablePointerLinks.map((match) => match[1])).size, 250);
for (const [, slug, hrefSlug] of tablePointerLinks) {
  assert.equal(hrefSlug, slug);
  assert.ok(fs.existsSync(path.join(site, "pointers", `${slug}.html`)));
}
assert.match(
  fs.readFileSync(path.join(site, "assets", "handoff.js"), "utf8"),
  /\[data-formarium-handoff\]/,
);

console.log(
  `OK sim66=Formarium-native reference=${referenceSha256} relations=${relationSha256} queries=${queries.length} pointers=250 missing=0`,
);
