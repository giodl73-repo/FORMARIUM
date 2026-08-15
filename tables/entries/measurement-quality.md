# Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration

Status: candidate anchor entry

## Orientation

Measurement error is a measured value minus a reference value. Bias estimates
systematic error. Accuracy is qualitative closeness to a true value; trueness
concerns the limiting average of replicates relative to a reference; precision
concerns agreement among replicates under stated conditions. Resolution is the
smallest measured-quantity change producing a perceptible indication change.
Metrological calibration relates standards, indications, results, and their
uncertainties. Probability calibration instead compares stated probabilities
with outcome frequencies. None is a universal certificate of quality.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `measurement-error` | What signed difference separates a measured value from the selected reference value? | realized reference difference |
| `measurement-bias` | What systematic measurement error is estimated for the procedure or configuration? | systematic-error estimate |
| `measurement-accuracy` | How close is a measured value to a true value, without pretending accuracy is itself a numeric quantity? | qualitative agreement |
| `measurement-trueness` | How close is the limiting replicate average to a reference value? | systematic agreement property |
| `measurement-precision` | How closely do replicate indications or values agree under specified conditions? | repeat agreement property |
| `instrument-resolution` | What smallest change in the measured quantity produces a perceptible indication change? | indication granularity property |
| `metrological-calibration` | Under which conditions and uncertainties are standards, indications, and measurement results related? | measurement relation operation |
| `probability-calibration` | Across a declared evaluation set, how do stated probabilities correspond to observed relative frequencies? | probabilistic reliability property |

## Root factorization

```text
measurement-quality-use
  := exact claim and decision use
   x measurand, system, unit, and operating conditions
   x measurement procedure, instrument, operator, and time
   x measured value, reference value, and reference uncertainty
   x replicate design and repeatability or reproducibility conditions
   x random and systematic error model
   x bias, correction, drift, and stability evidence
   x resolution, sensitivity, range, and detection behavior
   x calibration standard, relation, hierarchy, and traceability
   x probability target, outcome definition, evaluation population, and bins
   x uncertainty budget, diagnostics, acceptance criteria, and fitness for use
   x provenance, validity interval, revision, and limitations
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Single result | measurand x value x reference x error x uncertainty | reference value | interpreting one measurement | unknown error reported as known |
| Replicate study | object x conditions x replicates x center x dispersion x bias | replicate conditions | separating trueness and precision | repeatability generalized to reproducibility |
| Instrument | range x sensitivity x resolution x drift x stability x environment | indication behavior | characterizing a device | extra digits treated as accuracy |
| Metrological calibration | standard x uncertainty x indication x relation x correction x traceability | standards relation | converting indications to results | calibration confused with adjustment or conformance |
| Probability forecast | event x horizon x probability x outcome x population x binning x frequency | forecast reliability | testing probabilistic predictions | reliability confused with ranking or sharpness |
| Fitness for use | decision x tolerance x uncertainty x failure cost x acceptance rule | intended use | deciding adequacy | one quality metric used as universal pass |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Error vs. uncertainty | both qualify a measurement result | signed difference from a reference vs. attributed dispersion based on information |
| Systematic error vs. bias | both concern persistent displacement | theoretical/component error vs. its estimate |
| Accuracy vs. error | both concern reference agreement | qualitative closeness vs. signed numeric difference |
| Accuracy vs. trueness | both concern closeness | individual/result-level concept vs. limiting replicate-average agreement |
| Trueness vs. precision | both are properties of replicate measurement | reference agreement of the mean vs. agreement among replicates |
| Precision vs. resolution | both can look like fineness | replicate dispersion vs. smallest perceptible indication response |
| Resolution vs. sensitivity | both are device properties | detectable input increment vs. indication change per input change |
| Calibration vs. adjustment | both concern an instrument | establishes a relation vs. changes indications |
| Calibration vs. verification | both use requirements or references | establishes a measurement relation vs. confirms specified requirements |
| Metrological vs. probability calibration | both compare output with reference behavior | standards-to-result relation vs. probabilities-to-frequencies reliability |
| Probability calibration vs. discrimination | both assess predictions | frequency agreement at probability levels vs. ranking/separation of outcomes |

## Diagnostic examples

- A scale can repeat to the same gram and still be biased by twenty grams.
- Adding decimal places improves displayed resolution only if the instrument can
  respond meaningfully at that scale; it does not establish accuracy.
- A calibration certificate can document a relation and uncertainty without
  proving the instrument meets a particular process tolerance.
- Calibration performed in a laboratory does not erase temperature, operator,
  drift, geometry, or range effects in deployment.
- A classifier can rank positives above negatives well while its `0.8`
  predictions occur far less than eighty percent of the time.
- Aggregate probability calibration can hide severe subgroup, horizon, or
  regime miscalibration.

## Selection procedure

1. State the exact result, claim, decision, tolerance, and failure consequence.
2. Define the measurand, system boundary, unit, method, instrument, operator,
   environment, range, time, and version.
3. Identify the reference value, source, uncertainty, hierarchy, and validity.
4. Separate realized or modeled error, estimated bias, random variability,
   correction, and measurement uncertainty.
5. Define replicate conditions before reporting repeatability, intermediate
   precision, or reproducibility.
6. Record resolution, sensitivity, detection behavior, drift, stability, and
   environmental influences independently.
7. For metrological calibration, preserve standards, indications, relation or
   curve, uncertainties, range, conditions, traceability, and subsequent use.
8. For probability calibration, preserve event/outcome, horizon, evaluation
   population, dependence, binning or smoothing, sample support, and intervals.
9. Test subgroup, range, time, and operating-regime failures before aggregation.
10. Apply explicit fitness-for-use criteria; do not infer acceptance from the
    word `calibrated`, tight replicates, or a small display increment.

## Constraints and failure signs

- Error and uncertainty never share one unlabeled number.
- Accuracy is not reported as a percentage unless a domain metric with that
  name is explicitly defined and kept distinct from measurement accuracy.
- Precision always names its replicate conditions and statistic.
- Bias states its reference, configuration, direction, and estimation basis.
- Resolution does not substitute for sensitivity, precision, uncertainty, or
  accuracy.
- Calibration states which sense is intended.
- Metrological calibration retains standards, uncertainties, conditions,
  range, relation, time, and traceability; it does not imply adjustment,
  verification, validation, or fitness for use.
- Probability calibration retains outcome, horizon, target population,
  evaluation design, support, and uncertainty; it does not imply discrimination.

## Specialized view

The [Measurement Quality Failure Diagnostic](../diagnostics/measurement-quality-failures.md)
maps tight clusters, reference offsets, coarse indications, drift, calibration
misuse, and forecast reliability symptoms to discriminating tests.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [Control, Monitoring, Feedback, and Intervention](control-monitoring-response.md)
- [Matter and Load Measure](matter-load-measure.md)
- [Context](../roots/context.md)

## Sources and provenance

1. [Measurement quality research note](../../docs/research/2026-08-15-measurement-quality.md)
2. JCGM, International Vocabulary of Metrology entries 2.13-2.18, 2.26,
   2.39, and 4.14: https://jcgm.bipm.org/vim/en/index.html
3. NIST/SEMATECH, “Bias and Accuracy”:
   https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc113.htm
4. NIST/SEMATECH, “Calibration”:
   https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3.htm
5. NWS, “Verification of Probabilistic Forecasts”:
   https://www.weather.gov/media/owp/oh/hrl/docs/verification_probforecasts.pdf

Comparator access date: 2026-08-15. Formal source definitions retain their
scope; this cross-domain organization remains `candidate`.
