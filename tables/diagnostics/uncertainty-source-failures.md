# Uncertainty Source Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Probability, Risk, and Uncertainty](../entries/probability-risk-uncertainty.md)

Canonical senses: `uncertainty`, `measurement-uncertainty`, `risk`

## Governing question

Which source, representation, propagation, or interpretation failure could
explain an uncertainty claim, and what test would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| one interval hides several sources | measurement, sampling, parameters, model, scenario, or processing combined without record | rebuild the uncertainty-source ledger and vary one source at a time | evidence/model owner |
| repeated measurements are precise but wrong | systematic effect, reference error, model bias, or calibration misuse | compare against independent reference and vary conditions | measurement owner |
| model uncertainty shrinks after more decimal places | numerical precision mistaken for epistemic support | rerun structural alternatives and input perturbations | model owner |
| scenario range is reported as probability | no probability model or weights exist | inspect event space, assignment basis, and normalization | analyst owner |
| combined uncertainty is too small | dependence/covariance omitted; components double-used; conditioning changed | reconstruct propagation with dependence and units | metrology/statistics owner |
| residual is labeled random noise | omitted structure, timing, processing, or deterministic mismatch | inspect residuals by regime, sequence, and alternative model | model/evidence owner |
| confidence transfers to a new context | population, version, environment, or intended use changed | perform applicability/transport review | claim owner |

## Source record

For each source retain subject, origin, epistemic status, model, representation,
dependence, unit/scale, propagation rule, sensitivity, evidence, version, and
whether the source is included, excluded, bounded, or unresolved.

## Constraints

- Source categories are purpose- and domain-dependent, not an exhaustive
  universal taxonomy.
- Type A/Type B evaluation does not mean random/systematic cause.
- Scenario breadth, probability, measurement uncertainty, model discrepancy,
  and ignorance remain distinct.
- Combining components requires units/scales and dependence structure.
- Reduced reported uncertainty does not by itself improve model validity or
  decision quality.

## Sources and provenance

1. JCGM 100:2008: https://www.bipm.org/en/doi/10.59161/jcgm100-2008e
2. JCGM publications: https://www.bipm.org/en/committees/jc/jcgm/publications

This diagnostic extends the canonical owner without claiming a complete
uncertainty taxonomy or performing an uncertainty analysis.

