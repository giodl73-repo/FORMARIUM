# Factorium Tables Navigator

Status: internal navigation contract candidate

## Reader job

A reader who opens one Table should be able to identify its place in the
reference, jump to its owning canonical entry when it is a specialized view,
compare explicitly contrasted terms, follow authored cross-references, or
return to Search/Browse without reading the whole page first.

## Admitted inputs

The generated navigator may use only:

1. exact entry and view ownership from
   `reference/factorium-reference-v0.factorium`;
2. an authored `## Contrast table` section in the current source;
3. authored Markdown links under the current source's
   `## Cross-references` section;
4. generated Search Tables and Browse Tables destinations.

Ordinary body links, lexical similarity, shared tokens, search co-occurrence,
chapter adjacency, and Composition relations are not thesaurus assertions.

## Projection

Every selected `tables/` page receives one generated **Explore this Table**
navigator before its source content.

| Source class | Navigator identity |
|---|---|
| canonical entry | `Canonical entry` |
| specialized canonical view | view family plus exact `Owning Table` link |
| selected table outside current interchange | `Curated Table record`; no canonical-owner claim |

The navigator always links to Search Tables and Browse Tables. When present it
also links to the exact Contrast table and Cross-references sections. It may
show authored cross-reference destinations as a compact list, but MUST label
them `Authored connections · untyped`.

## Non-inference boundary

An untyped authored connection does not assert synonymy, broader/narrower
direction, equivalence, dependency, compositional admission, or closure. A
future typed thesaurus sidecar requires its own grammar, review, source
authority, direction, and compatibility contract.

## Compatibility and checks

- no canonical source or relation sidecar changes;
- all 175 selected Table pages receive one navigator;
- all 95 specialized views resolve to their exact owning entry page;
- all navigator links resolve locally;
- authored connection labels and counts come from the exact Cross-references
  section only;
- `sim-31` reproduces exactly;
- desktop and 390-pixel layouts retain usable navigation without overflow.

## Claim boundary

This establishes deterministic publication and traversal mechanics. It does
not establish thesaurus completeness, semantic relation typing, lookup
success, comprehension, preference, external-preview evidence, or publication
readiness.
