# Evaluation Sensitivity, Stability, Robustness, and Fragility Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `evaluation-frame`, `evaluation-result`, `score`

## Governing question

Which credible changes alter an evaluation result or disposition, and what
discriminates local sensitivity, observed stability, scoped robustness, and
fragility?

## Diagnostic table

| Symptom | Candidate explanation | Discriminating test | Required record |
|---|---|---|---|
| small input change, large result change | steep rule, threshold, interaction, unstable model | perturb within declared measurement/operating range | response path and boundary |
| same inputs, changing result | stochastic procedure, implementation/version drift, nondeterminism | repeat with frozen sources, seed, rule, and environment | run and version custody |
| rank reverses under plausible choices | comparator, normalization, weight, or tie sensitivity | enumerate credible alternative settings | rank set and consequence |
| aggregate stable, components move | compensation or cancellation | inspect component vector and noncompensatory rules | signed component changes |
| result stable only after clipping | saturation or constrained display | expand admissible domain and retain unclipped values | source/target scale loss |
| subgroup failure hidden by total | population mix or aggregation | stratify by predeclared relevant groups/regimes | denominators and support |
| pass/fail flips near boundary | uncertainty, rounding, hysteresis, missing-data rule | propagate intervals and boundary semantics | source precision and rule |
| conclusion fails outside study frame | applicability or regime dependence | rerun/reason under target conditions | frame comparison and gap |

## Distinctions

| Term | Bounded meaning | Required qualifier |
|---|---|---|
| sensitivity | result response to a declared variation | factor, range/distribution, baseline, result, method |
| stability | limited change under a declared repetition, perturbation, or time window | repeated conditions, tolerance, horizon |
| robustness | acceptability of a declared claim/result over a specified variation set | claim, variation set, acceptability rule, evidence |
| fragility | unacceptable change under a small or credible variation relative to the declared frame | variation scale, consequence, threshold |

## Procedure

1. Select the exact output: source value, component, aggregate, rank, class,
   disposition, or explanation.
2. Declare credible variation in data, population, comparator, assumptions,
   parameters, transformations, weights, missingness, thresholds, and versions.
3. Vary one factor and selected interactions while preserving dependencies and
   invalid combinations.
4. Report local and regime-changing behavior, not only an average sensitivity.
5. State practical consequence and acceptability separately from numeric change.
6. Preserve unstable, unresolved, and out-of-scope regions.

## Sources and provenance

See the canonical entry and NIST/SEMATECH guidance on uncertainty propagation
and process modeling: https://www.itl.nist.gov/div898/handbook/. Robustness
remains claim- and domain-specific; no universal robustness score is admitted.
