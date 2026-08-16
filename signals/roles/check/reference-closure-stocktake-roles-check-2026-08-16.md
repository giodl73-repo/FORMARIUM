---
skill: roles-check
topic: reference-closure-stocktake
date: 2026-08-16
roles_used: 7
p1_count: 0
verdict: APPROVED
---

# Roles Check: Reference Closure Stocktake

Artifact: `docs/research/2026-08-16-reference-closure-stocktake.md`

Artifact type: reference-architecture stocktake and bounded F27 proposal.

Domain signals: typed semantic relations, editorial navigation, closure,
concept ownership, mapping direction, selection, evidence, and decision use.

## Selected roles

- Compositional Semantics Steward: distinguishes valid typed composition from
  convenient graph expansion.
- Reference Architecture Editor: checks whether the current entries form a
  coherent book and whether the proposed bridge creates duplicate authority.
- Concept & Taxonomy Boundary Editor: guards the decision slice against a
  method, framework, or named-option catalog.
- Evidence & Claims Editor: bounds what structural metrics and simulations can
  establish.
- Mapping Integrity Auditor: checks cross-entry direction, qualification,
  cardinality, and loss.
- Schema Implementer: checks whether the stocktake algorithm and output can be
  reproduced without guessing.
- Reference Practitioner: checks whether F27 ends in a recognizable, bounded
  lookup and guide task.

## Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Editorial links and reviewed semantic edges are kept as separate graphs. | P3 | Method | Preserve this distinction in tooling and summaries. |
| 2 | The proposed choice gap could be mistaken for a proven canonical decomposition. | P2 | Choice as distinct from rule-derived decision | Mark the sense/anchor decision as a research question with explicit falsification conditions. |
| 3 | Repeated exact labels are correctly treated as ambiguity candidates rather than shared identities. | P3 | Sense and role binding | Require an explicit binding disposition before traversal. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The canonical inventory in `ROADMAP.md` and `CONTEXT.md` is stale relative to the measured reference. | P2 | Observed inventory | Synchronize current-state summaries while retaining historical rehearsal counts. |
| 2 | The report correctly leaves new-anchor versus separated-sense ownership unresolved. | P3 | Recommended F27 boundary | Resolve ownership before drafting content to avoid duplicate decision authority. |
| 3 | A book-first authored guide is the appropriate integration proof. | P3 | Complete authored guide route | Keep software as a projection and test of the authored route. |

## Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Named techniques and catalogs are explicitly excluded. | P3 | Recommended F27 boundary | Retain examples as replaceable illustrations. |
| 2 | Alternative, criterion, preference, and trade-off could become a bag of adjacent vocabulary. | P2 | Choice as distinct from rule-derived decision | State an inclusion rule and a stopping boundary for the research question. |
| 3 | Raw unresolved counts and graph degree are rejected as admission criteria. | P3 | Recommended F27 boundary | Preserve recurrence, centrality, reader need, or batch necessity as gates. |

## Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Counts and radius behavior are reproducible from retained sources. | P3 | Observed inventory | Keep exact denominators adjacent to percentages. |
| 2 | “Connected” can be overread as semantic connectivity. | P2 | Observed inventory | Always qualify it as editorial Markdown-link connectivity. |
| 3 | The claim boundary correctly excludes semantic completeness and reader success. | P3 | Claim boundary | Retain the boundary in roadmap and wave summaries. |

## Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Cross-entry candidates require exact endpoints, direction, qualifications, and owner custody. | P3 | Cross-entry relation custody | Preserve these as admission fields. |
| 2 | Cardinality, version, inverse behavior, and declared loss are not all named. | P2 | Cross-entry relation custody | Add them to the minimum relation packet. |
| 3 | Join-owned evaluation prevents endpoint review from verifying a mapping implicitly. | P3 | Join-owned evaluation | Require an independently fail-able check for each admitted join. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The checker emits a versioned structured JSON result and validates endpoint ownership. | P3 | Method and reproduction | Retain the schema tag and fail-closed reference checks. |
| 2 | Regex extraction assumes already valid canonical inputs and is not itself a grammar validator. | P2 | Method | State the prerequisite and assert file headers and complete entry boundaries. |
| 3 | Editorial-link normalization and radius rules are reproducible but should remain deliberately narrow. | P3 | Method | Count only canonical entry-source Markdown targets and ignore fragments for identity. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The report tells the reader whether content, joins, or traversal is missing. | P3 | Missing layers | Preserve this layered diagnosis in the F27 plan. |
| 2 | “A generic decision problem” is not yet a recognizable guide task. | P2 | Recommended F27 boundary | Name one bounded synthetic task without asserting it is representative. |
| 3 | The proposed guide remains usable as a book artifact without Composition Query. | P3 | Complete authored guide route | Make the authored guide the primary deliverable and software the verification path. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 7 | P3 notes: 14

Verdict: APPROVED

Top finding: the current reference is editorially connected but has no
reviewed cross-entry semantic relation, so cross-links cannot be promoted into
closure edges.

Cross-role consensus: F27 should prove a very small, explicitly bounded
relation-and-guide slice before any broad relation expansion.

## Amendments

1. Add falsification and taxonomy stopping rules for the proposed choice gap,
   plus one bounded synthetic guide task.
2. Add cardinality, version, inverse, and loss requirements to every candidate
   cross-entry relation packet.
3. State validated-input prerequisites, strengthen checker boundary assertions,
   and synchronize current roadmap/reference counts.

## Closure

All seven P2 conditions are closed. The amended report makes the choice gap
falsifiable, states its inclusion and stopping rules, names one bounded
synthetic task, and expands relation packets to cardinality, version, inverse,
and loss. The checker now asserts exact headers and terminators, unique IDs,
view ownership, and factor endpoints on inputs already validated by the
canonical reference commands. `ROADMAP.md` and `CONTEXT.md` carry the measured
current counts, and the active wave records the bounded result and claim
boundary. Focused closure, canonical reference, sidecar, `.roles`, and diff
checks pass.
