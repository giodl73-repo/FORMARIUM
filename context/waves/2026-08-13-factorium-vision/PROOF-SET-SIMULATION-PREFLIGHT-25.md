# Proof Set Simulation Preflight 25 - Finite Work Budget

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the live Composition Lab declare and enforce the canonical fourth finite
budget without admitting partial relations, exceeding the cap, changing prior
editions, or implying performance and semantic evidence?

## Plan review

Add an edition-gated Work records control to `sim-24`. Use the canonical trace
sum of seeds, nodes, edges, frontiers, conflicts, checks, and projections;
reserve an entire relation bundle before admission; fail closed below the seed
floor; propagate exact trace values through starters and the Query Plan; and
retain `sim-23` exactly.

The contract is `specs/COMPOSITION-WORK-BUDGET.md`. The compact design review
is `composition-work-budget-design-2026-08-16.md`; the eight-role fixed point
is `composition-work-budget-roles-check-2026-08-16.md`. Both report zero open
P1/P2 findings.

## Implemented plan

The visible range is 3-64 emitted records. Default F1 declares and uses 9.
Every seed reserves its seed, node, and projection records. Before an eligible
relation mutates the graph, the engine projects its edge and check, new
required/evaluative nodes and projections, and newly reached conflicts. An
atomic bundle that cannot fit becomes an exact work-capacity requirement and
admits no partial graph records. A depth/node/edge frontier is emitted only
when its own record also fits. The result asserts work never exceeds its cap
and displays `Work used / cap`.

All five authored starters carry the exact canonical trace work budgets: 9,
9, 9, 10, and 13. Loading still does not run closure. The Query Plan repeats
work beside direction, depth, edges, and nodes and diagnoses a missing or
malformed work control without inventing a repair.

## Verification

```powershell
cargo fmt --check
cargo test
.\tools\render_proof_set.ps1 -Edition sim-24
node tools\check_composition_lab.js
node tools\check_composition_query_plan.js
node tools\check_proof_set_composition_work_budget.js target\proof-set-sim-24
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-24
.\tools\render_proof_set.ps1 -Edition sim-23 -OutputDirectory target\proof-set-sim-23-regression
```

Rust passes 66 unit, integration, conformance, custody, and documentation
tests. Pure composition checks pass. Generated-site checks pass for the lab,
reading route, focus, palette, views, map, starters, Query Plan, work budget,
and 129-record search index. The Edge flow observes the exact starter values,
default and frontier execution, work in the receipt, mobile layout, reading
route, map, and focus page. Book and focus captures are
`target/sim24-composition-reading.png` and
`target/sim24-composition-reading-focus.png`.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 152 |
| Indexed destinations | 129 |
| Site pages | 166 |
| Finite work controls | 1 |
| Canonical starter work values | 5 |
| Local page, asset, and fragment links | 3,619 |
| Missing local targets | 0 |
| Site identity | `f1c09d10a492bbe4548608425dde536d5da11aa76fce96c2c3adedb757cc8f57` |
| Standalone SHA-256 | `36bdf398b81ecb614685069748518616072bef40ba3f81eeabcc279e3bbfb22d` |

## Prior-edition regression

`sim-23` retains site identity
`0509bbdea57a0ca63590a2166aa88f18dc77b9fa16431ee1ffc79b7683c31a63`
and standalone SHA-256
`183846b83e8e9ea82a5eb1e678f6137f454c26a77fc4c7ea6b5896ad1cf033e7`.
Its form, three-budget plan, starter payload, and runtime assets remain exact.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM25-001 | major | The live lab reported work but could not bound it. | Closed: work is a required input and hard cap. |
| SIM25-002 | major | Post-hoc accounting could cross the requested limit. | Closed: complete atomic record cost is reserved before graph mutation. |
| SIM25-003 | major | A frontier record could itself exceed work. | Closed: frontier capacity is checked before emission. |
| SIM25-004 | major | Starter work values could drift into UI inventions. | Closed: all five come from exact canonical traces. |
| SIM25-005 | minor | Work could imply elapsed compute or scale. | Closed: interface, manifest, and claims name emitted-record accounting only. |

## Result review

`sim-24` now exposes the same four finite budget dimensions as the roadmap and
canonical query grammar. The result is mechanically bounded and auditable,
while atomic capacity failure stays visible instead of producing an invalid
partial relation.

This does not establish useful defaults, runtime or memory performance,
scalability, reader comprehension, semantic completeness, domain correctness,
canonical-query emission, publication, or `preview-01` evidence.
