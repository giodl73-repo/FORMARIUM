# Evaluation Applicability Evidence Table

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `evaluation-frame`, `evaluation-result`, `indicator`, `score`

## Governing question

What evidence supports applying this evaluation definition, implementation,
and result to the declared subject, population, conditions, time, and use?

## Evidence table

| Binding | Required evidence | Does not establish |
|---|---|---|
| subject identity | exact object/system/alternative/claim, version, boundary | equivalence to another labelled subject |
| population and cases | eligibility, sampling/coverage, exclusions, missingness, denominators | representativeness outside the frame |
| measure/indicator | property, operational definition, proxy rationale, method, unit/scale, uncertainty | importance or causal relevance |
| rule and implementation | specification, transformations, parameters, code/tool/version, tests | correctness of the underlying judgment |
| comparator and target | identity, selection basis, timing, conditions, authority | fairness, feasibility, or desirability |
| criteria and thresholds | definitions, evidence, owner/authority, boundary behavior | validity, safety, effectiveness, or value broadly |
| result derivation | source values, activities, agents, sequence, loss, reproducibility | independent observation |
| applicability | source-target population/context/time correspondence, mechanisms/assumptions, known gaps | transport beyond declared conditions |
| disposition | exact rule output, reviewer/authority, date, limitations, appeal/revision | final truth or irreversible decision |

## Applicability record

```text
applicability
  := source frame and target frame
   x retained correspondences and relevant differences
   x proxy, model, mechanism, and stability assumptions
   x evidence quality, uncertainty, and unresolved gaps
   x supported claim and prohibited generalizations
   x validity interval, monitoring, invalidation, and review owner
```

## Constraints

- Evaluation provenance includes source entities, derivation activities,
  agents or authorities, rule and implementation versions, and time.
- A computed index or score remains derived even when stored in an observation
  table.
- Evidence for repeatability, discrimination, calibration, conformance, or
  prediction does not substitute for another property.
- Applicability is evaluated against an exact target use, not declared globally.
- Internal task completion proves only structural and mechanical coverage.

## Sources and provenance

1. W3C PROV-O: https://www.w3.org/TR/prov-o/
2. Existing Claim/Evidence, Sampling/Generalization, Measurement Quality, and
   Factor Status/Completeness owners.

This view records support and transfer boundaries; it does not certify an
evaluation as useful or valid for every reader or decision.
