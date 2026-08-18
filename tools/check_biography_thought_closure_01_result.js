"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const result = JSON.parse(read("fixtures/coverage/biography-thought-closure-dispositions-01.json"));

assert.equal(result.schema, "factorium.biography-thought-closure-dispositions.v1");
assert.equal(result.status, "complete-research-only-no-admission");
assert.equal(result.baseline.portfolio_sha256, sha(result.baseline.portfolio_path));
assert.equal(result.baseline.reference_sha256, sha(result.baseline.reference_path));
assert.equal(result.summary.packets, 24);
assert.equal(result.summary.distinction_occurrences, 179);
assert.equal(result.summary.distinct_terms, 134);
assert.equal(result.dispositions.length, 134);
assert.equal(new Set(result.dispositions.map((row) => row.normalized_term)).size, 134);
assert.deepEqual(result.summary.disposition_counts, {
  "covered-compositionally": 40,
  "covered-directly": 26,
  "domain-specialization": 18,
  "held-agency-action-owner-research": 9,
  "historically-specific-specialization": 25,
  "recommended-contribution-credit-view-research": 16
});
assert.deepEqual(result.portfolio_decision.continue, ["contribution-credit-priority-legacy"]);
assert.deepEqual(result.portfolio_decision.hold, ["actor-agency-intention-collective-action"]);
assert.deepEqual(result.portfolio_decision.admit_now, []);
assert.equal(result.summary.admitted_anchors, 0);
assert.equal(result.summary.admitted_views, 0);
assert.equal(result.summary.admitted_relations, 0);
assert.equal(result.summary.discovery_repairs, 0);
for (const row of result.dispositions) {
  assert.ok(row.packet_ids.length && row.lanes.length && row.reason);
  assert.ok(row.owner_entry_ids.length >= 1);
}
assert.match(result.claims_boundary, /no historical truth/i);
console.log("OK campaign=BTC-01 packets=24 occurrences=179 terms=134 direct=26 compositional=40 specialized=43 credit=16 agency-hold=9 admission=0");
