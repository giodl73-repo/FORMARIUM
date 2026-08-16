# Proof Edition Reader Journey and Chapter Balance

Status: reviewed implementation design for internal `sim-08`; not reader
evidence or `preview-01`

Date: 2026-08-15

## Question

How should the current static Proof Set become easier to enter and read now
that editorial growth has expanded it to 124 indexed destinations across 24
chapters, without changing canonical content, claiming observed usability, or
turning the site into Factorium Workbench?

## Current-state audit

The generated `sim-07` site is mechanically sound: 163 pages, 138 selected
sources, 124 indexed records and guides, and no missing internal targets. Its
publication hierarchy has not kept pace with that growth.

| Signal | Current result | Design implication |
|---|---:|---|
| Indexed destinations | 124 | Search needs a second bounded discriminator beyond record kind. |
| Chapters | 24 | A flat chapter grid no longer communicates a deliberate book shape. |
| Chapters with one or two records | 15 | Factor Forge intake batches have become visible as publication chapters. |
| Largest chapter | 32 records | Quantity and physical material remains too concentrated relative to later additions. |
| Entry / formula / diagnostic records | 39 / 21 / 16 | The reference has useful depth, but the route into those families is implicit. |
| Largest domains | reference 26, science 26, structure 18 | Domain is a useful bounded search facet already owned by canonical metadata. |
| External reader sessions | 0 | All changes remain hypotheses exercised by deterministic simulation only. |

The primary problem is orientation, not missing content. The homepage offers
search and a flat contents grid, while the Quickstart exists as a separate
support page. A new reader is asked to choose among 24 chapters before the
site demonstrates the Factorium method.

## Intended reader decision

The first screen must let a reader choose among three modes without learning
repository vocabulary:

1. **Start with the method** — follow one short, ordered orientation journey.
2. **Look up a concept** — search by ordinary terms and optionally narrow by
   record kind or domain.
3. **Browse the book** — enter a coherent chapter rather than an intake batch.

These are publication routes over one source graph. They do not create new
canonical entries or infer which route a reader prefers.

## First journey

The homepage will expose one five-step orientation sequence:

1. **Choose a coordinate** — Root Table.
2. **Name the structural job** — Factor Role Table.
3. **Judge a decomposition** — Factorization Quality.
4. **Recognize a failure** — Factorization Failure Diagnostic.
5. **See the method applied** — Aqueous Solution Amount-Concentration Guide.

The sequence moves from navigation, through structure and quality, into a
complete application. Each step links to an already selected generated page.
The renderer will fail if a target disappears, is duplicated, or lacks a
generated route.

## Chapter architecture

The five base-volume parts remain stable. The nineteen Factor Forge extension
parts will be regrouped into six subject chapters while retaining every
canonical path exactly once:

| New part | Governing route | Existing material combined |
|---|---|---|
| VI | Systems, organizations, and coordinated work | systems, governance, evidence/control, software mechanisms, workflow/recovery |
| VII | Claims, sampling, measurement, and statistics | causal evidence, generalization, calibration, summaries and intervals |
| VIII | Mathematics, geometry, and units | relation solving, reference frames, quantity value and conversion |
| IX | Matter, reaction, and thermodynamic state | chemical classification, reaction/equilibrium, thermodynamic systems/phases |
| X | Waves, electrical response, and information | spectra/dispersion, electrical response, channels/capacity |
| XI | Balances, accounting, and value | stock/flow conservation, economic basis, inflation, and NPV |

Applications remains a separate guided-use chapter. The result is twelve
chapters total: five base parts, six extension parts, and Applications.
Record numbering becomes one continuous publication sequence from 1 through
122; the two guides remain unnumbered applications.

Each chapter page preserves the source document's `###` subsection headings
and groups its record cards beneath those headings. This gives the 32-record
quantity chapter and the larger merged extension chapters visible internal
routes without creating more top-level chapters. A chapter may omit a generic
description, but it may not flatten owned subsections into one undifferentiated
card wall.

## Search contract

Search retains client-side deterministic ranking and adds an optional domain
filter derived from canonical search metadata. Query, kind, and domain remain
encoded in the URL. Results show kind and domain, never silently hide a filter,
and remain capped at twenty visible results with an exact total count.

The control offers only nonblank domains present in the selected search index.
Filters compose by exact kind and domain before text ranking. With JavaScript
unavailable, a visible note directs the reader to the complete chapter list;
the first journey and contents remain ordinary links.

This is bounded navigation within one frozen publication selection. It does
not add open-ended faceting, graph construction, recommendation, analytics,
or editorial mutation associated with Workbench.

## Reading and accessibility contract

- The first journey is an ordered semantic list with descriptive link text.
- Search controls remain labelled, keyboard reachable, and responsive.
- Chapter cards expose record counts and publication part labels.
- Book remains the default reader profile; all existing local expansion and
  Context Profile behavior is preserved.
- No route requires JavaScript to reach the chapter contents or first journey.
- Search enhancement may require JavaScript, but the book remains browsable
  without it.

## Deterministic checks

The renderer must establish:

- exactly 12 chapters and complete, unique ownership of all 124 indexed
  records and guides;
- five unique first-journey targets, all included and locally linked;
- zero missing page, fragment, asset, search, Context Profile, or task-route
  targets;
- domain filtering retains exact matching-domain records and composes with
  query and kind filters;
- empty search, query-only, kind-only, domain-only, and combined-filter cases
  are exercised against the generated search index, including URL-state
  restoration;
- two consecutive renders produce the same site identity.

## Claim boundary

The implementation can show reduced chapter count, complete route coverage,
valid local links, deterministic search behavior, responsive CSS, and browser
mechanics. It cannot show that a new reader notices the journey, selects the
right route, understands Factorium, completes a task, prefers the design, or
returns to use it. Those remain external-reader questions.
