---
skill: roles-check
topic: composition-explicit-continuations
date: 2026-08-16
roles_used: 9
p1_count: 0
verdict: APPROVED
---

# Composition Explicit Continuations - Factorium Role Review

## Artifact identification and selection

Artifact type: deterministic next-request action schema and local UI control
mutation over an identified Composition Lab result.

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | A mechanical edit cannot become semantic repair. |
| Reference Architecture Editor | Actions must support the staged form and retain the book/result route. |
| Reference Lexicographer | Continue, repair, resolve, and recommend carry different claims. |
| Evidence & Claims Editor | A proposed edit does not predict admission or correctness. |
| Benchmark Numeracy Checker | Budget targets and maxima require exact arithmetic. |
| Mapping Integrity Auditor | Relation direction and predecessor identity determine safe edits. |
| Research Integrity & Provenance | Actions must inherit the source result and preserve stale evidence. |
| Reference Practitioner | The edit must be understandable and usable without reading raw tokens. |
| Schema Implementer | Preconditions, available states, and failure behavior must be reproducible. |

## Findings

| Role | # | Finding | Severity | Resolution |
|---|---:|---|---|---|
| Compositional Semantics Steward | 1 | Raising a bound can look like semantic repair. | P3 | Label it one possible structural edit and predict no result. |
| Compositional Semantics Steward | 2 | Adding a predecessor seed changes the question. | P3 | Require explicit activation and show the exact added concept. |
| Compositional Semantics Steward | 3 | Unselected relations must not generate suggestions. | P3 | Derive actions only from selected result decisions. |
| Reference Architecture Editor | 1 | Actions could bypass the staged form. | P3 | Mutate the visible canonical control and let the Query Plan update normally. |
| Reference Architecture Editor | 2 | Rerendering could erase the prior audit. | P3 | Keep result, map, route, and identity visible until explicit Run. |
| Reference Architecture Editor | 3 | Too many controls could dominate the book result. | P3 | Use one bounded action group inside reconciliation. |
| Reference Lexicographer | 1 | “Fix” and “resolve” overclaim outcome. | P3 | Use `Possible next-request edits`. |
| Reference Lexicographer | 2 | A generic “increase budget” hides the dimension. | P3 | Name control and exact before/after values. |
| Reference Lexicographer | 3 | Seed slugs are poor primary labels. | P3 | Bind exact predecessor through the reading vocabulary. |
| Evidence & Claims Editor | 1 | A suggested edit could imply recommendation. | P3 | State it is optional and not ranked. |
| Evidence & Claims Editor | 2 | A click could imply the problem is solved. | P3 | Report only that controls changed and require rerun. |
| Evidence & Claims Editor | 3 | Browser success is not reader evidence. | P3 | Retain Sieve/private-preview gates. |
| Benchmark Numeracy Checker | 1 | Work targets can confuse cap with observed use. | P3 | Compute from observed work plus the exact atomic shortage. |
| Benchmark Numeracy Checker | 2 | Node frontier needs can be more than one. | P3 | Count missing derived and scope nodes exactly. |
| Benchmark Numeracy Checker | 3 | Silent clamping hides an unavailable edit. | P3 | Preserve target arithmetic and mark it unavailable above maxima. |
| Mapping Integrity Auditor | 1 | Reverse traversal changes which endpoint is predecessor. | P3 | Derive predecessor from request direction while retaining canonical endpoints. |
| Mapping Integrity Auditor | 2 | A mismatched frontier could target the wrong control. | P3 | Validate relation, artifact, predecessor, and reason before action derivation. |
| Mapping Integrity Auditor | 3 | Adding scope as a seed would be invalid. | P3 | Permit only exact relation endpoints. |
| Research Integrity & Provenance | 1 | New action identity could compete with result identity. | P3 | Inherit result SHA-256 and mint no digest. |
| Research Integrity & Provenance | 2 | Applying an action could destroy the source result. | P3 | Retain it visibly and mark the plan stale. |
| Research Integrity & Provenance | 3 | Prior editions share core assets. | P3 | Add a `sim-26`-only extension and preserve `sim-25`. |
| Reference Practitioner | 1 | Raw reasons require mental translation into controls. | P3 | Lead with exact human action labels. |
| Reference Practitioner | 2 | An unavailable action can look broken. | P3 | Name the relevant maximum and require manual reconsideration. |
| Reference Practitioner | 3 | Focus movement after click would disrupt comparison. | P3 | Keep focus on the activated button and update a polite status. |
| Schema Implementer | 1 | Application without preconditions is nondeterministic. | P3 | Encode and revalidate the before-value. |
| Schema Implementer | 2 | Multiple target controls could be mutated accidentally. | P3 | Each action contains exactly one operation and target. |
| Schema Implementer | 3 | Unknown reason tokens need a closed failure mode. | P3 | Reject them rather than emit a generic action. |

## Synthesis

Roles reviewed: 9  
P1 blockers: 0 | P2 issues: 0 | P3 notes: 27

Verdict: APPROVED

Top finding: every action must be an exact single-control edit whose
before-value is revalidated at activation.

Cross-role consensus: explicit activation, exact arithmetic, no automatic run,
stale-result custody, and no-prediction language keep continuations subordinate
to the books and identified result.

## Amend

1. Encode exact mutation preconditions and drift refusal.
2. Preserve unavailable actions at UI limits with exact reasons.
3. Keep all action labels and the no-prediction boundary in every reader profile.

The reviewed contract incorporates all amendments. No P1/P2 finding remains.
