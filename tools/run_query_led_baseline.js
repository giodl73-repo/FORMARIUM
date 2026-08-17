const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const campaignNumber = process.argv[2] || "01";
if (!/^\d{2}$/.test(campaignNumber)) throw new Error("campaign number must use two digits, for example 01 or 02");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, `campaign-${campaignNumber}.json`), "utf8"));
const contract = JSON.parse(fs.readFileSync(path.join(fixtureRoot, `result-contract-${campaignNumber}.json`), "utf8"));
const lookups = JSON.parse(fs.readFileSync(path.join(fixtureRoot, `baseline-lookups-${campaignNumber}.json`), "utf8"));
const analysis = JSON.parse(fs.readFileSync(path.join(fixtureRoot, `baseline-analysis-${campaignNumber}.json`), "utf8"));
const searchIndex = JSON.parse(fs.readFileSync(path.join(root, "target", `proof-set-${lookups.executed_against.edition}`, "search-index.json"), "utf8"));
const relationsText = fs.readFileSync(path.join(root, "reference", "factorium-relations-v0.factorium"), "utf8");
const referenceText = fs.readFileSync(path.join(root, "reference", "factorium-reference-v0.factorium"), "utf8");
const outputPath = path.join(fixtureRoot, `baseline-results-${campaignNumber}.json`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseReference(text) {
  const entries = new Map();
  let current = null;
  text.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("entry ")) {
      const parts = line.split(" | ");
      current = { id: parts[0].slice(6), title: parts[1], path: parts[4], senses: new Set() };
      entries.set(current.id, current);
    } else if (line.startsWith("sense ") && current) {
      current.senses.add(line.split(" | ")[0].slice(6));
    } else if (line === "end-entry") {
      current = null;
    }
  });
  return entries;
}

const referenceEntries = parseReference(referenceText);
const relationIds = new Set(
  relationsText.split(/\r?\n/).filter((line) => line.startsWith("relation ")).map((line) => line.split(" | ")[0].slice(9)),
);
const selectedPaths = new Set(searchIndex.map((record) => record.path));
const lookupByPacket = new Map(lookups.lookups.map((lookup) => [lookup.packet_id, lookup]));
const validGapCodes = new Set(Object.keys(contract.gap_codes));
const validGapDispositions = new Set(contract.gap_dispositions);
const validPacketDispositions = new Set(contract.packet_dispositions);
const validClosureStates = new Set(contract.closure_states);
const validCheckStates = new Set(contract.check_states);
const validManualStates = new Set(contract.manual_concept_states);

assert(analysis.campaign_id === campaign.campaign_id, "analysis campaign id mismatch");
assert(analysis.campaign_revision === campaign.revision, "analysis campaign revision mismatch");
assert(Object.keys(analysis.entries).length === 24, "analysis must cover 24 packets");

