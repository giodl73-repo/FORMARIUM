# Comparative Quantities

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Comparative Quantity](../entries/comparative-quantity.md)

## Orientation

These relations all use comparison, division, scaling, or difference. Their
meaning depends on ordered roles, quantity kinds, units, baseline, membership,
and domain restrictions. Boundedness is a semantic constraint on a fraction,
not a property of every like-kind quotient.

## Core relations

| Quantity or claim | Canonical expression | Relation kind |
|---|---|---|
| Ordered ratio | `r = A / B` | definition for aligned like-kind quantities |
| Rate | `q_rate = Q_num / Q_den` | cross-kind quotient definition |
| Unit rate | `q_rate per 1 denominator-unit` | normalized equivalent representation |
| Proportion | `A / B = C / D` | equality of ordered comparisons |
| Part-whole fraction | `f = part / whole` | bounded ratio under nonnegative subset assumptions |
| Numerical percent value | `p = 100 f` | per-hundred scaling |
| Displayed percentage | `p%` | representation of ratio `p / 100` |
| Absolute change | `Delta x = x_new - x_old` | directed difference |
| Relative change | `r_change = (x_new - x_old) / x_old` | baseline-normalized difference |
| Percent change | `p_change = 100 r_change` | scaled relative change |
| Percentage-point difference | `Delta_pp = p_new - p_old` | difference between numerical percent levels |

## Symbol contract

| Symbol | Meaning | Kind | Restriction |
|---|---|---|---|
| `A`, `B` | ordered like-kind quantities | scalar quantities | compatible kinds; `B` nonzero |
| `Q_num`, `Q_den` | numerator and denominator quantities | scalar quantities | roles and units declared; denominator nonzero |
| `r` | like-kind ratio | scalar dimension-one quantity | units aligned before cancellation |
| `q_rate` | rate | scalar quotient quantity | derived units retained |
| `C`, `D` | second ordered comparison | scalar quantities | roles correspond to `A`, `B`; `D` nonzero |
| `part` | selected subset amount | nonnegative scalar | same boundary and kind as `whole` |
| `whole` | base amount | positive scalar | contains the selected part |
| `f` | part-whole fraction | dimension-one scalar | `0 <= f <= 1` under subset assumptions |
| `p` | numerical percent value | scalar | displayed with `%` to mean `p/100` |
| `x_old`, `x_new` | baseline and comparison values | compatible scalars | same kind and unit |
| `Delta_pp` | percentage-point difference | scalar difference | inputs are numerical percentage levels |

## Unit and dimension behavior

```text
[A / B] = 1
```

when `A` and `B` have the same quantity kind and aligned unit.

```text
[Q_num / Q_den] = D_num D_den^-1
```

for a rate between different quantity kinds. The quotient dimension and unit
must not be discarded.

## Proportion consequence

For:

```text
A / B = C / D
```

with nonzero `B` and `D` and corresponding quantity roles:

```text
A D = B C
```

Cross multiplication is a valid algebraic consequence after the relation
contract is established. It does not validate mismatched units or meanings.

## Fraction closure

For nonnegative parts that form an exhaustive mutually exclusive partition of
one whole:

```text
f_i = part_i / whole
sum_i(f_i) = 1
```

The closure relation does not apply unchanged to overlapping categories,
partial lists, signed contributions, or differently bounded wholes.

## Change example

For a percentage level changing from 10% to 15%:

```text
percentage-point difference = 15 - 10 = 5 percentage points
relative change             = (0.15 - 0.10) / 0.10 = 0.50
percent change              = 50%
```

The two results answer different questions.

## Selection procedure

1. Name numerator, denominator, and comparison order.
2. Classify the quantity kinds and align compatible units.
3. Select ratio, rate, normalized unit rate, or proportion.
4. For part-whole percent, verify subset and whole boundaries.
5. For change, preserve old-to-new direction and the original baseline.
6. Select percent or percentage-point reporting explicitly.
7. Reject zero denominators before rearrangement.
8. Round only after calculation and retain the requested display precision.

## Failure signs

- The reciprocal is reported because comparison order was not stated.
- Units are cancelled between different quantity kinds.
- A unit rate is treated as new evidence rather than an equivalent
  normalization.
- Cross multiplication compares noncorresponding roles.
- A denominator is zero.
- A percentage lacks a named base.
- A part-whole percentage over 100 is accepted despite the subset contract.
- Fractions from overlapping or incomplete categories are forced to sum to one.
- Relative change divides by the new value instead of the declared original.
- A zero baseline produces a finite percent change through an arbitrary
  fallback.
- A five-percentage-point increase is reported as a five-percent increase.
- Intermediate rounding materially changes a later comparison.

## Reference Delta

The canonical [Comparative Quantity entry](../entries/comparative-quantity.md)
owns the full comparison. Relative to a formula sheet, this view adds ordered
roles, quantity kinds, unit behavior, subset boundaries, baseline direction,
zero-domain restrictions, and percent-versus-point diagnostics.

## Sources and provenance

1. OpenStax, *Prealgebra 2e*, sections 5.6, 6.1, 6.2, and 6.5:
   https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate
   https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
   https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent
   https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications
2. UK Office for National Statistics:
   https://service-manual.ons.gov.uk/content/numbers/percentages
3. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure
4. IUPAC Gold Book, "fraction":
   https://goldbook.iupac.org/terms/view/F02494

Formula authority: established arithmetic and statistical reporting
conventions within stated scope. Factorium presentation remains `candidate`.
