# Proof Set Simulation Preflight 20 - Progressive Concept Palette

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the Composition Lab present exact concept and relation controls as an
approachable query palette without hiding options, auto-selecting semantics,
turning reachability into recommendation, or changing the submitted closure?

## Plan review

Add a progressive palette to `sim-19`. Group the 12 existing seed checkboxes
under their six exact owning entry titles, replace slug display text with exact
factor labels, put the selected group first, keep all artifact IDs visible,
and provide reversible Open all/Collapse disclosure. Compute live readiness
for all six relations from only explicit seeds, selected relations, and
direction. Disable nothing, promise no budget admission, and retain `sim-18`
exactly.

The contract is `specs/COMPOSITION-PALETTE.md`. The compact design review is
`composition-palette-design-2026-08-16.md`; the eight-role Factorium fixed
point is `composition-palette-roles-check-2026-08-16.md`. Both report zero open
P1/P2 findings.

## Implemented palette

The palette progressively enhances the existing lab after its exact controls
and reading bindings load:

- six native topic disclosures generated from owning anchor-entry pages;
- two exact factor controls per topic, with canonical labels and IDs;
- the selected System Composition group open and ordered first by default;
- five compact title-sorted groups;
- Open all topics and Collapse topics without selection mutation;
- one visible readiness badge per relation;
- a live count stating how many of six relations are structurally reachable;
- exact missing-predecessor labels for every unready relation.

Readiness sorts selected relations and iterates their direction-specific
endpoint reachability to a fixed point. `seed-ready` means the predecessor is
an explicit seed; `route-ready` means selected upstream relations reach it;
`needs-predecessor` means neither is true. It does not inspect problem prose,
Context Profile values, scopes, checks, budgets, or domain evidence. An unready
relation remains enabled and, if selected, still produces an unresolved
requirement in closure.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-19
node tools\check_composition_palette.js
node tools\check_proof_set_composition.js target\proof-set-sim-19\manifest.json target\proof-set-sim-19\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-19
node tools\check_proof_set_composition_reading.js target\proof-set-sim-19
node tools\check_proof_set_composition_focus.js target\proof-set-sim-19
node tools\check_proof_set_composition_palette.js target\proof-set-sim-19
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-19
```

The pure checker covers exact six-by-two grouping, stable label order, forward
and reverse predecessor changes, selected-but-unready edges, synthetic chained
`route-ready` behavior, relation/payload order invariance, and rejection of
unknown seeds, duplicate relations, and missing bindings. The site checker
proves manifest boundaries, exact payload grouping, one default ready edge,
load order, readiness CSS, and absence of storage/network mechanisms.

The Edge checker observes six groups, 12 original seed controls, one open
selected topic, six badges, one ready relation, the exact human default label,
and the live readiness count. It opens all six groups, collapses back to the
one selected group without changing selection, reverses direction and sees F1
change to `Needs ...` while remaining checked, restores forward direction,
submits the unchanged request, verifies its incomplete two-page route at a
600-pixel layout, and follows the exact factor focus. The full flow is captured
at `target/sim19-composition-reading.png`; focus is captured at
`target/sim19-composition-reading-focus.png`. This is mechanical and visual
evidence only.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 147 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Concept groups / controls | 6 / 12 |
| Relation readiness records | 6 |
| Route bindings / factor focuses | 18 / 12 |
| Composition Lab pages | 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 161 |
| Total site files | 169 |
| Local page, asset, and fragment links | 3,545 |
| Missing local targets | 0 |
| Site identity | `866b4d3fa57fd7381c6db940cde4d022a71232b863b398d8d14cfbd72b6c7c4c` |
| Standalone SHA-256 | `0f11bf038e0080ed52b9ef1686acf9b53a180f010e03bf209b49e80bec53627c` |

The standalone projection retains 2,091 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-18` independently retains 146 sources, 129 indexed destinations, 160
pages, 12 factor focuses, zero missing targets, site identity
`89c38a4b8827a60d8202111e6598f963e4f1593e493b2ee2485aa8d82dd79ded`,
and standalone SHA-256
`566b77f88b9e8f66219a6ade88fa0d74163898840ab678744500e99a0df234de`.
The palette specification, CSS, JavaScript, contract link, heading copy,
manifest checks, and generated asset are all `sim-19`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM20-001 | major | Grouping could replace exact factor controls with a second authority. | Closed: the extension moves original checkbox labels and retains names, values, IDs, and submission. |
| SIM20-002 | major | A ready badge could imply recommendation, compatibility, or approval. | Closed: copy says structurally reachable, all relations remain enabled, and budgets/evaluation are disclaimed. |
| SIM20-003 | major | Readiness could become prose-based semantic inference. | Closed: its only inputs are exact seeds, selected relation IDs, and direction. |
| SIM20-004 | major | Collapsed topics could hide selected factors. | Closed: selected topics open initially and Collapse preserves every checked group. |
| SIM20-005 | major | Direction changes could leave stale predecessor cues. | Closed: badges recompute live and browser regression exercises forward/reverse. |
| SIM20-006 | major | Relation order could affect chained reachability. | Closed: relations sort and iterate to fixed point; order invariance is tested. |
| SIM20-007 | minor | The selected default group appeared last alphabetically. | Closed: selected topic is ordered first; remaining topics stay title-sorted. |
| SIM20-008 | minor | A cleaner screenshot could be promoted into usability evidence. | Closed: claims remain deterministic mechanics and visual inspection only. |

## Result review

`sim-19` makes the actual construction surface feel like a reference tool
rather than a schema console. Readers first see the exact selected topic and
two human-labelled choices; other concept families are one native disclosure
away. Relations explain their current structural prerequisites without taking
control away from the reader or changing closure semantics.

This does not establish faster scanning, better seed or relation choices,
findability, comprehension, or task success. It does not provide semantic
search, synonyms, sense disambiguation, recommendation, budget-aware preview,
saved work, canonical query export, publication, or `preview-01` evidence.
