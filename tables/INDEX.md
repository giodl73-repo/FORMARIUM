# Factorium Pilot Table Index

Status: pilot

This is a manually reviewed navigation projection. Canonical entries own their
senses and factorizations; copied widths and summaries here are non-normative
until generated from a stable interchange format.

## Foundation

- [Reference Table Families](foundations/REFERENCE-TABLE-FAMILIES.md) - eleven
  specialized views for structure, quantity, values, mapping, choice, change,
  validity, procedure, diagnosis, scale, and evidence
- [Root Table](foundations/ROOT-TABLE.md) - twelve recurring coordinates, five
  overlapping entry families, and ten reusable decomposition grammars
- [Factor Role Table](foundations/FACTOR-ROLES.md) - eleven structural jobs
  factors can perform within a decomposition view

## Canonical anchor entries

- [Force](entries/force.md) - physical interaction, coercive compulsion,
  organized body, effective influence, and operative validity, with a
  dictionary/thesaurus/encyclopedia/handbook Reference Delta
- [Geometric measure](entries/geometric-measure.md) - perimeter,
  circumference, area, surface area, and volume organized by measured subset
  and dimension
- [Motion measure](entries/motion-measure.md) - position, distance,
  displacement, speed, velocity, and acceleration organized by path, direction,
  frame, and derivative order
- [Matter and load measure](entries/matter-load-measure.md) - mass, weight,
  density, and pressure organized by quantity kind, environment, volume, and
  area normalization
- [Work, energy, and power](entries/work-energy-power.md) - mechanical
  transfer, system energy, kinetic and potential terms, and transfer rate
  organized by role, system, path, frame, and time
- [Comparative quantity](entries/comparative-quantity.md) - ratio, rate, unit
  rate, proportion, percentage, relative change, and percentage points
  organized by ordered roles, units, and baseline
- [Probability, risk, and uncertainty](entries/probability-risk-uncertainty.md)
  - event probability, conditional probability, odds, risk, expected loss,
  and measurement uncertainty organized by model, consequence, and coverage
- [Thermal quantity](entries/thermal-quantity.md) - temperature, thermal
  equilibrium, heat, internal energy, heat capacity, specific heat, and
  entropy organized by state, transfer, response, phase, and path
- [Amount, concentration, and composition](entries/amount-concentration-composition.md)
  - entity count, amount of substance, amount and mass concentration, and
  composition fractions organized by entity, component, quantity basis,
  mixture boundary, and state
- [Periodic and wave quantity](entries/periodic-wave-quantity.md) - period,
  frequency, angular frequency, wavelength, wave number, phase, and wave speed
  organized by cycle, temporal and spatial reference, propagation, medium,
  and regime
- [Electrical quantity](entries/electrical-quantity.md) - charge, current,
  potential difference, resistance, electrical power, and transferred energy
  organized by crossing surface, terminal pair, direction, state, sign, and
  time basis
- [Information, data, signal, and noise](entries/information-data-signal-noise.md)
  - semantic information, represented data, carrier signal, task-relative
  noise, Shannon measures, and SNR organized by context, representation,
  channel, model, estimator, and display scale

## Examples

| Entry | Principal sense | Width | Derived output or decision | Primary lesson |
|---|---|---:|---|---|
| [Environment](examples/environment.md) | governed deployment and organizational naming | 4–5 | environment identity/name | One headword may have materially different senses |
| [Security](examples/security.md) | access control, system protection, risk management | varies | security view | Broad concerns must separate senses before decomposition |
| [Object-oriented type design](examples/object-oriented-type-design.md) | hierarchy pivot and mechanism assignment | 8 | type structure | One pivot receives inheritance; other factors need other mechanisms |
| [Incident severity](examples/incident-severity.md) | service incident assessment | 8 | severity | Classification is derived from impact and response facts |
| [Data retention](examples/data-retention.md) | retention policy decision | 8 | retention obligation/date | Policy and lifecycle triggers derive the outcome |
| [Deployment identity](examples/deployment-identity.md) | operated deployment | 9 | deployment identity/name | Names project factors but should not own them |
| [Work prioritization](examples/work-prioritization.md) | portfolio ordering | 9 | priority/rank | Scores should not hide inputs or veto constraints |

## Formula Tables

See the [Formula Table pilot catalog](formulas/INDEX.md) for relation-kind
coverage and selection rules.

