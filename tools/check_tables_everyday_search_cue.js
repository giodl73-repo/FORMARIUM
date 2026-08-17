"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const search = require(path.resolve(
  __dirname,
  "../volumes/01-structure-quantity-choice/proof-set-search-families.js"
));
const cues = require(path.resolve(
  __dirname,
  "../volumes/01-structure-quantity-choice/proof-set-search-cue.js"
));

const root = path.resolve(process.argv[2] || "target/proof-set-sim-40");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const indexBytes = fs.readFileSync(path.join(root, "search-index.json"));
const records = JSON.parse(indexBytes.toString("utf8"));
assert.equal(manifest.edition, "sim-40");
assert.equal(records.length, 185);
assert.equal(crypto.createHash("sha256").update(indexBytes).digest("hex"),
  "77aa356b29bdc129e85735c2c89e30436c686dda96c698caa85c0792cd75fd19",
  "search index remains byte-identical to sim-39");

const targetPath = "tables/entries/geometric-measure.md";
const targets = records.filter((record) => record.path === targetPath);
assert.equal(targets.length, 1, "cue target resolves exactly once");

for (const query of ["size", "how big", "how large", "  HOW   BIG  "]) {
  const cue = cues.cueForQuery(query, records);
  assert.ok(cue, `${query} activates the cue`);
  assert.equal(cue.label, "If you mean geometric size");
  assert.equal(cue.title, "Geometric Measure");
  assert.equal(cue.href, targets[0].familyHref);
}
for (const query of ["", "sample size", "bigger", "how big is it"] ) {
  assert.equal(cues.cueForQuery(query, records), null, `${query} does not activate`);
}

const sizeResults = search.searchRecords(records, "size", "", "");
assert.equal(sizeResults[0].path,
  "tables/diagnostics/sampling-generalization-failures.md",
  "existing lexical ranking remains unchanged");
assert.equal(sizeResults[1].path, targetPath,
  "existing geometric result remains directly addressable");
const frozenRankings = new Map([
  ["size", "a7f58b12e42dc27faf08ca17c7b9a217b04b5026a6da95f1e97d7d30c9722ad4"],
  ["how big", "891e15c02d51eaac2c05ffeb7388c5960b3598094b81e326ff724c42b9948862"],
  ["how large", "01094d87c2a51602588d87be6510636824642a6cf2446bc4f14baa91081d6eb4"],
  ["sample size", "8f56089174238a117e90a08d6328c60ece606eff817a38651f063530c3e90796"],
]);
for (const [query, expected] of frozenRankings) {
  const paths = search.searchRecords(records, query, "", "").map((record) => record.path);
  const digest = crypto.createHash("sha256").update(JSON.stringify(paths)).digest("hex");
  assert.equal(digest, expected, `${query} preserves the complete sim-39 lexical ranking`);
}

assert.deepEqual(manifest.search_checks.navigation_cue_phrases,
  ["size", "how big", "how large"]);
assert.equal(manifest.search_checks.navigation_cue_target, targetPath);
assert.equal(manifest.search_checks.navigation_cue_semantics,
  "conditional-route-not-synonym-or-classification");
assert.equal(manifest.search_checks.missing_rendered_targets, 0);

console.log("OK edition=sim-40 cues=3 target=1 ranking=unchanged missing=0");
