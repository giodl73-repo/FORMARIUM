---
skill: roles-check
topic: factorium-reader-sequence
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Factorium Reader Sequence Navigation Roles Check

## Artifact identification

Type: contextual book-navigation proposal.

Domain signals: teaching order, canonical pages, sequence mapping, route
boundaries, publication ownership, and responsive navigation.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Navigation must preserve exact headword destinations and not imply lexical relations. |
| Reference Architecture Editor | Two sequences must coexist without duplicating authority or confusing book structure. |
| Concept & Taxonomy Boundary Editor | Previous/next order must not become a prerequisite or semantic taxonomy. |
| Mapping Integrity Auditor | The navigator maps exact manifest positions to selected pages. |
| Reference Practitioner | The repair should reduce the immediate cost of continuing the teaching route. |
| Schema Implementer | Membership, boundaries, counts, and destinations need fail-closed checks. |
| Product Owner | The slice must repair a demonstrated reader job without adding progress software. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Global next can move from a Reader step to an unrelated headword. | P2 | flow | Add exact Reader previous/next links. |
| 2 | Link labels must retain selected titles without paraphrase drift. | P2 | custody | Use edition-local record titles. |
| 3 | Keep the complete Table page as the destination. | P3 | authority | Add navigation outside source content. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A contents route without continuous reading navigation is an incomplete book path. | P2 | route | Add one panel to spine pages. |
| 2 | Reader and global pagination could conflict. | P2 | hierarchy | Label both sequences distinctly. |
| 3 | Do not fork entry pages or copy prose. | P3 | projection | Reuse one canonical destination. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Previous/next could imply conceptual adjacency. | P2 | boundary | State editorial teaching order only. |
| 2 | Step numbers could imply prerequisite truth or mastery. | P2 | meaning | Call them Reader positions, not levels. |
| 3 | Non-spine records must remain equal in canonical authority. | P3 | scope | Avoid secondary-authority labels. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Every panel must map one exact manifest position. | P2 | inputs | Reuse parsed frozen order. |
| 2 | First and last boundaries must not wrap or invent destinations. | P2 | edges | Assert 23 links per direction. |
| 3 | Part labels must follow authored 6/6/5/4/3 boundaries. | P3 | grouping | Validate exact part membership. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Returning to Reader contents after every step creates avoidable work. | P2 | task | Put continue controls on the page. |
| 2 | The existing unlabeled global sequence can produce a false continuation. | P2 | clarity | Make both sequence names visible. |
| 3 | Back-to-Reader should remain available at every step. | P3 | recovery | Provide one stable contents link. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Panel selection must fail closed against manifest drift. | P2 | membership | Require exact 24 unique paths. |
| 2 | Historical pages must not change. | P2 | compatibility | Gate the panel and stylesheet to sim-37. |
| 3 | Counts and all targets require independent checks. | P3 | validation | Assert 24/24/23/23 and exclusions. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Continuous Reader flow is a recognizable job broken by current navigation. | P2 | value | Repair only the selected sequence. |
| 2 | Progress storage and personalization are not required for continuation. | P2 | scope | Use static links only. |
| 3 | Internal mechanics do not establish learning success. | P3 | claims | Defer reader-value claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: Reader steps currently hand off into the wrong sequence.

Cross-role consensus: add exact static continuation while keeping canonical
pages, global order, and meaning boundaries intact.

## Amendments

1. Generate one Reader-position panel on each exact manifest-selected page.
2. Preserve exact previous/next boundaries and distinguish the global sequence.
3. Add independent structural/browser checks and exact sim-36 regression.

## Fixed-point result

All fourteen P2 findings are closed in `sim-37`: exactly 24 selected pages
carry panels with exact step and part positions, 24 contents returns, 23 exact
previous links, and 23 exact next links. The other 161 indexed pages carry no
panel, the existing global order is visibly and accessibly separate, mobile
has no overflow, and `sim-36` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No prerequisite, dependency, semantic adjacency, progress,
mastery, teaching-value, preference, or preview claim is admitted.
