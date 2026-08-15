# Geometric Reference Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Geometric Object, Point, Curve, Path, Length, Shape, Angle, Coordinate System, Reference Frame, and Unit Circle](../entries/geometric-reference-structure.md)

Canonical senses: `geometric-object`, `point`, `curve`, `path`, `length`,
`shape`, `angle`, `coordinate-system`, `reference-frame`, `unit-circle`

## Governing question

Which object/representation, locus/traversal, metric, equivalence, angle,
coordinate, reference-frame, or unit-circle defect could explain a conflicting
geometric or motion result, and what check would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Same point has different coordinate tuples | different origin, axes, units, basis, projection, or frame | transform both tuples through a declared common CRS/frame and compare the represented point | coordinate/frame owner |
| Coordinates change although object did not physically move | passive coordinate transformation; frame moved; epoch changed | distinguish coordinate transform from object trajectory and hold one frame/epoch fixed | model and frame owner |
| Two curves look identical but lengths differ | different metric; traversal count; parameter interval; discretization; scale | compare locus, metric, interval, orientation, traversal count, and refinement limit | geometry owner |
| Path length equals endpoint displacement unexpectedly | straight monotone path; path data lost; endpoint-only calculation | inspect the complete ordered path and compare accumulated segment/arc length with endpoint separation | motion/data owner |
| “Same shape” judgments conflict | congruence vs. similarity; reflection excluded; pose/scale included; tolerance differs | declare allowed transformations and invariants, normalize pose/scale only when authorized | geometry/domain owner |
| Angle result differs by about `pi/180` or `180/pi` | degrees/radians mixed; API convention; unlabeled unit-one value | freeze known-angle fixtures and inspect input/output unit metadata | calculation/tool owner |
| Slope comparison fails for a vertical direction | slope is coordinate-dependent/undefined; angle relation remains valid | compare direction vectors or an angle operation under the chosen metric | analysis owner |
| Position or velocity differs between reports | reference objects, epochs, time scales, axes, or frame motion differ | transform state and time to one declared frame/epoch using an authoritative operation | navigation/physics owner |
| Map layers are offset or distorted | wrong CRS/datum; axis order; units; projection domain; stale realization | inspect full CRS identifiers and transform control points with residuals | geospatial owner |
| Unit-circle identity fails numerically | center/radius not normalized; degree/radian mix; swapped axes; low precision | verify center `(0,0)`, radius `1`, orientation, angle unit, and `x^2+y^2` residual | mathematics/tool owner |

## Use contract

1. Freeze object identity, representation, source data, ambient geometry,
   metric, coordinate system, frame/datum, epoch, units, and software/version.
2. Preserve raw coordinates and paths before normalization, projection,
   smoothing, resampling, or simplification.
3. Reproduce the conflict with a minimal point, curve, angle, or state fixture.
4. Test object, representation, metric, equivalence, angle, coordinate, frame,
   and time hypotheses separately.
5. Repair the owning contract and recheck invariants, residuals, uncertainty,
   and domain limits in the original use context.

## Failure signs

- drawing, mesh, equation, point set, and object share one identity;
- coordinate tuple and point are treated as synonyms;
- curve locus and ordered traversal omit parameter interval or direction;
- length is computed without metric, unit, scale, or uncertainty;
- shape sameness lacks an allowed-transformation criterion;
- an angle value omits degree/radian or orientation convention;
- coordinate system and reference frame share one unlabeled field;
- epoch, time scale, or frame motion is absent from motion comparison;
- coordinate change is reported as physical motion automatically;
- any radius-one circle is called the standard unit circle without center and axes.

## Sources and provenance

1. [Geometric reference structure research note](../../docs/research/2026-08-15-geometric-reference-structure.md)
2. OGC, “Referencing by coordinates”: https://docs.ogc.org/as/18-005r4/18-005r4.html
3. NASA, “Reference Systems”: https://science.nasa.gov/learn/basics-of-space-flight/chapter2-1/
4. OpenStax, “Relative Motion, Distance, and Displacement”:
   https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement

This diagnostic isolates candidate failures; it does not certify a geometry,
metric, coordinate operation, reference-frame realization, or navigation result.
