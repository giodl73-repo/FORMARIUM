---
skill: validate-design
topic: synthetic-user-job-discovery
date: 2026-08-17
reviewer_count: 3
p1_count: 0
p2_count: 3
p3_count: 3
domain_roles_active: none
---

# Synthetic User Job Discovery — Compact Design Review

Reviewed design:
`context/waves/2026-08-13-factorium-vision/SYNTHETIC-USER-JOB-DISCOVERY-PLAN.md`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Search evidence, authored route selection, proxy reaction, and product classification need separate custody | P2 | Frozen result grammar | Retain separate fields and never infer a reaction from ranking alone |
| 2 | A route must resolve only to the frozen edition and cannot create a second content authority | P3 | Portfolio execution | Validate every selected path against `sim-42` |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A generated result could drift if queries or search implementation change after freeze | P2 | Controls | Bind campaign, search index, source commit, site identity, query order, and output digest |
| 2 | Mechanical counts should be generated rather than copied into narrative summaries | P3 | Results | Add deterministic campaign and result validators |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Persona diversity can falsely resemble participant diversity | P2 | Evidence boundary | Label every persona and reaction synthetic and prohibit demographic or behavioral claims |
| 2 | Author-selected scenarios can make a new-reason result circular | P3 | Controls | Retain five lookup controls, all nulls, not-served outcomes, and the frozen falsification thresholds |

## Synthesis

Overall verdict: **APPROVED-WITH-CONDITIONS**

P1 blockers: none.

P2 conditions:

- preserve separate lexical, route, reaction, and product-classification layers;
- bind execution to exact frozen custody;
- prevent synthetic diversity from becoming reader or demographic evidence.

Cross-reviewer consensus: the campaign is useful only as a test of product
mechanics and positioning hypotheses. Its value depends more on frozen nulls
and explicit loss boundaries than on lively persona prose.

Strongest signal: synthetic reactions must never be rendered as what users
actually thought.

## Amendments applied

1. The plan freezes four separate result layers and an explicit authored-
   reaction label.
2. The campaign binds exact `sim-42` source, site, and search identities and a
   validator freezes all 50 queries.
3. Five lookup controls, four valid relationship outcomes, and hard behavioral-
   claim prohibitions remain in the design.
