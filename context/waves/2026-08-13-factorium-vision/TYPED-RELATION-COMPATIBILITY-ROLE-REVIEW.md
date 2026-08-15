# Typed Relation Compatibility Plan and Result Review

Status: fixed point for bounded prototype

## Plan review

Scope was limited to the two pre-50-anchor scaling gates identified by the
Factor Forge portfolio review: typed relation compatibility and machine-bound
review coverage. The plan explicitly excluded V0 edits, full-corpus migration,
Workbench implementation, and promotion of candidate content.

Planned artifacts:

- current external evidence signal;
- bounded compatibility research and decision;
- active-wave status updates;
- validation of unchanged V0 reference behavior.

## Result review

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Relation kinds retain direction and scope; qualifiers do not become universal semantic factors. |
| Factorization Method Steward | pass | The proposal is derived from six concrete batches and seven acceptance queries rather than an abstract graph vocabulary. |
| Evidence & Claims Editor | pass | Standards are architecture controls, not claims that Factorium implements or conforms to RDF, PROV, SHACL, or SPDX. |
| Reference Architecture Editor | pass after finding | Two sidecars preserve one V0 metadata owner and keep Markdown as publication authority. |
| Research Integrity & Provenance | pass | Local requirements and official external sources are reconstructable; the standards-to-design inference is explicit. |
| Domain Source Reviewer | pass | The study changes no domain claim or maturity. |
| Mapping Integrity Auditor | pass after finding | Direction, inverse policy, scope, qualifiers, and external-reference boundaries are explicit. |
| Schema Implementer | pass for design | The candidate records, compatibility rules, and acceptance queries are implementable without changing V0. |
| Reference Practitioner | defer | Query usefulness must be tested by the bounded prototype and later Sieve/volume use. |

Implementation adds deterministic relation and assurance parsers, six F1-F6
edge templates, eighteen exact-source review bindings, a combined validation
command, and committed failure tests for unknown endpoints and stale reviews.

Roles governing experiments, splits, representation controls, equations, and
benchmark consumption defer because this slice changes none of those
artifacts.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| TRC-001 | critical | An in-place V0 expansion would invalidate canonical identity without a migration contract. | Closed: V0 remains unchanged; experimental sidecars reference its stable IDs. |
| TRC-002 | major | A generic edge could hide direction, scope, and invalid reverse inference. | Closed: stable edge ID, kind, source, target, scope, qualifier contract, and inverse policy are required. |
| TRC-003 | major | One qualifier schema could collapse domain-specific condition, authority, time, confidence, and applicability. | Closed: each relation kind owns only its required qualifiers. |
| TRC-004 | major | A review-path link could remain green after source edits. | Closed: assurance bindings require exact source-byte SHA-256 and fail stale. |
| TRC-005 | major | External graph standards could displace Factorium's compact canonical reference without demonstrated need. | Closed: they inform properties and remain optional projections. |
| TRC-006 | major | A paper design could be mistaken for an implemented scaling gate. | Closed: the bounded parser, manifests, command, and failure tests implement seven representative checks. |
| TRC-007 | major | Representative fixtures could be reported as complete corpus coverage. | Closed: the specification and status retain full-corpus relation and review coverage as open scaling gates. |
| TRC-008 | major | A dangling endpoint or stale review could pass because the files remain syntactically valid. | Closed: workspace validation resolves every endpoint and rejects exact-source digest mismatches. |

No critical or major finding remains open for the bounded prototype. FFP-005
and FFP-008 have concrete implementation evidence but remain open scaling
gates until coverage expands beyond the representative F1-F6 fixture.
