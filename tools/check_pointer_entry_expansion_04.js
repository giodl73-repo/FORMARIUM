"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = (edition) => path.join(root, "target", `proof-set-${edition}`);
const read = (edition, relative) => fs.readFileSync(path.join(site(edition), relative), "utf8");
const manifest = (edition) => JSON.parse(read(edition, "manifest.json"));

for (const [edition, count] of [["sim-52", 20], ["sim-53", 40], ["sim-54", 60], ["sim-55", 80]]) {
  assert.equal(manifest(edition).site_checks.pointer_entry_pages, count);
}
const sim56 = manifest("sim-56");
assert.equal(sim56.edition, "sim-56");
assert.equal(sim56.site_checks.pointer_entry_pages, 100);
assert.equal(sim56.site_checks.pointer_index_pages, 1);
assert.equal(sim56.site_checks.pointer_authority_change, false);
assert.equal(sim56.site_checks.pointer_relation_inference, false);
assert.equal(sim56.site_checks.pointer_search_integration, false);
assert.equal(sim56.site_checks.missing_local_targets, 0);

const registry = fs.readFileSync(
  path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-pointer-registry-v4.factorium"),
  "utf8",
);
assert.equal([...registry.matchAll(/^pointer /gm)].length, 100);
assert.match(read("sim-56", "terms.html"), /Generated concordance · 100 admitted labels/);

const added = [
  "alternative", "case", "change", "data", "definition", "demand",
  "duration", "event", "inference", "mass", "mechanism", "normalization",
  "rate", "relation", "resolution", "risk", "sense", "sign", "volume", "work",
];
for (const slug of added) {
  const page = read("sim-56", path.join("pointers", `${slug}.html`));
  assert.match(page, /Pointer, not canonical entry/);
  assert.match(page, /owning Tables · \d+ distinct structural expressions/);
}

for (const excluded of ["point", "reference", "type"]) {
  assert.equal(fs.existsSync(path.join(site("sim-56"), "pointers", `${excluded}.html`)), false);
}

assert.match(read("sim-56", path.join("pointers", "relation.html")), /tables\/roots\/relation\.md/);
assert.match(read("sim-56", path.join("pointers", "mass.html")), /tables\/entries\/amount-concentration-composition\.md/);
assert.match(read("sim-56", path.join("pointers", "actor.html")), /3 owning Tables · 3 distinct structural expressions/);

const search = JSON.parse(read("sim-56", "search-index.json"));
assert.equal(search.length, 191);
assert.equal(search.filter((record) => record.recordClass === "pointer-entry").length, 0);

console.log(
  `OK sim52=20 sim53=40 sim54=60 sim55=80 sim56=100 occurrences=${sim56.site_checks.pointer_distinct_occurrences} owners=${sim56.site_checks.pointer_owner_bindings} search=unchanged authority=unchanged`,
);
