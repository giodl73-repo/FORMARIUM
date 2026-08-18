"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = (edition) => path.join(root, "target", `proof-set-${edition}`);
const read = (edition, relative) => fs.readFileSync(path.join(site(edition), relative), "utf8");
const manifest = (edition) => JSON.parse(read(edition, "manifest.json"));

for (const [edition, count] of [["sim-52", 20], ["sim-53", 40], ["sim-54", 60], ["sim-55", 80], ["sim-56", 100], ["sim-57", 120], ["sim-58", 140], ["sim-59", 160], ["sim-60", 180], ["sim-61", 200], ["sim-62", 220]]) {
  assert.equal(manifest(edition).site_checks.pointer_entry_pages, count);
}
const sim63 = manifest("sim-63");
assert.equal(sim63.edition, "sim-63");
assert.equal(sim63.site_checks.pointer_entry_pages, 240);
assert.equal(sim63.site_checks.pointer_index_pages, 1);
assert.equal(sim63.site_checks.pointer_authority_change, false);
assert.equal(sim63.site_checks.pointer_relation_inference, false);
assert.equal(sim63.site_checks.pointer_search_integration, false);
assert.equal(sim63.site_checks.missing_local_targets, 0);

const registry = fs.readFileSync(
  path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-pointer-registry-v11.factorium"),
  "utf8",
);
assert.match(registry, /^factorium-pointer-registry-delta-v0\r?\nextends proof-set-pointer-registry-v10\.factorium$/m);
assert.equal([...registry.matchAll(/^pointer /gm)].length, 20);
assert.match(read("sim-63", "terms.html"), /Generated concordance · 240 admitted labels/);

const added = [
  "causal-effect", "causal-mechanism", "choice", "choreography", "commitment",
  "configuration", "estimand", "iteration", "milestone", "missingness", "noise",
  "nonconformity", "orchestration", "shape", "temperature", "transaction",
  "translation", "weight", "window", "workflow",
];
for (const slug of added) {
  const page = read("sim-63", path.join("pointers", `${slug}.html`));
  assert.match(page, /Pointer, not canonical entry/);
  assert.match(page, /owning Tables · \d+ distinct structural expressions/);
}

for (const excluded of ["order", "point", "type", "weights"]) {
  assert.equal(fs.existsSync(path.join(site("sim-63"), "pointers", `${excluded}.html`)), false);
}

assert.match(read("sim-63", path.join("pointers", "causal-effect.html")), /explicit contrast and identification assumptions/i);
assert.match(read("sim-63", path.join("pointers", "weight.html")), /relative influence or gravitational force/i);
assert.match(read("sim-63", path.join("pointers", "actor.html")), /3 owning Tables · 3 distinct structural expressions/);

const search = JSON.parse(read("sim-63", "search-index.json"));
assert.equal(search.length, 191);
assert.equal(search.filter((record) => record.recordClass === "pointer-entry").length, 0);

console.log(
  `OK sim52=20 sim53=40 sim54=60 sim55=80 sim56=100 sim57=120 sim58=140 sim59=160 sim60=180 sim61=200 sim62=220 sim63=240 occurrences=${sim63.site_checks.pointer_distinct_occurrences} owners=${sim63.site_checks.pointer_owner_bindings} delta=20 search=unchanged authority=unchanged`,
);
