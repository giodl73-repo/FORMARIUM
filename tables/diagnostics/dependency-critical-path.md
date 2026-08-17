# Dependency, Prerequisite, Blocker, Enabler, and Critical-Path Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Operational Resource, Capacity, Demand, and Allocation](../entries/operational-resource-capacity-demand.md)

Canonical senses: `operational-resource`, `capacity`, `demand`, `shortage`

## Governing question

When feasibility or completion is threatened, which dependency, prerequisite,
blocker, enabler, bottleneck, or critical path actually explains the limit?

## Diagnostic table

| Symptom | Candidate explanation | Discriminating test | Required record |
|---|---|---|---|
| work cannot start | unmet prerequisite, missing authorization, unavailable input/resource | trace exact start guard and provider state | prerequisite direction and evidence |
| work starts but stalls | dependency delay, capacity contention, missing state/message | inspect event/resource timeline and wait condition | dependency, lag, owner, consequence |
| aggregate spare capacity but unmet demand | local bottleneck, incompatibility, location/time mismatch | inspect resource vector and routing/substitution | limiting resource and loss |
| one delayed item moves completion | critical/near-critical path or resource-constrained chain | recompute with exact graph, lags, calendars, resources | graph/version/path slack |
| “blocker” removal has no effect | mislabeled dependency, another bottleneck, stale graph | counterfactual removal under same conditions | alternate path and residual |
| “enabler” appears beneficial | condition/resource is necessary, facilitating, or merely associated | test absence/presence with dependency semantics | result-relative role and evidence |
| path changes between runs | uncertain durations, resource policy, branches, calendar/version drift | freeze inputs then vary declared factors | sensitivity and tied paths |
| requirement met locally, result fails | downstream dependency/interface or whole-system constraint | trace requirement-to-outcome path | boundary and failure consequence |

## Role distinctions

| Role | Bounded meaning |
|---|---|
| dependency | directional reliance on a subject, property, service, resource, or condition |
| prerequisite | dependency that must hold before a declared transition/work/result |
| blocker | currently unsatisfied condition that prevents a declared result under the rule |
| enabler | condition/resource that permits or materially facilitates a declared result under the model |
| bottleneck | limiting capacity or constraint for the current flow/result under conditions |
| critical path | path whose timing under the declared graph/model controls the selected completion measure; ties may exist |

## Constraints

- Every role is relative to an exact result and direction.
- Sequence or path membership does not establish causal mechanism.
- Critical path retains graph, activities, dependencies, lags, calendars,
  resource assumptions, durations, uncertainty, ties, and version.
- A blocker may cease to block when the scenario, rule, substitution, or
  alternate path changes.
- An enabler is not automatically sufficient or beneficial overall.

## Limit owner test

Start with the exact flow, transition, completion measure, feasible option, or
claim that appears limited. `Bottleneck` is a result- and condition-relative
role, not a permanent identity or a synonym for every kind of limitation.

| Candidate owner | Discriminating question | Required record | Route |
|---|---|---|---|
| capacity bottleneck | Where does demand or load exceed effective compatible capacity for this flow/result under these conditions? | boundary/path, resource, capacity, demand/load, interval, conditions, utilization/shortage, result sensitivity | [Operational Resource](../entries/operational-resource-capacity-demand.md) and [Resource Allocation](../procedures/resource-allocation.md) |
| service-order delay | Is waiting determined by admission, priority, scheduling, setup, service, retry, abandonment, or starvation? | queue population, arrivals, backlog, order rule, service record, delay distribution | [Queue and Service Order](../procedures/queue-service-order.md) |
| dependency blocker | Which directed prerequisite is unsatisfied and prevents the declared transition or result? | source, target, direction, condition, state, consequence, alternate path | [System Composition and Dependency](../entries/system-composition-dependency.md) |
| critical or driving path | Which exact path controls the selected completion measure in the current schedule model? | graph, activities, dependencies, lags, calendars, durations, resources, float/driving analysis, version | [Coordinated Work](../entries/coordinated-work.md) and [Temporal Organization](../entries/temporal-organization.md) |
| binding constraint | Which applicable requirement, rule, invariant, or safety boundary makes a case invalid or option infeasible? | subject/case, authority, version, effective time, hard/soft status, applicability, result | [Policy Constraints](../constraints/policy-constraints.md) and [Feasibility and Sufficiency](../constraints/feasibility-sufficiency.md) |
| evidence limitation | Which missing, weak, inapplicable, or contradictory support prevents a stated inference or claim? | exact claim, evidence, method, implication, scope, limitation, provenance, next test | [Claim and Evidence](../entries/claim-evidence.md) and [Factor Status and Completeness](../evidence/factor-status-completeness.md) |

### Owner procedure

1. Name the selected result and the observed limit without naming its cause.
2. Classify the candidate mechanism as capacity, service order, directed
   prerequisite, schedule path, applicable constraint, or evidence support.
3. Apply the row's discriminating test under the same declared conditions.
4. Route the resulting record to its existing owner; do not infer a typed
   relation from this editorial comparison.
5. Retain alternate or tied limits, sensitivity to changed conditions, and
   unresolved evidence.

### Boundaries

- The smallest nominal capacity need not be the active bottleneck when load,
  compatibility, routing, or available capacity differs.
- A critical path is relative to an exact schedule model and selected
  milestone; a hard date constraint can make a path appear critical without
  making it the driving path.
- A binding policy, requirement, or safety constraint limits validity or
  feasibility; it is not automatically an operational capacity bottleneck.
- An evidence limitation bounds an inference or claim. It is not an
  operational blocker, and missing evidence is not evidence of falsity.
- Several limits may be tied or interacting. The test selects record owners;
  it does not rank remedies or optimize the system.

### Additional source boundary

1. IETF RFC 5136, *Defining Network Capacity*:
   https://www.rfc-editor.org/info/rfc5136/
2. W3C Recommendation, *PROV-O: The PROV Ontology*:
   https://www.w3.org/TR/prov-o/
3. [Query-led limiting-condition owner research](../../docs/research/2026-08-17-query-led-limiting-condition-owner-test.md)

RFC 5136 supplies a network-specific example of path, load, and available-
capacity relativity. PROV-O supplies provenance structure, not evidence
sufficiency. The cross-domain owner test remains a candidate Factorium
editorial synthesis.

## Sources and provenance

1. GAO, *Schedule Assessment Guide*: https://www.gao.gov/products/gao-16-89g
2. Existing System Dependency, Coordinated Work, Temporal, and Causal owners.

This view diagnoses declared records; it does not prove a causal explanation
or forecast completion.
