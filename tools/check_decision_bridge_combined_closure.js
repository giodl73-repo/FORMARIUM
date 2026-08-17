"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { relationIds } = require("./composition_lab_allowlist.js");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const query = read("fixtures/composition/decision-bridge-closure.factorium-query");
const invalid = read("fixtures/composition-invalid/decision-bridge-closure-missing-shared-target.factorium-query");
const guide = read("guides/evidence-informed-intervention-choice.md");
const spec = read("specs/DECISION-BRIDGE-COMBINED-CLOSURE.md");
const digest = crypto.createHash("sha256").update(query).digest("hex");
const relationSet = [
  "f27-causal-scope-qualifies-outcome",
  "f27-constraint-filters-feasibility",
  "f27-evidence-qualifies-evaluation",
  "f27-risk-characterizes-consequence",
  "f27-value-contributes-criterion"
];

assert.equal(digest,
  "67b407f1b9efcfe97a7319baa8f39dc14df007a1ef92e29d01a4502ad15ceb3f",
  "combined closure identity");
assert.equal((query.match(/^seed /gm) || []).length, 5, "five explicit seeds");
assert.equal((query.match(/^node /gm) || []).length, 10, "ten deduplicated nodes");
assert.equal((query.match(/^edge /gm) || []).length, 5, "five admitted edges");
assert.equal((query.match(/^check .* \| unresolved$/gm) || []).length, 5,
  "five unresolved canonical checks");
assert.equal((query.match(/^projection /gm) || []).length, 10,
  "ten loss-declared projections");
assert.match(query, /^budget depth=1,edges=5,nodes=10,work=35$/m);
assert.match(query, /^state incomplete$/m);
for (const id of relationSet) {
  assert.match(query, new RegExp(`^edge ${id}$`, "m"), `combined trace retains ${id}`);
  assert.ok(!relationIds(workspace).includes(id), `${id} remains outside Lab`);
}
const shared = "factor:choice-alternative-selection/alternative-state-outcomes-and-consequences";
assert.equal((query.match(new RegExp(`^node ${shared} \\|`, "gm")) || []).length, 1,
  "causal and risk traversals share one target node");
assert.ok(!invalid.includes(`node ${shared} |`), "negative omits shared target");
assert.ok(!invalid.includes(`projection ${shared} |`), "negative omits shared projection");
assert.ok(guide.includes(digest), "guide binds exact combined query identity");
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(guide.includes(`| ${stage} |`), `guide renders ${stage}`);
}
assert.match(guide, /imports none of the authored guide's local pass, fail, or unresolved declarations/i);
assert.match(spec, /No query-grammar change is required/);
assert.match(spec, /F35 added no\s+homepage trace or Compose starter/i);
assert.match(spec, /F36 promotes the proof site's existing Decision problem slot/i);
assert.match(spec, /five authored starters and the six-relation F1-F6 Lab remain unchanged/i);

console.log("OK closure=5s/5e/10n/5c/10p shared-target=deduplicated state=incomplete lab=excluded");
