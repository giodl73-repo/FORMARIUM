"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const palette = require("../volumes/01-structure-quantity-choice/proof-set-composition-palette.js");

const relationText = fs.readFileSync("reference/factorium-relations-v0.factorium", "utf8");
const relations = relationText.split(/\r?\n/).filter((line) => line.startsWith("relation "))
  .map((line) => {
    const fields = line.slice("relation ".length).split(" | ");
    assert.equal(fields.length, 7, "relation fields");
    return {
      id: fields[0], verb: fields[1], source: fields[2], target: fields[3],
      scope: fields[4], qualifiers: fields[5], scopeHref: "entries/scope.html"
    };
  });
const labPayload = { relations };
const bindings = [];
const artifacts = new Set();
for (const relation of relations) {
  for (const artifact of [relation.source, relation.target]) {
    if (artifacts.has(artifact)) continue;
    artifacts.add(artifact);
    const owner = artifact.split(":")[1].split("/")[0];
    bindings.push({
      artifact,
      label: artifact.split("/")[1].replace(/-/g, " "),
      pageTitle: owner.replace(/-/g, " "),
      kind: "anchor",
      href: `entries/${owner}.html`
    });
  }
}
const readingPayload = { bindings };
const groups = palette.anchorGroups(readingPayload);
assert.equal(groups.length, 6, "six exact concept groups");
assert.ok(groups.every((group) => group.factors.length === 2), "two factors per group");
assert.deepEqual(groups, groups.slice().sort((left, right) =>
  left.title.localeCompare(right.title) || left.href.localeCompare(right.href)),
"groups use stable title order");

const f1 = relations[0];
const basic = palette.deriveReadiness({
  seeds: [f1.source], relations: [f1.id], direction: "forward"
}, labPayload);
assert.equal(basic.filter((record) => record.status === "seed-ready").length, 1,
  "default has one seed-ready relation");
assert.equal(basic.find((record) => record.relation === f1.id).status, "seed-ready",
  "F1 is ready from forward source");
assert.ok(basic.slice(1).every((record) => record.status === "needs-predecessor"),
  "unrelated relations retain missing predecessors");

const reverseMissing = palette.deriveReadiness({
  seeds: [f1.source], relations: [f1.id], direction: "reverse"
}, labPayload);
assert.equal(reverseMissing[0].status, "needs-predecessor",
  "direction changes the required predecessor");
const reverseReady = palette.deriveReadiness({
  seeds: [f1.target], relations: [f1.id], direction: "reverse"
}, labPayload);
assert.equal(reverseReady[0].status, "seed-ready", "reverse target makes F1 ready");

const f2 = relations[1];
const unreadySelected = palette.deriveReadiness({
  seeds: [f1.source], relations: [f1.id, f2.id], direction: "forward"
}, labPayload).find((record) => record.relation === f2.id);
assert.equal(unreadySelected.selected, true, "unready relation remains selectable");
assert.equal(unreadySelected.status, "needs-predecessor", "selection does not fake readiness");

const chainedPayload = JSON.parse(JSON.stringify(labPayload));
chainedPayload.relations[1].source = chainedPayload.relations[0].target;
const chained = palette.deriveReadiness({
  seeds: [f1.source], relations: [f1.id, f2.id], direction: "forward"
}, chainedPayload);
assert.equal(chained.find((record) => record.relation === f2.id).status, "route-ready",
  "selected upstream relation can make a downstream predecessor reachable");
const reversedRelationsPayload = { relations: chainedPayload.relations.slice().reverse() };
assert.deepEqual(palette.deriveReadiness({
  seeds: [f1.source], relations: [f2.id, f1.id], direction: "forward"
}, reversedRelationsPayload), chained, "payload and selection order do not change readiness");

assert.throws(() => palette.deriveReadiness({
  seeds: ["factor:unknown/missing"], relations: [f1.id], direction: "forward"
}, labPayload), /Unknown readiness seed/, "unknown seed fails closed");
const duplicatePayload = { relations: relations.slice() };
duplicatePayload.relations[1] = { ...duplicatePayload.relations[1], id: f1.id };
assert.throws(() => palette.deriveReadiness({
  seeds: [f1.source], relations: [f1.id], direction: "forward"
}, duplicatePayload), /Duplicate readiness relation/, "duplicate relation fails closed");
const missingBindingPayload = { bindings: bindings.slice(1) };
assert.throws(() => palette.anchorGroups(missingBindingPayload), /12 anchor factors/,
  "missing concept binding fails closed");

console.log(`OK groups=${groups.length} concepts=${bindings.length} ` +
  `ready=${basic.filter((record) => record.status !== "needs-predecessor").length}`);
