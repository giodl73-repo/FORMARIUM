# Probability and Likelihood Function Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-probability-likelihood-function.md`
- `tables/entries/probability-risk-uncertainty.md`
- `tables/formulas/probability-risk-uncertainty.md`
- `signals/discover/websearch/probability-likelihood-function-websearch-2026-08-15.md`
- `signals/roles/check/probability-likelihood-function-roles-check-2026-08-15.md`
- `signals/validate/dimensional/probability-likelihood-function-dimensional-2026-08-15.md`
- canonical interchange, assurance, and current-source book projection

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| PLF-001 | major | Probability and likelihood could collapse through shared notation. | Closed: fixed-parameter and fixed-data directions are explicit. |
| PLF-002 | major | Likelihood could be interpreted as parameter probability. | Closed: posterior requires a prior and normalization. |
| PLF-003 | major | Continuous density could be called exact-point probability. | Closed: mass, density, and observation contributions remain distinct. |
| PLF-004 | major | Independence could be assumed for convenience. | Closed: dependence and observation mechanisms govern factorization. |
| PLF-005 | major | Censoring, selection, or stopping could be omitted. | Closed: they are required observation-contract factors. |
| PLF-006 | major | Raw likelihoods could be compared across incompatible representations. | Closed: common data, model, mechanism, and reference measure are required. |
| PLF-007 | major | A logarithm could receive a dimensionful raw density product. | Closed: canonical log comparison uses a dimensionless likelihood ratio. |
| PLF-008 | major | MLE could imply uniqueness, adequacy, or certainty. | Closed: optimizer and its non-results remain explicit. |
| PLF-009 | major | Named distribution, estimator, or test catalogs could enter canon. | Closed: only reusable roles and contracts are canonical. |
| PLF-010 | major | The revision could create a redundant record or chapter. | Closed: it deepens the existing entry and Formula view in place. |

The dimensional audit checks 28 equations with zero P1 errors. All 13 selected
roles pass after amendments; no critical or major actionable finding remains
open for candidate publication.
