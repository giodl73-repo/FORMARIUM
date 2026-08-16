# Proof Set Simulation Preflight 13 - Problem-Led Home

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the proof site present multi-concept composition as a primary reading path
before entry search while preserving book authority and honestly representing
the current static, author-declared capability?

## Plan review

Add a `sim-12` homepage route over the three admitted Composition Query
worksheets. Lead with recognizable decisions, state each trace/local outcome,
and link exact generated reading pages. Keep the method journey, search,
contents, and Quickstart. Label the route as worked examples rather than a
query form, and retain `sim-11` byte-for-byte.

The compact design record is `problem-led-home-design-2026-08-16.md`; the
five-role Factorium fixed point is
`problem-led-home-roles-check-2026-08-16.md`. Both report zero open P1/P2
findings.

## Implemented route

The homepage now orders its main paths as:

1. problem-led reading through three worked Composition Queries;
2. the five-step orientation from root coordinate to applied guide;
3. direct entry and guide search;
4. twelve book chapters.

The three problem cards cover:

| Reader question | Visible state | Exact destination |
|---|---|---|
| Review a system dependency | complete trace; structural review | system dependency worksheet |
| Evaluate a performance claim | complete trace; unresolved claim | latency evidence worksheet |
| Trace an alert to user outcomes | incomplete trace; unresolved decision | alert feedback worksheet |

The hero states that tables remain authoritative. The problem section says the
cards are worked examples, not a live builder, and defers interactive
construction to the Workbench.

## Rendered result

```powershell
.\tools\render_proof_set.ps1 -Edition sim-12
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 141 |
| Numbered records / application guides | 122 / 5 |
| Indexed destinations | 127 |
| Problem-led targets | 3 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 154 |
| Total site files | 159 |
| Local page, asset, and fragment links | 3,112 |
| Missing local targets | 0 |
| Site identity | `8160eaebc2daf60231c33024430e3672b305ee05907927d0a6b3ad6abd05e0f1` |
| Standalone SHA-256 | `4507d45b1d6f88f8c0c97bd29abb7615ec519dc4d87cd504627d16c0dbfe1ff8` |

The standalone projection retains 2,016 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 62 visible repository-source
links.

## Validation and regression result

The renderer resolves all three card sources through the selected page map,
rejects duplicate or absent targets, requires exactly three, and records the
count in `site_checks.problem_led_targets`. Search still indexes 127
destinations and independently resolves every worksheet by stable source path.

The composition stylesheet and homepage route are gated at `sim-12`.
`sim-11` retains site identity
`3bff45515413974abf6dbbf021c1a1ca4df4c811f692b66a8d2189c3b5f88c3e`
and standalone SHA-256
`604ed696c9a5220fd34108b51bea0ff509aa248ba49d04fe9993861ac939739c`.

Microsoft Edge headless inspection covers the complete homepage hierarchy at
desktop and constrained narrow widths. The three-column cards become one
column, navigation wraps, and the boundary note remains adjacent. This is
mechanical layout evidence, not observed findability or comprehension.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM13-001 | major | Entry search still appeared to be Factorium's prime objective. | Closed: recognizable multi-concept problems now precede the method journey and search. |
| SIM13-002 | major | A prominent composition surface could impersonate a live Workbench. | Closed: cards are labelled worked examples and no input or construction control is shown. |
| SIM13-003 | major | Guides could appear to replace canonical tables. | Closed: the hero states table authority and every card links an admitted trace-bound guide. |
| SIM13-004 | major | Card labels could collapse distinct closure and decision states. | Closed: all three outcomes are printed before their question. |
| SIM13-005 | minor | Homepage cross-links could drift from the selected edition. | Closed: exact unique sources and target count fail closed in the renderer. |
| SIM13-006 | minor | New CSS or navigation could disturb the prior edition. | Closed: feature-gated assets and an exact `sim-11` regression preserve its identity. |

## Result review

`sim-12` now expresses the product's intended two complementary modes: begin
with a multi-concept decision and inspect its bounded closure, or directly look
up and read the canonical reference. It materially corrects the deterministic
information hierarchy while leaving the books and tables primary.

It does not accept a new problem, select senses, compute closure, evaluate a
user graph, persist work, recommend a guide, admit `preview-01`, or establish
that readers can find or use the route successfully.
