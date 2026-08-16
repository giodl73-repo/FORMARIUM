# Electrical Field, Material, Storage, and Impedance Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Electrical Quantity](../entries/electrical-quantity.md)

Canonical senses: `electric-charge`, `electric-current`, `potential-difference`,
`resistance`, `electrical-power`, `electrical-energy-transfer`, `electric-field`,
`electrical-resistivity`, `capacitance`, `electrical-impedance`

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Same voltage, different local field | geometry, boundary conditions, position, direction, or time differs | map field over the declared region with calibrated orientation | field owner |
| Field inferred from endpoint voltage | nonuniform gradient, path, time-varying induction, or missing reference | measure spatial dependence and test electrostatic assumptions | model owner |
| Same material, different resistance | length, area, contacts, direction, temperature, or microstructure differs | normalize geometry and compare four-terminal results | materials owner |
| Derived resistivity changes with specimen length | contact resistance, nonuniform section, heating, or invalid bulk model | vary length/area and fit resistance with uncertainty | metrology owner |
| Stored charge changes while capacitance is called changed | voltage changed at fixed configuration | sweep charge-voltage relation at fixed state | component owner |
| Capacitance depends on frequency | dielectric loss, leakage, parasitics, distributed response, or instrument model | repeat across frequency with an equivalent-circuit comparison | impedance owner |
| Two impedance values share magnitude but behave differently | phase or real/reactive composition differs | compare complex values and voltage-current phase | analysis owner |
| DC resistance misses AC response | capacitance, inductance, skin effect, loss, or distributed behavior | frequency sweep from calibrated terminal plane | measurement owner |
| Ideal capacitor predicts infinite current or zero-frequency division | transient/discontinuity or invalid phasor scope | solve a causal time-domain model and inspect initial conditions | model owner |
| Apparent impedance changes after fixture change | leads, contacts, shielding, calibration plane, or parasitics moved | de-embed or calibrate at the device terminal plane | calibration owner |
| Complex sign flips between tools | phasor sign, current direction, polarity, or Fourier convention differs | round-trip a known resistor-capacitor fixture under both contracts | mapping owner |
| Named components multiply as senses | device catalog replaced field/material/configuration/response criteria | swap examples and verify the conceptual ladder survives | concept-taxonomy editor |

## Use contract and claim boundary

Preserve raw voltage/current waveforms, geometry, material state, temperature,
frequency, phase convention, terminal plane, fixture, calibration, instrument
settings, uncertainty, and preprocessing. Freeze local versus terminal target,
constitutive model, equivalent representation, and validity range before
comparison. Passing dimensional or circuit consistency does not certify a
material, component, equivalent circuit, electromagnetic exposure, or safe design.

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-electrical-field-material-impedance.md)
2. BIPM SI Brochure: https://www.bipm.org/en/publications/si-brochure
3. NIST impedance measurement: https://www.nist.gov/system/files/documents/calibrations/mn141.pdf
4. NIST Farad and Impedance Metrology: https://www.nist.gov/programs-projects/farad-and-impedance-metrology

This diagnostic does not certify exposure, compatibility, performance, or safety.
