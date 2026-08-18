"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const inventory = JSON.parse(read("fixtures/coverage/mundus-courseware-inventory-01.json"));

assert.equal(inventory.schema, "factorium.mundus-courseware-inventory.v1");
assert.equal(inventory.status, "frozen-source-census-before-factorium-comparison");
assert.equal(inventory.custody.discovery_bridge, "MUNDUS");
assert.equal(inventory.custody.source_owner, "FONTES");
assert.equal(inventory.custody.mundus_commit, "9ab16dbedd0719ffff5dfe3803ee9c8e3256849e");
assert.equal(inventory.custody.fontes_commit, "00a94ceaf4eb3a2edb02858630e70434ddb50cf0");
assert.equal(inventory.custody.mundus_fontes_bridge_sha256,
  "e0fa2fbe03e49433303d2917cfd92f6185b4df24086ba92d5cfaf3d80918bbb0");
assert.equal(inventory.summary.course_surfaces, 338);
assert.equal(inventory.summary.unique_canonical_urls, 338);
assert.equal(inventory.summary.source_files, 92);
assert.deepEqual(inventory.summary.by_evidence_tier,
  { "course-work-record": 54, "homepage-metadata-only": 284 });
assert.deepEqual(inventory.summary.by_source_family, {
  "berkeley-public-course-sites": 35,
  "mit-ocw": 39,
  "mit-ocw-open-learning-library": 1,
  "open-yale-courses": 5,
  "stanford-engineering-everywhere": 9,
  "stanford-public-course-sites": 249,
});
assert.equal(inventory.courses.length, 338);
assert.equal(inventory.source_manifest.length, 92);
assert.equal(new Set(inventory.courses.map((course) => course.source_id)).size, 338);
assert.equal(new Set(inventory.courses.map((course) =>
  course.canonical_url.replace(/\/$/, "").toLowerCase())).size, 338);
for (const course of inventory.courses) {
  for (const key of ["source_id", "source_family", "title", "canonical_url",
    "fetch_policy", "license_status", "evidence_tier", "upstream_path"]) {
    assert.ok(course[key], `${course.source_id || "course"} missing ${key}`);
  }
  if (course.evidence_tier === "homepage-metadata-only") {
    assert.equal(course.fetch_policy, "metadata_only", `${course.source_id} policy`);
    assert.deepEqual(course.subjects, [], `${course.source_id} inferred subjects`);
  }
}

const plan = read("context/waves/2026-08-13-factorium-vision/MUNDUS-CURRICULUM-CLOSURE-01-PLAN.md");
assert.match(plan, /MUNDUS is the discovery\s+bridge\. FONTES owns/i);
assert.match(plan, /title or\s+homepage identity cannot by itself justify a concept admission/i);
assert.match(plan, /Zero change is valid/i);
assert.match(plan, /cannot show curriculum consensus/i);
assert.deepEqual({ anchors: 1, views: 2, relations: 0, discovery_repairs: 1 },
  { anchors: 1, views: 2, relations: 0, discovery_repairs: 1 });

console.log("OK campaign=MCC-01 surfaces=338 unique=338 records=54 metadata=284 sources=92 custody=MUNDUS->FONTES claims=bounded");
