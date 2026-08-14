# Reference Delta and Force Polysemy Research

Date: 2026-08-14

## Research question

How can Factorium show, for every substantial entry, how it complements
dictionaries, lexical networks, thesauri, encyclopedias, handbooks, and
standards without copying them or making unsupported uniqueness claims?

Decision supported: add a compact Reference Delta contract and use `force` as
the first polysemous anchor entry.

## Sources

1. Merriam-Webster, "force" dictionary entry:
   https://www.merriam-webster.com/dictionary/force
2. Merriam-Webster, "force" thesaurus entry:
   https://www.merriam-webster.com/thesaurus/force
3. Princeton WordNet overview:
   https://wordnet.princeton.edu/
4. Encyclopaedia Britannica, "force":
   https://www.britannica.com/science/force-physics
5. OpenStax, *University Physics Volume 1*, section 5.3:
   https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
6. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
7. Local competitive analysis:
   `docs/research/2026-08-13-reference-scale-and-entry-size.md`

## Findings

### FACTORIUM-RD-01 - Reference forms own different reader tasks

- Sources: WordNet overview; Britannica force entry; local competitive
  analysis.
- Observation: dictionaries and lexical networks separate senses and lexical
  relations; thesauri compare nearby words; encyclopedias explain a subject;
  handbooks and standards provide technical rules, formulas, units, or values.
- Implication: the comparison should identify complementary ownership rather
  than rank every source on one scale.
- Confidence: high.

### FACTORIUM-RD-02 - Differentiation is supportable; uniqueness is harder

- Sources: `VISION.md`; `specs/REFERENCE-TABLE-FAMILIES.md`.
- Observation: Factorium's declared contribution combines canonical senses,
  typed specialized views, explicit assumptions and failure signs, graph
  relationships, maturity, and provenance. The reviewed sources do not prove
  that no other reference has any similar feature.
- Implication: entries may state a Factorium-specific contribution or
  differentiator. They MUST NOT claim global uniqueness without a separately
  scoped and cited competitive review.
- Confidence: high.

### FACTORIUM-RD-03 - Force is a strong polysemy stress test

- Sources: Merriam-Webster dictionary and thesaurus entries.
- Observation: `force` covers physical interaction, strength or effective
  influence, organized personnel, coercion or compulsion, and specialized
  uses. The thesaurus entry distinguishes coercion-related near-synonyms by
  nuance.
- Implication: one physical formula entry cannot own the whole headword.
  Factorium needs one canonical entry with separated senses and linked views.
- Confidence: high.

### FACTORIUM-RD-04 - Encyclopedia depth and Factorium structure differ

- Sources: Britannica force entry; OpenStax section 5.3.
- Observation: encyclopedic and textbook treatments explain Newtonian history,
  vector character, deformation, laws, applications, and units in prose.
  Factorium instead exposes the compact relation contract, conceptual factors,
  assumptions, failure signs, and links to other senses.
- Implication: Factorium should link to explanatory sources rather than
  reproduce their narrative.
- Confidence: high.

### FACTORIUM-RD-05 - Reference comparison can become repetitive

- Source: `specs/FACTOR-TABLE-ENTRY.md` size budgets.
- Observation: repeating generic descriptions of dictionaries and
  encyclopedias in every prime entry would consume the entry budget and create
  copy drift.
- Implication: require compact Reference Deltas for standard, anchor, and
  family-defining pilot entries. Brief and prime entries may inherit a broader
  delta or state one material comparator.
- Confidence: high.

### FACTORIUM-RD-06 - Comparison needs source identity and confidence

- Sources: `.roles/editorial/evidence-claims-editor.md`;
  `.roles/assurance/domain-source-reviewer.md`.
- Observation: claims about what another reference contains can become stale
  or edition-specific.
- Implication: named comparisons record source, version or access date, scope,
  and confidence. Generic reference-form baselines are labeled generic.
- Confidence: high.

## Recommendations

### Adopt now

- Add the Reference Delta schema.
- Require it for standard, anchor, and family-defining pilot entries.
- Create one canonical `force` entry with five candidate senses.
- Link the existing Newtonian Formula Table as a view of the physical sense.

Owner: Factorium. Validation: source-link review, complete role review,
headword uniqueness, and practitioner scanability.

### Prototype behind a compatibility boundary

- Generated comparator panels from cited source metadata.
- Diff alerts when a named external source changes.
- Cross-reference queries showing which Factorium views supplement which
  external reference forms.

Owner: future Factorium schema and Workbench. Validation: versioned comparator
fixtures and editorial approval.

### Reject or defer

- "No other reference does this" without a comprehensive review.
- Copying dictionary definitions, synonym lists, or encyclopedia prose.
- Repeating the same generic comparison paragraph in every small entry.
- Treating lexical synonyms as semantically identical Factorium joins.

## Non-goals

- Replacing dictionaries, thesauri, encyclopedias, textbooks, or standards.
- Scoring external references as winners and losers.
- Claiming the five force senses exhaust all language use.

