# Thermal Quantity

Status: candidate anchor entry

## Orientation

Temperature, heat, internal energy, heat capacity, and entropy describe
different parts of thermal behavior. Temperature and internal energy are state
quantities; heat is boundary transfer; heat capacity describes response under
conditions; entropy is a state quantity governing thermal accounting and
irreversibility.

## Sense table

| Sense | Governing question | Role | SI unit |
|---|---|---|---|
| `temperature` | What thermal state is measured and compared for equilibrium? | intensive state variable | kelvin, `K` |
| `thermal-equilibrium` | Would these systems exchange net heat if thermally connected? | relation between systems | same temperature condition |
| `heat-transfer` | How much energy crossed the boundary because of temperature difference? | signed path-dependent transfer | joule, `J` |
| `internal-energy` | What microscopic energy is included inside this system state? | extensive state quantity | joule, `J` |
| `heat-capacity` | How much transfer is associated with temperature response under stated conditions? | process-constrained response coefficient | `J K^-1` |
| `specific-heat-capacity` | What heat capacity applies per unit mass under stated conditions? | mass-normalized response coefficient | `J kg^-1 K^-1` |
| `entropy` | What state quantity tracks reversible thermal accounting and irreversibility? | extensive state quantity | `J K^-1` |

## State-transfer-response ladder

```text
temperature difference
  -- can drive --> heat transfer across a boundary

heat transfer and work
  -- change --> system internal energy

material, phase, and process constraint
  -- determine --> heat-capacity response

reversible heat-transfer path divided by absolute temperature
  -- evaluates --> entropy change
```

## Root factorization

```text
thermal-quantity-use
  := system and surroundings
   x boundary
   x initial and final equilibrium states
   x requested state, transfer, or response quantity
   x temperature scale
   x process path and constraints
   x material, mass, and phase
   x heat and work sign convention
   x reversible evaluation path
   x unit and uncertainty
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Temperature vs. heat | both concern thermal behavior | state in kelvins vs. energy transfer in joules |
| Heat vs. internal energy | both use joules | boundary transfer/path quantity vs. system state quantity |
| Heat capacity vs. specific heat | both describe temperature response | whole-system coefficient vs. coefficient per unit mass |
| Internal vs. mechanical energy | both are system energies | microscopic included energy vs. macroscopic motion/configuration account |
| Entropy vs. heat | heat appears in entropy evaluation | state function in `J/K` vs. path transfer in `J` |
| Temperature point vs. interval | both use temperature scales | affine scale location vs. scale difference |

## Diagnostic examples

- Two bodies at the same temperature can contain different internal energies.
- A large cool body may contain more internal energy than a small hot body.
- Heat flows spontaneously from hotter to colder systems under ordinary
  thermal contact, but the systems do not contain a stored substance called
  heat.
- Melting can absorb heat while temperature remains constant.
- Gas heat capacity at constant pressure can differ from heat capacity at
  constant volume.
- A system's entropy may decrease while total entropy of system plus
  surroundings increases.

## Specialized views

- [Thermal Formula Table](../formulas/thermal-quantities.md) owns first-law,
  heat-capacity, and entropy relations.
- [Temperature Scale Conversion](../mappings/temperature-scales.md) owns exact
  point and interval mappings.

## Selection procedure

1. Select the system, surroundings, and boundary.
2. Decide whether the target is state, transfer, response, or entropy.
3. Declare point temperature or temperature interval.
4. Identify material, mass, phase, and process constraint.
5. Declare heat and work signs.
6. Use heat-capacity relations only outside unmodeled phase changes.
7. Use reversible paths when evaluating entropy change.
8. Audit units, absolute temperature, and uncertainty.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines temperature, heat, energy, capacity, and entropy | Places them in one state/transfer/response schema |
| Thesaurus | Links warmth, heat, energy, disorder, capacity, and temperature | Prevents lexical proximity from erasing thermodynamic roles |
| Encyclopedia or textbook | Explains thermodynamics, derivations, and processes | Supplies compact selection, sign, phase, and path contracts |
| Formula sheet | Lists calorimetry, first-law, and entropy equations | Adds system boundary, state/path status, constraints, and failure signs |
| NIST/SI reference | Owns kelvin and scale conventions | Connects unit authority to point/interval and absolute-temperature use |

## Constraints and failure signs

- Temperature is not measured in joules.
- Heat and work are not system state contents.
- Internal energy requires a selected system and included microscopic forms.
- Heat-capacity values name material, phase, and constraint.
- `Q = m c Delta T` is not used blindly during phase change.
- First-law equations preserve one sign convention.
- Entropy relations use kelvin, not Celsius numerical values.
- A reversible evaluation path is not confused with the actual irreversible
  path.

## Cross-references

- [Work, Energy, and Power](work-energy-power.md)
- [Matter and Load Measure](matter-load-measure.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [State](../roots/state.md)
- [Transformation](../roots/transformation.md)
- phase - `unresolved-candidate`
- thermodynamic system - `unresolved-candidate`

## Sources and provenance

1. OpenStax, *University Physics Volume 2*, sections 1.1, 1.4, 3.2, 3.3, and
   4.6:
   https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
   https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry
   https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
   https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
   https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy
2. NIST, "SI Units - Temperature":
   https://www.nist.gov/pml/owm/si-units-temperature

Comparator access date: 2026-08-14. Thermodynamic distinctions and SI units
are established within source scope; Factorium organization remains
`candidate`.

