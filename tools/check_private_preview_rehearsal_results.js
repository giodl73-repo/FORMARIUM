const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "private-preview-rehearsal");
const load = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha256 = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const campaign = load("campaign-01.json");
const contract = load("result-contract-01.json");
const results = load("results-01.json");

assert(sha256("campaign-01.json") === "61c392519f91273e5d4c8be3ca0160763c2ccdb4807fd8aae3cfdad44505ceb6", "campaign freeze drift");
assert(sha256("result-contract-01.json") === "05736f4275ca394f191eec82b2cda0d5fd6a63d97d71b3e17ad9a101678c6796", "contract freeze drift");
assert(results.campaign_id === campaign.campaign_id && results.campaign_revision === campaign.revision, "result campaign drift");
assert(results.contract_id === contract.contract_id && results.results.length === campaign.tasks.length, "result coverage drift");
assert(results.executed_against.site_identity === campaign.candidate.site_identity, "candidate custody drift");

const ids = results.results.map((result) => result.task_id);
assert(JSON.stringify(ids) === JSON.stringify(campaign.tasks.map((task) => task.id)), "task order or identity drift");
results.results.forEach((result, index) => {
  contract.required_result_fields.forEach((field) => assert(Object.hasOwn(result, field), `${result.task_id} missing ${field}`));
  assert(result.strategy === campaign.tasks[index].strategy, `${result.task_id} strategy drift`);
  assert(result.requirement_results.length === campaign.tasks[index].mechanical_requirements.length, `${result.task_id} requirement coverage drift`);
  assert(result.requirement_results.every((item) => contract.requirement_states.includes(item.state)), `${result.task_id} invalid requirement state`);
  assert(contract.artifact_states.includes(result.artifact_state), `${result.task_id} invalid artifact state`);
  assert(contract.dispositions.includes(result.disposition), `${result.task_id} invalid disposition`);
  contract.prohibited_measures.forEach((measure) => {
    assert(!Object.hasOwn(result.mechanical_observations, measure), `${result.task_id} contains prohibited measure ${measure}`);
  });
});

assert(results.summary.task_records === 6 && results.summary.requirement_records === 27, "summary denominator drift");
assert(results.summary.requirements_present === 27 && results.summary.requirements_missing === 0, "requirements did not reach fixed point");
assert(JSON.stringify(results.summary.artifact_states) === JSON.stringify({ reached: 6, blocked: 0, invalid: 0 }), "artifact state summary drift");
assert(results.summary.findings === 0, "unresolved artifact finding remains");
assert(results.summary.reader_evidence === "not collected", "reader evidence boundary drift");
console.log(`OK campaign=${campaign.campaign_id} tasks=6 requirements=27 missing=0 findings=0 reader_evidence=not-collected`);
