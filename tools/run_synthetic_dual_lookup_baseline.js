"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-44");
const campaignPath = path.join(fixtureRoot, "campaign-06.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(campaign.baseline.search_index_sha256, sha(path.join(siteRoot, "search-index.json")));

const results = campaign.assignments.map((assignment) => {
  const intended = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing ${target}`);
    return record.familyKey || record.path;
  }))];
  const lists = assignment.queries.map((query) => {
    const groups = searchApi.groupRecords(searchApi.searchRecords(records, query, "", ""))
      .slice(0, campaign.route_policy.ownership_groups_per_query);
    return {
      query,
      families: groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href })),
      intended_families: groups.filter((group) => intended.includes(group.key)).map((group) => group.key)
    };
  });
  const union = [...new Set(lists.flatMap((list) => list.families.map((family) => family.key)))];
  const unionIntended = intended.filter((family) => union.includes(family));
  const addedBySecond = lists[1].intended_families.filter((family) => !lists[0].intended_families.includes(family));
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
    second_query_added_intended_families: addedBySecond,
    second_query_adds_intended_family: addedBySecond.length > 0
  };
});

const unionPassing = results.filter((result) => result.exposes_two_intended_families).length;
const incrementalPassing = results.filter((result) => result.second_query_adds_intended_family).length;
const output = {
  artifact: "SUJ-06 exact sim-44 dual literal lookup baseline",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: { frozen_commit: "5269f7f", campaign_sha256: sha(campaignPath), baseline: campaign.baseline },
  summary: {
    assignments: 10,
    queries: 20,
    union_two_intended: unionPassing,
    second_query_adds_intended: incrementalPassing,
    required_union_assignments: campaign.owner_test.required_union_assignments,
    required_incremental_assignments: campaign.owner_test.required_incremental_assignments,
    union_gate_passed: unionPassing >= campaign.owner_test.required_union_assignments,
    incremental_gate_passed: incrementalPassing >= campaign.owner_test.required_incremental_assignments,
    admitted: unionPassing >= campaign.owner_test.required_union_assignments && incrementalPassing >= campaign.owner_test.required_incremental_assignments
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "dual-lookup-baseline-06.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-06 union=${unionPassing}/10 incremental=${incrementalPassing}/10 admitted=${output.summary.admitted}`);
