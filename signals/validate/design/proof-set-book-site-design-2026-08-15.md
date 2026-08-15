---
skill: validate-design
topic: proof-set-book-site
date: 2026-08-15
reviewer_count: 9
p1_count: 0
p2_count: 8
p3_count: 28
domain_roles_active: [Accessibility Reviewer, Static Web Publication Engineer, Information Architecture and Search Reviewer]
---

# Proof Set Book Site Design Review

Reviewed artifact: `specs/PROOF-SET-BOOK-SITE.md` and implemented `sim-07`
projection.

## BLOCK 0 -- CONTENT SIGNAL CATALOGUE

| Signal phrase | Domain category |
|---|---|
| multi-page static website | platform |
| local `file:` URL | browser platform |
| keyboard skip link and visible keyboard focus | accessibility |
| search and chapter discovery | information architecture / search |
| canonical Markdown and reference metadata remain authoritative | content governance / provenance |
| Context Profiles decorate exact bindings | compositional semantics |
| SHA-256 digests and one site identity | reproducible publication |

## BLOCK 1 -- EXPERT ROSTER

Stock table:

| Reviewer | Role |
|---|---|
| Architect | Stock |
| Code-Quality | Stock |
| Documentation | Stock |
| Testing | Stock |
| Process | Stock |
| Implementation | Stock |

Domain expert table:

| Signal detected | Expert added | Reason |
|---|---|---|
| multi-page static website | Static Web Publication Engineer | Multi-file routing, shared assets, and serverless execution require publication-platform review. |
| local `file:` URL | Static Web Publication Engineer | Browser security and relative-path behavior differ for local files and hosted pages. |
| keyboard skip link and visible keyboard focus | Accessibility Reviewer | Long reference pages and repeated navigation require specialist keyboard and assistive-technology review. |
| search and chapter discovery | Information Architecture and Search Reviewer | Lookup and sequential reading must remain complementary and predictable. |
| canonical Markdown and reference metadata remain authoritative | No expert needed | Stock Architect, Documentation, Process, and Factorium role review cover authority and provenance. |
| Context Profiles decorate exact bindings | No expert needed | The scoped semantic contract already received Factorium-specific architecture and role review in Preflight 07. |
| SHA-256 digests and one site identity | No expert needed | Stock Testing and Implementation reviewers cover deterministic artifact identity. |

BLOCK 1 domain count = 3

## BLOCK 1.5 -- ROSTER COMMITMENT TABLE

| Reviewer | Role | Source |
|---|---|---|
| Accessibility Reviewer | Domain expert | Domain |
| Static Web Publication Engineer | Domain expert | Domain |
| Information Architecture and Search Reviewer | Domain expert | Domain |
| Architect | Stock discipline | Stock |
| Code-Quality | Stock discipline | Stock |
| Documentation | Stock discipline | Stock |
| Testing | Stock discipline | Stock |
| Process | Stock discipline | Stock |
| Implementation | Stock discipline | Stock |

Domain row count is 3 and exactly matches BLOCK 1.

## BLOCK 2 -- PER-REVIEWER FINDINGS

### Accessibility Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| A11Y-1 | Repeated header, breadcrumb, and reading controls initially had no bypass route. | P2 | Accessibility and progressive behavior | Closed: every page now has a focus-visible skip link targeting the main content landmark. |
| A11Y-2 | The folded `◌` qualifier relies on a title for sighted explanation, which is weak on touch devices. | P3 | Reading views and context | Add a compact first-use legend or an always-available notation help route before preview. |
| A11Y-3 | Responsive CSS exists, but no assistive-technology, zoom, forced-colors, or reduced-motion observation is retained. | P3 | Accessibility and progressive behavior | Add mechanical checks now and record real assistive-technology observation only when available. |
| A11Y-4 | Wide tables scroll, but the site gives no visible cue that horizontal content continues. | P3 | Accessibility and progressive behavior | Add an overflow affordance or responsive table wrapper in a later visual refinement. |

