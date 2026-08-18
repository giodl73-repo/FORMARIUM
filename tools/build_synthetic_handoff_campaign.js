"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtures = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtures, name), "utf8"));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
const tasks = read("campaign-02.json");
const ux = read("analysis-03.json");
const routes = read("analysis-02.json");
const manifestPath = path.join(root, "target", "proof-set-sim-43", "manifest.json");
const indexPath = path.join(root, "target", "proof-set-sim-43", "index.html");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const taskById = new Map(tasks.prompts.map((task) => [task.id, task]));
const uxByNumber = new Map(ux.responses.map((response) => [response.id.slice(-2), response]));
const alignedStarters = { "02": "alert-outcome-feedback", "10": "latency-observation-inference", "19": "delegated-compliance-frontier" };

const assignments = Object.entries(routes.entries).map(([routeId, route]) => {
  const number = routeId.slice(-2);
  const task = taskById.get(routeId);
  const uxResponse = uxByNumber.get(number);
  const entrance = uxResponse.entrance;
  return {
    id: `SUJ-04-${number}`,
    profile_id: `SUJ-01-${number}`,
    task_id: routeId,
    task: task.prompt,
    entrance,
    start_href: entrance === "know-term" ? "index.html#search" : entrance === "have-question" ? "compose.html" : "reader.html",
    first_action: entrance === "know-term" ? { type: "literal-search", query: task.queries[0] } : entrance === "have-question" ? { type: "open-compose", starter_id: alignedStarters[number] || null } : { type: "open-reader-route" },
    intended_paths: route.selected_paths,
    task_fit_profile: route.view_profile,
  };
});

const campaign = {
  campaign_id: "SUJ-04",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-interface-rehearsal-plus-authored-synthetic-hypotheses",
  sources: { profiles: "campaign-01.json", tasks: "campaign-02.json", routes: "analysis-02.json", ux: "analysis-03.json" },
  baseline: { edition: manifest.edition, source_commit: manifest.source_commit, site_identity: manifest.output.site_identity, manifest_sha256: sha(manifestPath), index_sha256: sha(indexPath), search_index_sha256: manifest.output.search_index_sha256 },
  hypotheses: { intended_route_minimum: 20, original_task_retention_maximum: 5, explicit_handoff_package_maximum: 5 },
  owner_test: { minimum_assignments: 8, minimum_entrances: 2, single_owner_required: true, sensitive_persistence_allowed: false, static_reversible_required: true },
  assignments,
};

fs.writeFileSync(path.join(fixtures, "campaign-04.json"), `${JSON.stringify(campaign, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-04 assignments=${assignments.length} entrances=${JSON.stringify(Object.fromEntries(["know-term", "have-question", "learn-or-explore"].map((entrance) => [entrance, assignments.filter((assignment) => assignment.entrance === entrance).length])))} baseline=${manifest.edition}`);
