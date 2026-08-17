const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "target", "proof-set-sim-41");
const campaignPath = path.join(root, "fixtures", "query-led-discovery", "campaign-01.json");
const indexPath = path.join(target, "search-index.json");
const manifestPath = path.join(target, "manifest.json");
const standalonePath = path.join(target, "proof-set-sim-41.html");
const outputPath = path.join(root, "fixtures", "query-led-discovery", "baseline-lookups-01.json");

const expected = {
  sourceCommit: "0f28e15df31b14f1ded7ea4ba2584f4bc4da4879",
  siteIdentity: "b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9",
  standaloneSha256: "fcab6402c50c5b29420599666d624e63f43041ee2ba1cc919d15dbb70857e005",
  searchIndexSha256: "0d40926f828605265960987d85f023f6704092b5b1afac5696de0b449f8b51f1",
};

const queries = {
  "QLD-01-01": ["weight mass force", "10 kg"],
  "QLD-01-02": ["temperature measurement accuracy response", "compare measurement cost placement"],
  "QLD-01-03": ["tank inflow outflow level leak", "stock flow measurement boundary"],
  "QLD-01-04": ["prepare amount concentration", "dilution stock solution volume"],
  "QLD-01-05": ["12 percent efficiency improvement", "metric comparator denominator uncertainty"],
  "QLD-01-06": ["stock flow balance conservation", "cash balance inventory"],
  "QLD-01-07": ["service interface resource capability", "deployed endpoint"],
  "QLD-01-08": ["synchronous asynchronous messaging", "ordering latency delivery recovery coupling"],
  "QLD-01-09": ["response time request rate capacity queue", "latency dependency measurement"],
  "QLD-01-10": ["report generator dependency interface", "input contract transformation rendering delivery"],
  "QLD-01-11": ["why access authorized", "subject object role policy enforcement"],
  "QLD-01-12": ["dependency critical path planned work", "component task precedence"],
  "QLD-01-13": ["team owns outcome", "responsibility authority accountability ownership"],
  "QLD-01-14": ["compare policy options evidence values constraints risk", "hard constraint final authority"],
  "QLD-01-15": ["policy training conduct compliance failure", "obligation capability enforcement evidence"],
  "QLD-01-16": ["delegated authority scope accountability appeal", "delegation expiry revocation evidence"],
  "QLD-01-17": ["decision evidence rule version authority rationale", "decision revision provenance"],
  "QLD-01-18": ["policy feedback control analogy", "monitoring adjustment authority legitimacy"],
  "QLD-01-19": ["how big", "size"],
  "QLD-01-20": ["repair replace defer monitor", "cost safety remaining life uncertainty"],
  "QLD-01-21": ["plant wilting causes", "observation environment water balance exposure"],
  "QLD-01-22": ["event plan tasks roles capacity weather safety", "dependencies access cancellation triggers"],
  "QLD-01-23": ["sugar free claim", "amount threshold serving basis jurisdiction"],
  "QLD-01-24": ["bottleneck queue project evidence", "capacity precedence limitation"],
};

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const records = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

assert(campaign.status === "frozen-before-baseline", "campaign is not frozen");
assert(campaign.packets.length === 24, "campaign packet count changed");
assert(manifest.edition === "sim-41", "target is not sim-41");
assert(manifest.workspace_dirty_at_render === false, "baseline was rendered from a dirty workspace");
assert(manifest.source_commit === expected.sourceCommit, "baseline source commit changed");
assert(manifest.output.site_identity === expected.siteIdentity, "baseline site identity changed");
assert(sha256(standalonePath) === expected.standaloneSha256, "baseline standalone hash changed");
assert(sha256(indexPath) === expected.searchIndexSha256, "baseline search index hash changed");
assert(records.length === 185, "baseline search record count changed");
assert(Object.keys(queries).length === 24, "lookup query map must cover 24 packets");

const lookups = campaign.packets.map((packet) => {
  const packetQueries = queries[packet.id];
  assert(Array.isArray(packetQueries) && packetQueries.length === 2, `${packet.id} must have two lookup queries`);
  return {
    packet_id: packet.id,
    queries: packetQueries.map((query) => {
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
  };
});

const output = {
  artifact: "QLD-01 baseline lexical lookup trace",
  evidence_class: "internal-authored-rehearsal",
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  executed_against: {
    edition: manifest.edition,
    source_commit: manifest.source_commit,
    site_identity: manifest.output.site_identity,
    standalone_sha256: expected.standaloneSha256,
    search_index_sha256: expected.searchIndexSha256,
    search_records: records.length,
  },
  ranking: "exact sim-41 lexical ranking; no aliases, query expansion, or semantic inference",
  lookups,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(
  `OK campaign=${campaign.campaign_id} packets=${lookups.length} queries=${lookups.length * 2} ` +
    `records=${records.length} site=${expected.siteIdentity}`,
);
