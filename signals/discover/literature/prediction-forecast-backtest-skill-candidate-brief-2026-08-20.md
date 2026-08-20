---
topic: prediction-forecast-backtest-skill-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Prediction, Forecast, Conditional Projection, Backtest, and Forecast Skill

## Decision question

Does Lexicon need an owner for the claim about an unobserved value, the
time-indexed issued statement about a future valid time, the outcome path
computed under stated assumptions without a likelihood claim, the retrospective
replay of a method on withheld data, and the reference-relative measure of how
good an issued forecast was?

## Bounded thesis

Proceed only within the anticipation-and-verification chain: what is asserted
about an unknown, when it was asserted and for when, what it was conditioned
on, and how it was scored after the fact. Model estimation, scoring-rule
catalogs, trading-strategy design, climate physics, and prophecy remain outside
this candidate.

The thesis is falsified if the existing scenario, model, probability,
evaluation, sampling, and control owners can already state issue time, lead
time, valid time, conditionality, replay protocol, and reference-relative skill
without importing anticipation semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `prediction` | Which unobserved value, event, or outcome does a stated method assert, from which information set, and in which uncertainty form? |
| `forecast` | Which prediction is issued for which predictand at which issue time, lead time, and valid time, under which uncertainty form? |
| `conditional-projection` | Which outcome path follows from a stated assumption or input set, with no claim that the assumptions are likely or intended? |
| `backtest` | How would this method, model, or rule have performed on withheld or historical data under a declared replay protocol and information-availability rule? |
| `forecast-skill` | How much better or worse is this forecast than a declared reference forecast, under which score and which verification sample? |

## Candidate contract

```text
prediction-forecast-evaluation-use
  := predictand identity, population, variable, and decision use
   x information set available at assertion time
   x issue time, lead time, valid time, and verification period
   x conditioning assumptions, inputs, and scenario reference
   x conditionality declaration: unconditional, conditional, or normative
   x uncertainty form: point, interval, quantile, predictive distribution, category
   x method, model, estimation window, and parameter freeze rule
   x data vintage, revision status, and look-ahead exclusion
   x replay protocol, window scheme, and out-of-sample boundary
   x observation or verifying analysis used as truth, and its own error
   x score, scoring-rule propriety, and aggregation over cases
   x reference forecast identity and justification
   x skill, calibration, sharpness, and resolution reporting
   x base rate, rare-event handling, and score degeneracy check
   x sample size, dependence, and significance of accuracy differences
   x limits, regime change, and prohibited generalization
```

## Existing-owner audit

- [Assumption, Condition, Scenario, Case, and Comparison](../../../tables/entries/scenario-assumption-condition-case.md)
  owns `scenario` as the configured possibility frame, `assumption` as the
  taken-as-given input, and `counterfactual` as the contrary-to-fact comparison
  frame. **This candidate does not claim scenario or counterfactual.** A
  `conditional-projection` is the computed outcome path *under* a frame owned
  there; the frame, its counterfactual status, and its case identity stay with
  the scenario owner, while the path, its conditionality declaration, and its
  non-likelihood status stay here. A counterfactual projection is therefore a
  `conditional-projection` whose frame is a `counterfactual`, and it is stated
  with both owners cited.
- [Decomposition Modes, Interaction, Contribution, and Combination Contracts](../../../tables/entries/decomposition-modes-combination-contracts.md)
  owns `projection` as a loss-declared view transformation. **This candidate
  does not claim generic projection.** The sense here must always be written
  `conditional-projection`; a bare `projection` in factor names continues to
  mean the view transformation.
- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns `objective`, `set-point`, `service-level-objective`, `indicator`, and
  `threshold`. A forecast is not an objective and not a commitment; a decision
  cut on a forecast stays a `threshold` there. **`target` is not owned by that
  entry**: the desired value, range, state, or trajectory sought under an
  objective is `target` in
  [Evaluation Frame, Measure, Scale, and Criterion](../../../tables/entries/evaluation-measure-scale-criterion.md),
  and forecast-versus-target confusions route there.
- [Model, Representation, and Simulation](../../../tables/entries/model-representation-simulation.md)
  owns model, simulation, run, and result. A forecast is a time-indexed claim
  issued from such a run, not the run.
