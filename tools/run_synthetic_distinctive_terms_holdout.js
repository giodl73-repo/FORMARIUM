"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const currentSearch = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const siteRoot = path.join(root, "target", "proof-set-sim-46");
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const campaign = JSON.parse(read("fixtures/synthetic-users/campaign-11.json"));
const developmentCampaign = JSON.parse(read(campaign.development.campaign_path));
const developmentAnalysis = JSON.parse(read(campaign.development.analysis_path)).entries;
const holdoutCampaign = JSON.parse(read(campaign.holdout.campaign_path));
const holdoutResults = JSON.parse(read(campaign.holdout.result_path));
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const indexBytes = fs.readFileSync(path.join(siteRoot, "search-index.json"));
const records = JSON.parse(indexBytes);
const recordByPath = new Map(records.map((record) => [record.path, record]));

assert.equal(campaign.status, "frozen-before-holdout-execution");
assert.equal(manifest.edition, campaign.baseline.edition);
assert.equal(manifest.source_commit, campaign.baseline.source_commit);
assert.equal(manifest.output.site_identity, campaign.baseline.site_identity);
assert.equal(sha(indexBytes), campaign.baseline.search_index_sha256);
assert.equal(sha(read(campaign.holdout.campaign_path)), campaign.holdout.campaign_sha256);
assert.equal(sha(read(campaign.holdout.result_path)), campaign.holdout.result_sha256);

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "did", "do",
  "does", "for", "from", "how", "in", "is", "it", "of", "on",
  "or", "the", "to", "was", "were", "what", "when", "where",
  "which", "why", "with"
]);
function tokens(value) {
  const raw = String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().match(/[a-z0-9]+/g) || [];
  const filtered = raw.filter((token) => !stopWords.has(token));
  return filtered.length ? filtered : raw;
}

const documents = records.map((record) => tokens([
  record.title, record.kind, record.domain, record.maturity, record.path,
  record.summary, record.text
].join(" ")));
const averageLength = documents.reduce((sum, document) => sum + document.length, 0) / documents.length;
const documentFrequency = new Map();
for (const document of documents) {
  for (const token of new Set(document)) documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
}

function distinctiveSearch(query) {
  const queryTokens = tokens(query);
  return records.map((record, index) => {
    const counts = new Map();
    for (const token of documents[index]) counts.set(token, (counts.get(token) || 0) + 1);
    let score = 0;
    for (const token of queryTokens) {
      const frequency = counts.get(token) || 0;
      if (!frequency) continue;
      const df = documentFrequency.get(token) || 0;
      const idf = Math.log(1 + (records.length - df + 0.5) / (df + 0.5));
      const denominator = frequency + campaign.candidate.k1 *
        (1 - campaign.candidate.b + campaign.candidate.b * documents[index].length / averageLength);
      score += idf * frequency * (campaign.candidate.k1 + 1) / denominator;
    }
    return { record, score };
  }).filter((match) => match.score > 0)
    .sort((left, right) => right.score - left.score || left.record.title.localeCompare(right.record.title))
    .map((match) => match.record);
}

function familyKey(pathValue) {
  const record = recordByPath.get(pathValue);
  assert.ok(record, `missing indexed path ${pathValue}`);
  return record.familyKey || record.path;
}
function firstFamilies(ranked) {
  return currentSearch.groupRecords(ranked).slice(0, campaign.candidate.ownership_window)
    .map((group, index) => ({ rank: index + 1, key: group.key, title: group.title, href: group.href }));
}
function scoreAttempt(query, intended) {
  const current = firstFamilies(currentSearch.searchRecords(records, query, "", ""));
  const candidate = firstFamilies(distinctiveSearch(query));
  const currentIntended = intended.filter((key) => current.some((group) => group.key === key));
  const candidateIntended = intended.filter((key) => candidate.some((group) => group.key === key));
  return {
    query,
    intended_families: intended,
    current_first_five: current,
    candidate_first_five: candidate,
    current_intended_families: currentIntended,
    candidate_intended_families: candidateIntended,
    current_hit: currentIntended.length > 0,
    candidate_hit: candidateIntended.length > 0,
    candidate_only_gain: currentIntended.length === 0 && candidateIntended.length > 0,
    current_only_loss: currentIntended.length > 0 && candidateIntended.length === 0
  };
}

