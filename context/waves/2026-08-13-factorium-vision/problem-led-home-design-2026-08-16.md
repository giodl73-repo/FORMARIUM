---
skill: validate-design
topic: problem-led-home
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Problem-Led Home Design Review

Mode: compact delta review

Status: fixed point for the `sim-12` homepage

Artifacts reviewed:

- `tools/render_proof_set.ps1`
- `volumes/01-structure-quantity-choice/proof-set-composition.css`
- `specs/PROOF-SET-BOOK-SITE.md`

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A problem-first homepage could make worked guides look like a second authority over the book. | P3 | Hero and problem route | Say that tables remain authoritative and link each card to an exact admitted guide. |
| 2 | A composition call-to-action could imply a live builder or inferred closure. | P3 | Problem note | Label the cards as worked examples and defer interactive construction explicitly. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A no-content `sim-12` must not accidentally expect another guide from edition arithmetic. | P3 | Guide count | Freeze the admitted guide count independently of the edition number. |
| 2 | Homepage links could drift from selected pages without failing the build. | P3 | Problem route | Resolve exact source paths, reject duplicates, require three selected targets, and validate local links. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Visual prominence could be reported as improved reader findability. | P3 | Evidence boundary | Limit the result to deterministic hierarchy and mechanical browser evidence. |
| 2 | Shared styling could alter the frozen prior simulation. | P3 | Edition regression | Include the new CSS only from `sim-12` and reproduce `sim-11` exactly. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the homepage should reveal the real problem-led
method while remaining honest about what is static, generated, and canonical.
Selection and regression checks must make that boundary executable.

Strongest signal: foreground composition as a reading route, not as a fake
interaction surface.

## Amendments

1. Add authority and worked-example language directly in the hero and problem
   route.
2. Bind exactly three cards to selected worksheet source paths and expose the
   checked target count in the manifest output.
3. Gate the composition stylesheet and route at `sim-12`, then retain exact
   `sim-11` identity and hash.

All amendments are applied. No P1/P2 finding remains open.
