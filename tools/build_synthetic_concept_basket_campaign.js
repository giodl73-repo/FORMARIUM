"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const routeCampaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-04.json"), "utf8"));
const promptCampaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-02.json"), "utf8"));
const promptById = new Map(promptCampaign.prompts.map((prompt) => [prompt.id, prompt]));

const assignments = routeCampaign.assignments
  .filter((assignment) => assignment.entrance === "have-question")
  .map((assignment) => {
    const prompt = promptById.get(assignment.task_id);
    if (!prompt) throw new Error(`Missing frozen prompt ${assignment.task_id}`);
    return {
      id: assignment.id.replace("SUJ-04", "SUJ-05"),
      source_assignment_id: assignment.id,
      task_id: assignment.task_id,
      task: assignment.task,
      query: prompt.queries[0],
      intended_paths: assignment.intended_paths,
      frozen_sequence: ["enter-first-query", "inspect-first-ten-families", "collect-explicit-families", "inspect-reading-set", "clear"]
    };
  });

if (assignments.length !== 10) throw new Error(`Expected 10 question assignments, got ${assignments.length}`);

const output = {
  campaign_id: "SUJ-05",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-interface-feasibility-rehearsal",
  dependent_sources: ["SUJ-02", "SUJ-04"],
  baseline: {
    edition: "sim-44",
    source_commit: "3983f0bad1370b390cf38e7e415c5684cd8f44c0",
    site_identity: "2c221aa4ee3d8e4191a831a2e3a363867a29cc3d66cc882efede5c43d069bbc7",
    manifest_sha256: "46b171d2b788b473de95a8cf5d3b6daee0288724d844b4de0c507e5b9ddc8e6f",
    index_sha256: "6021ea9c94f83a9e4737a6d1023ea93aba76c96b64a54d9c9c9471f44da90763",
    search_index_sha256: "d12640ffba616fcb83d909466628c1d3b4df0cdf4a0c4b0df0554f4e66e5b1df"
  },
  route_policy: {
    query_attempts: 1,
    ownership_groups_inspected: 10,
    collection_limit: 5,
    selection: "explicit-user-action-only",
    relation_semantics: "none",
    closure: "none",
    persistence: "none",
    task_in_url: false
  },
  hypotheses: {
    discoverability: "At least 8 of 10 assignments expose two or more intended canonical families in the first ten ownership groups.",
    collection: "All discoverable intended families can be explicitly collected without changing search order or publication ownership.",
    boundary: "The resulting set can remain visibly untyped and cannot be mistaken for closure, recommendation, or a Factor Guide."
  },
  owner_test: {
    minimum_assignments: 8,
    owner: "search-publication-shell",
    smallest_candidate: "ephemeral-manual-concept-basket",
    prohibited: ["automatic-concept-selection", "semantic-ranking", "inferred-relations", "query-persistence", "canonical-write"]
  },
  assignments
};

fs.writeFileSync(path.join(fixtureRoot, "campaign-05.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-05 assignments=${assignments.length} query-attempts=1 groups=10 collection-limit=5`);
