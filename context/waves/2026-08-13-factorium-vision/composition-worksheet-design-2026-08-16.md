---
skill: validate-design
topic: composition-worksheet
date: 2026-08-16
reviewer_count: 10
p1_count: 0
p2_count: 0
p3_count: 40
domain_roles_active: [Systems Architecture Reviewer, Semantic Graph Contract Reviewer, Accessibility and Responsive Reading Reviewer, Publication Provenance Reviewer]
---

# Composition Worksheet Design Review

Status: fixed point for the bounded `sim-09` design

## Block 0 - Content signal catalogue

| Signal phrase | Domain category |
|---|---|
| “report-generation service ... document service” | systems architecture |
| “Closure Policy” and “working graph” | semantic graph contracts |
| “Reading view” and narrow rendering | accessibility |
| “exact trace manifest” and SHA-256 | provenance |
| “authorization expectation” | security |

## Block 1 - Expert roster

The six stock disciplines are Architect, Code-Quality, Documentation, Testing,
Process, and Implementation.

| Signal detected | Expert added | Reason |
|---|---|---|
| “report-generation service ... document service” | Systems Architecture Reviewer | The example must preserve boundary, interface, dependency, and failure distinctions. |
| “Closure Policy” and “working graph” | Semantic Graph Contract Reviewer | The reading form must round-trip to the typed trace without inventing joins. |
| “Reading view” and narrow rendering | Accessibility and Responsive Reading Reviewer | The new long-form page must remain navigable and legible across reader profiles and widths. |
| “exact trace manifest” and SHA-256 | Publication Provenance Reviewer | The page and trace must preserve exact source custody. |
| “authorization expectation” | No expert needed | Security is explicitly unresolved local input; the worksheet makes no security recommendation or adequacy claim. |

BLOCK 1 domain count = 4

## Block 1.5 - Roster commitment

| Reviewer | Role | Source |
|---|---|---|
| Systems Architecture Reviewer | Domain expert | Domain |
| Semantic Graph Contract Reviewer | Domain expert | Domain |
| Accessibility and Responsive Reading Reviewer | Domain expert | Domain |
| Publication Provenance Reviewer | Domain expert | Domain |
| Architect | Stock discipline | Stock |
| Code-Quality | Stock discipline | Stock |
| Documentation | Stock discipline | Stock |
| Testing | Stock discipline | Stock |
| Process | Stock discipline | Stock |
| Implementation | Stock discipline | Stock |

Domain row count is four and matches Block 1. No domain expert is orphaned.

## Block 2 - Per-reviewer findings

### Systems Architecture Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| SAR-01 | The selected runtime boundary is explicit and does not imply ownership. | P3 | Local evidence | Retain the separate ownership viewpoint caveat. |
| SAR-02 | Dependency and interface remain non-equivalent records. | P3 | Result | Preserve two records in every projection. |
| SAR-03 | Failure consequence is separate from timeout and retry mechanisms. | P3 | Controls | Keep operational mechanisms unresolved until supplied. |
| SAR-04 | Reverse reliance is not inferred from one forward edge. | P3 | Change tests | Require a separate assertion for callback reliance. |

### Semantic Graph Contract Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| SGC-01 | The worksheet names the exact seed, edge, direction, scope, and predecessor. | P3 | Working graph | Retain the five-column node table. |
| SGC-02 | Sense narrowing is explanatory rather than an unrecorded graph expansion. | P3 | Narrowing | Keep the distinction explicit. |
| SGC-03 | Closure completeness is bounded by policy and budgets. | P3 | Evaluation | Never shorten the label to unqualified “complete.” |
| SGC-04 | Operator words could still be read arithmetically in isolation. | P3 | Composition | Keep the nearby non-arithmetic warning in every projection. |

### Accessibility and Responsive Reading Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| ARR-01 | Long title, breadcrumb, and trace IDs created narrow-width pressure. | P3 | CSS | Retain `overflow-wrap:anywhere` for page-local identifiers and headings. |
| ARR-02 | Four profile controls were dense at mobile width. | P3 | CSS | Retain the two-column narrow control grid. |
| ARR-03 | Wide tables remain horizontally scrollable rather than shrinking text. | P3 | shared CSS | Keep table overflow local and keyboard reachable. |
| ARR-04 | Browser inspection is not an accessibility outcome. | P3 | evidence | Defer observed assistive-technology and comprehension evidence. |

