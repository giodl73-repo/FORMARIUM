---
skill: validate-design
topic: composition-closure-map
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Closure Map - Compact Design Review

Artifact: `specs/COMPOSITION-CLOSURE-MAP.md`

The compact review is appropriate because the map is an edition-gated display
projection over the already reviewed closure, reading-route, palette, and
profile contracts. The full Factorium role review separately covers semantic,
directional, custody, and practice concerns.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A tree rendering would duplicate shared nodes and misrepresent the working graph. | P3 | Deterministic layout | Position each admitted artifact once and draw every exact traversal to that node. |
| 2 | A new renderer hook could displace the existing reading route. | P3 | Failure boundary | Chain the installed route renderer first and preserve it on every map failure. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | DOM scraping would make the map depend on lossy presentation text. | P3 | Exact map record | Consume the same identified result object passed to the reading route. |
| 2 | Responsive geometry could introduce nondeterministic semantic ordering. | P3 | Deterministic layout | Freeze logical coordinates from depth and artifact order; let the viewport scroll without relayout. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A polished graph can imply inferred or recommended structure. | P3 | Claim boundary | Label it closure projection and deny discovery, relevance, causal, and completeness claims. |
| 2 | SVG-only output would make mechanical success weaker than accessibility evidence. | P3 | Interface and accessibility | Require complete ordinary-HTML records and keep population accessibility claims deferred. |

## Synthesis

Overall verdict: APPROVED

P1 blockers (must resolve before implementation):
  - None -- proceed to implementation.

P2 conditions (must resolve before sign-off):
  - None.

Cross-reviewer consensus:
  The map must consume exact result data, preserve unique graph identity, and
  remain subordinate to both the stage audit and book route. Accessibility and
  failure behavior need independent non-visual and fallback paths.

Strongest signal:
  Code-Quality 1 -- identified result data, not rendered text, is the only
  acceptable projection input.

## Amend

1. In `Exact map record`, require exact result and digest validation before any
   visual record is emitted.
2. In `Deterministic layout`, make unique-node placement and array-order
   invariance normative.
3. In `Interface and accessibility` and `Failure boundary`, require full HTML
   equivalence and preservation of the base result on failure.

The reviewed contract already incorporates all three amendments.
