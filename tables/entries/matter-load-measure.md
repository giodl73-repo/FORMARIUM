# Matter and Load Measure

Status: candidate anchor entry

## Orientation

Mass, weight, density, and pressure are often mixed because they participate in
short connected formulas and everyday speech uses "weight" for mass.
Factorium separates them by quantity kind, normalization, environmental
context, and measured boundary.

## Sense table

| Sense | Governing question | Kind | Dimension | SI unit |
|---|---|---|---|---|
| `mass` | What is the subject's mass quantity? | scalar base quantity | `M` | kilogram, `kg` |
| `weight` | What gravitational force acts on the subject here? | vector force or its magnitude | `M L T^-2` | newton, `N` |
| `mass-density` | How much mass occupies each unit volume? | scalar field or bulk average | `M L^-3` | `kg m^-3` |
| `pressure` | How much normal force is distributed over each unit area? | scalar | `M L^-1 T^-2` | pascal, `Pa` |

## Quantity-role ladder

```text
mass
  -- divided by occupied volume --> average mass density
  -- acted on by local gravity --> weight

normal force
  -- divided by loaded area --> average pressure
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

## Formula view

The linked [Matter and Load Formula Table](../formulas/matter-load-measures.md)
contains the quantity contracts, weight, density, and pressure relations.

## Selection procedure

1. Ask whether the desired result is a total quantity, a force, or a quantity
   normalized by volume or area.
2. Choose the system, sample, or loaded-surface boundary.
3. Declare local gravity when weight is requested.
4. Declare occupied volume and averaging conditions for density.
5. Declare the perpendicular force component and loaded area for pressure.
6. Confirm the unit and dimension before arithmetic.

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

## Cross-references

- [Force](force.md)
- [Geometric measure](geometric-measure.md)
- [Motion measure](motion-measure.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Measure](../roots/measure.md)
- stress - `unresolved-candidate`
- gravitational field - `unresolved-candidate`

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

Comparator access date: 2026-08-14. Quantity distinctions and SI units are
established within source scope; Factorium organization remains `candidate`.
