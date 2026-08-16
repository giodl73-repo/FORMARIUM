# Proof Set Simulation Preflight 16 - Composition Explorer

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the book site expose the structure of multi-concept query closure closely
enough to compare working graphs, while remaining an exact read-only projection
instead of implying automatic discovery or a live Workbench?

## Plan review

Generate a compact explorer from the five exact Composition Query manifests.
Preserve Add, Multiply, Evaluate, Stop, and Flatten distinctions; show context,
policy, budget, admitted nodes, checks, boundaries, projection counts, and
identity; and link every trace back to its complete Factor Guide. Fail closed
on source, worksheet, arithmetic, state, or route drift. Add this only to
`sim-15` and retain `sim-14` exactly.

The compact design review is `composition-explorer-design-2026-08-16.md`; the
eight-role Factorium fixed point is
`composition-explorer-roles-check-2026-08-16.md`. Both report zero open P1/P2
findings.

## Implemented explorer

The `sim-15` homepage places a read-only Composition Explorer after the five
problem-led routes and before the general method journey. It provides:

- five native HTML disclosure panels, one open and four compact;
- exact problem, context, direction, follow set, stop rule, and budgets;
- selected seed concepts in Add;
- admitted relation plus derived target and scope nodes in Multiply;
- declared check kind and outcome in Evaluate;
- frontier, conflict, or explicit absence in Stop;
- loss-declared projection-row count and full-guide route in Flatten;
- exact trace SHA-256 custody.

The renderer checks LF transport, V0 envelope, singleton records, current
reference and relation hashes, work arithmetic, node/edge budgets, worksheet
digest binding, unique trace IDs, card/trace state agreement, five guide
targets, and the expected two complete plus one each incomplete,
contradictory, and truncated distribution.

`tools/check_proof_set_composition.js` independently checks the manifest and
rendered HTML, including trace records, work accounting, disclosure count,
all five operation labels, guide routes, digests, and absence of form/input/
button controls.

## Rendered result

```powershell
.\tools\render_proof_set.ps1 -Edition sim-15
node tools\check_proof_set_composition.js target\proof-set-sim-15\manifest.json target\proof-set-sim-15\index.html
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 143 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Problem-led targets | 5 |
| Composition trace targets | 5 |
| Closure states represented | 4 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 156 |
| Total site files | 161 |
| Local page, asset, and fragment links | 3,315 |
| Missing local targets | 0 |
| Site identity | `89e55e77f309caafb11f23f78c4fd2855161839b382e764c6f4add525a3d9544` |
| Standalone SHA-256 | `b7c788b64a604b69b12f639332006be8cb4c4b872699cabf49d6fad4b24dc63a` |

The standalone projection retains 2,059 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Route, accessibility, and regression result

The explorer uses semantic headings, native `details`/`summary`, visible state
text, keyboard-native disclosure, and guide links. Color differentiates some
states but is not the only state signal. Four-stage grids collapse from four
to two to one column, identifiers wrap, and the primary navigation wraps.

Microsoft Edge headless inspection covers the explorer and open trace at
desktop and a 760-pixel constrained width. These checks establish mechanical
layout only, not reader comprehension, accessibility conformance, or usability
evidence.

`sim-14` independently retains 143 sources, 129 indexed destinations, 156
pages, five problem routes, zero missing targets, site identity
`6f61953a0f25fca55776e18e7808b035d63273fc7383c7db1ed73e0a395ea501`,
and standalone SHA-256
`34540fcb5ae10fad451a2443c1523ca9da087c096c7fc37e3c2706affd98afd4`.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM16-001 | major | The explorer could become a second hand-authored graph authority. | Closed: all structural fields are generated from exact traces and linked to guides. |
| SIM16-002 | major | A renderer-only parser could accept stale or inconsistent trace data. | Closed: transport, source digests, budgets, worksheet identity, and state distribution fail closed. |
| SIM16-003 | major | “Explorer” could imply live closure or relation discovery. | Closed: the surface is native read-only disclosure with no builder controls and explicit non-capabilities. |
| SIM16-004 | major | Edge-only display could hide admitted target and scope nodes. | Closed: Multiply lists every non-seed node with class and depth. |
| SIM16-005 | minor | Five expanded graphs could overwhelm the homepage. | Closed: one opens initially and four remain compact summaries. |
| SIM16-006 | minor | New navigation and CSS could disturb the prior edition. | Closed: exact `sim-14` site and standalone identities are retained. |

## Result review

`sim-15` is materially closer to the intended website and query/evaluation
experience: a reader can compare how several concept sets join, which working
nodes were admitted, what checks ran, why closure stopped, and where the full
book-form result lives. The trace remains subordinate to the Factor Guide and
canonical tables.

This does not accept a new query, select senses, discover relations, compute a
closure, edit a graph, rerun checks, infer a domain answer, persist work,
publish content, admit `preview-01`, or establish reader success.
