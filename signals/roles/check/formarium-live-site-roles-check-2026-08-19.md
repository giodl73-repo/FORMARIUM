---
skill: roles-check
topic: formarium-live-site
date: 2026-08-19
roles_used: 8
p1_count: 0
p2_count: 0
verdict: PASS
---

# Formarium Live Site Roles Check

## Artifact identification

Type: deployed public reference site, mixed dictionary, teaching route, and
condensed book projection.

Initial reviewed deployment:
`https://giodl73-repo.github.io/FORMARIUM/` at source commit
`d7c04f265efca188a93edad734f10d0ea4eb1b86`.

Scope:

- home and primary navigation;
- 304-item mixed Tables index;
- continuous dictionary;
- condensed book on screen and in print;
- 24-record Reader route;
- authority, evidence, provenance, licensing, and generated checks.

This review does not re-review the domain correctness of all 54 canonical Table
families.

## Frame

The working owner system is the repository-authored Formarium Tables. The site
should make three reader jobs easier without creating another authority:

1. find a term or canonical family;
2. read the dictionary continuously or as a compact book;
3. learn the bounded method through the Reader.

The falsifiable thesis is that each route preserves one canonical authority and
can be followed in its visible order without contradictory counts, duplicate
destinations, or hidden custody.

The idea is disproved if a reader cannot follow A-Z order, if two pages disagree
about the same projection, or if a published/printed artifact cannot identify
its edition and source.

## Role selection

| Role | Why selected |
|---|---|
| Product Owner | The front door must improve recognizable reader jobs without letting auxiliary surfaces displace the two books. |
| Reference Practitioner | Index, continuous, book, and Reader routes must support useful reading with low navigation cost. |
| Reference Lexicographer | Pointer and canonical entries must remain distinguishable in one A-Z projection. |
| Reference Architecture Editor | Multiple views must remain projections of one authority with coherent navigation and counts. |
| Evidence & Claims Editor | Public status and validation language must not overstate reader evidence. |
| Mapping Integrity Auditor | Pointer, Reader, and condensed-book projections must expose direction and loss. |
| Research Integrity & Provenance | A deployed or printed result must remain traceable to its source edition. |
| Schema Implementer | Counts, ordering, projection rules, and reading behavior need deterministic regression checks. |

## Audit evidence

- The mixed index contains 250 pointer entries and 54 canonical Table families,
  with explicit type labels and a presentation-only adjacency disclaimer.
- The continuous view progressively loads all 304 records and retains a manual
  load/retry control.
- The condensed book contains 304 records and 183 collapsed supplemental
  sections. Print hides those supplements.
- Desktop browser geometry at 1280 px measured a 125,157 px document. The first
  right-column item is item 143, `Interpretation`, at y=546 px. Item 142 is the
  first fragmented entry. Therefore the visible reading order runs approximately
  124,000 px down the left column and then returns to the top of the right
  column.
- The home page says the Reader hands off to 157 additional selected Tables.
  `reader.html` says the route does not rank the other 151 records.
- The home primary navigation exposes 11 links and sends both `Tables` and
  `Index` to `tables.html`.
- A second Reader promotion on the home page labels a quickstart link `Start the
  Reader` and labels a method-guide link `Open the Reader route`, even though
  `reader.html` is the actual Reader route.
- `manifest.json` is deployed and binds the site to source commit and hashes,
  but no primary public route discovers it. Printed condensed output hides both
  detailed provenance and standalone links.
- Current browser checks assert `columnCount`, item count, supplement state, and
  overflow, but not visual sequence geometry. The Reader depth statement remains
  a separate literal.

## Comparison

### Internal analogues

| Analogue | Classification | Lesson |
|---|---|---|
| Continuous A-Z | Reuse | It preserves simple top-to-bottom DOM and visual order while progressively loading content. |
| Page-by-page dictionary | Reuse | It gives every transition an explicit previous/next destination. |
| Print book CSS | Adapt | Bounded physical pages make two-column flow natural; screen needs an equivalent bounded page or a different reading layout. |
| Home intent cards | Adapt | Three reader jobs are useful, but their destinations and global hierarchy must be singular and stable. |
| Literal edition counts | Avoid | Repeated prose literals drift even when manifest counts remain correct. |

