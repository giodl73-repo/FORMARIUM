"use strict";

const assert = require("node:assert/strict");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");
const queryPlan = require("../volumes/01-structure-quantity-choice/proof-set-composition-query-plan.js");

const labPayload = {
  schema: "factorium-composition-lab-payload-v0",
  referenceSha256: "a".repeat(64),
  relationsSha256: "b".repeat(64),
  relations: [
    { id: "f1-a-b", verb: "depends-on", source: "factor:a/source", target: "factor:a/target", scope: "view:a-check", qualifiers: "required | exact", scopeHref: "entries/check.html" },
    { id: "f2-c-d", verb: "delegates-to", source: "factor:c/source", target: "factor:c/target", scope: "view:c-check", qualifiers: "required | exact", scopeHref: "entries/check.html" },
    { id: "f3-e-f", verb: "supports", source: "factor:e/source", target: "factor:e/target", scope: "view:e-check", qualifiers: "required | exact", scopeHref: "entries/check.html" },
    { id: "f4-g-h", verb: "feeds", source: "factor:g/source", target: "factor:g/target", scope: "view:g-check", qualifiers: "required | exact", scopeHref: "entries/check.html" },
    { id: "f5-i-j", verb: "realizes", source: "factor:i/source", target: "factor:i/target", scope: "view:i-check", qualifiers: "required | exact", scopeHref: "entries/check.html" },
    { id: "f6-k-l", verb: "satisfies-obligation-from", source: "factor:k/source", target: "factor:k/target", scope: "view:k-check", qualifiers: "required | exact", scopeHref: "entries/check.html" }
  ]
};
const artifacts = [...new Set(labPayload.relations.flatMap((record) =>
  [record.source, record.target, record.scope]))].sort();
const readingPayload = {
  schema: "factorium-composition-reading-payload-v0",
  referenceSha256: labPayload.referenceSha256,
  relationsSha256: labPayload.relationsSha256,
  bindings: artifacts.map((artifact) => ({ artifact, label: artifact.split(/[/:]/).pop(),
    pageTitle: `Page ${artifact}`, href: `entries/${artifact.replace(/[:/]/g, "-")}.html`,
    kind: artifact.startsWith("view:") ? "view" : "anchor" }))
};
const request = {
  problem: "Review an explicit dependency request.",
  contextId: "synthetic-query",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [labPayload.relations[0].source],
  relations: [labPayload.relations[0].id],
  exclusions: []
};

const basic = queryPlan.buildQueryPlan(request, labPayload, readingPayload);
assert.equal(basic.schema, "factorium-composition-query-plan-v0");
assert.equal(basic.controlState, "control-complete");
assert.deepEqual(basic.counts, { seeds: 1, relations: 1, exclusions: 0 });
assert.equal(basic.bound.work, 9);
assert.equal(basic.multiply[0].predecessor.artifact, labPayload.relations[0].source);
assert.equal(basic.multiply[0].derived.artifact, labPayload.relations[0].target);
assert.equal(Object.hasOwn(basic, "sha256"), false, "plan mints no identity");

const reverse = queryPlan.buildQueryPlan({ ...request, direction: "reverse",
  seeds: [labPayload.relations[0].target] }, labPayload, readingPayload);
assert.equal(reverse.multiply[0].predecessor.artifact, labPayload.relations[0].target);
assert.equal(reverse.multiply[0].derived.artifact, labPayload.relations[0].source);
assert.equal(reverse.multiply[0].canonicalSource.artifact, labPayload.relations[0].source);

const partial = queryPlan.buildQueryPlan({ ...request, seeds: [], contextSelections: "bad" },
  labPayload, readingPayload);
assert.equal(partial.controlState, "needs-explicit-controls");
assert.deepEqual(partial.diagnostics, ["Context selections", "Seeds"]);
const reordered = queryPlan.buildQueryPlan({ ...request,
  seeds: [labPayload.relations[1].source, labPayload.relations[0].source],
  relations: [labPayload.relations[1].id, labPayload.relations[0].id] }, labPayload, readingPayload);
const reorderedAgain = queryPlan.buildQueryPlan({ ...request,
  seeds: [...reordered.add.map((record) => record.artifact)].reverse(),
  relations: [...reordered.multiply.map((record) => record.id)].reverse() }, labPayload, readingPayload);
assert.equal(lab.canonicalize(reordered), lab.canonicalize(reorderedAgain), "input order invariant");
assert.throws(() => queryPlan.buildQueryPlan({ ...request,
  seeds: [request.seeds[0], request.seeds[0]] }, labPayload, readingPayload), /repeats/);
assert.throws(() => queryPlan.buildQueryPlan({ ...request, relations: ["f9-unknown"] },
  labPayload, readingPayload), /Unknown plan relation/);
const drifted = structuredClone(readingPayload);
drifted.referenceSha256 = "c".repeat(64);
assert.throws(() => queryPlan.buildQueryPlan(request, labPayload, drifted), /identity mismatch/);
assert.equal(queryPlan.validContextSelections("reference-frame=not-applicable"), true);
assert.equal(queryPlan.validContextSelections("reference-frame=one,reference-frame=two"), false);

console.log("OK state=control-complete reverse=preserved partial=2 order=invariant identity=none");
