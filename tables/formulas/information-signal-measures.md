# Information and Signal Measures

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Information, Data, Signal, and Noise](../entries/information-data-signal-noise.md)

## Orientation

These relations quantify modeled surprise, average discrete uncertainty,
statistical dependence, a constrained discrete-channel bound, and selected
signal-to-noise comparisons. They do not measure semantic meaning, causation,
truth, usefulness, achieved throughput, or universal signal quality.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Self-information | `I(x) = -log_b p(x)` | definition |
| Discrete Shannon entropy | `H(X) = -sum_x p(x) log_b p(x)` | expectation/definition |
| Discrete mutual information | `I(X;Y) = sum_(x,y) p(x,y) log_b[p(x,y)/(p(x)p(y))]` | joint-versus-marginal divergence/definition |
| Entropy identity | `I(X;Y) = H(X) + H(Y) - H(X,Y)` | exact identity for one discrete joint model |
| Conditional-entropy identity | `I(X;Y) = H(X) - H(X|Y)` | exact identity for one discrete joint model |
| Discrete memoryless channel capacity | `C = sup_(p(x) in A) I(X;Y)` | constrained optimization definition |
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
| `Y`, `y` | discrete output random variable and one value | modeled variable/value | none | output alphabet and model declared |
| `p(x,y)` | joint probability mass | scalar probability | `1` | normalized and consistent with both marginals |
| `p(y)` | output marginal probability mass | scalar probability | `1` | induced by the joint model and normalized |
| `p(y|x)` | channel transition probability | conditional probability | `1` | fixed discrete memoryless channel law |
| `I(X;Y)` | mutual information | dependence measure | bit for `b=2`, nat for `b=e` | one joint model; sum only on positive joint mass |
| `H(Y)` | output entropy | expected self-information | bit or nat | same joint model and logarithm base |
| `H(X,Y)` | joint entropy | expected joint self-information | bit or nat | same joint model and logarithm base |
| `H(X|Y)` | conditional entropy | expected residual uncertainty | bit or nat | same joint model and logarithm base |
| `A` | admissible input-distribution set | constraint set | none | alphabet, cost, power, or other restrictions declared |
| `C` | capacity of the declared channel model | optimized information per use | bit or nat per channel use | rate conversion requires a declared use clock or time model |
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

## Dependence and capacity contract

For finite discrete variables, the joint mass determines its marginals and
conditional distributions. Terms with `p(x,y)=0` contribute zero by limit;
positive joint mass requires positive corresponding marginals. Mutual
information is symmetric and nonnegative, and equals zero exactly when the
modeled variables are independent. Those facts do not make it a causal,
semantic, or utility measure.

The capacity expression here is limited to a fixed discrete memoryless channel
with declared alphabets and transition law `p(y|x)`. The optimization varies
only the input distribution within `A`; it does not vary the physical channel,
decoder contract, constraint set, or normalization. For a finite alphabet the
supremum is commonly attained, but `sup` keeps the governing bound visible.
Memory, feedback, state, continuous alphabets, finite block length, latency,
and cost constraints can require different capacity definitions.

Capacity in bits per channel use is not yet bits per second. A time rate needs
a declared use clock or block-duration model; spectral efficiency needs an
additional bandwidth definition. A coding theorem is an asymptotic existence
claim under its hypotheses, not a guarantee that a selected implementation
achieves the bound.

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
- Mutual information is computed from incompatible marginals and joint counts.
- A plug-in estimate is reported without sample size, smoothing,
  discretization, bias, uncertainty, or held-out leakage checks.
- Positive mutual information is called causal influence or shared meaning.
- Capacity is optimized while silently changing the channel law or constraints.
- One chosen input distribution's mutual information is called capacity.
- Bits per use, bits per second, and bits per second per hertz are treated as
  the same quantity.
- An observed throughput or nominal line rate is labeled channel capacity.

## Reference Delta

The canonical
[Information, Data, Signal, and Noise entry](../entries/information-data-signal-noise.md)
owns the full comparison. Relative to a formula sheet, this view adds semantic
and causal exclusions, probability ownership, channel-law and admissible-input
scope, estimator identity, task-relative signal/noise roles, bandwidth,
normalization, coding-regime, and logarithmic-unit contracts.

## Sources and provenance

1. Claude Shannon, "A Mathematical Theory of Communication" (1948):
   https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
2. NIST Dataplot, "Signal to Noise Ratio":
   https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/snr.htm
3. NIST Special Publication 811:
   https://www.nist.gov/pml/special-publication-811
4. ITU, *Handbook on Satellite Communications*:
   https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf

Formula authority: Shannon discrete information measures and separately
scoped SNR conventions. Factorium presentation remains `candidate`.
