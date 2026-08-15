# Measurement Quality Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](../entries/measurement-quality.md)

Canonical senses: `measurement-error`, `measurement-bias`,
`measurement-accuracy`, `measurement-trueness`, `measurement-precision`,
`instrument-resolution`, `metrological-calibration`, `probability-calibration`

## Governing question

Which reference, repeatability, instrument, environment, calibration, or
evaluation defect could explain an apparent quality failure, and what test
would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Replicates cluster tightly but miss the reference | systematic error; wrong correction; reference mismatch; stable environmental offset | compare replicate mean with independent traceable references across range and conditions | measurement procedure and calibration owner |
| Replicates scatter widely around the reference | poor repeatability; operator variation; noise; unstable object; inadequate resolution | repeat under controlled operators, instruments, times, and environments; decompose variance | experimental and instrument owner |
| More display digits do not improve comparisons | cosmetic rounding; quantization; noise floor; insensitive sensor; unstable least-significant digit | apply controlled input increments and estimate response, noise, and repeatability | instrument and interface owner |
| Results agree in the lab but drift in use | temperature/humidity/load effects; transport shock; aging; operator or geometry difference | run check standards across deployment conditions and time, preserving range and configuration | deployment metrology owner |
| Calibration certificate exists but tolerance is exceeded | calibration mistaken for adjustment/verification; uncertainty too large; range mismatch; post-calibration drift | compare corrected results plus uncertainty against explicit acceptance limits over the use range | quality and acceptance owner |
| Two calibrated instruments disagree | traceability-chain differences; reference uncertainty; curve/model mismatch; interval lapse; environment | intercompare common artifacts and audit standards, curves, uncertainties, conditions, and dates | calibration owners |
| Estimated error is reported with no usable reference | “true” value assumed; reference version changed; reference uncertainty omitted | reconstruct reference provenance and uncertainty or relabel the quantity as an estimate/model residual | measurement and evidence owner |
| Forecast probabilities are systematically too high | probability miscalibration; base-rate shift; label delay/error; target-population shift | reliability analysis by horizon, time, subgroup, and support with uncertainty intervals | model and evaluation owner |
| Aggregate reliability looks good but groups fail | compensating subgroup errors; sparse bins; pooled regimes; dependence | stratify predeclared groups/regimes and use support-aware calibration diagnostics | evaluation and domain owner |
| Ranking is strong but probability decisions fail | discrimination without calibration; wrong loss threshold; shifted prevalence | compare ranking metrics with reliability and decision loss under the target distribution | model and decision owner |

## Use contract

1. Freeze the measurand or predicted event, reference/outcome, target use,
   conditions, range, time, and version.
2. Preserve raw indications or predictions, corrections, results, references,
   replicates, outcomes, and exclusions.
3. Diagnose error, bias, imprecision, resolution, uncertainty, and calibration
   separately before choosing a repair.
4. Test the smallest controlled contrast that separates candidate causes.
5. Re-evaluate across range, operator, instrument, environment, time, subgroup,
   and regime as relevant.
6. Apply explicit acceptance or decision criteria after correction and
   uncertainty, not from a quality label alone.

## Failure signs

- `accurate`, `precise`, and `high resolution` appear interchangeably;
- a known error and an uncertainty interval occupy one field;
- replicate conditions or reference uncertainty are missing;
- calibration is treated as adjustment, verification, or indefinite validity;
- a calibration relation is extrapolated outside its range or environment;
- a probability score is called calibrated without outcomes and a target set;
- aggregate reliability hides unsupported bins, groups, or time regimes;
- acceptance is inferred without tolerance, uncertainty, and failure cost.

## Sources and provenance

1. [Measurement quality research note](../../docs/research/2026-08-15-measurement-quality.md)
2. JCGM International Vocabulary of Metrology:
   https://jcgm.bipm.org/vim/en/index.html
3. NIST/SEMATECH measurement process characterization:
   https://www.itl.nist.gov/div898/handbook/mpc/mpc.htm
4. NWS probabilistic forecast verification:
   https://www.weather.gov/media/owp/oh/hrl/docs/verification_probforecasts.pdf

This diagnostic isolates candidate failure mechanisms; it does not certify a
measurement process, calibration, forecast, instrument, or decision.
