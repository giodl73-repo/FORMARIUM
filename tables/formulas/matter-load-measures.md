# Matter and Load Measures

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Matter and Load Measure](../entries/matter-load-measure.md)

## Orientation

These relations distinguish a base quantity, gravitational force and field,
finite-volume and local density, scalar pressure, and tensor stress. Their
short algebra is useful only when boundary, environment, spatial scale,
surface orientation, basis, and model are known.

## Core relations

| Quantity | Canonical expression | Relation kind | Dimension |
|---|---|---|---|
| Mass | `m` | SI base quantity; measured or inferred | `M` |
| Weight vector | `W_vec = m g_vec` | Newtonian gravitational-force model | `M L T^-2` |
| Weight magnitude | `W = m g` | magnitude form | `M L T^-2` |
| Average mass density | `rho_avg = m / V` | definition | `M L^-3` |
| Average pressure | `p_avg = F_perp / A` | definition over a finite area | `M L^-1 T^-2` |
| Local pressure | `p = dF_perp / dA` | local differential definition | `M L^-1 T^-2` |
| Gravitational field | `g_vec(x) = F_g(x) / m_test` | Newtonian force-per-test-mass field definition | `L T^-2` |
| Local mass density | `rho(x) = dm/dV` | local continuum definition | `M L^-3` |
| Mass from density field | `m(Omega) = integral_Omega rho(x) dV` | spatial aggregation | `M` |
| Cauchy traction relation | `t_vec(n) = sigma dot n_vec` | continuum stress relation | `M L^-1 T^-2` |
| Average normal stress | `sigma_n_avg = F_n / A` | finite-area component average | `M L^-1 T^-2` |
| Average shear stress | `tau_avg = F_t / A` | finite-area tangential component average | `M L^-1 T^-2` |

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
| `x` | spatial location | point/position | `m` | declared frame and domain |
| `m_test` | test-body mass | positive scalar | `kg` | nonperturbing Newtonian approximation |
| `F_g(x)` | gravitational force on test body | vector | `N` | same location and model as field |
| `rho(x)` | local mass density | scalar field | `kg m^-3` | continuum scale and resolution declared |
| `Omega` | selected spatial integration domain | region | `m^3` measure | boundary and void convention declared |
| `sigma` | Cauchy stress | second-order tensor | `Pa` | material point, basis, and sign convention declared |
| `n_vec` | oriented unit normal | vector | `1` | surface orientation declared |
| `t_vec(n)` | traction on the plane with normal `n_vec` | vector | `Pa` | local continuum relation |
| `F_n`, `F_t` | normal and tangential force components | scalar/vector components | `N` | same area and orientation |

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
[F_g/m_test]= (M L T^-2) / M = L T^-2
[rho dV]    = (M L^-3) L^3 = M
[sigma n]   = (M L^-1 T^-2) 1 = M L^-1 T^-2
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
8. For local density, fix continuum scale and integrate over the exact domain
   before comparing with total mass.
9. For field, stress, or traction, preserve spatial point, frame, orientation,
   tensor/vector kind, and sign convention.

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
- A bulk density quotient is substituted for a spatially varying density field.
- A field value is reused at another location without a uniform-field model.
- Test-body mass is left inside a reported gravitational-field value.
- One surface traction is treated as the complete stress tensor.
- Normal and tangential force components are mixed or divided by different areas.
- Pressure and stress are equated solely because both use pascals.

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
5. NIST, continuum-mechanics reference with Cauchy stress and traction:
   https://nehrpsearch.nist.gov/static/files/NSF/PB87234308.pdf
6. NASA, gravitational field relation:
   https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/possible_scalar_terms.htm

Formula authority: established introductory SI, Newtonian mechanics, and fluid
mechanics within stated scope. Factorium presentation remains `candidate`.