### External comparators

- CSS Multi-column Layout defines child content as one normal flow arranged into
  columns and balances auto-height columns by default. That behavior is correct
  CSS but unsuitable for a 125,000 px unbounded screen reading surface:
  <https://www.w3.org/TR/css-multicol-1/>.
- WCAG 2.4.1 emphasizes bypassing repeated navigation blocks so sequential
  navigation reaches primary content efficiently:
  <https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html>.

## Findings

### Reference Practitioner

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | The desktop condensed book is not sequentially readable. A-Z order proceeds to the bottom of a 125,157 px left column before returning to the top of the right column. | P2 | Use bounded page-height columns with explicit page progression, or use a top-to-bottom screen layout while retaining two-column pagination for print. Add a geometry assertion that the next visual item never requires a large reverse scroll. |
| 2 | The home page offers duplicate Reader starts whose labels do not match their destinations. | P2 | Make `reader.html` the one `Open/Start the Reader` destination; label quickstart and complete-method links by their actual artifacts or remove the redundant Reader block. |

### Product Owner

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | “Two books, one reference” competes with an 11-link primary navigation, duplicate `Tables`/`Index` destinations, and equal top-level Problems/Compose/Traces surfaces. | P2 | Reduce the stable primary navigation to singular product destinations. Group problem/composition tools under one subordinate task route and delete duplicate Reader promotion. |
| 2 | The intended jobs are recognizable and the Tables/Reader authority statement is strong. | P3 | Pass; preserve the three-job framing while simplifying destinations. |

### Reference Architecture Editor

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | Home and Reader disagree on the same depth projection: 157 additional records versus 151 other records. | P2 | Derive both statements from one edition-local count and assert the rendered text. Standardize `Formarium Tables` rather than alternating with `Factor Tables`. |
| 2 | The book toolbar drops the stable Formarium/Reader cross-navigation used elsewhere. | P3 | Add a compact Formarium home route without restoring full site chrome. |

### Research Integrity & Provenance

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | The deployed manifest is reconstructable but undiscoverable, and compact print removes both provenance sections and standalone links. | P2 | Add one compact edition/source/manifest citation to screen and print. Keep detailed provenance collapsed or omitted as requested. |
| 2 | The split content license remains visible through the CC BY-NC footer link. | P3 | Pass; add a discoverable repository/software-license route when the compact edition citation is introduced. |

### Schema Implementer

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | Tests prove two columns exist but do not prove the book is readable in visual order; repeated Reader count prose is not regression-checked. | P2 | Add browser geometry/sequence checks and exact single-source Reader depth checks. |

### Reference Lexicographer

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | Pointer and canonical records remain visibly distinct in all three dictionary views; alphabetical adjacency is explicitly non-semantic. | P3 | Pass. |
| 2 | Global `Terms` means Pointer Entries, while many readers will interpret it as legal terms. | P3 | Rename the route `Pointers` or `Term Index`; reserve licensing/about language for an explicit publication route. |

### Mapping Integrity Auditor

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | Pointer entries remain generated concordances, canonical owners retain standalone destinations, and condensed supplements remain recoverable on screen. | P3 | Pass. |
| 2 | Print is intentionally lossy but does not currently identify the loss boundary outside the title-page prose. | P3 | Include the compact edition citation and state that supplemental sections are available in the online edition. |

### Evidence & Claims Editor

| # | Finding | Severity | Closure condition |
|---|---|---|---|
| 1 | The site consistently avoids claiming reader validation and identifies synthetic/internal mechanics. | P3 | Pass. |
| 2 | `not preview-01` is internal workflow language on a public page rather than reader-facing evidence language. | P3 | Replace it with a compact edition-status statement linked to the manifest. |

## Synthesis

Roles reviewed: 8

