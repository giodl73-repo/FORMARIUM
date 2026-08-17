"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-42");
const manifestRelative = "volumes/01-structure-quantity-choice/book-one-sim-candidate-v0.factorium";
const candidatePath = path.join(root, manifestRelative);
const manifestPath = path.join(siteRoot, "manifest.json");
const searchPath = path.join(siteRoot, "search-index.json");
const indexPath = path.join(siteRoot, "index.html");
const candidateSearchPath = path.join(
  root,
  "volumes/01-structure-quantity-choice/proof-set-search-candidate.js"
);

const expectedSpine = [
  "tables/roots/purpose.md",
  "tables/roots/context.md",
  "tables/roots/boundary.md",
  "tables/roots/identity.md",
  "tables/roots/relation.md",
  "tables/entries/claim-evidence.md",
  "tables/entries/factorization-quality.md",
  "tables/entries/decomposition-modes-combination-contracts.md",
  "tables/constraints/factor-interaction-integrity.md",
  "tables/entries/system-composition-dependency.md",
  "tables/entries/scenario-assumption-condition-case.md",
  "tables/evidence/factor-status-completeness.md",
  "tables/entries/operational-resource-capacity-demand.md",
  "tables/entries/interaction-request-response-correlation.md",
  "tables/entries/spatial-operating-context.md",
  "tables/entries/hazard-exposure-harm-safety.md",
  "tables/diagnostics/operating-condition-failures.md",
  "tables/entries/evaluation-measure-scale-criterion.md",
  "tables/procedures/evaluation-aggregation.md",
  "tables/diagnostics/evaluation-sensitivity.md",
  "tables/entries/choice-alternative-selection.md",
  "tables/mappings/perspective-projection.md",
  "tables/procedures/contribution-reconciliation.md",
  "tables/evidence/change-lineage.md",
];
const expectedArtifacts = [
  "volumes/01-structure-quantity-choice/BOOK-ONE-SIM-QUICKSTART.md",
  "volumes/01-structure-quantity-choice/BOOK-ONE-SIM-TASKS.md",
  "volumes/01-structure-quantity-choice/BOOK-ONE-SIM-RUBRIC.md",
  "volumes/01-structure-quantity-choice/BOOK-ONE-PREVIEW-FEEDBACK-TEMPLATE.md",
  "volumes/01-structure-quantity-choice/BOOK-ONE-SIM-FINDINGS.md",
];

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const candidate = fs.readFileSync(candidatePath, "utf8");
assert.match(candidate, /^status internal-simulation-only$/m);
assert.match(candidate, /^source-base af22e57$/m);
assert.match(candidate, /^source reference \| 489c17a656b33582d848fe69a06d954da550a80fd9eec170c0ce8558b79f0324$/m);
assert.match(candidate, /^source relations \| df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634$/m);
assert.match(candidate, /^guide guides\/bounded-question-composition-book-one\.md \| 407a64aedc0db959a23b969ccd6f08554379db62215566ad9006069ad083afde$/m);
assert.match(candidate, /^spine 6344336d8304bc2c678f80a71820d0e5ae7a37da5082b2cb95c0aeac2ab23780 \| records=24 \| specialized-depth=151 \| canonical-total=175$/m);
assert.equal(sha256(path.join(root, "reference/factorium-reference-v0.factorium")),
  "489c17a656b33582d848fe69a06d954da550a80fd9eec170c0ce8558b79f0324");
assert.equal(sha256(path.join(root, "reference/factorium-relations-v0.factorium")),
  "df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634");
assert.equal(sha256(path.join(root, "guides/bounded-question-composition-book-one.md")),
  "407a64aedc0db959a23b969ccd6f08554379db62215566ad9006069ad083afde");
