# Proof Set Simulation Preflight 23 - Authored Composition Starters

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the five reviewed problem patterns become inspectable starting
configurations in Compose without letting problem prose choose semantics,
creating a second trace mapping, silently executing closure, inheriting
reviewed outcomes, or serializing user work into navigation state?

## Plan review

Add five edition-gated authored starters to `sim-22`. Derive every structural
control from the exact worked traces; use only an allowlisted trace ID in a
homepage-to-Compose fragment; load visible controls without running; preserve
the reviewed guide as source authority; clear authored identity after an edit;
and retain `sim-21` exactly.

The contract is `specs/COMPOSITION-AUTHORED-STARTERS.md`. The compact design
review is `composition-authored-starters-design-2026-08-16.md`; the eight-role
Factorium fixed point is
`composition-authored-starters-roles-check-2026-08-16.md`. Both report zero
open P1/P2 findings.

## Implemented handoff

The generated `factorium-composition-starters-v0` payload repeats reference
and relation digests and derives each starter's problem, context, direction,
finite budgets, seeds, reviewed state, trace digest, and guide destination from
one exact trace. Relation allowlists union admitted `edge` records with exact
relation IDs in strict budget-frontier reasons. Conflict artifacts become
visible checked exclusions.

Five homepage problem cards link to fixed `#starter-<trace-id>` fragments.
Compose shows the same five cards and one `Load explicit controls` action per
card. Loading sets the visible form, clears any prior result, opens the
selected concept groups, updates readiness, and reports the exact source trace
while leaving Run separate. The fragment carries no arbitrary problem,
context, selection, budget, exclusion, or result data. The first subsequent
edit removes active starter state and the fragment.

Each card links back to the exact worked Factor Guide and says that the lab
will recompute a new unresolved draft. No reviewed check outcome, trace state,
projection, or identity is copied into that draft.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-22
node tools\check_proof_set_composition_starters.js target\proof-set-sim-22
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-22
```

The generated-site checker proves five source-bound records, five homepage
links, five cards, reverse/conflict/frontier coverage, script order, invalid
duplicate rejection, and absence of storage or network mechanisms. The live
Edge check observes direct reverse-fragment loading without execution, exact
conflict controls and contradictory recomputation, exact two-seed F2/F6
frontier controls and truncated recomputation, one visible frontier ghost,
result clearing between starters, modification-state clearing, profile
preservation, mobile layout, map, route, and factor focus.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 150 |
| Indexed destinations | 129 |
| Authored starters / homepage handoffs | 5 / 5 |
| Reviewed source states represented | 4 |
| Concept groups / controls | 6 / 12 |
| Total site pages / files | 164 / 175 |
| Local page, asset, and fragment links | 3,594 |
| Missing local targets | 0 |
| Site identity | `dab967874fc304a1fa3f9ffd47bc6559102bced0d525cb2b8addccd5736d7e6b` |
| Standalone SHA-256 | `8f80518d3e3c10006c60e35aa4e1eab4e6abbe5385d4660ba79a508b665101dc` |

The standalone projection retains 2,114 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-21` independently retains 149 sources, 163 pages, 173 files, site identity
`30daf344d6baaa03c467abc37e7d608e766ec8628658b5a6328c18a211c06475`,
and standalone SHA-256
`d56fcb5ebd412effdf57b640bc753bf0a6a0d1220b9cf0261107e8a26f0e059f`.
The new specification, source page, payload, CSS, JavaScript, links, manifest
checks, and generated asset are `sim-22`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM23-001 | major | A problem link could imply prose selected the graph. | Closed: links name authored controls, and only exact trace-derived controls govern the form. |
| SIM23-002 | major | A hand-maintained mapping could drift from trace bytes. | Closed: seeds, edges, frontier relations, conflicts, policy, budgets, and digests derive from exact trace records. |
| SIM23-003 | major | Load-and-run could hide the transition from example to new work product. | Closed: Load clears results and Run remains a separate action. |
| SIM23-004 | major | Reviewed trace outcomes could appear to validate the new result. | Closed: source state is labelled; every lab check remains unresolved and the result gets its own local identity. |
| SIM23-005 | major | General URL state would introduce persistence and disclosure surface. | Closed: only one allowlisted edition-local trace ID is accepted and modifications clear it. |
| SIM23-006 | minor | Negative examples could lose their exclusion or stopped relation. | Closed: conflicts map to exclusions and frontier relation IDs stay selected. |
| SIM23-007 | minor | Starters could be promoted as preferred defaults. | Closed: fixed worked order is not ranking, recommendation, or reader evidence. |

## Result review

`sim-22` turns the existing examples into inspectable starting points rather
than leaving the reader to recreate them from a worksheet. The exact controls
remain visible and editable, and the reviewed guide stays one click away.

This does not establish that a reader finds the starters, understands the
controls, chooses a useful route, predicts the result, completes a task, or
prefers any default. It adds no semantic parsing, arbitrary query sharing,
persistence, collaboration, publishing, or `preview-01` evidence.
