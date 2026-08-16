---
skill: validate-design
topic: composition-reading-route
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Composition Reading Route Design Review

Mode: compact delta review

Status: fixed point for the `sim-17` closure-to-book projection

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A reading sequence can look like relevance ranking or editorial recommendation. | P3 | Stage model | Derive stages only from seed, required, and evaluative graph roles and deny ranking claims. |
| 2 | Deduplicating two factors onto one anchor page can erase why both entered closure. | P3 | Projection | Preserve every exact factor binding and graph role under the page destination. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | An extension could race the asynchronous result renderer. | P3 | Runtime integration | Invoke one bounded post-render hook with the identified result, then load the extension after the lab. |
| 2 | Unknown graph artifacts could fall through to text search and silently broaden closure. | P3 | Binding | Require an exact digest-bound artifact binding or fail closed. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Browser navigation mechanics can be promoted into findability evidence. | P3 | Evidence | Describe Edge execution as mechanical runtime and layout inspection only. |
| 2 | Adding a shared runtime hook can disturb the frozen prior rehearsal. | P3 | Regression | Remove the hook only in `sim-16`, verify removal, and assert its exact site and standalone identities. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the route must remain a loss-aware display
projection of admitted nodes, not a second traversal or recommendation engine.
Every convenience operation needs to preserve exact graph custody.

Strongest signal: destination deduplication is safe only when all contributing
factor identities, roles, and conflict dispositions remain inspectable.

## Amendments

1. Define structural `Start`, `Continue`, and `Evaluate` stages and explicitly
   deny relevance, usefulness, and canonical-order claims.
2. Bind all 12 endpoints and six scopes to exact reference pages and retain
   every graph binding inside native disclosure after page deduplication.
3. Test pure projection, generated payload and destinations, live Edge
   submission, prohibited storage/network APIs, and byte-identical `sim-16`.

All amendments are applied. No P1/P2 finding remains open.
