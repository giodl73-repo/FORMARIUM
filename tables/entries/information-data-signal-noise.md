# Information, Data, Record, Schema, Signal, and Noise

Status: candidate anchor entry

## Orientation

Information, data, encoding, signals, channels, and noise occupy different
layers. Semantic information concerns meaning in context; data is a
representation; encoding maps admitted source objects into representations
under a decoding contract; a channel relates inputs to possible outputs under
a declared model; noise is unwanted or unmodeled variation relative to a task.
Shannon measures quantify modeled surprise or dependence rather than meaning.

## Sense table

| Sense | Governing question | Role | Unit or basis |
|---|---|---|---|
| `semantic-information` | What meaningful content is communicated or understood in this context? | interpreted content or knowledge claim | domain-specific |
| `data` | In what representation is content recorded, transmitted, or processed? | encoded or formalized representation | symbols, records, bytes, or other medium |
| `record` | Which grouped data items describe one identified subject, event, assertion, or transaction under a record contract? | addressable data grouping | schema- and domain-specific |
| `schema` | Which governed structure, names, types, constraints, and interpretation rules apply to admitted data? | data-structure contract | language- and domain-specific |
| `field` | Which named role within a schema carries one admitted value or nested structure? | schema-relative component | declared type/cardinality |
| `signal` | What observable variation carries the wanted representation through this channel? | physical or mathematical carrier | quantity and domain specific |
| `noise` | What component is unwanted, interfering, or outside the selected model for this task? | model-relative disturbance or residual | quantity and domain specific |
| `self-information` | How surprising is this modeled outcome? | logarithmic function of event probability | bit, nat, or declared logarithmic unit |
| `shannon-entropy` | What average modeled self-information does this distribution imply? | probability-weighted uncertainty measure | bit, nat, or declared logarithmic unit |
| `signal-to-noise-ratio` | How does a declared signal measure compare with a declared noise measure? | ordered model-dependent ratio | dimension one or decibel display |
| `encoding` | By what declared mapping is a source object represented, and under what inverse or decoding conditions? | versioned source-to-representation mapping | symbols, code units, or declared representation |
| `channel` | What conditional relation connects admitted channel inputs to possible outputs? | physical or logical transition model | transition law and domain specific |
| `mutual-information` | How much statistical dependence does the joint model assign to two random variables? | joint-versus-marginal dependence measure | bit, nat, or declared logarithmic unit |
| `channel-capacity` | What is the supremal information rate allowed by this fixed channel model and admissible input class? | constrained optimization bound | bit or nat per channel use, or declared rate basis |

## Layer ladder

```text
meaning in context
  -- represented by --> data

data or message
  -- expressed through channel variables --> signal

observed variation
  -- decomposed by task and model --> wanted signal + noise or residual

modeled outcome probabilities
  -- transformed logarithmically --> self-information and entropy

source objects
  -- mapped by encoding contract --> representations
  -- transformed by channel law --> received observations

joint input-output model
  -- compared with product of marginals --> mutual information
  -- optimized over admissible inputs --> channel capacity

schema and version
  -- govern --> records, fields, values, and constraints
```

These arrows describe relationships, not identity. The same data can support
different interpretations, and the same observed component can be signal or
noise under different tasks.

## Root factorization

