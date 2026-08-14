# Kinematics Motion Measures

Status: candidate Formula Table

Canonical headword: [Motion Measure](../entries/motion-measure.md)

## Orientation

These relations separate path-based scalars from endpoint- or derivative-based
vectors. Average relations use finite intervals; instantaneous relations use
derivatives. Constant-acceleration equations form a narrower conditional view.

## Core relations

| Quantity | Canonical expression | Kind | Dimension |
|---|---|---|---|
| Displacement | `Delta x = x_f - x_i` | vector | `L` |
| Distance traveled, piecewise 1D | `d_total = sum(abs(Delta x_i))` | scalar | `L` |
| Average speed | `speed_avg = d_total / Delta t` | scalar | `L T^-1` |
| Average velocity | `v_avg = Delta x / Delta t` | vector | `L T^-1` |
| Instantaneous velocity | `v(t) = dx(t) / dt` | vector | `L T^-1` |
| Instantaneous speed | `speed(t) = magnitude(v(t))` | scalar | `L T^-1` |
| Average acceleration | `a_avg = Delta v / Delta t` | vector | `L T^-2` |
| Instantaneous acceleration | `a(t) = dv(t) / dt = d^2 x(t) / dt^2` | vector | `L T^-2` |

## Symbol contract

| Symbol | Meaning | Kind | Restriction |
|---|---|---|---|
| `x_i`, `x_f` | initial and final position in one frame | vector or coordinate | same origin and axes |
| `Delta x` | displacement | vector | `x_f - x_i` |
| `d_total` | total path length | scalar | nonnegative |
| `Delta t` | elapsed time | scalar | positive for average-rate formulas |
| `v` | velocity | vector | frame-relative |
| `a` | acceleration | vector | rate of velocity change |

## Constant-acceleration view

For one-dimensional motion or a compatible vector component with constant
acceleration over elapsed time `t`:

```text
v = v_0 + a t
x = x_0 + v_0 t + (1/2) a t^2
v^2 = v_0^2 + 2 a (x - x_0)
x - x_0 = ((v_0 + v) / 2) t
```

These are not valid merely because position, velocity, acceleration, and time
values are available.

## Dimensional audit

```text
[Delta x / Delta t] = L T^-1
[Delta v / Delta t] = (L T^-1) T^-1 = L T^-2
[v_0 t]             = (L T^-1) T = L
[a t^2]             = (L T^-2) T^2 = L
```

## Selection procedure

1. Choose a reference frame and positive directions.
2. Decide whether evidence is a path, endpoints, or a time function.
3. Choose scalar or vector output.
4. Choose average interval or instantaneous value.
5. Use constant-acceleration formulas only after establishing the regime.
6. Convert units before arithmetic.

## Failure signs

- Average speed is computed from displacement instead of distance.
- Average velocity is computed from path length.
- A round trip is assigned zero average speed because displacement is zero.
- Direction is removed from velocity or acceleration.
- Negative acceleration is automatically described as slowing.
- A derivative is used where the function is not defined or differentiable.
- Constant-acceleration equations are used over variable acceleration.

## Reference Delta

The canonical [Motion Measure entry](../entries/motion-measure.md) owns the
full comparison. Relative to a formula sheet, this view adds path-versus-
endpoint evidence, scalar/vector type, reference frame, average/instantaneous
selection, and constant-regime gating.

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 3.1 through 3.3:
   https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity
   https://openstax.org/books/university-physics-volume-1/pages/3-2-instantaneous-velocity-and-speed
   https://openstax.org/books/university-physics-volume-1/pages/3-3-average-and-instantaneous-acceleration
2. NIST, "SI Units - Length" and "SI Units - Time":
   https://www.nist.gov/pml/owm/si-units-length
   https://www.nist.gov/pml/owm/si-units-time

Formula authority: established introductory kinematics. Factorium
presentation remains `candidate`.

