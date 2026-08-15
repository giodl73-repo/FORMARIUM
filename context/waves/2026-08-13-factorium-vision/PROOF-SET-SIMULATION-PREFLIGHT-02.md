# Proof Set Simulation Preflight 02

Status: complete rendering rehearsal; not reader evidence or `preview-01`

Date: 2026-08-15

## Plan review

Close the two artifact-mechanics findings from Simulation Preflight 01 without
waiting for external readers or admitting a release candidate:

- provide a concise self-guided simulation surface;
- render one static proof from the frozen Volume 01 selection;
- bind the output to exact source digests;
- exclude moderator answers and participant observation materials;
- verify that core-book navigation is independent of repository file paths.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Experimental Methodologist | pass | The quickstart requests only artifact notes and forbids invented behavior, completion, timing, preference, or application evidence. |
| Evidence & Claims Editor | pass | Every surface identifies `sim-01` as an internal rendering rather than a preview edition or usability result. |
| Reference Architecture Editor | pass after finding | The rendered projection consumes the volume selection and canonical sources; it does not become canonical authority. |
| Research Integrity & Provenance | pass | The manifest records source commit, dirty state, Pandoc version, per-source hashes, link checks, output bytes, and output hash. Repository links are navigation conveniences rather than custody. |
| Reference Practitioner | defer | Static navigation mechanics are inspectable, but comprehension, accessibility, usefulness, and return use remain unobserved. |

No critical or major review finding remains open on the rehearsal artifacts.

## Deliverables

- `volumes/01-structure-quantity-choice/PROOF-SET-SIM-QUICKSTART.md`
- `volumes/01-structure-quantity-choice/proof-set.css`
- `tools/render_proof_set.ps1`
- generated `target/proof-set-sim-01/proof-set-sim-01.html`
- generated `target/proof-set-sim-01/manifest.json`

Generated output remains under ignored `target/` storage. It is reproducible
from reviewed source surfaces and is not checked in as a second authority.

## Execution record

The first Pandoc pass concatenated the selected content but preserved 487
filesystem-relative Markdown links. That output was rejected. The renderer
now uses file-scoped identifiers, rewrites links between included sources to
internal fragments, redirects excluded reader-testing links to the simulation
quickstart, and sends deeper non-volume provenance links to their repository
source paths. Exact custody remains in the manifest hashes.

Final measured rendering:

| Measure | Result |
|---|---:|
| Included Markdown sources | 89 |
| Standalone HTML bytes | 653,357 |
| Standalone HTML SHA-256 | `1d2fe1d20c1a0b5397eae0296ba9abc702587b18a818fb26ad1ce77257864a40` |
| Internal fragment links | 1,130 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |
| Repository source links | 34 |
| Moderator/evidence files excluded | 4 |

The excluded files are the usability protocol, reader packet, evaluator
rubric, and observation record. The simulation quickstart supplies neutral
rehearsal tasks without evaluator answers.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM2-001 | major | A concatenated HTML file could look standalone while retaining broken repository-relative links. | Closed: the renderer fails on filesystem-dependent links and on any missing internal fragment target. |
| SIM2-002 | major | The proof could leak moderator answers or invite synthetic observations. | Closed: moderator/evidence files are excluded, and the quickstart forbids invented participant measures. |
| SIM2-003 | major | A generated proof could silently become a second editorial authority. | Closed: output remains ignored under `target/`; the manifest binds it to exact sources and labels it disposable. |
| SIM2-004 | major | Building a proof could expand into Workbench scope. | Closed: the implementation is one Pandoc command, one compact stylesheet, and no search, authoring, or application framework. |
| SIM2-005 | minor | Deeper research and provenance pages are outside the standalone core book. | Accepted: 34 convenience links resolve to repository source paths; the manifest, not those links, owns exact source custody. |
| SIM2-006 | minor | CSS can expose structural accommodations but cannot establish accessibility. | Closed as a claim boundary: responsive tables, focus indication, print behavior, and color-scheme support are present; actual access remains unobserved. |

## Result review

Simulation mechanics now cover a self-guided entry surface, deterministic
source selection, static rendering, internal navigation, exact-source custody,
and moderator-material exclusion. This closes SIM-001 and SIM-002 from the
first preflight at the artifact level.

It does not show that anyone can understand or use the proof. No participant,
task outcome, time, quote, preference, real application, accessibility result,
or return use was simulated. External reader work remains deferred, while
Factor Forge and further internal coverage simulations can continue.
