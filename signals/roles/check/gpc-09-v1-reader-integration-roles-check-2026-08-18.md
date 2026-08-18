---
skill: roles-check
topic: gpc-09-v1-reader-integration
date: 2026-08-18
roles_used: 8
p1_count: 0
verdict: APPROVED
---

# GPC-09 V1 Reader Integration Roles Check

Status: fixed point for candidate publication

## Phase 1 — artifact identification

Artifact type: versioned reference/assurance migration, generated catalogs,
book supplement, static search/site projection, tests, and release-custody
plan. Domain signals: schemas, compatibility, navigation, provenance,
lexicography, search, book profiles, and product evidence.

## Phase 2 — role selection

| Role | Why selected |
|---|---|
| Reference Architecture Editor | V1 must remain one canonical graph projected into Tables, Book, and site. |
| Research Integrity & Provenance | V0/V1 bytes, assurance, generated artifacts, and simulation identities require custody. |
| Mapping Integrity Auditor | The migration claims exact V0 preservation plus a bounded additive delta. |
| Schema Implementer | Parsers, generators, headers, ordering, and failure behavior change. |
| Reference Practitioner | The three records must become findable and readable through ordinary routes. |
| Product Owner | A new edition must add reader-facing value without becoming feature churn. |
| Evidence & Claims Editor | Internal rendering cannot become reader or community evidence. |
| Reference Lexicographer | Search, aliases, owner grouping, and sense boundaries must remain coherent. |

## Phase 3 — review

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | V1 retains one entry/view grammar and makes the new records ordinary members of the catalog and canonical owner graph. | P3 | migration spec | Preserve the small grammar. |
| 2 | The new Part XVIII supplement extends rather than rewrites the historical 175-record selection. | P3 | book selection | Keep `sim-48` and its supplement immutable. |
| 3 | Initial site generation read the V1 manifest but omitted its separate numbered chapter from search ownership. | P2 closed | renderer | Added the V1 selection to search and chapter construction; 188 destinations now resolve. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The freeze fixture binds V0 manifests, old catalog, old supplement, and pre-migration commit. | P3 | fixture | Verify every digest in the result checker. |
| 2 | V1 assurance covers all 54 entries, 97 views, and 11 relations with 162 bindings. | P3 | assurance | Bind the three new records to this fixed-point review. |
| 3 | V0 reference, assurance, relation, and `sim-48` supplement bytes remain exact. | P3 | compatibility | Preserve them as historical baselines. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The migration is additive: every V0 block remains and the declared delta is one entry plus two views. | P3 | V1 manifest | Mechanically compare ordered V0/V1 blocks. |
| 2 | No relation or Composition Query is silently migrated to the new source identity. | P3 | compatibility | Keep V0 query custody explicit. |
| 3 | Meaning/translation loss and custody restrictions survive Full text and Book projections. | P3 | site pages | Test mandatory phrases in generated pages. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reference and assurance parsers accept only exact V0 or V1 headers and serialize the parsed header. | P3 | Rust parser | Retain fail-closed unsupported-header tests. |
| 2 | The first generator draft used locale-dependent sorting for canonical IDs. | P2 closed | V1 generator | Replaced `localeCompare` with exact ASCII ordering. |
| 3 | Sidecar validation originally required whichever live catalog happened to be committed, preventing independent V0 custody checks after V1. | P2 closed | CLI | Sidecar check now validates source/workspace plus sidecars; `reference-check` alone owns live projections. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Meaning, reference, interpretation, use, and translation are indexed in one recognizable entry. | P3 | search | Preserve the five aliases and full-text index. |
| 2 | “Who claims to know?” and “Who may share it?” have dedicated Evidence pages grouped under Claim and Evidence. | P3 | site ownership | Keep the owner link visible. |
| 3 | Compact, Abbreviated, Book, and Full text are present; Book remains the site default. | P3 | profiles | Do not hide ambiguity, defeaters, restriction, or loss. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The integration closes a concrete visibility gap created by the prior content admission. | P3 | product plan | Admit this integration, not another content batch. |
| 2 | Three small tasks cover exactly the three new paths without modifying ranking or adding product mechanics. | P3 | tasks | Keep the rubric author-only. |
| 3 | `sim-49` adds 3 selected records, 3 search pages, and one chapter at bounded maintenance cost. | P3 | result | Stop after integration and await real reader evidence. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Passing checks establish schema, selection, search, profile, and link mechanics only. | P3 | result boundary | Claim no findability or comprehension outcome. |
| 2 | The site preserves candidate maturity and the epistemic truth boundary. | P3 | generated pages | Do not promote status during rendering. |
| 3 | Custody content disclaims permission and community endorsement rather than implying policy compliance. | P3 | custody page | Preserve use-specific qualified review. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The new anchor has a stable headword, seven ordered senses, and five sorted aliases. | P3 | V1 entry | Keep aliases navigation-only. |
| 2 | Both views retain `claim-evidence` ownership and exact sense coverage. | P3 | V1 views | Add no epistemology or culture anchor. |
| 3 | Search full text retains confused-term contrasts such as meaning/reference, standing/truth, and availability/permission. | P3 | search index | Test those contrasts rather than only titles. |

## Phase 4 — synthesis

Roles reviewed: 8
P1 blockers: 0  |  P2 issues: 0 open (3 closed)  |  P3 notes: 21

Verdict: APPROVED

Top finding: V1 is an ID-preserving additive corpus revision whose book and
website projections now include every new record without changing historical
V0 or `sim-48` bytes.

Cross-role consensus: keep V0 custody recoverable, V1 current, Tables
authoritative, search/profile behavior projective, and all reader/community
claims deferred.

## Phase 5 — amendments

1. Replaced locale-dependent canonical sorting with exact ASCII ordering.
2. Separated source/sidecar validation from current generated-projection
   validation so V0 remains independently checkable after live catalogs move.
3. Added the V1 supplement to numbered search selection and site chapters,
   then made all affected coverage counts edition-aware.

All amendments are present. No critical or major actionable finding remains.
