"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "target", "proof-set-sim-42");
const fixtureRoot = path.join(root, "fixtures", "query-led-discovery");
const campaign = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "campaign-02.json"), "utf8"));
const indexPath = path.join(target, "search-index.json");
const manifestPath = path.join(target, "manifest.json");
const standalonePath = path.join(target, "proof-set-sim-42.html");
const outputPath = path.join(fixtureRoot, "baseline-lookups-02.json");

const expected = {
  sourceCommit: "531dea50dafeaf47e4909dbf8b7be93dac3d3021",
  siteIdentity: "a447c29d06b5a182fbfca4e57ba2d88ab0e2fb5fa6edbfbec3258109bfa0c0c4",
  standaloneSha256: "f1f6bb2d26eaa97979afdede39064f321e822e7a961d7d68ae8deb41174111c7",
  searchIndexSha256: "0812f44f42d833ac97587a2ed76007e8a900a7e20402956149f9f9003747874a"
};

const queries = {
  "QLD-02-01": ["amount concentration composition fraction", "solution label denominator basis"],
  "QLD-02-02": ["mean median quantile skew outlier", "choose summary missingness threshold"],
  "QLD-02-03": ["temperature thermal energy heat equilibrium", "same temperature different energy"],
  "QLD-02-04": ["stoichiometry limiting reactant conversion yield selectivity", "reaction mass balance observed yield"],
  "QLD-02-05": ["measurement error uncertainty variability bias", "disagreement reference value precision accuracy"],
  "QLD-02-06": ["force pressure stress distributed load", "area direction material safety"],
  "QLD-02-07": ["status state mode health configuration lifecycle", "dashboard reported label readiness"],
  "QLD-02-08": ["timeout retry fallback isolation alerting", "failure handling reliability side effects"],
  "QLD-02-09": ["available but unusable service", "availability accessibility capability correctness quality"],
  "QLD-02-10": ["data structure encoding representation transformation", "serialization transmission semantic equivalence loss"],
  "QLD-02-11": ["exactly once delivery receipt effect", "message deduplication committed state retry evidence"],
  "QLD-02-12": ["identity authentication permission authorization enforcement", "software resource naming access decision"],
  "QLD-02-13": ["policy rule requirement obligation commitment decision", "governance authority applicability conduct"],
  "QLD-02-14": ["assessment audit assurance certification accreditation", "independent review criteria authority recognition"],
  "QLD-02-15": ["causal contribution responsibility accountability fault liability", "outcome explanation blame authority evidence"],
  "QLD-02-16": ["criterion threshold constraint exception override appeal", "decision rule precedence authority"],
  "QLD-02-17": ["delegation authorization assignment permission approval", "retained accountability authority trace"],
  "QLD-02-18": ["queue priority policy priority urgency importance", "service order entitlement authority"],
  "QLD-02-19": ["danger hazard exposure harm risk vulnerability safety", "ordinary safety statement"],
  "QLD-02-20": ["price cost affordability value benefit return", "compare purchase horizon priorities"],
  "QLD-02-21": ["same mean different distribution spread", "sample composition uncertainty consequence"],
  "QLD-02-22": ["ratio fraction concentration amount scale", "mixture serving mass volume"],
  "QLD-02-23": ["natural green claim classification evidence", "environmental package threshold authority jurisdiction"],
  "QLD-02-24": ["capacity container service resource workload", "volume rate resources human capability" ]
};

const sha256 = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const records = JSON.parse(fs.readFileSync(indexPath, "utf8"));

if (campaign.status !== "frozen-before-baseline") throw new Error("campaign is not frozen");
if (manifest.edition !== "sim-42") throw new Error("target is not sim-42");
if (manifest.workspace_dirty_at_render !== false) throw new Error("baseline was dirty at render");
if (manifest.source_commit !== expected.sourceCommit) throw new Error("source commit changed");
if (manifest.output.site_identity !== expected.siteIdentity) throw new Error("site identity changed");
if (sha256(standalonePath) !== expected.standaloneSha256) throw new Error("standalone changed");
if (sha256(indexPath) !== expected.searchIndexSha256) throw new Error("search index changed");
if (records.length !== 185) throw new Error("search record count changed");

const lookups = campaign.packets.map((packet) => {
  const packetQueries = queries[packet.id];
  if (!packetQueries || packetQueries.length !== 2) throw new Error(`${packet.id} needs two queries`);
  return {
    packet_id: packet.id,
    queries: packetQueries.map((query) => {
      const matches = search.searchRecords(records, query, "", "");
      return {
        query,
        match_count: matches.length,
        first_five: matches.slice(0, 5).map((record) => ({
          title: record.title, kind: record.kind, domain: record.domain,
          path: record.path, href: record.href,
          family_key: record.familyKey, family_title: record.familyTitle
        }))
      };
    })
  };
});

const output = {
  artifact: "QLD-02 sim-42 baseline lexical lookup trace",
  evidence_class: "internal-authored-rehearsal",
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  executed_against: {
    edition: manifest.edition,
    source_commit: manifest.source_commit,
    site_identity: manifest.output.site_identity,
    standalone_sha256: expected.standaloneSha256,
    search_index_sha256: expected.searchIndexSha256,
    search_records: records.length
  },
  ranking: "exact sim-42 lexical ranking; no aliases, query expansion, or semantic inference",
  lookups
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=QLD-02 packets=${lookups.length} queries=${lookups.length * 2} records=${records.length}`);

