const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const campaignPath = path.join(root, "fixtures", "query-led-discovery", "campaign-01.json");
const resultContractPath = path.join(root, "fixtures", "query-led-discovery", "result-contract-01.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const resultContract = JSON.parse(fs.readFileSync(resultContractPath, "utf8"));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const jobs = [
  "find-and-distinguish",
  "compare-and-choose",
  "diagnose-and-explain",
  "compose-and-design",
  "audit-and-trace",
  "teach-and-transfer",
];
const contexts = [
  "measurement-physical-science",
  "software-system-operation",
  "organization-governance-policy",
  "cross-domain-everyday",
];
const requiredFields = [
  "id",
  "revision",
  "reader_job",
  "context_class",
  "reader",
  "question",
  "intended_output",
  "context",
  "forbidden_inference",
  "candidate_seeds",
  "expected_stress",
  "stop_condition",
  "design_flags",
];
const forbiddenResultFields = [
  "baseline_result",
  "selected_senses",
  "closure_state",
  "gap_codes",
  "disposition",
  "route",
  "score",
];

assert(campaign.campaign_id === "QLD-01", "campaign id must be QLD-01");
assert(campaign.revision === 1, "campaign revision must be 1");
assert(campaign.status === "frozen-before-baseline", "campaign must be frozen before baseline");
assert(campaign.baseline_edition === "sim-41", "baseline edition must be sim-41");
assert(campaign.baseline_source_commit === "0f28e15", "baseline source commit must be 0f28e15");
assert(campaign.evidence_class === "internal-authored-rehearsal", "evidence class must stay internal");
assert(Array.isArray(campaign.packets) && campaign.packets.length === 24, "campaign must contain 24 packets");

const ids = new Set();
const cells = new Set();
const jobCounts = Object.fromEntries(jobs.map((job) => [job, 0]));
const contextCounts = Object.fromEntries(contexts.map((context) => [context, 0]));
const flagCounts = {
  "no-gap-control": 0,
  "competing-sense": 0,
  "subtraction-contradiction": 0,
  "incomplete-stop": 0,
};

campaign.packets.forEach((packet, index) => {
  const expectedId = `QLD-01-${String(index + 1).padStart(2, "0")}`;
  assert(packet.id === expectedId, `packet ${index + 1} must have id ${expectedId}`);
  assert(!ids.has(packet.id), `duplicate packet id ${packet.id}`);
  ids.add(packet.id);

  requiredFields.forEach((field) => assert(Object.hasOwn(packet, field), `${packet.id} missing ${field}`));
  forbiddenResultFields.forEach((field) => assert(!Object.hasOwn(packet, field), `${packet.id} prematurely contains ${field}`));
  assert(packet.revision === 1, `${packet.id} revision must be 1`);
  assert(jobs.includes(packet.reader_job), `${packet.id} has unknown reader job`);
  assert(contexts.includes(packet.context_class), `${packet.id} has unknown context`);
  assert(typeof packet.reader === "string" && packet.reader.length >= 20, `${packet.id} reader is too vague`);
  assert(typeof packet.question === "string" && packet.question.endsWith("?"), `${packet.id} question must be explicit`);
  assert(Array.isArray(packet.context) && packet.context.length >= 2, `${packet.id} needs at least two context declarations`);
  assert(Array.isArray(packet.candidate_seeds) && packet.candidate_seeds.length >= 2, `${packet.id} needs candidate seeds`);
  assert(Array.isArray(packet.design_flags), `${packet.id} design flags must be an array`);

  const cell = `${packet.reader_job}:${packet.context_class}`;
  assert(!cells.has(cell), `duplicate portfolio cell ${cell}`);
  cells.add(cell);
  jobCounts[packet.reader_job] += 1;
  contextCounts[packet.context_class] += 1;
  packet.design_flags.forEach((flag) => {
    assert(Object.hasOwn(flagCounts, flag), `${packet.id} has unknown design flag ${flag}`);
    flagCounts[flag] += 1;
  });
});

jobs.forEach((job) => assert(jobCounts[job] === 4, `${job} must appear four times`));
contexts.forEach((context) => assert(contextCounts[context] === 6, `${context} must appear six times`));
Object.entries(flagCounts).forEach(([flag, count]) => assert(count >= 4, `${flag} must appear at least four times`));

assert(resultContract.contract_id === "QLD-RC-01", "result contract id must be QLD-RC-01");
assert(resultContract.revision === 1, "result contract revision must be 1");
assert(resultContract.status === "frozen-before-baseline", "result contract must be frozen before baseline");
assert(resultContract.baseline_edition === "sim-41", "result contract baseline must be sim-41");
assert(resultContract.required_result_fields.length === 16, "result contract must freeze 16 result fields");
assert(Object.keys(resultContract.gap_codes).length === 10, "result contract must freeze QG-0 through QG-9");
for (let index = 0; index <= 9; index += 1) {
  assert(Object.hasOwn(resultContract.gap_codes, `QG-${index}`), `result contract missing QG-${index}`);
}
assert(resultContract.closure_states.join(",") === "complete,incomplete,contradictory,truncated", "closure states changed");
assert(resultContract.prohibited_measures.includes("simulated_success_rate"), "simulated success rate must stay prohibited");
assert(
  resultContract.rules.includes("Design flags balance the frozen portfolio and are not expected result labels."),
  "design flags must not become expected outcomes",
);

console.log(
  `OK campaign=${campaign.campaign_id} contract=${resultContract.contract_id} packets=${campaign.packets.length} cells=${cells.size} ` +
    `jobs=${jobs.length} contexts=${contexts.length} flags=${Object.entries(flagCounts)
      .map(([flag, count]) => `${flag}:${count}`)
      .join(",")}`,
);
