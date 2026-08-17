"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const home = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
const guideName = "guides-evidence-informed-intervention-choice.html";
const guide = fs.readFileSync(path.join(siteRoot, "entries", guideName), "utf8");
const digest = "67b407f1b9efcfe97a7319baa8f39dc14df007a1ef92e29d01a4502ad15ceb3f";

assert.equal(manifest.site_checks.problem_led_targets, 6,
  "six problem-led destinations remain");
assert.equal(manifest.site_checks.composition_trace_targets, 6,
  "six read-only trace panels remain");
assert.equal(manifest.site_checks.composition_starter_cards, 5,
  "five interactive starters remain");
assert.equal(manifest.composition_lab_checks.relation_records, 6,
  "Lab remains on six allowlisted relations");
assert.equal(manifest.composition_lab_checks.canonical_relation_records, 11,
  "canonical graph retains eleven relations");

const card = home.match(
  /<li><span class="site-problem-state">Incomplete trace (?:&#183;|·) five checks unresolved<\/span>[\s\S]*?<\/li>/
);
assert.ok(card, "combined Decision problem card is rendered");
assert.ok(card[0].includes("Evaluate an intervention choice across concepts"),
  "card leads with the complete decision task");
for (const family of ["evidence", "causal scope", "consequences", "value", "constraints"]) {
  assert.ok(card[0].includes(family), `card names ${family}`);
}
assert.ok(card[0].includes(`href="entries/${guideName}"`),
  "card resolves to the existing full guide");
assert.ok(card[0].includes("Read-only trace · not available in Compose"),
  "read-only capability boundary is visible");
assert.ok(!card[0].includes("compose.html#starter-"),
  "combined card has no Compose starter link");

assert.ok(home.includes('data-trace-id="decision-bridge-five-relation-closure"'),
  "Explorer renders the combined trace");
assert.ok(home.includes(digest), "Explorer renders the exact combined digest");
assert.ok(home.includes("5 seeds · 10 nodes · 5 joins"),
  "Explorer exposes combined closure counts");
assert.ok(home.includes("generated from 6 exact trace manifests"),
  "Explorer reports its actual trace count");
assert.ok(!home.includes('data-trace-id="evidence-qualifies-alternative-evaluation"'),
  "narrow evidence trace no longer duplicates the Decision homepage slot");
assert.ok(guide.includes("canonical-five-bridge-decision-closure"),
  "guide renders the combined reading section");
assert.ok(guide.includes(digest), "guide binds the combined trace identity");

console.log("OK problems=6 traces=6 starters=5 decision=5s/5e/10n read-only/incomplete");
