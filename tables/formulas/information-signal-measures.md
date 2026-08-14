# Information and Signal Measures

Status: candidate Formula Table

Canonical headword:
[Information, Data, Signal, and Noise](../entries/information-data-signal-noise.md)

## Orientation

These relations quantify modeled surprise, average discrete uncertainty, and
selected signal-to-noise comparisons. They do not measure semantic meaning,
truth, usefulness, or universal signal quality.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Self-information | `I(x) = -log_b p(x)` | definition |
| Discrete Shannon entropy | `H(X) = -sum_x p(x) log_b p(x)` | expectation/definition |
| Power-ratio SNR | `SNR_P = P_signal / P_noise` | ordered ratio definition |
| Power SNR in decibels | `SNR_dB = 10 log_10(SNR_P)` | logarithmic mapping |
| Sample mean-to-deviation SNR | `SNR_sample = x_bar / s` | distinct sample statistic |

## Symbol contract

| Symbol | Meaning | Kind | Unit | Restriction |
|---|---|---|---|---|
| `X` | discrete random variable | modeled variable | none | outcome set and model declared |
| `x` | one possible outcome | event/value | none | belongs to support of `X` |
| `p(x)` | probability mass assigned to `x` | scalar probability | `1` | `0 <= p(x) <= 1` |
| `b` | logarithm base | scalar | none | `b > 0`, `b != 1` |
| `I(x)` | self-information of outcome `x` | scalar | bit for `b=2`, nat for `b=e` | infinite when an asserted outcome has modeled probability zero |
| `H(X)` | discrete Shannon entropy | expected self-information | bit or nat | normalized probability mass |
| `P_signal` | declared wanted-signal power | nonnegative quantity | power unit | same domain and bandwidth basis |
| `P_noise` | declared noise power | nonnegative quantity | same power unit | positive for finite ratio |
| `x_bar`, `s` | sample mean and standard deviation | sample statistics | common data unit | ratio-scale data for NIST form |

## Probability and unit contract

For discrete entropy:

```text
sum_x p(x) = 1
0 log_b(0) := 0 by limit
```

The logarithm base determines the unit. Changing base rescales the value; it
does not change semantic content because semantic content is outside this
measure's claim.

## SNR family contract

`SNR` is not one universal formula. The power-ratio form requires:

- wanted signal and noise defined by one task and decomposition;
- comparable power estimates;
- shared observation interval, bandwidth, and preprocessing;
- positive noise power for a finite quotient.

NIST's documented `x_bar/s` statistic is a different ratio requiring
ratio-scale data and a declared sampling interpretation. Values from the two
definitions are not interchangeable merely because both are called SNR.

An amplitude expression using `20 log10(A_signal/A_noise)` is valid only when
the relevant power ratio is the square of that amplitude ratio under shared
reference conditions.

## Failure signs

- Entropy is computed without a probability distribution.
- Logarithm base and bit/nat unit are omitted.
- A high-entropy message is called meaningful, true, or intelligent.
- Dataset byte count is called Shannon information without a coding/model
  contract.
- Signal and noise are selected after seeing the desired result.
- SNR numerator and denominator use different bandwidths or preprocessing.
- A mean/standard-deviation SNR is compared directly with a power-ratio SNR.
- `20 log10` is applied to an amplitude ratio without the required
  power-amplitude relation.
- Zero noise power is reported as an ordinary finite SNR.

## Reference Delta

The canonical
[Information, Data, Signal, and Noise entry](../entries/information-data-signal-noise.md)
owns the full comparison. Relative to a formula sheet, this view adds semantic
exclusions, probability ownership, task-relative signal/noise roles, estimator
identity, bandwidth, and logarithmic-unit contracts.

## Sources and provenance

1. Claude Shannon, "A Mathematical Theory of Communication" (1948):
   https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
2. NIST Dataplot, "Signal to Noise Ratio":
   https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/snr.htm
3. NIST Special Publication 811:
   https://www.nist.gov/pml/special-publication-811

Formula authority: Shannon discrete information measures and separately
scoped SNR conventions. Factorium presentation remains `candidate`.

