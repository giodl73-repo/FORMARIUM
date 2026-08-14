# Force

Status: candidate Formula Table

## Orientation

In Newtonian mechanics, Newton's second law relates the net external force on
a chosen system to its mass and acceleration. The familiar `F = ma` shorthand
is useful only when `F` is understood as the vector sum of external forces and
the system and model assumptions are fixed.

## Relation

| Field | Value |
|---|---|
| Sense | Newtonian net-force relation |
| Relation kind | Experimentally supported physical law |
| Canonical expression | `sum(F_external) = m a` |
| Relation authority | established within its stated Newtonian scope |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Quantity kind | SI unit | Dimension | Role |
|---|---|---|---|---|---|
| `sum(F_external)` | net external force | vector | newton, `N` | `M L T^-2` | derived vector sum |
| `m` | mass | scalar | kilogram, `kg` | `M` | system parameter |
| `a` | acceleration | vector | metre per second squared, `m s^-2` | `L T^-2` | motion response |

Mass and acceleration remain `unresolved-candidate` Factorium headwords pending
their own entries.

## Scope and assumptions

- Choose the system boundary before classifying forces as external or internal.
- Sum all external force vectors using one declared coordinate and sign
  convention.
- Use the acceleration of the represented system in the same reference frame.
- This entry covers the standard Newtonian `sum(F_external) = m a` model.
- Cases requiring changing-system-mass, relativistic, or other specialized
  treatments are outside this entry and require narrower sourced models.

## Equivalent forms

| Form | Use | Restriction |
|---|---|---|
| `a = sum(F_external) / m` | Solve for acceleration | `m` must be nonzero |
| `m = magnitude(sum(F_external)) / magnitude(a)` | Infer mass in a collinear scalar case | Force and acceleration directions and model assumptions must be established |
| `sum(F_external) = 0` implies `a = 0` | Balanced-force case | Within the same Newtonian system model |

These are uses or rearrangements of the same scoped relation, not independent
laws.

## Dimensional audit

```text
[sum(F_external)] = M L T^-2
[m a]             = M x (L T^-2)
                  = M L T^-2
```

The SI unit relation is:

```text
1 N = 1 kg m s^-2
```

Dimensional agreement is necessary but does not by itself establish Newton's
second law.

## Conceptual Factor Table

```text
force-relation-use
  := system
   x boundary
   x external-interaction set
   x mass
   x acceleration
   x reference frame
   x aggregation convention
   @ Newtonian model context
   ! stated exclusions
```

The mathematical multiplication `m a` is not Factorium's semantic `x`.

## Failure signs

- One applied force is substituted for the net external force.
- Internal forces are included after the system boundary is chosen.
- Scalar magnitudes replace vectors without a one-dimensional or collinear
  justification.
- Units are numerically combined without conversion.
- `F = ma` is treated as a complete definition of force in every physical
  theory or system model.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Measure](../roots/measure.md)
- [State](../roots/state.md)
- [Transformation](../roots/transformation.md)
- mass — `unresolved-candidate`
- acceleration — `unresolved-candidate`
- momentum — `unresolved-candidate`

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, section 5.3, "Newton's Second
   Law":
   https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. BIPM, *The International System of Units (SI Brochure)*:
   https://www.bipm.org/en/publications/si-brochure

Source review: established educational treatment plus authoritative SI
references; specialist physics review remains a promotion gate for the
Factorium entry.

