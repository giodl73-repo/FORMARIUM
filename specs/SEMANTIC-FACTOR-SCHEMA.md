# Semantic Factor Schema v1

Status: **specified**

## Purpose

This specification defines the smallest portable contract for
Factor-Preserving Semantic Encoding:

- a schema declares ordered semantic factors;
- each factor declares ordered values;
- a meaning assigns exactly one value to every factor;
- named product states and ordinary packed fields are exact aliases when they
  use the same ordinals and bit layout.

The contract describes semantic structure. It does not prescribe a machine
learning model, programming language, storage engine, or hardware layout.

## Terms

| Term | Meaning |
|---|---|
| factor | One declared semantic dimension, such as `action` or `polarity`. |
| value | One allowed member of a factor, such as `walk` or `negated`. |
| schema | An ordered collection of uniquely named factors and their values. |
| assignment | One factor/value pair. |
| meaning | One complete, valid assignment for every factor in a schema. |
| surface | Text or another observation associated with a meaning; never the meaning identifier itself. |
| ordinal | Zero-based declaration position of a factor or value. |
| alias | A different representation with exactly the same schema, ordinals, assignments, and payload bits. |

## Identifiers

Schema, factor, value, meaning, role, and template identifiers MUST:

- match `[a-z][a-z0-9]*(?:-[a-z0-9]+)*`;
- be compared as exact ASCII bytes;
- be unique inside their declared scope;
- remain stable after publication.

Display labels and natural-language surfaces may use Unicode. They are not
identifiers and do not determine canonical ordering.

Renaming a published identifier creates a new schema revision. Reordering a
factor or value also creates a new schema revision because ordinals and packed
bits change.

## Schema model

A schema contains:

1. one schema identifier;
2. one positive integer version;
3. one or more factors in canonical declaration order;
4. two or more values per factor in canonical declaration order.

V1 factors are closed categorical dimensions. Every valid value is declared
before meanings are admitted.

Example:

```text
schema navigation version 1
factor action
  value walk
  value jump
  value push
  value pull
end
factor direction
  value left
  value right
end
```

The ordinal of `action` is `0`; the ordinal of `direction` is `1`. Within
`action`, `walk` is `0` and `pull` is `3`.

## Complete meanings

A V1 meaning MUST:

- reference exactly one schema identifier and version;
- have one stable meaning identifier;
- assign every schema factor exactly once;
- use only values declared by that factor;
- serialize assignments in canonical factor order.

These are invalid:

- a missing factor;
- a duplicated factor assignment;
- a value belonging to another factor;
- an undeclared value;
- an assignment order that differs from the schema in canonical output;
- a meaning identifier reused for a different assignment.

Surface forms are attached after the semantic assignment exists. Corpus splits
MUST be computed from meanings or assignments before surface rendering when
surface leakage could reveal split membership.

## Missing and unknown values

Missing and unknown are semantic values only when the schema explicitly
declares them.

```text
factor tense
  value present
  value past
  value unknown
end
```

An omitted `tense` assignment is invalid; it is not silently converted to
`unknown`.

`missing` and `unknown` SHOULD remain distinct when both concepts matter:

- `missing`: the source did not supply a value;
- `unknown`: the source supplied an unresolved or indeterminate value.

Benchmarks MUST report whether special values appear in training, holdout, or
both. They MUST NOT add a special value after observing outcomes without
creating a new schema revision.

## Roles and repeated participants

V1 assigns one value per factor. Repeated keys are invalid.

Semantic roles use distinct factor identifiers:

```text
agent=robot
patient=child
```

Two participants with the same entity value are valid:

```text
agent=robot
patient=robot
```

Two occurrences of one role require declared slots or a later collection
contract:

```text
recipient-primary=child
recipient-secondary=artist
```

The slot order is semantic and MUST be documented. V1 does not treat an
unordered list, repeated key, or delimiter-separated string as a factor value.

## Canonical text interchange

Canonical schema and meaning files use:

- UTF-8 without a byte-order mark;
- LF line endings;
- one ASCII space between tokens;
- no trailing whitespace;
- lowercase identifiers;
- schema declaration order for factors and values;
- schema factor order for assignments;
- a final LF.

Blank lines and comments are not permitted in canonical files. Human-facing
documentation may contain annotated examples, but canonical fixtures may not.

