# Proof Set Simulation Preflight 11 - Cross-Domain Composition

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the trace-bound Composition Query worksheet grammar transfer from an F1
systems dependency to an F3 evidence relation while preserving the distinct
meaning, checks, and local outcome of each domain?

## Plan review

Add one materially different valid trace and worksheet. Use a synthetic
before/after latency scenario to expose observation, measurement, inference,
and claim stages; record missing causal support rather than inventing it; and
keep structural trace completeness separate from claim disposition. Render
both worksheets as ordinary Applications sources in `sim-10`, test each exact
source path in search, and retain `sim-09` as an independent regression.

The compact three-reviewer design record is
`cross-domain-composition-design-2026-08-16.md`; the seven-role Factorium fixed
point is `cross-domain-composition-roles-check-2026-08-16.md`. Both report zero
open P1/P2 findings.

## Implemented evidence worksheet

`guides/latency-evidence-composition-worksheet.md` asks what is needed to
evaluate a proposed claim that a release reduced typical request latency. It:

- labels the dashboard values and scenario as synthetic;
- keeps result, observation, measurement, inference, and claim distinct;
- declares a worksheet-local Context Profile and exact F3 direction;
- records absent comparison design, uncertainty, and confounder control;
- rejects temporal order as causal support;
- declares the bounded graph structurally `complete` while leaving the claim
  `unresolved`;
- projects a loss-aware provisional guide bound to exact source identities.

The new trace and the prior F1 trace both validate and round-trip under
`Composition Query Trace V0`. This is evidence-structure rehearsal, not a real
performance observation or causal finding.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-10
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 140 |
| Numbered records / application guides | 122 / 4 |
| Indexed destinations | 126 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 153 |
| Missing local targets | 0 |
| Context Profiles / prior bindings | 3 / 16 |
| Site identity | `599e7606636c81ed251dbe6f06a0dde2533a9627a8fdb458f80e4a26b73a2ef1` |
| Standalone SHA-256 | `852f07693f29334cad59858d16fcd2381ca39244bfcea0c3b1b2feabd065aa9a` |

The projection has 1,995 valid internal links, zero missing fragments, zero
filesystem-dependent links, and 57 visible repository-source links.

## Search, regression, and browser result

`node tools/check_proof_set_search.js
target/proof-set-sim-10/search-index.json 126` passes the established search
cases and verifies that `latency observation inference` includes the evidence
worksheet exactly once by stable source path. The same check over `sim-09`
retains 125 destinations and the prior systems worksheet behavior.

Microsoft Edge headless inspection covers the new reading page at desktop and
a constrained narrow capture. These are mechanical layout checks only, not
observed accessibility, comprehension, or mobile-usability evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM11-001 | major | A structurally complete trace could be mistaken for a supported causal claim. | Closed: trace state and claim state are adjacent, explicit, and different. |
| SIM11-002 | major | Reusing the F1 worksheet could erase F3 evidence semantics. | Closed: F3 direction, roles, loss, Evaluation, and domain-specific pivots remain explicit. |
| SIM11-003 | major | Synthetic latency numbers could look observed. | Closed: custody is repeated in the scenario, context, result, and boundary language. |
| SIM11-004 | major | Temporal order could be promoted into causation. | Closed: the worksheet rejects that inference and records the missing controls. |
| SIM11-005 | minor | A second guide could disturb prior search and routes. | Closed: exact sim-09 and sim-10 counts and source-path checks pass independently. |
| SIM11-006 | minor | Edition condition lists now require another manual member. | Accepted P3 maintenance debt; no behavior is hidden and a later renderer refactor can centralize edition ordering. |

## Result review

`sim-10` shows that one bounded worksheet grammar can carry two materially
different relation families without making their semantics universal. The
transferable layer is the explicit problem, context, policy, graph, Evaluation,
state, and lossy projection contract. The F1 structural outcome and F3 claim
outcome remain local to their examples.

This does not automate graph expansion, generalize from two fixtures, support a
causal claim, admit `preview-01`, or establish reader success. A next useful
content step is another carefully chosen relation family only if it tests a
new semantic pressure rather than merely increasing example count.
