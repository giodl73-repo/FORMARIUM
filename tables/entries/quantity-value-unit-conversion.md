# Quantity Value, Numerical Value, Unit, Dimension, and Conversion

Status: candidate anchor entry

## Orientation

A quantity value expresses a quantity through a number and a reference,
usually a measurement unit. The numerical value changes when the unit changes;
the quantity need not. A dimension records dependence on base quantities, but
equal dimensions do not guarantee the same quantity kind. Unit conversion is
a representation mapping, not a new measurement, calibration, or proof that a
value is physically meaningful.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `quantity-value` | What magnitude and reference express this particular quantity? | represented quantity magnitude |
| `numerical-value` | What number expresses the quantity in the selected unit or reference? | unit-dependent number |
| `measurement-unit` | Which conventionally defined quantity of the same kind is the comparison reference? | magnitude reference |
| `quantity-dimension` | How does the quantity depend on the chosen base quantities? | dimensional structure |
| `conversion-factor` | What ratio relates two units for quantities of the same kind? | directed multiplicative relation |
| `unit-conversion` | How is one quantity value re-expressed in a target unit or scale? | representation mapping |

## Root factorization

```text
quantity-representation-and-conversion
  := quantity and quantity kind
   x quantity value and numerical value
   x source unit, system, definition, and authority
   x target unit, system, definition, and authority
   x quantity dimension and compound-unit structure
   x point, interval, ratio, level, or ordinal value kind
   x multiplicative, affine, or other admitted mapping
   x conversion direction and inverse domain
   x exact or approximate factor status
   x measurement uncertainty and covariance where relevant
   x numeric precision and rounding policy
   x provenance, version, and intended use
   ! physical and semantic validity
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Quantity value | quantity x number x unit-or-reference | particular quantity | recording a result | bare number |
| Simple unit change | value x source unit x target unit x factor x direction | unit relation | same-kind multiplicative units | reversed factor |
| Compound unit | numerator factors x denominator factors x powers x cancellations | unit expression | rates and derived units | missed exponent |
| Affine point scale | point value x scale x zero x direction x domain | represented point | zero points differ | offset applied to interval |
| Interval change | difference x scale ratio x direction | interval magnitude | comparing differences | point offset reused |
| Evidence-preserving output | source precision x uncertainty x factor status x rounding | information content | publishing a converted result | invented digits |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Quantity vs. quantity value | both identify magnitude-bearing content | attribute of a phenomenon/body vs. one expression of its magnitude |
| Quantity value vs. numerical value | a number participates in most quantity values | number plus reference vs. number alone in a selected reference |
| Unit vs. dimension | both organize quantities | conventional magnitude reference vs. base-quantity dependence |
| Same dimension vs. same kind | same-kind quantities share a dimension | equal dimensions alone do not license conversion or semantic substitution |
| Conversion vs. measurement | both can output a number and unit | re-expression of an existing value vs. empirical attribution of a value |
| Conversion vs. calibration | both may use relations | unit/scale mapping vs. standards-to-indications/results relation under conditions |
| Conversion vs. correction | both change reported numbers | representation change vs. compensation for an estimated systematic effect |
| Exact factor vs. exact result | exactness may appear in both descriptions | unit relation status vs. measurement-result uncertainty |

## Diagnostic examples

- `5.7 kg` and `5700 g` can express the same mass with different numerical
  values.
- A speed conversion must transform both distance and time units, including
  their denominator direction.
- An area conversion squares the length-unit factor; it does not reuse the
  unsquared factor.
- Energy and torque can share dimensions and `N m` units without becoming the
  same quantity kind.
- A Celsius point temperature needs an offset when mapped to kelvin, while a
  Celsius temperature interval does not.
- Converting a coarsely rounded input with an exact factor does not justify a
  long string of output digits.

## Specialized view

The [Unit Conversion Mapping](../mappings/unit-conversion.md) owns general
multiplicative, compound, affine, inverse, uncertainty, and rounding contracts.
The [Temperature Scale Conversion](../mappings/temperature-scales.md) remains
the worked point-versus-interval specialist view.

## Selection procedure

1. Identify the particular quantity and its kind before reading the number.
2. Record the source numerical value, unit or reference, system, authority,
   version, uncertainty, and precision.
3. Confirm that the target represents the same quantity kind; use dimension as
   a rejection test, not as sufficient proof.
4. Classify the mapping as multiplicative, compound, affine point, interval,
   logarithmic/reference-based, ordinal, or another explicitly governed kind.
5. Derive or obtain the directed unit relation and record whether it is exact.
6. Apply powers to complete unit factors and preserve numerator/denominator
   orientation.
7. Propagate uncertainty under the admitted transformation and round only at
   the declared output boundary.
8. Test the inverse over its valid domain and retain provenance.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Metrology vocabulary | Defines quantity, value, unit, dimension, and conversion factor | Remains terminology authority |
| Unit standard | Defines units, prefixes, and admitted relations | Remains unit authority |
| Conversion table | Supplies directed factors for named units | Usually specializes one mapping family |
| Textbook | Teaches dimensional analysis and worked conversions | Supplies derivations and exercises |
| Factorium | Connects representation roles, mapping kind, evidence status, and failure signs | Avoids becoming a named-unit catalog |

## Constraints and failure signs

- Conversion begins with quantity kind, not a matching symbol or dimension.
- Source and target units retain authority, version, direction, and exactness.
- Compound-unit factors preserve every exponent and denominator.
- Offsets apply to point scales only when the governing scale relation requires
  them.
- Ordinal and logarithmic/reference-based values require their own admitted
  mapping rather than blind factor cancellation.
- Conversion preserves source uncertainty and information limits; it does not
  establish accuracy, calibration, validity, or fitness for use.
- Intermediate rounding is avoided when a final rounding boundary is known.

## Cross-references

- [Measure](../roots/measure.md)
- [Relation](../roots/relation.md)
- [Transformation](../roots/transformation.md)
- [Comparative Quantity](comparative-quantity.md)
- [Measurement Quality](measurement-quality.md)
- [Physical Constant](physical-constant.md)
- [Thermal Quantity](thermal-quantity.md)

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-quantity-value-unit-conversion.md)
2. JCGM VIM 1.19, 1.20, 1.24, and 1.26:
   https://jcgm.bipm.org/vim/en/index.html
3. BIPM, *SI Brochure*, ninth edition, version 4.01:
   https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
4. NIST SP 811, Chapter 7 and Appendix B:
   https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values
   https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors

Comparator access date: 2026-08-15. Metrology authorities own terminology,
units, and unit relations; this synthesis remains `candidate`.
