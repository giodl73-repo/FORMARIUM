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
  throw new Error("usage: node tools/check_proof_set_search.js <search-index.json> [expected-records]");
}

const records = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const expectedRecords = process.argv[3] ? Number(process.argv[3]) : 183;
assert.ok(Number.isInteger(expectedRecords) && expectedRecords > 0,
  "expected record count is a positive integer");
assert.equal(records.length, expectedRecords, "declared proof search record count");

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

if (expectedRecords >= 125) {
  const composition = search.searchRecords(
    records,
    "report generator dependency",
    "guide",
    "application"
  );
  assert.equal(
    composition.filter((record) =>
      record.path === "guides/system-dependency-composition-worksheet.md"
    ).length,
    1,
    "composition search resolves the worksheet exactly once"
  );
}

if (expectedRecords >= 126) {
  const evidence = search.searchRecords(
    records,
    "latency observation inference",
    "guide",
    "application"
  );
  assert.equal(
    evidence.filter((record) =>
      record.path === "guides/latency-evidence-composition-worksheet.md"
    ).length,
    1,
    "evidence composition search resolves the worksheet exactly once"
  );
}

if (expectedRecords >= 127) {
  const feedback = search.searchRecords(
    records,
    "alert outcome feedback",
    "guide",
    "application"
  );
  assert.equal(
    feedback.filter((record) =>
      record.path === "guides/alert-feedback-composition-worksheet.md"
    ).length,
    1,
    "feedback composition search resolves the worksheet exactly once"
  );
}

if (expectedRecords >= 128) {
  const conflict = search.searchRecords(
    records,
    "subtract required interface",
    "guide",
    "application"
  );
  assert.equal(
    conflict.filter((record) =>
      record.path === "guides/dependency-exclusion-conflict-worksheet.md"
    ).length,
    1,
    "conflict composition search resolves the worksheet exactly once"
  );
}

if (expectedRecords >= 129) {
  const frontier = search.searchRecords(
    records,
    "delegated compliance frontier",
    "guide",
    "application"
  );
  assert.equal(
    frontier.filter((record) =>
      record.path === "guides/delegated-compliance-frontier-worksheet.md"
    ).length,
    1,
    "frontier composition search resolves the worksheet exactly once"
  );
}

console.log(
  `OK records=${records.length} query=${queryOnly.length} kind=${kindOnly.length} ` +
  `domain=${domainOnly.length} combined=${combined.length}`
);
