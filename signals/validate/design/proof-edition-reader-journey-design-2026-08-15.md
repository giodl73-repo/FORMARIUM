---
skill: validate-design
topic: proof-edition-reader-journey
date: 2026-08-15
reviewer_count: 10
p1_count: 0
p2_count: 0
p3_count: 40
domain_roles_active: [Accessibility Reviewer, Information Retrieval Reviewer, Reference Publication Editor, Usability Evidence Reviewer]
---

# Proof Edition Reader Journey Design Review

Artifact reviewed:
`docs/research/2026-08-15-proof-edition-reader-journey.md`

## BLOCK 0 -- Content signal catalogue

| Signal phrase | Domain category |
|---|---|
| “keyboard reachable, and responsive” | accessibility |
| “client-side deterministic ranking” | information retrieval |
| “coherent chapter” and “publication sequence” | reference publishing / information architecture |
| “not reader evidence” and “External reader sessions: 0” | usability research / evidence claims |

## BLOCK 1 -- Expert roster

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
| “keyboard reachable, and responsive” | Accessibility Reviewer | The new home hierarchy and composed search controls must preserve semantic order, keyboard access, focus visibility, and small-screen use. |
| “client-side deterministic ranking” | Information Retrieval Reviewer | Ranking, facets, URL state, and zero-result behavior determine whether the bounded lookup contract is internally coherent. |
| “coherent chapter” and “publication sequence” | Reference Publication Editor | Chapter merging and the first journey alter the book's editorial sequence even though canonical records remain unchanged. |
| “not reader evidence” and “External reader sessions: 0” | Usability Evidence Reviewer | The simulation must distinguish mechanically verified routes from claims that require observed readers. |

BLOCK 1 domain count = 4

## BLOCK 1.5 -- Roster commitment table

| Reviewer | Role | Source |
|---|---|---|
| Accessibility Reviewer | Domain expert | Domain |
| Information Retrieval Reviewer | Domain expert | Domain |
| Reference Publication Editor | Domain expert | Domain |
| Usability Evidence Reviewer | Domain expert | Domain |
| Architect | Stock discipline | Stock |
| Code-Quality | Stock discipline | Stock |
| Documentation | Stock discipline | Stock |
| Testing | Stock discipline | Stock |
| Process | Stock discipline | Stock |
| Implementation | Stock discipline | Stock |

Conformance: 4 Domain rows equal the BLOCK 1 domain count, and every Domain
reviewer exactly matches its committed expert name.

## BLOCK 2 -- Per-reviewer findings

### Accessibility Reviewer

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | The ordered first journey has a sound semantic form, but its visual cards must not reorder the DOM. | P3 | Reading and accessibility contract | Keep source order and use layout-only CSS. |
| 2 | A third search control can become cramped at narrow widths. | P3 | Search contract | Collapse all controls to one column at the existing mobile breakpoint. |
| 3 | Search enhancement has an explicit no-JavaScript boundary, but the page needs a visible fallback message. | P3 | Search contract | Add a `noscript` note linking conceptually to Browse the book. |
| 4 | Chapter subsection headings need a valid hierarchy below the chapter `h1`. | P3 | Chapter architecture | Render subsection groups with `h2` headings and labelled lists. |

### Information Retrieval Reviewer

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | Exact domain filtering is appropriate because domain is canonical metadata, but blank domains must not become options. | P3 | Search contract | Populate the facet from unique nonblank values only. |
| 2 | Kind and domain should filter before text scoring to keep ranking deterministic. | P3 | Search contract | Apply both exact filters in the initial record predicate. |
| 3 | URL state must remove stale parameters when a control is cleared. | P3 | Deterministic checks | Delete empty `q`, `kind`, and `domain` keys before replacing history state. |
| 4 | Suggested searches could imply recommendation quality that has not been tested. | P3 | Intended reader decision | Use illustrative placeholder language, not personalized or ranked suggestions. |

### Reference Publication Editor

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | Reducing 24 chapters to 12 restores book scale while retaining exact record ownership. | P3 | Chapter architecture | Preserve the five base parts and merge extension material only. |
| 2 | The 32-record quantity chapter remains large. | P3 | Chapter architecture | Preserve its anchor/view subsections on the generated chapter page. |
| 3 | Mixing economics with wave and electrical material would weaken the route. | P3 | Chapter architecture | Keep waves/electrical/information together and place economics with balance/accounting. |
| 4 | The orientation journey should end in an application rather than another abstract method page. | P3 | First journey | Retain the selected aqueous guide as the fifth step. |

### Usability Evidence Reviewer

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | “Easier” appears only as a design question and is not asserted as a result. | P3 | Question | Keep result language to route count, integrity, and mechanics. |
| 2 | A five-step route does not establish that readers notice or complete it. | P3 | Claim boundary | Record route availability, never completion or comprehension. |
| 3 | Search smoke cases establish logic, not findability. | P3 | Deterministic checks | Label them deterministic search mechanics. |
| 4 | The new edition must not inherit the external-test-ready status of the frozen prototype. | P3 | Status | Mark `sim-08` as internal and keep `preview-01` excluded in UI, spec, manifest, and wave record. |

