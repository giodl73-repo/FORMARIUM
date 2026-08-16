# Electrical Quantity

Status: candidate anchor entry

## Orientation

Electric charge, current, potential difference, resistance, power, and energy
form a connected circuit vocabulary but answer different questions. Charge is
a quantity; current is charge flow rate; potential difference is energy change
per charge between points; resistance describes a scoped voltage-current
relation; power is energy-transfer rate; electrical energy accumulates that
transfer through time. Electric field is a local vector quantity; resistivity
is a material property distinct from a specimen's resistance; capacitance is a
configuration-and-state relation; impedance is a complex, frequency-scoped
terminal response rather than a synonym for resistance.

## Sense table

| Sense | Governing question | Quantity role | SI unit |
|---|---|---|---|
| `electric-charge` | What net electric charge is associated with this system or crosses this boundary? | signed extensive quantity | coulomb, `C` |
| `electric-current` | At what rate does net charge cross this oriented surface? | signed flow rate | ampere, `A` |
| `potential-difference` | How much electric potential-energy change corresponds to each unit charge between these points? | ordered energy-per-charge difference | volt, `V` |
| `resistance` | What scoped voltage-current relation characterizes this component or operating point? | constitutive or derived parameter | ohm, `ohm` |
| `electrical-power` | At what rate is electrical energy supplied or absorbed at these terminals? | signed transfer rate | watt, `W` |
| `electrical-energy-transfer` | How much energy crossed through the electrical interaction over the interval? | signed transfer amount | joule, `J` |
| `electric-field` | What force per charge or potential gradient is assigned locally in space and time? | vector field quantity | volt per metre, `V m^-1` |
| `electrical-resistivity` | What local or effective material property relates field and current density under declared conditions? | material constitutive property | ohm metre, `ohm m` |
| `capacitance` | What charge-potential relation characterizes a declared conductor configuration and state? | configuration constitutive parameter | farad, `F = C V^-1` |
| `electrical-impedance` | What complex voltage-current ratio characterizes a terminal pair at a declared frequency and regime? | complex frequency response | ohm, `ohm` |

## Quantity ladder

```text
charge crossing an oriented surface
  -- divided by time --> current

electric potential-energy difference
  -- divided by charge --> potential difference

potential difference and current at one terminal pair
  -- with sign convention --> electrical power

electrical power
  -- integrated over time --> electrical energy transfer

voltage-current behavior
  -- under a declared component regime --> resistance or another constitutive relation

force per test charge or potential gradient -> electric field
material + direction + conditions -> resistivity -> specimen geometry -> resistance
conductor configuration + dielectric + state -> capacitance
complex voltage/current phasors + frequency -> impedance
```

## Root factorization

