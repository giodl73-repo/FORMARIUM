# Geometric Object, Point, Curve, Path, Length, Shape, Angle, Coordinate System, Reference Frame, and Unit Circle

Status: candidate anchor entry

## Orientation

A geometric object is the selected object or set; coordinates are one way to
represent it. A point identifies a location, while a curve is a geometric
locus and a path adds traversal or ordering. Length measures one-dimensional
extent under a metric. Shape identifies form only relative to preserved
properties and allowed transformations. Angle measures relative orientation
or turn. A coordinate system provides coordinate conventions; a reference
frame anchors them to an object or observer, often with time conventions. The
unit circle is one specialized radius-one construction in a coordinate plane.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `geometric-object` | What object, set, or figure is selected independent of representation? | geometric subject |
| `point` | What zero-extent location is selected in the geometry? | location object |
| `curve` | What one-dimensional locus is selected, with what regularity and extent? | geometric locus |
| `path` | What ordered or directed traversal connects or visits locations? | traversal object |
| `length` | What one-dimensional extent is measured under the selected metric and unit? | geometric quantity |
| `shape` | What form is preserved under the declared equivalence or transformation family? | form/equivalence property |
| `angle` | What relative orientation or turn is measured under which convention? | orientation quantity |
| `coordinate-system` | What origin, axes/basis, coordinates, orientation, and units represent locations? | representation system |
| `reference-frame` | What object, observer, datum, epoch, and motion anchor the coordinate description? | physical/reference context |
| `unit-circle` | What center-origin, radius-one circle supplies the selected angular coordinate convention? | specialized geometric construction |

## Chain view

```text
geometric object + ambient geometry
  -- select locus --> point / curve
  -- add ordering, direction, parameter interval --> path
  -- choose metric and unit --> length
  -- choose preserved properties and transformations --> shape relation

relative rays/directions + orientation convention
  -- measure turn --> angle

origin + axes/basis + coordinate rules
  -- represent point/object --> coordinates
  + reference object/observer + epoch/motion
  -- anchor --> reference frame / coordinate reference system

coordinate plane + origin center + radius 1
  -- angular parameterization --> unit circle
```

## Root factorization

