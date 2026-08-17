# Queue, Backlog, Priority, Scheduling, and Service-Order Procedure

Status: candidate Procedure Table

Primary family: Procedure Table

Canonical headword: [Operational Resource, Capacity, Demand, and Allocation](../entries/operational-resource-capacity-demand.md)

Canonical senses: `demand`, `load`, `capacity`, `allocation`, `shortage`

## Governing question

How should waiting demand be admitted, ordered, scheduled, served, and
reconciled without hiding priority, starvation, censoring, or abandonment?

## Procedure table

| Step | Required record | Failure sign |
|---|---|---|
| Frame | queue boundary, item/work identity, owner, population, unit, time | unlike queues merged |
| Arrive/admit | arrival/request, eligibility, priority attributes, timestamp, deduplication | duplicate or excluded work counted |
| Backlog state | waiting items/amount, age, dependencies, missingness, censored/abandoned status | backlog inferred from arrivals alone |
| Order | priority rule, class, tie-break, fairness, preemption, override authority | urgency and importance collapse |
| Schedule | resource/capacity, start window, duration/service demand, dependencies, setup | plan becomes service evidence |
| Serve | start/finish, resource use, result, retry/rework, completion evidence | departure means successful outcome |
| Reconcile | arrivals, departures, waiting stock, abandoned/rejected/deferred items, interval | stock/flow does not balance |
| Review | delay/age distribution, starvation, bottleneck, sensitivity, version | average hides severe tail |

## Constraints

- Queue is the ordered waiting structure; backlog is the waiting work/amount
  under a boundary; priority is an ordering input/rule; schedule is intended
  timing/resource assignment; service order is the realized or governed order.
- Arrivals, departures, queue length, waiting time, service time, abandonment,
  retries, and outcomes remain separate.
- Every rate/count states population, denominator, window, censoring, and unit.
- Named scheduling disciplines and service classes remain examples.

## Sources and provenance

See Operational Resource, Coordinated Work, Temporal Organization, and
Stock/Flow owners. This is not a universal scheduling algorithm.