### Publication Provenance Reviewer

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| PPR-01 | Reference, relation, and query identities are separately declared. | P3 | Manifest | Recompute the query digest whenever trace bytes change. |
| PPR-02 | The worksheet scenario is clearly synthetic author material. | P3 | Custody | Preserve separation from canonical source provenance. |
| PPR-03 | The static site manifest binds every rendered source. | P3 | Renderer | Keep the worksheet in ordinary source enumeration. |
| PPR-04 | Generated site identity changes with source or shared-style changes. | P3 | Validation | Require two independent renders before recording the identity. |

### Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| ARC-01 | `sim-09` extends the existing publication pipeline rather than creating a new app. | P3 | Renderer | Keep Workbench behavior out of this slice. |
| ARC-02 | Applications remains the single chapter owner for guides. | P3 | Site | Require exact one-chapter ownership. |
| ARC-03 | The renderer has repeated edition lists that increase maintenance cost. | P3 | Renderer | Consolidate capability sets in a later refactor, not this bounded change. |
| ARC-04 | V0 canonical reference and sidecars remain unchanged. | P3 | Boundary | Preserve that boundary in the wave result. |

### Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| CQ-01 | Edition-specific guide count is explicit and checked. | P3 | Search | Retain exact expected counts for sim-08 and sim-09. |
| CQ-02 | Search regression accepts an expected count argument. | P3 | Test helper | Keep the default at 124 for historical sim-08 reproduction. |
| CQ-03 | The worksheet uses stable repository paths rather than generated URLs. | P3 | Source | Keep generated routing in the renderer. |
| CQ-04 | Shared responsive CSS affects earlier editions. | P3 | CSS | Re-render sim-08 as a regression check. |

### Documentation

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| DOC-01 | Problem, decision, audience, scope, and non-goals are visible before mechanics. | P3 | Opening | Retain this reader order. |
| DOC-02 | Local facts are separated from canonical statements. | P3 | Evidence | Keep the synthetic-source label adjacent. |
| DOC-03 | The local Context Profile initially lacked the full declaration contract. | P3 | Context | Retain applicability, exclusions, defaults, convention, overrides, invalidation, and custody. |
| DOC-04 | The exact trace is useful but dense. | P3 | Manifest | Keep it late in the page after the readable result. |

### Testing

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| TST-01 | Query validation passes against exact source identities. | P3 | CLI | Run it in final validation. |
| TST-02 | Search reaches the worksheet exactly once by path despite multiple textual matches. | P3 | Search | Assert path identity rather than result-set exclusivity. |
| TST-03 | Two renders produce the same site identity. | P3 | Determinism | Record both identities. |
| TST-04 | Desktop and narrow screenshots exercise the new page. | P3 | Browser | Retain their status as mechanical inspection only. |

### Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| PRO-01 | The work follows the contract-before-UI roadmap order. | P3 | Sequence | Keep interactive construction deferred. |
| PRO-02 | The active wave needs a distinct simulation record. | P3 | Custody | Add preflight 10 plus plan/result in `WAVE.md`. |
| PRO-03 | Review status is pending in the draft worksheet. | P3 | Header | Replace it only after fixed point is recorded. |
| PRO-04 | Generated targets remain disposable. | P3 | Outputs | Commit sources and checks, not `target/`. |

### Implementation

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| IMP-01 | The worksheet is added through the same source and search records as other guides. | P3 | Renderer | Preserve one publication path. |
| IMP-02 | The Applications chapter count grows from two to three only in sim-09. | P3 | Chapters | Keep earlier edition output reproducible. |
| IMP-03 | Search and page href generation include sim-09 capability. | P3 | Renderer | Retain the edition capability checks. |
| IMP-04 | Long inline identifiers can set min-content width. | P3 | CSS | Preserve wrapping without altering preformatted trace blocks. |

## Block 3 - Synthesis

Overall verdict: APPROVED

P1 blockers: none.

P2 conditions: none.

Cross-reviewer consensus: the worksheet succeeds only if it remains a readable
projection of one exact trace, not an inferred architecture or alternate
reference authority. Responsive behavior, graph custody, and claim boundaries
must all remain independently checkable.

Strongest signal: direction and predecessor custody must survive every move
from machine trace to worksheet to flattened guide.

## Amendments

1. Complete the local Context Profile declaration in the worksheet so no
   boundary, viewpoint, or version appears as an inherited universal default.
2. Preserve structural-only wording beside the passed evaluation and closure
   state so neither becomes an operational or domain approval.
3. Add narrow wrapping and two-column reader controls, then verify exact search
   routing and deterministic multi-page output.

All three amendments are applied. No P1/P2 finding remains open.
