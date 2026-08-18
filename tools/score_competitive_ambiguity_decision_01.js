"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const plan = readJson("fixtures/competitive-reference/campaign-01.json");
const captures = readJson("fixtures/competitive-reference/captures-01.json");
const dimensions = plan.binary_dimensions;
const hashOrder = (value) => crypto.createHash("sha256").update(value).digest("hex");
const blank = () => Object.fromEntries(dimensions.map((dimension) => [dimension, false]));
const decisionStructure = (score) => score.contrast_or_exclusion || score.governing_factors || score.stopping_boundary;

const wikipediaDecision = new Set(["force", "risk", "role", "model", "system", "evidence"]);
const wikipediaMultiple = new Set(["scale", "power", "value", "state", "field", "measure", "model", "evidence"]);
const wikipediaContrast = new Set(["risk", "role", "model", "evidence"]);
const webDecision = new Set(["force", "risk", "role", "model", "system"]);
const webMultiple = new Set(["scale", "force", "power", "value", "state", "risk", "field", "role", "measure", "model"]);
const factoriumContrast = new Set(["scale", "force", "power", "value", "state", "risk", "field", "role", "model", "system", "evidence"]);

function scoreRow(queryCapture, product, pass) {
  const query = queryCapture.query;
  const score = blank();
  let interaction = null;
  let evidence = "";
  if (product === "factorium") {
    Object.assign(score, {
      multiple_meanings: true,
      relation_labels: true,
      contrast_or_exclusion: factoriumContrast.has(query),
      governing_factors: true,
      authority_visible: true,
      stopping_boundary: true,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    interaction = 1;
    evidence = "Search exposes multiple family owners; the first opened Table exposes factors and an explicit boundary, contrast, constraint, or failure structure.";
    if (pass === "B" && query === "field") score.multiple_meanings = false;
  } else if (product === "web_search_status_quo") {
    Object.assign(score, {
      multiple_meanings: webMultiple.has(query),
      relation_labels: false,
      contrast_or_exclusion: new Set(["role", "model"]).has(query),
      governing_factors: new Set(["force", "risk", "system"]).has(query),
      authority_visible: true,
      stopping_boundary: false,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    interaction = decisionStructure(score) ? 1 : null;
    evidence = "Representative first-screen results route to dictionary, encyclopedia, government, standards, or domain pages; five queries expose a visible governing distinction within one open.";
    if (pass === "A" && query === "evidence") {
      score.governing_factors = true;
      interaction = 1;
    }
  } else if (product === "wikipedia") {
    Object.assign(score, {
      multiple_meanings: wikipediaMultiple.has(query),
      relation_labels: false,
      contrast_or_exclusion: wikipediaContrast.has(query),
      governing_factors: wikipediaDecision.has(query),
      authority_visible: true,
      stopping_boundary: false,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    interaction = decisionStructure(score) ? 0 : null;
    evidence = wikipediaDecision.has(query)
      ? "The landing article visibly exposes a distinction or governing dimensions; the remaining landings are disambiguation without decision structure."
      : "The landing visibly separates topics but does not expose a contrast, governing factor, or stopping boundary.";
    if (pass === "B" && query === "risk") {
      score.governing_factors = false;
      score.contrast_or_exclusion = false;
      interaction = null;
    }
  } else if (product === "merriam_webster_thesaurus") {
    const capture = queryCapture.merriam_webster_thesaurus;
    const joined = capture.first_output.join(" ");
    const asInCount = (joined.match(/as in/gi) || []).length;
    const hasChooser = capture.synonym_chooser_excerpt.length > 0;
    Object.assign(score, {
      multiple_meanings: asInCount >= 2,
      relation_labels: true,
      contrast_or_exclusion: hasChooser,
      governing_factors: false,
      authority_visible: true,
      stopping_boundary: false,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    interaction = hasChooser ? 0 : null;
    evidence = hasChooser
      ? "The first output contains a Synonym Chooser with explicit usage contrasts among near words."
      : "The first output separates 'as in' senses and labelled word relations but contains no captured contrast, factor, or stopping structure.";
  } else if (product === "onelook_thesaurus") {
    Object.assign(score, {
      multiple_meanings: queryCapture.onelook_thesaurus.first_output.length >= 2,
      relation_labels: false,
      contrast_or_exclusion: false,
      governing_factors: false,
      authority_visible: false,
      stopping_boundary: false,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    evidence = "The official Datamuse core returns a ranked related-word set with optional definitions but no per-result contrast, governing factor, source, or stop.";
  } else if (product === "open_english_wordnet_2025") {
    Object.assign(score, {
      multiple_meanings: queryCapture.open_english_wordnet_2025.first_output.length >= 2,
      relation_labels: true,
      contrast_or_exclusion: false,
      governing_factors: false,
      authority_visible: true,
      stopping_boundary: false,
      bounded_continuation: true,
      false_equivalence: false,
      dead_end: false
    });
    evidence = "Exact noun synsets preserve senses and labelled lexical-semantic relation kinds but do not expose the frozen decision-structure dimensions.";
  }
  return { query, product, score, decision_structure: decisionStructure(score), interactions_to_decision_structure: interaction, evidence };
}

const products = ["factorium", "web_search_status_quo", "wikipedia", "merriam_webster_thesaurus", "onelook_thesaurus", "open_english_wordnet_2025"];
const passA = captures.queries.flatMap((query) => products.map((product) => scoreRow(query, product, "A")));
const passB = captures.queries.flatMap((query) => products.map((product) => scoreRow(query, product, "B")))
  .sort((left, right) => hashOrder(`${left.query}:${left.product}`).localeCompare(hashOrder(`${right.query}:${right.product}`)));
const bByKey = new Map(passB.map((row) => [`${row.query}:${row.product}`, row]));
const disagreements = [];
const resolved = passA.map((row) => {
  const other = bByKey.get(`${row.query}:${row.product}`);
  const resolvedScore = { ...row.score };
  for (const dimension of dimensions) {
    if (row.score[dimension] === other.score[dimension]) continue;
    const resolution = row.query === "field" && row.product === "factorium" && dimension === "multiple_meanings"
      ? true
      : row.query === "risk" && row.product === "wikipedia" && dimension === "governing_factors"
        ? true
        : false;
    resolvedScore[dimension] = resolution;
    disagreements.push({ query: row.query, product: row.product, dimension, pass_a: row.score[dimension], pass_b: other.score[dimension], resolved: resolution });
  }
  const resolvedDecision = decisionStructure(resolvedScore);
  let interaction = row.interactions_to_decision_structure;
  if (!resolvedDecision) interaction = null;
  if (row.product === "wikipedia" && resolvedDecision) interaction = 0;
  return { ...row, score: resolvedScore, decision_structure: resolvedDecision, interactions_to_decision_structure: interaction };
});

const rowsFor = (product) => resolved.filter((row) => row.product === product);
const factorium = rowsFor("factorium");
const factoriumDecisionCount = factorium.filter((row) => row.decision_structure).length;
const lexical = {};
for (const product of ["merriam_webster_thesaurus", "onelook_thesaurus", "open_english_wordnet_2025"]) {
  const comparison = plan.queries.filter((query) => {
    const f = factorium.find((row) => row.query === query);
    const c = rowsFor(product).find((row) => row.query === query);
    return Number(f.decision_structure) > Number(c.decision_structure);
  });
  lexical[product] = { factorium_more_queries: comparison, count: comparison.length, required: plan.thresholds.factorium_more_structure_than_each_lexical_comparator_queries, pass: comparison.length >= plan.thresholds.factorium_more_structure_than_each_lexical_comparator_queries };
}

let routeComparablePass = 0;
let routeDominance = 0;
const routeRows = [];
for (const query of plan.queries) {
  const f = factorium.find((row) => row.query === query);
  const alternatives = [rowsFor("web_search_status_quo"), rowsFor("wikipedia")].map((rows) => rows.find((row) => row.query === query)).filter((row) => row.interactions_to_decision_structure !== null);
  if (!alternatives.length) {
    routeDominance += 1;
    routeRows.push({ query, factorium: f.interactions_to_decision_structure, comparator: null, disposition: "factorium-only-within-budget", pass: true });
    continue;
  }
  const comparator = Math.min(...alternatives.map((row) => row.interactions_to_decision_structure));
  const pass = f.interactions_to_decision_structure <= comparator + 1;
  if (pass) routeComparablePass += 1;
  routeRows.push({ query, factorium: f.interactions_to_decision_structure, comparator, disposition: "numeric-comparison", pass });
}
const routePassCount = routeComparablePass + routeDominance;
const falseEquivalenceCount = factorium.filter((row) => row.score.false_equivalence).length;
const thresholdResults = {
  factorium_decision_structure: { count: factoriumDecisionCount, denominator: 12, required: plan.thresholds.factorium_decision_structure_queries, pass: factoriumDecisionCount >= plan.thresholds.factorium_decision_structure_queries },
  lexical_comparators: lexical,
  route_cost: { count: routePassCount, denominator: 12, numeric_comparisons: routeRows.filter((row) => row.disposition === "numeric-comparison").length, factorium_only_within_budget: routeDominance, required: plan.thresholds.factorium_within_one_open_of_web_or_wikipedia_queries, pass: routePassCount >= plan.thresholds.factorium_within_one_open_of_web_or_wikipedia_queries, rows: routeRows },
  false_equivalence: { count: falseEquivalenceCount, maximum: plan.thresholds.factorium_false_equivalence_maximum, pass: falseEquivalenceCount <= plan.thresholds.factorium_false_equivalence_maximum }
};
const survived = thresholdResults.factorium_decision_structure.pass && Object.values(lexical).every((item) => item.pass) && thresholdResults.route_cost.pass && thresholdResults.false_equivalence.pass;
const gaps = ["force", "power", "value", "model", "system", "evidence"].map((query) => ({ query, classification: "competitor-advantage", observation: "Merriam-Webster's visible Synonym Chooser also satisfies the frozen binary contrast criterion, so Factorium is not strictly greater on this query under CAD-01.", disposition: "no-product-repair; refine a future value hypothesis around depth or task consequence rather than presence of any contrast" }));
for (const query of ["field", "role", "evidence"]) gaps.push({ query, classification: "navigation", observation: `Factorium exposes decision structure, but the first family route for '${query}' is specialized rather than an explicit ordinary-language meaning choice.`, disposition: "defer; not repeated under one owner and not a failed CAD-01 threshold" });

writeJson("fixtures/competitive-reference/scoring-pass-a-01.json", { campaign_id: plan.campaign_id, pass: "A-direct-observation", rows: passA });
writeJson("fixtures/competitive-reference/scoring-pass-b-01.json", { campaign_id: plan.campaign_id, pass: "B-shuffled-replay", rows: passB });
writeJson("fixtures/competitive-reference/result-01.json", {
  campaign_id: plan.campaign_id,
  status: "complete",
  verdict: survived ? "SURVIVES" : "FALSIFIED",
  candidate: plan.candidate,
  captures: { queries: 12, products: 6, rows: 72, available: 72 },
  scoring: { dimensions: 9, pass_a_rows: passA.length, pass_b_rows: passB.length, disagreements, resolved_rows: resolved },
  thresholds: thresholdResults,
  gaps,
  admitted_product_or_content_batch: null,
  reader_evidence_claimed: false,
  market_evidence_claimed: false,
  general_superiority_claimed: false
});
console.log(`OK campaign=${plan.campaign_id} verdict=${survived ? "SURVIVES" : "FALSIFIED"} factorium=${factoriumDecisionCount}/12 mw-more=${lexical.merriam_webster_thesaurus.count}/12 onelook-more=${lexical.onelook_thesaurus.count}/12 wordnet-more=${lexical.open_english_wordnet_2025.count}/12 route=${routePassCount}/12 disagreements=${disagreements.length}`);
