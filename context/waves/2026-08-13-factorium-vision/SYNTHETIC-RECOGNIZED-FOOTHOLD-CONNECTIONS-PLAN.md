# Synthetic Recognized-Foothold Connections Plan

Date: 2026-08-17

Status: frozen before execution

Campaign: `SUJ-09`

Evidence class: deterministic dependent recognized-foothold navigation audit

## Product question

The automatic segmentation branch is closed, but Factorium already has a
book-native bridge: every Table page previews up to six authored cross-
references. Test whether a person who recognizes one intended Search family
could reach a second intended family with one explicit click and one visible
authored connection.

This is not an automatic selector. “Recognized foothold” is an analyst-scored
condition: an intended canonical family already present in the first ten
results of the frozen SUJ-05 query. The audit measures whether a route exists
after that condition; it cannot show that a reader would recognize or choose
the foothold.

## Frozen execution

Reuse all ten SUJ-05 tasks, first queries, intended paths, first-ten ownership
groups, and exact `sim-45`. For every intended family visible in the first ten,
open its owning Table page and inspect only the first six links rendered in
`table-navigator__connections`. Traverse exactly one link as rendered,
normalize its destination to canonical family ownership, and compute an
identity-only union with the starting families.

Do not traverse a non-intended Search result, use the full Cross-references
section beyond the six-link preview, reverse a link, retry a query, type a
relation, or expand a second hop. Retain tasks with no recognized foothold as
ineligible failures.

## Admission gate

All conditions must pass:

1. Exactly 9/10 tasks remain eligible, matching the frozen SUJ-05 foothold count.
2. At least 6 of the 8 tasks previously below two families gain a second
   intended family through the one-click preview route.
3. At least 8/10 tasks expose two intended families after conditional expansion.
4. Every surfaced link remains labelled authored, untyped navigation—not
   synonymy, broader/narrower structure, dependency, semantic relation, or closure.

Passing admits only a small Search cue telling readers to open a recognizable
family and inspect its authored connections. It does not admit automatic
selection, a merged neighborhood, typed edges, or a concept graph. Failure
preserves `sim-45` without `sim-46`.

## Product and evidence boundary

Reader: a question-led visitor who recognizes at least one plausible family.
Job: move from one vocabulary foothold to a second relevant distinction.
Current friction: authored connections are visible only after opening the
Table page. Smallest candidate: a cue explaining that existing route.

The audit can establish route existence and exact rendered custody only. It
cannot establish recognition, selection, relevance, comprehension, usefulness,
preference, demand, or reader success.
