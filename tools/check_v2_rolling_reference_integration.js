"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const digest = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

function blocks(text, prefix, end) {
  const lines = text.trimEnd().split(/\r?\n/);
  const result = new Map();
  for (let index = 1; index < lines.length - 1;) {
    if (!lines[index].startsWith(prefix)) { index += 1; continue; }
    const block = [lines[index++]];
    while (lines[index] !== end) block.push(lines[index++]);
    block.push(lines[index++]);
    result.set(block[0].split(" | ")[0].slice(prefix.length), block.join("\n"));
  }
  return result;
}

const v1 = read("reference/factorium-reference-v1.factorium");
const v2 = read("reference/factorium-reference-v2.factorium");
assert.ok(v1.startsWith("factorium-reference-v1\n"));
assert.ok(v2.startsWith("factorium-reference-v2\n"));
const v1Entries = blocks(v1, "entry ", "end-entry");
const v2Entries = blocks(v2, "entry ", "end-entry");
const v1Views = blocks(v1, "view ", "end-view");
const v2Views = blocks(v2, "view ", "end-view");
assert.equal(v1Entries.size, 54);
assert.equal(v2Entries.size, 54);
assert.equal(v1Views.size, 97);
assert.equal(v2Views.size, 100);
for (const [id, block] of [...v1Entries, ...v1Views]) {
  assert.equal(v2Entries.get(id) || v2Views.get(id), block, `V1 block preserved in V2: ${id}`);
}
assert.deepEqual([...v2Views.keys()].filter((id) => !v1Views.has(id)), [
  "evidence-contribution-credit-priority-legacy",
  "mapping-optimization-problem-structure",
  "procedure-prototype-test-iteration"
]);

const assuranceV1 = read("reference/factorium-assurance-v1.factorium").trimEnd().split(/\r?\n/);
const assuranceV2 = read("reference/factorium-assurance-v2.factorium").trimEnd().split(/\r?\n/);
assert.equal(assuranceV1.length - 2, 162);
assert.equal(assuranceV2.length - 2, 165);
const v2Rows = new Set(assuranceV2.slice(1, -1));
for (const row of assuranceV1.slice(1, -1)) assert.ok(v2Rows.has(row), "V2 preserves V1 assurance row");

const catalog = read("tables/CATALOG.md");
assert.match(catalog, /Generated from `reference\/factorium-reference-v2\.factorium`/);
const addedPaths = [
  "tables/mappings/optimization-problem-structure.md",
  "tables/procedures/prototype-test-iteration.md",
  "tables/evidence/contribution-credit-priority-legacy.md"
];
for (const relative of addedPaths) assert.ok(catalog.includes(relative.replace("tables/", "")));

const manifest = json("target/proof-set-sim-50/manifest.json");
assert.equal(manifest.edition, "sim-50");
assert.match(manifest.status, /internal simulation/i);
assert.equal(manifest.workspace_dirty_at_render, false);
assert.equal(manifest.selection_checks.canonical_entries, 54);
assert.equal(manifest.selection_checks.canonical_views, 100);
assert.equal(manifest.selection_checks.combined_projection_records, 181);
assert.equal(manifest.selection_checks.task_count, 59);
assert.equal(manifest.selection_checks.task_coverage_records, 103);
assert.equal(manifest.selection_checks.missing_delta_paths, 0);
assert.equal(manifest.selection_checks.extra_delta_paths, 0);
assert.equal(manifest.selection_checks.missing_task_coverage_paths, 0);
assert.equal(manifest.selection_checks.extra_task_coverage_paths, 0);
assert.equal(manifest.search_checks.indexed_records, 191);
assert.equal(manifest.search_checks.missing_rendered_targets, 0);
assert.equal(manifest.site_checks.chapter_pages, 20);
assert.equal(manifest.site_checks.indexed_entry_pages, 191);
assert.equal(manifest.site_checks.table_canonical_entry_pages, 54);
assert.equal(manifest.site_checks.table_specialized_view_pages, 100);
assert.equal(manifest.site_checks.missing_local_targets, 0);

const search = json("target/proof-set-sim-50/search-index.json");
for (const relative of addedPaths) {
  const records = search.filter((record) => record.path === relative);
  assert.equal(records.length, 1, `one search record for ${relative}`);
  assert.ok(records[0].text.length > 500, `full source indexed for ${relative}`);
  assert.ok(fs.existsSync(path.join(root, "target/proof-set-sim-50", records[0].href)));
}
assert.match(read("context/waves/2026-08-13-factorium-vision/V2-ROLLING-REFERENCE-INTEGRATION-PLAN.md"), /not frozen/i);
assert.notEqual(digest("reference/factorium-reference-v1.factorium"), digest("reference/factorium-reference-v2.factorium"));
const result = json("fixtures/coverage/v2-rolling-reference-integration-result.json");
assert.equal(result.status, "rolling-internal-candidate");
assert.equal(result.v2_frozen, false);
assert.equal(result.release_declared, false);
assert.equal(result.interchange.reference_sha256, digest("reference/factorium-reference-v2.factorium"));
assert.equal(result.interchange.assurance_sha256, digest("reference/factorium-assurance-v2.factorium"));
assert.equal(result.live_projection.site_identity, manifest.output.site_identity);
assert.equal(result.live_projection.workspace_dirty_at_render, false);
assert.equal(result.reader_evidence_claimed, false);
console.log(`OK v2=rolling 54/419/638/100 assurance=165 sim50=181 search=191 pages=251 missing=0 frozen=no`);
