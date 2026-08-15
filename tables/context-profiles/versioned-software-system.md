# Versioned Software System Context Profile

Profile ID: `versioned-software-system-v0`

Status: candidate

Summary: Shared software-mechanism comparison conventions for one declared target system while platform, version, trust boundary, lifecycle state, and compatibility contract remain required local choices.

Defaults: `mechanism-mapping = contextual and many-to-many`; `identity = version-sensitive`; `contract-status = explicit`

Requires: `target system`; `platform or runtime`; `version`; `trust boundary`; `lifecycle state`; `compatibility and failure contract`

## Applicability

Use this profile for explicitly bound software type, module, service,
transaction, message, contract, and mechanism-mapping records. It supports
comparison across languages, databases, protocols, platforms, and API
descriptions without claiming equivalence.

## Fixed defaults and conventions

| Field | Inherited value | Kind | Authority boundary |
|---|---|---|---|
| Mechanism mapping | contextual and many-to-many | fixed structural convention | mappings do not redefine canonical concepts |
| Identity | version-sensitive | convention | the actual version remains required |
| Contract status | explicit assumptions, obligations, guarantees, and failures | convention | the actual contract remains required |
| Completion | stage-specific | convention | receipt, acknowledgment, commit, and effect remain distinct |

## Required selections

| Selection | Why no profile-wide value is safe |
|---|---|
| Target system | The same term maps differently across languages, databases, protocols, and platforms |
| Platform or runtime | Available mechanisms and guarantees depend on the execution environment |
| Version | Types, schemas, APIs, and behavior evolve independently |
| Trust boundary | Validation, authorization, and failure ownership change across boundaries |
| Lifecycle state | Declared, deployed, active, deprecated, and retired artifacts differ |
| Compatibility and failure contract | Syntax compatibility does not imply behavioral compatibility or completion |

## Overrides and conflicts

Local entries and guides may bind a concrete language, protocol, platform, or
version. Overrides must preserve the target-system name and version and state
loss or non-equivalence. Conflicting platform guarantees require separate
bindings rather than one blended default.

## Sources and provenance

- Rust Reference and Haskell Report for language mechanisms.
- PostgreSQL documentation for database mechanisms.
- HTTP Semantics, OpenAPI, Kubernetes, and OASIS SOA sources for interaction
  and architecture mechanisms.

Profile revision: V0 simulation candidate, 2026-08-15. Platform-specific
practitioner review remains a promotion gate.
