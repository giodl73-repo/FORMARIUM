# Probability, Risk, and Uncertainty

Status: candidate anchor entry

## Orientation

Probability describes events inside a model. Likelihood reuses a sampling
model after data are observed, holding those data fixed while comparing model
parameters. Odds re-express probability against its complement. Risk adds
adverse consequences and decision context. Uncertainty describes incomplete
knowledge; measurement uncertainty is one specialized, method-governed form.

## Sense table

| Sense | Governing question | Kind | Required ownership |
|---|---|---|---|
| `event-probability` | What probability does this model assign to the event? | normalized dimension-one measure | sample space, event, probability measure |
| `conditional-probability` | What is the probability of the event given this condition? | conditioned probability | event, condition, nonzero conditioning probability |
| `likelihood-function` | For these fixed observations and sampling model, how does support vary across parameter values? | parameter-indexed support function | data, observation mechanism, model family, parameter space |
| `odds-in-favor` | How does event probability compare with its complement? | nonnegative ratio | event and complement |
| `risk` | How threatened is the entity by this adverse scenario? | model- or policy-dependent assessment | scenario, likelihood, consequences, controls, horizon |
| `expected-loss` | What probability-weighted average loss does this model imply? | consequence-valued expectation | exhaustive outcomes, probabilities, common loss basis |
| `uncertainty` | What is not known exactly, and how is that lack represented? | interval, distribution, set, scenario, or qualitative state | subject, source, representation, update rule |
| `measurement-uncertainty` | What uncertainty is associated with this measurement result? | metrological quantity and report | measurand, method, components, combined uncertainty, coverage |

## Root factorization

