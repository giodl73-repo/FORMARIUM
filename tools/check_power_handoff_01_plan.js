"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const power = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "power-meaning-chooser-01.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "competitive-reference", "handoff-visibility-audit-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-48", "manifest.json"), "utf8"));
const entries = fs.readdirSync(path.join(root, "tables", "entries")).filter(name => name.endsWith(".md"));

assert.equal(power.status, "frozen-before-implementation");
assert.equal(power.candidate_edition, "sim-49");
assert.equal(power.query, "power");
assert.equal(power.routes.length, 4);
assert.equal(new Set(power.routes.map(route => route.target)).size, 4);
assert.equal(power.baseline.edition, manifest.edition);
assert.equal(power.baseline.source_commit, manifest.source_commit);
assert.equal(power.baseline.standalone_sha256, manifest.output.sha256);
assert.equal(power.baseline.search_index_sha256, manifest.output.search_index_sha256);
assert.equal(power.baseline.site_identity, manifest.site_checks.identity);
assert.equal(audit.status, "frozen-before-audit");
assert.equal(entries.length, audit.expected_files);
assert.equal(audit.comparison_capture_normalized_character_limit, 5000);
assert.equal(audit.reader_evidence_claimed, false);
for (const route of power.routes) assert.ok(fs.existsSync(path.join(root, route.target)), route.target);
console.log(`OK power_routes=4 audit_files=${entries.length} baseline=${manifest.edition} candidate=sim-49 frozen=true`);