| Entry | Relation kind | Canonical expression | Principal lesson |
|---|---|---|---|
| [Force](formulas/force.md) | physical law | `sum(F_external) = m a` | Equations require scope, symbols, units, dimensions, and sources in addition to conceptual factors |
| [Mass density](formulas/density.md) | definition | `rho_avg = m / V` | A definition can still depend on boundary and averaging scope |
| [Ohm's law](formulas/ohms-law.md) | empirical constitutive relation | `V = I R` | A famous law may describe only a bounded regime |
| [Sample arithmetic mean](formulas/arithmetic-mean.md) | estimator or statistic | `x_bar = sum(x_i) / n` | A simple statistic requires inclusion and interpretation rules |
| [Pythagorean trigonometric identity](formulas/pythagorean-trigonometric-identity.md) | identity | `sin(theta)^2 + cos(theta)^2 = 1` | Identity domains and restricted consequences remain visible |
| [General accounting balance](formulas/general-accounting-balance.md) | conservation or balance | `accumulation = input - output + generation - consumption` | System boundaries distinguish balances from slogans |
| [Newton's method](formulas/newtons-method.md) | algorithm or recurrence | `x_(k+1) = x_k - f(x_k)/f'(x_k)` | Convergence claims require local conditions |
| [Event probability range](formulas/probability-range.md) | constraint | `0 <= P(A) <= 1` | A probability requires a probability model |
| [Common geometric measures](formulas/common-geometric-measures.md) | definition and derived shape formulas | perimeter, area, surface area, and volume by shape | Select measured subset and dimension before formula |
| [Kinematics motion measures](formulas/kinematics-motion-measures.md) | definition, derivative, and conditional equations | distance, displacement, speed, velocity, and acceleration | Select path/endpoints, scalar/vector, frame, and rate order |
| [Matter and load measures](formulas/matter-load-measures.md) | base quantity, definition, and scoped physical model | mass, weight, density, and pressure | Select quantity kind, boundary, gravity, and normalization basis |
| [Mechanical work, energy, and power](formulas/mechanical-work-energy-power.md) | definition, theorem, and scoped balance | work, kinetic and potential energy, mechanical energy, and power | Separate transfer, state, system, path, frame, and rate |
| [Comparative quantities](formulas/comparative-quantities.md) | definition, equality, normalization, and change | ratio, rate, proportion, percentage, relative change, and percentage points | Preserve order, quantity kinds, units, baseline, and denominator domains |
| [Probability, risk, and uncertainty relations](formulas/probability-risk-uncertainty.md) | identity, mapping, expectation, model schema, and measurement relation | conditional probability, odds, expected loss, risk, and expanded uncertainty | Separate event models, representations, consequences, and coverage |
| [Thermal quantities](formulas/thermal-quantities.md) | equilibrium, response, balance, and constraint | temperature, heat, internal energy, heat capacity, and entropy | Separate state, transfer, response, sign, phase, and reversible path |
| [Amount, concentration, and composition](formulas/amount-concentration-composition.md) | definition and closure constraint | entity count, amount of substance, concentrations, and composition fractions | Separate entity, component, mixture volume, quantity basis, and state |
| [Periodic and wave quantities](formulas/periodic-wave-quantities.md) | definition, angular representation, and traveling-wave model | period, frequency, wavelength, phase, wave number, and speed | Separate cycles, radians, temporal/spatial repetition, pattern propagation, and regime |
| [Electrical quantities](formulas/electrical-quantities.md) | definition, rate, and accumulated transfer | charge, current, potential difference, power, and energy transfer | Separate surfaces, terminals, polarity, direction, rate, and accumulation |
| [Information and signal measures](formulas/information-signal-measures.md) | definition, expectation, ordered ratio, and logarithmic mapping | self-information, entropy, power SNR, decibels, and sample SNR | Separate semantics, probability models, task-relative components, estimators, and scales |

## Mapping Tables

| Entry | Mapping kind | Principal lesson |
|---|---|---|
| [Temperature scale conversion](mappings/temperature-scales.md) | exact affine conversion | Point temperatures and intervals require different transformations |

## Composite entries

| Entry | Factors | Notes |
|---|---:|---|
| [Access-control request](composites/access-control-request.md) | 8 | Every primary factor resolves to a linked prime entry |

## Prime entries

- [Authentication assurance](primes/authentication-assurance.md)
- [Authorization policy](primes/authorization-policy.md)
- [Enforcement point](primes/enforcement-point.md)
- [Protected object](primes/protected-object.md)
- [Request context](primes/request-context.md)
- [Requested action](primes/requested-action.md)
- [Subject identity](primes/subject-identity.md)
- [Subject-object relationship](primes/subject-object-relationship.md)

## Root coordinate entries

- [Agency](roots/agency.md)
- [Boundary](roots/boundary.md)
- [Constraint](roots/constraint.md)
- [Context](roots/context.md)
- [Identity](roots/identity.md)
- [Measure](roots/measure.md)
- [Possibility](roots/possibility.md)
- [Purpose](roots/purpose.md)
- [Relation](roots/relation.md)
- [State](roots/state.md)
- [Time](roots/time.md)
- [Transformation](roots/transformation.md)

## Factor role entries

- [Capability](roles/capability.md)
- [Component](roles/component.md)
- [Derived view](roles/derived-view.md)
- [Pivot](roles/pivot.md)
- [Policy](roles/policy.md)
- [Variant](roles/variant.md)

State, relationship, boundary, context, and constraint use structural-role
senses within their canonical root entries rather than duplicate headwords.

## Pilot observations

- Composite width and recursive depth are independent.
- Derived outputs such as severity, retention obligations, and priority should
  not be counted as independent inputs.
- Pivots differ by lens even when candidate factors overlap.
- Broad words such as `security` and `environment` require sense separation.
- Many useful headwords are multiword design situations rather than isolated
  common nouns.
- Unresolved candidate terms remain visible until canonical entries or external
  references are reviewed.
