"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const closureMap = require("../volumes/01-structure-quantity-choice/proof-set-composition-map.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-21");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-map.js"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.ok(Number(manifest.edition.split("-")[1]) >= 21, "closure-map edition");
assert.equal(manifest.site_checks.composition_closure_map_pages, 1);
assert.equal(manifest.composition_closure_map_checks.projection_input,
  "identified composition result");
assert.equal(manifest.composition_closure_map_checks.identity,
  "inherits local result SHA-256");
assert.equal(manifest.composition_closure_map_checks.unique_node_records, true);
assert.equal(manifest.composition_closure_map_checks.semantic_edges,
  "admitted typed traversals only");
assert.equal(manifest.composition_closure_map_checks.scope_connectors,
  "non-semantic evaluation ownership");
assert.equal(manifest.composition_closure_map_checks.svg_alternative,
  "complete HTML records");
assert.equal(manifest.composition_closure_map_checks.removed_stage_records, 0);
assert.equal(manifest.composition_closure_map_checks.storage, "none");
assert.equal(manifest.composition_closure_map_checks.specification,
  "specs/COMPOSITION-CLOSURE-MAP.md");

assert.match(page, /Read the closure-map contract/);
assert.match(page, /src="assets\/composition-map.js"/);
assert.ok(page.indexOf('src="assets/composition-views.js"') <
  page.indexOf('src="assets/composition-map.js"'), "map loads after profiles");
assert.match(css, /\.closure-map__svg/);
assert.match(css, /\.closure-map__scope-edge/);
assert.match(css, /overflow-x: auto/);
assert.doesNotMatch(runtime,
  /localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/,
"map has no storage or network mechanism");

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const relation = labPayload.relations[0];
const result = lab.runComposition({
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [relation.source], relations: [relation.id], exclusions: []
}, labPayload);
const map = closureMap.buildClosureMap(result, labPayload, readingPayload,
  "a".repeat(64));
assert.equal(map.nodes.length, 3);
assert.equal(map.traversals.length, 1);
assert.equal(map.evaluations.length, 1);
assert.equal(map.layout.positions.length, 3);
assert.deepEqual(map.nodes.map((node) => node.artifact).sort(),
  result.graph.nodes.map((node) => node.artifact).sort(),
"site map preserves every admitted node exactly once");

console.log("OK map_pages=1 nodes=3 traversals=1 scope=1 storage=none");
