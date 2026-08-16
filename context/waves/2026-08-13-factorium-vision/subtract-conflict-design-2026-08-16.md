---
skill: validate-design
topic: subtract-conflict
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Subtract Conflict Design Review

Mode: compact delta review

Status: fixed point for the contradictory trace, worksheet, and `sim-13`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A required graph node with a rejected projection disposition can appear internally inconsistent. | P3 | Graph and projection | Explain that graph necessity and requested output disposition are separate layers. |
| 2 | “Subtract” could be read as destructive deletion. | P3 | Composition steps | Define it as a recorded exclusion request and retain the conflict target. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | The first valid contradictory fixture needs an explicit expected-state assertion. | P3 | Trace tests | Add it to the committed round-trip table with state `contradictory`. |
| 2 | A fourth homepage card could silently drift or break the prior three-card layout. | P3 | Renderer | Require four unique selected targets in `sim-13` and edition-gate a two-column override. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A failed constraint could be mistaken for an observed architecture failure. | P3 | Evaluation | Qualify failure as local to the declared graph and exclusion request. |
| 2 | A conflict report could be mistaken for a valid Factor Guide recommendation. | P3 | Result | State that no valid flattened recommendation exists and list repair paths only. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: attempted subtraction is useful only when it leaves
the required artifact, failed check, and repair boundary visible. The site
must present contradiction as a query outcome, not a domain event.

Strongest signal: exclusion history is part of the graph result and must not
be optimized away.

## Amendments

1. Put required-node status, rejected projection, and conflict explanation
   together in the worksheet.
2. Label the result `contradictory trace; no valid flattened recommendation`
   and provide non-prescriptive repair paths.
3. Assert the exact state, search path, four-card route, responsive layout, and
   byte-identical `sim-12` regression.

All amendments are applied. No P1/P2 finding remains open.
