# Proof Set Simulation Preflight 09 - Reader Journey

Status: internal simulation complete; no external reader evidence

Date: 2026-08-15

## Question

Can the current 124-destination Proof Set regain a deliberate book entrance
after Factor Forge growth, while retaining one canonical source graph,
deterministic static publication, adaptive reading views, and the explicit
exclusion of reader evidence and Workbench scope?

## Plan review

The measured design is
`docs/research/2026-08-15-proof-edition-reader-journey.md`. It finds that 15 of
24 chapters contain only one or two records and that the flat contents grid
exposes intake history more strongly than a book sequence.

The `validate-design` review uses ten reviewers and records 40 P3 findings with
no P1 or P2 issue. The installed Factorium role check uses seven roles and
records 21 P3 findings with no P1 or P2 issue. The fixed-point review is
`PROOF-EDITION-READER-JOURNEY-ROLE-REVIEW.md`.

## Implemented contract

- The 122 numbered records and two application guides have exactly one owner
  across 12 chapters: five base parts, six grouped extension parts, and
  Applications.
- Twenty-nine source `###` headings become visible subsection routes; chapter
  merging does not create larger flat card walls.
- One five-step first journey links the Root Table, Factor Role Table,
  Factorization Quality, Factorization Failure Diagnostic, and the aqueous
  amount-concentration Factor Guide.
- Search composes ordinary text with exact record-kind and canonical-domain
  filters. Query, kind, and domain retain URL state.
- The page remains browsable without JavaScript through ordinary journey and
  chapter links; a `noscript` message identifies the search boundary.
- Compact, Abbreviated, Book, Full, local expansion, Context Profiles, entry
  breadcrumbs, and previous/next traversal retain their earlier contracts.
- Canonical Factor Tables, Reference Interchange V0, relation and assurance
  sidecars, and the frozen `sieve-01` reader-evidence baseline are unchanged.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-08
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 138 |
| Numbered records / guides | 122 / 2 |
| Indexed destinations | 124 |
| Chapters / subsections | 12 / 29 |
| First-journey targets | 5 |
| Generated source pages | 138 |
| Total site pages | 151 |
| Shared site assets | 5 |
| Total site files | 156 |
| Local page, asset, and fragment links | 2,888 |
| Missing local targets | 0 |
| Search domains | 13 |
| Context Profiles / bindings | 3 / 16 |
| Site identity | `562b31ee4e2a463a8b5e4bf11de6d1f987ac95762024f396ef5e945678e89bc0` |
| Site index bytes | 5,469 |
| Site index SHA-256 | `bdd143b394a59c10ea4b3bfa0ed633378d8113927d7f4ea6261438b5b02a6905` |

Two independent output directories produced the same site identity. The
retained standalone projection contains 1,940 valid internal fragment links,
zero missing fragments, zero filesystem-dependent links, and 49 visible
repository-source links.

## Search and browser result

`node tools/check_proof_set_search.js
target/proof-set-sim-08/search-index.json` passes five declared cases over all
124 records: empty filters, query-only, kind-only, domain-only, and composed
query/kind/domain. The composed `probability` + `formula` + `quantities` case
returns two exact records. An initially incorrect `science` test returned zero
and was corrected to the canonical `quantities` domain rather than weakening
the exact facet.

Microsoft Edge rendered the homepage at desktop and narrow widths. The narrow
layout wraps the header, title, journey, and search controls without changing
DOM order. The Part VI page renders 17 records under preserved systems,
organization/governance, observation/control, software, and coordinated-work
subsections. This is browser-mechanics inspection, not observed accessibility,
findability, comprehension, preference, or application evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM9-001 | major | Twenty-four flat chapter choices expose intake history instead of a book route. | Closed: twelve subject chapters own every indexed destination exactly once. |
| SIM9-002 | major | Merging chapters could replace many small walls with fewer large walls. | Closed: 29 source-owned subsection routes group every chapter record exactly once. |
| SIM9-003 | major | Search at 124 destinations needs narrowing without becoming Workbench. | Closed: exact kind and canonical-domain filters compose with text inside the selected publication only. |
| SIM9-004 | major | A first journey could become an unvalidated second content authority. | Closed: five ordered links resolve existing selected source pages; no editorial body is copied. |
| SIM9-005 | major | “Improved journey” could be promoted into an unsupported usability claim. | Closed: design, UI, manifest, roles, and this result limit evidence to mechanics and defer reader outcomes. |
| SIM9-006 | minor | The homepage and README contained stale route counts. | Closed: visible chapter and destination counts are derived; README points to `sim-08`. |
| SIM9-007 | minor | The first composed search fixture used the wrong domain expectation. | Closed: the exact zero exposed the error; the fixture now uses canonical `quantities`. |

## Result review

`sim-08` is a more deliberate proof edition mechanically: Start demonstrates
the method, Search supports bounded lookup, Browse exposes twelve book chapters,
and subsection routes keep larger chapters legible. All routes converge on the
same generated source pages and canonical content graph.

The simulation does not admit `preview-01`, close The Sieve, establish reader
success, or justify Workbench. The next evidence-bearing step remains a real
reader session when readers exist; internal work may continue with task-route
inspection and publication polish without inventing that evidence.
