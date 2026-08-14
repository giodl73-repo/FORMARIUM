# Role Binding and Ambiguity Research

Date: 2026-08-13

## Research question

How should FACTOR represent repeated participants, repeated role slots, and
genuinely ambiguous surfaces, and which exact and distributed controls must
govern the first role-binding bakeoff?

## Decision supported

This research governs Wave 2's analysis-set contract, generated fixtures,
role/filler representations, approximate-control boundary, split design, and
decision metrics.

## Local evidence

- `specs/SEMANTIC-FACTOR-SCHEMA.md` already permits distinct role factors to
  share one filler, such as `agent=robot` and `patient=robot`.
- The same specification rejects repeated keys and requires explicitly ordered
  slots for two occurrences of one role.
- `src/corpus.rs` associates every surface with exactly one meaning, so it
  cannot yet preserve multiple valid analyses.
- `specs/COMPOSITIONAL-SPLITS.md` groups paraphrases before splitting and
  provides the leakage discipline needed for analysis sets.
- `specs/STRONG-CONTROL-BAKEOFF.md` requires conventional factored controls and
  separates semantic, storage, parameter, temporary-memory, and runtime claims.
- `docs/research/2026-08-13-prior-art-and-benchmark-custody.md` already makes a
  TPR or VSA control mandatory for role-binding experiments.

## External sources

1. Copestake, Flickinger, Pollard, and Sag, *Minimal Recursion Semantics: An
   Introduction*, 2005:
   https://www.cl.cam.ac.uk/~aac10/papers/mrs-final.pdf
2. Manshadi, Gildea, and Allen, *A Notion of Semantic Coherence for
   Underspecified Semantic Representation*, 2018:
   https://aclanthology.org/J18-1003/
3. Palmer, Gildea, and Kingsbury, *The Proposition Bank: An Annotated Corpus of
   Semantic Roles*, 2005:
   https://www.cs.rochester.edu/~gildea/palmer-propbank-cl.pdf
4. Pradhan et al., *PropBank Comes of Age—Larger, Smarter, and More Diverse*,
   2022:
   https://aclanthology.org/2022.starsem-1.24/
5. Smolensky, *Tensor Product Variable Binding and the Representation of
   Symbolic Structures in Connectionist Systems*, 1990:
   https://doi.org/10.1016/0004-3702(90)90007-M
6. Plate, *Holographic Reduced Representations*, 1995:
   https://doi.org/10.1109/72.377968
7. Kleyko et al., *A Survey on Hyperdimensional Computing aka Vector Symbolic
   Architectures*, 2022:
   https://arxiv.org/abs/2111.06077

## Findings

### FACTOR-RA-01 - Repeated fillers are not repeated roles

**Sources:** `specs/SEMANTIC-FACTOR-SCHEMA.md`; Palmer et al. 2005.

**Observation:** One participant may fill multiple distinct roles, while two
occurrences of one role need separate slots. PropBank likewise assigns roles
relative to each predicate and does not by itself provide a global identity
layer.

**Implication:** Wave 2 must separate role identity, slot identity, and filler
identity. Equality of filler values must remain observable rather than being
collapsed into one role or duplicated entity.

**Confidence:** high.

### FACTOR-RA-02 - Ambiguity is not an unknown value

**Sources:** Copestake et al. 2005; Manshadi et al. 2018.

**Observation:** Computational semantic formalisms preserve ambiguity through
multiple analyses or underspecified constraints rather than replacing a
genuine choice with one generic unknown label.

**Implication:** FACTOR should add a corpus-level analysis set: one surface may
reference two or more complete valid meanings. `unknown` remains a declared
factor value for unresolved content, not a substitute for competing analyses.

**Confidence:** high.

### FACTOR-RA-03 - The flat schema need not become a full semantic formalism

**Sources:** local V1 schema; Copestake et al. 2005.

**Observation:** MRS earns additional machinery by handling scope,
underspecification, and broad grammar coverage. FACTOR's immediate need is only
to retain finite candidate meanings for generated bounded surfaces.

**Implication:** Keep Semantic Factor Schema v1 unchanged. Standardize analysis
sets and role-frame custody above complete V1 meanings. Defer scope handles,
graphs, quantifiers, and general MRS compatibility.

**Confidence:** high.

### FACTOR-RA-04 - Exact TPR is the reference distributed binding control

**Sources:** Smolensky 1990; Kleyko et al. 2022.

