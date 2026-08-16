---
skill: discover-websearch
topic: oscillation-spectrum-dispersion
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Oscillation, Spectrum, and Dispersion Web Evidence

## Claims and query evidence

### Claim 1: amplitude requires a declared waveform quantity and reference or measure

- Query 1: `site:nasa.gov wave amplitude frequency wavelength phase velocity`
  - Source: https://science.nasa.gov/learn/basics-of-space-flight/chapter6-2/
  - Direct quote: “frequency, wavelength, and amplitude”
  - Relevance: amplitude is one wave descriptor, not frequency or wavelength.
- Query 2: `site:nist.gov waveform amplitude reference level oscillation measurement`
  - Source: https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=33116
  - Direct quote: “referenced to the amplitude of the waveform”
  - Relevance: operational amplitude comparisons retain a reference convention.
- Verdict: CONFIRMED

### Claim 2: a spectrum requires an ordinate and spectral coordinate rather than named-band enumeration

- Query 1: `site:goldbook.iupac.org spectrum amplitude wave frequency`
  - Source: https://goldbook.iupac.org/terms/view/08291
  - Direct quote: “ordinate plotted against the wavelength”
  - Relevance: the spectrum has both a represented quantity and spectral axis.
- Query 2: `site:goldbook.iupac.org spectral bandwidth definition`
  - Source: https://goldbook.iupac.org/terms/view/08286
  - Direct quote: “Upper frequency minus lower frequency”
  - Relevance: bandwidth is an interval measure, not the spectrum itself.
- Verdict: CONFIRMED

### Claim 3: Fourier representations retain an explicit transform convention

- Query 1: `site:dlmf.nist.gov Fourier transform definition normalization`
  - Source: https://dlmf.nist.gov/1.14
  - Direct quote: “Fourier transform ... is defined by”
  - Relevance: the definition visibly fixes sign and normalization.
- Query 2: `site:dlmf.nist.gov discrete Fourier transform pair`
  - Source: https://dlmf.nist.gov/3.11
  - Direct quote: “called a discrete Fourier transform pair”
  - Relevance: the finite coefficient and sample vectors form a specified pair.
- Verdict: CONFIRMED

### Claim 4: phase and group velocity separate in a dispersive medium

- Query 1: `site:nist.gov phase velocity group velocity dispersion`
  - Source: https://nvlpubs.nist.gov/nistpubs/Legacy/MONO/nbsmonograph80.pdf
  - Direct quote: “phase velocity ... is a function of ... frequency”
  - Relevance: frequency-dependent phase velocity defines the cited dispersive case.
- Query 2: `site:nist.gov group velocity defined d omega d k phase velocity`
  - Source: https://nehrpsearch.nist.gov/static/files/NSF/PB82122391.pdf
  - Direct quote: “group velocity ... is defined as dw/dk”
  - Relevance: derivative-defined group velocity differs from phase-delay velocity.
- Verdict: CONFIRMED

### Claim 5: group velocity has a narrowband-envelope validity boundary

- Query 1: `site:nvlpubs.nist.gov group velocity envelope severe distortion`
  - Source: https://nvlpubs.nist.gov/nistpubs/Legacy/MONO/nbsmonograph80.pdf
  - Direct quote: “only when the modulation envelope retains its shape”
  - Relevance: envelope distortion bounds the interpretation directly.
- Query 2: `site:nist.gov dispersion pulse components group velocity`
  - Source: https://www.nist.gov/news-events/news/2012/04/first-fast-and-faster
  - Direct quote: “rearrange the pulse components”
  - Relevance: pulse-peak motion can depend on dispersive reshaping.
- Verdict: CONFIRMED

## Findings

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Oscillation, frequency, wavelength, and amplitude remain distinct descriptors. | CONFIRMED | NASA |
| 2 | Amplitude comparisons retain reference conventions. | CONFIRMED | NIST waveform standard work |
| 3 | A spectrum carries both spectral coordinate and ordinate. | CONFIRMED | IUPAC |
| 4 | Spectral bandwidth is a coordinate interval, not spectral content. | CONFIRMED | IUPAC |
| 5 | Continuous Fourier transforms require a declared definition. | CONFIRMED | NIST DLMF |
| 6 | Finite samples and coefficients form a declared DFT pair. | CONFIRMED | NIST DLMF |
| 7 | DFT sign and normalization are part of the representation contract. | CONFIRMED | NIST DLMF |
| 8 | Spectrum axes can use frequency, wavelength, or wave number. | CONFIRMED | IUPAC |
| 9 | Spectral ordinates depend on the represented quantity. | CONFIRMED | IUPAC |
| 10 | Phase velocity can depend on frequency. | CONFIRMED | NIST monograph |
| 11 | Frequency-dependent phase velocity is dispersive behavior. | CONFIRMED | NIST monograph |
| 12 | Group velocity is locally derivative-defined. | CONFIRMED | NIST-hosted technical report |
| 13 | A composite envelope can move differently from its component phases. | CONFIRMED | NIST monograph |
| 14 | Group-velocity interpretation requires retained envelope shape. | CONFIRMED | NIST monograph |
| 15 | Severe dispersion can invalidate the simple envelope interpretation. | CONFIRMED | NIST monograph |
| 16 | Pulse peaks can shift through component rearrangement. | CONFIRMED | NIST |
| 17 | A velocity label alone does not establish the transported quantity. | CONFIRMED | NIST monograph |
| 18 | Named bands are examples layered over spectral-coordinate criteria. | CONFIRMED | inference from IUPAC definitions |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or ungrounded.

## Amendments

1. Keep amplitude reference and measure explicit rather than defining one universal amplitude.
2. Keep transform, sampling, window, axis, ordinate, and normalization visible in spectrum claims.
3. Limit group velocity to a scoped local-envelope interpretation and require separate transport evidence.

No ungrounded claims.
