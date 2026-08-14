# Pulse 02 Role-Analysis Contract Review

Date: 2026-08-13

Artifact reviewed: `specs/ROLE-ANALYSIS-SETS.md`.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Shared fillers, roles, ordered slots, constraints, and complete alternative analyses are explicit without claiming one universal ontology. |
| Experimental Methodologist | pass | Candidate sets and analysis families are frozen before fixtures and scoring; constraints cannot be outcome-added. |
| Representation Control Auditor | pass | The contract defines semantics and custody only; no encoding is privileged before typed, TPR, factored, and HRR controls compile it. |
| Data Split & Leakage Auditor | pass after findings | Whole analysis families are ordinary split units, while the only overlap exception is a declared disambiguation transfer. |
| Evidence & Claims Editor | pass | Ambiguity, unknown values, partial meanings, and broad language claims remain distinct. |
| Benchmark Numeracy Checker | pass | Candidate counts are canonical and later precision, recall, exact-set, and per-role denominators remain available. |
| Research Integrity & Provenance | pass | Frame, corpus, and analysis identities are chained; constraints and ordering affect canonical hashes. |
| Schema Implementer | pass after findings | The grammar is finite, factor/domain compatibility is executable, and V1 meanings need no syntax change. |
| Benchmark Consumer | pass | Exact ASCII text and candidate meaning identifiers are inspectable without a FACTOR runtime. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| RAS-001 | critical | Equal value spelling across V1 factors did not formally establish shared filler identity. | Closed: role frames declare closed filler domains and require mapped factor value-set equality. |
| RAS-002 | major | Repeated roles could still be represented as duplicate keys or unordered lists. | Closed: every occurrence is an explicitly ordered slot mapped to one factor. |
| RAS-003 | major | Ambiguity could be collapsed into one selected candidate or `unknown`. | Closed: a nonempty duplicate-free candidate set is the semantic target. |
| RAS-004 | major | Cartesian schemas could admit fixture combinations with no declared interpretation. | Closed: constraints are canonical, versioned, fail closed, and evaluated before corpus generation. |
| RAS-005 | major | Candidate or paraphrase surfaces could leak between ordinary split sides. | Closed: the complete analysis family is the split unit; overlap requires a named transfer task. |
| RAS-006 | major | Surface digests alone would prevent independent inspection of ambiguous text. | Closed: Wave 2 stores exact bounded printable-ASCII text in canonical analysis documents. |
| RAS-007 | major | Candidate ordering could make equivalent sets hash differently. | Closed: candidate identifiers serialize in exact ASCII order and duplicates fail. |
| RAS-008 | major | A new analysis layer could silently alter V1 packed aliases. | Closed: frames reference immutable schema identities and do not modify meanings, ordinals, or payloads. |

## Fixed point

Pulse 02 is specification-complete. Pulse 03 may implement generated fixtures
and conformance owners. No critical or major finding remains open.
