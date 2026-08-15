# Geometric Measure

Status: candidate anchor entry

## Orientation

Geometric measure quantifies extent. The first question is not which formula
to remember, but whether the desired quantity concerns a boundary or an
interior and whether that measured set is one-, two-, or three-dimensional.

## Sense table

| Sense | Measured subset | Dimension | Typical unit | Example |
|---|---|---:|---|---|
| `perimeter` | boundary of a planar region | `L` | metre | distance around a rectangle |
| `circumference` | boundary of a circle | `L` | metre | `2 pi r` |
| `area` | extent of a planar region | `L^2` | square metre | rectangle interior |
| `surface-area` | boundary of a three-dimensional body | `L^2` | square metre | outside of a box |
| `volume` | extent of a three-dimensional body | `L^3` | cubic metre | space inside a box |

Circumference is a specialized perimeter. Surface area and planar area share a
dimension but measure different kinds of sets.

## Root factorization

```text
geometric-measure-use
  := subject
   x ambient dimension
   x measured subset
   x measure dimension
   x shape
   x sufficient parameters
   x unit scale
   x exact-or-approximate policy
   ! overlap, holes, and excluded regions
```

## Selection procedure

| Reader wants | Select | Then identify |
|---|---|---|
| Distance around a 2D figure | perimeter or circumference | boundary path and shape |
| Space covered inside a 2D figure | area | region, shape, base/height/radius |
| Material needed to cover a 3D exterior | surface area | included faces or curved surfaces |
| Capacity or occupied 3D space | volume | body, base area, height, radius |

## Formula view

The linked [Common Geometric Measures Formula Table](../formulas/common-geometric-measures.md)
provides standard shape formulas, symbol contracts, dimensions, and failure
signs.

## Constraints and failure signs

- Perimeter and circumference use linear units.
- Area and surface area use square units.
- Volume uses cubic units.
- Equal perimeter does not imply equal area.
- Equal surface area does not imply equal volume.
- A base and height must use the perpendicular height required by the formula.
- Composite measures require a non-overlapping partition or explicit
  inclusion-exclusion.
- Holes and excluded faces change the measured subset.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines perimeter, area, surface, and volume senses | Places them in one boundary/interior and dimension schema |
| Thesaurus | Offers nearby words such as extent, capacity, boundary, girth, and size | Prevents lexical proximity from erasing dimensional differences |
| Encyclopedia or textbook | Explains geometry, derivations, diagrams, and worked problems | Supplies a compact selection path, formula contract, and failure signs |
| Formula sheet | Lists formulas by shape | Adds measured subset, dimensional units, parameter sufficiency, and approximation status |
| NIST/SI reference | Owns metre, square-metre, and cubic-metre unit conventions | Links unit authority to the correct measure dimension |

### Failure signs

- A square or cubic unit is omitted.
- The outside covering of a solid is reported as volume.
- A circle's diameter is substituted for radius without transformation.
- Hidden or excluded faces are counted contrary to the problem boundary.
- Composite pieces overlap or leave gaps.
- Approximate decimal output is labeled exact.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Measure](../roots/measure.md)
- [Relation](../roots/relation.md)
- [Volume in mass density](../formulas/density.md)
- [Geometric Object, Point, Curve, Path, Length, Shape, Angle, Coordinate
  System, Reference Frame, and Unit Circle](geometric-reference-structure.md)
  — canonical owner of `length` and `shape`

## Sources and provenance

1. NIST, "SI Units - Length":
   https://www.nist.gov/pml/owm/si-units-length
2. OpenStax, *Prealgebra 2e*, sections 9.5 and 9.6:
   https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures
   https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area

Comparator access date: 2026-08-14. Geometric definitions and formulas are
established within source scope; Factorium organization remains `candidate`.
