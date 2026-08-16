# Mechanical Work, Energy, Power, and Torque

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Work, Energy, and Power](../entries/work-energy-power.md)

## Orientation

These relations connect force-displacement transfer, mechanical-energy state
terms, transfer rate, and the turning effect of force about a reference. They
require an explicit system, path, frame, potential reference, torque origin or
axis, operator, and model scope.

## Core relations

| Quantity or claim | Canonical expression | Relation kind | Dimension |
|---|---|---|---|
| Infinitesimal work | `dW = F_vec dot dr_vec` | definition | `M L^2 T^-2` |
| Work along a path | `W_AB = integral_A^B F_vec dot dr_vec` | accumulated transfer | `M L^2 T^-2` |
| Constant-force work | `W = F d cos(theta)` | conditional special form | `M L^2 T^-2` |
| Classical kinetic energy | `K = (1/2) m speed^2` | definition in nonrelativistic mechanics | `M L^2 T^-2` |
| Work-energy theorem | `W_net = Delta K` | theorem | `M L^2 T^-2` |
| Potential-energy difference | `Delta U = -W_conservative` | definition for a conservative interaction | `M L^2 T^-2` |
| Mechanical energy | `E_mech = K + U` | definition | `M L^2 T^-2` |
| Mechanical-energy change | `W_nonconservative = Delta E_mech` | scoped balance | `M L^2 T^-2` |
| Average power | `P_avg = Delta E_transferred / Delta t` | definition | `M L^2 T^-3` |
| Instantaneous mechanical power | `P = dW/dt = F_vec dot v_vec` | derivative relation | `M L^2 T^-3` |
| Torque about point `O` | `tau_O = r_O_to_P cross F_vec` | axial-vector moment of force | `M L^2 T^-2` |
| Torque magnitude | `magnitude(tau_O) = r F sin(theta) = F ell_perp` | geometric magnitude form | `M L^2 T^-2` |
| Net torque | `tau_net,O = sum_i(r_i cross F_i)` | vector aggregation about one reference | `M L^2 T^-2` |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `W`, `dW` | mechanical work | signed scalar | `J` | named force and path |
| `F_vec` | acting force | vector | `N` | distinguish selected from net force |
| `dr_vec` | infinitesimal displacement | vector | `m` | declared frame and path |
| `d` | displacement magnitude | scalar | `m` | constant-force special form |
| `theta` | angle between force and displacement | scalar angle | radian or degree | same geometric convention |
| `K` | kinetic energy | scalar | `J` | declared frame and classical model |
| `m` | mass | scalar | `kg` | selected particle or body |
| `speed` | velocity magnitude | scalar | `m s^-1` | frame-relative |
| `U` | potential energy | scalar state function | `J` | system, interaction, and zero declared |
| `E_mech` | selected mechanical energy | scalar | `J` | included `K` and `U` terms declared |
| `P`, `P_avg` | signed power or average power | scalar rate | `W` | transfer direction convention declared |
| `Delta t` | elapsed time | scalar | `s` | positive for average power |
| `tau_O`, `tau_net,O` | torque about reference point `O` | axial vector | `N m` | reference and orientation convention declared |
| `r_O_to_P`, `r_i` | position from reference to force application point | vector | `m` | same frame and origin |
| `ell_perp` | perpendicular moment arm to force line of action | nonnegative scalar | `m` | reference-to-line distance |

The symbol `W` for work and the unit symbol `W` for watt occupy different
syntactic roles. A value such as `50 W` uses the latter as a unit.

## SI unit relations

```text
1 J = 1 N m
    = 1 kg m^2 s^-2

1 W = 1 J s^-1
    = 1 kg m^2 s^-3
```

Torque may also use `N m`, but its cross-product quantity kind is not work or
energy.

## Dimensional audit

```text
[F d]       = (M L T^-2) L = M L^2 T^-2
[m speed^2] = M (L T^-1)^2 = M L^2 T^-2
[E / t]     = (M L^2 T^-2) T^-1 = M L^2 T^-3
[F dot v]   = (M L T^-2) (L T^-1) = M L^2 T^-3
[r cross F] = L (M L T^-2) = M L^2 T^-2
```

## Conditional near-Earth potential form

For a particle-Earth system in an approximately uniform gravitational field:

```text
Delta U_g = m g Delta y
```

This uses a declared upward coordinate, local constant `g`, and consistent
height reference. It is not a universal gravitational-potential formula.

## Selection and accounting procedure

1. Choose the system and boundary.
2. Decide whether the target is work, an energy term, energy change, or power.
3. For work, select each acting force and the actual displacement path.
4. For kinetic energy, select the frame and nonrelativistic model.
5. For potential energy, identify a conservative interaction and zero
   convention.
6. For mechanical-energy conservation, account for nonconservative work.
7. For power, select average interval or instantaneous derivative.
8. Preserve dot products, signs, units, and dimensions.
9. For torque, select one reference point or axis, preserve cross-product
   order, and compute each force's perpendicular moment arm before summing.

## Failure signs

- Force magnitude is multiplied by path length without the angle or dot
  product.
- Zero displacement is assigned nonzero external mechanical work on a point
  particle.
- Work by one force is substituted for net work.
- Kinetic energies from different frames are compared without transformation.
- Potential energy is assigned to an object while the interacting system is
  omitted.
- An arbitrary potential zero is changed midway through a calculation.
- Mechanical energy is called conserved while nonconservative work is omitted.
- Power is treated as accumulated energy.
- Energy is inferred from a power rating without duration.
- A torque in `N m` is reported as joules solely because the base units match.
- Torque is computed from force magnitude and radial distance without the
  included angle or perpendicular moment arm.
- Torques about different origins or axes are summed directly.
- A nonzero force through the reference point is assigned nonzero torque.
- Cross-product direction is replaced by an unsigned scalar without a justified plane.

## Reference Delta

The canonical [Work, Energy, and Power entry](../entries/work-energy-power.md)
owns the full comparison. Relative to a formula sheet, this view adds
transfer/state/rate roles, force selection, path, frame, potential reference,
system boundary, conservation scope, and operator diagnostics.

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 7.1, 7.3, and 7.4:
   https://openstax.org/books/university-physics-volume-1/pages/7-1-work
   https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem
   https://openstax.org/books/university-physics-volume-1/pages/7-4-power
2. OpenStax, *University Physics Volume 1*, sections 8.1 through 8.3:
   https://openstax.org/books/university-physics-volume-1/pages/8-1-potential-energy-of-a-system
   https://openstax.org/books/university-physics-volume-1/pages/8-2-conservative-and-non-conservative-forces
   https://openstax.org/books/university-physics-volume-1/pages/8-3-conservation-of-energy
3. NIST, Special Publication 811:
   https://www.nist.gov/pml/special-publication-811
4. NASA Glenn Research Center, "Torque (Moment)":
   https://www.grc.nasa.gov/WWW/K-12/airplane/torque.html
5. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure

Formula authority: established nonrelativistic mechanics within stated scope.
Factorium presentation remains `candidate`.
