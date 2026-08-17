"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const home = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
const guideName = "guides-evidence-informed-intervention-choice.html";
const guide = fs.readFileSync(path.join(siteRoot, "entries", guideName), "utf8");

assert.equal(manifest.site_checks.problem_led_targets, 6,
  "six problem-led reading targets");
assert.equal(manifest.site_checks.composition_trace_targets, 6,
  "six read-only trace targets");
assert.equal(manifest.site_checks.composition_starter_cards, 5,
  "five interactive starter cards remain");
assert.equal(manifest.composition_lab_checks.relation_records, 6,
  "Lab remains on six allowlisted relations");
assert.equal(manifest.composition_lab_checks.canonical_relation_records, 11,
  "canonical graph retains eleven relations");

const card = home.match(
  /<li><span class="site-problem-state">Incomplete trace (?:&#183;|·) applicability unresolved<\/span>[\s\S]*?<\/li>/
);
assert.ok(card, "Decision/Evidence problem card is rendered");
assert.ok(card[0].includes(`href="entries/${guideName}"`),
  "read-only card resolves to the full guide");
assert.ok(card[0].includes("Read-only trace · not available in Compose"),
  "read-only capability boundary is visible");
assert.ok(!card[0].includes("compose.html#starter-"),
  "read-only card has no Compose starter link");

assert.ok(home.includes('data-trace-id="evidence-qualifies-alternative-evaluation"'),
  "Composition Explorer renders the canonical trace");
assert.ok(home.includes("50c1116a42480858d4e4f802fcc5071b8067b4517a47be60ffa7978de615bba2"),
  "Composition Explorer renders the exact trace identity");
assert.ok(guide.includes("canonical-evidence-to-evaluation-reading-route"),
  "guide renders the canonical reading section");
for (const stage of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.match(guide, new RegExp(`<td>${stage}<\\/td>`), `guide renders ${stage}`);
}
assert.ok(guide.includes("f27-check-evidence-applicability"),
  "guide renders the unresolved check");
assert.ok(guide.includes("state = <code>incomplete</code>"),
  "guide renders the incomplete stop state");
assert.ok(guide.includes('href="specs-decision-evidence-reading-route.html#'),
  "guide links the local reader-route contract");

console.log("OK problems=6 traces=6 starters=5 decision=read-only/incomplete");
