---
skill: discover-websearch
topic: measurement-quality
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Measurement Quality Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Why it matters |
|---|---|---|
| 1 | Measurement error and measurement uncertainty are distinct. | A difference from a reference is not the same object as a dispersion assigned from available information. |
| 2 | Accuracy, trueness, precision, and bias are distinct. | Tight repeatability does not establish closeness to a reference. |
| 3 | Resolution is distinct from sensitivity, precision, accuracy, and uncertainty. | Display granularity cannot stand in for total measurement quality. |
| 4 | Metrological calibration is not adjustment, verification, or validation. | A calibration relation does not itself prove conformance or fitness for use. |
| 5 | Probability calibration is a separate reliability relation between stated probabilities and observed frequencies. | A score in `[0,1]` is not thereby a calibrated probability. |

## Phase 2 - Web evidence

### Claim 1

- Query 1: `site:jcgm.bipm.org vim measurement error uncertainty`
  - Source: https://jcgm.bipm.org/vim/en/2.16.html
  - Direct quote: “measured quantity value minus a reference quantity value”
  - Relevance: VIM defines error as a signed difference.
- Query 2: `site:jcgm.bipm.org vim measurement uncertainty dispersion`
  - Source: https://jcgm.bipm.org/vim/en/2.26.html
  - Direct quote: “non-negative parameter characterizing the dispersion”
  - Relevance: uncertainty describes attributed dispersion, not the realized error.
- Verdict: CONFIRMED

### Claim 2

- Query 1: `site:jcgm.bipm.org vim accuracy trueness precision bias`
  - Sources: https://jcgm.bipm.org/vim/en/2.13.html and https://jcgm.bipm.org/vim/en/2.15.html
  - Direct quotes: “closeness of agreement” and “obtained by replicate measurements”
  - Relevance: accuracy concerns a measured value and truth; precision concerns agreement among replicates under stated conditions.
- Query 2: `site:nist.gov measurement bias accuracy precision handbook`
  - Source: https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc113.htm
  - Direct quote: “Bias is a quantitative term describing the difference”
  - Relevance: NIST separates qualitative accuracy from the bias of an average relative to a reference.
- Verdict: CONFIRMED

### Claim 3

- Query 1: `site:jcgm.bipm.org/vim/en resolution measurement indication`
  - Source: https://jcgm.bipm.org/vim/en/4.14.html
  - Direct quote: “smallest change ... that causes a perceptible change”
  - Relevance: resolution is defined at the quantity-to-indication interface.
- Query 2: `site:nist.gov gauge resolution measurement uncertainty`
  - Source: https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc46.htm
  - Direct quote: “standard uncertainty for resolution”
  - Relevance: NIST treats resolution as one uncertainty contribution, not as uncertainty itself.
- Verdict: CONFIRMED

### Claim 4

- Query 1: `site:jcgm.bipm.org/vim/en calibration adjustment verification`
  - Source: https://jcgm.bipm.org/vim/en/2.39.html
  - Direct quote: “Calibration should not be confused with adjustment”
  - Relevance: VIM separates the relation-establishing operation from changing the instrument and checking requirements.
- Query 2: `site:nist.gov instrument calibration reference standards uncertainty`
  - Source: https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3.htm
  - Direct quote: “assigns values ... relative to reference standards”
  - Relevance: calibration is conditional on standards, procedure, range, model, and uncertainty.
- Verdict: CONFIRMED

### Claim 5

- Query 1: `site:noaa.gov probability forecast calibration observed frequency reliability diagram`
  - Source: https://repository.library.noaa.gov/view/noaa/32482/noaa_32482_DS1.pdf
  - Direct quote: “observed frequency ... is the same as the forecast probability”
  - Relevance: forecast reliability compares probability bins with outcome frequencies.
