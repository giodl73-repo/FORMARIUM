"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const portfolioPath = "fixtures/coverage/biography-thought-closure-portfolio-01.json";
const referencePath = "reference/factorium-reference-v1.factorium";
const outputPath = "fixtures/coverage/biography-thought-closure-dispositions-01.json";
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const portfolio = JSON.parse(read(portfolioPath));

const normalized = new Map();
for (const packet of portfolio.packets) {
  for (const term of packet.required_distinctions) {
    const key = term.toLowerCase();
    const row = normalized.get(key) || {term, normalized_term: key, packet_ids: [], lanes: new Set(), occurrence_count: 0};
    row.packet_ids.push(packet.id);
    row.lanes.add(packet.lane);
    row.occurrence_count += 1;
    normalized.set(key, row);
  }
}

const direct = new Set([
  "access", "accountability", "authority", "causal attribution", "causal effect",
  "causal mechanism", "channel", "constraint", "data", "decision", "enforcement",
  "evidence", "feedback", "governance", "identity", "influence", "intervention",
  "observation", "outcome", "policy", "population", "provenance", "representation",
  "rule", "scope", "uncertainty"
]);

const historicalSpecialization = new Set([
  "administration", "agenda", "case context", "convention", "enactment",
  "historical period", "institutional response", "institutional transition",
  "institutionalization", "legal instrument", "legislature", "movement",
  "movement role", "neighborhood", "party office", "policy response", "political outcome",
  "precedent", "program bundle", "public office", "reconciliation", "reform",
  "state capacity", "succession", "voluntary restraint"
]);

const domainSpecialization = new Set([
  "biological adaptation", "bounded procedure", "design principle", "experimental task",
  "heuristic", "ideal criterion", "imitation", "model exposure", "operational measure",
  "planning intervention", "prescription boundary", "resource system", "scientific claim",
  "situated observation", "social position", "stopping rule", "theoretical capacity", "trend"
]);

const creditView = new Set([
  "collaboration", "contribution credit", "controversy", "counterclaim",
  "evidence production", "evidence use", "independent contribution", "legacy", "omission",
  "perspective", "prior work", "priority", "publication", "reputation", "revision", "source"
]);

const agencyHold = new Set([
  "collective action", "collaborator", "external actor", "individual actor",
  "informal leadership", "intention", "participant group", "person", "producer"
]);

function owners(term) {
  if (/credit|priority|publication|legacy|reputation|source|provenance|evidence|claim|observation|report|controversy|counterclaim|perspective|omission|revision|prior work/.test(term)) return ["claim-evidence", "identity-naming-classification-versioning"];
  if (/actor|person|office|authority|accountability|administration|coalition|collaborator|participant|organization|institution|capacity|legislature|movement/.test(term)) return ["organization-role-authority", "coordinated-work"];
  if (/causal|influence|intervention|effect|outcome|consequence|counterfactual|mechanism/.test(term)) return ["causal-reasoning", "control-monitoring-response"];
  if (/policy|rule|enforcement|enactment|legal|reform|governance|precedent|convention/.test(term)) return ["policy-rule-constraint-decision-exception", "governance-obligation-compliance"];
  if (/interpretation|phrase|concept|term|message|communication|reception|meaning|thesis|argument/.test(term)) return ["meaning-reference-interpretation-use", "claim-evidence"];
  if (/decision|criterion|strategy|search|stopping|constraint|procedure/.test(term)) return ["choice-alternative-selection", "scenario-assumption-condition-case"];
  if (/time|period|succession|transition|revision|later|prior/.test(term)) return ["temporal-organization", "state-event-transition-process-lifecycle"];
  if (/data|population|measure|trend|generalization|observed|experimental/.test(term)) return ["sampling-generalization", "evaluation-measure-scale-criterion"];
  if (/model|construct|theory|representation|capacity|learning|behavior|adaptation/.test(term)) return ["model-representation-simulation", "claim-evidence"];
  return ["claim-evidence", "scenario-assumption-condition-case"];
}