```text
probability-risk-uncertainty-use
  := subject, event, or scenario
   x model and sample space
   x evidence and assumptions
   x condition or complement
   x observed data, sampling, selection, and censoring mechanism
   x statistical model family and common reference measure
   x parameter space, parameterization, and constraints
   x likelihood factorization and dependence structure
   x comparison reference, maximizer, and optimization diagnostics
   x affected entity
   x consequence set
   x time horizon
   x control state
   x uncertainty representation
   x aggregation or decision policy
   x reporting scale and provenance
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Probability vs. odds | represent the same binary event model | bounded event measure vs. event-to-complement ratio |
| Probability vs. likelihood assessment | both express chance language | normalized model probability vs. potentially qualitative or model-specific assessment |
| Probability vs. likelihood function | both use a sampling model | possible data or events vary at fixed parameters vs. parameters vary for fixed observed data |
| Likelihood vs. parameter probability | both can rank parameter values | relative model support vs. normalized probability distribution over parameters |
| Likelihood vs. posterior | likelihood enters Bayesian updating | data contribution under the sampling model vs. prior-updated normalized parameter distribution |
| Likelihood vs. model fit | both concern observations and models | parameter comparison within one declared model vs. broader adequacy diagnostics and alternatives |
| Probability vs. risk | likelihood may contribute to both | event measure vs. consequence-bearing threat assessment |
| Risk vs. expected loss | both combine outcomes and consequences | broader contextual assessment vs. probability-weighted mean loss |
| Uncertainty vs. risk | both concern incomplete future knowledge | lack of knowledge vs. adverse exposure and consequence |
| Measurement uncertainty vs. error | both concern a measured result | characterized dispersion of values vs. unknowable signed difference from a true value |

## Diagnostic examples

- Probability `0.8` corresponds to odds in favor of `4:1`, not `0.8:1`.
- `P(test positive | condition)` is not `P(condition | test positive)`.
- `L(theta; x)` compares parameter values for the same observed `x`; it does
  not assign posterior probabilities to `theta`.
- A continuous density evaluated at an observation is not the probability of
  observing that exact point.
- A low-probability catastrophic event may remain high priority because
  consequence and tolerance matter.
- Two scenarios with the same expected loss can differ in maximum loss,
  reversibility, distribution, and affected population.
- A risk matrix score is not an event probability merely because it is
  normalized to a zero-to-one display.
- A measurement reported as `y +/- U` is incomplete when the coverage factor
  and uncertainty basis are omitted.

## Formula views

- [Probability and Risk Relations](../formulas/probability-risk-uncertainty.md)
  owns conditional probability, likelihood, relative likelihood,
  maximum-likelihood, odds, expected loss, and expanded uncertainty relations.
- [Event Probability Range](../formulas/probability-range.md) owns the
  normalized event-probability constraint.

## Selection procedure

1. Decide whether the question concerns event chance, representation,
   adverse consequence, or incomplete knowledge.
2. For probability, declare sample space, event, and model.
3. For conditional probability, declare the condition and its nonzero
   probability.
4. For odds, name in-favor or against and preserve event/complement order.
5. For likelihood, freeze the observations, sampling/selection mechanism,
   model family, reference measure, parameter space, dependence assumptions,
   and comparison target.
6. Keep likelihood, relative likelihood, maximum-likelihood estimate,
   posterior probability, and model adequacy separate.
7. For risk, define scenario, entity, consequences, horizon, and controls
   before selecting a scoring model.
8. For expected loss, align outcome probabilities and consequence units.
9. For measurement uncertainty, declare measurand, components, combination,
   coverage factor, and interpretation.
10. Keep observed frequency, model probability, risk score, and decision
   threshold separate.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Separates ordinary senses of chance, odds, risk, and uncertainty | Adds model, condition, consequence, and measurement-report contracts |
| Thesaurus | Links chance, possibility, hazard, doubt, exposure, and confidence | Prevents lexical proximity from creating technical equivalence |
| Encyclopedia or textbook | Explains probability, statistics, risk, and metrology | Supplies a compact selection path and cross-domain contrasts |
| Formula sheet | Lists probability, odds, expectation, and interval formulas | Adds event ownership, consequence scope, model limits, and reporting basis |
| Standard or framework | Defines domain-specific risk or uncertainty practice | Preserves source scope instead of universalizing one framework |

## Constraints and failure signs

- Probability requires a declared event and probability model.
- Conditional probability requires a nonzero conditioning probability.
- Likelihood fixes observed data and varies parameters inside one declared
  model and observation contract.
- Likelihood values are not normalized parameter probabilities by default.
- Raw continuous likelihood magnitudes and log likelihoods retain reference-
  measure, data-unit, and parameter-independent-constant scope.
- Maximum likelihood does not establish optimizer uniqueness, model adequacy,
  unbiasedness, uncertainty, causation, or decision value.
- Odds conversion handles probability endpoints explicitly.
- Risk is not determined by likelihood without consequences.
- A product score is not a universal definition of risk.
- Expected loss preserves consequence units and does not express every
  preference or tail concern.
- Measurement uncertainty and event probability are not interchangeable.
- Coverage or confidence interpretations state their basis.
- Qualitative uncertainty is not forced into false numerical precision.

## Cross-references

- [Comparative Quantity](comparative-quantity.md)
- [Information, Data, Signal, and Noise](information-data-signal-noise.md)
- [Cost, Price, Value, Utility, and Return](cost-price-value-return.md)
- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval](statistical-summary-interval.md) — use the `confidence-interval` sense
- [Possibility](../roots/possibility.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [Quantity Value, Numerical Value, Unit, Dimension, and Conversion](quantity-value-unit-conversion.md)
- [Constraint](../roots/constraint.md)
- [Security](../examples/security.md)

## Sources and provenance

1. OpenStax, *Introductory Statistics 2e*, sections 3.1, 3.3, and 4.2:
   https://openstax.org/books/introductory-statistics-2e/pages/3-1-terminology
   https://openstax.org/books/introductory-statistics-2e/pages/3-3-two-basic-rules-of-probability
   https://openstax.org/books/introductory-statistics-2e/pages/4-2-mean-or-expected-value-and-standard-deviation
2. NIST CSRC Glossary, "risk":
   https://csrc.nist.gov/glossary/term/risk
3. NIST Technical Note 1297:
   https://www.nist.gov/pml/nist-technical-note-1297
4. NIST/SEMATECH, “Maximum likelihood estimation”:
   https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
5. MIT OpenCourseWare 18.05, “Maximum Likelihood Estimates”:
   https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/resources/mit18_05_s22_class10-prep-b_pdf/

Comparator access date: 2026-08-14. Probability, risk, and measurement-
uncertainty claims are established within source scope; Factorium organization
remains `candidate`.
