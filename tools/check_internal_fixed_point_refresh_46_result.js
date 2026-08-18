"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const plan = JSON.parse(read("fixtures/proof-set/internal-fixed-point-refresh-46.json"));
const current = JSON.parse(read("fixtures/lexical-closure/scale-meaning-chooser-result-01.json"));
const historicalResult = read("context/waves/2026-08-13-factorium-vision/SIM-46-INTERNAL-FIXED-POINT-REFRESH-RESULT.md");

const context = read("CONTEXT.md");
const roadmap = read("ROADMAP.md");
const audit = read("context/waves/2026-08-13-factorium-vision/PROOF-SET-INTERNAL-FIXED-POINT-AUDIT.md");
const proofSet = read("context/waves/2026-08-13-factorium-vision/R5P-PROOF-SET.md");

assert.match(context, /internal Proof Set lane is now maintained and stopped at clean `sim-48`/);
assert.match(roadmap, /maintain clean `sim-48` as the two-book internal reference/);
assert.match(audit, /Maintained edition: `sim-48`/);
assert.match(audit, new RegExp(`Maintained source commit: \`${current.source_commit}\``));
assert.match(audit, new RegExp(current.site_identity));
assert.match(audit, new RegExp(current.standalone_sha256));
assert.match(audit, new RegExp(plan.artifact.search_index_sha256));
assert.match(proofSet, /Status: internal rehearsal package maintained at `sim-48`; external preview deferred/);
assert.match(historicalResult, new RegExp(plan.artifact.site_identity));
assert.match(historicalResult, new RegExp(plan.artifact.standalone_sha256));
assert.doesNotMatch(context, /internal Proof Set lane is now prepared and stopped at `sim-42`/);
assert.doesNotMatch(roadmap, /maintain `sim-41` as the two-book internal reference/);
assert.doesNotMatch(audit, /Maintained edition: `sim-41`/);
assert.doesNotMatch(proofSet, /Status: internal rehearsal package prepared at `sim-42`/);
assert.match(audit, /original\n`sim-41` fixed point, `sim-42` rehearsal, `sim-46` fixed point/);
assert.match(proofSet, /original\n`sim-41` fixed point and exact `sim-42` preview rehearsal remain historical/);
const previewTags = execFileSync("git", ["tag", "--list", "preview-01"], { cwd: root, encoding: "utf8" }).trim();
assert.equal(previewTags, "");
console.log("OK campaign=PS-FP-46 compatibility=retained authorities=4 maintained=sim-48 history=sim-46,sim-47 preview-tag=absent claims=internal-only");
