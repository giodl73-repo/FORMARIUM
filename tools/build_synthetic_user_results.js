"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const campaignPath = path.join(fixtureRoot, "campaign-01.json");
const lookupPath = path.join(fixtureRoot, "browse-lookups-01.json");
const analysisPath = path.join(fixtureRoot, "analysis-01.json");
const indexPath = path.join(root, "target", "proof-set-sim-42", "search-index.json");
const outputPath = path.join(fixtureRoot, "results-01.json");
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const sha256 = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

const campaign = readJson(campaignPath);
const lookups = readJson(lookupPath);
const analysis = readJson(analysisPath);
const index = readJson(indexPath);
const recordsByPath = new Map(index.map((record) => [record.path, record]));
const lookupsById = new Map(lookups.journeys.map((journey) => [journey.persona_id, journey]));
const relationships = new Set(["replacement", "bridge", "new-reason", "not-served"]);
const dispositions = new Set(["no-change", "defer", "external", "repair"]);

if (campaign.status !== "frozen-before-execution") throw new Error("campaign is not frozen");
if (lookups.frozen_campaign_sha256 !== sha256(campaignPath)) throw new Error("campaign changed after lookup");
if (lookups.executed_against.search_index_sha256 !== sha256(indexPath)) throw new Error("search index changed");
if (analysis.campaign_id !== campaign.campaign_id) throw new Error("analysis campaign mismatch");
if (Object.keys(analysis.entries).length !== 25) throw new Error("analysis must cover 25 personas");

const results = campaign.personas.map((persona) => {
  const authored = analysis.entries[persona.id];
  const lookup = lookupsById.get(persona.id);
  if (!authored || !lookup) throw new Error(`${persona.id} lacks analysis or lookup`);
  if (!relationships.has(authored.relationship)) throw new Error(`${persona.id} relationship is invalid`);
  if (!dispositions.has(authored.change_disposition)) throw new Error(`${persona.id} disposition is invalid`);

  const selected = authored.selected_paths.map((selectedPath) => {
    const record = recordsByPath.get(selectedPath);
    if (!record) throw new Error(`${persona.id} path is not in sim-42: ${selectedPath}`);
    return {
      path: record.path,
      title: record.title,
      kind: record.kind,
      family_key: record.familyKey,
      family_title: record.familyTitle,
    };
  });
  const ownerCount = new Set(selected.map((record) => record.family_key)).size;
  const specializedViewCount = selected.filter((record) => !["entry", "guide"].includes(record.kind)).length;
  const postDefinitionMechanism = ["bridge", "new-reason"].includes(authored.relationship) &&
    (ownerCount >= 2 || specializedViewCount >= 1);

  return {
    persona_id: persona.id,
    synthetic_profile: {
      age_band: persona.age_band,
      background: persona.background,
      digital_comfort: persona.digital_comfort,
      intent: persona.intent,
    },
    declared_start: {
      situation: persona.situation,
      default_resource: persona.default_resource,
      task_shape: persona.task_shape,
      task: persona.task,
    },
    lexical_browse: lookup,
    selected_route: selected,
    mechanical_route: {
      route_records: selected.length,
      canonical_owners: ownerCount,
      specialized_views: specializedViewCount,
      unresolved_destinations: 0,
      post_definition_mechanism: postDefinitionMechanism,
    },
    alternative_relationship: authored.relationship,
    distinct_output: authored.distinct_output,
    authored_proxy_reaction: {
      evidence_label: "Authored synthetic proxy; not an observation, quotation, preference, or participant report.",
      starting_expectation: authored.reaction.starting_expectation,
      useful_moment: authored.reaction.useful_moment,
      friction: authored.reaction.friction,
      stopping_reason: authored.reaction.stop,
    },
    projection_losses: authored.losses,
    missing_owner: authored.missing_owner,
    change_disposition: authored.change_disposition,
    claim_boundary: "This route tests product mechanics and positioning language only. It does not describe what a real person thought, understood, preferred, completed, or would use again.",
  };
});

const countBy = (key) => Object.fromEntries([...new Set(results.map((result) => key(result)))].map((value) => [value, results.filter((result) => key(result) === value).length]));
const summary = {
  personas: results.length,
  queries: results.reduce((sum, result) => sum + result.lexical_browse.queries.length, 0),
  relationship: countBy((result) => result.alternative_relationship),
  intent: countBy((result) => result.synthetic_profile.intent),
  task_shape: countBy((result) => result.declared_start.task_shape),
  post_definition_mechanism: results.filter((result) => result.mechanical_route.post_definition_mechanism).length,
  missing_owner: results.filter((result) => result.missing_owner).length,
  unresolved_destinations: results.reduce((sum, result) => sum + result.mechanical_route.unresolved_destinations, 0),
  change_disposition: countBy((result) => result.change_disposition),
  falsification: {
    distinct_route_threshold: 8,
    missing_owner_threshold: 8,
    distinct_route_falsified: results.filter((result) => result.mechanical_route.post_definition_mechanism).length < 8,
    ownership_readiness_falsified: results.filter((result) => result.missing_owner).length > 8,
    behavioral_hypothesis_tested: false,
  },
};

const output = {
  artifact: "SUJ-01 synthetic browsing results",
  evidence_class: campaign.evidence_class,
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  custody: {
    frozen_commit: "ac63455",
    campaign_sha256: sha256(campaignPath),
    lookup_sha256: sha256(lookupPath),
    analysis_sha256: sha256(analysisPath),
    edition: lookups.executed_against.edition,
    source_commit: lookups.executed_against.source_commit,
    site_identity: lookups.executed_against.site_identity,
    search_index_sha256: lookups.executed_against.search_index_sha256,
  },
  results,
  summary,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-01 personas=${summary.personas} queries=${summary.queries} relationships=${JSON.stringify(summary.relationship)} post-definition=${summary.post_definition_mechanism} missing-owner=${summary.missing_owner}`);
