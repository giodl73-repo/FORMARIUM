---
skill: roles-check
topic: tables-canonical-family-search
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Tables Canonical-Family Search Roles Check

## Artifact identification

Type: search projection proposal.

Domain signals: canonical ownership, lookup, grouping, ranking, filters,
navigation, URL state, and responsive publication.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Search must expose intended owners without inventing semantic relations. |
| Reference Architecture Editor | Grouping must retain one canonical authority and independently addressable views. |
| Concept & Taxonomy Boundary Editor | A visual family can be mistaken for a universal taxonomy. |
| Mapping Integrity Auditor | Every view-to-owner projection needs exact direction and scope. |
| Reference Practitioner | The change must reduce reconstruction during lookup. |
| Schema Implementer | Ownership fields and grouping need deterministic fail-closed checks. |
| Product Owner | The slice must earn value without becoming Workbench scope. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Flat view results obscure which concept owns a specialized distinction. | P2 | default view | Group specialized matches under their exact canonical entry. |
| 2 | Calling ownership a thesaurus hierarchy would overstate its semantics. | P2 | labels | Use Table family and Owning Table language only. |
| 3 | Readers still need direct access to one precise specialized record. | P3 | alternate view | Preserve the ranked all-records projection. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Copying owner summaries into search would create another content authority. | P2 | family header | Link and name the canonical owner; render matched record summaries only. |
| 2 | A family must not absorb curated records, Guides, or Reader records under a false owner. | P2 | grouping | Keep each noncanonical record a clearly labelled standalone group. |
| 3 | Search grouping should not alter source, chapter, or page identity. | P3 | compatibility | Keep the projection edition-local. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Chapter or lexical grouping could imply an unjustified taxonomy. | P2 | admitted inputs | Use canonical ownership only. |
| 2 | Family membership must not imply broader/narrower or subtype meaning. | P2 | boundary | State that family means publication ownership. |
| 3 | Group counts could look like completeness claims. | P3 | counts | Count current matches, not total possible members. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | View-to-owner is directional and does not make the view equivalent to the entry. | P2 | mapping | Retain member identity and exact owner link. |
| 2 | Owner metadata must resolve to a selected search destination. | P2 | generation | Fail if any of the 95 mappings cannot resolve. |
| 3 | Grouping after filtering must not add a nonmatching owner to the result count. | P3 | filtering | Distinguish family heading context from matched records. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A specialized hit currently requires opening it to discover the owning concept. | P2 | result card | Show the owner in the search result family. |
| 2 | A forced grouped view can slow exact-record lookup. | P2 | controls | Offer a persistent all-records result view. |
| 3 | Dense families can overwhelm narrow screens. | P3 | layout | Use compact members and test at 390 pixels. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Search records do not currently declare publication ownership. | P2 | index | Add edition-local class, owner path, title, and destination fields. |
| 2 | Client-side grouping must preserve every matched record exactly once. | P2 | checks | Assert lossless deterministic partitioning. |
| 3 | URL state needs a closed vocabulary. | P3 | state | Admit only families or records and default invalid values safely. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The recognizable job is understanding a hit's owning concept before opening it. | P2 | value | Limit the slice to ownership-aware results. |
| 2 | Multi-concept closure or inferred relations would turn search into premature Workbench. | P2 | scope | Do not execute, compose, or expand a query. |
| 3 | Internal mechanics cannot prove grouping is preferred or faster. | P3 | claims | Defer usability claims to readers. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: group only by exact canonical publication ownership.

Cross-role consensus: preserve direct record identity and never present owner
grouping as semantic hierarchy or automatic composition.

## Amendments

1. Generate exact edition-local owner metadata and fail on unresolved owners.
2. Group after ranking and filtering with lossless coverage and a flat mode.
3. Keep labels, counts, URL state, responsive behavior, and claims bounded.

## Fixed-point result

All fourteen P2 findings are closed in `sim-33`: ownership metadata covers all
95 specialized views, family grouping is a lossless deterministic partition,
filters and ranking precede grouping, owner context does not inflate matches,
the prior flat list remains available, noncanonical records stay standalone,
URL state is bounded, the 390-pixel browser route has no overflow, and
`sim-32` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No findability, preference, semantic hierarchy, automatic
composition, or preview claim is admitted.
