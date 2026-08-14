# Version Scheme Semantics

Status: candidate Mapping Table

Canonical headword:
[Identity, Naming, Classification, and Versioning](../entries/identity-naming-classification-versioning.md)

Primary family: Mapping Table

Purpose: map generic version roles into Semantic Versioning 2.0.0 without
claiming that SemVer governs every versioned object.

## Mapping

| Generic version role | SemVer representation | Meaning under SemVer | Not established |
|---|---|---|---|
| Versioned subject | package with declared public API | subject whose API changes govern increments | deployment identity, data identity, document edition |
| Breaking compatibility change | `MAJOR` increment | incompatible public-API change | size, importance, or business impact |
| Backward-compatible capability addition | `MINOR` increment | compatible public-API functionality | universal feature maturity |
| Backward-compatible defect correction | `PATCH` increment | compatible bug fix | absence of all risk |
| Unstable candidate | prerelease suffix | lower precedence than associated normal version | production fitness |
| Build distinction | build metadata suffix | ignored for precedence | artifact byte identity or deployment order |
| Ordering | SemVer precedence rules | comparison of core and prerelease identifiers | chronology when versions are published out of order |

## Inputs and exclusions

Required inputs:

- versioned package;
- declared public API;
- previous released version;
- classified API change;
- prerelease/build metadata intent.

Excluded:

- arbitrary document revisions;
- calendar versions;
- database migration compatibility;
- deployment rings;
- content hashes;
- editions whose schemes define different semantics.

## Failure signs

- `MAJOR.MINOR.PATCH` shape is used without SemVer semantics.
- Internal refactoring increments are inferred without the public-API rule.
- Build metadata is used to change precedence.
- A prerelease label is treated as proof of safety or quality.
- SemVer compatibility is assumed to cover runtime, data, operational, or
  business compatibility not included in the public API.

## Sources and provenance

1. Semantic Versioning 2.0.0:
   https://semver.org/spec/v2.0.0.html

Mapping authority: SemVer 2.0.0 for packages that adopt its contract.
Factorium mapping remains `candidate`.

