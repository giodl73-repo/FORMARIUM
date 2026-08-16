# Proof Set Simulation Preflight 26 - Result Reconciliation

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a reader see what happened to every explicit Composition Lab choice after
execution without mentally joining the form, detailed audit, map, and reading
route—and without turning structural admission into semantic approval or
treating unselected routes as rejected alternatives?

## Plan review

Add a `sim-25`-gated deterministic reconciliation projection over one
identified result. Classify each selected relation exactly once as admitted,
stopped, capacity-limited, or predecessor-unreached; classify each selected
exclusion as conflict or inactive; retain every seed; expose depth, edge, node,
and work use/cap; preserve canonical and traversal direction; inherit result
identity; and retain `sim-24` exactly.

The contract is `specs/COMPOSITION-RESULT-RECONCILIATION.md`. The compact
design review is `composition-result-reconciliation-design-2026-08-16.md`;
the nine-role fixed point is
`composition-result-reconciliation-roles-check-2026-08-16.md`. Both report
zero open P1/P2 findings.

## Implemented plan

The pure `factorium-composition-reconciliation-v0` record receives only the
identified result and digest-matched Lab/Reading payloads. It repeats source
digests and inherits the local result SHA-256 without minting a new identity.
Selected sets are sorted and must partition exhaustively and disjointly onto
existing result records. Unselected edges, frontiers, unresolved relations,
conflicts, or inactive exclusions reject the projection. Unknown relation,
reason, check, binding, payload, and state forms also fail closed.

The result begins with `What happened to your request`: a structural state
explanation, four compact totals, four finite budget ledgers, one human-bound
decision row per selected relation/exclusion, and a permanent notice that
unselected routes were not considered. Full adds exact IDs, qualifications,
raw reasons, source custody, and inherited identity. Compact hides exact
custody and longer reasons while retaining every selected decision. The
existing detailed audit, closure map, reading route, focus route, form values,
and result identity remain unchanged.

## Verification

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
.\tools\render_proof_set.ps1 -Edition sim-25
node tools\check_composition_reconciliation.js
node tools\check_proof_set_composition_reconciliation.js target\proof-set-sim-25
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-25
.\tools\render_proof_set.ps1 -Edition sim-24 -OutputDirectory target\proof-set-sim-24-regression
```

The full README validation sequence passes, including 66 Rust tests, Clippy,
both independent packet verifiers, and the installed `.roles` validator. Pure
tests cover default admission, conflict, frontier, atomic work capacity,
unreachable predecessor, reverse direction, order invariance, overlap,
unselected records, and payload drift. Generated-site checks cover the full
composition stack and 129-record search index. Live Edge checks cover default,
conflict, and frontier reconciliation, all four budget ledgers, profile
projection without control mutation, mobile layout, map, route, and focus.
The inspected Book capture is `target/sim25-composition-reading.png`.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 153 |
| Indexed destinations | 129 |
| Site pages | 167 |
| Relation decision classes | 4 |
| Exclusion decision classes | 2 |
| Finite budget ledgers | 4 |
| Local page, asset, and fragment links | 3,632 |
| Missing local targets | 0 |
| Site identity | `561e46d4e5dea6ea275f8fae256dae740a083bc0331e27f72e978efdf5e4e191` |
| Standalone SHA-256 | `70508fd76ed453765d1c80217bab299cc9e66401231761d5e959399a878dfa06` |

## Prior-edition regression

`sim-24` retains site identity
`f1c09d10a492bbe4548608425dde536d5da11aa76fce96c2c3adedb757cc8f57`
and standalone SHA-256
`36bdf398b81ecb614685069748518616072bef40ba3f81eeabcc279e3bbfb22d`.
The new specification, source page, CSS, JavaScript, contract link, manifest
checks, and generated asset are `sim-25`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM26-001 | major | Readers had to mentally join controls and several result stages. | Closed mechanically: one post-run projection accounts for every explicit choice. |
| SIM26-002 | major | A selected relation could be silently omitted or multiply classified. | Closed: exhaustive disjoint partition validation fails closed. |
| SIM26-003 | major | “Not admitted” could erase reachability, capacity, and frontier differences. | Closed: three distinct non-traversal classes retain exact reasons. |
| SIM26-004 | major | Reverse traversal could rewrite canonical relation direction. | Closed: canonical and traversal endpoints remain separate. |
| SIM26-005 | major | Unselected routes could look evaluated and rejected. | Closed: they are absent, forbidden in result records, and named as not considered. |
| SIM26-006 | minor | Another summary identity could compete with the executed result. | Closed: reconciliation inherits the result digest and mints none. |
| SIM26-007 | minor | Compact presentation could hide a stopped choice. | Closed: every profile retains all decision labels and structural state. |

## Result review

`sim-25` makes the request/result join visible. A reader can now distinguish an
admitted traversal from a budget frontier, atomic capacity shortage,
unreached predecessor, exclusion conflict, and inactive exclusion before
opening the full graph audit. The projection remains strictly subordinate to
the identified result and the book destinations it links.

This does not establish comprehension, useful concept or relation selection,
semantic compatibility, domain correctness, task success, accessibility for a
population, recommendation quality, performance, canonical-query emission,
publication, or `preview-01` evidence.
