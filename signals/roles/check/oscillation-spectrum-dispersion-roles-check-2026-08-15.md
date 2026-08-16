---
skill: roles-check
topic: oscillation-spectrum-dispersion
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Oscillation, Spectrum, and Dispersion Roles Check

Artifact: revised canonical Factor Table and Formula view, new Diagnostic view,
source review, reference registration, and proposed book route. Domain signals:
waves, signal representation, sampling, measurement, dispersion, units, and
concept-taxonomy boundaries.

## Selected roles

The panel uses semantics and factorization stewards for the decomposition;
experimental, claims, numeracy, source, provenance, equation, and mapping
reviewers for measurement and transformation claims; lexicography,
architecture, taxonomy, and practitioner reviewers for reference usability.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Amplitude reference and measure could be modeled independently when some combinations are invalid. | P2 | Root factors | Require a declared amplitude contract. Closed. |
| 2 | Spectrum could collapse physical content and mathematical representation. | P2 | Contrasts | Preserve measurement/transform provenance. Closed. |
| 3 | Group velocity could compose with arbitrary transport claims. | P2 | Constraints | Require a separately justified target. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Oscillation and wave could collapse. | P2 | Contrasts | Separate repeated variation from propagating pattern. Closed. |
| 2 | Named spectral bands could create subtype explosion. | P2 | Boundary | Canonize coordinate and interval criteria. Closed. |
| 3 | Phase/group velocity need one explicit pivot. | P2 | Root factors | Use the dispersion relation and propagation target. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Spectral peaks could depend on window and duration. | P2 | Diagnostic | Vary both while preserving raw samples. Closed. |
| 2 | Aliasing could be misread as a physical component. | P2 | Diagnostic | Repeat sampling and inspect filtering. Closed. |
| 3 | Group velocity could be estimated outside narrowband scope. | P2 | Diagnostic | Vary bandwidth and test distortion. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Transform round trip could prove physical correctness. | P2 | Diagnostic boundary | Limit it to representation consistency. Closed. |
| 2 | Peak could prove a mode or source. | P2 | Constraints | Require model prediction and perturbation evidence. Closed. |
| 3 | Group velocity could imply information speed. | P2 | Claims | Require independent causal evidence. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | DFT count and index domains could be implicit. | P2 | Symbol contract | Require `N > 0` and bounded indices. Closed. |
| 2 | One/two-sided spectra could silently double amplitudes. | P2 | Scope | Require representation and normalization. Closed. |
| 3 | Spectral resolution could omit record duration. | P2 | Procedure | Retain sampling and window contract. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Amplitude could read as one universal scalar definition. | P2 | Sense table | Define it as a declared measure. Closed. |
| 2 | Spectrum could mean a named range or plotted distribution. | P2 | Contrasts | Separate spectrum and named band. Closed. |
| 3 | Wave speed could remain ambiguous beside two new velocities. | P2 | Senses | Treat it as the broad lookup and distinguish targets. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A new wave anchor would duplicate current authority. | P2 | Whole artifact | Deepen the existing periodic-wave entry. Closed. |
| 2 | Formula and diagnostic ownership could drift. | P2 | Specialized views | Bind both to the same canonical senses. Closed. |
| 3 | Updated base entry does not need duplicate supplement selection. | P3 | Book | Add only the new Diagnostic path to the delta. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Radio, optical, acoustic, and seismic bands could become sibling senses. | P2 | Boundary | Keep named bands external. Closed. |
| 2 | Named wave families and modes could expand without bound. | P2 | Diagnostic | Retain regime and mechanism factors. Closed. |
| 3 | Familiar instruments could determine the ontology. | P3 | Examples | Keep instruments in provenance and examples. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Spectrum definitions vary by domain and ordinate. | P2 | Sources | Retain coordinate and quantity scope. Closed. |
| 2 | Group velocity is not universally energy velocity. | P2 | Constraints | Keep the narrowband-envelope definition. Closed. |
| 3 | Introductory wave formulas could be overgeneralized. | P3 | Formula scope | Preserve medium, mode, branch, and regime. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Preprocessing could overwrite raw waveforms. | P2 | Diagnostic | Preserve raw samples and history. Closed. |
| 2 | Spectral results could omit software convention. | P2 | Use contract | Record transform and normalization. Closed. |
| 3 | Resampling could erase original timing evidence. | P2 | Provenance | Preserve timestamps and instrument response. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `omega/k` requires nonzero `k`. | P2 | Symbol contract | State the denominator restriction. Closed. |
| 2 | `d omega/d k` requires a differentiable branch. | P2 | Scope | State branch and narrowband restrictions. Closed. |
| 3 | DFT coefficient units and normalization could be hidden. | P2 | Dimensional audit | Declare unnormalized coefficients and convention. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Time-to-frequency mapping could be called lossless without conditions. | P2 | Formula | Show the exact finite transform pair only. Closed. |
| 2 | Frequency/wavelength axes could be mapped without Jacobian effects. | P2 | Spectrum | Treat coordinate change as scoped, not identical ordinates. Closed. |
| 3 | Phase/group labels could map directly to energy transport. | P2 | Contrasts | Mark correspondence contextual. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a quick amplitude comparison test. | P2 | Diagnostic | Recompute measures from one waveform. Closed. |
| 2 | Spectral disputes need a compact contract checklist. | P2 | Procedure | List sampling through bandwidth. Closed. |
| 3 | Propagation disputes need observable tests. | P3 | Diagnostic | Track phase and envelope separately. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 35  |  P3 notes: 4
Verdict: APPROVED
```

Top finding: spectrum and velocity labels must retain representation and
transport scope. Cross-role consensus: raw waveform custody, explicit
conventions, and a narrow group-velocity claim are mandatory. All findings are closed.

## Amendments

1. Deepened the existing anchor instead of creating a second wave authority.
2. Added explicit amplitude, sampling, spectrum, dispersion, branch, and transport contracts.
3. Kept named bands, wave families, modes, and instruments outside canonical senses.
