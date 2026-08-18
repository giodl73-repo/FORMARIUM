"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const relationId = "f27-risk-characterizes-consequence";
const query = read("fixtures/composition/risk-consequence.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/RISK-CONSEQUENCE-RELATION-ADMISSION.md");
const relations = read("reference/factorium-relations-v0.factorium");
const digest = crypto.createHash("sha256").update(query).digest("hex");

assert.equal(digest,
  "0287072b989c0e50d25b73befd42795685c411032eb6f7bd4d914ac23d685872",
  "canonical Risk/Consequence query identity");
assert.match(relations, new RegExp(
  `^relation ${relationId} \\| characterizes-consequence-for \\| ` +
  "factor:probability-risk-uncertainty/consequence-set \\| " +
  "factor:choice-alternative-selection/alternative-state-outcomes-and-consequences \\| " +
  "view:decision-alternative-selection \\| affected-entity=declared-affected-entity," +
  "consequence-basis=declared-consequence-basis,control-state=declared-control-state," +
  "horizon=declared-horizon,scenario=declared-scenario \\| " +
  "tables/decisions/alternative-selection.md$", "m"),
"exact canonical relation record");
assert.match(query, new RegExp(`^edge ${relationId}$`, "m"));
assert.match(query,
  /^check f27-check-consequence-alignment \| completeness \| view:decision-alternative-selection \| unresolved$/m);
assert.match(query, /^state incomplete$/m);
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
assert.ok(guide.includes(digest), "guide binds exact risk query identity");
assert.match(guide, /local bridge evaluation also remains `unresolved`/i,
  "local consequence alignment remains unresolved");
assert.match(guide, /expected loss is not the complete preference model/i,
  "expected loss is not promoted to complete preference");
assert.match(spec, /no probability, expected loss, likelihood/i,
  "claim boundary excludes probability and expected loss");
assert.ok(!relationIds(workspace).includes(relationId),
  "Risk/Consequence relation remains outside Lab allowlist");

console.log(`OK relation=${relationId} state=incomplete local=unresolved lab=excluded`);
