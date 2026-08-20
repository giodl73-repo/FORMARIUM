---
topic: distribution-shape-tail-extreme-value-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Distribution, Shape, Skewness, Tail, Outlier, and Extreme Value

## Decision question

Does Lexicon need an owner for the assignment of probability or frequency over
values, the qualitative shape of that assignment, its asymmetry, the region
beyond a stated cut, the observation judged discrepant under a declared rule,
and the maxima or exceedances modeled by extreme-value limit laws?

## Bounded thesis

Proceed only within the description of how values are spread and what happens
in the far region of that spread. Estimation theory, distribution catalogs,
goodness-of-fit testing, anomaly-detection algorithms, and risk-capital policy
remain outside this candidate.

The thesis is falsified if the existing statistical-summary, probability,
sampling, and measurement owners can already state distributional shape, tail
weight, outlier treatment authority, and extreme-value limit-law modeling
without importing distributional-shape semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `distribution` | Which assignment of probability or observed frequency over which values, for which variable, population, and period, is asserted? |
| `distribution-shape` | Which shape features — support, bounds, modality, symmetry, and tail weight — characterize that assignment, under which description? |
| `skewness` | Which direction and degree of asymmetry is claimed, under which definition and estimator? |
| `tail` | Which region beyond a stated quantile or cut is under discussion, and under which tail-weight characterization? |
| `outlier` | Which observation is discrepant from the assumed generating model or data bulk, under which declared rule, and what treatment is authorized? |
| `extreme-value` | Which maximum, minimum, or threshold exceedance is modeled under which extreme-value limit law, block or threshold choice, and return level? |

## Candidate contract

```text
distribution-shape-tail-use
  := variable, population, sample, period, and decision use
   x measurement scale, support, and bounds
   x empirical distribution, fitted model, or predictive distribution status
   x density, mass, or cumulative representation and estimation method
   x shape description: modality, symmetry, and tail weight
   x skewness definition, estimator, and sample-size sensitivity
   x kurtosis definition and its explicit non-peakedness reading
   x tail definition: which cut, which quantile convention, which side
   x tail-weight class evidence and comparison distribution
   x outlier rule, decision authority, and pre-declaration status
   x outlier treatment: retained, flagged, accommodated, or excluded, with reason
   x extreme-value approach: block maxima or peaks over threshold
   x block size or threshold choice and its sensitivity
   x limit-law family, shape parameter, and finite-mean or finite-variance status
   x return level, return period, and stationarity assumption
   x dependence, clustering, and declustering treatment
   x estimation uncertainty, extrapolation limits, and scope limits
```

## Existing-owner audit

- [Statistical Summary and Interval](../../../tables/entries/statistical-summary-interval.md)
  owns `arithmetic-mean`, `weighted-mean`, `median`, `quantile`, `variance`,
  `standard-deviation`, `standard-error`, and `confidence-interval`. **The split
  is estimator versus characterization, not new-statistic versus old.**
  Moment-based and quantile-based estimators remain that owner's practice: the
  mean, variance, standard deviation, standard error, and quantile are computed
  and reported there, and this candidate consumes them. What that owner does not
  hold is a sense for the *shape* those estimators describe. Its procedure text
  already instructs practitioners to "inspect distribution shape, tails,
  multimodality, dependence, and subgroups" and to check "tail sensitivity"
  without giving shape or tail a sense to be recorded under, so the
  characterization is currently prose-only. This candidate supplies that missing
  vocabulary: `distribution-shape`, `skewness`, `tail`, `outlier`, and
  `extreme-value` name
  the characterized features, while the numbers used to characterize them stay
  with the summary owner. The relationship is reciprocal and must be stated in
  both directions: statistical summary's shape and tail *procedure* vocabulary
  resolves to these senses, and these senses' diagnostics resolve to statistical
  summary's estimators.
- `skewness` is admitted as a shape sense rather than as a statistic because no
  single number defines it. The third standardized moment, Bowley's
  quartile-based coefficient, Pearson's mode and median coefficients, and the
  L-moment ratio can disagree in magnitude and even in ordering on the same
  data, and the general ordering that underlies them all is a partial order over
  distributions rather than a scalar (Groeneveld and Meeden; NIST/SEMATECH).
  What is shared across those diagnostics is the asymmetry claim about the
  distribution; that claim is the sense, and the diagnostics are competing
  measurements of it, each of which stays an estimator of the summary owner.
