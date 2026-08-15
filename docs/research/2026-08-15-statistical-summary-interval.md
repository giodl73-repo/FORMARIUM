# Statistical Summary and Interval Research Note

Status: source-backed candidate synthesis

## Research question

What compact factorization helps a reader choose and interpret a center,
order statistic, spread measure, estimator precision, or confidence interval
without treating “average,” “variation,” “error bar,” or “95% interval” as
interchangeable labels?

## Admission rationale

The arithmetic-mean Formula view still has an unresolved canonical owner and
declares median and weighted mean as graph debt. Confidence interval is also
unresolved in the probability/uncertainty anchor and recurs in sampling,
measurement, benchmark, and claim interpretation. One connected anchor can
close those gaps while leaving likelihood and broader inference methods for a
later batch.

## Source basis

The evidence campaign is recorded in [Statistical Summary and Interval Web Evidence](../../signals/discover/websearch/statistical-summary-interval-websearch-2026-08-15.md).
It prioritizes NIST statistical definitions and methods, with Census material
supporting design-based weighting context.

## Editorial decisions

- `arithmetic-mean` owns the equally weighted finite-data statistic and can be
  used as an estimator only under a separate target and sampling/model contract.
- `weighted-mean` requires the values, weights, weight meaning, normalization,
  zero/negative-weight policy, and design-based uncertainty.
- `median` is admitted separately from the more general `quantile`; sample
  quantile interpolation conventions remain explicit.
- `variance` and `standard-deviation` remain separate because their units,
  formulas, and interpretations differ even though one is the square of the
  other under a fixed contract.
- `standard-error` belongs to an estimator/statistic sampling distribution,
  not directly to the raw observation distribution.
- `confidence-interval` owns a method-specific parameter interval. Prediction,
  tolerance, credible, uncertainty, and specification intervals remain
  contrasts rather than aliases.

## Candidate factor spine

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

## Claim limits

This candidate organization does not replace statistical design, survey
weighting, robust statistics, quantile-estimation, bootstrap, Bayesian, or
domain-specific interval methods. It does not certify a chosen statistic or
interval as valid for a population, estimator, distribution, or decision.
