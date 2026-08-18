"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const digest = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const freeze = json("fixtures/philosophy/gpc-09-v1-reader-integration.json");
const result = json("fixtures/philosophy/gpc-09-v1-reader-integration-result.json");

assert.equal(digest("reference/factorium-reference-v0.factorium"), freeze.baseline.reference_v0_sha256);
assert.equal(digest("reference/factorium-assurance-v0.factorium"), freeze.baseline.assurance_v0_sha256);
assert.equal(digest("reference/factorium-relations-v0.factorium"), freeze.baseline.relations_v0_sha256);
assert.equal(digest("volumes/01-structure-quantity-choice/FACTOR-FORGE-SIM-SUPPLEMENT.md"),
  freeze.baseline.sim_48_supplement_sha256);

function blocks(text, prefix, end) {
  const lines = text.trimEnd().split(/\r?\n/);
  const map = new Map();
  for (let index = 1; index < lines.length - 1;) {
    if (!lines[index].startsWith(prefix)) { index += 1; continue; }
    const block = [lines[index++]];
    while (lines[index] !== end) block.push(lines[index++]);
    block.push(lines[index++]);
    const id = block[0].split(" | ")[0].slice(prefix.length);
    map.set(id, block.join("\n"));
  }
  return map;
}

const v0 = read("reference/factorium-reference-v0.factorium");
const v1 = read("reference/factorium-reference-v1.factorium");
assert.ok(v0.startsWith("factorium-reference-v0\n"));
assert.ok(v1.startsWith("factorium-reference-v1\n"));
const v0Entries = blocks(v0, "entry ", "end-entry");
const v1Entries = blocks(v1, "entry ", "end-entry");
const v0Views = blocks(v0, "view ", "end-view");
const v1Views = blocks(v1, "view ", "end-view");
assert.equal(v0Entries.size, 53);
assert.equal(v1Entries.size, 54);
assert.equal(v0Views.size, 95);
assert.equal(v1Views.size, 97);
for (const [id, block] of [...v0Entries, ...v0Views]) {
  const target = v1Entries.get(id) || v1Views.get(id);
  assert.equal(target, block, `V0 block preserved exactly in V1: ${id}`);
}
assert.deepEqual([...v1Entries.keys()].filter((id) => !v0Entries.has(id)),
  ["meaning-reference-interpretation-use"]);
assert.deepEqual([...v1Views.keys()].filter((id) => !v0Views.has(id)),
  ["evidence-epistemic-standing-inquiry-warrant", "evidence-source-performance-research-custody"]);

const assuranceV0 = read("reference/factorium-assurance-v0.factorium").trimEnd().split(/\r?\n/);
const assuranceV1 = read("reference/factorium-assurance-v1.factorium").trimEnd().split(/\r?\n/);
assert.equal(assuranceV0.length - 2, 159);
assert.equal(assuranceV1.length - 2, 162);
const v1Rows = new Set(assuranceV1.slice(1, -1));
for (const row of assuranceV0.slice(1, -1)) assert.ok(v1Rows.has(row), "V1 preserves V0 assurance row");

const catalog = read("tables/CATALOG.md");
assert.ok(catalog.includes("Generated from `reference/factorium-reference-v1.factorium`"));
for (const relative of freeze.target.added_paths) assert.ok(catalog.includes(relative.replace("tables/", "")));

const manifest = json("target/proof-set-sim-49/manifest.json");
assert.equal(manifest.edition, "sim-49");
assert.match(manifest.status, /internal simulation/i);
assert.equal(manifest.selection_checks.canonical_entries, 54);
assert.equal(manifest.selection_checks.canonical_views, 97);
assert.equal(manifest.selection_checks.combined_projection_records, 178);
assert.equal(manifest.selection_checks.task_count, 56);
assert.equal(manifest.selection_checks.task_coverage_records, 100);
assert.equal(manifest.selection_checks.missing_delta_paths, 0);
assert.equal(manifest.selection_checks.extra_delta_paths, 0);
assert.equal(manifest.selection_checks.missing_task_coverage_paths, 0);
assert.equal(manifest.selection_checks.extra_task_coverage_paths, 0);
assert.equal(manifest.search_checks.indexed_records, 188);
assert.equal(manifest.search_checks.missing_rendered_targets, 0);
assert.equal(manifest.site_checks.chapter_pages, 19);
assert.equal(manifest.site_checks.indexed_entry_pages, 188);
assert.equal(manifest.site_checks.table_canonical_entry_pages, 54);
assert.equal(manifest.site_checks.table_specialized_view_pages, 97);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.reader_checks.default_profile, "book");

const search = json("target/proof-set-sim-49/search-index.json");
for (const relative of freeze.target.added_paths) {
  const records = search.filter((record) => record.path === relative);
  assert.equal(records.length, 1, `one search record for ${relative}`);
  assert.ok(records[0].text.length > 500, `full source text indexed for ${relative}`);
  assert.ok(fs.existsSync(path.join(root, "target/proof-set-sim-49", records[0].href)),
    `rendered page exists for ${relative}`);
}
const epistemic = search.find((record) => record.path.endsWith("epistemic-standing-inquiry-warrant.md"));
const custody = search.find((record) => record.path.endsWith("source-performance-research-custody.md"));
assert.equal(epistemic.familyKey, "tables/entries/claim-evidence.md");
assert.equal(custody.familyKey, "tables/entries/claim-evidence.md");
assert.match(epistemic.text, /does not certify knowledge or truth/i);
assert.match(custody.text, /Public availability is not authority/i);
assert.match(read("target/proof-set-sim-49/index.html"), /Factorium Tables remain canonical/i);

assert.equal(freeze.reader_evidence_claimed, false);
assert.equal(freeze.community_endorsement_claimed, false);
assert.equal(result.interchange.reference_sha256, digest("reference/factorium-reference-v1.factorium"));
assert.equal(result.interchange.assurance_sha256, digest("reference/factorium-assurance-v1.factorium"));
assert.equal(result.live_projection.edition, manifest.edition);
assert.equal(result.live_projection.book_records, manifest.selection_checks.combined_projection_records);
assert.equal(result.live_projection.search_records, manifest.search_checks.indexed_records);
assert.equal(result.live_projection.site_pages, manifest.site_checks.handoff_note_pages);
assert.equal(result.live_projection.missing_targets, 0);
assert.equal(result.live_projection.standalone_html_sha256, manifest.output.sha256);
assert.equal(result.live_projection.site_identity, manifest.output.site_identity);
assert.equal(result.reader_evidence_claimed, false);
assert.equal(result.community_endorsement_claimed, false);
console.log("OK v1=54/419/638/97 assurance=162 sim49=178 search=188 pages=245 missing=0 reader_evidence=no");
