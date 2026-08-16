---
skill: validate-design
topic: composition-result-reconciliation
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Result Reconciliation - Compact Design Review

Artifact: `specs/COMPOSITION-RESULT-RECONCILIATION.md`

Compact mode is appropriate because this is a read-only projection over the
already reviewed result, closure-map, reading-binding, view-profile, and
identity contracts. The full Factorium role review covers semantic custody.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Recomputing closure would create a competing result authority. | P3 | Purpose | Project only persisted result records and fail closed on gaps. |
| 2 | A second state summary could drift from Lab precedence. | P3 | State explanation | Derive explanation from exact records while retaining the result's state unchanged. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Relation categories can overlap unless partition invariants are explicit. | P3 | Pure record | Require one and only one decision per selected relation and exclusion. |
| 2 | Human routes derived from DOM copy would be presentation-dependent. | P3 | Pure record | Bind exact IDs through digest-matched relation and reading payloads. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Not admitted” can imply semantic rejection. | P3 | Interface | Use stopped, capacity-limited, and predecessor-unreached with exact structural reasons. |
| 2 | A polished summary could be mistaken for reader-success evidence. | P3 | Claim boundary | Limit claims to deterministic mechanics and retain external gates. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none. P2 conditions: none.

Cross-reviewer consensus: the view is safe only as an exhaustive, disjoint
projection of selected controls onto existing result records. Exact identity,
direction, reason, and no-inference boundaries are the primary constraints.

Strongest signal: Code-Quality 1 — partition failure must reject the projection
rather than silently omit or duplicate a selected relation.

## Amend

1. Require exhaustive disjoint relation and exclusion partitions in `Pure record`.
2. Preserve canonical and traversal direction separately in `Pure record`.
3. State that unselected routes were not evaluated in `Interface`.

The reviewed contract incorporates all three amendments.
