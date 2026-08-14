# Information, Data, Signal, and Noise Research

Status: candidate research basis

## Research question

How should Factorium separate semantic information, represented data,
communication signals, model-relative noise, Shannon information, entropy,
and signal-to-noise ratios without treating them as synonyms?

Decision supported: publication of one polysemous anchor with a Formula view
for Shannon measures and explicitly scoped SNR conventions.

## Local evidence

- `tables/entries/probability-risk-uncertainty.md` requires a declared
  probability model and separates uncertainty representations.
- `tables/entries/periodic-wave-quantity.md` separates a physical or
  mathematical wave from its temporal, spatial, and phase measures.
- `tables/entries/comparative-quantity.md` requires ordered ratio roles,
  units, denominator domain, and display scale.
- Founding FACTOR evidence already distinguishes semantic structure from
  representation controls and rejects unsupported broad NLP claims.

## Findings

### FACTORIUM-IDSN-01 - Data is a representation, not automatically meaning

Source:

- NIST CSRC Glossary, "data":
  https://csrc.nist.gov/glossary/term/data

Observed constraint: NIST sources repeatedly define data as a formalized,
stored, transmitted, or processable representation of information, facts,
concepts, or instructions.

Implication: Factorium should represent data through content, encoding,
medium, schema, context, and interpretation rather than equate bytes with
knowledge.

Confidence: high.

### FACTORIUM-IDSN-02 - Information has semantic and technical quantity senses

Source:

- NIST CSRC Glossary, "information":
  https://csrc.nist.gov/glossary/term/information
- Claude Shannon, "A Mathematical Theory of Communication" (1948):
  https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf

Observed constraint: NIST sources include meaning- and knowledge-oriented
definitions, while Shannon's communication theory deliberately abstracts away
semantic meaning to quantify choice and uncertainty.

Implication: semantic information and Shannon information must be different
senses under one headword, not competing definitions forced into one formula.

Confidence: high.

### FACTORIUM-IDSN-03 - Shannon entropy belongs to a probability model

Source:

- Claude Shannon, "A Mathematical Theory of Communication" (1948):
  https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf

Observed constraint: discrete entropy depends on a set of possible outcomes,
their probabilities, and a logarithm base. Base two reports bits; base `e`
reports nats.

Implication: entropy does not attach to a message or dataset without a random
variable, outcome model, distribution, and unit convention.

Confidence: high.

### FACTORIUM-IDSN-04 - Shannon information does not measure truth or meaning

Source:

- Claude Shannon, "A Mathematical Theory of Communication" (1948):
  https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf

Observed constraint: Shannon states that semantic aspects are irrelevant to
the engineering communication problem. Rare outcomes may have high
self-information whether their messages are true, useful, harmful, or
meaningless.

Implication: Factorium must visibly reject entropy as a universal measure of
knowledge, semantic richness, importance, or correctness.

Confidence: high.

### FACTORIUM-IDSN-05 - Signal and noise roles depend on a communication model

Source:

- Shannon (1948):
  https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- ITU-R V.662-2, terms and definitions:
  https://www.itu.int/dms_pubrec/itu-r/rec/v/R-REC-V.662-2-199304-S!!PDF-E.pdf

Observed constraint: a transmitter produces a signal for a channel; noise is
a superimposed or combined phenomenon apparently not conveying the wanted
information. The same physical component can be wanted signal in one task and
interference in another.

Implication: signal/noise classification requires source, receiver, channel,
task, observation band, and decomposition rule.

Confidence: high.

### FACTORIUM-IDSN-06 - Signal-to-noise ratio is a family, not one universal statistic

Source:

- NIST Dataplot, "Signal to Noise Ratio":
  https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/snr.htm

Observed constraint: NIST documents a sample mean-to-standard-deviation SNR
and explicitly notes that numerous other definitions are in common use.
Communications commonly uses desired-signal power divided by noise power.

Implication: every SNR must name numerator and denominator measures, estimator,
bandwidth, observation interval, preprocessing, and display scale.

Confidence: high.

### FACTORIUM-IDSN-07 - Decibels report a logarithmic ratio

Source:

- NIST Special Publication 811:
  https://www.nist.gov/pml/special-publication-811

Observed constraint: a power ratio is commonly expressed as
`10 log10(P_signal/P_noise)` decibels. A `20 log10` amplitude form requires
conditions that make power proportional to amplitude squared under a shared
reference relation.

Implication: Factorium must not let a decibel value hide the underlying
quantity kind or reference.

Confidence: high.

## Recommendations

### Adopt now

- Publish one anchor separating semantic information, data representation,
  communication signal, noise role, Shannon information, entropy, and SNR.
- Publish a Formula view for self-information, entropy, power-ratio SNR, and
  decibel display with explicit model contracts.
- Preserve founding FACTOR's narrow distinction between semantics and
  representation.

Owner: Factorium.

Validation: Research Integrity, Evidence & Claims, Equation & Units, Reference
Lexicographer, role registry, and link checks.

### Prototype behind a compatibility boundary

- Treat mutual information, channel capacity, differential entropy, coding,
  filtering, and spectral density as later specialized entries.
- Defer typed source/channel/receiver records to R2.

### Reject or defer

- Reject Shannon entropy as semantic meaning, truth, intelligence, or value.
- Reject one unlabeled SNR number as comparable across measurement methods.
- Reject data volume as an automatic information or knowledge measure.

## Non-goals

- teaching information theory, signal processing, or data governance;
- defining every signal or noise convention;
- claiming Factorium resolves philosophical theories of information;
- reopening broad NLP claims rejected by founding evidence.

