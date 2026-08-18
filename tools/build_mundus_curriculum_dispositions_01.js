"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const screenPath = path.join(root, "fixtures", "coverage", "mundus-curriculum-vocabulary-screen-01.json");
const outputPath = path.join(root, "fixtures", "coverage", "mundus-curriculum-dispositions-01.json");
const screen = JSON.parse(fs.readFileSync(screenPath, "utf8"));
const shaFile = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const normalize = (value) => value.toLowerCase().replaceAll("c++", "c plus plus").replace(/[^a-z0-9]+/g, " ").trim();

const existing = {
  "catalysis": [["chemical-reaction-stoichiometry-equilibrium"], "Catalyst and mechanism distinctions already own the reusable chemical role."],
  "causal inference": [["causal-reasoning", "sampling-generalization"], "Causal claim type, design, estimand, assumptions, uncertainty, and transport already compose the reusable question."],
  "classification": [["identity-naming-classification-versioning"], "Exact V1 sense label."],
  "concurrency": [["coordinated-work", "software-transaction-message-contract"], "Exact V1 sense label with general work and software transaction contexts."],
  "control": [["control-monitoring-response"], "Objective, controller, actuator, monitoring, feedback, and response are already separated."],
  "dominance": [["choice-alternative-selection", "scenario-assumption-condition-case"], "The admitted trade-off/dominance decision view owns the reusable comparison."],
  "dynamic simulation": [["model-representation-simulation"], "Simulation execution and result identity already cover the reusable distinction."],
  "energy": [["work-energy-power"], "Exact V1 sense label in this mechanics packet."],
  "equilibrium": [["chemical-reaction-stoichiometry-equilibrium"], "This occurrence is chemical and routes to the explicit chemical-equilibrium sense."],
  "forces": [["force", "motion-measure"], "Physical force and resulting motion quantities already have separate owners."],
  "interpretability": [["meaning-reference-interpretation-use", "claim-evidence"], "Model-specific interpretability remains specialized; interpretation and evidence limits compose the reusable question."],
  "kinematics": [["motion-measure", "geometric-reference-structure"], "Position, path, displacement, velocity, acceleration, coordinates, and frames already own the reusable distinctions."],
  "kinetics": [["chemical-reaction-stoichiometry-equilibrium"], "Reaction rate, rate law, mechanism, and equilibrium are already separated."],
  "knowledge representation": [["model-representation-simulation", "meaning-reference-interpretation-use"], "Representation and its interpretation contract already own the reusable layer distinction."],
  "mechanism": [["causal-reasoning", "chemical-reaction-stoichiometry-equilibrium"], "The packet context selects causal or chemical mechanism; no universal third mechanism sense is established."],
  "modeling": [["model-representation-simulation"], "Model purpose, subject, representation, implementation, run, and result are already separated."],
  "momentum": [["motion-measure"], "Linear momentum is an explicit V1 sense."],
  "periodic response": [["periodic-wave-quantity", "control-monitoring-response"], "Recurrence and response compose from the wave and control owners."],
  "planning": [["coordinated-work"], "Plan, task, workflow, dependencies, resources, and actuals already have a general owner."],
  "prediction": [["claim-evidence", "probability-risk-uncertainty", "model-representation-simulation"], "A prediction remains a model-mediated claim under uncertainty; the course tag does not yet establish a separate owner."],
  "root finding": [["mathematical-relation-solving"], "Root, solution, iteration, and convergence are explicit V1 senses."],
  "rotating frames": [["geometric-reference-structure", "motion-measure"], "Reference-frame and motion-measure owners compose the reusable distinction."],
  "signaling": [["information-data-signal-noise", "interaction-request-response-correlation"], "The game-theoretic specialization does not establish a new general signal owner."],
  "simulation": [["model-representation-simulation"], "Exact V1 sense label."],
  "social impact": [["causal-reasoning", "evaluation-measure-scale-criterion"], "Outcome attribution and evaluation criteria already compose the reusable question."],
  "statistical inference": [["sampling-generalization", "claim-evidence", "probability-risk-uncertainty"], "Target, estimator, estimate, evidence, and uncertainty already compose the reusable structure."],
  "strategic thinking": [["choice-alternative-selection", "scenario-assumption-condition-case"], "Alternatives, other actors' states, criteria, uncertainty, and selection compose the general decision question."],
  "structure": [["system-composition-dependency", "chemical-substance-classification"], "Packet context selects general composition or molecular/classification structure."],
};

const researchGroups = {
  "optimization-problem-structure": {
    disposition: "recommended-view-research",
    owner_candidates: ["choice-alternative-selection", "policy-rule-constraint-decision-exception", "mathematical-relation-solving"],
    terms: ["convex analysis", "convex optimization", "duality", "interior-point methods", "least squares", "linear programming", "optimization", "semidefinite programming"],
    reason: "Repeated mathematical, AI, inference, and control pressure asks for variables, objective, domain, constraints, feasible set, optimality claim, method, diagnostics, and sensitivity without confusing a solver result with a decision.",
  },
  "prototype-test-iteration": {
    disposition: "recommended-procedure-view-research",
    owner_candidates: ["requirement-specification-verification-validation", "coordinated-work", "evaluation-measure-scale-criterion"],
    terms: ["accessibility", "game assessment", "learnability", "prototyping", "usability", "user testing"],
    reason: "Two materially different courses repeat prototyping while HCI adds task, user, usability, accessibility, and test criteria; a bounded procedure view may reduce reconstruction without creating a new anchor.",
  },
  "observability-state-estimation": {
    disposition: "held-specialized-view-research",
    owner_candidates: ["control-monitoring-response", "model-representation-simulation", "claim-evidence"],
    terms: ["observability", "state estimation"],
    reason: "The distinction is real but currently comes from one linear-systems course record; hold until independent cross-course or domain pressure appears.",
  },
};

