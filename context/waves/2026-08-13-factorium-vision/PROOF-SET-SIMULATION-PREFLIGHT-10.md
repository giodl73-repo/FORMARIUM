# Proof Set Simulation Preflight 10 - Composition Worksheet

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can one validated Composition Query trace become a readable worksheet and
loss-aware provisional Factor Guide inside the existing proof-edition website
without introducing inferred graph behavior, a second content authority, or a
Workbench implementation?

## Plan review

Use the committed `Composition Query Trace V0` and F1 dependency/interface
fixture. Supply one synthetic local scenario, completely declare its Context
Profile, expose seed and sense narrowing, render the typed working graph and
Evaluation, then flatten the result under the existing Factor Guide contract.
Add the worksheet as an ordinary Applications source in a new `sim-09` edition.
Preserve sim-08 counts and search behavior as a regression target.

The ten-reviewer `validate-design` record is
`composition-worksheet-design-2026-08-16.md`; the nine-role Factorium fixed
point is `composition-worksheet-roles-check-2026-08-16.md`. Both report zero
open P1/P2 findings.

## Implemented worksheet

`guides/system-dependency-composition-worksheet.md` asks which concepts are
needed to review a report generator that relies on a document service. It:

- separates synthetic local evidence from canonical definitions;
- selects dependency and interface, rejects component and a generic
  relationship, and retains capability and environment as alternatives;
- declares a worksheet-local Context Profile with applicability, exclusions,
  defaults, convention, required selections, overrides, invalidation, and
  custody;
- shows add, multiply, evaluate, and flatten as reader labels beside exact
  typed actions;
- renders three nodes, F1, its predecessor and direction, one Constraint
  Evaluation, zero hidden frontiers/conflicts, and trace-relative `complete`;
- projects factor assignments, controls, rejected shortcuts, unresolved
  choices, change tests, and row-specific loss;
- binds the current reference, relation, and query SHA-256 identities.

The worksheet does not assert that the synthetic architecture works or is
acceptable. Its passed check means only that the declared fields required by
`SC-06` and `SC-07` are present at the worksheet's structural level.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-09
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 139 |
| Numbered records / application guides | 122 / 3 |
| Indexed destinations | 125 |
| Chapters / subsections | 12 / 29 |
| Generated source pages | 139 |
| Total site pages | 152 |
| Shared site assets | 5 |
| Total site files | 157 |
| Local page, asset, and fragment links | 2,913 |
| Missing local targets | 0 |
| Search domains | 13 |
| Context Profiles / prior bindings | 3 / 16 |
| Site identity | `3460f0ed530353baf6749a7eb40a24f94140d1085765ec96a5e57ebb154209bc` |
| Standalone SHA-256 | `2ee1eb7f0b084d9b6d4eebb948ca069b9484815636d69f0b7cf59ed2740778ac` |

Two independent output directories produced the same site identity. The
standalone projection has 1,968 valid internal links, zero missing fragments,
zero filesystem-dependent links, and 53 visible repository-source links.

## Search, regression, and browser result

`node tools/check_proof_set_search.js
target/proof-set-sim-09/search-index.json 125` passes the prior empty, query,
kind, domain, composed-filter, and deterministic-ranking cases, then verifies
that a report-generator dependency search includes the worksheet exactly once
by stable source path.

An independent sim-08 regression still renders 138 sources, 124 search records,
151 pages, twelve chapters, zero missing targets, and passes the historical
124-record search command.

Microsoft Edge headless inspection covers the worksheet at desktop and a
constrained narrow capture. The review repaired long title, breadcrumb, and
inline-ID wrapping and changes the four reader profiles to a two-column narrow
grid. Chromium's headless minimum layout viewport limits the narrow screenshot
from being exact 390-CSS-pixel evidence; the result is a mechanical responsive
inspection, not observed accessibility or mobile usability evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM10-001 | major | A readable worksheet could silently add senses or edges absent from the exact trace. | Closed: sense narrowing is explanatory; the working graph retains exact nodes, F1, direction, scope, and predecessor. |
| SIM10-002 | major | A local context label could act as an undeclared universal profile. | Closed: the worksheet declares the complete local profile contract and denies repository-global authority. |
| SIM10-003 | major | A passed Constraint check or `complete` state could look like architecture approval. | Closed: both are qualified as structural and trace-relative beside the result. |
| SIM10-004 | major | The worksheet could become a special UI island or alternate content store. | Closed: it is an ordinary Markdown guide, search record, Applications member, source page, and manifest source. |
| SIM10-005 | major | Adding a guide could silently break previous edition counts and routes. | Closed: sim-09 expects three guides; sim-08 independently retains two and passes its 124-record regression. |
| SIM10-006 | minor | Long title and trace IDs pressured narrow layouts. | Closed: shared site CSS wraps page-local identifiers and uses a two-column profile grid. |
| SIM10-007 | minor | Search terms may legitimately return more than the worksheet. | Closed: the check asserts exact worksheet path inclusion once rather than an artificially exclusive result set. |

## Result review

`sim-09` demonstrates the intended reader path from problem to explicit seeds,
bounded graph closure, declared Evaluation, and a traceable flattened guide.
It remains static publication mechanics over an author-declared synthetic
trace. It does not automate closure, infer compatibility, persist user work,
admit `preview-01`, close The Sieve, or establish reader success.

The next internal product question is whether a small set of materially
different valid traces can share this worksheet grammar without forcing one
systems example into a universal template. Any automated construction remains
R6 Workbench scope.
