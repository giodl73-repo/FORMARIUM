# Control and Response Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword:
[Objective, Control, Monitoring, and Response](../entries/control-monitoring-response.md)

Canonical senses: `objective`, `monitoring`, `indicator`, `threshold`, `alert`,
`feedback-control`, `governance-control`, `feedback`, `intervention`, `outcome`

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

## Use contract

1. Record the observed symptom, time window, subject, and affected objective.
2. Preserve raw observations and current indicator/threshold versions.
3. List several plausible causes across sensing, decision, communication,
   authority, action, feedback, and outcome stages.
4. Run the smallest discriminating test without hiding contradictory evidence.
5. Repair the owning stage rather than merely suppressing the symptom.
6. Re-evaluate intended and unintended outcomes after repair.

## Failure signs

- every symptom is blamed on threshold tuning;
- alert volume is reduced by suppressing evidence rather than improving rules;
- monitoring gaps are reported as healthy states;
- response authority and capacity are absent from alert design;
- controls are counted rather than tested for effectiveness;
- local objectives destabilize neighboring systems;
- outcome review stops at immediate outputs.

## Sources and provenance

1. [Control and response research](../../docs/research/2026-08-14-control-monitoring-response.md)
2. NIST/SEMATECH, "What is Process Control?":
   https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc13.htm
3. Google SRE Workbook, "Alerting on SLOs":
   https://sre.google/workbook/alerting-on-slos/
4. CDC, "Looking for Feedback":
   https://www.cdc.gov/polaris/php/thinking-in-systems/looking-for-feedback.html

The diagnostic is a candidate cross-domain synthesis, not a substitute for
domain-specific safety, clinical, industrial, or security analysis.