const researchByTerm = new Map();
for (const [groupId, group] of Object.entries(researchGroups)) {
  for (const label of group.terms) {
    const term = normalize(label);
    if (researchByTerm.has(term)) throw new Error(`duplicate research term: ${term}`);
    researchByTerm.set(term, { group_id: groupId, ...group });
  }
}

const tools = new Set(["c", "c plus plus", "python"]);
const supportTags = new Set(["game engine support", "game physics support", "game ui support", "simulation support"]);
const broadDomainLabels = new Set(["artificial intelligence", "chemistry", "classical mechanics", "computer science", "game theory", "healthcare", "mathematics", "organic chemistry", "physics", "robotics", "software systems", "videogame studies"]);

const dispositions = screen.vocabulary.map((item) => {
  const term = item.normalized_term;
  let disposition;
  let owner_entry_ids = [];
  let research_group_id = null;
  let reason;
  if (existing[term]) {
    disposition = item.reference_exact_hit ? "covered-directly" : "covered-compositionally";
    [owner_entry_ids, reason] = existing[term];
  } else if (researchByTerm.has(term)) {
    const group = researchByTerm.get(term);
    disposition = group.disposition;
    owner_entry_ids = group.owner_candidates;
    research_group_id = group.group_id;
    reason = group.reason;
  } else if (tools.has(term)) {
    disposition = "named-tool-or-language";
    reason = "A named programming language or implementation surface is an example, not a reusable canonical concept.";
  } else if (supportTags.has(term)) {
    disposition = "source-workflow-tag";
    reason = "FONTES records this as a downstream project-support tag rather than course concept evidence.";
  } else if (broadDomainLabels.has(term)) {
    disposition = "domain-label";
    reason = "A field or course-domain label does not supply a governing conceptual distinction.";
  } else {
    disposition = "domain-specialization";
    reason = "The source tag names a technique, object, subfield, or scoped domain topic; this campaign found no repeated cross-domain owner request beyond existing composition.";
  }
  return {
    term: item.term,
    normalized_term: term,
    packet_ids: item.packet_ids,
    lanes: item.lanes,
    occurrence_count: item.occurrences.length,
    screening_disposition: item.screening_disposition,
    disposition,
    owner_entry_ids,
    research_group_id,
    reason,
  };
});

for (const term of Object.keys(existing)) {
  if (!dispositions.some((item) => item.normalized_term === term)) throw new Error(`unused existing mapping: ${term}`);
}
for (const term of researchByTerm.keys()) {
  if (!dispositions.some((item) => item.normalized_term === term)) throw new Error(`unused research mapping: ${term}`);
}

const counts = {};
for (const item of dispositions) counts[item.disposition] = (counts[item.disposition] || 0) + 1;
const groupResults = Object.entries(researchGroups).map(([groupId, group]) => {
  const selected = dispositions.filter((item) => item.research_group_id === groupId);
  const rawHeadingEvidence = screen.session_sources.flatMap((source) => source.headings
    .filter((heading) => {
      const value = heading.title.toLowerCase();
      if (groupId === "optimization-problem-structure") return /optim|model selection/.test(value);
      return false;
    })
    .map((heading) => ({ packet_id: source.packet_id, session_id: heading.session_id, title: heading.title, source_path: source.path })));
  const headingEvidence = [...new Map(rawHeadingEvidence.map((item) =>
    [`${item.packet_id}\0${item.title.toLowerCase()}`, item])).values()];
  const packetIds = [...new Set([
    ...selected.flatMap((item) => item.packet_ids),
    ...headingEvidence.map((item) => item.packet_id),
  ])].sort();
  return {
    group_id: groupId,
    disposition: group.disposition,
    owner_candidates: group.owner_candidates,
    terms: selected.map((item) => item.term),
    packet_ids: packetIds,
    heading_evidence: headingEvidence,
    reason: group.reason,
  };
});

const result = {
  schema: "factorium.mundus-curriculum-dispositions.v1",
  status: "complete-research-only-no-admission",
  generated: "2026-08-18",
  baseline: {
    screen_path: "fixtures/coverage/mundus-curriculum-vocabulary-screen-01.json",
    screen_sha256: shaFile(screenPath),
    reference: screen.baseline.reference_path,
    reference_sha256: screen.baseline.reference_sha256,
  },
  method: {
    denominator: "all 148 unique FONTES work-subject terms",
    boundary: "named tools, course-support tags, domains, techniques, objects, and specializations do not become anchors",
    owner_test: "direct owner, compositional owner, smallest specialized view, or insufficient repeated pressure",
    automatic_admission: false,
  },
  summary: {
    terms: dispositions.length,
    disposition_counts: Object.fromEntries(Object.entries(counts).sort()),
    recommended_view_research_groups: 2,
    held_view_research_groups: 1,
    admitted_anchors: 0,
    admitted_views: 0,
    discovery_repairs: 0,
  },
  metadata_packet_dispositions: screen.metadata_packets,
  research_groups: groupResults,
  dispositions,
  portfolio_decision: {
    continue: ["optimization-problem-structure", "prototype-test-iteration"],
    hold: ["observability-state-estimation", "economic-income-consumption-saving-wealth"],
    admit_now: [],
    reason: "Two no-new-anchor view questions earn focused established-source research; no term earns immediate canonical admission from course metadata or headings.",
  },
  claims_boundary: "Internal source-led coverage evidence only; no curriculum consensus, reader value, pedagogical effectiveness, professional guidance, or market demand claim.",
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result.summary, null, 2));
