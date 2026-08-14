# Comparative Quantity Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize ratio, rate, unit rate, proportion, percentage,
relative change, and percentage-point difference so denominator choice,
quantity kind, units, and baseline remain visible?

Decision supported: publish one comparative-quantity anchor and a linked
Formula Table.

## Sources

1. OpenStax, *Prealgebra 2e*, section 5.6, "Ratios and Rate":
   https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate
2. OpenStax, *Prealgebra 2e*, section 6.1, "Understand Percent":
   https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
3. OpenStax, *Prealgebra 2e*, section 6.2, "Solve General Applications of
   Percent":
   https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent
4. OpenStax, *Prealgebra 2e*, section 6.5, "Solve Proportions and their
   Applications":
   https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications
5. UK Office for National Statistics, "Percentages and percentage points":
   https://service-manual.ons.gov.uk/content/numbers/percentages
6. BIPM, *The International System of Units (SI Brochure)*:
   https://www.bipm.org/en/publications/si-brochure

## Findings

### FACTORIUM-CQ-01 - Comparison order is semantic

- Sources: OpenStax sections 5.6 and 6.5.
- Observation: `A/B` and `B/A` answer different questions. Proportions must
  preserve corresponding numerator and denominator roles.
- Implication: numerator role, denominator role, and reading order are part of
  the relation contract.
- Confidence: high.

### FACTORIUM-CQ-02 - Ratio and rate preserve different unit behavior

- Source: OpenStax section 5.6.
- Observation: the instructional distinction treats a ratio as comparing
  quantities of the same kind after unit alignment, while a rate compares
  different kinds and retains quotient units.
- Implication: Factorium should expose quantity kinds and unit cancellation
  rather than calling every quotient "a ratio" without further typing.
- Confidence: high within the stated educational taxonomy.

### FACTORIUM-CQ-03 - Unit rate is a normalized representation

- Source: OpenStax section 5.6.
- Observation: a unit rate expresses an equivalent rate per one denominator
  unit.
- Implication: unit rate should be linked as a normalized view of a rate, not
  treated as independent evidence.
- Confidence: high.

### FACTORIUM-CQ-04 - A proportion is an equality claim

- Source: OpenStax section 6.5.
- Observation: a proportion states that two ratios or rates are equal, with
  nonzero denominators and aligned comparison order.
- Implication: cross multiplication is a consequence under valid domains, not
  permission to ignore units, meanings, or zero denominators.
- Confidence: high.

### FACTORIUM-CQ-05 - Percent is a scaled ratio representation

- Source: OpenStax section 6.1.
- Observation: percent means per hundred. It can represent a part-whole
  fraction, but percentages greater than 100 are also valid in other
  comparison contexts.
- Implication: the base and interpretation must remain explicit; `100%` means
  one whole only relative to the declared base.
- Confidence: high.

### FACTORIUM-CQ-06 - Relative change depends on its baseline

- Source: OpenStax section 6.2.
- Observation: percent increase or decrease divides the change by the
  original amount.
- Implication: old-to-new direction, original baseline, sign convention, and
  zero-baseline behavior are mandatory.
- Confidence: high.

### FACTORIUM-CQ-07 - Percentage points and percent change are not equivalent

- Source: UK Office for National Statistics guidance.
- Observation: moving from 10% to 15% is an increase of 5 percentage points
  but a 50% relative increase.
- Implication: statistical comparisons must name which change measure is
  reported.
- Confidence: high.

## Recommendations

### Adopt now

- Publish ratio, rate, unit rate, proportion, percentage, relative change, and
  percentage-point difference as distinct comparison senses.
- Require numerator, denominator, base, quantity kind, units, direction, and
  zero-denominator restrictions.
- Include a compact change-measure contrast with worked diagnostics.

Owner: Factorium. Validation: algebraic, unit, baseline, source, role, and link
review.

### Prototype behind a compatibility boundary

- Typed comparison calculators that carry quantity kinds and units.
- Statistical display helpers that label percent and percentage-point change.
- Ratio simplification that preserves original counts and provenance.

Owner: future Factorium Workbench. Validation: reversed-order, incompatible-
unit, zero-baseline, and over-100-percent fixtures.

### Reject or defer

- Treating numerator and denominator order as cosmetic.
- Cancelling unlike units to make a rate look dimensionless.
- Using cross multiplication before checking domain and correspondence.
- Reporting percent change without naming the baseline.
- Substituting percentage points for relative percent change.

## Non-goals

- Statistical risk and odds.
- Dimensional-analysis similarity groups.
- Compound growth and financial returns.
- Concentration measures.

