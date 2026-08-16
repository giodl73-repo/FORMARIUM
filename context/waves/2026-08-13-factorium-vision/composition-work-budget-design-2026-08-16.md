---
skill: validate-design
topic: composition-work-budget
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Work Budget - Compact Design Review

Artifact: `specs/COMPOSITION-WORK-BUDGET.md`

## Architect

| # | Finding | Sev | Resolution |
|---|---|---|---|
| 1 | A second meaning of work would split live and canonical contracts. | P3 | Use the canonical seven-record sum exactly. |
| 2 | Atomic admission can cross a cap unless downstream checks, projections, and conflicts are reserved. | P3 | Project the complete atomic record cost before mutation. |

## Code-Quality

| # | Finding | Sev | Resolution |
|---|---|---|---|
| 1 | A frontier is itself work and can make an otherwise bounded result exceed its cap. | P3 | Emit it only when its record fits; otherwise expose a capacity requirement. |
| 2 | Seed records impose a nonzero request-specific floor. | P3 | Fail closed when `3 * seeds` exceeds the declared work budget. |

## Process

| # | Finding | Sev | Resolution |
|---|---|---|---|
| 1 | “Work” can be mistaken for elapsed compute. | P3 | Label and specify it as emitted record accounting. |
| 2 | A new control can silently drift from starters and the receipt. | P3 | Propagate exact trace budgets through both and regression-test `sim-23`. |

## Synthesis

Overall verdict: APPROVED. P1 blockers: none. P2 conditions: none.

The reviewed contract incorporates all resolutions. The strongest constraint
is atomic projected accounting: no partial edge, check, node, projection, or
conflict bundle may cross the cap.
