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
| Periodic component phase speed | `v_p = lambda / T = f lambda = omega / k` | periodic traveling-wave relation |
| Positive-direction sinusoid | `y(x,t) = A sin(k x - omega t + phi_0)` | idealized traveling-wave model |
| Negative-direction sinusoid | `y(x,t) = A sin(k x + omega t + phi_0)` | idealized traveling-wave model |
| Sinusoidal oscillation | `y(t) = y_0 + A cos(omega t + phi_0)` | idealized oscillation model |
| Discrete Fourier transform | `X_j = sum_(n=0)^(N-1) x_n exp(-i 2 pi j n / N)` | finite representation transform |
| Inverse discrete Fourier transform | `x_n = (1/N) sum_(j=0)^(N-1) X_j exp(i 2 pi j n / N)` | inverse under this normalization |
| Group velocity | `v_g = d omega / d k` | local derivative of a differentiable dispersion relation |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `T` | period | positive scalar duration | `s` | defined cycle, `T > 0` |
| `f` | ordinary frequency | nonnegative temporal rate | `Hz = s^-1` | cycles per second |
| `omega` | angular frequency | temporal phase rate | `rad s^-1` | radians per second |
| `lambda` | wavelength | positive spatial period | `m` | corresponding same-phase points |
| `k` | angular wave number | spatial phase rate | `rad m^-1` | radians per metre |
| `v_p` | phase velocity | scalar component speed | `m s^-1` | `k != 0`; medium, mode, and branch declared |
| `v_g` | group velocity | scalar local envelope speed | `m s^-1` | differentiable branch and narrowband regime |
| `A` | amplitude of represented quantity | scalar or component magnitude | unit of `y` | equilibrium and quantity declared |
| `y_0` | reference or equilibrium value | scalar or component value | unit of `y` | reference convention declared |
| `phi_0` | initial phase | cyclic scalar | `rad` | reference convention declared |
| `x`, `t` | position and time coordinates | coordinates | `m`, `s` | origins and direction declared |
| `x_n`, `X_j` | sampled value and unnormalized spectral coefficient | real/complex values | quantity-dependent | sampling and transform convention declared |
| `n`, `j`, `N` | sample index, spectral index, and sample count | integers | `1` | `0 <= n,j < N`, `N > 0` |

## Dimensional audit

```text
[1/T] = s^-1 = Hz
[2 pi f] = rad s^-1
[2 pi/lambda] = rad m^-1
[f lambda] = s^-1 m = m s^-1
[omega/k] = (rad s^-1)/(rad m^-1) = m s^-1
[d omega/d k] = (rad s^-1)/(rad m^-1) = m s^-1
[X_j] = [x_n]
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

Broadband pulses, strongly dispersive media, attenuation, and standing waves
require additional models beyond these local relations. The DFT pair
additionally assumes exactly `N` ordered samples and the displayed sign and
normalization convention.
Physical spectral amplitude requires a declared sample interval, window,
one- or two-sided representation, and scaling. Group velocity describes a
local narrowband envelope only while the branch is differentiable and the
packet remains sufficiently undistorted.

## Failure signs

- Frequency is assigned without a repeatable cycle or spectral convention.
- Hertz and radians per second are used as numerically identical units.
- Wavelength is confused with distance traveled.
- The sign in the phase model is interpreted without the axis convention.
- Wave speed is substituted for transverse or longitudinal material velocity.
- A medium-specific speed is treated as universal.
- `v = f lambda` is used to force one frequency onto a pulse.
- Phase and group velocity are assumed identical in a dispersive regime.
- Peak, peak-to-peak, root-mean-square, and spectral amplitudes are interchanged.
- A DFT bin is interpreted without sampling rate, window, normalization, or alias checks.
- A spectral peak is called a physical mode or source without model evidence.
- `d omega / d k` is evaluated across a branch discontinuity or broad packet.
- Group velocity is called energy or information velocity without separate justification.

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
3. NIST Digital Library of Mathematical Functions:
   https://dlmf.nist.gov/1.14
   https://dlmf.nist.gov/3.11
4. NIST, *Ionospheric Radio Propagation*, section 2.4.2:
   https://nvlpubs.nist.gov/nistpubs/Legacy/MONO/nbsmonograph80.pdf

Formula authority: introductory periodic-wave physics within stated scope.
Factorium presentation remains `candidate`.
