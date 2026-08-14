# Periodic and Wave Quantity Research

Status: candidate research basis

## Research question

How should Factorium connect frequency, period, wavelength, phase, angular
frequency, wave number, and wave speed without confusing temporal recurrence,
spatial repetition, propagation, or motion of a medium?

Decision supported: whether these concepts belong in one anchor and Formula
view, and which regime and reference factors must gate their common
relations.

## Local evidence

- `tables/entries/motion-measure.md` separates path motion, velocity, and
  acceleration by evidence, frame, and derivative order.
- `tables/roots/time.md` separates temporal position, duration, ordering, and
  reference frame.
- `tables/entries/comparative-quantity.md` requires explicit numerator and
  denominator roles for rates.
- `specs/FORMULA-TABLE-ENTRY.md` requires domains, units, dimensions,
  assumptions, equivalent forms, and failure conditions.

## Findings

### FACTORIUM-PWQ-01 - Period and frequency are reciprocal temporal views

Source:

- OpenStax, *University Physics Volume 1*, section 16.1:
  https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves

Observed constraint: period is time per cycle and frequency is cycles per
unit time, with `f = 1/T` for a periodic phenomenon.

Implication: the cycle definition and periodic regime must be known before
either reciprocal is meaningful.

Confidence: high.

### FACTORIUM-PWQ-02 - Wavelength is spatial repetition, not traveled distance

Source:

- OpenStax, *University Physics Volume 1*, sections 16.1 and 16.2:
  https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
  https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves

Observed constraint: wavelength is the distance between corresponding
same-phase points in a periodic wave. It is not the path length traveled by a
material element.

Implication: spatial axis, propagation direction, and phase equivalence must
remain explicit.

Confidence: high.

### FACTORIUM-PWQ-03 - Propagation speed differs from medium motion

Source:

- OpenStax, *University Physics Volume 1*, section 16.2:
  https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves

Observed constraint: a wave pattern propagates while material points may
oscillate about equilibrium with a different velocity and direction.

Implication: wave speed must not reuse the subject role of ordinary particle
velocity.

Confidence: high.

### FACTORIUM-PWQ-04 - The familiar speed relation is periodic-wave scoped

Source:

- OpenStax, *University Physics Volume 1*, sections 16.1 and 16.2:
  https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
  https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves

Observed constraint: for a periodic traveling wave, one wavelength propagates
in one period, yielding `v = lambda/T = f lambda`.

Implication: `v = f lambda` is not a definition of every speed or a license to
assign one frequency and wavelength to a nonperiodic pulse.

Confidence: high.

### FACTORIUM-PWQ-05 - Angular frequency and wave number measure phase rates

Source:

- OpenStax, *University Physics Volume 1*, section 16.2:
  https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves

Observed constraint: `omega = 2 pi/T` is temporal phase rate and
`k = 2 pi/lambda` is spatial phase rate. Their units are commonly written
`rad s^-1` and `rad m^-1`, with angle dimension one.

Implication: Factorium must distinguish cycles from radians and ordinary
frequency from angular frequency.

Confidence: high.

### FACTORIUM-PWQ-06 - Phase requires a reference and is periodic modulo a cycle

Source:

- OpenStax, *University Physics Volume 1*, section 16.2:
  https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves

Observed constraint: phase combines spatial position, time, propagation sign,
and initial phase in a sinusoidal model. Phase differences that differ by an
integer multiple of `2 pi` represent the same cycle position.

Implication: a phase value without waveform, origin, sign convention, and
reference is incomplete.

Confidence: high.

### FACTORIUM-PWQ-07 - Wave speed can depend on medium and mode

Source:

- OpenStax, *University Physics Volume 1*, section 16.1:
  https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves

Observed constraint: mechanical, electromagnetic, and matter waves have
different propagation mechanisms; mechanical waves depend on a medium and
different modes may propagate differently.

Implication: wave type, medium, mode, and regime belong in the formula-use
contract.

Confidence: high.

## Recommendations

### Adopt now

- Publish one anchor connecting temporal, spatial, phase, and propagation
  quantities.
- Include period/frequency, angular frequency, wavelength/wave number, phase,
  and nondispersive periodic-wave speed relations.
- Explicitly separate pattern speed from material-point velocity.

Owner: Factorium.

Validation: Equation & Units Auditor, Domain Source Reviewer, local links,
role registry, and fixed-point review.

### Prototype behind a compatibility boundary

- Leave phase velocity, group velocity, dispersion relations, spectra, and
  Fourier decomposition as unresolved extensions.
- Defer machine-readable periodicity and waveform contracts to R2.

### Reject or defer

- Reject `v = f lambda` without a periodic traveling-wave scope.
- Reject a phase value without a reference convention.
- Defer detailed wave equations and medium-specific constitutive models.

## Non-goals

- teaching oscillations, acoustics, optics, or quantum mechanics;
- claiming one wave model covers pulses and broadband signals;
- replacing domain-specific dispersion or propagation theory.

