# Software Architecture Mechanisms

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Software Module, Service, and Resource](../entries/software-module-service-resource.md)

Canonical senses: `module`, `service`, `resource`

## Mapping identity

| Field | Value |
|---|---|
| Source system | Factorium software module, service, and resource concepts |
| Target systems | Rust; Haskell 2010; OASIS SOA-RM 1.0; HTTP Semantics; Kubernetes |
| Direction | canonical concept to candidate target mechanism |
| Mapping kind | contextual and partial mechanism assignment |
| Cardinality | many-to-many |
| Authority | cited target-system specifications plus candidate Factorium comparison |
| Factorium maturity | `candidate` |

The mapping does not make a source file a module, an endpoint a service, or a
manifest a resource without the target system's governing semantics.

## Architecture mappings

| Source concept | Candidate target mechanisms | Required condition | Not equivalent to |
|---|---|---|---|
| module | Rust module item/tree; Haskell module with imports/exports; package namespace; build target | namespace, declarations, imports/exports, visibility, initialization, and version/build scope are stated | file, directory, package, component, or deployment by default |
| service | OASIS service and service description; HTTP-accessible capability; Kubernetes Service where platform semantics apply; application operation endpoint | provider, consumer, capability, interface, description, policy, reachability, and expected effect are stated | capability, process, endpoint, server, or component alone |
| resource | HTTP target resource; Kubernetes API object; database or cloud managed resource; application aggregate exposed through an API | identifier model, operations, representations, state, lifecycle, owner, and authority are stated | representation, manifest, message, cache entry, object, or service in general |

## Cross-system distinctions

| Target system | Preserved distinction |
|---|---|
| Rust | logical module tree is not identical to source-file layout |
| Haskell | modules control namespace/import/export and are not first-class values |
| OASIS SOA | service provides access to capability and remains distinct from that capability |
| HTTP | resource is the request target; representations reflect resource state; messages transfer interaction |
| Kubernetes | API objects record desired/current state and are managed through the API |

## Change tests

| Change | Required review |
|---|---|
| Source file moves | logical module path, imports, build rules, visibility, and public API |
| Service provider changes | identity, description, authority, reachability, state, and compatibility |
| Endpoint changes | service contract, consumers, discovery, routing, and version policy |
| Resource representation changes | media/schema compatibility, validators, clients, and stored projections |
| Resource owner changes | lifecycle authority, policy, access, finalization, and dependency direction |

## Failure signs

- module boundaries are copied from directories without language semantics;
- a deployment or server is called the service without its capability-access
  contract;
- reachability is treated as authorization or successful effect;
- a JSON document is called the resource it represents;
- desired state, current state, and representation are merged;
- target-system labels are reverse-mapped without version and context.

## Sources and provenance

1. [Software mechanism bridge research](../../docs/research/2026-08-14-software-mechanism-bridge.md)
2. The Rust Reference, "Modules":
   https://doc.rust-lang.org/reference/items/modules.html
3. Haskell 2010 Language Report, Chapter 5:
   https://www.haskell.org/onlinereport/haskell2010/haskellch5.html
4. OASIS SOA-RM 1.0:
   https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html
5. RFC 9110:
   https://www.rfc-editor.org/rfc/rfc9110.html
6. Kubernetes object model:
   https://kubernetes.io/docs/concepts/overview/working-with-objects/

The target systems own exact semantics. Factorium's assignment conditions and
non-equivalences remain `candidate`.
