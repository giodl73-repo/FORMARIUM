# Periodic and Wave Quantities

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Periodic and Wave Quantity](../entries/periodic-wave-quantity.md)

## Orientation

These relations connect temporal recurrence, spatial repetition, phase, and
pattern propagation for periodic phenomena and simple traveling waves. Cycle,
reference, propagation sign, medium, mode, and regime remain part of the
formula contract.

## Core relations

| Quantity or model | Canonical expression | Relation kind |
|---|---|---|
| Frequency-period reciprocity | `f = 1 / T` | definition for a periodic phenomenon |
| Angular frequency | `omega = 2 pi f = 2 pi / T` | angular representation |
| Wave number | `k = 2 pi / lambda` | spatial angular representation |
| Periodic wave speed | `v = lambda / T = f lambda` | periodic traveling-wave relation |
| Phase speed form | `v = omega / k` | equivalent form for the scoped model |
| Positive-direction sinusoid | `y(x,t) = A sin(k x - omega t + phi_0)` | idealized traveling-wave model |
| Negative-direction sinusoid | `y(x,t) = A sin(k x + omega t + phi_0)` | idealized traveling-wave model |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `T` | period | positive scalar duration | `s` | defined cycle, `T > 0` |
| `f` | ordinary frequency | nonnegative temporal rate | `Hz = s^-1` | cycles per second |
| `omega` | angular frequency | temporal phase rate | `rad s^-1` | radians per second |
| `lambda` | wavelength | positive spatial period | `m` | corresponding same-phase points |
| `k` | angular wave number | spatial phase rate | `rad m^-1` | radians per metre |
| `v` | scoped propagation or phase speed | scalar speed | `m s^-1` | medium, mode, and regime declared |
| `A` | amplitude of represented quantity | scalar or component magnitude | unit of `y` | equilibrium and quantity declared |
| `phi_0` | initial phase | cyclic scalar | `rad` | reference convention declared |
| `x`, `t` | position and time coordinates | coordinates | `m`, `s` | origins and direction declared |

## Dimensional audit

```text
[1/T] = s^-1 = Hz
[2 pi f] = rad s^-1
[2 pi/lambda] = rad m^-1
[f lambda] = s^-1 m = m s^-1
[omega/k] = (rad s^-1)/(rad m^-1) = m s^-1
```

Angles are dimension one in SI; the explicit `rad` label preserves the
distinction between angular and cycle-based quantities.

## Phase contract

For the positive-direction sinusoidal model:

```text
phase(x,t) = k x - omega t + phi_0
```

A constant-phase feature moves toward increasing `x`. Reversing the sign of
the temporal term reverses that propagation direction under the same axis
convention. Phase comparisons are modulo `2 pi` where only cycle position
matters.

## Scope

The compact equations assume a defined periodic component. The sinusoidal
traveling-wave form additionally assumes:

- one spatial dimension;
- constant `k`, `omega`, amplitude, and phase offset;
- a declared medium or propagation context;
- a single modeled mode;
- no claim that material points move with speed `v`.

Broadband pulses, dispersive media, attenuation, standing waves, and group
velocity require additional models.

## Failure signs

- Frequency is assigned without a repeatable cycle or spectral convention.
- Hertz and radians per second are used as numerically identical units.
- Wavelength is confused with distance traveled.
- The sign in the phase model is interpreted without the axis convention.
- Wave speed is substituted for transverse or longitudinal material velocity.
- A medium-specific speed is treated as universal.
- `v = f lambda` is used to force one frequency onto a pulse.
- Phase and group velocity are assumed identical in a dispersive regime.

## Reference Delta

The canonical
[Periodic and Wave Quantity entry](../entries/periodic-wave-quantity.md)
owns the full comparison. Relative to a formula sheet, this view adds cycle,
reference, propagation, medium, mode, and regime contracts.

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 16.1 and 16.2:
   https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
   https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
2. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure

Formula authority: introductory periodic-wave physics within stated scope.
Factorium presentation remains `candidate`.
