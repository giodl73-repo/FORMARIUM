"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const screen = JSON.parse(read("fixtures/coverage/mundus-curriculum-vocabulary-screen-01.json"));
const result = JSON.parse(read("fixtures/coverage/mundus-curriculum-dispositions-01.json"));

assert.equal(screen.schema, "factorium.mundus-curriculum-vocabulary-screen.v1");
assert.equal(screen.status, "complete-before-manual-owner-disposition");
assert.equal(screen.baseline.portfolio_sha256, sha(screen.baseline.portfolio_path));
assert.equal(screen.baseline.reference_sha256, sha(screen.baseline.reference_path));
assert.deepEqual(screen.summary, {
  record_packets: 24,
  metadata_packets: 24,
  subject_occurrences: 164,
  unique_subject_terms: 148,
  session_tables: 8,
  session_rows: 222,
  screening_counts: {
    "exact-reference-label-review": 4,
    "recurring-manual-review": 12,
    "single-course-manual-review": 132,
  },
});
assert.equal(screen.vocabulary.length, 148);
assert.equal(screen.metadata_packets.length, 24);
assert.equal(screen.session_sources.length, 8);
assert.equal(new Set(screen.vocabulary.map((item) => item.normalized_term)).size, 148);
assert.ok(screen.vocabulary.some((item) => item.normalized_term === "c"));
assert.ok(screen.vocabulary.some((item) => item.normalized_term === "c plus plus"));
for (const packet of screen.metadata_packets) {
  assert.equal(packet.disposition, "source-review-priority-only");
  assert.match(packet.reason, /prohibits concept-candidate extraction/i);
}

assert.equal(result.schema, "factorium.mundus-curriculum-dispositions.v1");
assert.equal(result.status, "complete-research-only-no-admission");
assert.equal(result.baseline.screen_sha256, sha(result.baseline.screen_path));
assert.equal(result.baseline.reference_sha256, screen.baseline.reference_sha256);
assert.equal(result.summary.terms, 148);
assert.deepEqual(result.summary.disposition_counts, {
  "covered-compositionally": 24,
  "covered-directly": 4,
  "domain-label": 12,
  "domain-specialization": 85,
  "held-specialized-view-research": 2,
  "named-tool-or-language": 3,
  "recommended-procedure-view-research": 6,
  "recommended-view-research": 8,
  "source-workflow-tag": 4,
});
assert.equal(result.dispositions.length, 148);
assert.equal(new Set(result.dispositions.map((item) => item.normalized_term)).size, 148);
assert.equal(result.summary.admitted_anchors, 0);
assert.equal(result.summary.admitted_views, 0);
assert.equal(result.summary.discovery_repairs, 0);
assert.deepEqual(result.portfolio_decision.continue,
  ["optimization-problem-structure", "prototype-test-iteration"]);
assert.deepEqual(result.portfolio_decision.hold,
  ["observability-state-estimation", "economic-income-consumption-saving-wealth"]);
assert.deepEqual(result.portfolio_decision.admit_now, []);

const groups = new Map(result.research_groups.map((group) => [group.group_id, group]));
assert.equal(groups.size, 3);
assert.equal(groups.get("optimization-problem-structure").packet_ids.length, 6);
assert.equal(groups.get("optimization-problem-structure").heading_evidence.length, 5);
assert.equal(groups.get("prototype-test-iteration").packet_ids.length, 2);
assert.equal(groups.get("observability-state-estimation").packet_ids.length, 1);
for (const item of result.dispositions) {
  assert.ok(item.disposition, `${item.term} disposition`);
  assert.ok(item.reason, `${item.term} reason`);
  assert.ok(item.packet_ids.length, `${item.term} packet`);
}
assert.match(result.claims_boundary, /no curriculum consensus/i);

console.log("OK campaign=MCC-01 terms=148 direct=4 compositional=24 specialized=85 candidates=2 hold=2 admission=0 session_rows=222");
