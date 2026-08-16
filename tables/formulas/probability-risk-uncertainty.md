# Probability, Risk, and Uncertainty Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Probability, Risk, and Uncertainty](../entries/probability-risk-uncertainty.md)

## Orientation

These relations connect event probability, parameter likelihood, odds,
consequence-valued expectation, and measurement uncertainty. Probability
varies events or data under fixed parameters; likelihood fixes observed data
and varies parameters. Risk remains a declared model family rather than one
universal multiplication rule.

## Core relations

| Quantity or claim | Canonical expression | Relation kind |
|---|---|---|
| Complement probability | `P(not A) = 1 - P(A)` | probability identity |
| Conditional probability | `P(A given B) = P(A and B) / P(B)` | definition |
| Multiplication rule | `P(A and B) = P(A given B) P(B)` | probability identity |
| Likelihood function | `L(theta; x) = p_theta(x)` or `f_theta(x)` | model-support function with fixed data |
| Independent-sample likelihood | `L(theta; x_1:n) = product_i g_theta(x_i)` | conditional factorization |
| Relative likelihood | `R(theta, theta_0; x) = L(theta; x) / L(theta_0; x)` | dimensionless comparison |
| Relative log likelihood | `Delta ell = log R = sum_i log[g_theta(x_i) / g_theta_0(x_i)]` | dimensionless log comparison |
| Maximum-likelihood estimate | `theta_hat in argmax_(theta in Theta) L(theta; x)` | estimator definition |
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
| `x`, `x_1:n` | fixed observed data | realized values | sampling, selection, censoring, and representation declared |
| `theta`, `theta_0` | candidate and reference parameters | points in `Theta` | model and parameterization declared |
| `p_theta` | probability mass function | normalized over possible discrete data | fixed `theta` for probability use |
| `f_theta` | density relative to a common measure | normalized over possible continuous data | density unit and reference measure declared |
| `g_theta` | applicable observation contribution | mass, density, interval, or survival term | observation mechanism and dependence declared |
| `L(theta; x)` | likelihood for fixed observations | nonnegative function of `theta` | not normalized over `Theta` by default |
| `R` | relative likelihood | nonnegative dimension-one ratio | positive denominator; same data/model/measure |
| `Delta ell` | relative log likelihood | real dimension-one comparison | positive reference likelihood; same representation |
| `theta_hat` | maximum-likelihood estimate | optimizer-set member | existence, uniqueness, and boundary checked |
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

## Likelihood scope

```text
probability use:  theta fixed, possible x varies
likelihood use:   observed x fixed, theta varies
```

For independent observations under one model:

```text
L(theta; x_1:n) = product_i g_theta(x_i)
```

Dependence, censoring, truncation, selection, missingness, and stopping rules
can change this factorization. A parameter-independent positive multiplier
does not change the maximizer, but it does change raw likelihood magnitude.

For comparison against a positive reference likelihood:

```text
R(theta, theta_0; x) = L(theta; x) / L(theta_0; x)
Delta ell = log R
          = sum_i log[g_theta(x_i) / g_theta_0(x_i)]
```

Each ratio inside the logarithm is dimension one when numerator and
denominator use the same observation representation and reference measure.
Raw log likelihood retains an additive representation constant; likelihood
ratios and differences cancel a shared constant.

Maximum likelihood selects an optimizer:

```text
theta_hat in argmax_(theta in Theta) L(theta; x)
```

It does not by itself supply a posterior probability, uncertainty interval,
unique interior solution, model-adequacy result, causal interpretation, or
decision rule.

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
4. For likelihood, freeze observed data, observation mechanism, model family,
   common reference measure, parameter space, and dependence structure.
5. Choose raw, relative, log-relative, or maximum-likelihood use; name the
   comparison reference and optimizer domain.
6. Test boundary, nonexistence, nonuniqueness, numerical, and model-adequacy
   failures separately from obtaining an optimizer.
7. For risk, define the scenario and consequence model before choosing `f`.
8. For expected loss, enumerate outcomes and align consequence units.
9. For measurement uncertainty, define the measurand and uncertainty
   components before calculating `u_c` and `U`.
10. State endpoints, denominators, scales, horizon, and reporting basis.

## Failure signs

- A score in `[0,1]` is called probability without a probability model.
- `P(A given B)` is reversed to `P(B given A)`.
- Conditional probability divides by a zero-probability condition.
- Likelihood is read as `P(theta given x)` without a prior and normalization.
- Likelihoods from different observations, models, reference measures, or data
  representations are compared as raw magnitudes.
- Independence is assumed only to obtain a convenient product.
- Censoring, truncation, selection, missingness, or stopping is omitted from
  the observation contribution.
- A log is applied to a raw density likelihood without fixing the reference
  measure or acknowledging its additive representation constant.
- A numerical maximum is treated as proof of uniqueness, model adequacy,
  estimator quality, or parameter certainty.
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
4. NIST/SEMATECH, “Maximum likelihood estimation”:
   https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
5. NIST/SEMATECH, “Likelihood ratio tests”:
   https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm
6. MIT OpenCourseWare 18.05, “Maximum Likelihood Estimates”:
   https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/resources/mit18_05_s22_class10-prep-b_pdf/

Formula authority: established probability and NIST measurement-uncertainty
relations within stated scope. Risk aggregation remains model-specific.
Factorium presentation remains `candidate`.
