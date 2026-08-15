# Proof Set Simulation Preflight 07

Status: complete Context Profile inheritance rehearsal; not reader evidence

Date: 2026-08-15

## Plan review

Reduce repeated context boilerplate without inventing universal semantic
defaults. Define a reusable contract that separates fixed defaults,
conventions, required selections, applicability, overrides, and exclusions;
exercise it in mechanics, governance, and software; and render each binding as
an expandable reader chip.

The contract is `specs/CONTEXT-PROFILE.md`. Profiles are auxiliary candidate
contracts, not canonical entries, a new Reference Table family, or a change to
Factorium Reference Interchange V0.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Context is a recurring coordinate, not one universal value or decomposition; each profile has bounded applicability. |
| Experimental Methodologist | pass | Validation establishes binding, inheritance, and rendering mechanics only; it invents no reader behavior or benefit. |
| Factorization Method Steward | pass | Defaults, conventions, requirements, overrides, and exclusions remain distinct structural roles. |
| Evidence & Claims Editor | pass | Profiles remain candidate and no reduction in repetition is promoted as observed usability improvement. |
| Reference Lexicographer | pass after finding | `Reference frame` remains a mechanics-specific qualifier rather than a universal name for jurisdiction, authority system, or runtime context. |
| Reference Architecture Editor | pass after finding | Context Profiles are reusable auxiliary contracts and explicitly do not become a twelfth table family or shadow canonical entry. |
| Research Integrity & Provenance | pass | All three profile documents and the binding manifest are digest-bound; source and revision sections remain visible in Full. |
| Cross-Paradigm Mapping Auditor | pass | Software defaults preserve contextual, versioned, many-to-many mappings and explicit non-equivalence. |
| Domain Source Reviewer | pass at candidate depth; defer promotion | Profiles synthesize already reviewed bounded records; mechanics, governance, legal, and platform specialists remain promotion gates. |
| Schema Implementer | pass for simulation; defer V1 | The renderer rejects unknown profiles, unselected records, duplicate tuples, incomplete contracts, and count drift without changing frozen V0. |
| Reference Practitioner | defer | The chip makes inheritance inspectable, but whether readers understand defaults versus requirements remains unobserved. |

No critical or major review finding remains open on the simulation prototype.

## Profiles and bindings

| Profile | Bound records | Inherited examples | Required local examples |
|---|---:|---|---|
| Newtonian Mechanics | 6 | Newtonian model family, SI presentation, seconds | system boundary, actual frame, axes, directions, path/interactions, exclusions |
| Governed Organization | 4 | bounded-view, effective-date, and provenance conventions | organization, authority source, jurisdiction, obligations, time, review forum |
| Versioned Software System | 6 | contextual mapping, version-sensitive identity, explicit contracts | target, runtime, version, trust boundary, lifecycle, compatibility/failure contract |
| **Total** | **16** | **scoped defaults and conventions** | **no invented result-changing values** |

