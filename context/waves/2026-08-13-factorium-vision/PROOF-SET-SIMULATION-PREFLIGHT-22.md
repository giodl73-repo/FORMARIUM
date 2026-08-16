# Proof Set Simulation Preflight 22 - Composition Closure Map

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can an identified Composition Lab result become a compact, accessible graph
picture without reconstructing meaning from the DOM, duplicating shared nodes,
inventing scope edges, hiding stopped states, or displacing the exact audit and
book route?

## Plan review

Add an edition-gated map projection to `sim-21`. Chain after the installed
reading-route renderer and consume the same identified result object. Place
every admitted artifact exactly once by closure depth; draw every admitted
typed traversal separately; mark evaluative ownership, frontiers, conflicts,
and unresolved relations distinctly; provide a complete HTML record
equivalent; fold rather than delete the stage audit; mint no identity; and
retain `sim-20` exactly.

The contract is `specs/COMPOSITION-CLOSURE-MAP.md`. The compact design review
is `composition-closure-map-design-2026-08-16.md`; the eight-role Factorium
fixed point is `composition-closure-map-roles-check-2026-08-16.md`. Both report
zero open P1/P2 findings.

## Implemented map

The pure projection emits `factorium-composition-closure-map-v0` from the
identified result, six-relation payload, and 18 exact reading bindings. It
repeats the result and source identities and records:

- each admitted node once with human binding, exact artifact, class, depth,
  origin, predecessor, projection disposition, and visible role;
- each admitted relation once with canonical direction, selected traversal
  direction, endpoints, scope, verb, and qualifications;
- one explicitly non-semantic evaluation connector per admitted relation;
- exact frontier, unresolved relation, conflict, inactive exclusion, and check
  records;
- deterministic depth-column coordinates using fixed card and gap constants.

The SVG is an image with a programmatic title and exact-count description.
Cards state Selected, Required, Evaluate, Frontier, or Conflict in text. Solid
arrows are admitted typed traversals; dashed connectors are evaluation
ownership or stopped frontiers. A keyboard-focusable horizontal viewport
preserves readable card size at 600 pixels. Ordinary HTML lists provide the
same node, traversal, check, boundary, and identity records.

The result's Add, Multiply, Subtract, Evaluate, Stop, and Flatten records move
into one native audit disclosure after the map. Book, Abbreviated, and Compact
begin folded; Full opens it. The reading route remains immediately after the
audit. A map validation failure leaves both base surfaces intact and shows one
local unavailable notice rather than a partial graph.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-21
node tools\check_composition_lab.js
node tools\check_composition_reading.js
node tools\check_composition_palette.js
node tools\check_composition_views.js
node tools\check_composition_map.js
node tools\check_proof_set_composition.js target\proof-set-sim-21\manifest.json target\proof-set-sim-21\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-21
node tools\check_proof_set_composition_reading.js target\proof-set-sim-21
node tools\check_proof_set_composition_focus.js target\proof-set-sim-21
node tools\check_proof_set_composition_palette.js target\proof-set-sim-21
node tools\check_proof_set_composition_views.js target\proof-set-sim-21
node tools\check_proof_set_composition_map.js target\proof-set-sim-21
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-21
```

The pure checker covers forward and reverse traversal while retaining
canonical relation direction, unique shared nodes, reached-node conflicts,
finite-budget frontier ghosts, unresolved predecessors without fabricated
nodes, inactive exclusions without graph mutation, full array-order
invariance, coordinate uniqueness, label wrapping, unknown artifacts,
duplicate records, and digest mismatch.

The generated-site checker proves manifest boundaries, script ordering, map
CSS and horizontal overflow, absence of storage/network mechanisms, and exact
agreement between the three graph nodes and three map nodes. The Edge checker
observes three unique admitted cards, one solid traversal, one dashed scope
connector, zero frontier ghosts, an SVG image title and exact-count
description, three HTML node records, one HTML traversal record, result
identity equality, map/audit/route order, Book-folded and Full-open audit
behavior, keyboard mobile scrolling, reload, the same two-page route, and the
exact factor focus. The Book flow is captured at
`target/sim21-composition-reading.png`; focus is captured at
`target/sim21-composition-reading-focus.png`. This is mechanical and visual
evidence only.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 149 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Default admitted map nodes / traversals | 3 / 1 |
| Default evaluation connectors / frontiers | 1 / 0 |
| Composition profiles | 4 |
| Concept groups / controls | 6 / 12 |
| Route bindings / factor focuses | 18 / 12 |
| Composition Lab / Closure Map pages | 1 / 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 163 |
| Total site files | 173 |
| Local page, asset, and fragment links | 3,571 |
| Missing local targets | 0 |
| Site identity | `30daf344d6baaa03c467abc37e7d608e766ec8628658b5a6328c18a211c06475` |
| Standalone SHA-256 | `d56fcb5ebd412effdf57b640bc753bf0a6a0d1220b9cf0261107e8a26f0e059f` |

The standalone projection retains 2,107 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-20` independently retains 148 sources, 129 indexed destinations, 162
pages, four composition profiles, zero missing targets, site identity
`1872641e723797541191c3c994311536c142c29d0a360156b47d8e321cba2378`,
and standalone SHA-256
`b99c6862f84a1f420ccbd5a5d2941cf63289c79105b2042b039f5167284d7e22`.
The new specification, CSS, JavaScript, contract link, manifest checks, and
generated asset are all `sim-21`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM22-001 | major | Reconstructing the graph from visible stage text would lose exact custody. | Closed: the map chains from the same identified result object passed to the reading route. |
| SIM22-002 | major | A tree could duplicate a shared artifact and imply multiple nodes. | Closed: unique artifact identity owns placement; every admitted edge targets that one position. |
| SIM22-003 | major | Reverse arrows could reverse the typed relation's meaning. | Closed: traversal direction is separate while Full records retain canonical source-to-target order and qualifications. |
| SIM22-004 | major | A scope connector could look like an inferred semantic relation. | Closed: it is dashed, labelled Evaluate, recorded as non-semantic ownership, and absent from traversal counts. |
| SIM22-005 | major | Frontier and unresolved states could look admitted or disappear. | Closed: frontier ghosts say Frontier and use dashed outlines; unreachable predecessors remain boundary records without nodes. |
| SIM22-006 | major | SVG-only success would omit a complete non-visual path. | Closed: deterministic HTML lists repeat node, traversal, scope, boundary, and result identity data. |
| SIM22-007 | minor | Folding the audit could hide negative details. | Closed: always-visible counts/cards state negative outcomes, and native audit disclosure remains available in every profile. |
| SIM22-008 | minor | A visually coherent graph could be promoted into semantic or usability evidence. | Closed: claims remain identified-result display mechanics and visual inspection only. |

## Result review

`sim-21` finally makes the closure feel like the thing the reader constructed.
The compact picture shows the selected concept, what the exact typed traversal
required, which view owns evaluation, and whether anything stopped or
conflicted. The detailed stage ledger and book destinations remain adjacent,
so the picture summarizes rather than replaces custody.

This does not establish better comprehension, task speed, accessibility for a
population, useful graph layout at larger scale, semantic or causal discovery,
relation recommendation, complete context, domain validity, successful real
application, or return use. It adds no graph editing, persistence,
collaboration, publication, or `preview-01` evidence.
