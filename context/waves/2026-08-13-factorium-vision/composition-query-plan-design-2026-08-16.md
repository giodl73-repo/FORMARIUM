---
skill: validate-design
topic: composition-query-plan
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Query Plan - Compact Design Review

Artifact: `specs/COMPOSITION-QUERY-PLAN.md`

The compact mode is appropriate because this is an edition-gated projection
over already reviewed lab, reading-binding, starter, and reader-view contracts.
The full Factorium role pass separately covers semantic and custody concerns.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A plan engine that reruns closure would create competing pre-result semantics. | P3 | Purpose | Project controls only and prohibit admission, frontier, check, and state prediction. |
| 2 | A later control edit could leave a new plan beside an old result without warning. | P3 | Interaction | Compare deterministic plan records in memory and label not-run, matching, and changed alignment without minting identity. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reading labels from rendered DOM text would make the receipt presentation-dependent. | P3 | Exact input | Resolve exact selected IDs through digest-matched lab and reading payloads. |
| 2 | Live partial edits could cause exceptions or silent default repair. | P3 | Control state | Return exact missing/invalid-control diagnostics while preserving valid visible selections. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Ready” could imply structural or domain validity. | P3 | Interface | Say `control-complete`, define it narrowly, and repeat that nothing has executed. |
| 2 | A polished receipt can be mistaken for observed comprehension evidence. | P3 | Claim boundary | Limit claims to deterministic control-summary and browser mechanics. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none. P2 conditions: none.

Cross-reviewer consensus: the panel is useful only if it stays a faithful,
loss-explicit projection of visible controls and remains sharply separated from
closure execution and result identity.

Strongest signal: Code-Quality 1 — payload-bound identities, not DOM copy, must
own every human label and route.

## Amend

1. In `Exact input and record`, require digest-matched payload resolution and
   deterministic ordering.
2. In `Interface`, name the state `control-complete` and distinguish not-run,
   matching-result, and controls-changed alignment.
3. In `Failure and evolution boundary`, preserve all `sim-22` surfaces on
   absence or rejection.

The reviewed contract incorporates all three amendments.
