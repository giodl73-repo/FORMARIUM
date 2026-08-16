# Matter and Load Measure

Status: candidate anchor entry

## Orientation

Mass, weight, density, pressure, stress, and gravitational field participate
in short connected formulas but occupy different levels. A total mass differs
from a local density field; weight is a force on a selected body; gravitational
field is force per test mass at a location; pressure is scalar normal loading;
stress is a tensor relating surface orientation to traction.

## Sense table

| Sense | Governing question | Kind | Dimension | SI unit |
|---|---|---|---|---|
| `mass` | What is the subject's mass quantity? | scalar base quantity | `M` | kilogram, `kg` |
| `weight` | What gravitational force acts on the subject here? | vector force or its magnitude | `M L T^-2` | newton, `N` |
| `mass-density` | How much mass occupies each unit volume? | scalar field or bulk average | `M L^-3` | `kg m^-3` |
| `pressure` | How much normal force is distributed over each unit area? | scalar | `M L^-1 T^-2` | pascal, `Pa` |
| `stress` | What local traction would act across surfaces of different orientation at this material point? | second-order tensor | `M L^-1 T^-2` | pascal, `Pa` |
| `gravitational-field` | What gravitational force per unit test mass is assigned to this location and frame by the selected model? | vector field | `L T^-2` | `N kg^-1` or `m s^-2` |

## Quantity-role ladder

```text
mass
  -- divided by occupied volume --> average mass density
  -- acted on by local gravity --> weight

normal force
  -- divided by loaded area --> average pressure

surface orientation at a material point
  -- mapped by stress tensor --> traction vector

gravitational force on a test body
  -- divided by test mass --> gravitational field at its location

local mass density field
  -- integrated over selected volume --> total mass
```

These operations connect the quantities but do not make them interchangeable.

## Root factorization

```text
matter-load-measure-use
  := subject or system
   x requested quantity
   x system or sample boundary
   x quantity kind
   x environmental context
   x normalization basis
   x averaging or local view
   x spatial location, neighborhood, resolution, and continuum assumption
   x source distribution, field model, frame, and validity region
   x test-body mass, location, and nonperturbing approximation
   x surface point, orientation, and unit normal
   x traction vector and normal/shear decomposition
   x stress tensor, basis, sign convention, and symmetry assumptions
   x volume integration domain and boundary treatment
   x measurement method
   x unit system
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Mass vs. weight | both describe one subject and are colloquially merged | base quantity in `kg` vs. gravitational force in `N` |
| Mass vs. density | both involve amount of matter | total quantity vs. mass normalized by occupied volume |
| Weight vs. pressure | both involve force | total gravitational force vs. normal force distributed over area |
| Density vs. pressure | both may vary through a fluid | mass per volume vs. normal force per area |
| Pressure vs. stress | both concern distributed loading | scalar normal pressure vs. a broader directional stress description |
| Average vs. local density | same unit and quantity kind | finite-volume quotient vs. pointwise continuum field at declared resolution |
| Weight vs. gravitational field | connected by test-body mass | force on one selected body vs. force-per-mass field assigned to location |
| Gravitational field vs. acceleration | same dimensions and may coincide in free fall | modeled interaction field vs. kinematic rate of velocity change |
| Pressure vs. stress tensor | pressure may determine isotropic stress under a sign convention | scalar normal loading vs. orientation-dependent traction map |
| Traction vs. stress | related at a surface point | vector on one oriented plane vs. tensor encoding all plane orientations |

## Diagnostic examples

- A person has approximately the same mass on Earth and the Moon but a
  different weight because local gravitational acceleration differs.
- A kilogram of feathers and a kilogram of metal have equal mass but occupy
  different volumes and therefore have different average densities.
- The same normal force produces more pressure when applied over a smaller
  area.
- A pressure value does not determine total force until the loaded area and
  distribution are known.
- A scale display labeled in kilograms reports inferred mass, even if its
  sensing mechanism responds to a support force.
- Equal average densities do not establish equal local density distributions.
- A gravitational field value at one location does not establish a uniform
  field over an extended body.
- One normal force divided by one area does not reconstruct shear components
  or the full stress tensor.

## Formula view

The linked [Matter and Load Formula Table](../formulas/matter-load-measures.md)
contains the quantity contracts, weight, density, and pressure relations.
It also owns gravitational-field, traction/stress, and local-density relations.

## Selection procedure

1. Ask whether the desired result is a total quantity, a force, or a quantity
   normalized by volume or area.
2. Choose the system, sample, or loaded-surface boundary.
3. Declare local gravity when weight is requested.
4. Declare occupied volume and averaging conditions for density.
5. Declare the perpendicular force component and loaded area for pressure.
6. Confirm the unit and dimension before arithmetic.
7. For local density, declare the spatial resolution, continuum model, and
   integration domain used to recover mass.
8. For gravitational field, declare source distribution, location, frame,
   field model, validity region, and test-body approximation.
9. For stress, declare material point, oriented surface normal, basis, traction,
   normal/shear convention, and whether a continuum tensor model is warranted.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Records technical and ordinary senses of mass, weight, density, and pressure | Places the terms in one quantity-kind and normalization contrast |
| Thesaurus | Links words such as heaviness, load, compactness, force, and compression | Prevents lexical proximity from creating dimensional equivalence |
| Encyclopedia or textbook | Explains mechanics, fluids, derivations, and examples | Supplies a compact selection path, relation ladder, and failure signs |
| Formula sheet | Lists `W = m g`, `rho = m / V`, and `p = F / A` | Adds boundaries, local conditions, vector/scalar kind, and averaging scope |
| NIST/SI reference | Owns SI quantity and unit conventions | Connects kilogram, newton, and pascal authority to the right concepts |

## Constraints and failure signs

- Kilograms measure mass, not force.
- Weight requires a stated or understood gravitational context.
- Average density uses mass and volume from the same boundary.
- Pressure uses the force component normal to the selected area.
- A scalar pressure does not retain the direction of the resulting surface
  force.
- Instrument display units do not by themselves reveal the sensed quantity or
  calibration model.
- A pressure description should not silently replace a fuller stress analysis.
- Local density is not inferred uniquely from one bulk average.
- Gravitational field and free-fall acceleration are not made universally
  identical outside the declared Newtonian model and frame.
- A field evaluated at one point is not automatically uniform across a body.
- Stress components require an orientation and basis; a shared pascal unit
  does not make pressure, normal stress, and shear stress identical.
- A traction vector on one plane does not determine the full stress tensor
  without a model or sufficient independent orientations.

## Cross-references

- [Force](force.md)
- [Geometric measure](geometric-measure.md)
- [Motion measure](motion-measure.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)

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
7. NASA PO.DAAC, "Gravity/Gravitational Field":
   https://podaac.jpl.nasa.gov/gravity

Comparator access date: 2026-08-15. Quantity distinctions and SI units are
established within source scope; Factorium organization remains `candidate`.
