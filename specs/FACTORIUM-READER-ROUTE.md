# Factorium Reader Route

Status: internal route contract under implementation

Reference implementation: `sim-36`

## Reader job

A reader learning how to use Factorium should be able to enter one deliberate
teaching route without reconstructing it from homepage fragments, the complete
mixed Contents directory, or the canonical Tables index.

## Product change

`sim-36` adds a dedicated `reader.html` route beside `tables.html`. It projects
the exact frozen 24-record Book One teaching spine in its five authored parts,
with direct starts for the Reader quickstart, bounded-question guide, worked
questions, and Tables depth.

The page links existing dedicated records and does not copy or redefine their
content. Factor Guides remain separately labelled bounded applications, not a
third book and not members of the Reader spine. The full eighteen-part Contents
directory remains available as an all-destinations publication route.

## Admitted inputs

Reader membership and order come only from
`volumes/01-structure-quantity-choice/book-one-sim-candidate-v0.factorium`.
Selected titles, record classes, domains, and destinations come from exact
edition-local search custody. The five part boundaries come from the authored
spine in `guides/bounded-question-composition-book-one.md` and must cover the
same ordered manifest without additions or omissions.

## Routing contract

- the Factorium Reader product card and persistent Reader navigation open
  `reader.html`;
- the Reader page starts with the quickstart and exposes all five ordered parts;
- every one of the 24 spine records resolves to its existing dedicated page;
- Tables A-Z, Tables Search, and all-destinations Contents remain distinct;
- Factor Guides and Reader support records do not enter the 24-record spine;
- route state is absent: this is a deterministic publication projection.

## Meaning boundary

Spine order is an editorial teaching sequence, not canonical hierarchy,
prerequisite truth, semantic relatedness, completeness, or a ranking of the
remaining 151 canonical records. Tables remain the authority.

## Compatibility and checks

- exact 24 records in manifest order across exact 6/6/5/4/3 part counts;
- duplicate-free membership and local destinations;
- exact exclusion of Guides and Reader support records from the spine;
- reciprocal Reader navigation from home, Table pages, Tables A-Z, and Reader;
- desktop and 390-pixel layouts have no horizontal overflow;
- `sim-35` reproduces exactly.

## Claim boundary

This establishes deterministic teaching-route mechanics and clearer product
separation. It does not establish learning effectiveness, preferred order,
comprehension, accessibility conformance, external-preview evidence, or
publication readiness.
