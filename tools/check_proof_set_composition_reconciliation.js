"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const reconciliation = require("../volumes/01-structure-quantity-choice/proof-set-composition-reconciliation.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-25");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-reconciliation.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.ok(Number(manifest.edition.split("-")[1]) >= 25, "reconciliation edition");
assert.equal(manifest.site_checks.composition_reconciliation_pages, 1);
assert.equal(manifest.composition_reconciliation_checks.projection_input,
  "identified local result plus digest-bound payloads");
assert.deepEqual(manifest.composition_reconciliation_checks.relation_decisions,
  ["admitted", "stopped", "capacity-limited", "predecessor-unreached"]);
assert.deepEqual(manifest.composition_reconciliation_checks.exclusion_decisions,
  ["conflict", "inactive"]);
assert.deepEqual(manifest.composition_reconciliation_checks.budget_ledgers,
  ["depth", "edges", "nodes", "work"]);
assert.equal(manifest.composition_reconciliation_checks.partition,
  "exhaustive and disjoint over selected controls");
assert.equal(manifest.composition_reconciliation_checks.identity, "inherits local result SHA-256");
assert.equal(manifest.composition_reconciliation_checks.closure_execution, false);
assert.equal(manifest.composition_reconciliation_checks.semantic_evaluation, false);
assert.equal(manifest.composition_reconciliation_checks.storage, "none");
assert.match(page, /Read the result-reconciliation contract/);
assert.ok(page.indexOf('src="assets/composition-query-plan.js"') <
  page.indexOf('src="assets/composition-reconciliation.js"'));
assert.match(css, /\.composition-reconciliation__totals/);
assert.match(css, /data-reader-profile="compact"/);
assert.doesNotMatch(runtime,
  /runComposition|crypto\.subtle|localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|URLSearchParams/);

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const relation = labPayload.relations[0];
const result = lab.runComposition({
  problem: "Review one exact dependency and reconcile the result.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [relation.source], relations: [relation.id], exclusions: []
}, labPayload);
const record = reconciliation.buildReconciliation(result, labPayload, readingPayload, "e".repeat(64));
assert.equal(record.relations[0].decision, "admitted");
assert.equal(record.budgets.length, 4);
assert.equal(record.resultSha256, "e".repeat(64));

console.log("OK reconciliation_pages=1 relation=admitted budgets=4 partition=exact identity=inherited");