- Query 2: `site:weather.gov probabilistic forecast reliability calibration frequency`
  - Source: https://www.weather.gov/media/owp/oh/hrl/docs/verification_probforecasts.pdf
  - Direct quote: “calibration between forecast probability and the frequency”
  - Relevance: probability calibration differs from discrimination and from physical-instrument calibration.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Measurement error is a measured value minus a reference value. | CONFIRMED | [VIM 2.16](https://jcgm.bipm.org/vim/en/2.16.html) |
| 2 | Error may be unknown when the true value is unknown. | CONFIRMED | [VIM 2.16](https://jcgm.bipm.org/vim/en/2.16.html) |
| 3 | Measurement uncertainty is a non-negative dispersion parameter based on information used. | CONFIRMED | [VIM 2.26](https://jcgm.bipm.org/vim/en/2.26.html) |
| 4 | Accuracy is qualitative closeness between a measured and true value. | CONFIRMED | [VIM 2.13](https://jcgm.bipm.org/vim/en/2.13.html) |
| 5 | Accuracy is related to but is not interchangeable with trueness or precision. | CONFIRMED | [VIM 2.13](https://jcgm.bipm.org/vim/en/2.13.html) |
| 6 | Trueness concerns the replicate-limit average relative to a reference and is inversely related to systematic error. | CONFIRMED | [VIM 2.14](https://jcgm.bipm.org/vim/en/2.14.html) |
| 7 | Precision concerns agreement among replicates under specified repeatability or reproducibility conditions. | CONFIRMED | [VIM 2.15](https://jcgm.bipm.org/vim/en/2.15.html) |
| 8 | Precision is commonly quantified through standard deviation, variance, or coefficient of variation. | CONFIRMED | [VIM 2.15](https://jcgm.bipm.org/vim/en/2.15.html) |
| 9 | Measurement bias is an estimate of systematic measurement error. | CONFIRMED | [VIM 2.18](https://jcgm.bipm.org/vim/en/2.18.html) |
| 10 | A precise process can remain biased and inaccurate. | CONFIRMED | [NIST bias and accuracy](https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc113.htm) |
| 11 | Resolution is the smallest measured-quantity change producing a perceptible indication change. | CONFIRMED | [VIM 4.14](https://jcgm.bipm.org/vim/en/4.14.html) |
| 12 | Resolution can depend on noise, friction, and the quantity value. | CONFIRMED | [VIM 4.14](https://jcgm.bipm.org/vim/en/4.14.html) |
| 13 | Resolution can contribute to an uncertainty budget without exhausting it. | CONFIRMED | [NIST gauge study](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc46.htm) |
| 14 | Calibration establishes standards-to-indications and indications-to-results relations with uncertainties under specified conditions. | CONFIRMED | [VIM 2.39](https://jcgm.bipm.org/vim/en/2.39.html) |
| 15 | Calibration is not adjustment or verification. | CONFIRMED | [VIM 2.39](https://jcgm.bipm.org/vim/en/2.39.html) |
| 16 | Calibration results retain curve/model and future-measurement uncertainty. | CONFIRMED | [NIST calibrated values](https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc367.htm) |
| 17 | Working-environment effects can introduce bias after ideal-environment calibration. | CONFIRMED | [NIST bias analysis](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc45.htm) |
| 18 | Probability reliability compares forecast probability with observed relative frequency. | CONFIRMED | [NWS verification](https://www.weather.gov/media/owp/oh/hrl/docs/verification_probforecasts.pdf) |
| 19 | Probability calibration and discrimination diagnose different forecast properties. | CONFIRMED | [NWS verification](https://www.weather.gov/media/owp/oh/hrl/docs/verification_probforecasts.pdf) |

Summary: 5 of 5 claims confirmed; 19 grounded findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No source supports using decimal places, repeatability, one successful
calibration, or a bounded score as a universal certificate of accuracy.

## Phase 5 - Amend

1. Give each quality term its own sense and governing comparison.
2. Carry conditions, references, uncertainty, range, and time with calibration.
3. Qualify every use of `calibration` as metrological or probabilistic.