Initial P1 blockers: 0 | initial P2 issues: 5 | remaining P1/P2 issues: 0

Verdict after the initial review: **FINDING**.

Top finding: the condensed book's desktop columns are correct CSS but incorrect
screen reading architecture.

Cross-role consensus:

1. repair visual reading order before further book styling;
2. derive all Reader depth language from one count;
3. simplify the primary hierarchy and delete duplicate Reader starts;
4. retain a compact edition/provenance citation even when detailed supplements
   are hidden;
5. test sequence geometry and rendered count text, not only CSS properties.

## Cheapest next slice

Build one bounded screen-page prototype containing enough mixed entries to force
one canonical entry across a column boundary. Prove left-to-right, top-to-bottom
progression, one-column mobile fallback, two-column print, and no large reverse
scroll. Do not change canonical entry sources.

## Final fixed-point result

All five P2 findings and the nine P3 notes were closed without changing
canonical entry sources.

| Role | Closure evidence |
|---|---|
| Reference Practitioner | The desktop book now uses bounded-height two-column pages with sticky Previous/Next controls and horizontal page progression. Browser proof advances from page 1 to page 2 without reverse vertical scrolling. Mobile remains one-column vertical. |
| Product Owner | The duplicate Reader promotion was deleted. Every generated page now uses five stable primary destinations: Tables, Reader, Work with a question, Search, and Contents. |
| Reference Architecture Editor | Home and Reader both derive 157 additional records from one edition variable. Public copy consistently says Formarium Tables. The compact book restores Home and Reader routes. |
| Research Integrity & Provenance | All 503 generated HTML pages expose edition, manifest, source commit, MIT software license, and CC BY-NC content license. The book title page retains absolute edition/source/online URLs in print while detailed supplements remain omitted. |
| Schema Implementer | Static checks bind the shared count, stable navigation, status, provenance, screen/mobile/print flow contracts, and removed duplicate section. Browser checks bind bounded height, horizontal overflow, page advancement, sticky controls, one-column mobile, and two-column print. |
| Reference Lexicographer | The ambiguous global Terms label was removed; the secondary route is now named Pointer index. Mixed A-Z labels and non-semantic adjacency boundaries remain unchanged. |
| Mapping Integrity Auditor | The screen keeps supplements recoverable and standalone routes visible; print names its online loss-recovery route on the title page. |
| Evidence & Claims Editor | Public status now reads “internally validated projection, not reader-outcome evidence” and links to the exact manifest instead of exposing `preview-01` workflow jargon. |

Regression proof:

- `sim-66` canonical/static checks pass;
- desktop paged-book, mobile, print, supplement, and continuous-stream browser
  checks pass;
- `sim-35` renders;
- `sim-42` Reader candidate checks pass with its historical 151-record depth;
- `sim-52` pointer concordance checks pass with its historical Terms label;
- generated local-link validation reports zero missing targets.

Live verification:

- GitHub Pages run
  [`32313557378`](https://github.com/giodl73-repo/FORMARIUM/actions/runs/32313557378)
  rendered from a clean checkout and deployed successfully.
- The live manifest identifies source commit
  `ddb5980398b27dc7a503a16e7cc1219111febc3b`, edition `sim-66`, zero missing
  local targets, and the bounded-screen, single-column-mobile, and
  two-column-print flow contracts.
- Live Edge geometry at 1280 px reports 304 records, 183 collapsed supplements,
  a 705 px bounded flow region, no vertical overflow within that region, and
  199 horizontal pages. Next advances the status from page 1 to page 2.
- At 390 px, the live book uses one vertical column with no document-level
  horizontal overflow. Print uses two columns and omits controls and
  supplements.
- The live home exposes five primary links and no duplicate Reader start. The
  Reader uses the shared 157-record depth, and Tables exposes Pointer index,
  Continuous A-Z, and Condensed book routes.

Final verdict: **PASS**. Continue the two-book model with bounded screen pages;
stop unbounded balanced columns, repeated count literals, duplicate Reader
starts, and edition-undiscoverable public output.
