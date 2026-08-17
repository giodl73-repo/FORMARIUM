"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-36");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const html = fs.readFileSync(path.join(siteRoot, "reader.html"), "utf8");
const candidate = fs.readFileSync(path.join(workspace,
  "volumes/01-structure-quantity-choice/book-one-sim-candidate-v0.factorium"), "utf8");

assert.equal(manifest.edition, "sim-36");
assert.equal(manifest.site_checks.reader_route_pages, 1);
assert.equal(manifest.site_checks.reader_route_records, 24);
assert.equal(manifest.site_checks.reader_route_parts, 5);
assert.deepEqual(manifest.site_checks.reader_route_part_sizes, [6, 6, 5, 4, 3]);
assert.equal(manifest.site_checks.reader_route_guides, 0);
assert.equal(manifest.site_checks.reader_route_support_records, 0);
assert.equal(manifest.site_checks.reader_route_order, "exact-frozen-manifest");
assert.equal(manifest.site_checks.reader_route_semantics,
  "editorial-teaching-sequence-only");
assert.equal(manifest.site_checks.missing_local_targets, 0);

const expectedPaths = [...candidate.matchAll(/^record\s+(\d{2})\s+\|\s+(tables\/[^\r\n]+)$/gm)]
  .map((match, index) => {
    assert.equal(Number(match[1]), index + 1, "manifest ordinals are contiguous");
    return match[2].trim();
  });
assert.equal(expectedPaths.length, 24);
assert.equal(new Set(expectedPaths).size, 24);

const actualPaths = [...html.matchAll(/data-reader-path="([^"]+)"/g)]
  .map((match) => match[1]);
assert.deepEqual(actualPaths, expectedPaths, "Reader route preserves frozen manifest order");
assert.equal(new Set(actualPaths).size, 24);

const partSections = [...html.matchAll(
  /<section class="reader-route__part" id="reader-part-(\d)">([\s\S]*?)<\/section>/g
)];
assert.equal(partSections.length, 5);
assert.deepEqual(partSections.map((match) =>
  [...match[2].matchAll(/data-reader-path=/g)].length), [6, 6, 5, 4, 3]);
assert.deepEqual(partSections.map((match) => Number(match[1])), [1, 2, 3, 4, 5]);

const recordByPath = new Map(records.map((record) => [record.path, record]));
for (const recordPath of actualPaths) {
  const record = recordByPath.get(recordPath);
  assert.ok(record, `Reader record missing from selected custody: ${recordPath}`);
  assert.ok(!["guide", "reader-record"].includes(record.recordClass),
    `Reader spine contains support record: ${recordPath}`);
  assert.ok(fs.existsSync(path.join(siteRoot, record.href)),
    `Reader destination missing: ${recordPath}`);
}
assert.doesNotMatch(html, /data-reader-path="(?:guides|volumes)\//);
assert.equal((html.match(/<input|<select|<progress/g) || []).length, 0,
  "Reader route has no progress or personalization state");
assert.match(html, /Tables remain authoritative/);
assert.match(html, /editorial teaching sequence—not hierarchy, prerequisite truth/);

const home = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
assert.match(home, /data-book="reader"[\s\S]*?href="reader\.html">Open the Reader<\/a>/);
assert.match(home, />All contents and applications<\/h2>/);
assert.match(home, /href="reader\.html">Reader<\/a>/);

const tables = fs.readFileSync(path.join(siteRoot, "tables.html"), "utf8");
assert.match(tables, /href="reader\.html">Reader<\/a>/);
const entry = records.find((record) => record.recordClass === "canonical-entry");
const entryHtml = fs.readFileSync(path.join(siteRoot, entry.href), "utf8");
assert.match(entryHtml, /href="\.\.\/reader\.html">Reader<\/a>/);

console.log(
  `OK edition=sim-36 records=24 parts=5 sizes=6,6,5,4,3 ` +
  `identity=${manifest.site_checks.identity}`
);
