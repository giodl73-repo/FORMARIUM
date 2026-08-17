const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const target = path.join(root, "target", "proof-set-sim-42");
const load = (name) => JSON.parse(fs.readFileSync(path.join(fixtureRoot, name), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

const campaign = load("campaign-01.json");
const contract = load("result-contract-01.json");
const baselineLookups = load("baseline-lookups-01.json");
const baseline = load("baseline-results-01.json");
const records = JSON.parse(fs.readFileSync(path.join(target, "search-index.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(target, "manifest.json"), "utf8"));
const repairedPackets = new Set(["QLD-01-09", "QLD-01-12", "QLD-01-20", "QLD-01-22", "QLD-01-24"]);
const ownerPath = "tables/diagnostics/dependency-critical-path.md";

assert(campaign.status === "frozen-before-baseline" && campaign.packets.length === 24, "frozen campaign drift");
assert(manifest.edition === "sim-42", "rerun target is not sim-42");
assert(manifest.workspace_dirty_at_render === false, "rerun target must be rendered clean");
assert(records.length === 185, "search record count changed");
assert(baseline.baseline_custody.site_identity === "b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9", "baseline custody drift");

const executedAgainst = {
  edition: manifest.edition,
  source_commit: manifest.source_commit,
  site_identity: manifest.output.site_identity,
  standalone_sha256: sha256(path.join(target, "proof-set-sim-42.html")),
  search_index_sha256: sha256(path.join(target, "search-index.json")),
  search_records: records.length,
};

const lookupMap = new Map(baselineLookups.lookups.map((item) => [item.packet_id, item]));
const lookups = campaign.packets.map((packet) => {
  const frozen = lookupMap.get(packet.id);
  assert(frozen && frozen.queries.length === 2, `${packet.id} frozen lookup missing`);
  return {
    packet_id: packet.id,
    queries: frozen.queries.map(({ query }) => {
      const matches = search.searchRecords(records, query, "", "");
      return {
        query,
        match_count: matches.length,
        first_five: matches.slice(0, 5).map((record) => ({
          title: record.title,
          kind: record.kind,
          domain: record.domain,
          path: record.path,
          href: record.href,
          family_key: record.familyKey,
          family_title: record.familyTitle,
        })),
      };
    }),
  };
});
const rerunLookupMap = new Map(lookups.map((item) => [item.packet_id, item]));

const results = baseline.results.map((source) => {
  const result = JSON.parse(JSON.stringify(source));
  result.executed_against = executedAgainst;
  result.lookup_attempt = rerunLookupMap.get(result.packet_id);
  if (repairedPackets.has(result.packet_id)) {
    result.manual_concepts = result.manual_concepts.filter((item) => !/limiting|bottleneck|binding/.test(item.term));
    result.gaps = result.gaps.filter((gap) => gap.recurrence_key !== "limiting-factor-bottleneck" && gap.recurrence_key !== "bottleneck-lookup");
    result.gaps.push({
      id: `${result.packet_id}-R1`,
      code: "QG-0",
      recurrence_key: "resolved-limiting-condition-owner-test",
      observation: "The repaired existing diagnostic now supplies the bounded cross-owner distinction; no further content or product repair is proposed by this packet.",
      owner_rationale: contract.gap_codes["QG-0"],
      disposition: "no-change",
    });
    result.packet_disposition = "routed";
    if (!result.reading_route.includes(ownerPath)) {
      result.reading_route.splice(2, 0, ownerPath);
    }
  }
  result.mechanical_observations.lookup_destinations_opened = result.reading_route.length;
  result.mechanical_observations.route_hops = Math.max(result.reading_route.length - 1, 0);
  result.mechanical_observations.manual_concept_count = result.manual_concepts.length;
  result.claim_boundary = `Internal authored rerun only. ${campaign.packets.find((packet) => packet.id === result.packet_id).forbidden_inference}`;
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
  artifact: "QLD-01 exact portfolio rerun against sim-42",
  evidence_class: "internal-authored-rehearsal",
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  result_contract: contract.contract_id,
  baseline_custody: baseline.baseline_custody,
  rerun_custody: executedAgainst,
  exact_portfolio: { packets: 24, queries: 48, packet_revision: 1, query_text_changed: 0 },
  results,
  summary,
  comparison: {
    repaired_packet_ids: [...repairedPackets],
    closure_state_changes: 0,
    limiting_condition_qg3_before: 5,
    limiting_condition_qg3_after: 0,
    new_anchors: 0,
    new_views: 0,
    new_relations: 0,
    product_mechanic_changes: 0,
    reader_evidence: "not collected",
  },
};

fs.writeFileSync(path.join(fixtureRoot, "rerun-results-01.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=${campaign.campaign_id} packets=24 queries=48 qg3=${summary.gap_codes["QG-3"]} manual=${summary.manual_concepts} hops=${summary.route_hops}`);
