# Comparative Quantity

Status: candidate anchor entry

## Orientation

Ratios, fractions, rates, proportions, and percentages all compare quantities,
but they do not ask the same question. A fraction is a like-kind ratio whose
numerator is one constituent or part and whose denominator is the declared
whole. Its boundedness follows from that membership contract, not from
division alone.

## Sense table

| Sense | Governing question | Relation role | Unit behavior |
|---|---|---|---|
| `ratio` | How large is one like-kind quantity relative to another? | ordered quotient comparison | units cancel after alignment |
| `fraction` | What part of a declared whole belongs to this constituent or subset? | bounded part-whole ratio | one, `1` |
| `rate` | How much numerator quantity occurs per denominator quantity? | cross-kind quotient comparison | quotient units remain |
| `unit-rate` | What equivalent rate applies per one denominator unit? | normalized rate view | quotient units remain |
| `proportion` | Are these two ordered comparisons equal? | equality claim | corresponding units and roles align |
| `percentage` | What comparison is expressed per hundred? | scaled ratio representation | percent or dimension one |
| `relative-change` | How large is the change relative to the original baseline? | directed baseline-normalized change | dimension one when kinds match |
| `percentage-point-difference` | What is the arithmetic gap between two percentages? | difference of displayed percentage levels | percentage points |

## Root factorization

```text
comparative-quantity-use
  := numerator quantity
   x denominator or base quantity
   x comparison order
   x quantity kinds
   x unit alignment
   x subset, rate, equality, or change interpretation
   x part-whole membership and boundary
   x exhaustiveness, overlap, and remainder policy
   x original and new state when changing
   x sign and direction convention
   x zero-denominator policy
   x display scale
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Ratio vs. rate | both use division | like-kind comparison with cancellation vs. cross-kind comparison with quotient units |
| Ratio vs. fraction | a fraction is a ratio | arbitrary ordered like-kind comparison vs. part divided by its containing whole |
| Fraction vs. share | both may describe a part | defined quantity relation vs. broader contextual allocation word |
| Rate vs. unit rate | same comparison value | arbitrary denominator amount vs. normalized denominator of one unit |
| Ratio vs. proportion | ratios appear on both sides | one comparison vs. an assertion that two comparisons are equal |
| Fraction vs. percentage | both can represent a part of a whole | direct quotient vs. per-hundred display |
| Percentage vs. percentage point | both mention percent levels | scaled ratio level vs. arithmetic difference between levels |
| Absolute vs. relative change | both compare old and new values | direct difference vs. difference divided by the original |

## Diagnostic examples

- `3 teachers / 60 students` is the reciprocal of `60 students / 3
  teachers`; the order changes the question.
- `120 km / 2 h` is a rate of `60 km/h`; the distance and time units do not
  cancel.
- `2 red / 8 total = 25%` is a part-whole comparison with an explicit base.
- `8 selected / 2 reference` is a ratio of four, not a fraction under a
  part-within-whole contract.
- Two overlapping categories can each have a fraction, but their values cannot
  be summed as though the categories were mutually exclusive.
- A price moving from 80 to 100 increases by 20 units and by 25% relative to
  the original 80.
- A rate moving from 10% to 15% rises by 5 percentage points and by 50%
  relative to the original rate.
- A percentage can exceed 100 when the numerator exceeds the base; that does
  not fit a bounded part-whole interpretation.

## Formula view

The linked [Comparative Quantity Formula Table](../formulas/comparative-quantities.md)
contains ratio, rate, proportion, percentage, and change relations.

## Selection procedure

1. State the comparison question in words.
2. Assign numerator and denominator roles in that order.
3. Determine whether the quantity kinds match.
4. For a fraction, verify that the part belongs to the declared whole and state
   whether categories are exhaustive, mutually exclusive, overlapping, or partial.
5. Align units for a like-kind ratio; preserve quotient units for a rate.
6. Decide whether the claim is a value, an equality, or a change.
7. For change, declare old and new values and select absolute, relative, or
   percentage-point reporting.
8. Check denominator and baseline restrictions.
9. Label the display scale and rounding.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines ratio, rate, proportion, percentage, and point senses | Places them in one ordered comparison and baseline schema |
| Thesaurus | Links comparison, fraction, share, rate, quotient, and proportion | Prevents nearby words from erasing unit and equality distinctions |
| Encyclopedia or textbook | Explains algebra, examples, and applications | Supplies a compact selection procedure and failure diagnostics |
| Formula sheet | Lists quotient, proportion, and percent formulas | Adds semantic roles, unit behavior, baseline, direction, and domain |
| Statistical style guide | Distinguishes percent from percentage points | Connects reporting language to explicit mathematical relations |

## Constraints and failure signs

- Reversing numerator and denominator changes the comparison.
- Like-kind quantities use aligned units before cancellation.
- A rate retains meaningful quotient units.
- A proportion requires nonzero denominators and corresponding roles.
- A part-whole fraction requires a declared whole and compatible counting
  boundary.
- `0 <= f <= 1` follows only when part and whole are nonnegative and the part
  is contained in the whole.
- Fraction closure requires an exhaustive, mutually exclusive partition; an
  overlapping or partial category set need not sum to one.
- Relative change uses the original value as baseline unless another baseline
  is explicitly named.
- Zero original value makes ordinary relative percent change undefined.
- Percentage-point difference applies to percentage levels, not arbitrary
  unscaled quantities.
- Rounding should occur after the governing comparison is computed.

## Cross-references

- [Motion measure](motion-measure.md)
- [Matter and load measure](matter-load-measure.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Measure](../roots/measure.md)
- [Relation](../roots/relation.md)
- [Time](../roots/time.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Cost, Price, Value, Utility, and Return](cost-price-value-return.md)

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

Comparator access date: 2026-08-15. Arithmetic relations and reporting
distinctions are established within source scope; Factorium organization
remains `candidate`.
