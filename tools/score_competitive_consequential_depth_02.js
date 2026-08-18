"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const hashFile = relative => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const campaign = readJson("fixtures/competitive-reference/campaign-02.json");
const captures = readJson("fixtures/competitive-reference/captures-01.json");
const scoring = readJson("fixtures/competitive-reference/scoring-02.json");
const cad01Result = readJson("fixtures/competitive-reference/result-01.json");

assert.equal(scoring.campaign_id, campaign.campaign_id);
assert.equal(scoring.rows.length, campaign.packets.length);
assert.equal(scoring.dimension_order.length, Object.keys(campaign.binary_dimensions).length);
assert.equal(scoring.pass_b_shuffled_vectors.length, scoring.rows.length * 2);

const captureText = (query, product) => {
  const row = captures.queries.find(item => item.query === query);
  const source = row[product];
  if (product === "factorium") {
    return [
      ...source.first_output.flatMap(item => [item.title, item.summary]),
      ...source.opened_outputs.map(item => item.visible_text)
    ].join(" ");
  }
  return [...source.first_output, source.synonym_chooser_excerpt].join(" ");
};

for (const row of scoring.rows) {
  for (const product of ["factorium", "merriam_webster_thesaurus"]) {
    assert.equal(row[product].values.length, scoring.dimension_order.length);
    assert.ok(row[product].values.every(value => typeof value === "boolean"));
  }
  const text = captureText(row.query, "factorium");
  row.factorium.values.forEach((value, index) => {
    const excerpt = row.factorium.evidence[index];
    if (value) {
      assert.ok(excerpt, `${row.query}: credited dimension lacks evidence`);
      assert.ok(text.includes(excerpt), `${row.query}: evidence not retained: ${excerpt}`);
    } else {
      assert.equal(excerpt, null, `${row.query}: failed dimension has positive evidence`);
    }
  });
}

const passA = new Map();
for (const row of scoring.rows) {
  for (const product of ["factorium", "merriam_webster_thesaurus"]) {
    passA.set(`${row.query}:${product}`, row[product].values);
  }
}
const disagreements = [];
for (const replay of scoring.pass_b_shuffled_vectors) {
  const expected = passA.get(`${replay.query}:${replay.product}`);
  assert.ok(expected, `unknown replay row: ${replay.query}:${replay.product}`);
  replay.values.forEach((value, index) => {
    if (value !== expected[index]) disagreements.push({query: replay.query, product: replay.product, dimension: scoring.dimension_order[index], pass_a: expected[index], pass_b: value});
  });
}

const packetResults = scoring.rows.map(row => {
  const factoriumDimensions = row.factorium.values.filter(Boolean).length;
  const thesaurusDimensions = row.merriam_webster_thesaurus.values.filter(Boolean).length;
  return {
    query: row.query,
    factorium_dimensions: factoriumDimensions,
    thesaurus_dimensions: thesaurusDimensions,
    factorium_pass: factoriumDimensions >= campaign.thresholds.factorium_minimum_dimensions_per_passing_packet,
    factorium_advantage: factoriumDimensions - thesaurusDimensions,
    advantage_pass: factoriumDimensions - thesaurusDimensions >= campaign.thresholds.factorium_advantage_dimensions_per_packet,
    factorium_opens: row.factorium.opens,
    thesaurus_opens: row.merriam_webster_thesaurus.opens,
    additional_opens: row.factorium.opens - row.merriam_webster_thesaurus.opens
  };
});

const passingPackets = packetResults.filter(row => row.factorium_pass).length;
const advantagePackets = packetResults.filter(row => row.advantage_pass).length;
const routePass = packetResults.every(row => row.additional_opens <= campaign.thresholds.factorium_additional_opens_maximum);
const falseEquivalences = scoring.rows.filter(row => {
  const retained = cad01Result.scoring.resolved_rows.find(item => item.query === row.query && item.product === "factorium");
  assert.ok(retained, `missing CAD-01 semantic-custody row: ${row.query}`);
  return retained.score.false_equivalence;
}).length;
const thresholds = {
  consequence_coverage: passingPackets >= campaign.thresholds.factorium_passing_packets_minimum,
  comparative_depth: advantagePackets >= campaign.thresholds.factorium_advantage_packets_minimum,
  route_cost: routePass,
  semantic_custody: falseEquivalences <= campaign.thresholds.factorium_false_equivalence_maximum,
  replay_resolved: disagreements.length === 0
};
const verdict = Object.values(thresholds).every(Boolean) ? "SURVIVES" : "FALSIFIED";

const result = {
  campaign_id: campaign.campaign_id,
  status: "complete",
  verdict,
  candidate: campaign.candidate,
  custody: {
    campaign_sha256: hashFile("fixtures/competitive-reference/campaign-02.json"),
    captures_sha256: hashFile("fixtures/competitive-reference/captures-01.json"),
    scoring_sha256: hashFile("fixtures/competitive-reference/scoring-02.json"),
    immutable_cad_01_replay: true,
    network_requests: 0
  },
  scoring: {
    packets: scoring.rows.length,
    products: 2,
    dimensions: scoring.dimension_order.length,
    observations_per_pass: scoring.rows.length * 2 * scoring.dimension_order.length,
    passes: 2,
    disagreements,
    packet_results: packetResults
  },
  thresholds: {
    observed: {factorium_passing_packets: passingPackets, factorium_advantage_packets: advantagePackets, route_cost_pass: routePass, false_equivalences: falseEquivalences},
    pass: thresholds
  },
  gaps: [
    {
      query: "power",
      disposition: "scope-coverage",
      dimension: "task_scope_coverage",
      finding: "The visible Factorium route covers mechanical and electrical power but not organizational authority or influence."
    },
    {
      query: "power",
      disposition: "boundary",
      dimension: "invalid_transfer",
      finding: "Without both requested senses, the route cannot state the cross-sense transfer that must be rejected."
    },
    {
      query: "power",
      disposition: "stopping-condition",
      dimension: "stopping_condition",
      finding: "The visible physical routes do not state when an organizational-power interpretation remains unresolved."
    },
    {
      query: "value",
      disposition: "handoff",
      dimension: "bounded_handoff",
      finding: "The retained first opened Table ends before an explicit next-inspection procedure; governing questions alone do not earn handoff credit."
    }
  ],
  admitted_product_or_content_batch: null,
  claim: "On these six retained parity packets, Factorium exposes consequence-bearing artifact structure beyond the retained thesaurus output.",
  reader_evidence_claimed: false,
  market_evidence_claimed: false,
  uniqueness_claimed: false,
  general_superiority_claimed: false
};

const output = path.join(root, "fixtures", "competitive-reference", "result-02.json");
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(`OK campaign=${result.campaign_id} verdict=${verdict} factorium=${passingPackets}/6 advantage=${advantagePackets}/6 disagreements=${disagreements.length} output=${path.relative(root, output)}`);
