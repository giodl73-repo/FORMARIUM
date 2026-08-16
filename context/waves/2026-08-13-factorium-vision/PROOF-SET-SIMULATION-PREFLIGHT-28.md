# Proof Set Simulation Preflight 28 - Rerun Comparison

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

After a reader applies an exact optional continuation edit and separately runs
closure again, can they see which request changes were actually executed and
which structural records changed—without retaining general history, claiming
the action caused every difference, or calling the new result successful?

## Plan review

Add a `sim-27`-gated, one-use comparison between the identified result that
offered a successfully activated continuation and the next result produced by
the existing explicit Run action. Reconstruct and verify the exact action,
mark it present or superseded, list every other request edit atomically,
compare exact structural decisions and counts, consume the pending comparison,
store nothing, mint no identity, and retain `sim-26` exactly.

The contract is `specs/COMPOSITION-RERUN-COMPARISON.md`. The compact design
review is `composition-rerun-comparison-design-2026-08-16.md`; the nine-role
fixed point is `composition-rerun-comparison-roles-check-2026-08-16.md`.
Both report zero open P1/P2 findings.

## Implemented plan

The pure `factorium-composition-rerun-comparison-v0` record validates both
identified results against the same exact reference/relation sources. It
rejects duplicate, unselected, malformed, drifted, or multiply classified
nodes, edges, frontiers, unresolved relations, exclusions, checks, and
projections. Its independent continuation reconstruction is byte-parity tested
against every covered `sim-26` action class before a clicked action ID can be
admitted.

Request differences are atomic: scalar replacement or one exact set addition/
removal. Only an exact declared before/after transition receives
`continuation-action`; every other difference is `additional-control-edit`.
An action changed again before Run is `superseded-before-run`. Result records
compare state, work, counts, relation and exclusion decisions, nodes, and
checks. Book leads with human structural transitions; Compact retains every
action/request/decision change; Full exposes both inherited result identities
and source custody.

The live frontier path demonstrates why this layer matters. Raising edges
from 1 to 2 does not admit F6: it changes `stopped at edge budget` to `stopped
at node budget`. The receipt names that newly exposed boundary without calling
the edit a fix. A later ordinary Run shows only the current result and clears
the consumed comparison.

## Verification

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
.\tools\render_proof_set.ps1 -Edition sim-27
node tools\check_composition_rerun_comparison.js
node tools\check_proof_set_composition_rerun_comparison.js target\proof-set-sim-27
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-27
.\tools\render_proof_set.ps1 -Edition sim-26 -OutputDirectory target\proof-set-sim-26-regression
```

The full README validation sequence passes: 66 Rust tests, Clippy, all five
canonical Composition Query fixtures, canonical reference and sidecar checks,
both independent packet verifiers, the installed `.roles` validator, every
pure and generated-site Composition layer, and the 129-record search check.
Pure comparison fixtures cover edge, work, node, predecessor-seed, conflict,
inactive exclusion, present and superseded actions, additional edits, equal
result identities, order invariance, payload parity, and adversarial drift.
Live Edge covers explicit apply/run separation, the nested frontier, receipt
placement, neutral language, Book/Compact/Full behavior, unchanged controls,
and one-use clearing. The inspected capture is
`target/sim27-composition-reading-comparison.png`.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 155 |
| Indexed destinations | 129 |
| Site pages | 169 |
| Action dispositions | 2 |
| Request-change sources | 2 |
| Compared structural dimensions | 6 |
| Retained comparison history | 1 consumed receipt |
| Local page, asset, and fragment links | 3,658 |
| Missing local targets | 0 |
| Site identity | `18380606e74f10f138418ba231056a3ad200376cea8ccea941740327729b30c7` |
| Standalone SHA-256 | `e33478b08f641777aa902c6a96c689b172a2a4910fd26b3ee65bef6f3ad3f236` |

## Prior-edition regression

`sim-26` retains site identity
`0d663d146adcacbb1e43c33e73ec3b9ec135770864448578a924df45d8c1bdf0`
and standalone SHA-256
`754252bd71c05347bea6c971068af7be141ad7b01f95ca13b8284c09b4616bb7`.
The new specification, source page, CSS, JavaScript, contract link, manifest
checks, and generated asset are `sim-27`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM28-001 | major | The prior result vanished after the explicit rerun, forcing mental reconstruction. | Closed mechanically: one exact before/after receipt follows a continuation rerun. |
| SIM28-002 | major | A graph delta could be falsely attributed entirely to one button. | Closed: only exact target transitions are attributed; all additional edits are separate. |
| SIM28-003 | major | A continuation could be changed again before execution. | Closed: each action is present or superseded against the executed request. |
| SIM28-004 | major | Raising one cap could expose another boundary while appearing repaired. | Closed: edge-frontier → node-frontier is rendered as a neutral stopped-reason transition. |
| SIM28-005 | major | Result history could become undeclared work-product persistence. | Closed: one pending pair is held only in page memory and consumed on the next Run. |
| SIM28-006 | minor | A comparison digest could compete with result identity. | Closed: the record inherits both SHA-256 values and mints none. |
| SIM28-007 | minor | Compact presentation could hide extra manual edits. | Closed: all request changes and changed decisions remain in Compact. |

## Result review

`sim-27` closes the explicit local iteration loop without creating automatic
closure or general history. A reader can now distinguish the edit they staged,
the request they actually ran, and the structural boundary that appeared.
The comparison remains subordinate to the two exact local results and their
current book routes.

This does not establish causality, improvement, successful repair, useful
selection, semantic validity, domain correctness, comprehension,
accessibility for a population, task success, persistence, publishing, or
`preview-01` evidence.
