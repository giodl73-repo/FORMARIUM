# Factorium Entry Graph V0

Status: draft

## Purpose

Factorium is read as books and tables but maintained as a typed graph. Every
factor named in a canonical factorization resolves to its own canonical entry
or to an explicitly unresolved candidate.

This lets a reader move:

- upward to broader concerns;
- downward to finer decompositions;
- sideways to alternative senses and factorizations;
- into mechanism mappings;
- into concrete examples;
- through every reuse of a factor across the reference.

## Entries, senses, and views

A canonical **entry** owns a stable headword identity.

An entry may contain several **senses**. Each sense represents a materially
different meaning or problem.

A sense may contain several specialized **views**. Every view declares one
primary table-family kind, such as Factor, Formula, Mapping, Decision, or
Transition. Family-specific contracts then define its factors, symbols,
mappings, rules, states, conditions, or other content.

These levels MUST remain separate:

```text
entry
  HAS-SENSE sense
    HAS-VIEW view [primary-view-kind]
      view-specific relationships
```

A Factor Table view with eight factors is not an eight-level hierarchy. Factor
count describes width; recursive decomposition depth describes depth.

A view has exactly one primary table-family kind for navigation and
validation. It MAY link supporting views of other kinds; it MUST NOT claim
several primary kinds merely because one display contains helper equations,
constraints, evidence, or procedures.

## Relative primes and composites

Factorium uses `prime` and `composite` as view-relative roles:

- a **prime** is treated as a reusable leaf for the current view;
- a **composite** is expanded into finer factors in the current view.

Prime does not mean metaphysically or permanently indivisible. An entry may be
a prime in one guide and a composite in another.

Example:

```text
access-control-request
  FACTORS-INTO subject-identity
```

`subject-identity` is a prime in that access-control view, but its own entry may
compare legal identity, account identity, device identity, workload identity,
and contextual principal identity.

## Canonical relationship types

| Relationship | Meaning |
|---|---|
| `HAS-SENSE` | Entry has a materially distinct meaning or problem sense |
| `HAS-VIEW` | Sense has a typed candidate view with one primary table-family kind |
| `FACTORS-INTO` | Composite view references a constituent factor entry |
| `PIVOTS-ON` | View privileges one factor as its organizing identity |
| `CONSTRAINED-BY` | Valid combinations are restricted by another entry or declared rule |
| `DERIVED-FROM` | Value or decision is computed from other factors |
| `CONTEXTUALIZED-BY` | Interpretation varies with a context factor |
| `ALTERNATIVE-TO` | View competes with another view for the same sense |
| `ASSIGNED-TO` | General factor role maps to a domain mechanism |
| `BROADER-THAN` | Entry covers a more general concept |
| `NARROWER-THAN` | Entry specializes another concept |
| `RELATED-TO` | Relevant non-hierarchical relationship |
| `CONTRASTS-WITH` | Difference is important for correct use |
| `CONFUSED-WITH` | Readers commonly collapse distinct concepts |
| `EXAMPLE-OF` | Concrete case illustrates a canonical entry or view |

Textual relationship names are canonical. Symbols are display and search
aliases only.

## Display notation

| Mark | Canonical relationship | Example |
|---|---|---|
| `::` | `HAS-SENSE` | `security :: access-control` |
| `:=` | `FACTORS-INTO` | `request := subject x action x object` |
| `^` | `PIVOTS-ON` | `^ protected-object` |
| `!` | `CONSTRAINED-BY` | `! action allowed-for object-type` |
| `=` | `DERIVED-FROM` | `decision = evaluate(request, policy)` |
| `@` | `CONTEXTUALIZED-BY` | `request @ network-location` |
| `|` | `ALTERNATIVE-TO` | `RBAC | ABAC | ReBAC` |
| `=>` | `ASSIGNED-TO` | `capability => Rust trait` |

The multiplication mark `x` or `×` means “considered as jointly varying
factors in this view.” It does not assert mathematical independence or admit
every Cartesian combination. Constraints remain explicit.

Formula Tables preserve mathematical operators inside their canonical
expressions. In that context, `=`, `x`, `*`, summation, differentiation, and
other marks retain their mathematical meaning and are not graph aliases. See
`specs/FORMULA-TABLE-ENTRY.md`.

## Progressive abstraction

Factorium supports progressive disclosure, but tiers are navigational views,
not universal ontological levels:

| View | Question |
|---|---|
| Field | What broad concern am I investigating? |
| Sense or lens | Which meaning of that concern applies? |
| Composite | What principal factors explain this case? |
| Recursive factor | Which constituent needs further decomposition? |
| Mechanism | How is a factor role represented in this paradigm? |
| Instance | What concrete values occur in this case? |

An entry graph may be a directed acyclic graph for one curated view, but the
whole reference is not required to be a tree. Shared factors can have many
parents, and typed sideways relationships are expected.

## Resolution rule

Every factor, constraint, context, mechanism, or cross-reference in a
published view MUST use one of:

1. a stable canonical Factorium entry identifier;
2. an explicitly external reference with source and version;
3. an `unresolved-candidate` marker scheduled for editorial review.

Matching words are not sufficient to create a relationship. Web search or
software may propose joins, but publication requires a typed reviewed edge.

Early pilot entries MAY declare a file-level `unresolved-candidate` status for
all unlinked factor terms. This is temporary visible debt, not a canonical
join.

## Indices and facets

The graph supports independently generated indices:

- headword and phrase;
- sense and tagline;
- primary table-family view kind;
- domain;
- factor entry;
- prime or composite role within a view;
- pivot;
- structural role;
- relationship type;
- constraint;
- mechanism and paradigm;
- failure pattern;
- maturity;
- source and contributor;
- unresolved candidates.

Example queries:

```text
factor:authorization-policy role:prime domain:security
pivot:protected-object mechanism:rust-trait
relation:FACTORS-INTO contains:request-context
failure:hidden-dependency maturity:supported
view-kind:mapping domain:measurement
```

Indexes are projections of canonical entries and edges. They do not own
duplicate definitions.

## Join workflow

Software may:

1. tokenize entry text and table cells;
2. search Factorium and external references;
3. propose exact, synonymous, broader, narrower, or related matches;
4. show conflicts and unresolved terms;
5. let an editor approve a canonical typed edge;
6. regenerate indices and detect orphaned or cyclic relationships.

The program assists discovery. Editorial review owns the join.