const results = campaign.packets.map((packet) => {
  const authored = analysis.entries[packet.id];
  const lookup = lookupByPacket.get(packet.id);
  assert(authored, `${packet.id} missing authored baseline analysis`);
  assert(lookup, `${packet.id} missing lexical lookup trace`);
  assert(validClosureStates.has(authored.closure), `${packet.id} has invalid closure`);
  assert(validPacketDispositions.has(authored.disposition), `${packet.id} has invalid packet disposition`);

  const selectedSenses = authored.senses.map((identity) => {
    const slash = identity.indexOf("/");
    const entryId = identity.slice(0, slash);
    const senseId = identity.slice(slash + 1);
    const entry = referenceEntries.get(entryId);
    assert(entry, `${packet.id} references unknown entry ${entryId}`);
    assert(entry.senses.has(senseId), `${packet.id} references unknown sense ${identity}`);
    return { identity: `sense:${identity}`, entry_id: entryId, sense_id: senseId, path: entry.path };
  });
  authored.route.forEach((routePath) => assert(selectedPaths.has(routePath), `${packet.id} route path not in ${lookups.executed_against.edition}: ${routePath}`));
  authored.relations.forEach((relation) => assert(relationIds.has(relation), `${packet.id} relation not admitted: ${relation}`));
  authored.checks.forEach((check) => assert(validCheckStates.has(check[1]), `${packet.id} invalid check state ${check[1]}`));
  authored.manual.forEach((manual) => assert(validManualStates.has(manual[1]), `${packet.id} invalid manual state ${manual[1]}`));
  authored.gaps.forEach((gap) => {
    assert(validGapCodes.has(gap[0]), `${packet.id} invalid gap code ${gap[0]}`);
    assert(validGapDispositions.has(gap[3]), `${packet.id} invalid gap disposition ${gap[3]}`);
  });

  const result = {
    packet_id: packet.id,
    packet_revision: packet.revision,
    executed_against: lookups.executed_against,
    lookup_attempt: lookup,
    selected_senses: selectedSenses,
    context_selections: packet.context,
    working_graph: {
      explicit_seed_count: selectedSenses.length,
      nodes: selectedSenses.map((sense) => sense.identity),
      admitted_relations: authored.relations.map((relation) => `relation:${relation}`),
      direction: "as-declared-by-admitted-relation-only",
      budgets: { depth: 1, edges: Math.max(authored.relations.length, 1), nodes: selectedSenses.length, work: selectedSenses.length + authored.relations.length },
      natural_language_edge_inference: false,
    },
    checks: authored.checks.map(([id, state]) => ({ id, kind: "packet-declared", state })),
    closure_state: authored.closure,
    reading_route: authored.route,
    projection_losses: authored.losses,
    manual_concepts: authored.manual.map(([term, state, proxyOwner, reason]) => ({ term, state, proxy_owner: proxyOwner, reason })),
    mechanical_observations: {
      lookup_queries: lookup.queries.length,
      lookup_destinations_opened: authored.route.length,
      route_hops: Math.max(authored.route.length - 1, 0),
      graph_nodes: selectedSenses.length,
      graph_edges: authored.relations.length,
      manual_concept_count: authored.manual.length,
      unresolved_destination_count: authored.closure === "complete" ? 0 : 1,
    },
    gaps: authored.gaps.map(([code, recurrenceKey, observation, disposition], index) => ({
      id: `${packet.id}-G${index + 1}`,
      code,
      recurrence_key: recurrenceKey,
      observation,
      owner_rationale: contract.gap_codes[code],
      disposition,
    })),
    packet_disposition: authored.disposition,
    claim_boundary: `Internal authored route only. ${packet.forbidden_inference}`,
  };

  contract.required_result_fields.forEach((field) => assert(Object.hasOwn(result, field), `${packet.id} missing result field ${field}`));
  contract.prohibited_measures.forEach((field) => assert(!Object.hasOwn(result.mechanical_observations, field), `${packet.id} contains prohibited measure ${field}`));
  return result;
});

const summary = {
  closure_states: Object.fromEntries(contract.closure_states.map((state) => [state, results.filter((result) => result.closure_state === state).length])),
  packet_dispositions: Object.fromEntries(contract.packet_dispositions.map((state) => [state, results.filter((result) => result.packet_disposition === state).length])),
  gap_codes: Object.fromEntries(Object.keys(contract.gap_codes).map((code) => [code, results.flatMap((result) => result.gaps).filter((gap) => gap.code === code).length])),
  manual_concepts: results.reduce((sum, result) => sum + result.manual_concepts.length, 0),
  route_hops: results.reduce((sum, result) => sum + result.mechanical_observations.route_hops, 0),
};

const output = {
  artifact: `${campaign.campaign_id} ${lookups.executed_against.edition} baseline results`,
  evidence_class: "internal-authored-rehearsal",
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  result_contract: contract.contract_id,
  baseline_custody: lookups.executed_against,
  results,
  summary,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(
  `OK campaign=${campaign.campaign_id} results=${results.length} closure=${JSON.stringify(summary.closure_states)} ` +
    `gaps=${JSON.stringify(summary.gap_codes)} manual=${summary.manual_concepts} hops=${summary.route_hops}`,
);
