"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const campaign = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "synthetic-users", "campaign-01.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-42", "manifest.json"), "utf8"));
const searchBytes = fs.readFileSync(path.join(root, "target", "proof-set-sim-42", "search-index.json"));
const searchDigest = crypto.createHash("sha256").update(searchBytes).digest("hex");

assert.equal(campaign.campaign_id, "SUJ-01");
assert.equal(campaign.revision, 1);
assert.equal(campaign.status, "frozen-before-execution");
assert.equal(campaign.evidence_class, "authored-synthetic-product-rehearsal");
assert.equal(campaign.baseline_edition, "sim-42");
assert.equal(campaign.baseline_source_commit, manifest.source_commit);
assert.equal(campaign.baseline_site_identity, manifest.output.site_identity);
assert.equal(campaign.baseline_search_index_sha256, searchDigest);
assert.equal(campaign.personas.length, 25);

const required = ["id", "revision", "age_band", "background", "digital_comfort", "intent", "situation", "default_resource", "task_shape", "task", "queries"];
const ids = new Set();
const counts = { intent: {}, shape: {}, resource: {}, age: {}, comfort: {} };
for (const [index, persona] of campaign.personas.entries()) {
  assert.equal(persona.id, `SUJ-01-${String(index + 1).padStart(2, "0")}`);
  assert.ok(!ids.has(persona.id)); ids.add(persona.id);
  required.forEach((field) => assert.ok(Object.hasOwn(persona, field), `${persona.id} missing ${field}`));
  assert.equal(persona.revision, 1);
  assert.ok(["18-24", "25-34", "35-44", "45-54", "55-64", "65-74"].includes(persona.age_band));
  assert.ok(["low", "medium", "high"].includes(persona.digital_comfort));
  assert.ok(["fun", "purpose"].includes(persona.intent));
  assert.ok(["lookup-control", "contrast", "composition-evaluation"].includes(persona.task_shape));
  assert.equal(persona.queries.length, 2);
  assert.ok(persona.queries.every((query) => query.length > 2));
  for (const [key, value] of [["intent", persona.intent], ["shape", persona.task_shape], ["resource", persona.default_resource], ["age", persona.age_band], ["comfort", persona.digital_comfort]]) {
    counts[key][value] = (counts[key][value] || 0) + 1;
  }
}

assert.deepEqual(counts.intent, { purpose: 15, fun: 10 });
assert.deepEqual(counts.shape, { contrast: 10, "composition-evaluation": 10, "lookup-control": 5 });
assert.equal(Object.keys(counts.age).length, 6);
assert.equal(Object.keys(counts.comfort).length, 3);
assert.ok((counts.resource.dictionary || 0) >= 5);
assert.ok((counts.resource.thesaurus || 0) >= 5);
assert.equal(campaign.personas.reduce((sum, persona) => sum + persona.queries.length, 0), 50);

console.log(`OK campaign=SUJ-01 personas=25 queries=50 fun=10 purpose=15 lookup=5 contrast=10 composition=10 ages=6 resources=${Object.keys(counts.resource).length}`);
