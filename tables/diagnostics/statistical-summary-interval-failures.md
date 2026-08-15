# Statistical Summary and Interval Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval](../entries/statistical-summary-interval.md)

Canonical senses: `arithmetic-mean`, `weighted-mean`, `median`, `quantile`,
`variance`, `standard-deviation`, `standard-error`, `confidence-interval`

## Governing question

Which distribution, inclusion, weighting, denominator, dependence, estimator,
or interval-target defect could explain a misleading summary or uncertainty
claim, and what test would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Mean and median disagree sharply | skew; heavy tails; mixture; miscoding; unequal subgroup sizes | inspect histogram/ECDF, tails, groups, raw extremes, and transformations; report both under named uses | analysis and domain owner |
| Mean changes dramatically after one record | extreme value; wrong unit; duplicate; small sample; genuine rare event | audit record provenance and units; run leave-one-out and robust summaries without deleting valid extremes silently | data and analysis owner |
| Weighted estimate differs unexpectedly from unweighted | selection correction; target composition; extreme/negative weights; wrong join or normalization | reconcile weight source and sum, distribution, effective sample size, target margins, and stage joins | survey/estimation owner |
| Two tools report different percentiles | interpolation convention; ties; missing-value policy; approximate/streaming algorithm | run a frozen ordered fixture and compare exact definitions, versions, and options | analysis-tool owner |
| Variance or SD differs by a factor near `n/(n-1)` | population vs. sample denominator; degrees-of-freedom mismatch | recompute from frozen values with explicit center, denominator, target, and units | analysis owner |
| Reported SD has squared units | variance mislabeled; square root omitted; unit conversion applied at wrong stage | dimensional audit against raw values and formula path | numeracy and analysis owner |
| Standard error is implausibly small | clustering/dependence ignored; weights/design omitted; pseudo-replication; model too restrictive | recompute with cluster/design/resampling method and effective independent units | sampling and estimator owner |
| Narrow interval conflicts with external evidence | biased sample; wrong target; understated SE; assumption failure; outcome-dependent exclusion | audit target, selection, estimator, dependence, coverage method, exclusions, and sensitivity | inference and evidence owner |
| “95% interval” interpretation is unclear | confidence/prediction/tolerance/credible/specification interval collapsed | name target object and procedure; simulate or analytically verify its claimed coverage | method and reporting owner |
| Confidence interval excludes a practical threshold but effect is negligible | threshold mismatch; statistical/practical significance collapsed; scale or multiplicity issue | state decision loss and practical margin; inspect effect scale, multiplicity, and sensitivity | decision and analysis owner |

## Use contract

1. Freeze target, analytic data, transformations, units, weights, estimator,
   dependence design, software, and interval procedure.
2. Reproduce the statistic from ordered raw values and stage denominators.
3. Compare candidate causes across distribution, inclusion, weighting,
   denominator, dependence, estimator, and interpretation stages.
4. Run the smallest discriminating check without silently removing valid
   extremes, unsupported groups, or failed assumptions.
5. Repair the owning stage and recompute all linked summaries, standard errors,
   intervals, and decision interpretations.

## Failure signs

- `average`, `spread`, or `error bar` is the only method label;
- weights lack meaning, source, normalization, and effective sample size;
- percentile convention or missing-value policy is software-default folklore;
- variance, SD, and SE share one column or unit;
- `n` counts records rather than independent sampling units;
- a narrow confidence interval is treated as proof of accuracy or transport;
- confidence, prediction, tolerance, credible, uncertainty, and specification
  bounds are interpreted interchangeably;
- practical decisions are inferred from interval overlap alone.

## Sources and provenance

1. [Statistical summary and interval research note](../../docs/research/2026-08-15-statistical-summary-interval.md)
2. NIST/SEMATECH e-Handbook, Exploratory Data Analysis:
   https://www.itl.nist.gov/div898/handbook/eda/eda.htm
3. NIST/SEMATECH e-Handbook, Process or Product Monitoring and Control:
   https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm
4. NIST/SEMATECH e-Handbook, Product and Process Comparisons:
   https://www.itl.nist.gov/div898/handbook/prc/prc.htm

This diagnostic isolates candidate failures; it does not certify a statistic,
estimator, interval, model, sample, or decision.
