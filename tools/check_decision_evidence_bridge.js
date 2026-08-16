"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || ".");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (relative) => crypto.createHash("sha256").update(
  fs.readFileSync(path.join(root, relative))).digest("hex");

const entry = read("tables/entries/choice-alternative-selection.md");
const view = read("tables/decisions/alternative-selection.md");
const guide = read("guides/evidence-informed-intervention-choice.md");
const packet = read("specs/DECISION-EVIDENCE-BRIDGE.md");
const relations = read("reference/factorium-relations-v0.factorium");
const assurance = read("reference/factorium-assurance-v0.factorium");

const senses = ["choice", "alternative", "decision-criterion", "preference",
  "trade-off", "recommendation", "selection"];
for (const sense of senses) {
  assert.match(entry, new RegExp(`\\b${sense}\\b`), `entry retains ${sense}`);
}
assert.match(entry, /feasibility[^\n]+status/i,
  "feasibility remains a status rather than a canonical sense");
assert.match(view, /Primary family:\s*Decision Table/);
assert.match(view, /recommendation[^\n]+final selection/i);

const relationIds = [
  "f27-evidence-qualifies-evaluation",
  "f27-causal-scope-qualifies-outcome",
  "f27-risk-characterizes-consequence",
  "f27-value-contributes-criterion",
  "f27-constraint-filters-feasibility"
];
const checkIds = [
  "f27-check-evidence-applicability",
  "f27-check-causal-outcome-scope",
  "f27-check-consequence-alignment",
  "f27-check-value-basis",
  "f27-check-constraint-applicability"
];
for (const id of relationIds) {
  assert.equal((packet.match(new RegExp(id, "g")) || []).length >= 1, true,
    `packet declares ${id}`);
}
assert.match(relations, /relation f27-evidence-qualifies-evaluation \| qualifies-evaluation-of/,
  "first evidence/evaluation bridge relation is canonical");
for (const id of relationIds.filter((id) => id !== "f27-evidence-qualifies-evaluation")) {
  assert.doesNotMatch(relations, new RegExp(id), `${id} remains a candidate`);
}
for (const id of checkIds) {
  assert.match(packet, new RegExp(id), `packet declares ${id}`);
  assert.match(guide, new RegExp("\\\\| `" + id + "` \\\\|"),
    `guide records ${id}`);
}

const evaluationRows = guide.match(
  /\| `f27-check-[^`]+` \| `(pass|fail|unresolved)` \|/g) || [];
assert.equal(evaluationRows.length, 5, "guide records every candidate check once");
assert.equal(evaluationRows.filter((row) => row.includes("`pass`")).length, 1);
assert.equal(evaluationRows.filter((row) => row.includes("`fail`")).length, 1);
assert.equal(evaluationRows.filter((row) => row.includes("`unresolved`")).length, 3);

for (const alternative of ["Continue current practice", "Limited monitored trial",
  "Broad adoption"]) {
  assert.match(guide, new RegExp(alternative), `guide retains ${alternative}`);
}
assert.match(guide, /No total score is calculated/);
assert.match(guide, /Final selection: `not-recorded`/);
assert.match(guide, /All records below are author-created fixtures/);

const exactBindings = [
  ["entry:choice-alternative-selection", "tables/entries/choice-alternative-selection.md"],
  ["view:decision-alternative-selection", "tables/decisions/alternative-selection.md"],
  ["entry:policy-rule-constraint-decision-exception",
    "tables/entries/policy-rule-constraint-decision-exception.md"],
  ["relation:f27-evidence-qualifies-evaluation", "reference/factorium-relations-v0.factorium"]
];
for (const [id, source] of exactBindings) {
  assert.match(assurance, new RegExp(`review ${id} \\| ${sha256(source)} \\|`),
    `assurance binds exact digest for ${id}`);
}

console.log("OK bridge_relations=5 admitted=1 candidate=4 checks=5 " +
  "outcomes=pass:1,fail:1,unresolved:3 alternatives=3 final_selection=not-recorded");
