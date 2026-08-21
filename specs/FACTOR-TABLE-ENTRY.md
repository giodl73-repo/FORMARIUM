# Factor Table Entry Format V0

Status: draft

## Purpose

A Factor Table entry is the canonical human-readable unit of Lexicon. It
combines dictionary sense separation, thesaurus-like alternatives, and compact
engineering guidance.

The format is intentionally table-first. It is not yet a machine interchange
schema.

## Required structure

Every published factor or cross-reference resolves according to
`specs/LEXICON-ENTRY-GRAPH.md`. A table cell is not exempt from canonical
entry and relationship rules.

### Headword

A stable lookup term representing a concept, problem, artifact, decision, or
recurring design situation.

### Orientation

One short paragraph, normally no more than 120 words. It distinguishes the
entry from nearby headwords and tells the reader how to choose among its
senses.

### Sense

Each materially different meaning or problem receives:

- a stable local sense identifier;
- a one-sentence tagline;
- domain and applicability labels.

Different senses MUST NOT be disguised as competing factorizations.

### Candidate factorizations

Each sense lists multiple credible alternatives when they exist:

| Field | Meaning |
|---|---|
| Lens | Short name for the decomposition |
| Factorization | Compact expression of the proposed factors |
| Pivot | Privileged identity or organizing dimension, when one exists |
| Supporting roles | Capabilities, components, variants, states, policies, relationships, boundaries, contexts, constraints, or derived views |
| Use when | Conditions favoring the candidate |
| Watch for | Characteristic failure or counterexample |

An entry MUST NOT present one candidate as universal merely because it is
familiar or convenient.

### Constraints and interactions

List only relationships needed to avoid a misleading Cartesian product:

- dependent factors;
- mutually exclusive values;
- required combinations;
- derived values;
- contextual interpretation;
- invalid or disputed combinations.

### Mechanism mappings

When useful, map general factor roles into domain mechanisms:

| General role | Mechanism family A | Mechanism family B |
|---|---|---|
| Capability | OO interface | Rust trait |
| Closed variant | Subclass or tagged union | Rust enum |
| Policy | Strategy object | Generic or `dyn Trait` |

Mechanism mappings are assignments, not definitions of the factors.

### Cross-references

Link broader, narrower, related, contrasting, and commonly confused entries.
Cross-references use typed relationships and stable entry identifiers.

### Maturity and provenance

Every candidate receives one status:

- `established`: repeatedly used with documented support;
- `supported`: credible evidence in more than one setting;
- `candidate`: useful proposal needing broader review;
- `disputed`: materially competing interpretations remain;
- `deprecated`: retained for history but no longer recommended.

Sources, examples, reviewers, revisions, and unresolved findings remain
visible.

### Reference Delta

Standard and anchor entries include the compact comparison defined by
`specs/REFERENCE-DELTA.md`. It states what neighboring reference forms own,
what Lexicon avoids duplicating, and which structured contribution this
entry adds.

Brief and prime entries may inherit the delta of a broader canonical entry.

## Editorial limits

- Lead with tables.
- Use one-line taglines for senses and candidates.
- Prefer lists over uninterrupted exposition.
- Move extended theory and history to linked notes.
- Preserve ambiguity and competing decompositions.
- Avoid unexplained symbols until the textual vocabulary is stable.
- Separate factor discovery from mechanism assignment.
- Separate descriptive recurrence from normative recommendation.

## Provisional size classes

These budgets remain provisional until a 25-entry pilot is measured:

| Class | Words | Senses | Candidate rows |
|---|---:|---:|---:|
| Prime | 50–150 | 1 | 1–3 |
| Brief | 120–250 | 1 | 3–6 |
| Standard | 250–600 | 1–3 | 6–15 total |
| Anchor | 600–1,500 | 2–6 | 12–30 total |

Additional defaults:

- prime entries resolve graph terms without padding; they may later expand;
- orientation: 40–120 words;
- constraints: 3–7 bullets;
- cross-references: 3–10;
- anchor entries: no more than roughly 10% of a volume.

Collection scale and comparator evidence are documented in
`docs/research/2026-08-13-reference-scale-and-entry-size.md`.

## Quality questions

An entry review asks:

1. Are senses separated correctly?
2. Are the candidate factors interpretable?
3. Is the pivot explicit rather than accidental?
4. Can supporting factors vary independently?
5. Are dependencies and impossible combinations declared?
6. Are alternative pivots or granularities missing?
7. Does the entry explain when each candidate helps?
8. Are counterexamples and failure signs visible?
9. Are platform-specific mechanisms confused with general factor roles?
10. Can a practitioner use the entry quickly without reading an essay?
11. Is the Reference Delta sourced and free of unsupported uniqueness claims?
