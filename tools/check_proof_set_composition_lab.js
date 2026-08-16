"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lab = require("../volumes/01-structure-quantity-choice/proof-set-composition-lab.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-16");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const page = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-lab.js"), "utf8");
const siteData = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

const editionNumber = Number(manifest.edition.split("-")[1]);
assert.ok(Number.isInteger(editionNumber) && editionNumber >= 16, "bounded lab edition");
assert.equal(manifest.site_checks.composition_lab_pages, 1, "one lab page");
assert.equal(manifest.composition_lab_checks.relation_records, 6, "six reviewed relations");
assert.equal(manifest.composition_lab_checks.canonical_relation_records, 7,
  "canonical graph reports its separately reviewed seventh relation");
assert.equal(manifest.composition_lab_checks.allowlist_path,
  "volumes/01-structure-quantity-choice/proof-set-composition-lab-relations.factorium");
const allowlistPath = path.resolve(manifest.composition_lab_checks.allowlist_path);
const allowlistSha = crypto.createHash("sha256").update(fs.readFileSync(allowlistPath)).digest("hex");
assert.equal(manifest.composition_lab_checks.allowlist_sha256, allowlistSha,
  "Lab manifest binds its exact six-ID allowlist");
assert.equal(manifest.composition_lab_checks.scope_views, 6, "six exact scope views");
assert.equal(manifest.composition_lab_checks.automatic_relation_discovery, false,
  "no relation discovery claim");
assert.equal(manifest.composition_lab_checks.natural_language_semantic_selection, false,
  "problem prose does not select semantics");
assert.equal(manifest.composition_lab_checks.check_outcomes, "unresolved-only",
  "lab invents no check result");
assert.equal(manifest.composition_lab_checks.persistence, "none", "lab stores no work product");

for (const required of [
  'id="composition-lab-form"',
  'id="composition-lab-seeds"',
  'id="composition-lab-relations"',
  'id="composition-lab-exclusions"',
  'id="composition-lab-result"',
  'name="problem"',
  'name="contextId"',
  'name="contextSelections"',
  'name="direction"',
  'name="depth"',
  'name="edges"',
  'name="nodes"',
  "Run bounded closure",
  "Your words do not choose the graph",
  "Read the full simulation contract",
  'src="assets/composition-lab.js"'
]) {
  assert.ok(page.includes(required), `lab page includes ${required}`);
}

const sandbox = { window: {} };
vm.runInNewContext(siteData, sandbox, { timeout: 1000 });
const payload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
assert.equal(payload.schema, "factorium-composition-lab-payload-v0", "payload schema");
assert.equal(payload.relations.length, 6, "payload relation count");
assert.ok(!payload.relations.some((relation) =>
  relation.id === "f27-evidence-qualifies-evaluation"),
"new canonical edge remains outside interactive Lab");
assert.equal(new Set(payload.relations.map((relation) => relation.id)).size, 6,
  "payload relation IDs are unique");
assert.equal(new Set(payload.relations.map((relation) => relation.scope)).size, 6,
  "payload scopes are unique");
for (const relation of payload.relations) {
  assert.match(relation.id, /^f[1-6]-/, "bounded F1-F6 relation");
  assert.ok(relation.qualifiers.includes("="), "relation qualification remains visible");
  const target = path.join(siteRoot, relation.scopeHref);
  assert.ok(fs.statSync(target).isFile(), `scope page exists for ${relation.id}`);
}

const f1 = payload.relations[0];
const result = lab.runComposition({
  problem: "Review a system dependency and its required interaction contract.",
  contextId: "synthetic-query-lab",
  contextSelections: "boundary=declared-system,reference-frame=not-applicable",
  direction: "forward",
  budget: { depth: 1, edges: 1, nodes: 6, work: 9 },
  seeds: [f1.source],
  relations: [f1.id],
  exclusions: []
}, payload);
assert.equal(result.state, "incomplete", "default request stays unresolved");
assert.equal(result.graph.edges.length, 1, "default request admits F1 only");
assert.equal(result.evaluation[0].outcome, "unresolved", "default check is unresolved");

assert.ok(!/localStorage|sessionStorage|indexedDB|\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(runtime),
  "runtime has no persistence or network mechanism");
assert.ok(!/factorium-composition-query-v0/.test(runtime),
  "runtime does not claim canonical trace export");

console.log(
  `OK relations=${payload.relations.length} lab_pages=${manifest.site_checks.composition_lab_pages} ` +
  `state=${result.state}`
);
