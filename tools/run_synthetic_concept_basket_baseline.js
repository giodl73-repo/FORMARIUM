"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-44");
const campaignPath = path.join(fixtureRoot, "campaign-05.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.baseline.search_index_sha256, sha(path.join(siteRoot, "search-index.json")));

const results = campaign.assignments.map((assignment) => {
  const intendedFamilies = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing intended path ${target}`);
    return record.familyKey || record.path;
  }))];
  const ranked = searchApi.searchRecords(records, assignment.query, "", "");
  const groups = searchApi.groupRecords(ranked).slice(0, campaign.route_policy.ownership_groups_inspected);
  const visibleIntended = groups.filter((group) => intendedFamilies.includes(group.key));
  return {
    assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    query: assignment.query,
    intended_families: intendedFamilies,
    first_ten_families: groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href })),
    visible_intended_families: visibleIntended.map((group) => ({ rank: groups.indexOf(group) + 1, key: group.key, title: group.title, href: group.href })),
    visible_intended_count: visibleIntended.length,
    exposes_two_intended_families: visibleIntended.length >= 2
  };
});

const passing = results.filter((result) => result.exposes_two_intended_families).length;
const output = {
  artifact: "SUJ-05 exact sim-44 manual concept basket feasibility baseline",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: {
    frozen_commit: "7692a65",
    campaign_sha256: sha(campaignPath),
    baseline: campaign.baseline
  },
  summary: {
    assignments: results.length,
    exposes_two_intended_families: passing,
    below_two_intended_families: results.length - passing,
    admission_threshold: campaign.owner_test.minimum_assignments,
    admitted: passing >= campaign.owner_test.minimum_assignments
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "concept-basket-baseline-05.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-05 two-intended=${passing}/10 threshold=${campaign.owner_test.minimum_assignments} admitted=${output.summary.admitted}`);
