"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const startersRuntime = require("../volumes/01-structure-quantity-choice/proof-set-composition-starters.js");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-22");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const home = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
const compose = fs.readFileSync(path.join(siteRoot, "compose.html"), "utf8");
const runtime = fs.readFileSync(path.join(siteRoot, "assets", "composition-starters.js"), "utf8");
const data = fs.readFileSync(path.join(siteRoot, "assets", "site-data.js"), "utf8");

const editionNumber = Number(manifest.edition.split("-")[1]);
assert.ok(Number.isInteger(editionNumber) && editionNumber >= 22,
  "authored-starter edition");
assert.equal(manifest.site_checks.composition_starter_cards, 5);
assert.equal(manifest.composition_starter_checks.starters, 5);
assert.equal(manifest.composition_starter_checks.prose_semantic_selection, false);
assert.equal(manifest.composition_starter_checks.auto_run, false);
assert.equal(manifest.composition_starter_checks.url_state, "fixed authored starter ID only");
assert.equal((home.match(/compose\.html#starter-[a-z0-9-]+/g) || []).length, 5);
assert.equal((compose.match(/class="composition-starter"/g) || []).length, 5);
assert.ok(compose.indexOf('src="assets/composition-map.js"') <
  compose.indexOf('src="assets/composition-starters.js"'));
assert.doesNotMatch(runtime,
  /localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);

const sandbox = { window: {} };
vm.runInNewContext(data, sandbox, { timeout: 1000 });
const payload = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_STARTERS));
const lab = JSON.parse(JSON.stringify(sandbox.window.FACTORIUM_COMPOSITION_LAB));
const records = startersRuntime.validatePayload(payload, lab);
assert.equal(records.length, 5);
assert.deepEqual(records.map((record) => record.traceState).sort(),
  ["complete", "complete", "contradictory", "incomplete", "truncated"]);
const reverse = records.find((record) => record.traceState === "incomplete");
assert.equal(reverse.direction, "reverse");
const conflict = records.find((record) => record.traceState === "contradictory");
assert.equal(conflict.exclusions.length, 1);
const frontier = records.find((record) => record.traceState === "truncated");
assert.equal(frontier.seeds.length, 2);
assert.equal(frontier.relations.length, 2);
assert.equal(frontier.budget.edges, 1);
const duplicate = structuredClone(payload);
duplicate.starters[0].relations.push(duplicate.starters[0].relations[0]);
assert.throws(() => startersRuntime.validatePayload(duplicate, lab),
  /duplicate identity/, "duplicate starter controls fail closed");

console.log("OK starters=5 home_links=5 reverse=1 conflict=1 frontier=1 storage=none");
