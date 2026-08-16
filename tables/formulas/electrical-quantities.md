# Electrical Quantities

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Electrical Quantity](../entries/electrical-quantity.md)

## Orientation

These relations separate charge, current, potential difference, electrical
power, and transferred energy. They require a system or component, terminal
pair or oriented surface, time basis, and consistent voltage-current sign
convention. Field, resistivity, capacitance, and impedance relations additionally
require spatial, material, configuration, frequency, phase, and model contracts.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Average current | `I_avg = Delta Q / Delta t` | finite-interval definition |
| Instantaneous current | `I = dQ / dt` | rate definition |
| Potential difference | `Delta V = Delta U_e / q` | definition |
| Instantaneous terminal power | `p = v i` | energy-transfer rate relation |
| Electrical energy transfer | `Delta E = integral_(t_1)^(t_2) p(t) dt` | accumulated transfer |
| Constant-power transfer | `Delta E = P Delta t` | conditional special form |
| Ohmic resistive power | `P = I^2 R = V^2 / R` | derived forms under Ohm scope |
| Electric field from force | `E = F_e / q` | local test-charge definition |
| Electrostatic potential gradient | `E = -grad V` | field-potential relation under electrostatic scope |
| Uniform specimen resistivity | `rho = R A / L` | geometry-normalized constitutive form |
| Linear capacitance | `C = Q / V` | configuration relation at a declared state |
| Constant-capacitance current | `i = C d v / d t` | conditional time-domain relation |
| Sinusoidal impedance | `Z(omega) = V_tilde(omega) / I_tilde(omega)` | complex frequency-response definition |
| Ideal resistor impedance | `Z_R = R` | ideal sinusoidal steady-state model |
| Ideal capacitor impedance | `Z_C = 1 / (j omega C)` | ideal sinusoidal steady-state model |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `Q`, `Delta Q` | net charge crossing selected surface | signed quantity | `C` | surface orientation declared |
| `q` | selected test or transferred charge | signed quantity | `C` | nonzero for quotient |
| `I`, `i` | current under declared direction | signed rate | `A` | same branch/surface |
| `Delta V`, `v` | potential difference under declared polarity | signed difference | `V` | ordered terminal pair |
| `Delta U_e` | electric potential-energy difference | signed energy difference | `J` | same charge and endpoints |
| `p`, `P` | instantaneous or constant/average power | signed transfer rate | `W` | sign convention declared |
| `Delta E` | electrical energy transferred | signed transfer amount | `J` | interval and boundary declared |
| `R` | applicable resistance | scalar parameter | `ohm` | ohmic regime and state |
| `t` | time | coordinate or duration | `s` | interval declared |
| `E`, `F_e`, `q` | electric field, electric force, and nonzero test charge | vector, vector, scalar | `V m^-1`, `N`, `C` | point, frame, direction, and test limit declared |
| `rho`, `A`, `L` | resistivity, cross-sectional area, and length | scalar/tensor component, area, length | `ohm m`, `m^2`, `m` | uniform specimen model and direction |
| `C` | capacitance | scalar configuration parameter | `F` | conductors, dielectric, geometry, state, and regime |
| `Z`, `V_tilde`, `I_tilde` | impedance and voltage/current phasors | complex ratio and complex amplitudes | `ohm`, `V`, `A` | same terminals, frequency, and phasor convention |
| `omega` | angular frequency | nonnegative scalar | `rad s^-1` | sinusoidal steady-state component; `omega > 0` for `Z_C` |
| `j` | imaginary unit | complex scalar | `1` | `j^2 = -1`; distinct from current `i` |

## Dimensional audit

```text
[Q/t] = C s^-1 = A
[U/q] = J C^-1 = V
[V I] = V A = W
[P t] = W s = J
[I^2 R] = A^2 ohm = W
[V^2/R] = V^2/ohm = W
[F_e/q] = N C^-1 = V m^-1
[R A/L] = ohm m^2/m = ohm m
[Q/V] = C V^-1 = F
[C dV/dt] = F V s^-1 = A
[V_tilde/I_tilde] = V A^-1 = ohm
[1/(omega C)] = 1/(s^-1 F) = ohm
```

## Power sign contract

Under the passive sign convention, current entering the terminal labeled
positive makes `p = v i > 0` represent power absorbed by the component.
Negative power then represents supply under that same reference choice.
Changing polarity or current reference changes signs and must not silently
change the semantic conclusion.

## Ohm-scope inheritance

The general power relation `p = v i` does not require ohmic behavior.
The forms:

```text
P = I^2 R
P = V^2 / R
```

inherit the full scope of the linked [Ohm's Law](ohms-law.md): same component
and terminals, consistent directions, applicable linear operating regime,
material state, and nonzero denominator for the quotient form.

## Field, material, storage, and impedance scope

`E = -grad V` is restricted to an electrostatic potential model. The simple
`rho = R A/L` form assumes a uniform prismatic specimen, defined current
direction, `L > 0`, negligible contact effects, and applicable material state.
`C = Q/V` requires nonzero `V` and uses a declared conductor/dielectric
configuration and linear operating scope;
`i = C dv/dt` additionally treats `C` as constant. Impedance relations use
complex phasors at one frequency in sinusoidal steady state. Broadband,
nonlinear, time-varying, distributed, and parasitic behavior requires a more
complete model.

## Failure signs

- Current is computed from stored charge without a crossing boundary.
- Potential difference is reported for one point without a reference point.
- Voltage and current use incompatible terminal or direction conventions.
- Unsigned magnitudes hide whether power is absorbed or supplied.
- Watts are treated as energy rather than energy per time.
- Kilowatt-hours are treated as power rather than energy.
- Resistive power forms are applied to a nonohmic component.
- A changing resistance is held constant without a thermal or state model.
- Field and potential difference are interchanged without a spatial model.
- Material resistivity and specimen resistance are interchanged without geometry.
- Capacitance is treated as stored charge or assumed constant through a nonlinear regime.
- Impedance magnitude is used while discarding phase.
- DC resistance is substituted for frequency-dependent impedance without evidence.
- Ideal capacitor impedance is used at zero frequency or outside sinusoidal steady state.

## Reference Delta

The canonical [Electrical Quantity entry](../entries/electrical-quantity.md)
owns the full comparison. Relative to a formula sheet, this view adds crossing
surface, terminal pair, polarity, direction, sign, state, and inherited-model
scope.

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, sections 7.2, 9.1, 9.4, and 9.5:
   https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
   https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current
   https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
   https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
2. NIST, "SI Units - Electric Current":
   https://www.nist.gov/pml/owm/si-units-electric-current
3. BIPM, *SI Brochure*: https://www.bipm.org/en/publications/si-brochure
4. NIST, *The Measurement of Lumped Parameter Impedance*:
   https://www.nist.gov/system/files/documents/calibrations/mn141.pdf
5. NIST resistivity measurement example:
   https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nbsir82-2449.pdf

Formula authority: introductory circuit relations within stated scope.
Factorium presentation remains `candidate`.
