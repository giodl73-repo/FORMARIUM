"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const source = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-05.json"), "utf8"));
const sim45 = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-08.json"), "utf8")).baseline;

const assignments = source.assignments.map((assignment) => ({
  id: assignment.id.replace("SUJ-05", "SUJ-09"),
  source_assignment_id: assignment.id,
  task_id: assignment.task_id,
  task: assignment.task,
  query: assignment.query,
  intended_paths: assignment.intended_paths,
  frozen_sequence: ["run-first-query", "inspect-first-ten-families", "score-recognized-intended-footholds", "open-each-recognized-foothold", "inspect-six-rendered-authored-connections", "compare-family-identity-union", "clear"]
}));

if (assignments.length !== 10) throw new Error(`Expected 10 assignments, got ${assignments.length}`);

const output = {
  campaign_id: "SUJ-09",
  revision: 1,
  status: "frozen-before-execution",
  frozen_on: "2026-08-17",
  evidence_class: "deterministic-dependent-recognized-foothold-navigation-audit",
  dependent_sources: ["SUJ-05", "SUJ-06", "sim-45-authored-connections"],
  baseline: sim45,
  route_policy: {
    query_attempts: 1,
    ownership_groups_inspected: 10,
    foothold_scoring: "all-intended-families-visible-in-first-ten",
    foothold_selection_in_product: "none",
    connection_source: "rendered-table-navigator-authored-connections",
    connection_preview_limit: 6,
    traversal_depth: 1,
    traversal_direction: "as-rendered",
    target_identity: "canonical-family-owner",
    connection_semantics: "untyped-navigation-only",
    closure: false,
    persistence: "none"
  },
  hypotheses: {
    eligible_routes: "Exactly 9 of 10 tasks expose at least one scored recognized foothold under the frozen SUJ-05 first query.",
    expansion: "At least 6 of the 8 tasks below the SUJ-05 two-family threshold gain a second intended family through one rendered authored-connection step.",
    portfolio_coverage: "At least 8 of 10 tasks expose two intended families after the conditional one-click route.",
    boundary: "The audit remains conditional on analyst-scored recognition and cannot establish reader recognition, semantic relation, closure, or recommendation."
  },
  owner_test: {
    required_eligible_assignments: 9,
    deficient_assignments: 8,
    required_expanded_deficient_assignments: 6,
    required_two_family_assignments: 8,
    owner: "search-publication-shell",
    smallest_candidate: "search-to-authored-connections-cue",
    prohibited: ["automatic-foothold-selection", "connection-ranking", "typed-relation-claim", "semantic-decomposition-claim", "closure", "canonical-write"]
  },
  assignments
};

fs.writeFileSync(path.join(fixtureRoot, "campaign-09.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log("OK campaign=SUJ-09 assignments=10 queries=10 depth=1 preview=6");
