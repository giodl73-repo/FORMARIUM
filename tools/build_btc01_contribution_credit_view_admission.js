"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const paths = {
  baseline: "fixtures/coverage/biography-thought-closure-dispositions-01.json",
  portfolio: "fixtures/coverage/biography-thought-closure-portfolio-01.json",
  reference: "reference/factorium-reference-v1.factorium",
  view: "tables/evidence/contribution-credit-priority-legacy.md",
  design: "specs/BTC-01-CONTRIBUTION-CREDIT-LEGACY-VIEW-DESIGN.md",
  research: "signals/discover/websearch/btc-01-contribution-credit-view-research-2026-08-18.md"
};
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const baseline = JSON.parse(read(paths.baseline));

const result = {
  schema: "factorium.btc01-contribution-credit-view-admission.v1",
  campaign: "BTC-01",
  status: "admitted-markdown-view-successor-integration-deferred",
  generated: "2026-08-18",
  baseline: {
    baseline_path: paths.baseline,
    baseline_sha256: sha(paths.baseline),
    portfolio_path: paths.portfolio,
    portfolio_sha256: sha(paths.portfolio),
    reference_path: paths.reference,
    reference_sha256_before: baseline.baseline.reference_sha256,
    reference_sha256_after: sha(paths.reference)
  },
  admitted: {
    view_id: "evidence-contribution-credit-priority-legacy",
    path: paths.view,
    sha256: sha(paths.view),
    family: "evidence",
    owner_entry_id: "claim-evidence",
    sense_ids: ["claim", "evidence-item", "result", "limitation", "confidence", "provenance", "observation", "measurement", "inference"],
    design_path: paths.design,
    design_sha256: sha(paths.design),
    research_path: paths.research,
    research_sha256: sha(paths.research)
  },
  delta: {entries: 0, anchors: 0, senses: 0, views: 1, relations: 0, discovery_repairs: 0},
  markdown_inventory: {entries: 54, views: 100},
  deferred: [
    "supported successor reference interchange entry",
    "successor assurance binding",
    "generated catalog, book, search, and site exposure",
    "agency-action owner research",
    "external reader evidence"
  ],
  claims_boundary: "Candidate book/Table content admission only; no historical truth, priority or credit verdict, authorship decision, causal conclusion, responsibility assignment, endorsement, reader value, or release claim."
};

fs.writeFileSync(path.join(root, "fixtures/coverage/btc-01-contribution-credit-view-admission.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(`WROTE BTC-01 admission view=${result.admitted.view_id} sha256=${result.admitted.sha256}`);
