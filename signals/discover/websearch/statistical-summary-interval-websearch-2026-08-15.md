---
skill: discover-websearch
topic: statistical-summary-interval
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Statistical Summary and Interval Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source of claim | Why it needs grounding |
|---|---|---|---|
| 1 | Mean, median, and quantiles answer different location/order questions and can differ materially with skew or heavy tails. | proposed factorization | “Average” and “typical” cannot be universal synonyms. |
| 2 | A weighted mean requires declared weights and a weight-sum denominator; weights encode a design or purpose rather than cosmetic emphasis. | arithmetic-mean graph debt | Otherwise weighted and ordinary means collapse. |
| 3 | Variance and standard deviation describe spread differently; sample/population denominators and units matter. | proposed contrast | A reported spread statistic is ambiguous without its contract. |
| 4 | Standard deviation describes a distribution or observations, while standard error describes a statistic's sampling distribution. | recurring misuse | Sample scatter must not be mistaken for estimate precision. |
| 5 | A confidence interval is a method-specific parameter interval with repeated-sampling coverage, distinct from prediction, tolerance, and specification intervals. | confidence-interval graph debt | Interval endpoints do not share one interpretation. |

## Phase 2 - Web evidence

### Claim 1

- Query 1: `site:itl.nist.gov/div898/handbook measures of location mean median distribution`
  - Source: https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm
  - Direct quote: “find a typical or central value that best describes the data”
  - Relevance: NIST distinguishes several location estimators and their distribution dependence.
- Query 2: `site:itl.nist.gov/div898/handbook percentile quantile definition`
  - Source: https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm
  - Direct quote: “The 50th percentile is called the median.”
  - Relevance: median is a particular order-based quantile, with multiple interpolation conventions for other percentiles.
- Verdict: CONFIRMED

### Claim 2

- Query 1: `site:itl.nist.gov weighted mean formula weights`
  - Source: https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf
  - Direct quote: “where wi is the weight for the ith observation”
  - Relevance: the weighted numerator and sum-of-weights denominator differ from the ordinary mean.
- Query 2: `site:census.gov survey weighted estimator mean weights`
  - Source: https://www.census.gov/content/dam/Census/library/working-papers/2011/demo/huang-bell2011.pdf
  - Direct quote: “could be a survey weighted estimator”
  - Relevance: survey weights belong to an estimation design, not a generic importance label.
- Verdict: CONFIRMED

### Claim 3

- Query 1: `site:itl.nist.gov sample variance N-1 standard deviation formula`
  - Source: https://www.itl.nist.gov/div898/handbook/prc/section2/prc23.htm
  - Direct quote: “with N-1 degrees of freedom”
  - Relevance: the common sample estimator has a declared denominator and target.
- Query 2: `site:itl.nist.gov measures of scale standard deviation variance units`
  - Source: https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm
  - Direct quote: “The standard deviation restores the units”
  - Relevance: variance has squared units; standard deviation returns to the observation unit.
- Verdict: CONFIRMED

### Claim 4

- Query 1: `site:itl.nist.gov standard error sampling distribution definition`
  - Source: https://www.itl.nist.gov/div898/handbook/glossary.htm
  - Direct quote: “The standard deviation for a statistic's sampling distribution.”
  - Relevance: this directly distinguishes estimate variability from data variability.
- Query 2: `site:itl.nist.gov sampling scheme standard error precision estimate`
  - Source: https://www.itl.nist.gov/div898/handbook/ppc/section3/ppc332.htm
  - Direct quote: “The size of this random variation is measured ... [by] standard error.”
  - Relevance: standard error depends on estimator, variability, replication, and design.
- Verdict: CONFIRMED

### Claim 5

- Query 1: `site:itl.nist.gov confidence interval repeated samples coverage interpretation`
  - Source: https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm
  - Direct quote: “the resulting intervals would bracket the true population parameter”
  - Relevance: confidence belongs to the interval procedure under repeated sampling.
- Query 2: `site:itl.nist.gov confidence prediction tolerance interval distinction`
  - Sources: https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd132.htm and https://www.itl.nist.gov/div898/handbook/prc/section2/prc263.htm
  - Direct quotes: “a new measurement is a random variable, not a parameter” and “cover a fixed proportion of the population”
  - Relevance: prediction and tolerance intervals answer different target questions.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | A distribution is characterized through location, spread, and shape rather than one center alone. | CONFIRMED | [NIST distribution](https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc131.htm) |
| 2 | The arithmetic mean is the sum of included values divided by their count. | CONFIRMED | [NIST location](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm) |
| 3 | The median is order-based and splits observations around a central rank. | CONFIRMED | [NIST location](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm) |
| 4 | Skew and heavy tails can make mean and median materially different summaries. | CONFIRMED | [NIST location](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm) |
| 5 | The median is the 50th percentile. | CONFIRMED | [NIST percentiles](https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm) |
| 6 | Sample quantiles can differ by interpolation convention, especially for small samples. | CONFIRMED | [NIST percentiles](https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm) |
| 7 | A weighted mean divides the weighted sum by the sum of weights. | CONFIRMED | [NIST weighted mean](https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf) |
| 8 | Frequency weights are one legitimate weighting interpretation; survey or precision weights have different origins. | CONFIRMED | [NIST weighted mean](https://www.itl.nist.gov/div898/software/dataplot/refman2/ch2/weigmean.pdf) |
| 9 | Variance aggregates squared deviations from a specified center. | CONFIRMED | [NIST scale](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm) |
| 10 | The common sample-variance estimator uses `n-1` when targeting population variance under its assumptions. | CONFIRMED | [NIST variance](https://www.itl.nist.gov/div898/handbook/prc/section2/prc23.htm) |
| 11 | Standard deviation is the square root of variance. | CONFIRMED | [NIST variability](https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc132.htm) |
| 12 | Standard deviation has the observation unit while variance has the squared unit. | CONFIRMED | [NIST scale](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm) |
| 13 | Variance and standard deviation can be highly sensitive to tail behavior. | CONFIRMED | [NIST scale](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm) |
| 14 | Standard error is the standard deviation of a statistic's sampling distribution. | CONFIRMED | [NIST glossary](https://www.itl.nist.gov/div898/handbook/glossary.htm) |
| 15 | Standard error depends on inherent variability, measurement error, independent replication, and sampling efficiency. | CONFIRMED | [NIST sampling scheme](https://www.itl.nist.gov/div898/handbook/ppc/section3/ppc332.htm) |
| 16 | A confidence interval targets a population or model parameter, not the spread of raw observations. | CONFIRMED | [NIST confidence intervals](https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm) |
| 17 | Frequentist confidence level characterizes long-run coverage of the procedure, not posterior probability for the realized fixed interval. | CONFIRMED | [NIST mean limits](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm) |
| 18 | A prediction interval targets a new observation and includes its additional variability. | CONFIRMED | [NIST prediction](https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd132.htm) |
| 19 | A tolerance interval targets a stated proportion of population values, while a specification interval states acceptability. | CONFIRMED | [NIST tolerance](https://www.itl.nist.gov/div898/handbook/prc/section2/prc263.htm) |

Summary: 5 of 5 claims confirmed; 19 grounded findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims. No source supports choosing a center, spread statistic,
weighting scheme, or interval type without first naming its target and use.

## Phase 5 - Amend

1. Organize the anchor by target question rather than formula resemblance.
2. Preserve sample/population, weight, denominator, unit, estimator, design,
   and interval-procedure contracts.
3. Contrast confidence, prediction, tolerance, and specification intervals
   explicitly even though only confidence interval is admitted as a sense.