- Kurtosis and tail weight are deliberately **not** admitted as a peer sense.
  They characterize the same distributional region that `tail` already scopes,
  and their interpretation is contested in a way asymmetry is not: kurtosis
  reflects tail and shoulder mass rather than peakedness (Westfall), and tail
  weight is stated most defensibly through the extreme-value shape parameter
  already carried by `extreme-value`. Admitting kurtosis as a peer would create
  two vocabularies for one region. Kurtosis, tail index, and tail-weight
  diagnostics therefore appear as factors under `tail` and `extreme-value`, with
  their estimators attributed to the summary owner.
- [Probability, Risk, and Uncertainty](../../../tables/entries/probability-risk-uncertainty.md)
  owns `event-probability`, `conditional-probability`, `likelihood-function`,
  `risk`, and `expected-loss`. `distribution` here is the assignment over values
  that those senses draw on, stated with its population, period, and status.
- [Sampling, Estimation, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns `target-population`, `sample`, `analytic-sample`, `estimand`, and
  `estimator`. Exclusion of an outlier changes the analytic sample and must be
  recorded there as well as justified here.
- [Measurement Quality](../../../tables/entries/measurement-quality.md)
  owns `measurement-error`, `measurement-bias`, and `instrument-resolution`.
  A recording error that produces a discrepant value is a measurement fault
  there; `outlier` names only the discrepancy judgment.
- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns `threshold` as the decision boundary. **This candidate does not claim
  threshold.** A tail cut or an extreme-value modeling threshold is an analysis
  choice recorded with its sensitivity, not an action-triggering boundary.
- [Evaluation Frame, Measure, Scale, and Criterion](../../../tables/entries/evaluation-measure-scale-criterion.md)
  owns `measure`, `metric`, `score`, and `tolerance`; skewness and kurtosis
  reported as metrics inherit that grammar.
- [Mathematical Relation and Solving](../../../tables/entries/mathematical-relation-solving.md)
  owns `mathematical-function`, `variable`, `equation`, `solution`, `root`,
  `derivative`, `iteration`, and `convergence`. It does **not** own extremum,
  maximum, minimum, or optimization: no canonical sense currently covers the
  maximum or minimum of a function, and optimization problem structure sits
  under the [Choice and Alternative Selection](../../../tables/mappings/optimization-problem-structure.md)
  headword as a mapping rather than as an owned sense. Optimization extrema are
  therefore treated here as **unowned and reserved**. **This family accordingly
  uses `extreme-value` in the extreme-value-theory sense and never `extremum`,**
  so that a future owner of optimization extrema finds the term free.
- [Comparative Quantity](../../../tables/entries/comparative-quantity.md)
  owns `ratio`, `proportion`, and `percentage`; exceedance proportions use
  those forms.
- [Hazard, Exposure, Harm, Vulnerability, and Safety](../../../tables/entries/hazard-exposure-harm-safety.md)
  owns `hazard` and acceptability; a return level is a distributional statement
  and not an acceptability judgment.
- [Cost, Price, Value, and Return](../../../tables/entries/cost-price-value-return.md)
  owns valuation; value-at-risk and expected-shortfall capital policy are cited
  here as external authorities only.

## Shared boundary with the neighboring analytical candidates

`tail` and `extreme-value` are **distributional** and belong here: a region of a
stated distribution and the limit-law treatment of maxima or exceedances, with
block or threshold choice, shape parameter, and extrapolation limits recorded.
Rare-event anticipation and rare-event verification are **temporal-evaluative**
and belong to
[Prediction, Forecast, Conditional Projection, Backtest, and Forecast Skill](../candidates/prediction-forecast-conditional-projection-backtest-skill.md).
`tipping-point` and `critical-transition` are **dynamical-structural** and
belong to
[Tipping Point, Critical Transition, Cascade, Contagion, and Spillover](../candidates/tipping-point-critical-transition-cascade-contagion-spillover.md).
Decision boundaries that trigger classification, attention, or action remain
`threshold`, owned by Objective, Control, Monitoring, and Response. A tail
observation is not a regime change, a modeling threshold is not a decision
threshold, and a return period is not a forecast.

**Predictive-distribution seam.** A predictive distribution belongs to both this
family and the forecast family, split by object versus act: this family owns the
distributional object and its shape, tail, and extreme-value characterization,
and the forecast family owns issuance of that object for a stated predictand and
valid time and the verification that scores it. Naming the skewness or tail
weight of a predictive distribution cites this family; scoring that distribution
against a realized observation cites the forecast family.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [ISO 3534-1, Statistics — Vocabulary and symbols, Part 1](https://www.iso.org/standard/40145.html) | standardized vocabulary for distribution, moments, and related terms | a vocabulary standard, silent on modeling practice |
| [ISO 16269-4, Statistical Interpretation of Data — Detection and Treatment of Outliers](https://www.iso.org/standard/44396.html) | the standard procedure and, decisively, treatment authority for outliers | procedures assume specified underlying distributions |
| [NIST/SEMATECH e-Handbook, Measures of Skewness and Kurtosis](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm) | working definitions and estimators of shape measures | a handbook convention, one of several |
| [Fisher and Tippett, Limiting Forms of the Frequency Distribution of the Largest or Smallest Member of a Sample](https://doi.org/10.1017/S0305004100015681) | the extremal types theorem | asymptotic; finite samples may not have converged |
| [Gnedenko, Sur la Distribution Limite du Terme Maximum d'une Série Aléatoire](https://doi.org/10.2307/1968974) | rigorous domains of attraction | strong assumptions of independence and identical distribution |
| [Pickands, Statistical Inference Using Extreme Order Statistics](https://doi.org/10.1214/aos/1176343003) | peaks-over-threshold and the generalized Pareto limit | threshold choice trades bias against variance |
| [Balkema and de Haan, Residual Life Time at Great Age](https://doi.org/10.1214/aop/1176996548) | the companion exceedance limit result | asymptotic in the threshold, not the sample |
| [Coles, An Introduction to Statistical Modeling of Extreme Values](https://doi.org/10.1007/978-1-4471-3675-0) | the practitioner treatment of block maxima and POT | model diagnostics remain judgment-heavy |
| [Embrechts, Klüppelberg, and Mikosch, Modelling Extremal Events](https://doi.org/10.1007/978-3-642-33483-2) | heavy-tail theory for insurance and finance | assumes conditions rarely verified on real data |
| [Hawkins, Identification of Outliers](https://doi.org/10.1007/978-94-015-3994-4) | the model-relative definition of an outlier | outlyingness depends on the assumed model |
| [Grubbs, Procedures for Detecting Outlying Observations in Samples](https://doi.org/10.1080/00401706.1969.10490657) | classical formal outlier tests | tests assume normality and single outliers |
| [Hoaglin, Iglewicz, and Tukey, Performance of Some Resistant Rules for Outlier Labeling](https://doi.org/10.1080/01621459.1986.10478363) | boxplot-fence labeling behavior and false-flag rates | labeling is not identification |
| [Rousseeuw and Hubert, Robust Statistics for Outlier Detection](https://doi.org/10.1002/widm.2) | accommodation rather than deletion | robust methods have their own breakdown limits |
| [Clauset, Shalizi, and Newman, Power-Law Distributions in Empirical Data](https://doi.org/10.1137/070710111) | disciplined testing of heavy-tail claims | many claimed power laws fail the test |
| [Westfall, Kurtosis as Peakedness, 1905–2014. R.I.P.](https://doi.org/10.1080/00031305.2014.917055) | kurtosis measures tail weight, not peakedness | corrects a persistent textbook error |
| [Groeneveld and Meeden, Measuring Skewness and Kurtosis](https://doi.org/10.2307/2987742) | competing skewness definitions and orderings | no single canonical asymmetry measure |
| [D'Agostino, Belanger, and D'Agostino, A Suggestion for Using Powerful and Informative Tests of Normality](https://doi.org/10.1080/00031305.1990.10475751) | skewness and kurtosis as diagnostic tests | tests are sample-size sensitive |
| [Artzner, Delbaen, Eber, and Heath, Coherent Measures of Risk](https://doi.org/10.1111/1467-9965.00068) | why a quantile alone is not a coherent tail measure | an axiomatic result, not an empirical claim |
| [Basel Committee, Minimum Capital Requirements for Market Risk (d457)](https://www.bis.org/bcbs/publ/d457.htm) | the regulatory move from value-at-risk to expected shortfall | a capital instrument, not a distribution theory |
| [Cirillo and Taleb, Tail Risk of Contagious Diseases](https://doi.org/10.1038/s41567-020-0921-x) | fat-tailed data can have unstable or undefined moments | contested; strong claims from limited records |

## Counterevidence and limits

- An outlier is defined relative to an assumed model; changing the model changes
  the verdict (Hawkins).
- Labeling rules flag values at nontrivial rates even in clean samples, so a
  flagged value is not an established error (Hoaglin, Iglewicz, and Tukey).
- Deletion is only one authorized treatment; standards require the treatment
  decision, its authority, and its rationale to be recorded (ISO 16269-4).
- Extreme-value results are asymptotic; finite samples may not have reached the
  limiting regime, and threshold or block choice drives the estimates
  (Fisher and Tippett; Pickands; Coles).
- Return levels and return periods assume stationarity and independence and are
  extrapolations beyond observed data, not forecasts (Coles; Embrechts et al.).
- Heavy-tail and power-law claims frequently fail principled testing (Clauset et
  al.).
- Kurtosis does not measure peakedness, and skewness has multiple inequivalent
  definitions (Westfall; Groeneveld and Meeden).
- Sample skewness and kurtosis are unstable in small samples and in fat-tailed
  data where moments may not exist (D'Agostino et al.; Cirillo and Taleb).
- A quantile-based tail measure is not subadditive; tail summaries have
  axiomatic properties that must be stated (Artzner et al.).

## Admission gates

1. Record variable, population, sample, period, measurement scale, support, and
   decision use before any distributional claim.
2. Mark whether the distribution is empirical, fitted, or predictive, and record
   its estimation method.
3. State shape claims as explicit features — support, bounds, modality,
   symmetry, tail weight — rather than as an unqualified shape name.
4. Report `skewness` with its definition and estimator, name the estimator's
   owner as the statistical-summary practice, and report kurtosis, if used, as
   a tail-weight factor under `tail` or `extreme-value` and never as peakedness
   or as a peer shape sense.
5. Define `tail` explicitly: which side, which cut or quantile convention, and
   which tail-weight characterization, with a comparison distribution named.
6. Record the outlier rule before inspecting the data where possible, and record
   the treatment decision, its authority, and its rationale; never delete
   silently.
7. Record any change to the analytic sample from outlier treatment with the
   sampling owner.
8. Use `extreme-value` and never `extremum`; the maximum or minimum of a
   function is currently unowned and reserved, and the term is left free for a
   future owner.
9. Record the extreme-value approach, block size or threshold choice, threshold
   sensitivity, limit-law family, and shape-parameter estimate with uncertainty.
10. Report whether the fitted tail implies finite mean and variance, and state
    the extrapolation range relative to the observed data.
11. Report dependence, clustering, declustering, and stationarity assumptions
    with any return level or return period.
12. State the reciprocal relationship with the statistical-summary owner in both
    directions: its shape and tail procedure vocabulary resolves to these
    senses, and these senses' diagnostics resolve to its estimators.
13. When a distribution is predictive, name the seam: the object and its shape
    are held here, issuance and verification belong to the forecast family.
14. Do not import decision thresholds, hazard acceptability, capital policy, or
    anomaly-detection algorithms.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The material is
standards-backed and largely unowned, and the outlier-treatment and
extreme-value gates answer recurring reader failures. Admission requires a
fixed-point role review confirming that `distribution` does not absorb the
statistical-summary owner's estimator grammar, that `extreme-value` never
becomes `extremum`, and that no tail cut is read as a decision threshold.
