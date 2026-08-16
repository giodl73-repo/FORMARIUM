# Control and Response Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword:
[Objective, Control, Monitoring, and Response](../entries/control-monitoring-response.md)

Canonical senses: `objective`, `monitoring`, `indicator`, `threshold`, `alert`,
`feedback-control`, `governance-control`, `feedback`, `intervention`, `outcome`,
`set-point`, `actuator`, `service-level-objective`

## Governing question

Which control-chain defect could explain an observed monitoring, alerting,
intervention, or outcome failure, and what test would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Dashboard is green while users fail | indicator does not represent objective; aggregation hides affected segment; stale/missing data | compare indicator with direct user outcomes by segment and freshness | indicator definition and monitoring |
| Alerts fire constantly without useful action | threshold too sensitive; poor window/persistence; no significance policy; duplicate routing | measure precision, actionability, detection, and reset behavior | threshold and alert policy |
| Serious failures do not alert | indicator blind spot; threshold too lax; missing-data treated as healthy; routing failure | replay known incidents and missing-data scenarios | monitoring, threshold, and routing |
| Alert reaches someone but nothing changes | no response owner; insufficient authority; unclear runbook; alert is informational | trace acknowledgment, decision right, action, and escalation | organizational assignment and response procedure |
| Intervention occurs but objective worsens | wrong causal model; reinforcing feedback; delay; side effect; local optimization | compare before/after path, lag, and affected neighboring outcomes | intervention and feedback model |
| Automated loop oscillates or saturates | delay/gain mismatch; noisy indicator; actuator limits; missing hysteresis | inspect time series, phase/lag, actuator range, and alternate tuning | feedback-control design |
| Governance control exists only on paper | implementation missing; evidence weak; owner unclear; effectiveness not tested | observe operation and test requirement/risk reduction | control owner and assurance |
| Metric target is met but desired outcome is not | proxy gaming; output substituted for outcome; horizon too short | compare objective, proxy, behaviors, and longer-horizon effects | objective and outcome model |
| Threshold changes silently alter workload | versioning or review absent; impact not modeled | compare rule versions, alert volume, and response capacity | threshold governance |
| Same signal triggers conflicting actions | competing policies; unclear priority; several control loops interact | enumerate decision precedence and simulate combined actions | policy and system control architecture |
| Set point changes but controlled value does not | actuator saturation, command-path failure, insufficient authority, process limit, sensor fault, or excessive delay | trace command, actuator response, manipulated variable, and process state under a bounded test | control-loop owner |
| Controlled value reaches the set point but objective still fails | wrong controlled variable, local objective, omitted disturbance, unsafe transient, or broader outcome mismatch | compare the set-point contract with system and stakeholder outcomes | objective and system owner |
| Set point is reached only after overshoot or long oscillation | controller tuning, actuator dynamics, delay, rate limit, hysteresis, or sensor placement differs | step-test within safe bounds and compare transient response with declared limits | control-design owner |
| Controller reports success while actuator is ineffective | acknowledgment covers command receipt, not physical/logical action | inspect actuator feedback and independent process response | actuator and instrumentation owner |
| SLO is green while a user segment fails | eligible-event exclusion, server-side proxy, aggregation, low-volume masking, or missing client path | recompute the SLI by user journey, segment, and measurement point | SLI owner |
| Teams disagree whether the SLO was met | numerator, denominator, good-event threshold, window, timezone, missingness, or revision differs | replay one frozen event set through both versioned SLO contracts | reliability owner |
| SLO miss is called an agreement breach | operational target was conflated with a commitment, parties, authority, or consequences | inspect the agreement and map each obligation to its governed measure | service-governance owner |
| Error budget remains while severe harm occurs | SLI omits correctness, safety, durability, distribution, or critical low-volume events | compare error-budget policy with direct outcomes and severity-weighted cases | product and risk owner |
| Named controllers, actuators, or monitoring products multiply as senses | mechanism catalog replaced reference, command, influence, and objective roles | swap examples and verify the control chain survives | concept-taxonomy editor |

## Use contract

1. Record the observed symptom, time window, subject, and affected objective.
2. Preserve raw observations and current indicator/threshold versions.
3. List several plausible causes across sensing, decision, communication,
   authority, action, feedback, and outcome stages.
4. Run the smallest discriminating test without hiding contradictory evidence.
5. Repair the owning stage rather than merely suppressing the symptom.
6. Re-evaluate intended and unintended outcomes after repair.
7. For loop failures, preserve set-point version, mode, controlled and
   manipulated variables, commands, actuator telemetry, limits, delays,
   overrides, raw sensor data, and safe test boundaries.
8. For SLO failures, preserve service/SLI/SLO versions, event eligibility,
   raw numerator and denominator inputs, measurement point, aggregation,
   compliance window, exclusions, missingness, error-budget policy, and any
   separately governed agreement.

## Failure signs

- every symptom is blamed on threshold tuning;
- alert volume is reduced by suppressing evidence rather than improving rules;
- monitoring gaps are reported as healthy states;
- response authority and capacity are absent from alert design;
- controls are counted rather than tested for effectiveness;
- local objectives destabilize neighboring systems;
- outcome review stops at immediate outputs.
- set-point change is treated as evidence of target attainment or stability;
- command acknowledgment is treated as actuator or process success;
- actuator limits, delay, rate, and failure state are omitted;
- SLO targets are selected from current performance without user or policy rationale;
- averages hide tail behavior, user segments, or low-volume critical events;
- an SLO is treated as an SLA, universal reliability, or proof of user outcomes.

## Sources and provenance

1. [Control and response research](../../docs/research/2026-08-14-control-monitoring-response.md)
2. NIST/SEMATECH, "What is Process Control?":
   https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc13.htm
3. Google SRE Workbook, "Alerting on SLOs":
   https://sre.google/workbook/alerting-on-slos/
4. CDC, "Looking for Feedback":
   https://www.cdc.gov/polaris/php/thinking-in-systems/looking-for-feedback.html
5. NIST, process controllers:
   https://www.nist.gov/ncnr/nice-help/devices/process-controllers-temperature-pressure-etc
6. NIST, actuator definition:
   https://www.nist.gov/el/intelligent-systems-division-73500/definitions
7. Google SRE, "Service Level Objectives":
   https://sre.google/sre-book/service-level-objectives/

The diagnostic is a candidate cross-domain synthesis, not a substitute for
domain-specific safety, clinical, industrial, or security analysis.