const development = developmentCampaign.prompts.map((prompt) => {
  const intended = [...new Set(developmentAnalysis[prompt.id].selected_paths.map(familyKey))];
  return { prompt_id: prompt.id, attempt: scoreAttempt(prompt.queries[0], intended) };
});
const holdoutByPacket = new Map(holdoutResults.results.map((result) => [result.packet_id, result]));
const holdout = holdoutCampaign.packets.map((packet) => {
  const frozenResult = holdoutByPacket.get(packet.id);
  assert.ok(frozenResult, `missing holdout result ${packet.id}`);
  const intended = [...new Set(frozenResult.selected_senses.map((sense) => familyKey(sense.path)))];
  return {
    packet_id: packet.id,
    intended_families: intended,
    attempts: frozenResult.lookup_attempt.queries.map((attempt) => scoreAttempt(attempt.query, intended))
  };
});
const attempts = holdout.flatMap((packet) => packet.attempts);
assert.equal(attempts.length, campaign.holdout.query_attempts);
const gains = attempts.filter((attempt) => attempt.candidate_only_gain).length;
const losses = attempts.filter((attempt) => attempt.current_only_loss).length;
const dashboard = holdout.find((packet) => packet.packet_id === campaign.admission.holdout_dashboard_packet)
  .attempts[campaign.admission.holdout_dashboard_query_index];
const developmentDashboard = development.find((prompt) => prompt.prompt_id === "SUJ-02-15").attempt;
const passed = developmentDashboard.candidate_hit
  && dashboard.candidate_hit
  && gains >= campaign.admission.minimum_holdout_candidate_only_gains
  && gains - losses >= campaign.admission.minimum_holdout_net_gain_over_losses
  && losses <= campaign.admission.maximum_holdout_current_only_losses;

const output = {
  artifact: "SUJ-11 standard BM25 distinctive-terms holdout",
  campaign_id: campaign.campaign_id,
  evidence_class: campaign.evidence_class,
  custody: {
    frozen_commit: "6597980",
    source_commit: manifest.source_commit,
    site_identity: manifest.output.site_identity,
    search_index_sha256: sha(indexBytes),
    holdout_campaign_sha256: campaign.holdout.campaign_sha256,
    holdout_result_sha256: campaign.holdout.result_sha256
  },
  candidate: campaign.candidate,
  summary: {
    development_attempts: development.length,
    development_current_hits: development.filter((item) => item.attempt.current_hit).length,
    development_candidate_hits: development.filter((item) => item.attempt.candidate_hit).length,
    development_dashboard_candidate_hit: developmentDashboard.candidate_hit,
    holdout_attempts: attempts.length,
    holdout_current_hits: attempts.filter((attempt) => attempt.current_hit).length,
    holdout_candidate_hits: attempts.filter((attempt) => attempt.candidate_hit).length,
    holdout_candidate_only_gains: gains,
    holdout_current_only_losses: losses,
    holdout_net_gain: gains - losses,
    holdout_dashboard_candidate_hit: dashboard.candidate_hit,
    passed
  },
  development,
  holdout
};
fs.writeFileSync(path.join(fixtureRoot, "distinctive-terms-holdout-11.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-11 development=${output.summary.development_current_hits}->${output.summary.development_candidate_hits}/25 holdout=${output.summary.holdout_current_hits}->${output.summary.holdout_candidate_hits}/48 gains=${gains} losses=${losses} net=${gains - losses} dashboard=${dashboard.candidate_hit} passed=${passed}`);
