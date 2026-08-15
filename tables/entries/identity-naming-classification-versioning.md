# Identity, Naming, Classification, and Versioning

Status: candidate anchor entry

## Orientation

Identity concerns what remains the same entity; an identifier is a token used
to refer to it within a namespace; a name is a human-facing label;
classification places it in one or more purpose-specific schemes; a version
identifies a selected state or release under a versioning contract. These
roles often appear in one string but should not be collapsed.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `entity-identity` | What continuity criteria make observations refer to the same entity? | canonical entity boundary |
| `identifier` | Which token refers to the entity within this namespace and authority? | machine- or system-facing reference |
| `name` | Which label helps people recognize or discuss the entity? | human-facing designation |
| `alias` | Which alternate token or label refers to the same entity under stated scope? | secondary reference |
| `classification` | Which class does the entity occupy under this scheme and purpose? | typed membership assertion |
| `version` | Which selected state, revision, edition, or release is identified under this scheme? | change-relative identifier |
| `compatibility-level` | What relation does this version claim to another under a contract? | scheme-derived assessment |

## Role ladder

```text
entity continuity criteria
  -- establish --> identity

namespace and authority
  -- assign --> identifier

audience and language
  -- assign --> name or alias

scheme and criteria
  -- assign --> classification

change boundary and versioning scheme
  -- assign --> version and compatibility claim
```

## Root factorization

```text
identity-version-use
  := entity and continuity criteria
   x identifier token
   x namespace and assigning authority
   x names, aliases, language, and audience
   x classification scheme and criteria
   x versioned subject and release boundary
   x versioning scheme and compatibility contract
   x effective time and lifecycle status
   x redirects, merges, splits, and supersession
   x provenance and confidence
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Identity vs. identifier | identifier refers to identity | entity continuity vs. namespace token |
| Identifier vs. name | both may be strings | scoped reference token vs. human-facing label |
| Name vs. alias | both aid recognition | selected preferred label vs. alternate label |
| Identity vs. classification | classes describe entities | same-entity claim vs. scheme-relative membership |
| Version vs. identity | versions belong to a subject | changed state/release vs. continuity of the versioned entity |
| Version vs. compatibility | version may encode a claim | identifier under scheme vs. relation between releases |

## Diagnostic examples

- Renaming a service need not create a new service identity.
- Reusing a deleted account name can refer to a different entity.
- One book can have a work identity, edition identities, manifestation
  identities, titles, aliases, and classifications.
- One deployment may change operational owner without changing identity.
- `2.0.0` signals incompatible public-API change only when Semantic Versioning
  and a declared public API govern the package.
- Build metadata can distinguish builds without changing SemVer precedence.

## Specialized view

The linked [Version Scheme Mapping](../mappings/version-scheme-semantics.md)
compares generic version roles with Semantic Versioning 2.0.0.

## Selection procedure

1. Select the entity and state the continuity criteria.
2. Name the namespace and assigning authority for every identifier.
3. Separate preferred names, aliases, locators, and opaque identifiers.
4. For classification, declare scheme, class, criteria, purpose, authority,
   effective period, and confidence.
5. For versioning, name the versioned subject and change/release boundary.
6. Declare the versioning scheme and compatibility semantics.
7. Record merges, splits, redirects, supersession, and retirement explicitly.
8. Keep mutable display labels out of immutable identity assumptions.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines identity, identifier, name, class, and version senses | Places continuity, reference, label, membership, and revision roles together |
| Thesaurus | Links identity, name, key, label, type, category, edition, and release | Prevents nearby words from becoming interchangeable |
| Encyclopedia or standard | Explains identifiers, catalogs, metadata, URIs, and version schemes | Supplies a compact authority, scope, time, and change contract |
| Schema or API guide | Specifies keys, fields, and version formats | Distinguishes implementation mechanism from semantic ownership |
| Factorium | Connects identity-bearing factors to mappings, constraints, and failure signs | Keeps aliases and version claims from replacing canonical identity |

## Constraints and failure signs

- Every identifier states namespace and authority.
- Human readability does not prove uniqueness or persistence.
- Names may change without changing identity.
- Identifier reuse is governed and does not silently join different entities.
- Classification membership states scheme, purpose, and effective period.
- A version identifies the subject and scheme it versions.
- Compatibility claims are derived under a declared contract.
- SemVer is not applied without a public API.
- Merges, splits, and supersession are relationships, not renames.

## Cross-references

- [Deployment Identity](../examples/deployment-identity.md)
- [Environment](../examples/environment.md)
- [Identity](../roots/identity.md)
- [Relation](../roots/relation.md)
- [Time](../roots/time.md)
- [Organization, Role, Responsibility, Authority, and Accountability](organization-role-authority.md)
- namespace - `unresolved-candidate`
- Compatibility is owned by the `compatibility-level` sense above.

## Sources and provenance

1. RFC 3986, *Uniform Resource Identifier: Generic Syntax*:
   https://www.rfc-editor.org/rfc/rfc3986
2. Semantic Versioning 2.0.0:
   https://semver.org/spec/v2.0.0.html

Comparator access date: 2026-08-14. Standards remain scoped to their
identifier and versioning domains; Factorium organization remains `candidate`.
