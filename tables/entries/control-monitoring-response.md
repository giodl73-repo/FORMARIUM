# Objective, Control, Monitoring, and Response

Status: candidate anchor entry

## Orientation

An objective states a desired result or condition. Monitoring observes a
subject over time; indicators summarize selected observations; thresholds
compare indicators with decision boundaries; alerts route significant
conditions to recipients. Feedback control deliberately influences a process
using observed state, while a governance control is a safeguard or
countermeasure that modifies risk or supports requirements. Interventions are
actions; outcomes are resulting effects. Feedback may balance or reinforce
change and is not automatically beneficial.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `objective` | Which desired result, state, or performance level is being pursued? | target or evaluation reference |
| `monitoring` | What subject is observed through which method, cadence, window, and quality controls? | ongoing observation process |
| `indicator` | Which defined measure or signal summarizes relevant condition or performance? | selected observable proxy |
| `threshold` | Which comparison boundary changes classification, attention, or action? | decision boundary |
| `alert` | Which significant condition is communicated to whom, at what priority, with what expected response? | routed notification |
| `feedback-control` | How does observed state influence action intended to affect future state relative to an objective? | closed-loop influence |
| `governance-control` | Which safeguard, countermeasure, process, policy, or practice modifies risk or supports a requirement? | governed risk/requirement treatment |
| `feedback` | How do effects return to influence causes or future activity? | reinforcing or balancing loop relation |
| `intervention` | Which deliberate action changes the subject, process, or environment? | applied response |
| `outcome` | Which intended or unintended effect resulted over the selected horizon? | resulting effect |

## Role ladder

```text
desired condition
  -- stated as --> objective

subject observations
  -- collected by --> monitoring
  -- summarized as --> indicator

indicator and threshold policy
  -- may derive --> alert

observed state and objective
  -- evaluated by feedback control --> intervention

policy, requirement, or risk
  -- treated by governance control --> changed exposure or behavior

intervention and environment
  -- produce --> outputs, transitions, outcomes, and feedback
```

## Root factorization

```text
control-response-use
  := subject, system, and boundary
   x objective and desired state
   x indicator definition and measurement
   x monitoring method, window, and frequency
   x threshold basis, hysteresis, and persistence
   x alert recipient, priority, and routing
   x control sense, loop, or governance mechanism
   x feedback path, delay, and sign
   x intervention authority, action, and side effects
   x outcome measures and time horizon
   x review, learning, and revision
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Objective vs. threshold | thresholds may operationalize objectives | desired result/reference vs. classification or action boundary |
| Monitoring vs. control | control may use monitoring | observing/assessing vs. deliberately influencing |
| Observation vs. indicator | indicators derive from observations | retained encounter/result vs. selected summary or proxy |
| Indicator vs. threshold | thresholds compare indicators | measured/derived signal vs. decision boundary |
| Threshold event vs. alert | event may trigger alert | detected condition vs. routed notification under policy |
| Alert vs. intervention | alert may request response | communication vs. action on subject/environment |
| Feedback control vs. governance control | both pursue objectives | closed-loop process influence vs. safeguard/countermeasure |
| Feedback vs. outcome | outcomes can feed future activity | loop relation over time vs. selected resulting effect |
| Intervention vs. outcome | intervention seeks outcome | action applied vs. effect observed |
| Output vs. outcome | both follow action | immediate product/state change vs. effect over selected horizon |

## Diagnostic examples

- A dashboard displays indicators but does not control the service.
- A CPU-temperature threshold can trigger an alert, while a fan controller
  independently performs feedback control.
- A security policy and multifactor-authentication mechanism are governance
  controls; they are not feedback control loops merely because metrics exist.
- An alert with no recipient or expected response is only a detected
  condition or log event.
- A corrective intervention can create reinforcing side effects elsewhere.
- Meeting an activity target does not prove the desired outcome occurred.

## Specialized view

The linked
[Control and Response Failure Diagnostic](../diagnostics/control-response-failures.md)
maps observed monitoring and response symptoms to candidate causes and
discriminating tests.

## Selection procedure

1. State the subject, boundary, stakeholders, objective, and time horizon.
2. Separate direct observations from derived indicators.
3. Define each indicator's numerator/denominator or model, unit/scale, window,
   freshness, quality, and owner.
4. Define thresholds with basis, operator, window, persistence, hysteresis,
   missing-data behavior, and reset semantics.
5. Define alerts with recipient, priority, routing, deduplication, context,
   acknowledgment, escalation, and expected response.
6. Select feedback control only when observed state influences action that
   affects future state; record set point/objective, loop path, delay, sign,
   authority, and stability assumptions.
7. Select governance control for safeguards or countermeasures; record
   requirement/risk, owner, implementation, evidence, effectiveness test, and
   residual exposure.
8. Record interventions separately from decisions, alerts, and outcomes.
9. Measure intended and unintended outcomes over a declared horizon and
   baseline or comparison.
10. Revise indicators, thresholds, controls, and interventions from observed
    failure, drift, and feedback.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines objective, monitor, indicator, threshold, alert, control, feedback, intervention, and outcome | Separates observation, decision, communication, action, and effect |
| Thesaurus | Links metric, alarm, safeguard, response, correction, and result | Prevents related operational words from becoming interchangeable |
| Encyclopedia or control text | Explains feedback systems, monitoring, and governance controls | Places technical and governance control senses side by side without merging them |
| Dashboard or alert configuration | Implements selected indicators and rules | Requires source semantics, response ownership, and outcome review |
| Factorium | Connects evidence, decisions, constraints, diagnostics, transitions, and outcomes | Makes every stage and failure owner visible |

## Constraints and failure signs

- Objectives identify beneficiary, desired condition, measure, horizon, and
  tradeoffs.
- Monitoring states method, frequency, window, freshness, quality, and owner.
- Indicators state derivation, interpretation, and known proxy limitations.
- Thresholds state temporal and missing-data semantics.
- Alerts state recipient, priority, route, expected response, and reset.
- Monitoring is not credited as control without an influence path.
- Feedback sign, delay, authority, saturation, and side effects are visible.
- Governance controls retain requirement/risk, implementation, evidence,
  effectiveness, and residual exposure.
- Interventions are not relabeled as outcomes.
- Intended and unintended outcomes are reviewed over the declared horizon.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- causal model - `unresolved-candidate`
- set point - `unresolved-candidate`
- actuator - `unresolved-candidate`
- service-level objective - `unresolved-candidate`

## Sources and provenance

1. NIST CSRC Glossary, "control":
   https://csrc.nist.gov/glossary/term/control
2. NIST CSRC Glossary, "security control":
   https://csrc.nist.gov/glossary/term/security_control
3. NIST/SEMATECH, "What is Process Control?":
   https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc13.htm
4. NIST SP 800-137, *Information Security Continuous Monitoring*:
   https://csrc.nist.gov/pubs/sp/800/137/final
5. CDC, "Looking for Feedback":
   https://www.cdc.gov/polaris/php/thinking-in-systems/looking-for-feedback.html
6. Google SRE Workbook, "Alerting on SLOs":
   https://sre.google/workbook/alerting-on-slos/
7. NASA, Human Integration Design Handbook, Appendix C definitions:
   https://www.nasa.gov/reference/appendix-c-vol-2/

Comparator access date: 2026-08-14. Cross-domain organization remains
`candidate`; cited control and alert mechanisms retain their source scopes.
