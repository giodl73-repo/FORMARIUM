---
skill: validate-design
topic: composition-explorer
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Composition Explorer Design Review

Mode: compact delta review

Status: fixed point for the read-only trace explorer and `sim-15`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A polished explorer can imply live graph construction or automatic closure. | P3 | Product boundary | Label it read-only and remove forms, mutation controls, and discovery language. |
| 2 | A second hand-authored summary can drift from trace and worksheet authority. | P3 | Data flow | Generate every structural field from exact manifests and verify worksheet digest binding. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A lightweight renderer parser could silently accept stale source identities or work counts. | P3 | Trace ingestion | Check canonical transport, source digests, required records, budget arithmetic, and unique IDs. |
| 2 | Visual presence alone does not prove state or route coverage. | P3 | Verification | Add an independent manifest/HTML checker for five traces, four states, operations, digests, and guide links. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Trace comparison could displace the book and worksheets as the primary product. | P3 | Navigation | Keep the explorer after problem-led entry points and link every panel to its full guide. |
| 2 | New navigation and CSS could perturb the prior proof edition. | P3 | Editioning | Gate all explorer behavior at `sim-15` and require exact `sim-14` identity regression. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the explorer is valuable when it is a compact,
deterministic lens over trace custody rather than a parallel semantic engine.
The working graph and its boundary must remain visible, while explanatory and
substantive reasoning stays in the full Factor Guide.

Strongest signal: every displayed state, count, edge, node, check, frontier,
conflict, projection count, and digest must come from the exact trace bytes.

## Amendments

1. Add fail-closed trace extraction with source/hash/work/worksheet checks in
   the renderer and exact records in the site manifest.
2. Show Add, Multiply, Evaluate, Stop, and Flatten stages, including admitted
   target and scope nodes, while denying live construction.
3. Add independent structural checking, native disclosure behavior,
   responsive CSS, and exact `sim-14` regression.

All amendments are applied. No P1/P2 finding remains open.
