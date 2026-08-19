"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const nonEmpty = (value) =>
  Array.isArray(value) ? value.length > 0 : typeof value === "string" && value.length > 0;

function checkFormographySourceCustody({
  records,
  source,
  root,
  roleField,
  reviewPathField,
  requireReviewDate = false,
}) {
  const expectedSources = new Map([
    [
      roleField === "graph_role"
        ? "source:entry"
        : `entry:${source.authority.entry_id}`,
      {
        path: source.authority.entry_source,
        sha256: source.authority.entry_sha256,
      },
    ],
    [
      roleField === "graph_role"
        ? "source:view"
        : `view:${source.authority.view_id}`,
      {
        path: source.authority.view_source,
        sha256: source.authority.view_sha256,
      },
    ],
  ]);
  assert.equal(records.length, expectedSources.size);
  const seenRoles = new Set();
  for (const record of records) {
    const role = record[roleField];
    assert.ok(expectedSources.has(role), `unexpected source role ${role}`);
    assert.ok(!seenRoles.has(role), `duplicate source role ${role}`);
    seenRoles.add(role);
    const expected = expectedSources.get(role);
    assert.equal(record.path, expected.path, `${role}.path`);
    assert.equal(record.sha256, expected.sha256, `${role}.sha256`);
    const digest = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(root, record.path)))
      .digest("hex");
    assert.equal(digest, record.sha256, `${record.path}.sha256`);
    assert.equal(record[reviewPathField], source.authority.review_path);
    assert.equal(record.review_state, source.authority.review_state);
    if (requireReviewDate) {
      assert.equal(record.review_date, source.authority.review_date);
    }
    assert.ok(
      fs.existsSync(path.join(root, record[reviewPathField])),
      `${record.path}.${reviewPathField}`,
    );
  }
  assert.deepEqual(seenRoles, new Set(expectedSources.keys()));
}

function checkFormographyPropertyGraph({graph, source, root}) {
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  assert.equal(nodeIds.size, graph.nodes.length);
  for (const edge of graph.edges) {
    assert.ok(nodeIds.has(edge.from), edge.from);
    assert.ok(nodeIds.has(edge.to), edge.to);
    assert.ok(edge.type, `${edge.from}->${edge.to}.type`);
    assert.ok(edge.properties.scope, `${edge.from}->${edge.to}.properties.scope`);
  }

  const frameNodes = graph.nodes.filter((node) => node.labels.includes("Frame"));
  assert.equal(frameNodes.length, 1);
  for (const field of ["question", "purpose", "perspective", "context", "scale", "version"]) {
    assert.ok(nonEmpty(frameNodes[0].properties[field]), `${frameNodes[0].id}.properties.${field}`);
  }

  const factorizations = graph.nodes.filter((node) => node.labels.includes("Factorization"));
  const primary = factorizations.filter((node) => node.properties.status === "primary");
  assert.equal(primary.length, 1);
  assert.deepEqual(primary[0].properties.factors, source.entry.factors);
  const alternatives = factorizations.filter((node) => node.properties.status === "alternative");
  assert.ok(alternatives.length > 0);
  for (const alternative of alternatives) {
    for (const field of ["factors", "use_when", "losses"]) {
      assert.ok(nonEmpty(alternative.properties[field]), `${alternative.id}.properties.${field}`);
    }
  }

  assert.ok(
    graph.edges.some(
      (edge) =>
        edge.properties.qualifiers &&
        Object.keys(edge.properties.qualifiers).length > 0,
    ),
    "expected at least one scoped relation with qualifiers",
  );

  checkFormographySourceCustody({
    records: graph.nodes
      .filter((node) => node.labels.includes("Source"))
      .map((node) => ({...node.properties, graph_role: node.id})),
    source,
    root,
    roleField: "graph_role",
    reviewPathField: "review",
  });

  const boundaryNodes = graph.nodes.filter((node) => node.labels.includes("Boundary"));
  assert.equal(boundaryNodes.length, 1);
  for (const field of ["included", "excluded", "stopping_condition"]) {
    assert.ok(nonEmpty(boundaryNodes[0].properties[field]), `${boundaryNodes[0].id}.properties.${field}`);
  }

  const projectionNodes = graph.nodes.filter((node) => node.labels.includes("Projection"));
  assert.equal(projectionNodes.length, 1);
  for (const field of ["selected", "omitted", "loss_note"]) {
    assert.ok(nonEmpty(projectionNodes[0].properties[field]), `${projectionNodes[0].id}.properties.${field}`);
  }
  assert.equal(projectionNodes[0].properties.authority_preserved, true);

  const unresolvedNodes = graph.nodes.filter((node) => node.labels.includes("UnresolvedState"));
  assert.equal(unresolvedNodes.length, 1);
  assert.ok(nonEmpty(unresolvedNodes[0].properties.status));
}

module.exports = {
  checkFormographyPropertyGraph,
  checkFormographySourceCustody,
};
