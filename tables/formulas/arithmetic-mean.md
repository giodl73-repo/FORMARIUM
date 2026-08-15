# Sample Arithmetic Mean

Status: candidate Formula Table

Primary family: Formula Table

## Orientation

The sample arithmetic mean summarizes equally weighted numerical observations
by dividing their sum by their count. It is a statistic computed from the
selected sample; whether it usefully represents location or estimates a
population quantity depends on sampling and distribution conditions.

## Relation

| Field | Value |
|---|---|
| Sense | equally weighted sample arithmetic mean |
| Relation kind | Estimator or statistic |
| Canonical expression | `x_bar = (1 / n) sum(i = 1..n, x_i)` |
| Relation authority | established statistical definition |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Quantity kind | Unit | Dimension | Role |
|---|---|---|---|---|---|
| `x_bar` | sample arithmetic mean | scalar | same as `x_i` | same as `x_i` | computed statistic |
| `x_i` | included observation at index `i` | scalar | one common quantity unit | one common dimension | input |
| `n` | number of included observations | positive integer | count | dimensionless | denominator |
| `i` | observation index | integer | none | dimensionless | index |

Observation is owned by [Claim and Evidence](../entries/claim-evidence.md);
sample and population are owned by the sampling-and-generalization anchor.

## Scope and assumptions

- `n` counts exactly the observations included in the sum.
- Observations represent the same measurable quantity or a justified common
  scale.
- Each included observation receives equal weight.
- Missing, censored, invalid, and duplicate values follow a declared inclusion
  policy.
- Using `x_bar` to estimate a population mean requires a separate sampling and
  inference contract.

## Equivalent forms

| Form | Use | Restriction |
|---|---|---|
| `x_bar = sum(x_i) / n` | Compact finite-sample form | `n` must be positive |
| `sum(x_i) = n x_bar` | Recover the included total | Same inclusion and weighting contract |

A weighted mean is an alternative formula, not an algebraic rearrangement of
the equally weighted sample mean.

## Dimensional audit

```text
[x_bar] = [x_i]
[sum(x_i) / n] = [x_i] / 1
                  = [x_i]
```

## Conceptual Factor Table

```text
sample-mean-use
  := sample boundary
   x observations
   x inclusion policy
   x equal weighting
   x count
   x missing-data policy
   = arithmetic mean
   @ distribution and inference context
```

## Failure signs

- `n` includes records omitted from the sum or excludes records included in it.
- Mixed units or incomparable scales are averaged directly.
- Extreme values dominate while the result is described as a typical value.
- A Cauchy-like or heavy-tailed distribution is summarized without inspecting
  robust alternatives.
- The sample mean is treated as an unbiased or precise population estimate
  without a sampling contract.
- A weighted calculation is labeled as the ordinary sample mean.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Measure](../roots/measure.md)
- [Policy](../roles/policy.md)
- [Population, Sample, Estimand, Estimate, and Generalization](../entries/sampling-generalization.md)
- median — `unresolved-candidate`
- weighted mean — `unresolved-candidate`

## Sources and provenance

1. OpenStax-derived Business Statistics, "Sigma Notation and Calculating the
   Arithmetic Mean":
   https://stats.libretexts.org/Bookshelves/Applied_Statistics/Business_Statistics_(OpenStax)/02%3A_Descriptive_Statistics/2.04%3A_Sigma_Notation_and_Calculating_the_Arithmetic_Mean
2. NIST/SEMATECH, *e-Handbook of Statistical Methods*, "Measures of
   Location":
   https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm

Formula authority: established statistic. Factorium representation remains a
candidate pending statistical and practitioner review.
