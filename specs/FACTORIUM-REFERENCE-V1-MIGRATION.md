# Factorium Reference V1 Migration

Status: candidate ID-preserving successor

## Purpose

V1 promotes the admitted Meaning/Reference/Interpretation/Use anchor and two
Claim-and-Evidence views into the current machine-readable owner. It preserves
the V0 record grammar and every V0 identity while giving the current corpus a
new canonical byte identity.

## Grammar delta

The only grammar change is the document header:

```text
factorium-reference-v1
```

Entry, alias, sense, factor, view, terminator, ordering, field, path, maturity,
family, canonical-byte, and SHA-256 rules remain those of
`FACTORIUM-REFERENCE-INTERCHANGE.md`.

The matching assurance header is `factorium-assurance-v1`. Its binding grammar
is unchanged. V1 reuses the eleven-record `factorium-relations-v0` sidecar and
adds no edge or relation kind.

## Migration invariants

1. Every V0 entry and view block appears unchanged and in the same semantic
   order inside V1.
2. Published V0 entry, sense, factor, and view IDs remain stable.
3. V1 adds exactly one entry, seven senses, eleven factors, and two views.
4. The two views are owned by `claim-evidence` and add no sense.
5. All 151 V1 entries/views plus eleven relations have exact fixed-point
   assurance bindings.
6. V0 manifests and V0-bound Composition Query traces remain immutable.
7. Live generated projections name V1 as their source.

## Counts

| Record | V0 | V1 | Delta |
|---|---:|---:|---:|
| entries | 53 | 54 | +1 |
| senses | 412 | 419 | +7 |
| factors | 627 | 638 | +11 |
| views | 95 | 97 | +2 |
| relations | 11 | 11 | 0 |
| assurance bindings | 159 | 162 | +3 |

## Projection and evidence boundary

`tables/CATALOG.md`, `tables/formulas/INDEX.md`, and `tables/UNRESOLVED.md`
are current projections and therefore move to V1. V0 remains independently
parseable and sidecar-valid, but its historical generated catalog is recoverable
through Git rather than duplicated as a second live authority.

`sim-49` is the first book/search/site projection over V1. It establishes
deterministic inclusion and mechanics only—not reader findability,
comprehension, community endorsement, permission, or publication readiness.
