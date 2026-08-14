# Periodic and Wave Quantity

Status: candidate anchor entry

## Orientation

Frequency and period describe temporal repetition; wavelength and wave number
describe spatial repetition; phase identifies position within a cycle; wave
speed describes propagation of a pattern. These quantities are connected for
periodic traveling waves but are not interchangeable with one another or with
the velocity of material points.

## Sense table

| Sense | Governing question | Quantity role | SI unit |
|---|---|---|---|
| `period` | How much time does one defined cycle take? | duration per cycle | second, `s` |
| `frequency` | How many defined cycles occur per unit time? | temporal recurrence rate | hertz, `Hz = s^-1` |
| `angular-frequency` | How quickly does temporal phase advance? | temporal phase rate | `rad s^-1` |
| `wavelength` | What spatial interval separates corresponding same-phase points? | spatial period | metre, `m` |
| `wave-number` | How quickly does phase advance with position? | spatial phase rate | `rad m^-1` |
| `phase` | Where within the declared cycle is this state relative to a reference? | dimension-one cyclic coordinate | radian, `rad` |
| `wave-speed` | How quickly does a wave feature or phase propagate? | pattern propagation rate | `m s^-1` |

## Temporal-spatial-phase ladder

```text
one defined cycle
  -- duration --> period
  -- cycles per time --> frequency
  -- radians per time --> angular frequency

one spatial cycle
  -- length --> wavelength
  -- radians per length --> wave number

spatial cycle / temporal cycle
  -- in a periodic traveling wave --> wave speed
```

## Root factorization

```text
periodic-wave-use
  := phenomenon or field
   x cycle definition
   x waveform or mode
   x temporal reference
   x spatial axis and origin
   x propagation direction
   x medium and boundary conditions
   x periodic, pulse, or spectral regime
   x requested temporal, spatial, phase, or speed quantity
   x unit and uncertainty
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Period vs. frequency | same cycle | time per cycle vs. cycles per time |
| Frequency vs. angular frequency | same temporal recurrence | cycles per second vs. radians per second |
| Wavelength vs. wave number | same spatial repetition | length per cycle vs. radians per length |
| Phase vs. time | phase may evolve with time | cyclic coordinate relative to a reference vs. temporal position or duration |
| Wave speed vs. particle velocity | both may use `m s^-1` | pattern propagation vs. motion of material or field value |
| Wavelength vs. distance traveled | both use metres | spatial period vs. accumulated path length |

## Diagnostic examples

- A `2 Hz` oscillation has a `0.5 s` period.
- Two points one wavelength apart are in the same phase for a simple periodic
  wave, though they occupy different positions.
- A transverse string wave can move horizontally while string elements move
  vertically.
- Doubling frequency in the same nondispersive medium halves wavelength when
  propagation speed remains fixed.
- A single pulse has a propagation speed but not necessarily one period,
  frequency, wavelength, or phase.
- Equal phase values are meaningful only under a shared waveform, origin,
  direction, and reference convention.

## Formula view

The linked [Periodic and Wave Formula Table](../formulas/periodic-wave-quantities.md)
owns reciprocal, phase-rate, wavelength, and periodic traveling-wave
relations.

## Selection procedure

1. Identify the phenomenon, wave type, medium, and mode.
2. Decide whether the observation is periodic, pulsed, or spectral.
3. Define one complete temporal or spatial cycle.
4. Select cycles or radians as the reporting basis.
5. Declare spatial origin, temporal origin, propagation direction, and phase
   reference.
6. Distinguish wave-pattern speed from material-point or group motion.
7. Apply `v = f lambda` only to the scoped periodic traveling-wave relation.
8. Report units, uncertainty, and regime limitations.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines frequency, period, wavelength, phase, and speed | Places temporal, spatial, phase, and propagation senses in one selection schema |
| Thesaurus | Links repetition, rhythm, cycle, interval, pitch, and wave | Prevents lexical proximity from collapsing different quantity roles |
| Encyclopedia or textbook | Explains wave models, media, derivations, and examples | Supplies a compact regime, reference, and motion distinction |
| Formula sheet | Lists `f = 1/T`, `k = 2 pi/lambda`, and `v = f lambda` | Adds cycle, waveform, medium, direction, phase, and periodicity contracts |
| SI reference | Owns second, hertz, metre, and radian conventions | Connects unit authority to cycle and phase semantics |

## Constraints and failure signs

- Frequency and period require a defined recurring cycle.
- Cycles per second and radians per second are not numerically identical.
- Wavelength requires a spatially periodic pattern and phase correspondence.
- Phase values use one origin, direction, waveform, and angular convention.
- Phase is compared modulo a complete cycle where appropriate.
- Wave speed is not automatically the velocity of medium particles.
- `v = f lambda` is used within its periodic traveling-wave scope.
- Medium, mode, and dispersion assumptions are not hidden.
- A pulse is not forced to have one frequency or wavelength.

## Cross-references

- [Motion Measure](motion-measure.md)
- [Comparative Quantity](comparative-quantity.md)
- [Time](../roots/time.md)
- [Transformation](../roots/transformation.md)
- [Context](../roots/context.md)
- oscillation - `unresolved-candidate`
- amplitude - `unresolved-candidate`
- spectrum - `unresolved-candidate`
- phase velocity - `unresolved-candidate`
- group velocity - `unresolved-candidate`

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 16.1 and 16.2:
   https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
   https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
2. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure

Comparator access date: 2026-08-14. Introductory periodic-wave relations are
established within source scope; Factorium organization remains `candidate`.

