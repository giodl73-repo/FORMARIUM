# Mapping Table Entry Format V0

Status: draft

## Purpose

A Mapping Table describes how a value, identifier, category, structure, or
meaning in one system corresponds to another. It makes direction, domain,
preservation, loss, and version explicit.

## Required structure

### Mapping identity

Declare:

- canonical entry and sense;
- source system;
- target system;
- direction;
- mapping kind;
- cardinality;
- authority and version.

### Mapping kind

| Kind | Meaning |
|---|---|
| Exact identity | Source and target denote the same value under different labels |
| Scale conversion | Multiplicative transformation |
| Affine conversion | Scale plus offset |
| Structural transformation | Fields or parts are reorganized |
| Categorical crosswalk | Categories correspond exactly, broadly, narrowly, or conditionally |
| Encoding | Values map to a representation |
| Approximation | Target intentionally loses precision or detail |
| Partial mapping | Some valid source values have no target |
| Contextual mapping | Result depends on additional context or policy |

### Transformation contract

For each direction, state:

- source and target domains;
- transformation or lookup rule;
- exactness and rounding;
- inverse availability;
- round-trip expectation;
- invalid and unmapped cases;
- context, policy, and version dependencies.

### Preservation and loss

List which properties are:

- preserved exactly;
- preserved approximately;
- normalized;
- merged;
- split;
- discarded;
- introduced by the target system.

### Mapping table

Use rows appropriate to the mapping:

| Source | Target | Condition | Exactness | Inverse | Notes |
|---|---|---|---|---|---|

### Provenance and maturity

Mapping authority and Factorium editorial maturity remain separate. A
standards-defined conversion may have an established mapping while its
Factorium presentation remains a candidate.

## Quality questions

1. Is direction explicit?
2. Are source and target versions named?
3. Is the domain complete or visibly partial?
4. Is the mapping one-to-one, many-to-one, or one-to-many?
5. Is the inverse valid over the same domain?
6. What information is lost or introduced?
7. Does round-trip equality require exact arithmetic?
8. Are normalization and rounding policies visible?
9. Are point values distinguished from intervals or differences?
10. Does the source authority actually own the correspondence?
