# Probability, Risk, and Uncertainty Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Probability, Risk, and Uncertainty](../entries/probability-risk-uncertainty.md)

## Orientation

These relations connect event probability, odds, consequence-valued
expectation, and measurement uncertainty. Risk itself remains a declared model
family rather than one universal multiplication rule.

## Core relations

| Quantity or claim | Canonical expression | Relation kind |
|---|---|---|
| Complement probability | `P(not A) = 1 - P(A)` | probability identity |
| Conditional probability | `P(A given B) = P(A and B) / P(B)` | definition |
| Multiplication rule | `P(A and B) = P(A given B) P(B)` | probability identity |
| Odds in favor | `O_A = P(A) / (1 - P(A))` | representation mapping |
| Probability from odds | `P(A) = O_A / (1 + O_A)` | inverse mapping |
| Discrete expected loss | `E[L] = sum_i P_i L_i` | expectation |
| Risk model family | `R_model = f(scenario, likelihood, consequences, controls, horizon)` | model schema |
| Expanded uncertainty | `U = k u_c` | metrological relation |
| Measurement report | `Y = y +/- U` | interval report with declared basis |

The [Event Probability Range](probability-range.md) separately owns
`0 <= P(A) <= 1`.

## Symbol contract

| Symbol | Meaning | Kind | Restriction |
|---|---|---|---|
| `A`, `B` | events | sets in one probability space | model and sample space declared |
| `P` | probability measure | normalized measure | additivity and normalization satisfied |
| `P(A given B)` | conditional event probability | scalar in `[0,1]` | `P(B) > 0` |
| `O_A` | odds in favor of `A` | nonnegative ratio | finite for `P(A) < 1`; event order declared |
| `P_i` | probability of outcome `i` | nonnegative scalar | outcomes and total probability declared |
| `L_i` | loss for outcome `i` | consequence-valued scalar | common unit, perspective, and horizon |
| `R_model` | output of a declared risk model | model-specific | scale and aggregation documented |
| `u_c` | combined standard uncertainty | nonnegative quantity | same unit as measurand |
| `k` | coverage factor | positive dimension-one scalar | selection basis reported |
| `U` | expanded uncertainty | nonnegative quantity | `k` and `u_c` reported |
| `y` | measured quantity estimate | scalar quantity | measurand and method declared |
| `Y` | measurand value represented by report | quantity | interval interpretation stated |

## Endpoint behavior for odds

```text
P(A) = 0  -> O_A = 0
P(A) -> 1 -> O_A grows without bound
P(A) = 1  -> finite odds ratio is undefined/infinite by convention
```

Odds against reverse the event and complement:

```text
O_against_A = (1 - P(A)) / P(A)
```

The representation direction must be named.

## Expected-loss scope

```text
E[L] = sum_i P_i L_i
```

is valid when outcomes are consistently accounted, probabilities belong to
one model, and losses share a unit and perspective. It is not a universal risk
definition and may hide tail severity, distribution, ambiguity, and
nonlinear preferences.

## Measurement-uncertainty scope

```text
U = k u_c
Y = y +/- U
```

requires reporting `k`, the uncertainty components and evaluations, and the
basis for any confidence or coverage interpretation. `k = 2` is not an
automatic universal proof of exactly 95% coverage.

## Selection procedure

1. Define event, sample space, model, and evidence.
2. Choose unconditional probability, conditional probability, or odds.
3. Preserve conditioning and event/complement direction.
4. For risk, define the scenario and consequence model before choosing `f`.
5. For expected loss, enumerate outcomes and align consequence units.
6. For measurement uncertainty, define the measurand and uncertainty
   components before calculating `u_c` and `U`.
7. State endpoints, denominators, scales, horizon, and reporting basis.

## Failure signs

- A score in `[0,1]` is called probability without a probability model.
- `P(A given B)` is reversed to `P(B given A)`.
- Conditional probability divides by a zero-probability condition.
- Odds are displayed as probability or percent without conversion.
- Infinite endpoint odds are forced into an arbitrary finite number.
- Risk is reduced to likelihood alone.
- `likelihood * impact` is claimed as a universal definition.
- Expected losses mix consequence units or stakeholder perspectives.
- A low expected loss hides an unacceptable catastrophic tail.
- `y +/- U` omits `k`, `u_c`, or the interpretation basis.

## Reference Delta

The canonical
[Probability, Risk, and Uncertainty entry](../entries/probability-risk-uncertainty.md)
owns the full comparison. Relative to a formula sheet, this view adds model,
event, condition, complement, consequence, horizon, control, measurand, and
coverage contracts.

## Sources and provenance

1. OpenStax, *Introductory Statistics 2e*, sections 3.1, 3.3, and 4.2:
   https://openstax.org/books/introductory-statistics-2e/pages/3-1-terminology
   https://openstax.org/books/introductory-statistics-2e/pages/3-3-two-basic-rules-of-probability
   https://openstax.org/books/introductory-statistics-2e/pages/4-2-mean-or-expected-value-and-standard-deviation
2. NIST CSRC Glossary, "risk":
   https://csrc.nist.gov/glossary/term/risk
3. NIST Technical Note 1297, sections 6 and 7:
   https://www.nist.gov/pml/nist-technical-note-1297

Formula authority: established probability and NIST measurement-uncertainty
relations within stated scope. Risk aggregation remains model-specific.
Factorium presentation remains `candidate`.