const spine = [...candidate.matchAll(/^record \d{2} \| (.+)$/gm)].map((match) => match[1]);
assert.deepEqual(spine, expectedSpine, "candidate spine identity or order changed");
assert.equal(new Set(spine).size, 24, "candidate spine paths must be unique");
for (const relative of [...spine, ...expectedArtifacts]) {
  assert.ok(fs.existsSync(path.join(root, relative)), `missing candidate target ${relative}`);
}
const strategies = [...candidate.matchAll(/^strategy (SIM-BO-\d{2}) \| (.+)$/gm)];
assert.deepEqual(strategies.map((match) => match[1]),
  ["SIM-BO-01", "SIM-BO-02", "SIM-BO-03", "SIM-BO-04"]);

const rendered = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
assert.equal(rendered.edition, "sim-42");
assert.equal(rendered.selection_checks.book_one_candidate_path, manifestRelative);
assert.equal(rendered.selection_checks.book_one_candidate_sha256, sha256(candidatePath));
assert.equal(rendered.selection_checks.book_one_spine_records, 24);
assert.equal(rendered.selection_checks.book_one_specialized_depth_records, 151);
assert.equal(rendered.selection_checks.book_one_route_strategies, 4);
assert.equal(rendered.search_checks.indexed_records, 185);
assert.equal(rendered.search_checks.application_guides, 10);
assert.equal(rendered.search_checks.missing_rendered_targets, 0);
assert.equal(rendered.site_checks.candidate_start_targets, 3);
assert.equal(rendered.site_checks.indexed_entry_pages, 185);
assert.equal(rendered.site_checks.missing_local_targets, 0);
assert.equal(rendered.site_checks.canonical_content_authority,
  "repository Markdown and reference metadata");

const html = fs.readFileSync(indexPath, "utf8");
const candidateOffset = html.indexOf('id="candidate"');
assert.ok(candidateOffset > -1, "candidate start is missing");
for (const later of ['id="problems"', 'id="start"', 'id="search"', 'id="contents"']) {
  const offset = html.indexOf(later);
  assert.ok(offset === -1 || candidateOffset < offset, `candidate must precede ${later}`);
}
assert.match(html, /24-record teaching spine/);
assert.match(html, /151 additional canonical records/);
assert.equal((html.match(/site-candidate__brief/g) || []).length, 1);

const records = JSON.parse(fs.readFileSync(searchPath, "utf8"));
const search = require(candidateSearchPath);
const results = search.searchRecords(
  records,
  "why did operation differ from the plan?",
  "",
  ""
).slice(0, 5);
assert.equal(results[0].title, "Book One Candidate Quickstart");
assert.ok(results.some((record) => /Bounded-Question/.test(record.title)),
  "bounded-question guide is absent from first five results");
assert.ok(!results.slice(0, 2).some((record) => /Mathematical Relation|Thermal Quantity/.test(record.title)),
  "unrelated stopword matches lead the ordinary query");
const percentResults = search.searchRecords(records, "5 percent component A", "", "").slice(0, 10);
assert.equal(percentResults[0].title, "Amount, Concentration, and Composition");
assert.ok(percentResults.some((record) => record.title === "Comparative Quantity"),
  "percentage lookup does not reach the alternate comparison basis");
const schedulingResults = search.searchRecords(
  records,
  "scheduling change demand capacity agreement evidence hazard",
  "",
  ""
).slice(0, 12);
for (const expected of [
  "Operational Resource, Capacity, Demand, and Allocation",
  "Agreement, Commitment, Obligation, Guarantee, and Contract Integrity",
  "Hazard, Exposure, Harm, Vulnerability, and Safety",
  "Queue, Backlog, Priority, Scheduling, and Service-Order Procedure",
  "Claim and Evidence",
]) {
  assert.ok(schedulingResults.some((record) => record.title === expected),
    `scheduling route is missing ${expected}`);
}

console.log(
  `OK edition=sim-30 spine=${spine.length} depth=151 strategies=${strategies.length} ` +
  `search=${records.length} routes=4 candidate_sha256=${sha256(candidatePath)}`
);
