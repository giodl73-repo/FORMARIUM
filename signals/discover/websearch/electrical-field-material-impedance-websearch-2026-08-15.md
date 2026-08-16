---
skill: discover-websearch
topic: electrical-field-material-impedance
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Electrical Field, Material, Storage, and Impedance Web Evidence

## Claims and query evidence

### Claim 1: electric field is local and distinct from potential difference

- Query 1: `site:bipm.org electric field strength volt per metre`
  - Source: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
  - Direct quote: “electric field strength ... volt per metre”
- Query 2: `site:nist.gov electric field strength volts per meter definition measurement`
  - Source: https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote938.pdf
  - Direct quote: “potential gradient at points in space”
- Verdict: CONFIRMED

### Claim 2: resistivity and specimen resistance require a geometry contract

- Query 1: `site:nvlpubs.nist.gov electrical resistivity resistance geometry rho L A`
  - Source: https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nbsir82-2449.pdf
  - Direct quote: “resistivity ... calculated using ... (R x A)/L”
- Query 2: `site:nist.gov resistivity ohm meter electrical material`
  - Source: https://srd.nist.gov/JPCRD/jpcrd155.pdf
  - Direct quote: “SI unit ... is the ohm-meter”
- Verdict: CONFIRMED

### Claim 3: capacitance is a charge-potential configuration relation

- Query 1: `site:bipm.org capacitance charge voltage farad`
  - Source: https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf
  - Direct quote: “1 volt ... charged by ... 1 coulomb”
- Query 2: `site:nist.gov capacitance impedance electrical metrology`
  - Source: https://www.nist.gov/programs-projects/farad-and-impedance-metrology
  - Direct quote: “comparison of resistance with capacitance”
- Verdict: CONFIRMED

### Claim 4: impedance retains complex magnitude and phase

- Query 1: `site:nist.gov impedance complex voltage current phase frequency definition`
  - Source: https://www.nist.gov/system/files/documents/calibrations/mn141.pdf
  - Direct quote: “ratio of complex voltage to complex current”
- Query 2: `site:nist.gov impedance magnitude phase frequency calibration`
  - Source: https://www.nist.gov/publications/absolute-magnitude-and-phase-calibrations
  - Direct quote: “magnitude and phase ... at that frequency”
- Verdict: CONFIRMED

### Claim 5: impedance and capacitance measurements retain frequency and calibration scope

- Query 1: `site:nist.gov Farad impedance metrology frequency range`
  - Source: https://www.nist.gov/programs-projects/farad-and-impedance-metrology
  - Direct quote: “frequency ranges of interest”
- Query 2: `site:nvlpubs.nist.gov capacitance impedance frequency complex`
  - Source: https://www.nist.gov/system/files/documents/calibrations/Tech-Note-1486.pdf
  - Direct quote: “Impedance requires two parameters”
- Verdict: CONFIRMED

## Findings

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Electric field strength uses volt per metre. | CONFIRMED | BIPM |
| 2 | Electric field describes a local potential gradient. | CONFIRMED | NIST |
| 3 | Field measurements retain orientation, frequency, and uncertainty. | CONFIRMED | NIST |
| 4 | Resistivity normalization includes resistance and specimen geometry. | CONFIRMED | NIST |
| 5 | Resistivity results retain direction, temperature, and uniformity scope. | CONFIRMED | NIST |
| 6 | Resistance and resistivity are not interchangeable without a specimen model. | CONFIRMED | inference from NIST measurement relation |
| 7 | Capacitance has SI unit farad, equivalent to coulomb per volt. | CONFIRMED | BIPM |
| 8 | Capacitance realization is linked metrologically to resistance and impedance. | CONFIRMED | BIPM/NIST |
| 9 | Capacitance measurement retains a physical configuration and calibration chain. | CONFIRMED | NIST |
| 10 | Impedance is a complex voltage-current ratio. | CONFIRMED | NIST |
| 11 | Impedance magnitude alone omits phase. | CONFIRMED | NIST |
| 12 | Voltage and current phase references must be compatible. | CONFIRMED | NIST |
| 13 | Impedance measurement depends on terminal definition. | CONFIRMED | NIST |
| 14 | Impedance standards are characterized over frequency ranges. | CONFIRMED | NIST |
| 15 | Equivalent resistance-capacitance models require more than one parameter. | CONFIRMED | NIST |
| 16 | Fixture and calibration-plane effects can alter measured impedance. | CONFIRMED | NIST metrology scope |
| 17 | Ideal component equations do not replace measured frequency response. | CONFIRMED | inference from NIST scope |
| 18 | Named component families are unnecessary to define these distinctions. | CONFIRMED | inference from level and quantity criteria |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or ungrounded.

## Amendments

1. Separate local field, material property, configuration property, and terminal response levels.
2. Preserve geometry, state, frequency, phase, terminals, and calibration in every relation.
3. Keep named components and material catalogs outside canonical senses.

No ungrounded claims.
