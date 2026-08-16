# Information, Encoding, Channel, and Capacity Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Information, Data, Signal, and Noise](../entries/information-data-signal-noise.md)

Canonical senses: `semantic-information`, `data`, `signal`, `noise`,
`self-information`, `shannon-entropy`, `signal-to-noise-ratio`, `encoding`,
`channel`, `mutual-information`, `channel-capacity`

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Equal bytes produce different content | encoding version, alphabet, normalization, locale, or decoder differs | round-trip declared source objects through both versioned contracts | mapping owner |
| Re-encoding changes identifiers or ordering | normalization, loss, unsupported values, or many-to-one mapping | compare exact and normalized round trips, including invalid and boundary values | data-contract owner |
| A shared encoding is claimed to prove shared meaning | interpretation, schema, referent, context, or receiver differs | hold bytes fixed and vary the declared semantic context and decoder | semantic owner |
| A cable or protocol name is treated as the channel | input/output variables, state, transition law, timing, or conditions are absent | estimate or specify conditional output behavior under fixed inputs and conditions | channel-model owner |
| Channel behavior changes across runs | memory, drift, interference, state, nonstationarity, or changed preprocessing | randomize inputs and stratify transition estimates by history and condition | experimental owner |
| Positive mutual information is called causation | common cause, reverse direction, deterministic copying, or leakage remains possible | intervene or use a causal design with explicit alternatives and assumptions | causal-claim owner |
| High mutual information is called shared meaning | dependence reflects syntax, identity, timing, or nuisance variables | perturb meaning while preserving surface dependence and test task behavior | semantic owner |
| Mutual-information estimate rises after feature construction | target leakage, duplicate identities, adaptive binning, smoothing, or estimator bias | freeze preprocessing and evaluate on independent held-out identities | estimation owner |
| Two mutual-information values disagree | logarithm base, sample, discretization, estimator, conditioning, or support differs | recompute from one frozen joint table and report uncertainty | numeracy owner |
| One input distribution's result is called capacity | optimization over admissible inputs was not performed | vary the input distribution within the fixed constraint set | information-theory owner |
| Measured throughput is called channel capacity | overhead, finite block length, latency, errors, implementation, or constraints differ | reconcile payload rate, use clock, error criterion, and model bound | performance owner |
| Rates agree numerically but use different bases | bits/use, bits/s, symbols/s, or bits/s/Hz were conflated | dimensional audit and explicit conversion through use rate and bandwidth | units owner |
| Named codes, formats, protocols, and media multiply as senses | implementation catalog replaced reusable mapping and channel criteria | swap the examples and verify the conceptual ladder survives | concept-taxonomy editor |

## Use contract and claim boundary

Preserve source and target spaces, mapping direction and version, decoder,
normalization and loss, channel inputs and outputs, transition law, history and
state, constraints, samples, preprocessing, estimator, logarithm base,
uncertainty, use clock, bandwidth, error criterion, coding regime, and raw
observations. Passing a round trip establishes only the declared mapping;
positive mutual information establishes modeled dependence; and a capacity
calculation establishes only a bound for the frozen model and constraints.
None proves meaning, truth, causation, usefulness, interoperability, achieved
performance, security, or safe operation.

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-information-encoding-channel-capacity.md)
2. Claude Shannon, "A Mathematical Theory of Communication" (1948):
   https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
3. ITU-T X.209, Basic Encoding Rules for ASN.1:
   https://www.itu.int/rec/T-REC-X.209-198811-W/en
4. ITU, *Handbook on Satellite Communications*:
   https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf

This diagnostic does not certify interoperability, performance, security, or safety.
