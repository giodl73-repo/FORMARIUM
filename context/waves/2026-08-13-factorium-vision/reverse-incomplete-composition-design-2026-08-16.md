---
skill: validate-design
topic: reverse-incomplete-composition
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Reverse Incomplete Composition Design Review

Mode: compact delta review

Status: fixed point for the F4 worksheet and `sim-11` projection

Artifacts reviewed:

- `fixtures/composition/alert-feedback.factorium-query`
- `guides/alert-feedback-composition-worksheet.md`
- `tools/render_proof_set.ps1`
- `tools/check_proof_set_search.js`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reverse traversal could be rendered as reversal of the canonical F4 `feeds` relation. | P3 | Working graph | State canonical source and target beside the reverse lookup path. |
| 2 | Feedback language could invite an unbounded cyclic graph walk. | P3 | Closure state | Keep stable-identity stopping explicit and deny repeated inferred expansion. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Growing edition membership lists created omission-prone maintenance work. | P3 | Renderer capabilities | Centralize monotone feature availability with one parsed edition number. |
| 2 | A third valid trace with a different state needs an asserted expected state, not only parse success. | P3 | Trace tests | Test each committed fixture against its declared expected state. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | `incomplete` could be misread as a failed service or failed diagnostic. | P3 | Evaluation | Name the absent outcome record and qualify the state as trace-local. |
| 2 | A new worksheet could pass while prior composition editions drift. | P3 | Regression | Render and search-check both `sim-10` and `sim-11`. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: direction, stopping behavior, and state meaning must
remain visible at the point of use. Renderer generalization is acceptable only
with exact prior-edition regression.

Strongest signal: query traversal direction and canonical relation direction
are separate facts and must never be collapsed in the reader projection.

## Amendments

1. Put the canonical F4 direction and reverse lookup explanation together in
   the working graph.
2. State `incomplete trace; unresolved improvement decision` beside the
   Evaluation result.
3. Replace repeated edition capability lists with a numeric edition boundary
   and retain exact `sim-10` render/search regression.

All amendments are applied. No P1/P2 finding remains open.
