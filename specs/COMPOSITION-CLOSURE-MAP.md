# Composition Closure Map Simulation Contract

Status: `sim-21` identified-result visualization; not a graph editor, relation
discovery system, canonical trace, recommendation, or reader evidence

## Purpose

The Composition Lab calls its result a bounded working graph, but its primary
display is a vertical sequence of exact stage records. A Composition Closure
Map projects the already-identified result into one finite picture of admitted
nodes, typed traversals, evaluative scopes, conflicts, and stopped boundaries.
It lets a reader see what the selected concepts formed before opening the full
Add, Multiply, Subtract, Evaluate, Stop, and Flatten audit.

The map is downstream of closure. It cannot add, remove, merge, select, rank,
or traverse anything. It receives the exact identified result that already
feeds the Composition Reading Route and mints no new work-product identity.

## Exact map record

The pure projection returns `factorium-composition-closure-map-v0` containing:

- the exact local result SHA-256 and repeated reference and relation digests;
- every admitted graph node exactly once, with artifact, binding label, owning
  page, class, depth, origin, predecessor, and selected/rejected disposition;
- every admitted relation exactly once, with canonical source, target, verb,
  qualifications, scope, declared query direction, traversal predecessor, and
  traversal-derived endpoint;
- one non-semantic scope link per admitted relation from that traversal to its
  admitted evaluative node;
- every budget frontier, unresolved relation requirement, conflict, and
  inactive exclusion exactly once;
- deterministic depth-column and within-column positions for admitted and
  frontier nodes.

Bindings come only from the 18 digest-bound Composition Reading records.
Relations come only from the six exact Composition Lab records. Rendering
fails closed on a digest mismatch, unknown or duplicate artifact, missing
admitted endpoint or scope, duplicate admitted relation, invalid direction,
nonexistent predecessor, or result/map identity mismatch.

## Direction and scope semantics

The solid arrow shows traversal, not a rewritten canonical relation:

- forward uses the relation source as predecessor and target as derived;
- reverse uses the relation target as predecessor and source as derived.

The map label retains the short F1-F6 code and human verb. Full records retain
the canonical source-to-target order and qualifications, even when the arrow
is traversed in reverse. Reverse traversal never reverses the typed relation's
meaning.

An evaluative scope is admitted because a relation owns a structural check. A
dashed `Evaluate` connector therefore runs from the traversal to the scope
node; it is not presented as another semantic relation. Frontiers use a dashed
outline and stop before admission. An unresolved relation whose predecessor
was never reached appears in the boundary list rather than as a fabricated
graph node or arrow.

## Deterministic layout

Admitted nodes use their exact closure depth as a zero-based column. Within a
column, seed nodes sort first, then required nodes, then evaluative nodes, with
artifact identity as the final key. Frontier ghosts occupy the next column
after their reached predecessor and sort after admitted nodes. Coordinates use
fixed documented card, gap, and margin constants; resizing scrolls or scales
the viewport but does not recompute semantic order.

The same identified result and binding payload produce the same map record and
coordinates regardless of input array order. Repeated nodes remain one node.
Multiple edges may meet the same node. Cycles and same-depth joins retain their
exact endpoints rather than being expanded into a tree.

## Interface and accessibility

The map appears after result state and counts, before the reading route. It
contains:

- a title and sentence binding it to the local result;
- visible counts for admitted nodes, traversals, frontiers, conflicts, and
  unresolved relations;
- an SVG with text-labelled node cards, arrow markers, solid typed traversals,
  dashed scope connectors, and explicit Selected, Required, Evaluate,
  Frontier, and Conflict words rather than color-only meaning;
- a visible legend;
- an exact-record disclosure containing ordinary HTML node, traversal, scope,
  and boundary lists in deterministic order;
- an explicit statement that the map is a projection and the book pages remain
  authoritative.

The SVG has a programmatic title and description. The exact-record disclosure
is the complete non-visual equivalent and remains usable when SVG styling is
unavailable. Narrow screens keep readable card dimensions in a horizontally
scrollable region rather than shrinking text below the surrounding book.
Reduced-motion preferences require no special mode because the map does not
animate.

The existing six-stage result records move into one native `details` audit
immediately after the map. Book, Abbreviated, and Compact begin with that audit
closed; Full begins open. Every negative state is summarized in the always-
visible map and boundary counts, and the reader may open or close the audit in
any profile.

## Failure and evolution boundary

The enhancement chains after the existing reading-route renderer. If its
assets are unavailable, the complete `sim-20` result and reading route remain.
If an identified result cannot satisfy the map contract, no partial map is
shown; a local `Map unavailable` notice leaves the exact stage records and
reading route intact.

The map uses no network request, storage, URL state, analytics, drag, zoom,
node mutation, free positioning, relation inference, or publication action.
The shared reader-view preference remains the only optional persisted display
state, and it is not an input to the map record.

## Conformance cases

| Case | Required map |
|---|---|
| Default forward F1 | three unique nodes, one solid source-to-target traversal, one dashed scope link, no frontier |
| Reverse F1 | same canonical relation and nodes; solid traversal runs target-to-source and says reverse |
| Two edges share a node | one node card with both exact traversals meeting it |
| Reached required node excluded | node retained and visibly Conflict/rejected |
| Edge budget stops eligible F6 | unadmitted target shown once as Frontier ghost with exact reason |
| Selected relation predecessor absent | no fabricated node or arrow; one unresolved boundary record |
| Inactive exclusion | no graph mutation; exact inactive boundary record |
| Result arrays reordered | byte-equivalent map record and coordinates |
| Full profile | exact accessible node, relation, qualification, and result identities visible; same map record |
| Map runtime absent or rejects input | base stage records and reading route remain usable |

Pure checks cover forward, reverse, shared-node, conflict, frontier, unresolved,
inactive-exclusion, order-invariance, coordinate uniqueness, and invalid-input
cases. Browser checks cover SVG and exact-record counts, text alternatives,
audit disclosure, profile behavior, mobile horizontal access, unchanged result
SHA-256, and the existing reading-route/factor-focus handoff.

## Claim boundary

This simulation establishes deterministic graph-display mechanics only. It
does not establish that the map improves understanding, reveals causal or
domain structure, recommends a path, represents every relevant concept,
supports a complete query, is accessible to a population, or helps readers
finish a real task. It is not semantic search, graph analysis, sense
disambiguation, persistence, collaboration, publication, or `preview-01`
evidence.