### Static Web Publication Engineer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| WEB-1 | Re-rendering into an existing output directory could retain stale pages or assets. | P2 | Determinism and validation | Closed: the renderer now rejects any chapter, entry, or asset set outside the exact expected shape. |
| WEB-2 | Windows validation is case-insensitive while likely hosting targets may be case-sensitive. | P3 | Determinism and validation | Add a case-sensitive CI or container smoke test before hosted publication. |
| WEB-3 | File routes are deliberately long and path-derived; platform path-length limits are not asserted. | P3 | Page model | Add maximum filename/path checks before the corpus approaches volume scale. |
| WEB-4 | Browser history and scroll restoration across search, chapters, and entries are mechanically plausible but not exercised as a journey. | P3 | Navigation contract | Add a scripted multi-page browser journey when browser automation becomes a retained test surface. |

### Information Architecture and Search Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| IA-1 | Dedicated pages without exact chapter ownership would reproduce a repository browser rather than a book. | P2 | Navigation contract | Closed: eight routes own all 95 indexed records exactly once and breadcrumbs return to the owner. |
| IA-2 | Chapter pages currently provide titles, metadata, and sequence but little editorial introduction. | P3 | Page model | Add bounded chapter orientations sourced from the volume projection, not copied into templates. |
| IA-3 | Previous/next crosses chapter boundaries without naming that transition on the entry page. | P3 | Navigation contract | Mark boundary transitions or include the owning chapter beside sequence labels. |
| IA-4 | Search exposes kind but not domain, maturity, or table-family facets. | P3 | Deferred work | Add facets only as generated publication metadata, keeping construction/search Workbench scope deferred. |

### Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| ARCH-1 | A multi-page export could become a second editorial authority. | P2 | Purpose | Closed: every content page renders one exact selected source and the manifest binds all inputs and outputs. |
| ARCH-2 | The retained monolith and primary site can confuse which projection readers should enter. | P3 | Page model | Keep `index.html` primary in documentation and label the monolith as compatibility-only, as the preflight now does. |
| ARCH-3 | Path-derived page names have no redirect or supersession policy if canonical source paths move. | P3 | Navigation contract | Define redirects only when the prototype becomes a hosted release artifact. |
| ARCH-4 | Chapter extraction depends on current Markdown heading and numbered-list conventions. | P3 | Determinism and validation | Promote an explicit publication-selection manifest if additional volumes make the convention fragile. |

### Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| CODE-1 | `render_proof_set.ps1` now owns selection, monolith, search, reader, context, and site concerns in one large script. | P2 | Implementation | Accepted for this bounded rehearsal; modularize before another major publication surface is added. |
| CODE-2 | Inline HTML templates require disciplined encoding at every interpolated text boundary. | P3 | Implementation | Retain explicit `HtmlEncode` calls and add focused hostile-title fixtures before accepting outside contributions. |
| CODE-3 | Source and rendered segments are read repeatedly during one render. | P3 | Implementation | Cache only if render time becomes material; current scale remains small and deterministic. |
| CODE-4 | Regex-based HTML routing is bounded by Pandoc output but will become brittle with arbitrary plugins. | P3 | Navigation contract | Keep Pandoc inputs constrained or move to a DOM-aware postprocessor before extending the rendering stack. |

### Documentation

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| DOC-1 | The multi-page route and authority rules needed a named contract. | P2 | Whole design | Closed: `specs/PROOF-SET-BOOK-SITE.md` defines routes, authority, validation, accessibility, and deferrals. |
| DOC-2 | README gives the render command but no Pandoc/file-browser troubleshooting. | P3 | Determinism and validation | Add troubleshooting only after failures recur; avoid turning the main README into tool support prose. |
| DOC-3 | The folded context marker lacks a reader-facing notation legend. | P3 | Reading views and context | Add a short notation help surface alongside future chapter front matter. |
| DOC-4 | “Source page,” “indexed entry page,” and “supporting source page” are precise but easy to conflate. | P3 | Page model | Preserve the table and reinforce the distinction in preview quickstart material. |

