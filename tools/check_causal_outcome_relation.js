"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const relationId = "f27-causal-scope-qualifies-outcome";
const query = read("fixtures/composition/causal-outcome-scope.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/CAUSAL-OUTCOME-RELATION-ADMISSION.md");
const relations = read("reference/factorium-relations-v0.factorium");
const digest = crypto.createHash("sha256").update(query).digest("hex");

assert.equal(digest,
  "aabda3688998a26d00f3862cd00cbb10b13e8f2524811e6fc47dea184899b1e5",
  "canonical Causal/Outcome query identity");
assert.match(relations, new RegExp(
  `^relation ${relationId} \\| qualifies-outcome-scope-of \\| ` +
  "factor:causal-reasoning/outcome-measure-and-time-horizon \\| " +
  "factor:choice-alternative-selection/alternative-state-outcomes-and-consequences \\| " +
  "view:decision-alternative-selection \\| causal-status=declared-causal-status," +
  "contrast=declared-contrast,horizon=declared-horizon,outcome=declared-outcome," +
  "population=declared-population \\| tables/decisions/alternative-selection.md$", "m"),
"exact canonical relation record");
assert.match(query, new RegExp(`^edge ${relationId}$`, "m"));
assert.match(query,
  /^check f27-check-causal-outcome-scope \| completeness \| view:decision-alternative-selection \| unresolved$/m);
assert.match(query, /^state incomplete$/m);
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
assert.ok(guide.includes(digest), "guide binds exact causal query identity");
assert.match(guide,
  /local bridge evaluation records `fail` for `SYN-02`/i,
  "local failure remains explicit");
assert.match(guide,
  /shadow-mode association is not an intervention effect/i,
  "association is not promoted to intervention effect");
assert.match(spec, /no causal identification, causal effect/i,
  "claim boundary excludes causal effect");
assert.ok(!relationIds(workspace).includes(relationId),
  "Causal/Outcome relation remains outside Lab allowlist");

console.log(`OK relation=${relationId} state=incomplete local=fail lab=excluded`);
