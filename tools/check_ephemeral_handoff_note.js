"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-44");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
assert.ok(["sim-44", "sim-45", "sim-46"].includes(manifest.edition));
assert.equal(manifest.site_checks.handoff_note_pages, 239);
assert.deepEqual(manifest.site_checks.handoff_note_fields, ["question", "current-page", "unresolved", "next-source"]);
assert.deepEqual(manifest.site_checks.handoff_note_actions, ["copy", "print", "clear"]);
assert.equal(manifest.site_checks.handoff_note_storage, "none");
assert.equal(manifest.site_checks.handoff_note_network, "none");
assert.equal(manifest.site_checks.handoff_note_authority_change, false);

const pages = ["index.html", "reader.html", "compose.html", "entries/tables-entries-comparative-quantity.html"];
for (const relative of pages) {
  const html = fs.readFileSync(path.join(root, relative), "utf8");
  assert.equal((html.match(/data-factorium-handoff/g) || []).length, 1, `${relative} handoff count`);
  assert.match(html, /<\/main>\s*<section class="site-handoff" data-factorium-handoff/, `${relative} handoff must remain outside profile-filtered content`);
  assert.match(html, /Question or situation/);
  assert.match(html, /What remains unresolved/);
  assert.match(html, /Next authoritative source/);
  assert.match(html, /data-handoff-copy/);
  assert.match(html, /handoff\.js/);
}
const script = fs.readFileSync(path.join(root, "assets", "handoff.js"), "utf8");
for (const prohibited of ["localStorage", "sessionStorage", "fetch(", "XMLHttpRequest", "document.cookie"]) assert.ok(!script.includes(prohibited));
assert.match(script, /User-entered, unverified, and not stored by Factorium/);

console.log(`OK edition=${manifest.edition} handoff-pages=239 fields=4 actions=3 storage=none network=none authority=unchanged`);
