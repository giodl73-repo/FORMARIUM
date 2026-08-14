# Software Module, Service, and Resource

Status: candidate anchor entry

## Orientation

A module groups and scopes software declarations under a language or build
model. A service provides access to capabilities through a prescribed
interface under descriptions, constraints, and policies. A resource is an
identified subject exposed, represented, or managed through a system-specific
interaction and lifecycle model. Modules organize implementation, services
organize access, and resources organize addressed subjects or managed state;
one mechanism may participate in several roles without making them synonyms.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `module` | Which declarations share a namespace, visibility boundary, import/export contract, and compilation or packaging context? | program organization boundary |
| `service` | Which capability is made accessible to consumers through which interface, description, policy, and operational conditions? | capability-access mechanism |
| `resource` | Which identified subject is exposed or managed under which representation, state, operation, and lifecycle semantics? | addressable or managed subject |

## Root factorization

```text
software-architecture-mechanism-use
  := system, platform, and version
   x selected module, service, or resource sense
   x identity, namespace, and addressing
   x owned declarations, capability, or subject
   x public interface and visibility
   x representation and information model
   x dependency, discovery, and reachability
   x state, lifecycle, and ownership
   x policy, authorization, and operational conditions
   x compatibility, observation, and provenance
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Module vs. file | source files often carry module bodies | logical namespace and visibility boundary vs. storage artifact |
| Module vs. package | packages distribute or build collections | declaration/import/export scope vs. release and dependency unit |
| Module vs. component | a module can implement a component | program organization vs. selected part-whole semantics |
| Service vs. capability | a service exposes capability | access mechanism and interaction conditions vs. ability itself |
| Service vs. process | a process may realize a service | accessible offering vs. internal activity flow |
| Service vs. interface | service is accessed through interface | capability-access relationship vs. interaction locus and contract |
| Resource vs. representation | representations describe resource state | identified subject vs. transferable or stored depiction |
| Resource vs. object | objects can be resources | system interaction/lifecycle role vs. language runtime entity |
| Resource vs. service | services may expose resources | accessed capability vs. addressed or managed subject |

## Diagnostic examples

- Rust and Haskell both define modules, but their namespace, export, source,
  and compilation rules are not interchangeable.
- A database can be an internal module dependency, an external service, or a
  managed resource depending on the selected system boundary.
- OASIS distinguishes a capability from the service that provides access to
  it.
- An HTTP resource can have multiple representations; transferring JSON does
  not transfer the resource itself.
- A Kubernetes object records desired and current state for a managed subject;
  its manifest is not the running resource.
- A service may be reachable but unwilling or unauthorized to perform a
  requested action.

## Specialized view

The linked
[Software Architecture Mechanisms](../mappings/software-architecture-mechanisms.md)
maps these concepts into language-module, SOA, HTTP, and Kubernetes mechanisms
while retaining target-system scope.

## Selection procedure

1. Name the software system, platform, version, owner, and viewpoint.
2. Decide whether the question concerns program organization, capability
   access, or an identified managed subject.
3. For a module, record declarations, namespace, imports, exports,
   visibility, initialization, build, and version rules.
4. For a service, record provider, consumer, capability, interface,
   description, policy, reachability, and expected effects.
5. For a resource, record identifier, resource model, representations,
   allowed operations, desired/current state, owner, and lifecycle.
6. Separate source files, packages, deployments, and endpoints from the
   concept they implement.
7. Record dependencies, compatibility, authorization, availability, and
   failure behavior.
8. Test one boundary change, one unavailable dependency, and one stale or
   invalid representation.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines module, service, resource, package, and interface | Separates organization, access, and addressed-subject questions |
| Language reference | Defines module and namespace rules | Connects language-specific organization to broader system roles without universalizing it |
| Architecture standard | Defines service, provider, consumer, description, and policy | Links capability access to boundaries, dependencies, and lifecycle |
| Protocol/platform reference | Defines resources, representations, objects, and operations | Preserves each target system's identifier, state, and interaction model |
| Factorium | Connects all three concepts through contextual Mapping views | Prevents files, endpoints, manifests, and deployments from becoming definitions |

## Constraints and failure signs

- Module semantics are scoped to a language, build, or package system.
- A module is not inferred solely from one file or directory.
- A service states provider, consumer, capability, interface, description,
  constraints, policy, and operational conditions.
- A service is not reduced to a process, endpoint, deployment, or component.
- A resource states its identifier system, operations, representations,
  lifecycle, and authority.
- A resource is not confused with one representation, manifest, cache entry,
  or transport message.
- Ownership and deployment boundaries remain separate from namespace
  boundaries.
- Discovery and reachability do not prove authorization, willingness, or
  successful effect.

## Cross-references

- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Organization, Role, Responsibility, Authority, and Accountability](organization-role-authority.md)
- [Software Type, Value, and Function](software-type-value-function.md)
- [Software Transaction, Message, and Contract](software-transaction-message-contract.md)
- [Factor Role to Mechanism Crosswalk](../mappings/factor-role-mechanisms.md)

## Sources and provenance

1. The Rust Reference, "Modules":
   https://doc.rust-lang.org/reference/items/modules.html
2. Haskell 2010 Language Report, Chapter 5:
   https://www.haskell.org/onlinereport/haskell2010/haskellch5.html
3. OASIS, *Reference Model for Service Oriented Architecture 1.0*:
   https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html
4. RFC 9110, "HTTP Semantics", Sections 3.1-3.4:
   https://www.rfc-editor.org/rfc/rfc9110.html
5. Kubernetes, "Objects In Kubernetes":
   https://kubernetes.io/docs/concepts/overview/working-with-objects/

Comparator access date: 2026-08-14. Module, service, and resource semantics
remain owned by their target systems; Factorium's cross-system organization
remains `candidate`.
