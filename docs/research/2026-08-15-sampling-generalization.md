# Sampling and Generalization Research Note

Status: source-backed candidate synthesis

## Research question

What compact factorization lets a reader trace a claim from target population
through frame, selection, response, analysis, estimation, and transport without
treating randomization, representativeness, size, or precision as universal
quality badges?

## Admission rationale

`sample` is unresolved in the arithmetic-mean Formula view and recurs across
evidence, probability, causal, benchmark, and guide material. The new causal
anchor uses population, unit, estimand, estimator, heterogeneity, and transport
but does not own their general statistical distinctions. F9 connects those
concepts while adding a practitioner-facing failure diagnostic rather than
another formula.

## Source basis

The evidence campaign is recorded in
[Sampling and Generalization Web Evidence](../../signals/discover/websearch/sampling-generalization-websearch-2026-08-15.md).
It uses NIST and Census statistical guidance, primary work on trial
generalization and target validity, representativeness research, transport
methods, and Meng's population-inference analysis.

## Editorial decisions

- `population` is always scoped to a question, place/system, version, and time;
  it is not synonymous with “everyone.”
- `sampling-frame` is an operational list or mechanism that may under-cover,
  over-cover, duplicate, or misclassify the target population.
- `sample` owns selected or observed units; `analytic-sample` owns the records
  remaining after response, exclusions, missingness, linkage, and preprocessing.
- `estimand` names the target quantity; `estimator` names a rule or procedure;
  `estimate` is its realized result. Parameter and statistic remain contextual
  roles rather than universal synonyms for those three.
- `representativeness` is not admitted as an intrinsic sample sense. It is a
  claim about a specified estimate or interpretation relative to a target under
  stated design and assumptions.
- `generalization` and `transport` are separated by the source-target relation
  and both require scope, effect/feature stability, support, and evidence.
- Random sampling, random assignment, and random train/test splitting retain
  different purposes.

## Candidate factor spine

```text
sampling-generalization-use
  := exact claim and decision use
   x target population, unit, boundary, version, and time
   x sampling frame and coverage
   x selection mechanism and inclusion probabilities
   x invitation, participation, nonresponse, and attrition
   x observed and analytic sample construction
   x target quantity or estimand
   x estimator, weighting, adjustment, and model
   x estimate, sampling uncertainty, and diagnostics
   x measurement, processing, linkage, and missingness error
   x source-target differences, heterogeneity, and support overlap
   x generalization or transport assumptions and evidence
   x provenance, limitations, and revision
```

## Claim limits

This is a candidate cross-domain reference organization, not a substitute for
survey-statistics, experimental-design, causal-transport, clinical, census, or
benchmark methodology. It does not certify a sample, estimate, or claim as
representative or generalizable.
