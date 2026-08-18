"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-45");
const campaignPath = path.join(fixtureRoot, "campaign-09.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const familyByHref = new Map();
for (const record of records) {
  familyByHref.set(record.href.split("#")[0], record.familyKey || record.path);
  familyByHref.set(record.familyHref.split("#")[0], record.familyKey || record.path);
}
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(campaign.baseline.search_index_sha256, sha(path.join(siteRoot, "search-index.json")));
assert.equal(campaign.baseline.manifest_sha256, sha(path.join(siteRoot, "manifest.json")));
assert.equal(campaign.baseline.index_sha256, sha(path.join(siteRoot, "index.html")));

function renderedConnections(familyKey) {
  const record = recordByPath.get(familyKey) || records.find((candidate) => candidate.familyKey === familyKey);
  assert.ok(record, `missing family record ${familyKey}`);
  const href = record.familyHref || record.href;
  const pagePath = path.join(siteRoot, ...href.split("#")[0].split("/"));
  const html = fs.readFileSync(pagePath, "utf8");
  const block = html.match(/<div class="table-navigator__connections">([\s\S]*?)<\/div>/);
  if (!block) return { page: href, links: [] };
  const links = [...block[1].matchAll(/<a href="([^"#]+)(?:#[^"]*)?">([\s\S]*?)<\/a>/g)]
    .slice(0, campaign.route_policy.connection_preview_limit)
    .map((match) => {
      const targetHref = `entries/${match[1].replace(/^\.\//, "")}`;
      const targetFamily = familyByHref.get(targetHref);
      assert.ok(targetFamily, `${familyKey} unresolved rendered connection ${targetHref}`);
      return {
        href: match[1],
        title: match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
        target_family: targetFamily
      };
    });
  return { page: href, links };
}

const results = campaign.assignments.map((assignment) => {
  const intended = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing intended path ${target}`);
    return record.familyKey || record.path;
  }))];
  const groups = searchApi.groupRecords(searchApi.searchRecords(records, assignment.query, "", ""))
    .slice(0, campaign.route_policy.ownership_groups_inspected);
  const firstTen = groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href }));
  const footholds = firstTen.filter((family) => intended.includes(family.key));
  const routes = footholds.map((foothold) => {
    const rendered = renderedConnections(foothold.key);
    return {
      foothold,
      page: rendered.page,
      connections: rendered.links.map((link) => ({ ...link, intended: intended.includes(link.target_family) }))
    };
  });
  const expandedFamilies = [...new Set([
    ...footholds.map((foothold) => foothold.key),
    ...routes.flatMap((route) => route.connections.map((connection) => connection.target_family))
  ])];
  const expandedIntended = intended.filter((family) => expandedFamilies.includes(family));
  const baseBelowTwo = footholds.length < 2;
  return {
    assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    query: assignment.query,
    intended_families: intended,
    first_ten_families: firstTen,
    recognized_footholds: footholds,
    eligible: footholds.length > 0,
    base_intended_count: footholds.length,
    base_below_two: baseBelowTwo,
    routes,
    expanded_intended_families: expandedIntended,
    expanded_intended_count: expandedIntended.length,
    exposes_two_after_expansion: expandedIntended.length >= 2,
    deficient_task_gains_second: baseBelowTwo && expandedIntended.length >= 2
  };
});

const eligible = results.filter((result) => result.eligible).length;
const deficient = results.filter((result) => result.base_below_two).length;
const expandedDeficient = results.filter((result) => result.deficient_task_gains_second).length;
const coverage = results.filter((result) => result.exposes_two_after_expansion).length;
const gate = campaign.owner_test;
const admitted = eligible === gate.required_eligible_assignments
  && deficient === gate.deficient_assignments
  && expandedDeficient >= gate.required_expanded_deficient_assignments
  && coverage >= gate.required_two_family_assignments;

const output = {
  artifact: "SUJ-09 exact sim-45 recognized-foothold authored-connections baseline",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: {
    frozen_commit: "a4920d8",
    campaign_sha256: sha(campaignPath),
    baseline: campaign.baseline
  },
  summary: {
    assignments: results.length,
    eligible_assignments: eligible,
    deficient_assignments: deficient,
    expanded_deficient_assignments: expandedDeficient,
    two_family_assignments_after_expansion: coverage,
    required_eligible_assignments: gate.required_eligible_assignments,
    required_expanded_deficient_assignments: gate.required_expanded_deficient_assignments,
    required_two_family_assignments: gate.required_two_family_assignments,
    eligible_gate_passed: eligible === gate.required_eligible_assignments,
    expansion_gate_passed: expandedDeficient >= gate.required_expanded_deficient_assignments,
    coverage_gate_passed: coverage >= gate.required_two_family_assignments,
    admitted
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "recognized-foothold-connections-baseline-09.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-09 eligible=${eligible}/10 deficient-expanded=${expandedDeficient}/${deficient} coverage=${coverage}/10 admitted=${admitted}`);
