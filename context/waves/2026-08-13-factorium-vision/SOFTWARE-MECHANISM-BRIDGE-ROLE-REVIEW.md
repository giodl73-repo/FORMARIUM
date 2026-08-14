# Software Mechanism Bridge Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-software-mechanism-bridge.md`
- `tables/entries/software-type-value-function.md`
- `tables/entries/software-module-service-resource.md`
- `tables/entries/software-transaction-message-contract.md`
- `tables/mappings/software-program-constructs.md`
- `tables/mappings/software-architecture-mechanisms.md`
- `tables/mappings/software-interaction-mechanisms.md`
- canonical interchange registration and generated projections
- Factor Forge F5 intake record

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Nine concepts retain separate governing questions while three connected clusters expose dependencies and non-equivalences. |
| Experimental Methodologist | pass | F5 makes no empirical performance or usability claim and inherits no reader evidence from the frozen Sieve baseline. |
| Representation Control Auditor | pass after findings | Classes, structs, traits, modules, endpoints, schemas, messages, and manifests receive no semantic credit by representation alone. |
| Data Split & Leakage Auditor | pass | No benchmark split is changed; future compatibility tests must keep versions and expected failures explicit. |
| Factorization Method Steward | pass after findings | Type/value/function, module/service/resource, and transaction/message/contract are connected without false independence or a vocabulary dump. |
| Evidence & Claims Editor | pass | Target-system facts remain source-scoped; the cross-system synthesis is labeled `candidate`. |
| Benchmark Numeracy Checker | pass | Corpus counts and view-family distribution are generated; no unsupported quantitative mechanism claim is introduced. |
| Reference Lexicographer | pass after findings | Class/type, variable/value, method/function, file/module, capability/service, representation/resource, event/message, and schema/contract are separated. |
| Reference Architecture Editor | pass | Three standard-sized anchors and three Mapping views extend one canonical graph and meet the complete editorial contract. |
| Research Integrity & Provenance | pass | Every actionable distinction names a local or authoritative public source, implication, and confidence. |
| Cross-Paradigm Mapping Auditor | pass after findings | Target constructs remain contextual, partial, many-to-many mechanisms with no general reverse mapping. |
| Domain Source Reviewer | pass for candidate | Rust, Haskell, PostgreSQL, OASIS, IETF, Kubernetes, ECMA/Eiffel, and OpenAPI provide bounded software-domain coverage. |
| Equation & Units Auditor | pass | No equation or quantity relation is introduced. |
| Mapping Integrity Auditor | pass after findings | Each Mapping view states source, targets, direction, cardinality, preservation/loss, conditions, change tests, and non-equivalence. |
| Schema Implementer | pass for V0; compatibility pressure retained | V0 preserves entries and views; provider, sender, obligation, and transaction edges remain behind the typed-relation study. |
| Benchmark Consumer | pass | Founding evidence artifacts and interpretations are unchanged. |
| Reference Practitioner | pass for author-detectable structure; defer to readers | Selection and failure signs are explicit, but F5 has not received independent lookup testing. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SWR-001 | critical | `Type` could be defined as an OO class and distort Rust, functional, relational, and primitive types. | Closed: type is value interpretation, operations, construction, and validity under a named target system; class is one mechanism. |
| SWR-002 | critical | Function signatures could be treated as proof of purity, totality, determinism, or behavioral compatibility. | Closed: effects, errors, evaluation, termination, context, and compatibility obligations are mandatory. |
| SWR-003 | major | Module could collapse file, directory, package, component, and deployment boundaries. | Closed: namespace, declarations, imports/exports, visibility, initialization, build, and version scope own selection. |
| SWR-004 | critical | Service could collapse capability, component, process, endpoint, or server. | Closed: service is capability access through an interface and description under constraints, policies, provider/consumer, and operational conditions. |
| SWR-005 | critical | Resource could collapse the subject with a representation, manifest, message, cache entry, or object. | Closed: target-system identifier, operations, representation model, state, lifecycle, owner, and authority are required. |
| SWR-006 | critical | Every transaction could inherit database ACID or distributed atomicity claims. | Closed: commit/abort, visibility, isolation, durability, retry, and compensation are separately declared; labels prove nothing. |
| SWR-007 | critical | Messages could be treated as domain events or successful effects. | Closed: event occurrence, communication envelope, resource, representation, acknowledgment, commit, and business completion remain separate. |
| SWR-008 | critical | A schema, interface, generated client, or document could be treated as the complete contract. | Closed: parties, scope, assumptions, obligations, guarantees, errors, security, operations, and change rules define the contract question. |
| SWR-009 | major | The bridge could become nine disconnected glossary pages. | Closed: three connected anchors share cross-references and each owns one contextual Mapping view. |
| SWR-010 | major | New mappings could be reverse-inferred from target syntax. | Closed: all three views are directional, contextual, partial, many-to-many, and explicitly reject general inverse inference. |
| SWR-011 | major | F5 could add unresolved vocabulary merely to inflate corpus growth. | Closed: it resolves three recurrent declarations, adds no new unresolved candidate, and defers adjacent terms until recurrence or reader demand. |
| SWR-012 | major | F5 relation detail could force an unversioned V0 schema expansion. | Closed: relation payloads remain in Markdown and feed the bounded successor study; V0 identity and round trip remain intact. |
| SWR-013 | major | Later F5 content could be described as tested by The Sieve. | Closed: F5 is explicitly outside commit `817e779` and tag `sieve-01-prototype`; practitioner evidence remains deferred. |

No critical or major finding remains open for candidate publication.
