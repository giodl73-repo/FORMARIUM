const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "private-preview-rehearsal");
const target = path.join(root, "target", "proof-set-sim-42");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-01.json"), "utf8"));
const contract = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "result-contract-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(target, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(target, "search-index.json"), "utf8"));
const browser = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "browser-01.json"), "utf8"));
const indexHtml = fs.readFileSync(path.join(target, "index.html"), "utf8");
const readerHtml = fs.readFileSync(path.join(target, "reader.html"), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

assert(sha256(path.join(fixtureRoot, "campaign-01.json")) === "61c392519f91273e5d4c8be3ca0160763c2ccdb4807fd8aae3cfdad44505ceb6", "campaign freeze drift");
assert(sha256(path.join(fixtureRoot, "result-contract-01.json")) === "05736f4275ca394f191eec82b2cda0d5fd6a63d97d71b3e17ad9a101678c6796", "contract freeze drift");
assert(manifest.edition === campaign.candidate.edition && manifest.source_commit === campaign.candidate.source_commit, "candidate source drift");
assert(manifest.output.site_identity === campaign.candidate.site_identity, "site identity drift");
assert(sha256(path.join(target, "proof-set-sim-42.html")) === campaign.candidate.standalone_sha256, "standalone drift");
assert(sha256(path.join(target, "search-index.json")) === campaign.candidate.search_index_sha256, "search index drift");
assert(records.length === campaign.candidate.search_records && manifest.output.site_file_count - 15 === campaign.candidate.site_pages, "candidate count drift");
assert(browser.edition === "sim-42" && browser.source_commit === manifest.source_commit, "browser custody drift");

const byPath = new Map(records.map((record) => [record.path, record]));
const query = (text, count = 10) => search.searchRecords(records, text, "", "").slice(0, count);
const executedAgainst = {
  edition: manifest.edition,
  source_commit: manifest.source_commit,
  site_identity: manifest.output.site_identity,
  standalone_sha256: campaign.candidate.standalone_sha256,
  search_index_sha256: campaign.candidate.search_index_sha256,
  search_records: records.length,
  site_pages: campaign.candidate.site_pages,
};

function makeResult(task, requirementEvidence, observations) {
  const requirementResults = task.mechanical_requirements.map((id) => {
    const evidence = requirementEvidence[id];
    return { id, state: evidence && evidence.present ? "present" : "missing", evidence: evidence ? evidence.detail : "No check supplied." };
  });
  const missing = requirementResults.filter((item) => item.state === "missing");
  return {
    task_id: task.id,
    campaign_revision: campaign.revision,
    executed_against: executedAgainst,
    strategy: task.strategy,
    mechanical_observations: {
      queries_executed: observations.queries.length,
      destinations_inspected: observations.destinations.length,
      first_result_path: observations.firstResult || null,
      first_ten_paths: observations.firstTen || [],
      required_targets_present: requirementResults.length - missing.length,
      required_targets_missing: missing.length,
      local_links_missing: manifest.site_checks.missing_local_targets,
      narrow_viewport_overflow: observations.overflow,
    },
    requirement_results: requirementResults,
    artifact_state: missing.length === 0 ? "reached" : "blocked",
    findings: missing.map((item, index) => ({
      id: `${task.id}-F${index + 1}`,
      severity: "major",
      requirement: item.id,
      observation: item.evidence,
    })),
    disposition: missing.length === 0 ? "keep" : "repair",
    claim_boundary: task.forbidden_inference,
  };
}

const tasks = new Map(campaign.tasks.map((task) => [task.id, task]));
const results = [];
const p = (present, detail) => ({ present, detail });

const readerOffset = indexHtml.indexOf('id="reader"');
const problemsOffset = indexHtml.indexOf('id="problems"');
results.push(makeResult(tasks.get("SIM-PP-01"), {
  "tables-start-present": p(indexHtml.includes('data-book="tables"') && indexHtml.includes('href="#search"'), "Tables card links to the search start."),
  "reader-start-present": p(indexHtml.includes('data-book="reader"') && indexHtml.includes('href="reader.html"'), "Reader card links to reader.html."),
  "tables-authority-stated": p(indexHtml.includes("The Tables define and distinguish."), "The front door states Tables authority and Reader teaching scope."),
  "reader-precedes-problem-routes": p(readerOffset >= 0 && problemsOffset > readerOffset, "The Reader start precedes the worked-problem section."),
}, { queries: [], destinations: ["index.html", "tables.html", "reader.html"], overflow: browser.home.overflow }));

const bottleneck = query("bottleneck", 10);
const diagnostic = byPath.get("tables/diagnostics/dependency-critical-path.md");
const limitingLabels = ["capacity bottleneck", "service order delay", "dependency blocker", "critical or driving path", "binding constraint", "evidence limitation"];
results.push(makeResult(tasks.get("SIM-PP-02"), {
  "existing-owner-ranked-first": p(bottleneck[0]?.path === diagnostic.path, `First result: ${bottleneck[0]?.path || "none"}.`),
  "six-owner-rows-present": p(limitingLabels.every((label) => diagnostic.text.includes(label)), "All six limiting-role labels occur in the indexed diagnostic."),
  "untyped-routes-present": p(diagnostic.text.includes("do not infer a typed relation"), "The owner procedure rejects inferred typed relations."),
  "result-relative-boundary-present": p(diagnostic.text.includes("result and condition relative role") && diagnostic.text.includes("not a permanent identity"), "The indexed boundary makes bottleneck result- and condition-relative."),
}, { queries: ["bottleneck"], destinations: [diagnostic.path], firstResult: bottleneck[0]?.path, firstTen: bottleneck.map((item) => item.path), overflow: false }));

const percent = query("5 percent component A", 10);
const amount = byPath.get("tables/entries/amount-concentration-composition.md");
const comparative = byPath.get("tables/entries/comparative-quantity.md");
results.push(makeResult(tasks.get("SIM-PP-03"), {
  "composition-owner-ranked-first": p(percent[0]?.path === amount.path, `First result: ${percent[0]?.path || "none"}.`),
  "comparative-owner-in-first-ten": p(percent.some((item) => item.path === comparative.path), `Comparative Quantity rank: ${percent.findIndex((item) => item.path === comparative.path) + 1}.`),
  "basis-fields-present": p(amount.text.includes("numerator basis") && amount.text.includes("denominator roles") && amount.text.includes("component set"), "Amount/Composition retains numerator basis, denominator roles, and component-set custody."),
  "invalid-shortcut-boundary-present": p(amount.text.includes("percent value states a scale but not whether the basis is amount, mass, or volume"), "The indexed entry rejects an unstated composition basis."),
}, { queries: ["5 percent component A"], destinations: [amount.path, comparative.path], firstResult: percent[0]?.path, firstTen: percent.map((item) => item.path), overflow: false }));

const schedulingA = query("dependency scheduling path resource allocation", 12);
const schedulingB = query("scheduling capacity agreement hazard evidence decision", 12);
const schedulingPaths = new Set([...schedulingA, ...schedulingB].map((item) => item.path));
const decisionGuide = byPath.get("guides/evidence-informed-intervention-choice.md");
results.push(makeResult(tasks.get("SIM-PP-04"), {
  "limiting-condition-owner-reachable": p(schedulingPaths.has(diagnostic.path), "The limiting-condition diagnostic appears in the first scheduling query."),
  "capacity-owner-reachable": p(schedulingPaths.has("tables/entries/operational-resource-capacity-demand.md"), "Operational Resource appears in the query union."),
  "queue-owner-reachable": p(schedulingPaths.has("tables/procedures/queue-service-order.md"), "Queue and Service Order appears in the query union."),
  "hazard-owner-reachable": p(schedulingPaths.has("tables/entries/hazard-exposure-harm-safety.md"), "Hazard and Safety appears in the query union."),
  "decision-guide-reachable": p(schedulingPaths.has(decisionGuide.path), "The bounded decision Guide appears in the second query."),
  "authority-boundary-present": p(decisionGuide.text.includes("Final selection") && decisionGuide.text.includes("authorized owner has not selected"), "The Guide retains an unresolved final selection and states that the authorized owner has not selected."),
}, { queries: tasks.get("SIM-PP-04").queries, destinations: [...schedulingPaths], firstResult: schedulingA[0]?.path, firstTen: schedulingA.slice(0, 10).map((item) => item.path), overflow: false }));

const evidencePath = "guides/latency-evidence-composition-worksheet.md";
const evidence = byPath.get(evidencePath);
results.push(makeResult(tasks.get("SIM-PP-05"), {
  "evidence-worksheet-linked": p(indexHtml.includes("entries/guides-latency-evidence-composition-worksheet.html") && Boolean(evidence), "The problem-led home links the indexed latency worksheet."),
  "structural-complete-state-present": p(evidence.text.includes("graph is complete under this one edge policy") && evidence.text.includes("complete trace"), "The worksheet declares structural completeness."),
  "substantive-unresolved-state-present": p(evidence.text.includes("unresolved claim") && evidence.text.includes("causal implication remains unresolved"), "The claim remains explicitly unresolved."),
  "temporal-order-causal-boundary-present": p(evidence.text.includes("Temporal ordering alone does not isolate the release effect"), "The worksheet rejects temporal order as causal isolation."),
}, { queries: [], destinations: ["index.html", evidencePath], overflow: false }));

const readerPaths = [...readerHtml.matchAll(/data-reader-path="([^"]+)"/g)].map((match) => match[1]);
results.push(makeResult(tasks.get("SIM-PP-06"), {
  "reader-route-has-24-records": p(readerPaths.length === 24 && new Set(readerPaths).size === 24, `Reader route contains ${readerPaths.length} unique ordered records.`),
  "first-record-purpose": p(readerPaths[0] === "tables/roots/purpose.md", `First record: ${readerPaths[0] || "none"}.`),
  "last-record-change-lineage": p(readerPaths.at(-1) === "tables/evidence/change-lineage.md", `Last record: ${readerPaths.at(-1) || "none"}.`),
  "specialized-depth-count-151": p(readerHtml.includes("other 151 records"), "Reader boundary retains 151 records outside the teaching spine."),
  "canonical-authority-preserved": p(readerHtml.includes("Tables remain authoritative") && readerHtml.includes("editorial teaching sequence"), "Reader states canonical authority and non-universal order."),
}, { queries: [], destinations: ["reader.html", readerPaths[0], readerPaths.at(-1), "tables.html"], overflow: browser.reader.overflow }));

const output = {
  artifact: "SIM-PP-01 exact sim-42 internal preview rehearsal",
  evidence_class: "internal-artifact-rehearsal",
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  contract_id: contract.contract_id,
  campaign_sha256: "61c392519f91273e5d4c8be3ca0160763c2ccdb4807fd8aae3cfdad44505ceb6",
  contract_sha256: "05736f4275ca394f191eec82b2cda0d5fd6a63d97d71b3e17ad9a101678c6796",
  executed_against: executedAgainst,
  results,
  summary: {
    task_records: results.length,
    requirement_records: results.flatMap((result) => result.requirement_results).length,
    requirements_present: results.flatMap((result) => result.requirement_results).filter((item) => item.state === "present").length,
    requirements_missing: results.flatMap((result) => result.requirement_results).filter((item) => item.state === "missing").length,
    artifact_states: Object.fromEntries(contract.artifact_states.map((state) => [state, results.filter((result) => result.artifact_state === state).length])),
    findings: results.reduce((sum, result) => sum + result.findings.length, 0),
    reader_evidence: "not collected",
  },
};
fs.writeFileSync(path.join(fixtureRoot, "results-01.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=${campaign.campaign_id} tasks=${output.summary.task_records} requirements=${output.summary.requirement_records} present=${output.summary.requirements_present} missing=${output.summary.requirements_missing} findings=${output.summary.findings}`);
