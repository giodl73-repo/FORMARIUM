---
skill: validate-design
topic: cross-domain-composition
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Cross-Domain Composition Design Review

Status: compact delta review at fixed point

This compact review compares the F1 systems worksheet with the new F3 evidence
worksheet. It relies on the full ten-reviewer `sim-09` design review for shared
page, accessibility, provenance, and publication architecture.

## Compact roster

| Reviewer | Role |
|---|---|
| Architect | Cross-example contract and publication ownership |
| Code-Quality | Fixture, renderer, and search regression behavior |
| Process | Roadmap order, review custody, and claim boundaries |

## Findings

### Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| ARC-01 | Both worksheets share identity, context, narrowing, graph, Evaluation, projection, change-test, and manifest sections without sharing domain conclusions. | P3 | worksheet grammar | Retain common structure but keep table-family-specific Evaluation content. |
| ARC-02 | Trace closure and local decision outcome are now demonstrably independent. | P3 | F3 Evaluation | Preserve explicit `complete` trace / `unresolved` claim wording. |

### Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| CQ-01 | Two committed valid traces now round-trip in one parser test. | P3 | Rust tests | Keep fixture enumeration explicit until a governed fixture manifest exists. |
| CQ-02 | Edition lists and guide counts continue to grow mechanically. | P3 | renderer | Retain exact sim-08/09/10 regressions; consolidate capability sets before another major renderer feature. |

### Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| PRO-01 | The second example tests reuse before automation. | P3 | roadmap | Keep interactive generation and persistence in R6. |
| PRO-02 | Synthetic latency values could be mistaken for an observed result. | P3 | custody | Repeat the synthetic/no-real-service statement in worksheet and preflight result. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the shared worksheet grammar is useful because it
preserves differences in domain result, not because it forces identical
decisions. The evidence case is the decisive control: graph closure does not
upgrade a claim.

Strongest signal: a Composition Query must expose at least two result levels—
structural closure and the separately governed local decision or claim state.

## Amendments

1. Put `complete trace / unresolved claim` beside the F3 Evaluation and result.
2. Add both valid traces to the committed round-trip test and distinct search checks.
3. Retain synthetic custody language and sim-09 regression while adding sim-10.

All amendments are applied. No P1/P2 finding remains open.
