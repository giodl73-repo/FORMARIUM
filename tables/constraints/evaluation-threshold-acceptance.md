# Evaluation Threshold and Acceptance Constraint Table

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `tolerance`, `criterion`, `evaluation-result`

## Governing question

Which invariants must hold before a threshold, gate, veto, limit, or acceptance
region can change an evaluation status or action?

## Constraints

| ID | Requirement | Invalid when | Evidence to retain |
|---|---|---|---|
| `ET-01` | bind the exact subject, measure, unit/scale, direction, and version | threshold compares another sense or implementation | canonical measure and rule identity |
| `ET-02` | state comparison operator and boundary inclusion | equality, rounding, or interval endpoints are ambiguous | executable comparison examples |
| `ET-03` | retain window, persistence, hysteresis, reset, and repeat behavior | transient crossing is treated as durable state | event and state history |
| `ET-04` | define missing, censored, uncertain, or indeterminate behavior | absent evidence silently passes or fails | explicit third-state/disposition rule |
| `ET-05` | separate soft threshold, hard gate, veto, capacity limit, and tolerance | preference becomes prohibition or physical bound | rule kind and authority |
| `ET-06` | declare acceptance region across all required dimensions | one passing scalar hides a failed noncompensatory dimension | component vector and region rule |
| `ET-07` | bind exceptions, overrides, appeals, and expiration | manual action erases the original result | authority and revision record |
| `ET-08` | preserve distance, uncertainty, and practical consequence near the boundary | pass/fail display implies certainty or large difference | source values and uncertainty |

## Failure signs

- a rounded display crosses a boundary while the source interval straddles it;
- two rules use the same label but different populations or windows;
- a veto is averaged away by strong performance elsewhere;
- missing values count as success because they leave the denominator;
- threshold tuning on the evaluation set is reported as independent evidence;
- acceptance is generalized into safety, validity, effectiveness, or approval.

## Sources and provenance

See the canonical entry and existing Control/Monitoring, Policy/Decision, and
Measurement Quality owners. This view validates a declared boundary rule; it
does not establish that the boundary is appropriate.
