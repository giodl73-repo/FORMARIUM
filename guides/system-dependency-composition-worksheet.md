# Report Generator Dependency Composition Worksheet

Guide ID: `system-dependency-composition-worksheet`

Status: candidate simulation Factor Guide

Trace ID: `system-dependency-interface`

Review: fixed point at
[`composition-worksheet-roles-check-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/composition-worksheet-roles-check-2026-08-16.md),
with design review at
[`composition-worksheet-design-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/composition-worksheet-design-2026-08-16.md)

## Local problem and decision

A report-generation service must read stored documents through a separate
document service. The design review needs to decide which system concepts must
be considered together so the relationship is not represented as an
undirected line or mistaken for component ownership.

Decision: whether the supplied facts support treating the report generator as
the source of a directional dependency, the document service as its target,
and the versioned request/response boundary as the interface contract that
must be reviewed with that dependency.

Intended reader: a software or systems practitioner reviewing a small service
interaction before implementation or change approval.

## Scope and non-goals

This synthetic worksheet rehearses one declared Composition Query over the
current six-edge Composition Lab allowlist. It demonstrates traceability and reading
form, not automatic graph discovery.

It does not select an architecture, prove availability or security, inspect
implementation, infer unstated relations, certify the services, or establish
that readers can use the method successfully. The result is a noncanonical
local guide; the linked entry and Constraint Table retain reference authority.

## Local evidence

These facts are supplied by the synthetic problem, not by Factorium:

- system of interest: the deployed report-generation service;
- viewpoint: runtime document retrieval and failure propagation;
- selected boundary: report-generation process and its owned adapters;
- external participant: a separately deployed document service;
- dependency source: report generator;
- dependency target: document service;
- required property: retrieve a stored document through the declared API;
- condition: a report request names a document the caller may access;
- consequence: the report cannot be completed when retrieval fails;
- interface: a versioned request/response API with participants, document
  identifier, response schema, direction, authorization expectation, timeout,
  and failure behavior;
- effective time: the reviewed deployment and API versions.

Unknown here: observed reliability, ownership agreement, authentication
mechanism, schema compatibility evidence, timeout values, retry policy,
service-level objective, and operational test results.

## Local Context Profile declaration

Profile: `synthetic-system-review`

Status: candidate, worksheet-local

Applicability: a synthetic review of one directional interaction between two
software services under an explicitly selected runtime viewpoint and system
boundary.

Exclusions: physical coordinate analysis, organizational authority,
jurisdiction, production approval, measured performance, and any service or API
version not named by a later real use.

Fixed defaults: none. The profile does not invent a boundary, viewpoint,
version, owner, or operational condition.

Convention: relation arrows point from the relying source to the relied-on
target; interface and dependency versions are recorded exactly rather than
treated as latest.

| Context field | Selection | Why it is visible |
|---|---|---|
| Boundary | `declared-system` | Dependency and component assignments change when the selected system changes. |
| Viewpoint | runtime interaction and failure propagation | The same services may receive different roles in ownership or deployment views. |
| Reference frame | `not-applicable` | No physical or coordinate frame affects this scenario; the field is resolved rather than silently omitted. |
| Version | reviewed service and API versions | Interface compatibility and effective dependency claims are version-bound. |

Permitted overrides: a local use may replace the boundary, viewpoint, or
version only by showing the replacement beside the affected dependency and
interface records. Changing direction requires a separate relation assertion,
not an override.

Invalidation and conflict: the profile does not apply when the boundary or
viewpoint is absent, when source and target cannot be distinguished, when the
interaction version is unknown but material, or when a local declaration
conflicts with the admitted relation direction.

Authority and custody: the selections are synthetic author declarations for
this worksheet. A real use must name its model owner and review revision. This
local profile is not a repository-global default, a reusable supported profile,
or a new canonical Context Profile.

## Seed and sense narrowing

