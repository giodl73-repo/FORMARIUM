"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-43");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "assets", "site.css"), "utf8");

assert.ok(["sim-43", "sim-44", "sim-45", "sim-46"].includes(manifest.edition));
assert.equal(manifest.site_checks.intent_router_targets, 3);
assert.deepEqual(manifest.site_checks.intent_router_jobs, ["know-term", "have-question", "learn-or-explore"]);
assert.equal(manifest.site_checks.intent_router_authority_change, false);
assert.equal(manifest.site_checks.intent_router_search_change, false);
assert.ok(html.indexOf('id="choose"') < html.indexOf('id="library"'));
assert.match(html, /<h3>I know the term<\/h3>/);
assert.match(html, /<a href="#search">Search the Tables/);
assert.match(html, /<h3>I have a question<\/h3>/);
assert.match(html, /<a href="compose\.html">Open Compose/);
assert.match(html, /<h3>I want to learn or explore<\/h3>/);
assert.match(html, /<a href="reader\.html">Open the Reader/);
assert.match(html, /Factorium Tables remain canonical/);
assert.match(html, /Bring a term, a question, or simple curiosity/);
assert.match(html, /<a href="#choose">Choose<\/a>/);
assert.match(css, /\.site-intent__grid/);
assert.match(css, /@media \(max-width: 52rem\)/);

console.log(`OK edition=${manifest.edition} intent-router=3 order=before-library authority=unchanged search=unchanged`);
