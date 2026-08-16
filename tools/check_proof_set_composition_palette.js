"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const palette = require("../volumes/01-structure-quantity-choice/proof-set-composition-palette.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-19");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-palette.js"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");
const siteCss = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");

assert.equal(manifest.edition, "sim-19", "concept-palette edition");
assert.equal(manifest.site_checks.composition_palette_groups, 6, "six site palette groups");
assert.equal(manifest.composition_palette_checks.concept_groups, 6, "six exact groups");
assert.equal(manifest.composition_palette_checks.concept_controls, 12, "12 exact controls");
assert.equal(manifest.composition_palette_checks.relation_readiness_records, 6,
  "six readiness records");
assert.equal(manifest.composition_palette_checks.natural_language_semantic_selection, false,
  "problem prose remains graph-inert");
assert.equal(manifest.composition_palette_checks.automatic_selection, false,
  "palette selects nothing automatically");
assert.equal(manifest.composition_palette_checks.disabled_relations, 0,
  "palette disables no relation");
assert.equal(manifest.composition_palette_checks.persistence, "none", "palette stores nothing");

for (const marker of [
  "Choose one to three concepts by topic",
  "Read the concept-palette contract",
  'src="assets/composition-palette.js"'
]) assert.ok(page.includes(marker), `palette page includes ${marker}`);
assert.ok(page.indexOf('src="assets/composition-reading.js"') <
  page.indexOf('src="assets/composition-palette.js"'), "palette loads after exact bindings");
assert.match(siteCss, /\.lab-concept-group/, "site contains concept-group styles");
assert.match(siteCss, /\[data-readiness="seed-ready"\]/, "site contains readiness styles");

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
const groups = palette.anchorGroups(readingPayload);
assert.equal(groups.length, 6, "generated payload groups exactly");
assert.equal(groups.flatMap((group) => group.factors).length, 12, "all endpoint factors grouped");
const defaultReadiness = palette.deriveReadiness({
  seeds: [labPayload.relations[0].source],
  relations: [labPayload.relations[0].id],
  direction: "forward"
}, labPayload);
assert.equal(defaultReadiness.filter((record) => record.status === "seed-ready").length, 1,
  "default has one ready relation");
assert.ok(defaultReadiness.every((record) => typeof record.predecessor === "string"),
  "every readiness record names exact predecessor");
assert.ok(!/localStorage|sessionStorage|indexedDB|\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(runtime),
  "palette runtime has no persistence or network mechanism");

console.log(`OK groups=${groups.length} concepts=${groups.flatMap((group) => group.factors).length} ` +
  `ready=${defaultReadiness.filter((record) => record.status !== "needs-predecessor").length}`);
