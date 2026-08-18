"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fontesRoot = path.resolve(process.argv[2] || "C:/src/TRACKER/repos/knowledge-systems/fontes");
const portfolioPath = path.join(root, "fixtures", "coverage", "mundus-curriculum-depth-portfolio-01.json");
const referencePath = path.join(root, "reference", "factorium-reference-v1.factorium");
const outputPath = path.join(root, "fixtures", "coverage", "mundus-curriculum-vocabulary-screen-01.json");
const portfolio = JSON.parse(fs.readFileSync(portfolioPath, "utf8"));

const shaFile = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const normalize = (value) => value.toLowerCase().replaceAll("c++", "c plus plus").replace(/[^a-z0-9]+/g, " ").trim();
const relFontes = (file) => path.relative(fontesRoot, file).replaceAll("\\", "/");

const referenceLabels = new Map();
for (const line of fs.readFileSync(referencePath, "utf8").split(/\r?\n/)) {
  const parts = line.split(" | ");
  if (line.startsWith("entry ")) {
    const id = parts[0].slice(6);
    referenceLabels.set(normalize(parts[1]), { kind: "entry-title", owner_entry_id: id, label: parts[1] });
  } else if (line.startsWith("sense ")) {
    const id = parts[0].slice(6);
    referenceLabels.set(normalize(parts[1]), { kind: "sense", sense_id: id, label: parts[1] });
  } else if (line.startsWith("factor ")) {
    const id = parts[0].slice(7);
    referenceLabels.set(normalize(parts[1]), { kind: "factor", factor_id: id, label: parts[1] });
  }
}

const occurrences = new Map();
const sourceManifest = [];
const sessionSources = [];
const metadataPackets = [];

for (const course of portfolio.courses) {
  if (course.evidence_tier === "homepage-metadata-only") {
    metadataPackets.push({
      packet_id: course.packet_id,
      lane: course.lane,
      source_id: course.source_id,
      title: course.title,
      disposition: "source-review-priority-only",
      reason: "Frozen metadata boundary prohibits concept-candidate extraction.",
    });
    continue;
  }
  const workFile = path.join(fontesRoot, course.upstream_path);
  const work = JSON.parse(fs.readFileSync(workFile, "utf8"));
  sourceManifest.push({ path: relFontes(workFile), sha256: shaFile(workFile) });
  for (const subject of work.subjects || []) {
    const key = normalize(subject);
    if (!occurrences.has(key)) occurrences.set(key, { term: subject, normalized_term: key, occurrences: [] });
    occurrences.get(key).occurrences.push({
      packet_id: course.packet_id,
      lane: course.lane,
      source_id: course.source_id,
      evidence_kind: "fontes-work-subject",
      upstream_path: course.upstream_path,
    });
  }
  for (const source of work.sources || []) {
    if (source.kind !== "normalized_session_table" || source.fetch_policy !== "derived_text_allowed") continue;
    const sessionFile = path.join(fontesRoot, source.url.replaceAll("\\", "/"));
    const table = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
    sourceManifest.push({ path: relFontes(sessionFile), sha256: shaFile(sessionFile) });
    sessionSources.push({
      packet_id: course.packet_id,
      source_id: source.id,
      path: relFontes(sessionFile),
      sha256: shaFile(sessionFile),
      row_count: table.rows.length,
      headings: table.rows.map((row) => ({
        session_id: row.session_id,
        kind: row.kind,
        title: row.title,
        fetch_policy: row.fetch_policy,
      })),
      use: "exact heading evidence for manual review; no automatic phrase extraction",
    });
  }
}

const vocabulary = [...occurrences.values()].sort((a, b) => a.normalized_term.localeCompare(b.normalized_term));
for (const item of vocabulary) {
  item.packet_ids = [...new Set(item.occurrences.map((row) => row.packet_id))];
  item.lanes = [...new Set(item.occurrences.map((row) => row.lane))].sort();
  item.reference_exact_hit = referenceLabels.get(item.normalized_term) || null;
  item.screening_disposition = item.reference_exact_hit
    ? "exact-reference-label-review"
    : item.packet_ids.length > 1
      ? "recurring-manual-review"
      : "single-course-manual-review";
}

const screeningCounts = {};
for (const item of vocabulary) screeningCounts[item.screening_disposition] = (screeningCounts[item.screening_disposition] || 0) + 1;
const manifest = [...new Map(sourceManifest.map((item) => [item.path, item])).values()].sort((a, b) => a.path.localeCompare(b.path));
const result = {
  schema: "factorium.mundus-curriculum-vocabulary-screen.v1",
  status: "complete-before-manual-owner-disposition",
  generated: "2026-08-18",
  baseline: {
    portfolio_path: "fixtures/coverage/mundus-curriculum-depth-portfolio-01.json",
    portfolio_sha256: shaFile(portfolioPath),
    reference_path: "reference/factorium-reference-v1.factorium",
    reference_sha256: shaFile(referencePath),
    fontes_commit: portfolio.baseline.fontes_commit,
  },
  method: {
    extracted_field: "subjects from 24 FONTES individual work records",
    session_heading_use: "retained exactly for manual corroboration; not automatically tokenized into candidates",
    exact_hit_rule: "normalized whole-term equality with a V1 entry title, sense label, or factor label",
    automatic_admission: false,
  },
  summary: {
    record_packets: 24,
    metadata_packets: metadataPackets.length,
    subject_occurrences: vocabulary.reduce((sum, item) => sum + item.occurrences.length, 0),
    unique_subject_terms: vocabulary.length,
    session_tables: sessionSources.length,
    session_rows: sessionSources.reduce((sum, item) => sum + item.row_count, 0),
    screening_counts: Object.fromEntries(Object.entries(screeningCounts).sort()),
  },
  source_manifest: manifest,
  metadata_packets: metadataPackets,
  session_sources: sessionSources,
  vocabulary,
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result.summary, null, 2));
