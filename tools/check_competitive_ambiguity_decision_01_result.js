"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const plan = json("fixtures/competitive-reference/campaign-01.json");
const captures = json("fixtures/competitive-reference/captures-01.json");
const passA = json("fixtures/competitive-reference/scoring-pass-a-01.json");
const passB = json("fixtures/competitive-reference/scoring-pass-b-01.json");
const result = json("fixtures/competitive-reference/result-01.json");

assert.equal(result.campaign_id, plan.campaign_id);
assert.equal(result.verdict, "FALSIFIED");
assert.deepEqual(result.candidate, plan.candidate);
assert.equal(captures.queries.length, 12);
assert.deepEqual(captures.queries.map((item) => item.query), plan.queries);
for (const query of captures.queries) {
  for (const product of ["factorium", "wikipedia", "merriam_webster_thesaurus", "onelook_thesaurus", "open_english_wordnet_2025"]) assert.equal(query[product].available, true, `${query.query}:${product}`);
  assert.equal(query.web_search_status_quo.query, query.query);
}
assert.equal(passA.rows.length, 72);
assert.equal(passB.rows.length, 72);
assert.equal(result.scoring.resolved_rows.length, 72);
assert.equal(result.scoring.disagreements.length, 4);
assert.equal(result.thresholds.factorium_decision_structure.count, 12);
assert.equal(result.thresholds.factorium_decision_structure.pass, true);
assert.equal(result.thresholds.lexical_comparators.merriam_webster_thesaurus.count, 6);
assert.equal(result.thresholds.lexical_comparators.merriam_webster_thesaurus.pass, false);
assert.equal(result.thresholds.lexical_comparators.onelook_thesaurus.count, 12);
assert.equal(result.thresholds.lexical_comparators.open_english_wordnet_2025.count, 12);
assert.equal(result.thresholds.route_cost.count, 12);
assert.equal(result.thresholds.route_cost.numeric_comparisons, 6);
assert.equal(result.thresholds.route_cost.factorium_only_within_budget, 6);
assert.equal(result.thresholds.false_equivalence.count, 0);
assert.equal(result.gaps.length, 9);
assert.equal(result.gaps.filter((gap) => gap.classification === "competitor-advantage").length, 6);
assert.equal(result.gaps.filter((gap) => gap.classification === "navigation").length, 3);
assert.equal(result.admitted_product_or_content_batch, null);
assert.equal(result.reader_evidence_claimed, false);
assert.equal(result.market_evidence_claimed, false);
assert.equal(result.general_superiority_claimed, false);
const resultDoc = read("context/waves/2026-08-13-factorium-vision/COMPETITIVE-AMBIGUITY-TO-DECISION-TEST-01-RESULT.md");
assert.match(resultDoc, /hypothesis is \*\*falsified\*\*/i);
assert.match(resultDoc, /6\/12/);
assert.match(resultDoc, /Admit no product or content repair/);
console.log("OK campaign=CAD-01 verdict=FALSIFIED rows=72 factorium=12/12 mw=6/12 route=12/12 gaps=9 batch=none");
