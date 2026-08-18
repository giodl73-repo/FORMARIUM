"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const artifact = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-10.json"), "utf8"));

assert.equal(artifact.campaign_id, "SUJ-10");
assert.equal(artifact.status, "frozen-before-repair");
assert.equal(artifact.candidates.length, 2);
assert.equal(artifact.owner_test.minimum_independent_campaigns, 2);
assert.equal(artifact.owner_test.reverse_authored_link_required, true);
assert.equal(artifact.owner_test.new_concept_allowed, false);
assert.equal(artifact.owner_test.typed_relation_allowed, false);
for (const candidate of artifact.candidates) {
  assert.ok(candidate.independent_campaigns.length >= 2, `${candidate.id} recurrence`);
  assert.ok(candidate.frozen_evidence.length >= 2, `${candidate.id} evidence`);
  assert.equal(candidate.reverse_link_present, true, `${candidate.id} reverse link`);
  const reverse = fs.readFileSync(path.join(root, candidate.reverse_link_source), "utf8");
  const targetName = path.basename(candidate.source);
  assert.ok(reverse.includes(`](${targetName})`), `${candidate.id} reverse link drift`);
}
assert.equal(artifact.rerun.required_expanded_deficient_assignments, 7);
assert.equal(artifact.rerun.required_two_family_assignments, 9);
console.log("OK campaign=SUJ-10 candidates=2 recurrence=2+ reverse-links=2 repair-cap=2 frozen=true");
