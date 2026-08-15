# Proof Set Simulation Preflight 03

Status: complete expanded-book rehearsal; not reader evidence or `preview-01`

Date: 2026-08-15

## Plan review

Test whether completed Factor Forge batches F1-F6 fit coherently into the
book-shaped simulation. Derive the selection from canonical paths rather than
hand-maintained counts, curate the delta into connected reading sections, and
fail rendering if a current entry or view is omitted or added accidentally.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Systems, organizations, governance, evidence, control, and software concepts retain separate senses and governing questions. |
| Experimental Methodologist | pass | The result concerns selection, links, and author-inspectable coherence; it reports no reader behavior or effectiveness. |
| Factorization Method Steward | pass | Entries precede their Constraint, Evidence, Diagnostic, or Mapping views, and mechanism mappings do not replace canonical concepts. |
| Evidence & Claims Editor | pass | Current-source expansion is kept distinct from the frozen Sieve evidence baseline and from an admitted preview candidate. |
| Benchmark Numeracy Checker | pass | The 7-entry, 8-view delta is derived from explicit path sets; 78 + 15 = 93 is a projection count, not a quality score. |
| Reference Lexicographer | pass | New anchors separate neighboring terms before the supplement asks readers to use specialized views. |
| Reference Architecture Editor | pass after findings | The supplement is a book projection over one canonical graph, and the renderer rejects missing or extra delta paths. |
| Research Integrity & Provenance | pass | Per-source hashes, current commit, selection checks, output identity, and the non-evidence boundary are recorded. |
| Cross-Paradigm Mapping Auditor | pass | Five new Mapping views remain contextual, many-to-many, scoped, and subordinate to their canonical owners. |
| Mapping Integrity Auditor | pass | Each Mapping view follows its owner and preserves target system, direction, scope, loss, and non-equivalence. |
| Reference Practitioner | defer | Connected routes are inspectable, but usefulness, findability, and comprehension remain unobserved. |

No critical or major review finding remains open on the expanded simulation.

## Exact selection delta

The renderer parses current `entry` and `view` paths from
`reference/factorium-reference-v0.factorium`, subtracts paths linked by the
base volume, and compares the result with links in
`FACTOR-FORGE-SIM-SUPPLEMENT.md`.

| Measure | Result |
|---|---:|
| Current canonical entries | 27 |
| Current specialized views | 39 |
| Entries absent from the base volume path selection | 7 |
| Views absent from the base volume path selection | 8 |
| Missing supplement delta paths | 0 |
| Extra supplement delta paths | 0 |
| Base volume records | 78 |
| Combined current-source simulation records | 93 |

The base selection matches 20 current entry paths and 31 current view paths.
The remaining 27 base records are roots, structural roles, the access-control
composite, and prime entries outside the canonical entry/view delta count.

## Connected supplement structure

| Reading section | Entries | Views | Connection tested |
|---|---:|---:|---|
| Systems and structural integrity | 1 | 1 | selected whole, viewpoint, boundary, environment, interface, dependency, and integrity constraints |
| Organizational assignment and governance | 2 | 2 | duty, authority, answerability, delegation, governance, obligation, compliance, and bounded mechanisms |
| Evidence, monitoring, and response | 1 | 2 | observation-to-inference custody followed by control-loop and governance-control diagnosis |
| Software mechanisms | 3 | 3 | types/values/functions, modules/services/resources, and transactions/messages/contracts before target-specific mappings |
| **Total** | **7** | **8** | exact Factor Forge delta |

Two cross-section routes are explicit in the source graph:

1. system composition -> organization and authority -> governance and
   compliance -> control and response -> claim/evidence custody;
2. system composition -> software module/service/resource -> software
   transaction/message/contract and type/value/function -> scoped mechanism
   mappings.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-02
```

| Measure | Result |
|---|---:|
| Included Markdown sources | 105 |
| Standalone HTML bytes | 832,008 |
| Standalone HTML SHA-256 | `cf6d4cc6ee0912aad79a4c361cd02c0f8d45e9e64b251ee527d1d5aa7b5d6465` |
| Internal fragment links | 1,384 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |
| Repository source links | 18 |

The original `sim-01` renderer remains stable at its recorded identity. The
expanded output is generated separately under `target/proof-set-sim-02`.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM3-001 | major | A hand-curated supplement could silently omit a Factor Forge record or include an unrelated path. | Closed: rendering fails unless supplement links equal the exact canonical entry/view path delta. |
| SIM3-002 | major | Rendering current files under the old volume title could imply that later revisions were reader-tested by Sieve. | Closed: the supplement and review call this a current-source simulation and deny Sieve or preview evidence coverage. |
| SIM3-003 | major | New material could appear as a chronological changelog rather than a book. | Closed: the supplement groups records by reader question and graph route, with canonical entries before specialized views. |
| SIM3-004 | major | Software mappings could let implementation mechanisms define Factorium concepts. | Closed: each software anchor precedes its Mapping view, and the supplement repeats the contextual non-equivalence boundary. |
| SIM3-005 | minor | Five of eight new views are Mapping views, creating a local concentration. | Accepted for this exact delta; mappings span organizational, governance, and three software scopes, while later R5 batches still require reader-question balance. |
| SIM3-006 | minor | Path subtraction does not detect line-level revisions to entries already selected by the base volume. | Accepted and disclosed: this rehearsal tests current-source path coverage, not historical byte equivalence with `sieve-01`. |

## Result review

Factor Forge F1-F6 can be projected as a connected 15-record extension rather
than a loose appendix. The expanded 93-record simulation remains within the
roadmap's 75-125 prototype range and improves non-formula breadth through
Constraint, Evidence, Diagnostic, and Mapping views.

This is an architectural and publication result only. No simulated participant,
task result, timing, quote, preference, accessibility outcome, real application,
or return use has been recorded. The output does not close R4, admit
`preview-01`, or establish public-volume readiness.
