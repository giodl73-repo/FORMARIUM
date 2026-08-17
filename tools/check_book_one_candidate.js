"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const guideRelative = "guides/bounded-question-composition-book-one.md";
const guidePath = path.join(root, guideRelative);
const volumePath = path.join(
  root,
  "volumes/01-structure-quantity-choice/VOLUME.md"
);
const guideIndexPath = path.join(root, "guides/INDEX.md");
const searchPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "target/proof-set-sim-29/search-index.json");

const expectedSpine = [
  "tables/roots/purpose.md",
  "tables/roots/context.md",
  "tables/roots/boundary.md",
  "tables/roots/identity.md",
  "tables/roots/relation.md",
  "tables/entries/claim-evidence.md",
  "tables/entries/factorization-quality.md",
  "tables/entries/decomposition-modes-combination-contracts.md",
  "tables/constraints/factor-interaction-integrity.md",
  "tables/entries/system-composition-dependency.md",
  "tables/entries/scenario-assumption-condition-case.md",
  "tables/evidence/factor-status-completeness.md",
  "tables/entries/operational-resource-capacity-demand.md",
  "tables/entries/interaction-request-response-correlation.md",
  "tables/entries/spatial-operating-context.md",
  "tables/entries/hazard-exposure-harm-safety.md",
  "tables/diagnostics/operating-condition-failures.md",
  "tables/entries/evaluation-measure-scale-criterion.md",
  "tables/procedures/evaluation-aggregation.md",
  "tables/diagnostics/evaluation-sensitivity.md",
  "tables/entries/choice-alternative-selection.md",
  "tables/mappings/perspective-projection.md",
  "tables/procedures/contribution-reconciliation.md",
  "tables/evidence/change-lineage.md",
];

const guide = fs.readFileSync(guidePath, "utf8");
assert.match(guide, /^Status: internal F100 candidate Book One route;/m);
assert.match(guide, /^## F91-F98 contract audit$/m);
assert.match(guide, /^## F99 integrated route$/m);
assert.match(guide, /^## F100 candidate Book One spine$/m);
for (let phase = 91; phase <= 98; phase += 1) {
  assert.match(guide, new RegExp(`\\| F${phase} `), `missing F${phase} audit`);
}

const spineText = guide.slice(guide.indexOf("## F100 candidate Book One spine"));
const links = [...spineText.matchAll(/^\d+\. \[[^\]]+\]\(\.\.\/([^\)]+\.md)\)$/gm)]
  .map((match) => match[1]);
assert.deepEqual(links, expectedSpine, "candidate spine identity or order changed");
assert.equal(new Set(links).size, 24, "candidate spine paths must be unique");
for (const relative of links) {
  assert.ok(fs.existsSync(path.join(root, relative)), `missing spine target ${relative}`);
}

const volume = fs.readFileSync(volumePath, "utf8");
assert.match(
  volume,
  /\[Bounded-Question Composition and Evaluation Guide\]\(\.\.\/\.\.\/guides\/bounded-question-composition-book-one\.md\)/
);
const guideIndex = fs.readFileSync(guideIndexPath, "utf8");
assert.match(
  guideIndex,
  /\[Bounded-Question Composition and Evaluation\]\(bounded-question-composition-book-one\.md\)/
);

const search = JSON.parse(fs.readFileSync(searchPath, "utf8"));
const records = Array.isArray(search) ? search : search.records;
assert.ok(Array.isArray(records), "search index records are missing");
assert.ok(
  records.some((record) =>
    String(record.source || record.path || "").replaceAll("\\", "/").endsWith(guideRelative)
  ),
  "candidate guide is absent from search"
);

console.log(
  `OK phases=8 spine=${links.length} unique=${new Set(links).size} search=present boundary=internal`
);
