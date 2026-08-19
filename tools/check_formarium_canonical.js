"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "target", "proof-set-sim-66");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");
const manifest = JSON.parse(
  fs.readFileSync(path.join(site, "manifest.json"), "utf8"),
);

assert.equal(manifest.edition, "sim-66");
assert.equal(manifest.site_checks.missing_local_targets, 0);
assert.equal(manifest.site_checks.pointer_entry_pages, 250);
assert.equal(manifest.site_checks.tables_index_pointer_entries, 250);
assert.equal(manifest.site_checks.dictionary_sequence_pages, 304);
assert.equal(manifest.site_checks.dictionary_sequence_canonical_entries, 54);
assert.equal(manifest.site_checks.dictionary_sequence_pointer_entries, 250);
assert.equal(manifest.site_checks.dictionary_sequence_previous_links, 303);
assert.equal(manifest.site_checks.dictionary_sequence_next_links, 303);
assert.equal(manifest.site_checks.dictionary_sequence_finish_links, 1);
assert.equal(manifest.site_checks.dictionary_stream_pages, 1);
assert.equal(manifest.site_checks.dictionary_stream_records, 304);
assert.equal(manifest.site_checks.dictionary_stream_batch_size, 4);
assert.equal(manifest.site_checks.dictionary_book_pages, 1);
assert.equal(manifest.site_checks.dictionary_book_records, 304);
assert.equal(manifest.site_checks.dictionary_book_columns, 2);
assert.equal(
  manifest.site_checks.dictionary_book_screen_flow,
  "bounded-horizontal-pages",
);
assert.equal(
  manifest.site_checks.dictionary_book_mobile_flow,
  "single-column-vertical",
);
assert.equal(
  manifest.site_checks.dictionary_book_print_flow,
  "two-column-paged",
);
assert.equal(manifest.site_checks.reader_route_additional_records, 157);
assert.equal(manifest.site_checks.candidate_start_targets, 0);
assert.equal(
  manifest.status,
  "internally validated projection; not reader-outcome evidence",
);
assert.equal(manifest.rendering_checks.repository_source_links, 98);
assert.equal(
  manifest.site_checks.product_authority,
  "Formarium Tables canonical; Reader and Factor Guides are linked projections",
);

const sourcePaths = new Set(manifest.sources.map((source) => source.path));
for (const expected of [
  "tables/entries/formarium-entry-publication.md",
  "tables/procedures/formarium-entry-publication.md",
  "tables/scales/formarium-editorial-maturity.md",
]) {
  assert.ok(sourcePaths.has(expected), `missing canonical source ${expected}`);
}
assert.ok(!sourcePaths.has("tables/entries/factorium-entry-publication.md"));

const reference = read("reference/formarium-reference-v3.formarium");
const relations = read("reference/formarium-relations-v1.formarium");
const assurance = read("reference/formarium-assurance-v3.formarium");
assert.match(reference, /^formarium-reference-v3\n/);
assert.match(reference, /^entry formarium-entry-publication \|/m);
assert.doesNotMatch(reference, /^entry factorium-entry-publication \|/m);
assert.match(relations, /^formarium-relations-v1\n/);
assert.match(assurance, /^formarium-assurance-v3\n/);
assert.match(assurance, /^review entry:formarium-entry-publication \|/m);

const referenceSha256 = sha256(reference);
const relationSha256 = sha256(relations);
const queryDirectory = path.join(root, "fixtures", "composition");
const queries = fs
  .readdirSync(queryDirectory)
  .filter((name) => name.endsWith(".formarium-query"));
assert.equal(queries.length, 11);
for (const name of queries) {
  const query = fs.readFileSync(path.join(queryDirectory, name), "utf8");
  assert.match(query, /^formarium-composition-query-v1\n/);
  assert.match(
    query,
    new RegExp(`^source ${referenceSha256} \\| ${relationSha256}$`, "m"),
  );
}

const pointerRegistry = read(
  "volumes/01-structure-quantity-choice/formarium-pointer-registry-v1.formarium",
);
assert.match(pointerRegistry, /^formarium-pointer-registry-v1\n/);
assert.equal(
  pointerRegistry.split(/\r?\n/).filter((line) => line.startsWith("pointer "))
    .length,
  250,
);

const generatedFiles = fs
  .readdirSync(site, { recursive: true, withFileTypes: true })
  .filter(
    (entry) =>
      entry.isFile() && /\.(?:html|js|json)$/.test(entry.name),
  )
  .map((entry) => path.join(entry.parentPath, entry.name));
