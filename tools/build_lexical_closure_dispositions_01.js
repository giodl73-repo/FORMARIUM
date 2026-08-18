"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const screenPath = path.join(root, "fixtures", "lexical-closure", "screen-01.json");
const screen = JSON.parse(fs.readFileSync(screenPath, "utf8"));

const reviewed = {
  "organisation": ["alias-candidate", "British spelling of organization; useful only as a lookup spelling, not a new concept."],
  "assemblage": ["existing-owner", "Generic collection/composition language is owned by System Composition and Dependency."],
  "deal": ["defer", "Transaction polysemy does not establish a reusable Factorium distinction."],
  "natural action": ["existing-owner", "Generic process language is already owned by State, Event, Transition, Process, and Lifecycle."],
  "natural process": ["existing-owner", "Generic process language is already owned by State, Event, Transition, Process, and Lifecycle."],
  "beginning": ["existing-owner", "Start, origin, and provenance questions already route to Temporal Organization or Claim and Evidence."],
  "flux": ["defer", "The surviving source edge comes from the metallurgical substance sense and does not demonstrate recurring transport-flux pressure."],
  "observance": ["defer", "The monitoring synonym is context-sensitive and adds no governing distinction."],
  "rootage": ["defer", "The provenance edge is archaic vocabulary, not an owner-level gap."],
  "frame of reference": ["alias-candidate", "A direct common-language variant of the declared reference-frame sense."],
  "social control": ["existing-owner", "Governance, authority, policy, and enforcement already own the reusable distinctions."],
  "break": ["defer", "The time-interval edge is too polysemous to support a reusable concept or alias."],
  "ds": ["external-taxonomy", "An opaque abbreviation/member label is outside the concept-level reference boundary."],
  "electric power": ["alias-candidate", "A common-language variant of the declared electrical-power sense."],
  "expansion": ["defer", "The mathematical-function edge does not specify series, transformation, growth, or another governing meaning."],
  "field of force": ["alias-candidate", "A lexical route to electric-field and gravitational-field owners; not a new field concept."],
  "force field": ["alias-candidate", "A lexical route to electric-field and gravitational-field owners; not a new field concept."],
  "group action": ["defer", "The transaction edge collides with an unrelated mathematical meaning and has no stable owner request."],
  "metric function": ["external-taxonomy", "A specialized mathematical term belongs in a later source-backed domain treatment, not lexical import."],
  "plumbing": ["defer", "The measurement edge is idiomatic/polysemous and creates no reusable distinction."],
  "single valued function": ["external-taxonomy", "A specialized mathematical classification is narrower than the present function owner."],
  "wattage": ["guide-local", "Informal unit-derived language can be explained under electrical power without becoming a canonical sense."],
  "electrical phenomenon": ["existing-owner", "Electrical Quantity already owns charge, current, voltage, resistance, capacitance, impedance, and power distinctions."],
  "frequence": ["defer", "Rare vocabulary reached through a mismatched wave-number edge and adds no stable reader route."],
  "mensuration": ["guide-local", "Rare measurement vocabulary can remain local to measurement guidance."],
  "norm": ["defer", "The surviving median edge reflects polysemy and cannot establish a statistical or mathematical norm gap."],
  "oftenness": ["defer", "Rare frequency vocabulary reached through a mismatched wave-number sense." ]
};

const dispositions = screen.recurring_candidates.map((candidate) => {
  if (candidate.authored_owner_entry_ids.length > 0) {
    return { label: candidate.label, disposition: "existing-owner", owner_entry_ids: candidate.authored_owner_entry_ids, reason: "The exact lexical neighbor already occurs in authored canonical Table source." };
  }
  if (candidate.unambiguous_sense_ids.length === 0) {
    return { label: candidate.label, disposition: "defer", owner_entry_ids: [], reason: "All contributing Factorium labels match multiple OEWN noun synsets; no intended lexical sense may be selected automatically." };
  }
  if (!reviewed[candidate.label]) throw new Error(`missing manual review: ${candidate.label}`);
  const [disposition, reason] = reviewed[candidate.label];
  return { label: candidate.label, disposition, owner_entry_ids: [], reason };
});

const counts = {};
for (const item of dispositions) counts[item.disposition] = (counts[item.disposition] || 0) + 1;
const result = {
  campaign_id: screen.campaign_id,
  campaign_revision: screen.campaign_revision,
  status: "complete",
  screen_path: "fixtures/lexical-closure/screen-01.json",
  screen_sha256: crypto.createHash("sha256").update(fs.readFileSync(screenPath)).digest("hex"),
  source: screen.source,
  reference: screen.reference,
  coverage: screen.coverage,
  disposition_method: {
    authored_exact_owner_rule: true,
    ambiguous_source_only_rule: true,
    high_signal_candidates_manually_reviewed: Object.keys(reviewed).length,
    automatic_admission: false
  },
  disposition_counts: Object.fromEntries(Object.entries(counts).sort()),
  dispositions,
  decision: {
    owner_level_content_gap_admitted: false,
    alias_candidates_for_separate_product_test: ["organisation", "frame of reference", "electric power", "field of force", "force field"],
    guide_local_candidates: ["wattage", "mensuration"],
    new_anchor_batch: false,
    new_view_batch: false,
    maintained_edition: "sim-46"
  }
};

fs.writeFileSync(path.join(root, "fixtures", "lexical-closure", "result-01.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(`OK campaign=LXC-01 dispositions=${dispositions.length} reviewed=${Object.keys(reviewed).length} counts=${JSON.stringify(counts)} content-gap=false`);
