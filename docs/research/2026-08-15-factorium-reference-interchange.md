# Factorium Reference Interchange Research

Date: 2026-08-15

Status: decision support for R2

## Research question

What is the smallest reproducible interchange contract that can own Factorium
entry, sense, factor, and view identity; preserve family boundaries; expose
unresolved graph debt; and generate navigation without replacing Markdown as
the publication form?

Decision supported: freeze Factorium Reference Interchange V0 and migrate the
R1 anchor and specialized-view metadata into it.

## Local evidence inventory

- `ROADMAP.md`, R2 gate and required schema inputs
- `specs/FACTORIUM-ENTRY-GRAPH.md`, canonical hierarchy and resolution rule
- `specs/REFERENCE-TABLE-FAMILIES.md`, one-primary-family contract
- `specs/FACTOR-TABLE-ENTRY.md`, anchor publication form
- `context/waves/2026-08-13-factorium-vision/R1-EDITORIAL-PILOT-AUDIT.md`,
  measured migration corpus
- `tables/INDEX.md`, hand-maintained duplicate navigation before R2
- `src/lib.rs`, existing fail-closed canonical parser precedent

## Findings

### FACTORIUM-INT-01 - Identity must be independent of file layout

**Source:** `specs/FACTORIUM-ENTRY-GRAPH.md`, sections "Entries, senses, and
views" and "Resolution rule"; W3C, "Cool URIs don't change,"
<https://www.w3.org/Provider/Style/URI>.

**Observed constraint:** The graph contract already separates identity from
display. W3C's persistence guidance likewise distinguishes abstract identity
from the current implementation location.

**Implication:** Entry, sense, factor, and view identifiers are explicit
lowercase stable fields. Repository paths are validated metadata and may
change only through a reviewed migration.

**Confidence:** high.

### FACTORIUM-INT-02 - One source must generate duplicate distributions

**Source:** W3C Data on the Web Best Practices, Best Practice 1,
<https://www.w3.org/TR/dwbp/#metadata>; local `tables/INDEX.md`.

**Observed constraint:** W3C recommends machine-readable metadata and notes
that maintaining multiple formats is best achieved by generating them from one
source. The R1 index copied anchor and view summaries by hand.

**Implication:** The interchange owns catalog metadata. Checked-in Markdown
catalogs are deterministic projections, and validation rejects stale copies.
The curated index stops repeating canonical anchor and view lists.

**Confidence:** high.

### FACTORIUM-INT-03 - Canonical bytes are required for reproducible identity

**Source:** RFC 8785, JSON Canonicalization Scheme,
<https://www.rfc-editor.org/rfc/rfc8785>; `specs/SEMANTIC-FACTOR-SCHEMA.md`.

**Observed constraint:** Cryptographic identity is meaningful only when
serialization is deterministic. Factorium's founding schema already uses
strict line endings, ordering, and final-newline rules.

**Implication:** V0 uses a small ordered line grammar, exact separators, LF
transport, parse/serialize byte equality, and SHA-256 identity. RFC 8785 is
design precedent for canonicalization, not a claim that V0 is JCS.

**Confidence:** high.

### FACTORIUM-INT-04 - The shared core must not flatten family semantics

**Source:** `specs/REFERENCE-TABLE-FAMILIES.md`, shared contract and overlap
rules; `context/waves/2026-08-13-factorium-vision/REFERENCE-TABLE-FAMILIES-ROLE-REVIEW.md`.

**Observed constraint:** Formula, Mapping, Decision, Transition, Evidence, and
other views have different completeness and execution semantics.

**Implication:** V0 owns common metadata and typed family identity only.
Family-specific bodies remain linked Markdown payloads until separately
versioned contracts are ready.

**Confidence:** high.

### FACTORIUM-INT-05 - View ownership can be plural across senses

**Source:** `tables/formulas/amount-concentration-composition.md`,
`tables/formulas/thermal-quantities.md`, and
`specs/FACTORIUM-ENTRY-GRAPH.md`.

**Observed constraint:** One specialized table can intentionally compare
several related senses. Requiring exactly one sense would split coherent
lookup tables or invent an umbrella sense.

**Implication:** A view has one entry owner and one or more explicit sense
owners. Sense order is stable and semantically meaningful.

**Confidence:** high.

### FACTORIUM-INT-06 - Migration must reveal rather than guess missing owners

**Source:** `tables/formulas/arithmetic-mean.md`,
`tables/formulas/newtons-method.md`,
`tables/formulas/pythagorean-trigonometric-identity.md`, and the graph
resolution rule.

**Observed constraint:** Three early Formula pilots predate canonical
headwords and visibly mark their concepts unresolved.

**Implication:** V0 admits an `unresolved-...` owner with no sense links only
when the source visibly declares unresolved candidates. This preserves
editorial meaning and turns the gap into generated debt.

**Confidence:** high.

### FACTORIUM-INT-07 - The R1 corpus is sufficient for a compatibility pilot

**Source:** `context/waves/2026-08-13-factorium-vision/R1-EDITORIAL-PILOT-AUDIT.md`.

**Observed constraint:** The corpus contains 20 anchor entries and 30
specialized views across all eleven primary families.

**Implication:** Migrating the complete anchor/view pilot is a stronger
interchange test than constructing a new toy fixture. Existing Rust unit and
CLI tests provide a smaller isolated conformance layer.

**Confidence:** high.

## Recommendations

### Adopt now

- Freeze `factorium-reference-v0` as the internal canonical metadata owner.
- Preserve stable entry, sense, factor, and view identifiers.
- Validate linked Markdown titles, maturity, factor phrases, family markers,
  and owner links.
- Generate catalogs and unresolved-candidate reports deterministically.
- Make stale generated projections a failing repository check.

Owner: Factorium repository.

Validation: Rust unit tests, CLI integration test, exact round-trip, full
workspace check, generated projection equality, local-link validation, and
role-registry validation.

### Prototype behind a compatibility boundary

- Standard JSON or JSON-LD exports.
- Family-specific typed payloads.
- Database ingestion and query APIs.
- Identifier migration records for a future V1.

Owner: Factorium tooling after R2.

Validation: independent consumer round-trip without editorial field loss.

### Reject or defer

- Making Markdown parsing the canonical identity source.
- Allowing generated indexes to own copied definitions.
- Forcing one sense per multi-sense view.
- Assigning plausible but unreviewed owners to legacy orphan views.
- Standardizing executable formula, decision, transition, or procedure
  semantics in the shared V0 core.

## Non-goals

- no universal ontology claim;
- no replacement of existing table-family specifications;
- no public linked-data standard claim;
- no generated rewrite of editorial prose;
- no resolution of the three inherited orphan headwords during migration.
