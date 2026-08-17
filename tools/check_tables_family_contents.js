"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-34");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const byPath = new Map(records.map((record) => [record.path, record]));
const htmlEscape = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/'/g, "&#39;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
const referenceLines = fs.readFileSync(path.join(root,
  "reference/factorium-reference-v0.factorium"), "utf8").split(/\r?\n/);
const entryPathById = new Map();
const viewsByOwner = new Map();
for (const line of referenceLines) {
  if (line.startsWith("entry ")) {
    const parts = line.split(" | ");
    const entryId = parts[0].slice("entry ".length);
    entryPathById.set(entryId, parts[4]);
    viewsByOwner.set(parts[4], []);
  } else if (line.startsWith("view ")) {
    const parts = line.split(" | ");
    viewsByOwner.get(entryPathById.get(parts[1])).push({
      kind: parts[3], path: parts[5],
    });
  }
}

assert.equal(manifest.edition, "sim-34");
assert.equal(manifest.site_checks.table_family_contents_panels, 52);
assert.equal(manifest.site_checks.table_family_contents_links, 95);
assert.equal(manifest.site_checks.table_family_contents_open, 48);
assert.equal(manifest.site_checks.table_family_contents_folded, 4);
assert.equal(manifest.site_checks.table_family_contents_semantics,
  "exact-publication-ownership-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

let panels = 0;
let links = 0;
let open = 0;
let folded = 0;
for (const [ownerPath, views] of viewsByOwner) {
  const owner = byPath.get(ownerPath);
  assert.ok(owner, `selected owner missing: ${ownerPath}`);
  const html = fs.readFileSync(path.join(siteRoot, owner.href), "utf8");
  const details = html.match(
    /<details class="table-navigator__family" data-view-count="(\d+)"( open)?>([\s\S]*?)<\/details>/
  );
  if (!views.length) {
    assert.equal(details, null, `zero-view owner has empty UI: ${ownerPath}`);
    continue;
  }
  assert.ok(details, `owned-view panel missing: ${ownerPath}`);
  panels += 1;
  assert.equal(Number(details[1]), views.length, `view count: ${ownerPath}`);
  const isOpen = Boolean(details[2]);
  assert.equal(isOpen, views.length <= 3, `density default: ${ownerPath}`);
  if (isOpen) open += 1;
  else folded += 1;
  const projectedPaths = [...details[3].matchAll(/data-view-path="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.deepEqual(projectedPaths, views.map((view) => view.path),
    `canonical view order: ${ownerPath}`);
  links += projectedPaths.length;
  for (const view of views) {
    const destination = byPath.get(view.path);
    assert.ok(destination, `selected view missing: ${view.path}`);
    assert.match(details[3], new RegExp(
      `data-view-path="${view.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"` +
      `[\\s\\S]*?<a href="${path.basename(destination.href).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">` +
      `<span>${view.kind} view<\\/span>${htmlEscape(destination.title).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    ));
  }
}
assert.deepEqual({ panels, links, open, folded },
  { panels: 52, links: 95, open: 48, folded: 4 });

for (const record of records.filter((item) => item.recordClass !== "canonical-entry")) {
  const html = fs.readFileSync(path.join(siteRoot, record.href), "utf8");
  assert.ok(!html.includes('class="table-navigator__family"'),
    `non-entry owns family contents: ${record.path}`);
}

const sparse = byPath.get("tables/entries/amount-concentration-composition.md");
const sparseHtml = fs.readFileSync(path.join(siteRoot, sparse.href), "utf8");
assert.match(sparseHtml,
  /class="table-navigator__family" data-view-count="1" open/);
const dense = byPath.get("tables/entries/evaluation-measure-scale-criterion.md");
const denseHtml = fs.readFileSync(path.join(siteRoot, dense.href), "utf8");
assert.match(denseHtml,
  /class="table-navigator__family" data-view-count="8">/);
const zero = byPath.get("tables/entries/spatial-operating-context.md");
const zeroHtml = fs.readFileSync(path.join(siteRoot, zero.href), "utf8");
assert.ok(!zeroHtml.includes('class="table-navigator__family"'));

console.log(
  `OK edition=sim-34 owners=53 panels=52 zero=1 views=95 open=48 ` +
  `folded=4 identity=${manifest.site_checks.identity}`
);
