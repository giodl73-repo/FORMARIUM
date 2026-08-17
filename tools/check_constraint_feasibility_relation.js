"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const relationId = "f27-constraint-filters-feasibility";
const query = read("fixtures/composition/constraint-feasibility.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/CONSTRAINT-FEASIBILITY-RELATION-ADMISSION.md");
const relations = read("reference/factorium-relations-v0.factorium");
const digest = crypto.createHash("sha256").update(query).digest("hex");

assert.equal(digest,
  "737217d67843951e92ec118d6fb5dfc1704ba63c25d05d8aad24e6f734acb127",
  "canonical Constraint/Feasibility query identity");
assert.match(relations, new RegExp(
  `^relation ${relationId} \\| constrains-feasibility-of \\| ` +
  "factor:policy-rule-constraint-decision-exception/constraints-and-invariants \\| " +
  "factor:choice-alternative-selection/feasibility-constraints-and-exclusion-rationale \\| " +
  "view:decision-alternative-selection \\| applicability=declared-applicability," +
  "authority=declared-authority,effective-period=declared-effective-period," +
  "hard-or-soft=declared-hard-or-soft,version=declared-version \\| " +
  "tables/decisions/alternative-selection.md$", "m"),
"exact canonical relation record");
assert.match(query, new RegExp(`^edge ${relationId}$`, "m"));
assert.match(query,
  /^check f27-check-constraint-applicability \| completeness \| view:decision-alternative-selection \| unresolved$/m);
assert.match(query, /^state incomplete$/m);
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
assert.ok(guide.includes(digest), "guide binds exact constraint query identity");
assert.match(guide,
  /local bridge evaluation below records `pass` only for the limited trial/i,
  "local pass remains alternative-specific");
assert.match(guide, /Broad adoption remains unresolved/,
  "broad-adoption applicability remains unresolved");
assert.match(spec, /soft\s+criterion cannot silently become\s+an exclusion/i,
  "hard/soft boundary remains explicit");
assert.ok(!relationIds(workspace).includes(relationId),
  "Constraint/Feasibility relation remains outside Lab allowlist");

console.log(`OK relation=${relationId} state=incomplete local=limited-trial-only lab=excluded`);
