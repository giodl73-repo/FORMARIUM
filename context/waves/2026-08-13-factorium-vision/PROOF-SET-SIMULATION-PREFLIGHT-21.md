# Proof Set Simulation Preflight 21 - Composition Reader Views

Status: internal simulation complete; no external reader evidence

Date: 2026-08-16

## Question

Can the Composition Lab inherit Factorium's established reading profiles so a
reader can scale explanation and metadata without changing the explicit query,
closure graph, negative states, or source custody?

## Plan review

Add an edition-gated projection to `sim-20`. Reuse Compact, Abbreviated, Book,
and Full plus the existing `factorium-reader-profile` preference. Keep every
input and negative state visible. Let Book lead with human labels, short
relation codes, endpoint routes, and essential context; let Full expose every
exact artifact, qualification, check ID, and digest. Store no query field or
result, compare canonical result bytes and SHA-256 across profile changes, and
retain `sim-19` exactly.

The contract is `specs/COMPOSITION-READER-VIEWS.md`. The compact design review
is `composition-reader-views-design-2026-08-16.md`; the eight-role Factorium
fixed point is `composition-reader-views-roles-check-2026-08-16.md`. Both
report zero open P1/P2 findings.

## Implemented projection

`sim-20` places a Composition view toolbar before the lab:

- Compact: summary detail, minimal metadata, and tight spacing;
- Abbreviated: core explanation, minimal metadata, and tight spacing;
- Book: core explanation, essential metadata, and comfortable spacing;
- Full: full detail, metadata, exact qualifications, and comfortable spacing.

Human concept and scope labels come only from the 18 digest-bound reading
bindings. Relation code, verb, ordered endpoints, and qualifications come only
from the six exact lab relations. Input values and result records remain exact.
The enhancement classifies presentation after the base lab, palette, and
reading route initialize; it does not enter the closure engine.

Book is used with no valid URL or retained preference. A valid `view` query
parameter wins over the stored preference; invalid values fail to Book. The
only stored value is one profile name under the existing reader key. Reload
retains that posture but restores the edition's default inputs and empty
result.

## Verification

```powershell
.\tools\render_proof_set.ps1 -Edition sim-20
node tools\check_composition_lab.js
node tools\check_composition_reading.js
node tools\check_composition_palette.js
node tools\check_composition_views.js
node tools\check_proof_set_composition.js target\proof-set-sim-20\manifest.json target\proof-set-sim-20\index.html
node tools\check_proof_set_composition_lab.js target\proof-set-sim-20
node tools\check_proof_set_composition_reading.js target\proof-set-sim-20
node tools\check_proof_set_composition_focus.js target\proof-set-sim-20
node tools\check_proof_set_composition_palette.js target\proof-set-sim-20
node tools\check_proof_set_composition_views.js target\proof-set-sim-20
node tools\check_proof_set_composition_reading_browser.js target\proof-set-sim-20
```

The pure checker fixes the exact profile vocabulary, axes, precedence,
fallback, short relation presentation, shared preference key, and absence of
network or work-product storage mechanisms. The generated-site checker proves
manifest boundaries, load order, retained exact metadata, zero hidden query
controls, and byte-equivalent canonical result JSON when Compact and Full are
presented around the same request.

The Edge checker starts from a fresh profile and observes Book, four buttons,
essential human routes, folded exact IDs, and comfortable spacing. It records
every form element's tag, type, name, value, checked state, and disabled state;
switches Compact, Full, and Book; and compares each snapshot exactly. After
closure it observes the same 64-hex SHA-256 in all profiles. It verifies Full
reveals exact result custody, storage contains only the profile name, reload
deletes the result and restores default controls, then recreates the same
two-page route and follows the exact factor focus. The Book flow is captured at
`target/sim20-composition-reading.png`; focus is captured at
`target/sim20-composition-reading-focus.png`. This is mechanical and visual
evidence only.

## Rendered result

| Measure | Result |
|---|---:|
| Included Markdown sources | 148 |
| Numbered records / application guides | 122 / 7 |
| Indexed destinations | 129 |
| Composition profiles | 4 |
| Concept groups / controls | 6 / 12 |
| Relation readiness records | 6 |
| Route bindings / factor focuses | 18 / 12 |
| Composition Lab pages | 1 |
| Problem-led / trace targets | 5 / 5 |
| First-journey targets | 5 |
| Chapters / subsections | 12 / 29 |
| Total site pages | 162 |
| Total site files | 171 |
| Local page, asset, and fragment links | 3,558 |
| Missing local targets | 0 |
| Site identity | `1872641e723797541191c3c994311536c142c29d0a360156b47d8e321cba2378` |
| Standalone SHA-256 | `b99c6862f84a1f420ccbd5a5d2941cf63289c79105b2042b039f5167284d7e22` |

The standalone projection retains 2,098 valid internal links, zero missing
fragments, zero filesystem-dependent links, and 71 visible repository-source
links.

## Prior-edition regression

`sim-19` independently retains 147 sources, 129 indexed destinations, 161
pages, six concept groups, zero missing targets, site identity
`866b4d3fa57fd7381c6db940cde4d022a71232b863b398d8d14cfbd72b6c7c4c`,
and standalone SHA-256
`0f11bf038e0080ed52b9ef1686acf9b53a180f010e03bf209b49e80bec53627c`.
The new specification, CSS, JavaScript, contract link, toolbar, copy,
manifest checks, and generated asset are all `sim-20`-gated.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM21-001 | major | A Compose-only profile vocabulary could split the book architecture. | Closed: the exact four existing names, axes, preference key, and Book default are reused. |
| SIM21-002 | major | Hiding a control or negative state would change the apparent query. | Closed: all inputs, selections, readiness, conflicts, frontiers, and unresolved requirements remain visible. |
| SIM21-003 | major | A profile could accidentally enter normalized request or graph identity. | Closed: the engine has no profile input; canonical Compact and Full result JSON compare byte-equivalent. |
| SIM21-004 | major | Human labels could replace canonical artifact identity. | Closed: labels derive from exact bindings while original values, DOM codes, result records, and Full custody remain. |
| SIM21-005 | major | View persistence could silently become query persistence. | Closed: storage inspection finds only one profile name; reload deletes the work product and restores defaults. |
| SIM21-006 | major | Short relation presentation could erase direction or qualification. | Closed: Book shows the ordered human endpoint route; Full retains the raw endpoints and complete qualification. |
| SIM21-007 | minor | Dynamic results could escape profile classification. | Closed: a result observer classifies each new projection once; browser checks exercise post-result switching and reload. |
| SIM21-008 | minor | A polished default could be promoted into usability evidence. | Closed: claims remain deterministic mechanics and visual inspection only. |

## Result review

`sim-20` makes composition and reading feel like one reference system. The
default surface now presents recognizable terms and structural routes first,
while audit custody remains one explicit profile action away. Compact and Full
are genuine projections over the same controls and graph, not alternative
query modes.

This does not establish which profile readers prefer, whether Book is the best
default, faster comprehension, accessibility for a population, better concept
or relation selection, successful real application, or return use. It adds no
semantic search, synonym expansion, sense disambiguation, recommendation,
compatibility evaluation, query persistence, collaboration, publication, or
`preview-01` evidence.