```text
geometric-reference-structure-use
  := geometric object, locus, or traversal
   x ambient space, dimension, topology, and metric
   x points, boundary, interior, connectivity, and orientation
   x curve or path parameterization, direction, and interval
   x length, angle, shape, and other invariant or measure target
   x coordinate system, axes, origin, handedness, and units
   x reference object, observer, datum/frame, epoch, and motion
   x transformation, preserved properties, and equivalence criterion
   x exact, measured, estimated, discretized, or approximate status
   x provenance, convention, uncertainty, and verification
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Object/locus | ambient space x object x point set x dimension x boundary | selected set | defining a figure or geometric support | drawing confused with object |
| Curve/path | locus x parameterization x interval x ordering x direction | traversal | routes, trajectories, and arc length | same locus traversed differently |
| Length | measured set x metric x unit x resolution x uncertainty | metric | segments, curves, perimeters, and distance | coordinate difference used without metric |
| Shape | properties x transformation group x scale x pose x tolerance | equivalence | congruence, similarity, morphology, matching | size or orientation silently included |
| Angle | rays/directions x vertex x orientation x range x unit | orientation convention | turn, phase, or relative direction | degrees and radians mixed |
| Coordinates | dimension x origin x axes/basis x handedness x units | representation | computing or reporting locations | tuple treated as intrinsic point identity |
| Reference frame | reference object x origin/orientation x epoch x motion x realization | anchor | physical position and motion | frame omitted or assumed stationary |
| Unit-circle construction | plane x center x radius x orientation x angle parameter | normalized circle | real sine/cosine geometry | radius, center, or angular convention changed |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Object vs. drawing | both may exhibit a form | geometric subject vs. one depiction or sampling |
| Point vs. coordinates | both locate | location object vs. system-dependent numerical representation |
| Curve vs. path | both may share a locus | geometric set/locus vs. ordered or directed traversal |
| Path length vs. displacement magnitude | both have dimension `L` | accumulated route extent vs. endpoint separation in a frame |
| Length vs. coordinate difference | both can be numerical | metric extent vs. component change in selected coordinates |
| Shape vs. size | both describe figures | preserved form under a criterion vs. scale/extent |
| Shape vs. pose | both affect appearance | intrinsic/equivalence properties vs. position and orientation in a frame |
| Angle vs. slope | both encode direction relations | relative orientation quantity vs. coordinate-dependent ratio |
| Coordinate system vs. reference frame | both support coordinates | abstract representation rules vs. anchoring to object/observer/datum and epoch |
| Circle vs. unit circle | both are circular loci | arbitrary center/radius vs. declared origin center and radius one |

## Diagnostic examples

- Two coordinate tuples can denote the same point after a valid coordinate
  transformation; the point has not moved merely because its numbers changed.
- A closed race path has positive path length and zero displacement when the
  endpoint returns to the start.
- Similar triangles can have the same shape but different length, area, and
  volume scales.
- `90` means a right angle only after degrees are declared; `pi/2` normally
  carries the corresponding radian convention.
- A position fixed to Earth can move in a solar-system frame, so “stationary”
  requires an explicit frame and time scope.

## Selection procedure

1. Select the geometric subject, ambient space, dimension, topology, metric,
   and boundary/interior convention.
2. Separate the object from its drawing, sample, mesh, equation, coordinates,
   and other representations.
3. For a curve or path, state locus, parameterization, interval, orientation,
   traversal count, regularity, and whether reparameterization preserves use.
4. For length, state measured set, metric, unit, exact/approximate status,
   resolution, and uncertainty.
5. For shape, declare which properties and transformations define sameness:
   rigid motion, reflection, uniform scale, deformation, tolerance, or another rule.
6. For angle, state vertex/directions, directed or undirected status, range,
   orientation, plane, and unit/convention.
7. For coordinates, state dimension, origin, axes/basis, handedness, ordering,
   units, and domain/singularities.
8. For a reference frame, state reference object/observer, datum or realization,
   origin/orientation, epoch, motion, time scale, and transformation authority.
9. For the unit circle, require the selected plane, center at the coordinate
   origin, radius one, orientation, and angular parameterization.
10. Verify claimed invariants across the intended transformations and report
    numerical, measurement, discretization, and frame uncertainty separately.

## Constraints and failure signs

- A coordinate tuple is not the intrinsic identity of a point.
- Curves and paths retain parameter interval, order, direction, and traversal count.
- Length requires a metric or measurement contract and a unit where physical.
- Shape claims name their preserved properties and transformation family.
- Angle retains a declared unit/convention even when its SI dimension is one.
- Coordinate systems retain origin, axes/basis, orientation, units, and domain.
- Reference frames retain object/observer, datum/realization, epoch, and motion.
- Coordinate transformation is not automatically physical motion or deformation.
- The unit circle does not silently absorb arbitrary center, radius, plane, or orientation.

## Specialized view

The [Geometric Reference Failure Diagnostic](../diagnostics/geometric-reference-structure-failures.md)
maps object/representation, path, metric, shape, angle, coordinate, frame, and
unit-circle symptoms to candidate causes and discriminating checks.

## Cross-references

- [Geometric Measure](geometric-measure.md)
- [Motion Measure](motion-measure.md)
- [Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence](mathematical-relation-solving.md)
- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [Space](../roots/space.md)
- [Transformation](../roots/transformation.md)

## Sources and provenance

1. [Geometric reference structure research note](../../docs/research/2026-08-15-geometric-reference-structure.md)
2. BIPM, *The International System of Units*, 9th edition:
   https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf/2d2b50bf-f2b4-9661-f402-5f9d66e4b507?version=4.0
3. OGC, “Referencing by coordinates”: https://docs.ogc.org/as/18-005r4/18-005r4.html
4. NASA, “Reference Systems”: https://science.nasa.gov/learn/basics-of-space-flight/chapter2-1/
5. OpenStax, “Arc Length and Curvature”:
   https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature
6. OpenStax, “Unit Circle”:
   https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-3-unit-circle

Comparator access date: 2026-08-15. Specialized geometry, metrology, geodesy,
physics, navigation, and trigonometry retain authority; this organization
remains `candidate`.
