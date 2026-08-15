# Measurement Quality Research Note

Status: source-backed candidate synthesis

## Research question

What compact factorization prevents error, uncertainty, accuracy, trueness,
precision, bias, resolution, and calibration from collapsing into a single
“quality” score across measurements, experiments, forecasts, and benchmarks?

## Admission rationale

These terms recur across the measurement, uncertainty, sampling, control, and
formula material. `calibration` also remains unresolved in the probability
range view. A dedicated anchor lets readers diagnose which comparison failed
without turning a metrology vocabulary into a generic badge.

## Source basis

The evidence campaign is recorded in [Measurement Quality Web Evidence](../../signals/discover/websearch/measurement-quality-websearch-2026-08-15.md).
It prioritizes the JCGM International Vocabulary of Metrology, NIST measurement
guidance, and official NOAA/NWS probability-forecast verification material.

## Editorial decisions

- `measurement-error` is a signed value relative to a reference;
  `measurement-uncertainty` remains owned by the probability and uncertainty
  anchor and describes attributed dispersion from available information.
- `measurement-accuracy` stays qualitative. Numeric error, bias, imprecision,
  and uncertainty measures must be named rather than called “accuracy.”
- `measurement-trueness` concerns the limiting replicate mean relative to a
  reference; `measurement-precision` concerns agreement among replicates under
  stated conditions.
- `measurement-bias` estimates systematic error; it is not every social,
  statistical, cognitive, or algorithmic use of “bias.”
- `instrument-resolution` is one instrument/display property and possible
  uncertainty contribution, not a synonym for precision or accuracy.
- `metrological-calibration` and `probability-calibration` are separate senses.
  The first relates standards, indications, results, and uncertainties; the
  second relates stated probabilities to outcome frequencies over a declared
  evaluation population and binning/smoothing procedure.

## Candidate factor spine

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

## Claim limits

This is a candidate cross-domain reference organization. It does not replace
the VIM, a laboratory uncertainty analysis, instrument-specific calibration,
forecast-verification methodology, or domain acceptance criteria. It does not
certify a measurement, instrument, model, or score as fit for use.
