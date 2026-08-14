# Geometric Measure Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize perimeter, circumference, area, surface area, and
volume so readers select the right measure and formula rather than memorize an
undifferentiated list?

Decision supported: create a geometric-measure anchor and a linked common-shape
Formula Table.

## Sources

1. NIST, "SI Units - Length":
   https://www.nist.gov/pml/owm/si-units-length
2. OpenStax, *Prealgebra 2e*, section 9.5:
   https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures
3. OpenStax, *Prealgebra 2e*, section 9.6:
   https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area
4. OpenStax, *University Physics Volume 2*, mathematical formulas:
   https://openstax.org/books/university-physics-volume-2/pages/e-mathematical-formulas

## Findings

### FACTORIUM-GM-01 - Boundary and interior distinguish the measures

- Sources: OpenStax sections 9.5 and 9.6.
- Observation: circumference measures the boundary of a circle; area measures
  a two-dimensional region; surface area totals the faces or outer surface of
  a three-dimensional object; volume measures its three-dimensional interior.
- Implication: the entry should pivot first on measured subset and dimension,
  not on a memorized formula name.
- Confidence: high.

### FACTORIUM-GM-02 - Unit exponent is a fast validity check

- Source: NIST SI length page.
- Observation: length uses metres, area square metres, and volume cubic metres.
- Implication: perimeter and circumference have dimension `L`, area and surface
  area `L^2`, and volume `L^3`. Wrong unit exponent is a visible failure sign.
- Confidence: high.

### FACTORIUM-GM-03 - Shape selects the formula after measure kind

- Sources: OpenStax sections 9.5 and 9.6.
- Observation: rectangle, triangle, circle, prism, cylinder, cube, and sphere
  formulas use different sufficient parameters.
- Implication: formula lookup is two-stage: select measure kind, then shape and
  parameterization.
- Confidence: high.

### FACTORIUM-GM-04 - Surface area and volume can share parameters but not meaning

- Source: OpenStax section 9.6.
- Observation: a sphere uses the same radius for `4 pi r^2` surface area and
  `(4/3) pi r^3` volume, but the outputs have different dimensions and answer
  different questions.
- Implication: common inputs do not make outputs interchangeable.
- Confidence: high.

### FACTORIUM-GM-05 - Decomposition extends beyond standard shapes

- Source: OpenStax section 9.5.
- Observation: irregular planar figures can be split into known shapes and
  their areas combined, subject to overlap and omission.
- Implication: composition strategy, partition validity, overlap, and holes
  belong in Factorium failure signs.
- Confidence: high.

### FACTORIUM-GM-06 - Exact formulas and numerical approximations differ

- Sources: OpenStax sections 9.5 and 9.6.
- Observation: formulas containing `pi` are exact symbolically; decimal use of
  `pi` introduces approximation and rounding policy.
- Implication: retain exact expressions and label numerical approximations.
- Confidence: high.

## Recommendations

### Adopt now

- Publish a geometric-measure anchor with five senses.
- Publish a formula matrix for common 2D and 3D shapes.
- Use measured subset, measure dimension, shape, parameters, and units as the
  common Factorium structure.

Owner: Factorium. Validation: dimensional audit, source review, role review,
and link validation.

### Prototype behind a compatibility boundary

- Shape-aware formula selection.
- Unit-exponent validation.
- Composite-shape partition diagrams and overlap checking.
- Symbolic exact versus numerical approximate output.

Owner: future Factorium Workbench. Validation: geometry fixtures with known
answers and invalid-unit cases.

### Reject or defer

- A flat formula list without measure-kind selection.
- Treating surface area as volume because the same dimensions are supplied.
- Decimal `pi` results labeled exact.
- Composite areas added without checking overlap and holes.

## Non-goals

- Full Euclidean measure theory.
- Proofs of every formula.
- Exhaustive shape coverage in the first pilot.

