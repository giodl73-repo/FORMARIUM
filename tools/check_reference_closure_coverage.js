"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootArgument = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const root = path.resolve(rootArgument || ".");
const referencePath = path.join(root, "reference", "factorium-reference-v0.factorium");
const relationsPath = path.join(root, "reference", "factorium-relations-v0.factorium");
const referenceLines = fs.readFileSync(referencePath, "utf8").split(/\r?\n/);
const relationLines = fs.readFileSync(relationsPath, "utf8").split(/\r?\n/);

assert.equal(referenceLines[0], "factorium-reference-v0", "reference header is exact");
assert.equal(relationLines[0], "factorium-relations-v0", "relation header is exact");
assert.equal(relationLines.at(-2), "end-relations", "relation file has an exact terminator");

const entries = [];
const views = [];
let currentEntry = null;

for (const line of referenceLines) {
  const entry = line.match(/^entry ([^|]+) \| ([^|]+) \| [^|]+ \| [^|]+ \| ([^|]+) \|/);
  if (entry) {
    currentEntry = {
      id: entry[1].trim(),
      title: entry[2].trim(),
      source: entry[3].trim().replace(/\\/g, "/"),
      senses: [],
      factors: []
    };
    entries.push(currentEntry);
    continue;
  }
  if (line === "end-entry") {
    currentEntry = null;
    continue;
  }
  if (currentEntry) {
    const sense = line.match(/^sense ([^|]+) \| (.+)$/);
    const factor = line.match(/^factor ([^|]+) \| (.+)$/);
    if (sense) currentEntry.senses.push({ id: sense[1].trim(), label: sense[2].trim() });
    if (factor) currentEntry.factors.push({ id: factor[1].trim(), label: factor[2].trim() });
    continue;
  }
  const view = line.match(/^view ([^|]+) \| ([^|]+) \|/);
  if (view) views.push({ id: view[1].trim(), owner: view[2].trim() });
}

assert.equal(currentEntry, null, "every entry has an end-entry terminator");

const entryById = new Map(entries.map((entry) => [entry.id, entry]));
const entryBySource = new Map(entries.map((entry) => [
  path.normalize(path.join(root, entry.source)).toLowerCase(), entry
]));
const factorByRef = new Map();
for (const entry of entries) {
  for (const factor of entry.factors) {
    factorByRef.set(`factor:${entry.id}/${factor.id}`, { entry: entry.id, factor: factor.id });
  }
}

assert.equal(entryById.size, entries.length, "entry IDs are unique");
assert.ok(entries.length > 0, "reference contains entries");
assert.ok(views.every((view) => entryById.has(view.owner)), "every view owner exists");

const relations = [];
for (const line of relationLines) {
  const relation = line.match(/^relation ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/);
  if (!relation) continue;
  const source = relation[3].trim();
  const target = relation[4].trim();
  assert.ok(factorByRef.has(source), `relation source exists: ${source}`);
  assert.ok(factorByRef.has(target), `relation target exists: ${target}`);
  relations.push({
    id: relation[1].trim(),
    kind: relation[2].trim(),
    source,
    target,
    sourceEntry: factorByRef.get(source).entry,
    targetEntry: factorByRef.get(target).entry
  });
}
assert.equal(new Set(relations.map((relation) => relation.id)).size, relations.length,
  "relation IDs are unique");

