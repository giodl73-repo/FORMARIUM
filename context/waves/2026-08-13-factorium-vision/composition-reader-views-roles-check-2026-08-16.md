---
skill: roles-check
topic: composition-reader-views
date: 2026-08-16
roles_used: 8
p1_count: 0
verdict: APPROVED
---

# Composition Reader Views - Factorium Role Review

## Artifact identification

Artifact type: display-projection specification for the generated Proof Set
Composition Lab.

Domain signals: reader-profile continuity, exact factor and relation custody,
semantic non-interference, local preference persistence, responsive
interaction, deterministic edition rendering, and simulation claim control.

## Role selection

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | A display alias must never become a semantic identifier or query input. |
| Reference Architecture Editor | The lab and book must share one coherent profile vocabulary. |
| Reference Lexicographer | Human labels must improve lookup without erasing exact senses or identities. |
| Evidence & Claims Editor | A cleaner default is not observed comprehension or usability evidence. |
| Mapping Integrity Auditor | Human labels and short relation codes are directional projections over exact records. |
| Research Integrity & Provenance | Prior-edition identity and result custody must remain reconstructable. |
| Reference Practitioner | The default must reduce audit noise while keeping necessary decisions visible. |
| Schema Implementer | Profile rules and fallback behavior must be independently testable. |

## Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Human labels could silently replace exact endpoint identity. | P3 | Visibility levels | Keep exact input values and result JSON unchanged; labels remain display aliases. |
| 2 | Hiding an unready or contradictory state would change the apparent semantics. | P3 | Visibility levels | Keep readiness, negative states, frontiers, and conflicts visible in every profile. |
| 3 | Profile selection could become an implicit Closure Policy input. | P3 | Purpose | Exclude profiles from normalized requests, canonical bytes, and graph execution. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Compose-specific profile names would fragment the reference architecture. | P3 | Profiles | Reuse Compact, Abbreviated, Book, and Full without aliases. |
| 2 | A new preference key would create competing global view state. | P3 | Profiles | Share the existing reader preference key and query parameter. |
| 3 | Full custody must remain reachable from the default projection. | P3 | Visibility levels | Keep a visible Full button and retain all exact metadata in the DOM. |

## Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Slug-derived labels are poor reader-facing headwords. | P3 | Visibility levels | Derive concept and scope labels only from exact reading bindings. |
| 2 | A bare relation verb can obscure its two endpoints. | P3 | Visibility levels | Show the human endpoint route at essential metadata. |
| 3 | Short relation codes need an exact expansion. | P3 | Profiles | Keep full relation IDs and qualifications available in Full. |

## Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Book as default does not prove it is the best default. | P3 | Claim boundary | Call it inherited behavior, not observed preference. |
| 2 | Successful keyboard mechanics are not population accessibility evidence. | P3 | Claim boundary | Limit claims to deterministic controls and browser checks. |
| 3 | Reduced visible metadata is not faster comprehension evidence. | P3 | Claim boundary | Deny speed, understanding, and task-success claims. |

## Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Direction can be lost when a relation is shortened to a verb. | P3 | Visibility levels | Preserve ordered source-to-target human labels and raw exact endpoints in Full. |
| 2 | Qualifications can be hidden only if their availability and scope remain explicit. | P3 | Visibility levels | Treat them as full metadata, never delete them from markup. |
| 3 | Display rewriting must not imply a round-trip into canonical records. | P3 | Purpose | State that profiles project the current payload and mint no authority. |

## Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Modifying shared assets would invalidate retained edition evidence. | P3 | Runtime and custody | Gate new assets and integration to `sim-20`; rerender `sim-19` exactly. |
| 2 | A truncated visible digest could be mistaken for the canonical identity. | P3 | Visibility levels | Fold the full digest as one unit; do not display an ambiguous abbreviation. |
| 3 | Preference persistence and work-product ephemerality need separate evidence. | P3 | Runtime and custody | Inspect storage contents and verify reload clears the result. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Book should lead with recognizable concepts rather than machine IDs. | P3 | Profiles | Show human labels, short relation codes, readiness, and endpoint routes by default. |
| 2 | Compact must not hide the controls needed to understand why closure changed. | P3 | Visibility levels | Keep all inputs, selection states, budgets, and direction visible. |
| 3 | Readers need a direct way to inspect custody when uncertain. | P3 | Visibility levels | Keep Full one button away and retain exact metadata in place. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Profile precedence is ambiguous without an explicit order. | P3 | Profiles | Specify URL, then stored valid value, then Book fallback. |
| 2 | “Unchanged query” needs a concrete comparison surface. | P3 | Conformance cases | Compare named controls, canonical result JSON, and SHA-256. |
| 3 | Enhancement failure needs a defined fallback. | P3 | Runtime and custody | Retain the complete base lab with exact metadata visible. |

## Synthesis

Roles reviewed: 8
P1 blockers: 0  |  P2 issues: 0  |  P3 notes: 24

Verdict: APPROVED

Top finding: Profile changes must be proven graph-inert by exact request,
canonical-result, and SHA-256 equality.

Cross-role consensus: Human labels and progressive disclosure improve the
projection only when direction, negative states, exact identifiers, and source
custody remain available and no display state enters closure semantics.

## Amend

1. In `Profiles`, define one shared vocabulary, preference key, precedence,
   and Book fallback so book and composition views remain coherent.
2. In `Visibility levels`, keep every result-changing control and every
   negative state visible while moving exact custody to Full.
3. In `Conformance cases`, prove profile non-interference through control,
   canonical JSON, identity, storage, reload, and prior-edition checks.

The reviewed contract already incorporates all three amendments. No critical
or major finding remains open.