for (const file of generatedFiles) {
  const text = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(text, /\bFactorium\b|FACTORIUM_/);
  if (file.endsWith(".html")) {
    assert.match(
      text,
      /rel="license" href="https:\/\/creativecommons\.org\/licenses\/by-nc\/4\.0\/"/,
      `missing content license notice in ${file}`,
    );
    const primaryNav = text.match(
      /<nav class="site-nav"[^>]*>([\s\S]*?)<\/nav>/,
    );
    if (primaryNav) {
      const labels = [...primaryNav[1].matchAll(/<a [^>]*>([^<]+)<\/a>/g)]
        .map((match) => match[1]);
      assert.deepEqual(
        labels,
        ["Tables", "Reader", "Work with a question", "Search", "Contents"],
        `unstable primary navigation in ${file}`,
      );
    }
    assert.doesNotMatch(text, />Terms<\/a>/, `ambiguous Terms label in ${file}`);
  }
}

const home = fs.readFileSync(path.join(site, "index.html"), "utf8");
const reader = fs.readFileSync(path.join(site, "reader.html"), "utf8");
const tables = fs.readFileSync(path.join(site, "tables.html"), "utf8");
const dictionary = fs.readFileSync(path.join(site, "dictionary.html"), "utf8");
const book = fs.readFileSync(path.join(site, "book.html"), "utf8");
assert.match(home, /<a class="site-brand"[^>]*>Formarium<\/a>/);
assert.doesNotMatch(home, /identity-preview|feedback preview/i);
assert.match(home, /data-formarium-handoff/);
assert.match(
  home,
  /Content &copy; 2026 Gio Della-Libera.+CC BY-NC 4\.0/,
);
assert.match(reader, /Formarium schemas and file formats are canonical/);
assert.match(reader, /other 157 records/);
assert.doesNotMatch(reader, /other 151 records|Factor Tables/);
assert.doesNotMatch(home, /id="reader" class="site-start site-candidate/);
assert.equal((home.match(/<nav class="site-nav"[\s\S]*?<\/nav>/) || [""])[0]
  .match(/<a /g)?.length, 5);
assert.equal(
  (home.match(/<a href="tables\.html">Tables<\/a>/g) || []).length,
  1,
);
assert.match(home, /href="compose\.html">Work with a question<\/a>/);
assert.doesNotMatch(home, />Terms<\/a>|not reader evidence or preview-01/);
assert.match(home, /href="manifest\.json">sim-66<\/a>/);
assert.match(home, /software: MIT/);
assert.match(tables, /href="dictionary\.html">Continuous A-Z<\/a>/);
assert.match(tables, /href="book\.html">Condensed book<\/a>/);
assert.match(tables, /href="terms\.html">Pointer index<\/a>/);
assert.match(dictionary, /<h1>Continuous Dictionary A-Z<\/h1>/);
assert.match(dictionary, /data-dictionary-stream data-batch-size="4"/);
assert.match(dictionary, /src="assets\/dictionary-stream\.js"/);
const streamDataMatch = dictionary.match(
  /<script id="dictionary-stream-data" type="application\/json">([^<]+)<\/script>/,
);
assert.ok(streamDataMatch);
const streamRecords = JSON.parse(streamDataMatch[1]);
assert.equal(streamRecords.length, 304);
assert.deepEqual(streamRecords.slice(0, 3), [
  { title: "Access", kind: "pointer", href: "pointers/access.html" },
  {
    title: "Access, Permission, Authorization, and Entitlement",
    kind: "table",
    href:
      "entries/tables-entries-access-permission-authorization-entitlement.html",
  },
  {
    title: "Accumulation",
    kind: "pointer",
    href: "pointers/accumulation.html",
  },
]);
assert.match(book, /<h1>The Formarium Dictionary<\/h1>/);
assert.match(book, /class="site-skip" href="#main-content"/);
assert.match(book, /href="index\.html">Formarium home<\/a>/);
assert.match(book, /href="reader\.html">Reader<\/a>/);
assert.match(book, /data-book-page-previous/);
assert.match(book, /data-book-page-next/);
assert.match(book, /data-book-pages tabindex="0"/);
assert.match(book, /class="dictionary-book__edition"/);
assert.match(book, /FORMARIUM\/manifest\.json/);
assert.equal(
  (book.match(/class="dictionary-book__item"/g) || []).length,
  304,
);
assert.equal(
  (book.match(/data-dictionary-kind="pointer"/g) || []).length,
  250,
);
assert.equal(
  (book.match(/data-dictionary-kind="table"/g) || []).length,
  54,
);
assert.equal(
  (book.match(/class="dictionary-book__supplement"/g) || []).length,
  183,
);
assert.equal(
  (book.match(/data-book-supplement="specialized"/g) || []).length,
  41,
);
assert.equal(
  (book.match(/data-book-supplement="reference_delta"/g) || []).length,
  34,
);
assert.equal(
  (book.match(/data-book-supplement="cross_references"/g) || []).length,
  54,
);
assert.equal(
  (book.match(/data-book-supplement="sources_provenance"/g) || []).length,
  54,
);
assert.doesNotMatch(book, /<details class="dictionary-book__supplement"[^>]*\sopen(?:\s|>)/);
assert.doesNotMatch(
  book,
  /<h2[^>]*>(?:Specialized\s+views?|Reference\s+Delta|Cross-references|Sources\s+and\s+provenance)<\/h2>/i,
);
assert.match(
  book,
  /data-dictionary-position="1"[\s\S]*?<h2 id="book-pointer-access">Access<\/h2>/,
);
assert.doesNotMatch(
  book,
  /dictionary-sequence|class="pointer-owner"|table-navigator|formarium-handoff|class="site-header"/,
);
const siteCss = fs.readFileSync(path.join(site, "assets", "site.css"), "utf8");
assert.match(
  siteCss,
  /\.dictionary-book__entries\s*\{[\s\S]*?column-count:\s*2;/,
);
assert.match(
  siteCss,
  /\.dictionary-book__entries\s*\{[\s\S]*?block-size:\s*min\(72vh,\s*48rem\);[\s\S]*?column-fill:\s*auto;[\s\S]*?overflow-x:\s*auto;/,
);
assert.match(
  siteCss,
  /\.dictionary-book__item\s*\{[^}]*break-inside:\s*auto;/,
);
assert.doesNotMatch(
  siteCss,
  /\.dictionary-book__item\s*\{[^}]*break-inside:\s*avoid-column;/,
);
assert.match(
  siteCss,
  /@media print\s*\{[\s\S]*?\.dictionary-book__entries\s*\{[\s\S]*?block-size:\s*auto;[\s\S]*?column-count:\s*2;/,
);
assert.match(
  siteCss,
  /@media print\s*\{[\s\S]*?\.dictionary-book__edition a::after\s*\{[\s\S]*?attr\(href\)/,
);
const dictionaryRecords = [
  ...tables.matchAll(
    /<li data-dictionary-kind="(table|pointer)" (?:data-index-path|data-pointer-slug)="([^"]+)"><a href="([^"]+)">([^<]+)<\/a>/g,
  ),
].map((match) => ({
  kind: match[1],
  key: match[2],
  href: match[3],
  title: match[4],
}));
assert.equal(dictionaryRecords.length, 304);
assert.equal(
  dictionaryRecords.filter((record) => record.kind === "table").length,
  54,
);
assert.equal(
  dictionaryRecords.filter((record) => record.kind === "pointer").length,
  250,
);
assert.deepEqual(
  dictionaryRecords.map((record) => record.href),
  [...dictionaryRecords]
    .sort(
      (left, right) =>
        left.title.toLowerCase().localeCompare(right.title.toLowerCase()) ||
        left.href.localeCompare(right.href),
    )
    .map((record) => record.href),
);
assert.deepEqual(
  dictionaryRecords.slice(0, 3).map((record) => [
    record.title,
    record.kind,
  ]),
  [
    ["Access", "pointer"],
    ["Access, Permission, Authorization, and Entitlement", "table"],
    ["Accumulation", "pointer"],
  ],
);
assert.equal(
  manifest.site_checks.dictionary_index_letters,
  new Set(dictionaryRecords.map((record) => record.title[0].toUpperCase())).size,
);
assert.match(
  tables,
  new RegExp(`data-dictionary-start href="${dictionaryRecords[0].href}"`),
);
for (const [index, record] of dictionaryRecords.entries()) {
  const entry = fs.readFileSync(path.join(site, ...record.href.split("/")), "utf8");
  assert.match(entry, new RegExp(`data-dictionary-step="${index + 1}"`));
  assert.match(entry, new RegExp(`data-dictionary-kind="${record.kind}"`));
  if (index > 0) {
    const previousHref = path.posix.relative(
      path.posix.dirname(record.href),
      dictionaryRecords[index - 1].href,
    );
    assert.match(
      entry,
      new RegExp(
        `data-dictionary-direction="previous" href="${previousHref}"`,
      ),
    );
  }
  if (index < dictionaryRecords.length - 1) {
    const nextHref = path.posix.relative(
      path.posix.dirname(record.href),
      dictionaryRecords[index + 1].href,
    );
    assert.match(
      entry,
      new RegExp(
        `data-dictionary-direction="next" href="${nextHref}"`,
      ),
    );
  } else {
    assert.match(
      entry,
      /data-dictionary-direction="finish" href="\.\.\/tables\.html"/,
    );
  }
}
assert.match(
  fs.readFileSync(path.join(site, "assets", "handoff.js"), "utf8"),
  /\[data-formarium-handoff\]/,
);

console.log(
  `OK sim66=Formarium-native reference=${referenceSha256} relations=${relationSha256} queries=${queries.length} pointers=250 missing=0`,
);
