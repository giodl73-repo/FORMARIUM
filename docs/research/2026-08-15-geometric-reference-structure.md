# Geometric Reference Structure Research Note

Status: source-backed candidate synthesis

## Research question

What compact factorization distinguishes geometric objects, points, curves,
paths, lengths, shapes, angles, coordinate systems, reference frames, and the
unit circle across geometry, motion, and trigonometry?

## Admission rationale

Length and shape remain unresolved in geometric measure; path and reference
frame remain unresolved in motion; angle and unit circle remain unresolved in
the Pythagorean identity. These are not six isolated glossary labels. They form
one reference chain from an object and its locus through representation,
measurement, orientation, coordinates, and physical anchoring.

## Source basis

The evidence campaign is recorded in [Geometric Reference Structure Web
Evidence](../../signals/discover/websearch/geometric-reference-structure-websearch-2026-08-15.md).
It uses BIPM/NIST for length and angle quantity contracts, OGC/NASA for
coordinate and frame distinctions, and OpenStax for curves, motion,
similarity, and the unit circle.

## Editorial decisions

- `geometric-object` owns the selected object or set independent of any one
  coordinate representation.
- `point` is a zero-extent location object in the selected geometry; a
  coordinate tuple represents it within a system.
- `curve` owns a one-dimensional geometric locus; `path` adds traversal,
  ordering, direction, parameter interval, or route semantics.
- `length` owns one-dimensional extent under a selected metric and unit.
- `shape` owns form relative to declared preserved properties and allowed
  transformations; it does not silently include size, pose, or coordinates.
- `angle` owns relative orientation/turn quantity and retains its radian or
  other declared convention even where treated as dimension one.
- `coordinate-system` owns axes/coordinates and representation conventions;
  `reference-frame` anchors them to an object, observer, or physical reference.
- `unit-circle` is admitted as a specialized radius-one coordinate-plane
  construction because it closes a live Formula contract.

## Candidate factor spine

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

## Claim limits

This candidate organization does not define every geometry, prove congruence
or similarity, choose a geodetic CRS, or establish an inertial frame. Native
geometry, metrology, geodesy, physics, navigation, and trigonometry retain
authority over specialized structures and transformations.
