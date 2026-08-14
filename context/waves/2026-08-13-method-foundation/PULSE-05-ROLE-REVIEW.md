# Pulse 05 Compositional Fixtures Role Review

Date: 2026-08-13

Artifacts reviewed: `src/corpus.rs`, `tests/splits.rs`, CLI fixture tests,
`specs/COMPOSITIONAL-SPLITS.md`, and the V1 schema fixtures.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Navigation tests attribute recombination; event tests ordered roles, repeated participants, tense, polarity, and active/passive realization without treating the schemas as universal language analyses. |
| Experimental Methodologist | pass after findings | Two materially different exhaustive families, three semantic split types, one explicit transfer split, deterministic identities, and retained rejected IID logic provide discriminating custody. |
| Representation Control Auditor | pass | Corpus and split construction occur before representation benchmarking; no encoding receives privileged membership or surfaces. |
| Data Split & Leakage Auditor | pass after findings | Non-transfer splits group every paraphrase by meaning, template transfer declares overlap, and atom/pair coverage is executable. |
| Evidence & Claims Editor | pass | The specification limits the result to synthetic fixture custody and makes no model or language claim. |
| Benchmark Numeracy Checker | pass | Meaning, surface, train, test, overlap, schema, corpus, and split identities reconcile exactly. |
| Research Integrity & Provenance | pass | V1 is fully generated in-repo with no copied third-party payload; generator and selection identities are frozen. |
| Schema Implementer | pass | Corpora consume only parsed schema identities and explicit ordinal vectors. |
| Benchmark Consumer | pass | `factor fixtures` emits a compact reproducible custody summary without requiring internal benchmark code. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| FSP-001 | critical | The initial IID rule used declaration ordinal modulo four and removed one complete `count × polarity` pair from navigation training. | Closed: membership now uses frozen semantic FNV-1a hashing; the coverage validator rejects the original rule. |
| FSP-002 | major | Event paraphrases could leak the same meaning across ordinary train/test splits. | Closed: all surfaces of one meaning are grouped for IID, lexical, and cross-feature splits. |
| FSP-003 | major | Template transfer could hide semantic overlap and look like unseen-meaning generalization. | Closed: overlap is explicit, complete, and admitted only for active-to-passive transfer. |
| FSP-004 | major | Navigation alone would repeat the narrow Squarebit fixture. | Closed: the event family adds ordered agent/patient roles, repeated entities, tense, polarity, and two surface templates. |
| FSP-005 | major | Familiar atoms alone would not prevent unseen test pairs. | Closed: every test factor/value pair must co-occur in training for all non-transfer splits. |
| FSP-006 | major | Corpus text or split identities could drift independently of schemas. | Closed: schema, corpus, surface, and split SHA-256 identities are separate and chained in canonical custody records. |
| FSP-007 | major | External benchmark payloads could introduce unrecorded licenses or transformations. | Closed: V1 uses only generated FACTOR-owned fixtures; external datasets remain methodological references. |

## Fixed point

Pulse 05 is complete. The fixture suite is admitted for Pulse 06's
representation and strong-control bakeoff. No critical or major finding remains
open.
