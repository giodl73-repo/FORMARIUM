"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-test-01.json"), "utf8"));
const search = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-search-families.js"));
const aliases = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-lookup-aliases.js"));
const candidateBytes = fs.readFileSync(path.join(root, "target", "proof-set-sim-47", "search-index.json"));
const baselineBytes = fs.readFileSync(path.join(root, "target", "proof-set-sim-46", "search-index.json"));
const records = JSON.parse(candidateBytes.toString("utf8"));
const baselineRecords = JSON.parse(baselineBytes.toString("utf8"));

function hasAuthoredStructure(relativePath) {
  const text = fs.readFileSync(path.join(root, relativePath), "utf8");
  return /^## (Contrast table|Cross-references)$/m.test(text);
}

const tasks = plan.tasks.map((task) => {
  const candidateRanking = search.searchRecords(records, task.query, "", "");
  const baselineRanking = search.searchRecords(baselineRecords, task.query, "", "");
  const rankingUnchanged = JSON.stringify(candidateRanking.map((record) => record.path)) ===
    JSON.stringify(baselineRanking.map((record) => record.path));
  let visibleFamilies;
  let aliasRoutes = null;
  if (task.category === "alias-route") {
    aliasRoutes = aliases.routesForQuery(task.query, records).map((route) => route.path);
    visibleFamilies = aliasRoutes;
  } else {
    visibleFamilies = search.groupRecords(candidateRanking.slice(0, plan.ranked_record_window))
      .slice(0, plan.family_window)
      .map((group) => group.key);
  }
  const intendedHits = task.intended_families.filter((family) => visibleFamilies.includes(family));
  const exactAliasSet = task.category !== "alias-route" || JSON.stringify(aliasRoutes) === JSON.stringify(task.intended_families);
  const destinationStructure = intendedHits.every(hasAuthoredStructure);
  const pass = intendedHits.length >= task.minimum_intended_hits && exactAliasSet && rankingUnchanged && destinationStructure;
  const allRankedFamilies = search.groupRecords(candidateRanking).map((group) => group.key);
  const missingIntended = task.intended_families.filter((family) => !intendedHits.includes(family));
  const outsideVisibleWindow = missingIntended.filter((family) => allRankedFamilies.includes(family));
  const absentFromRanking = missingIntended.filter((family) => !allRankedFamilies.includes(family));
  let disposition = "pass";
  if (!pass) {
    disposition = outsideVisibleWindow.length && absentFromRanking.length ?
      "mixed-ranking-and-vocabulary-gap" : outsideVisibleWindow.length ?
        "ranking-window-gap" : "lexical-vocabulary-gap";
    if (!rankingUnchanged) disposition = "ranking-control-regression";
    if (!exactAliasSet) disposition = "alias-owner-set-mismatch";
    if (!destinationStructure) disposition = "authored-destination-structure-gap";
  }
  return {
    id: task.id,
    category: task.category,
    query: task.query,
    intended_families: task.intended_families,
    minimum_intended_hits: task.minimum_intended_hits,
    visible_families: visibleFamilies,
    intended_hits: intendedHits,
    intended_outside_visible_window: outsideVisibleWindow,
    intended_absent_from_ranking: absentFromRanking,
    ranking_unchanged: rankingUnchanged,
    destination_structure: destinationStructure,
    pass,
    disposition
  };
});

const categories = {};
for (const [category, gate] of Object.entries(plan.categories)) {
  const categoryTasks = tasks.filter((task) => task.category === category);
  const passes = categoryTasks.filter((task) => task.pass).length;
  categories[category] = { tasks: categoryTasks.length, passes, required_passes: gate.required_passes, gate_pass: passes >= gate.required_passes };
}
const destinationGate = tasks.filter((task) => task.pass && task.category !== "alias-route").every((task) => task.destination_structure);
const rankingControl = tasks.every((task) => task.ranking_unchanged) && candidateBytes.equals(baselineBytes);
const survives = Object.values(categories).every((category) => category.gate_pass) && destinationGate && rankingControl;
const result = {
  campaign_id: plan.campaign_id,
  plan_revision: plan.revision,
  status: "complete",
  artifact: plan.artifact,
  candidate_search_index_sha256: crypto.createHash("sha256").update(candidateBytes).digest("hex"),
  baseline_search_index_sha256: crypto.createHash("sha256").update(baselineBytes).digest("hex"),
  categories,
  destination_gate_pass: destinationGate,
  ranking_control_pass: rankingControl,
  hypothesis_verdict: survives ? "SURVIVES" : "FALSIFIED",
  tasks,
  automatic_repair: false,
  reader_evidence_claimed: false
};
fs.writeFileSync(path.join(root, "fixtures", "lexical-closure", "thesaurus-job-result-01.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(`OK campaign=${plan.campaign_id} verdict=${result.hypothesis_verdict} categories=${Object.entries(categories).map(([key, value]) => `${key}:${value.passes}/${value.tasks}`).join(",")} ranking=${rankingControl} destination=${destinationGate}`);
