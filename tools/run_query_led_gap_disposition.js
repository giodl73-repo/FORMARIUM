const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const baselinePath = path.join(fixtureRoot, "baseline-results-01.json");
const decisionsPath = path.join(fixtureRoot, "gap-cluster-decisions-01.json");
const outputPath = path.join(fixtureRoot, "gap-dispositions-01.json");

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

assert(gaps.length === 26, "all 26 baseline gaps must be dispositioned");
assert(new Set(gaps.map((gap) => gap.gap_id)).size === 26, "gap ids must be unique");
const summary = Object.fromEntries(
  [...allowed].map((disposition) => [disposition, gaps.filter((gap) => gap.final_disposition === disposition).length]),
);
assert(summary["no-change"] === 13, "expected thirteen no-change dispositions");
assert(summary.defer === 4, "expected four deferred dispositions");
assert(summary.external === 3, "expected three external dispositions");
assert(summary.merge === 1, "expected one merged disposition");
assert(summary.repair === 5, "expected five repair dispositions");

const admitted = decisions.admitted_batch;
assert(admitted.new_anchors === 0, "campaign does not admit a new anchor");
assert(admitted.new_views === 0, "campaign does not admit a new view");
assert(admitted.new_relations === 0, "campaign does not admit a relation");
assert(admitted.product_mechanic_repairs === 0, "campaign does not admit a product mechanic repair");
assert(admitted.existing_view_repairs === 1, "campaign admits exactly one existing view repair");

const output = {
  artifact: "QLD-01 clustered gap dispositions",
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
    `anchors=0 views=0 relations=0 mechanics=0 existing-view-repairs=1`,
);
