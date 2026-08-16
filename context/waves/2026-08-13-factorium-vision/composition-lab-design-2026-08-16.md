---
skill: validate-design
topic: bounded-composition-lab
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Bounded Composition Lab Design Review

Mode: compact delta review

Status: fixed point for the `sim-16` interactive simulation

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A prose problem box can imply natural-language graph discovery. | P3 | Frame | State that prose never selects seeds, edges, or meaning. |
| 2 | A bounded run can stop for capacity without reaching a true traversal frontier. | P3 | Stop | Distinguish atomic capacity requirements from exactly reached budget frontiers. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Input ordering could change closure or identity accidentally. | P3 | Runtime | Normalize all sets and assert seed/relation-order invariance. |
| 2 | A browser-only implementation would make semantic regression difficult. | P3 | Verification | Export the pure closure engine and test it independently of the page. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A draft flattening can be mistaken for a canonical V0 trace. | P3 | Flatten | Label projection loss and deny canonical trace or guide status. |
| 2 | An interactive result can look like substantive evaluation. | P3 | Evaluate | Emit unresolved structural checks only and never emit `complete`. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the lab is useful only as a transparent bounded
closure over explicit, reviewed inputs. Interaction must not imply discovery,
substantive judgment, or publication authority.

Strongest signal: exact relation custody and deterministic identity make the
simulation inspectable without promoting it into Composition Query V1.

## Amendments

1. Bind the runtime to the six exact F1-F6 sidecars and their source digests;
   require explicit seeds, relation allowlist, direction, and budgets.
2. Preserve distinct required, evaluative, excluded, and conflicting node
   states; retain required nodes when subtraction creates a conflict.
3. Test the pure engine, generated site contract, live browser execution,
   responsive rendering, prohibited persistence/network APIs, and `sim-15`
   byte identity.

All amendments are applied. No P1/P2 finding remains open.
