"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const queryPlan = require("../volumes/01-structure-quantity-choice/proof-set-composition-query-plan.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-23");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-query-plan.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.equal(manifest.edition, "sim-23");
assert.equal(manifest.site_checks.composition_query_plan_pages, 1);
assert.equal(manifest.composition_query_plan_checks.projection_input,
  "visible explicit controls plus digest-bound payloads");
assert.deepEqual(manifest.composition_query_plan_checks.control_states,
  ["control-complete", "needs-explicit-controls"]);
assert.deepEqual(manifest.composition_query_plan_checks.result_alignment,
  ["not-run", "matches-displayed-result", "controls-changed"]);
assert.equal(manifest.composition_query_plan_checks.closure_execution, false);
assert.equal(manifest.composition_query_plan_checks.result_prediction, false);
assert.equal(manifest.composition_query_plan_checks.plan_identity, "none");
assert.equal(manifest.composition_query_plan_checks.problem_semantic_selection, false);
assert.equal(manifest.composition_query_plan_checks.storage, "none");
assert.equal(manifest.composition_query_plan_checks.specification,
  "specs/COMPOSITION-QUERY-PLAN.md");

assert.match(page, /id="composition-query-plan"/);
assert.match(page, /Your explicit query plan/);
assert.match(page, /Read the query-plan contract/);
assert.ok(page.indexOf('src="assets/composition-starters.js"') <
  page.indexOf('src="assets/composition-query-plan.js"'),
"query plan loads after authored starter application");
assert.match(css, /\.query-plan__boundary/);
assert.match(css, /data-control-state="needs-explicit-controls"/);
assert.doesNotMatch(runtime,
  /runComposition|identify\s*\(|crypto\.subtle|localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|URLSearchParams/,
"query plan has no closure, identity, storage, URL, or network mechanism");

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const relation = labPayload.relations[0];
const request = {
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6 },
  seeds: [relation.source], relations: [relation.id], exclusions: []
};
const plan = queryPlan.buildQueryPlan(request, labPayload, readingPayload);
assert.equal(plan.controlState, "control-complete");
assert.equal(plan.add[0].label, "dependency source, target, and direction");
assert.equal(plan.multiply[0].code, "F1");
assert.equal(plan.multiply[0].predecessor.label,
  "dependency source, target, and direction");
assert.equal(plan.multiply[0].derived.label, "interfaces and interaction contracts");
assert.equal(plan.subtract.length, 0);
assert.equal(Object.hasOwn(plan, "sha256"), false);
const full = queryPlan.buildQueryPlan({ ...request, profile: "full" },
  labPayload, readingPayload);
assert.equal(lab.canonicalize(plan), lab.canonicalize(full),
  "reader profile is absent from query plan bytes");

console.log("OK plan_pages=1 state=control-complete add=1 multiply=1 subtract=0 identity=none");
