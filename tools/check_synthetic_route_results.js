"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const campaign = read("campaign-02.json");
const contract = read("result-contract-02.json");
const output = read("results-02.json");

assert.equal(output.campaign_id, campaign.campaign_id);
assert.equal(output.custody.frozen_commit, "1703de0");
assert.equal(output.custody.campaign_sha256, sha("campaign-02.json"));
assert.equal(output.custody.contract_sha256, sha("result-contract-02.json"));
assert.equal(output.custody.lookup_sha256, sha("browse-lookups-02.json"));
assert.equal(output.custody.analysis_sha256, sha("analysis-02.json"));
assert.equal(output.results.length, 25);
assert.equal(output.summary.queries, 50);

for (const result of output.results) {
  for (const field of contract.required_result_fields) assert.ok(Object.hasOwn(result, field), `${result.persona_id} lacks ${field}`);
  assert.ok(contract.entrances.includes(result.first_entrance));
  assert.ok(contract.inertia_relationships.includes(result.inertia_relationship));
  assert.ok(contract.view_profiles.includes(result.view_profile_hypothesis.profile));
  assert.ok(contract.change_dispositions.includes(result.change_disposition));
  assert.match(result.switch_trigger.evidence_label, /synthetic/i);
  assert.match(result.authored_proxy_response.evidence_label, /synthetic/i);
  assert.match(result.claim_boundary, /does not show/i);
  assert.ok(result.selected_route.length > 0);
}

const prohibited = new Set(contract.prohibited_measure_keys);
const walk = (value, trail = []) => {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!prohibited.has(key), `prohibited behavioral measure key: ${[...trail, key].join(".")}`);
    walk(child, [...trail, key]);
  }
};
walk(output);

assert.deepEqual(output.summary.first_entrance, { compose: 8, none: 1, reader: 2, search: 14 });
assert.deepEqual(output.summary.inertia_relationship, { "stay-with-current": 1, supplement: 16, "switch-for-structure": 8 });
assert.deepEqual(output.summary.view_profile_hypothesis, { abbreviated: 8, book: 9, compact: 4, full: 4 });
assert.deepEqual(output.summary.ordinary_language_landing, { reached: 24, missed: 1, vocabulary_injection_required: 1 });
assert.equal(output.summary.falsification.relevant_destination_falsified, false);
assert.equal(output.summary.falsification.vocabulary_injection_falsified, false);
assert.equal(output.summary.falsification.behavioral_route_choice_tested, false);

console.log("OK campaign=SUJ-02 results=25 queries=50 landing=24/25 injection=1/25 entrances=14-search+8-compose+2-reader+1-none behavioral-claims=0");
