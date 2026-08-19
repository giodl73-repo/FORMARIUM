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

const core = readJson("comparison-contract-v0.json");
const contract = readJson("amount-composition-contract-v0.json");
const source = readJson("amount-composition-source-v0.json");
const conceptMap = readJson("amount-composition-concept-map-v0.json");
const graph = readJson("amount-composition-property-graph-v0.json");
const formograph = readJson("amount-composition-formograph-v0.json");
const invalid = readJson("amount-composition-formograph-invalid-v0.json");
const expected = readJson("amount-composition-result-v0.json");
const featureSet = new Set(core.features);

assert.equal(contract.extends, "comparison-contract-v0.json");
assert.equal(contract.domain_extension.required_fields.length, 7);

const reference = readRoot(source.authority.reference);
const entryStart = `entry ${source.authority.entry_id} |`;
const start = reference.indexOf(entryStart);
const entryBlock = reference.slice(start, reference.indexOf("end-entry", start));
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
  assert.equal(
    sha256(source.authority[`${kind}_source`]),
    source.authority[`${kind}_sha256`],
    `${kind} source digest`,
  );
}

const assurance = readRoot(source.authority.assurance);
for (const kind of ["entry", "view"]) {
  const artifact = kind === "entry" ? `entry:${source.authority.entry_id}` : `view:${source.authority.view_id}`;
  assert.ok(
    assurance.includes(
      `review ${artifact} | ${source.authority[`${kind}_sha256`]} | ${source.authority.review_path} | fixed-point | ${source.authority.review_date}`,
    ),
  );
}

const formula = readRoot(source.authority.view_source);
for (const expression of source.formula_expressions) assert.ok(formula.includes(`\`${expression}\``), expression);

for (const artifact of [conceptMap, graph, formograph]) {
  assert.equal(new Set(artifact.retained_features).size, artifact.retained_features.length);
  for (const feature of artifact.retained_features) assert.ok(featureSet.has(feature), feature);
}
assert.deepEqual(new Set([...conceptMap.retained_features, ...conceptMap.declared_omissions]), featureSet);

checkFormographyPropertyGraph({graph, source, root});
assert.equal(graph.domain_extension_retained, true);
const quantityFieldProperties = {
  quantity_identity: "identity",
  numerator_basis: "numerator_basis",
  denominator_basis: "denominator_basis",
  units: "unit",
  conditions: "conditions",
  uncertainty: "uncertainty",
  closure: "closure",
};
const quantityNodes = graph.nodes.filter((node) => node.labels.includes("Quantity"));
assert.ok(quantityNodes.length > 0, "expected at least one Quantity node");
for (const node of quantityNodes) {
  for (const field of contract.domain_extension.required_fields) {
    const property = quantityFieldProperties[field];
    assert.ok(property, `missing graph property mapping for ${field}`);
    assert.ok(node.properties[property], `${node.id}.properties.${property}`);
  }
}

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

const validate = (artifact) => {
  requireValue(artifact.schema === "formograph-v0", "FG-SCHEMA", "schema");
  for (const field of ["question", "purpose", "perspective", "context", "scale", "version"]) {
    requireValue(artifact.frame?.[field], "FG-FRAME-MISSING", `frame.${field}`);
  }
  requireValue(artifact.form?.authority_change === false, "FG-AUTHORITY-CHANGE", "form.authority_change");
  requireValue(artifact.factorizations?.some((item) => item.status === "primary"), "FG-PRIMARY-FACTORIZATION-MISSING", "factorizations");
  requireValue(artifact.factorizations?.some((item) => item.status === "alternative"), "FG-ALTERNATIVE-FACTORIZATION-MISSING", "factorizations");
  for (const [index, relation] of artifact.relations.entries()) {
    for (const field of ["kind", "source", "target", "scope", "authority", "evidence"]) {
      requireValue(relation[field], "FG-RELATION-FIELD-MISSING", `relations[${index}].${field}`);
    }
    requireValue(Object.keys(relation.qualifiers || {}).length > 0, "FG-RELATION-QUALIFIERS-MISSING", `relations[${index}].qualifiers`);
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
    requireValue(projection.loss_note, "FG-PROJECTION-LOSS-NOTE-MISSING", `projections[${index}].loss_note`);
    requireValue(projection.authority_preserved === true, "FG-PROJECTION-AUTHORITY", `projections[${index}].authority_preserved`);
  }
  requireValue(artifact.unresolved?.length > 0, "FG-UNRESOLVED-STATE-MISSING", "unresolved");
  for (const field of contract.domain_extension.required_fields) {
    requireValue(
      Array.isArray(artifact.quantity_contract?.[field])
        ? artifact.quantity_contract[field].length > 0
        : Boolean(artifact.quantity_contract?.[field]),
      "FG-QUANTITY-BASIS-MISSING",
      `quantity_contract.${field}`,
    );
  }
};

validate(formograph);
assert.equal(formograph.retained_features.length, core.features.length);
assert.equal(formograph.representation.property_graph_compatible, true);
assert.equal(formograph.representation.novel_encoding_claimed, false);

let structuredFailure;
try {
  validate(invalid);
  assert.fail("invalid quantitative formograph unexpectedly passed");
} catch (error) {
  assert.ok(error instanceof FormographError);
  structuredFailure = {code: error.code, path: error.fieldPath};
}
assert.deepEqual(structuredFailure, invalid.expected_failure);
assert.deepEqual(structuredFailure, {
  code: expected.structured_failure.code,
  path: expected.structured_failure.path,
});

assert.deepEqual(
  {
    concept_map: conceptMap.retained_features.length,
    scoped_property_graph: graph.retained_features.length,
    formograph: formograph.retained_features.length,
  },
  expected.retention,
);
assert.equal(expected.domain_extension_retained_by_graph, true);
assert.equal(
  expected.verdict,
  "CORE_TRANSFERS_WITH_EXPLICIT_DOMAIN_EXTENSION_METHOD_PROFILE_REMAINS_NARROWED",
);

console.log(
  `OK case=${contract.case_id} features=${core.features.length} extension=${contract.domain_extension.name} fields=${contract.domain_extension.required_fields.length} concept-map=${conceptMap.retained_features.length} graph=${graph.retained_features.length} formograph=${formograph.retained_features.length} failure=${structuredFailure.code} verdict=${expected.verdict}`,
);
