"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const result = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "concept-basket-baseline-05.json"), "utf8"));

assert.equal(result.campaign_id, "SUJ-05");
assert.equal(result.custody.frozen_commit, "7692a65");
assert.equal(result.results.length, 10);
assert.equal(new Set(result.results.map((row) => row.assignment_id)).size, 10);
assert.ok(result.results.every((row) => row.first_ten_families.length <= 10));
assert.ok(result.results.every((row) => row.visible_intended_count === row.visible_intended_families.length));
assert.equal(result.summary.exposes_two_intended_families + result.summary.below_two_intended_families, 10);
assert.equal(result.summary.admitted, result.summary.exposes_two_intended_families >= result.summary.admission_threshold);

console.log(`OK campaign=SUJ-05 two-intended=${result.summary.exposes_two_intended_families}/10 admitted=${result.summary.admitted}`);
