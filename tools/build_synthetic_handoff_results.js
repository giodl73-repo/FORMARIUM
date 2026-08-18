"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const sha = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(fixtureRoot, name))).digest("hex");
const campaign = read("campaign-04.json");
const contract = read("result-contract-04.json");
const browser = read("browser-routes-04.json");
const routeAnalysis = read("analysis-02.json");
const uxAnalysis = read("analysis-03.json");
const uxByNumber = new Map(uxAnalysis.responses.map((response) => [response.id.slice(-2), response]));
const browserById = new Map(browser.traces.map((trace) => [trace.assignment_id, trace]));

assert.equal(browser.frozen_commit, "87d3daa");
assert.equal(browser.campaign_sha256, sha("campaign-04.json"));

const authoredEntries = {};
for (const assignment of campaign.assignments) {
  const number = assignment.id.slice(-2);
  const priorRoute = routeAnalysis.entries[assignment.task_id];
  const priorUx = uxByNumber.get(number);
  const trace = browserById.get(assignment.id);
  assert.ok(priorRoute && priorUx && trace);
  authoredEntries[assignment.id] = {
    evidence_label: "Authored task-based projection reused from SUJ-02 and SUJ-03; not a participant response or outcome.",
    density_transition: assignment.task_fit_profile === "book" ? "Remain at Book unless local depth is requested." : `Move from Book to ${assignment.task_fit_profile} for this task-shaped projection.`,
    related_concepts: priorUx.exploration,
    stopping_condition: priorRoute.stop,
    outward_handoff: priorRoute.handoff,
    projection_losses: [...priorRoute.losses, "Original task is not retained on the reached or entrance-only destination.", "No explicit task-route-unresolved-source handoff package exists."],
    route_gap_disposition: trace.route_state === "destination-reached" ? "no-change" : "defer",
    route_gap_reason: trace.route_state === "destination-reached" ? "The frozen entrance reaches an intended family or exact starter." : assignment.entrance === "have-question" ? "No exact authored starter exists and prose may not infer controls." : "The intended concept is outside the fixed Reader teaching spine.",
    change_disposition: "repair",
    repair_candidate: "ephemeral-handoff-note",
  };
}
const analysis = { analysis_id: "SUJ-AN-04", campaign_id: campaign.campaign_id, evidence_class: campaign.evidence_class, frozen_commit: browser.frozen_commit, entries: authoredEntries };
fs.writeFileSync(path.join(fixtureRoot, "analysis-04.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8");

const results = campaign.assignments.map((assignment) => {
  const mechanical = browserById.get(assignment.id);
  const authored = authoredEntries[assignment.id];
  return {
    assignment_id: assignment.id,
    entrance: assignment.entrance,
    start_href: assignment.start_href,
    first_action: mechanical.first_action,
    destination: mechanical.destination,
    route_state: mechanical.route_state,
    original_task_visible: mechanical.original_task_visible,
    density_control_available: mechanical.density_control_available,
    related_routes_available: mechanical.related_routes_available,
    explicit_handoff_package: mechanical.explicit_handoff_package,
    viewport_overflow: mechanical.viewport_overflow,
    density_transition: authored.density_transition,
    related_concepts: authored.related_concepts,
    stopping_condition: authored.stopping_condition,
    outward_handoff: authored.outward_handoff,
    projection_losses: authored.projection_losses,
    change_disposition: authored.change_disposition,
    claim_boundary: "Mechanical fields describe the frozen browser surface only. Authored fields do not show what a reader recognized, understood, preferred, completed, trusted, or could access.",
    task: assignment.task,
    intended_paths: assignment.intended_paths,
    entrance_observation: mechanical.entrance_observation,
    route_gap_disposition: authored.route_gap_disposition,
    route_gap_reason: authored.route_gap_reason,
    repair_candidate: authored.repair_candidate,
  };
});

for (const result of results) {
  for (const field of contract.required_mechanical_fields) assert.ok(Object.hasOwn(result, field), `${result.assignment_id} lacks ${field}`);
  for (const field of contract.required_authored_fields) assert.ok(Object.hasOwn(result, field), `${result.assignment_id} lacks ${field}`);
}
const reached = results.filter((result) => result.route_state === "destination-reached").length;
const taskVisible = results.filter((result) => result.original_task_visible).length;
const handoff = results.filter((result) => result.explicit_handoff_package).length;
const summary = {
  assignments: results.length,
  route_state: Object.fromEntries(contract.route_states.map((state) => [state, results.filter((result) => result.route_state === state).length])),
  by_entrance: Object.fromEntries(contract.entrances.map((entrance) => [entrance, { assignments: results.filter((result) => result.entrance === entrance).length, reached: results.filter((result) => result.entrance === entrance && result.route_state === "destination-reached").length }])),
  original_task_visible: taskVisible,
  density_control_available: results.filter((result) => result.density_control_available).length,
  related_routes_available: results.filter((result) => result.related_routes_available).length,
  explicit_handoff_package: handoff,
  viewport_overflow: results.filter((result) => result.viewport_overflow).length,
  hypotheses: { intended_route_threshold: campaign.hypotheses.intended_route_minimum, intended_route_falsified: reached < campaign.hypotheses.intended_route_minimum, low_task_retention_predicted: taskVisible <= campaign.hypotheses.original_task_retention_maximum, low_handoff_predicted: handoff <= campaign.hypotheses.explicit_handoff_package_maximum, behavioral_hypothesis_tested: false },
  owner_test: { candidate: "ephemeral-handoff-note", affected_assignments: results.filter((result) => !result.explicit_handoff_package).length, affected_entrances: new Set(results.filter((result) => !result.explicit_handoff_package).map((result) => result.entrance)).size, owner: "publication-shell", sensitive_persistence: false, static_reversible: true, admitted: results.filter((result) => !result.explicit_handoff_package).length >= campaign.owner_test.minimum_assignments && new Set(results.filter((result) => !result.explicit_handoff_package).map((result) => result.entrance)).size >= campaign.owner_test.minimum_entrances },
};
const output = { artifact: "SUJ-04 first-click to handoff results", campaign_id: campaign.campaign_id, evidence_class: campaign.evidence_class, custody: { frozen_commit: browser.frozen_commit, campaign_sha256: sha("campaign-04.json"), contract_sha256: sha("result-contract-04.json"), browser_sha256: sha("browser-routes-04.json"), analysis_sha256: sha("analysis-04.json"), baseline: campaign.baseline }, results, summary };
fs.writeFileSync(path.join(fixtureRoot, "results-04.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-04 routes=${reached}/25 task-visible=${taskVisible}/25 handoff=${handoff}/25 owner-test=${summary.owner_test.admitted ? "admit" : "stop"}`);
