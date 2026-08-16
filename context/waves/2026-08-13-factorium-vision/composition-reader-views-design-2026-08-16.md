---
skill: validate-design
topic: composition-reader-views
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
mode: compact
---

# Composition Reader Views - Compact Design Review

Artifact: `specs/COMPOSITION-READER-VIEWS.md`

The compact review is appropriate because the artifact is a display-only
enhancement over an already validated query engine, palette, reading route,
and four-profile vocabulary. Semantic, custody, and practitioner concerns are
handled separately by the full Factorium role review.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | A second set of profile names or preference keys would split the reading model. | P3 | Profiles | Reuse the four existing names and `factorium-reader-profile` exactly. |
| 2 | Changing shared base assets would make prior-edition regression depend on the new layer. | P3 | Runtime and custody | Add an edition-gated enhancement after `sim-19` assets and preserve the base fallback. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Visual tests alone cannot prove that a profile leaves the query unchanged. | P3 | Conformance cases | Compare serialized controls, canonical result JSON, and SHA-256 before and after profile changes. |
| 2 | Dynamic result markup could escape classification after the initial page load. | P3 | Visibility levels | Reclassify each newly rendered result deterministically without observing or mutating the result object. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Storing a display preference could contradict the lab's broad “no persistence” copy. | P3 | Runtime and custody | State that only the profile may persist and explicitly exclude every work-product field. |
| 2 | A cleaner default could be promoted into unobserved usability evidence. | P3 | Claim boundary | Keep default-quality, accessibility, comprehension, and speed claims outside this simulation. |

## Synthesis

Overall verdict: APPROVED

P1 blockers (must resolve before implementation):
  - None -- proceed to implementation.

P2 conditions (must resolve before sign-off):
  - None.

Cross-reviewer consensus:
  The layer must remain a reversible projection over unchanged controls and
  result bytes. Edition gating, exact regression, and explicit preference-only
  persistence are necessary to keep that boundary reconstructable.

Strongest signal:
  Code-Quality 1 -- identity equality, not screenshots, proves that profiles
  do not alter composition.

## Amend

1. Keep the precedence, fallback, and shared preference key normative in
   `Profiles` so Compose and entries cannot drift into separate view systems.
2. Require control snapshots plus canonical result and digest equality in
   `Conformance cases` so display-only behavior is mechanically testable.
3. Name every excluded stored field in `Runtime and custody` and retain the
   no-usability-evidence boundary in `Claim boundary`.

The reviewed contract already incorporates all three amendments.
