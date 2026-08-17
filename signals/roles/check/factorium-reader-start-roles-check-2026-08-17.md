---
skill: roles-check
topic: factorium-reader-start
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Factorium Reader Primary Start Roles Check

## Artifact identification

Type: book-entry handoff proposal. Domain signals: teaching sequence,
publication priority, exact route custody, support material, and onboarding.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | The start must land on the exact selected headword. |
| Reference Architecture Editor | Primary book entry and support routes need coherent hierarchy. |
| Concept & Taxonomy Boundary Editor | First in a teaching route must not imply conceptual primacy. |
| Mapping Integrity Auditor | The CTA maps manifest record 01 to a generated destination. |
| Reference Practitioner | The strongest action should perform the task its label promises. |
| Schema Implementer | Destination and retained alternatives require exact checks. |
| Product Owner | The repair must reduce demonstrated friction without onboarding expansion. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Primary Start does not open the first selected headword. | P2 | handoff | Target record 01. |
| 2 | The button label must use the selected title. | P2 | custody | Derive Purpose from search custody. |
| 3 | Preserve the full Table destination. | P3 | authority | Do not create a lesson copy. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Support orientation currently outranks the book sequence. | P2 | hierarchy | Make step 1 primary. |
| 2 | Quickstart should remain available as optional orientation. | P2 | routes | Keep it secondary. |
| 3 | Retain all other Reader actions. | P3 | compatibility | Change one action only. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “First” could imply canonical or conceptual primacy. | P2 | meaning | Tie first only to Reader order. |
| 2 | Purpose must not become a prerequisite claim. | P2 | boundary | Preserve editorial-order statement. |
| 3 | Other records retain equal canonical authority. | P3 | scope | Do not add rank language. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A literal page path could drift from the manifest. | P2 | source | Resolve record 01 dynamically. |
| 2 | Selected title and href must remain paired. | P2 | target | Use one edition-local record. |
| 3 | Live arrival should expose step identity. | P3 | round trip | Check step 1 of 24. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The strongest action currently does not begin reading. | P2 | task | Open Purpose directly. |
| 2 | Orientation remains useful for readers who want it. | P2 | choice | Keep Quickstart visible. |
| 3 | Avoid an intermediate chooser or modal. | P3 | effort | Use direct links. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Record 01 must exist in selected custody. | P2 | validation | Fail closed if absent. |
| 2 | Historical output must not change. | P2 | compatibility | Gate to sim-38. |
| 3 | Assert action order and exact hrefs. | P3 | checks | Add static/browser tests. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Primary-start alignment is a recognizable broken reader job. | P2 | value | Repair the CTA. |
| 2 | Tours, state, and new lessons exceed the repair. | P2 | scope | Change one action only. |
| 3 | Internal routing cannot prove preference or learning. | P3 | claims | Defer value claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: the Reader's primary start does not enter its Reader sequence.

Cross-role consensus: derive a direct step-one action while retaining optional
orientation and all authority boundaries.

## Amendments

1. Resolve the primary label and destination from exact manifest record 01.
2. Retain Quickstart and all other actions as secondary routes.
3. Verify live arrival, sim-37 compatibility, and no additional state.

## Fixed-point result

All fourteen P2 findings are closed in `sim-38`: the primary action derives
exact manifest record 01 and opens Purpose as Reader step 1; Quickstart and all
other routes remain visible and exact; no state is added; mobile has no
overflow; and `sim-37` reproduces exactly. Final verdict: PASS.
