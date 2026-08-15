# Event Probability Range

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Probability, Risk, and Uncertainty](../entries/probability-risk-uncertainty.md)

Sense: `event-probability`

## Orientation

Within a probability model, every event receives a probability between zero
and one inclusive. The bound is a mathematical constraint on a probability
measure; it does not make every arbitrary score in that interval a calibrated
probability.

## Relation

| Field | Value |
|---|---|
| Sense | normalized event-probability bound |
| Relation kind | Constraint |
| Canonical expression | `0 <= P(A) <= 1` |
| Relation authority | established probability axiom/consequence |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Mathematical kind | Unit | Domain | Role |
|---|---|---|---|---|---|
| `A` | event | measurable subset | none | event space | input |
| `P` | probability measure | normalized measure | none | events to real numbers | governing function |
| `P(A)` | probability assigned to event `A` | real scalar | dimensionless | `[0, 1]` | constrained output |

Event, sample space, and probability measure resolve through the canonical
probability-risk-uncertainty anchor at candidate depth.

## Scope and assumptions

- `A` is an event in the declared probability space.
- `P` satisfies the probability model's normalization and additivity rules.
- The bounds include both zero and one.
- Interpretation as frequency, belief, propensity, or model output belongs to
  a narrower sense and evidence contract.
- A score requires calibration and model semantics before being called a
  probability.

## Related constraints

| Relation | Meaning | Restriction |
|---|---|---|
| `P(S) = 1` | Sample-space normalization | `S` is the complete sample space |
| `P(A_complement) = 1 - P(A)` | Complement rule | Complement is relative to the same `S` |
| `P(empty) = 0` | Impossible event | Empty event in the same probability space |

## Dimensional audit

`P(A)`, zero, and one are dimensionless real values.

## Conceptual Factor Table

```text
probability-bound-use
  := sample space
   x event
   x probability measure
   x normalization
   x additivity
   = bounded event probability
   @ interpretation and calibration context
```

## Failure signs

- A number outside `[0, 1]` is reported as an event probability.
- An uncalibrated score is renamed probability because it falls inside the
  interval.
- Events from different sample spaces are combined without a joint model.
- Percent and unit-interval representations are mixed without conversion.
- Normalization or additivity is violated while the output retains probability
  terminology.

## Cross-references

- [Constraint](../roots/constraint.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [Comparative Quantity](../entries/comparative-quantity.md)
- [Probability, Risk, and Uncertainty](../entries/probability-risk-uncertainty.md)
- [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](../entries/measurement-quality.md) — use the `probability-calibration` sense
- [State, Event, Transition, Process, and Lifecycle](../entries/state-event-transition-process-lifecycle.md)

## Sources and provenance

1. OpenStax, *Introductory Statistics 2e*, chapter 3 key terms:
   https://openstax.org/books/introductory-statistics-2e/pages/3-key-terms

Formula authority: established probability constraint. Factorium
representation remains a candidate pending probability and practitioner
review.
