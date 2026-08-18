"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-46");
const repair = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-10.json"), "utf8"));
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-09.json"), "utf8"));
const baseline = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "recognized-foothold-connections-baseline-09.json"), "utf8"));
const baselineByTask = new Map(baseline.results.map((result) => [result.task_id, result]));
const manifestPath = path.join(siteRoot, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const familyByHref = new Map();
for (const record of records) {
  familyByHref.set(record.href.split("#")[0], record.familyKey || record.path);
  familyByHref.set(record.familyHref.split("#")[0], record.familyKey || record.path);
}
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

assert.equal(manifest.edition, "sim-46");
assert.equal(manifest.source_commit, "20139f9c6d2f75d231efbb9d1c35ab1fe2d17e03");
assert.equal(manifest.workspace_dirty_at_render, false);

function connections(familyKey) {
  const record = recordByPath.get(familyKey) || records.find((candidate) => candidate.familyKey === familyKey);
  assert.ok(record, `missing family ${familyKey}`);
  const page = record.familyHref || record.href;
  const html = fs.readFileSync(path.join(siteRoot, ...page.split("#")[0].split("/")), "utf8");
  const block = html.match(/<div class="table-navigator__connections">([\s\S]*?)<\/div>/);
  if (!block) return { page, links: [] };
  const links = [...block[1].matchAll(/<a href="([^"#]+)(?:#[^"]*)?">([\s\S]*?)<\/a>/g)]
    .slice(0, campaign.route_policy.connection_preview_limit)
    .map((match) => {
      const targetHref = `entries/${match[1].replace(/^\.\//, "")}`;
      const targetFamily = familyByHref.get(targetHref);
      assert.ok(targetFamily, `${familyKey} unresolved ${targetHref}`);
      return { href: match[1], title: match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(), target_family: targetFamily };
    });
  return { page, links };
}

const results = campaign.assignments.map((assignment) => {
  const intended = [...new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} missing ${target}`);
    return record.familyKey || record.path;
  }))];
  const groups = searchApi.groupRecords(searchApi.searchRecords(records, assignment.query, "", ""))
    .slice(0, campaign.route_policy.ownership_groups_inspected);
  const firstTen = groups.map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href }));
  const footholds = firstTen.filter((family) => intended.includes(family.key));
  const routes = footholds.map((foothold) => {
    const rendered = connections(foothold.key);
    return { foothold, page: rendered.page, connections: rendered.links.map((link) => ({ ...link, intended: intended.includes(link.target_family) })) };
  });
  const expanded = [...new Set([...footholds.map((item) => item.key), ...routes.flatMap((route) => route.connections.map((item) => item.target_family))])];
  const expandedIntended = intended.filter((family) => expanded.includes(family));
  const previous = baselineByTask.get(assignment.task_id);
  assert.ok(previous, `${assignment.id} missing baseline`);
  return {
    assignment_id: assignment.id.replace("SUJ-09", "SUJ-10"),
    task_id: assignment.task_id,
    task: assignment.task,
    query: assignment.query,
    intended_families: intended,
    first_ten_families: firstTen,
    recognized_footholds: footholds,
    eligible: footholds.length > 0,
    base_intended_count: footholds.length,
    base_below_two: footholds.length < 2,
    routes,
    expanded_intended_families: expandedIntended,
    expanded_intended_count: expandedIntended.length,
    exposes_two_after_expansion: expandedIntended.length >= 2,
    deficient_task_gains_second: footholds.length < 2 && expandedIntended.length >= 2,
    baseline_expanded_intended_families: previous.expanded_intended_families,
    newly_exposed_intended_families: expandedIntended.filter((family) => !previous.expanded_intended_families.includes(family)),
    lost_baseline_intended_families: previous.expanded_intended_families.filter((family) => !expandedIntended.includes(family))
  };
});

const eligible = results.filter((result) => result.eligible).length;
const deficient = results.filter((result) => result.base_below_two).length;
const expandedDeficient = results.filter((result) => result.deficient_task_gains_second).length;
const coverage = results.filter((result) => result.exposes_two_after_expansion).length;
const changed = results.filter((result) => result.newly_exposed_intended_families.length || result.lost_baseline_intended_families.length).map((result) => result.task_id);
const losses = results.reduce((sum, result) => sum + result.lost_baseline_intended_families.length, 0);
const passed = expandedDeficient >= repair.rerun.required_expanded_deficient_assignments
  && coverage >= repair.rerun.required_two_family_assignments
  && losses === 0;

const output = {
  artifact: "SUJ-10 exact sim-46 reciprocal connection repair rerun",
  campaign_id: repair.campaign_id,
  source_campaign_id: campaign.campaign_id,
  evidence_class: repair.evidence_class,
  custody: {
    repair_frozen_commit: "7177f5f",
    source_commit: manifest.source_commit,
    site_identity: manifest.site_identity,
    manifest_sha256: sha(manifestPath),
    search_index_sha256: sha(path.join(siteRoot, "search-index.json")),
    baseline_artifact: "fixtures/synthetic-users/recognized-foothold-connections-baseline-09.json"
  },
  summary: {
    assignments: results.length,
    eligible_assignments: eligible,
    deficient_assignments: deficient,
    expanded_deficient_assignments: expandedDeficient,
    two_family_assignments_after_expansion: coverage,
    required_expanded_deficient_assignments: repair.rerun.required_expanded_deficient_assignments,
    required_two_family_assignments: repair.rerun.required_two_family_assignments,
    changed_tasks: changed,
    lost_baseline_intended_families: losses,
    dashboard_search_gap_remains: !results.find((result) => result.task_id === "SUJ-02-15").eligible,
    passed
  },
  results
};

fs.writeFileSync(path.join(fixtureRoot, "reciprocal-connection-repair-rerun-10-sim-46.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-10 eligible=${eligible}/10 expanded=${expandedDeficient}/${deficient} coverage=${coverage}/10 changes=${changed.join(",")} losses=${losses} passed=${passed}`);
