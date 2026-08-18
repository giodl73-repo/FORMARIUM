"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const portfolio = JSON.parse(read("fixtures/coverage/mundus-curriculum-depth-portfolio-01.json"));
const inventory = JSON.parse(read("fixtures/coverage/mundus-courseware-inventory-01.json"));

assert.equal(portfolio.schema, "factorium.mundus-curriculum-depth-portfolio.v1");
assert.equal(portfolio.status, "frozen-before-factorium-comparison");
assert.equal(portfolio.baseline.source_commit, "388e76c33912c8e289740b275a747fabbedad19f");
assert.equal(portfolio.baseline.inventory_sha256, sha(portfolio.baseline.inventory_path));
assert.equal(portfolio.baseline.mundus_commit, inventory.custody.mundus_commit);
assert.equal(portfolio.baseline.fontes_commit, inventory.custody.fontes_commit);
assert.equal(portfolio.summary.courses, 48);
assert.equal(portfolio.courses.length, 48);
assert.equal(portfolio.design.lanes, 8);
assert.equal(portfolio.design.courses_per_lane, 6);
assert.deepEqual(portfolio.summary.by_evidence_tier,
  { "course-work-record": 24, "homepage-metadata-only": 24 });
assert.equal(new Set(portfolio.courses.map((course) => course.packet_id)).size, 48);
assert.equal(new Set(portfolio.courses.map((course) => course.source_id)).size, 48);
assert.deepEqual(Object.values(portfolio.summary.by_lane), [6, 6, 6, 6, 6, 6, 6, 6]);

const inventoryById = new Map(inventory.courses.map((course) => [course.source_id, course]));
for (let index = 0; index < portfolio.courses.length; index += 1) {
  const course = portfolio.courses[index];
  assert.equal(course.packet_id, `MCC-01-${String(index + 1).padStart(2, "0")}`);
  assert.ok(course.selection_roles.length >= 2, `${course.packet_id} roles`);
  assert.ok(course.selection_reason, `${course.packet_id} reason`);
  assert.ok(course.permitted_use, `${course.packet_id} permitted use`);
  const source = inventoryById.get(course.source_id);
  assert.ok(source, `${course.packet_id} source`);
  for (const key of ["source_family", "title", "canonical_url", "fetch_policy",
    "license_status", "evidence_tier", "upstream_path"]) {
    assert.deepEqual(course[key], source[key], `${course.packet_id} ${key}`);
  }
  if (course.evidence_tier === "homepage-metadata-only") {
    assert.match(course.permitted_use, /no concept admission/i, `${course.packet_id} boundary`);
  }
}
for (const lane of Object.keys(portfolio.summary.by_lane)) {
  const selected = portfolio.courses.filter((course) => course.lane === lane);
  assert.equal(selected.length, 6, `${lane} count`);
  assert.ok(selected.some((course) => course.selection_roles.includes("expected-no-gap-control")), `${lane} control`);
  assert.ok(selected.some((course) => course.evidence_tier === "course-work-record"), `${lane} record depth`);
  assert.ok(selected.some((course) => course.evidence_tier === "homepage-metadata-only"), `${lane} breadth`);
}
assert.match(portfolio.design.metadata_boundary, /emit no concept-admission candidate/i);
assert.match(portfolio.design.null_policy, /zero-admission results remain valid/i);

console.log("OK campaign=MCC-01 portfolio=48 lanes=8 per_lane=6 records=24 metadata=24 controls=8 baseline=388e76c");
