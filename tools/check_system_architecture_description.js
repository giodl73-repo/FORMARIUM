"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const digest = (relative) => crypto.createHash("sha256").update(read(relative)).digest("hex");
const entryPath = "tables/entries/system-composition-dependency.md";
const viewPath = "tables/constraints/system-composition-integrity.md";
const entry = read(entryPath);
const view = read(viewPath);
const research = read("docs/research/2026-08-16-system-architecture-description.md");
const reference = read("reference/factorium-reference-v0.factorium");
const assurance = read("reference/factorium-assurance-v0.factorium");
const unresolved = read("tables/UNRESOLVED.md");
const supplement = read("volumes/01-structure-quantity-choice/FACTOR-FORGE-SIM-SUPPLEMENT.md");

assert.match(entry, /^# System Composition, Architecture, Capability, Interface, and Dependency$/m);
for (const sense of ["architecture", "architecture-description"]) {
  assert.match(entry, new RegExp(`^\\| \`${sense}\` \\|`, "m"), `entry owns ${sense}`);
  assert.match(reference, new RegExp(`^sense ${sense} \\|`, "m"), `reference owns ${sense}`);
}
assert.ok(!/^sense subsystem \|/m.test(reference), "subsystem remains a contextual role");
for (const factor of [
  "stakeholder-concerns-and-decision-use",
  "fundamental-concepts-properties-and-organizing-principles",
  "architecture-description-viewpoints-views-and-model-kinds",
  "assumptions-decisions-rationale-consistency-and-version"
]) {
  assert.match(reference, new RegExp(`^factor ${factor} \\|`, "m"), `reference owns ${factor}`);
}
assert.match(reference,
  /^view constraint-system-composition-integrity \| system-composition-dependency \| system,system-element,component,architecture,architecture-description,capability,boundary,environment,interface,dependency \|/m,
  "Constraint view owns the exact extended sense set");
for (let id = 11; id <= 15; id += 1) {
  assert.ok(view.includes(`\`SC-${id}\``), `Constraint view renders SC-${id}`);
}
assert.match(entry, /System vs\. subsystem/);
assert.match(entry, /Architecture vs\. architecture description/);
assert.match(view, /Named architecture styles, frameworks, description languages/);
assert.ok(!unresolved.includes("architecture - `unresolved-candidate`"),
  "architecture candidate is resolved");
assert.ok(!unresolved.includes("subsystem - `unresolved-candidate`"),
  "subsystem candidate is resolved");
assert.equal((unresolved.match(/`unresolved-candidate`/g) || []).length, 7,
  "seven unrelated candidates remain");
assert.match(research, /ISO\/IEC\/IEEE 42010:2022/);
assert.match(research, /`Subsystem` does not pass the independent-owner test/);
assert.match(supplement, /System Composition, Architecture, Capability, Interface, and Dependency/);
assert.match(assurance,
  new RegExp(`^review entry:system-composition-dependency \\| ${digest(entryPath)} \\| .*SYSTEM-ARCHITECTURE-DESCRIPTION-ROLE-REVIEW.md \\| fixed-point \\| 2026-08-16$`, "m"));
assert.match(assurance,
  new RegExp(`^review view:constraint-system-composition-integrity \\| ${digest(viewPath)} \\| .*SYSTEM-ARCHITECTURE-DESCRIPTION-ROLE-REVIEW.md \\| fixed-point \\| 2026-08-16$`, "m"));

console.log("OK senses=architecture,architecture-description subsystem=contextual factors=4 constraints=5 unresolved=7");
