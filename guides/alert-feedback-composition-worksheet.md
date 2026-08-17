# Alert and Outcome Feedback Composition Worksheet

Guide ID: `alert-feedback-composition-worksheet`

Status: candidate simulation Factor Guide

Trace ID: `alert-outcome-feedback`

Review: fixed point; see
[`reverse-incomplete-composition-design-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/reverse-incomplete-composition-design-2026-08-16.md)
and
[`reverse-incomplete-composition-roles-check-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/reverse-incomplete-composition-roles-check-2026-08-16.md)

## Local problem and decision

A software team changes a synthetic service alert from a 2% error threshold
over five minutes to a 1% threshold over five minutes. More alerts reach the
on-call team, but no user-outcome observation has been supplied.

Decision: which concepts are needed to decide whether the changed monitoring
and response loop improved user outcomes, merely changed alert volume, or
remains unevaluable?

Intended reader: an operations, product, or control practitioner reviewing a
monitoring-policy change before describing it as an improvement.

## Scope and non-goals

This is a synthetic publication rehearsal. The percentages, service, alert
history, and team are invented. The worksheet does not diagnose a real system,
recommend an alert threshold, estimate an effect, or establish that more or
fewer alerts are better.

It tests two trace behaviors not exercised by the prior worksheets: reverse
traversal over a directional relation and an honest `incomplete` closure when
a required outcome observation is missing.

## Local evidence

| Local item | Supplied | Missing or deliberately withheld |
|---|---|---|
| Monitoring rule | threshold changed from 2% to 1%; both use a five-minute window | indicator numerator, denominator, missing-data policy, persistence, and hysteresis |
| Operational response | more alerts reached the on-call team | acknowledgment, action, escalation, authority, and response capacity |
| Immediate output | alert volume increased | incident precision, recall, actionability, and duplicate routing |
| User outcome | none supplied | outcome definition, population, measure, baseline, horizon, and unintended effects |
| Change custody | synthetic before/after configuration description | stable configuration identities and deployment record |

These statements support a bounded lookup problem only. They do not show that
the threshold change caused any service or user outcome.

## Local Context Profile declaration

Profile ID: `synthetic-feedback-review`

Status: candidate, worksheet-local

Scope: this one alert-policy review; not a repository-global default

| Context field | Declaration |
|---|---|
| Applicability predicate | use only for the invented alert-threshold scenario on this page |
| Inherited default | treat monitoring, alerting, intervention, and outcome as separate stages |
| Convention | read time from earlier configuration through later response and outcome review |
| Required selection | service boundary, indicator contract, comparison window, affected population, response owner, intervention, and outcome horizon |
| Supplied selection | boundary = declared service; reference frame = service observation window |
| Still required | exact indicator contract, configuration versions, missingness behavior, response trace, outcome definition, and observed outcome record |
| Allowed override | a reviewer may substitute a versioned indicator, window, population, or outcome measure if the source is recorded |
| Prohibited override | do not treat alert count, acknowledgment, or threshold compliance as a user outcome by default |
| Invalidation | invalidate the guide if the service boundary, indicator semantics, rule version, population, or outcome horizon changes without rebinding |
| Custody | synthetic author-declared context; no observed participant or production data |

The profile supplies a reading frame. It does not fill the missing outcome
record or convert operational activity into evidence of benefit.

## Seed and sense narrowing

The query begins from
`factor:control-monitoring-response/monitoring-method-window-and-frequency`.

| Candidate sense | Disposition | Reason |
|---|---|---|
| `monitoring` | selected | the question begins from an observation process and its configured window |
| `threshold` | selected in explanation | the changed boundary alters classification or attention |
| `alert` | selected in explanation | alert delivery is a communication event, not the outcome |
| `feedback` | selected | observed outcomes may feed later monitoring and response revision |
| `outcome` | required but missing locally | user impact must be defined and observed over a horizon |
| `intervention` | retained as an unresolved branch | an alert is not itself the action taken on the service or environment |
| `feedback-control` | rejected for this trace | metrics and alerts alone do not establish an automated closed-loop controller |

Sense narrowing explains the reader choice. The machine trace owns only the
three exact working-graph artifacts below.

## Declared composition

| Step | Reader label | Exact typed action | Guardrail |
|---:|---|---|---|
| 1 | Add | seed the monitoring-method/window factor | do not infer an outcome from alert activity |
| 2 | Multiply | traverse F4 `feeds` in reverse from monitoring to its required outcome measure | reverse traversal changes lookup direction, not relation meaning |
| 3 | Evaluate | run the Control and Response Failure Diagnostic | an unresolved diagnostic is not a failed system or a successful repair |
| 4 | Flatten | project the bounded trace into the guide below | retain the missing outcome and incomplete state |

Policy: direction `reverse`; follow set `evaluative-required`; stop at stable
identity. Budgets: depth 1, edges 1, nodes 3, total work 9.

## Working graph

| Artifact | Class | Depth | Origin | Predecessor |
|---|---|---:|---|---|
| monitoring method, window, and frequency | required seed | 0 | seed | none |
| outcome measures and time horizon | required | 1 | reverse traversal of F4 | monitoring method, window, and frequency |
| Control and Response Failure Diagnostic | evaluative | 1 | scope of F4 | monitoring method, window, and frequency |

Typed edge: F4 `outcome measures and time horizon` **feeds** `monitoring method,
window, and frequency`, qualified by `condition=observed-effect`.

The query traverses that edge in reverse because the reader starts with a
monitoring change and asks which outcome evidence must feed its review. The
edge itself is not reversed: an alert configuration does not produce or prove
an outcome merely because reverse lookup reaches the outcome factor.

