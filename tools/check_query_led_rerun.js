const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const load = (name) => JSON.parse(fs.readFileSync(path.join(root, "fixtures", "query-led-discovery", name), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const campaign = load("campaign-01.json");
const contract = load("result-contract-01.json");
const baseline = load("baseline-results-01.json");
const baselineLookups = load("baseline-lookups-01.json");
const rerun = load("rerun-results-01.json");
const repaired = new Set(["QLD-01-09", "QLD-01-12", "QLD-01-20", "QLD-01-22", "QLD-01-24"]);

assert(rerun.campaign_id === campaign.campaign_id && rerun.campaign_revision === 1, "campaign identity drift");
assert(rerun.result_contract === contract.contract_id && rerun.results.length === 24, "result contract coverage drift");
assert(rerun.exact_portfolio.queries === 48 && rerun.exact_portfolio.query_text_changed === 0, "portfolio was not rerun exactly");
assert(rerun.baseline_custody.site_identity === baseline.baseline_custody.site_identity, "baseline custody changed");
assert(rerun.rerun_custody.edition === "sim-42" && rerun.rerun_custody.search_records === 185, "sim-42 custody invalid");

const frozenQueries = baselineLookups.lookups.flatMap((item) => item.queries.map((query) => `${item.packet_id}:${query.query}`));
const rerunQueries = rerun.results.flatMap((item) => item.lookup_attempt.queries.map((query) => `${item.packet_id}:${query.query}`));
assert(JSON.stringify(rerunQueries) === JSON.stringify(frozenQueries), "query text or packet order changed");

rerun.results.forEach((result) => {
  contract.required_result_fields.forEach((field) => assert(Object.hasOwn(result, field), `${result.packet_id} missing ${field}`));
  contract.prohibited_measures.forEach((field) => assert(!Object.hasOwn(result.mechanical_observations, field), `${result.packet_id} contains prohibited reader measure`));
  if (repaired.has(result.packet_id)) {
    assert(result.packet_disposition === "routed", `${result.packet_id} repair did not remove routing friction`);
    assert(result.gaps.some((gap) => gap.code === "QG-0"), `${result.packet_id} lacks post-repair no-gap disposition`);
    assert(!result.gaps.some((gap) => gap.recurrence_key === "limiting-factor-bottleneck" || gap.recurrence_key === "bottleneck-lookup"), `${result.packet_id} retained repaired gap`);
  }
});

assert(JSON.stringify(rerun.summary.closure_states) === JSON.stringify(baseline.summary.closure_states), "repair must not promote closure states");
assert(rerun.summary.gap_codes["QG-3"] === 0, "limiting-condition view gap remains");
assert(rerun.summary.gap_codes["QG-4"] === 0 && rerun.summary.gap_codes["QG-5"] === 0 && rerun.summary.gap_codes["QG-9"] === 0, "repair expanded into anchor, relation, or product mechanics");
assert(rerun.summary.manual_concepts === 4, "only five repaired manual concepts should be removed");
assert(rerun.comparison.reader_evidence === "not collected", "rerun must not claim reader evidence");

console.log(`OK campaign=${campaign.campaign_id} packets=24 queries=48 qg3=0 qg4=0 qg5=0 qg9=0 manual=4 reader_evidence=not-collected`);
