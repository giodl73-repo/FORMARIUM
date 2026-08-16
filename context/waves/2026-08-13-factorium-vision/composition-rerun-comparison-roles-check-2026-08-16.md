---
skill: roles-check
topic: composition-rerun-comparison
date: 2026-08-16
roles_used: 9
p1_count: 0
verdict: APPROVED
---

# Composition Rerun Comparison Roles Check

Artifact: `specs/COMPOSITION-RERUN-COMPARISON.md` (specification).

Domain signals: bounded composition semantics, reference navigation,
request/result transformation, finite counts, evidence claims, release
custody, implementable record validation, and practitioner-facing comparison.

## Selected roles

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | Prevents structural differences from becoming semantic success or causal claims. |
| Reference Architecture Editor | Places the receipt within the book-shaped result hierarchy. |
| Reference Lexicographer | Reviews human labels for state and decision transitions. |
| Evidence & Claims Editor | Bounds before/after evidence and attribution language. |
| Benchmark Numeracy Checker | Checks reconciled counts and finite work/budget comparisons. |
| Mapping Integrity Auditor | Checks exact previous/current and action/request mappings. |
| Research Integrity & Provenance | Checks dual-result identity and edition custody. |
| Schema Implementer | Checks deterministic grammar and fail-closed validation. |
| Reference Practitioner | Checks whether the receipt answers what changed without requiring audit reconstruction. |

## Findings

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `stopped → admitted` is structural, not semantic satisfaction. | P3 | Result comparison | Retain unresolved checks and prohibit satisfaction language. |
| 2 | A state transition has no universal good/bad ordering. | P3 | Result comparison | Render an exact pair without improvement coloring or ranking. |
| 3 | Manual changes break exclusive action causality. | P3 | Claim boundary | Claim only request/result co-occurrence and exact control attribution. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Comparison could compete with current reconciliation. | P3 | Runtime lifecycle | Place it after current reconciliation and before detailed map/audit. |
| 2 | Unlimited history would displace the book route. | P3 | Runtime lifecycle | Retain one consumed comparison only. |
| 3 | Compact must not hide an executed additional edit. | P3 | Reader views | Keep every atomic request change in all profiles. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Outcome” can imply success. | P3 | Interface | Lead with “Compared with your previous run.” |
| 2 | Raw reason tokens are poor Book labels. | P3 | Reader views | Use neutral decision labels and reserve exact tokens for Full. |
| 3 | “Cleared” may be mistaken for corrected. | P3 | Result comparison | Prefer added, removed, changed, and unchanged. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The receipt cannot prove the action caused graph changes. | P3 | Claim boundary | Separate action presence from observed result differences. |
| 2 | Determinism is not reader usefulness. | P3 | Claim boundary | Admit only mechanical accounting. |
| 3 | Simulation cannot become preview evidence. | P3 | Claim boundary | Preserve the explicit `preview-01` exclusion. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Delta-only metrics can hide denominators. | P3 | Result comparison | Show before and after counts beside differences. |
| 2 | Work must remain used records, not runtime cost. | P3 | Result comparison | Label exact work-record counts and caps. |
| 3 | Unchanged records need accounting. | P3 | Pure record | Retain unchanged counts even when details are folded. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Previous/current direction must remain explicit. | P3 | Request comparison | Emit direction as an exact scalar change. |
| 2 | Set changes need element-level cardinality. | P3 | Request comparison | Emit one addition/removal per exact identity. |
| 3 | Action mapping can be superseded. | P3 | Request comparison | Revalidate its after-value against the executed request. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A comparison digest would create a competing identity. | P3 | Pure record | Carry both inherited result SHA-256 values and mint none. |
| 2 | Cross-revision comparison is not admitted. | P3 | Pure record | Require equal source digests across results and payloads. |
| 3 | Prior edition must remain reconstructable. | P3 | Conformance | Gate `sim-27` and regress `sim-26` site/standalone hashes. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Difference” needs a closed vocabulary. | P3 | Pure record | Freeze action disposition, request source, and record transition enums. |
| 2 | Duplicate result records make set comparison ambiguous. | P3 | Pure record | Reject duplicates before comparison. |
| 3 | Array order must not alter bytes. | P3 | Conformance | Sort all identities and add reordered-input fixtures. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The main question is whether the intended edit reached the run. | P3 | Reader views | Lead with action present/superseded disposition. |
| 2 | Readers also need to see unexpected extra edits. | P3 | Request comparison | Name every additional atomic control change. |
| 3 | Exact node audit can overwhelm Book. | P3 | Reader views | Lead with state and decision changes; fold raw records to Full. |

## Synthesis

Roles reviewed: 9

P1 blockers: 0 | P2 issues: 0 | P3 notes: 27

Verdict: APPROVED

Top finding: Attribute only exact request transitions to actions; do not claim
that an action caused all current graph differences.

Cross-role consensus: Preserve two-result identity, neutral structural
language, complete request-change disclosure, bounded in-memory lifecycle, and
the separate explicit Run boundary.

## Amendments applied

1. Added exact action-present/superseded and additional-edit rules to Request
   comparison so attribution is complete and bounded.
2. Added closed relation/exclusion transition classes, before/after metrics,
   unchanged counts, and strict result validation.
3. Added one-comparison lifecycle, profile invariants, no-persistence/no-
   identity rules, and `sim-26` regression to Conformance.