Closure state: `incomplete`. Stable identity stops this one-edge traversal;
the feedback concept does not authorize repeated graph expansion around a
loop. The declared diagnostic remains unresolved because no outcome measure
and horizon are supplied.

## Evaluation

Declared check: `outcome-feedback-diagnostic`, kind `diagnostic`, target
[Control and Response Failure Diagnostic](../tables/diagnostics/control-response-failures.md).

| Diagnostic distinction | Supplied status | Guide consequence |
|---|---|---|
| Indicator and rule | partial threshold/window description | preserve the change, but require the full versioned indicator contract |
| Alert and response | increased alert delivery only | do not infer acknowledgment, intervention, or effective action |
| Outcome measure | absent | user benefit or harm cannot be evaluated |
| Time horizon | absent beyond the rule window | do not substitute a five-minute alert window for an outcome horizon |
| Feedback path | proposed review relationship only | no repeated causal or control-loop behavior is inferred |
| Unintended effects | absent | on-call load and neighboring service effects remain unresolved |

Diagnostic outcome: `unresolved`. Trace outcome: `incomplete` because the
required outcome evidence is missing and recorded rather than defaulted.

Summary: **incomplete trace; unresolved improvement decision**.

## Flattened Factor Guide projection

### Result

Report only the bounded operational statement:

> In the synthetic scenario, the configured error threshold changed from 2%
> to 1% over the same stated five-minute window, and more alerts were delivered.

Do not report that monitoring improved, the service became more reliable, or
users benefited. Those conclusions require a stable indicator contract,
response trace, and observed outcome measures over a declared horizon.

### Factor and record assignment

| Canonical factor or view | Local role | Candidate record | Current status |
|---|---|---|---|
| monitoring method, window, and frequency | query seed | versioned indicator and monitoring configuration | partial |
| outcome measures and time horizon | required feedback input | user-impact outcome record | missing and unresolved |
| Control and Response Failure Diagnostic | Evaluation | diagnostic review over monitoring, response, and outcome stages | unresolved |

### Required controls

| Control | Required record | Failure prevented |
|---|---|---|
| Indicator identity | numerator, denominator, source, measurement point, missingness, and version | same label hiding a changed measurement |
| Threshold policy | operator, window, persistence, hysteresis, reset, and version | noisy classification being mistaken for sensitivity improvement |
| Response trace | delivery, acknowledgment, decision, authority, action, and escalation | alert delivery being mistaken for intervention |
| Outcome contract | population, measure, baseline, horizon, uncertainty, and unintended effects | operational activity being substituted for benefit |
| Change custody | configuration identities, deployment time, owner, and reviewer | an anecdotal before/after description becoming a governed comparison |

### Projection loss

| Projection row | Disposition | Declared loss |
|---|---|---|
| monitoring factor | selected | retains the stated change but omits the missing full indicator contract |
| outcome factor | unresolved | records absence; omits no invented value |
| diagnostic view | selected | omits its full row set and does not choose one candidate cause |

The projection is a candidate Factor Guide, not a canonical entry or a
diagnosis. Its manifest preserves the reverse traversal and incomplete state.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| A versioned user-outcome record is supplied | the diagnostic may be rerun and closure may change | alert activity remains separate from outcome evidence |
| Alert volume falls after persistence is added | noise may fall | fewer alerts alone still does not prove better user outcomes |
| On-call action is recorded | response trace becomes less incomplete | delivery, acknowledgment, intervention, and outcome remain distinct |
| Indicator numerator or denominator changes | invalidate the comparison and rebind context | identical display labels do not guarantee identical measures |
| A severe low-volume harm is found | broaden or stratify outcome review | threshold compliance is not universal reliability |
| An automated actuator is added | consider a feedback-control analysis | monitoring plus alerting alone was not retroactively a controller |

## Rejected shortcuts and unresolved choices

Rejected: more-alerts-means-better-monitoring, threshold-met-means-objective-met,
alert-means-intervention, activity-means-outcome, reverse-traversal-reverses-edge,
feedback-means-unbounded-cycle, and unresolved-means-failed-system.

Unresolved: full indicator semantics, rule identities, missing-data behavior,
alert quality, response authority and capacity, intervention record, user
population, outcome measure, horizon, uncertainty, side effects, and the
improvement decision.

## Exact trace manifest

Canonical trace file: `fixtures/composition/alert-feedback.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium reference V0 | `5a482db494fb415e3ce0e57e2669c460924756cdbd8d03fe979367cf478b9e8e` |
| Typed relations V0 | `e8371c340bf196d6318d0471e118eeffeb067c3a62dc9f8c038b6a59fe76624b` |
| Composition Query trace | `fca3e06795850ab927c9777e35a08130bdd8ac410490cb7fd297cf9215a1b6d8` |

Trace manifest: one seed, three nodes, one reverse-traversed F4 edge, zero
frontiers, zero conflicts, one unresolved Diagnostic check, three projection
rows, state `incomplete`.

The exact trace validates through `composition-query-check`. Explanatory
sense choices, local evidence, and missing controls on this page do not add
machine edges or silently complete the graph.

## Canonical sources and custody

1. [Objective, Control, Monitoring, and Response](../tables/entries/control-monitoring-response.md)
2. [Control and Response Failure Diagnostic](../tables/diagnostics/control-response-failures.md)
3. [Context Profile V0](../specs/CONTEXT-PROFILE.md)
4. [Composition Query Trace V0](../specs/COMPOSITION-QUERY.md)
5. [Factor Guide Format V0](../specs/FACTOR-GUIDE.md)

Canonical entries, factors, relation, diagnostic view, and source digests come
from the reference corpus and typed-relation sidecar. The scenario, context,
sense narrative, Evaluation application, and projection are synthetic author
work. No production telemetry, user observation, threshold recommendation,
control result, or external-reader evidence is claimed.
