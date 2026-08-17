# Data Structure Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Information, Data, Record, Schema, Signal, and Noise](../entries/information-data-signal-noise.md)

Canonical senses: `semantic-information`, `data`, `record`, `schema`, `field`,
`encoding`

## Governing question

How can semantic record roles map to common data mechanisms without treating
one storage or exchange shape as universal?

## Mapping table

| Semantic role | Candidate mechanisms | Required preservation | Non-equivalence |
|---|---|---|---|
| record | row, document, message, event, object, form | subject/assertion, identity, schema/version, lifecycle, provenance | container equality is not record identity |
| schema | table definition, JSON/XML schema, type, message contract, form definition | authority, names, roles, types, cardinality, constraints, interpretation, evolution | syntax validation is not semantic truth |
| field | column, property, element, slot, attribute | role, type, unit/reference, cardinality, missing/null semantics | same name is not same meaning |
| value | scalar, reference, nested structure, collection | type interpretation, identity/equality, precision, provenance | bytes are not context-free value |
| link | key, URI, pointer, embedded identity, relation row | namespace, target type, cardinality, integrity, time | adjacency is not every semantic relation |

## Mapping procedure

1. Freeze source and target schema identities and versions.
2. Map semantic roles before field names and physical types.
3. Declare transformations, defaults, normalization, dropped distinctions,
   ordering, precision, and invalid-value behavior.
4. Test exact, normalized, and lossy round trips separately.
5. Preserve source record identity/provenance and unresolved mappings.

## Failure signs

- matching field names are assumed equivalent;
- `NULL`, absent, unknown, inapplicable, and redacted collapse;
- nested records flatten without cardinality or ordering semantics;
- schema migration overwrites old interpretation;
- validation success is called factual correctness.

## Sources and provenance

1. W3C, *XML Schema Definition Language 1.1*:
   https://www.w3.org/TR/xmlschema11-1/
2. W3C, *RDF 1.2 Concepts and Abstract Syntax*:
   https://www.w3.org/TR/rdf12-concepts/

Comparator access date: 2026-08-16. Mechanism standards retain their native
scope; this mapping remains `candidate`.
