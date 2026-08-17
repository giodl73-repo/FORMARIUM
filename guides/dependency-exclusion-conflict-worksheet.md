# Dependency Exclusion Conflict Composition Worksheet

Guide ID: `dependency-exclusion-conflict-worksheet`

Status: candidate simulation Factor Guide

Trace ID: `dependency-exclusion-conflict`

Review: fixed point; see
[`subtract-conflict-design-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/subtract-conflict-design-2026-08-16.md)
and
[`subtract-conflict-roles-check-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/subtract-conflict-roles-check-2026-08-16.md)

## Local problem and decision

A synthetic report generator depends on a document service. A reviewer asks to
keep the dependency in scope but remove the interface contract from the review
because it is considered an implementation detail.

Decision: can the interface concept be subtracted while the required service
dependency remains, or does that request make the declared closure
contradictory?

Intended reader: an architecture, assurance, or product practitioner deciding
whether a requested simplification preserves enough structure for review.

## Scope and non-goals

This is a synthetic publication rehearsal. The generator, service, dependency,
and exclusion request are invented. The worksheet does not assess a real
architecture, require that every dependency use the same documentation form,
or claim that all interfaces must be public.

It tests the `subtract` operator and `contradictory` trace state. Subtract is a
recorded exclusion request, not set arithmetic. When the requested target is
required by an admitted edge, the target remains visible and the request
becomes an explicit conflict.

## Local evidence

| Local item | Supplied | Missing or deliberately withheld |
|---|---|---|
| Dependency | report generator relies on document service | required property, availability condition, consequence, time scope, and stable identities |
| Interaction | some request/response interaction must occur | exchanged items, contract, version, direction, and failure behavior |
| Exclusion request | omit interface contract concepts from this review | justification showing how dependency integrity could be checked without them |
| Architecture result | none supplied | operational evidence, compatibility result, and approval |

The supplied facts establish only the query shape. They do not show whether
the invented architecture works or whether an exclusion would be acceptable
under another declared review policy.

## Local Context Profile declaration

Profile ID: `synthetic-system-review`

Status: candidate, worksheet-local

Scope: this one dependency-review question; not a repository-global default

| Context field | Declaration |
|---|---|
| Applicability predicate | use only for the invented report-generator and document-service review |
| Inherited default | dependencies are directional and interfaces are interaction contracts, not mere adjacency |
| Convention | read reliance from report generator toward document service |
| Required selection | system boundary, dependency condition, interface participants, exchanged items, contract version, and failure behavior |
| Supplied selection | boundary = declared system; reference frame = not applicable |
| Still required | exact system identities, contract fields, version, failure consequence, and evidence basis |
| Allowed override | a reviewer may replace the interface representation if an equivalent interaction contract and its source are retained |
| Prohibited override | do not keep a required dependency while silently deleting the interaction contract needed to evaluate it |
| Invalidation | invalidate the guide if the boundary, dependency target, interaction mode, or review policy changes without rebinding |
| Custody | synthetic author-declared context; no observed architecture or participant data |

## Seed and sense narrowing

The query begins from
`factor:system-composition-dependency/dependency-source-target-and-direction`.

| Candidate sense | Disposition | Reason |
|---|---|---|
| `dependency` | selected | the generator's reliance is the retained seed |
| `interface` | required, then requested for subtraction | F1 connects required interaction to its contract; the request conflicts with that closure |
| `boundary` | retained as context | inside/outside treatment changes the interpretation of the dependency |
| `component` | rejected | reliance does not establish part-whole ownership or lifecycle |
| `capability` | alternative branch | the question does not assert an outcome the system can deliver |
| generic relationship | rejected | it would erase direction, condition, and interaction semantics |

The exclusion request does not change the canonical senses. It asks whether a
particular required working node may be removed from this trace.

## Declared composition

| Step | Reader label | Exact typed action | Guardrail |
|---:|---|---|---|
| 1 | Add | seed dependency source, target, and direction | do not infer component ownership |
| 2 | Multiply | follow F1 `depends-on` to the required interface factor and Constraint scope | join only the exact typed relation |
| 3 | Subtract | request rejection of the interface factor | retain the required node and record a conflict rather than silently deleting it |
| 4 | Evaluate | run System Composition Integrity constraints SC-06 and SC-07 | failure describes the declared graph/request combination, not a production outage |
| 5 | Flatten | project the dependency, rejected interface, and Constraint view | emit a conflict guide, not a valid architecture recommendation |

Policy: direction `forward`; follow set `evaluative-required`; stop at stable
identity. Budgets: depth 1, edges 1, nodes 3, total work 10.

## Working graph

| Artifact | Class | Depth | Origin | Predecessor |
|---|---|---:|---|---|
| dependency source, target, and direction | required seed | 0 | seed | none |
| interfaces and interaction contracts | required | 1 | F1 `depends-on` | dependency source, target, and direction |
| System Composition Integrity Constraints | evaluative | 1 | scope of F1 | dependency source, target, and direction |

Typed edge: F1 dependency **depends on** interface, qualified by
`condition=required-interaction`.

Conflict: `required-interface-exclusion` targets the required interface node
because the reader requested subtraction of that node. The node stays in the
working graph: removing it would conceal why the request cannot close under
this policy.

