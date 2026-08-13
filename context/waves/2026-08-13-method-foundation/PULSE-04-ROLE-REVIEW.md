# Pulse 04 Schema Parser Role Review

Date: 2026-08-13

Artifacts reviewed: `Cargo.toml`, `src/lib.rs`, `src/main.rs`,
`specs/SEMANTIC-FACTOR-SCHEMA.md`, valid and invalid fixtures, and parser/CLI
tests.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | The parser enforces the bounded flat categorical contract without claiming that it captures ambiguity, nesting, or a unique semantic analysis. |
| Experimental Methodologist | pass | Valid and structured invalid fixtures exercise success, missing assignments, ordering, unknown values, duplicate values, transport normalization, and unused packed patterns. |
| Representation Control Auditor | pass | Every meaning receives one exact ordinary packed alias; decode reconstructs the canonical assignments and rejects unused ordinals. |
| Data Split & Leakage Auditor | pass | The parser does not render surfaces or construct splits, preserving the semantic-first boundary for Pulse 05. |
| Evidence & Claims Editor | pass | CLI output reports schema/document identities and structure only; it makes no model, generalization, runtime, or hardware claim. |
| Benchmark Numeracy Checker | pass | Factor widths, offsets, total logical bits, meaning counts, and digest kinds remain explicit. |
| Research Integrity & Provenance | pass | Canonical schema bytes and complete document bytes have distinct SHA-256 identities. |
| Schema Implementer | pass | Grammar and semantic failures are fail-closed, canonical writing is deterministic, and the CLI provides a focused conformance command. |
| Benchmark Consumer | pass | The library and CLI use only the public schema contract and one pinned hashing dependency. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| FPC-001 | critical | Windows CRLF checkout could make valid fixtures fail while canonical hashes require LF. | Closed: CRLF is admitted only as transport, normalized before validation and hashing, while bare CR remains invalid. |
| FPC-002 | major | “Schema hash” could ambiguously include meanings in combined files. | Closed: `schema_sha256` hashes declarations through the last `end-factor`; `document_sha256` hashes the complete canonical file. |
| FPC-003 | major | Non-power-of-two factors could decode unused ordinal patterns as valid values. | Closed: packed decode rejects every ordinal outside the declared value list and rejects nonzero high bits. |
| FPC-004 | major | Manual fixture inspection did not establish executable interoperability. | Closed: the Rust parser/writer, canonical round trips, invalid fixtures, and CLI smoke tests now own conformance. |
| FPC-005 | major | Parser recovery or permissive spacing could normalize malformed input silently. | Closed: blank lines, tabs, duplicate spaces, malformed declarations, assignment disorder, unknown values, and incomplete meanings fail closed. |

## Fixed point

Pulse 04 is complete. The Rust implementation is a conformance owner for
Semantic Factor Schema v1, not an NLP framework. No critical or major finding
remains open.
