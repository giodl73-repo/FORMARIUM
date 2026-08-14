# Ohm's Law

Status: candidate Formula Table

Primary family: Formula Table

## Orientation

Ohm's law describes a linear voltage-current relation for an ohmic material or
component under the physical conditions for which its resistance remains
applicable. Despite its familiar name, it is an empirical relation rather than
a universal law of nature.

## Relation

| Field | Value |
|---|---|
| Sense | terminal voltage-current relation |
| Relation kind | Empirical constitutive relation |
| Canonical expression | `V = I R` |
| Relation authority | established for ohmic behavior within stated conditions |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Quantity kind | SI unit | Dimension | Role |
|---|---|---|---|---|---|
| `V` | potential difference across the component | scalar with polarity convention | volt, `V` | `M L^2 T^-3 I^-1` | measured response |
| `I` | current through the component | scalar with direction convention | ampere, `A` | `I` | measured flow |
| `R` | resistance under stated conditions | scalar | ohm, `ohm` | `M L^2 T^-3 I^-2` | constitutive parameter |

Voltage, current, and resistance resolve through the canonical
[Electrical Quantity](../entries/electrical-quantity.md) anchor.

## Scope and assumptions

- The same component and terminal pair own the voltage and current values.
- Polarity and current direction conventions are declared consistently.
- The component exhibits an approximately linear voltage-current relation over
  the applied operating range.
- Temperature and other material conditions are held fixed or their effect on
  resistance is explicitly modeled.
- Nonohmic devices and regimes require another current-voltage relation.

## Equivalent forms

| Form | Use | Restriction |
|---|---|---|
| `I = V / R` | Solve for current | `R` must be nonzero and applicable |
| `R = V / I` | Infer static resistance at an operating point | `I` must be nonzero; one ratio does not prove linear ohmic behavior |

## Dimensional audit

```text
[I R] = I x (M L^2 T^-3 I^-2)
      = M L^2 T^-3 I^-1
      = [V]
```

Here the first `I` is the electric-current base dimension. The multiplication
inside the dimensional equation is mathematical.

## Conceptual Factor Table

```text
ohmic-relation-use
  := component
   x terminal pair
   x voltage
   x current
   x resistance
   x material state
   x operating range
   @ temperature and physical conditions
   ! nonohmic behavior
```

## Failure signs

- A diode, lamp, or other nonlinear device is assigned one constant resistance
  across an unsuitable operating range.
- Voltage and current refer to different branches or terminal pairs.
- Heating changes resistance while calculations assume it is fixed.
- `R = V/I` at one point is treated as evidence of a linear relation.
- Sign conventions are discarded and scalar magnitudes produce a wrong
  direction.

## Cross-references

- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [State](../roots/state.md)
- [Electrical Quantity](../entries/electrical-quantity.md)

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, section 9.4, "Ohm's Law":
   https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units

Formula authority: established empirical relation for ohmic behavior.
Factorium representation remains a candidate pending electrical-engineering
and practitioner review.
