# Proof Set Simulation Preflight 06

Status: complete adaptive reader-view rehearsal; not reader evidence

Date: 2026-08-15

## Plan review

Turn the searchable proof into a readable reference without forking canonical
content. Define independent content-detail, metadata, and density axes; provide
strong named defaults; retain a complete Full view; and permit one entry to
expand without disrupting the reader's global preference.

The contract is `specs/PROOF-SET-READER-VIEWS.md`.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Profiles alter visibility and spacing only; no profile selects or rewrites a preferred decomposition. |
| Experimental Methodologist | pass | Browser-state and visibility checks prove mechanics only and create no comprehension, preference, or task outcome. |
| Factorization Method Steward | pass | Sense tables, factor structures, selection procedures, constraints, and failure signs remain core Book content. |
| Evidence & Claims Editor | pass | `Readable`, `adaptive`, and `book` describe presentation behavior, not observed reader success. |
| Reference Lexicographer | pass after finding | Unknown headings default to core content, preventing new lexical material from silently disappearing in Book. |
| Reference Architecture Editor | pass after finding | Detail, metadata, and density are independent axes; named profiles are projections rather than four content forks. |
| Research Integrity & Provenance | pass | Full reveals all source/provenance sections and all eleven supporting source documents; the manifest binds all four reader/search assets. |
| Schema Implementer | pass | The renderer emits 106 source bindings and 95 indexed record bindings; the browser transformation preserves stable anchors. |
| Reference Practitioner | defer | The default is visibly calmer and entries can scale locally, but profile comprehension and preference remain unobserved. |

No critical or major review finding remains open on the adaptive reader-view
rehearsal.

## Profile contract

| Profile | Detail | Metadata | Density | Intended reading mode |
|---|---|---|---|---|
| Compact | summary | minimal | tight | orientation scan |
| Abbreviated | core | minimal | tight | fast reference lookup |
| Book | core | essential | comfortable | default reading and application |
| Full | full | full | comfortable | complete source and editorial inspection |

Readers may customize any axis independently. A per-entry `Show full entry`
control reveals one complete record while leaving the global profile intact.
Profile choice is stored locally and can also travel as `?view=`; search keeps
that parameter while updating its own query and family filter.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-05
```

| Measure | Result |
|---|---:|
| Selected numbered records | 93 |
| Application guides | 2 |
| Adaptive record articles | 95 |
| Source bindings | 106 |
| Named profiles | 4 |
| Content levels | 3 |
| Metadata levels | 3 |
| Density levels | 2 |
| Standalone HTML bytes | 1,240,964 |
| Standalone HTML SHA-256 | `da91434eb93bf8566d489f96df8826bc88b1fdc9007cf3cd29e2022cd718b250` |
| Internal fragment links | 1,394 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |

The output is `target/proof-set-sim-05/proof-set-sim-05.html`. The manifest
also binds the emitted search index and four search/reader CSS and JavaScript
assets.

## Browser profile matrix

Microsoft Edge loaded every profile directly from a local `file:` URL. DOM
inspection produced:

| Profile | Active | Record articles | Hidden entry sections | Visible supporting sources | Density |
|---|---:|---:|---:|---:|---|
| Compact | yes | 95 | 592 | 0 | tight |
| Abbreviated | yes | 95 | 200 | 0 | tight |
| Book | yes | 95 | 200 | 0 | comfortable |
| Full | yes | 95 | 0 | 11 | comfortable |

Abbreviated and Book hide the same extended sections by design; Book differs
by retaining essential status metadata and comfortable spacing. A 1440-pixel
visual render confirmed that the Book default shows a restrained search
surface, profile toolbar, readable entry cards, kind/domain badges, essential
status, and core content without the raw supporting-document run.

Mechanical accessibility includes native buttons and selects, pressed-state
exposure, visible labels and focus states, live profile/search status, semantic
articles and sections, a collapsible contents control, stable headings, and
deep-link reveal. This is not assistive-technology or reader evidence.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM6-001 | major | Separate compact and book documents would create divergent content authorities. | Closed: one DOM is projected through visibility rules; profile changes never mutate or regenerate content. |
| SIM6-002 | major | A pleasant default could hide status, limitations, constraints, or failure signs. | Closed: Book retains essential status plus core constraints and failure material; Full remains one click away globally or per entry. |
| SIM6-003 | major | New or unfamiliar headings could disappear because the view classifier does not recognize them. | Closed: unknown headings fail visible as core content. |
| SIM6-004 | major | Search or cross-reference links could land in content hidden by the active profile. | Closed: every entry anchor remains visible and hidden fragment targets are revealed when addressed. |
| SIM6-005 | major | Search updates could erase the selected reading profile. | Closed: search preserves unrelated URL parameters; combined search/view state is browser-tested through the shared static runtime. |
| SIM6-006 | minor | Four presets could obscure the more flexible underlying model. | Closed: advanced controls expose each independent axis and identify unmatched combinations as Custom. |
| SIM6-007 | minor | Full could be interpreted as more authoritative than Book. | Closed in the contract: Full means complete presentation, not stronger semantic authority. |
| SIM6-008 | minor | Persisted preferences could imply an account or tracking system. | Closed: preference remains browser-local; the artifact has no account, telemetry, server, or network dependency. |

## Result review

Factorium now has a concrete flexible-view system rather than one oversized
rendering. The Book profile is a credible default for ordinary reading;
Compact and Abbreviated support scanning and lookup; Full preserves complete
inspection; and custom or per-entry expansion supports readers whose needs do
not fit one preset.

This result establishes publication mechanics and a reviewable design
contract. It does not establish which profile real readers prefer, whether
they understand what was hidden, or whether the design improves task success.
It does not close R4, admit `preview-01`, or replace later reader observation.
