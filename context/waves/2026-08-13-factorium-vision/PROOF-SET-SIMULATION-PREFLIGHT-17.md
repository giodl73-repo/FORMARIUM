# Proof Set Simulation Preflight 17 - Bounded Composition Lab

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the book site accept an explicit set of concepts and reviewed relations,
compute a useful bounded closure, and expose subtraction, evaluation, stopping,
and flattening without implying natural-language discovery, substantive domain
judgment, canonical query creation, or a production Workbench?

## Plan review

Add one local Compose route to `sim-16`. Bind it to only the exact six F1-F6
sidecar records and current reference/relation digests. Accept one to three
explicit endpoint seeds, an explicit relation allowlist, direction, finite
depth/edge/node budgets, and optional exclusions. Normalize input order,
compute a deterministic fixed point, retain required-node conflicts, keep all
checks unresolved, bind the full result into SHA-256 identity, and label every
flattening as a lossy simulation draft. Retain `sim-15` exactly.

The compact design review is `composition-lab-design-2026-08-16.md`; the
nine-role Factorium fixed point is
`composition-lab-roles-check-2026-08-16.md`. Both report zero open P1/P2
findings. The executable boundary is `specs/COMPOSITION-LAB.md`.

## Implemented lab

The `sim-16` Compose route provides:

- a graph-inert problem statement and explicit local Context Profile;
- exact endpoint seed controls generated from the six reviewed relations;
- an explicit F1-F6 allowlist with direction and qualifiers visible;
- finite depth, edge, and node budgets;
- optional exclusions that retain reached required nodes as conflicts;
- Add, Multiply, Subtract, Evaluate, Stop, and Flatten result stages;
- unresolved-only scope checks and no `complete` result state;
- a canonicalized result identity covering all inputs, exact source digests,
  nodes, edges, conflicts, checks, boundaries, and draft projections;
- no storage, network, account, collaboration, canonical trace export, or
  publication path.

The runtime distinguishes a true frontier at an exactly reached budget from an
atomic relation that cannot fit the remaining node capacity. The latter is an
explicit unresolved capacity requirement rather than a false truncation.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-16
node tools\check_composition_lab.js
node tools\check_proof_set_composition.js target\proof-set-sim-16\manifest.json target\proof-set-sim-16\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-16
```

The pure-engine conformance suite covers basic forward closure, seed and
relation order invariance, context-sensitive identity, reverse traversal,
exact-budget truncation, required-node exclusion, an unreachable selected
relation, graph-inert suggestive prose, and fail-closed invalid inputs. The
generated-site checker independently inspects exact relation/scope payloads,
routes, controls, default execution, unresolved-only outcomes, and prohibited
browser APIs.

Microsoft Edge headless inspection executed the actual browser form and
WebCrypto path. The default request returned `incomplete`, admitted F1 with
three graph nodes and one unresolved Constraint check, produced three selected
loss-declared projections, and emitted identity
`6141ec6e1cb484628899d22817743e8c85437d1abea77fa72df47ee0c3f2470c`.
Desktop visual inspection covers the empty and populated result. This is
mechanical execution/layout evidence only, not reader or accessibility
evidence.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 144 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Reviewed lab relations / scopes | 6 / 6 |
| Composition Lab pages | 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 158 |
| Total site files | 164 |
| Local page, asset, and fragment links | 3,495 |
| Missing local targets | 0 |
| Site identity | `b1c176db8ba557aa984b06499860fb2ca6e222ba83ad432857099a3c8c7f4e58` |
| Standalone SHA-256 | `83cbe2966182476fc3ba424c2e4b0b40ace8394c3143ab17a22659edce9d5ef4` |

The standalone projection retains 2,069 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-15` independently retains 143 sources, 129 indexed destinations, 156
pages, five problem routes, five trace targets, zero missing targets, site
identity
`89e55e77f309caafb11f23f78c4fd2855161839b382e764c6f4add525a3d9544`,
and standalone SHA-256
`b7c788b64a604b69b12f639332006be8cb4c4b872699cabf49d6fad4b24dc63a`.
The regression caught and closed an initially unconditional null lab payload;
all lab assets, data, manifest fields, navigation, and page counts are now
strictly edition-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM17-001 | major | Problem prose could imply semantic graph discovery. | Closed: prose is graph-inert and the page states that only explicit controls select closure. |
| SIM17-002 | major | A selected relation outside the reached graph could disappear. | Closed: it becomes an explicit unresolved requirement. |
| SIM17-003 | major | Subtraction could erase a required node. | Closed: the node remains and the result becomes contradictory with a rejected projection. |
| SIM17-004 | major | Stable closure or `Evaluate` could imply a substantive verdict. | Closed: checks remain unresolved and the lab never emits `complete`. |
| SIM17-005 | major | An interactive draft could be mistaken for a canonical trace or guide. | Closed: every projection declares loss and the contract denies export/publication status. |
| SIM17-006 | major | Input order or source drift could destabilize custody. | Closed: normalized sets and exact source/result identity are independently tested. |
| SIM17-007 | minor | A capacity stop could be mislabeled as truncation. | Closed: atomic capacity requirements are distinct from exactly reached budget frontiers. |
| SIM17-008 | minor | New global data or manifest keys could disturb `sim-15`. | Closed: every lab addition is edition-gated and exact prior identities are retained. |

## Result review

`sim-16` is the first Factorium publication simulation to evaluate a newly
configured, explicit concept graph rather than only display preset traces. It
demonstrates the intended query shape: select concepts, admit typed joins,
form a bounded closure, preserve conflicts and unresolved checks, then inspect
a loss-declared draft beside the book and full guides.

It does not understand the problem statement, discover relations, judge
whether a real system or claim is valid, create a canonical Composition Query
V0 record, persist work, publish content, establish reader success, or admit
`preview-01`.
