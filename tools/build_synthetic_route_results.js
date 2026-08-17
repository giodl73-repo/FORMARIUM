"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fixtures = path.join(root, "fixtures", "synthetic-users");
const paths = {
  campaign: path.join(fixtures, "campaign-02.json"),
  profiles: path.join(fixtures, "campaign-01.json"),
  contract: path.join(fixtures, "result-contract-02.json"),
  lookups: path.join(fixtures, "browse-lookups-02.json"),
  analysis: path.join(fixtures, "analysis-02.json"),
  index: path.join(root, "target", "proof-set-sim-42", "search-index.json"),
  output: path.join(fixtures, "results-02.json"),
};
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const sha = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const countBy = (items, key) => Object.fromEntries([...new Set(items.map(key))].sort().map((value) => [value, items.filter((item) => key(item) === value).length]));

const campaign = read(paths.campaign);
const profiles = read(paths.profiles);
const contract = read(paths.contract);
const lookups = read(paths.lookups);
const analysis = read(paths.analysis);
const index = read(paths.index);
const profilesById = new Map(profiles.personas.map((profile) => [profile.id, profile]));
const lookupById = new Map(lookups.journeys.map((journey) => [journey.prompt_id, journey]));
const recordsByPath = new Map(index.map((record) => [record.path, record]));

assert.equal(campaign.status, "frozen-before-execution");
assert.equal(lookups.frozen_commit, "1703de0");
assert.equal(lookups.campaign_sha256, sha(paths.campaign));
assert.equal(lookups.executed_against.search_index_sha256, sha(paths.index));
assert.equal(analysis.campaign_id, campaign.campaign_id);
assert.equal(Object.keys(analysis.entries).length, 25);

const results = campaign.prompts.map((prompt) => {
  const profile = profilesById.get(prompt.profile_id);
  const lookup = lookupById.get(prompt.id);
  const authored = analysis.entries[prompt.id];
  assert.ok(profile && lookup && authored, `${prompt.id} lacks profile, lookup, or analysis`);
  assert.ok(contract.entrances.includes(authored.first_entrance));
  assert.ok(contract.inertia_relationships.includes(authored.inertia_relationship));
  assert.ok(contract.view_profiles.includes(authored.view_profile));
  assert.ok(contract.change_dispositions.includes(authored.change_disposition));

  const visiblePaths = new Set(lookup.queries.flatMap((query) => query.first_five.map((record) => record.path)));
  const selected = authored.selected_paths.map((selectedPath) => {
    const record = recordsByPath.get(selectedPath);
    assert.ok(record, `${prompt.id} selected path absent from sim-42: ${selectedPath}`);
    return { path: record.path, title: record.title, kind: record.kind, family_key: record.familyKey, family_title: record.familyTitle };
  });
  const selectedFamilies = new Set(selected.map((record) => record.family_key));
  const visibleFamilies = new Set(lookup.queries.flatMap((query) => query.first_five.map((record) => record.family_key)));
  const mechanicalLanding = authored.selected_paths.some((selectedPath) => visiblePaths.has(selectedPath)) ||
    [...selectedFamilies].some((family) => visibleFamilies.has(family));
  assert.equal(mechanicalLanding, authored.ordinary_landing, `${prompt.id} ordinary landing disagrees with frozen rankings`);
  assert.equal(authored.ordinary_landing, authored.injected_terms.length === 0, `${prompt.id} injection flag is inconsistent`);

  return {
    persona_id: prompt.profile_id,
    prompt: { prompt_id: prompt.id, takeaway: prompt.takeaway, text: prompt.prompt, queries: prompt.queries },
    incumbent_chain: { resources: authored.incumbent_chain, advantage: authored.incumbent_advantage },
    lexical_browse: lookup,
    selected_route: selected,
    ordinary_language_landing: { reached_selected_route_in_frozen_first_five: authored.ordinary_landing, injected_terms_required: authored.injected_terms },
    first_entrance: authored.first_entrance,
    switch_trigger: { evidence_label: "Authored synthetic proxy, not observed behavior.", text: authored.switch_trigger },
    inertia_relationship: authored.inertia_relationship,
    authored_proxy_response: { evidence_label: "Authored synthetic proxy; not a participant report, quotation, preference, or measured outcome.", useful: authored.response.useful, friction: authored.response.friction },
    view_profile_hypothesis: { evidence_label: "Task-fit hypothesis, not a reader preference.", profile: authored.view_profile },
    trust_cues: { evidence_label: "Authored trust hypothesis, not measured trust.", items: authored.trust_cues },
    trust_blockers: { evidence_label: "Authored trust hypothesis, not measured trust.", items: authored.trust_blockers },
    stopping_rule: authored.stop,
    outward_handoff: authored.handoff,
    memory_trigger: { evidence_label: "Authored recall hypothesis, not measured memory.", text: authored.memory },
    fun_continuation: { evidence_label: "Authored exploration hypothesis, not measured enjoyment.", text: authored.fun },
    projection_losses: authored.losses,
    change_disposition: authored.change_disposition,
    claim_boundary: "This result rehearses lexical routing and product framing only. It does not show what a real reader would choose, trust, understand, remember, enjoy, complete, adopt, or revisit.",
    synthetic_profile: { age_band: profile.age_band, background: profile.background, digital_comfort: profile.digital_comfort, intent: profile.intent },
  };
});

for (const result of results) {
  for (const field of contract.required_result_fields) assert.ok(Object.hasOwn(result, field), `${result.prompt.prompt_id} lacks ${field}`);
}

const landings = results.filter((result) => result.ordinary_language_landing.reached_selected_route_in_frozen_first_five).length;
const injections = results.filter((result) => result.ordinary_language_landing.injected_terms_required.length > 0).length;
const summary = {
  personas: results.length,
  prompts: results.length,
  queries: results.reduce((sum, result) => sum + result.prompt.queries.length, 0),
  first_entrance: countBy(results, (result) => result.first_entrance),
  inertia_relationship: countBy(results, (result) => result.inertia_relationship),
  view_profile_hypothesis: countBy(results, (result) => result.view_profile_hypothesis.profile),
  ordinary_language_landing: { reached: landings, missed: results.length - landings, vocabulary_injection_required: injections },
  change_disposition: countBy(results, (result) => result.change_disposition),
  falsification: {
    relevant_destination_threshold: 15,
    vocabulary_injection_ceiling: 10,
    relevant_destination_falsified: landings < 15,
    vocabulary_injection_falsified: injections > 10,
    behavioral_route_choice_tested: false,
  },
};

const output = {
  artifact: "SUJ-02 term-blind route-choice and inertia results",
  evidence_class: campaign.evidence_class,
  campaign_id: campaign.campaign_id,
  campaign_revision: campaign.revision,
  custody: {
    frozen_commit: lookups.frozen_commit,
    campaign_sha256: sha(paths.campaign),
    contract_sha256: sha(paths.contract),
    lookup_sha256: sha(paths.lookups),
    analysis_sha256: sha(paths.analysis),
    edition: lookups.executed_against.edition,
    source_commit: lookups.executed_against.source_commit,
    site_identity: lookups.executed_against.site_identity,
    search_index_sha256: lookups.executed_against.search_index_sha256,
  },
  results,
  summary,
};

fs.writeFileSync(paths.output, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`OK campaign=SUJ-02 personas=${summary.personas} queries=${summary.queries} landing=${landings}/25 injection=${injections}/25 entrances=${JSON.stringify(summary.first_entrance)} inertia=${JSON.stringify(summary.inertia_relationship)}`);
