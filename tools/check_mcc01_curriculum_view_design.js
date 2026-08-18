"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const spec = read("specs/MCC-01-CURRICULUM-VIEW-DESIGN.md");
const research = read("signals/discover/websearch/mundus-curriculum-view-research-2026-08-18.md");

assert.match(spec, /Status: candidate design; no canonical content admitted/i);
assert.match(spec, /mapping-optimization-problem-structure/);
assert.match(spec, /procedure-prototype-test-iteration/);
assert.match(spec, /Owner: `choice-alternative-selection`/);
assert.match(spec, /Owner: `requirement-specification-verification-validation`/);
assert.match(spec, /Adds no canonical sense or relation/g);
assert.match(spec, /feasible vs\. acceptable/i);
assert.match(spec, /optimal solution vs\. recommendation/i);
assert.match(spec, /solver termination vs\. optimality proof/i);
assert.match(spec, /prototype vs\. production artifact/i);
assert.match(spec, /user evaluation vs\. conformance/i);
assert.match(spec, /internal rehearsal vs\. reader evidence/i);
assert.match(spec, /Exactly two proposed views and zero anchors\/relations/i);
assert.match(spec, /Do not enumerate linear, quadratic, convex/i);
assert.match(spec, /Do not enumerate design-thinking brands/i);
const admissionPath = path.join(root, "fixtures", "coverage", "mcc-01-curriculum-view-admission.json");
const admitted = fs.existsSync(admissionPath);
assert.equal(fs.existsSync(path.join(root, "tables", "mappings", "optimization-problem-structure.md")), admitted);
assert.equal(fs.existsSync(path.join(root, "tables", "procedures", "prototype-test-iteration.md")), admitted);
if (admitted) {
  const admission = JSON.parse(fs.readFileSync(admissionPath, "utf8"));
  assert.equal(admission.status, "admitted-markdown-before-successor-interchange");
  assert.deepEqual(admission.inventory.delta,
    { entries: 0, anchors: 0, senses: 0, views: 2, relations: 0, discovery_repairs: 0 });
}

for (const authority of ["stanford.edu", "see.stanford.edu", "ibm.com",
  "iso.org", "nist.gov", "w3.org", "gov.uk"]) {
  assert.match(research, new RegExp(authority.replace(".", "\\.")), authority);
}
assert.match(research, /copyrighted\s+standard body is not copied/i);
assert.match(research, /do not make\s+every real-world choice convex/i);
assert.match(research, /cannot establish accessibility conformance/i);
assert.match(research, /Both questions pass established-source research/i);

console.log(`OK campaign=MCC-01 designs=2 owners=2 anchors=0 relations=0 tables=${admitted ? 2 : 0} sources=7 boundaries=optimization/prototype`);
