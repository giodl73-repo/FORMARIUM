---
skill: validate-dimensional
topic: fraction-molar-mass-composition-basis
date: 2026-08-15
equations_checked: 31
p1_errors: 0
dimensionless_paper: false
---

# Fraction, Molar Mass, and Composition-Basis Dimensional Audit

Artifacts:

- `tables/formulas/comparative-quantities.md`
- `tables/formulas/amount-concentration-composition.md`

## Dimension inventory

| Q-ID | Symbol | Quantity | Dimensions | SI unit |
|---|---|---|---|---|
| Q-01 | `A`, `B`, `part`, `whole` | compatible comparison quantities | same declared `D_Q` | quantity-dependent |
| Q-02 | `r`, `f`, `x_i`, `w_i`, `phi_i` | ratios or fractions | `1` | `1` |
| Q-03 | `Q_num`, `Q_den` | rate operands | `D_num`, `D_den` | quantity-dependent |
| Q-04 | `q_rate` | cross-kind rate | `D_num D_den^-1` | quotient unit |
| Q-05 | `p`, `r_change` | numerical percent value or relative change | `1` | `1` |
| Q-06 | `x_old`, `x_new` | compatible compared values | same declared `D_X` | quantity-dependent |
| Q-07 | `N` | entity count | `1` | `1` |
| Q-08 | `N_A` | Avogadro constant | `N^-1` | `mol^-1` |
| Q-09 | `n`, `n_i`, `n_B` | amount of substance | `N` | `mol` |
| Q-10 | `m_i`, `m_B` | mass | `M` | `kg` |
| Q-11 | `V_i`, `V_mix` | volume | `L^3` | `m^3` |
| Q-12 | `c_i` | amount concentration | `N L^-3` | `mol m^-3` |
| Q-13 | `gamma_i` | mass concentration | `M L^-3` | `kg m^-3` |
| Q-14 | `M_B`, `M_i`, `M_mix` | molar mass | `M N^-1` | `kg mol^-1` |

## Equation checks

| Eqs. | Relations | LHS | RHS | Verdict |
|---|---|---|---|---|
| 1–2 | `r=A/B`; like-kind cancellation | `1` | `D_Q/D_Q=1` | YES |
| 3–4 | rate and unit-rate forms | `D_num D_den^-1` | `D_num/D_den` | YES |
| 5–6 | `A/B=C/D`; `AD=BC` | `1`; `D_A D_D` | `1`; `D_B D_C` | CONDITIONAL: corresponding kinds required and stated |
| 7–9 | `f=part/whole`; `f_i=part_i/whole`; `sum f_i=1` | `1` | `D_Q/D_Q=1`; sum of unit-one terms | CONDITIONAL: common whole and partition contract stated |
| 10–11 | `p=100f`; displayed percent `p/100` | `1` | dimensionless scale times `1` | YES |
| 12–15 | absolute, relative, percent, and percentage-point changes | `D_X`; `1`; `1`; `1` | matched difference or matched difference/baseline | CONDITIONAL: compatible inputs and nonzero baseline stated |
| 16–17 | `n=N/N_A`; `N=nN_A` | `N`; `1` | `1/(N^-1)=N`; `N N^-1=1` | YES |
| 18–19 | `c_i=n_i/V`; `gamma_i=m_i/V` | `N L^-3`; `M L^-3` | matching quotients | YES |
| 20–22 | amount, mass, and volume fractions | `1` | like-kind quantity divided by like-kind sum | YES |
| 23–24 | amount- and mass-fraction closure | `1` | sum of unit-one terms | CONDITIONAL: exhaustive mutually exclusive set stated |
| 25 | `M_B=m_B/n_B` | `M N^-1` | `M/N` | YES |
| 26 | `n_B=m_B/M_B` | `N` | `M/(M N^-1)=N` | YES |
| 27 | `m_B=n_B M_B` | `M` | `N(M N^-1)=M` | YES |
| 28 | `M_mix=sum_i(x_i M_i)` | `M N^-1` | sum of `1(M N^-1)` terms | YES |
| 29 | `w_i=x_i M_i/sum_j(x_j M_j)` | `1` | `(M N^-1)/(M N^-1)` | YES |
| 30 | `x_i=(w_i/M_i)/sum_j(w_j/M_j)` | `1` | `(N M^-1)/(N M^-1)` | YES |
| 31 | worked percent/percentage-point example | `1` | ratios and differences of unit-one levels | YES |

There are no exponential, logarithmic, trigonometric, or differential
arguments in scope.

## Fault register

| D-ID | Equation | Fault type | Description | Severity | Closure |
|---|---|---|---|---|---|
| D-01 | closure equations | hidden set condition | Unit consistency alone cannot establish exhaustiveness or nonoverlap. | P2 | Partition contract is explicit. |
| D-02 | `M_B=m_B/n_B` | hidden identity condition | Dimensions cannot prove mass and amount name the same material. | P2 | Subject/entity contract is explicit. |
| D-03 | basis transforms | mapping condition | Dimensional balance cannot prove component identity/order matches. | P2 | Ordered component-set contract is explicit. |
| D-04 | molar vs. relative mass | notational ambiguity | Coincident numbers can hide different dimensions. | P3 | Units and quantity kinds are contrasted explicitly. |

## Result

All 31 relations are dimensionally valid under their declared semantic and
domain conditions. No P1 dimensional error remains.

## Amendments

1. Retained `kg mol^-1` on every molar-mass symbol and unit one on fractions.
2. Added the explicit dimensional cancellation for both basis transformations.
3. Kept identity, partition, and component-order conditions beside the equations
   because dimensional validity alone cannot establish them.
