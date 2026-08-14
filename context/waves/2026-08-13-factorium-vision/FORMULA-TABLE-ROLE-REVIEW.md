# Formula Table Foundation Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-formula-table-architecture.md`
- `specs/FORMULA-TABLE-ENTRY.md`
- `specs/FACTORIUM-ENTRY-GRAPH.md`
- `tables/formulas/force.md`
- `.roles/assurance/equation-units-auditor.md`
- Formula Table additions to `VISION.md`, `PRODUCT_PLAN.md`, and `README.md`

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Mathematical multiplication and Factorium joint-factor notation are explicitly distinct. |
| Experimental Methodologist | pass | The sourced law is not inferred from the Factorium decomposition or one worked example. |
| Representation Control Auditor | defer | No encoding-performance comparison is made. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | The conceptual table adds boundary, frame, aggregation, and exclusions without pretending they are equation operands. |
| Evidence & Claims Editor | pass after findings | Formula authority and Factorium entry maturity are separately stated. |
| Benchmark Numeracy Checker | pass | Units, dimensions, vector status, and rearrangement restrictions remain visible. |
| Reference Lexicographer | pass | The force sense is scoped to the Newtonian net-force relation. |
| Reference Architecture Editor | pass | Formula Tables extend the entry system without replacing the general Factor Table grammar. |
| Research Integrity & Provenance | pass | Actionable design claims cite local contracts or external sources. |
| Cross-Paradigm Mapping Auditor | defer | No software mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | OpenStax grounds the law and NIST/BIPM ground SI treatment; specialist review remains required for promotion. |
| Equation & Units Auditor | pass after findings | Relation kind, symbols, vectors, units, dimensions, scope, and exclusions are explicit. |
| Schema Implementer | defer | Expression trees and dimensional validation remain behind a future interchange boundary. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | A reader can inspect meaning, applicability, units, rearrangements, and failure signs without reading an essay. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| FTF-001 | critical | Using Factorium `x` for physical multiplication would corrupt both the equation and the decomposition language. | Closed: canonical expressions preserve mathematical operators and the distinction is repeated in the spec and pilot. |
| FTF-002 | critical | `F = ma` could be presented as an unrestricted dictionary definition of force. | Closed: it is classified as a sourced Newtonian law with boundary, vector, net-force, model, and exclusion conditions. |
| FTF-003 | major | A scientifically established relation could make an untested Factorium representation appear established. | Closed: relation authority and entry maturity are independent fields. |
| FTF-004 | major | Algebraic rearrangements could proliferate as duplicate formula entries. | Closed: equivalent forms remain subordinate to one canonical scoped relation and state restrictions. |
| FTF-005 | major | Units alone could obscure quantity dimensions or vector character. | Closed: symbol rows separate concept, quantity kind, SI unit, dimension, and role. |
| FTF-006 | major | Formula coverage could grow without editorial bounds. | Closed: research recommends a diverse curated pilot and defers exhaustive coverage. |
| FTF-007 | major | Existing roles did not own equation operator and dimensional integrity. | Closed: the Equation & Units Auditor is now an assurance gate. |

No critical or major finding remains open for candidate publication.
