"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { NON_CONTENT, splitSyntacticClauses } = require("./synthetic_syntactic_clause_split.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const source = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-06.json"), "utf8"));

const assignments = source.assignments.map((assignment) => ({
  id: assignment.id.replace("SUJ-06", "SUJ-07"),
  source_assignment_id: assignment.id,
  task_id: assignment.task_id,
  task: assignment.task,
  clauses: splitSyntacticClauses(assignment.task),
  intended_paths: assignment.intended_paths,
  frozen_sequence: ["split-by-frozen-syntax", "run-each-clause", "inspect-ten-groups-per-clause", "compare-identity-union", "clear"]
}));

if (assignments.length !== 10) throw new Error(`Expected 10 assignments, got ${assignments.length}`);

const output = {
  campaign_id: "SUJ-07",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-dependent-syntactic-splitting-rehearsal",
  dependent_sources: ["SUJ-02", "SUJ-06"],
  baseline: {
    edition: "sim-45",
    source_commit: "e54a36e7c119670b279ea48760795f33f4775d63",
    site_identity: "e79e341036734b4f808fba9ac840eabed9a6c278c36f3cc05247af4b56553022",
    manifest_sha256: "36f614e66f895edd888609609110c4ca5f892886845421e97f993b8978e189a4",
    index_sha256: "637577e745fe2bd3069b4a94c877425c03aa856903a3d58fba67ca03377b574f",
    search_index_sha256: "d12640ffba616fcb83d909466628c1d3b4df0cdf4a0c4b0df0554f4e66e5b1df"
  },
  split_policy: {
    normalize: "collapse-whitespace-only",
    boundaries: ["sentence punctuation: . ! ? ;", "contrast markers: even though, although, but, yet, while"],
    marker_case: "insensitive",
    minimum_content_tokens: 2,
    non_content_tokens: [...NON_CONTENT],
    maximum_clauses: 3,
    fallback_query: false,
    vocabulary_insertion: false,
    semantic_decomposition: false
  },
  lookup_policy: {
    ownership_groups_per_clause: 10,
    ranking: "independent-existing-order",
    union: "canonical-family-identity-only",
    merged_ranking: false,
    persistence: "none"
  },
  hypotheses: {
    feasibility: "All 10 assignments yield two or three valid clauses under the frozen syntax rule.",
    coverage: "All 10 assignments expose two or more intended canonical families across the clause-list identity union.",
    incremental_value: "At least 4 of 10 assignments add an intended canonical family absent from the frozen SUJ-06 dual-query union.",
    non_regression: "No assignment that passed the SUJ-06 two-family threshold falls below it.",
    boundary: "Clauses and independent literal rankings remain distinguishable from concepts, semantic decomposition, relation selection, closure, and recommendation."
  },
  owner_test: {
    required_splittable_assignments: 10,
    required_two_family_assignments: 10,
    required_incremental_assignments: 4,
    required_regressions: 0,
    owner: "search-publication-shell",
    smallest_candidate: "visible-editable-syntactic-clause-helper",
    prohibited: ["hidden-query-generation", "semantic-decomposition-claim", "merged-ranking", "automatic-selection", "inferred-relation", "closure", "query-persistence", "canonical-write"]
  },
  assignments
};

fs.writeFileSync(path.join(fixtureRoot, "campaign-07.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-07 assignments=${assignments.length} clauses=${assignments.reduce((sum, item) => sum + item.clauses.length, 0)}`);
