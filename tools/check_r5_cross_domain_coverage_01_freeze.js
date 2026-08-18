"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const campaign = JSON.parse(read("fixtures/coverage/r5-cross-domain-coverage-01.json"));

assert.equal(campaign.status, "frozen-before-corpus-comparison");
assert.equal(campaign.baseline.source_commit, "587f56fa69583ec6e9487bc13e848f9c5b106744");
assert.equal(campaign.baseline.reference_v1_sha256, sha("reference/factorium-reference-v1.factorium"));
assert.equal(campaign.baseline.assurance_v1_sha256, sha("reference/factorium-assurance-v1.factorium"));
assert.equal(campaign.baseline.relations_v0_sha256, sha("reference/factorium-relations-v0.factorium"));
assert.equal(campaign.baseline.search_index_sha256, sha("target/proof-set-sim-49/search-index.json"));
assert.deepEqual(campaign.admission_ceiling,
  { anchors: 1, views: 2, relations: 0, discovery_repairs: 1 });
assert.equal(campaign.packets.length, 24);
assert.equal(new Set(campaign.packets.map((packet) => packet.id)).size, 24);
assert.equal(new Set(campaign.packets.map((packet) => packet.question)).size, 24);

const required = ["id", "domain", "reader_job", "reader", "question", "output",
  "context", "forbidden", "seeds", "stress", "stop", "sources"];
for (const packet of campaign.packets) {
  for (const field of required) assert.ok(packet[field]?.length, `${packet.id} missing ${field}`);
  assert.ok(campaign.domains.includes(packet.domain), `${packet.id} domain`);
  assert.ok(campaign.reader_jobs.includes(packet.reader_job), `${packet.id} job`);
  assert.ok(packet.seeds.length >= 2, `${packet.id} seeds`);
  for (const source of packet.sources) assert.ok(campaign.sources[source], `${packet.id} source ${source}`);
}
for (const domain of campaign.domains) {
  const packets = campaign.packets.filter((packet) => packet.domain === domain);
  assert.equal(packets.length, 6, `${domain} count`);
  assert.deepEqual(new Set(packets.map((packet) => packet.reader_job)), new Set(campaign.reader_jobs));
}

const plan = read("context/waves/2026-08-13-factorium-vision/R5-CROSS-DOMAIN-COVERAGE-01-PLAN.md").toString();
const evidence = read("signals/discover/websearch/r5-cross-domain-coverage-websearch-2026-08-18.md").toString();
assert.match(plan, /zero change is valid/i);
assert.match(plan, /cannot show that a reader would find/i);
assert.match(evidence, /four of four claims confirmed/i);
assert.doesNotMatch(`${plan}\n${evidence}`, /reader success rate|simulated readers|market demand/i);
console.log("OK campaign=R5C-01 packets=24 domains=4 jobs=6 sources=8 caps=1/2/0/1 baseline=sim-49 claims=internal-only");
