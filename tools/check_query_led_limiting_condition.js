const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const search = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const table = read("tables/diagnostics/dependency-critical-path.md");
const reference = read("reference/factorium-reference-v0.factorium");
const relations = read("reference/factorium-relations-v0.factorium");
const assurance = read("reference/factorium-assurance-v0.factorium");
const sim41 = JSON.parse(read("target/proof-set-sim-41/manifest.json"));
const sim42 = JSON.parse(read("target/proof-set-sim-42/manifest.json"));
const records = JSON.parse(read("target/proof-set-sim-42/search-index.json"));

assert(sim41.source_commit === "0f28e15df31b14f1ded7ea4ba2584f4bc4da4879", "sim-41 source custody drift");
assert(sim41.workspace_dirty_at_render === false, "sim-41 baseline was dirty");
assert(sim41.output.site_identity === "b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9", "sim-41 site custody drift");
assert(sha256("target/proof-set-sim-41/proof-set-sim-41.html") === "fcab6402c50c5b29420599666d624e63f43041ee2ba1cc919d15dbb70857e005", "sim-41 standalone custody drift");
assert(sha256("target/proof-set-sim-41/search-index.json") === "0d40926f828605265960987d85f023f6704092b5b1afac5696de0b449f8b51f1", "sim-41 search custody drift");

assert(sim42.edition === "sim-42", "candidate is not sim-42");
assert(sim42.workspace_dirty_at_render === false, "sim-42 final candidate must be clean");
assert(records.length === 185, "repair must not change search record count");
assert(sim42.output.search_missing_targets === 0 && sim42.output.site_missing_targets === 0, "sim-42 has missing targets");

const ownerRows = [
  "Capacity bottleneck",
  "Service-order delay",
  "Dependency blocker",
  "Critical or driving path",
  "Binding constraint",
  "Evidence limitation",
];
assert((table.match(/^## Limit owner test$/gm) || []).length === 1, "limit owner test must occur once");
ownerRows.forEach((label) => assert(table.includes(`| ${label} |`), `missing owner row ${label}`));
assert((table.match(/^\d\. /gm) || []).length >= 5, "owner test must contain the five-step procedure");
assert(table.includes("not a universal factor type"), "universal-factor boundary missing");
assert(table.includes("do not add a typed relation"), "untyped-route boundary missing");

const viewLine = reference.split(/\r?\n/).find((line) => line.startsWith("view diagnostic-dependency-critical-path |"));
assert(viewLine, "canonical diagnostic view missing");
assert(viewLine.includes("tables/diagnostics/dependency-critical-path.md"), "view path changed");
assert(viewLine.includes("entry-system-composition-dependency/system-dependency"), "view owner changed");
assert(viewLine.includes("capacity, service order, dependency, binding-constraint, and evidence limits"), "view summary did not receive bounded repair");
assert(!relations.includes("limiting-factor") && !relations.includes("bottleneck"), "repair must not mint a typed relation");
assert(assurance.includes("query-led-limiting-condition-repair-roles-check-2026-08-17.md"), "assurance does not bind the role review");

const literal = search.searchRecords(records, "bottleneck", "", "");
assert(literal.length > 0 && literal[0].path === "tables/diagnostics/dependency-critical-path.md", "literal bottleneck must retain the existing first-ranked owner");
const repaired = records.find((record) => record.path === "tables/diagnostics/dependency-critical-path.md");
assert(repaired && repaired.body.includes("Limit owner test") && repaired.body.includes("Evidence limitation"), "sim-42 search record omits repaired content");

console.log(`OK sim41=${sim41.output.site_identity} sim42=${sim42.output.site_identity} records=${records.length} owner_rows=${ownerRows.length} new_relations=0`);
