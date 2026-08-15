# Proof Set Simulation Preflight 08 - Book Site

Status: internal simulation complete; no external reader evidence

Date: 2026-08-15

## Question

Can the current Proof Set projection become a small book-shaped static website
with direct lookup, curated chapter reading, stable entry pages, and adaptive
views without introducing a server, duplicating content authority, admitting
`preview-01`, or claiming observed usability?

## Plan review

The smallest complete architecture is one search/title page, one route per
curated chapter, and one generated page per included Markdown source. The 95
reader-facing records and guides retain the publication order and receive
adaptive entry treatment; 14 supporting sources remain linked but do not enter
the indexed record sequence.

The site must be a projection over the same exact source selection used by the
standalone proof. Chapter ownership comes from `VOLUME.md`, the exact Factor
Forge supplement, and the two selected guides. Search metadata comes from the
canonical reference where available and bounded source derivation otherwise.
No page owns a copied editorial body.

The renderer must fail closed on incomplete or duplicate chapter coverage,
page-name or rendered-ID collisions, missing local files or fragments, and all
selection, task, search, reader, and Context Profile drift already guarded by
`sim-06`.

## Applicable role review

| Role | Disposition | Reason |
|---|---|---|
| Reference Architecture Editor | pass | One source graph now supports lookup, chapters, entry traversal, and supporting-source routes without copied authority. |
| Reference Lexicographer | pass for mechanics; defer findability | Stable titles, sense-bearing pages, summaries, kinds, and routed cross-references are present; only readers can establish lookup speed. |
| Reference Practitioner | defer | The site exposes recognizable entries and application guides, but simulation supplies no evidence that it improves a real decision. |
| Schema Implementer | pass for projection boundary | The site contract, route derivation, validation failures, file digests, and identity are explicit; canonical interchange is unchanged. |
| Evidence & Claims Editor | pass | Every surface calls the result an internal simulation, excludes reader evidence and `preview-01`, and makes no usability or demand claim. |

No applicable review has an open critical or major finding. Production
hosting, observed accessibility, and practitioner comprehension remain later
gates rather than simulated passes.

## Implemented contract

- `index.html` provides title, search, and eight chapter routes.
- Parts I-V come from the base volume; Parts VI-VII come from the exact current
  Factor Forge supplement; Applications owns the two selected guides.
- Every indexed record belongs to exactly one chapter.
- Every included Markdown source receives a deterministic `entries/*.html`
  route; indexed records additionally receive breadcrumbs, reader controls,
  and previous/next sequence links.
- Cross-source links resolve to generated pages and exact fragments when the
  target is selected. Unselected repository sources remain visible links.
- Compact, Abbreviated, Book, Full, local expansion, folded context notation,
  and the 16 scoped Context Profile bindings behave as in `sim-06`.
- Search results resolve directly to entry pages and execute from `file:` URLs.
- Five shared assets avoid embedding the search index and reader runtime into
  every page.

The normative simulation boundary is
`specs/PROOF-SET-BOOK-SITE.md`.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-07
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 109 |
| Search-indexed records and guides | 95 |
| Home pages | 1 |
| Chapter pages | 8 |
| Generated source pages | 109 |
| Indexed adaptive entry pages | 95 |
| Supporting source pages | 14 |
| Shared site assets | 5 |
| Total site files | 123 |
| Local page, asset, and fragment links | 2,065 |
| Missing local targets | 0 |
| Context Profiles / bindings | 3 / 16 |
| Site identity | `a465ceeaef6b1aae3ca5f641433fc9ae8d4b47406e6e8c43aaf7cb386f90c69a` |
| Site index bytes | 3,388 |
| Site index SHA-256 | `18b4892bdafecbd7b934e16a55bafd35aea0eec8f561e6f55d7624db5fc6dfa0` |

The output is `target/proof-set-sim-07/index.html`. The manifest records every
site page and asset by path, bytes, and SHA-256 before deriving the site
identity. The retained standalone projection remains a compatibility and
regression surface, not the primary site route.
Two consecutive renders over the same workspace produced the identical site
identity shown above.

The new relative-route fallbacks live in shared search, reader, and context
assets, so regenerated `sim-04`, `sim-05`, and `sim-06` identities change to
`efcee1a283199311beabc9ccf6b7efc7c57064ef3f8420cd3e3102242b76345f`,
`b03a2958d863306a909e0b6317377fc0a120f0fbe9cc2841a1b3ba6c2cbece4e`,
and `9eff362e7014037625db75688b507cf2ffd0f0f230c6aa853fb606bc59d1f22f`
respectively. `sim-01` through `sim-03` retain their prior identities; every
edition retains zero missing internal targets and zero filesystem-dependent
links.

## Browser result

Microsoft Edge executed the site from local `file:` URLs. A home-page query for
`agency` returned five ranked results whose links target dedicated entry
pages. The Agency page selected Book, folded the exact trailing `@ context`
qualifier into its accessible marker, routed its related terms to dedicated
pages, and exposed sequence navigation. The Force page applied one Newtonian
Mechanics Context Profile binding and routed its full profile to the generated
supporting-source page.

Static inspection confirms eight chapter routes, complete 95-record chapter
ownership, valid breadcrumbs, and no missing local page, asset, or fragment.
This is browser-mechanics evidence only. It does not establish whether a reader
notices, understands, prefers, or successfully uses any route.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM8-001 | major | Splitting the monolith could create a second copied content authority. | Closed: every page renders one exact selected source; the manifest retains source paths and digests. |
| SIM8-002 | major | Search order and chapter order could disagree or orphan entries. | Closed: all 95 indexed records have exactly one chapter owner and one complete previous/next sequence. |
| SIM8-003 | major | Fragment links valid in the monolith could break across files. | Closed: rendered IDs are mapped to owning pages and 2,065 local links are checked against exact files and fragments. |
| SIM8-004 | major | Supporting documents could be promoted as canonical indexed entries. | Closed: 14 support pages remain addressable but outside search, chapter ownership, and adaptive entry sequence. |
| SIM8-005 | major | A website could be represented as Workbench readiness or reader evidence. | Closed: contract, manifest, UI, and wave record retain the static-projection and simulation boundary. |
| SIM8-006 | minor | Search summaries exposed Markdown backticks on the publication surface. | Closed: canonical summaries are normalized for search display without changing their source metadata. |
| SIM8-007 | minor | Dedicated pages without chapters would still feel like a repository browser. | Closed: eight curated reading routes and chapter-aware breadcrumbs restore book structure. |

## Result review

`sim-07` is the first rehearsal that behaves like a small Factorium website and
a book at the same time. Search is a lookup entrance, chapters are a learning
entrance, guides are an application entrance, and all three converge on the
same entry pages and canonical sources.

The prototype is ready for further internal publication refinement such as
facets, chapter introductions, mobile and assistive-technology inspection,
and preview-package rehearsal. It does not admit a release candidate, close
The Sieve, or justify Workbench implementation.
