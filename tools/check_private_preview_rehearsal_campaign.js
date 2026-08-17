const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "private-preview-rehearsal");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-01.json"), "utf8"));
const contract = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "result-contract-01.json"), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const strategies = [
  "onboarding-first",
  "dictionary-first",
  "compare-first",
  "multi-concept-decision",
  "evidence-stop",
  "reader-to-depth",
];
const forbiddenResultFields = [
  "executed_against",
  "mechanical_observations",
  "requirement_results",
  "artifact_state",
  "findings",
  "disposition",
];

assert(campaign.campaign_id === "SIM-PP-01" && campaign.revision === 1, "campaign identity drift");
assert(campaign.status === "frozen-before-execution", "campaign is not frozen");
assert(campaign.evidence_class === "internal-artifact-rehearsal", "evidence class drift");
assert(campaign.candidate.edition === "sim-42", "candidate edition drift");
assert(campaign.candidate.source_commit === "531dea50dafeaf47e4909dbf8b7be93dac3d3021", "candidate source drift");
assert(campaign.candidate.search_records === 185 && campaign.candidate.site_pages === 239, "candidate counts drift");
assert(Array.isArray(campaign.tasks) && campaign.tasks.length === 6, "campaign must freeze six tasks");
assert(contract.contract_id === "SIM-PP-RC-01" && contract.status === "frozen-before-execution", "contract drift");

const ids = new Set();
campaign.tasks.forEach((task, index) => {
  const expectedId = `SIM-PP-${String(index + 1).padStart(2, "0")}`;
  assert(task.id === expectedId, `task ${index + 1} id drift`);
  assert(!ids.has(task.id), `duplicate task ${task.id}`);
  ids.add(task.id);
  assert(task.strategy === strategies[index], `${task.id} strategy drift`);
  assert(typeof task.reader_job === "string" && task.reader_job.length > 30, `${task.id} reader job too vague`);
  assert(typeof task.prompt === "string" && task.prompt.length > 50, `${task.id} prompt too vague`);
  assert(Array.isArray(task.mechanical_requirements) && task.mechanical_requirements.length >= 4, `${task.id} requirements missing`);
  assert(new Set(task.mechanical_requirements).size === task.mechanical_requirements.length, `${task.id} duplicate requirement`);
  assert(typeof task.stop_condition === "string" && task.stop_condition.length > 30, `${task.id} stop condition missing`);
  assert(typeof task.forbidden_inference === "string" && task.forbidden_inference.startsWith("Do not infer"), `${task.id} claim boundary missing`);
  forbiddenResultFields.forEach((field) => assert(!Object.hasOwn(task, field), `${task.id} contains pre-execution result ${field}`));
});

assert(new Set(strategies).size === strategies.length, "strategies must be distinct");
assert(contract.prohibited_measures.length === 15, "prohibited reader measures drift");
assert(contract.required_result_fields.length === 10, "result field contract drift");
console.log(`OK campaign=${campaign.campaign_id} tasks=6 strategies=6 requirements=${campaign.tasks.reduce((sum, task) => sum + task.mechanical_requirements.length, 0)} prohibited=${contract.prohibited_measures.length}`);
