# Information, Data, Signal, and Noise

Status: candidate anchor entry

## Orientation

Information, data, signals, and noise occupy different layers. Semantic
information concerns meaning in context; data is a representation suitable
for storage, transmission, or processing; a signal carries or expresses
variation through a channel; noise is an unwanted or unmodeled component
relative to a task; Shannon information quantifies modeled surprise rather
than semantic meaning.

## Sense table

| Sense | Governing question | Role | Unit or basis |
|---|---|---|---|
| `semantic-information` | What meaningful content is communicated or understood in this context? | interpreted content or knowledge claim | domain-specific |
| `data` | In what representation is content recorded, transmitted, or processed? | encoded or formalized representation | symbols, records, bytes, or other medium |
| `signal` | What observable variation carries the wanted representation through this channel? | physical or mathematical carrier | quantity and domain specific |
| `noise` | What component is unwanted, interfering, or outside the selected model for this task? | model-relative disturbance or residual | quantity and domain specific |
| `self-information` | How surprising is this modeled outcome? | logarithmic function of event probability | bit, nat, or declared logarithmic unit |
| `shannon-entropy` | What average modeled self-information does this distribution imply? | probability-weighted uncertainty measure | bit, nat, or declared logarithmic unit |
| `signal-to-noise-ratio` | How does a declared signal measure compare with a declared noise measure? | ordered model-dependent ratio | dimension one or decibel display |

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
   x physical or logical signal
   x channel and observation domain
   x signal-noise decomposition rule
   x probability or statistical model
   x measurement interval and bandwidth
   x unit, logarithm base, and display scale
   x provenance and uncertainty
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Information vs. data | data can represent information | interpreted meaning/content vs. formalized representation |
| Data vs. signal | a signal can carry encoded data | symbolic/record structure vs. observable carrier variation |
| Signal vs. noise | both may be present in one observation | wanted/model-selected component vs. unwanted or residual component |
| Shannon information vs. meaning | messages participate in both | modeled surprise vs. semantic content, truth, or usefulness |
| Entropy vs. uncertainty generally | entropy quantifies one uncertainty model | probability-distribution functional vs. broader incomplete knowledge |
| SNR vs. quality | SNR may influence quality | declared numerical comparison vs. task-dependent fitness or intelligibility |

## Diagnostic examples

- The same byte sequence can be meaningless under one encoding and
  intelligible under another.
- A carrier waveform can be measured even when its message cannot be decoded.
- Background music is signal for a music-recognition task and noise for a
  speech-transcription task.
- A rare false statement can have high Shannon self-information without being
  true or useful.
- Two sources can have equal entropy while producing messages with completely
  different meanings.
- Two reported SNR values may be incomparable when one uses power ratio and
  another uses sample mean divided by standard deviation.

## Formula view

The linked [Information and Signal Formula Table](../formulas/information-signal-measures.md)
owns discrete Shannon information, entropy, and explicitly scoped SNR
relations.

## Selection procedure

1. Decide whether the question concerns meaning, representation, carrier,
   disturbance, modeled surprise, or measurement quality.
2. Name source, receiver, task, and semantic context.
3. Declare data representation, encoding, and interpretation convention.
4. Identify the signal quantity, channel, observation domain, and wanted
   component.
5. Define noise or residual relative to the task and model.
6. For Shannon measures, declare outcomes, probabilities, and logarithm base.
7. For SNR, declare numerator and denominator measures, estimator, bandwidth,
   interval, preprocessing, and display scale.
8. Keep semantic, statistical, and physical claims separate.

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
- Information claims identify semantic context and intended use.
- Signal identifies its physical or mathematical quantity and channel.
- Noise is relative to a task, wanted component, and decomposition rule.
- Shannon measures require a probability model and logarithm base.
- Shannon entropy is not semantic meaning, truth, importance, or intelligence.
- SNR identifies the exact signal and noise measures.
- Decibel reporting preserves the underlying ratio and reference conditions.
- Data size is not treated as automatic knowledge or useful information.
- A residual is not called random noise without evidence for that model.

## Cross-references

- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Periodic and Wave Quantity](periodic-wave-quantity.md)
- [Comparative Quantity](comparative-quantity.md)
- [Measure](../roots/measure.md)
- [Context](../roots/context.md)
- [Relation](../roots/relation.md)
- message - `unresolved-candidate`
- encoding - `unresolved-candidate`
- channel - `unresolved-candidate`
- mutual information - `unresolved-candidate`
- channel capacity - `unresolved-candidate`

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

Comparator access date: 2026-08-14. Source definitions remain
domain-scoped; Factorium organization remains `candidate`.

