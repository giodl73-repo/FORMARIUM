# Amount, Concentration, and Composition Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-amount-concentration-composition.md`
- `tables/entries/amount-concentration-composition.md`
- `tables/formulas/amount-concentration-composition.md`
- related index and cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Entity, component, total, volume, basis, and state remain explicit factors. |
| Experimental Methodologist | defer | No experimental-performance claim is introduced. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | Totals, per-volume quantities, and part-whole fractions remain separate. |
| Evidence & Claims Editor | pass | SI/IUPAC authority and candidate Factorium organization are distinct. |
| Benchmark Numeracy Checker | pass | Units, closure conditions, and exact Avogadro value remain visible. |
| Reference Lexicographer | pass after findings | Ordinary amount and concentration language does not erase technical senses. |
| Reference Architecture Editor | pass | One anchor owns concepts and one Formula view owns relations. |
| Research Integrity & Provenance | pass | Every actionable quantity claim has an SI, IUPAC, or local source. |
| Cross-Paradigm Mapping Auditor | defer | No mechanism assignment is introduced. |
| Domain Source Reviewer | pass for candidate | SI and IUPAC sources support candidate publication. |
| Equation & Units Auditor | pass after findings | Count, mole, concentration, fraction, and volume conventions are explicit. |
| Mapping Integrity Auditor | defer | No conversion Mapping Table is needed. |
| Schema Implementer | defer | Quantity semantics remain Markdown-first until R2. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | The selection procedure distinguishes totals, rates, and fractions. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| ACF-001 | critical | Count and amount of substance could be collapsed. | Closed: they have separate kinds, units, and an exact conversion constant. |
| ACF-002 | critical | A mole could omit the specified entity. | Closed: entity identity is required in the anchor, symbols, and failures. |
| ACF-003 | major | Concentration could silently mean amount concentration. | Closed: amount and mass bases are separate and unqualified use is rejected. |
| ACF-004 | critical | Mass concentration could be mistaken for bulk density. | Closed: component role and mixture boundary distinguish equal-unit quantities. |
| ACF-005 | major | Percent could hide the composition basis. | Closed: amount, mass, and volume bases remain mandatory. |
| ACF-006 | critical | Unlike-kind quantities could form a composition fraction. | Closed: fractions require matching numerator and total quantity kinds. |
| ACF-007 | major | Partial component lists could be normalized as exhaustive. | Closed: closure applies only to exhaustive mutually exclusive sets. |
| ACF-008 | major | Volume additivity could be assumed through mixing. | Closed: preparation state and component-volume convention are required. |

No critical or major finding remains open.

