---
skill: validate-design
topic: synthetic-ux-wishlist
date: 2026-08-17
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Synthetic UX Wishlist Design Review — Compact

## Review scope

Compact review of `SYNTHETIC-UX-WISHLIST-PLAN.md` and `campaign-03.json`.
The artifact is a hypothesis-generation protocol, not a reader-study design.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | The three intent routes map to existing Search, Compose, and Reader surfaces | P3 | candidate batch | Preserve the existing destination contracts |
| 2 | The two-book authority explanation must remain visible after task routing | P3 | router | Place the router before, not instead of, the library section |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A navigation-only edition branch is simpler than changing shared search semantics | P3 | batch | Add an edition-gated section and deterministic checks |
| 2 | `sim-42` is frozen custody | P3 | boundary | Render a new edition and keep prior checks byte-stable |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Authored wishlist counts could be mistaken for demand | P3 | admission rule | Label every response and aggregate as authored synthetic |
| 2 | Asking about UX after exposing prior routes makes SUJ-03 dependent | P3 | objective | Treat it as design rehearsal, never independent recurrence |

## Synthesis

Overall verdict: **APPROVED**

P1 blockers: none. P2 conditions: none.

Strongest signal: implement only the already-supported intent router; retain
all other wishlist ideas as external-reader questions.

## Amendments

1. Preserve the two-book authority explanation directly after the router.
2. Gate implementation to a new simulation edition.
3. Require authored-synthetic labels in every response and aggregate.
