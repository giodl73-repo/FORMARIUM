# Factor Table Entry Format V0

Status: draft

## Purpose

A Factor Table entry is the canonical human-readable unit of Factorium. It
combines dictionary sense separation, thesaurus-like alternatives, and compact
engineering guidance.

The format is intentionally table-first. It is not yet a machine interchange
schema.

## Required structure

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

### Maturity and provenance

Every candidate receives one status:

- `established`: repeatedly used with documented support;
- `supported`: credible evidence in more than one setting;
- `candidate`: useful proposal needing broader review;
- `disputed`: materially competing interpretations remain;
- `deprecated`: retained for history but no longer recommended.

Sources, examples, reviewers, revisions, and unresolved findings remain
visible.

## Editorial limits

- Lead with tables.
- Use one-line taglines for senses and candidates.
- Prefer lists over uninterrupted exposition.
- Move extended theory and history to linked notes.
- Preserve ambiguity and competing decompositions.
- Avoid unexplained symbols until the textual vocabulary is stable.
- Separate factor discovery from mechanism assignment.
- Separate descriptive recurrence from normative recommendation.

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
