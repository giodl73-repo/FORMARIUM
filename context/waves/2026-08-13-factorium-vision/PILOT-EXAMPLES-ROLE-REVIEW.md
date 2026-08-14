# Factorium Pilot Examples Role Review

Date: 2026-08-13

Artifacts reviewed: `tables/INDEX.md`, five new example entries, the existing
environment and security examples, and the access-control composite.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | The entries declare senses, factors, constraints, and derived outputs without claiming one universal ontology. |
| Experimental Methodologist | defer | These are editorial pilots, not empirical comparisons; future promotions require declared evaluation evidence where outcomes are claimed. |
| Representation Control Auditor | defer | No representation-performance claim is made; the OO entry compares mechanism assignments qualitatively. |
| Data Split & Leakage Auditor | defer | No corpus, training set, or split is introduced. |
| Factorization Method Steward | pass after findings | Examples expose competing lenses, pivots, constraints, and derived outputs rather than presenting flat universal products. |
| Reference Lexicographer | pass after findings | Broad headwords separate senses; specialized multiword situations receive direct lookup entries. |
| Reference Architecture Editor | pass after findings | The index compares widths, derived decisions, and lessons without duplicating canonical entry definitions. |
| Evidence & Claims Editor | pass | All new entries remain candidates and name required source-review boundaries. |
| Benchmark Numeracy Checker | defer | Widths are descriptive editorial counts; no quantitative benchmark result is claimed. |
| Research Integrity & Provenance | pass | Motivating experience is identified where relevant; normative legal, security, and operations claims are deferred pending cited review. |
| Cross-Paradigm Mapping Auditor | pass after findings | OO mechanisms are assignments of general roles and are not generalized into every domain. |
| Domain Source Reviewer | defer | Specialized entries remain `candidate` until authoritative security, legal, operations, architecture, and prioritization sources are reviewed. |
| Schema Implementer | defer | The pilot remains Markdown-first; canonical graph interchange and generated indices are not yet specified. |
| Benchmark Consumer | defer | The pilot is a reference artifact rather than a benchmark packet. |
| Reference Practitioner | pass after findings | Each entry starts from a recognizable decision and exposes use conditions and failure signs. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| FPE-001 | critical | Severity, retention date, access decision, or priority could be modeled as independent input factors. | Closed: each is explicitly derived from an input composite and policy. |
| FPE-002 | major | Repeating `x` lists could imply mathematical independence or valid full Cartesian products. | Closed: every entry includes constraints and the graph contract defines `x` as jointly considered variation only. |
| FPE-003 | major | Examples could omit the privileged pivot and therefore hide the actual design decision. | Closed: alternative lenses name pivots or explicitly state when no single pivot is preferred. |
| FPE-004 | major | OO inheritance mechanisms could leak into general factor-role definitions. | Closed: the OO entry separates discovered factors from later mechanism assignment. |
| FPE-005 | major | Deployment identity could duplicate the broader environment entry. | Closed: deployment is declared `NARROWER-THAN` the governed-deployment sense and links it. |
| FPE-006 | major | Weighted scores could conceal veto conditions and uncertainty. | Closed: prioritization and severity entries keep confidence, urgency, impact, and non-compensable constraints visible. |
| FPE-007 | major | Legal or security examples could appear normative before source review. | Closed: maturity remains `candidate` and each entry states its review boundary. |
| FPE-008 | major | Unlinked factor words could appear canonical merely because they are printed in a table. | Closed: every pilot entry carries a visible unresolved-candidate status until graph review. |
| FPE-009 | major | A list of files would not help readers compare the examples. | Closed: the pilot index exposes sense, width, derived output, and principal lesson. |
| FPE-010 | major | Cross-domain pilot entries had no dedicated gate for authoritative legal, security, operations, or architecture sourcing. | Closed: the Domain Source Reviewer is now mandatory; unsourced entries remain `candidate`. |
| FPE-011 | major | Manually copied widths and summaries in the index could drift and become a second authority. | Closed: the index is explicitly a non-normative pilot projection; entries remain canonical until an interchange format can generate indices. |

## Fixed point

The full `.roles` panel confirms that the examples are suitable as editorial
pilots. Domain-source, schema, benchmark, and empirical roles remain explicitly
deferred rather than silently passed. The entries are not promoted to
established Factorium guidance. No critical or major finding remains open.