**Observation:** With declared orthogonal role and filler bases, tensor-product
binding and contraction provide an exact reference, but the role-by-filler
container grows multiplicatively.

**Implication:** Wave 2 must compare typed records and an exact sparse
role/filler matrix with the same assignments. TPR payload, container,
parameters, and unbinding accuracy remain explicit.

**Confidence:** high.

### FACTOR-RA-05 - HRR trades exactness for fixed dimensionality

**Sources:** Plate 1995; Kleyko et al. 2022.

**Observation:** Circular-convolution binding retains a fixed vector size but
introduces interference and approximate unbinding, commonly requiring cleanup
against a known filler dictionary.

**Implication:** HRR is a bounded approximate control, not an alias. Freeze
dimensions `64`, `128`, and `256`, seed `0x464143544f522d32`, circular
convolution, involution-based unbinding, and nearest-cosine cleanup before
scoring. Dimension `256` owns the decision; smaller dimensions remain retained
diagnostics.

**Confidence:** high.

### FACTOR-RA-06 - Ambiguity changes the evaluation unit

**Sources:** Copestake et al. 2005; local packet and numeracy contracts.

**Observation:** When one surface has multiple valid analyses, scoring one
arbitrarily selected meaning as the sole target destroys the phenomenon under
test.

**Implication:** Report exact candidate-set match, candidate precision,
candidate recall, per-role filler accuracy for unambiguous items, and
role/filler unbinding separately. Do not hide them in one weighted score.

**Confidence:** high.

### FACTOR-RA-07 - Analysis families must split as units

**Sources:** local `specs/COMPOSITIONAL-SPLITS.md`.

**Observation:** An ambiguous surface, its disambiguating paraphrases, and its
candidate meanings can leak one another if split independently.

**Implication:** Construct meanings first, then analysis sets, then surfaces.
Assign the complete analysis family to one split side unless the split is an
explicit surface-disambiguation transfer task.

**Confidence:** high.

### FACTOR-RA-08 - Two generated families are needed

**Sources:** local role review principles; Palmer et al. 2005.

**Observation:** Repeated slots and attachment ambiguity stress different
failure modes. One fixture cannot establish both ordered role binding and
multiple valid analyses.

**Implication:** Generate:

1. an ordered transfer family with giver, theme, recipient-primary,
   recipient-secondary, tense, and polarity, allowing repeated fillers;
2. an attachment family where one surface can denote either an instrument
   reading or a patient-associated-object reading, plus unambiguous
   paraphrases for both.

**Confidence:** high.

### FACTOR-RA-09 - External payloads are unnecessary for the bounded test

**Sources:** all external sources above; local foundation custody.

**Observation:** PropBank and MRS establish conventions and limitations, but
their corpora introduce licensing, preprocessing, and broad-language scope that
the first role experiment does not need.

**Implication:** Wave 2 remains fully generated. External datasets and grammar
implementations are methodological references only.

**Confidence:** high.

## Recommendations

### Adopt now

1. Add a canonical analysis-set layer above complete V1 meanings.
2. Keep referent/filler identity separate from role and ordered slot identity.
3. Generate both ordered-transfer and attachment-ambiguity families.
4. Retain typed records and exact sparse TPR as authoritative controls.
5. Freeze analysis-family grouping before split membership.
6. Report candidate-set and role-binding metrics separately.

Owner: FACTOR Wave 2. Validation: canonical round trips, reference integrity,
coverage, exact TPR unbinding, and role-panel review.

### Prototype behind a compatibility boundary

1. HRR at frozen dimensions `64/128/256` with decision owner `256`.
2. Explicit surface-disambiguation transfer after ordinary analysis-family
   leakage tests pass.
3. A later graph or underspecification adapter that consumes analysis sets
   without changing V1 meanings.

Owner: FACTOR Wave 2 controls. Validation: deterministic vectors, retained
dimension sweep, cleanup accuracy, storage accounting, and seed stability.

### Reject or defer

1. Treating ambiguity as `unknown`.
2. Full MRS, scope, quantifier, discourse, or coreference infrastructure.
3. Claiming role/filler binding as a FACTOR invention.
4. Selecting HRR dimensions after viewing results.
5. Copying PropBank, DeepBank, or other external payloads in Wave 2.
6. Broad semantic-parsing claims from generated role fixtures.

## Non-goals

- open-vocabulary semantic role labeling;
- discourse-level entity tracking;
- scope resolution or probabilistic reading selection;
- neural sentence encoding;
- runtime or hardware advantage;
- a universal inventory of semantic roles.
