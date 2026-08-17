# Basis Transformation Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Decomposition Modes and Combination Contracts](../entries/decomposition-modes-combination-contracts.md)

Canonical senses: `basis-transformation`, `projection`,
`combination-contract`

## Governing question

When the same subject is expressed under another basis or coordinate system,
what transformation, invariants, domain restrictions, and losses make the
correspondence interpretable?

## Mapping table

| Source basis | Target basis | Transformation contract | Preserve/check | Frequent failure |
|---|---|---|---|---|
| measurement unit | another compatible unit | exact/approximate scale or affine rule | quantity kind, dimension, uncertainty, point/interval sense | number converted without quantity |
| spatial coordinates | another coordinate/frame representation | direction, epoch, parameters, domain | geometric subject and declared invariants | coordinates treated as object identity |
| category basis | another purpose-specific classification | contextual many-to-many crosswalk | source criteria and unmapped members | false inverse or universal equivalence |
| component basis | alternate component representation | model-specific linear/nonlinear/custom rule | reconstructability and residual | coefficients compared across bases directly |
| detailed factors | aggregated factors | roll-up/projection rule | totals, coverage, uncertainty, loss | aggregation treated as reversible |

## Required fields

- source and target identities, versions, domains, and interpretation;
- direction, mapping kind, cardinality, and applicable range;
- transformation rule, parameters, units/scales, ordering, and precision;
- declared invariants and comparison tests;
- exact, approximate, contextual, normalized, or lossy status;
- inverse existence, uniqueness, and round-trip tolerance;
- unmapped values, singular/invalid regions, residual, and provenance.

## Constraints

- A basis is selected for a purpose and does not define the subject itself.
- Coordinate equality is not subject identity.
- Exact invertibility is local to the stated domain and representation.
- Aggregation, normalization, and classification mappings commonly lose
  information and may have no meaningful inverse.
- The notation “change of basis” does not make a semantic mapping linear.

## Sources and provenance

See Unit Conversion, Geometric Reference Structure, Data Structure Mapping,
and the canonical decomposition entry. This view supplies a shared audit
pattern, not a universal transformation formula.

