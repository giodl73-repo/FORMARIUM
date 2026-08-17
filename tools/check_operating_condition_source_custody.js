"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(workspace, relative), "utf8");
const reference = read("reference/factorium-reference-v0.factorium");
const assurance = read("reference/factorium-assurance-v0.factorium");
const relations = read("reference/factorium-relations-v0.factorium");
const review = "context/waves/2026-08-13-factorium-vision/" +
  "OPERATING-CONDITION-SOURCE-CUSTODY-RESULT.md";

const records = reference.split(/\r?\n/).flatMap((line) => {
  if (!/^(entry|view) /.test(line)) return [];
  const fields = line.split(" | ");
  const kind = fields[0].startsWith("entry ") ? "entry" : "view";
  return [{
    kind,
    id: fields[0].slice(kind.length + 1),
    owner: kind === "view" ? fields[1] : null,
    status: kind === "entry" ? fields[3] : null,
    source: fields[kind === "entry" ? 4 : 5]
  }];
});

assert.equal(records.filter((record) => record.kind === "entry").length, 53,
  "canonical entry count remains fixed");
assert.equal(records.filter((record) => record.kind === "view").length, 95,
  "canonical view count remains fixed");
assert.equal(new Set(records.map((record) => record.source)).size, 148,
  "every canonical entry/view path is unique");
assert.equal((relations.match(/^relation /gm) || []).length, 11,
  "relation sidecar remains at eleven reviewed relations");

const missingHeadings = [];
for (const record of records) {
  const markdown = read(record.source);
  if (!/^## (?:Sources and provenance|References|Provenance)\s*$/mi.test(markdown)) {
    missingHeadings.push(record.source);
  }
}
assert.deepEqual(missingHeadings, [],
  "all canonical entry/view paths expose source or provenance custody");

const repairs = [
  {
    id: "diagnostic-operating-condition-failures",
    owner: "scenario-assumption-condition-case",
    source: "tables/diagnostics/operating-condition-failures.md",
    required: [
      "https://www.nasa.gov/reference/system-engineering-handbook-appendix/",
      "https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final",
      "seven symptom groupings are Factorium editorial synthesis",
      "do not establish cause, safety, or outcome"
    ]
  },
  {
    id: "procedure-risk-treatment-response",
    owner: "hazard-exposure-harm-safety",
    source: "tables/procedures/risk-treatment-response.md",
    required: [
      "https://www.cdc.gov/niosh/hierarchy-of-controls/index.html",
      "https://www.fema.gov/sites/default/files/2020-04/" +
        "National_Preparedness_Goal_2nd_Edition-oct2015.pdf",
      "not a sixth FEMA mission area",
      "not an exhaustive hierarchy or field-guidance substitute"
    ]
  }
];

for (const repair of repairs) {
  const record = records.find((candidate) => candidate.id === repair.id);
  assert.ok(record, `canonical view exists: ${repair.id}`);
  assert.equal(record.kind, "view", `${repair.id} remains a view`);
  assert.equal(record.owner, repair.owner, `${repair.id} owner remains exact`);
  assert.equal(record.source, repair.source, `${repair.id} path remains exact`);

  const markdown = read(repair.source);
  assert.match(markdown, /^Status: candidate /m,
    `${repair.id} remains candidate`);
  for (const required of repair.required) {
    assert.ok(markdown.includes(required),
      `${repair.id} preserves source boundary: ${required}`);
  }

  const digest = crypto.createHash("sha256").update(markdown).digest("hex");
  const binding = `review view:${repair.id} | ${digest} | ${review} | ` +
    "fixed-point | 2026-08-17";
  assert.ok(assurance.includes(binding),
    `${repair.id} assurance binds exact bytes and result review`);
}

console.log("OK paths=148 sources=148 repaired=2 entries=53 views=95 relations=11");
