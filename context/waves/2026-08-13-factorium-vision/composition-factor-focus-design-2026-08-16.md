---
skill: validate-design
topic: composition-factor-focus
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Composition Factor Focus Design Review

Mode: compact delta review

Status: fixed point for the `sim-18` exact factor landing projection

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A generated fragment can be mistaken for canonical source-owned markup. | P3 | Identity | Prefix focus IDs, label cards as generated navigation, and deny cross-edition stability. |
| 2 | Two same-page factors can make focus selection depend on graph-node order. | P3 | Route projection | Sort admitted nodes by artifact before choosing the earliest-stage focus. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A missing or renamed Root factorization heading could leave a misleading landing card. | P3 | Renderer | Require exactly one heading and validate every fragment and handoff link. |
| 2 | Hidden focus cards could interfere with reader enhancement or heading structure. | P3 | Entry page | Keep cards before the source H1, use non-heading labels, and reveal only `:target`. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A successful deep link can be promoted into faster-findability evidence. | P3 | Claims | Limit evidence to deterministic fragments, visibility, and source handoff mechanics. |
| 2 | Extending the shared reading runtime can rewrite the prior rehearsal. | P3 | Regression | Strip only the focus extension in `sim-17` and assert its exact frozen identities. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: factor focus is safe only as transparent navigation
metadata. It must name the exact factor while handing authority back to the
whole entry and its existing Root factorization.

Strongest signal: deterministic focus choice must not depend on incidental
node ordering when several admitted factors share one page.

## Amendments

1. Sort graph nodes by exact artifact and let the earliest structural stage,
   then lexical artifact, choose one page focus.
2. Generate CSS-only target cards from exact reference labels and IDs, with a
   validated link to one existing Root factorization heading.
3. Test all 12 fragments, default hidden and targeted visible states, browser
   navigation, reduced-motion behavior, and exact `sim-17` regression.

All amendments are applied. No P1/P2 finding remains open.
