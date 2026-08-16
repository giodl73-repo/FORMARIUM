# Proof Set Simulation Preflight 27 - Explicit Continuations

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a reader turn an exact stopped or conflicting result into one bounded edit
for a possible next request without the system silently changing intent,
rerunning closure, or presenting the edit as a recommendation?

## Plan review

Add a `sim-26`-gated projection from the identified result to three optional
action kinds: raise the exact limiting finite budget, add the exact unreachable
traversal predecessor as a seed, or remove the exact conflicting/inactive
exclusion. Revalidate the target control's before-value on activation, edit
one visible control only, retain the old result and identity, mark the Query
Plan stale, never submit, and retain `sim-25` exactly.

The contract is `specs/COMPOSITION-EXPLICIT-CONTINUATIONS.md`. The compact
design review is `composition-explicit-continuations-design-2026-08-16.md`;
the nine-role fixed point is
`composition-explicit-continuations-roles-check-2026-08-16.md`. Both report
zero open P1/P2 findings.

## Implemented plan

The pure `factorium-composition-continuations-v0` projection receives the
identified result and digest-matched Lab/Reading payloads. It rejects unknown,
duplicate, unselected, drifted, or multiply classified result records. Exact
frontier and capacity reasons determine arithmetic budget targets; unreachable
relations name only their declared traversal predecessor; exclusion actions
name only the selected artifact. Actions over a UI maximum remain visible but
disabled.

Each button has `type=button` and rechecks the exact current value before
changing one staged form control. The ordinary bubbling input/change events
make authored-starter identity clear and set Query Plan alignment to
`controls-changed`. The displayed result, reconciliation, map, route, and
SHA-256 remain the previous execution until the reader separately chooses Run.
No continuation record predicts the outcome of that later request.

## Verification

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
.\tools\render_proof_set.ps1 -Edition sim-26
node tools\check_composition_continuations.js
node tools\check_proof_set_composition_continuations.js target\proof-set-sim-26
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-26
.\tools\render_proof_set.ps1 -Edition sim-25 -OutputDirectory target\proof-set-sim-25-regression
```

The full repository validation sequence passes, including 66 Rust tests,
Clippy, both independent packet verifiers, canonical reference and sidecar
checks, the installed `.roles` validator, all pure composition checks, the
complete generated-site composition stack, and the 129-record search check.
Live Edge checks cover the empty default, exact exclusion removal, exact edge-
budget elevation, stale-action refusal after a manual edit, unchanged result
identity/state, Query Plan staleness, profiles, mobile layout, map, route, and
focus. The inspected Book capture is
`target/sim26-composition-reading.png`.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 154 |
| Indexed destinations | 129 |
| Site pages | 168 |
| Continuation action kinds | 3 |
| Mutable controls per activation | 1 |
| Local page, asset, and fragment links | 3,645 |
| Missing local targets | 0 |
| Site identity | `0d663d146adcacbb1e43c33e73ec3b9ec135770864448578a924df45d8c1bdf0` |
| Standalone SHA-256 | `754252bd71c05347bea6c971068af7be141ad7b01f95ca13b8284c09b4616bb7` |

## Prior-edition regression

`sim-25` retains site identity
`561e46d4e5dea6ea275f8fae256dae740a083bc0331e27f72e978efdf5e4e191`
and standalone SHA-256
`70508fd76ed453765d1c80217bab299cc9e66401231761d5e959399a878dfa06`.
The new specification, source page, CSS, JavaScript, contract link, manifest
checks, and generated asset are `sim-26`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM27-001 | major | A stopped result exposed a reason but no safe bridge to a next request. | Closed mechanically: exact reasons project to bounded single-control edits. |
| SIM27-002 | major | A continuation could accidentally run closure and replace evidence. | Closed: buttons never submit; the old result and identity remain visible. |
| SIM27-003 | major | A stale action could overwrite a reader's later manual change. | Closed: activation requires the exact recorded before-value. |
| SIM27-004 | major | “Continue” could imply an endorsed or successful outcome. | Closed: copy names optional edits and explicitly denies result prediction. |
| SIM27-005 | minor | UI maxima could make an action silently disappear. | Closed: unavailable actions remain visible with the exact maximum reason. |
| SIM27-006 | minor | A control edit could appear to match the old result. | Closed: normal control events force `controls-changed` alignment. |

## Result review

`sim-26` closes the mechanical loop from an explained result to an inspectable
next-request edit while preserving an explicit human decision and separate Run
boundary. Readers can raise the exact exhausted budget, add the exact missing
predecessor, or remove one exact exclusion; they cannot ask this layer to infer
a better concept, relation, or outcome.

This does not establish semantic validity, recommendation quality, useful
selection, successful rerun, comprehension, accessibility for a population,
task success, publishing, or `preview-01` evidence.
