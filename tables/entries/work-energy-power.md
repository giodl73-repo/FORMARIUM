# Work, Energy, and Power

Status: candidate anchor entry

## Orientation

Work, energy, and power are connected but answer different questions. Work
tracks a transfer through a mechanical interaction, energy is a system
quantity expressed in multiple forms, and power tracks how quickly transfer
occurs.

## Sense table

| Sense | Governing question | Role | Dimension | SI unit |
|---|---|---|---|---|
| `mechanical-work` | How much energy did this force transfer along the path? | signed transfer | `M L^2 T^-2` | joule, `J` |
| `energy` | What energy quantity is associated with the selected system and accounting view? | system state or conserved accounting quantity | `M L^2 T^-2` | joule, `J` |
| `kinetic-energy` | What energy is associated with motion in this frame? | motion-associated state term | `M L^2 T^-2` | joule, `J` |
| `potential-energy` | What energy is associated with configuration and interaction in this system? | interaction-associated state term | `M L^2 T^-2` | joule, `J` |
| `power` | At what rate is work done or energy transferred? | transfer rate | `M L^2 T^-3` | watt, `W` |

## Role ladder

```text
force along displacement
  -- accumulated over a path --> mechanical work

net work on a particle
  -- changes --> kinetic energy

conservative interaction and configuration
  -- represented by --> potential-energy difference

work or energy transfer
  -- divided by elapsed time --> average power
```

The arrows express scoped relations, not synonymy.

## Root factorization

```text
work-energy-power-use
  := system
   x boundary
   x requested role
   x included energy forms
   x interaction or transfer channel
   x path or state endpoints
   x reference frame
   x potential-zero convention
   x time interval or instant
   x unit system
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Force vs. work | force participates in mechanical work | interaction vector vs. path-accumulated scalar transfer |
| Work vs. energy | same dimension and joule unit | transfer/process role vs. system/accounting role |
| Energy vs. power | both describe transfer capability or behavior | amount in joules vs. rate in watts |
| Kinetic vs. potential energy | both are mechanical-energy terms | motion in a frame vs. system configuration and interaction |
| Work vs. torque | both may be written using `N m` | dot product and scalar transfer vs. cross product and axial effect |
| Mechanical vs. total energy | both are energy accounts | selected `K + U` subset vs. all included forms for the system |

## Diagnostic examples

- Holding a stationary load can require muscular effort while the idealized
  external mechanical work on the load is zero because displacement is zero.
- A force perpendicular to a displacement does zero mechanical work in the
  particle model even though the force can change motion direction.
- Two machines can transfer the same energy while the faster machine delivers
  greater average power.
- A high-power device used briefly can transfer less energy than a lower-power
  device used for a long time.
- Changing the zero of potential energy changes reported values but not
  consistent potential-energy differences.
- Writing `N m` does not reveal whether the quantity is work or torque.

## Formula view

The linked [Mechanical Work, Energy, and Power Formula Table](../formulas/mechanical-work-energy-power.md)
contains dot-product work, kinetic and potential energy, work-energy, power,
and mechanical-energy relations.

## Selection procedure

1. Decide whether the question asks for interaction, transfer, system energy,
   or transfer rate.
2. Select the system and boundary.
3. For work, identify the acting force and displacement path.
4. For kinetic energy, declare the reference frame.
5. For potential energy, name the interaction, system, and zero reference.
6. For conservation, list included energy forms and boundary transfers.
7. For power, declare the interval or instantaneous view.
8. Audit operator, sign, unit, and dimension.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Separates ordinary and technical senses of work, energy, and power | Adds transfer/state/rate roles and required physical context |
| Thesaurus | Links effort, force, capacity, strength, energy, and power | Prevents lexical proximity from erasing quantity and unit distinctions |
| Encyclopedia or textbook | Explains mechanics, derivations, examples, and conservation | Supplies a compact selection path, contrast matrix, and failure signs |
| Formula sheet | Lists work, kinetic energy, potential energy, and power equations | Adds system, path, frame, zero reference, and conservation scope |
| NIST/SI reference | Owns joule and watt unit conventions | Connects authoritative units to distinct quantity roles |

## Constraints and failure signs

- Work requires displacement and the force component along it.
- Net work and work by one selected force are different quantities.
- Kinetic energy requires a declared reference frame.
- Potential energy requires an interacting system and consistent zero.
- Mechanical energy is not the same as every form of system energy.
- Power requires an energy transfer and a time basis.
- `W` used as a quantity symbol for work and `W` used as the unit symbol watt
  must be distinguished by context and typography.
- A shared unit or dimension does not prove semantic equivalence.

## Cross-references

- [Force](force.md)
- [Motion measure](motion-measure.md)
- [Matter and load measure](matter-load-measure.md)
- [Thermal Quantity](thermal-quantity.md)
- [Electrical Quantity](electrical-quantity.md)
- [Time](../roots/time.md)
- [Transformation](../roots/transformation.md)
- torque - `unresolved-candidate`

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 7.1, 7.3, and 7.4:
   https://openstax.org/books/university-physics-volume-1/pages/7-1-work
   https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem
   https://openstax.org/books/university-physics-volume-1/pages/7-4-power
2. OpenStax, *University Physics Volume 1*, sections 8.1 through 8.3:
   https://openstax.org/books/university-physics-volume-1/pages/8-1-potential-energy-of-a-system
   https://openstax.org/books/university-physics-volume-1/pages/8-2-conservative-and-non-conservative-forces
   https://openstax.org/books/university-physics-volume-1/pages/8-3-conservation-of-energy
3. OpenStax, *University Physics Volume 1*, section 10.6:
   https://openstax.org/books/university-physics-volume-1/pages/10-6-torque
4. NIST, Special Publication 811:
   https://www.nist.gov/pml/special-publication-811

Comparator access date: 2026-08-14. Classical mechanics relations and SI
units are established within source scope; Factorium organization remains
`candidate`.
