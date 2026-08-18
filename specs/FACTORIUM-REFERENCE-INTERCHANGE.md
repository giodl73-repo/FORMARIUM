# Factorium Reference Interchange V0

Status: candidate

The current ID-preserving successor is defined in
[`FACTORIUM-REFERENCE-V1-MIGRATION.md`](FACTORIUM-REFERENCE-V1-MIGRATION.md).
This document remains the frozen V0 grammar and compatibility contract.

## Purpose

This specification defines the smallest canonical machine-readable owner for
Factorium reference metadata. Markdown remains the publication form. The
interchange owns stable entry, sense, factor, and view identity plus the
metadata needed to generate catalogs and detect disagreement.

The V0 boundary deliberately excludes full prose, formula payloads, decision
logic, and other family-specific bodies. Those remain in linked Markdown until
their individual contracts are mature enough for typed payload records.

## Canonical hierarchy

```text
entry
  alias*
  sense+
  factor+
view -> entry/sense+ | unresolved headword candidate
```

- An entry owns one stable headword identifier.
- A sense owns one materially different meaning under that entry.
- A factor names one ordered coordinate in the entry's root factorization.
- A view owns one specialized representation and exactly one primary family.
- A view may span several senses when one table intentionally compares them.
- A legacy view without a canonical headword targets an explicit
  `unresolved-...` owner and carries no guessed sense links.

## Identifiers

Entry, sense, factor, view, domain, and unresolved-owner identifiers MUST match:

```text
[a-z][a-z0-9]*(?:-[a-z0-9]+)*
```

Identifiers are compared as exact ASCII bytes. Published identifiers MUST
remain stable. Labels, summaries, aliases, and source paths are metadata, not
identity.

## Grammar

Records use exact ` | ` separators:

```text
factorium-reference-v0
entry <id> | <title> | <domain> | <maturity> | <source-path> | <summary>
alias <text>
sense <id> | <label>
factor <id> | <source phrase>
end-entry
view <id> | <owner> | <sense-id-list-or-dash> | <family> | <title> | <source-path> | <summary>
end-view
end-reference
```

Entry records are sorted by identifier. View records follow all entries and
are sorted by identifier. Aliases are sorted. Sense and factor order is
semantic declaration order and MUST remain stable.

The comma-separated sense list has no spaces. `-` is permitted only when the
owner begins `unresolved-`.

Reserved delimiter bytes MUST NOT occur inside fields.

## Enumerations

Maturity is one of:

- `candidate`
- `supported`
- `established`
- `disputed`
- `deprecated`

Primary family is one of:

- `factor`
- `formula`
- `reference-value`
- `mapping`
- `decision`
- `transition`
- `constraint`
- `procedure`
- `diagnostic`
- `scale`
- `evidence`

Canonical entry records are the Factor Table family owner. Every specialized
view declares one of the remaining applicable families.

## Source contract

Every source path:

- is repository-relative;
- uses `/` separators;
- ends in `.md`;
- contains no `..`;
- resolves inside the workspace.

An entry source MUST:

- begin with its exact `# <title>` heading;
- declare the exact maturity status;
- contain every declared sense identifier;
- contain every declared factor phrase.

A specialized view source MUST:

- begin with its exact `# <title>` heading;
- declare exactly the expected `Primary family: <label>`;
- link its canonical owner entry, or visibly mark an
  `unresolved-candidate` when no owner has been admitted.

## Canonical bytes and identity

Canonical files use:

- UTF-8 without a byte-order mark;
- LF line endings;
- no blank lines;
- no trailing whitespace;
- one final LF.

Parsing followed by serialization MUST reproduce the exact input bytes.
Corpus identity is lowercase SHA-256 over those exact bytes.

## Generated projections

V0 generates:

- `tables/CATALOG.md` from interchange metadata;
- `tables/formulas/INDEX.md` as the Formula Table family catalog;
- `tables/UNRESOLVED.md` from visible unresolved-candidate declarations in
  linked canonical Markdown.

Committed projections MUST exactly equal generated output. Validation fails
closed when a source or projection is missing, stale, or inconsistent.
`tables/INDEX.md` may curate navigation for examples and foundation material,
but MUST NOT copy the canonical anchor or specialized-view catalogs.

## Commands

```powershell
cargo run --quiet -- reference-sync reference\factorium-reference-v0.factorium .
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
cargo run --quiet -- reference-catalog reference\factorium-reference-v0.factorium .
cargo run --quiet -- reference-unresolved reference\factorium-reference-v0.factorium .
```

`reference-sync` is the only command that writes projections.
`reference-check` validates the corpus, linked Markdown, and exact committed
projections without changing files.

## Compatibility boundary

V0 is an internal canonical format, not a claim of ecosystem standardization.
Future JSON, JSON-LD, database, API, or book-build distributions MUST be
generated from this owner or a versioned successor. A successor MUST preserve
published identifiers or declare explicit migrations.

Family-specific executable payloads remain outside V0. The shared core MUST
not erase formula scope, mapping loss, decision priority, transition effects,
or evidence limitations merely to make every family look alike.
