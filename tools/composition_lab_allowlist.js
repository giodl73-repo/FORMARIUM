"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const relativePath = "volumes/01-structure-quantity-choice/" +
  "proof-set-composition-lab-relations.factorium";

function relationIds(root = path.resolve(__dirname, "..")) {
  const text = fs.readFileSync(path.join(root, relativePath), "utf8");
  assert.ok(!text.includes("\r") && text.endsWith("\n"),
    "Lab allowlist is LF-only and ends with LF");
  const lines = text.trimEnd().split("\n");
  assert.equal(lines[0], "factorium-composition-lab-relations-v0");
  assert.equal(lines.at(-1), "end-relations");
  const ids = lines.slice(1, -1).map((line) => {
    assert.match(line, /^relation [a-z][a-z0-9-]*$/);
    return line.slice("relation ".length);
  });
  assert.deepEqual(ids, [...ids].sort(), "Lab relation IDs are sorted");
  assert.equal(new Set(ids).size, ids.length, "Lab relation IDs are unique");
  return ids;
}

function relationLines(relationText, root) {
  const allowed = new Set(relationIds(root));
  const selected = relationText.split(/\r?\n/).filter((line) => {
    if (!line.startsWith("relation ")) return false;
    return allowed.has(line.slice("relation ".length).split(" | ", 1)[0]);
  });
  assert.equal(selected.length, allowed.size,
    "every Lab allowlist ID resolves exactly once");
  return selected;
}

module.exports = { relativePath, relationIds, relationLines };
