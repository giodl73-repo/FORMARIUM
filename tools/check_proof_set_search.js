"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const search = require(path.resolve(
  __dirname,
  "../volumes/01-structure-quantity-choice/proof-set-search.js"
));

const indexPath = process.argv[2];
if (!indexPath) {
  throw new Error("usage: node tools/check_proof_set_search.js <search-index.json>");
}

const records = JSON.parse(fs.readFileSync(indexPath, "utf8"));
assert.equal(records.length, 124, "current proof search record count");

const all = search.searchRecords(records, "", "", "");
assert.equal(all.length, records.length, "empty filters retain every record");

const queryOnly = search.searchRecords(records, "likelihood", "", "");
assert.ok(queryOnly.length >= 2, "likelihood reaches the entry and formula view");
assert.ok(queryOnly.every((record) => search.normalize(record.text).includes("likelihood")),
  "query-only results contain the searched concept");

const kindOnly = search.searchRecords(records, "", "diagnostic", "");
assert.ok(kindOnly.length > 0, "diagnostic kind has results");
assert.ok(kindOnly.every((record) => record.kind === "diagnostic"),
  "kind filter is exact");

const domainOnly = search.searchRecords(records, "", "", "science");
assert.ok(domainOnly.length > 0, "science domain has results");
assert.ok(domainOnly.every((record) => record.domain === "science"),
  "domain filter is exact");

const combined = search.searchRecords(records, "probability", "formula", "quantities");
assert.ok(combined.length > 0, "combined query has results");
assert.ok(combined.every((record) =>
  record.kind === "formula" && record.domain === "quantities"),
"query, kind, and domain compose");

assert.deepEqual(
  search.searchRecords(records, "probability", "formula", "quantities"),
  combined,
  "ranking is deterministic"
);

console.log(
  `OK records=${records.length} query=${queryOnly.length} kind=${kindOnly.length} ` +
  `domain=${domainOnly.length} combined=${combined.length}`
);
