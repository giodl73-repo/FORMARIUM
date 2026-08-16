---
skill: validate-dimensional
topic: momentum-torque-stress-field-density
date: 2026-08-15
equations_checked: 60
p1_errors: 0
dimensionless_paper: false
---

# Momentum, Torque, Stress, Field, and Density Dimensional Audit

Artifacts:

- `tables/formulas/kinematics-motion-measures.md`
- `tables/formulas/force.md`
- `tables/formulas/matter-load-measures.md`
- `tables/formulas/density.md`
- `tables/formulas/mechanical-work-energy-power.md`

## Dimension inventory

| Q-ID | Symbols | Quantity | Dimensions | SI unit |
|---|---|---|---|---|
| Q-01 | `x`, `r`, `ell_perp` | position, displacement, moment arm | `L` | `m` |
| Q-02 | `v` | velocity | `L T^-1` | `m s^-1` |
| Q-03 | `a`, `g` | acceleration or gravitational field | `L T^-2` | `m s^-2`, `N kg^-1` |
| Q-04 | `m`, `m_test` | mass | `M` | `kg` |
| Q-05 | `p_vec`, `P_vec`, `J_vec` | momentum or impulse | `M L T^-1` | `kg m s^-1`, `N s` |
| Q-06 | `F`, `W_vec` | force or weight | `M L T^-2` | `N` |
| Q-07 | `rho` | mass density | `M L^-3` | `kg m^-3` |
| Q-08 | `V`, `dV` | volume/volume element | `L^3` | `m^3` |
| Q-09 | `A` | area | `L^2` | `m^2` |
| Q-10 | `p`, `sigma`, `t_vec`, `tau_avg` | pressure, stress, traction | `M L^-1 T^-2` | `Pa` |
| Q-11 | `n_vec` | unit normal | `1` | `1` |
| Q-12 | `W`, `K`, `U`, `E` | work or energy | `M L^2 T^-2` | `J` |
| Q-13 | `tau_O` | torque/moment of force | `M L^2 T^-2` | `N m` |
| Q-14 | `P` | power | `M L^2 T^-3` | `W` |
| Q-15 | `theta` | angle | `1` | `rad` |

## Equation checks

| Eqs. | Relation group | Dimensional result | Verdict |
|---|---|---|---|
| 1–8 | displacement, distance, velocity, and acceleration relations | derivatives and finite ratios produce `L`, `L T^-1`, or `L T^-2` | YES |
| 9–12 | constant-acceleration relations | every additive term matches velocity or position dimensions | YES |
| 13–14 | `p_vec=m v_vec`; `P_vec=sum m_i v_i` | `M(L T^-1)=M L T^-1` | YES |
| 15–16 | `J=integral F dt`; `J=Delta P` | `(M L T^-2)T=M L T^-1` | YES |
| 17–19 | `sum F=dP/dt`; constant-mass `sum F=ma`; `a=sum F/m` | `M L T^-2` throughout | YES |
| 20–22 | collinear mass inference and balanced-force forms | numerator/denominator yields `M`; zero relations preserve force/acceleration kind | CONDITIONAL: stated collinearity/nonzero conditions required |
| 23–25 | weight and gravity-field relations | `m g` gives force; `F_g/m_test` gives `L T^-2` | YES |
| 26–29 | average/local density and mass integration | `M/L^3`; `(M L^-3)L^3=M` | YES |
| 30–32 | average and local pressure | force/area gives `M L^-1 T^-2` | YES |
| 33–35 | traction/stress and average normal/shear stress | tensor times unit normal and force/area give pascals | YES |
| 36–40 | inverse mass, volume, force, and area forms | each rearrangement recovers the declared dimension | CONDITIONAL: nonzero divisors and matching averages required |
| 41–43 | density specialized-view relations | local integral and finite-volume normalization recover mass and density | YES |
| 44–45 | density inverse forms | `rho V` gives mass; `m/rho` gives volume | CONDITIONAL: representative/nonzero density required |
| 46–48 | differential/path/constant-force work | force times displacement gives `M L^2 T^-2`; cosine is dimensionless | YES |
| 49–53 | kinetic, potential, work-energy, and energy-balance relations | every energy sum/difference term is `M L^2 T^-2` | YES |
| 54–56 | average/instantaneous power | energy/time and force dot velocity give `M L^2 T^-3` | YES |
| 57–59 | `tau=r cross F`; magnitude; net torque | length times force gives `M L^2 T^-2`; sine is dimensionless | YES |
| 60 | `Delta U_g=m g Delta y` | `M(L T^-2)L=M L^2 T^-2` | CONDITIONAL: uniform-field approximation stated |

There are no exponential or logarithmic arguments. The torque sine/cosine and
work cosine use angle arguments in radians or an explicitly converted angular
unit, so their mathematical arguments are dimensionless.

## Fault register

| D-ID | Relation | Fault type | Severity | Closure |
|---|---|---|---|---|
| D-01 | momentum aggregation | hidden frame/boundary condition | P2 | One frame and member set required. |
| D-02 | `sum F=dP/dt` | open-system omission | P2 | Fixed-membership scope stated; flux requires another balance. |
| D-03 | `g=F_g/m_test` | hidden test-body/model condition | P2 | Nonperturbing Newtonian scope stated. |
| D-04 | local density integral | hidden continuum/resolution condition | P2 | Domain, support, void, and resolution required. |
| D-05 | `t=sigma dot n` | hidden basis/orientation condition | P2 | Material point, basis, sign, and normal required. |
| D-06 | torque/work shared dimension | semantic-unit ambiguity | P3 | `N m` and `J` presentation remains quantity-specific. |
| D-07 | pressure/stress shared dimension | scalar/tensor ambiguity | P3 | Quantity kind and operator remain explicit. |

## Result

All 60 relations are dimensionally consistent under their declared system,
frame, continuum, orientation, reference, and model conditions. No P1
dimensional error remains. Dimensional equality does not erase vector/tensor,
dot/cross-product, state/transfer, or bulk/local distinctions.

## Amendments

1. Added explicit dimensional lines for momentum/impulse, field, density
   integration, traction, and torque.
2. Kept shared-dimension quantities distinguished by operator and quantity kind.
3. Recorded semantic conditions that dimensional algebra cannot verify.
