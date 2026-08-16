"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const reading = require("../volumes/01-structure-quantity-choice/proof-set-composition-reading.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-18");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");
const siteCss = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");

const editionNumber = Number(manifest.edition.split("-")[1]);
assert.ok(Number.isInteger(editionNumber) && editionNumber >= 18, "factor-focus edition");
assert.equal(manifest.site_checks.composition_factor_focus_records, 12,
  "site records all factor focuses");
assert.equal(manifest.composition_factor_focus_checks.factor_focus_records, 12,
  "12 reviewed endpoints receive focus");
assert.equal(manifest.composition_factor_focus_checks.anchor_pages, 6,
  "focuses occur on six anchor pages");
assert.equal(manifest.composition_factor_focus_checks.scope_focus_records, 0,
  "whole scope views receive no factor focus");
assert.equal(manifest.composition_factor_focus_checks.canonical_source_mutation, false,
  "focus does not rewrite canonical Markdown");
assert.ok(page.includes("Read the factor-focus contract"), "compose page links focus contract");
assert.match(siteCss, /\.factor-focus\s*\{[^}]*display:\s*none;/s,
  "focus cards are hidden by default");
assert.match(siteCss, /\.factor-focus:target\s*\{[^}]*display:\s*block;/s,
  "targeted focus card is visible");
assert.match(siteCss, /prefers-reduced-motion:\s*reduce/, "focus honors reduced motion");

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const labPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const readingPayload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_READING));
reading.validatePayload(readingPayload);
const anchors = readingPayload.bindings.filter((binding) => binding.kind === "anchor");
const scopes = readingPayload.bindings.filter((binding) => binding.kind === "view");
assert.equal(anchors.length, 12, "12 anchor bindings");
assert.equal(scopes.length, 6, "six view bindings");
assert.ok(anchors.every((binding) => binding.focusHref), "every endpoint has focus destination");
assert.ok(scopes.every((binding) => binding.focusHref === undefined),
  "scope views remain whole-page destinations");

const focusPages = new Set();
for (const binding of anchors) {
  const [relativePage, focusId] = binding.focusHref.split("#");
  assert.equal(relativePage, binding.href, "focus remains on owning page");
  const targetPath = path.join(siteRoot, relativePage);
  const html = fs.readFileSync(targetPath, "utf8");
  focusPages.add(relativePage);
  assert.ok(html.includes(`id="${focusId}"`), `focus fragment exists for ${binding.artifact}`);
  assert.ok(html.includes(binding.artifact), `focus card retains ${binding.artifact}`);
  assert.ok(html.includes("Read the owning Root factorization"), "focus hands off to source section");
}
assert.equal(focusPages.size, 6, "focus cards span six exact pages");

const f1 = labPayload.relations[0];
const result = lab.runComposition({
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [f1.source], relations: [f1.id], exclusions: []
}, labPayload);
const route = reading.buildReadingRoute(result, readingPayload, "f".repeat(64));
assert.equal(route.pages.length, 2, "default route remains deduplicated");
assert.ok(route.pages[0].focusHref.endsWith(
  `#factor-focus-${f1.source.slice("factor:".length).replace("/", "-")}`),
"forward seed owns default focus");
assert.equal(route.pages[1].focusHref, undefined, "evaluative view has no factor fragment");

console.log(`OK focus_records=${anchors.length} pages=${focusPages.size} ` +
  `default=${route.pages[0].focusHref.split("#")[1]}`);
