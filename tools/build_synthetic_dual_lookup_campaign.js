"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const routeCampaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-04.json"), "utf8"));
const promptCampaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-02.json"), "utf8"));
const promptById = new Map(promptCampaign.prompts.map((prompt) => [prompt.id, prompt]));

const assignments = routeCampaign.assignments.filter((assignment) => assignment.entrance === "have-question").map((assignment) => {
  const prompt = promptById.get(assignment.task_id);
  if (!prompt || prompt.queries.length !== 2) throw new Error(`Expected two frozen queries for ${assignment.task_id}`);
  return {
    id: assignment.id.replace("SUJ-04", "SUJ-06"),
    source_assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    queries: [...prompt.queries],
    intended_paths: assignment.intended_paths,
    frozen_sequence: ["run-query-one", "inspect-ten-groups-one", "run-query-two", "inspect-ten-groups-two", "compare-union", "clear"]
  };
});
if (assignments.length !== 10) throw new Error(`Expected 10 assignments, got ${assignments.length}`);

const output = {
  campaign_id: "SUJ-06",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-dependent-literal-lookup-rehearsal",
  dependent_sources: ["SUJ-02", "SUJ-04", "SUJ-05"],
  baseline: JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-05.json"), "utf8")).baseline,
  route_policy: {
    query_count: 2,
    ownership_groups_per_query: 10,
    ranking: "independent-existing-order",
    union: "canonical-family-identity-only",
    merged_ranking: false,
    semantic_decomposition: false,
    persistence: "none"
  },
  hypotheses: {
    union_coverage: "At least 8 of 10 assignments expose two or more intended canonical families across the union of two frozen first-ten result lists.",
    incremental_value: "For at least 6 of 10 assignments, query two adds an intended canonical family absent from query one's first ten groups.",
    boundary: "Independent literal result lists and their identity union remain distinguishable from semantic decomposition, relation selection, closure, and recommendation."
  },
  owner_test: {
    required_union_assignments: 8,
    required_incremental_assignments: 6,
    owner: "search-publication-shell",
    smallest_candidate: "ephemeral-dual-literal-lookup",
    prohibited: ["merged-ranking", "automatic-query-generation", "semantic-decomposition-claim", "inferred-relation", "query-persistence", "canonical-write"]
  },
  assignments
};

fs.writeFileSync(path.join(fixtureRoot, "campaign-06.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log("OK campaign=SUJ-06 assignments=10 queries=20 lists=20");
