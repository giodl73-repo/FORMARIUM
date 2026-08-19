"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {
  checkFormographyPropertyGraph,
  checkFormographySourceCustody,
} = require("./check_formography_property_graph");

const root = path.resolve(__dirname, "..");
const slice = path.join(root, "docs", "research", "formography", "comparative-slice-v0");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(slice, name), "utf8"));
const readRoot = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (relative) =>
  crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

const contract = readJson("comparison-contract-v0.json");
const source = readJson("access-authorization-source-v0.json");
const conceptMap = readJson("access-authorization-concept-map-v0.json");
const graph = readJson("access-authorization-property-graph-v0.json");
const formograph = readJson("access-authorization-formograph-v0.json");
const invalid = readJson("access-authorization-formograph-invalid-v0.json");
const expected = readJson("comparison-result-v0.json");

const featureSet = new Set(contract.features);
assert.equal(featureSet.size, 10);

const reference = readRoot(source.authority.reference);
const entryStart = `entry ${source.authority.entry_id} |`;
const entryBlock = reference.slice(reference.indexOf(entryStart), reference.indexOf("end-entry", reference.indexOf(entryStart)));
assert.ok(entryBlock.startsWith(entryStart));
assert.deepEqual(
  [...entryBlock.matchAll(/^sense ([a-z0-9-]+) \|/gm)].map((match) => match[1]),
  source.entry.senses,
);
assert.deepEqual(
  [...entryBlock.matchAll(/^factor ([a-z0-9-]+) \|/gm)].map((match) => match[1]),
  source.entry.factors,
);
assert.match(reference, new RegExp(`^view ${source.authority.view_id} \\|`, "m"));

for (const kind of ["entry", "view"]) {
  const relative = source.authority[`${kind}_source`];
  const digest = source.authority[`${kind}_sha256`];
  assert.equal(sha256(relative), digest, `${kind} source digest`);
}

const assurance = readRoot(source.authority.assurance);
assert.ok(
  assurance.includes(
    `review entry:${source.authority.entry_id} | ${source.authority.entry_sha256} | ${source.authority.review_path} | fixed-point | ${source.authority.review_date}`,
  ),
);
assert.ok(
  assurance.includes(
    `review view:${source.authority.view_id} | ${source.authority.view_sha256} | ${source.authority.review_path} | fixed-point | ${source.authority.review_date}`,
  ),
);

const constraintText = readRoot(source.authority.view_source);
assert.deepEqual(
  [...constraintText.matchAll(/^\| `(AA-\d\d)` \|/gm)].map((match) => match[1]),
  source.constraint_ids,
);

const assertFeatureList = (artifact) => {
  assert.equal(new Set(artifact.retained_features).size, artifact.retained_features.length);
  for (const feature of artifact.retained_features) assert.ok(featureSet.has(feature), feature);
};
assertFeatureList(conceptMap);
assertFeatureList(graph);
assertFeatureList(formograph);

assert.ok(conceptMap.focus_question.length > 0);
assert.ok(conceptMap.concepts.some((concept) => concept.id === "request"));
assert.equal(conceptMap.propositions.filter((edge) => edge.linking_words === "has alternative view").length, 3);
assert.deepEqual(
  new Set([...conceptMap.retained_features, ...conceptMap.declared_omissions]),
  featureSet,
);

checkFormographyPropertyGraph({graph, source, root});
assert.equal(graph.retained_features.length, contract.features.length);

class FormographError extends Error {
  constructor(code, fieldPath) {
    super(`${code}: ${fieldPath}`);
    this.code = code;
    this.fieldPath = fieldPath;
  }
}

const requireValue = (condition, code, fieldPath) => {
  if (!condition) throw new FormographError(code, fieldPath);
};

