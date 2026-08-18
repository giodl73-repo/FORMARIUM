"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const result = JSON.parse(read("fixtures/coverage/btc-01-contribution-credit-view-admission.json"));
const view = read(result.admitted.path);
const reference = read(result.baseline.reference_path);

assert.equal(result.schema, "factorium.btc01-contribution-credit-view-admission.v1");
assert.equal(result.status, "admitted-markdown-view-successor-integration-deferred");
assert.equal(result.baseline.baseline_sha256, sha(result.baseline.baseline_path));
assert.equal(result.baseline.portfolio_sha256, sha(result.baseline.portfolio_path));
assert.equal(result.baseline.reference_sha256_before, result.baseline.reference_sha256_after);
assert.equal(result.baseline.reference_sha256_after, sha(result.baseline.reference_path));
assert.equal(result.admitted.sha256, sha(result.admitted.path));
assert.equal(result.admitted.design_sha256, sha(result.admitted.design_path));
assert.equal(result.admitted.research_sha256, sha(result.admitted.research_path));
assert.deepEqual(result.delta, {entries: 0, anchors: 0, senses: 0, views: 1, relations: 0, discovery_repairs: 0});
assert.deepEqual(result.markdown_inventory, {entries: 54, views: 100});
assert.equal(result.admitted.owner_entry_id, "claim-evidence");
assert.deepEqual(result.admitted.sense_ids, ["claim", "evidence-item", "result", "limitation", "confidence", "provenance", "observation", "measurement", "inference"]);

for (const phrase of [
  "Contribution, Credit, Priority, and Legacy Evidence",
  "This view adds no canonical sense",
  "participation vs. contribution",
  "contribution vs. credit",
  "credit vs. causal attribution",
  "priority vs. importance",
  "outcome vs. legacy",
  "provenance vs. truth",
  "disputed",
  "unresolved",
  "No profile may hide"
]) assert.match(view, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

for (const name of ["Abraham Lincoln", "Franklin D. Roosevelt", "Nelson Mandela", "Steven Pinker", "Hannah Arendt", "Rachel Carson", "Rosalind Franklin"]) {
  assert.doesNotMatch(view, new RegExp(name, "i"), `named case leaked into canonical view: ${name}`);
}
assert.doesNotMatch(reference, /evidence-contribution-credit-priority-legacy/);
assert.match(result.claims_boundary, /no historical truth/i);
console.log("OK campaign=BTC-01 admitted_views=1 anchors=0 senses=0 relations=0 inventory=54+100 v1=unchanged successor=deferred");
