"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const plan = JSON.parse(read("fixtures/proof-set/internal-fixed-point-refresh-46.json"));

const context = read("CONTEXT.md");
const roadmap = read("ROADMAP.md");
const audit = read("context/waves/2026-08-13-factorium-vision/PROOF-SET-INTERNAL-FIXED-POINT-AUDIT.md");
const proofSet = read("context/waves/2026-08-13-factorium-vision/R5P-PROOF-SET.md");

assert.match(context, /internal Proof Set lane is now maintained and stopped at clean `sim-46`/);
assert.match(roadmap, /maintain clean `sim-46` as the two-book internal reference/);
assert.match(audit, /Maintained edition: `sim-46`/);
assert.match(audit, new RegExp(`Maintained source commit: \`${plan.artifact.source_commit}\``));
assert.match(audit, new RegExp(plan.artifact.site_identity));
assert.match(audit, new RegExp(plan.artifact.standalone_sha256));
assert.match(audit, new RegExp(plan.artifact.search_index_sha256));
assert.match(proofSet, /Status: internal rehearsal package maintained at `sim-46`; external preview deferred/);
assert.doesNotMatch(context, /internal Proof Set lane is now prepared and stopped at `sim-42`/);
assert.doesNotMatch(roadmap, /maintain `sim-41` as the two-book internal reference/);
assert.doesNotMatch(audit, /Maintained edition: `sim-41`/);
assert.doesNotMatch(proofSet, /Status: internal rehearsal package prepared at `sim-42`/);
assert.match(audit, /original\n`sim-41` fixed point, `sim-42` rehearsal/);
assert.match(proofSet, /original\n`sim-41` fixed point and exact `sim-42` preview rehearsal remain historical/);
const previewTags = execFileSync("git", ["tag", "--list", "preview-01"], { cwd: root, encoding: "utf8" }).trim();
assert.equal(previewTags, "");
console.log("OK campaign=PS-FP-46 authorities=4 maintained=sim-46 history=retained preview-tag=absent claims=internal-only");
