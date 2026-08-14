# Pulse 07 Portable Packet Role Review

Date: 2026-08-13

Artifacts reviewed: `specs/PORTABLE-PACKET.md`, `src/packet.rs`,
`tools/verify_packet.py`, `tests/packet.rs`, `docs/ONBOARDING.md`, and
`artifacts/factor-v1`.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | The packet carries declared schemas and bounded interpretation; it does not universalize the chosen decompositions. |
| Experimental Methodologist | pass | Null-capable decision fields, all aliases and controls, every frozen split, and complete denominators remain in the packet. |
| Representation Control Auditor | pass | The independent verifier rejects alias divergence and requires every strong conventional factored owner. |
| Data Split & Leakage Auditor | pass | Corpus and split identities are chained, every example reference is checked, and template transfer remains explicitly overlapping. |
| Evidence & Claims Editor | pass | README, result, packet, and onboarding text repeat the synthetic semantic-only boundary. |
| Benchmark Numeracy Checker | pass | The verifier retains all 49 result records and checks exact fractions rather than rounded scores. |
| Research Integrity & Provenance | pass after findings | Producer source, model, schema, corpus, split, result, file, and packet identities are explicit and independently recomputed. |
| Schema Implementer | pass | Canonical schema files are included directly; consumers need no FACTOR parser to inspect or hash them. |
| Benchmark Consumer | pass after findings | The packet embeds its MIT license, instructions, and standard-library verifier and validates without Cargo, network access, or FACTOR imports. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| FPK-001 | critical | A manifest could validate listed files while silently admitting stale extra files. | Closed: both verifiers enforce the exact closed-world file set. |
| FPK-002 | major | The first draft required a verifier outside the packet. | Closed: `verify_packet.py` is embedded and hashed inside the packet. |
| FPK-003 | major | Producer identity initially omitted the CLI and packet serializer. | Closed: the producer digest covers Cargo lock data and all Rust semantic/export owners. |
| FPK-004 | major | File hashes alone would not prove semantic custody chains. | Closed: the independent verifier recomputes schema declarations and checks corpus, split, reference, result, alias, control, and decision relationships. |
| FPK-005 | major | A consumer could need Rust dependencies or private repository state. | Closed: Python 3 standard library is the only onboarding dependency. |
| FPK-006 | major | Regeneration into an old directory could preserve obsolete artifacts. | Closed: export rejects every nonempty target. |
| FPK-007 | major | License and claim boundaries could be separated from evidence. | Closed: both are packet files covered by the manifest. |

## Fixed point

Pulse 07 and the method-foundation wave are complete. Packet
`70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9`
passes both the Rust validator and an embedded independent Python verifier. No
critical or major finding remains open.
