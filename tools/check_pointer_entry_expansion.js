"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site52 = path.join(root, "target", "proof-set-sim-52");
const site53 = path.join(root, "target", "proof-set-sim-53");
const read = (site, relative) => fs.readFileSync(path.join(site, relative), "utf8");

const manifest52 = JSON.parse(read(site52, "manifest.json"));
const manifest53 = JSON.parse(read(site53, "manifest.json"));
assert.equal(manifest52.edition, "sim-52");
assert.equal(manifest52.site_checks.pointer_entry_pages, 20);
assert.equal(manifest53.edition, "sim-53");
assert.equal(manifest53.site_checks.pointer_entry_pages, 40);
assert.equal(manifest53.site_checks.pointer_index_pages, 1);
assert.equal(manifest53.site_checks.pointer_authority_change, false);
assert.equal(manifest53.site_checks.pointer_relation_inference, false);
assert.equal(manifest53.site_checks.pointer_search_integration, false);
assert.equal(manifest53.site_checks.missing_local_targets, 0);

const registry = fs.readFileSync(
  path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-pointer-registry-v1.factorium"),
  "utf8",
);
const rows = [...registry.matchAll(/^pointer ([a-z0-9]+(?:-[a-z0-9]+)*) \| ([^|]+) \| (.+)$/gm)];
assert.equal(rows.length, 40);
const terms = read(site53, "terms.html");
assert.match(terms, /Generated concordance · 40 admitted labels/);
assert.equal((terms.match(/<li><a href="pointers\//g) || []).length, 40);

const added = [
  "basis", "convention", "decision", "direction", "evidence", "frame", "model",
  "policy", "provenance", "rule", "scale", "scope", "source", "status", "system",
  "target", "time", "uncertainty", "unit", "version",
];
for (const slug of added) {
  const page = read(site53, path.join("pointers", `${slug}.html`));
  assert.match(page, /Pointer, not canonical entry/);
  assert.match(page, /owning Tables · \d+ distinct structural expressions/);
}

assert.equal(fs.existsSync(path.join(site53, "pointers", "reference.html")), false);
assert.match(read(site53, path.join("entries", "tables-entries-causal-reasoning.html")), /pointers\/uncertainty\.html/);
assert.match(read(site53, path.join("entries", "tables-entries-access-permission-authorization-entitlement.html")), /pointers\/policy\.html/);
assert.match(read(site53, path.join("pointers", "actor.html")), /3 owning Tables · 3 distinct structural expressions/);

const search = JSON.parse(read(site53, "search-index.json"));
assert.equal(search.length, 191);
assert.equal(search.filter((record) => record.recordClass === "pointer-entry").length, 0);

console.log(
  `OK sim52=20 sim53=40 occurrences=${manifest53.site_checks.pointer_distinct_occurrences} owners=${manifest53.site_checks.pointer_owner_bindings} search=unchanged authority=unchanged`,
);
