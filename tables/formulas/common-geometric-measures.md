# Common Geometric Measures

Status: candidate Formula Table

Canonical headword: [Geometric Measure](../entries/geometric-measure.md)

## Orientation

This Formula Table selects formulas by measure kind and shape. Exact symbolic
forms are preserved; decimal evaluation and measurement uncertainty belong to
the application context.

## Formula matrix

| Shape | Perimeter or circumference `L` | Area or surface area `L^2` | Volume `L^3` |
|---|---|---|---|
| Rectangle | `P = 2(l + w)` | `A = l w` | not applicable |
| Triangle | `P = a + b + c` | `A = (1/2) b h` | not applicable |
| Circle | `C = 2 pi r = pi d` | `A = pi r^2` | not applicable |
| Rectangular prism | edge total only when requested | `SA = 2(lw + lh + wh)` | `V = l w h` |
| Cube | edge total only when requested | `SA = 6s^2` | `V = s^3` |
| Cylinder | boundary curves depend on selected cross-section | `SA = 2 pi r h + 2 pi r^2` | `V = pi r^2 h` |
| Sphere | no planar perimeter | `SA = 4 pi r^2` | `V = (4/3) pi r^3` |

`SA` includes the complete closed exterior. Open containers or omitted faces
require a different measured subset.

## Symbol contract

| Symbol | Meaning | Dimension | Restriction |
|---|---|---|---|
| `l`, `w`, `h` | length, width, perpendicular height | `L` | nonnegative; same unit before calculation |
| `a`, `b`, `c` | triangle side lengths | `L` | must form the declared triangle |
| `r` | radius | `L` | nonnegative |
| `d` | diameter | `L` | `d = 2r` |
| `s` | cube side length | `L` | nonnegative |
| `pi` | circle constant | dimensionless | symbolic form exact |
| `P`, `C` | perimeter or circumference | `L` | linear unit |
| `A`, `SA` | area or surface area | `L^2` | square unit |
| `V` | volume | `L^3` | cubic unit |

## Dimensional audit

```text
[2(l + w)] = L
[l w]      = L^2
[pi r^2]   = L^2
[l w h]    = L^3
[pi r^2 h] = L^3
```

Dimension checks reject many unit and formula-selection errors but do not prove
that the chosen shape or measured subset is correct.

## Selection procedure

1. Identify the subject as a planar region or three-dimensional body.
2. Select boundary length, planar area, surface area, or volume.
3. Identify the shape and whether it is complete, composite, open, or has
   holes.
4. Confirm the available parameters are sufficient and use compatible units.
5. Preserve `pi` for an exact result or declare the approximation and rounding
   policy.

## Composite figures

```text
composite measure
  = sum(included disjoint pieces)
  - sum(excluded pieces)
```

This pattern is valid only when the pieces cover the intended measured subset
without unaccounted overlap or gaps.

## Failure signs

- `L`, `L^2`, and `L^3` outputs are interchanged.
- Slanted triangle side is used as height without perpendicularity.
- Radius and diameter are confused.
- Cylinder surface area omits or adds bases contrary to the selected surface.
- Sphere surface area and volume are swapped because both use radius.
- Input lengths use mixed units.
- Rounded `pi` is used while the result is labeled exact.

## Reference Delta

The canonical [Geometric Measure entry](../entries/geometric-measure.md) owns
the full comparison. Relative to an ordinary formula sheet, this view adds a
measure-kind selection path, unit dimensions, sufficient-parameter checks,
boundary scope, composite-figure constraints, and exactness status.

## Sources and provenance

1. OpenStax, *Prealgebra 2e*, sections 9.5 and 9.6:
   https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures
   https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area
2. OpenStax, *University Physics Volume 2*, mathematical formulas:
   https://openstax.org/books/university-physics-volume-2/pages/e-mathematical-formulas
3. NIST, "SI Units - Length":
   https://www.nist.gov/pml/owm/si-units-length

Formula authority: established elementary geometry. Factorium presentation
remains `candidate`.

