# Resource Allocation, Reservation, and Shortage Procedure

Status: candidate Procedure Table

Primary family: Procedure Table

Canonical headword: [Operational Resource, Capacity, Demand, and Allocation](../entries/operational-resource-capacity-demand.md)

Canonical senses: `operational-resource`, `capacity`, `demand`, `load`,
`allocation`, `reservation`, `resource-commitment`, `consumption`, `shortage`

## Governing question

How can resource claims be admitted, assigned, held, committed, consumed, and
reconciled without double booking capacity or hiding unmet demand?

## Procedure table

| Step | Required record | Gate | Failure recovery |
|---|---|---|---|
| 1. Frame | outcome/activity, resource boundary, owner, authority, horizon | exact resource question is named | split resources or uses |
| 2. Establish supply | resource state, compatible capability, available capacity, unit, quality, time, uncertainty | supply is usable under conditions | mark unavailable/degraded/unresolved |
| 3. Admit demand | requester, quantity/rate, timing, duration, quality, priority, eligibility | claims share interpretable basis | map with loss or retain separate |
| 4. Apply policy | allocation rule, fairness/priority, exclusivity, preemption, constraints | policy and authority are current | refer/hold unresolved |
| 5. Reserve | amount, recipient/use, start/end, conditions, expiration, release | hold does not exceed compatible unclaimed capacity | queue, substitute, or reject |
| 6. Commit | provider/consumer obligation, conditions, dependencies, evidence, consequences | commitment is distinguishable from availability | conditional disposition |
| 7. Allocate/use | actual assignment, start, consumption/occupation, correlation | no overlap violates exclusivity | suspend, preempt, reconcile |
| 8. Release/replenish | release, return, restoration, replenishment, changed state | available capacity is recomputed | retain degraded state |
| 9. Reconcile | demand, served result, reservations, commitments, use, residual capacity, shortage | ledger and semantic roles balance | investigate double count or loss |
| 10. Review | bottleneck, substitution, sensitivity, consequence, provenance, version | unresolved shortfall remains visible | revise policy/capacity/demand plan |

## Event ledger

```text
resource-event
  := request | admit | reject | reserve | commit | allocate | start-use
   | consume | preempt | release | return | replenish | expire | reconcile
   @ resource, amount/unit, actor/authority, recipient/use, time, version
   ! conditions, dependencies, uncertainty, and residual obligation
```

## Constraints

- Forecast, plan, reservation, commitment, availability, allocation,
  consumption, and served result remain separate.
- Exclusive capacity is not double booked across overlapping intervals.
- Shared or pooled capacity retains dependency, contention, and policy effects.
- Substitutes pass compatibility, quantity, quality, location, timing, and
  authority tests before closing shortage.
- Unmet demand remains shortage, deferred, rejected, or unresolved with reason;
  it never disappears from the denominator.
- Allocation success does not prove outcome success.

## Sources and provenance

See the canonical entry, Coordinated Work, Stock/Flow, and Temporal owners.
This procedure is a semantic ledger, not a universal scheduling algorithm.
