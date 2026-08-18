"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const blueprint = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "philosophy", "global-philosophy-counter-sample-blueprint-01.json"), "utf8"));
const literature = fs.readFileSync(path.join(root, "signals", "discover", "literature", "global-philosophy-counter-sample-literature-2026-08-17.md"), "utf8");
const roles = fs.readFileSync(path.join(root, "signals", "roles", "check", "global-philosophy-counter-sample-blueprint-01-roles-check-2026-08-17.md"), "utf8");

assert.equal(blueprint.campaign_id, "GPC-01");
assert.equal(blueprint.status, "frozen-before-source-search");
assert.equal(blueprint.lanes.length, 12);
assert.equal(new Set(blueprint.lanes.map(({ id }) => id)).size, 12);
assert.equal(blueprint.execution_order.length, 9);
assert.equal(blueprint.admission_rules.no_automatic_content, true);
assert.equal(blueprint.reader_evidence_claimed, false);
assert.equal(blueprint.global_completeness_claimed, false);
assert.ok(blueprint.packet_fields.includes("translation_terms_and_losses"));
assert.ok(blueprint.packet_fields.includes("internal_disagreement"));
assert.ok(blueprint.lanes.filter(({ custody_gate }) => custody_gate).length >= 2);
assert.match(blueprint.admission_rules.cross_tradition_gap, /at least three/);
assert.match(blueprint.admission_rules.cross_tradition_gap, /at least two lanes/);

for (const token of ["PHASE 1 COMPLETE:", "PHASE 2 COMPLETE: sources=18", "PHASE 3 COMPLETE:", "PHASE 4 COMPLETE:", "C-33 PASS"]) {
  assert.ok(literature.includes(token), `missing literature token: ${token}`);
}
assert.match(roles, /P1 blockers: 0 \| P2 issues: 0 \| P3 notes: 30/);
assert.match(roles, /Verdict: APPROVED/);

console.log("OK campaign=GPC-01 lanes=12 stages=9 sources=18 auto_admit=false global_complete=false");
