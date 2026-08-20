---
topic: instantiation-realization-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Type, Token, Instantiation, Realization, and Embodiment

## Decision question

Does Lexicon need one owner for the relation by which something abstract,
general, functional, or latent becomes a particular, concrete, or bodily case,
separate from classification, from representation, and from projected identity?

## Scope decision

This brief closes the half deferred by the
[persona and avatar brief](persona-avatar-candidate-brief-2026-08-20.md). That
family owns figures an agent projects to an audience; this one owns the
abstract-to-concrete relation itself.

"Manifestation" is deliberately absent from the title. It is a term of art in
bibliographic conceptual models, a disposition-display term, a clinical sign
term, a religious term, and, in several languages, a public demonstration. It
is admitted only in the bounded dispositional sense as
`disposition-manifestation`, and every use is guarded by an explicit sense
check. "Embodiment" is admitted because the bearer relation is not covered by
classification or representation, but it is bounded to the bearer and
constitution question and is not a commitment to any position on mind and body.

The bibliographic work, expression, manifestation, and item chain is external
and standard-owned; if Lexicon needs it, the correct form is a mapping view,
not a sense here.

## Bounded thesis

Proceed only as an abstract-to-concrete relation entry. Classification and
versioning of identified entities, model and representation, perceptual
appearance, projected personas and avatars, staged change, and recurrence
retain their existing or candidate owners.

The thesis is falsified if type, token, instantiation, realization, and
embodiment can be recorded completely as classification of an entity plus
representation of a model without losing the instantiation criterion, the
multiple-realization case, the unmanifested disposition, or the bearer
relation; or if the homonyms of manifestation and embodiment cannot be bounded
without emptying the family.

## Proposed senses

| Sense | Governing question |
|---|---|
| `general-type` | Which repeatable kind, universal, or general is at issue, and by which individuation criterion? |
| `token-instantiation` | Which particular is an instance of which type, and under which instantiation criterion? |
| `realization` | Which concrete or lower-level arrangement realizes which functional or higher-level kind, and is the realization multiple? |
| `disposition-manifestation` | Which stimulus condition displays which disposition, and is the disposition present when unmanifested? |
| `embodiment` | Which body or material bearer sustains this capacity or content, and does it constitute rather than merely house it? |

## Candidate contract

```text
instantiation-realization-use
  := abstract, general, functional, or latent item identity
   x particular, occurrence, arrangement, or bearer identity
   x individuation criterion for the type and for the particular
   x instantiation criterion and its evidence
   x realizing level, functional kind, and realization multiplicity
   x disposition, stimulus condition, and display or non-display
   x bearer, body, medium, and constitution or mere containment
   x context, time, and persistence of the relation
   x competing metaphysical accounts left visible
   x excluded homonym senses named explicitly
   x routing to classification, representation, appearance, and projected identity
```

## Existing-owner audit

- [Identity, Namespace, Naming, Classification, and Versioning](../../../tables/entries/identity-naming-classification-versioning.md)
  owns entity identity, classification, and versioning. Classification assigns
  an identified entity to a class; instantiation asserts that a particular is a
  case of a type under a stated criterion. This is the primary collision and
  must be argued at role review.
- [Model, Representation, and Simulation](../../../tables/entries/model-representation-simulation.md)
  owns representation. A model realizes nothing by representing it; realization
  and representation must not be merged.
- [Persona, Self-Presentation, Mask, Disguise, and
  Avatar](../candidates/persona-self-presentation-mask-disguise-avatar.md) owns
  projected figures. An avatar is a controlled figure presented to an audience,
  not an embodiment of an agent's capacities.
- [Perception, Sensation, Appearance, Illusion, and
  Hallucination](../candidates/perception-sensation-appearance-illusion-hallucination.md)
  owns appearance and perceptual organization; a display is not a percept.
- [State, Event, Transition, Process, and Lifecycle](../../../tables/entries/state-event-transition-process-lifecycle.md)
  and the [Transformation](../../../tables/roots/transformation.md) root own
  staged change; becoming concrete is not the same question as changing state.
- [Pattern, Regularity, Motif, Template, and Pattern
  Formation](../candidates/pattern-regularity-motif-template-pattern-formation.md)
  owns templates and their instantiation as reusable prototypes.
