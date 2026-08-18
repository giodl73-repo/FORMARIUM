"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plan = JSON.parse(fs.readFileSync(path.join(root, "fixtures", "proof-set", "internal-fixed-point-refresh-46.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target", "proof-set-sim-46", "manifest.json"), "utf8"));

assert.equal(plan.status, "frozen-before-authority-refresh");
assert.equal(manifest.edition, plan.artifact.edition);
assert.equal(manifest.source_commit, plan.artifact.source_commit);
assert.equal(manifest.workspace_dirty_at_render, plan.artifact.workspace_dirty_at_render);
assert.equal(manifest.site_checks.source_pages, plan.artifact.selected_sources);
assert.equal(manifest.site_checks.indexed_entry_pages, plan.artifact.search_records);
assert.equal(manifest.site_checks.handoff_note_pages, plan.artifact.generated_pages);
assert.equal(manifest.site_checks.table_canonical_entry_pages, plan.artifact.canonical_entries);
assert.equal(manifest.site_checks.table_specialized_view_pages, plan.artifact.specialized_views);
assert.equal(manifest.site_checks.reader_route_records, plan.artifact.reader_records);
assert.equal(manifest.site_checks.table_authored_connections, plan.artifact.authored_connections);
assert.equal(manifest.site_checks.missing_local_targets, plan.artifact.missing_local_targets);
assert.equal(manifest.output.sha256, plan.artifact.standalone_sha256);
assert.equal(manifest.output.search_index_sha256, plan.artifact.search_index_sha256);
assert.equal(manifest.output.site_identity, plan.artifact.site_identity);
assert.equal(plan.authority_files.length, 4);
assert.ok(Object.values(plan.required_boundaries).every((value) => value === false));
console.log("OK campaign=PS-FP-46 edition=sim-46 sources=217 records=185 pages=239 entries=53 views=95 preview=false frozen=true");
