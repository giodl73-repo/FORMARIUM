---
skill: validate-design
topic: composition-explicit-continuations
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Explicit Continuations - Compact Design Review

Artifact: `specs/COMPOSITION-EXPLICIT-CONTINUATIONS.md`

Compact mode is appropriate because the feature is an edition-gated control
adapter over already reviewed form, result, reconciliation, identity, and view
contracts. The full Factorium role review covers semantic and custody risks.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A continuation engine could become an implicit optimization loop. | P3 | Purpose | Derive one record-backed edit, require a click, and prohibit submit or prediction. |
| 2 | Applying an edit could erase the evidence that justified it. | P3 | Application | Keep the previous identified result visible and mark it stale. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A stale action can overwrite a later manual edit. | P3 | Application | Recheck exact before-value at activation and refuse on drift. |
| 2 | Budget arithmetic can exceed form limits. | P3 | Rules | Emit an unavailable record with the exact maximum rather than clamp silently. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Continue” can sound recommended or sufficient. | P3 | Interface | Call these possible next-request edits and repeat that another boundary may appear. |
| 2 | Successful clicks could be mistaken for successful closure. | P3 | Claims | Test no-run and stale-result behavior; deny task and semantic claims. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none. P2 conditions: none.

Cross-reviewer consensus: a safe continuation is an explicit, preconditioned
form edit—not a repair loop. The previous result must remain authoritative and
visibly stale until a separate run.

Strongest signal: Code-Quality 1 — action preconditions must prevent stale
result advice from overwriting current reader controls.

## Amend

1. Add exact before-value revalidation to `Application behavior`.
2. Add visible unavailable actions at form maxima to `Deterministic action rules`.
3. Require no-submit and stale-result browser cases in `Conformance`.

The reviewed contract incorporates all amendments.
