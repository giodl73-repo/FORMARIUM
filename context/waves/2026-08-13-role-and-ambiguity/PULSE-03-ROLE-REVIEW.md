# Pulse 03 Role and Ambiguity Fixtures Review

Date: 2026-08-13

Artifacts reviewed: transfer and attachment schema fixtures,
`src/role_fixtures.rs`, `tests/role_fixtures.rs`,
`specs/ROLE-AMBIGUITY-FIXTURES.md`, and CLI tests.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Ordered recipient slots, equal fillers, instrument readings, and patient-associated-object readings remain distinct complete analyses. |
| Experimental Methodologist | pass after findings | Two exhaustive constrained families and five ordinary/one transfer split designs retain fixed rules and materially different failure modes. |
| Representation Control Auditor | pass | Fixtures contain no representation-dependent membership or target; all controls will compile the same ordinals and candidate sets. |
| Data Split & Leakage Auditor | pass after findings | Ordinary splits group complete families and candidates; disambiguation overlap is complete, intentional, and separately labeled. |
| Evidence & Claims Editor | pass | The specification limits evidence to generated role and ambiguity custody. |
| Benchmark Numeracy Checker | pass | Meaning, family, surface, candidate, train, test, overlap, and identity counts reconcile exactly. |
| Research Integrity & Provenance | pass after findings | All payloads are generated in-repo; schema, frame, corpus, analysis, and split identities are chained and frozen. |
| Schema Implementer | pass | Both fixtures parse through the V1 schema owner and constraints are applied before corpus admission. |
| Benchmark Consumer | pass | `factor role-fixtures` emits compact identities and the normative specification explains every selection rule. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| RAF-001 | critical | An attachment surface could be assigned one preferred reading and erase ambiguity. | Closed: every ambiguous surface retains exactly the two complete constrained candidates. |
| RAF-002 | major | Equal fillers could collapse giver and recipient bindings. | Closed: transfer meanings retain separate giver, primary, and secondary factor ordinals even when values match. |
| RAF-003 | major | Invalid attachment Cartesian combinations could enter the corpus. | Closed: generation admits only exactly-one-non-none assignments before analysis construction. |
| RAF-004 | major | Explicit paraphrases or candidate meanings could leak across ordinary splits. | Closed: whole analysis families and all candidates are disjoint on ordinary splits. |
| RAF-005 | major | Familiar atoms could hide absent role/filler pairs. | Closed: every ordinary split validates atom and pairwise coverage over all candidate meanings. |
| RAF-006 | major | Surface-disambiguation transfer could be misreported as unseen semantics. | Closed: family and candidate overlap are complete, with singleton train surfaces and ambiguous test surfaces. |
| RAF-007 | major | Adding Wave 2 source could invalidate the accepted V1 packet release. | Closed: the committed packet identity is tested independently; later producer revisions receive new identities instead of rewriting V1. |
| RAF-008 | major | Third-party semantic payloads could add uncontrolled transformations. | Closed: both families and every surface are generated entirely in FACTOR. |

## Fixed point

Pulse 03 is complete. The fixtures are admitted for Pulse 04 binding controls.
No critical or major finding remains open.