The Force binding applies only to its `physical-interaction` sense. Other
polysemous or clustered anchors similarly state bounded applicability in the
binding rather than inheriting a profile across unrelated senses.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-06
```

| Measure | Result |
|---|---:|
| Selected records and guides | 95 |
| Included Markdown sources | 109 |
| Context Profiles | 3 |
| Context Profile bindings | 16 |
| Unknown profile IDs | 0 |
| Unselected binding paths | 0 |
| Duplicate binding tuples | 0 |
| Canonical interchange changed | no |
| Standalone HTML bytes | 1,269,283 |
| Standalone HTML SHA-256 | `9104727013639c3dcd52e260769dec79be892981a12c01b20a115094c69f872f` |
| Internal fragment links | 1,412 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |

The output is `target/proof-set-sim-06/proof-set-sim-06.html`. The manifest
binds the three profile sources plus the binding document and context CSS and
JavaScript assets.

## Browser result

Microsoft Edge loaded `sim-06` from a local `file:` URL with Book view and the
`force` search query. It retained the Book profile, returned 28 search matches,
and decorated exactly 16 record articles. All three profile names, inherited-
default labels, and `Still required` labels appeared in the executed DOM.

The runtime rejects a binding whose profile ID is unknown. Each expanded chip
shows applicability, inherited defaults, unresolved required selections, and
a stable link to the full profile source. Following that link reveals the
otherwise suppressed supporting source in the adaptive reader.

This is a mechanical browser and accessibility check, not evidence that a
reader recognizes or correctly applies inheritance.

### Post-review context-notation correction

Reader inspection found that a canonical structural qualifier such as
`agency := actor x capability x authority @ context` still looked like
repeated profile metadata. The correction is presentation-only: Compact,
Abbreviated, and Book fold a trailing `@ context` into an accessible `◌`
context-sensitive marker; Full displays the canonical expression. An advanced
`Context notation` control can override either behavior, and a per-entry
`Show full entry` override restores the explicit qualifier locally. The source
tables, profile resolution, and canonical interchange remain unchanged.

Plan review limited the transformation to inline code with an exact trailing
`@ context`; it does not rewrite prose or an internal context term such as
`event @ context = outcome`. The publication/editorial disposition accepts the
quieter default, the reference-architecture disposition requires Full to
round-trip visibly to the source expression, and the validation disposition
requires a pure parser test plus executed-browser inspection.

The pure JavaScript check passes for Agency, rejects a non-trailing qualifier,
and confirms Book=`folded` and Full=`explicit`. Edge executed the Book view
from a local `file:` URL with `q=agency`; the DOM retained 16 Context Profile
bindings, set `data-reader-qualifiers="folded"`, and rendered Agency as the
base factorization plus the accessible marker. The shared adaptive-reader
asset also changes the regenerated `sim-05` identity to 1,243,373 bytes and
SHA-256 `2efb8cfb2baf5b05ecfbeaaa73de3727e22e5478909f616cc1cf3c4f5f14c0cd`.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM7-001 | major | One global Context default could universalize a domain-specific viewpoint. | Closed: resolution ends in an unresolved requirement; there is no repository-global semantic fallback. |
| SIM7-002 | major | A profile could silently choose a result-changing frame, boundary, jurisdiction, or version. | Closed: these are Required selections, not inherited fixed values, in all three prototypes. |
| SIM7-003 | major | Context Profiles could become shadow canonical entries or a new table family. | Closed: the contract keeps them auxiliary; bindings never rewrite entry meaning or V0 metadata. |
| SIM7-004 | major | Binding paths or profile IDs could drift from the selected book. | Closed: `sim-06` fails on unknown IDs, unselected paths, duplicate tuples, incomplete profile fields, or count drift. |
| SIM7-005 | major | A path-level profile could overreach across unrelated senses. | Closed: every binding carries an applicability statement; Force explicitly limits inheritance to physical interaction. |
| SIM7-006 | major | Compact chips could hide where defaults came from. | Closed: profile sources are included and linked, Full reveals them, and manifests bind their digests. |
| SIM7-007 | minor | Local overrides could silently conflict with inherited scope. | Closed in the V0 contract: local wins only when visible and applicable; a conflicting model or authority system requires a separate profile. |
| SIM7-008 | minor | Repeated operational warnings remain in canonical entries. | Accepted: profiles remove shared boilerplate, not warnings where frame, boundary, or scope changes the result. |

## Result review

Factorium now has a bounded defaulting mechanism that can reduce repetition
without erasing context. The profiles state what a book or domain may safely
inherit and, equally importantly, what the reader must still choose. Mechanics,
governance, and software demonstrate that the pattern generalizes without
calling every qualifier a reference frame.

The result is a candidate publication and architecture prototype. Promotion
into a future canonical sidecar or interchange version requires separate
schema design, migration, domain review, and reader observation. It does not
close R4 or admit `preview-01`.
