# Factorium Tables Alphabetical Index

Status: internal browse contract candidate

## Reader job

A reader who wants to browse Factorium as a dictionary should be able to scan
canonical Table headwords alphabetically without entering the Reader's
chapter sequence or mixing canonical entries with Guides.

## Product change

`sim-35` adds a dedicated `tables.html` route. Its primary index contains all
53 canonical entry families sorted by selected title and grouped under their
17 occupied initial letters. Each row links the entry and states its domain
and exact specialized-view count.

A separate **Curated Table records** section contains the 27 selected Tables
outside the current interchange. Factor Guides and Reader records do not enter
either index. Existing book parts remain under **Contents** as a separate
Reader/ordered route.

## Admitted inputs

Index membership and class come from exact edition-local search custody backed
by `reference/factorium-reference-v0.factorium`. Titles, destinations, and
domains come from selected records; specialized-view counts come from exact
canonical ownership. Alphabetical grouping is presentation order only.

## Routing contract

- Factorium Tables' Browse action opens `tables.html`;
- Table navigators' Browse Tables action opens the same route;
- primary navigation exposes `Index` and keeps `Contents` distinct;
- Search remains a separate route back to the home search control;
- every index destination resolves to an existing dedicated page;
- letter links include occupied canonical letters only.

## Meaning boundary

Alphabetical adjacency does not assert semantic relatedness, hierarchy,
synonymy, dependency, recommendation, or closure. Curated records are useful
edition selections but are not relabelled canonical entries.

## Compatibility and checks

- exact 53 canonical families, 95 owned views, and 17 occupied letters;
- exact 27 curated Table records in a separately labelled section;
- zero Guide or Reader records in the index;
- lossless, duplicate-free membership and local targets;
- canonical rows sort by normalized selected title within each letter;
- desktop and 390-pixel layouts have no horizontal overflow;
- `sim-34` reproduces exactly.

## Claim boundary

This establishes deterministic dictionary-style browse mechanics. It does not
establish findability, preferred ordering, completeness, accessibility
conformance, lookup success, external-preview evidence, or publication
readiness.
