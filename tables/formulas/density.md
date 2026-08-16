# Mass Density

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Matter and Load Measure](../entries/matter-load-measure.md)

Sense: `mass-density`

## Orientation

Average mass density relates total mass to occupied volume. Local mass density
is a continuum field whose integral recovers mass over a selected region. One
bulk average does not determine the local field or prove uniformity.

## Relation

| Field | Value |
|---|---|
| Sense | average mass density |
| Relation kind | Definition |
| Canonical expression | `rho_avg = m / V` |
| Relation authority | established definition |
| Factorium entry maturity | `candidate` |

## Local relation

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Local mass density | `rho(x) = dm/dV` | local continuum definition |
| Mass over region | `m(Omega) = integral_Omega rho(x) dV` | spatial aggregation |
| Average from local field | `rho_avg(Omega) = (1/V(Omega)) integral_Omega rho(x) dV` | finite-volume average |

## Symbol contract

| Symbol | Concept | Quantity kind | SI unit | Dimension | Role |
|---|---|---|---|---|---|
| `rho_avg` | average mass density | scalar | `kg m^-3` | `M L^-3` | defined output |
| `m` | total mass | scalar | `kg` | `M` | measured input |
| `V` | occupied volume | scalar | `m^3` | `L^3` | measured input |
| `rho(x)` | local mass density | scalar field | `kg m^-3` | `M L^-3` | pointwise continuum quantity |
| `x` | spatial location | point/position | `m` | `L` | field argument |
| `Omega` | selected region | spatial domain | `m^3` measure | `L^3` | integration boundary |
| `dV` | volume element | scalar measure | `m^3` | `L^3` | integration element |

Mass resolves to the canonical matter-and-load anchor. Volume resolves through
the [Geometric Measure entry](../entries/geometric-measure.md).

## Scope and assumptions

- Define the object or sample boundary before measuring total mass and volume.
- Use the volume occupied by the same matter represented by the mass.
- Record temperature, pressure, phase, composition, and packing when they
  materially change density.
- This entry describes average density over a finite volume.
- Spatially varying material requires a narrower local-density or field view.
- Local density requires a continuum scale, spatial resolution, and
  measurement/model procedure appropriate to the material.

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
[rho dV]  = (M L^-3) L^3 = M
[(1/V) integral rho dV] = L^-3 M = M L^-3
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

local-density-use
  := subject and continuum model
   x spatial location and resolution
   x local mass and volume limit
   x integration region and boundary
   = density field and recovered mass
```

The division operator in `m / V` is mathematical; the Factorium `x` above
lists jointly required concepts.

## Failure signs

- Mass and volume refer to different boundaries.
- Bulk density is reported as though a heterogeneous subject were uniform.
- Void space or packing is included inconsistently.
- Temperature or pressure changes are ignored for a sensitive material.
- Unit conversions cube neither the length conversion nor the volume unit.
- A local field is inferred uniquely from one average value.
- Point samples are integrated without interpolation, support, or resolution scope.
- Void, interface, singular, or unresolved subscale mass is silently reassigned.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- [Matter and Load Measure](../entries/matter-load-measure.md)
- [Geometric Measure](../entries/geometric-measure.md)

## Sources and provenance

1. OpenStax, *College Physics 2e*, section 11.2, "Density":
   https://openstax.org/books/college-physics-2e/pages/11-2-density
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. NIST Guide to the SI, mass density:
   https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
4. NASA, continuous mass-distribution example:
   https://ntrs.nasa.gov/api/citations/19760004132/downloads/19760004132.pdf

Formula authority: established definition. Factorium representation remains a
candidate pending specialist and practitioner review.
