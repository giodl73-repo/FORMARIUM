"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8").replace(/\r\n/g, "\n");
const write = (relative, text) => fs.writeFileSync(path.join(root, relative), text, "utf8");
const sha256 = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

function records(text, start, end) {
  const lines = text.trimEnd().split("\n");
  const result = [];
  for (let index = 1; index < lines.length - 1;) {
    assert.ok(lines[index].startsWith(start), `unexpected record: ${lines[index]}`);
    const block = [lines[index++]];
    while (lines[index] !== end) block.push(lines[index++]);
    block.push(lines[index++]);
    result.push(block);
  }
  return result;
}

const v0 = read("reference/factorium-reference-v0.factorium");
assert.equal(v0.split("\n")[0], "factorium-reference-v0");
const entryEnd = v0.indexOf("\nview ");
const entryText = v0.slice(0, entryEnd) + "\nend-reference\n";
const viewText = "factorium-reference-v0\n" + v0.slice(entryEnd + 1);
const entries = records(entryText, "entry ", "end-entry");
const views = records(viewText, "view ", "end-view");

entries.push([
  "entry meaning-reference-interpretation-use | Meaning, Reference, Interpretation, and Use | reference | candidate | tables/entries/meaning-reference-interpretation-use.md | Separates conveyed content, referential target, interpretive activity and result, situated use, ambiguity, and directional translation while retaining context, alternatives, authority, and loss.",
  "alias interpretation",
  "alias meaning",
  "alias reference",
  "alias translation",
  "alias use",
  "sense semantic-meaning | semantic meaning",
  "sense reference | reference",
  "sense interpretation-act | interpretation act",
  "sense interpretation-result | interpretation result",
  "sense use-context | use context",
  "sense ambiguity | ambiguity",
  "sense translation | translation",
  "factor subject-identity | expression, sign, act, work, or practice identity",
  "factor source-form-language-version-and-medium | source form, language, version, and medium",
  "factor candidate-sense-and-reference-domain | candidate sense and reference domain",
  "factor producer-position | speaker, author, performer, or producer position",
  "factor interpreter-and-activity | interpreter and interpretive activity",
  "factor use-context-participants-purpose-and-audience | use context, participants, purpose, and audience",
  "factor convention-cotext-situation-genre-and-history | convention, co-text, situation, genre, and history",
  "factor evidence-inference-assumptions-and-defeaters | evidence, inference, assumptions, and defeaters",
  "factor ambiguity-alternatives-disagreement-and-unresolved-cases | ambiguity, alternatives, disagreement, and unresolved cases",
  "factor translation-direction-mediator-correspondence-and-loss | translation direction, mediator, correspondence, and loss",
  "factor authority-restriction-provenance-review-and-revision | authority, restriction, provenance, review, and revision",
  "end-entry"
]);

views.push([
  "view evidence-epistemic-standing-inquiry-warrant | claim-evidence | claim,evidence-item,result,limitation,confidence,provenance,observation,measurement,inference | evidence | Epistemic Standing, Inquiry, and Warrant | tables/evidence/epistemic-standing-inquiry-warrant.md | Records what a named subject takes to be the case through which inquiry, grounds, warrant, defeaters, standing, confidence, limitation, provenance, and review without certifying truth.",
  "end-view"
]);
views.push([
  "view evidence-source-performance-research-custody | claim-evidence | claim,evidence-item,limitation,provenance,observation,inference | evidence | Source, Performance, and Research Custody | tables/evidence/source-performance-research-custody.md | Separates producer, performer, researcher, translator, archive, authority to share, consent, access, restriction, return, correction, and supersession without converting availability into permission.",
  "end-view"
]);

const id = (block) => block[0].split(" | ")[0].split(" ")[1];
const asciiCompare = (left, right) => left < right ? -1 : left > right ? 1 : 0;
entries.sort((left, right) => asciiCompare(id(left), id(right)));
views.sort((left, right) => asciiCompare(id(left), id(right)));
assert.equal(new Set(entries.map(id)).size, 54);
assert.equal(new Set(views.map(id)).size, 97);

const v1 = [
  "factorium-reference-v1",
  ...entries.flat(),
  ...views.flat(),
  "end-reference",
  ""
].join("\n");
write("reference/factorium-reference-v1.factorium", v1);

const assurance = read("reference/factorium-assurance-v0.factorium").trimEnd().split("\n");
assert.equal(assurance.shift(), "factorium-assurance-v0");
assert.equal(assurance.pop(), "end-assurance");
const review = "signals/roles/check/gpc-09-v1-reader-integration-roles-check-2026-08-18.md";
assurance.push(
  `review entry:meaning-reference-interpretation-use | ${sha256("tables/entries/meaning-reference-interpretation-use.md")} | ${review} | fixed-point | 2026-08-18`,
  `review view:evidence-epistemic-standing-inquiry-warrant | ${sha256("tables/evidence/epistemic-standing-inquiry-warrant.md")} | ${review} | fixed-point | 2026-08-18`,
  `review view:evidence-source-performance-research-custody | ${sha256("tables/evidence/source-performance-research-custody.md")} | ${review} | fixed-point | 2026-08-18`
);
assurance.sort((left, right) => {
  const leftId = left.slice("review ".length).split(" | ")[0];
  const rightId = right.slice("review ".length).split(" | ")[0];
  return asciiCompare(leftId, rightId);
});
assert.equal(assurance.length, 162);
write("reference/factorium-assurance-v1.factorium",
  ["factorium-assurance-v1", ...assurance, "end-assurance", ""].join("\n"));

console.log("OK reference_v1_entries=54 views=97 assurance_v1_bindings=162");
