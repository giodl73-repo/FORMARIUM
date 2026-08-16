---
skill: discover-websearch
topic: control-target-actuation-service-objective
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Control Target, Actuation, and Service Objective Web Evidence

## Claims

| # | Claim | Direct evidence | Verdict |
|---|---|---|---|
| 1 | A set point is the desired reference for a controlled variable, not a broad objective or threshold. | NIST calls the setpoint “the value it is trying to drive a quantity towards” and the controlled variable the variable kept at that value. | CONFIRMED |
| 2 | An actuator is distinct from the controller command and the resulting process state. | NIST defines an actuator as a device that “accepts a signal and converts it to a physical action.” | CONFIRMED |
| 3 | Control evidence must trace actual process influence, not command acknowledgment alone. | NIST describes operational technology as detecting or causing direct change in physical processes, while its controller material separates process value, setpoint, and output. | CONFIRMED |
| 4 | An SLO binds an SLI to a target and a compliance period. | Google defines an SLO as a target for an SLI; its API states that it consists of an SLI, a performance goal, and a period. | CONFIRMED |
| 5 | SLO, observed performance, SLA, error budget, and user outcome must remain separate. | Google distinguishes desired performance from measured compliance, defines error budget as `1 - SLO`, and describes an SLA as adding consequences to an SLO. | CONFIRMED |

## Query record

| Claim | Query 1 | Query 2 |
|---|---|---|
| 1 | `NIST set point controlled variable definition` | `site:nist.gov process controller setpoint value` |
| 2 | `NIST actuator accepts signal physical action definition` | `site:nist.gov actuator controller process definition` |
| 3 | `NIST control loop process value output actuator` | `site:csrc.nist.gov SP 800-82 actuator process control` |
| 4 | `Google SRE service level objective SLI target window` | `site:cloud.google.com ServiceLevelObjective performance goal period` |
| 5 | `Google SRE SLO SLA consequences error budget user experience` | `site:cloud.google.com SLO measured compliance user journey` |

The paired searches converged on NIST control terminology and Google SRE/Cloud
service-level documentation. No conflicting primary definition was found;
domain implementations still retain their own safety and agreement authority.

## Findings

| # | Finding | Source |
|---|---|---|
| 1 | A controlled variable is the variable a system attempts to keep at a set-point value. | [NIST](https://csrc.nist.gov/glossary/term/controlled_variable) |
| 2 | A setpoint is the value toward which a controller drives a quantity. | [NIST](https://www.nist.gov/ncnr/nice-help/devices/process-controllers-temperature-pressure-etc) |
| 3 | Process value and setpoint are separate controller inputs. | [NIST](https://www.nist.gov/ncnr/nice-help/devices/process-controllers-temperature-pressure-etc) |
| 4 | Controller output is distinct from both process value and setpoint. | [NIST](https://www.nist.gov/ncnr/nice-help/devices/process-controllers-temperature-pressure-etc) |
| 5 | An actuator accepts a signal and converts it to physical action. | [NIST](https://www.nist.gov/el/intelligent-systems-division-73500/definitions) |
| 6 | The actuator occupies a command-to-action role rather than a target-selection role. | [NIST](https://www.nist.gov/el/intelligent-systems-division-73500/definitions) |
| 7 | Operational technology may directly change a physical process or environment. | [NIST](https://csrc.nist.gov/pubs/sp/800/82/r3/final) |
| 8 | Command, action, and resulting process state are therefore separately testable stages. | [NIST](https://csrc.nist.gov/pubs/sp/800/82/r3/final) |
| 9 | A service-level indicator is a defined quantitative service measure. | [Google SRE](https://sre.google/sre-book/service-level-objectives/) |
| 10 | An SLO is a target value or range for an SLI. | [Google SRE](https://sre.google/sre-book/service-level-objectives/) |
| 11 | SLI measurements are aggregated over a specified window. | [Google SRE](https://sre.google/sre-book/service-level-objectives/) |
| 12 | Valid measurement conditions should be explicit in the SLO definition. | [Google SRE](https://sre.google/sre-book/service-level-objectives/) |
| 13 | The API representation requires an SLI, performance goal, and period. | [Google Cloud](https://docs.cloud.google.com/monitoring/api/ref_v3/rest/v3/services.serviceLevelObjectives) |
| 14 | An SLO describes desired performance, while compliance is measured performance. | [Google Cloud](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring) |
| 15 | Error budget is derived from the SLO rather than being identical to observed errors. | [Google Cloud](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring) |
| 16 | The compliance period is part of service-level interpretation. | [Google Cloud](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring) |
| 17 | An operational SLO can be more stringent than a public or contractual commitment. | [Google Cloud](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring) |
| 18 | Proxy coverage can omit user journeys or segments, so measured compliance is not universal outcome evidence. | [Google SRE](https://sre.google/sre-book/service-level-objectives/) |

Summary: 5 of 5 claims confirmed; 18 findings; none ungrounded.

## Claim boundary

The sources support vocabulary and structural distinctions. They do not make
the candidate synthesis a safety-certified control design, a complete
reliability program, a contractual interpretation, or proof of user outcomes.
