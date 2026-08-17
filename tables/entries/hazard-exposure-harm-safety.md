# Hazard, Exposure, Harm, Vulnerability, and Safety

Status: candidate anchor entry

## Orientation

A hazard is a source or situation with potential to cause a specified harm.
Exposure is contact or opportunity for the hazard pathway to affect a subject
under declared intensity, duration, route, and conditions. Harm is the adverse
effect of concern. Vulnerability is susceptibility to that harm under the
scenario and available protections. Safety is bounded freedom from
unacceptable risk for a defined subject, activity, context, and authority; it
is not the absence of detected incidents or a universal binary property.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `hazard` | Which source, state, activity, or condition has potential to cause which harm? | potential harm source |
| `exposure` | Which subject can encounter the hazard through what pathway, intensity, duration, frequency, and conditions? | hazard-contact opportunity |
| `harm` | Which adverse effect to which subject, asset, value, or environment is in scope? | adverse consequence |
| `vulnerability` | Which susceptibility or weakness changes the likelihood or severity of harm under the scenario? | harm susceptibility condition |
| `safety` | Is residual risk acceptable under the declared subject, activity, criteria, evidence, authority, and time? | bounded risk-acceptability property |

## Root factorization

```text
hazard-safety-use
  := subject, activity, system boundary, and affected parties
   x hazard identity, source, state, energy/material/information/action, and conditions
   x exposure pathway, route, intensity, duration, frequency, and population
   x harm kind, affected subject, severity, reversibility, and horizon
   x vulnerability, susceptibility, dependency, and protective capacity
   x scenario, probability/uncertainty, evidence, and applicability
   x prevention, protection, detection, mitigation, response, and recovery
   x criteria, noncompensatory limits, authority, and residual risk
   x monitoring, incidents, near misses, changes, and learning
   x provenance, version, review, limitations, and unresolved hazards
```

## Contrast table

| Pair | Decisive distinction |
|---|---|
| Hazard vs. harm | potential source/situation vs. adverse effect |
| Hazard vs. risk | potential harm source vs. uncertainty-weighted consequence under a model |
| Exposure vs. vulnerability | contact/opportunity pathway vs. susceptibility given contact/conditions |
| Exposure vs. harm | encounter opportunity vs. adverse effect realized or modeled |
| Vulnerability vs. failure | susceptibility/weakness vs. inability to perform a required function |
| Safety vs. no incidents | bounded acceptable residual risk vs. observation of no detected events in a window |
| Safety vs. reliability | unacceptable-harm risk vs. continuity without specified failure |

## Constraints and failure signs

- Every hazard names a potential harm and affected subject.
- Exposure retains pathway, population, intensity, duration/frequency, and time.
- Vulnerability is scenario- and subject-relative, not a permanent universal label.
- Safety claims retain criteria, authority, evidence, operating conditions,
  residual risk, unresolved hazards, and validity interval.
- Detection absence is bounded by opportunity, coverage, sensitivity, and window.
- Named hazard classes, controls, regulations, practices, and certifications
  remain examples or external authorities.
- This candidate reference is descriptive and not professional safety advice.

## Specialized view

- [Risk Treatment and Response Procedure](../procedures/risk-treatment-response.md)

## Cross-references

- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Control, Monitoring, and Response](control-monitoring-response.md)
- [Dependability and Recovery](dependability-reliability-availability-resilience.md)
- [Scenario and Feasibility](scenario-assumption-condition-case.md)

## Sources and provenance

1. ISO/IEC Guide 51 overview, safety aspects and risk reduction:
   https://www.iso.org/standard/53940.html
2. NIST SP 800-160 Vol. 1, systems security engineering concepts:
   https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final
3. Existing Factorium risk, control, dependability, and evidence owners.

Comparator access date: 2026-08-16. Domain and regulatory definitions retain
authority. This cross-domain organization is candidate and non-prescriptive.
