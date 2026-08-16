---
skill: discover-websearch
topic: fraction-molar-mass-composition-basis
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Fraction, Molar Mass, and Composition-Basis Web Evidence

## Claims

| # | Claim | Source of claim | Why grounding matters | Verdict |
|---|---|---|---|---|
| 1 | A fraction is a same-kind part/constituent quantity divided by the sum for the whole. | unresolved entry debt | Prevents every quotient from becoming a fraction. | CONFIRMED |
| 2 | Fraction closure requires a consistently defined exhaustive component set. | proposed formula constraint | Prevents overlapping or partial categories from being forced to one. | CONFIRMED |
| 3 | Molar mass is mass divided by amount of substance with unit `kg mol^-1`. | unresolved entry debt | Preserves quantity kind and dimensional meaning. | CONFIRMED |
| 4 | Molar mass and relative molecular mass are different quantity kinds despite possible numerical coincidence. | proposed contrast | Prevents a unit-bearing quantity from collapsing into a pure number. | CONFIRMED |
| 5 | Molar mass connects mass/amount conversion and supports normalized mass/amount fraction transformation. | proposed formula extension | Prevents direction, identity, weighting, and component-set errors. | CONFIRMED |

## Query record

| Claim | Query 1 | Query 2 |
|---|---|---|
| 1 | `site:goldbook.iupac.org fraction quantities same kind constituent sum` | `site:goldbook.iupac.org amount fraction mass fraction definition` |
| 2 | `site:goldbook.iupac.org amount fraction total all constituents mixture` | `site:goldbook.iupac.org mass fraction constituent total mass` |
| 3 | `site:goldbook.iupac.org molar mass definition mass divided amount substance` | `site:bipm.org SI Brochure molar mass kg mol-1` |
| 4 | `site:goldbook.iupac.org relative molecular mass dimensionless molar mass` | `site:iupac.org Green Book molar mass relative molecular mass PDF` |
| 5 | `site:goldbook.iupac.org mixture mean molar mass total mass total amount` | `site:iupac.org Green Book amount fraction mass fraction molar mass` |

## Direct evidence

**Claim 1**

- IUPAC fraction: “a ratio of two quantities of the same kind,” with the
  numerator applying to one part and denominator to the sum of parts.
- IUPAC amount fraction: amount of one constituent divided by total amount of
  all constituents.
- Verdict: CONFIRMED.

**Claim 2**

- IUPAC amount fraction names the total of all constituents as denominator.
- IUPAC mass fraction likewise uses total mass of all constituents.
- Verdict: CONFIRMED. The nonoverlap condition is a mathematical requirement
  for summing component fractions as a partition, not a new IUPAC taxonomy.

**Claim 3**

- IUPAC molar mass: “Mass divided by amount of substance,” with units
  `kg mol^-1` or `g mol^-1`.
- The IUPAC Green Book gives `M_B = m / n_B` and unit `kg mol^-1`.
- Verdict: CONFIRMED.

**Claim 4**

- IUPAC defines relative molecular mass as a ratio to the unified atomic mass unit.
- IUPAC notes that numerical values coincide when molar mass uses `g mol^-1`;
  one remains dimensioned and the other is dimension one.
- Verdict: CONFIRMED.

**Claim 5**

- The BIPM mole history describes determining amount from sample mass and molar mass.
- IUPAC defines amount and mass fractions on matching component totals; algebraic
  substitution of `m_i = n_i M_i` yields the normalized basis transformations.
- Verdict: CONFIRMED.

## Findings

| # | Finding | Source |
|---|---|---|
| 1 | A fraction is a ratio of quantities of the same kind. | [IUPAC](https://goldbook.iupac.org/terms/view/F02494) |
| 2 | Its numerator applies to one constituent or part. | [IUPAC](https://goldbook.iupac.org/terms/view/F02494) |
| 3 | Its denominator is the sum over all declared parts. | [IUPAC](https://goldbook.iupac.org/terms/view/F02494) |
| 4 | Mixture fractions include mass, volume, and amount bases. | [IUPAC](https://goldbook.iupac.org/terms/view/F02494) |
| 5 | Amount fraction divides component amount by total mixture amount. | [IUPAC](https://goldbook.iupac.org/terms/view/M04003) |
| 6 | Amount fraction equals number fraction under the specified entity basis. | [IUPAC](https://goldbook.iupac.org/terms/view/M04003) |
| 7 | Mass fraction divides component mass by total mixture mass. | [IUPAC](https://goldbook.iupac.org/terms/view/M03722) |
| 8 | Volume fraction uses the sum of component volumes prior to mixing in its cited definition. | [IUPAC](https://goldbook.iupac.org/terms/view/V06643) |
| 9 | Same-kind ratios have unit one. | [BIPM](https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf) |
| 10 | Percent means parts per hundred and is a display convention, not a quantity basis. | [BIPM](https://www.bipm.org/documents/d/guest/si-brochure-9-3_01) |
| 11 | Molar mass is mass divided by amount of substance. | [IUPAC](https://goldbook.iupac.org/terms/view/12214) |
| 12 | Molar mass uses `kg mol^-1` or `g mol^-1`. | [IUPAC](https://goldbook.iupac.org/terms/view/12214) |
| 13 | “Molar” generally means division of an extensive quantity by amount. | [IUPAC](https://goldbook.iupac.org/terms/view/M03971/pdf) |
| 14 | Relative molecular mass is a ratio to the unified atomic mass unit. | [IUPAC](https://goldbook.iupac.org/terms/view/M04000) |
| 15 | Relative molecular mass is dimension one. | [IUPAC Green Book](https://publications.iupac.org/books/gbook/green_book_2ed.pdf) |
| 16 | Numerical molar and relative molecular mass values can coincide under `g mol^-1`. | [IUPAC](https://goldbook.iupac.org/terms/view/12214) |
| 17 | Amount can be determined from mass and molar mass for a specified entity/material. | [BIPM](https://www.bipm.org/en/history-si/mole) |
| 18 | Mean molar mass of a mixture is total mass divided by total amount. | [IUPAC Green Book](https://publications.iupac.org/books/gbook/green_book_2ed.pdf) |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or unconfirmed.

## Ungrounded claims

No ungrounded claims. The normalized fraction-conversion equations are exact
algebraic consequences of the cited definitions under the stated exhaustive,
consistent component-set assumptions; they are marked as transformations, not
independent empirical laws.

## Amendments

1. Made membership and partition assumptions explicit rather than calling all
   same-kind quotients fractions.
2. Kept molar mass and relative molecular mass separate despite numerical coincidence.
3. Required component identity, order, exhaustiveness, direction, and
   normalization for composition-basis transformations.
