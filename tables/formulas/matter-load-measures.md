# Matter and Load Measures

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Matter and Load Measure](../entries/matter-load-measure.md)

## Orientation

These relations distinguish a base quantity from gravitational force and from
volume- or area-normalized quantities. Their short algebra is useful only when
the subject boundary, environment, averaging scope, and loaded geometry are
known.

## Core relations

| Quantity | Canonical expression | Relation kind | Dimension |
|---|---|---|---|
| Mass | `m` | SI base quantity; measured or inferred | `M` |
| Weight vector | `W_vec = m g_vec` | Newtonian gravitational-force model | `M L T^-2` |
| Weight magnitude | `W = m g` | magnitude form | `M L T^-2` |
| Average mass density | `rho_avg = m / V` | definition | `M L^-3` |
| Average pressure | `p_avg = F_perp / A` | definition over a finite area | `M L^-1 T^-2` |
| Local pressure | `p = dF_perp / dA` | local differential definition | `M L^-1 T^-2` |

Mass has no universal defining equation in this table. A measurement or model
may infer it, but that method is a separate view with its own conditions.

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `m` | mass of the selected subject | scalar | `kg` | one declared system boundary |
| `g_vec` | local free-fall acceleration | vector | `m s^-2` | declared location and frame |
| `g` | magnitude of `g_vec` | scalar | `m s^-2` | nonnegative |
| `W_vec` | weight force | vector | `N` | Newtonian gravitational model |
| `W` | magnitude of weight | scalar | `N` | magnitude form only |
| `rho_avg` | average mass density | scalar | `kg m^-3` | mass and volume share a boundary |
| `V` | occupied volume | scalar | `m^3` | positive finite volume |
| `p_avg` | average pressure over selected area | scalar | `Pa` | normal force divided by area |
| `p` | local pressure | scalar field | `Pa` | local continuum view |
| `F_perp` | force component normal to the area | scalar magnitude | `N` | sign convention declared if signed |
| `A` | selected loaded area | scalar | `m^2` | positive finite area |

## SI unit relations

```text
1 N  = 1 kg m s^-2
1 Pa = 1 N m^-2
     = 1 kg m^-1 s^-2
```

## Dimensional audit

```text
[m g]       = M (L T^-2) = M L T^-2
[m / V]     = M / L^3 = M L^-3
[F_perp/A]  = (M L T^-2) / L^2
            = M L^-1 T^-2
```

Equal numerical values across different units do not establish equal
quantities.

## Equivalent and inverse forms

| Form | Use | Restriction |
|---|---|---|
| `m = W / g` | infer mass from weight magnitude | `g` nonzero and gravitational model established |
| `m = rho_avg V` | infer total mass | density represents the selected volume |
| `V = m / rho_avg` | infer occupied volume | `rho_avg` nonzero |
| `F_perp = p_avg A` | infer total normal force under average pressure | area and pressure averaging match |
| `A = F_perp / p_avg` | infer loaded area | `p_avg` nonzero and distribution assumptions valid |

These are rearrangements or bounded uses, not independent laws.

## Selection procedure

1. Select mass, weight, density, or pressure by governing question.
2. Fix the subject, sample, or loaded-surface boundary.
3. For weight, supply local `g_vec` and preserve force direction.
4. For density, use occupied volume from the same boundary as mass.
5. For pressure, isolate the normal force component and corresponding area.
6. Choose bulk average or local field before selecting notation.
7. Convert units and audit dimensions.

## Failure signs

- A mass value in kilograms is inserted where a force in newtons is required.
- Standard Earth gravity is used without stating that approximation.
- Weight is treated as invariant when gravitational context changes.
- Density uses mass and volume from different samples or boundaries.
- Bulk density is reported as a uniform local field.
- Total force is divided by an unrelated or projected area.
- Tangential force is included in scalar pressure without a justified model.
- Average pressure is treated as a complete pressure distribution.
- Pressure is treated as a vector because its resulting surface force has a
  direction.

## Reference Delta

The canonical [Matter and Load Measure entry](../entries/matter-load-measure.md)
owns the full comparison. Relative to a formula sheet, this view adds quantity
kind, boundary alignment, gravitational context, normal-force selection,
averaging level, local-field scope, and dimensional diagnostics.

## Sources and provenance

1. NIST, "SI Units - Mass":
   https://www.nist.gov/pml/owm/si-units-mass
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. OpenStax, *College Physics*, sections 11.2 and 11.3:
   https://openstax.org/books/college-physics/pages/11-2-density
   https://openstax.org/books/college-physics/pages/11-3-pressure
4. OpenStax, *University Physics Volume 1*, section 5.3:
   https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law

Formula authority: established introductory SI, Newtonian mechanics, and fluid
mechanics within stated scope. Factorium presentation remains `candidate`.
