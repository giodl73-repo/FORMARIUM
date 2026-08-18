"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "fixtures", "coverage", "mcc-01-curriculum-view-admission.json");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const review = "signals/roles/check/mcc-01-curriculum-view-admission-roles-check-2026-08-18.md";
const records = [
  {
    id: "mapping-optimization-problem-structure",
    kind: "mapping",
    owner_entry_id: "choice-alternative-selection",
    sense_ids: ["choice", "alternative", "decision-criterion", "trade-off", "recommendation", "selection"],
    title: "Optimization Problem Structure Mapping",
    path: "tables/mappings/optimization-problem-structure.md",
    purpose: "Maps application questions through variables, data, objectives, constraints, feasibility, optimality support, sensitivity, and a loss-aware decision handoff without making solver output an authorized choice.",
  },
  {
    id: "procedure-prototype-test-iteration",
    kind: "procedure",
    owner_entry_id: "requirement-specification-verification-validation",
    sense_ids: ["stakeholder-need", "requirement", "specification", "verification", "validation", "nonconformity"],
    title: "Prototype, Test, and Iteration Procedure",
    path: "tables/procedures/prototype-test-iteration.md",
    purpose: "Connects a learning question, prototype identity and fidelity, users/tasks/context, evaluation, evidence custody, finding, change, rerun, and stop without treating rehearsal as reader evidence or production readiness.",
  },
].map((record) => ({
  ...record,
  source_sha256: sha(record.path),
  review_path: review,
  review_status: "fixed-point",
  review_date: "2026-08-18",
}));

const viewDirectories = ["constraints", "decisions", "diagnostics", "evidence", "formulas",
  "mappings", "procedures", "scales", "transitions", "values"];
const currentViews = viewDirectories.flatMap((directory) => fs.readdirSync(path.join(root, "tables", directory))
  .filter((name) => name.endsWith(".md") && name !== "INDEX.md"));
const currentEntries = fs.readdirSync(path.join(root, "tables", "entries")).filter((name) => name.endsWith(".md"));

const result = {
  schema: "factorium.mcc01-curriculum-view-admission.v1",
  status: "admitted-markdown-before-successor-interchange",
  generated: "2026-08-18",
  baseline: {
    source_commit: execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    reference_v1_sha256: sha("reference/factorium-reference-v1.factorium"),
    assurance_v1_sha256: sha("reference/factorium-assurance-v1.factorium"),
    relations_v0_sha256: sha("reference/factorium-relations-v0.factorium"),
    design_path: "specs/MCC-01-CURRICULUM-VIEW-DESIGN.md",
    design_sha256: sha("specs/MCC-01-CURRICULUM-VIEW-DESIGN.md"),
  },
  inventory: {
    before: { entries: 54, views: 97 },
    after_markdown: { entries: currentEntries.length, views: currentViews.length },
    delta: { entries: 0, anchors: 0, senses: 0, views: 2, relations: 0, discovery_repairs: 0 },
  },
  records,
  custody: {
    admission_review_bindings: records.length,
    formal_interchange_assurance: "deferred until a supported successor reference includes both view records",
    frozen_reference_v1_changed: false,
    frozen_assurance_v1_changed: false,
    frozen_relations_v0_changed: false,
  },
  exposure: {
    generated_catalog: false,
    book: false,
    search: false,
    sim49: false,
    reason: "All are generated from frozen V1; successor integration is a separate product batch.",
  },
  decision: "admit exactly two current Markdown views and stop",
  claims_boundary: "Content admission and owner compatibility only; no reader evidence, improved decision outcome, usability gain, curriculum consensus, professional guidance, or release claim.",
};

fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(`OK campaign=MCC-01 admitted=2 entries=${currentEntries.length} views=${currentViews.length} delta=0/2/0 reference=v1-frozen`);
