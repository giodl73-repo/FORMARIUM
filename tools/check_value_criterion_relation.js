"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const relationId = "f27-value-contributes-criterion";
const query = read("fixtures/composition/value-criterion.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/VALUE-CRITERION-RELATION-ADMISSION.md");
const relations = read("reference/factorium-relations-v0.factorium");
const digest = crypto.createHash("sha256").update(query).digest("hex");

assert.equal(digest,
  "fcc1f4832dd77c402df69fa9702cd8c45d0b924592309d3b176381d68b759f91",
  "canonical Value/Criterion query identity");
assert.match(relations, new RegExp(
  `^relation ${relationId} \\| contributes-criterion-to \\| ` +
  "factor:cost-price-value-return/requested-cost-price-value-utility-or-return-sense \\| " +
  "factor:choice-alternative-selection/criteria-definitions-measurement-bases-and-directions \\| " +
  "view:decision-alternative-selection \\| basis=declared-basis," +
  "desired-direction=declared-desired-direction,horizon=declared-horizon," +
  "owner=declared-owner,unit-or-scale=declared-unit-or-scale," +
  "value-sense=declared-value-sense \\| tables/decisions/alternative-selection.md$", "m"),
"exact canonical relation record");
assert.match(query, new RegExp(`^edge ${relationId}$`, "m"));
assert.match(query,
  /^check f27-check-value-basis \| completeness \| view:decision-alternative-selection \| unresolved$/m);
assert.match(query, /^state incomplete$/m);
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
assert.ok(guide.includes(digest), "guide binds exact value query identity");
assert.match(guide, /local bridge evaluation also remains `unresolved`/i,
  "local value basis remains unresolved");
assert.match(guide, /unlike values cannot be added without an\s+explicit reviewed mapping/i,
  "unlike values are not silently aggregated");
assert.match(spec, /no value equivalence, comparability/i,
  "claim boundary excludes equivalence and comparability");
assert.match(spec, /F27 bridge packet complete/i,
  "bounded packet closure is explicit");
assert.ok(!relationIds(workspace).includes(relationId),
  "Value/Criterion relation remains outside Lab allowlist");

console.log(`OK relation=${relationId} state=incomplete local=unresolved lab=excluded packet=complete`);
