"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-45");
const campaignPath = path.join(fixtureRoot, "campaign-07.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const prior = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "dual-lookup-baseline-06.json"), "utf8"));
const priorByTask = new Map(prior.results.map((result) => [result.task_id, result]));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(campaign.baseline.search_index_sha256, sha(path.join(siteRoot, "search-index.json")));
assert.equal(campaign.baseline.manifest_sha256, sha(path.join(siteRoot, "manifest.json")));
assert.equal(campaign.baseline.index_sha256, sha(path.join(siteRoot, "index.html")));

const results = campaign.assignments.map((assignment) => {
  const previous = priorByTask.get(assignment.task_id);
  assert.ok(previous, `${assignment.id} missing SUJ-06 control`);
  const intended = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing ${target}`);
    return record.familyKey || record.path;
  }))];
  const lists = assignment.clauses.map((clause) => {
    const groups = searchApi.groupRecords(searchApi.searchRecords(records, clause, "", ""))
      .slice(0, campaign.lookup_policy.ownership_groups_per_clause);
    return {
      clause,
      families: groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href })),
      intended_families: groups.filter((group) => intended.includes(group.key)).map((group) => group.key)
    };
  });
  const union = [...new Set(lists.flatMap((list) => list.families.map((family) => family.key)))];
  const unionIntended = intended.filter((family) => union.includes(family));
  const added = unionIntended.filter((family) => !previous.union_intended_families.includes(family));
  const previousPass = previous.exposes_two_intended_families;
  const currentPass = unionIntended.length >= 2;
  return {
    assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    clauses: assignment.clauses,
    intended_families: intended,
    lists,
    union_family_count: union.length,
    union_intended_families: unionIntended,
    union_intended_count: unionIntended.length,
    exposes_two_intended_families: currentPass,
    prior_union_intended_families: previous.union_intended_families,
    added_intended_families_beyond_suj06: added,
    adds_intended_family_beyond_suj06: added.length > 0,
    regression_from_suj06: previousPass && !currentPass
  };
});

const splittable = results.filter((result) => result.clauses.length >= 2 && result.clauses.length <= 3).length;
const coverage = results.filter((result) => result.exposes_two_intended_families).length;
const incremental = results.filter((result) => result.adds_intended_family_beyond_suj06).length;
const regressions = results.filter((result) => result.regression_from_suj06).length;
const gates = campaign.owner_test;
const admitted = splittable >= gates.required_splittable_assignments
  && coverage >= gates.required_two_family_assignments
  && incremental >= gates.required_incremental_assignments
  && regressions <= gates.required_regressions;

const output = {
  artifact: "SUJ-07 exact sim-45 syntactic clause lookup baseline",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: {
    frozen_commit: "7dcc49a",
    campaign_sha256: sha(campaignPath),
    control_artifact: "fixtures/synthetic-users/dual-lookup-baseline-06.json",
    control_sha256: sha(path.join(fixtureRoot, "dual-lookup-baseline-06.json")),
    baseline: campaign.baseline
  },
  summary: {
    assignments: results.length,
    clauses: results.reduce((sum, result) => sum + result.clauses.length, 0),
    splittable_assignments: splittable,
    two_intended_family_assignments: coverage,
    incremental_assignments_beyond_suj06: incremental,
    regressions_from_suj06: regressions,
    required_splittable_assignments: gates.required_splittable_assignments,
    required_two_family_assignments: gates.required_two_family_assignments,
    required_incremental_assignments: gates.required_incremental_assignments,
    required_regressions: gates.required_regressions,
    feasibility_gate_passed: splittable >= gates.required_splittable_assignments,
    coverage_gate_passed: coverage >= gates.required_two_family_assignments,
    incremental_gate_passed: incremental >= gates.required_incremental_assignments,
    non_regression_gate_passed: regressions <= gates.required_regressions,
    admitted
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "syntactic-clause-lookup-baseline-07.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-07 splittable=${splittable}/10 coverage=${coverage}/10 incremental=${incremental}/10 regressions=${regressions} admitted=${admitted}`);
