---
skill: validate-design
topic: composition-authored-starters
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Authored Composition Starters - Compact Design Review

Artifact: `specs/COMPOSITION-AUTHORED-STARTERS.md`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A hand-maintained starter mapping could drift from its reviewed trace. | P3 | Exact derivation | Derive seeds, admitted and stopped relations, conflicts, policy, and budgets from exact trace records. |
| 2 | General URL serialization would quietly create persistence and disclosure surface. | P3 | Interaction | Allow only one fixed edition-local starter ID and clear it after modification. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Loading and running in one click would hide an important state transition. | P3 | Interaction | Configure visible controls, clear the result, and require a separate Run action. |
| 2 | A partial invalid load could leave controls in a misleading mixed state. | P3 | Failure | Validate the complete payload before installing any interaction. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A reviewed trace state could be mistaken for the new lab result. | P3 | Trace and lab distinction | Label the source state and state that every lab recomputation has unresolved checks and a distinct identity. |
| 2 | Five polished defaults could imply population evidence or preferred routes. | P3 | Claim boundary | Call them authored patterns in fixed worked order and defer usefulness claims. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none. P2 conditions: none.

Cross-reviewer consensus: exact trace derivation, visible control custody, and a
separate Run action keep the convenience subordinate to the Composition Query
contract.

## Amend

1. Make trace-to-starter derivation and failure conditions normative.
2. Restrict routing to an allowlisted edition-local identity.
3. Deny trace-outcome inheritance and preferred-default claims.

The reviewed contract incorporates all three amendments.
