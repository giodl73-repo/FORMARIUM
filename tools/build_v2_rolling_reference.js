"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8").replace(/\r\n/g, "\n");
const write = (relative, value) => fs.writeFileSync(path.join(root, relative), value, "utf8");
const sha = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

function blocks(text, prefix, end) {
  const lines = text.trimEnd().split("\n");
  const result = [];
  for (let index = 1; index < lines.length - 1;) {
    assert.ok(lines[index].startsWith(prefix), `unexpected record: ${lines[index]}`);
    const block = [lines[index++]];
    while (lines[index] !== end) block.push(lines[index++]);
    block.push(lines[index++]);
    result.push(block);
  }
  return result;
}

const v1 = read("reference/factorium-reference-v1.factorium");
assert.equal(v1.split("\n")[0], "factorium-reference-v1");
const viewStart = v1.indexOf("\nview ");
const entries = blocks(v1.slice(0, viewStart) + "\nend-reference\n", "entry ", "end-entry");
const views = blocks("factorium-reference-v1\n" + v1.slice(viewStart + 1), "view ", "end-view");

views.push([
  "view mapping-optimization-problem-structure | choice-alternative-selection | choice,alternative,decision-criterion,trade-off,recommendation,selection | mapping | Optimization Problem Structure Mapping | tables/mappings/optimization-problem-structure.md | Maps application questions through variables, data, objectives, constraints, feasibility, optimality support, sensitivity, and a loss-aware decision handoff without making solver output an authorized choice.",
  "end-view"
]);
views.push([
  "view procedure-prototype-test-iteration | requirement-specification-verification-validation | stakeholder-need,requirement,specification,verification,validation,nonconformity | procedure | Prototype, Test, and Iteration Procedure | tables/procedures/prototype-test-iteration.md | Connects a learning question, prototype identity and fidelity, users, tasks, context, evaluation, evidence custody, findings, change, rerun, and stopping without treating rehearsal as reader evidence or production readiness.",
  "end-view"
]);
views.push([
  "view evidence-contribution-credit-priority-legacy | claim-evidence | claim,evidence-item,result,limitation,confidence,provenance,observation,measurement,inference | evidence | Contribution, Credit, Priority, and Legacy Evidence | tables/evidence/contribution-credit-priority-legacy.md | Reconstructs contribution, priority, credit, causal boundaries, counterclaims, reception, legacy, and revision without allocating credit, ranking people, or settling history.",
  "end-view"
]);

const id = (block) => block[0].split(" | ")[0].split(" ")[1];
const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0;
entries.sort((left, right) => compare(id(left), id(right)));
views.sort((left, right) => compare(id(left), id(right)));
assert.equal(new Set(entries.map(id)).size, 54);
assert.equal(new Set(views.map(id)).size, 100);

write("reference/factorium-reference-v2.factorium", [
  "factorium-reference-v2", ...entries.flat(), ...views.flat(), "end-reference", ""
].join("\n"));

const assurance = read("reference/factorium-assurance-v1.factorium").trimEnd().split("\n");
assert.equal(assurance.shift(), "factorium-assurance-v1");
assert.equal(assurance.pop(), "end-assurance");
const curriculumReview = "signals/roles/check/mcc-01-curriculum-view-admission-roles-check-2026-08-18.md";
const biographyReview = "signals/roles/check/btc-01-contribution-credit-view-admission-roles-check-2026-08-18.md";
assurance.push(
  `review view:mapping-optimization-problem-structure | ${sha("tables/mappings/optimization-problem-structure.md")} | ${curriculumReview} | fixed-point | 2026-08-18`,
  `review view:procedure-prototype-test-iteration | ${sha("tables/procedures/prototype-test-iteration.md")} | ${curriculumReview} | fixed-point | 2026-08-18`,
  `review view:evidence-contribution-credit-priority-legacy | ${sha("tables/evidence/contribution-credit-priority-legacy.md")} | ${biographyReview} | fixed-point | 2026-08-18`
);
assurance.sort((left, right) => compare(left.slice(7).split(" | ")[0], right.slice(7).split(" | ")[0]));
assert.equal(assurance.length, 165);
write("reference/factorium-assurance-v2.factorium", [
  "factorium-assurance-v2", ...assurance, "end-assurance", ""
].join("\n"));

console.log("OK reference_v2=rolling entries=54 views=100 assurance=165 frozen=false");
