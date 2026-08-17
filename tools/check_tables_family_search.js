"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-33");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const familySearch = require(path.join(root,
  "volumes/01-structure-quantity-choice/proof-set-search-families.js"));
const priorSearch = require(path.join(root,
  "volumes/01-structure-quantity-choice/proof-set-search-candidate.js"));

assert.equal(manifest.edition, "sim-33");
assert.equal(records.length, 185);
assert.deepEqual(manifest.search_checks.result_views, ["families", "records"]);
assert.equal(manifest.search_checks.default_result_view, "families");
assert.equal(manifest.search_checks.ownership_groups, 90);
assert.equal(manifest.search_checks.specialized_view_owners, 95);
assert.equal(manifest.search_checks.family_semantics,
  "exact-publication-ownership-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const classes = Object.groupBy(records, (record) => record.recordClass);
assert.equal(classes["canonical-entry"].length, 53);
assert.equal(classes["specialized-view"].length, 95);
assert.equal(classes["curated-record"].length, 27);
assert.equal(classes.guide.length, 9);
assert.equal(classes["reader-record"].length, 1);

const allGroups = familySearch.groupRecords(records);
assert.equal(allGroups.length, 90);
assert.equal(allGroups.reduce((sum, group) => sum + group.records.length, 0),
  records.length, "grouping is lossless");
assert.equal(new Set(allGroups.flatMap((group) =>
  group.records.map((record) => record.path))).size, records.length,
"grouping does not duplicate records");

for (const record of classes["specialized-view"]) {
  const owner = records.find((candidate) =>
    candidate.path === record.familyKey &&
    candidate.recordClass === "canonical-entry");
  assert.ok(owner, `missing exact owner record: ${record.path}`);
  assert.equal(record.familyTitle, owner.title);
  assert.equal(record.familyHref, owner.href);
}

for (const query of [
  ["threshold acceptance", "", ""],
  ["amount concentration", "", "science"],
  ["constraint feasibility", "constraint", ""],
  ["latency observation inference", "guide", "application"],
]) {
  assert.deepEqual(
    familySearch.searchRecords(records, ...query).map((record) => record.path),
    priorSearch.searchRecords(records, ...query).map((record) => record.path),
    `flat ranking changed: ${query.join("|")}`
  );
}

const thresholdMatches = familySearch.searchRecords(
  records, "threshold acceptance", "", ""
).slice(0, 20);
const thresholdGroups = familySearch.groupRecords(thresholdMatches);
assert.equal(thresholdGroups[0].kind, "canonical");
assert.equal(thresholdGroups[0].title,
  "Evaluation Measure, Scale, Criterion, and Score");
assert.equal(thresholdGroups[0].records[0].path,
  "tables/constraints/evaluation-threshold-acceptance.md");

const diagnostics = familySearch.searchRecords(records, "", "diagnostic", "");
const diagnosticGroups = familySearch.groupRecords(diagnostics);
assert.equal(diagnosticGroups.reduce((sum, group) => sum + group.records.length, 0),
  diagnostics.length);
assert.ok(diagnosticGroups.every((group) =>
  group.records.every((record) => record.kind === "diagnostic")),
"owner headings do not add nonmatching entry records");

const indexHtml = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
assert.match(indexHtml,
  /<select id="proof-search-view"><option value="families">Table families<\/option><option value="records">All records<\/option><\/select>/);
assert.match(indexHtml,
  /Table families show exact publication ownership, not broader\/narrower, synonym, relatedness, dependency, or closure\./);

for (const record of records) {
  assert.ok(fs.existsSync(path.join(siteRoot, record.href)),
    `missing search destination: ${record.path}`);
}

console.log(
  `OK edition=sim-33 records=185 groups=90 entries=53 views=95 ` +
  `curated=27 guides=9 reader=1 ownerMappings=95 ` +
  `identity=${manifest.site_checks.identity}`
);
