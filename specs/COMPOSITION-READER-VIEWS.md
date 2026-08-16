# Composition Reader Views Simulation Contract

Status: `sim-20` display projection; not a changed Composition Query, closure
policy, semantic search system, or reader evidence

## Purpose

Factorium already offers Compact, Abbreviated, Book, and Full reading profiles,
but the Composition Lab currently presents every exact identifier and relation
qualification at once. Composition Reader Views carry the same four profile
names into the lab. They scale explanation, metadata, and spacing around the
same explicit controls and the same identified closure result.

This is a view projection only. A profile cannot add, remove, select, clear,
disable, reorder, or rewrite a seed, relation, direction, budget, exclusion,
context selection, graph record, check, frontier, conflict, projection row, or
identity byte.

## Profiles

| Profile | Detail | Metadata | Spacing | Composition use |
|---|---|---|---|---|
| Compact | summary | minimal | tight | labels, state, readiness, controls, and boundaries |
| Abbreviated | core | minimal | tight | working explanations without exact custody strings |
| Book | core | essential | comfortable | default composition and reading view |
| Full | full | full | comfortable | exact artifacts, relation IDs, qualifiers, and result custody |

`Book` is the default when neither a valid `view` query parameter nor the
existing `factorium-reader-profile` preference names a profile. A valid query
parameter takes precedence over the stored preference. Unknown values fail to
`Book`. Selecting a profile updates only that reader-view preference and the
local `view` URL parameter; it does not serialize query inputs or results.

The same preference key is deliberately shared with the book reader so a
reader moving between Compose and an entry keeps one display posture. No new
profile vocabulary or second preference authority is introduced.

## Visibility levels

The following information remains visible in every profile:

- every input, label, selected state, direction, budget, and submit action;
- human concept labels and owning topic names;
- short relation code, human verb, and structural readiness;
- result state, graph counts, stage names, conflicts, frontiers, unresolved
  requirements, and the simulation/domain caveat;
- links into the canonical book and every review-boundary statement.

Essential metadata adds owning entry titles, human endpoint routes, field
explanations, and result context. Full metadata adds exact artifact IDs, full
relation IDs, raw directional endpoints, qualifications, check IDs, and the
complete local result digest. Compact can remove explanatory prose and reduce
spacing, but it cannot hide a result-changing control or a negative outcome.

Human labels are derived only from the digest-bound Composition Reading
bindings. They are display aliases beside exact controls; input values and
result JSON retain canonical artifact identities. Relation verbs, IDs,
qualifications, source, and target come only from the exact Composition Lab
payload.

## Runtime and custody

The profile enhancement loads after the base lab, reading route, factor focus,
and concept palette. If it is unavailable, `sim-20` retains the usable
`sim-19` Book-like lab with all exact metadata visible. The enhancement uses no
network request, analytics, account, or query-result persistence.

The browser may retain one non-sensitive display preference under
`factorium-reader-profile`. Problem text, context selections, seeds, relations,
direction, budgets, exclusions, canonical result JSON, graph, and identity are
never written to storage or the URL. Reloading still deletes the work product.

## Conformance cases

| Case | Required outcome |
|---|---|
| Fresh page with no profile state | Book active; essential visible; exact full metadata folded |
| Compact selected | same controls and checked values; minimal metadata and tight spacing |
| Full selected | every exact artifact, relation qualification, and full result digest visible |
| Profile changed after closure | identical canonical result JSON and SHA-256 |
| Profile changed before closure | identical normalized request for unchanged controls |
| Entry profile previously set | Compose adopts the same valid profile |
| `?view=book` plus stored Compact | Book wins for this page and becomes the retained preference |
| Unknown URL or stored profile | Book fallback |
| Reload after a completed query | profile may remain; query inputs return to edition defaults and result disappears |
| Enhancement unavailable | base lab remains usable with all exact metadata visible |

Browser checks must compare input names, values, checked states, select values,
text values, canonical result JSON, and SHA-256 across profile changes. They
must also verify that hidden full metadata is still present in the DOM, Full
reveals it, all four profile buttons are keyboard buttons with pressed state,
and only the profile name is stored.

## Claim boundary

This simulation establishes deterministic view projection and cross-surface
profile continuity. It does not establish that any profile is preferable,
more understandable, faster, accessible to a particular population, or a
successful default. It does not add semantic lookup, sense disambiguation,
relation recommendation, graph compatibility, persistence, collaboration,
publication, or external-reader evidence.