```text
electrical-quantity-use
  := system or component
   x terminal pair or oriented surface
   x requested quantity
   x polarity and current direction
   x carrier and transport context
   x material and component state
   x operating range and waveform
   x local field point, direction, frame, and spatial scale
   x material, microstructure, direction, temperature, and constitutive regime
   x geometry, electrodes, dielectric, boundary conditions, and leakage
   x steady, transient, sinusoidal, or broadband excitation regime
   x frequency, phase reference, complex convention, and harmonic index
   x ideal, equivalent-circuit, distributed, or measured representation
   x calibration, parasitics, uncertainty, and validity range
   x average, instantaneous, or accumulated view
   x energy-transfer sign convention
   x unit and uncertainty
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Charge vs. current | current transports charge | quantity in coulombs vs. rate in amperes |
| Current vs. carrier velocity | both concern moving charge | net charge crossing rate vs. motion of individual carriers |
| Potential difference vs. current | both appear at circuit terminals | energy per charge between points vs. charge flow rate |
| Resistance vs. resistivity | both characterize conduction | component/geometry relation vs. material property |
| Electrical energy vs. power | both concern transfer | accumulated joules vs. watts as joules per second |
| Power absorbed vs. supplied | same magnitude and unit may appear | polarity-current sign relation determines direction |
| Electric field vs. potential difference | both connect to volts | local vector gradient/force-per-charge vs. ordered difference between points |
| Resistance vs. resistivity | both concern conduction | specimen terminal response vs. material property with geometry removed under a model |
| Capacitance vs. stored charge | related by a scoped constitutive relation | configuration parameter vs. state quantity |
| Capacitance vs. capacitor | property vs. physical component or implementation |
| Resistance vs. impedance | both use ohms | real scoped voltage-current parameter vs. complex frequency-dependent terminal ratio |
| Impedance magnitude vs. impedance | both use ohms | nonnegative magnitude vs. complex response retaining phase |

## Diagnostic examples

- One ampere means one coulomb per second through an oriented surface; it does
  not mean one coulomb is stored in the component.
- Electrons moving one direction can correspond to conventional current in
  the opposite direction.
- A voltage can exist with zero steady current across an open circuit.
- Two components can have the same voltage with different currents because
  their terminal behavior differs.
- A `100 W` device used for one hour transfers `100 Wh` of energy, not
  `100 W` of energy.
- A diode's changing `V/I` ratio does not make it one constant ohmic resistor.
- Equal potential difference over different distances does not imply equal local electric field.
- Equal material resistivity does not imply equal specimen resistance when geometry differs.
- A charged configuration can have fixed capacitance while its stored charge changes.
- Two devices can share impedance magnitude while their voltage-current phase differs.

## Specialized views

- [Electrical Quantity Formula Table](../formulas/electrical-quantities.md)
  owns current, potential-difference, power, and energy-transfer relations.
- [Ohm's Law](../formulas/ohms-law.md) owns the bounded linear
  voltage-current constitutive relation.
- [Electrical Field, Material, Storage, and Impedance Failure Diagnostic](../diagnostics/electrical-field-material-impedance-failures.md)
  tests local/terminal, material/specimen, state/property, and real/complex collapse.

## Selection procedure

1. Select the system, component, terminals, or oriented crossing surface.
2. Decide whether the target is charge, flow rate, energy per charge,
   constitutive response, transfer rate, or accumulated transfer.
3. Declare voltage polarity and conventional-current direction.
4. Identify average, instantaneous, steady, or time-varying scope.
5. For fields, declare point or region, vector direction, frame, time, and boundary conditions.
6. For resistivity, separate material, direction, temperature, and model from specimen geometry.
7. For capacitance, declare conductors, dielectric, geometry, state, frequency, leakage, and linearity.
8. For impedance, declare terminal pair, frequency, phasor convention, excitation,
   equivalent representation, parasitics, and calibration plane.
9. Apply Ohm's law only after confirming ohmic behavior and operating state.
10. Use the chosen energy-transfer sign convention consistently.
11. Integrate or multiply by duration to convert power to energy.
12. Audit units, waveform assumptions, and uncertainty.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines charge, current, voltage, resistance, power, and energy | Places quantity, rate, difference, response, and transfer senses in one schema |
| Thesaurus | Links electricity, flow, pressure, opposition, power, and energy | Prevents metaphors and lexical proximity from creating equivalence |
| Encyclopedia or textbook | Explains fields, circuits, materials, and derivations | Supplies a compact terminal, orientation, sign, and regime selection path |
| Formula sheet | Lists `I = dQ/dt`, `V = IR`, and `P = VI` | Adds surface, terminal pair, component state, scope inheritance, and energy direction |
| SI/engineering reference | Owns ampere, coulomb, volt, ohm, watt, and joule conventions | Connects unit authority to distinct electrical roles |

## Constraints and failure signs

- Current names an oriented charge-crossing rate.
- Conventional current direction is not assumed to equal electron motion.
- Potential difference names an ordered pair of points or terminals.
- Voltage, current, and resistance values refer to the same component and
  terminal pair when related.
- Ohm's law is not applied to an unverified nonlinear regime.
- Resistance states temperature and other material conditions where relevant.
- Power signs follow declared voltage polarity and current direction.
- Resistive power forms inherit all Ohm-law restrictions.
- Energy requires a duration or integration of power.
- A shared joule or watt unit does not identify the transfer mechanism.
- Electric field is not inferred from voltage alone without geometry and field conditions.
- Resistivity-to-resistance relations state uniformity, geometry, contacts, and direction.
- Capacitance does not name stored charge, stored energy, or one component type.
- Impedance retains complex phase, frequency, terminal, and calibration reference.
- Ideal resistor/capacitor models are not promoted beyond their validity regimes.

## Cross-references

- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Comparative Quantity](comparative-quantity.md)
- [Periodic and Wave Quantity](periodic-wave-quantity.md)
- [Measure](../roots/measure.md)
- [Boundary](../roots/boundary.md)
- [State](../roots/state.md)

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, sections 7.1, 7.2, 9.1, 9.4, and
   9.5:
   https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy
   https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
   https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current
   https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
   https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
2. NIST, "SI Units - Electric Current":
   https://www.nist.gov/pml/owm/si-units-electric-current
3. BIPM, *SI Brochure*: https://www.bipm.org/en/publications/si-brochure
4. NIST, *The Measurement of Lumped Parameter Impedance*:
   https://www.nist.gov/system/files/documents/calibrations/mn141.pdf
5. NIST, Farad and Impedance Metrology:
   https://www.nist.gov/programs-projects/farad-and-impedance-metrology
6. [Research note](../../docs/research/2026-08-15-electrical-field-material-impedance.md)

Comparator access date: 2026-08-14. Introductory electrical relations and SI
units are established within source scope; Factorium organization remains
`candidate`.

