# Proof Set Book Site Simulation Contract

Status: `sim-12` publication prototype; not canonical interchange, reader
evidence, `preview-01`, or Factorium Workbench

## Purpose

The book site tests whether one selected Factorium edition can support both
direct lookup and a coherent reading sequence without turning a repository
tree or a monolithic HTML export into the product interface.

Canonical Markdown, Factorium Reference Interchange metadata, relation and
assurance sidecars, and their reviews remain authoritative. Every site page is
a disposable generated projection of those sources.

## Page model

| Route | Role | Content authority |
|---|---|---|
| `index.html` | title, problem-led examples, first journey, search, and chapter discovery | generated selection and search metadata |
| `chapters/*.html` | curated book sequence and subsection routes | `VOLUME.md`, the admitted simulation supplement, and guide selection |
| `entries/*.html` | one included Markdown source per page | exact selected source revision |
| `assets/*` | shared presentation and static runtime | reviewed simulation assets |

The simulation generates a source page for every included Markdown document.
Only the selected records and admitted application guides receive indexed
reader pages, previous/next order, and adaptive reading controls. Supporting
sources remain addressable without being promoted into the indexed sequence.

## Navigation contract

- Search results resolve to dedicated entry pages, not monolith fragments.
- Search may narrow by exact record kind and canonical domain; both filters
  compose with text ranking and remain visible in URL state.
- The homepage first journey links five already selected source pages in one
  ordered orientation route.
- The problem-led route links exactly three admitted, trace-bound Composition
  Query worksheets and states each trace/decision outcome without creating an
  interactive query form.
- Each indexed record appears in exactly one chapter route.
- The selected records and guides appear across exactly 12 chapters; source
  `###` headings preserve internal subsection routes.
- Entry breadcrumbs resolve back to the owning chapter.
- Previous and next follow the complete indexed publication sequence.
- Cross-source Markdown links resolve to the generated target page and exact
  rendered fragment when both sources are included.
- Links outside the selected projection resolve to visible repository sources;
  they are not copied into a second authority.
- Quickstart, contents, and search remain reachable from every generated page.

## Reading views and context

Compact, Abbreviated, Book, Full, custom detail/metadata/density controls, and
context-notation preferences use the same reader contract as the standalone
proof. Preferences persist in local browser storage. A per-entry full override
restores suppressed detail and explicit context notation.

Context Profiles decorate only their exact simulation bindings. Profile links
resolve to dedicated supporting-source pages. A chapter or site route does not
silently broaden profile applicability.

## Determinism and validation

The renderer must fail on:

- missing, duplicate, or extra chapter ownership for an indexed record;
- missing, duplicate, or extra chapter-subsection ownership;
- a missing or duplicate first-journey source;
- a missing, duplicate, or extra problem-led Composition Query target;
- colliding source-page names or rendered identifiers;
- stale or incomplete generated chapter, entry, or shared-asset sets;
- a missing local page, asset, or fragment target;
- search, context-binding, task-coverage, or source-selection drift inherited
  from the prior simulations.

The site manifest records every generated page and shared asset by relative
path, byte count, and SHA-256 digest. The sorted file records produce one site
identity. Rendering requires no server and must execute from a local `file:`
URL.

## Accessibility and progressive behavior

Pages use landmark elements, a keyboard skip link, labelled navigation,
visible keyboard focus, responsive layouts, semantic lists, real links, live
search status, and print-specific suppression of navigation controls.
Canonical content remains readable when search JavaScript is unavailable;
adaptive entry enhancement requires JavaScript and must not change source
meaning.

## Deferred work

- observed reader comprehension, findability, or return use;
- production hosting, analytics, accounts, contribution, or editorial tools;
- open-ended Workbench facets, recommendation, and graph construction beyond
  the selected publication's bounded kind and domain filters;
- interactive Composition Query construction, inferred closure, persistence,
  or a form that implies those capabilities;
- public release identity or guarantees about confidential distribution;
- schema promotion of Context Profiles or typed relations.
