# Formula Table Pilot Catalog

Status: pilot

Formula Tables are indexed by the kind of claim they make, not only by subject
or fame.

## Current pilots

| Entry | Relation kind | Canonical expression | Scope lesson |
|---|---|---|---|
| [Force](force.md) | Physical law | `sum(F_external) = m a` | Boundary and net-vector aggregation are part of use |
| [Mass density](density.md) | Definition | `rho_avg = m / V` | Bulk averaging depends on one mass-volume boundary |
| [Ohm's law](ohms-law.md) | Empirical constitutive relation | `V = I R` | Famous laws may apply only in a bounded regime |
| [Sample arithmetic mean](arithmetic-mean.md) | Estimator or statistic | `x_bar = sum(x_i) / n` | Inclusion and distribution determine interpretation |
| [Pythagorean trigonometric identity](pythagorean-trigonometric-identity.md) | Identity | `sin(theta)^2 + cos(theta)^2 = 1` | Identities require definitions, domains, and restricted consequences |
| [General accounting balance](general-accounting-balance.md) | Conservation or balance | `accumulation = input - output + generation - consumption` | Boundary and source terms distinguish accounting from conservation |
| [Newton's method](newtons-method.md) | Algorithm or recurrence | `x_(k+1) = x_k - f(x_k)/f'(x_k)` | Fast convergence is local and conditional |
| [Event probability range](probability-range.md) | Constraint | `0 <= P(A) <= 1` | A bounded score is not automatically a probability |
| [Common geometric measures](common-geometric-measures.md) | Definition and derived shape formulas | `P`, `A`, `SA`, and `V` by shape | Select boundary/interior and dimension before formula |
| [Kinematics motion measures](kinematics-motion-measures.md) | Definition, derivative, and conditional equations | distance, displacement, speed, velocity, acceleration | Path, direction, frame, and rate order remain distinct |
| [Matter and load measures](matter-load-measures.md) | Base quantity, definition, and scoped physical model | mass, weight, density, pressure | Quantity kind, gravity, volume, and area normalization remain distinct |
| [Mechanical work, energy, and power](mechanical-work-energy-power.md) | Definition, theorem, and scoped balance | work, kinetic and potential energy, mechanical energy, power | Transfer, state, path, frame, system, and rate remain distinct |
| [Comparative quantities](comparative-quantities.md) | Definition, equality, normalization, and change | ratio, rate, proportion, percentage, relative change, percentage points | Order, units, baseline, and denominator domains remain explicit |
| [Probability, risk, and uncertainty relations](probability-risk-uncertainty.md) | Identity, mapping, expectation, model schema, and measurement relation | conditional probability, odds, expected loss, risk, expanded uncertainty | Model, consequence, horizon, and coverage remain explicit |
| [Thermal quantities](thermal-quantities.md) | Equilibrium, response, balance, and constraint | temperature, heat, internal energy, heat capacity, entropy | State, transfer, sign, phase, constraint, and path remain explicit |

## Relation-kind coverage

| Relation kind | Pilot status |
|---|---|
| Definition | covered by mass density |
| Identity | covered by Pythagorean trigonometric identity |
| Law or principle | covered by force |
| Conservation or balance | covered by general accounting balance |
| Constitutive model | covered empirically by Ohm's law |
| Empirical relation | covered by Ohm's law |
| Estimator or statistic | covered by sample arithmetic mean |
| Algorithm or recurrence | covered by Newton's method |
| Constraint | covered by event probability range |

All V0 relation kinds are represented at pilot depth. This does not imply broad
subject coverage. The next selection should test cross-domain lookup,
cross-references, notation variants, and practitioner usefulness.

## Catalog rules

- One canonical scoped relation owns its algebraic rearrangements.
- Formula authority and Factorium entry maturity remain separate.
- Symbols are local unless explicitly joined to canonical quantity entries.
- Units, dimensions, domains, and failure signs remain visible.
- Formula Tables complement rather than replace domain instruction.
