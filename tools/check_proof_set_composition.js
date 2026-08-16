"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");

const manifestPath = process.argv[2];
const homePath = process.argv[3];
assert.ok(manifestPath && homePath,
  "usage: node tools/check_proof_set_composition.js <manifest.json> <index.html>");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const home = fs.readFileSync(homePath, "utf8");
const checks = manifest.composition_checks;

const editionNumber = Number(String(manifest.edition || "").slice(4));
assert.ok(Number.isInteger(editionNumber) && editionNumber >= 15,
  "composition explorer edition");
assert.ok(checks, "composition checks are recorded");
assert.equal(checks.trace_count, 5, "five exact traces");
assert.equal(checks.worksheet_targets, 5, "five exact worksheet targets");
assert.equal(checks.unique_trace_ids, 5, "trace IDs are unique");
assert.deepEqual(checks.states, {
  complete: 2,
  incomplete: 1,
  contradictory: 1,
  truncated: 1
}, "all declared closure states are represented");
assert.equal(checks.records.length, 5, "five trace records are manifested");

const ids = new Set();
for (const record of checks.records) {
  assert.match(record.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "canonical trace ID");
  assert.match(record.sha256, /^[a-f0-9]{64}$/, "exact trace SHA-256");
  assert.ok(record.seeds >= 1 && record.nodes >= 1 && record.edges >= 1,
    "trace retains seeds, nodes, and a typed edge");
  assert.ok(record.checks >= 1 && record.projections >= 1,
    "trace retains Evaluation and flatten records");
  assert.equal(
    record.work,
    record.seeds + record.nodes + record.edges + record.frontiers +
      record.conflicts + record.checks + record.projections,
    "trace work accounting"
  );
  assert.ok(!ids.has(record.id), "trace ID is not repeated");
  ids.add(record.id);
  assert.ok(home.includes(`data-trace-id="${record.id}"`),
    `home renders trace ${record.id}`);
  assert.ok(home.includes(record.sha256), `home renders digest ${record.id}`);
}

const composeMatch = home.match(/<section id="compose"[\s\S]*?<\/section>\s*<section id="start"/);
assert.ok(composeMatch, "composition explorer appears before the first journey");
const compose = composeMatch[0];
assert.equal((compose.match(/<details class="site-trace"/g) || []).length, 5,
  "five trace disclosure panels");
assert.equal((compose.match(/data-trace-state=/g) || []).length, 5,
  "every panel exposes state");
assert.equal((compose.match(/<details class="site-trace"[^>]* open>/g) || []).length, 1,
  "one trace is initially expanded");
assert.equal((compose.match(/Read the full Factor Guide/g) || []).length, 5,
  "every trace resolves to a full guide");
for (const operation of ["Add", "Multiply", "Evaluate", "Stop", "Flatten"]) {
  assert.ok(compose.includes(operation), `${operation} operation is visible`);
}
assert.ok(!/<form\b|<input\b|<button\b/i.test(compose),
  "explorer does not imply live query construction");

console.log(
  `OK traces=${checks.trace_count} states=${Object.keys(checks.states).length} ` +
  `worksheets=${checks.worksheet_targets}`
);
