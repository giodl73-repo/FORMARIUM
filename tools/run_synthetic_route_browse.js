"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const target = path.join(root, "target", "proof-set-sim-42");
const campaignPath = path.join(fixtureRoot, "campaign-02.json");
const indexPath = path.join(target, "search-index.json");
const campaignBytes = fs.readFileSync(campaignPath);
const campaign = JSON.parse(campaignBytes.toString("utf8"));
const indexBytes = fs.readFileSync(indexPath);
const records = JSON.parse(indexBytes.toString("utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(target, "manifest.json"), "utf8"));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

if (campaign.status !== "frozen-before-execution") throw new Error("campaign not frozen");
if (manifest.edition !== campaign.baseline_edition) throw new Error("edition changed");
if (manifest.source_commit !== campaign.baseline_source_commit) throw new Error("source commit changed");
if (manifest.output.site_identity !== campaign.baseline_site_identity) throw new Error("site identity changed");
if (sha256(indexBytes) !== campaign.baseline_search_index_sha256) throw new Error("search index changed");

const journeys = campaign.prompts.map((prompt) => ({
  prompt_id: prompt.id,
  queries: prompt.queries.map((query) => {
    const matches = search.searchRecords(records, query, "", "");
    return {
      query,
      match_count: matches.length,
      first_five: matches.slice(0, 5).map((record) => ({
        title: record.title,
        kind: record.kind,
        domain: record.domain,
        path: record.path,
        href: record.href,
        family_key: record.familyKey,
        family_title: record.familyTitle,
      })),
    };
  }),
}));

const output = {
  artifact: "SUJ-02 sim-42 term-blind lexical browsing trace",
  evidence_class: campaign.evidence_class,
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  frozen_commit: "1703de0",
  campaign_sha256: sha256(campaignBytes),
  executed_against: {
    edition: manifest.edition,
    source_commit: manifest.source_commit,
    site_identity: manifest.output.site_identity,
    search_index_sha256: sha256(indexBytes),
    search_records: records.length,
  },
  ranking: "exact sim-42 lexical ranking; no profile-conditioned ranking, aliases, query expansion, semantic inference, or post-result query edits",
  journeys,
};

fs.writeFileSync(path.join(fixtureRoot, "browse-lookups-02.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-02 prompts=${journeys.length} queries=${journeys.length * 2} records=${records.length} campaign=${output.campaign_sha256}`);
