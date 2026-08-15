# Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval

Status: candidate anchor entry

## Orientation

An arithmetic mean divides an equally weighted sum by its count; a weighted
mean uses declared weights and their sum. A median is a rank-based center
under a stated finite-sample convention and a particular quantile. Variance summarizes squared deviations;
standard deviation restores the original unit. Standard error describes the
sampling variability of a statistic or estimator, not the scatter of raw
observations. A confidence interval is produced by a method intended to cover
a parameter at a stated long-run rate under its assumptions. These summaries
answer different questions and none is universally “typical” or “precise.”

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `arithmetic-mean` | What equally weighted sum-per-included-value statistic is requested? | location statistic or estimator |
| `weighted-mean` | What weight-governed average is requested, and what do the weights represent? | weighted location statistic or estimator |
| `median` | What value or convention divides the ordered data around the central rank? | rank-based location statistic |
| `quantile` | What value corresponds to a declared cumulative proportion under a stated convention? | order/distribution boundary statistic |
| `variance` | What average or estimated squared deviation from the selected center is requested? | squared-unit spread measure |
| `standard-deviation` | What square-root-of-variance spread is requested for the selected data or distribution? | original-unit spread measure |
| `standard-error` | What standard deviation belongs to the sampling distribution of the selected statistic or estimator? | estimator-variability measure |
| `confidence-interval` | What method-specific interval targets a parameter with a stated repeated-sampling coverage level? | inferential interval result |

## Chain view

```text
observed/analytic values + inclusion/order/weight convention
  -- descriptive calculation --> mean / median / quantile / variance / standard deviation

target parameter + estimator + sampling/dependence design
  -- repeated samples imply --> sampling distribution
  -- its spread is summarized by --> standard error
  -- interval procedure + level + assumptions produces --> confidence interval
```

## Root factorization

