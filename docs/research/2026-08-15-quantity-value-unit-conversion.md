# Quantity Value, Unit, Dimension, and Conversion Research

Date: 2026-08-15

## Question

What reusable concept layer lets a reader change the representation of a
quantity without changing the quantity, confusing numerical values with
quantity values, or treating dimensional agreement as proof of semantic or
physical validity?

## Findings

1. A quantity value combines a number with a reference, commonly a measurement
   unit; the numerical value depends on the selected unit.
2. A conversion factor is the ratio of two units for quantities of the same
   kind. Multiplicative cancellation is therefore valid only after quantity
   kind, direction, and unit identities are established.
3. Equal dimensions are necessary but not sufficient for sameness of kind.
   Energy and moment of force are the standard counterexample already present
   in Factorium's mechanics route.
4. Compound-unit conversion follows the product and power structure of the
   unit expression. Affine point scales require an offset, while their
   intervals use scale only.
5. Exactness belongs to the authoritative unit relation. Conversion does not
   improve measurement accuracy, reduce source uncertainty, or create physical
   validity. Rounding belongs at the declared output boundary.
6. Ordinal scales and procedure-defined references do not automatically admit
   ordinary unit-factor arithmetic. Logarithmic levels retain their reference,
   ratio kind, and logarithm convention.

## Architecture decision

Add one canonical anchor,
`tables/entries/quantity-value-unit-conversion.md`, and one general Mapping
view, `tables/mappings/unit-conversion.md`. The anchor owns quantity value,
numerical value, measurement unit, quantity dimension, conversion factor, and
unit conversion. The Mapping view owns multiplicative, compound, affine, and
rounding contracts. The existing temperature-scale Mapping remains the
worked specialist view.

Named units, historical unit systems, conversion-factor catalogs, ordinal
scales, and logarithmic-level families remain authority-owned examples or
future scoped views rather than canonical senses.

## Primary sources

- JCGM VIM 1.19, 1.20, and 1.24:
  https://jcgm.bipm.org/vim/en/1.19.html
  https://jcgm.bipm.org/vim/en/1.20.html
  https://jcgm.bipm.org/vim/en/1.24.html
- BIPM, *SI Brochure*, ninth edition, version 4.01:
  https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
- NIST SP 811, Chapter 7 and Appendix B:
  https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values
  https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
