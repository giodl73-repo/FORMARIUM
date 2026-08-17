# Dependability Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Reliability, Availability, Maintainability, Resilience, and Recovery](../entries/dependability-reliability-availability-resilience.md)

Canonical senses: `reliability`, `availability`, `maintainability`,
`resilience`, `recovery`, `failure`

## Governing question

Which semantic or operating defect explains a dependability claim that fails
at the required service boundary?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Availability reports disagree | demand, eligible time, degradation, exclusions, timezone, or missingness differs | replay one event set through both measure contracts | measurement owner |
| Components look healthy while service fails | dependency, interface, capacity, coordination, or common cause omitted | trace one user-visible failure across the dependency graph | system owner |
| Repair is fast but recovery is slow | diagnosis, approval, logistics, data restore, validation, or dependency wait dominates | decompose incident timeline by state and owner | recovery owner |
| Recovery meets time but loses unacceptable data | recovery-time target substituted for recovery-point or integrity objective | restore from frozen case and reconcile exact data/state | data/recovery owner |
| Known test passes but novel disruption collapses service | resilience claim overgeneralized from one threat/scenario | vary adversity, duration, dependency loss, and adaptation path | resilience owner |
| Reliability improves while users see no benefit | wrong failure criterion, aggregation, demand profile, or boundary | compare technical failures with direct user outcomes by segment | service owner |

## Use contract

Freeze subject, required service, conditions, failure criteria, window, event
data, dependencies, and targets. Test measurement and system hypotheses
separately. Preserve contradictory regimes and validate repairs at the user or
mission boundary.

## Failure signs

- “five nines” appears without service, denominator, and window;
- excluded time vanishes from the record;
- recovery is declared before data and dependencies reconcile;
- resilience is inferred from redundancy alone;
- one metric becomes universal dependability.

## Sources and provenance

See the canonical entry. This candidate diagnostic does not establish a
reliability, availability, resilience, or recovery result.
