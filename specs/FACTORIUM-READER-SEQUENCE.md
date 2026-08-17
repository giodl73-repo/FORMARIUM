# Factorium Reader Sequence Navigation

Status: internal navigation contract under implementation

Reference implementation: `sim-37`

## Reader job

A reader who opens one of the 24 selected Reader steps should be able to
continue through that teaching sequence without returning to its contents page
or accidentally following the unrelated 185-record all-contents order.

## Product change

`sim-37` adds one static Reader-sequence navigator to exactly the 24 Table pages
selected by the frozen Book One manifest. It identifies the current step and
authored part, links back to `reader.html`, and exposes the exact previous and
next Reader destinations where they exist.

The existing global entry pagination remains separately labelled and unchanged.
The navigator is a generated publication projection; it does not modify Table
content, canonical identity, source markup, or search order.

## Admitted inputs

Membership and order come only from
`volumes/01-structure-quantity-choice/book-one-sim-candidate-v0.factorium`.
Part labels and boundaries come from the exact authored spine in
`guides/bounded-question-composition-book-one.md`. Destinations and titles come
from edition-local selected-record custody.

## Navigation contract

- exactly 24 selected Table pages receive the Reader navigator;
- step numbers are contiguous 1-24 and part labels follow 6/6/5/4/3 bounds;
- every page links back to the Reader contents;
- steps 2-24 link the exact previous step and steps 1-23 link the exact next;
- the first page has no Reader previous link and the last has no Reader next;
- non-spine pages receive no Reader-sequence navigator;
- the all-record pagination remains visually and accessibly distinct.

## Meaning boundary

Previous and next mean editorial teaching order only. They do not assert
prerequisite, dependency, semantic adjacency, hierarchy, rank, completeness,
progress, or mastery.

## Compatibility and checks

- exact 24 panels, 24 contents links, 23 previous links, and 23 next links;
- exact ordered destinations and correct first/last boundaries;
- zero panels on the other 161 indexed pages and all supporting pages;
- separate Reader and all-record navigation labels;
- desktop and 390-pixel layouts without horizontal overflow;
- `sim-36` reproduces exactly.

## Claim boundary

This establishes deterministic sequence-continuation mechanics. It does not
establish learning effectiveness, completion, progress, preferred order,
comprehension, external-preview evidence, or publication readiness.
