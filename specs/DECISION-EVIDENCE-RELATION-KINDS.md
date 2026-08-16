# Decision and Evidence Relation Kinds

Status: F28 grammar contract; two kinds have admitted F29/F31 records

## Purpose

Define parser-visible relation kinds for the five reviewed F27 bridge
candidates without admitting any new canonical relation record, changing
canonical closure, or widening the Composition Lab allowlist.

An **accepted kind** has a stable identifier and exact qualifier grammar. An
**admitted relation** is a separately reviewed record in
`reference/factorium-relations-v0.factorium`. Parser acceptance does not imply
that an edge exists, that either endpoint is true, or that traversal is safe.

## Accepted candidate kinds

Qualifier keys are exact and lexically sorted. Values remain lower-kebab
identifiers under the V0 sidecar grammar.

| Kind | Directional reading | Exact qualifier keys | Inverse |
|---|---|---|---|
| `qualifies-evaluation-of` | evidence qualification -> alternative evaluation | `claim`, `horizon`, `limitation`, `outcome`, `population`, `provenance` | none implied |
| `qualifies-outcome-scope-of` | causal scope -> alternative-state outcome | `causal-status`, `contrast`, `horizon`, `outcome`, `population` | none implied |
| `characterizes-consequence-for` | consequence characterization -> alternative-state outcome | `affected-entity`, `consequence-basis`, `control-state`, `horizon`, `scenario` | none implied |
| `contributes-criterion-to` | scoped value sense -> decision criterion | `basis`, `desired-direction`, `horizon`, `owner`, `unit-or-scale`, `value-sense` | none implied |
| `constrains-feasibility-of` | applicable constraint -> alternative feasibility | `applicability`, `authority`, `effective-period`, `hard-or-soft`, `version` | none implied |

These keys preserve the F27 qualifications at type level. They do not contain
local evidence records or authorize discovery of additional endpoints.

## Validation boundary

The parser must:

1. round-trip one positive record of every accepted candidate kind;
2. reject a missing, extra, duplicated, or noncanonically ordered qualifier;
3. reject a reverse-looking or unknown kind rather than infer an inverse;
4. continue requiring all six admitted F1-F6 prototype kinds during canonical
   workspace validation;
5. expose no candidate kind through the canonical relation sidecar until an
   exact record and assurance binding pass fixed-point review.

The positive fixture establishes grammar coverage; its two admitted rows now
match their canonical records exactly. It is not loaded by the Composition
Lab, is not an assurance artifact, and independently supplies no closure,
recommendation, decision-quality, or external-reader evidence.

## Later admission gate

Each additional canonical record needs exact endpoints, an owning view and source
path, a relation-specific negative fixture, loss and cardinality review, an
assurance binding to the changed sidecar digest, closure-budget tests, and a
separate decision about Composition Lab exposure. Kinds may be admitted one
record at a time; acceptance of all five does not require simultaneous edge
admission.
