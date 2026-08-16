---
skill: roles-check
topic: electrical-field-material-impedance
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Electrical Field, Material, Storage, and Impedance Roles Check

Artifact: revised Electrical Quantity anchor and Formula view, new Diagnostic
view, source review, reference registration, and book route. Domain signals:
electromagnetism, materials, complex quantities, frequency response, metrology,
units, and concept-taxonomy boundaries.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Local, material, configuration, and terminal levels could compose arbitrarily. | P2 | Ladder | Make dependencies explicit. Closed. |
| 2 | Resistivity and geometry are not independent in a resistance claim. | P2 | Root factors | Require specimen model. Closed. |
| 3 | Impedance could combine incompatible phasor conventions. | P2 | Formula | Freeze convention and terminals. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Electric field and voltage could collapse. | P2 | Contrasts | Separate local vector and point-pair difference. Closed. |
| 2 | Capacitance and stored charge could collapse. | P2 | Contrasts | Separate property and state. Closed. |
| 3 | Component names could determine the decomposition. | P2 | Boundary | Use field/material/configuration/response pivots. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Contact resistance could bias resistivity. | P2 | Diagnostic | Vary length and use four-terminal tests. Closed. |
| 2 | Frequency-dependent capacitance could be model-dependent. | P2 | Diagnostic | Sweep frequency and compare equivalent models. Closed. |
| 3 | Fixture parasitics could masquerade as device impedance. | P2 | Diagnostic | Move calibration plane and de-embed. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Dimensional consistency could certify a material model. | P2 | Claim boundary | Exclude certification. Closed. |
| 2 | Equivalent-circuit fit could prove physical mechanism. | P2 | Diagnostic | Keep representation and mechanism evidence separate. Closed. |
| 3 | Field values could imply exposure safety. | P2 | Claim boundary | Exclude exposure and safe-design claims. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Complex impedance could be reduced to magnitude. | P2 | Diagnostic | Retain phase and real/reactive parts. Closed. |
| 2 | Geometry normalization could omit uncertainty. | P2 | Resistivity | Carry length/area/contact uncertainty. Closed. |
| 3 | Frequency sweeps could compare unmatched amplitudes or states. | P3 | Procedure | Freeze excitation and state. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Field and potential gradient require accessible wording. | P2 | Sense table | Include force-per-charge alternative. Closed. |
| 2 | Resistance/resistivity share lexical proximity. | P2 | Contrasts | Lead with specimen versus material. Closed. |
| 3 | Impedance/resistance require a quick discriminator. | P2 | Contrasts | Use complex frequency response versus real parameter. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Four separate anchors would fragment authority. | P2 | Whole artifact | Deepen Electrical Quantity. Closed. |
| 2 | Ohm's Law should remain the narrow resistance view. | P2 | Views | Do not duplicate its empirical contract. Closed. |
| 3 | Only the new Diagnostic belongs in the Factor Forge delta. | P3 | Book | Reuse revised base paths. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Resistor/capacitor/device families could expand without bound. | P2 | Boundary | Keep components as examples. Closed. |
| 2 | Named dielectric and conductor families could become senses. | P2 | Sources | Keep materials external. Closed. |
| 3 | Circuit topology catalogs could displace response criteria. | P3 | Diagnostic | Preserve equivalent-representation factor. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Electrostatic gradient relation could be overgeneralized. | P2 | Formula scope | State electrostatic restriction. Closed. |
| 2 | `rho = RA/L` could hide anisotropy and nonuniformity. | P2 | Formula scope | Require direction and uniform specimen. Closed. |
| 3 | Lumped impedance could be applied to distributed systems. | P2 | Formula scope | Declare lumped/sinusoidal validity. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Calibration-plane changes could overwrite prior results. | P2 | Diagnostic | Version fixture and plane. Closed. |
| 2 | Equivalent-circuit fitting could discard waveforms. | P2 | Custody | Preserve raw voltage/current data. Closed. |
| 3 | Material conditions could be omitted from revisions. | P2 | Provenance | Record temperature, direction, and state. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Current `i` and imaginary unit could collide. | P2 | Symbols | Use `j` for the imaginary unit. Closed. |
| 2 | `E = F/q` requires nonzero test charge and limiting interpretation. | P2 | Symbols | Use `F_e` and state restrictions. Closed. |
| 3 | Ideal capacitor impedance fails at zero frequency. | P2 | Scope | Require nonzero frequency and phasor regime. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Field-to-voltage mapping could omit path and time scope. | P2 | Field relation | Restrict to electrostatic gradient/integration. Closed. |
| 2 | Material-to-specimen mapping could omit contacts and geometry. | P2 | Resistivity | Preserve model and loss. Closed. |
| 3 | Time-domain/frequency-domain mapping could hide initial conditions. | P2 | Impedance | Separate phasor and causal transient models. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a four-level selection ladder. | P2 | Orientation | Add local/material/configuration/terminal route. Closed. |
| 2 | Impedance disagreements need calibration tests. | P2 | Diagnostic | Add plane, fixture, and convention checks. Closed. |
| 3 | Formula exclusions should be quickly visible. | P3 | Formula | Add one compact scope section. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 35  |  P3 notes: 4
Verdict: APPROVED
```

Top finding: every electrical quantity must retain its descriptive level and
measurement contract. Cross-role consensus: geometry, state, terminals,
frequency, complex convention, and calibration plane cannot be implicit. All
findings are closed.

## Amendments

1. Deepened one existing anchor instead of creating four isolated authorities.
2. Added explicit field, material, configuration, complex-response, and calibration contracts.
3. Kept named components, materials, bands, and circuit topologies outside canonical senses.
