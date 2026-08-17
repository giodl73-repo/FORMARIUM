# Reliability, Availability, Maintainability, Resilience, and Recovery

Status: candidate anchor entry

## Orientation

Dependability claims require a subject, required service or capability,
conditions, population or observation basis, and time. Reliability concerns
continuity without specified failure; availability concerns being in a usable
state when required; maintainability concerns restoration support under a
maintenance concept; resilience concerns maintaining and recovering required
capability under adversity; recovery is the bounded restoration process or
outcome. None is a context-free synonym for “good system.”

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `reliability` | What probability or demonstrated frequency supports required operation without specified failure for this duration and condition? | continuity claim |
| `availability` | To what degree is required service usable when demanded over this observation basis? | usable-state claim |
| `maintainability` | How effectively can a failed or degraded subject be diagnosed, repaired, restored, and returned under this maintenance concept? | restoration-support property |
| `resilience` | Which required capabilities are maintained, adapted, or recovered under which adverse conditions? | adversity-scoped capability claim |
| `recovery` | By what process and within what state/time/data objectives is capability restored after disruption? | restoration process and outcome |
| `failure` | Which required function or service ceased to meet which criterion under which conditions? | requirement-relative event/state |

## Root factorization

```text
dependability-use
  := subject, boundary, required service, and stakeholders
   x operating states, demand, environment, load, and mission profile
   x failure criteria, modes, severity, detection, and dependencies
   x population or observation window and censoring
   x maintenance resources, diagnostics, repair, logistics, and access
   x adversity, essential capability, adaptation, degradation, and recovery
   x restoration point/time/data objectives and residual loss
   x evidence, uncertainty, exclusions, authority, and version
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Reliability vs. availability | both concern service performance over time | uninterrupted operation vs. usable state including restoration effects |
| Availability vs. SLO | SLO may operationalize availability | property/measure claim vs. governed target over a specified indicator/window |
| Maintainability vs. recovery | maintenance enables recovery | support property/process capability vs. one restoration process or result |
| Resilience vs. reliability | both concern continuity | operation without specified failure vs. maintain/adapt/recover under adversity |
| Recovery vs. rollback | both follow disruption | restore required capability vs. revert state under an atomicity/version model |
| Failure vs. incident | failure can contribute to incident | criterion-relative loss vs. governed operational occurrence record |

## Diagnostic examples

- A service can be highly reliable per request yet unavailable during one long
  outage; measures need demand and time bases.
- Fast component repair does not guarantee service recovery when data,
  dependencies, authority, or replacement logistics are missing.
- Recovery within a time target can still violate data-loss or safety limits.
- Surviving one known disturbance does not prove resilience to all adversity.

## Specialized view

[Dependability Failure Diagnostic](../diagnostics/dependability-failures.md)
separates measurement, dependency, maintenance, resilience, and recovery
failure hypotheses.

## Selection procedure

1. Name subject, boundary, required service/capability, users, and conditions.
2. Define demand, success, degradation, failure, exclusion, and time basis.
3. Select reliability and availability measures without swapping denominators.
4. Record dependencies, common causes, maintenance concept, and resources.
5. State adversity and essential capability before claiming resilience.
6. Define recovery state, time, data, safety, and residual-loss objectives.
7. Preserve events, censored periods, missingness, revisions, and uncertainty.
8. Test claims at the system boundary and report unsupported regimes.

## Constraints and failure signs

- Percentages name numerator, denominator, window, demand, and missingness.
- Component results do not automatically compose into system results.
- Planned exclusions remain visible and justified.
- Recovery success includes capability, data, safety, and dependency state.
- Reliability, availability, resilience, and SLO are not interchangeable.
- Named metrics, incident classes, architectures, and standards remain examples.

## Cross-references

- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Coordinated Work](coordinated-work.md)
- [System Composition, Architecture, Capability, Interface, and Dependency](system-composition-dependency.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)

## Sources and provenance

1. NIST CSRC Glossary, “Reliability, Maintainability, Availability”:
   https://csrc.nist.gov/glossary/term/reliability_maintainability_availability
2. NIST CSRC Glossary, “resilience”:
   https://csrc.nist.gov/glossary/term/resilience
3. NIST SP 800-160 Vol. 2 Rev. 1:
   https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final

Comparator access date: 2026-08-16. Security and engineering definitions
retain their scopes; the cross-domain factorization remains `candidate`.
