# Factorium Tables Canonical-Family Search

Status: internal search contract fixed point

Reference implementation: `sim-33`

## Reader job

A reader searching for a concept should see a specialized result together
with the canonical Table that owns it, while retaining a flat record view when
they want one exact view, guide, or curated record.

## Product change

`sim-33` adds two search result projections over the existing deterministic
ranking:

- **Table families** is the default. Matches are grouped by exact canonical
  owner. A matching canonical entry owns its family; a specialized view joins
  the family named by its canonical owner metadata. Curated Table records,
  Factor Guides, and Reader records remain separately labelled standalone
  groups.
- **All records** preserves the existing flat ranked result list.

The query, kind, and domain filters continue to select matching records. The
family projection groups those matches after ranking; it does not expand the
match set or cause the owning entry to satisfy a filter it did not match.

## Admitted inputs

The projection may use only the existing search record plus exact entry/view
ownership from `reference/factorium-reference-v0.factorium`. It may not infer
families from chapter placement, words, body links, cross-references,
Composition relations, or search co-occurrence.

## Display contract

- the control is labelled **Result view** and exposes `Table families` and
  `All records`;
- the current view is URL-addressable as `view=families|records`;
- each family names and links its canonical owning Table;
- each matched member retains its own title, kind, domain, summary, and link;
- a family states the number of matching records, not its total canonical
  number of views;
- curated records, guides, and Reader records never receive a fabricated
  canonical owner;
- no result is labelled broader, narrower, synonym, related, dependency, or
  closure.

## Compatibility and checks

- canonical sources, sidecars, relations, ranking, and record count do not
  change;
- the default groups all 185 indexed records without loss or duplication;
- all 95 specialized views map to their exact owners;
- flat mode produces the same ranked records as `sim-32`;
- query, kind, and domain filters compose before grouping;
- desktop and 390-pixel layouts have no horizontal overflow;
- `sim-32` reproduces exactly.

## Claim boundary

This establishes deterministic ownership-aware search presentation. It does
not establish findability, preferred grouping, relevance quality, semantic
hierarchy, thesaurus completeness, external-preview evidence, or publication
readiness.
