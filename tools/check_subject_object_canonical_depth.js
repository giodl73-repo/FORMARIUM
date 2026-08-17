"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-41");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(
  root, "entries/tables-primes-subject-object-relationship.html"
), "utf8");

assert.equal(manifest.edition, "sim-41");
assert.equal(manifest.selection_checks.combined_projection_records, 175);
assert.equal(manifest.search_checks.indexed_records, 185);
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.table_cross_reference_routes, 64);
assert.equal(manifest.site_checks.table_authored_connections, 401);
assert.equal(manifest.site_checks.table_connection_preview_links, 347);

assert.match(page, /<h1[^>]*>Subject-Object\s*Relationship<\/h1>/);
assert.match(page, /Unlinked subfactors are/);
assert.match(page, /Relationships are contextual facts used by policy, not permissions by/);
assert.match(page, /<h2[^>]*>Cross-references<\/h2>/);
assert.match(page, /href="tables-roots-relation\.html#[^"]+">Relation<\/a>/);
assert.match(page,
  /href="tables-entries-access-permission-authorization-entitlement\.html#[^"]+">Access,\s*Permission, Authorization, and Entitlement<\/a>/);
assert.match(page, /Authored connections · untyped/);
assert.match(page, /All cross-references \(2\)/);
assert.equal((page.match(/table-navigator__connections/g) || []).length, 1);
assert.equal((page.match(/<li><a href="tables-roots-relation\.html#[^"]+">Relation<\/a><\/li>/g) || []).length, 1);
assert.equal((page.match(/<li><a href="tables-entries-access-permission-authorization-entitlement\.html#[^"]+">Access,\s*Permission, Authorization, and Entitlement<\/a><\/li>/g) || []).length, 1);
assert.match(page, /<strong>Maturity:<\/strong> <code>candidate<\/code>/);

console.log("OK edition=sim-41 routes=2 authored=untyped records=175 missing=0");
