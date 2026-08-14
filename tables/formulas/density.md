# Mass Density

Status: candidate Formula Table

## Orientation

Average mass density relates the total mass of a chosen object or substance
sample to the volume it occupies. The bulk relation does not by itself assert
that density is uniform at every point.

## Relation

| Field | Value |
|---|---|
| Sense | average mass density |
| Relation kind | Definition |
| Canonical expression | `rho_avg = m / V` |
| Relation authority | established definition |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Quantity kind | SI unit | Dimension | Role |
|---|---|---|---|---|---|
| `rho_avg` | average mass density | scalar | `kg m^-3` | `M L^-3` | defined output |
| `m` | total mass | scalar | `kg` | `M` | measured input |
| `V` | occupied volume | scalar | `m^3` | `L^3` | measured input |

Mass and volume remain `unresolved-candidate` Factorium headwords pending their
own entries.

## Scope and assumptions

- Define the object or sample boundary before measuring total mass and volume.
- Use the volume occupied by the same matter represented by the mass.
- Record temperature, pressure, phase, composition, and packing when they
  materially change density.
- This entry describes average density over a finite volume.
- Spatially varying material requires a narrower local-density or field view.

## Equivalent forms

| Form | Use | Restriction |
|---|---|---|
| `m = rho_avg V` | Solve for total mass | Density represents the selected volume |
| `V = m / rho_avg` | Solve for occupied volume | `rho_avg` must be nonzero |

## Dimensional audit

```text
[rho_avg] = M L^-3
[m / V]   = M / L^3
          = M L^-3
```

## Conceptual Factor Table

```text
average-density-use
  := subject
   x boundary
   x total mass
   x occupied volume
   x measurement conditions
   = average mass density
```

The division operator in `m / V` is mathematical; the Factorium `x` above
lists jointly required concepts.

## Failure signs

- Mass and volume refer to different boundaries.
- Bulk density is reported as though a heterogeneous subject were uniform.
- Void space or packing is included inconsistently.
- Temperature or pressure changes are ignored for a sensitive material.
- Unit conversions cube neither the length conversion nor the volume unit.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- mass — `unresolved-candidate`
- volume — `unresolved-candidate`
- local mass density — `unresolved-candidate`

## Sources and provenance

1. OpenStax, *College Physics 2e*, section 11.2, "Density":
   https://openstax.org/books/college-physics-2e/pages/11-2-density
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units

Formula authority: established definition. Factorium representation remains a
candidate pending specialist and practitioner review.

