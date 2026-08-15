# Proof Set Simulation Preflight 05

Status: complete static search-mechanics rehearsal; not reader evidence

Date: 2026-08-15

## Plan review

Test whether the current book projection can become a credible static website
and lookup experience without introducing a backend, an authoring system, or a
second semantic authority. Generate the index from the exact 93-record book
selection plus its two application guides, link every result into the rendered
book, and keep canonical Markdown and reference metadata authoritative.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Search exposes existing plural entries and views; it does not infer or rank one decomposition as canonical. |
| Experimental Methodologist | pass | Checks cover generation, ranking, filtering, browser execution, and target reachability only; they create no reader outcome. |
| Factorization Method Steward | pass | Results open the selected table or guide rather than synthesizing a new factorization. |
| Evidence & Claims Editor | pass | The artifact is described as search-mechanics and website-path evidence, not findability, comprehension, usefulness, or Workbench validation. |
| Benchmark Numeracy Checker | pass | The denominator is explicit: 93 numbered records plus two guides equals 95 indexed destinations. |
| Reference Lexicographer | pass | Title, family or kind, domain, maturity, summaries, and source text support sense-oriented lookup while preserving the underlying entries. |
| Reference Architecture Editor | pass | Selection remains book-owned, canonical metadata remains reference-owned, and search remains a disposable generated projection. |
| Research Integrity & Provenance | pass | The manifest binds all Markdown sources, both search assets, the emitted index, and the standalone HTML by digest. |
| Schema Implementer | pass | Generation fails on selection-count drift, duplicate paths, or missing rendered targets; the browser uses a plain JSON record contract. |
| Reference Practitioner | defer | Plausible queries reach relevant first results, but actual findability and usefulness remain unobserved until real readers exist. |

No critical or major review finding remains open on the static search
rehearsal.

## Architecture boundary

`sim-04` is `sim-03` plus three generated-publication pieces:

1. a 95-record JSON search index;
2. an accessible search and kind-filter shell;
3. a small deterministic client-side ranking script.

The renderer derives the 93 record paths from numbered volume and supplement
selections and derives the two guides from the volume's Applications section.
Canonical entry and view metadata comes from
`reference/factorium-reference-v0.factorium`; supporting roots, roles, primes,
composites, and guides remain typed by their selected source path. Search
results link to existing file-scoped headings in the standalone book.

No search record can add, revise, or override content. There is no server,
database, account, telemetry, AI response, contribution workflow, or Workbench
authoring surface.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-04
```

| Measure | Result |
|---|---:|
| Selected numbered records | 93 |
| Application guides | 2 |
| Indexed destinations | 95 |
| Duplicate selected paths | 0 |
| Missing rendered search targets | 0 |
| Included Markdown sources | 106 |
| Separate search assets | 2 |
| Standalone HTML bytes | 1,210,065 |
| Standalone HTML SHA-256 | `ce25ac1706c3f34fedc221b236c7b34540a5c103620de72bf74e25cfab5e351b` |
| Internal fragment links | 1,394 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |

The output is `target/proof-set-sim-04/proof-set-sim-04.html`; the same
directory contains `search-index.json` and `manifest.json`.

## Search and browser checks

The pure ranking function and generated index produced these leading results:

| Query or filter | Leading result | Check |
|---|---|---|
| `force` | Force | pass |
| `percentage` | Comparative Quantity | pass |
| `authority` | Organization, Role, Responsibility, Authority, and Accountability | pass |
| `contract` | Software Transaction, Message, and Contract | pass |
| kind = `mapping` | eight Mapping results and no other kind | pass |

Microsoft Edge headless loading with `?q=force` rendered 28 matches, put Force
first, and produced an internal link to the Force entry. The shell provides a
visible label for both controls, native search and select inputs, keyboard
focus styles, a polite live result count, and semantic result links. This is a
mechanical accessibility check, not assistive-technology or reader evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM5-001 | major | A hand-maintained search list could drift from the selected book. | Closed: generation parses the numbered volume and supplement selections and fails unless they total exactly 93 plus two guides. |
| SIM5-002 | major | Search could become a shadow authority with rewritten summaries or inferred decompositions. | Closed: canonical summaries come from the reference corpus, other text comes from selected Markdown, and every result opens its source section. |
| SIM5-003 | major | Search results could target missing or filesystem-local pages. | Closed: all 95 anchors are checked against rendered headings; the complete proof has zero missing fragment or filesystem-dependent links. |
| SIM5-004 | major | A static rendering might appear interactive but fail when opened as a local file. | Closed: Edge executed the embedded index and script from `file:` and rendered the expected URL-driven query results. |
| SIM5-005 | minor | Whole-record substring matching returns broad result sets for common terms. | Accepted for simulation: weighted title and summary ranking puts the tested intended records first; relevance tuning requires real query evidence. |
| SIM5-006 | minor | Search raises expectations of the later Workbench. | Closed as scope language: this is a read-only publication projection, while construction, comparison, narrowing, contribution, and publishing workflows remain later milestones. |

## Result review

Factorium is now demonstrably on a path to a website and search experience:
the current book can be generated as one standalone site with deterministic
full-text lookup, family filtering, stable in-book destinations, and a
digest-bound index. The mechanism is small enough to remain downstream of the
reference rather than competing with it.

The result does not show that readers choose good queries, recognize the right
sense, understand the tables, apply them successfully, or return. It does not
close R4, admit `preview-01`, or pull the Factorium Workbench ahead of the
editorial and external-evidence milestones.
