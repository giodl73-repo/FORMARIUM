# Rust Access-Control Guide Review

Status: fixed point for candidate guide

## Scope

- `guides/rust-access-control-evaluation.md`
- `specs/FACTOR-GUIDE.md`
- canonical access-control, policy, constraint, and mapping sources

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Eight request factors remain distinct and the decision stays derived. |
| Experimental Methodologist | pass for bounded case | Local evidence and change tests are explicit; no broad architecture claim is made. |
| Representation Control Auditor | pass | Rust mechanisms are not claimed superior to other representations. |
| Data Split & Leakage Auditor | defer | No dataset or split. |
| Factorization Method Steward | pass after findings | Relationship, policy, context, constraint, and enforcement do not collapse into identity. |
| Evidence & Claims Editor | pass | NIST authority and candidate local recommendations have separate status. |
| Benchmark Numeracy Checker | defer | No quantitative benchmark. |
| Reference Lexicographer | pass | Subject kind, role, relationship, assurance, policy, and decision use separate terms. |
| Reference Architecture Editor | pass after findings | Request facts, policy, decision, enforcement, and audit custody form distinct boundaries. |
| Research Integrity & Provenance | pass | Canonical sources and NIST ABAC are cited. |
| Cross-Paradigm Mapping Auditor | pass after findings | Every Rust mechanism retains its source role and condition. |
| Domain Source Reviewer | pass for candidate | The guide does not claim a complete security architecture. |
| Equation & Units Auditor | defer | No equation or unit contract. |
| Mapping Integrity Auditor | pass | Enum, trait, module, reference, and struct assignments retain non-equivalence. |
| Schema Implementer | pass | The guide provides implementable boundaries without pretending to be generated code. |
| Benchmark Consumer | defer | Evidence packets unchanged. |
| Reference Practitioner | pass after findings | Selected and rejected alternatives, controls, and change cases are scannable. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| RAG-001 | critical | A role enum could become the entire authorization model. | Closed: identity, assurance, action, object, relationship, policy, context, enforcement, and derived decision remain separate. |
| RAG-002 | critical | Rust privacy could be mistaken for runtime authorization. | Closed: module privacy is only one boundary mechanism and every mutation path requires enforcement validation. |
| RAG-003 | critical | Missing facts could default to allow. | Closed: `needs-information` or deny is explicit and tested. |
| RAG-004 | major | A trait could be treated as the policy itself. | Closed: immutable policy version and evaluator boundary are separate from the mechanism choice. |
| RAG-005 | critical | Decision success could imply enforcement success. | Closed: enforcement evidence is a separate output and audit field. |
| RAG-006 | major | A zero-trust vocabulary could introduce unsupported factors. | Closed: it remains not applicable until device posture or session risk enters local evidence. |
| RAG-007 | major | Background jobs could bypass HTTP middleware. | Closed: enforcement-point validation inventories both path families. |
| RAG-008 | major | The guide could be read as production-ready code. | Closed: executable code, cache consistency, authentication, and storage are explicit non-goals or unresolved choices. |

No critical or major finding remains open for the bounded candidate guide.
