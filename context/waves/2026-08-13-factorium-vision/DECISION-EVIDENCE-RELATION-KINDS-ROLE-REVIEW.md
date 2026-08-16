# Decision and Evidence Relation Kinds Role Review

Status: fixed point for candidate grammar publication

## Scope

- `specs/DECISION-EVIDENCE-RELATION-KINDS.md`
- five parser-supported decision/evidence relation kinds
- one five-record positive fixture and five structured invalid fixtures
- canonical sidecar and Composition Lab non-admission regressions

## Dispositions

| Role | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Parser recognition, edge admission, and traversal remain separate states; no inverse or endpoint discovery is inferred. |
| Factorization Method Steward | pass after findings | Five governing relations retain distinct qualifier contracts and no partial constraint record is accepted. |
| Reference Architecture Editor | pass | Canonical relation and assurance sidecars remain byte-identical while grammar growth is externally visible. |
| Evidence & Claims Editor | pass after findings | Fixtures establish syntax, canonicalization, endpoint resolution, and fail-closed behavior only. |
| Mapping Integrity Auditor | pass after findings | Direction and exact lexical qualifier sets are tested; missing, extra, duplicate, unordered, and inverse-looking cases fail. |
| Schema Implementer | pass | Stable enum identifiers, external fixtures, canonical round trips, and workspace endpoint validation require no guesswork. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| DEK-001 | major | Parser support could be mistaken for a canonical edge. | Closed: specification, code comments, fixtures, and regression tests distinguish accepted kinds from admitted records. |
| DEK-002 | major | Candidate qualifiers could be mistaken for local evidence. | Closed: the contract states that values carry no local records and discover no endpoint. |
| DEK-003 | major | Reverse traversal could invent an inverse. | Closed: every kind declares no implied inverse and an inverse-looking kind fixture is rejected. |
| DEK-004 | major | Combined human labels could leave implementers guessing keys. | Closed: all five exact, lexically sorted key sets are normative. |
| DEK-005 | major | Supported kinds could accidentally become required canonical coverage. | Closed: workspace validation retains a separate six-kind F1-F6 required set. |
| DEK-006 | major | Composition Lab could widen with parser vocabulary. | Closed: the canonical sidecar remains six records at its exact prior digest, so its allowlist and projections remain unchanged. |
| DEK-007 | major | A successful round trip could be overclaimed as semantic safety. | Closed: the claim boundary is syntax, canonicalization, endpoint resolution, and covered invalid classes only. |
| DEK-008 | major | Qualifier order could differ across implementations. | Closed: positive records use lexical order and the unordered fixture fails. |
| DEK-009 | major | Constraint applicability, authority, period, status, or version could be omitted. | Closed: the parser requires the complete five-key set and rejects partial records. |
| DEK-010 | major | Inline-only tests could hide interchange behavior. | Closed: six external fixture documents accompany four integration tests. |
| DEK-011 | major | Grammar acceptance could force simultaneous admission of five edges. | Closed: the later admission gate is per exact record and separately decides traversal exposure. |

No critical or major finding remains open for grammar-only publication. No
candidate relation record is admitted by this review.
