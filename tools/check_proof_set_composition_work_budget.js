"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-24");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-lab.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.equal(manifest.edition, "sim-24");
assert.equal(manifest.site_checks.composition_work_budget_controls, 1);
assert.equal(manifest.composition_lab_checks.work_accounting, "canonical-record-count");
assert.equal(manifest.composition_lab_checks.work_enforcement, "hard-cap");
assert.equal(manifest.composition_lab_checks.work_range, "3-64");
assert.match(page, /name="work" type="number" min="3" max="64" value="9"/);
assert.match(page, /Read the work-budget contract/);
assert.match(runtime, /atomic-relation-needs-/);
assert.match(runtime, /Work used \/ cap/);

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const payload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const starters = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_STARTERS));
assert.deepEqual(starters.starters.map((starter) => starter.budget.work), [9, 9, 9, 10, 13]);
const relation = payload.relations[0];
const base = {
  problem: "Review one exact relation under finite record work.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [relation.source], relations: [relation.id], exclusions: []
};
const exact = lab.runComposition(base, payload);
assert.equal(exact.work, 9);
assert.equal(exact.request.budget.work, 9);
const bounded = lab.runComposition({ ...base, budget: { ...base.budget, work: 8 } }, payload);
assert.equal(bounded.work, 3);
assert.equal(bounded.graph.edges.length, 0);
assert.equal(bounded.graph.unresolvedRelations[0].reason, "atomic-relation-needs-6-work-slots");
assert.ok(bounded.work <= bounded.request.budget.work);

console.log("OK work_control=1 exact=9 bounded=3 starters=5 accounting=canonical-record-count");
