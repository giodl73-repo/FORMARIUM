# Proof Set Simulation Preflight 12 - Reverse and Incomplete Composition

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can a Composition Query begin at the target of a directional feedback relation,
traverse it in reverse for lookup, and return a useful incomplete guide without
reversing edge meaning, inventing missing outcome evidence, or calling the
system failed?

## Plan review

Use F4 `feeds` to start from a synthetic alert-monitoring change and locate the
outcome evidence required for review. Preserve canonical edge direction and
qualification, make the Diagnostic check unresolved, and require state
`incomplete`. Add the worksheet to `sim-11`; centralize monotone edition
capabilities; retain exact `sim-10` render and search behavior.

The compact design review is
`reverse-incomplete-composition-design-2026-08-16.md`; the seven-role fixed
point is `reverse-incomplete-composition-roles-check-2026-08-16.md`. Both
report zero open P1/P2 findings.

## Implemented worksheet

`guides/alert-feedback-composition-worksheet.md` uses invented 2% and 1%
five-minute alert thresholds and an invented increase in alert delivery. It:

- distinguishes monitoring, threshold, alert, intervention, feedback,
  feedback control, and outcome;
- starts at monitoring and traverses F4 in reverse while printing the
  canonical outcome-to-monitoring `feeds` direction;
- preserves `condition=observed-effect` and stable-identity stopping;
- records the missing user-outcome measure and horizon;
- leaves the Diagnostic unresolved and the trace `incomplete`;
- reports only the synthetic configuration and alert-delivery facts;
- projects the missing outcome as unresolved rather than omitting it.

## Rendered result

```powershell
.\tools\render_proof_set.ps1 -Edition sim-11
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 141 |
| Numbered records / application guides | 122 / 5 |
| Indexed destinations | 127 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 154 |
| Missing local targets | 0 |
| Context Profiles / prior bindings | 3 / 16 |
| Site identity | `3bff45515413974abf6dbbf021c1a1ca4df4c811f692b66a8d2189c3b5f88c3e` |
| Standalone SHA-256 | `604ed696c9a5220fd34108b51bea0ff509aa248ba49d04fe9993861ac939739c` |

The projection has 2,016 valid internal links, zero missing fragments, zero
filesystem-dependent links, and 62 visible repository-source links.

## Renderer and regression result

The renderer now parses the admitted edition number once and uses explicit
minimum-edition boundaries for tasks, search, reader profiles, context,
multi-page site behavior, and worksheets. This removes repeated growing
edition lists. The current ValidateSet remains finite through `sim-11`, and
the expected guide count remains checked.

`sim-10` independently retains 140 sources, 126 indexed destinations, 153
pages, zero missing targets, site identity
`599e7606636c81ed251dbe6f06a0dde2533a9627a8fdb458f80e4a26b73a2ef1`,
and standalone SHA-256
`852f07693f29334cad59858d16fcd2381ca39244bfcea0c3b1b2feabd065aa9a`.

## Search and browser result

`node tools/check_proof_set_search.js
target/proof-set-sim-11/search-index.json 127` passes established search cases
and verifies that `alert outcome feedback` includes the worksheet exactly once
by stable source path. The same check over `sim-10` retains 126 destinations.

Microsoft Edge headless inspection covers the worksheet at desktop and a
constrained narrow viewport. It is mechanical layout evidence only, not
observed accessibility, comprehension, or mobile usability.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM12-001 | major | Reverse traversal could reverse or symmetrize canonical F4. | Closed: canonical source, target, qualifier, and reverse lookup semantics are printed together. |
| SIM12-002 | major | Feedback could authorize unbounded cyclic expansion. | Closed: stable identity stops the declared one-edge trace; no repeated edge is inferred. |
| SIM12-003 | major | Alert volume could substitute for user outcome. | Closed: outcome measure and horizon remain missing and unresolved. |
| SIM12-004 | major | `incomplete` could be read as system failure. | Closed: it qualifies trace closure and the unevaluable improvement decision only. |
| SIM12-005 | minor | Edition capability lists could drift on every simulation. | Closed: monotone capabilities use one numeric edition boundary. |
| SIM12-006 | minor | Refactoring the renderer could silently change the prior edition. | Closed: `sim-10` identity, hash, counts, links, and search remain exact. |

## Result review

`sim-11` adds semantic coverage, not merely example count. The three valid
fixtures now cover forward complete structural closure, forward complete
closure with an unresolved local claim, and reverse incomplete diagnostic
closure. Direction, trace state, and local decision state remain separate.

This does not automate expansion, model a real feedback loop, recommend an
alert policy, diagnose a service, admit `preview-01`, or establish reader
success. Further worksheet additions should be driven by an uncovered trace
state or relation pressure rather than a desire for relation-family counts.
