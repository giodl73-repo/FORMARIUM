# Role Frames and Analysis Sets V1

Status: normative

## Purpose

This specification adds two corpus-level contracts above unchanged Semantic
Factor Schema v1 meanings:

1. a role frame maps schema factors into shared filler domains and ordered role
   slots;
2. an analysis-set document maps one surface to one or more complete valid
   meanings.

It preserves repeated participants, repeated role occurrences, and genuine
ambiguity without turning ambiguity into an `unknown` factor value.

## Layering

```text
Semantic Factor Schema v1
  -> complete meanings
  -> role frame
  -> analysis families and surfaces
  -> candidate meaning sets
  -> semantic-first splits
```

The role and analysis contracts do not change schema ordinals, packed aliases,
or meaning identities.

## Terms

| Term | Meaning |
|---|---|
| filler domain | A named closed set whose members have shared identity across mapped factors. |
| role | A semantic relation between a frame and one or more fillers. |
| slot | One ordered occurrence of a role, mapped to exactly one schema factor. |
| frame | The complete domain, role, slot, and constraint mapping for one schema. |
| constraint | A declared restriction on otherwise valid Cartesian assignments. |
| surface | Exact generated text associated with an analysis set. |
| analysis set | The complete duplicate-free set of valid candidate meanings for one surface. |
| analysis family | A split-group containing an ambiguous surface, its candidates, and any disambiguating paraphrases. |

## Filler identity

V1 schema values are scoped to their factors. Equal spelling alone does not
establish cross-factor identity.

A role frame declares shared filler domains:

```text
domain entity
value artist
value child
value robot
value scientist
end-domain
```

Domain identifiers and values use the schema lower-kebab identifier rule.
Domains are declared in ASCII identifier order. Values are also serialized in
ASCII identifier order so domain identity does not depend on the declaration
order of one mapped factor.

Every mapped schema factor MUST have exactly the domain's members, though its
ordinal order may differ. Frame validation compares identifiers, not ordinals.

If `giver=robot` and `recipient-primary=robot` map to domain `entity`, both
slots contain the same filler. They remain distinct bindings because their
roles or slots differ.

## Roles and ordered slots

Roles are declared in ASCII identifier order. Each role contains one or more
slots:

```text
role recipient
slot primary factor recipient-primary domain entity
slot secondary factor recipient-secondary domain entity
end-role
```

Slot identifiers:

- use lower-kebab syntax;
- are unique within the role;
- serialize in declared semantic order, not ASCII order;
- map to exactly one schema factor and one filler domain.

Every role-mapped factor appears in exactly one slot. Slot order is semantic
and changing it creates a new frame version and identity.

A one-occurrence role uses the slot identifier `sole`:

```text
role giver
slot sole factor giver domain entity
end-role
```

Duplicate keys, delimiter-separated fillers, and unordered repeated roles are
invalid.

## Constraints

A V1 schema defines a Cartesian assignment space. A role frame MAY declare
constraints that remove combinations which do not denote admitted meanings.

Wave 2 admits one constraint form:

```text
constraint exactly-one-non-none instrument patient-associated-object
```

Both named factors MUST map to the same domain, and that domain MUST declare
`none`. Exactly one factor must have a value other than `none`.

Constraints:

- serialize after roles in ASCII order of their complete canonical line;
- are part of frame identity;
- are evaluated before corpus, analysis-set, or split construction;
- never silently rewrite an invalid assignment;
- cannot be added after scoring without a new frame version.

Further constraint operators are deferred until a generated fixture requires
them.

## Canonical role-frame text

Canonical role-frame files use UTF-8, LF, one ASCII space, no blank lines or
comments, no trailing whitespace, and a final LF.

```text
factor-role-frame-v1
frame transfer version 1
schema_sha256 HEX64
domain entity
value artist
value child
value robot
value scientist
end-domain
role giver
slot sole factor giver domain entity
end-role
role recipient
slot primary factor recipient-primary domain entity
slot secondary factor recipient-secondary domain entity
end-role
```

Grammar:

```text
frame-file      = frame-header frame-decl schema-id domain-decl+ role-decl+
                  constraint-decl*;
frame-header    = "factor-role-frame-v1" LF;
frame-decl      = "frame " identifier " version " positive-integer LF;
schema-id       = "schema_sha256 " hex64 LF;
domain-decl     = "domain " identifier LF value-decl+ "end-domain" LF;
value-decl      = "value " identifier LF;
role-decl       = "role " identifier LF slot-decl+ "end-role" LF;
slot-decl       = "slot " identifier " factor " identifier " domain "
                  identifier LF;
constraint-decl = "constraint exactly-one-non-none " identifier " "
                  identifier LF;
```

