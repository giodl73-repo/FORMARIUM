"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-test-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-47", "manifest.json"), "utf8"));

assert.equal(plan.status, "frozen-before-execution");
assert.equal(plan.tasks.length, 20);
assert.equal(new Set(plan.tasks.map((task) => task.id)).size, 20);
for (const category of Object.keys(plan.categories)) {
  assert.equal(plan.tasks.filter((task) => task.category === category).length, 5, category);
}
assert.equal(plan.family_window, 5);
assert.equal(plan.artifact.edition, manifest.edition);
assert.equal(plan.artifact.site_identity, manifest.output.site_identity);
assert.equal(plan.artifact.search_index_sha256, manifest.output.search_index_sha256);
assert.equal(plan.automatic_repair, false);
assert.equal(plan.reader_evidence_claimed, false);
console.log("OK campaign=THS-01 tasks=20 categories=4 family-window=5 artifact=sim-47 frozen=true");
