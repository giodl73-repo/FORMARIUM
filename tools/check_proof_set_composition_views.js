"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");

const siteRoot = path.resolve(process.argv[2] || path.join("target", "proof-set-sim-20"));
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const css = fs.readFileSync(path.join(siteRoot, "assets", "site.css"), "utf8");
const script = fs.readFileSync(path.join(siteRoot, "assets", "composition-views.js"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

assert.equal(manifest.edition, "sim-20", "composition view edition");
assert.equal(manifest.site_checks.composition_view_profiles, 4, "site profile count");
assert.deepEqual(manifest.composition_view_checks.profiles,
  ["compact", "abbreviated", "book", "full"], "manifest profile vocabulary");
assert.equal(manifest.composition_view_checks.default_profile, "book");
assert.equal(manifest.composition_view_checks.shared_preference_key,
  "factorium-reader-profile");
assert.equal(manifest.composition_view_checks.profile_inputs_to_closure, 0);
assert.equal(manifest.composition_view_checks.hidden_query_controls, 0);
assert.equal(manifest.composition_view_checks.exact_metadata_retained, true);
assert.equal(manifest.composition_view_checks.query_storage, "none");
assert.equal(manifest.composition_view_checks.result_storage, "none");
assert.equal(manifest.composition_view_checks.preference_storage, "profile name only");
assert.equal(manifest.composition_view_checks.specification,
  "specs/COMPOSITION-READER-VIEWS.md");

assert.match(page, /id="composition-view-toolbar"/);
assert.equal((page.match(/data-composition-profile=/g) || []).length, 4,
  "four profile buttons");
assert.match(page, /Read the composition-view contract/);
assert.match(page, /Only the reader-view preference may persist/);
assert.ok(page.indexOf('src="assets/composition-palette.js"') <
  page.indexOf('src="assets/composition-views.js"'), "profile enhancement loads last");
assert.match(css, /data-composition-metadata="minimal"/);
assert.match(css, /data-composition-density="tight"/);
assert.match(script, /dataset\.compositionMetadata/);
assert.match(script, /binding\.label/);
assert.doesNotMatch(script, /fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|indexedDB|sessionStorage/);
assert.equal((script.match(/\.setItem\s*\(/g) || []).length, 1,
  "only the view preference is stored");

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const payload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const baseRequest = {
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6 },
  seeds: [payload.relations[0].source],
  relations: [payload.relations[0].id],
  exclusions: []
};
const compact = lab.runComposition({ ...baseRequest, profile: "compact" }, payload);
const full = lab.runComposition({ ...baseRequest, profile: "full" }, payload);
assert.deepEqual(compact, full, "profile is absent from canonical result data");
assert.equal(lab.canonicalize(compact), lab.canonicalize(full),
  "profile leaves canonical result JSON byte-equivalent");

console.log("OK profiles=4 default=book hidden-controls=0 query-storage=none canonical=same");
