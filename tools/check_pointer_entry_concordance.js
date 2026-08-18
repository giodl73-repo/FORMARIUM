"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "target", "proof-set-sim-52");
const readSite = (relative) => fs.readFileSync(path.join(site, relative), "utf8");
const manifest = JSON.parse(readSite("manifest.json"));
const checks = manifest.site_checks;

assert.equal(manifest.edition, "sim-52");
assert.equal(checks.pointer_index_pages, 1);
assert.equal(checks.pointer_entry_pages, 20);
assert.equal(checks.pointer_distinct_occurrences, 383);
assert.equal(checks.pointer_owner_bindings, 313);
assert.equal(checks.pointer_authority_change, false);
assert.equal(checks.pointer_relation_inference, false);
assert.equal(checks.pointer_search_integration, false);
assert.equal(checks.missing_local_targets, 0);

const home = readSite("index.html");
assert.match(home, /<h1>Factorium<\/h1>/);
assert.doesNotMatch(home, /Tabula Facta/);
assert.match(home, /href="terms\.html">Terms<\/a>/);
assert.match(fs.readFileSync(path.join(root, "target", "proof-set-sim-51", "index.html"), "utf8"), /Tabula Facta/);

const registry = fs.readFileSync(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-pointer-registry.factorium"), "utf8");
const rows = [...registry.matchAll(/^pointer ([a-z0-9]+(?:-[a-z0-9]+)*) \| ([^|]+) \| (.+)$/gm)];
assert.equal(rows.length, 20);
const terms = readSite("terms.html");
assert.equal((terms.match(/<li><a href="pointers\//g) || []).length, 20);

const entryFiles = fs.readdirSync(path.join(site, "entries")).filter((name) => name.endsWith(".html"));
const entryCorpus = entryFiles.map((name) => readSite(path.join("entries", name))).join("\n");
for (const row of rows) {
  const slug = row[1];
  const page = readSite(path.join("pointers", `${slug}.html`));
  assert.match(page, /Pointer, not canonical entry/);
  assert.match(page, /Frequency is not importance/);
  assert.ok((entryCorpus.match(new RegExp(`href="\\.\\./pointers/${slug}\\.html"`, "g")) || []).length > 0, `inbound link for ${slug}`);
}

const agency = readSite(path.join("entries", "tables-roots-agency.html"));
assert.match(agency, /agency := <a class="pointer-link" href="\.\.\/pointers\/actor\.html">actor<\/a> x <a class="pointer-link" href="\.\.\/pointers\/capability\.html">capability<\/a> x <a class="pointer-link" href="\.\.\/pointers\/authority\.html">authority<\/a> @ <a class="pointer-link" href="\.\.\/pointers\/context\.html">context<\/a>/);
assert.match(agency, /when the actor is already known/);
assert.doesNotMatch(agency, /when the <a[^>]+>actor<\/a> is already known/);

const actor = readSite(path.join("pointers", "actor.html"));
assert.equal((actor.match(/<section class="pointer-owner"/g) || []).length, 3);
for (const owner of ["tables/roots/agency.md", "tables/entries/force.md", "tables/procedures/resource-allocation.md"]) assert.ok(actor.includes(`data-source-path="${owner}"`));
assert.match(actor, /3 owning Tables · 3 distinct structural expressions/);

const search = JSON.parse(readSite("search-index.json"));
assert.equal(search.length, 191);
assert.equal(search.filter((record) => record.recordClass === "pointer-entry").length, 0);
assert.match(readSite("tables.html"), /Scan 54 canonical Table families/);

console.log("OK sim52=Factorium pointers=20 occurrences=383 owners=313 actor=3 search=unchanged authority=unchanged missing=0");

