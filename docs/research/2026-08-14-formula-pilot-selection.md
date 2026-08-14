# Formula Pilot Selection Research

Date: 2026-08-14

## Research question

Which formulas should follow Newton's second law to test whether the Formula
Table format handles materially different kinds of mathematical claims?

Decision supported: add mass density, Ohm's law, and the sample arithmetic
mean, then defer broader collection growth until these relation kinds are
reviewed.

## Sources

1. OpenStax, *College Physics 2e*, section 11.2, "Density":
   https://openstax.org/books/college-physics-2e/pages/11-2-density
2. OpenStax, *University Physics Volume 2*, section 9.4, "Ohm's Law":
   https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
3. OpenStax-derived Business Statistics, "Sigma Notation and Calculating the
   Arithmetic Mean":
   https://stats.libretexts.org/Bookshelves/Applied_Statistics/Business_Statistics_(OpenStax)/02%3A_Descriptive_Statistics/2.04%3A_Sigma_Notation_and_Calculating_the_Arithmetic_Mean
4. NIST/SEMATECH, *e-Handbook of Statistical Methods*, "Measures of
   Location":
   https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm
5. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units

## Findings

### FACTORIUM-FP-01 - Density tests a definition with a boundary

- Source: OpenStax section 11.2.
- Observation: average mass density is defined as mass per occupied volume,
  with SI unit `kg/m3`.
- Implication: the Formula Table must make the chosen object, total mass, and
  occupied-volume boundary visible. A bulk average must not silently claim
  pointwise uniformity.
- Confidence: high.

### FACTORIUM-FP-02 - Ohm's law tests a bounded empirical relation

- Source: OpenStax section 9.4.
- Observation: OpenStax explicitly calls Ohm's law empirical rather than a law
  of nature and limits it to ohmic materials or components whose voltage and
  current relation is linear under the relevant conditions.
- Implication: famous naming must not override relation-kind classification or
  validity conditions.
- Confidence: high.

### FACTORIUM-FP-03 - The arithmetic mean tests a statistic

- Sources: OpenStax-derived Business Statistics; NIST measures of location.
- Observation: the arithmetic mean sums included observations and divides by
  their count. NIST shows that heavy tails can make the mean a poor description
  of typical location and uses the Cauchy distribution as an extreme case.
- Implication: a Formula Table for a statistic must expose sample inclusion,
  weighting, missing-value handling, and failure conditions, not just syntax.
- Confidence: high.

### FACTORIUM-FP-04 - Relation diversity is more valuable than fame alone

- Sources: `specs/FORMULA-TABLE-ENTRY.md`;
  `docs/research/2026-08-14-formula-table-architecture.md`.
- Observation: the first four pilots now cover physical law, definition,
  empirical constitutive relation, and statistic.
- Implication: select the next pilots to cover identity, conservation/balance,
  algorithm/recurrence, and explicit constraint before adding many formulas of
  one familiar kind.
- Confidence: high.

### FACTORIUM-FP-05 - Rearrangement remains subordinate

- Sources: OpenStax density and Ohm's-law sections.
- Observation: `m = rho V`, `I = V/R`, and similar forms are algebraic uses of
  the same scoped relation, with nonzero-denominator restrictions where
  applicable.
- Implication: index one canonical relation and keep rearrangements within the
  entry.
- Confidence: high.

## Recommendations

### Adopt now

- Add Formula Tables for mass density, Ohm's law, and sample arithmetic mean.
- Add a formula catalog faceted by relation kind.
- Preserve different units, dimensional signatures, and applicability tests.

Owner: Factorium. Validation: source links, dimensional audit, complete role
review, and practitioner scanability.

### Prototype behind a compatibility boundary

- Formula retrieval by desired output or known variables.
- Generated rearrangements with domain restrictions.
- Unit-aware numerical examples and dimensional checking.

Owner: future Factorium Workbench. Validation: expression-tree fixtures and
independent evaluation.

### Reject or defer

- Ranking formulas only by cultural fame.
- Treating Ohm's law as universal because it is named a law.
- Treating the arithmetic mean as the preferred center for every distribution.
- Creating separate entries for every algebraic rearrangement.

## Non-goals

- Exhaustive physics, mathematics, or statistics coverage.
- Replacing instruction on experimental design, circuit theory, or robust
  statistics.

