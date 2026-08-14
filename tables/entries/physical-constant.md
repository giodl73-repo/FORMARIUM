# Physical Constant

Status: candidate anchor entry

## Orientation

A physical constant is a quantity used in physical theory or unit definition.
Some constants have exact numerical values in specified units because a unit
system defines them that way; others are experimentally determined and carry
uncertainty. A bare number without quantity, unit, status, authority, and
version is not a usable reference value.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `defining-constant` | Which exact quantity value defines part of a unit system? | exact metrological definition |
| `measured-constant` | Which experimentally determined constant value and uncertainty apply? | measured reference quantity |
| `recommended-value` | Which evaluated value does an authority recommend for use? | versioned reference datum |
| `nominal-value` | Which convenient conventional value is used for communication or design? | declared approximation/convention |

## Root factorization

```text
physical-constant-use
  := quantity and symbol
   x numerical value
   x unit
   x exact, measured, recommended, or nominal status
   x defining or physical role
   x source authority and version
   x uncertainty and correlation where applicable
   x unit-system context
   x precision and intended use
```

## Specialized view

The linked [SI Defining Constants](../values/si-defining-constants.md) owns the
seven fixed values that define the SI.

## Selection procedure

1. Identify the physical quantity, symbol, unit system, and intended use.
2. Select defining, measured, recommended, or nominal status before choosing a
   numerical value.
3. For a defining constant, name the unit-system authority and why the value
   is exact.
4. For a measured constant, retain uncertainty, correlation where relevant,
   method/evaluation source, and publication version.
5. For a recommended value, retain the evaluating authority, release, and
   supersession policy.
6. For a nominal value, state the approximation purpose and acceptable error.
7. Preserve significant digits and conversion rules appropriate to the source
   status rather than display convenience.
8. Recheck the source when the authority or version changes; never treat a
   copied number as timeless.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Metrology authority | Owns official values, units, and uncertainties | Remains the source of truth |
| Handbook | Curates convenient scientific values | Adds application context and tables |
| Formula sheet | Substitutes constants into equations | Often omits status and authority |
| Factorium | Links value status to concept, unit, scope, and misuse signs | Avoids copying authority beyond a bounded reference view |

## Constraints and failure signs

- Quantity, symbol, value, and unit remain together.
- Exactness states why the value is exact.
- Measured constants retain uncertainty and source version.
- Recommended values are not silently frozen forever.
- Nominal approximations are labeled.
- Significant digits are not invented or discarded without purpose.
- A defining value does not by itself supply a physical model.

## Cross-references

- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Electrical Quantity](electrical-quantity.md)
- [Thermal Quantity](thermal-quantity.md)
- [Periodic and Wave Quantity](periodic-wave-quantity.md)
- [Measure](../roots/measure.md)

## Sources and provenance

1. BIPM, "SI defining constants":
   https://www.bipm.org/en/measurement-units/si-defining-constants

Metrological values are established by BIPM; Factorium organization remains
`candidate`.
