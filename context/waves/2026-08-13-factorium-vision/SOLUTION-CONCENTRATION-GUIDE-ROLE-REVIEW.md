# Solution Concentration Guide Review

Status: fixed point for candidate guide

## Scope

- `guides/aqueous-solution-amount-concentration.md`
- `specs/FACTOR-GUIDE.md`
- canonical amount/composition, formula, comparison, geometry, and value
  sources

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Component, boundary, quantity kind, numerator, denominator, state, and uncertainty remain separate. |
| Experimental Methodologist | pass for bounded case | Inputs, exclusions, calculation, and change tests are explicit. |
| Representation Control Auditor | defer | No representation claim. |
| Data Split & Leakage Auditor | defer | No dataset or split. |
| Factorization Method Steward | pass after findings | Quantity selection precedes formula use and no false part-whole factorization is introduced. |
| Evidence & Claims Editor | pass | Calculated amount, target concentration, and missing procedure evidence remain distinct. |
| Benchmark Numeracy Checker | pass after findings | Liter/SI conversion, significant digits, units, and denominator basis are checked. |
| Reference Lexicographer | pass | Amount, concentration, mass concentration, and fractions remain separate senses. |
| Reference Architecture Editor | pass | The guide narrows canonical entries without becoming a new quantity authority. |
| Research Integrity & Provenance | pass | NIST and IUPAC sources remain attached to the canonical relations. |
| Cross-Paradigm Mapping Auditor | defer | No software paradigm mapping. |
| Domain Source Reviewer | pass for candidate | The guide stops before molar-mass, purity, procedure, and safety claims. |
| Equation & Units Auditor | pass after findings | `c = n/V`, inverse calculation, liter conversion, and SI check agree. |
| Mapping Integrity Auditor | defer | No Mapping Table transformation beyond exact unit conversion. |
| Schema Implementer | pass | Record fields preserve the canonical factor contract. |
| Benchmark Consumer | defer | Evidence packets unchanged. |
| Reference Practitioner | pass after findings | Nearby senses, rejected shortcuts, and changed-evidence cases are directly comparable. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SCG-001 | critical | The guide could confuse amount concentration with amount, mass concentration, or fraction. | Closed: a seven-sense narrowing table selects `amount-concentration` from supplied numerator and denominator evidence. |
| SCG-002 | critical | Initial solvent volume could be used as final solution volume. | Closed: final prepared solution owns the denominator and the invalid case is tested. |
| SCG-003 | critical | An uncited molar mass could silently convert amount to weighed mass. | Closed: mass conversion stops at an explicit unresolved authority and purity boundary. |
| SCG-004 | major | The calculated `0.0500 mol` could be reported as concentration. | Closed: it is labeled an intermediate derived amount; `0.100 mol/L` remains the target concentration. |
| SCG-005 | major | Temperature and equipment uncertainty could disappear from a simple calculation. | Closed: state and uncertainty are required record fields and promotion blockers. |
| SCG-006 | critical | The guide could be mistaken for a safe preparation procedure. | Closed: preparation, safety, disposal, equipment, and certified reporting are explicit non-goals or unresolved choices. |
| SCG-007 | major | Decimal-unit arithmetic could disagree with SI conversion. | Closed: liter and cubic-metre paths both yield `0.0500 mol`. |
| SCG-008 | major | Changed requirements could retain the wrong sense. | Closed: mass-percent, mass-concentration, solvent-volume, evaporation, and entity-count scenarios retest selection. |

No critical or major finding remains open for the bounded candidate guide.
