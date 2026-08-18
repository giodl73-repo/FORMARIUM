"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
const campaign = read("campaign-04.json");
const contract = read("result-contract-04.json");
const manifestPath = path.join(root, "target", "proof-set-sim-43", "manifest.json");
const indexPath = path.join(root, "target", "proof-set-sim-43", "index.html");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

assert.equal(campaign.campaign_id, "SUJ-04");
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(contract.status, "frozen-before-execution");
assert.equal(campaign.assignments.length, 25);
assert.equal(campaign.baseline.edition, "sim-43");
assert.equal(campaign.baseline.source_commit, manifest.source_commit);
assert.equal(campaign.baseline.site_identity, manifest.output.site_identity);
assert.equal(campaign.baseline.manifest_sha256, sha(manifestPath));
assert.equal(campaign.baseline.index_sha256, sha(indexPath));
assert.equal(campaign.baseline.search_index_sha256, manifest.output.search_index_sha256);
assert.deepEqual(campaign.hypotheses, { intended_route_minimum: 20, original_task_retention_maximum: 5, explicit_handoff_package_maximum: 5 });
assert.deepEqual(Object.fromEntries(contract.entrances.map((entrance) => [entrance, campaign.assignments.filter((assignment) => assignment.entrance === entrance).length])), { "know-term": 12, "have-question": 10, "learn-or-explore": 3 });
campaign.assignments.forEach((assignment, index) => {
  assert.equal(assignment.id, `SUJ-04-${String(index + 1).padStart(2, "0")}`);
  assert.ok(contract.entrances.includes(assignment.entrance));
  assert.ok(contract.profiles.includes(assignment.task_fit_profile));
  assert.equal(assignment.intended_paths.length > 0, true);
  if (assignment.first_action.type === "literal-search") assert.equal(typeof assignment.first_action.query, "string");
});

console.log("OK campaign=SUJ-04 assignments=25 entrances=12-term+10-question+3-learn hypotheses=3 baseline=sim-43");
