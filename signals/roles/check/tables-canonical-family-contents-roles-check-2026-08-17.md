---
skill: roles-check
topic: tables-canonical-family-contents
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Tables Canonical-Family Contents Roles Check

## Artifact identification

Type: canonical entry navigation proposal.

Domain signals: publication ownership, reciprocal navigation, view families,
ordering, progressive disclosure, local links, and responsive layout.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Entry pages must expose available distinctions without false thesaurus relations. |
| Reference Architecture Editor | Canonical entries and specialized projections must retain one authority. |
| Concept & Taxonomy Boundary Editor | Owned views can be mistaken for a subtype taxonomy. |
| Mapping Integrity Auditor | Owner-to-view projection needs exact endpoints and direction. |
| Reference Practitioner | The list must reduce lookup work without overwhelming the entry. |
| Schema Implementer | Coverage, ordering, and zero-view behavior must be deterministic. |
| Product Owner | The slice must complete the lookup loop without adding content or Workbench scope. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Canonical pages do not expose their specialized distinctions near the entry point. | P2 | placement | Add exact owned views to the navigator. |
| 2 | The list could be read as narrower terms. | P2 | label | Call them specialized views owned by this Table. |
| 3 | View-family names help distinguish the lookup question. | P3 | members | Retain exact family labels beside titles. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A copied view description would create summary drift. | P2 | projection | Project only title, family, and link. |
| 2 | Non-entry pages must not appear to own siblings. | P2 | coverage | Render the list on canonical entry pages only. |
| 3 | Canonical reference order is preferable to a new presentation ranking. | P3 | order | Preserve source order exactly. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Publication ownership does not establish a subtype hierarchy. | P2 | semantics | State the ownership-only boundary beside the list. |
| 2 | Inferred neighbors would turn the list into an unjustified taxonomy. | P2 | inputs | Admit reference-owned views only. |
| 3 | The zero-view entry should not imply missing editorial work. | P3 | zero state | Omit empty family UI rather than show an incomplete state. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Owner-to-view navigation must not imply inverse equivalence. | P2 | mapping | Keep view identity and scoped family visible. |
| 2 | Every projected view must resolve to one selected page. | P2 | validation | Fail generation on unknown or duplicate destinations. |
| 3 | Source order is part of the edition projection. | P3 | custody | Assert exact ordered paths for representative families. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers currently leave the entry to discover available views. | P2 | reader job | Put the full owned set in the entry navigator. |
| 2 | Eight views can dominate a mobile entry before its definition. | P2 | density | Fold families of four or more by default. |
| 3 | Small families should remain immediately scannable. | P3 | density | Open one-to-three-view families by default. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Owner buckets require stable ordered accumulation. | P2 | generation | Build ownership and order from the canonical reference, resolving labels through selected destinations. |
| 2 | Coverage must include all 95 views exactly once. | P2 | checks | Assert entry, view, link, and duplicate counts. |
| 3 | Empty and dense thresholds need explicit fixtures. | P3 | checks | Test zero, sparse, and eight-view owners. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The recognizable job is moving from a concept to its available scoped lookup forms. | P2 | value | Complete the reciprocal owner/view loop. |
| 2 | Adding descriptions, recommendations, or inferred members would exceed the job. | P2 | scope | Keep the projection to exact custody links. |
| 3 | Internal traversal mechanics cannot prove reader value. | P3 | claims | Defer lookup-success and preference claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: expose all exact owned views without presenting ownership as a
semantic hierarchy.

Cross-role consensus: preserve view identity, source order, bounded density,
and entry-only ownership.

## Amendments

1. Generate ordered owner buckets from canonical reference metadata only.
2. Render all and only exact views with sparse/dense progressive disclosure.
3. Validate coverage, zero state, responsive behavior, regression, and claims.

## Fixed-point result

All fourteen P2 findings are closed in `sim-34`: all 95 views appear once in
reference order under 52 exact owners, the zero-view entry stays empty of
fabricated UI, non-entry pages own no family contents, titles and links resolve
through selected destinations, sparse/dense disclosure is bounded, mobile has
no overflow, and `sim-33` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No taxonomy, completeness, discoverability, preference, or
preview claim is admitted.
