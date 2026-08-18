"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "target/proof-set-sim-50/manifest.json"), "utf8"));
const result = {
  schema: "factorium.v2-rolling-reference-integration-result.v1",
  status: "rolling-internal-candidate",
  generated: "2026-08-18",
  v2_frozen: false,
  release_declared: false,
  interchange: {
    reference_path: "reference/factorium-reference-v2.factorium",
    reference_sha256: sha("reference/factorium-reference-v2.factorium"),
    assurance_path: "reference/factorium-assurance-v2.factorium",
    assurance_sha256: sha("reference/factorium-assurance-v2.factorium"),
    relations_path: "reference/factorium-relations-v0.factorium",
    relations_sha256: sha("reference/factorium-relations-v0.factorium"),
    entries: 54,
    senses: 419,
    factors: 638,
    views: 100,
    assurance_bindings: 165
  },
  preservation: {
    reference_v1_sha256: sha("reference/factorium-reference-v1.factorium"),
    assurance_v1_sha256: sha("reference/factorium-assurance-v1.factorium"),
    exact_v1_blocks_preserved_in_v2: true,
    sim49_retained: true
  },
  added_view_ids: [
    "evidence-contribution-credit-priority-legacy",
    "mapping-optimization-problem-structure",
    "procedure-prototype-test-iteration"
  ],
  live_projection: {
    edition: manifest.edition,
    source_commit: manifest.source_commit,
    workspace_dirty_at_render: manifest.workspace_dirty_at_render,
    selected_book_records: manifest.selection_checks.combined_projection_records,
    search_records: manifest.search_checks.indexed_records,
    site_pages: manifest.site_checks.handoff_note_pages,
    site_chapters: manifest.site_checks.chapter_pages,
    missing_targets: manifest.site_checks.missing_local_targets,
    standalone_html_sha256: manifest.output.sha256,
    site_identity: manifest.output.site_identity
  },
  browser: {queries: 3, canonical_owners: 3, mobile_width_px: 390, horizontal_overflow: false},
  reader_evidence_claimed: false,
  claims_boundary: "Versioned interchange, assurance, catalog, search, site, and browser mechanics only; V2 remains unfrozen and no reader value, comprehension, findability, decision improvement, release, or external evidence is claimed."
};
fs.writeFileSync(path.join(root, "fixtures/coverage/v2-rolling-reference-integration-result.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(`WROTE V2 rolling result reference=${result.interchange.reference_sha256} site=${result.live_projection.site_identity} frozen=${result.v2_frozen}`);
