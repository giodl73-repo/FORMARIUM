"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-39");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(root, "search-index.json"), "utf8"));
assert.equal(manifest.edition, "sim-39");
assert.equal(manifest.site_checks.reader_sequence_finish_links, 1);
assert.equal(manifest.site_checks.reader_sequence_finish_position, 24);
assert.equal(manifest.site_checks.reader_sequence_finish_target,
  "reader.html#reader-route-after-heading");
assert.equal(manifest.site_checks.reader_sequence_finish_state, "none");
assert.equal(manifest.site_checks.reader_sequence_next_links, 23);
assert.equal(manifest.site_checks.missing_local_targets, 0);

const spinePages = records.filter((record) => {
  const html = fs.readFileSync(path.join(root, record.href), "utf8");
  return html.includes('class="reader-sequence"');
}).map((record) => ({ record, html: fs.readFileSync(path.join(root, record.href), "utf8") }));
assert.equal(spinePages.length, 24);
const finishes = spinePages.filter(({ html }) => html.includes('data-reader-direction="finish"'));
assert.equal(finishes.length, 1);
assert.equal(finishes[0].record.path, "tables/evidence/change-lineage.md");
assert.match(finishes[0].html, /data-reader-step="24"/);
assert.match(finishes[0].html,
  /data-reader-direction="finish" href="\.\.\/reader\.html#reader-route-after-heading"><span>End of selected route<\/span>Choose a bounded next path<\/a>/);
assert.doesNotMatch(finishes[0].html, /data-reader-direction="next"/);
assert.match(finishes[0].html, /data-reader-direction="previous"/);
assert.equal(spinePages.filter(({ record, html }) =>
  record.path !== "tables/evidence/change-lineage.md" &&
  html.includes('data-reader-direction="finish"')).length, 0);
const reader = fs.readFileSync(path.join(root, "reader.html"), "utf8");
assert.match(reader, /id="reader-route-after-heading"/);

console.log(`OK edition=sim-39 finish=1 position=24 next=23 ` +
  `identity=${manifest.site_checks.identity}`);
