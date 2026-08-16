---
skill: validate-design
topic: truncated-frontier
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Truncated Frontier Design Review

Mode: compact delta review

Status: fixed point for the multi-seed truncated trace, worksheet, and `sim-14`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Truncation can be confused with unresolved evidence or parser incompleteness. | P3 | State contract | Require an exactly reached budget and a nonempty, named frontier. |
| 2 | A frontier reason naming F6 can look machine-discovered when V0 treats it as author text. | P3 | Frontier custody | State that validation covers visibility and budget consistency, not reason-to-relation binding. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | The first valid truncated fixture needs explicit state and work-accounting regression. | P3 | Trace tests | Add it to the committed round-trip table and validate its exact 13-unit budget. |
| 2 | Five cards can produce a visually accidental final row. | P3 | Renderer | Require five unique targets and edition-gate a balanced three-plus-two desktop grid. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Completing F2 can be misread as authority validation or compliance review. | P3 | Result | Separate structural check status from delegation, evidence, and compliance dispositions. |
| 2 | Raising the budget could silently rewrite a published trace. | P3 | Change control | Require a new trace identity and retain the one-edge result. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: a useful truncated result makes the stopping rule,
the work already admitted, and the exact remaining frontier visible together.
It must not turn a partial traversal into a partial substantive approval.

Strongest signal: the F6 frontier is explicit author custody, not evidence that
the V0 engine automatically discovered a next edge.

## Amendments

1. Print exact budget accounting, F2 traversal, F6 target frontier, and the V0
   author-declaration limitation together in the worksheet.
2. Label the result `truncated trace; obligation evaluation not reached` and
   deny delegation validity, compliance, or approval claims.
3. Assert trace state, search path, five-card route, responsive layout, and
   byte-identical `sim-13` regression.

All amendments are applied. No P1/P2 finding remains open.
