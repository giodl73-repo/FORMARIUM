# Electrical Quantities

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Electrical Quantity](../entries/electrical-quantity.md)

## Orientation

These relations separate charge, current, potential difference, electrical
power, and transferred energy. They require a system or component, terminal
pair or oriented surface, time basis, and consistent voltage-current sign
convention.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Average current | `I_avg = Delta Q / Delta t` | finite-interval definition |
| Instantaneous current | `I = dQ / dt` | rate definition |
| Potential difference | `Delta V = Delta U_e / q` | definition |
| Instantaneous terminal power | `p = v i` | energy-transfer rate relation |
| Electrical energy transfer | `Delta E = integral_(t_1)^(t_2) p(t) dt` | accumulated transfer |
| Constant-power transfer | `Delta E = P Delta t` | conditional special form |
| Ohmic resistive power | `P = I^2 R = V^2 / R` | derived forms under Ohm scope |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `Q`, `Delta Q` | net charge crossing selected surface | signed quantity | `C` | surface orientation declared |
| `q` | selected test or transferred charge | signed quantity | `C` | nonzero for quotient |
| `I`, `i` | current under declared direction | signed rate | `A` | same branch/surface |
| `Delta V`, `v` | potential difference under declared polarity | signed difference | `V` | ordered terminal pair |
| `Delta U_e` | electric potential-energy difference | signed energy difference | `J` | same charge and endpoints |
| `p`, `P` | instantaneous or constant/average power | signed transfer rate | `W` | sign convention declared |
| `Delta E` | electrical energy transferred | signed transfer amount | `J` | interval and boundary declared |
| `R` | applicable resistance | scalar parameter | `ohm` | ohmic regime and state |
| `t` | time | coordinate or duration | `s` | interval declared |

## Dimensional audit

```text
[Q/t] = C s^-1 = A
[U/q] = J C^-1 = V
[V I] = V A = W
[P t] = W s = J
[I^2 R] = A^2 ohm = W
[V^2/R] = V^2/ohm = W
```

## Power sign contract

Under the passive sign convention, current entering the terminal labeled
positive makes `p = v i > 0` represent power absorbed by the component.
Negative power then represents supply under that same reference choice.
Changing polarity or current reference changes signs and must not silently
change the semantic conclusion.

## Ohm-scope inheritance

The general power relation `p = v i` does not require ohmic behavior.
The forms:

```text
P = I^2 R
P = V^2 / R
```

inherit the full scope of the linked [Ohm's Law](ohms-law.md): same component
and terminals, consistent directions, applicable linear operating regime,
material state, and nonzero denominator for the quotient form.

## Failure signs

- Current is computed from stored charge without a crossing boundary.
- Potential difference is reported for one point without a reference point.
- Voltage and current use incompatible terminal or direction conventions.
- Unsigned magnitudes hide whether power is absorbed or supplied.
- Watts are treated as energy rather than energy per time.
- Kilowatt-hours are treated as power rather than energy.
- Resistive power forms are applied to a nonohmic component.
- A changing resistance is held constant without a thermal or state model.

## Reference Delta

The canonical [Electrical Quantity entry](../entries/electrical-quantity.md)
owns the full comparison. Relative to a formula sheet, this view adds crossing
surface, terminal pair, polarity, direction, sign, state, and inherited-model
scope.

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, sections 7.2, 9.1, 9.4, and 9.5:
   https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
   https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current
   https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
   https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
2. NIST, "SI Units - Electric Current":
   https://www.nist.gov/pml/owm/si-units-electric-current

Formula authority: introductory circuit relations within stated scope.
Factorium presentation remains `candidate`.
