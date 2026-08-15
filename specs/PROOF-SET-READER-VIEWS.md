# Proof Set Reader View Profiles V0

Status: simulation publication contract

## Purpose

One canonical Factorium record must support quick scanning, ordinary book
reading, focused reference lookup, and full editorial inspection without
forking its content. Reader views are disposable publication projections over
the selected Markdown and canonical reference metadata. They never become an
alternate entry authority.

## Independent axes

| Axis | Levels | Governing question |
|---|---|---|
| Content detail | summary, core, full | How much of the substantive entry should be visible? |
| Metadata | minimal, essential, full | How much status, provenance, and editorial context should be visible? |
| Density | tight, comfortable | How much visual space should tables and sections use? |

Changing one axis MUST NOT silently change another. A custom combination is a
view preference, not a new named content form.

## Named profiles

| Profile | Content | Metadata | Density | Primary use |
|---|---|---|---|---|
| Compact | summary | minimal | tight | scan titles and orientations |
| Abbreviated | core | minimal | tight | fast reference lookup without editorial apparatus |
| Book | core | essential | comfortable | default sustained reading and application |
| Full | full | full | comfortable | inspect every selected section and supporting source |

`Book` is the default. It keeps sense, factor, relation, selection, constraint,
and failure material visible while suppressing deep provenance and comparison
apparatus. `Full` reconstructs the complete rendered source selection; it is
not described as more correct than the other profiles.

## Section semantics

Summary content establishes the headword and orientation. Core content owns
the entry's operative reference value: senses, contrasts, root or conceptual
factorizations, governing relations, symbol contracts, selection procedures,
scope, constraints, failure signs, and specialized-view links. Full content
adds extended examples, diagnostics, equivalent forms, dimensional audits,
change tests, cross-references, and unresolved-choice detail.

Essential metadata includes the visible status, primary family, canonical
headword, selected sense, maturity, or resolution status needed to interpret a
record responsibly. Full metadata adds Sources and provenance, Reference
Delta, supporting publication documents, and other editorial apparatus.

Heading classification is a publication rule, not a semantic inference. An
unknown section defaults to core content so new material cannot disappear from
the Book view merely because the renderer does not recognize its heading.

## Interaction invariants

- Every indexed record remains addressable by one stable in-book anchor.
- A deep link MUST reveal its target even when the active profile normally
  suppresses that section.
- Every entry offers a local Full override without changing the global view.
- Search and view query parameters MUST coexist and survive either control's
  updates.
- The active named profile may persist locally; no account or telemetry is
  required.
- Supporting sources hidden by a reader profile remain present in the
  standalone artifact and visible in Full.
- Profile changes do not mutate Markdown, reference metadata, manifests, or
  search records.
- Native headings, tables, links, controls, focus order, and live status text
  remain available to assistive technology.

## Non-goals

- personalized semantic recommendations;
- hiding limitations to make an entry appear stronger;
- separate compact, book, and full content forks;
- a Workbench authoring or contribution interface;
- evidence that readers select or understand the right profile.
