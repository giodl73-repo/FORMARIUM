# Thermal Quantities

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Thermal Quantity](../entries/thermal-quantity.md)

## Orientation

These relations separate thermal state variables from path-dependent heat and
work transfers. They require a system boundary, process conditions, sign
convention, phase scope, and absolute temperature where entropy is involved.

## Core relations

| Quantity or claim | Canonical expression | Relation kind |
|---|---|---|
| Thermal equilibrium | `T_A = T_B` | equilibrium condition |
| Conditional sensible heat | `Q = m c Delta T` | material response approximation |
| Heat capacity | `C_process = Q / Delta T` | finite-process response definition |
| Specific heat capacity | `c_process = C_process / m` | mass normalization |
| First law | `Delta U = Q_in - W_by` | energy balance with declared signs |
| Reversible entropy change | `Delta S = integral_A^B (delta Q_rev / T)` | state-function evaluation |
| Reversible isothermal entropy change | `Delta S = Q_rev / T` | conditional special form |
| Isolated total entropy | `Delta S_total >= 0` | second-law constraint |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `T` | thermodynamic temperature | intensive state variable | `K` | absolute temperature for entropy |
| `Q`, `Q_in` | heat transferred into system | signed path quantity | `J` | boundary and sign declared |
| `m` | material mass | scalar | `kg` | selected material boundary |
| `c_process` | specific heat capacity | response coefficient | `J kg^-1 K^-1` | material, phase, and constraint declared |
| `C_process` | system heat capacity | response coefficient | `J K^-1` | process constraint declared |
| `Delta U` | internal-energy change | state difference | `J` | same system endpoints |
| `W_by` | work done by system | signed path quantity | `J` | positive-by-system convention |
| `S`, `Delta S` | entropy and entropy change | state quantity/difference | `J K^-1` | equilibrium endpoints |
| `delta Q_rev` | reversible-path heat increment | inexact path differential | `J` | evaluation path is reversible |

## Dimensional audit

```text
[m c Delta T] = kg (J kg^-1 K^-1) K = J
[Q / Delta T] = J K^-1
[Q / T]       = J K^-1
```

## First-law sign contract

This table uses:

```text
Q_in > 0  when heat enters the system
W_by > 0  when the system does work on surroundings
Delta U = Q_in - W_by
```

With work done on the system, `W_on = -W_by`, the equivalent form is:

```text
Delta U = Q_in + W_on
```

The forms are equivalent only when their sign definitions are preserved.

## Scope of the heat-capacity relation

`Q = m c Delta T` is a practical approximation when:

- no unmodeled phase change occurs;
- the relevant heat capacity is sufficiently constant or averaged;
- material, phase, and process constraint are known;
- other work and energy-transfer channels are handled consistently.

`Delta T = 0` does not imply `Q = 0` during a phase change.

## Entropy scope

Entropy change between equilibrium states can be evaluated along a reversible
path:

```text
Delta S = integral(delta Q_rev / T)
```

The actual process may be irreversible. The special quotient `Q_rev/T`
requires reversible heat exchange at constant absolute temperature.

## Failure signs

- Temperature is substituted for energy because an object feels hot.
- A system is said to contain heat.
- Heat and work are added without a shared sign convention.
- Internal-energy change is assumed equal to heat when work is nonzero.
- Celsius numerical temperature is used in an entropy denominator.
- `Q = m c Delta T` is applied through phase change without latent energy.
- Constant-pressure and constant-volume heat capacities are interchanged.
- Entropy change is calculated from irreversible actual heat as `Q/T`.
- A local system entropy decrease is claimed to violate the second law without
  including surroundings.

## Reference Delta

The canonical [Thermal Quantity entry](../entries/thermal-quantity.md) owns the
full comparison. Relative to a formula sheet, this view adds state/path roles,
system boundary, sign convention, material and phase scope, process
constraint, reversible evaluation, and absolute-temperature requirements.

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, sections 1.1, 1.4, 3.2, 3.3, and
   4.6:
   https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
   https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry
   https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
   https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
   https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy
2. NIST, "SI Units - Temperature":
   https://www.nist.gov/pml/owm/si-units-temperature

Formula authority: established introductory thermodynamics within stated
scope. Factorium presentation remains `candidate`.
