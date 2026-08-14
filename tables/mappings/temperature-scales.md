# Temperature Scale Conversion

Status: candidate Mapping Table

## Orientation

Celsius, kelvin, and Fahrenheit assign different numerical values to the same
point temperature. Point-temperature conversion is affine because scale and
zero point may differ. Temperature intervals use scale only and MUST NOT reuse
the point offset.

## Mapping identity

| Field | Value |
|---|---|
| Sense | exact point-temperature scale conversion |
| Source systems | Celsius, kelvin, Fahrenheit |
| Target systems | Celsius, kelvin, Fahrenheit |
| Mapping kind | exact affine conversion |
| Mapping authority | NIST SI temperature guidance |
| Factorium maturity | `candidate` |

## Point-temperature mappings

| From | To Celsius | To kelvin | To Fahrenheit |
|---|---|---|---|
| Celsius `C` | `C` | `C + 273.15` | `1.8 C + 32` |
| kelvin `K` | `K - 273.15` | `K` | `1.8 (K - 273.15) + 32` |
| Fahrenheit `F` | `(F - 32) / 1.8` | `(F - 32) / 1.8 + 273.15` | `F` |

The transformations are exact before numerical rounding.

## Interval mappings

| From interval | To Celsius interval | To kelvin interval | To Fahrenheit interval |
|---|---|---|---|
| `Delta C` | `Delta C` | `Delta C` | `1.8 Delta C` |
| `Delta K` | `Delta K` | `Delta K` | `1.8 Delta K` |
| `Delta F` | `Delta F / 1.8` | `Delta F / 1.8` | `Delta F` |

One Celsius degree and one kelvin have the same interval magnitude. A
Fahrenheit degree is `1/1.8` of either interval.

## Domain and inverse

| Scale | Physical point-temperature domain | Exact inverse condition |
|---|---|---|
| kelvin | `K >= 0` | Apply the opposite affine rule without intermediate rounding |
| Celsius | `C >= -273.15` | Apply the opposite affine rule without intermediate rounding |
| Fahrenheit | `F >= -459.67` | Apply the opposite affine rule without intermediate rounding |

Mathematical formulas accept values outside these ranges, but those values do
not represent physical thermodynamic temperatures.

## Preservation and loss

| Property | Result |
|---|---|
| Temperature ordering | preserved |
| Equality of represented point temperature | preserved before rounding |
| Temperature differences | preserved with the interval scale conversion |
| Numerical value | generally changed |
| Decimal precision | may be lost through rounding |
| Unit identity | intentionally changed |
| Physical validity | not created by conversion |

## Round-trip examples

```text
C -> K -> C
(C + 273.15) - 273.15 = C

C -> F -> C
((1.8 C + 32) - 32) / 1.8 = C
```

Exact arithmetic round trips. Finite decimal rounding may not.

## Conceptual Factor Table

```text
temperature-conversion
  := temperature value
   x source scale
   x target scale
   x point-or-interval sense
   x affine transformation
   x rounding policy
   ! physical domain
```

## Failure signs

- The `273.15` offset is added to a temperature interval.
- Celsius and Fahrenheit point values are converted with scale only.
- A rounded display value is expected to round-trip exactly.
- Values below absolute zero are accepted as physical temperatures.
- The degree symbol is attached to kelvin.
- Approximate touchstone values are confused with exact conversions.

## Cross-references

- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [Formula Table format](../../specs/FORMULA-TABLE-ENTRY.md)
- temperature — `unresolved-candidate`
- unit conversion — `unresolved-candidate`

## Sources and provenance

1. NIST, "SI Units - Temperature":
   https://www.nist.gov/pml/owm/si-units-temperature

Mapping authority: exact NIST conversion rules. Factorium presentation remains
a candidate pending metrology and practitioner review.

