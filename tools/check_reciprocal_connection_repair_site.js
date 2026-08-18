"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-46");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const work = fs.readFileSync(path.join(root, "entries", "tables-entries-coordinated-work.html"), "utf8");
const identity = fs.readFileSync(path.join(root, "entries", "tables-entries-identity-naming-classification-versioning.html"), "utf8");

assert.equal(manifest.edition, "sim-46");
assert.equal(manifest.source_commit, "20139f9c6d2f75d231efbb9d1c35ab1fe2d17e03");
assert.equal(manifest.workspace_dirty_at_render, false);
assert.equal(manifest.site_checks.table_authored_connections, 403);
assert.equal(manifest.site_checks.table_connection_preview_links, 348);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.match(work, /table-navigator__connections[\s\S]*?operational-resource-capacity-demand\.html#[^\"]+">Operational\s+Resource, Capacity, Demand, and Allocation<\/a>/);
assert.match(identity, /table-navigator__connections[\s\S]*?access-permission-authorization-entitlement\.html#[^\"]+">Access,\s+Permission, Authorization, and Entitlement<\/a>/);
assert.match(work, /Authored connections are navigation, not synonym, broader\/narrower, equivalence, dependency, or closure claims/);
assert.match(identity, /Authored connections are navigation, not synonym, broader\/narrower, equivalence, dependency, or closure claims/);
console.log("OK edition=sim-46 reciprocal-previews=2 authored=403 preview-links=348 missing=0 semantics=untyped");