function classify(term) {
  if (creditView.has(term)) return ["recommended-contribution-credit-view-research", "Repeated biography and research-history packets need one reconstruction frame for contribution, priority, credit, source conflict, and later legacy without equating credit with causal attribution."];
  if (agencyHold.has(term)) return ["held-agency-action-owner-research", "The term contributes independent pressure for actor, agency, intention, and collective-action structure, but this campaign alone does not justify a universal person or agency anchor."];
  if (direct.has(term)) return ["covered-directly", "The V1 reference owns this distinction explicitly; the named case supplies an application, not a new concept."];
  if (historicalSpecialization.has(term)) return ["historically-specific-specialization", "This is a useful history or governance specialization that composes from current role, policy, event, time, and evidence owners in this campaign."];
  if (domainSpecialization.has(term)) return ["domain-specialization", "This term belongs to a bounded disciplinary theory, method, or case frame and does not earn a general Factorium owner here."];
  return ["covered-compositionally", "The reader question can be assembled from the listed current owners without adding a distinct canonical concept."];
}

const dispositions = [...normalized.values()].sort((a, b) => a.normalized_term.localeCompare(b.normalized_term)).map((row) => {
  const [disposition, reason] = classify(row.normalized_term);
  return {...row, lanes: [...row.lanes].sort(), disposition, owner_entry_ids: owners(row.normalized_term), reason};
});

const counts = {};
for (const row of dispositions) counts[row.disposition] = (counts[row.disposition] || 0) + 1;

const result = {
  schema: "factorium.biography-thought-closure-dispositions.v1",
  campaign: "BTC-01",
  status: "complete-research-only-no-admission",
  generated: "2026-08-18",
  baseline: {
    portfolio_path: portfolioPath,
    portfolio_sha256: sha(portfolioPath),
    portfolio_commit: "78d302e",
    reference_path: referencePath,
    reference_sha256: sha(referencePath)
  },
  summary: {
    packets: portfolio.packets.length,
    distinction_occurrences: [...normalized.values()].reduce((sum, row) => sum + row.occurrence_count, 0),
    distinct_terms: dispositions.length,
    disposition_counts: Object.fromEntries(Object.entries(counts).sort()),
    admitted_anchors: 0,
    admitted_views: 0,
    admitted_relations: 0,
    discovery_repairs: 0
  },
  research_groups: [
    {
      id: "contribution-credit-priority-legacy",
      decision: "continue-to-established-source-view-design",
      reader_question: "What exactly did a named person contribute, what evidence supports priority or credit, how does that differ from causal attribution, and how did later interpretation change?",
      candidate_owner_entry_ids: ["claim-evidence", "causal-reasoning", "identity-naming-classification-versioning"],
      terms: [...creditView].sort(),
      packet_ids: [...new Set(dispositions.filter((row) => creditView.has(row.normalized_term)).flatMap((row) => row.packet_ids))].sort()
    },
    {
      id: "actor-agency-intention-collective-action",
      decision: "hold-for-independent-owner-research",
      reader_question: "Who or what can act, intend, participate, and bear an outcome when persons, collectives, offices, and institutions overlap?",
      candidate_owner_entry_ids: ["organization-role-authority", "state-event-transition-process-lifecycle", "causal-reasoning"],
      terms: [...agencyHold].sort(),
      packet_ids: [...new Set(dispositions.filter((row) => agencyHold.has(row.normalized_term)).flatMap((row) => row.packet_ids))].sort(),
      hold_reason: "Global philosophy previously found partial agency/personhood pressure, but established-source boundary work is still required before deciding whether this is an anchor, mapping, or composition route."
    }
  ],
  dispositions,
  portfolio_decision: {
    continue: ["contribution-credit-priority-legacy"],
    hold: ["actor-agency-intention-collective-action"],
    stop: ["named-person-and-work-catalogs", "single-case-domain-theories", "leader-ranking-and-endorsement"],
    admit_now: [],
    reason: "One cross-lane evidence-view question repeatedly reduces the reader's reconstruction burden; the broader agency owner remains real but underdetermined."
  },
  claims_boundary: "Internal source-led structural coverage only; no historical truth, causal conclusion, scholarly consensus, endorsement, biography completeness, reader value, or market demand claim."
};

fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(result, null, 2)}\n`);
console.log(`WROTE ${outputPath} packets=${result.summary.packets} terms=${result.summary.distinct_terms} occurrences=${result.summary.distinction_occurrences}`);
