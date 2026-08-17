# Evaluation Aggregation Procedure

Status: candidate Procedure Table

Primary family: Procedure Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `index`, `score`, `evaluation-scale`, `evaluation-result`

## Governing question

How can component evaluations be normalized, weighted, aggregated, and
summarized without hiding incompatible dimensions, interactions, missingness,
or noncompensatory rules?

## Procedure table

| Step | Required record | Gate | Failure recovery |
|---|---|---|---|
| 1. Frame | subject, population, use, comparator, horizon, version | one exact question is being answered | split questions or populations |
| 2. Preserve sources | component values, methods, units/scales, direction, support, uncertainty | every component is interpretable alone | repair or retain unresolved |
| 3. Test comparability | common basis, transformations, domain, dependence | combination semantics are declared | keep separate dimensions |
| 4. Normalize | source/target scales, reference population, bounds, parameters, clipping, inverse/loss | transformation is valid for every admitted value | split regimes or reject mapping |
| 5. Weight | weight meaning, source, range, normalization, uncertainty | weights express the intended role only | retain unweighted vector and alternatives |
| 6. Combine | operator, order, interactions, missingness, overlap, residual | no double counting or invalid compensation | preserve joint terms or apply gates |
| 7. Apply noncompensation | hard constraints, vetoes, floors/ceilings, acceptance region | prohibited failures cannot be averaged away | report conditional or infeasible result |
| 8. Summarize | aggregate/index/score, component vector, uncertainty, rounding, label | display is reproducible from retained sources | withhold aggregate |
| 9. Stress | alternate baselines, transforms, weights, thresholds, missingness | material changes are visible | report range or unstable disposition |

## Aggregation contract

```text
aggregate
  := exact component vector
   x source and target scales
   x transformation and normalization parameters
   x weight semantics and provenance
   x dependency, interaction, overlap, and residual
   x missing-data and eligibility policy
   x combination operator and order
   x noncompensatory gates and vetoes
   x uncertainty and sensitivity
   = derived result plus retained component explanation
```

## Constraints

- Do not aggregate merely because components have numeric displays.
- Keep time, cost, quality, risk, burden, storage, and other opposing
  dimensions visible unless a justified common basis exists.
- Normalization changes representation; it does not prove equal value or
  exchangeability.
- Weight provenance and semantics are part of the result.
- Missingness is not zero and excluded cases remain in the denominator record.
- Arithmetic closure is not semantic validity or empirical adequacy.

## Sources and provenance

See the canonical entry, Statistical Summary, Decomposition/Combination, and
Contribution/Reconciliation owners. This is a record procedure, not a
universal aggregation formula.
