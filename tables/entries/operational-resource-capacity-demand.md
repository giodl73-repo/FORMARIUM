# Operational Resource, Capacity, Demand, and Allocation

Status: candidate anchor entry

## Orientation

An operational resource is an identified source of capability, material,
energy, time, space, information, funds, or service used or constrained in a
declared activity or outcome. Capacity is the amount or rate of work, service,
storage, transfer, or other result available under specified conditions over a
time basis. Demand is a requested or required quantity or rate; load is the
demand actually presented to a selected resource or system boundary.

Utilization compares used or occupied capacity with the exact capacity basis.
Allocation assigns resource quantity or access; reservation holds it for a
future or conditional use; commitment creates a stronger obligation to
supply, retain, or consume it. Consumption changes availability or state.
Shortage is an unresolved gap between required demand and available,
compatible, timely capacity under the allocation policy.

This cross-domain resource sense is distinct from an HTTP or managed software
resource, which is an identified subject exposed through representations and
operations.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `operational-resource` | Which identified capability or stock can support work or an outcome under declared ownership and conditions? | usable capability or stock source |
| `capacity` | How much result, service, storage, transfer, or work can be supported under specified conditions and time basis? | conditional supply limit |
| `demand` | What quantity, rate, quality, or service is requested or required, by whom, when, and at what priority? | requested or required need |
| `load` | What demand is actually presented to the selected resource or system boundary over the declared window? | applied demand |
| `utilization` | What fraction or relation compares used/occupied capacity with the exact available-capacity basis? | capacity-use comparison |
| `allocation` | Which resource quantity or access is assigned to which recipient/use under what policy and interval? | governed assignment |
| `reservation` | Which resource is held for a future, contingent, or exclusive use, and when does the hold expire or release? | held availability claim |
| `resource-commitment` | Which party or mechanism is obligated to provide, retain, or consume resource under declared conditions? | obligation-backed resource claim |
| `consumption` | Which use reduces, transforms, occupies, or makes the resource unavailable, over what interval and recovery rule? | resource state/use change |
| `shortage` | Which required demand remains unmet after compatible, timely capacity and allocation policy are applied? | unresolved demand-capacity gap |

## Resource flow

```text
resource identity and capability
  -- bounded by conditions/time/policy --> available capacity
demand requests or requirements
  -- admitted and routed --> presented load
allocation and reservation
  -- assign/hold --> capacity claims
commitment and scheduling
  -- govern --> expected provision and use
consumption, release, restoration, or replenishment
  -- changes --> available resource state
unmet compatible timely demand
  -- remains as --> shortage or deferred/unresolved demand
```

## Root factorization

```text
operational-resource-use
  := intended outcome, activity, and system boundary
   x resource identity, kind, owner, authority, and location
   x capability, quantity, unit or scale, quality, and compatibility
   x capacity definition, conditions, time basis, and service level
   x demand source, quantity or rate, timing, priority, and uncertainty
   x presented load, eligible load, backlog, and distribution
   x allocation policy, recipient, amount, interval, and preemption
   x reservation, commitment, exclusivity, expiration, and release
   x consumption, occupation, transformation, replenishment, and recovery
   x utilization numerator, denominator, window, and aggregation
   x bottleneck, dependency, substitution, and transfer loss
   x shortage, deferred demand, residual capacity, and consequence
   x observation, forecast, plan, actual, reconciliation, and provenance
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Operational resource vs. software resource | both may be identified and managed | capability/stock used in work vs. addressed subject exposed through representations/operations |
| Resource vs. capability | a resource can provide capability | identified supply source vs. ability to produce an outcome |
| Capacity vs. resource quantity | quantity may constrain capacity | achievable amount/rate under conditions vs. amount of a stock or asset |
| Demand vs. load | both express need | requested/required quantity or rate vs. demand actually presented at a boundary |
| Capacity vs. throughput | throughput can estimate use of capacity | conditional supply limit vs. achieved processing/transfer rate |
| Utilization vs. occupancy | both concern use | ratio/relation to a declared capacity basis vs. quantity currently occupied |
| Allocation vs. reservation | both assign claims | active governed assignment vs. held future/conditional availability |
| Reservation vs. commitment | both concern future provision | resource hold vs. obligation to provide/retain/consume |
| Commitment vs. availability | both can support plans | obligation/claim vs. actual usable state when needed |
| Consumption vs. allocation | both concern use | resource state/availability change vs. assignment decision |
| Shortage vs. backlog | both record unmet demand | demand-capacity gap under policy/time vs. queued work awaiting service |
| Shortage vs. failure | shortage may cause failure | insufficient compatible capacity vs. inability to meet a required function/result |

## Capacity and utilization record

```text
capacity-record
  := resource and system boundary
   x quantity/result and unit or scale
   x conditions, quality, operating policy, service level, and time basis
   x gross, available, reserved, committed, degraded, and residual capacity
   x bottleneck and shared dependencies
   x demand/load definition, eligible cases, and missingness
   x utilization numerator, denominator, window, aggregation, and uncertainty
   x source, method, forecast/plan/actual status, version, and limitations
