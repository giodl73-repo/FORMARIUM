---
skill: roles-check
topic: composition-evaluation-record
date: 2026-08-16
roles_used: 6
p1_count: 0
verdict: APPROVED
---

# Roles Check: Composition Evaluation Record

Artifact: `specs/COMPOSITION-EVALUATION-RECORD.md`

Artifact type: local evaluation-record specification and browser workflow.

Domain signals: user-declared evidence, provenance, domain claims, privacy,
identity, stale state, form validation, and book-form evaluation UX.

## Selected roles

- Experimental Methodologist: outcomes and null/unresolved records must not be
  selected or scored by the software.
- Evidence & Claims Editor: user declarations must not become Factorium
  verification or recommendation language.
- Research Integrity & Provenance: the evaluation record needs exact source,
  result, and canonical-byte custody.
- Domain Source Reviewer: free-text evidence handles cannot become
  authoritative domain guidance.
- Schema Implementer: record grammar, normalization, invalid states, and
  identity must be independently implementable.
- Reference Practitioner: the workflow must be usable without confusing
  structural checks, evidence, and review.

## Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `pass`, `fail`, and `unresolved` are retained without a weighted score. | P3 | Record manifest and identity | Test all three outcomes and mixed records. |
| 2 | The default unresolved outcome avoids favorable preselection. | P3 | Interface and lifecycle | Confirm browser initialization never changes it to pass or fail. |
| 3 | A changed closure request can leave the displayed result in place and risks attaching evidence to stale controls. | P2 | Interface and lifecycle | Disable new evaluation recording when any closure input differs from the executed request; mark any receipt stale until an explicit rerun. |

## Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The record consistently attributes outcomes to the user. | P3 | Claim boundary | Prefix receipt outcomes with `You recorded`. |
| 2 | `fully-recorded` can be misread as substantively complete. | P2 | Record manifest and identity | Keep an adjacent, always-visible `not reviewed or verified` qualifier in every profile. |
| 3 | A pass must never change the base `incomplete`, `truncated`, or `contradictory` state. | P2 | Claim boundary | Assert exact result state and SHA before and after record creation. |

## Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Separate result and evaluation identities preserve custody. | P3 | Record manifest and identity | Display both in Full and retain both in canonical JSON. |
| 2 | Timestamp and evaluator identity are correctly absent from this privacy-bounded slice. | P3 | Record manifest and identity | Do not add ambient clock, account, or device fields. |
| 3 | Evidence references have no declared verification status inside each record. | P2 | Record manifest and identity | Add `evidenceStatus: user-declared-unverified` as an immutable field on every record. |

## Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Source retrieval and authority inference are explicitly excluded. | P3 | Inputs and binding | Retain the source link only for the canonical check-owning view. |
| 2 | Evidence text may contain sensitive or regulated details even without persistence. | P2 | Inputs and binding | Put a non-sensitive-input warning beside every form and test that no input reaches storage, URL, network, clipboard, or download. |
| 3 | A recorded pass may conflict with authoritative domain review. | P2 | Claim boundary | State that future qualified review can reject or revise every local outcome. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Field lengths, enums, sorting, canonical JSON, and digest algorithm are specified. | P3 | Inputs and identity | Add valid partial/full fixtures and structured invalid cases. |
| 2 | “Visible characters” is not an independently precise normalization rule. | P2 | Inputs and binding | Define accepted text as Unicode scalar text excluding C0/C1 controls and line separators after whitespace normalization. |
| 3 | Stale check IDs need both result membership and result-identity preconditions. | P2 | Inputs and binding | Require the exact bound result SHA in the builder request and browser form state. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Evidence reference, observation, outcome, and rationale form a recognizable evaluation worksheet. | P3 | Interface and lifecycle | Lead with human labels and keep exact IDs in Full. |
| 2 | Requiring complete fields for an explicitly included unresolved check prevents empty ritual records. | P3 | Inputs and binding | Preserve field-specific errors and focus the first invalid field. |
| 3 | Partial coverage and unrecorded checks must remain obvious after submission. | P2 | Interface and lifecycle | Keep recorded/total coverage and the exact unrecorded list visible in every profile. |

## Synthesis

Roles reviewed: 6

P1 blockers: 0 | P2 issues: 10 | P3 notes: 8

Verdict: APPROVED

Top finding: evidence must remain bound to the exact executed result even when
the visible closure controls are later edited.

Cross-role consensus: a fully populated local record is still unverified,
unreviewed, noncanonical, and unable to change the structural result.

## Amendments

1. Add exact closure-control staleness behavior: disable recording after any
   result-changing control edit, retain a stale receipt, and require rerun.
2. Add immutable `evidenceStatus: user-declared-unverified`, exact text-
   character rules, and exact bound-result preconditions to every record.
3. Make unreviewed status, partial coverage/unrecorded checks, privacy warning,
   and result-state invariance visible and testable in every profile.

## Closure

All ten P2 conditions are closed in the amended specification and sim-29
implementation. Pure checks cover each outcome, mixed and partial records,
normalization, invalid and stale inputs, exact identity, and immutable base
state. Generated-site and live-browser checks confirm source custody, default
unresolved controls, full and partial receipts, always-visible qualification,
profile invariance, input and closure staleness, exact result-state and digest
invariance, new-Run and reload clearing, and storage/network absence. The
active-wave result review retains every claim and privacy boundary above.
