# Observation, Measurement, and Inference Research

Status: complete

Decision supported: extend the existing Claim and Evidence anchor rather than
create a duplicate entry, and define a traceable evidence-chain view that
keeps observation, measurement, result, inference, evidence, confidence,
limitation, and provenance distinct.

## Findings

### FACTORIUM-EVI-01 - The current anchor leaves method stages implicit

Source: `tables/entries/claim-evidence.md`, orientation, sense table, and root
factorization.

Observed constraint: the entry already separates claim, evidence item, result,
limitation, confidence, and provenance, but observation and inference appear
only inside broad phrases. Measurement is not a canonical sense.

Implication: extend the stable `claim-evidence` identity with new senses rather
than admit a competing evidence headword.

Confidence: high.

### FACTORIUM-EVI-02 - Evidence Tables compare support, not mere custody

Source: `specs/REFERENCE-TABLE-FAMILIES.md`, Evidence Table family and overlap
rules.

Observed constraint: provenance is mandatory for every view, while an
Evidence Table exists only when comparing claims, sources, methods, results,
limitations, or confidence is the lookup task.

Implication: the new view must map the reasoning chain and implications, not
merely repeat provenance metadata.

Confidence: high.

### FACTORIUM-EVI-03 - Measurement is a process, not a number

Source: JCGM VIM, definition 2.1, "measurement":
https://jcgm.bipm.org/vim/en/2.1.html

Observed constraint: measurement is a process for experimentally obtaining
quantity values attributable to a quantity. It presupposes a quantity
description, procedure, measuring system, and conditions.

Implication: keep measurement separate from observation and from the result it
produces. Require measurand, model, procedure, system, conditions, calibration
or reference, and uncertainty treatment.

Confidence: high.

### FACTORIUM-EVI-04 - A measurement result includes relevant information

Source: JCGM VIM, definition 2.9, "measurement result":
https://jcgm.bipm.org/vim/en/2.9.html

Observed constraint: a measurement result is a set of attributed quantity
values together with available relevant information and is generally
expressed with measurement uncertainty.

Implication: a bare number is not a complete measurement result. Factorium's
`result` sense remains broader than measurement result, while the measurement
path requires value, unit/reference, uncertainty, conditions, and method
identity.

Confidence: high.

### FACTORIUM-EVI-05 - Uncertainty and confidence are not synonyms

Source: NIST, "Measurement Uncertainty":
https://www.nist.gov/itl/sed/topic-areas/measurement-uncertainty

Observed constraint: measurement uncertainty characterizes incomplete
knowledge and dispersion of values attributable to the measurand. Confidence
can also be used for statistical coverage or broader support judgments under
declared criteria.

Implication: keep quantity uncertainty attached to a measurement result.
Keep Factorium confidence as a declared summary of support; it must name its
criteria and must not replace uncertainty, evidence, or limitations.

Confidence: high.

### FACTORIUM-EVI-06 - Provenance records production and derivation

Source: W3C, PROV-O:
https://www.w3.org/TR/prov-o/

Observed constraint: PROV distinguishes entities, activities, and agents and
records use, generation, derivation, attribution, association, and delegation.

Implication: provenance can reconstruct where an observation, result, or
derived artifact came from. It does not determine whether the artifact
supports a claim or whether the inference is valid.

Confidence: high.

### FACTORIUM-EVI-07 - Observation is broader than measurement

Sources:

1. JCGM VIM, definition 2.1:
   https://jcgm.bipm.org/vim/en/2.1.html
2. W3C PROV-O:
   https://www.w3.org/TR/prov-o/

Observed constraint: measurement is restricted to experimentally obtaining
quantity values, while evidence records may also contain categorical
observations, events, documents, images, testimony, logs, or computed
artifacts.

Implication: define observation as a recorded encounter or detected state
under a method and context. Select measurement only when a quantity,
procedure, and attributed value are involved.

Confidence: medium-high.

### FACTORIUM-EVI-08 - Inference is neither observation nor result

Sources:

1. NIST, "Measurement Uncertainty":
   https://www.nist.gov/itl/sed/topic-areas/measurement-uncertainty
2. Existing Factorium policy and evidence entries:
   `tables/entries/policy-rule-constraint-decision-exception.md` and
   `tables/entries/claim-evidence.md`.

Observed constraint: conclusions depend on rules, models, assumptions,
comparisons, and uncertainty. The same recorded result can support different
conclusions under different scopes.

Implication: add an `inference` sense with explicit premises, method/model,
assumptions, alternatives, and conclusion. Evidence status remains
claim-relative rather than intrinsic to the source artifact.

Confidence: high.

## Recommendations

### Adopt now

- Extend `claim-evidence` with `observation`, `measurement`, and `inference`.
- Preserve existing published sense and factor IDs; append new identities.
- Add an Evidence Table that exposes the full
  source-to-observation-to-result-to-inference-to-claim chain.
- Require contradictions, nulls, limitations, uncertainty, and alternate
  explanations.

Owner: Factorium.

Validation: reference round trip, deterministic projections, full test suite,
role review, and link integrity.

### Prototype behind a compatibility boundary

- Keep typed provenance and inference-edge payloads in Markdown under V0.
- Consider a versioned evidence graph only when several views need automated
  derivation-chain or claim-impact queries.

Owner: a future Factorium interchange successor.

Validation: preserve the stable `claim-evidence` entry and all published sense
IDs.

### Reject or defer

- Reject treating every observation as a measurement.
- Reject treating a result as a conclusion.
- Reject treating provenance as proof, or confidence as evidence.
- Defer universal statistical confidence scales, domain-specific evidence
  hierarchies, and automated inference engines.

Non-goal: prescribe one scientific method or epistemology.
