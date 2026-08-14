# Pulse 05 Role/Ambiguity Bakeoff Review

Date: 2026-08-13

Artifacts reviewed: `src/role_bakeoff.rs`, `tests/role_bakeoff.rs`, CLI tests,
`specs/ROLE-AMBIGUITY-BAKEOFF.md`, and
`docs/ROLE-AMBIGUITY-RESULT.md`.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Candidate meanings are supplied and preserved as complete analyses; the result does not claim surface interpretation or preferred-reading discovery. |
| Experimental Methodologist | pass after findings | Three systematic splits, one explicit overlap transfer, retained IID and HRR diagnostics, and a frozen decision rule separate lookup from role reuse. |
| Representation Control Auditor | pass | Typed records, exact TPR, factored one-hot, and factored dense tie HRR-256; whole owners remain deletion targets. |
| Data Split & Leakage Auditor | pass | Ordinary candidate meanings are disjoint; disambiguation candidate overlap is complete and separately interpreted. |
| Evidence & Claims Editor | pass | Role factorization, candidate-set composition, representation specificity, parsing, runtime, and hardware claims remain separate. |
| Benchmark Numeracy Checker | pass after findings | Exact-set, candidate TP/predicted/target, meaning, and role denominators are canonical; no undefined ratio is promoted. |
| Research Integrity & Provenance | pass | Split, control, decision-owner, result, and failure records are deterministic and identity-bound. |
| Schema Implementer | pass | Predictions rebuild admitted meaning ordinals and fail absent when approximate role decoding violates the constrained corpus. |
| Benchmark Consumer | pass | `factor role-bakeoff` emits complete train/test evidence and a reproducible semantic-only decision. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| RBO-001 | critical | Candidate-set scoring could be described as discovering ambiguity from surface text. | Closed: the task explicitly receives canonical candidate meanings and measures representation preservation/composition only. |
| RBO-002 | major | Whole-meaning and whole-set deletion targets could be conflated. | Closed: whole-meaning passes familiar-meaning disambiguation, while whole-analysis-set fails the unseen pair. |
| RBO-003 | major | Candidate precision with no predictions could be silently treated as perfect. | Closed: true-positive, predicted, and target counts are reported directly without an undefined scalar. |
| RBO-004 | major | HRR-64 failures could disappear because selected systematic test meanings happen to decode. | Closed: complete train and test records plus Pulse 04 full-corpus diagnostics remain canonical. |
| RBO-005 | major | Perfect HRR-128 results could replace the more expensive frozen owner. | Closed: HRR-256 remains the predeclared decision owner; 128 stays diagnostic. |
| RBO-006 | major | Approximate invalid role combinations could be coerced into a valid meaning. | Closed: reconstructed ordinals must match an admitted constrained meaning or produce no candidate. |
| RBO-007 | major | Locality and storage could be blended into the semantic decision. | Closed: addressability, edit coordinates, dimensions, bytes, metadata, parameters, and temporary memory are separate fields. |
| RBO-008 | major | Strong exact controls could be omitted from ambiguity composition. | Closed: typed records, sparse TPR, factored one-hot, and factored dense must be perfect on every split side. |

## Fixed point

Pulse 05 is complete with an accepted `semantic-only` result. Role reuse and
candidate-set composition are useful in the bounded artifacts, but HRR is not
uniquely better than exact conventional controls. No critical or major finding
remains open.
