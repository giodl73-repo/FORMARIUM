"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const reading = require("../volumes/01-structure-quantity-choice/proof-set-composition-reading.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-17");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const labRuntime = fs.readFileSync(path.join(siteRoot, "assets", "composition-lab.js"), "utf8");
const routeRuntime = fs.readFileSync(path.join(siteRoot, "assets", "composition-reading.js"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

const editionNumber = Number(manifest.edition.split("-")[1]);
assert.ok(Number.isInteger(editionNumber) && editionNumber >= 17, "reading-route edition");
assert.equal(manifest.composition_reading_checks.artifact_bindings, 18, "all artifacts bound");
assert.equal(manifest.composition_reading_checks.endpoint_bindings, 12, "all endpoints bound");
assert.equal(manifest.composition_reading_checks.scope_bindings, 6, "all scopes bound");
assert.equal(manifest.composition_reading_checks.projection_scope, "admitted graph nodes only",
  "route does not expand closure");
assert.equal(manifest.composition_reading_checks.persistence, "none", "route stores nothing");
assert.ok(page.includes("route the admitted closure into the book"), "page explains route outcome");
assert.ok(page.includes("Read the reading-route contract"), "page links route contract");
assert.ok(page.indexOf('src="assets/composition-lab.js"') <
  page.indexOf('src="assets/composition-reading.js"'), "route extension loads after lab");
assert.ok(labRuntime.includes("FACTORIUM_COMPOSITION_READING_ROUTE_RENDER"),
  "lab runtime exposes bounded render hook");

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
reading.validatePayload(readingPayload);
assert.equal(readingPayload.referenceSha256, labPayload.referenceSha256,
  "reading and closure share reference identity");
assert.equal(readingPayload.relationsSha256, labPayload.relationsSha256,
  "reading and closure share relation identity");
const relationArtifacts = new Set(labPayload.relations.flatMap((relation) =>
  [relation.source, relation.target, relation.scope]));
assert.deepEqual(new Set(readingPayload.bindings.map((binding) => binding.artifact)),
  relationArtifacts, "bindings cover exactly the reviewed relation artifacts");
for (const binding of readingPayload.bindings) {
  assert.ok(fs.statSync(path.join(siteRoot, binding.href)).isFile(),
    `reading destination exists for ${binding.artifact}`);
}

const f1 = labPayload.relations[0];
const result = lab.runComposition({
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6 },
  seeds: [f1.source], relations: [f1.id], exclusions: []
}, labPayload);
const route = reading.buildReadingRoute(result, readingPayload, "f".repeat(64));
assert.equal(route.pages.length, 2, "default closure becomes two book pages");
assert.deepEqual(route.pages.map((record) => record.stage), ["start", "evaluate"],
  "default route stage order");
assert.equal(route.pages[0].bindings.length, 2, "anchor deduplicates both endpoint factors");
assert.ok(route.pages.every((record) => fs.existsSync(path.join(siteRoot, record.href))),
  "default route destinations exist");

for (const source of [labRuntime, routeRuntime]) {
  assert.ok(!/localStorage|sessionStorage|indexedDB|\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(source),
    "composition reading has no storage or network mechanism");
}

console.log(`OK bindings=${readingPayload.bindings.length} pages=${route.pages.length} ` +
  `stages=${route.pages.map((record) => record.stage).join(",")}`);
