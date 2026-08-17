---
skill: roles-check
topic: tables-alphabetical-index
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Tables Alphabetical Index Roles Check

## Artifact identification

Type: dictionary browse architecture proposal.

Domain signals: headwords, canonical ownership, alphabetical ordering,
classification, routing, book hierarchy, and responsive publication.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Alphabetical access is a primary headword-discovery route. |
| Reference Architecture Editor | Tables browse and Reader contents must remain distinct paths over one authority. |
| Concept & Taxonomy Boundary Editor | The index must not turn curated or adjacent records into semantic classes. |
| Mapping Integrity Auditor | Index classes and owner counts must preserve exact source custody. |
| Reference Practitioner | The route must support quick scanning and direct opening. |
| Schema Implementer | Membership, sort, counts, anchors, and links need deterministic checks. |
| Product Owner | The slice must improve dictionary browse without displacing the books. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Chapter-first Browse does not behave like a dictionary headword index. | P2 | route | Add a dedicated alphabetical Tables route. |
| 2 | Specialized views should not compete as top-level headwords. | P2 | membership | Index canonical owners and show owned-view counts. |
| 3 | Occupied-letter navigation reduces scanning cost. | P3 | letters | Emit exact letter anchors and links. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Renaming chapter contents as Tables browse mixes product roles. | P2 | hierarchy | Keep Index and Contents as distinct routes. |
| 2 | Guides and Reader records must not enter the canonical index. | P2 | membership | Exclude and retain their existing routes. |
| 3 | A new page must reuse dedicated entry destinations rather than copy content. | P3 | authority | Project links and metadata only. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Curated records could be mistaken for canonical families. | P2 | sections | Separate and label them explicitly. |
| 2 | Alphabetical neighbors do not establish related concepts. | P2 | boundary | State that ordering is presentational only. |
| 3 | Empty letters should not imply missing taxonomy coverage. | P3 | letters | Show occupied letters only. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Canonical and curated class membership must be exact. | P2 | inputs | Derive classes from edition-local reference-backed custody. |
| 2 | View counts must reflect exact ownership, not search matches. | P2 | counts | Count all 95 canonical views by owner. |
| 3 | Every row must retain one selected destination. | P3 | links | Validate targets and duplicate-free paths. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Browsing 18 chapters is costly when the headword is approximately known. | P2 | reader job | Provide title-first A-Z scanning. |
| 2 | Eighty equal cards would create a long noisy page. | P2 | layout | Use compact letter groups and rows. |
| 3 | Domain and view count help choose without copying summaries. | P3 | rows | Show bounded metadata. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Sort and letter derivation need a canonical normalization rule. | P2 | ordering | Use invariant normalized selected titles. |
| 2 | Coverage must partition canonical, curated, Guide, and Reader classes. | P2 | checks | Assert exact 53/27/9/1 class outcomes and exclusions. |
| 3 | Route rewrites must remain edition-specific. | P3 | compatibility | Preserve sim-34 byte identity. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Dictionary browsing is a recognizable Tables job not served by Reader parts. | P2 | value | Add one focused index page. |
| 2 | Facets, recommendations, or semantic clusters exceed this browse job. | P2 | scope | Stop at deterministic A-Z plus exact metadata. |
| 3 | Internal mechanics cannot prove the index is preferred or faster. | P3 | claims | Defer reader-value claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: separate canonical Tables A-Z browse from Reader/book contents.

Cross-role consensus: project exact headword custody without semantic meaning
or copied content.

## Amendments

1. Generate a dedicated exact A-Z route with canonical families primary.
2. Separate curated records and exclude Guides/Reader material.
3. Preserve Contents, validate routing and responsive layout, and regress sim-34.

## Fixed-point result

All fourteen P2 findings are closed in `sim-35`: 53 canonical families appear
once under 17 occupied letters, exact owned-view counts sum to 95, 27 curated
records stay separate, specialized views/Guides/Reader records are excluded,
title order and anchors are deterministic, Index and Contents routes remain
distinct, mobile has no overflow, and `sim-34` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No semantic adjacency, completeness, findability,
preference, or preview claim is admitted.