The frame identity is lowercase hexadecimal SHA-256 over exact canonical frame
bytes and is reported as `frame_sha256`.

## Surfaces and analysis sets

An analysis-set document is bound to one role frame and one generated meaning
corpus:

```text
factor-analysis-sets-v1
analysis attachment version 1
frame_sha256 HEX64
corpus_sha256 HEX64
family observer-child-telescope
surface ambiguous
template attachment-ambiguous
text robot sees child with telescope
candidates 2
candidate instrument-telescope
candidate patient-object-telescope
end-surface
surface instrument-reading
template instrument-explicit
text robot uses telescope to see child
candidates 1
candidate instrument-telescope
end-surface
surface patient-object-reading
template patient-object-explicit
text robot sees child carrying telescope
candidates 1
candidate patient-object-telescope
end-surface
end-family
```

### Surface identifiers and text

- Family and surface identifiers use lower-kebab syntax.
- Surface identifiers are unique within the document.
- Template identifiers use lower-kebab syntax.
- Wave 2 canonical text is printable ASCII bytes `0x20..0x7e`.
- Surface text is nonempty, contains no CR or LF, and has no leading, trailing,
  or repeated ASCII spaces.
- Text equality is byte equality after no normalization.

Unicode surfaces require a later escaped or length-delimited contract.

### Candidate sets

- Every candidate references one complete admitted meaning in the bound
  corpus.
- Candidates serialize in ASCII meaning-identifier order.
- Duplicate candidates are invalid.
- `candidates N` exactly matches the following candidate records.
- One candidate is unambiguous.
- Two or more candidates are ambiguous.
- Zero candidates are invalid.
- `unknown` is not inserted merely because candidate count exceeds one.

The semantic target for an ambiguous surface is the complete set, not one
selected candidate.

### Analysis families

Families serialize in ASCII identifier order. Surfaces serialize in declared
semantic order:

1. ambiguous surface, when present;
2. reading-specific or role-specific paraphrases;
3. other declared transfer surfaces.

An ordinary train/test split assigns the whole family to one side. A declared
surface-disambiguation transfer MAY train on reading-specific surfaces and test
the ambiguous surface, but MUST report complete candidate overlap.

Grammar:

```text
analysis-file   = analysis-header analysis-decl frame-id corpus-id family+;
analysis-header = "factor-analysis-sets-v1" LF;
analysis-decl   = "analysis " identifier " version " positive-integer LF;
frame-id        = "frame_sha256 " hex64 LF;
corpus-id       = "corpus_sha256 " hex64 LF;
family          = "family " identifier LF surface+ "end-family" LF;
surface         = "surface " identifier LF
                  "template " identifier LF
                  "text " printable-ascii-text LF
                  "candidates " positive-integer LF
                  candidate+ "end-surface" LF;
candidate       = "candidate " identifier LF;
```

The document identity is lowercase hexadecimal SHA-256 over exact canonical
bytes and is reported as `analysis_sha256`.

## Required validation

A conforming owner rejects:

- unknown frame, schema, corpus, domain, role, slot, factor, surface, family,
  template, or meaning references;
- a factor mapped into two slots;
- a role-mapped factor whose value set differs from its domain;
- duplicate domain values, roles, slots, factors, families, surfaces, or
  candidates;
- noncanonical domain, role, family, or candidate order;
- a repeated role without explicit ordered slots;
- an invalid or outcome-added constraint;
- a candidate meaning that violates frame constraints;
- a candidate count mismatch or empty candidate set;
- an ambiguous surface encoded as one `unknown` meaning;
- ordinary split membership that separates an analysis family;
- noncanonical bytes or content after the final LF.

## Hand-worked repeated-filler example

```text
giver=robot
recipient-primary=child
recipient-secondary=robot
```

The `robot` filler occurs in two bindings:

```text
giver/sole -> robot
recipient/secondary -> robot
```

They share filler identity but not role or slot identity.

## Hand-worked ambiguity example

```text
robot sees child with telescope
```

Candidate A:

```text
instrument=telescope
patient-associated-object=none
```

Candidate B:

```text
instrument=none
patient-associated-object=telescope
```

Both satisfy `exactly-one-non-none`. The surface is ambiguous because both
complete meanings are valid, not because either factor is unknown.

## Boundaries

V1 does not define:

- probabilities or rankings over candidates;
- partial meanings;
- quantifier scope or general underspecification graphs;
- discourse coreference;
- unordered role collections;
- Unicode surface escaping;
- automatic role or factor discovery;
- a universal semantic role inventory.
