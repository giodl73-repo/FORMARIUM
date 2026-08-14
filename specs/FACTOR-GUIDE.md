# Factor Guide Format V0

Status: candidate

## Purpose

A Factor Guide narrows canonical Factorium entries and views to one bounded
problem. It records why selected factors, alternatives, constraints, and
target mechanisms fit the local evidence.

A guide is not a new canonical entry and does not override source maturity,
definitions, formulas, or mapping authority. It is a traceable recommendation
layer.

## Required identity

Declare:

- guide identifier and title;
- local problem and decision;
- intended reader;
- scope and non-goals;
- maturity and review state;
- canonical entry, sense, view, and mapping identifiers used.

## Local evidence

Record the facts supplied by the problem:

- subject and boundary;
- requested output;
- known values and observations;
- explicit missing and unknown values;
- target environment or mechanism vocabulary;
- expected changes;
- invalid or failure cases;
- external constraints and authorities.

Local facts MUST remain separate from canonical Factorium definitions.

## Narrowing record

For every material alternative, record:

| Alternative | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|

Disposition is one of:

- `selected`
- `retained-option`
- `rejected`
- `not-applicable`
- `unresolved`

A rejected alternative remains visible when it was credible before local
evidence narrowed the choice.

## Role and mechanism assignment

For every selected factor, record:

- canonical factor or entry identifier;
- role in this guide;
- target mechanism or record field;
- mapping condition;
- constraints;
- validation evidence.

Mechanisms are assigned through a Mapping view or explicit local rationale.
They do not redefine the canonical factor role.

## Result

The guide result states:

- selected canonical sense and views;
- recommended factorization or relation;
- target mechanism assignments;
- derived outputs;
- required controls;
- unresolved decisions;
- evidence that would invalidate or revise the guide.

## Change tests

Every guide MUST test:

1. at least one expected local change;
2. at least one invalid or prohibited case;
3. at least one plausible alternative that becomes correct under different
   evidence.

The test asks whether factors, roles, mechanisms, and derived outputs change at
the intended boundaries rather than leaking into unrelated identity.

## Validation

A candidate guide passes when:

- every recommendation traces to canonical entries or visible candidates;
- every local fact has a named source in the guide;
- formulas retain units, basis, and scope;
- mappings retain direction, conditions, and non-equivalence;
- selected and rejected alternatives are explicit;
- derived outputs are not reused as source facts;
- missing information does not silently default to success;
- one domain-appropriate role review reaches fixed point.

Two guides in materially different domains are required before the method
itself can complete R3.
