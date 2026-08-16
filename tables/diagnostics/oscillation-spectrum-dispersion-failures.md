# Oscillation, Spectrum, and Dispersion Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Periodic and Wave Quantity](../entries/periodic-wave-quantity.md)

Canonical senses: `period`, `frequency`, `angular-frequency`, `wavelength`,
`wave-number`, `phase`, `wave-speed`, `oscillation`, `amplitude`, `spectrum`,
`phase-velocity`, `group-velocity`

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Reported amplitude differs | baseline, peak/RMS/peak-to-peak, component, or interval differs | recompute each measure from the same retained waveform | measurement owner |
| Oscillation disappears after detrending | drift or trajectory was mistaken for a cycle | compare residuals under declared baseline models | model owner |
| Frequency peak moves with record length | leakage, nonstationarity, resolution, or changing source | vary window and duration while preserving raw samples | spectral-analysis owner |
| New peaks appear after sampling change | aliasing, instrument response, resampling, or noise | repeat above Nyquist margin and inspect antialias filtering | metrology owner |
| Spectral amplitudes disagree | transform sign, normalization, window, or one/two-sided convention differs | round-trip a known synthetic waveform under both contracts | analysis owner |
| Named band used as spectrum | conventional interval label replaced ordinate data | require coordinate, ordinate, resolution, and provenance | reference owner |
| Peak called a physical mode | forcing, leakage, harmonic, artifact, or coincident component | perturb boundary/forcing and compare predicted mode structure | domain owner |
| Phase speed inferred from pulse arrival | feature, envelope, and phase were conflated | track constant phase and envelope separately | propagation owner |
| Phase and group speeds differ | dispersion, branch choice, anisotropy, or estimation error | estimate `omega(k)` and compare ratio with local derivative | model owner |
| Group speed changes across bandwidth | packet is broad or dispersion curvature matters | narrow the band and test envelope distortion | experimental owner |
| Group speed called signal or energy speed | transport claim exceeds derivative definition | measure causal response or energy flux independently | evidence owner |
| Wave families multiply as senses | named examples replaced regime and mechanism factors | remove names and verify the selection structure survives | concept-taxonomy editor |

## Use contract and failure signs

Preserve raw samples, coordinates, timestamps, calibration, instrument response,
uncertainty, and preprocessing history. Freeze baseline, amplitude measure,
sampling interval, window, transform, normalization, spectral axes, medium,
mode, branch, and dispersion model before comparison. A passing transform
round trip proves representation consistency, not physical mode identity,
causal source, energy transport, information speed, or safe operation.

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-oscillation-spectrum-dispersion.md)
2. NIST DLMF Fourier transform and DFT: https://dlmf.nist.gov/1.14 and https://dlmf.nist.gov/3.11
3. NIST group velocity: https://nvlpubs.nist.gov/nistpubs/Legacy/MONO/nbsmonograph80.pdf
4. IUPAC spectrum: https://goldbook.iupac.org/terms/view/08291

This diagnostic does not certify a mode, source, transport speed, or safe system.
