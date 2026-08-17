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

## Sources and provenance

1. GAO, *Schedule Assessment Guide*: https://www.gao.gov/products/gao-16-89g
2. Existing System Dependency, Coordinated Work, Temporal, and Causal owners.

This view diagnoses declared records; it does not prove a causal explanation
or forecast completion.
