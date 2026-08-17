---
skill: validate-design
topic: route-choice-inertia
date: 2026-08-17
reviewer_count: 3
p1_count: 0
p2_count: 3
p3_count: 3
domain_roles_active: none
---

# SUJ-02 Route Choice and Inertia — Compact Design Review

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Route choice, search landing, and authored mental-state hypotheses require separate fields | P2 | result contract | Never infer entrance, trust, or memory from lexical ranking |
| 2 | Reused profiles need stable linkage without implying persistent participant identity | P3 | profile source | Use profile IDs and explicitly deny memory continuity |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Term-blind claims require a reproducible test for first-five landing and vocabulary injection | P2 | hypothesis tests | Generate both measures from frozen queries and selected paths |
| 2 | The result contract should reject prohibited behavioral metric keys recursively | P3 | boundaries | Add deterministic validation |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Trust, density, memory, and switching responses can read like interviews | P2 | result questions | Label each as an authored design hypothesis and report no quotes or rates |
| 2 | A linked follow-up can accidentally count known scenarios as independent recurrence | P3 | boundaries | Prohibit content admission and state the dependency explicitly |

## Synthesis

Overall verdict: **APPROVED-WITH-CONDITIONS**

P1 blockers: none.

P2 conditions: separate mechanical and authored layers; generate term-blind
measures; label mental-state fields as hypotheses.

Cross-reviewer consensus: SUJ-02 can test entrance mechanics and sharpen the
external protocol, but it cannot simulate route choice or trust as behavior.

Strongest signal: the campaign must be able to report that familiar tools win
without treating that as a failed persona.

## Amendments applied

1. The result contract separates lexical browse, selected route, first
   entrance, inertia relationship, and authored proxy response.
2. Hypothesis thresholds bind first-five discovery and canonical-vocabulary
   injection before execution.
3. The plan prohibits behavioral metrics, independent-recurrence claims, and
   any R4E or preview evidence use.