| Alternative | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|
| `dependency` | [System Composition](../tables/entries/system-composition-dependency.md) | One subject relies directionally on another for a required property | selected | Source, target, condition, and failure consequence are supplied |
| `interface` | [System Composition](../tables/entries/system-composition-dependency.md) | The services exchange requests and responses under a versioned contract | selected | It owns how the dependency is exercised, not why reliance exists |
| `component` | [System Composition](../tables/entries/system-composition-dependency.md) | The document service is outside the selected process boundary | rejected | Connection and use do not establish part-whole or ownership semantics |
| `capability` | [System Composition](../tables/entries/system-composition-dependency.md) | Report generation is an outcome that the dependency supports | retained-option | Capability review would require beneficiary, measure, and broader supporting elements |
| `environment` | [System Composition](../tables/entries/system-composition-dependency.md) | The target service is external in this selected view | retained-option | It matters to the broader model but is not traversed by the admitted F1 relation |
| generic relationship | [System Composition](../tables/entries/system-composition-dependency.md) | The connection has directional reliance and a failure consequence | rejected | The more specific dependency contract is supported |

The machine trace begins at the factor
`dependency-source-target-and-direction`. The selected `dependency` and
`interface` senses explain that factor-level seed and its joined target; they
do not create extra edges.

## Declared composition

The operator words below are reading aids. They are not arithmetic or inferred
semantic operations.

| Step | Reader operation | Typed trace action | Result |
|---|---|---|---|
| 1 | Add | Admit the dependency source/target/direction factor as the required seed | One depth-zero required node |
| 2 | Multiply | Follow admitted relation `f1-dependency-interface` in its declared forward direction | Add the interface-contract factor with the exact seed predecessor |
| 3 | Evaluate | Apply the System Composition Integrity Constraint view | Check the supplied dependency and interface fields |
| 4 | Flatten | Project the selected nodes into the local guide below | Preserve context, direction, source IDs, and declared loss |

Closure Policy: follow required and evaluative nodes only, forward through
admitted typed relations, stop on stable identity, and do not expand Markdown
links or lexical similarity. Budgets are three nodes, one edge, depth one, and
nine units of declared work.

## Working graph

```text
[dependency source, target, and direction]
  -- f1: depends-on / required-interaction -->
[interfaces and interaction contracts]
  -- evaluated in -->
[System Composition and Architecture Integrity Constraints]
```

| Node | Class | Depth | Origin | Predecessor |
|---|---|---:|---|---|
| `factor:system-composition-dependency/dependency-source-target-and-direction` | required | 0 | seed | none |
| `factor:system-composition-dependency/interfaces-and-interaction-contracts` | required | 1 | `relation:f1-dependency-interface` | dependency factor |
| `view:constraint-system-composition-integrity` | evaluative | 1 | `scope:f1-dependency-interface` | dependency factor |

No optional or provenance branch is expanded. No unresolved frontier or
conflict is hidden. This is closure under the declared one-edge policy, not a
claim that the entire architecture has been modeled.

## Evaluation

Declared check: `interface-integrity`, kind `constraint`, target
[System Composition and Architecture Integrity Constraints](../tables/constraints/system-composition-integrity.md).

| Constraint | Supplied evidence | Worksheet outcome |
|---|---|---|
| `SC-06` interface | participants, exchanged identifiers and response, API version, direction, authorization expectation, timeout, and failure behavior are named | pass at declared structural level |
| `SC-07` dependency | source, target, required retrieval property, request condition, failure consequence, and effective versions are named | pass at declared structural level |

The outcome means the worksheet contains the fields required by these two
candidate constraints. It is not evidence that the real interface works, that
the dependency is acceptable, or that any reliability, security, or
compatibility target is met.

Closure state: `complete` for this exact trace. A missing required context,
excluded required node, failed check, conflict, or unresolved frontier would
invalidate that label.

## Flattened Factor Guide projection

### Recommended factorization

Represent the interaction with two non-equivalent records joined by an exact
directional relation:

1. a dependency assertion owned by the report generator's reliance on document
   retrieval; and
2. an interface contract owned by how the report generator and document
   service exchange that retrieval request and its result.

