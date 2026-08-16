---
skill: validate-dimensional
topic: probability-likelihood-function
date: 2026-08-15
equations_checked: 28
p1_errors: 0
dimensionless_paper: false
---

# Probability and Likelihood Function Dimensional Audit

## Scope

- `tables/entries/probability-risk-uncertainty.md`
- `tables/formulas/probability-risk-uncertainty.md`

## Dimension inventory

| Symbol | Meaning | Dimension/unit contract |
|---|---|---|
| `P`, `p_theta` | event probability or discrete mass | dimension one |
| `f_theta` | continuous density | inverse units of the represented data relative to the declared measure |
| `g_theta` | observation contribution | mass, density, interval probability, or survival probability as declared |
| `L(theta; x)` | product/joint contribution | dimension depends on continuous-density contribution count and representation |
| `R` | likelihood ratio under common data/representation | dimension one |
| `Delta ell` | log relative likelihood | dimension one |
| `theta` | parameter | model-specific dimension/unit |
| `O_A`, `k` | odds and coverage factor | dimension one |
| `L_i`, `E[L]` | loss and expected loss | common consequence unit `[C]` |
| `u_c`, `U`, `y`, `Y` | measurement quantities | measurand unit `[Q]` |

## Equation checks

| Equations | Check | Result |
|---|---|---|
| 1-3: complement, conditional, and multiplication rules | probability terms are dimension one; denominator nonzero | yes |
| 4-5: likelihood from mass or density | mass is dimension one; density units are retained | yes |
| 6: independent product | product units match the joint observation contribution | yes, conditional on independence |
| 7: relative likelihood | identical contribution units cancel | yes, conditional on same representation |
| 8-9: relative log likelihood and sum | every logarithm receives a dimension-one positive ratio | yes |
| 10: maximum-likelihood argmax | objective may carry units; ordering uses one fixed representation | yes |
| 11-12: odds and inverse | all terms are dimension one; denominators restricted | yes |
| 13: expected loss | dimension-one probabilities times `[C]` sum to `[C]` | yes |
| 14: risk model schema | output is model-specific and no dimensional equality is asserted | scoped |
| 15-16: expanded uncertainty and report | `k[1] u_c[Q] = U[Q]`; report terms share `[Q]` | yes |
| 17-20: odds endpoint and odds-against relations | dimension-one comparisons | yes |
| 21: independent likelihood restatement | same as equation 6 | yes |
| 22-25: ratio, log ratio, summed log ratios, argmax restatements | shared units cancel before log | yes |
| 26: expected-loss restatement | common consequence unit preserved | yes |
| 27-28: uncertainty restatements | measurand unit preserved | yes |

Raw continuous likelihood and raw log likelihood are representation-dependent.
The canonical logarithmic comparison therefore uses `log(L/L_0)`, not an
unqualified logarithm of a dimensionful density product.

## Dimensional fault register

| ID | Potential fault | Severity | Disposition |
|---|---|---:|---|
| PLF-D01 | Raw density likelihood labeled dimensionless | P2 | Density/reference-measure units remain explicit. |
| PLF-D02 | Log applied to a dimensionful raw likelihood | P2 | Canonical log relation uses a dimensionless ratio. |
| PLF-D03 | Ratio compares different observed-data representations | P2 | Same data, mechanism, and reference measure are required. |
| PLF-D04 | Expected losses mix consequence units | P2 | Common unit and perspective remain required. |
| PLF-D05 | Risk schema mistaken for a dimensional identity | P3 | It remains a model schema with declared output scale. |
| PLF-D06 | Parameter units inferred from likelihood units | P3 | Parameter domain and units are independently declared. |

No P1 dimensional inconsistency remains.

## Amendments

1. Keep discrete mass, continuous density, and observation contribution
   distinct in the symbol contract.
2. Use dimensionless relative likelihood inside logarithms.
3. Preserve common-data, common-mechanism, and common-reference-measure scope
   for all likelihood-ratio comparisons.