Closure state: `contradictory`. There is no hidden frontier and no budget stop.
The contradiction is between the retained dependency closure and the requested
interface exclusion, not a claim that the real world or canonical reference is
internally inconsistent.

## Evaluation

Declared check: `interface-integrity`, kind `constraint`, target
[System Composition Integrity Constraints](../tables/constraints/system-composition-integrity.md).

| Constraint | Supplied status | Guide consequence |
|---|---|---|
| SC-06 interface participants, exchange, contract, direction, and failure behavior | requested for removal | required interaction cannot be reviewed under this closure |
| SC-07 dependency source, target, property, condition, consequence, and time scope | only source and target are described | dependency assertion remains incomplete even before the exclusion |
| F1 required-interaction qualification | admitted | interface factor remains required while the dependency is retained |
| Exclusion alternative | no equivalent contract supplied | subtraction has no admitted substitute |

Constraint outcome: `fail` for this declared graph and request. Trace outcome:
`contradictory` because the rejected projection target is still required by F1.

Summary: **contradictory trace; no valid flattened recommendation**.

## Flattened Factor Guide projection

### Result

Do not produce a dependency review that silently omits the interaction
contract. The bounded result is:

> Retaining the declared service dependency while rejecting its required
> interface factor conflicts with the admitted F1 closure policy.

Two repair paths remain available: retain an interface or equivalent
interaction-contract record, or remove/restate the dependency and rerun the
query under a policy that accurately represents the new problem.

### Factor and record assignment

| Canonical factor or view | Local role | Requested disposition | Trace consequence |
|---|---|---|---|
| dependency source, target, and direction | retained seed | selected | requires the F1 target under current policy |
| interfaces and interaction contracts | required joined node | rejected | explicit conflict; node remains visible |
| System Composition Integrity Constraints | Evaluation | selected | failed check records why closure cannot flatten normally |

### Required repairs

| Repair path | Required record | What it changes |
|---|---|---|
| Retain interaction semantics | participants, exchanged items, contract, direction, failure behavior, and version | resolves the exclusion conflict while keeping the dependency |
| Supply an equivalent representation | mapped interaction contract with direction and loss declared | may satisfy the same requirement without one preferred document form |
| Remove the dependency assertion | revised source, target, condition, and architecture evidence | changes the seed problem and requires a new trace |
| Change review scope | explicit policy and authority for the narrower question | may produce a different query but does not retroactively complete this one |

### Projection loss

| Projection row | Disposition | Declared loss |
|---|---|---|
| dependency factor | selected | retains reliance but omits its still-missing condition and consequence details |
| interface factor | rejected | preserves the rejected request and the fact that the node remains required |
| Constraint view | selected | omits full constraint detail and does not choose a repair path |

This projection is a conflict report carried in Factor Guide form. It is not a
canonical entry, a valid architecture recommendation, or approval to omit the
interface.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| The interface contract is retained | conflict may clear after SC-06/SC-07 fields are supplied | dependency and interface remain distinct concepts |
| An equivalent contract record is supplied | mapping and loss must be evaluated | document form is not confused with interaction semantics |
| The dependency is removed with evidence | seed and graph identity change | the prior contradictory trace remains recoverable |
| The service becomes an internal component | boundary and part-whole analysis must be rerun | component membership does not erase interaction requirements automatically |
| The dependency is optional | policy and condition must be revised explicitly | optional does not mean undocumented |
| The reviewer simply hides the interface row | output becomes invalid against the trace manifest | required-node conflict remains recorded |

## Rejected shortcuts and unresolved choices

Rejected: internal-means-no-interface, dependency-without-interaction,
subtract-means-delete-history, rejected-projection-means-absent-node,
constraint-fail-means-production-failure, and contradiction-means-canonical-
inconsistency.

Unresolved: complete dependency fields, interface representation, equivalent
contract options, review authority, system identities, version, failure
behavior, and which repair path should be selected.

## Exact trace manifest

Canonical trace file:
`fixtures/composition/dependency-exclusion-conflict.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium reference V0 | `5a482db494fb415e3ce0e57e2669c460924756cdbd8d03fe979367cf478b9e8e` |
| Typed relations V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `6d8e8ecd49fb38ea1743f36c9f2de88624927207b73865b1c8d896583b69c2c6` |

Trace manifest: one seed, three nodes, one F1 edge, zero frontiers, one
required-node conflict, one failed Constraint check, three projection rows,
state `contradictory`.

The trace retains the interface node as required while its projection
disposition records the attempted rejection. Explanatory alternatives on this
page do not add machine edges or repair the conflict.

## Canonical sources and custody

1. [System Composition, Capability, Interface, and Dependency](../tables/entries/system-composition-dependency.md)
2. [System Composition Integrity Constraints](../tables/constraints/system-composition-integrity.md)
3. [Context Profile V0](../specs/CONTEXT-PROFILE.md)
4. [Composition Query Trace V0](../specs/COMPOSITION-QUERY.md)
5. [Factor Guide Format V0](../specs/FACTOR-GUIDE.md)

Canonical factors, F1 relation, constraint view, and source digests come from
the reference corpus and typed-relation sidecar. The scenario, exclusion
request, context application, conflict interpretation, and projection are
synthetic author work. No real architecture, review decision, operational
failure, or external-reader evidence is claimed.