```text
statistical-summary-interval-use
  := exact descriptive, inferential, or decision question
   x population, sample, analytic set, and unit of analysis
   x variable, quantity kind, scale, unit, and support
   x inclusion, missingness, censoring, and transformation policy
   x ordering, ties, and quantile convention
   x center or target parameter
   x deviations, denominator, and degrees of freedom
   x weights, weight meaning, normalization, and effective sample size
   x estimator and sampling or dependence design
   x sampling distribution and standard-error method
   x interval target, sidedness, level, procedure, and assumptions
   x robustness, sensitivity, diagnostics, and alternatives
   x provenance, software/version, reporting, and revision
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Data location | values x inclusion x unit x distribution shape x center rule | center rule | describing a batch or empirical distribution | “average” used without naming mean or median |
| Order summary | ordered values x ties x probability/rank x interpolation | quantile convention | medians, percentiles, thresholds, tails | software defaults assumed identical |
| Weighted location | values x weights x weight semantics x normalization x exclusions | weight meaning | frequencies, survey estimators, mixtures, precision weighting | arbitrary weights treated as neutral |
| Data spread | center x deviations x power x denominator x unit transformation | spread definition | variance or standard deviation of data/distribution | population and sample formulas mixed |
| Estimator precision | estimand x estimator x design x dependence x repeated-sample distribution | estimator | standard errors and sampling precision | raw SD divided by root-n automatically |
| Parameter interval | parameter x estimator x procedure x level x sidedness x assumptions | coverage procedure | confidence bounds for a parameter | realized interval given posterior language |
| Decision comparison | estimate x uncertainty x specification/tolerance x loss x action | decision use | acting on summaries and intervals | overlap or nonoverlap used as universal test |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Mean vs. median | both describe location | magnitude-weighted sum/count vs. order-based central rank |
| Median vs. quantile | both are order-based | central 0.5 case vs. arbitrary cumulative proportion |
| Arithmetic vs. weighted mean | both normalize sums | equal contribution per included value vs. declared unequal weights |
| Variance vs. standard deviation | both measure squared-deviation spread | squared units vs. square root in the original unit |
| Population vs. sample variance | both summarize spread | finite population/distribution definition vs. estimator with declared denominator and target |
| Standard deviation vs. standard error | both are standard deviations | distribution/observation spread vs. statistic sampling-distribution spread |
| Confidence interval vs. prediction interval | both are probabilistic intervals | parameter/mean response vs. a future observation |
| Confidence interval vs. tolerance interval | both use confidence language | parameter target vs. a stated proportion of population values |
| Confidence interval vs. credible interval | both bound a parameter | frequentist procedure coverage vs. posterior probability under a Bayesian model |
| Confidence interval vs. specification limits | both provide endpoints | inferential result vs. externally selected acceptability bounds |

## Diagnostic examples

- Salaries with a few extreme values can have a mean far above the median;
  neither number is intrinsically the correct definition of “typical.”
- A weighted mean of subgroup rates changes meaning when weights represent
  sample counts, target-population shares, precision, or preference.
- Two tools can report different 90th percentiles from the same small sample
  because their interpolation conventions differ.
- A standard deviation of individual response times does not equal the
  standard error of their estimated mean under clustering or dependence.
- A narrow interval around a biased estimate remains narrowly wrong.
- A confidence interval for an average response is usually narrower than a
  prediction interval for one future response because their targets differ.

## Selection procedure

1. State the exact descriptive, inferential, or decision question and target.
2. Freeze population, sample, analytic set, unit, variable, scale, unit,
   support, transformations, exclusions, missingness, and censoring.
3. Inspect distribution shape, tails, multimodality, dependence, and subgroups
   before choosing one center or spread statistic.
4. For an arithmetic mean, align the included sum and count and require
   comparable quantity kinds and units.
5. For a weighted mean, declare each weight's meaning, source, normalization,
   eligibility, zero/negative policy, effective sample size, and uncertainty.
6. For a median or quantile, declare ordering, tie handling, probability/rank,
   and finite-sample interpolation convention.
7. For variance or standard deviation, state population/sample target, center,
   denominator, degrees of freedom, unit, and tail sensitivity.
8. For standard error, name the estimand, estimator, sampling/dependence design,
   repeated-sample target, estimation method, and finite-sample corrections.
9. For a confidence interval, name the parameter, estimator, procedure, level,
   sidedness, critical/reference distribution or resampling method, and assumptions.
10. Distinguish confidence, prediction, tolerance, credible, uncertainty, and
    specification intervals before interpreting endpoints.
11. Report sample size and all stage denominators with robustness, sensitivity,
    subgroup, and alternative-summary checks.

## Formula view

The [Sample Arithmetic Mean](../formulas/arithmetic-mean.md) gives the equally
weighted finite-sample relation and its dimensional and inclusion contract.

## Constraints and failure signs

- `average` never appears where the exact statistic changes interpretation.
- Means do not combine incompatible quantities or units.
- Weights retain their semantics, provenance, normalization, and design effect.
- Median and quantile computations state ordering and software convention.
- Variance and standard deviation state target, denominator, and units.
- Standard deviation and standard error never share one unlabeled `SD` field.
- Standard error accounts for estimator, dependence, sampling design, and
  effective replication rather than defaulting mechanically to `s/sqrt(n)`.
- Confidence intervals state parameter, method, level, sidedness, assumptions,
  and achieved/claimed coverage basis.
- Confidence, prediction, tolerance, credible, uncertainty, and specification
  intervals retain separate targets and interpretations.
- Narrowness is not used as proof of unbiasedness, validity, or decision value.

## Specialized view

The [Statistical Summary and Interval Failure Diagnostic](../diagnostics/statistical-summary-interval-failures.md)
maps center conflicts, unstable quantiles, weight failures, denominator errors,
clustered precision, and interval misuse to candidate causes and tests.

## Cross-references

- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](measurement-quality.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Information, Data, Signal, and Noise](information-data-signal-noise.md)
- [Comparative Quantity](comparative-quantity.md)
- [Measure](../roots/measure.md)

## Sources and provenance

1. [Statistical summary and interval research note](../../docs/research/2026-08-15-statistical-summary-interval.md)
2. NIST/SEMATECH, “Measures of Location”:
   https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm
3. NIST/SEMATECH, “Measures of Scale”:
   https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm
4. NIST/SEMATECH, “Percentiles”:
   https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm
5. NIST/SEMATECH, “What are confidence intervals?”:
   https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm

Comparator access date: 2026-08-15. Statistical procedures retain their
source assumptions; this cross-domain organization remains `candidate`.
