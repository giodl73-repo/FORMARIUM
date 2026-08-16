# Proof Set Simulation Preflight 18 - Composition Reading Route

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a newly computed closure become a short, readable path into the primary
book without adding semantic neighbors, hiding exact factor custody, creating
a second content authority, or claiming that structural order is a tested
recommendation?

## Plan review

Add a deterministic reading projection after Flatten in `sim-17`. Derive an
exact page binding for all 12 endpoint factors and six evaluative scopes in the
reviewed F1-F6 relation set. Project admitted graph nodes only, deduplicate
nodes that share a page while retaining every binding, order seed anchors
before other required anchors and evaluative views, preserve rejected conflict
status, and fail closed on unknown artifacts. Keep canonical content on its
existing book pages and retain `sim-16` exactly.

The simulation contract is `specs/COMPOSITION-READING-ROUTE.md`. The compact
design review is `composition-reading-route-design-2026-08-16.md`; the
nine-role Factorium fixed point is
`composition-reading-route-roles-check-2026-08-16.md`. Both report zero open
P1/P2 findings.

## Implemented projection

The renderer parses exact Factorium Reference Interchange entry, factor, and
view records and emits a separate digest-bound reading payload. It contains:

- 12 factor-to-owning-anchor-entry bindings;
- six scope-view-to-specialized-view bindings;
- human factor labels and book-page titles;
- exact local destinations already present in the generated site;
- the same reference and relation SHA-256 identities as the closure payload.

For one identified lab result, the pure projection runtime:

1. accepts only admitted graph nodes;
2. requires one exact binding for every node;
3. marks pages `Start`, `Continue`, or `Evaluate` from graph roles;
4. deduplicates by destination while retaining all contributing factor IDs;
5. carries selected/rejected disposition per binding;
6. sorts stage, title, destination, and artifact deterministically;
7. appends compact linked cards after Flatten with graph custody under native
   disclosure.

The existing result SHA-256 remains the local work-product identity. The route
records it but does not mint a competing canonical identity.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-17
node tools\check_composition_reading.js
node tools\check_proof_set_composition.js target\proof-set-sim-17\manifest.json target\proof-set-sim-17\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-17
node tools\check_proof_set_composition_reading.js target\proof-set-sim-17
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-17
```

The pure checker covers forward and reverse F1, two factors deduplicated into
one anchor page, conflict disposition, frontier exclusion, graph-node order
invariance, a separate Continue-stage anchor, unknown-artifact rejection, and
duplicate-binding rejection. The site checker independently proves exact
artifact-set coverage, digest agreement, local targets, script order, default
route shape, and absence of persistence/network APIs.

The Edge checker submits the real local form, waits for WebCrypto and the
post-render extension, and inspects the resulting DOM. The default request
returns `incomplete`, produces two route pages in `Start, Evaluate` order,
retains three graph bindings, verifies both destinations on disk, and captures
the full page at `target/sim17-composition-reading.png`. Visual inspection
confirms that page titles and stages lead while raw bindings stay collapsed;
an automated 600-pixel check confirms the cards collapse to one column. This
is runtime and layout evidence only.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 145 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Reviewed relations / route bindings | 6 / 18 |
| Endpoint / scope bindings | 12 / 6 |
| Composition Lab pages | 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 159 |
| Total site files | 166 |
| Local page, asset, and fragment links | 3,508 |
| Missing local targets | 0 |
| Site identity | `813abaef7add0ecc70a94054df3ad8bef652b57a3ac412917b7bfed032cccf73` |
| Standalone SHA-256 | `7d79dcbde9bca185e5db8168c60cf59f63011afad9464277c91d8bb7c4921c1f` |

The standalone projection retains 2,077 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-16` independently retains 144 sources, 129 indexed destinations, 158
pages, one Composition Lab page, six relations, five trace targets, zero
missing targets, site identity
`b1c176db8ba557aa984b06499860fb2ca6e222ba83ad432857099a3c8c7f4e58`,
and standalone SHA-256
`83cbe2966182476fc3ba424c2e4b0b40ace8394c3143ab17a22659edce9d5ef4`.
The renderer verifies and removes the reading extension hook only for that
edition; the new payload, CSS, JavaScript, specification page, and manifest
fields are `sim-17`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM18-001 | major | Page suggestions could become an unreviewed second graph expansion. | Closed: only admitted nodes with exact bindings enter the route. |
| SIM18-002 | major | Deduplicating factors by page could erase selected and derived identities. | Closed: every factor ID and graph role remains in disclosure. |
| SIM18-003 | major | Structural order could be read as relevance ranking or recommendation. | Closed: stages derive only from graph roles and claims deny ranking evidence. |
| SIM18-004 | major | Factor-to-whole-entry navigation is a coarser mapping. | Closed: page ownership and exact factor ID are both visible; no fragment-level claim is made. |
| SIM18-005 | major | Unknown artifacts could fall back to lexical search. | Closed: exact binding is mandatory and unknown nodes fail closed. |
| SIM18-006 | major | A rejected required factor could vanish from repair context. | Closed: its page remains and the binding is marked rejected. |
| SIM18-007 | minor | Raw custody metadata could recreate the readability problem. | Closed: stage and human page title lead; bindings use native disclosure. |
| SIM18-008 | minor | The asynchronous extension could race or rewrite the prior edition. | Closed: one post-render hook, strict script order, live execution, and exact `sim-16` regression are verified. |

## Result review

`sim-17` closes the most immediate gap between composition and the reference
experience. A reader can now configure a bounded graph, inspect its closure,
and continue directly into the complete book pages that own its selected and
derived factors and unresolved checks. The default F1 closure reduces three
graph nodes to two legible destinations without losing any exact binding.

This does not establish that the route is relevant, optimal, findable,
comprehensible, or useful to readers. It does not add relation discovery,
frontier suggestions, canonical factor fragments, saved work, query export,
guide generation, publication, or `preview-01` evidence.
