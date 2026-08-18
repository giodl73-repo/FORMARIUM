---
skill: roles-check
topic: synthetic-dual-literal-lookup-result
date: 2026-08-17
roles_used: 7
p1_count: 0
verdict: APPROVED
---

# SUJ-06 Dual Literal Lookup Result Roles Check

## Artifact identification

Artifact type: deterministic search interface, exact browser rerun, and product
decision. Domain signals: lexical ranking, semantics, privacy, accessibility,
reference navigation, evidence, and product value.

| Role | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| Experimental Methodologist | Both frozen gates pass without query changes | P3 | Baseline | Retain exact counts and denominator |
| Experimental Methodologist | Browser rankings reproduce all baseline lists | P3 | Rerun | Bind the rerun artifact to both commits |
| Experimental Methodologist | One failed task remains | P3 | Result | Keep the miss prominent |
| Data Split & Leakage Auditor | Queries predate SUJ-05 and SUJ-06 outcomes | P3 | Custody | Preserve SUJ-02 dependency |
| Data Split & Leakage Auditor | No third query was introduced for the miss | P3 | Rerun | Keep the frozen portfolio exact |
| Data Split & Leakage Auditor | Intended families remain authored labels | P3 | Claims | Do not call this independent discovery |
| Compositional Semantics Steward | Independent lists retain separate ranks | P3 | Interface | Prohibit merged relevance |
| Compositional Semantics Steward | Identity comparison carries no relation | P3 | Boundary | Keep it distinct from closure |
| Compositional Semantics Steward | Alternate phrasing is not decomposition | P3 | Decision | Prohibit that claim |
| Reference Lexicographer | Results retain canonical family ownership | P3 | Interface | Keep exact Table links |
| Reference Lexicographer | Alphabetic comparison order is neutral display | P3 | Comparison | Label it not ranked |
| Reference Lexicographer | Ordinary Search remains unchanged | P3 | Architecture | Keep dual lookup adjacent and optional |
| Reference Architecture Editor | Tables remain the only authority | P3 | Architecture | Keep the component navigational |
| Reference Architecture Editor | Page-local state avoids a parallel collection | P3 | Privacy | Preserve reload loss |
| Reference Architecture Editor | One homepage surface is the smallest batch | P3 | Scope | Stop after sim-45 |
| Evidence & Claims Editor | Mechanical target coverage is not relevance | P3 | Claims | Make no findability claim |
| Evidence & Claims Editor | Browser execution is not reader use | P3 | Evidence | Keep external gates open |
| Evidence & Claims Editor | The 9/10 and 8/10 measures have different meanings | P3 | Result | Report separately |
| Product Owner | Dual lookup makes literal refinement mechanically possible | P3 | Value | Retain as internal candidate |
| Product Owner | The remaining miss does not justify automatic semantics | P3 | Cost | Defer decomposition work |
| Product Owner | Further search features would exceed this gate | P3 | Decision | Stop this slice |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 0 | P3 notes: 21

Verdict: **APPROVED**

Top finding: sim-45 earns a narrow literal-refinement surface while preserving
separate rank provenance and an explicit non-semantic boundary.

Cross-role consensus: retain the interface, keep the remaining miss visible,
and do not promote alternate phrasing into decomposition or closure.

## Amendments applied

1. Bound the rerun to frozen, implementation, build, and baseline identities.
2. Added exact URL, storage, boundary, overflow, and ranking checks.
3. Stopped the slice without a third query or semantic fallback.