- [Probability, Risk, and Uncertainty](../../../tables/entries/probability-risk-uncertainty.md)
  owns `event-probability`, `conditional-probability`, and `uncertainty`. A
  probabilistic forecast uses those; it adds issue time, valid time, and
  verification.
- [Sampling, Estimation, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns `estimand`, `estimator`, `estimate`, `generalization`, and `transport`.
  It does **not** currently own cross-validation, resampling, or holdout
  splitting: no canonical sense covers them, and the statistical-summary owner
  mentions resampling only as procedure text. That material is treated here as
  **unowned and reserved**, not as an existing owner's property; `backtest`
  claims only the time-ordered replay protocol with a look-ahead prohibition and
  cites resampling designs as external practice pending a future owner.
- [Statistical Summary and Interval](../../../tables/entries/statistical-summary-interval.md)
  owns `quantile`, `standard-error`, and `confidence-interval`. Prediction
  intervals for future observables are stated with the same machinery and are
  not re-owned here.
- [Evaluation Frame, Measure, Scale, and Criterion](../../../tables/entries/evaluation-measure-scale-criterion.md)
  owns `baseline`, `comparator`, `target`, `measure`, `score`, and
  `evaluation-result`. **Positive delta claimed for `forecast-skill`:** a
  general comparator may be any alternative, control, benchmark, or prior
  result, and an `evaluation-result` is the output of applying a rule to a
  subject. `forecast-skill` constrains that structure in three ways the
  evaluation owner does not: the comparator must itself be a *forecast* for the
  same predictand and the same valid time; the comparison runs over a
  verification sample of issued-and-then-observed cases rather than over one
  evaluation; and the resulting number is reference- and sample-relative rather
  than an intrinsic property of the forecast. Change the reference or the
  sample and the skill changes while the forecast does not. No evaluation-scale
  semantics are added.
- [Requirement, Specification, Verification, and Validation](../../../tables/entries/requirement-specification-verification-validation.md)
  owns engineering verification and validation. Forecast verification is a
  different activity and must not borrow the compliance reading.
- [Measurement Quality](../../../tables/entries/measurement-quality.md)
  owns `probability-calibration` and measurement error; the verifying
  observation's own error is recorded there and consumed here.
- [Claim and Evidence](../../../tables/entries/claim-evidence.md)
  owns claim status, confidence, and limitation; a forecast record is an
  instance, not a new evidence grammar.
- [Time Instant, Duration, Interval, Deadline, and Schedule](../../../tables/entries/temporal-organization.md)
  owns instants, durations, and intervals; issue time, lead time, and valid
  time are uses of those, not new time semantics.

## Shared boundary with the neighboring analytical candidates

`tail` and `extreme-value` are **distributional** and belong to
[Distribution, Shape, Skewness, Tail, Outlier, and Extreme Value](../candidates/distribution-shape-skewness-tail-outlier-extreme-value.md).
Rare-event anticipation and rare-event verification are **temporal-evaluative**
and belong here: an issued forecast for a stated valid time, scored against
what occurred, with explicit base-rate and score-degeneracy handling.
`tipping-point` and `critical-transition` are **dynamical-structural** and
belong to
[Tipping Point, Critical Transition, Cascade, Contagion, and Spillover](../candidates/tipping-point-critical-transition-cascade-contagion-spillover.md).
Decision boundaries that trigger classification, attention, or action remain
`threshold`, owned by Objective, Control, Monitoring, and Response.

**Predictive-distribution seam.** A predictive distribution is jointly held and
the split is stated in both places: the distributional family owns the
distributional object and its shape, tail, and extreme-value characterization,
while this family owns the issuance act that attaches such an object to a
predictand and a valid time, and the verification that scores it. A forecaster
naming skewness or tail weight in a predictive distribution cites the
distributional family; a statistician scoring that distribution against a
realized observation cites this one.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [IPCC AR6 WG1 Annex VII, Glossary](https://www.ipcc.ch/report/ar6/wg1/chapter/annex-vii-glossary/) ([PDF](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_AnnexVII.pdf)) | the decisive prediction/forecast versus projection separation: a projection is conditional on assumptions that may not be realized | an assessment glossary binds its own report, not all disciplines |
| [Murphy, What Is a Good Forecast?](https://doi.org/10.1175/1520-0434(1993)008%3C0281:WIAGFA%3E2.0.CO;2) | consistency, quality, and value are three distinct goodnesses | value is decision-relative and is not a score |
| [Murphy, Skill Scores Based on the Mean Square Error](https://doi.org/10.1175/1520-0493(1988)116<2417:SSBOTM>2.0.CO;2) | skill is always relative to a declared reference | skill scores move with the reference and the sample |
| [Brier, Verification of Forecasts Expressed in Terms of Probability](https://doi.org/10.1175/1520-0493(1950)078<0001:VOFEIT>2.0.CO;2) | the founding probabilistic verification score | one score cannot summarize forecast quality |
| [Gneiting and Raftery, Strictly Proper Scoring Rules, Prediction, and Estimation](https://doi.org/10.1198/016214506000001437) | propriety: scores that cannot be gamed by hedging | improper scores reward misreporting |
| [Gneiting, Balabdaoui, and Raftery, Probabilistic Forecasts, Calibration and Sharpness](https://doi.org/10.1111/j.1467-9868.2007.00587.x) | maximize sharpness subject to calibration | calibration alone does not make a forecast useful |
| [Gneiting and Katzfuss, Probabilistic Forecasting](https://doi.org/10.1146/annurev-statistics-062713-085831) | current survey of predictive-distribution practice | a survey, not a standard |
| [Jolliffe and Stephenson, Forecast Verification](https://doi.org/10.1002/9781119960003) | the practitioner reference for verification design | verification choices are themselves contestable |
| [WWRP/WGNE Joint Working Group on Forecast Verification Research](https://www.cawcr.gov.au/projects/verification/) | community-maintained method and FAQ reference | a living resource, not a ratified standard |
| [Hyndman and Koehler, Another Look at Measures of Forecast Accuracy](https://doi.org/10.1016/j.ijforecast.2006.03.001) | scaled errors; failure modes of percentage errors | no single accuracy measure fits all series |
| [Tashman, Out-of-Sample Tests of Forecasting Accuracy](https://doi.org/10.1016/S0169-2070(00)00065-0) | fixed-origin, rolling-origin, and holdout replay designs | out-of-sample results depend on the split scheme |
| [Makridakis, Spiliotis, and Assimakopoulos, The M4 Competition](https://doi.org/10.1016/j.ijforecast.2019.04.014) | large-scale empirical evidence on method comparison | competition results are dataset- and horizon-specific |
| [Diebold and Mariano, Comparing Predictive Accuracy](https://doi.org/10.1080/07350015.1995.10524599) | testing whether an accuracy difference is real | tests assume stationarity and loss specification |
| [Shmueli, To Explain or to Predict?](https://doi.org/10.1214/10-STS330) | explanatory and predictive modeling are different goals | good prediction is not evidence of mechanism |
| [Basel Committee, Supervisory Framework for the Use of Backtesting](https://www.bis.org/publ/bcbs22.htm) | the regulatory definition of backtesting and exception counting | designed for market-risk capital, not general method replay |
| [Basel Committee, Minimum Capital Requirements for Market Risk (d457)](https://www.bis.org/bcbs/publ/d457.htm) | current backtesting and P&L attribution requirements | a supervisory instrument, not a statistical theory |
| [Kupiec, Techniques for Verifying the Accuracy of Risk Measurement Models](https://doi.org/10.3905/jod.1995.407942) | unconditional coverage testing of exceedances | low power at supervisory sample sizes |
| [Christoffersen, Evaluating Interval Forecasts](https://doi.org/10.2307/2527341) | conditional coverage: independence as well as rate | tests need long records to discriminate |
| [Stephenson et al., The Extreme Dependency Score](https://doi.org/10.1002/met.53) | rare-event scores that do not degenerate to the base rate | such scores carry their own pathologies |
| [Ferro and Stephenson, Extremal Dependence Indices](https://doi.org/10.1175/WAF-D-10-05030.1) | improved rare-binary-event verification measures | still requires an explicit rare-event definition |
| [Mellers et al., Psychological Strategies for Winning a Geopolitical Forecasting Tournament](https://doi.org/10.1177/0956797614524255) | human judgmental forecasting can be scored and improved | tournament conditions are not operational conditions |
| [ISO 3534-1, Statistics — Vocabulary and symbols, Part 1](https://www.iso.org/standard/40145.html) | standardized vocabulary for prediction intervals and related terms | a vocabulary standard, silent on verification practice |

## Counterevidence and limits

- Projection and prediction are separated in climate assessment but routinely
  merged in finance, planning, and journalism; the separation adopted here is a
  defensible convention, not universal usage (IPCC AR6 Annex VII).
- No single accuracy measure is adequate; scaled, percentage, and squared-error
  measures disagree and each has known failure modes (Hyndman and Koehler).
- Skill is not a property of a forecast: it changes with the reference forecast
  and with the verification sample (Murphy 1988).
- Improper scores can be improved by misreporting beliefs, so score choice is
  an integrity matter, not a formatting choice (Gneiting and Raftery).
- Rare-event scores degenerate toward trivial values as the base rate falls;
  hit rates and threat scores mislead without base-rate reporting (Stephenson
  et al.; Ferro and Stephenson).
- Backtests are contaminated by data revision, survivorship, look-ahead, and
  repeated tuning on the same history; a clean replay protocol is a claim that
  must itself be evidenced (Tashman; Basel Committee).
- Regulatory backtesting has low statistical power at supervisory sample sizes
  and cannot certify a model as correct (Kupiec; Christoffersen).
- Predictive accuracy is not explanatory adequacy; a well-scoring forecast
  licenses no mechanism claim (Shmueli).
- Verifying observations carry their own error, so measured skill confounds
  forecast quality with observation quality.

## Admission gates

1. Record predictand, population, variable, decision use, and uncertainty form
   before any prediction claim.
2. Record issue time, lead time, valid time, and verification period for every
   `forecast`; a statement without them stays a `prediction`.
3. Declare conditionality explicitly. `conditional-projection` requires the
   assumption or scenario set, cites the scenario owner for that frame, and
   carries no likelihood claim.
4. Distinguish a conditional projection from a counterfactual. A projection runs
   a frame forward to an outcome path; a `counterfactual` is a contrary-to-fact
   comparison frame owned by the scenario entry. When the frame is
   counterfactual, cite both owners and never let this family absorb the frame.
5. Never write a bare `projection` for this family; the bare term remains the
   view-transformation sense of the decomposition owner.
6. Record the replay protocol, data vintage, window scheme, parameter freeze,
   and look-ahead exclusion for every `backtest`, and disclose the number of
   configurations tried. Cite cross-validation or resampling designs as external
   practice; do not claim them, since no canonical sense currently owns them.
7. Report `forecast-skill` only with a named reference forecast, a named score,
   the verification sample, and the propriety status of the score.
8. Require the skill comparator to be a forecast for the same predictand and the
   same valid time, and record skill as reference- and sample-relative rather
   than as a property of the forecast. A comparison against a non-forecast
   comparator is an `evaluation-result` owned by the evaluation entry, not
   skill.
9. Report calibration and sharpness together; neither alone establishes forecast
   quality.
10. Report base rate and the chosen rare-event definition with any rare-event
    score, and state score degeneracy behavior.
11. Record the verifying observation and its own error as a separate factor.
12. State significance and dependence handling before claiming one method beats
    another.
13. Do not import set-point or decision threshold semantics from the control
    owner, `target` semantics from the evaluation owner, or scenario-frame and
    counterfactual semantics from the scenario owner.
14. Name the predictive-distribution seam when a forecast carries a
    distributional object: shape, tail, and extreme-value language cites the
    distributional family; issuance and verification stay here.
15. Exclude prophecy, unfalsifiable anticipation, and forecast marketing claims.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The chain from
issued claim to scored outcome is unowned, standards-backed, and repeatedly
requested, but admission requires a fixed-point role review confirming that
`conditional-projection` never collides with the decomposition owner's
`projection` and that `forecast-skill` adds no evaluation-scale semantics.