- [Software Type, Value, and Function](../../../tables/entries/software-type-value-function.md)
  owns `type`, `value`, and `function` in the language and runtime sense: which
  set of values, interpretation rules, operations, and validity constraints
  apply under a language or runtime model. That is the reason this family's
  repeatable-kind sense is labelled `general-type` rather than `type`. The two
  are not a general and a special case of one another: the software sense is
  fixed by a language or runtime model and carries evaluation, effects,
  lifetime, and compatibility factors, none of which this family owns, while
  this family's individuation criterion and instantiation evidence are not
  factors of that entry. A software value is not admitted here as a token, and
  a token is not admitted there as a value; each routes to the other by name.
- [Morpheme, Inflection, Derivation, Compounding, and Word
  Formation](../candidates/morpheme-inflection-derivation-compounding-word-formation.md)
  owns word-internal structure and formation processes. Lexeme and word form are
  the language-specific case of a general kind and its particular realizations,
  and are owned there; this family supplies only the general relation and does
  not analyze segmentation, inflection, derivation, or headedness.
- [Claim and Evidence](../../../tables/entries/claim-evidence.md) owns recorded
  observation and provenance for any displayed sign.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [SEP, "Types and Tokens"](https://plato.stanford.edu/entries/types-tokens/) | the type-token distinction, its origin, and the philosophical issues it raises | the distinction's metaphysics is unsettled; several accounts of types compete |
| [SEP, "Multiple Realizability"](https://plato.stanford.edu/entries/multiple-realizability/) | a psychological or functional kind can be realized by many distinct physical kinds | the correct account of the realization relation remains contentious |
| [SEP, "Dispositions"](https://plato.stanford.edu/entries/dispositions/) | dispositions and their manifestation conditions; why the unmanifested disposition cannot be defined away | conditional analyses face standing counterexamples |
| [SEP, "Form vs. Matter"](https://plato.stanford.edu/entries/form-matter/) | hylomorphism and the requirement that something persists through change | Aristotle-internal, with incompatible modern readings |
| [SEP, "Embodied Cognition"](https://plato.stanford.edu/entries/embodied-cognition/) | embodiment as a research programme defined against a stimulus-to-symbol pipeline | a programme rather than a settled concept; its claims vary in strength |
| Merleau-Ponty, *Phenomenology of Perception*, Routledge, 2012 | the lived body as the standing condition of experience rather than one object among others | phenomenological description; not an empirical model |
| Varela, Thompson, and Rosch, *The Embodied Mind*, MIT Press, 1991 | cognition as enacted through a body in an environment | programmatic and contested within cognitive science |
| [IFLA Library Reference Model](https://repository.ifla.org/handle/20.500.14598/40) | the work, expression, manifestation, and item chain as a bibliographic model | a domain standard; its `manifestation` is not a general metaphysical sense |

## Counterevidence and limits

- "Manifestation" has at least five unrelated owners; using it untagged makes
  any record ambiguous, which is why it is excluded from the title.
- The bibliographic manifestation is fully owned by an external standard and
  must be referenced, not redefined.
- Symptom presentation is a clinical claim: an observable sign does not
  establish an underlying condition, and this family does not own diagnosis.
- Type realism, nominalism, and other accounts of types are live and
  incompatible; the entry records the criterion in use rather than settling the
  debate.
- The realization relation itself is contested even where multiple
  realizability is accepted.
- Embodied cognition covers strong and weak theses; citing embodiment is not
  endorsing any particular mind-body position.
- Instantiation criteria are frequently implicit; the family's value depends on
  making them explicit rather than on any metaphysical commitment.

## Admission gates

1. Keep "manifestation" out of the title and admit only the bounded
   dispositional sense, guarded by the sense check.
2. Route the bibliographic work, expression, manifestation, and item chain to a
   mapping view over the external standard.
3. Exclude clinical symptom-to-diagnosis inference, religious theophany, public
   demonstration, and pop-psychology manifesting by name.
4. Distinguish instantiation from classification by criterion and direction.
5. Distinguish realization from representation, and keep multiple realization
   visible.
6. Preserve the unmanifested disposition; non-display is not absence.
7. Bound embodiment to the bearer and constitution question without adopting a
   mind-body position.
8. Do not re-own projected personas, avatars, appearance, staged change, or
   template instantiation.
9. Keep the repeatable-kind sense labelled `general-type` and route the
   language or runtime sense of type, value, and function to the canonical
   software entry by name.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The
abstract-to-concrete relation is unclaimed and directly sourced, but this is
the highest-risk candidate in the batch: the classification boundary, the
external bibliographic standard, and the contested status of embodiment must
all be reviewed, and deferral remains a defensible outcome.
