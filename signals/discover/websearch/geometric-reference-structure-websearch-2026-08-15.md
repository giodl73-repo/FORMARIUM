---
skill: discover-websearch
topic: geometric-reference-structure
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Geometric Reference Structure Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source of claim | Why it needs grounding |
|---|---|---|---|
| 1 | Length is a one-dimensional quantity, while path length depends on the selected curve or route and differs from endpoint displacement. | geometry and motion debt | `length` and `path` must not collapse with displacement or a coordinate difference. |
| 2 | Shape is a geometric form relative to selected properties and transformations, not one scalar size or one coordinate representation. | geometric-measure debt | Shape must support congruence/similarity contrasts without becoming vague “appearance.” |
| 3 | Plane angle is a distinct quantity whose coherent SI unit is the radian even though its SI dimension is one. | trigonometric debt | Dimensionless treatment must not erase angle kind or unit convention. |
| 4 | A coordinate system assigns numerical coordinates, while a reference frame or datum relates that abstract system to a physical object or observer. | motion/reference-frame debt | Coordinates and frames must not become interchangeable defaults. |
| 5 | The unit circle is a specialized radius-one circle in a selected coordinate plane used to define sine and cosine values. | Pythagorean Formula debt | The unit circle is a scoped construction, not a universal context object. |

## Phase 2 - Web evidence

### Claim 1

- Query 1: `site:nist.gov SI units length metre definition`
  - Source: https://www.nist.gov/pml/owm/si-units-length
  - Direct quote: “The meter (m) is defined by taking the fixed numerical value of the speed of light”
  - Relevance: Confirms length as an SI base quantity with metre unit.
- Query 2: `site:openstax.org arc length curve parameterization path length`
  - Source: https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature
  - Direct quote: “distance traveled along the curve”
  - Relevance: Connects accumulated path length to a curve and parameter interval.
- Verdict: CONFIRMED

### Claim 2

- Query 1: `site:openstax.org shape congruent same size geometry`
  - Source: https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles
  - Direct quote: “same shape but differ in size”
  - Relevance: Similarity preserves shape while permitting scale change.
- Query 2: `site:openstax.org similar figures scaling factor shape size`
  - Source: https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles
  - Direct quote: “applying a scaling factor”
  - Relevance: Shows that chosen transformation/equivalence controls what counts as same shape.
- Verdict: CONFIRMED

### Claim 3

- Query 1: `site:bipm.org SI Brochure plane angle radian dimensionless`
  - Source: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf/2d2b50bf-f2b4-9661-f402-5f9d66e4b507?version=4.0
  - Direct quote: “The radian is the coherent unit for plane angle.”
  - Relevance: Establishes quantity kind and unit.
- Query 2: `site:nist.gov plane angle derived quantity dimension one radian`
  - Source: https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values
  - Direct quote: “examples of such quantities”
  - Relevance: NIST places plane angle among derived quantities of dimension one.
- Verdict: CONFIRMED

### Claim 4

- Query 1: `site:ogc.org coordinate system reference frame datum definition`
  - Source: https://docs.ogc.org/as/18-005r4/18-005r4.html
  - Direct quote: “specifies the relationship of a coordinate system to an object”
  - Relevance: Separates abstract coordinate system from datum/reference frame.
- Query 2: `site:nasa.gov reference frame coordinate system motion definition`
  - Source: https://science.nasa.gov/learn/basics-of-space-flight/chapter2-1/
  - Direct quote: “Spatial coordinates and timing conventions are adopted”
  - Relevance: Shows that consistent location and motion claims require adopted spatial and temporal conventions.
- Verdict: CONFIRMED

### Claim 5

- Query 1: `site:openstax.org unit circle radius 1 sine cosine coordinates`
  - Source: https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle
  - Direct quote: “A unit circle has a center at (0,0) and radius 1.”
  - Relevance: Gives the conventional coordinate-plane construction.
- Query 2: `site:openstax.org unit circle sine y-coordinate cosine x-coordinate`
  - Source: https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle
  - Direct quote: “cosine of an angle t equals the x-value”
  - Relevance: Connects the construction to sine/cosine coordinates.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Length is an SI base quantity and metre is its SI unit. | CONFIRMED | [NIST length](https://www.nist.gov/pml/owm/si-units-length) |
| 2 | Area and volume derive square and cubic units from the length unit. | CONFIRMED | [NIST SI units](https://www.nist.gov/pml/owm/metric-si/si-units) |
| 3 | A smooth curve can be represented by a vector-valued parameterization. | CONFIRMED | [OpenStax arc length](https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature) |
| 4 | The same curve can have different parameterizations. | CONFIRMED | [OpenStax reparameterization](https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature) |
| 5 | Arc length accumulates normed change along the selected parameter interval. | CONFIRMED | [OpenStax arc-length function](https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature) |
| 6 | Distance traveled can be positive when endpoint displacement is zero. | CONFIRMED | [OpenStax relative motion](https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement) |
| 7 | Similar figures can preserve shape while differing in size. | CONFIRMED | [OpenStax triangles](https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles) |
| 8 | Scale factor is part of the similarity relation, not an intrinsic coordinate label. | CONFIRMED | [OpenStax similarity](https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles) |
| 9 | Plane angle is a quantity distinct from a generic length ratio. | CONFIRMED | [BIPM SI Brochure](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf/2d2b50bf-f2b4-9661-f402-5f9d66e4b507?version=4.0) |
| 10 | The radian is the coherent SI unit for plane angle. | CONFIRMED | [BIPM SI Brochure](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf/2d2b50bf-f2b4-9661-f402-5f9d66e4b507?version=4.0) |
| 11 | Plane angle has SI dimension one, while the `rad` symbol can preserve quantity information. | CONFIRMED | [NIST SI guide](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-4-two-classes-si-units-and-si-prefixes) |
| 12 | An OGC coordinate reference system generally combines a coordinate system with a datum or datum ensemble. | CONFIRMED | [OGC Topic 2](https://docs.ogc.org/as/18-005r4/18-005r4.html) |
| 13 | A datum/reference frame relates an abstract coordinate system to an object. | CONFIRMED | [OGC Topic 2](https://docs.ogc.org/as/18-005r4/18-005r4.html) |
| 14 | Reference-frame choice affects reported position and motion. | CONFIRMED | [OpenStax relative motion](https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement) |
| 15 | Spatial coordinates and time conventions jointly support consistent navigation claims. | CONFIRMED | [NASA reference systems](https://science.nasa.gov/learn/basics-of-space-flight/chapter2-1/) |
| 16 | A unit circle convention fixes center `(0,0)` and radius `1`. | CONFIRMED | [OpenStax unit circle](https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle) |
| 17 | Unit-circle cosine and sine are the corresponding x- and y-coordinates. | CONFIRMED | [OpenStax unit circle](https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle) |

Summary: 5 of 5 claims confirmed; 17 grounded findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims. The sources do not support treating one coordinate
tuple, observer frame, similarity criterion, or angle convention as universal.

## Phase 5 - Amend

1. Separate object, representation, coordinate system, and reference frame.
2. Preserve path, parameterization, endpoint, metric, length, and displacement roles.
3. Keep angle kind and radian convention visible despite SI dimension one.
