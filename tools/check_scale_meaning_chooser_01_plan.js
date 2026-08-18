"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "scale-meaning-chooser-01.json"), "utf8"));
const baseline = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-47", "manifest.json"), "utf8"));
const thesaurus = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-result-01.json"), "utf8"));

assert.equal(plan.status, "frozen-before-implementation");
assert.equal(plan.query, "scale");
assert.equal(plan.routes.length, 3);
assert.equal(new Set(plan.routes.map((route) => route.target)).size, 3);
assert.equal(thesaurus.tasks.find((task) => task.id === plan.source_test).pass, false);
assert.equal(baseline.edition, plan.baseline.edition);
assert.equal(baseline.output.sha256, plan.baseline.standalone_sha256);
assert.equal(baseline.output.search_index_sha256, plan.baseline.search_index_sha256);
assert.equal(baseline.output.site_identity, plan.baseline.site_identity);
assert.equal(plan.literal_ranking_unchanged, true);
assert.equal(plan.canonical_reference_unchanged, true);
assert.equal(plan.reader_evidence_claimed, false);
console.log("OK campaign=SCL-01 query=scale routes=3 baseline=sim-47 canonical=false ranking=unchanged frozen=true");

