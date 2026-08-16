---
skill: validate-design
topic: composition-concept-palette
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Composition Concept Palette Design Review

Mode: compact delta review

Status: fixed point for the `sim-19` grouped concept and readiness interface

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A readiness badge can look like relation recommendation or guaranteed admission. | P3 | Readiness | Call it structural reachability, ignore prose, keep all edges enabled, and disclose that budgets still govern admission. |
| 2 | Alphabetical grouping leaves the active default topic open at the bottom. | P3 | Initial order | Put the group containing the selected seed first, then keep the remainder title-sorted. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Moving existing checkbox nodes could break submitted names, values, or listeners. | P3 | Enhancement | Move the original labels intact and browser-test the unchanged closure result. |
| 2 | Same relation data in a different order could change downstream readiness. | P3 | Algorithm | Sort relation IDs, iterate to a fixed point, and test payload/selection order invariance. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Collapsed groups could hide active selections. | P3 | Disclosure | Initially open and collapse back to every group containing a checked seed. |
| 2 | A cleaner author screenshot can be promoted into usability evidence. | P3 | Claims | Limit the result to deterministic controls, browser mechanics, and visual inspection. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: progressive disclosure must never become semantic
filtering. All exact controls and unresolved-relation behavior remain
available while human labels and structural status reduce scanning cost.

Strongest signal: `ready` must describe predecessor reachability only, not
budget admission, compatibility, validity, or recommendation.

## Amendments

1. Define a fixed-point readiness algorithm over explicit seeds, selected
   relations, and direction, with no prose or budget input.
2. Reuse the original controls, open the selected topic first, preserve all
   checked groups on collapse, and disable nothing.
3. Test pure grouping/readiness, browser disclosure and direction changes,
   unchanged closure output, responsive layout, and exact `sim-18` regression.

All amendments are applied. No P1/P2 finding remains open.