Parsers MAY admit CRLF as a transport form, but MUST normalize it to LF before
validation, canonical serialization, or hashing. A bare carriage return is
invalid, and mixed LF/CRLF transport MUST fail closed. Transport bytes and
canonical bytes are therefore distinct when CRLF is admitted.

The canonical schema identity is lowercase hexadecimal SHA-256 over the exact
canonical declaration bytes from `factor-schema-v1` through the final
`end-factor\n`. A document identity hashes the complete canonical file,
including meanings. Implementations MUST report the digest kind
(`schema_sha256` or `document_sha256`) with its value.

### Grammar

```text
file          = header schema-decl factor-decl+ meaning-decl*
header        = "factor-schema-v1" LF
schema-decl   = "schema " identifier " version " positive-integer LF
factor-decl   = "factor " identifier LF value-decl value-decl+ "end-factor" LF
value-decl    = "value " identifier LF
meaning-decl  = "meaning " identifier LF assignment+ "end-meaning" LF
assignment    = identifier "=" identifier LF
identifier    = lower-kebab-identifier
```

A parser MUST validate semantic constraints in addition to grammar:

- uniqueness;
- complete assignments;
- canonical order;
- declared values;
- representable ordinals;
- no content after the final canonical record except the required final LF.

## Ordinals and packed aliases

For factor `f` with `n` declared values:

```text
width(f) = ceil(log2(n))
```

Each value is encoded by its zero-based declaration ordinal. Unused ordinal
patterns are invalid.

V1 packed layout is:

- factors in schema order;
- the first factor occupies the least-significant available bits;
- each factor uses exactly `width(f)` contiguous bits;
- no alignment padding between factors;
- unused high bits in the final storage unit are zero.

For factors `f0..fk`:

```text
offset(f0) = 0
offset(fi) = sum(width(fj)) for j < i
packed = sum(value_ordinal(fi) << offset(fi))
```

The minimum logical payload is the sum of factor widths. A file or API may use
a larger storage unit, but it MUST report logical payload bits separately from
container bits.

## Named product-state alias

A named product-state representation is an alias of the packed representation
only when:

- it declares the same schema identifier and version;
- factor and value ordinals are identical;
- every coordinate contains the same ordinal bits;
- serialization yields the same packed payload;
- encode and decode accept and reject the same assignments and invalid
  patterns.

Names, wrapper types, coordinate notation, or hardware interpretation do not
create a semantic distinction.

Any benchmark difference between exact aliases is a benchmark defect unless it
measures a separately declared container, API, or execution cost. Such a cost
MUST NOT be attributed to semantic factorization itself.

## Hand-worked navigation example

The canonical fixture is `fixtures/schemas/navigation.factor`.

Its factors and widths are:

| Factor | Values | Width | Offset |
|---|---:|---:|---:|
| `action` | 4 | 2 | 0 |
| `direction` | 2 | 1 | 2 |
| `manner` | 2 | 1 | 3 |
| `count` | 2 | 1 | 4 |
| `polarity` | 2 | 1 | 5 |

For:

```text
action=jump
direction=right
manner=slowly
count=twice
polarity=negated
```

the ordinals are `1,1,0,1,1`, producing:

```text
packed = 1 + (1 << 2) + (0 << 3) + (1 << 4) + (1 << 5)
       = 53
```

The named product state and ordinary six-bit packed field both encode `53`.

## Hand-worked event example

The canonical fixture is `fixtures/schemas/event.factor`.

`agent` and `patient` are separate roles even though they share the same
entity vocabulary. Template identity is retained as a factor only when it is
part of the prediction target; otherwise it belongs to surface metadata and
must not alter the semantic meaning identifier.

## Versioning

A new schema version is required for:

- adding, removing, renaming, or reordering a factor;
- adding, removing, renaming, or reordering a value;
- changing role-slot meaning;
- changing whether missing or unknown is an admitted value;
- changing packed layout.

Adding surfaces, templates, corpus rows, or split memberships does not by
itself change the semantic schema when assignments remain unchanged.

## Boundaries

This specification does not establish:

- that factors are objectively correct or exhaustive;
- that all language meanings are closed categorical products;
- that one canonical factorization exists;
- a complete representation for ambiguous or multi-label surfaces;
- broad systematic generalization;
- model quality, compression, runtime, or hardware advantage;
- novelty over feature structures, attribute-value matrices, semantic roles,
  disentangled representations, or vector-symbolic architectures.
