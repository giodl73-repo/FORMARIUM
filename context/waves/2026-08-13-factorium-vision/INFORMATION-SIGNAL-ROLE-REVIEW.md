# Information, Data, Signal, and Noise Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-information-data-signal-noise.md`
- `tables/entries/information-data-signal-noise.md`
- `tables/formulas/information-signal-measures.md`
- related index and cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Meaning, representation, carrier, disturbance, model, and measure remain separate. |
| Experimental Methodologist | pass | SNR estimator, interval, bandwidth, preprocessing, and task are required. |
| Representation Control Auditor | pass | Data representation is not credited with semantic or model benefit by itself. |
| Data Split & Leakage Auditor | defer | No training or evaluation split is introduced. |
| Factorization Method Steward | pass | The layer ladder joins related concepts without collapsing them. |
| Evidence & Claims Editor | pass after findings | Shannon claims remain narrow and founding FACTOR boundaries are preserved. |
| Benchmark Numeracy Checker | pass | Probability normalization, log bases, ratio domains, and dB mappings are explicit. |
| Reference Lexicographer | pass after findings | Polysemy of information, signal, noise, and entropy remains visible. |
| Reference Architecture Editor | pass | One anchor owns senses and one Formula view owns scoped quantitative relations. |
| Research Integrity & Provenance | pass | NIST, Shannon, and ITU claims have visible source custody. |
| Cross-Paradigm Mapping Auditor | defer | No mechanism assignment is introduced. |
| Domain Source Reviewer | pass for candidate | Sources support communication and information-theory pilot depth. |
| Equation & Units Auditor | pass after findings | Model, base, units, estimator identity, and ratio restrictions are explicit. |
| Mapping Integrity Auditor | pass | Decibel display is a scoped logarithmic mapping, not a new semantic quantity. |
| Schema Implementer | defer | Source/channel typed records remain deferred to R2. |
| Benchmark Consumer | pass | The entry does not broaden founding FACTOR evidence claims. |
| Reference Practitioner | pass | Selection procedure separates semantic, representational, physical, and statistical questions. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| ISF-001 | critical | Data could be equated with information or knowledge. | Closed: representation and interpreted semantic content are separate layers. |
| ISF-002 | critical | Shannon entropy could be called semantic meaning. | Closed: the anchor and Formula view explicitly exclude meaning, truth, usefulness, and intelligence. |
| ISF-003 | critical | Entropy could omit its probability model. | Closed: outcomes, normalized probabilities, and logarithm base are mandatory. |
| ISF-004 | major | Signal and noise could be treated as intrinsic labels. | Closed: source, receiver, task, channel, and decomposition rule own the roles. |
| ISF-005 | critical | One SNR formula could be universalized. | Closed: power-ratio and NIST sample-statistic forms are separate family members. |
| ISF-006 | major | Decibels could hide the underlying ratio. | Closed: the power ratio and conditional amplitude mapping remain explicit. |
| ISF-007 | major | Data size could be treated as useful information. | Closed: coding/model and semantic interpretations are separately required. |
| ISF-008 | critical | The cluster could broaden FACTOR's NLP claims. | Closed: founding evidence boundaries and non-goals are explicitly retained. |

No critical or major finding remains open.

