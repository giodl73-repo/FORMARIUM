# Lexicon Migration Plan

Status: implemented

## Frame

The Formarium reference, publication, and deterministic checks already work.
The missing capability is one canonical identity that matches the work's
dictionary/thesaurus form:

```text
working Formarium reference
+ Lexicon identity and versioned compatibility boundary
-> one durable reader-facing book with provenance-stable imports
```

The rename must not change the 54 canonical entries, 419 senses, 638 factors,
100 views, 11 relations, 165 review bindings, 250 pointers, or 11 query traces.
It must delete active Formarium naming without rewriting historical evidence.

## Audit

The identity crosses five owner surfaces:

1. Rust package, CLI, parsers, and generated projections;
2. deterministic reference, relation, assurance, query, and pointer contracts;
3. `sim-67` publication identity, browser globals, handoff namespace, and URLs;
4. Pages build and acceptance checks;
5. active project documentation and wave routing.

## Compatibility contract

| State | Treatment |
|---|---|
| `factorium-*`, `.factorium`, `.factorium-query` | frozen readable import |
| `formarium-*`, `.formarium`, `.formarium-query` | frozen readable import |
| `lexicon-*`, `.lexicon`, `.lexicon-query` | canonical forward format |
| dated Factorium/Formarium waves and reviews | immutable provenance |

## Slice and disproof

The smallest complete slice is one Lexicon-native corpus, one accepted query,
one fail-closed unsupported revision, generated projections, and a `sim-67`
site whose title is exactly `Lexicon`.

The migration fails if old formats stop parsing, canonical counts change,
`sim-66` changes behavior, active output contains Formarium branding, or a
reader-facing URL does not target `giodl73-repo/LEXICON`.

