const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const files = {
  campaign: "campaign-01.json",
  contract: "result-contract-01.json",
  analysis: "baseline-analysis-01.json",
  lookups: "baseline-lookups-01.json",
  results: "baseline-results-01.json",
};
const expectedHashes = {
  campaign: "63e05a00a57be147313dae4b0cc6b7fab4b4cf40af309c677193f2c1f6353a6f",
  contract: "0b67bf61a468ee2b6748f78b0a7b96f575b58bc0ef530980134a794cb82da31f",
  analysis: "7ce59a969cfe90c0e8c7ac0abb65e6390a00cef853290467d202428290e3987c",
  lookups: "64ceb7330cc5a14df4e58b94e25036347683aad69aab27c1ed56165d5c0756ae",
  results: "9e768d1a43cf247f4a6718eead1d868283581bfb72bbe5fe2b6b86f8b46d61a7",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

Object.entries(files).forEach(([key, filename]) => {
  assert(sha256(path.join(fixtureRoot, filename)) === expectedHashes[key], `${filename} identity changed`);
});

const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, files.campaign), "utf8"));
const contract = JSON.parse(fs.readFileSync(path.join(fixtureRoot, files.contract), "utf8"));
const lookups = JSON.parse(fs.readFileSync(path.join(fixtureRoot, files.lookups), "utf8"));
const baseline = JSON.parse(fs.readFileSync(path.join(fixtureRoot, files.results), "utf8"));

assert(campaign.status === "frozen-before-baseline", "campaign status changed");
assert(baseline.campaign_id === campaign.campaign_id, "baseline campaign mismatch");
assert(baseline.result_contract === contract.contract_id, "baseline contract mismatch");
assert(baseline.results.length === 24, "baseline must contain 24 results");
assert(lookups.lookups.length === 24, "lookup trace must contain 24 packets");
assert(lookups.lookups.reduce((sum, item) => sum + item.queries.length, 0) === 48, "lookup trace must contain 48 queries");
assert(baseline.baseline_custody.edition === "sim-41", "baseline edition changed");
assert(
  baseline.baseline_custody.site_identity === "b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9",
  "baseline site identity changed",
);

const ids = baseline.results.map((result) => result.packet_id);
assert(new Set(ids).size === 24, "baseline packet ids are not unique");
assert(ids.join(",") === campaign.packets.map((packet) => packet.id).join(","), "baseline packet order changed");

baseline.results.forEach((result) => {
  contract.required_result_fields.forEach((field) => assert(Object.hasOwn(result, field), `${result.packet_id} missing ${field}`));
  assert(result.packet_revision === 1, `${result.packet_id} revision changed`);
  assert(contract.closure_states.includes(result.closure_state), `${result.packet_id} invalid closure state`);
  assert(contract.packet_dispositions.includes(result.packet_disposition), `${result.packet_id} invalid disposition`);
  result.gaps.forEach((gap) => {
    assert(Object.hasOwn(contract.gap_codes, gap.code), `${result.packet_id} invalid gap code`);
    assert(contract.gap_dispositions.includes(gap.disposition), `${result.packet_id} invalid gap disposition`);
  });
  contract.prohibited_measures.forEach((measure) => {
    assert(!Object.hasOwn(result.mechanical_observations, measure), `${result.packet_id} contains prohibited ${measure}`);
  });
});

assert(JSON.stringify(baseline.summary.closure_states) === JSON.stringify({ complete: 9, incomplete: 15, contradictory: 0, truncated: 0 }), "closure summary changed");
assert(baseline.summary.gap_codes["QG-0"] === 12, "QG-0 count changed");
assert(baseline.summary.gap_codes["QG-1"] === 5, "QG-1 count changed");
assert(baseline.summary.gap_codes["QG-3"] === 5, "QG-3 count changed");
assert(baseline.summary.gap_codes["QG-4"] === 0, "baseline must not contain an anchor gap");
assert(baseline.summary.gap_codes["QG-5"] === 0, "baseline must not contain a relation gap");
assert(baseline.summary.gap_codes["QG-6"] === 1, "QG-6 count changed");
assert(baseline.summary.gap_codes["QG-7"] === 3, "QG-7 count changed");
assert(baseline.summary.manual_concepts === 9, "manual concept count changed");
assert(baseline.summary.route_hops === 106, "route hop total changed");

const limitingPressure = baseline.results
  .flatMap((result) => result.gaps.map((gap) => ({ packet: result.packet_id, ...gap })))
  .filter((gap) => gap.recurrence_key === "limiting-factor-bottleneck");
assert(limitingPressure.length === 5, "limiting-factor-bottleneck pressure must recur in five packets");
assert(new Set(limitingPressure.map((gap) => gap.packet)).size === 5, "limiting pressure packets must be distinct");

console.log(
  `OK campaign=${campaign.campaign_id} results=24 queries=48 complete=9 incomplete=15 ` +
    `qg0=12 qg1=5 qg3=5 qg4=0 qg5=0 limiting=${limitingPressure.length} hops=106`,
);
