"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const campaign = read("campaign-03.json");
const profiles = read("campaign-01.json");
const tasks = read("campaign-02.json");
const analysis = read("analysis-03.json");
const profilesById = new Map(profiles.personas.map((profile) => [profile.id, profile]));
const tasksById = new Map(tasks.prompts.map((task) => [task.id, task]));
const responsesById = new Map(analysis.responses.map((response) => [response.id, response]));
const countBy = (items, key) => Object.fromEntries([...new Set(items.map(key))].sort().map((value) => [value, items.filter((item) => key(item) === value).length]));
const countValues = (items, key) => {
  const counts = {};
  items.flatMap(key).forEach((value) => { counts[value] = (counts[value] || 0) + 1; });
  return Object.fromEntries(Object.entries(counts).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])));
};
const rejectClass = (value) => {
  if (/account/.test(value)) return "persistence-or-account";
  if (/verdict|recommendation|decision|advice|ranking|recipe|calculator|conclusion|diagnosis/.test(value)) return "substantive-automation";
  if (/silent|single-correct|pretend-confident|universal-synonym/.test(value)) return "opaque-collapse";
  return "open-ended-automation";
};

assert.equal(campaign.status, "frozen-before-authored-responses");
assert.equal(analysis.frozen_commit, "f40803e");
assert.equal(analysis.responses.length, 25);

const results = campaign.assignments.map((assignment) => {
  const profile = profilesById.get(assignment.profile_id);
  const task = tasksById.get(assignment.task_id);
  const response = responsesById.get(assignment.id);
  assert.ok(profile && task && response, `${assignment.id} linkage failure`);
  assert.ok(campaign.questions[0].values.includes(response.entrance));
  assert.ok(["compact", "abbreviated", "book", "full"].includes(response.density));
  return {
    assignment_id: assignment.id,
    synthetic_profile_id: profile.id,
    task_id: task.id,
    task: task.prompt,
    authored_response: response,
    evidence_label: analysis.evidence_label,
    claim_boundary: "This response is authored from the task and current interface. It does not report what a person requested, preferred, understood, completed, trusted, remembered, or could access.",
  };
});

const responses = results.map((result) => result.authored_response);
const summary = {
  assignments: results.length,
  questions_per_assignment: campaign.questions.length,
  authored_response_fields: results.length * campaign.questions.length,
  entrance: countBy(responses, (response) => response.entrance),
  density: countBy(responses, (response) => response.density),
  compose_onboarding: countBy(responses, (response) => response.compose),
  preview_cues: countValues(responses, (response) => response.preview),
  trust_cues: countValues(responses, (response) => response.trust),
  rejection_class: countBy(responses, (response) => rejectClass(response.reject)),
  participant_responses: 0,
  admitted_batch: "homepage-intent-router-only",
  deferred: ["status-language-search-repair", "accounts-and-history", "personalization", "open-prose-execution", "substantive-automation", "social-editing"],
};

const output = {
  artifact: "SUJ-03 synthetic UX wishlist results",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: { frozen_commit: analysis.frozen_commit, campaign_sha256: sha("campaign-03.json"), analysis_sha256: sha("analysis-03.json"), baseline: campaign.interface_baseline },
  results,
  summary,
};

fs.writeFileSync(path.join(fixtureRoot, "results-03.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-03 assignments=25 questions=300 entrances=${JSON.stringify(summary.entrance)} admitted=${summary.admitted_batch} participants=0`);
