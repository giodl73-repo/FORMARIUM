"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const expected = {
  campaign: "ba3df282b3d0c8d031af9bebb623d13992a6821691256a6cd67b2dad0493657d",
  lookups: "91252e9d618ed5c2c83fb3610109a87d5f00f98f058e13ac7df473ac8f6d5487",
  analysis: "2ff2d733e5d6e693ac08091732eaf9f9519d6b6125731585a93452de76535fb8",
  results: "ccdff26d8d8bf3acb6ed48de65d11de29f8f8440420d7fc2c05ac31044534181",
};
const file = (name) => path.join(fixtureRoot, name);
const bytes = (name) => fs.readFileSync(file(name));
const json = (name) => JSON.parse(bytes(name).toString("utf8"));
const sha256 = (name) => crypto.createHash("sha256").update(bytes(name)).digest("hex");

assert.equal(sha256("campaign-01.json"), expected.campaign);
assert.equal(sha256("browse-lookups-01.json"), expected.lookups);
assert.equal(sha256("analysis-01.json"), expected.analysis);
assert.equal(sha256("results-01.json"), expected.results);

const campaign = json("campaign-01.json");
const results = json("results-01.json");
assert.equal(results.campaign_id, campaign.campaign_id);
assert.equal(results.custody.frozen_commit, "ac63455");
assert.equal(results.results.length, 25);
assert.equal(results.summary.personas, 25);
assert.equal(results.summary.queries, 50);
assert.deepEqual(results.summary.relationship, { bridge: 14, "new-reason": 6, replacement: 4, "not-served": 1 });
assert.deepEqual(results.summary.intent, { purpose: 15, fun: 10 });
assert.deepEqual(results.summary.task_shape, { contrast: 10, "composition-evaluation": 10, "lookup-control": 5 });
assert.equal(results.summary.post_definition_mechanism, 20);
assert.equal(results.summary.missing_owner, 0);
assert.equal(results.summary.unresolved_destinations, 0);
assert.deepEqual(results.summary.change_disposition, { "no-change": 24, defer: 1 });
assert.equal(results.summary.falsification.distinct_route_falsified, false);
assert.equal(results.summary.falsification.ownership_readiness_falsified, false);
assert.equal(results.summary.falsification.behavioral_hypothesis_tested, false);

for (const result of results.results) {
  assert.match(result.authored_proxy_reaction.evidence_label, /^Authored synthetic proxy/);
  assert.equal(result.claim_boundary.includes("real person"), true);
  assert.equal(result.mechanical_route.unresolved_destinations, 0);
  assert.ok(result.selected_route.length >= 1);
}

const controls = results.results.filter((result) => result.declared_start.task_shape === "lookup-control");
assert.equal(controls.length, 5);
assert.equal(controls.filter((result) => result.alternative_relationship === "replacement").length, 4);
assert.equal(controls.filter((result) => result.alternative_relationship === "not-served").length, 1);
assert.equal(controls.filter((result) => result.alternative_relationship === "new-reason").length, 0);

const prohibitedKeys = new Set(["reader_success", "reader_time", "completion_rate", "comprehension", "satisfaction", "preference", "usefulness", "return_intent", "adoption"]);
const visit = (value) => {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!prohibitedKeys.has(key), `prohibited synthetic measure key ${key}`);
    visit(child);
  }
};
visit(results);

console.log("OK campaign=SUJ-01 personas=25 queries=50 bridge=14 new-reason=6 replacement=4 not-served=1 post-definition=20 missing-owner=0 behavioral=false");
