# Force - Newtonian Net-Force Formula View

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Force](../entries/force.md)

Sense: `physical-interaction`

## Orientation

In Newtonian mechanics, Newton's second law relates net external force to the
time rate of change of a selected system's momentum. For a fixed collection
with constant mass, this reduces to `sum(F_external) = m a`. The familiar
shorthand is not the general open-system momentum balance.

## Relation

| Field | Value |
|---|---|
| Sense | Newtonian net-force relation |
| Relation kind | Experimentally supported physical law |
| Canonical expression | `sum(F_external) = dP_system/dt` |
| Relation authority | established within its stated Newtonian scope |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Quantity kind | SI unit | Dimension | Role |
|---|---|---|---|---|---|
| `sum(F_external)` | net external force | vector | newton, `N` | `M L T^-2` | derived vector sum |
| `m` | mass | scalar | kilogram, `kg` | `M` | system parameter |
| `a` | acceleration | vector | metre per second squared, `m s^-2` | `L T^-2` | motion response |
| `P_system` | total linear momentum of the selected fixed-membership system | vector | `kg m s^-1` | `M L T^-1` | frame-dependent system state |

Mass resolves through the
[Matter and Load Measure entry](../entries/matter-load-measure.md), and
acceleration resolves through the [Motion Measure entry](../entries/motion-measure.md).

## Scope and assumptions

- Choose the system boundary before classifying forces as external or internal.
- Sum all external force vectors using one declared coordinate and sign
  convention.
- Use the acceleration of the represented system in the same reference frame.
- This entry covers the standard Newtonian `sum(F_external) = m a` model.
- The momentum-rate form uses a fixed-membership system in one inertial frame.
- Cases requiring changing-system-mass, relativistic, or other specialized
  treatments are outside this entry and require narrower sourced models.

## Equivalent forms

| Form | Use | Restriction |
|---|---|---|
| `sum(F_external) = m a` | constant-mass reduction | fixed mass and Newtonian inertial frame |
| `a = sum(F_external) / m` | Solve for acceleration | `m` must be nonzero |
| `m = magnitude(sum(F_external)) / magnitude(a)` | Infer mass in a collinear scalar case | Force and acceleration directions and model assumptions must be established |
| `sum(F_external) = 0` implies `a = 0` | Balanced-force case | Within the same Newtonian system model |

These are uses or rearrangements of the same scoped relation, not independent
laws.

## Dimensional audit

```text
[sum(F_external)] = M L T^-2
[dP_system/dt]    = (M L T^-1) T^-1
                  = M L T^-2
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
   x system momentum and membership
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
- Momentum flux across an open boundary is omitted while using the
  fixed-membership momentum-rate relation.

## Cross-references

- [Boundary](../roots/boundary.md)
- [Measure](../roots/measure.md)
- [State](../roots/state.md)
- [Transformation](../roots/transformation.md)
- [Matter and Load Measure](../entries/matter-load-measure.md)
- [Motion Measure](../entries/motion-measure.md)

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, section 5.3, "Newton's Second
   Law":
   https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. BIPM, *The International System of Units (SI Brochure)*:
   https://www.bipm.org/en/publications/si-brochure
4. NASA Glenn Research Center, "Newton's Second Law of Motion":
   https://www.grc.nasa.gov/www/k-12/BGP/newton2.html

Source review: established educational treatment plus authoritative SI
references; specialist physics review remains a promotion gate for the
Factorium entry.

## Reference Delta

The canonical [Force entry](../entries/force.md) owns the cross-reference-form
comparison and non-physical senses. This Formula Table contributes the
mathematical relation, symbol contract, units, assumptions, equivalent forms,
dimensional audit, and failure signs for one physical sense.
