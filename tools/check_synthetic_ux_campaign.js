"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const campaign = read("fixtures/synthetic-users/campaign-03.json");
const profiles = read("fixtures/synthetic-users/campaign-01.json");
const tasks = read("fixtures/synthetic-users/campaign-02.json");
const manifest = read("target/proof-set-sim-42/manifest.json");

assert.equal(campaign.campaign_id, "SUJ-03");
assert.equal(campaign.status, "frozen-before-authored-responses");
assert.equal(campaign.questions.length, 12);
assert.equal(campaign.assignments.length, 25);
assert.equal(campaign.interface_baseline.edition, manifest.edition);
assert.equal(campaign.interface_baseline.source_commit, manifest.source_commit);
assert.equal(campaign.interface_baseline.site_identity, manifest.output.site_identity);

const profileIds = new Set(profiles.personas.map((profile) => profile.id));
const taskIds = new Set(tasks.prompts.map((task) => task.id));
const assignedProfiles = new Set();
const assignedTasks = new Set();
campaign.assignments.forEach((assignment, index) => {
  assert.equal(assignment.id, `SUJ-03-${String(index + 1).padStart(2, "0")}`);
  assert.ok(profileIds.has(assignment.profile_id));
  assert.ok(taskIds.has(assignment.task_id));
  assert.ok(!assignedProfiles.has(assignment.profile_id));
  assert.ok(!assignedTasks.has(assignment.task_id));
  assignedProfiles.add(assignment.profile_id);
  assignedTasks.add(assignment.task_id);
});
assert.equal(assignedProfiles.size, 25);
assert.equal(assignedTasks.size, 25);
assert.deepEqual(campaign.questions[0].values, ["know-term", "have-question", "learn-or-explore", "none"]);
assert.ok(campaign.prohibited_claims.includes("preference"));
assert.ok(campaign.prohibited_claims.includes("accessibility-success"));

console.log("OK campaign=SUJ-03 profiles=25 tasks=25 questions=12 baseline=sim-42 responses=authored-only");
