# Proof Set Simulation Preflight 24 - Composition Query Plan

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a reader inspect the whole explicit Composition Lab request in one compact
place before execution without predicting closure, implying semantic validity,
rewriting reverse relations, minting pre-result identity, or silently pairing
edited controls with an old result?

## Plan review

Add an edition-gated live query-plan projection to `sim-23`. Resolve current
controls only through the six exact relation records and 18 exact reading
bindings; summarize Add, Multiply, Subtract, Frame, and Bound; name syntactic
coverage `control-complete`; keep Run separate; retain exact metadata under the
existing reader profiles; track result alignment only in memory; and preserve
`sim-22` exactly.

The contract is `specs/COMPOSITION-QUERY-PLAN.md`. The compact design review is
`composition-query-plan-design-2026-08-16.md`; the eight-role Factorium fixed
point is `composition-query-plan-roles-check-2026-08-16.md`. Both report zero
open P1/P2 findings.

## Implemented plan

The pure `factorium-composition-query-plan-v0` record repeats the reference and
relation digests and contains graph-inert problem text, exact context and
finite bounds, human-bound Add and Subtract artifacts, and direction-aware
Multiply routes. Every selected identity is unique, sorted, known to the exact
payload, and bound to an existing book destination. Reverse routes retain
canonical source and target separately.

The record reports `control-complete` only when problem, context, direction,
budgets, seed count, and relation count satisfy the visible lab grammar.
Otherwise it returns ordered `needs-explicit-controls` diagnostics without
repairing a value. It calls no closure function, predicts no admitted edge,
frontier, check, state, or projection, and mints no digest.

The existing sticky pre-run card now begins with the live plan. Book shows
human factor labels, F-codes, traversal routes, context, and bounds. Full also
shows exact artifacts, canonical relation order, qualifications, and source
digests. Compact retains selected controls, bounds, state, and execution
boundary.

Runtime-only alignment begins `not-run`, becomes
`matches-displayed-result` after a successful local execution, and becomes
`controls-changed` after a later edit. The old result remains visible but is
explicitly labelled as belonging to the previous controls. Starter loading
clears the result and resets alignment. This comparison uses deterministic
plan JSON in memory only; reload removes it.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-23
node tools\check_composition_query_plan.js
node tools\check_proof_set_composition_query_plan.js target\proof-set-sim-23
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-23
```

Pure checks cover default, reverse traversal with canonical direction retained,
partial context/seed diagnostics, duplicate and unknown identities, payload
digest drift, input-order invariance, and absence of plan identity. Generated-
site checks cover manifest boundaries, script ordering, required CSS and
labels, profile-independent bytes, and absence of closure, hashing, storage,
URL, or network mechanisms.

The Edge check observes the initial control-complete plan, linked human Add
concept, human F1 route, no-exclusion statement, not-run boundary, exact
metadata visibility only in Full, no changed controls under profiles, missing-
seed diagnostic and recovery, result matching after Run, reverse F4 route,
conflict subtraction without state prediction, two-seed/two-relation frontier
configuration without frontier prediction, post-run matching, post-edit stale-
result warning, mobile layout, map, route, and factor focus. The Book flow is
captured at `target/sim23-composition-reading.png`.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 151 |
| Indexed destinations | 129 |
| Query-plan records / pages | 1 / 1 |
| Control states / result-alignment states | 2 / 3 |
| Exact relation / reading-binding records | 6 / 18 |
| Composition profiles | 4 |
| Authored starters | 5 |
| Total site pages / files | 165 / 177 |
| Local page, asset, and fragment links | 3,607 |
| Missing local targets | 0 |
| Site identity | `0509bbdea57a0ca63590a2166aa88f18dc77b9fa16431ee1ffc79b7683c31a63` |
| Standalone SHA-256 | `183846b83e8e9ea82a5eb1e678f6137f454c26a77fc4c7ea6b5896ad1cf033e7` |

The standalone projection retains 2,121 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-22` independently retains 150 sources, 164 pages, 175 files, site identity
`dab967874fc304a1fa3f9ffd47bc6559102bced0d525cb2b8addccd5736d7e6b`,
and standalone SHA-256
`8f80518d3e3c10006c60e35aa4e1eab4e6abbe5385d4660ba79a508b665101dc`.
The new specification, source page, CSS, JavaScript, contract link, manifest
checks, and generated asset are `sim-23`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM24-001 | major | The request was scattered across five form stages. | Closed mechanically: one sticky receipt repeats every selected control, context, direction, and finite bound. |
| SIM24-002 | major | A pre-run summary could be mistaken for closure prediction. | Closed: the pure record contains no graph, check, state, projection, or result fields and the panel states what remains unknown. |
| SIM24-003 | major | Reverse display could reverse canonical semantics. | Closed: traversal predecessor/derived and canonical source/target remain separate exact fields. |
| SIM24-004 | major | “Ready” could imply domain or structural validity. | Closed: `control-complete` means visible syntactic coverage only and says validity is not evaluated. |
| SIM24-005 | major | Edited controls could silently sit beside an old result. | Closed: ephemeral alignment warns that the displayed result belongs to the previous request. |
| SIM24-006 | major | A plan hash could compete with result identity. | Closed: the plan mints no digest; only executed result JSON owns local SHA-256. |
| SIM24-007 | minor | Compact profiles could hide decisive request controls. | Closed: all profiles retain selection counts, human routes, direction, budgets, state, and execution/alignment boundary. |
| SIM24-008 | minor | The cleaner summary could be promoted into comprehension evidence. | Closed: claims remain deterministic projection and browser mechanics only. |

## Result review

`sim-23` makes the composition request legible as one thing before it becomes a
working graph. A reader can see what is being added, which typed routes are
selected, what is being subtracted, and where traversal must stop without
opening Full metadata or mentally reconciling five distant controls. The same
panel then protects the boundary between current controls and the displayed
result.

This does not establish comprehension, correct selection, compatibility,
useful closure, accessibility for a population, task success, preferred
defaults, or return use. It adds no semantic parsing, result prediction,
persistence, collaboration, publishing, or `preview-01` evidence.