```

## Selection procedure

1. State the intended outcome, activity, system boundary, resource identity,
   owner, authority, location, and time horizon.
2. Define the resource capability, quantity, unit/scale, quality, compatibility,
   state, and replenishment or recovery behavior.
3. Define capacity by exact result, operating conditions, service level,
   resource pool, bottleneck, time basis, and uncertainty.
4. Separate requested/required demand from presented load, backlog, and served
   result; preserve eligible cases and missingness.
5. Record allocation policy, priority, recipient, amount, interval,
   preemption, fairness constraints, and unresolved claims.
6. Distinguish reservation, commitment, availability, consumption, release,
   restoration, and replenishment events.
7. Calculate utilization only from a compatible numerator, denominator, and
   window; retain resource vectors and bottlenecks behind aggregates.
8. Test dependencies, shared capacity, interaction, substitution, transfer,
   quality, location, timing, and failure conditions.
9. Reconcile plan/forecast, reservations/commitments, actual provision/use,
   residual capacity, shortage, deferred demand, and consequence.
10. Preserve versions, evidence status, uncertainty, limitations, and review
    triggers.

## Constraints and failure signs

- Capacity always names what result is supported, under which conditions and
  time basis.
- Unlike resource units are not added without a declared mapping.
- Allocation, reservation, and commitment do not prove actual availability.
- Utilization never omits its capacity denominator, eligible load, and window.
- Aggregate spare capacity does not erase a bottleneck or incompatible supply.
- A resource assigned to two overlapping exclusive uses is not counted twice.
- Consumption and replenishment preserve stock/flow and timing semantics.
- Shortage retains unmet subject, amount, duration, priority, policy, and
  consequence; it is not silently dropped or called demand reduction.
- Named resource types, scheduling methods, service classes, and allocation
  policies remain examples or bounded external authorities.

## Specialized views

- [Resource Allocation, Reservation, and Shortage Procedure](../procedures/resource-allocation.md)
- [Dependency and Critical-Path Failure Diagnostic](../diagnostics/dependency-critical-path.md)
- [Compatibility and Substitution Mapping](../mappings/compatibility-substitution.md)

## Cross-references

- [Coordinated Work](coordinated-work.md)
- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- [Software Module, Service, and Resource](software-module-service-resource.md)
- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [Temporal Organization](temporal-organization.md)
- [Assumption, Condition, Scenario, Case, and Feasibility](scenario-assumption-condition-case.md)

## Sources and provenance

1. [F51-F100 campaign research](../../docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md)
2. NASA Systems Engineering Handbook, technical planning, requirements,
   margins, and assessment: https://www.nasa.gov/reference/systems-engineering-handbook/
3. GAO, *Schedule Assessment Guide*, resources, dependencies, critical path,
   and schedule risk: https://www.gao.gov/products/gao-16-89g
4. Existing Factorium Stock/Flow, Coordinated Work, System Composition, and
   Comparative Quantity owner research.

Comparator access date: 2026-08-16. The general cross-domain organization
remains `candidate`; domain resource and capacity definitions retain authority.