```text
information-signal-use
  := source and intended receiver
   x semantic context and task
   x message or content
   x data representation and encoding
   x record subject, identity, grouping, and lifecycle
   x schema authority, version, structure, constraints, and evolution
   x field name, role, type, cardinality, null/missing semantics, and unit
   x physical or logical signal
   x channel and observation domain
   x signal-noise decomposition rule
   x probability or statistical model
   x measurement interval and bandwidth
   x unit, logarithm base, and display scale
   x provenance and uncertainty
   x source and representation alphabets or object spaces
   x encoding mapping, version, and decoding contract
   x channel input-output law and memory assumptions
   x admissible input distribution and resource constraints
   x estimator, sample, and preprocessing
   x rate normalization and channel-use clock
   x coding regime, error criterion, and asymptotic scope
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Information vs. data | data can represent information | interpreted meaning/content vs. formalized representation |
| Data vs. record | records contain data | representation generally vs. governed grouping about a subject/event/assertion |
| Record vs. row/document/message | each may implement a record | semantic grouping and identity vs. mechanism-specific container |
| Schema vs. data | schema governs admitted data | structure/interpretation contract vs. represented instances |
| Field vs. value | a field carries values | schema-relative role vs. one admitted content instance |
| Data vs. signal | a signal can carry encoded data | symbolic/record structure vs. observable carrier variation |
| Signal vs. noise | both may be present in one observation | wanted/model-selected component vs. unwanted or residual component |
| Shannon information vs. meaning | messages participate in both | modeled surprise vs. semantic content, truth, or usefulness |
| Entropy vs. uncertainty generally | entropy quantifies one uncertainty model | probability-distribution functional vs. broader incomplete knowledge |
| SNR vs. quality | SNR may influence quality | declared numerical comparison vs. task-dependent fitness or intelligibility |
| Encoding vs. meaning | encoded data may carry a message | representation mapping vs. interpretation, truth, or understanding |
| Encoding vs. channel | both affect received data | chosen representation map vs. modeled input-output transition law |
| Channel vs. medium | a medium may implement a channel | conditional communication model vs. physical material, path, or protocol instance |
| Mutual information vs. semantic similarity | both may be called shared information | statistical dependence in a joint model vs. interpreted similarity or common meaning |
| Mutual information vs. causation | causal systems can induce dependence | symmetric association measure vs. directional intervention claim |
| Capacity vs. achieved rate | both use information-rate units | optimized model bound vs. observed or engineered operating rate |

## Diagnostic examples

- The same byte sequence can be meaningless under one encoding and
  intelligible under another.
- Two rows with equal fields may be different records when subject, source, or
  record identity differs; identical shape does not establish identity.
- A carrier waveform can be measured even when its message cannot be decoded.
- Background music is signal for a music-recognition task and noise for a
  speech-transcription task.
- A rare false statement can have high Shannon self-information without being
  true or useful.
- Two sources can have equal entropy while producing messages with completely
  different meanings.
- Two reported SNR values may be incomparable when one uses power ratio and
  another uses sample mean divided by standard deviation.
- The same bytes decode differently when the encoding version, alphabet, or
  normalization changes; byte equality alone does not establish meaning.
- A cable, radio path, queue, or software interface can help realize a channel,
  but none is the channel model until inputs, outputs, conditions, and
  transition behavior are declared.
- High mutual information can arise from common causes, deterministic copying,
  or leakage; it does not by itself identify causation or semantic agreement.
- A measured throughput below a computed capacity is not a contradiction: the
  bound and the operating result may use different constraints, errors, coding
  regimes, time bases, or overhead accounting.

## Formula view

The linked [Information and Signal Formula Table](../formulas/information-signal-measures.md)
owns discrete Shannon information, entropy, mutual information, discrete
memoryless channel capacity, and explicitly scoped SNR relations.

The linked [Information, Encoding, Channel, and Capacity Failure Diagnostic](../diagnostics/information-encoding-channel-failures.md)
tests layer, mapping, estimation, constraint, and rate-normalization failures.

## Selection procedure

1. Decide whether the question concerns meaning, representation, carrier,
   disturbance, modeled surprise, or measurement quality.
2. Name source, receiver, task, and semantic context.
3. Declare data representation, encoding, interpretation convention, record
   subject/identity, schema/version, and field missing/null semantics.
4. Identify the signal quantity, channel, observation domain, and wanted
   component.
5. Define noise or residual relative to the task and model.
6. For Shannon measures, declare outcomes, probabilities, and logarithm base.
7. For SNR, declare numerator and denominator measures, estimator, bandwidth,
   interval, preprocessing, and display scale.
8. For encoding, freeze source and target spaces, mapping direction, version,
   normalization, decoder, invalid values, and round-trip claim.
9. For a channel, declare input/output variables, transition law, memory and
   stationarity assumptions, time or use basis, and operating constraints.
10. For mutual information, declare the joint model or estimator, sample,
    preprocessing, logarithm base, and uncertainty or bias assessment.
11. For capacity, declare the admissible input class, resource constraints,
    channel law, error criterion, coding regime, and normalization.
12. Keep semantic, statistical, causal, physical, and operational claims separate.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines information, data, signal, noise, entropy, and ratio senses | Separates semantic, representational, physical, and probabilistic layers |
| Thesaurus | Links knowledge, facts, message, evidence, indication, disturbance, and uncertainty | Prevents lexical proximity from erasing model and task roles |
| Encyclopedia or textbook | Explains communication, information theory, encoding, and signal processing | Supplies a compact layer-selection and misuse-detection schema |
| Formula sheet | Lists entropy and SNR equations | Adds source, receiver, task, model, estimator, bandwidth, and unit contracts |
| Standard or glossary | Owns domain-specific definitions and reporting conventions | Preserves scope instead of universalizing one data, signal, or SNR definition |

## Constraints and failure signs

- Data identifies its representation and interpretation convention.
- Records state grouping subject, identity, schema/version, lifecycle, and
  provenance; rows, documents, and messages remain possible mechanisms.
- Schemas state authority, interpretation, constraints, and evolution; a field
  name or storage type alone does not define meaning.
- Information claims identify semantic context and intended use.
- Signal identifies its physical or mathematical quantity and channel.
- Noise is relative to a task, wanted component, and decomposition rule.
- Shannon measures require a probability model and logarithm base.
- Shannon entropy is not semantic meaning, truth, importance, or intelligence.
- SNR identifies the exact signal and noise measures.
- Decibel reporting preserves the underlying ratio and reference conditions.
- Data size is not treated as automatic knowledge or useful information.
- A residual is not called random noise without evidence for that model.
- Encoding claims identify source and target spaces, direction, version,
  decoder, and exact, normalized, or lossy round-trip status.
- A channel is not reduced to its physical medium or protocol name; its
  input-output law, state, assumptions, and constraints remain explicit.
- Mutual information is not semantic meaning, causal effect, usefulness, or an
  automatically unbiased sample statistic.
- Channel capacity is not an observed throughput, guaranteed code rate, or
  universal device limit; it belongs to a fixed model and constraint set.
- Bits per channel use, bits per second, and bits per second per hertz are not
  interchanged without an explicit normalization.
- Named encodings, protocols, media, channel families, and codes remain
  examples or external taxonomies unless they introduce a reusable distinction.

## Cross-references

- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Periodic and Wave Quantity](periodic-wave-quantity.md)
- [Comparative Quantity](comparative-quantity.md)
- [Measure](../roots/measure.md)
- [Context](../roots/context.md)
- [Relation](../roots/relation.md)
- [Software Transaction, Message, and Contract](software-transaction-message-contract.md)
- [Causal Reasoning](causal-reasoning.md)
- [Sampling and Generalization](sampling-generalization.md)
- [Identity, Namespace, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Data Structure Mapping](../mappings/data-structure.md)

## Sources and provenance

1. NIST CSRC Glossary:
   https://csrc.nist.gov/glossary/term/data
   https://csrc.nist.gov/glossary/term/information
2. Claude Shannon, "A Mathematical Theory of Communication" (1948):
   https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
3. ITU-R V.662-2, terms and definitions:
   https://www.itu.int/dms_pubrec/itu-r/rec/v/R-REC-V.662-2-199304-S!!PDF-E.pdf
4. NIST Dataplot, "Signal to Noise Ratio":
   https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/snr.htm
5. NIST Special Publication 811:
   https://www.nist.gov/pml/special-publication-811
6. ITU-T X.209, Basic Encoding Rules for ASN.1:
   https://www.itu.int/rec/T-REC-X.209-198811-W/en
7. ITU, *Handbook on Satellite Communications*:
   https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf

Comparator access date: 2026-08-15. Source definitions remain
domain-scoped; Factorium organization remains `candidate`.
