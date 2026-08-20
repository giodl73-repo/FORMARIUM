---
topic: figuration-metaphor-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Metaphor, Metonymy, Symbol, Allegory, and Allusion

## Decision question

Does Lexicon need one owner for the mechanism by which an expression, image, or
work signifies something other than, or in addition to, what it literally
states, separate from the reading that the mechanism supports?

## Scope decision

The originally proposed family was *Metaphor, Symbol, Motif, Allegory, and
Allusion*. Motif is a recurrence concept rather than an indirect-signification
concept, so it moves to the pattern candidate and is only cross-referenced
here. Metonymy and simile are added: a figuration owner that omits the
within-domain contiguity case and the explicitly marked comparison case cannot
draw its own decisive distinctions.

## Bounded thesis

Proceed only as an indirect-signification mechanism entry. Semantic meaning,
reference, the interpretation act and result, ambiguity, translation, notation
symbol contracts, analogy as an inference mapping, and recurrence retain their
existing owners.

The thesis is falsified if metaphor, metonymy, symbol, allegory, and allusion
can be recorded completely as ambiguity plus interpretation without losing the
mechanism type, the mapped and blocked correspondences, the scope of the second
level, or the recognition requirement; or if the mechanism types cannot survive
pairwise distinction on cited authority.

## Proposed senses

| Sense | Governing question |
|---|---|
| `literal-figurative-status` | Does the expression carry its more basic meaning, or a contextual meaning that contrasts with that basic meaning and is understood by reference to it? |
| `metaphor` | Which secondary subject is used to structure understanding of which primary subject, and which correspondences are projected? |
| `simile` | Which comparison is made explicit by a comparative marker, and how does the marking change the commitment? |
| `metonymy` | Which entity stands for which associated entity within one domain by contiguity, part-whole, or role? |
| `symbol` | Which item carries a surplus of meaning beyond its literal reference, and by whose convention or context? |
| `allegory` | Which sustained, systematic second level of meaning runs in parallel across a whole work or extended passage? |
| `allusion` | Which identifiable prior text, work, figure, or event is indirectly evoked, and what does recognizing it add? |
| `figurative-inference` | Which correspondences does the figure project from source to target, which are blocked, and which conclusions are therefore prohibited? |

## Candidate contract

```text
figuration-indirect-signification-use
  := expression, passage, image, or work identity
   x language, medium, genre, period, and culture
   x basic meaning and contextual meaning of the target word or image
   x primary subject and secondary subject
   x relation type of mapping, contiguity, convention, parallel level, or evocation
   x mapped correspondences and blocked correspondences
   x conventionality, novelty, and lexicalization status
   x deliberateness and producer-intent evidence
   x referenced prior text, work, figure, or event, identification evidence, and recognizing audience
   x scope of the second level across word, passage, or whole work
   x projected and blocked correspondences and prohibited conclusions
   x competing readings, cultural variation, and interpretive authority
```

## Existing-owner audit

- [Meaning, Reference, Interpretation, and Use](../../../tables/entries/meaning-reference-interpretation-use.md)
  owns semantic meaning, reference, interpretation act and result, ambiguity,
  and translation. This family owns only the mechanism type; the reading, the
  interpreter, and the disagreement route back to that owner. That entry's
  stopping boundary excludes theories, schools, genres, interpretive methods,
  and named concepts, and prescribes that those "remain sources, examples, or
  scoped views". That prescription must be answered directly rather than
  assumed away. A scoped view — in this repository, a Mapping Table — binds a
  domain vocabulary to an existing canonical headword and its existing
  canonical senses; it maps domain terms onto factors that already exist and
  introduces no new factor. The bookkeeping this family requires is not of that
  shape: basic against contextual meaning, contiguity against resemblance
  relations, a second systematic level with a declared scope, recognition
  evidence and the recognizing audience, and projected against blocked
  correspondences are all factors that the meaning contract does not carry, so
  no mapping onto its senses can record them. If they were added to that entry
  they would be new senses of that entry, not a scoped view of it. The
  candidate must therefore be argued as a distinct recurring reader question
  and never as an extension of interpretation.
- [Similarity, Difference, Analogy, Equivalence, and
  Match](../candidates/similarity-difference-analogy-equivalence-match.md)
  owns `analogy` as a directional inference mapping. Analogy is not a sense
  here; metaphor cross-references it.
- [Information, Data, Record, Schema, Signal, and Noise](../../../tables/entries/information-data-signal-noise.md)
  owns data, encoding, and representation; the sign-type taxonomy is cited as a
  boundary and not imported as senses.
