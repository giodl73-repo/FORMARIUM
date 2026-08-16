# Composition Factor Focus Simulation Contract

Status: `sim-18` generated navigation projection; not canonical source markup,
a new factor definition, fragment stability beyond this edition, or reader
evidence

## Purpose

A Composition Reading Route can identify the exact admitted factor but, in
`sim-17`, its link opens only the top of the owning anchor entry. Composition
Factor Focus adds a stable fragment for each of the 12 reviewed F1-F6 endpoint
factors. Following a Start or Continue card lands on a small generated focus
card that names the exact factor and links onward to the entry's existing Root
factorization section.

The focus card is navigation metadata derived from Factorium Reference
Interchange V0. It does not insert a new definition into canonical Markdown,
claim that the prose has an exact factor-level span, or replace the full entry.

## Exact source contract

For each reviewed endpoint artifact `factor:<entry>/<factor>` the renderer
requires:

- an exact entry record with title and source path;
- an exact factor record with label inside that entry;
- an included generated page for the entry;
- exactly one `Root factorization` heading in the rendered entry;
- a unique generated focus ID
  `factor-focus-<entry>-<factor>`;
- a reading binding whose page destination remains the owning entry and whose
  optional focus destination appends that exact fragment.

The six relation scope views remain whole-view destinations and do not receive
factor focus cards. The reading payload retains 18 artifact bindings, with
focus destinations on exactly 12 anchor bindings.

## Generated page behavior

Each of the six affected entry pages contains two generated focus cards near
the beginning of the reading surface. CSS hides every card normally and shows
only the card matching `:target`. A visible card contains:

- `Composition focus` as its generated-navigation status;
- the exact human factor label;
- the exact factor artifact ID;
- the owning entry title;
- a statement that the repository entry remains authoritative;
- a local link to the existing Root factorization section.

This behavior requires no JavaScript. Removing the URL fragment returns the
ordinary Book-default entry page. Reader profiles continue to control the
canonical entry content; the focus card does not alter those preferences.

## Reading-route behavior

Page deduplication remains keyed by the fragment-free entry destination. When
several admitted factors share a page, all bindings remain disclosed on one
route card. Its link chooses the focus destination of the factor with the
earliest structural stage; therefore a seed focus wins over a derived focus.
Within one stage, deterministic artifact order chooses the focus. Evaluative
view cards retain their existing whole-page links.

The route does not claim that the focus factor is the only relevant material
on the page. The explicit Root factorization link is the handoff from generated
navigation to source-owned structure.

## Validation

Rendering fails on:

- an endpoint without an exact factor record;
- a missing or duplicate focus ID;
- an affected entry without exactly one Root factorization heading;
- a focus destination outside its owning entry page;
- an absent fragment or Root factorization target;
- a scope view carrying a factor focus destination;
- a factor focus destination with malformed artifact-derived identity;
- any focus addition leaking into `sim-17`.

Conformance checks cover forward and reverse seed focus selection, same-page
deduplication, conflict retention, fragment existence, default hidden state,
`:target` visibility, source handoff, and exact prior-edition regression.

## Claim and evolution boundary

This simulation establishes deterministic fragment mechanics and exact source
custody only. It does not establish that readers notice the card, understand
the factor faster, prefer this landing behavior, or succeed at their task.

Canonical factor-level anchors would require an entry-format and interchange
contract that places factors in source-owned addressable structures. Saved
focus, annotations, relevance ranking, and generated excerpts remain outside
this simulation.