Do not replace either record with the other, and do not classify the external
document service as an internal component from connection alone.

### Factor and mechanism assignment

| Canonical factor | Local role | Candidate record or mechanism | Required condition | Validation evidence |
|---|---|---|---|---|
| `dependency-source-target-and-direction` | relationship | dependency record: report generator -> document service | direction and identities are explicit | review record contains both endpoints |
| `interfaces-and-interaction-contracts` | relationship/boundary | versioned API contract | participants, payload, direction, version, and failure behavior are explicit | interface review covers `SC-06` |
| selected boundary and viewpoint | context | architecture review header | system boundary and runtime viewpoint remain visible | worksheet Context Profile section |
| authority, provenance, and effective time | provenance | review revision and service/API versions | assertions are not reused outside their effective versions | unresolved until real records are supplied |

These are local candidate assignments, not generated schemas or implementation
instructions.

### Required controls

- Preserve dependency direction; model reverse reliance as a separate assertion.
- Keep the external target outside the selected component boundary.
- Version the interface contract and dependency assertion independently.
- Record failure consequences separately from timeout or retry mechanisms.
- Re-evaluate the dependency when boundary, viewpoint, required property, or
  interface version changes.
- Treat missing operational evidence as unresolved, never as a passing runtime
  result.

### Projection loss

| Projected item | Disposition | Declared loss |
|---|---|---|
| dependency factor | selected | retained |
| interface factor | selected | retained |
| Constraint view | selected | omits full diagnostic detail |

The flattened guide omits the complete Constraint Table body from this page;
the canonical linked view retains it.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| Document data moves inside the report process boundary | component and dependency assignments must be reconsidered | document identity and report request purpose |
| The document service calls back into the report generator | add a separately supported reverse dependency or interaction | original forward dependency does not become symmetric |
| The API version changes incompatibly | interface contract and all dependent uses require review | dependency source and target identities may remain |
| Retrieval becomes optional enrichment | dependency condition and failure consequence change; required classification may no longer apply | interface can still exist |
| Only an unlabeled architecture line is supplied | evaluation fails `SC-06` and `SC-07` | no permissive defaults fill missing direction or contract |
| Review goal changes to organizational ownership | component/environment assignments may pivot with the viewpoint | canonical dependency and interface senses retain their meanings |

## Rejected shortcuts and unresolved choices

Rejected:

- `connected = component`;
- `interface = dependency`;
- treating the dependency as symmetric;
- expanding every cross-reference into required closure;
- treating a structurally complete worksheet as an operational approval.

Unresolved until a real review supplies evidence:

- authoritative service owners and review authority;
- exact API and service versions;
- authentication and authorization contracts;
- timeout, retry, idempotency, and degradation policy;
- compatibility, reliability, security, and operational test results.

## Exact trace manifest

Canonical trace file: `fixtures/composition/system-dependency.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `7f0ae1879dfba6148fdc3b31d0fc30a9a5140c406bb8341e62bf19db07bf1218` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `7a1a5d29121b925c6ae9d6e9ddf5d840522c6274df92f86ace0ef862fde93fc0` |

Trace inventory: one seed, three working nodes, one admitted edge, zero
frontiers, zero conflicts, one passed declared check, three projection rows,
and state `complete`.

The trace can be checked without the renderer:

```powershell
cargo run --quiet -- composition-query-check fixtures\composition\system-dependency.factorium-query reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium
```

## Canonical sources and custody

1. [System Composition, Architecture, Capability, Interface, and Dependency](../tables/entries/system-composition-dependency.md)
2. [System Composition and Architecture Integrity Constraints](../tables/constraints/system-composition-integrity.md)
3. Relation `f1-dependency-interface` in
   `reference/factorium-relations-v0.factorium`
4. [Composition Query Trace V0](../specs/COMPOSITION-QUERY.md)
5. [Factor Guide Format V0](../specs/FACTOR-GUIDE.md)

This worksheet's local scenario and assignments are synthetic author material.
The canonical sources retain their own provenance and maturity.
