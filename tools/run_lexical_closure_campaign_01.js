"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "lexical-closure", "campaign-01.json"), "utf8"));
const reference = fs.readFileSync(path.join(root, campaign.reference.path), "utf8");
const dataDir = path.join(root, campaign.source.local_data);

const normalize = (value) => value.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
const entries = [];
let current = null;
for (const line of reference.split(/\r?\n/)) {
  if (line.startsWith("entry ")) {
    const [head, title, domain, maturity, source] = line.split(" | ");
    current = { id: head.slice(6), title, domain, maturity, source, senses: [] };
    entries.push(current);
  } else if (line.startsWith("sense ")) {
    const [head, label] = line.split(" | ");
    current.senses.push({ id: head.slice(6), label, normalized: normalize(label) });
  }
}

const synsets = new Map();
const memberIndex = new Map();
for (const file of fs.readdirSync(dataDir).filter((name) => /^noun\..+\.json$/.test(name)).sort()) {
  const parsed = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
  for (const [id, synset] of Object.entries(parsed)) {
    synsets.set(id, synset);
    for (const member of synset.members || []) {
      const key = normalize(member);
      if (!memberIndex.has(key)) memberIndex.set(key, []);
      memberIndex.get(key).push(id);
    }
  }
}

const inverse = new Map();
const inverseKinds = {
  hypernym: "hyponym",
  mero_member: "holo_member",
  mero_part: "holo_part",
  mero_substance: "holo_substance"
};
for (const [sourceId, synset] of synsets) {
  for (const [forward, reverse] of Object.entries(inverseKinds)) {
    for (const targetId of synset[forward] || []) {
      if (!inverse.has(targetId)) inverse.set(targetId, []);
      inverse.get(targetId).push({ kind: reverse, targetId: sourceId });
    }
  }
}

const factoriumSenseLabels = new Set(entries.flatMap((entry) => entry.senses.map((sense) => sense.normalized)));
const candidateMap = new Map();
const authoredOwners = new Map();
for (const entry of entries) {
  const sourceText = fs.readFileSync(path.join(root, entry.source), "utf8");
  authoredOwners.set(entry.id, ` ${normalize(sourceText.replace(/[^\p{L}\p{N}]+/gu, " "))} `);
}
const senseResults = [];
const addCandidate = (label, relation, entry, sense, sourceSynset, sourceIsUnambiguous) => {
  const normalized = normalize(label);
  if (!normalized || normalized === sense.normalized) return;
  if (!candidateMap.has(normalized)) {
    candidateMap.set(normalized, { label: normalized, relations: new Set(), entry_ids: new Set(), sense_ids: new Set(), unambiguous_sense_ids: new Set(), source_synsets: new Set() });
  }
  const candidate = candidateMap.get(normalized);
  candidate.relations.add(relation);
  candidate.entry_ids.add(entry.id);
  candidate.sense_ids.add(sense.id);
  if (sourceIsUnambiguous) candidate.unambiguous_sense_ids.add(sense.id);
  candidate.source_synsets.add(sourceSynset);
};

for (const entry of entries) {
  for (const sense of entry.senses) {
    const matched = [...(memberIndex.get(sense.normalized) || [])].sort();
    senseResults.push({ entry_id: entry.id, sense_id: sense.id, label: sense.label, matched_synsets: matched });
    for (const synsetId of matched) {
      const synset = synsets.get(synsetId);
      const sourceIsUnambiguous = matched.length === 1;
      for (const member of synset.members || []) addCandidate(member, "synonym", entry, sense, synsetId, sourceIsUnambiguous);
      for (const relation of ["hypernym", "mero_member", "mero_part", "mero_substance"]) {
        for (const targetId of synset[relation] || []) {
          for (const member of synsets.get(targetId)?.members || []) addCandidate(member, relation, entry, sense, synsetId, sourceIsUnambiguous);
        }
      }
      for (const edge of inverse.get(synsetId) || []) {
        for (const member of synsets.get(edge.targetId)?.members || []) addCandidate(member, edge.kind, entry, sense, synsetId, sourceIsUnambiguous);
      }
    }
  }
}

const candidates = [...candidateMap.values()].map((candidate) => ({
  label: candidate.label,
  relations: [...candidate.relations].sort(),
  entry_ids: [...candidate.entry_ids].sort(),
  sense_ids: [...candidate.sense_ids].sort(),
  unambiguous_sense_ids: [...candidate.unambiguous_sense_ids].sort(),
  source_synsets: [...candidate.source_synsets].sort(),
  exact_factorium_sense: factoriumSenseLabels.has(candidate.label),
  authored_owner_entry_ids: entries.filter((entry) => authoredOwners.get(entry.id).includes(` ${candidate.label} `)).map((entry) => entry.id)
})).sort((a, b) => b.entry_ids.length - a.entry_ids.length || b.sense_ids.length - a.sense_ids.length || a.label.localeCompare(b.label));

const gated = candidates.filter((candidate) =>
  !candidate.exact_factorium_sense &&
  candidate.entry_ids.length >= campaign.candidate_gate.minimum_distinct_factorium_entries &&
  candidate.sense_ids.length >= campaign.candidate_gate.minimum_distinct_factorium_senses
);
const matchedSenses = senseResults.filter((result) => result.matched_synsets.length > 0);
const ambiguousSenses = senseResults.filter((result) => result.matched_synsets.length > 1);
const result = {
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  status: "screen-complete-awaiting-disposition",
  source: campaign.source.name,
  reference: campaign.reference,
  coverage: {
    entries_processed: entries.length,
    senses_processed: senseResults.length,
    senses_with_exact_noun_match: matchedSenses.length,
    senses_without_exact_noun_match: senseResults.length - matchedSenses.length,
    senses_with_ambiguous_match: ambiguousSenses.length,
    unique_one_hop_neighbors: candidates.length,
    recurring_review_candidates: gated.length,
    recurring_with_authored_owner: gated.filter((candidate) => candidate.authored_owner_entry_ids.length > 0).length,
    recurring_supported_only_by_ambiguous_senses: gated.filter((candidate) => candidate.unambiguous_sense_ids.length === 0).length,
    recurring_high_signal_remainder: gated.filter((candidate) => candidate.authored_owner_entry_ids.length === 0 && candidate.unambiguous_sense_ids.length > 0).length
  },
  sense_results: senseResults,
  recurring_candidates: gated,
  dispositions: []
};

const out = path.join(root, "fixtures", "lexical-closure", "screen-01.json");
fs.writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`);
console.log(`OK campaign=${campaign.campaign_id} entries=${entries.length} senses=${senseResults.length} matched=${matchedSenses.length} unmatched=${senseResults.length - matchedSenses.length} ambiguous=${ambiguousSenses.length} neighbors=${candidates.length} gated=${gated.length}`);