### Testing

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| TEST-1 | Static link checks alone would miss JavaScript initialization and routed search behavior. | P2 | Determinism and validation | Closed for simulation: Edge executed home search, Agency reader behavior, and the Force context binding from `file:` URLs. |
| TEST-2 | The stale-output rejection has no committed negative fixture. | P3 | Determinism and validation | Add one if the site renderer graduates from rehearsal tooling into a supported publication command. |
| TEST-3 | Desktop screenshots do not cover mobile layout, zoom, or assistive technology. | P3 | Accessibility and progressive behavior | Add viewport and accessibility-tree smoke checks in the next internal refinement. |
| TEST-4 | Determinism should be checked by two consecutive renders over the same tree. | P3 | Determinism and validation | Confirm identical site identity during final validation and retain the result in Preflight 08. |

### Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| PROC-1 | A polished website could be mistaken for a preview admission or usability result. | P2 | Purpose / Deferred work | Closed: UI, manifest, spec, roadmap, and preflight consistently say simulation, not reader evidence or `preview-01`. |
| PROC-2 | A manifest rendered before commit records a dirty workspace and prior source commit. | P3 | Determinism and validation | Re-render after the focused commit so the disposable manifest names the admitted revision cleanly. |
| PROC-3 | Promotion criteria from `sim-07` to a preview candidate are intentionally absent from the site contract. | P3 | Deferred work | Keep promotion in the R5P entry gate rather than weakening it inside a simulation spec. |
| PROC-4 | External usability and accessibility evidence remain unavailable. | P3 | Deferred work | Continue internal mechanics without representing them as observed behavior. |

### Implementation

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| IMPL-1 | Relative routes require file and fragment validation across three directory levels. | P2 | Navigation contract | Closed: the renderer resolves 2,065 local links and fails on every missing page, asset, or fragment. |
| IMPL-2 | Generated HTML trusts repository Markdown processed by Pandoc. | P3 | Purpose | State that contributor sanitization is a hosting concern before accepting untrusted inputs; current sources are repository-reviewed. |
| IMPL-3 | Case-insensitive dictionaries could conceal a case-only collision on another filesystem. | P3 | Determinism and validation | Add a case-sensitive build job before production hosting. |
| IMPL-4 | Embedding the full search and context payload in one shared asset is appropriate now but may grow costly near 250 entries. | P3 | Page model | Measure payload and parse cost at R5 scale before introducing chunking or server APIs. |

## BLOCK 3 -- SYNTHESIS

Overall verdict: APPROVED

P1 blockers (must resolve before implementation):
  - None -- proceed to implementation

P2 conditions (must resolve before sign-off):
  - None open. A11Y-1, WEB-1, IA-1, ARCH-1, DOC-1, TEST-1, PROC-1, and IMPL-1 are closed in `sim-07`. CODE-1 is accepted only for the bounded rehearsal and becomes a condition before another major renderer surface.

Cross-reviewer consensus:
  The strongest property is one canonical source selection supporting search,
  chapters, and entries without copy authority. Reviewers also agree that the
  current mechanics are substantially stronger than the retained evidence:
  accessibility observation, findability, and practitioner value remain
  deferred even though routing and deterministic validation pass.

Strongest signal:
  Preserve exact chapter/source ownership and fail-closed local routing as the
  site grows; otherwise the book will drift into a second content system.

## AMEND

1. Add stale-output and exact-asset-set rejection to **Determinism and validation**, preventing old generated pages from entering a new identity. Completed.
2. Add a keyboard skip link to **Accessibility and progressive behavior**, providing a bypass around repeated navigation and reading controls. Completed.
3. Add chapter-aware routes and breadcrumbs to **Page model** and **Navigation contract**, ensuring dedicated pages still form a book. Completed.
