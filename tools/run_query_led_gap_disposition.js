const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const campaignNumber = process.argv[2] || "01";
if (!/^\d{2}$/.test(campaignNumber)) throw new Error("campaign number must use two digits, for example 01 or 02");
const baselinePath = path.join(fixtureRoot, `baseline-results-${campaignNumber}.json`);
const decisionsPath = path.join(fixtureRoot, `gap-cluster-decisions-${campaignNumber}.json`);
const outputPath = path.join(fixtureRoot, `gap-dispositions-${campaignNumber}.json`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const decisions = JSON.parse(fs.readFileSync(decisionsPath, "utf8"));
assert(sha256(baselinePath) === decisions.baseline_results_sha256, "baseline result identity changed");
assert(decisions.campaign_id === baseline.campaign_id, "decision campaign mismatch");

const allowed = new Set(["no-change", "defer", "external", "merge", "repair"]);
const gaps = baseline.results.flatMap((result) =>
  result.gaps.map((gap) => {
    const rule = decisions.rules[gap.recurrence_key];
    assert(rule, `${gap.id} has no cluster decision for ${gap.recurrence_key}`);
    assert(allowed.has(rule.final_disposition), `${gap.id} has invalid final disposition`);
    return {
      gap_id: gap.id,
      packet_id: result.packet_id,
      baseline_code: gap.code,
      recurrence_key: gap.recurrence_key,
      baseline_observation: gap.observation,
      baseline_disposition: gap.disposition,
      final_disposition: rule.final_disposition,
      target: rule.target,
      rationale: rule.rationale,
    };
  }),
);

const expectedGapCount = baseline.results.reduce((sum, result) => sum + result.gaps.length, 0);
assert(gaps.length === expectedGapCount, `all ${expectedGapCount} baseline gaps must be dispositioned`);
assert(new Set(gaps.map((gap) => gap.gap_id)).size === expectedGapCount, "gap ids must be unique");
const summary = Object.fromEntries(
  [...allowed].map((disposition) => [disposition, gaps.filter((gap) => gap.final_disposition === disposition).length]),
);
const expectedSummary = decisions.expected_summary || {
  "no-change": 13,
  defer: 4,
  external: 3,
  merge: 1,
  repair: 5,
};
Object.entries(expectedSummary).forEach(([key, value]) => {
  assert(summary[key] === value, `expected ${value} ${key} dispositions`);
});

const admitted = decisions.admitted_batch;
assert(admitted.new_anchors === 0, "campaign does not admit a new anchor");
assert(admitted.new_views === 0, "campaign does not admit a new view");
assert(admitted.new_relations === 0, "campaign does not admit a relation");
assert(admitted.product_mechanic_repairs === 0, "campaign does not admit a product mechanic repair");
assert(Number.isInteger(admitted.existing_view_repairs) && admitted.existing_view_repairs >= 0, "existing view repair count must be nonnegative");

const output = {
  artifact: `${baseline.campaign_id} clustered gap dispositions`,
  evidence_class: decisions.evidence_class,
  campaign_id: decisions.campaign_id,
  baseline_results_sha256: decisions.baseline_results_sha256,
  gaps,
  summary,
  admitted_batch: admitted,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(
  `OK campaign=${baseline.campaign_id} gaps=${gaps.length} no-change=${summary["no-change"]} ` +
    `defer=${summary.defer} external=${summary.external} merge=${summary.merge} repair=${summary.repair} ` +
    `anchors=0 views=0 relations=0 mechanics=0 existing-view-repairs=${admitted.existing_view_repairs}`,
);
