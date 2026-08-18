"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const query = read("fixtures/composition/decision-evidence.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/DECISION-EVIDENCE-READING-ROUTE.md");
const digest = crypto.createHash("sha256").update(query).digest("hex");

assert.equal(digest,
  "34870e28e2428e212efd45a997114842526192b83c4e2617d4cb1771b30c4d50",
  "canonical Decision/Evidence query identity");
assert.match(query, /^edge f27-evidence-qualifies-evaluation$/m,
  "query uses the admitted relation");
assert.match(query,
  /^check f27-check-evidence-applicability \| completeness \| view:decision-alternative-selection \| unresolved$/m,
  "applicability remains unresolved");
assert.match(query, /^state incomplete$/m, "closure remains incomplete");

for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
for (const loss of [
  "omitting the full evidence artifact",
  "local alternative bindings",
  "full Decision Table"
]) {
  assert.ok(guide.includes(loss), `guide retains loss: ${loss}`);
}
assert.ok(guide.includes(digest), "guide binds exact query identity");
assert.ok(guide.includes("not a Composition Lab control or starter"),
  "guide discloses interactive boundary");
assert.ok(spec.includes("six read-only traces and five authored Lab"),
  "contract separates reader and Lab counts");
assert.ok(!relationIds(workspace).includes("f27-evidence-qualifies-evaluation"),
  "Decision/Evidence relation remains outside Lab allowlist");
assert.ok(!relationIds(workspace).includes("f27-constraint-filters-feasibility"),
  "Constraint/Feasibility relation remains outside Lab allowlist");

console.log(`OK route=read-only state=incomplete trace=${digest} lab=excluded`);
