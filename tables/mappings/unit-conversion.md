# Unit Conversion Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Quantity Value, Numerical Value, Unit, Dimension, and Conversion](../entries/quantity-value-unit-conversion.md)

Senses: `quantity-value`, `numerical-value`, `measurement-unit`,
`quantity-dimension`, `conversion-factor`, `unit-conversion`

## Purpose

Re-express one quantity value in a target unit or scale while preserving
quantity kind, mapping direction, unit structure, exactness, uncertainty, and
the distinction between point and interval values.

## Mapping identity

| Field | Value |
|---|---|
| Source system | declared source unit or quantity-value scale |
| Target system | declared target unit or quantity-value scale |
| Mapping kinds | exact or approximate scale conversion; affine conversion |
| Cardinality | normally one-to-one over the admitted domain |
| Authority/version | source and target unit authorities plus relation source |
| Factorium maturity | `candidate` |

## Transformation contracts

### Multiplicative units

```text
Q = x_s u_s = x_t u_t
c_(s->t) = u_s / u_t
x_t = c_(s->t) x_s
c_(t->s) = 1 / c_(s->t)
```

The conversion factor is dimension one because the units represent quantities
of the same kind. Its numerical value depends on direction.

### Compound units

```text
u_s = product_i (u_s,i)^(a_i)
u_t = product_i (u_t,i)^(a_i)
c_(s->t) = product_i (u_s,i / u_t,i)^(a_i)
x_t = c_(s->t) x_s
```

Negative exponents retain denominator direction. Area and volume conversions
therefore square or cube the complete length-unit factor.

### Affine point scales

```text
x_t = a x_s + b
x_s = (x_t - b) / a,  a != 0
```

For an interval or difference under the same scale relation:

```text
Delta x_t = a Delta x_s
```

The offset belongs to represented points, not intervals.

### Uncertainty and rounding

For a multiplicative or affine conversion with exact `c` or `a`:

```text
u(x_t) = |c| u(x_s)
u(x_t) = |a| u(x_s)
```

Additional uncertainty from an approximate factor must be included when it is
material. Carry guard digits through intermediate steps and apply the declared
rounding policy to the final presentation.

## Mapping selection table

| Source/target relation | Mapping | Required checks | Inverse |
|---|---|---|---|
| Same-kind multiplicative units | `x_t = c x_s` | factor direction and exactness | divide by nonzero `c` |
| Compound units | product of powered constituent factors | every exponent and denominator | reciprocal product |
| Point scales with different zeros | `x_t = a x_s + b` | point sense, domain, scale, offset | subtract `b`, divide by `a` |
| Intervals on affine scales | `Delta x_t = a Delta x_s` | interval sense; no offset | divide by `a` |
| Logarithmic/reference levels | governed reference and log relation | quantity kind, reference, base, amplitude/power role | governed inverse only |
| Ordinal or procedure-defined values | no generic unit-factor mapping | owning procedure and empirical relation | not assumed |

## Worked structural examples

```text
5.7 kg x (1000 g / 1 kg) = 5700 g

1 km/h x (1000 m / 1 km) x (1 h / 3600 s)
  = 1/3.6 m/s

1 g/cm^3 x (10^-3 kg / 1 g) x (100 cm / 1 m)^3
  = 1000 kg/m^3
```

These examples demonstrate factor direction and powers. The unit authorities,
not Factorium, own the named relations.

## Preservation and loss

| Property | Result |
|---|---|
| Particular quantity and quantity kind | preserved |
| Quantity value | preserved within mapping and rounding scope |
| Numerical value | intentionally changed |
| Unit or scale identity | intentionally changed |
| Dimension | preserved but not sufficient to identify kind |
| Measurement uncertainty | transformed, not erased |
| Precision/information | may be lost through rounding |
| Accuracy, calibration, and physical validity | not created |

## Failure signs

- A factor is selected because dimensions match, without checking quantity
  kind.
- A factor is applied in the reciprocal direction.
- An area or volume conversion uses the unsquared or uncubed length factor.
- A denominator factor is multiplied in the numerator direction.
- A point-scale offset is applied to an interval.
- Exact factor digits are reported as new measurement precision.
- Intermediate rounding prevents an otherwise valid round trip.
- An ordinal or logarithmic value is treated as an ordinary multiplicative
  unit without its reference contract.

## Cross-references

- [Temperature Scale Conversion](temperature-scales.md)
- [Comparative Quantities](../formulas/comparative-quantities.md)
- [Measurement Quality](../entries/measurement-quality.md)
- [Physical Constant](../entries/physical-constant.md)
- [Matter and Load Measures](../formulas/matter-load-measures.md)

## Sources and provenance

1. JCGM VIM 1.19, 1.20, and 1.24:
   https://jcgm.bipm.org/vim/en/index.html
2. BIPM, *SI Brochure*, ninth edition, version 4.01:
   https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
3. NIST SP 811, Chapter 7 and Appendix B:
   https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values
   https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors

Mapping authority remains with the cited metrology sources. Factorium's
generalized transformation contract remains `candidate`.
