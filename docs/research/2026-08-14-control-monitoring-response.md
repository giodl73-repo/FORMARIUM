# Control, Monitoring, and Response Research

Status: complete

Decision supported: define Factor Forge F4 so monitoring, indicators,
thresholds, alerts, feedback control, governance controls, interventions, and
outcomes can be selected without collapsing observation into action or one
meaning of `control` into another.

## Findings

### FACTORIUM-CTL-01 - Existing entries own decisions and transitions

Sources:

- `tables/entries/policy-rule-constraint-decision-exception.md`
- `tables/entries/state-event-transition-process-lifecycle.md`
- `tables/diagnostics/factorization-failures.md`

Observed constraint: policy and decision own governing logic and evaluated
outputs; transition owns state change; Diagnostic Tables map observations to
candidate causes and discriminating tests.

Implication: F4 should link these concepts rather than redefine them. It owns
the observation-to-response coordination layer.

Confidence: high.

### FACTORIUM-CTL-02 - `Control` has materially different domain senses

Sources:

1. NIST CSRC Glossary, "control":
   https://csrc.nist.gov/glossary/term/control
2. NIST CSRC Glossary, "security control":
   https://csrc.nist.gov/glossary/term/security_control

Observed constraint: NIST uses control for purposeful action on a process,
physical/operational control systems, and risk-modifying safeguards or
countermeasures.

Implication: separate `feedback-control` from `governance-control`. Defer
experimental-control and legal-control senses rather than pretending one
factorization covers them.

Confidence: high.

### FACTORIUM-CTL-03 - Monitoring and control are separate activities

Source: NIST/SEMATECH e-Handbook, "What is Process Control?":
https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc13.htm

Observed constraint: process monitoring detects an out-of-control situation;
process control actively changes the process based on monitoring results.
Intervention may be human-directed or automated.

Implication: monitoring produces observations and indicators. A control or
intervention changes the subject. Monitoring alone is not control.

Confidence: high.

### FACTORIUM-CTL-04 - Feedback can reinforce or balance change

Source: CDC, "Looking for Feedback":
https://www.cdc.gov/polaris/php/thinking-in-systems/looking-for-feedback.html

Observed constraint: feedback occurs when effects influence their causes over
time. Reinforcing and balancing loops have different dynamics, and
interventions can have intended and unintended consequences.

Implication: require feedback direction/sign, path, delay, gain or influence,
and side effects. Do not assume feedback is always corrective.

Confidence: high.

### FACTORIUM-CTL-05 - An alert is a routed decision, not a measurement

Sources:

1. Google SRE Workbook, "Alerting on SLOs":
   https://sre.google/workbook/alerting-on-slos/
2. NASA human-systems definitions, "Advisory" and "Caution":
   https://www.nasa.gov/reference/appendix-c-vol-2/

Observed constraint: SRE alert rules combine service indicators, objectives,
windows, thresholds, and significance policies while trading precision,
recall, detection time, and reset time. NASA distinguishes informational and
attention-requiring notifications by urgency.

Implication: an indicator crossing a threshold does not become an alert until
policy selects a recipient, priority, routing, persistence, and expected
response.

Confidence: high.

### FACTORIUM-CTL-06 - Continuous monitoring supports decisions over time

Source: NIST SP 800-137, *Information Security Continuous Monitoring*:
https://csrc.nist.gov/pubs/sp/800/137/final

Observed constraint: continuous monitoring supports ongoing awareness,
assessment, authorization, and risk-management decisions; it is not identical
to continuous intervention.

Implication: monitoring must retain purpose, subject, method, frequency,
window, freshness, quality, owner, and decision use.

Confidence: medium-high.

### FACTORIUM-CTL-07 - Thresholds need basis and temporal semantics

Source: Google SRE Workbook, "Alerting on SLOs":
https://sre.google/workbook/alerting-on-slos/

Observed constraint: alert quality depends on threshold, evaluation window,
duration/persistence, burn rate, reset behavior, and low-traffic conditions.
A bare cutoff can produce poor precision, recall, or detection behavior.

Implication: threshold records require comparison operator, basis, window,
persistence/hysteresis, missing-data behavior, and reset semantics.

Confidence: high for service monitoring; medium-high cross-domain.

### FACTORIUM-CTL-08 - Intervention is not outcome

Sources:

1. NIST process control:
   https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc13.htm
2. CDC feedback guidance:
   https://www.cdc.gov/polaris/php/thinking-in-systems/looking-for-feedback.html

Observed constraint: an intervention changes a process or environment, while
the resulting intended and unintended effects emerge later and feed back into
future observation.

Implication: keep action, immediate output/state transition, and longer-horizon
outcome separate. Evaluate side effects and counterfactual or baseline where
available.

Confidence: high.

### FACTORIUM-CTL-09 - Diagnostic views should preserve uncertainty

Source: `tables/diagnostics/factorization-failures.md`, use contract.

Observed constraint: an observation suggests candidate causes and next tests;
it does not prove one diagnosis.

Implication: F4's specialized view should diagnose control-chain failures from
symptoms and discriminating tests rather than prescribe one universal repair.

Confidence: high.

## Recommendations

### Adopt now

- Add one canonical entry with separate objective, monitoring, indicator,
  threshold, alert, feedback-control, governance-control, feedback,
  intervention, and outcome senses.
- Add a Diagnostic Table for control-chain failure isolation.
- Require temporal windows, missing-data behavior, authority, side effects,
  and outcome review.

Owner: Factorium.

Validation: reference round trip, generated projections, tests, role review,
and link integrity.

### Prototype behind a compatibility boundary

- Keep executable alert rules, control laws, policy bodies, and causal models
  in family-specific Markdown.
- Consider typed control-chain edges only after several domains need automated
  impact or loop analysis.

Owner: a future Factorium interchange successor.

Validation: preserve published entry, sense, factor, and view identities.

### Reject or defer

- Reject equating monitoring with control.
- Reject equating threshold crossing with alerting or intervention.
- Reject treating control as always corrective or always technical.
- Defer experimental-control, legal-control, and detailed control-theory
  formula taxonomies.

Non-goal: prescribe one monitoring platform, risk framework, or control law.