- Formula symbol contracts in `tables/formulas/` own `symbol` in the notational
  sense; that homonym is excluded by name.
- [Electrical Quantity](../../../tables/entries/electrical-quantity.md) records
  the canonical guard that metaphors and lexical proximity must not create
  equivalence. Identifying a figure never licenses a domain equivalence.
- The pattern candidate owns `motif`; recurrence is not a figuration sense.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [SEP, "Metaphor"](https://plato.stanford.edu/entries/metaphor/) | primary and secondary subject terminology and the standard metaphor forms | records that the comparison account is contested and several theories remain live |
| [Pragglejaz Group, "MIP: A Method for Identifying Metaphorically Used Words in Discourse"](https://doi.org/10.1080/10926480709336752) | operational identification by basic against contextual meaning | an identification procedure only; silent on aptness and effect |
| Lakoff and Johnson, *Metaphors We Live By*, University of Chicago Press, 1980 | metaphor as systematic cross-domain conceptual mapping | criticized for circular evidence and weak falsifiability |
| [Black, "Metaphor"](https://doi.org/10.1093/aristotelian/55.1.273) | the interaction view: metaphor can create rather than report similarity | pre-cognitive-linguistic; its associated commonplaces are imprecise |
| [SEP, "Peirce's Theory of Signs"](https://plato.stanford.edu/entries/peirce-semiotics/) | the icon, index, and symbol typology fixing symbol as the conventional sign | Peirce's symbol is not the literary critic's symbol |
| Goodman, *Languages of Art*, 2nd edition, Hackett, 1976 | separation of denotation, exemplification, and metaphorical exemplification | nominalist and syntactically strict; resists ordinary literary usage |
| Fletcher, *Allegory: The Theory of a Symbolic Mode*, Cornell University Press, 1964 | allegory as a sustained symbolic mode with characteristic agents and structure | inherits a Romantic symbol-over-allegory hierarchy that is contested |
| Benjamin, *The Origin of German Tragic Drama*, Verso, 1998 | the critique of elevating symbol over allegory; allegory as fragmentary | deliberately anti-systematic and hard to operationalize |
| [Machacek, "Allusion"](https://doi.org/10.1632/pmla.2007.122.2.522) | allusion as a recognizable, purposive indirect reference | reader-dependent; unrecognized allusions have indeterminate status |
| Jakobson, "Two Aspects of Language and Two Types of Aphasic Disturbances", in *Fundamentals of Language*, 1956 | the metaphor-by-similarity against metonymy-by-contiguity polarity | built on aphasia evidence later disputed; the binary is heuristic |
| Ricoeur, *The Rule of Metaphor*, Routledge, 1978 | metaphor as predicative innovation with an is and is-not tension | hermeneutic; rejects the substitution framing other sources assume |

## Counterevidence and limits

- The word "symbol" has at least four distinct owners: the literary image with
  surplus meaning, the Peircean conventional sign, the notational token, and
  the archetype. The literary sense must be named and bounded explicitly.
- "Allegory" spans a rhetorical trope, a narrative mode, and allegorical
  reading as an interpretive practice; the reading practice belongs to the
  interpretation owner.
- Conceptual Metaphor Theory treats metaphor as a conceptual mapping rather
  than an expression; the expression and the mapping must not be conflated, and
  the theory is not the only account.
- Metaphor identification procedures determine that a word is used
  metaphorically, not that a reading is correct.
- Unrecognized allusions and unlicensed projections show that figures do not
  determine their own uptake.
- A figure never establishes equivalence, causation, or shared structure
  between the domains it joins.

## Admission gates

1. Own the mechanism type only; route reading, interpreter, and disagreement
   to the interpretation owner.
2. Exclude the notational symbol contract, the Peircean symbol class, and the
   archetype by name.
3. Keep metaphor and metonymy separated by cross-domain against within-domain.
4. Keep metaphor and simile separated by marking and commitment, not by force.
5. Keep symbol and allegory separated by scope and systematicity.
6. Keep allusion separated from quotation and from general intertextuality.
7. Record projected and blocked correspondences and the prohibited conclusions
   whenever a figure is claimed, and leave the interpretive conclusion itself
   to the interpretation owner.
8. Do not admit `analogy` or `motif` as senses; cross-reference their owners.
9. State that identifying a figure licenses no equivalence claim.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The source base
is convergent and the distinctions survive pairwise tests, but the boundary
against the interpretation owner must be reviewed before canonical admission.
