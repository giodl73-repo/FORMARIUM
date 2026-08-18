"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { splitSyntacticClauses } = require("./synthetic_syntactic_clause_split.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const source = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-07.json"), "utf8"));

const assignments = source.assignments.map((assignment) => {
  const clauses = splitSyntacticClauses(assignment.task);
  return {
    id: assignment.id.replace("SUJ-07", "SUJ-08"),
    source_assignment_id: assignment.id,
    task_id: assignment.task_id,
    task: assignment.task,
    lenses: [{ kind: "whole-question", query: assignment.task }, ...clauses.map((query) => ({ kind: "syntactic-clause", query }))],
    intended_paths: assignment.intended_paths,
    frozen_sequence: ["run-whole-question", "split-by-suj07-syntax", "run-each-clause", "inspect-ten-groups-per-lens", "compare-identity-union", "compare-suj06-control", "clear"]
  };
});

if (assignments.length !== 10) throw new Error(`Expected 10 assignments, got ${assignments.length}`);

const output = {
  campaign_id: "SUJ-08",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-dependent-whole-question-and-syntactic-lens-rehearsal",
  dependent_sources: ["SUJ-06", "SUJ-07"],
  baseline: source.baseline,
  lens_policy: {
    primary: "exact-whole-task-text",
    secondary: "exact-suj07-syntactic-clauses",
    minimum_lenses: 3,
    maximum_lenses: 4,
    query_editing_during_test: false,
    fallback_query: false,
    vocabulary_insertion: false,
    semantic_decomposition: false
  },
  lookup_policy: {
    ownership_groups_per_lens: 10,
    ranking: "independent-existing-order",
    union: "canonical-family-identity-only",
    merged_ranking: false,
    persistence: "none"
  },
  hypotheses: {
    feasibility: "All 10 assignments yield one whole-question lens plus two or three frozen syntactic clause lenses.",
    coverage: "All 10 assignments expose two or more intended canonical families across the lens identity union.",
    control_retention: "Every intended family exposed by the SUJ-06 dual-query control remains exposed for every assignment.",
    incremental_value: "At least 4 of 10 assignments add an intended canonical family absent from the SUJ-06 dual-query union.",
    boundary: "Whole questions, clauses, and independent literal rankings remain distinguishable from concepts, semantic decomposition, relation selection, closure, and recommendation."
  },
  owner_test: {
    required_feasible_assignments: 10,
    required_two_family_assignments: 10,
    allowed_control_family_losses: 0,
    required_incremental_assignments: 4,
    owner: "search-publication-shell",
    smallest_candidate: "visible-editable-whole-question-and-clause-lenses",
    prohibited: ["hidden-query-generation", "semantic-decomposition-claim", "merged-ranking", "automatic-selection", "inferred-relation", "closure", "query-persistence", "canonical-write"]
  },
  assignments
};

fs.writeFileSync(path.join(fixtureRoot, "campaign-08.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-08 assignments=${assignments.length} lenses=${assignments.reduce((sum, item) => sum + item.lenses.length, 0)}`);
