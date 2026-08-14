# Thermal Quantity Cluster Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-thermal-quantity-cluster.md`
- `tables/entries/thermal-quantity.md`
- `tables/formulas/thermal-quantities.md`
- temperature mapping and energy cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | State, transfer, response, boundary, phase, and path roles remain explicit. |
| Experimental Methodologist | defer | No new experiment or performance claim is introduced. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | The state-transfer-response ladder avoids one undifferentiated heat taxonomy. |
| Evidence & Claims Editor | pass | Established thermodynamics remains separate from candidate organization. |
| Benchmark Numeracy Checker | pass | Units, signs, phase scope, and absolute temperature remain visible. |
| Reference Lexicographer | pass after findings | Ordinary heat language is separated from technical state and transfer senses. |
| Reference Architecture Editor | pass | One anchor owns concepts; Formula and Mapping views keep distinct authority. |
| Research Integrity & Provenance | pass | OpenStax and NIST sources and scope are explicit. |
| Cross-Paradigm Mapping Auditor | defer | No implementation-mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Established thermodynamics and metrology sources support candidate publication. |
| Equation & Units Auditor | pass after findings | State/path status, signs, units, process constraints, and reversible paths are explicit. |
| Mapping Integrity Auditor | pass | Temperature point and interval conversion remains in the existing Mapping Table. |
| Schema Implementer | defer | Thermodynamic process semantics remain Markdown-first. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | Selection and failure tables prevent common heat and entropy substitutions. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| TQF-001 | critical | Temperature and heat could be collapsed by ordinary language. | Closed: state kelvin and transfer joule senses are separate. |
| TQF-002 | critical | Heat could be treated as stored system content. | Closed: internal energy owns state; heat and work own boundary transfer. |
| TQF-003 | major | Internal energy could include unspecified macroscopic motion. | Closed: system boundary and included microscopic forms are required. |
| TQF-004 | critical | `Q = m c Delta T` could be used through phase change. | Closed: phase and process conditions gate the approximation. |
| TQF-005 | major | Heat capacity could omit constant-pressure or constant-volume conditions. | Closed: every response coefficient names its process constraint. |
| TQF-006 | critical | First-law signs could mix work-by and work-on conventions. | Closed: both equivalent forms and their definitions are explicit. |
| TQF-007 | critical | Celsius values could appear in entropy denominators. | Closed: entropy relations require absolute kelvin temperature. |
| TQF-008 | critical | `Delta S = Q/T` could be applied to arbitrary processes. | Closed: reversible and isothermal conditions are explicit. |
| TQF-009 | major | System entropy decrease could be called a second-law violation. | Closed: isolated total system-plus-surroundings scope owns the constraint. |
| TQF-010 | major | Temperature points and intervals could reuse one affine conversion. | Closed: the existing Mapping Table remains the specialized owner. |

No critical or major finding remains open for candidate publication.

