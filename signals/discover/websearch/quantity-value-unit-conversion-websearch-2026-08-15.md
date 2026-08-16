---
skill: discover-websearch
topic: quantity-value-unit-conversion
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Quantity Value and Unit Conversion Web Evidence

## Claims to ground

| # | Claim | Source | Why it matters |
|---:|---|---|---|
| 1 | Quantity value, numerical value, and unit are distinct. | proposed anchor | Prevents bare-number conversion. |
| 2 | Ordinary conversion factors relate units of quantities of the same kind. | proposed Mapping | Prevents dimension-only coercion. |
| 3 | Compound conversion follows unit products and powers. | proposed Mapping | Prevents exponent and denominator errors. |
| 4 | Point-scale conversion can require an offset while interval conversion does not. | temperature view | Prevents affine/linear collapse. |
| 5 | Exact conversion does not justify added precision or physical validity. | claim boundary | Prevents false-quality claims. |

## Web evidence

### Claim 1

- Query: `site:bipm.org VIM quantity value numerical value unit`
  - JCGM VIM 1.19 defines a quantity value as a number and reference together
    and gives `5.34 m` and `534 cm` as presentations of one length.
  - https://jcgm.bipm.org/vim/en/1.19.html
- Query: `site:nist.gov SP 811 value numerical value quantity unit`
  - NIST states `A = {A}[A]` and distinguishes the quantity from its
    unit-dependent numerical value.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values
- Query: `site:bipm.org VIM numerical quantity value example kilogram gram`
  - JCGM VIM 1.20 gives `5.7 kg` and `5700 g` as one quantity value with
    different numerical values.
  - https://jcgm.bipm.org/vim/en/1.20.html
- Verdict: CONFIRMED.

### Claim 2

- Query: `site:jcgm.bipm.org conversion factor between units same kind`
  - JCGM VIM 1.24 defines the factor as a ratio of units for quantities of the
    same kind.
  - https://jcgm.bipm.org/vim/en/1.24.html
- Query: `site:nist.gov conversion factors multiply divide inverse SP 811`
  - NIST Appendix B shows multiplication in the forward direction and division
    by the factor for the inverse direction.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
- Query: `site:nist.gov quantities same dimension not same kind VIM`
  - The NIST-hosted VIM states that same kind implies same dimension, but the
    converse need not hold; energy and moment of force are its example.
  - https://www.nist.gov/system/files/documents/pml/div688/grp40/International-Vocabulary-of-Metrology.pdf
- Verdict: CONFIRMED.

### Claim 3

- Query: `site:nist.gov SP 811 derived unit conversion factors powers`
  - NIST derives a momentum-unit factor by substituting the mass and length
    unit relations into the compound unit.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
- Query: `site:bipm.org SI prefixes powers unit symbol raised power`
  - The SI Brochure defines prefixes as powers of ten and applies powers to the
    prefixed unit as a whole.
  - https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
- Query: `site:jcgm.bipm.org coherent system units numerical equations`
  - JCGM VIM 1.14 states that coherent numerical-value equations retain the
    form and factors of their quantity equations.
  - https://jcgm.bipm.org/vim/en/1.14.html
- Verdict: CONFIRMED.

### Claim 4

- Query: `site:bipm.org SI Brochure Celsius temperature difference 273.15`
  - The SI Brochure gives `t/°C = T/K - 273.15` for point temperatures and the
    same numerical interval in kelvins and degrees Celsius.
  - https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
- Query: `site:nist.gov SI units temperature point interval conversion`
  - NIST SP 811 distinguishes Celsius temperature from temperature difference
    and interval.
  - https://www.nist.gov/pml/special-publication-811
- Query: `site:jcgm.bipm.org quantity value scale Celsius`
  - JCGM VIM 1.27 identifies Celsius temperature as a quantity-value scale.
  - https://jcgm.bipm.org/vim/en/1.27.html
- Verdict: CONFIRMED.

### Claim 5

- Query: `site:nist.gov SP 811 rounding converted numerical values`
  - NIST requires output rounding consistent with the possible rounding error
    of the unconverted value.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
- Query: `site:nist.gov SP 811 exact conversion factor rounded factor`
  - NIST distinguishes exact factors from rounded factors in its tables.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
- Query: `site:bipm.org VIM measurement result uncertainty quantity value`
  - JCGM VIM 2.9 treats relevant information and measurement uncertainty as
    part of the result rather than something erased by representation change.
  - https://jcgm.bipm.org/vim/en/2.9.html
- Query: `site:jcgm.bipm.org ordinal quantity no algebraic operations`
  - JCGM VIM 1.26 states that ordinal quantities do not admit algebraic
    operations among their values.
  - https://jcgm.bipm.org/vim/en/1.26.html
- Query: `site:nist.gov logarithmic quantities reference amplitude ratio`
  - NIST defines logarithmic levels through dimensionless same-kind ratios and
    explicit references.
  - https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
- Verdict: CONFIRMED.

## Findings table

| # | Finding | Verdict | Source |
|---:|---|---|---|
| 1 | One quantity value can have several unit presentations. | confirmed | JCGM 1.19 |
| 2 | Numerical value depends on the selected unit. | confirmed | JCGM 1.20 |
| 3 | Quantity equations should remain distinct from numerical-value equations. | confirmed | NIST Ch. 7 |
| 4 | A conversion factor is a ratio of units. | confirmed | JCGM 1.24 |
| 5 | The units must belong to quantities of the same kind. | confirmed | JCGM 1.24 |
| 6 | Forward and inverse directions use multiplication and division respectively. | confirmed | NIST App. B |
| 7 | Same dimension does not prove same quantity kind. | confirmed | JCGM VIM |
| 8 | Compound factors follow constituent unit structure. | confirmed | NIST App. B |
| 9 | Unit powers also apply to prefix factors. | confirmed | BIPM SI |
| 10 | Coherent unit systems simplify numerical-value equations. | confirmed | JCGM 1.14 |
| 11 | Celsius point conversion contains an offset. | confirmed | BIPM SI |
| 12 | Celsius and kelvin intervals have equal numerical values. | confirmed | BIPM SI |
| 13 | Point and interval transformations are distinct. | confirmed | NIST SP 811 |
| 14 | Exact and rounded conversion factors have different status. | confirmed | NIST App. B |
| 15 | Output rounding must respect source information. | confirmed | NIST App. B |
| 16 | Conversion does not remove measurement uncertainty. | confirmed | JCGM 2.9 |
| 17 | Ordinal values do not admit ordinary algebraic conversion. | confirmed | JCGM 1.26 |
| 18 | Logarithmic levels retain a reference and ratio convention. | confirmed | NIST Ch. 8 |

Summary: 5 of 5 claims and 18 findings confirmed. No ungrounded claims.

## Amendments

1. Make quantity kind a stronger gate than dimension alone.
2. Separate multiplicative, compound, affine-point, and interval mappings.
3. Preserve factor authority, exactness, uncertainty, and rounding policy.
