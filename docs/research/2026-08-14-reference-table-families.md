# Reference Table Families Research

Date: 2026-08-14

## Research question

What compact reference forms should Factorium support beyond Factor Tables and
Formula Tables, and how can they remain one coherent reference rather than a
collection of unrelated mini-encyclopedias?

Decision supported: define a bounded family of specialized table views and
prototype Mapping Tables with exact temperature-scale conversion.

## Local evidence

- `VISION.md` defines Factorium as a table-first reference for reusable
  structure.
- `specs/FACTOR-TABLE-ENTRY.md` owns sense and factorization views.
- `specs/FORMULA-TABLE-ENTRY.md` demonstrates that a specialized table can
  preserve domain semantics while remaining part of one canonical entry graph.
- `specs/FACTORIUM-ENTRY-GRAPH.md` permits multiple views, typed relationships,
  and generated indices without duplicate authorities.
- `tables/foundations/ROOT-TABLE.md` already distinguishes being, relating,
  changing, governing, and knowing.

## External sources

1. Object Management Group, Decision Model and Notation:
   https://www.omg.org/dmn/
2. W3C, State Chart XML:
   https://www.w3.org/TR/scxml/
3. NIST, "SI Units - Temperature":
   https://www.nist.gov/pml/owm/si-units-temperature
4. NIST, Standard Reference Data:
   https://www.nist.gov/srd

## Findings

### FACTORIUM-RT-01 - Compact tables answer different governing questions

- Sources: OMG DMN; W3C SCXML; NIST temperature conversions.
- Observation: decision tables map conditions to actions, state-machine
  representations map events and guards to transitions, and conversion tables
  map values between measurement systems. These forms are not competing
  layouts for one semantic operation.
- Implication: Factorium should classify table views by governing question
  rather than force every relation into a decomposition or equation.
- Confidence: high.

### FACTORIUM-RT-02 - Specialized views can share one canonical headword

- Sources: `specs/FACTORIUM-ENTRY-GRAPH.md`;
  `specs/FORMULA-TABLE-ENTRY.md`.
- Observation: one concept may need structural, quantitative, decision, and
  mapping views while retaining one entry identity and separated senses.
- Implication: table family is a view kind, not a second headword namespace.
- Confidence: high.

### FACTORIUM-RT-03 - Decision and transition tables have executable semantics

- Sources: OMG DMN; W3C SCXML.
- Observation: DMN decision tables can be validated and executed; SCXML
  defines event selection, transitions, state entry and exit, and
  run-to-completion behavior.
- Implication: executable-looking tables need explicit completeness,
  conflict-resolution, ordering, and side-effect contracts. Factorium must not
  imply executability from appearance alone.
- Confidence: high.

### FACTORIUM-RT-04 - Mappings require more than paired labels

- Source: NIST temperature conversions.
- Observation: temperature point conversions are affine, while temperature
  interval conversions use scale only. Direction, offsets, domains, and
  rounding affect correctness.
- Implication: Mapping Tables must declare source, target, direction,
  transformation kind, exactness, inverse, domain, and loss.
- Confidence: high.

### FACTORIUM-RT-05 - Authoritative values require version and uncertainty

- Source: NIST Standard Reference Data.
- Observation: reference data collections curate scientific and technical
  values with authority and domain custody; values are not timeless labels.
- Implication: Reference Value Tables need source version, conditions, unit,
  uncertainty, and revision ownership.
- Confidence: high.

### FACTORIUM-RT-06 - Eleven families cover the principal lookup questions

- Sources: local root and role tables; external standards above.
- Observation: the recurring questions are structure, quantitative relation,
  known value, translation, choice, change, validity, procedure, diagnosis,
  scale, and evidence.
- Implication: adopt eleven initial families and treat truth, conversion,
  classification, troubleshooting, constants, and similar forms as named
  subtypes.
- Confidence: medium. The taxonomy remains a candidate until tested across the
  pilot corpus.

## Recommendations

### Adopt now

- Define eleven table families as view kinds under canonical entries.
- Specify Mapping Tables first because conversions expose direction,
  exactness, loss, and round-trip concerns.
- Add exact point-temperature conversion as the first mapping pilot.
- Add a Mapping Integrity Auditor.

Owner: Factorium. Validation: complete role review, source validation,
round-trip inspection, and practitioner lookup testing.

### Prototype behind a compatibility boundary

- Executable DMN or state-machine export.
- Generated inverse mappings and conversion tests.
- Reference-value ingestion from standards datasets.
- Cross-family queries such as "show structure, formula, and conversion views
  for this quantity."

Owner: future Factorium schema and Workbench. Validation: typed interchange,
independent parsers, and source-version fixtures.

### Reject or defer

- Turning every familiar document layout into a top-level family.
- Duplicating one concept for each table family.
- Claiming decision or transition tables are executable without a complete
  semantic contract.
- Publishing mapping pairs without direction, domain, or loss.

## Non-goals

- Replacing DMN, SCXML, NIST datasets, or domain standards.
- Becoming a generic collection of arbitrary tables.
- Freezing the eleven-family taxonomy before pilot usability review.

