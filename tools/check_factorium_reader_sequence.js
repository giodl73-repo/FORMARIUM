"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-37");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const candidate = fs.readFileSync(path.join(workspace,
  "volumes/01-structure-quantity-choice/book-one-sim-candidate-v0.factorium"), "utf8");

assert.equal(manifest.edition, "sim-37");
assert.equal(manifest.site_checks.reader_sequence_panels, 24);
assert.equal(manifest.site_checks.reader_sequence_contents_links, 24);
assert.equal(manifest.site_checks.reader_sequence_previous_links, 23);
assert.equal(manifest.site_checks.reader_sequence_next_links, 23);
assert.equal(manifest.site_checks.reader_sequence_nonmember_panels, 0);
assert.equal(manifest.site_checks.reader_sequence_state, "none");
assert.equal(manifest.site_checks.reader_sequence_semantics,
  "editorial-teaching-order-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const expectedPaths = [...candidate.matchAll(/^record\s+(\d{2})\s+\|\s+(tables\/[^\r\n]+)$/gm)]
  .map((match, index) => {
    assert.equal(Number(match[1]), index + 1);
    return match[2].trim();
  });
assert.equal(expectedPaths.length, 24);
const partByIndex = [
  ...Array(6).fill(1), ...Array(6).fill(2), ...Array(5).fill(3),
  ...Array(4).fill(4), ...Array(3).fill(5),
];
const recordByPath = new Map(records.map((record) => [record.path, record]));

let panels = 0;
let contentsLinks = 0;
let previousLinks = 0;
let nextLinks = 0;
for (const [index, recordPath] of expectedPaths.entries()) {
  const record = recordByPath.get(recordPath);
  assert.ok(record, `missing selected record: ${recordPath}`);
  const html = fs.readFileSync(path.join(siteRoot, record.href), "utf8");
  const panel = html.match(/<nav class="reader-sequence"[\s\S]*?<\/nav>/);
  assert.ok(panel, `missing Reader panel: ${recordPath}`);
  assert.match(panel[0], new RegExp(`data-reader-step="${index + 1}"`));
  assert.match(panel[0], new RegExp(`data-reader-part="${partByIndex[index]}"`));
  assert.match(panel[0], /href="\.\.\/reader\.html">Back to Reader contents<\/a>/);
  panels += 1;
  contentsLinks += 1;

  const previous = panel[0].match(/data-reader-direction="previous" href="([^"]+)"/);
  const next = panel[0].match(/data-reader-direction="next" href="([^"]+)"/);
  if (index === 0) assert.equal(previous, null, "first step has no Reader previous");
  else {
    assert.ok(previous);
    assert.equal(previous[1], path.basename(recordByPath.get(expectedPaths[index - 1]).href));
    previousLinks += 1;
  }
  if (index === expectedPaths.length - 1) assert.equal(next, null, "last step has no Reader next");
  else {
    assert.ok(next);
    assert.equal(next[1], path.basename(recordByPath.get(expectedPaths[index + 1]).href));
    nextLinks += 1;
  }
  assert.match(html,
    /<div class="all-record-sequence"><p>All contents sequence<\/p><nav class="site-pagination" aria-label="All-record sequence">/);
  assert.match(panel[0], /Editorial teaching order only—not prerequisite/);
}
assert.deepEqual({ panels, contentsLinks, previousLinks, nextLinks },
  { panels: 24, contentsLinks: 24, previousLinks: 23, nextLinks: 23 });

const selected = new Set(expectedPaths);
for (const record of records.filter((item) => !selected.has(item.path))) {
  const html = fs.readFileSync(path.join(siteRoot, record.href), "utf8");
  assert.doesNotMatch(html, /class="reader-sequence"/,
    `non-spine page has Reader panel: ${record.path}`);
}

console.log(
  `OK edition=sim-37 panels=24 contents=24 previous=23 next=23 ` +
  `nonmembers=${records.length - 24} identity=${manifest.site_checks.identity}`
);
