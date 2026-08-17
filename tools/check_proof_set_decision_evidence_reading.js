"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const guideName = "guides-evidence-informed-intervention-choice.html";
const guide = fs.readFileSync(path.join(siteRoot, "entries", guideName), "utf8");
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

console.log("OK decision-evidence=guide-only state=incomplete route=preserved");
