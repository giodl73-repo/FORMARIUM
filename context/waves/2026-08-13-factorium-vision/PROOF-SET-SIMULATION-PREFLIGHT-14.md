# Proof Set Simulation Preflight 14 - Subtract Conflict

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a reader request subtraction of a concept from a bounded closure without
silently deleting a required node, and can the resulting contradiction remain
useful without being mistaken for a real system failure?

## Plan review

Use F1 to retain a report-generator dependency and its required interface.
Record the requested interface rejection as an explicit conflict and rejected
projection disposition while leaving the graph node required. Fail the
declared Constraint check, return state `contradictory`, and offer repair paths
instead of a valid recommendation. Add the exact worksheet to the problem-led
route in `sim-13`; retain `sim-12` exactly.

The compact design review is `subtract-conflict-design-2026-08-16.md`; the
seven-role Factorium fixed point is
`subtract-conflict-roles-check-2026-08-16.md`. Both report zero open P1/P2
findings.

## Implemented trace and worksheet

`fixtures/composition/dependency-exclusion-conflict.factorium-query` and
`guides/dependency-exclusion-conflict-worksheet.md`:

- seed the dependency source, target, and direction factor;
- follow F1 to the required interface factor and Constraint scope;
- retain F1 direction and `condition=required-interaction`;
- record `required-interface-exclusion` against the required interface node;
- preserve requested rejection in the projection rather than deleting history;
- fail the structural Constraint check and declare `contradictory`;
- state that no valid flattened recommendation exists;
- offer retain, equivalently map, remove dependency, or rescope as bounded
  repair paths.

The contradiction belongs to the retained-dependency/requested-exclusion pair.
It is not evidence of an observed architecture fault or a contradiction in the
canonical reference.

## Rendered result

```powershell
.\tools\render_proof_set.ps1 -Edition sim-13
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 142 |
| Numbered records / application guides | 122 / 6 |
| Indexed destinations | 128 |
| Problem-led targets | 4 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 155 |
| Total site files | 160 |
| Local page, asset, and fragment links | 3,132 |
| Missing local targets | 0 |
| Site identity | `7be25fad79132bd912632b5336a718ac166f4eb3f93116e2b226742eed2e1f4d` |
| Standalone SHA-256 | `91c6f22f3a9b970e1b24c612b905f0d0ca227ebeac4180686e0051c8c0a8c1bc` |

The standalone projection has 2,037 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 67 visible repository-source
links.

## Search, route, and regression result

`node tools/check_proof_set_search.js
target/proof-set-sim-13/search-index.json 128` passes established search cases
and verifies that `subtract required interface` includes the conflict worksheet
exactly once by stable source path.

The homepage requires four unique selected problem targets. An edition-gated
stylesheet changes the desktop problem grid from three columns to a balanced
two-by-two layout; the narrow route remains one column.

`sim-12` independently retains 141 sources, 127 indexed destinations, 154
pages, three problem routes, zero missing targets, site identity
`8160eaebc2daf60231c33024430e3672b305ee05907927d0a6b3ad6abd05e0f1`,
and standalone SHA-256
`4507d45b1d6f88f8c0c97bd29abb7615ec519dc4d87cd504627d16c0dbfe1ff8`.

Microsoft Edge headless inspection covers the four-card homepage and conflict
worksheet at desktop and constrained narrow widths. These are mechanical
layout checks only, not observed comprehension or usability evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM14-001 | major | Subtract could silently delete a required graph node. | Closed: the node remains required and the request becomes an exact conflict. |
| SIM14-002 | major | Required graph status and rejected projection could look inconsistent. | Closed: the worksheet separates graph necessity from requested output disposition. |
| SIM14-003 | major | Failed Constraint could be read as an observed system failure. | Closed: failure and contradiction are qualified as trace-local. |
| SIM14-004 | major | A contradictory trace could still emit a recommendation. | Closed: the result explicitly refuses a valid flatten and lists repair paths only. |
| SIM14-005 | minor | A fourth card could unbalance the homepage. | Closed: `sim-13` uses a two-by-two desktop and one-column narrow grid. |
| SIM14-006 | minor | The new route could disturb the prior edition. | Closed: source, search, page, identity, and hash regressions retain exact `sim-12`. |

## Result review

`sim-13` now demonstrates every user-facing operator label: add, multiply,
subtract, evaluate, and flatten. Its valid fixtures cover complete,
incomplete, and contradictory closure while keeping separate substantive claim
or decision states.

This does not perform destructive graph editing, choose a repair, evaluate a
real architecture, automate closure, persist work, admit `preview-01`, or
establish reader success. The remaining unexercised V0 closure state is
`truncated`, which should be added only with a genuine finite-budget frontier
scenario.
