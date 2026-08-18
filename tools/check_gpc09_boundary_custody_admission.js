"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const digest = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const fixture = JSON.parse(read("fixtures/philosophy/gpc-09-boundary-custody-admission.json"));
const result = JSON.parse(read("fixtures/philosophy/gpc-09-boundary-custody-admission-result.json"));

assert.equal(fixture.status, "frozen-before-admission");
assert.deepEqual(fixture.content_cap,
  { entries: 1, views: 2, new_senses: 7, new_relations: 0 });
assert.equal(fixture.reader_evidence_claimed, false);
assert.equal(digest("reference/factorium-reference-v0.factorium"),
  fixture.baseline.reference_v0_sha256, "reference V0 bytes remain frozen");
assert.equal(result.v0_custody.assurance_rebind.semantic_change, false);
assert.equal(result.v0_custody.assurance_rebind.binding_count_before,
  result.v0_custody.assurance_rebind.binding_count_after);
assert.equal(digest("reference/factorium-assurance-v0.factorium"),
  result.v0_custody.assurance_sha256, "assurance records bounded rebind result");
assert.equal(digest("reference/factorium-relations-v0.factorium"),
  fixture.baseline.relations_v0_sha256, "relation V0 bytes remain frozen");

for (const relative of fixture.admitted_paths) {
  assert.ok(fs.existsSync(path.join(workspace, relative)), `admitted path exists: ${relative}`);
  const markdown = read(relative);
  assert.match(markdown, /^Status: candidate /m, `${relative} remains candidate`);
  assert.match(markdown, /^## Sources and provenance$/m, `${relative} has source custody`);
  assert.match(markdown, /reader|Reading views/i, `${relative} declares projection behavior`);
}
for (const record of result.admitted)
  assert.equal(digest(record.path), record.sha256, `result binds admitted bytes: ${record.id}`);

const anchorPath = fixture.admitted_paths[0];
const anchor = read(anchorPath);
const beforeSources = anchor.split("## Sources and provenance")[0];
const senseIds = [
  "semantic-meaning", "reference", "interpretation-act", "interpretation-result",
  "use-context", "ambiguity", "translation"
];
for (const sense of senseIds) {
  assert.ok(anchor.includes(`| \`${sense}\` |`), `anchor owns exact sense: ${sense}`);
}
assert.equal((anchor.match(/^\| `[^`]+` \|/gm) || []).length, 7,
  "anchor owns exactly seven senses");
for (const forbidden of ["Socrates", "Plato", "Confucius", "Buddha", "ubuntu", "dharma"])
  assert.ok(!beforeSources.includes(forbidden), `governing structure needs no proper-name member: ${forbidden}`);
for (const required of [
  "semantic meaning vs. semantic information", "meaning vs. reference",
  "meaning vs. speaker intent", "interpretation vs. decoding",
  "interpretation vs. inference", "ambiguity vs. uncertainty",
  "translation vs. exact mapping", "Inclusion and stopping boundary"
]) assert.ok(anchor.includes(required), `anchor preserves boundary: ${required}`);

const epistemic = read(fixture.admitted_paths[1]);
const custody = read(fixture.admitted_paths[2]);
for (const view of [epistemic, custody]) {
  assert.ok(view.includes("This view adds no canonical sense."));
  assert.ok(!view.includes("## Sense table"));
  for (const profile of ["Compact", "Abbreviated", "Book", "Full"])
    assert.ok(view.includes(`| ${profile} |`), `view declares ${profile} projection`);
}
for (const required of [
  "Epistemic subject", "Attitude/status", "Warrant rule", "Alternatives/defeaters",
  "does not certify knowledge or truth", "does not establish that the claim or interpretation is correct"
]) assert.ok(epistemic.includes(required), `epistemic contract preserves: ${required}`);
for (const required of [
  "Authority to share", "Consent/participation", "Translation/mediation",
  "Research accountability", "intentionally absent", "Public availability is not authority"
]) assert.ok(custody.includes(required), `custody contract preserves: ${required}`);

const outboundLinks = [
  "information-data-signal-noise.md", "model-representation-simulation.md",
  "identity-naming-classification-versioning.md", "claim-evidence.md",
  "organization-role-authority.md", "epistemic-standing-inquiry-warrant.md",
  "source-performance-research-custody.md"
];
const admittedMarkdown = fixture.admitted_paths.map(read).join("\n");
for (const link of outboundLinks)
  assert.ok(admittedMarkdown.includes(link), `admitted records link existing owner/view: ${link}`);

const reference = read("reference/factorium-reference-v0.factorium");
for (const id of ["meaning-reference-interpretation-use", "epistemic-standing-inquiry-warrant",
  "source-performance-research-custody"])
  assert.ok(!reference.includes(id), `frozen V0 does not silently admit ${id}`);

const entryCount = fs.readdirSync(path.join(workspace, "tables/entries"))
  .filter((name) => name.endsWith(".md")).length;
assert.equal(entryCount, 54, "current Markdown entry count includes one admitted anchor");

console.log("OK admitted=3 entries=1 views=2 senses=7 v0_reference_frozen=yes assurance_rebind=3 reader_evidence=no");