const editorialDirected = new Set();
const editorialAdjacency = new Map(entries.map((entry) => [entry.id, new Set()]));
for (const entry of entries) {
  const sourcePath = path.join(root, entry.source);
  const markdown = fs.readFileSync(sourcePath, "utf8");
  const sourceDirectory = path.dirname(sourcePath);
  for (const match of markdown.matchAll(/\]\(([^)#?]+\.md)(?:#[^)]+)?\)/g)) {
    const targetPath = path.normalize(path.resolve(sourceDirectory, match[1])).toLowerCase();
    const target = entryBySource.get(targetPath);
    if (!target || target.id === entry.id) continue;
    editorialDirected.add(`${entry.id}>${target.id}`);
    editorialAdjacency.get(entry.id).add(target.id);
    editorialAdjacency.get(target.id).add(entry.id);
  }
}

const editorialPairs = new Set([...editorialDirected].map((edge) =>
  edge.split(">").sort().join("|")));
const reciprocalPairs = [...editorialPairs].filter((edge) => {
  const [left, right] = edge.split("|");
  return editorialDirected.has(`${left}>${right}`) && editorialDirected.has(`${right}>${left}`);
});

const components = [];
const visited = new Set();
for (const entry of entries) {
  if (visited.has(entry.id)) continue;
  const queue = [entry.id];
  const component = [];
  visited.add(entry.id);
  while (queue.length) {
    const id = queue.shift();
    component.push(id);
    for (const neighbor of editorialAdjacency.get(id)) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }
  components.push(component.sort());
}
components.sort((left, right) => right.length - left.length || left[0].localeCompare(right[0]));

function closureSizes(start) {
  const seen = new Set([start]);
  let frontier = [start];
  const sizes = [];
  for (let radius = 1; radius <= entries.length; radius += 1) {
    const next = [];
    for (const id of frontier) {
      for (const neighbor of editorialAdjacency.get(id)) {
        if (seen.has(neighbor)) continue;
        seen.add(neighbor);
        next.push(neighbor);
      }
    }
    if (!next.length) break;
    sizes.push(seen.size);
    frontier = next;
  }
  return sizes;
}

const editorialClosures = entries.map((entry) => ({
  id: entry.id,
  sizes: closureSizes(entry.id)
}));
const averageAtRadius = (radius) => Number((editorialClosures.reduce((sum, closure) =>
  sum + (closure.sizes[radius - 1] || closure.sizes.at(-1) || 1), 0) / entries.length).toFixed(1));
const diameter = Math.max(...editorialClosures.map((closure) => closure.sizes.length));

const relationEndpointRefs = new Set(relations.flatMap((relation) =>
  [relation.source, relation.target]));
const relationEntries = new Set(relations.flatMap((relation) =>
  [relation.sourceEntry, relation.targetEntry]));
const crossEntryRelations = relations.filter((relation) =>
  relation.sourceEntry !== relation.targetEntry);

const sharedLabels = new Map();
for (const entry of entries) {
  for (const item of [...entry.senses, ...entry.factors]) {
    const label = item.label.toLocaleLowerCase("en-US");
    if (!sharedLabels.has(label)) sharedLabels.set(label, new Set());
    sharedLabels.get(label).add(entry.id);
  }
}
const repeatedLabels = [...sharedLabels]
  .filter(([, owners]) => owners.size > 1)
  .map(([label, owners]) => ({ label, owners: [...owners].sort() }))
  .sort((left, right) => right.owners.length - left.owners.length ||
    left.label.localeCompare(right.label));

const report = {
  schema: "factorium-reference-closure-stocktake-v0",
  canonical: {
    entries: entries.length,
    senses: entries.reduce((sum, entry) => sum + entry.senses.length, 0),
    factors: factorByRef.size,
    views: views.length
  },
  reviewedRelations: {
    relations: relations.length,
    endpointFactors: relationEndpointRefs.size,
    coveredEntries: relationEntries.size,
    crossEntryRelations: crossEntryRelations.length,
    factorCoverage: Number((relationEndpointRefs.size / factorByRef.size).toFixed(4)),
    entryCoverage: Number((relationEntries.size / entries.length).toFixed(4))
  },
  editorialLinks: {
    directedLinks: editorialDirected.size,
    undirectedPairs: editorialPairs.size,
    reciprocalPairs: reciprocalPairs.length,
    oneWayPairs: editorialPairs.size - reciprocalPairs.length,
    components: components.map((component) => ({ size: component.length, members: component })),
    averageClosureByRadius: [1, 2, 3, 4].map((radius) => averageAtRadius(radius)),
    diameter
  },
  repeatedExactLabels: repeatedLabels
};

assert.equal(report.editorialLinks.components.reduce((sum, component) =>
  sum + component.size, 0), entries.length, "editorial components partition entries");
assert.ok(report.reviewedRelations.factorCoverage <= 1, "factor coverage is bounded");
assert.ok(report.reviewedRelations.entryCoverage <= 1, "entry coverage is bounded");

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`OK entries=${report.canonical.entries} views=${report.canonical.views} ` +
    `relations=${report.reviewedRelations.relations} endpoints=${report.reviewedRelations.endpointFactors} ` +
    `cross_entry=${report.reviewedRelations.crossEntryRelations} ` +
    `editorial_pairs=${report.editorialLinks.undirectedPairs} ` +
    `components=${report.editorialLinks.components.length} ` +
    `radius=${report.editorialLinks.averageClosureByRadius.join("/")}`);
}
