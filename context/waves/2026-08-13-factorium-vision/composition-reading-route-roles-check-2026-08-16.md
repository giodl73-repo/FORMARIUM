---
skill: roles-check
topic: composition-reading-route
date: 2026-08-16
roles_used: 9
p1_count: 0
verdict: APPROVED
---

# Composition Reading Route Role Check

Status: fixed point for a deterministic admitted-closure-to-book projection

## Artifact identification

Artifact type: reference navigation specification, browser projection runtime,
and disposable proof-site rehearsal. Domain signals: compositional closure,
page deduplication, graph-to-book mapping, canonical authority, source custody,
interaction, and claim limits.

## Selected roles

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | Checks that navigation does not add semantic neighbors or reinterpret graph roles. |
| Factorization Method Steward | Checks that deduplication retains distinct factors and constraints. |
| Evidence & Claims Editor | Checks that structural order is not promoted into recommendation or reader evidence. |
| Reference Architecture Editor | Checks that routes strengthen rather than duplicate the book. |
| Concept & Taxonomy Boundary Editor | Checks that navigation does not reopen named-concept enumeration. |
| Research Integrity & Provenance | Checks exact source, result, binding, and prior-edition custody. |
| Mapping Integrity Auditor | Checks graph-to-page direction, cardinality, and projection loss. |
| Reference Practitioner | Checks readable defaults and useful access to the full entries. |
| Schema Implementer | Checks complete grammar, deterministic order, and fail-closed behavior. |

## Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Adding search matches could silently expand the working semantics. | P3 | Input set | Project admitted graph nodes only. |
| 2 | `Continue` could imply a newly inferred relation. | P3 | Stage labels | Define it only as another anchor page already required by an admitted node. |
| 3 | Two factors on one page could be collapsed into one semantic item. | P3 | Deduplication | Preserve both exact factor IDs and graph roles. |

## Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Page-level deduplication could erase the selected pivot. | P3 | Start | Retain which binding was the seed. |
| 2 | Evaluative scope could collapse into the anchor factorization. | P3 | Evaluate | Keep specialized views as a distinct final stage. |
| 3 | A rejected required factor could disappear from repair work. | P3 | Conflict | Keep its page link and mark its binding rejected. |

## Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Ordered pages can look like a tested recommendation. | P3 | Claims | Call the order structural and deterministic, not useful or optimal. |
| 2 | A successful live browser run can look like reader validation. | P3 | Preflight | Limit evidence to runtime, links, and layout mechanics. |
| 3 | The route can look like a generated Factor Guide. | P3 | Boundary | State that it is navigation and has no evidence or publication authority. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Copying entry excerpts into route cards would create content drift. | P3 | Cards | Link human page titles and keep canonical content on existing pages. |
| 2 | Identifier-heavy cards would recreate the original readability problem. | P3 | Defaults | Show stage and page title first; put graph metadata under disclosure. |
| 3 | A separate route page would fragment the composition workflow. | P3 | Placement | Append the route after Flatten in the same local result. |

## Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Search-based suggestions could restart open-ended concept enumeration. | P3 | Binding boundary | Bind only exact F1-F6 artifacts. |
| 2 | Familiar neighboring pages could appear solely because names match. | P3 | Non-goals | Prohibit lexical and popularity expansion. |
| 3 | Page routes could be mistaken for new canonical senses. | P3 | Authority | Keep all route records noncanonical and page-owned. |

## Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A route could outlive the result that produced it. | P3 | Custody | Record the exact local result SHA-256 in route data. |
| 2 | Page bindings could drift from reviewed source bytes. | P3 | Payload | Repeat and compare reference and relation digests. |
| 3 | A shared runtime edit could rewrite prior evidence. | P3 | Regression | Preserve exact `sim-16` identities with explicit edition gating. |

## Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Factor-to-whole-entry links are a coarser mapping. | P3 | Destination | State page-level ownership and retain the exact factor ID as disclosed loss context. |
| 2 | Many graph nodes may map to one page. | P3 | Cardinality | Deduplicate by destination while retaining every source binding. |
| 3 | A conflict disposition could be normalized away. | P3 | Binding records | Preserve selected/rejected separately for each artifact. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Raw artifact IDs do not give a practical next action. | P3 | Card heading | Lead with linked book-page titles. |
| 2 | Full graph custody can overwhelm the result. | P3 | Detail | Collapse exact bindings by default with native disclosure. |
| 3 | Readers need to know why each page is present. | P3 | Explanations | Give one sentence for Start, Continue, and Evaluate. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Partial bindings would force fallback guesses. | P3 | Payload validation | Require exactly 12 endpoint and six scope artifacts. |
| 2 | Node order could change page order. | P3 | Canonical projection | Sort stages, titles, destinations, and artifact bindings explicitly. |
| 3 | Duplicate artifact or conflicting destination custody is ambiguous. | P3 | Invalid cases | Reject duplicates and inconsistent page records. |

## Synthesis

Roles reviewed: 9

P1 blockers: 0 | P2 issues: 0 | P3 notes: 27

Verdict: APPROVED

Top finding: navigation must be a projection of admitted closure, never an
implicit second graph expansion through search, naming, or popularity.

Cross-role consensus: the book remains authoritative when route cards lead
with human page titles, exact graph custody remains inspectable, and ordering
is described as structural rather than recommended or empirically validated.

## Amendments

1. Bind exactly the 18 reviewed endpoint/scope artifacts to existing pages and
   fail closed rather than fall back to search.
2. Deduplicate by destination while preserving factor identity, seed/required/
   evaluative role, conflict disposition, and source/result digests.
3. Present a compact Start/Continue/Evaluate route after Flatten, retain local
   deletion semantics, and deny ranking, guide, publication, or reader claims.

All amendments are applied. No critical or major finding remains open.
