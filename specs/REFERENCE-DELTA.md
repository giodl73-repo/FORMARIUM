# Reference Delta V0

Status: draft

## Purpose

A Reference Delta shows how a Factorium entry complements neighboring
reference forms. It identifies what another source owns, what Factorium should
not duplicate, and which structured contribution Factorium adds.

A delta is comparative metadata, not an Evidence Table and not a claim that
Factorium is universally unique or superior.

## Required use

- Standard and anchor entries MUST include a compact Reference Delta.
- A family-defining pilot MUST include one.
- Brief and prime entries MAY inherit the delta of a broader canonical entry.
- An entry with one material named comparator MAY use a one-row delta.

## Required fields

| Field | Meaning |
|---|---|
| Comparator form | Dictionary, lexical network, thesaurus, encyclopedia, handbook, standard, pattern catalog, database, or other named form |
| Source identity | Publisher/project, title, version or access date, and stable location |
| Comparator owns | The reader task and content the source is authoritative for |
| Factorium avoids duplicating | Narrative, definitions, synonym lists, data, or rules that should remain external |
| Factorium contributes | Structured senses, views, factors, mappings, constraints, failure signs, typed links, or maturity |
| Scope | Which sense or view is being compared |
| Confidence | High, medium, or low with unresolved limits |

## Display form

| Reference form | What it provides | Factorium delta |
|---|---|---|
| Dictionary | Concise senses and usage | Links each sense to typed structural views |
| Thesaurus | Nearby words and contrasts | Explains when structures differ despite lexical proximity |
| Encyclopedia | Exposition, history, and domain context | Supplies compact contracts, assumptions, and failure signs |

Named sources appear in provenance or linked notes.

## Claim rules

- Prefer `Factorium contribution`, `differentiator`, or `supplement`.
- `Unique`, `first`, `only`, and equivalent claims require a separately scoped
  competitive review with cited search boundaries.
- Absence from one comparator is not evidence of global novelty.
- A difference in layout is not automatically a difference in knowledge.
- Factorium MUST link rather than copy copyrighted definitions, synonym lists,
  diagrams, or explanatory prose.
- Comparison applies to a declared edition, version, or access date.

## Graph contract

The canonical `COMPARED-WITH` relationship links an entry or view to a named
external reference source or a declared generic reference-form baseline.

`COMPARED-WITH` does not assert equivalence, deficiency, superiority, or
replacement.

## Quality questions

1. Is the comparator identified precisely enough to revisit?
2. Is the compared sense or view explicit?
3. Does the delta describe reader tasks rather than caricature the source?
4. Is Factorium's addition structural and observable?
5. Is non-duplication explicit?
6. Does any novelty language exceed the evidence?
7. Can the comparison remain compact?

