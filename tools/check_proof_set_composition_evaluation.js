"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-evaluation.js"), "utf8");
const sourceRuntime = fs.readFileSync(path.resolve(
  "volumes/01-structure-quantity-choice/proof-set-composition-evaluation.js"), "utf8");

assert.equal(manifest.edition, "sim-29", "evaluation record is sim-29 gated");
assert.equal(manifest.status,
  "internal simulation rendering; not reader evidence or preview-01");
assert.deepEqual(manifest.composition_evaluation_record_checks, {
  schema: "factorium-composition-evaluation-record-v0",
  projection_input: "identified local result plus explicit user-declared check records",
  outcomes: ["pass", "fail", "unresolved"],
  evidence_status: "user-declared-unverified",
  placement: "after Factor Guide Skeleton and before canonical reading route",
  identity: "separate SHA-256 over canonical evaluation JSON; bound to result SHA-256",
  base_result_mutation: false,
  outcome_scoring: false,
  retrieval: false,
  storage: "none",
  specification: "specs/COMPOSITION-EVALUATION-RECORD.md"
});
assert.equal(manifest.site_checks.composition_evaluation_record_pages, 1);
assert.equal(manifest.site_checks.composition_evaluation_outcomes, 3);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.search_checks.indexed_records, 129,
  "evaluation contract does not become a canonical search destination");
assert.equal(manifest.source_count, 157,
  "evaluation contract is retained as a supporting source");

assert.match(page, /Read the evaluation-record contract/);
assert.match(page, /<script src="assets\/composition-evaluation\.js"><\/script>/);
assert.ok(page.indexOf('src="assets/composition-guide.js"') <
  page.indexOf('src="assets/composition-evaluation.js"'),
"guide renders before its local evaluation workspace");
assert.equal(runtime, sourceRuntime, "generated evaluation runtime matches reviewed source");
assert.match(runtime, /factorium-composition-evaluation-record-v0/);
assert.match(runtime, /user-declared-unverified/);
assert.match(runtime, /result-controls-changed/);
assert.match(runtime, /not reviewed or verified/);
assert.doesNotMatch(runtime,
  /localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|clipboard|createObjectURL/);
assert.match(css, /\.composition-evaluation-workspace/);
assert.match(css, /\.evaluation-receipt__alignment/);
assert.match(css, /\.evaluation-check__include/);

const contract = manifest.sources.find((source) =>
  source.path === "specs/COMPOSITION-EVALUATION-RECORD.md");
assert.ok(contract && /^[a-f0-9]{64}$/.test(contract.sha256),
  "manifest retains exact evaluation contract source");
assert.ok(manifest.site_assets.some((asset) =>
  asset.path === "assets/composition-evaluation.js"),
"site manifest retains evaluation runtime");

console.log(`OK edition=${manifest.edition} outcomes=${manifest.composition_evaluation_record_checks.outcomes.length} ` +
  `sources=${manifest.source_count} storage=${manifest.composition_evaluation_record_checks.storage}`);
