# Factorium Tables Canonical-Family Contents

Status: internal navigation contract fixed point

Reference implementation: `sim-34`

## Reader job

A reader on a canonical entry should be able to see and open every specialized
view published under that Table without reconstructing ownership from search,
chapters, or backlinks.

## Product change

`sim-34` adds **Specialized views owned by this Table** to the existing
Explore-this-Table navigator on canonical entries that own at least one view.
The projection lists selected destination titles plus exact view families and
destinations in canonical reference order.

Entries with one to three views begin expanded. Entries with four or more
begin folded while retaining the exact count in the summary. The one current
entry with no specialized view receives no empty control.

## Admitted inputs

The projection uses entry/view ownership, view family, path, and order from
`reference/factorium-reference-v0.factorium`; displayed titles and links come
from the selected search destinations. It may not infer members from links,
words, chapters, search groups, Composition relations, or domain proximity.

## Meaning boundary

Canonical family membership means publication ownership only. It does not
assert subtype, broader/narrower, synonym, relatedness, equivalence,
dependency, required traversal, or closure. Each specialized view remains an
independently addressable scoped projection of its owner.

## Compatibility and checks

- 52 canonical entries receive family contents and one receives no empty UI;
- the projection contains all 95 specialized views exactly once;
- every link resolves to the exact selected view page;
- source order and view-family labels are preserved;
- 1-3 views default open and 4+ default folded;
- specialized-view, curated-record, Guide, and Reader pages receive no owned-
  views projection;
- desktop and 390-pixel layouts have no horizontal overflow;
- `sim-33` reproduces exactly.

## Claim boundary

This establishes reciprocal publication navigation. It does not establish
semantic taxonomy, family completeness beyond the current canonical edition,
reader comprehension, preference, lookup success, external-preview evidence,
or publication readiness.
