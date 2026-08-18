"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const result = JSON.parse(read("fixtures/coverage/mcc-01-curriculum-view-admission.json"));
const reference = read("reference/factorium-reference-v1.factorium");
const assurance = read("reference/factorium-assurance-v1.factorium");

assert.equal(result.schema, "factorium.mcc01-curriculum-view-admission.v1");
assert.equal(result.status, "admitted-markdown-before-successor-interchange");
assert.equal(result.baseline.source_commit, "3429a549a7fcd1daddad74241aefc949671b438f");
assert.equal(result.baseline.reference_v1_sha256, sha("reference/factorium-reference-v1.factorium"));
assert.equal(result.baseline.assurance_v1_sha256, sha("reference/factorium-assurance-v1.factorium"));
assert.equal(result.baseline.relations_v0_sha256, sha("reference/factorium-relations-v0.factorium"));
assert.equal(result.baseline.design_sha256, sha(result.baseline.design_path));
assert.deepEqual(result.inventory.before, { entries: 54, views: 97 });
assert.deepEqual(result.inventory.after_markdown, { entries: 54, views: 99 });
assert.deepEqual(result.inventory.delta,
  { entries: 0, anchors: 0, senses: 0, views: 2, relations: 0, discovery_repairs: 0 });
assert.equal(result.records.length, 2);
assert.equal(result.custody.admission_review_bindings, 2);
assert.match(result.custody.formal_interchange_assurance, /deferred until a supported successor/i);
assert.equal(result.exposure.sim49, false);

for (const record of result.records) {
  const table = read(record.path);
  assert.equal(record.source_sha256, sha(record.path), `${record.id} digest`);
  assert.ok(fs.existsSync(path.join(root, record.review_path)), `${record.id} review`);
  assert.match(reference, new RegExp(`^entry ${record.owner_entry_id} \\|`, "m"), `${record.id} owner`);
  const ownerStart = reference.indexOf(`entry ${record.owner_entry_id} |`);
  const ownerEnd = reference.indexOf("\nend-entry", ownerStart);
  const ownerBlock = reference.slice(ownerStart, ownerEnd);
  for (const sense of record.sense_ids) {
    assert.match(ownerBlock, new RegExp(`^sense ${sense} \\|`, "m"), `${record.id} sense ${sense}`);
    assert.match(table, new RegExp(`\\b${sense.replaceAll("-", "-")}\\b`), `${record.id} table sense ${sense}`);
  }
  assert.doesNotMatch(reference, new RegExp(`^view ${record.id} \\|`, "m"), `${record.id} premature interchange`);
  assert.doesNotMatch(assurance, new RegExp(`^review view:${record.id} \\|`, "m"), `${record.id} premature assurance`);
}

const optimization = read("tables/mappings/optimization-problem-structure.md");
assert.match(optimization, /Source role \| Target role \| Direction and conditions \| Retained loss or mismatch/);
assert.match(optimization, /feasible vs\. acceptable/i);
assert.match(optimization, /optimal solution vs\. recommendation/i);
assert.match(optimization, /solver termination vs\. optimality support/i);
assert.match(optimization, /Mappings are contextual and many-to-many/i);
assert.match(optimization, /Enumeration stop/i);

const prototype = read("tables/procedures/prototype-test-iteration.md");
assert.match(prototype, /\| 10\. Rerun or stop \|/);
assert.match(prototype, /user evaluation vs\. conformance/i);
assert.match(prototype, /internal rehearsal vs\. reader evidence/i);
assert.match(prototype, /Personal or sensitive data require explicit authority/i);
assert.match(prototype, /Enumeration stop/i);
assert.match(result.claims_boundary, /no reader evidence/i);

console.log("OK campaign=MCC-01 admission=2 owners=2 senses=12 markdown=54/99 delta=0/2/0 V1=unchanged assurance=deferred claims=bounded");
