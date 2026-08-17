---
skill: roles-check
topic: factorium-reader-route
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Factorium Reader Route Roles Check

## Artifact identification

Type: two-book publication-route proposal.

Domain signals: teaching sequence, canonical authority, entry custody,
navigation, application Guides, and responsive publication.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Reader steps must return to recognizable canonical headwords and senses. |
| Reference Architecture Editor | The teaching companion needs a distinct route without copying Table authority. |
| Concept & Taxonomy Boundary Editor | Editorial order must not become semantic hierarchy or prerequisite taxonomy. |
| Mapping Integrity Auditor | The page maps a frozen manifest into selected edition destinations. |
| Reference Practitioner | The route must make learning starts and handoffs immediately legible. |
| Schema Implementer | Membership, order, boundaries, and routes require deterministic checks. |
| Product Owner | The slice must improve a recognizable Reader job without feature or content inflation. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reader starts do not expose the complete selected headword sequence in one place. | P2 | route | Project the exact 24-record spine. |
| 2 | Copied summaries could drift from canonical senses. | P2 | authority | Link titles and bounded metadata only. |
| 3 | Each step should retain its exact record class and domain. | P3 | rows | Show custody-preserving labels. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | One book has a dedicated route while its named companion remains fragmented. | P2 | hierarchy | Add `reader.html` beside `tables.html`. |
| 2 | The mixed Contents directory cannot silently become the Reader. | P2 | navigation | Keep it as an all-destinations route. |
| 3 | Existing entry pages must remain the content authority. | P3 | projection | Reuse dedicated destinations. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Teaching order could be mistaken for broader/narrower or prerequisite meaning. | P2 | boundary | Label sequence as editorial only. |
| 2 | The remaining 151 records could appear secondary in authority. | P2 | depth | State that all canonical Tables remain peers in authority. |
| 3 | Do not grow the spine to fill visual categories. | P3 | scope | Retain exact frozen membership. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reader membership must reconstruct from the frozen manifest. | P2 | inputs | Parse exact ordered record paths. |
| 2 | Five authored parts must not change or duplicate that sequence. | P2 | grouping | Assert exact 6/6/5/4/3 coverage. |
| 3 | Every link must resolve in the selected edition. | P3 | targets | Validate local destinations. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A learner currently must choose among disconnected homepage actions. | P2 | start | Lead with one primary Reader start. |
| 2 | A 185-record directory obscures the intended 24-step learning path. | P2 | scan | Present five compact named parts. |
| 3 | Direct Tables and worked-question handoffs should remain visible. | P3 | onward paths | Add bounded action links. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The manifest grammar and selection must fail closed. | P2 | parser | Require records 01-24 with exact contiguous ordinals. |
| 2 | Route changes can break historical custody. | P2 | compatibility | Gate all additions to sim-36 and regress sim-35. |
| 3 | Exclusions and zero state require explicit assertions. | P3 | checks | Check classes, counts, links, and absent controls. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Entering the named teaching companion is a recognizable unresolved job. | P2 | value | Add the smallest complete Reader route. |
| 2 | New lessons, personalization, and progress tracking exceed this job. | P2 | scope | Stop at deterministic authored projection. |
| 3 | Internal route inspection cannot establish teaching value. | P3 | claims | Defer reader-effectiveness claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: give the named Reader companion one complete route while keeping
Tables authoritative and Contents distinct.

Cross-role consensus: project the exact frozen teaching selection without
inventing hierarchy, prerequisites, copied content, or user state.

## Amendments

1. Generate one exact five-part Reader route from the frozen 24-record manifest.
2. Preserve canonical destinations and keep Guides/support records outside the spine.
3. Make navigation reciprocal, validate responsive behavior, and regress sim-35.

## Fixed-point result

All fourteen P2 findings are closed in `sim-36`: the exact frozen 24-record
manifest appears once in exact order across five authored parts sized
6/6/5/4/3; destinations retain selected-edition custody; Guides and Reader
support records remain outside the spine; book navigation is reciprocal;
Contents remains the complete mixed directory; mobile has no overflow; and
`sim-35` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No hierarchy, prerequisite, completeness, teaching-value,
preference, or preview claim is admitted.