### Architect

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | The design correctly keeps canonical tables outside the change set. | P3 | Intended reader decision | Limit mutations to the publication selection, renderer, assets, and simulation records. |
| 2 | First-journey links could become an unvalidated second navigation graph. | P3 | First journey | Declare exact source paths once and fail if any target is absent or duplicated. |
| 3 | Chapter grouping and search filtering must consume the same selected record set. | P3 | Deterministic checks | Derive both from existing selection objects and canonical metadata. |
| 4 | A new simulation should not alter older edition outputs accidentally. | P3 | Question | Admit the refinement as `sim-08` and retain prior edition branches. |

### Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | Repeated edition arrays in the renderer make one new edition easy to omit. | P3 | Implementation boundary | Introduce feature booleans or extend every guarded stage consistently and verify older editions. |
| 2 | Chapter subsection extraction needs a single parser path rather than HTML post-processing. | P3 | Chapter architecture | Extend `Get-SiteChapterSelections` to return ordered groups with paths. |
| 3 | Search filtering should remain a pure exported function for smoke testing. | P3 | Search contract | Add domain as an optional argument without coupling ranking to the DOM. |
| 4 | Homepage markup should encode repeated journey cards through one data structure. | P3 | First journey | Generate links from a five-record ordered configuration rather than hand-copying filenames. |

### Documentation

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | The old homepage sentence still says eight routes and ninety-five records. | P3 | Current-state audit | Generate current chapter and record counts rather than hard-code prose. |
| 2 | The book-site spec contains stale 120/122 counts. | P3 | Deterministic checks | Update the contract to use current derived counts and `sim-08`. |
| 3 | Quickstart predates the book site and tells readers to use browser find. | P3 | Intended reader decision | Revise it to name Start, Search, and Browse without claiming observed ease. |
| 4 | The active wave needs a compact plan/result record. | P3 | Claim boundary | Add a ninth rehearsal entry with exact generated measures and limitations. |

### Testing

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | Complete chapter ownership is already fail-closed but the expected count changes. | P3 | Deterministic checks | Assert 12 chapters and all 124 indexed owners. |
| 2 | The first journey needs more than link validation. | P3 | Deterministic checks | Assert five unique selected paths and expose the count in the manifest. |
| 3 | Domain composition is not covered by current renderer checks. | P3 | Search contract | Exercise query-only, kind-only, domain-only, and combined filters with the exported function. |
| 4 | Determinism must be checked after all site changes. | P3 | Deterministic checks | Render `sim-08` twice and compare site identities. |

### Process

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | The work properly prioritizes publication coherence over another intake batch. | P3 | Current-state audit | Record this as Proof Set simulation work, not Factor Forge content expansion. |
| 2 | Canonical assurance bindings should not churn because no entry or view changes. | P3 | Intended reader decision | Run sidecar validation but leave canonical digests unchanged. |
| 3 | A merged supplement remains a current-source simulation, not a rewrite of `sieve-01`. | P3 | Chapter architecture | Preserve the frozen baseline language in the supplement and wave record. |
| 4 | Browser inspection is useful but cannot close accessibility or usability gates. | P3 | Claim boundary | Record browser mechanics separately from deferred reader evidence. |

### Implementation

| # | Finding | Sev | Section | Recommendation |
|---:|---|---|---|---|
| 1 | Root Table and Factor Role Table are supporting sources, so their generated page routes must be resolved by source rather than search record. | P3 | First journey | Resolve all journey targets through `pageBySource`. |
| 2 | Merged chapters contain multiple `###` sections and prose between numbered selections. | P3 | Chapter architecture | Associate each numbered link with its nearest preceding subsection heading. |
| 3 | Some chapters may lack subsection headings. | P3 | Chapter architecture | Supply one fallback group titled “Chapter records.” |
| 4 | Generated site checks must include every journey link and group-owned entry link. | P3 | Deterministic checks | Reuse the existing local file and fragment checker after generation. |

## BLOCK 3 -- Synthesis

Overall verdict: APPROVED

P1 blockers (must resolve before implementation):
  - None -- proceed to implementation.

P2 conditions (must resolve before sign-off):
  - None.

Cross-reviewer consensus:
  The design correctly treats the present problem as publication orientation,
  not missing canonical content. Reviewers consistently require one selected
  source graph, grouped chapter internals, deterministic composed filtering,
  and a strict separation between mechanics and reader evidence.

Strongest signal:
  Reference Publication Editor 2 / Documentation 1 -- the refinement must
  replace a flat, stale chapter wall with derived counts and preserved
  subsection routes, or chapter merging alone will merely create larger walls.

## AMEND

1. **Chapter architecture:** preserve `###` subsection ownership on generated
   chapter pages so the 32-record quantity part and merged extension parts have
   internal reading routes rather than flat card walls.
2. **Search and deterministic checks:** admit only nonblank exact domain values,
   compose domain with kind and query filters, restore all three URL parameters,
   and exercise empty/query/kind/domain/combined cases.
3. **Claim and edition boundary:** implement the refinement as internal
   `sim-08`, derive visible counts, add a no-JavaScript browse fallback, and
   retain the explicit exclusion of reader evidence and `preview-01`.
