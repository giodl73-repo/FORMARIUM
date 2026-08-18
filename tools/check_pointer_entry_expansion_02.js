"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = (edition) => path.join(root, "target", `proof-set-${edition}`);
const read = (edition, relative) => fs.readFileSync(path.join(site(edition), relative), "utf8");
const manifest = (edition) => JSON.parse(read(edition, "manifest.json"));

assert.equal(manifest("sim-52").site_checks.pointer_entry_pages, 20);
assert.equal(manifest("sim-53").site_checks.pointer_entry_pages, 40);
const sim54 = manifest("sim-54");
assert.equal(sim54.edition, "sim-54");
assert.equal(sim54.site_checks.pointer_entry_pages, 60);
assert.equal(sim54.site_checks.pointer_index_pages, 1);
assert.equal(sim54.site_checks.pointer_authority_change, false);
assert.equal(sim54.site_checks.pointer_relation_inference, false);
assert.equal(sim54.site_checks.pointer_search_integration, false);
assert.equal(sim54.site_checks.missing_local_targets, 0);

const registry = fs.readFileSync(
  path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-pointer-registry-v2.factorium"),
  "utf8",
);
assert.equal([...registry.matchAll(/^pointer /gm)].length, 60);
assert.match(read("sim-54", "terms.html"), /Generated concordance · 60 admitted labels/);

const added = [
  "assumptions", "behavior", "capacity", "claim", "contract", "criteria",
  "domain", "interval", "measure", "measurement", "observation", "population",
  "quantity", "representation", "resource", "result", "review", "revision",
  "scenario", "value",
];
for (const slug of added) {
  const page = read("sim-54", path.join("pointers", `${slug}.html`));
  assert.match(page, /Pointer, not canonical entry/);
  assert.match(page, /owning Tables · \d+ distinct structural expressions/);
}

for (const excluded of ["conditions", "constraints", "reference", "resources", "roles", "states"]) {
  assert.equal(fs.existsSync(path.join(site("sim-54"), "pointers", `${excluded}.html`)), false);
}

assert.match(read("sim-54", path.join("pointers", "result.html")), /tables\/entries\/claim-evidence\.md/);
assert.match(read("sim-54", path.join("pointers", "measurement.html")), /tables\/entries\/claim-evidence\.md/);
assert.match(read("sim-54", path.join("pointers", "actor.html")), /3 owning Tables · 3 distinct structural expressions/);

const search = JSON.parse(read("sim-54", "search-index.json"));
assert.equal(search.length, 191);
assert.equal(search.filter((record) => record.recordClass === "pointer-entry").length, 0);

console.log(
  `OK sim52=20 sim53=40 sim54=60 occurrences=${sim54.site_checks.pointer_distinct_occurrences} owners=${sim54.site_checks.pointer_owner_bindings} search=unchanged authority=unchanged`,
);
