"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const comparisons = require("../volumes/01-structure-quantity-choice/proof-set-composition-rerun-comparison.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-27");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-rerun-comparison.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.ok(Number(manifest.edition.split("-")[1]) >= 27, "rerun comparison edition");
assert.equal(manifest.site_checks.composition_rerun_comparison_pages, 1);
assert.equal(manifest.site_checks.composition_rerun_comparison_retained, 1);
assert.deepEqual(manifest.composition_rerun_comparison_checks.action_dispositions,
  ["present-in-executed-request", "superseded-before-run"]);
assert.deepEqual(manifest.composition_rerun_comparison_checks.request_change_sources,
  ["continuation-action", "additional-control-edit"]);
assert.deepEqual(manifest.composition_rerun_comparison_checks.result_dimensions,
  ["state", "work", "nodes", "relations", "exclusions", "checks"]);
assert.equal(manifest.composition_rerun_comparison_checks.auto_run, false);
assert.equal(manifest.composition_rerun_comparison_checks.causal_attribution, false);
assert.equal(manifest.composition_rerun_comparison_checks.storage, "none");
assert.match(page, /Read the rerun-comparison contract/);
assert.ok(page.indexOf('src="assets/composition-continuations.js"') <
  page.indexOf('src="assets/composition-rerun-comparison.js"'));
assert.match(css, /\.composition-rerun-comparison/);
assert.match(css, /data-composition-detail="summary"/);
assert.doesNotMatch(runtime,
  /runComposition|requestSubmit|\.submit\s*\(|crypto\.subtle|localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const relation = labPayload.relations[0];
const request = { problem: "Compare an explicit finite work rerun without scoring it.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 8 },
  seeds: [relation.source], relations: [relation.id], exclusions: [] };
const previous = { result: lab.runComposition(request, labPayload), sha256: "b".repeat(64) };
const actions = comparisons.buildSourceActions(previous, labPayload, readingPayload);
const current = { result: lab.runComposition({ ...request,
  budget: { ...request.budget, work: 9 } }, labPayload), sha256: "c".repeat(64) };
const record = comparisons.buildRerunComparison(previous, current, actions,
  labPayload, readingPayload);
assert.equal(record.actions[0].disposition, "present-in-executed-request");
assert.equal(record.requestChanges[0].control, "budget.work");
assert.equal(record.result.relations.changed[0].beforeDecision, "capacity-limited");
assert.equal(record.result.relations.changed[0].afterDecision, "admitted");
assert.equal(record.previousResultSha256, "b".repeat(64));
assert.equal(record.currentResultSha256, "c".repeat(64));

console.log("OK comparison_pages=1 action=present request=work:8->9 relation=capacity-limited->admitted auto_run=false");
