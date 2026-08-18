"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-45");
const campaignPath = path.join(fixtureRoot, "campaign-08.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const controlPath = path.join(fixtureRoot, "dual-lookup-baseline-06.json");
const control = JSON.parse(fs.readFileSync(controlPath, "utf8"));
const controlByTask = new Map(control.results.map((result) => [result.task_id, result]));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(campaign.baseline.search_index_sha256, sha(path.join(siteRoot, "search-index.json")));
assert.equal(campaign.baseline.manifest_sha256, sha(path.join(siteRoot, "manifest.json")));
assert.equal(campaign.baseline.index_sha256, sha(path.join(siteRoot, "index.html")));

const results = campaign.assignments.map((assignment) => {
  const prior = controlByTask.get(assignment.task_id);
  assert.ok(prior, `${assignment.id} missing SUJ-06 control`);
  const intended = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing ${target}`);
    return record.familyKey || record.path;
  }))];
  const lists = assignment.lenses.map((lens) => {
    const groups = searchApi.groupRecords(searchApi.searchRecords(records, lens.query, "", ""))
      .slice(0, campaign.lookup_policy.ownership_groups_per_lens);
    return {
      kind: lens.kind,
      query: lens.query,
      families: groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href })),
      intended_families: groups.filter((group) => intended.includes(group.key)).map((group) => group.key)
    };
  });
  const union = [...new Set(lists.flatMap((list) => list.families.map((family) => family.key)))];
  const unionIntended = intended.filter((family) => union.includes(family));
  const priorIntended = prior.union_intended_families;
  const added = unionIntended.filter((family) => !priorIntended.includes(family));
  const lost = priorIntended.filter((family) => !unionIntended.includes(family));
  return {
    assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    intended_families: intended,
    lists,
    union_family_count: union.length,
    union_intended_families: unionIntended,
    union_intended_count: unionIntended.length,
    exposes_two_intended_families: unionIntended.length >= 2,
    suj06_union_intended_families: priorIntended,
    added_intended_families_beyond_suj06: added,
    lost_intended_families_from_suj06: lost,
    adds_intended_family_beyond_suj06: added.length > 0,
    retains_all_suj06_intended_families: lost.length === 0
  };
});

const feasible = results.filter((result) => result.lists.length >= 3 && result.lists.length <= 4).length;
const coverage = results.filter((result) => result.exposes_two_intended_families).length;
const incremental = results.filter((result) => result.adds_intended_family_beyond_suj06).length;
const lossAssignments = results.filter((result) => !result.retains_all_suj06_intended_families).length;
const lostFamilies = results.reduce((sum, result) => sum + result.lost_intended_families_from_suj06.length, 0);
const gate = campaign.owner_test;
const admitted = feasible >= gate.required_feasible_assignments
  && coverage >= gate.required_two_family_assignments
  && lostFamilies <= gate.allowed_control_family_losses
  && incremental >= gate.required_incremental_assignments;

const output = {
  artifact: "SUJ-08 exact sim-45 whole-question and clause lenses baseline",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: {
    frozen_commit: "c02b373",
    campaign_sha256: sha(campaignPath),
    control_artifact: "fixtures/synthetic-users/dual-lookup-baseline-06.json",
    control_sha256: sha(controlPath),
    baseline: campaign.baseline
  },
  summary: {
    assignments: results.length,
    lenses: results.reduce((sum, result) => sum + result.lists.length, 0),
    feasible_assignments: feasible,
    two_intended_family_assignments: coverage,
    incremental_assignments_beyond_suj06: incremental,
    control_loss_assignments: lossAssignments,
    control_families_lost: lostFamilies,
    required_feasible_assignments: gate.required_feasible_assignments,
    required_two_family_assignments: gate.required_two_family_assignments,
    required_incremental_assignments: gate.required_incremental_assignments,
    allowed_control_family_losses: gate.allowed_control_family_losses,
    feasibility_gate_passed: feasible >= gate.required_feasible_assignments,
    coverage_gate_passed: coverage >= gate.required_two_family_assignments,
    incremental_gate_passed: incremental >= gate.required_incremental_assignments,
    control_retention_gate_passed: lostFamilies <= gate.allowed_control_family_losses,
    admitted
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "whole-question-clause-lenses-baseline-08.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-08 feasible=${feasible}/10 coverage=${coverage}/10 incremental=${incremental}/10 losses=${lostFamilies} across=${lossAssignments} admitted=${admitted}`);
