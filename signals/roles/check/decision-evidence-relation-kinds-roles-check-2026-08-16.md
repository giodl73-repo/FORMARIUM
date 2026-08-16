---
skill: roles-check
topic: decision-evidence-relation-kinds
date: 2026-08-16
roles_used: 6
p1_count: 0
verdict: APPROVED
---

# Roles Check: Decision and Evidence Relation Kinds

Artifacts:

- `specs/DECISION-EVIDENCE-RELATION-KINDS.md`
- `specs/DECISION-EVIDENCE-BRIDGE.md`
- `src/reference_sidecar.rs`

Artifact type: schema contract and bounded parser extension.

Domain signals: directional semantic relations, evidence, causal scope, risk,
value, constraints, canonical admission, closure, and compatibility.

## Selected roles

- Compositional Semantics Steward: prevents accepted grammar from becoming an
  inferred semantic product.
- Factorization Method Steward: checks kind boundaries and dependent
  qualifiers.
- Reference Architecture Editor: separates parser vocabulary from canonical
  reference authority.
- Evidence & Claims Editor: bounds what successful fixtures establish.
- Mapping Integrity Auditor: checks direction, qualifier fidelity, inverse,
  version, and loss.
- Schema Implementer: requires complete grammar and fail-closed fixtures.

## Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Accepted kinds could be mistaken for existing edges. | P2 | Purpose | Make accepted-kind versus admitted-record status machine explicit in code, spec, and tests. |
| 2 | Type-level qualifiers could be mistaken for local evidence bindings. | P2 | Accepted candidate kinds | State that qualifier values do not carry local records or discover endpoints. |
| 3 | Reverse traversal could silently invent an inverse. | P3 | Validation boundary | Reject reverse-looking aliases and preserve directional lookup. |

## Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Five relations remain distinct because their governing questions and losses differ. | P3 | Accepted candidate kinds | Keep separate enum variants and qualifier contracts. |
| 2 | Combined labels such as subject/population and date/horizon are difficult to validate canonically. | P2 | F27 bridge mapping | Choose one exact normalized key per required qualification and document the correspondence. |
| 3 | Hard-versus-soft status is dependent on the applicable authority and version. | P3 | Constraint kind | Require all constraint keys together rather than accepting partial records. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Extending `factorium-relations-v0` vocabulary without adding records preserves canonical corpus identity. | P3 | Purpose | Leave the relation and assurance sidecars byte-identical. |
| 2 | The existing workspace validator currently conflates supported kinds with required prototype coverage. | P2 | Implementation | Separate the accepted-kind set from the six kinds required in the committed prototype. |
| 3 | Composition Lab could widen accidentally if it reads every parser-supported kind. | P2 | Admission boundary | Assert its current six-record allowlist and counts remain unchanged. |

## Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A parser round trip proves syntax and canonicalization only. | P2 | Fixture claim | Exclude semantic correctness, endpoint truth, and traversal usefulness. |
| 2 | Adversarial fixtures can show fail-closed behavior but not exhaustive safety. | P3 | Validation boundary | Name the covered invalid classes and retain the larger admission gate. |
| 3 | No user or decision evidence is produced. | P3 | Claim boundary | Preserve the existing preview and decision-quality exclusions. |

## Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Direction and inverse behavior are explicit for all five kinds. | P3 | Accepted candidate kinds | Preserve source-to-target readings in fixtures. |
| 2 | Exact qualifiers need canonical lexical order matching the parser's ordered map. | P2 | Qualifier grammar | Test all five positive orders and at least one noncanonical order. |
| 3 | Version and applicability cannot be optional on feasibility constraints. | P2 | Constraint kind | Reject missing, extra, and duplicated qualifiers exactly. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Enum and required-qualifier additions are straightforward and deterministic. | P3 | Implementation | Expose stable identifiers through `id()`. |
| 2 | Inline tests alone would hide the interchange examples from independent implementers. | P2 | Fixtures | Commit one positive fixture and structured invalid fixture files. |
| 3 | The canonical validator must not start requiring unadmitted kinds. | P2 | Compatibility | Keep F1-F6 as the exact required prototype coverage set and add a regression assertion. |

## Synthesis

Roles reviewed: 6

P1 blockers: 0 | P2 issues: 11 | P3 notes: 7

Verdict: APPROVED

Top finding: parser support and canonical edge admission must remain separate
states observable in both implementation and publication artifacts.

Cross-role consensus: exact qualifier sets, visible direction, structured
invalid fixtures, unchanged sidecar bytes, and unchanged Composition Lab
coverage are required before this grammar-only slice closes.

## Amendments

1. Add explicit accepted-versus-admitted code structure and keep the six-kind
   canonical coverage check separate.
2. Add one external positive fixture covering all five kinds plus structured
   invalid fixtures for missing, extra, duplicate, order, and inverse cases.
3. Add regression checks for unchanged canonical relation digest/count and
   unchanged six-relation Composition Lab allowlist.

## Closure

All eleven P2 conditions close. Five stable enum variants and exact qualifier
sets are covered by one external positive fixture, five structured invalid
fixtures, and four integration tests. Combined-fixture validation resolves
all candidate endpoints while canonical regression evidence retains six
admitted relations at SHA-256
`4c4bf8c68985c341d3ee20d2731c70038afb0c5787cbe16126928d9896ddd4df`.
The Composition Lab therefore remains six-relation and no candidate edge is
assured or traversable. Fixed-point review is recorded in
`DECISION-EVIDENCE-RELATION-KINDS-ROLE-REVIEW.md`.
