# Factorium Reference Sidecars V0 Prototype

Status: bounded prototype

## Purpose

These sidecars test typed directed relations and digest-bound role-review
coverage without changing `factorium-reference-v0`, its canonical bytes, or
its published identifiers. They are scaling fixtures, not a V1 migration and
not a full-corpus graph.

## Relation grammar

```text
factorium-relations-v0
relation <id> | <kind> | <source> | <target> | <scope> | <qualifiers> | <source-path>
end-relations
```

Records are strictly sorted by relation ID. Source, target, and scope use
qualified canonical references:

- `entry:<entry-id>`;
- `sense:<entry-id>/<sense-id>`;
- `factor:<entry-id>/<factor-id>`;
- `view:<view-id>`.

The prototype kinds and exact required qualifiers are:

| Kind | Required qualifier keys |
|---|---|
| `depends-on` | `condition` |
| `delegates-authority-to` | `authority`, `retained-responsibility` |
| `derived-from` | `method` |
| `feeds` | `condition` |
| `provides-to` | `target-system` |
| `satisfies-obligation` | `applicability`, `obligation-version` |

The parser recognizes five Decision and Evidence kinds from F28. F29 admits
one `qualifies-evaluation-of` record; the other four have no canonical record.
None is required merely because its grammar is supported:

| Decision/evidence kind | Exact required qualifier keys |
|---|---|
| `characterizes-consequence-for` | `affected-entity`, `consequence-basis`, `control-state`, `horizon`, `scenario` |
| `constrains-feasibility-of` | `applicability`, `authority`, `effective-period`, `hard-or-soft`, `version` |
| `contributes-criterion-to` | `basis`, `desired-direction`, `horizon`, `owner`, `unit-or-scale`, `value-sense` |
| `qualifies-evaluation-of` | `claim`, `horizon`, `limitation`, `outcome`, `population`, `provenance` |
| `qualifies-outcome-scope-of` | `causal-status`, `contrast`, `horizon`, `outcome`, `population` |

Parser recognition supplies no edge, inverse, closure permission, or
assurance. See `specs/DECISION-EVIDENCE-RELATION-KINDS.md`.

Qualifiers are lower-kebab `key=value` pairs in key order. Each relation kind
owns its qualifier contract; the fields do not acquire universal semantics
across kinds.

## Assurance grammar

```text
factorium-assurance-v0
review <artifact> | <source-sha256> | <review-path> | fixed-point | <date>
end-assurance
```

Review artifacts are `entry:<id>`, `view:<id>`, or `relation:<id>`. Records are
strictly sorted by artifact reference. The exact lowercase SHA-256 binds the
review to source bytes. A changed digest means review is stale; it does not by
itself mean the edited content is wrong.

Validation fails when:

- syntax or ordering is noncanonical;
- an artifact reference does not resolve through V0;
- a relation source path or review path is missing;
- a relation kind lacks its exact qualifier contract;
- any V0 entry, V0 view, or admitted relation has no assurance binding;
- source bytes no longer match the reviewed digest;
- the review record does not declare fixed-point closure.

## Prototype coverage

`reference/factorium-relations-v0.factorium` contains one representative edge
template from each Factor Forge F1-F6 batch plus the first reviewed
cross-entry evidence-to-evaluation edge. Relation coverage therefore remains
a bounded seven-record prototype.

The assurance manifest has complete current-corpus coverage: 40 entries, 57
specialized views, and seven relation records, for 104 exact bindings. The
validator derives that required set from parsed V0 and relation records, so a
new canonical artifact fails until an applicable digest-bound fixed-point
review is added. This closes current-corpus review coverage; it does not prove
full-corpus typed-relation coverage.

## Command

```powershell
cargo run --quiet -- reference-sidecar-check `
  reference\factorium-reference-v0.factorium `
  reference\factorium-relations-v0.factorium `
  reference\factorium-assurance-v0.factorium `
  .
```

The command validates V0 and its generated projections before validating both
sidecars. A future V1 decision requires broader fixtures, fixed-point review,
and an explicit ID-preserving migration contract.
