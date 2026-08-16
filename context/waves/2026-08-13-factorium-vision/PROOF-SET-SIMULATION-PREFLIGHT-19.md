# Proof Set Simulation Preflight 19 - Exact Factor Focus

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can an exact admitted factor route to a legible location inside its owning book
entry without claiming an exact prose annotation, modifying canonical source,
breaking page deduplication, or making ordinary reading noisier?

## Plan review

Add generated factor-focus fragments to `sim-18` for the 12 exact endpoint
artifacts in F1-F6. Keep the fragment-free entry page as the deduplication key,
choose one card focus deterministically from structural stage and artifact
order, preserve all graph bindings, reveal only the targeted card with CSS,
and hand off to the existing Root factorization heading. Give scope views no
factor fragments, require no JavaScript, and retain `sim-17` exactly.

The contract is `specs/COMPOSITION-FACTOR-FOCUS.md`. The compact design review
is `composition-factor-focus-design-2026-08-16.md`; the seven-role Factorium
fixed point is `composition-factor-focus-roles-check-2026-08-16.md`. Both
report zero open P1/P2 findings.

## Implemented focus projection

For every reviewed endpoint the renderer derives:

- the exact reference entry and factor records;
- the human factor label and complete artifact ID;
- the owning generated entry page;
- an edition-local `factor-focus-<entry>-<factor>` fragment;
- exactly one existing Root factorization target.

Six affected entry pages each receive two generated cards before the canonical
source H1. All cards are `display: none` by default. Only `:target` becomes a
visible `Composition focus` card, so a normal book visit is unchanged. The
card states that the repository entry remains authoritative and links directly
to Root factorization. It contains no copied definition or generated excerpt.

The reading route continues to deduplicate on the fragment-free page. A seed
focus wins over a derived factor; equal-stage factors use lexical artifact
order after graph-node normalization. Evaluative view cards retain whole-page
destinations.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-18
node tools\check_composition_reading.js
node tools\check_proof_set_composition.js target\proof-set-sim-18\manifest.json target\proof-set-sim-18\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-18
node tools\check_proof_set_composition_reading.js target\proof-set-sim-18
node tools\check_proof_set_composition_focus.js target\proof-set-sim-18
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-18
```

The pure projection checker covers forward seed focus, reverse seed focus,
same-stage deterministic choice, node-order invariance, same-page
deduplication, conflict disposition, frontier exclusion, malformed focus
destinations, unknown artifacts, and duplicate bindings. The generated-site
checker proves exactly 12 endpoint focuses on six pages, no scope focuses,
same-page fragment custody, all fragment IDs, exact artifact display, and Root
factorization handoffs.

The Edge checker submits the actual lab form, verifies the two-page reading
route and narrow one-column layout, follows the Start link, and observes the
selected factor card as the active CSS target. The card is visible, names an
exact `factor:` artifact, and resolves its Root factorization link. It captures
the route at `target/sim18-composition-reading.png` and the 600-pixel focused
entry at `target/sim18-composition-reading-focus.png`. Visual inspection shows
the card as a quiet preface above the unchanged Book view. These are runtime,
fragment, and layout mechanics only.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 146 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Reviewed relations / route bindings | 6 / 18 |
| Endpoint focus records / pages | 12 / 6 |
| Scope focus records | 0 |
| Composition Lab pages | 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 160 |
| Total site files | 167 |
| Local page, asset, and fragment links | 3,532 |
| Missing local targets | 0 |
| Site identity | `89c38a4b8827a60d8202111e6598f963e4f1593e493b2ee2485aa8d82dd79ded` |
| Standalone SHA-256 | `566b77f88b9e8f66219a6ade88fa0d74163898840ab678744500e99a0df234de` |

The standalone projection retains 2,084 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-17` independently retains 145 sources, 129 indexed destinations, 159
pages, 18 route bindings, zero missing targets, site identity
`813abaef7add0ecc70a94054df3ad8bef652b57a3ac412917b7bfed032cccf73`,
and standalone SHA-256
`7d79dcbde9bca185e5db8168c60cf59f63011afad9464277c91d8bb7c4921c1f`.
The renderer validates and removes the optional focus validation, normalized
node traversal, focus selection, and focus link behavior only for `sim-17`;
the factor-focus specification, CSS, fragments, payload fields, page links,
and manifest checks are `sim-18`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM19-001 | major | A generated factor fragment could look canonical or source-owned. | Closed: IDs are edition-gated, cards say generated landing point, and no Markdown is changed. |
| SIM19-002 | major | “Exact” could imply an exact prose-span annotation. | Closed: exactness applies to factor identity; the card explicitly hands off to the whole Root factorization. |
| SIM19-003 | major | Fragment-specific hrefs could defeat same-page deduplication. | Closed: aggregation remains keyed by fragment-free entry page. |
| SIM19-004 | major | Focus choice could depend on graph-node array order. | Closed: nodes sort by artifact and structural stage wins deterministically. |
| SIM19-005 | major | Hidden cards could alter ordinary Book layout or reader enhancement. | Closed: cards precede the source H1 and only `:target` displays. |
| SIM19-006 | major | A renamed source section could leave a false handoff. | Closed: exactly one Root factorization heading is required and every fragment is link-validated. |
| SIM19-007 | minor | Animation could disregard reader motion preferences. | Closed: reduced-motion disables the short target arrival animation. |
| SIM19-008 | minor | Shared route changes could disturb prior evidence. | Closed: exact `sim-17` site and standalone identities are retained. |

## Result review

`sim-18` completes the current closure-to-reading handoff at the precision the
source can honestly support. The route now tells a reader exactly which factor
caused an entry to appear, then places the complete source-owned factorization
one action away. A normal visit remains the ordinary adaptive Book page.

This does not create canonical source anchors, annotate an exact sentence or
table row, prove improved findability or comprehension, stabilize fragments
for public compatibility, expand the relation graph, save work, generate a
guide, publish content, or admit `preview-01`.
