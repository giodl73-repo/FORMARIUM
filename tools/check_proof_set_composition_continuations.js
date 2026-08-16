"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const continuations = require("../volumes/01-structure-quantity-choice/proof-set-composition-continuations.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-26");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-continuations.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.ok(Number(manifest.edition.split("-")[1]) >= 26, "continuation edition");
assert.equal(manifest.site_checks.composition_continuation_pages, 1);
assert.equal(manifest.site_checks.composition_continuation_actions, 3);
assert.deepEqual(manifest.composition_continuation_checks.action_kinds,
  ["raise-budget", "add-seed", "remove-exclusion"]);
assert.deepEqual(manifest.composition_continuation_checks.target_controls,
  ["depth", "edges", "nodes", "work", "seeds", "exclusions"]);
assert.equal(manifest.composition_continuation_checks.application,
  "one explicit control edit per activation");
assert.equal(manifest.composition_continuation_checks.stale_precondition, "exact before-value");
assert.equal(manifest.composition_continuation_checks.auto_run, false);
assert.equal(manifest.composition_continuation_checks.result_prediction, false);
assert.equal(manifest.composition_continuation_checks.storage, "none");
assert.match(page, /Read the explicit-continuations contract/);
assert.ok(page.indexOf('src="assets/composition-reconciliation.js"') <
  page.indexOf('src="assets/composition-continuations.js"'));
assert.match(css, /\.composition-continuations__list/);
assert.match(css, /data-reader-profile="compact"/);
assert.doesNotMatch(runtime,
  /runComposition|requestSubmit|\.submit\s*\(|crypto\.subtle|localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const relation = labPayload.relations[0];
const result = lab.runComposition({
  problem: "Review one exact dependency and choose whether to edit the next request.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward", budget: { depth: 1, edges: 1, nodes: 6, work: 8 },
  seeds: [relation.source], relations: [relation.id], exclusions: []
}, labPayload);
const record = continuations.buildContinuations(result, labPayload, readingPayload, "d".repeat(64));
assert.equal(record.actions.length, 1);
assert.equal(record.actions[0].kind, "raise-budget");
assert.deepEqual(record.actions[0].target, { control: "work", before: 8, after: 9 });
assert.equal(record.resultSha256, "d".repeat(64));

console.log("OK continuation_pages=1 kinds=3 action=work:8->9 explicit=true auto_run=false");
