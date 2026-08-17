"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const campaign = JSON.parse(read("fixtures/query-led-discovery/campaign-02.json"));
const prior = JSON.parse(read("fixtures/query-led-discovery/campaign-01.json"));
const contract = JSON.parse(read("fixtures/query-led-discovery/result-contract-02.json"));
const manifest = JSON.parse(read("target/proof-set-sim-42/manifest.json"));
const searchBytes = fs.readFileSync(path.join(root, "target/proof-set-sim-42/search-index.json"));
const searchDigest = crypto.createHash("sha256").update(searchBytes).digest("hex");

const jobs = [
  "find-and-distinguish", "compare-and-choose", "diagnose-and-explain",
  "compose-and-design", "audit-and-trace", "teach-and-transfer"
];
const contexts = [
  "measurement-physical-science", "software-system-operation",
  "organization-governance-policy", "cross-domain-everyday"
];
const flags = [
  "no-gap-control", "competing-sense", "subtraction-contradiction",
  "incomplete-stop"
];
const required = [
  "id", "revision", "reader_job", "context_class", "reader", "question",
  "intended_output", "context", "forbidden_inference", "candidate_seeds",
  "expected_stress", "stop_condition", "design_flags"
];
const forbidden = [
  "baseline_result", "selected_senses", "closure_state", "gap_codes",
  "disposition", "route", "score"
];

assert.equal(campaign.campaign_id, "QLD-02");
assert.equal(campaign.revision, 1);
assert.equal(campaign.status, "frozen-before-baseline");
assert.equal(campaign.portfolio_focus, "contrast-and-boundary-lookup");
assert.equal(campaign.evidence_class, "internal-authored-rehearsal");
assert.equal(campaign.baseline_edition, "sim-42");
assert.equal(campaign.baseline_source_commit, manifest.source_commit);
assert.equal(campaign.baseline_site_identity, manifest.output.site_identity);
assert.equal(campaign.baseline_search_index_sha256, searchDigest);
assert.equal(campaign.packets.length, 24);

const priorQuestions = new Set(prior.packets.map((packet) => packet.question));
const ids = new Set();
const cells = new Set();
const jobCounts = Object.fromEntries(jobs.map((job) => [job, 0]));
const contextCounts = Object.fromEntries(contexts.map((context) => [context, 0]));
const flagCounts = Object.fromEntries(flags.map((flag) => [flag, 0]));

campaign.packets.forEach((packet, index) => {
  const expectedId = `QLD-02-${String(index + 1).padStart(2, "0")}`;
  assert.equal(packet.id, expectedId);
  assert.ok(!ids.has(packet.id), `duplicate packet id ${packet.id}`);
  ids.add(packet.id);
  required.forEach((field) => assert.ok(Object.hasOwn(packet, field), `${packet.id} missing ${field}`));
  forbidden.forEach((field) => assert.ok(!Object.hasOwn(packet, field), `${packet.id} prematurely contains ${field}`));
  assert.equal(packet.revision, 1);
  assert.ok(jobs.includes(packet.reader_job), `${packet.id} unknown job`);
  assert.ok(contexts.includes(packet.context_class), `${packet.id} unknown context`);
  assert.ok(packet.reader.length >= 20, `${packet.id} reader is too vague`);
  assert.ok(packet.question.endsWith("?"), `${packet.id} question is not explicit`);
  assert.ok(packet.question.includes(",") || /\b(?:and|or|versus)\b/i.test(packet.question),
    `${packet.id} lacks an explicit contrast`);
  assert.ok(!priorQuestions.has(packet.question), `${packet.id} duplicates QLD-01`);
  assert.ok(packet.context.length >= 2, `${packet.id} needs context`);
  assert.ok(packet.candidate_seeds.length >= 3, `${packet.id} needs at least three seed hypotheses`);

  const cell = `${packet.reader_job}:${packet.context_class}`;
  assert.ok(!cells.has(cell), `duplicate portfolio cell ${cell}`);
  cells.add(cell);
  jobCounts[packet.reader_job] += 1;
  contextCounts[packet.context_class] += 1;
  packet.design_flags.forEach((flag) => {
    assert.ok(flags.includes(flag), `${packet.id} unknown design flag ${flag}`);
    flagCounts[flag] += 1;
  });
});

jobs.forEach((job) => assert.equal(jobCounts[job], 4, `${job} count`));
contexts.forEach((context) => assert.equal(contextCounts[context], 6, `${context} count`));
flags.forEach((flag) => assert.ok(flagCounts[flag] >= 4, `${flag} needs four packets`));

assert.equal(contract.contract_id, "QLD-RC-02");
assert.equal(contract.status, "frozen-before-baseline");
assert.equal(contract.baseline_edition, "sim-42");
assert.equal(contract.required_result_fields.length, 16);
assert.equal(Object.keys(contract.gap_codes).length, 10);
assert.deepEqual(contract.closure_states, ["complete", "incomplete", "contradictory", "truncated"]);
assert.ok(contract.prohibited_measures.includes("simulated_success_rate"));
assert.ok(contract.rules.some((rule) => rule.includes("no QLD-01 question is reused")));

console.log(
  `OK campaign=QLD-02 contract=QLD-RC-02 packets=24 cells=${cells.size} ` +
  `flags=${flags.map((flag) => `${flag}:${flagCounts[flag]}`).join(",")} baseline=sim-42`
);

