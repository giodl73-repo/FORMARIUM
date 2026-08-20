# Lexicon Relation Gap Assessment

Status: complete; no relation kind admitted

## Question

Do `part-of` or `contrasts-with` require a new parser-supported or canonical
relation kind, rather than remaining inside entry contracts and editorial graph
annotations?

## Current authority

`reference/lexicon-relations-v2.lexicon` contains eleven admitted directed
records. Each kind has a bounded governing question and qualifier contract.
Parser vocabulary, candidate kind design, and admitted edge records are
separate states.

The canonical relation sidecar remains unchanged by this assessment.

## `part-of`

### External model survey

Foundational ontologies do not support one safe unqualified part relation:

- BFO and the OBO Relations Ontology distinguish continuant parthood from
  occurrent parthood and require time-sensitive treatment where appropriate;
- DOLCE distinguishes parthood from constitution;
- SUMO distinguishes part, proper part, component, member, and piece;
- CIDOC CRM models physical composition, membership, and temporal inclusion
  through separate properties.

The shared lesson is not that Lexicon should import any one ontology. It is that
physical part, functional component, collection member, material constituent,
temporal part, and conceptual subdivision have different inference rules.

### Existing ownership

- `system-composition-dependency` owns components, elements, interfaces,
  lifecycle semantics, and view-relative system composition;
- `decomposition-modes-combination-contracts` owns composition, partition, and
  refinement as decomposition modes;
- `comparative-quantity` and related quantity entries own fraction and
  contribution semantics;
- entry factors and views already state the local composition contract needed
  for correct use.

### Disposition

**ENTRY-INTERNAL DISTINCTION ONLY.** Do not add `part-of` to the parser or
canonical relation sidecar.

| Property | Required interpretation |
|---|---|
| Direction | hypothetical part to whole |
| Inverse | `has-part` is not automatically asserted |
| Symmetry | asymmetric |
| Transitivity | only within one declared parthood flavor and time policy |
| Endpoints | entry or sense, constrained by the flavor |
| Required qualifiers | flavor, time policy, lifecycle rule, and governing view |

Those qualifiers would still be insufficient to unify all current uses. A bare
edge would erase the very distinctions the relation is meant to preserve.

### False inferences

- a wheel being a physical part of a car does not make it the same kind of part
  of a fleet when the car is a fleet member;
- membership does not imply ownership;
- destruction or replacement of a whole does not determine the lifecycle of
  every part;
- an element may be a component in one view and only a dependency in another;
- additive contribution and physical assembly do not share one composition
  operator.

### Reopening condition

Reopen only when a repeated machine query requires one specific parthood flavor
and cannot be answered by the current component, decomposition-mode, factor, or
view contracts. Any proposal must define one flavor rather than a universal
`part-of`.

## `contrasts-with`

### External model survey

The apparent analogues are not equivalent:

- WordNet antonymy is a lexical, sense-level relation;
- ConceptNet separates antonymy from distinctness;
- SKOS relatedness is intentionally weak and does not define contrast;
- FrameNet frame relations do not supply a general contrast relation;
- logical incompatibility is stronger than a decisive distinction for correct
  use.

No source supplies one cross-domain relation that safely combines gradable
antonymy, complementary opposition, incompatibility, competitive alternatives,
and Lexicon's editorial contrasts.

### Existing ownership

`CONTRASTS-WITH` already exists in the editorial entry graph and decisive
distinction tables. `ALTERNATIVE-TO` and `CONFUSED-WITH` own adjacent but
different questions. The current prose tables preserve the shared feature,
decisive distinction, and local basis that a bare edge would lose.

### Disposition

**KEEP AS AN EDITORIAL GRAPH ANNOTATION.** Do not promote `contrasts-with` to a
parser-supported or canonical sidecar kind.

| Property | Required interpretation |
|---|---|
| Direction | directionally authored by the entry needing the warning |
| Inverse | semantically self-inverse, but reciprocal declaration is editorial |
| Symmetry | symmetric in meaning |
| Transitivity | never transitive |
| Endpoints | entries or senses |
| Potential qualifiers | contrast type and declared dimension |

### False inferences

- contrast does not imply mutual exclusion;
- editorial distinction does not imply lexical antonymy;
- two contrast edges do not license a third by transitive closure;
- gradable, complementary, and usage contrasts do not have the same strength;
- one-way authoring does not make the semantic relation asymmetric.

### Reopening condition

Reopen only when a bounded navigation feature requires a specific contrast
subtype, such as a reviewed antonymy index. That proposal must name its subtype,
dimension, symmetry policy, and non-transitivity, and must demonstrate value
beyond the decisive-distinction tables.

## Gate result

| Gate | `part-of` | `contrasts-with` |
|---|---|---|
| Direction and inverse policy defined | Pass | Pass |
| Qualifier requirements known | Pass | Pass |
| Endpoint types bounded | Pass | Pass |
| False inferences enumerated | Pass | Pass |
| Current machine query requires admission | Fail | Fail |
| Existing representation is insufficient | Fail | Fail |

**DEFER BOTH RELATION KINDS.** This is a substantive null result, not an
unreviewed residue.

## Sources

1. ISO/IEC 21838-2:2021, *Basic Formal Ontology*:
   https://www.iso.org/standard/74572.html
2. OBO Relations Ontology:
   https://oborel.github.io/obo-relations/
3. DOLCE ontology:
   https://www.loa.istc.cnr.it/dolce/overview.html
4. SUMO:
   https://www.ontologyportal.org/
5. CIDOC CRM:
   https://www.cidoc-crm.org/
6. Princeton WordNet relations:
   https://wordnet.princeton.edu/documentation/wninput5wn
7. SKOS Reference:
   https://www.w3.org/TR/skos-reference/
8. ConceptNet relations:
   https://github.com/commonsense/conceptnet5/wiki/Relations
9. FrameNet frame relations:
   https://framenet.icsi.berkeley.edu/

These sources provide comparison controls, not imported authority or a claim of
conformance.
