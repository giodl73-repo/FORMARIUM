"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const fontesRoot = path.resolve(process.argv[2] || "C:/src/TRACKER/repos/knowledge-systems/fontes");
const mundusRoot = path.resolve(process.argv[3] || "C:/src/TRACKER/repos/knowledge-systems/mundus");
const sourcesRoot = path.join(fontesRoot, "sources");
const output = path.join(root, "fixtures", "coverage", "mundus-courseware-inventory-01.json");
const individualFamilies = new Set([
  "mit-ocw",
  "mit-ocw-open-learning-library",
  "stanford-engineering-everywhere",
  "open-yale-courses",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function shaFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function repoCommit(directory) {
  return execFileSync("git", ["-C", directory, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
}

function relativeTo(repo, file) {
  return path.relative(repo, file).replaceAll("\\", "/");
}

const allFiles = walk(sourcesRoot);
const workFiles = allFiles.filter((file) => path.basename(file) === "work.json");
const surfaceFiles = allFiles.filter((file) => /course-surfaces\.json$/i.test(path.basename(file)));
const sourceFiles = [];
const courses = [];

for (const file of workFiles) {
  const work = readJson(file);
  if (work.schema !== "fonte.work.v1" || work.source_type !== "course") continue;
  sourceFiles.push(file);
  if (!individualFamilies.has(work.source_family)) continue;
  courses.push({
    source_id: work.id,
    source_family: work.source_family,
    title: work.title,
    canonical_url: work.canonical_url,
    fetch_policy: work.fetch_policy,
    license_status: work.license_status,
    subjects: work.subjects || [],
    evidence_tier: "course-work-record",
    upstream_path: relativeTo(fontesRoot, file),
  });
}

for (const file of surfaceFiles) {
  const table = readJson(file);
  if (table.schema !== "fonte.source-surfaces.v1") continue;
  sourceFiles.push(file);
  const sourceFamily = table.work_id.includes("berkeley")
    ? "berkeley-public-course-sites"
    : "stanford-public-course-sites";
  for (const row of table.rows) {
    courses.push({
      source_id: `${table.work_id}:${row.surface_id}`,
      source_family: sourceFamily,
      title: row.title,
      canonical_url: row.url,
      fetch_policy: row.fetch_policy,
      license_status: row.license_status,
      subjects: [],
      evidence_tier: "homepage-metadata-only",
      upstream_path: relativeTo(fontesRoot, file),
    });
  }
}

courses.sort((a, b) => a.canonical_url.localeCompare(b.canonical_url) || a.source_id.localeCompare(b.source_id));
const normalizedUrls = courses.map((course) => course.canonical_url.replace(/\/$/, "").toLowerCase());
const sourceManifest = [...new Set(sourceFiles)].sort().map((file) => ({
  path: relativeTo(fontesRoot, file),
  sha256: shaFile(file),
}));
const bridge = path.join(mundusRoot, ".fletch", "registries", "mundus-knowledge-systems-registries.json");
const countBy = (field) => Object.fromEntries([...new Set(courses.map((course) => course[field]))]
  .sort().map((value) => [value, courses.filter((course) => course[field] === value).length]));
const aggregateHash = crypto.createHash("sha256")
  .update(sourceManifest.map((item) => `${item.path}\0${item.sha256}\n`).join(""))
  .digest("hex");

const inventory = {
  schema: "factorium.mundus-courseware-inventory.v1",
  status: "frozen-source-census-before-factorium-comparison",
  generated: "2026-08-18",
  custody: {
    discovery_bridge: "MUNDUS",
    source_owner: "FONTES",
    mundus_commit: repoCommit(mundusRoot),
    fontes_commit: repoCommit(fontesRoot),
    mundus_fontes_bridge_path: relativeTo(mundusRoot, bridge),
    mundus_fontes_bridge_sha256: shaFile(bridge),
    fontes_source_manifest_sha256: aggregateHash,
  },
  method: {
    individual_course_families: [...individualFamilies].sort(),
    grouped_work_records: "excluded from course count and represented by row-grain course-surface tables",
    title_metadata_limit: "domain pressure and depth selection only; never sufficient for concept admission",
  },
  summary: {
    course_surfaces: courses.length,
    unique_canonical_urls: new Set(normalizedUrls).size,
    source_files: sourceManifest.length,
    by_source_family: countBy("source_family"),
    by_evidence_tier: countBy("evidence_tier"),
  },
  source_manifest: sourceManifest,
  courses,
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
console.log(JSON.stringify(inventory.summary, null, 2));
