"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "campaign-01.json"), "utf8"));
const referencePath = path.join(root, campaign.reference.path);
const archivePath = path.join(root, campaign.source.local_archive);
const reference = fs.readFileSync(referencePath);
const archive = fs.readFileSync(archivePath);
const lines = reference.toString("utf8").split(/\r?\n/);

assert.equal(campaign.status, "frozen-before-execution");
assert.equal(crypto.createHash("sha256").update(reference).digest("hex"), campaign.reference.sha256);
assert.equal(crypto.createHash("sha256").update(archive).digest("hex"), campaign.source.archive_sha256);
assert.equal(lines.filter((line) => line.startsWith("entry ")).length, campaign.reference.entries);
assert.equal(lines.filter((line) => line.startsWith("sense ")).length, campaign.reference.senses);
assert.equal(campaign.source.proper_name_layers_excluded, true);
assert.equal(campaign.matching.fuzzy_matching, false);
assert.equal(campaign.matching.ambiguous_synsets_retained, true);
assert.equal(campaign.candidate_gate.recurrence_is_admission, false);
assert.equal(campaign.automatic_content_changes, false);
assert.equal(campaign.reader_evidence_claimed, false);
assert.deepEqual(campaign.batch_ceiling, { anchors: 1, views: 2 });
assert.ok(fs.existsSync(path.join(root, "signals", "discover", "websearch", "lexical-closure-source-websearch-2026-08-17.md")));
console.log("OK campaign=LXC-01 entries=53 senses=412 source=OEWN-2025-common fuzzy=false auto-admit=false frozen=true");