const validateFormograph = (artifact) => {
  requireValue(artifact.schema === "formograph-v0", "FG-SCHEMA", "schema");
  for (const field of ["question", "purpose", "perspective", "context", "scale", "version"]) {
    requireValue(typeof artifact.frame?.[field] === "string" && artifact.frame[field].length > 0, "FG-FRAME-MISSING", `frame.${field}`);
  }
  requireValue(artifact.form?.authority_change === false, "FG-AUTHORITY-CHANGE", "form.authority_change");
  requireValue(artifact.factorizations?.some((item) => item.status === "primary"), "FG-PRIMARY-FACTORIZATION-MISSING", "factorizations");
  requireValue(artifact.factorizations?.some((item) => item.status === "alternative"), "FG-ALTERNATIVE-FACTORIZATION-MISSING", "factorizations");
  for (const [index, relation] of artifact.relations.entries()) {
    for (const field of ["kind", "source", "target", "scope", "authority", "evidence"]) {
      requireValue(typeof relation[field] === "string" && relation[field].length > 0, "FG-RELATION-FIELD-MISSING", `relations[${index}].${field}`);
    }
    requireValue(relation.qualifiers && Object.keys(relation.qualifiers).length > 0, "FG-RELATION-QUALIFIERS-MISSING", `relations[${index}].qualifiers`);
  }
  checkFormographySourceCustody({
    records: artifact.source_custody,
    source,
    root,
    roleField: "artifact",
    reviewPathField: "review_path",
    requireReviewDate: true,
  });
  requireValue(artifact.boundary?.included?.length > 0, "FG-BOUNDARY-MISSING", "boundary.included");
  requireValue(artifact.boundary?.excluded?.length > 0, "FG-BOUNDARY-MISSING", "boundary.excluded");
  requireValue(artifact.boundary?.stopping_condition, "FG-BOUNDARY-MISSING", "boundary.stopping_condition");
  for (const [index, projection] of artifact.projections.entries()) {
    requireValue(projection.selected?.length > 0, "FG-PROJECTION-SELECTION-MISSING", `projections[${index}].selected`);
    requireValue(projection.omitted?.length > 0, "FG-PROJECTION-LOSS-MISSING", `projections[${index}].omitted`);
    requireValue(typeof projection.loss_note === "string" && projection.loss_note.length > 0, "FG-PROJECTION-LOSS-NOTE-MISSING", `projections[${index}].loss_note`);
    requireValue(projection.authority_preserved === true, "FG-PROJECTION-AUTHORITY", `projections[${index}].authority_preserved`);
  }
  requireValue(artifact.unresolved?.length > 0, "FG-UNRESOLVED-STATE-MISSING", "unresolved");
};

validateFormograph(formograph);
assert.equal(formograph.retained_features.length, contract.features.length);
assert.equal(formograph.representation.property_graph_compatible, true);
assert.equal(formograph.representation.novel_encoding_claimed, false);

let structuredFailure;
try {
  validateFormograph(invalid);
  assert.fail("invalid formograph unexpectedly passed");
} catch (error) {
  assert.ok(error instanceof FormographError);
  structuredFailure = {code: error.code, path: error.fieldPath};
}
assert.deepEqual(structuredFailure, invalid.expected_failure);
assert.deepEqual(structuredFailure, expected.structured_failure && {
  code: expected.structured_failure.code,
  path: expected.structured_failure.path,
});

const retention = {
  concept_map: conceptMap.retained_features.length,
  scoped_property_graph: graph.retained_features.length,
  formograph: formograph.retained_features.length,
};
const nativeRequired = {
  concept_map: contract.profiles.concept_map.native_requirements.length,
  scoped_property_graph: contract.profiles.scoped_property_graph.native_requirements.length,
  formograph: contract.profiles.formograph.native_requirements.length,
};
assert.deepEqual(retention, expected.retention);
assert.deepEqual(nativeRequired, expected.native_required);
assert.equal(
  expected.verdict,
  "SURVIVES_AS_GOVERNED_METHOD_PROFILE_NOT_DISTINCT_GRAPH_REPRESENTATION",
);

console.log(
  `OK case=${contract.case_id} features=${contract.features.length} concept-map=${retention.concept_map} graph=${retention.scoped_property_graph} formograph=${retention.formograph} required=${nativeRequired.concept_map}/${nativeRequired.scoped_property_graph}/${nativeRequired.formograph} failure=${structuredFailure.code} verdict=${expected.verdict}`,
);
