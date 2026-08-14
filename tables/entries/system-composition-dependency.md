# System Composition, Capability, Interface, and Dependency

Status: candidate anchor entry

## Orientation

A system is a selected whole whose interacting elements together exhibit
behavior or meaning; engineered and organizational systems are commonly
organized toward one or more purposes. A system element is a member of that
selected whole; a component is an element treated as a constituent under
stated part-whole or assembly semantics; a capability is an ability to
produce an outcome under conditions. A boundary decides inclusion, an
environment remains outside that boundary, an interface owns interaction at a
meeting point, and a dependency records directional reliance. These concepts
cooperate but are not interchangeable.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `system` | Which interacting elements are selected as a whole, and what behavior, meaning, or purpose makes that view useful? | organized whole |
| `system-element` | Which member is included in this selected system view? | boundary-relative member |
| `component` | Which element is treated as a constituent under part-whole or assembly semantics? | composed constituent |
| `capability` | What outcome can the system or element produce, for whom, and under which conditions? | condition-bound ability |
| `boundary` | What is included, excluded, or treated as crossing in this view? | scope and inclusion decision |
| `environment` | Which external actors, systems, and circumstances influence or interact with the system? | outside context |
| `interface` | Where and under what contract do elements meet, interact, or exchange? | interaction locus and contract |
| `dependency` | What does one subject rely on from another, under which condition and consequence? | directional reliance relation |

## Role ladder

```text
purpose and viewpoint
  -- select --> system of interest and boundary

membership rule
  -- includes --> system elements

part-whole and lifecycle semantics
  -- classify some elements as --> components

required outcome and conditions
  -- identify --> capabilities

element or environment interaction
  -- occurs through --> interfaces

required property, service, resource, or condition
  -- creates --> directional dependency
```

## Root factorization

```text
system-composition-use
  := system of interest, behavior, or purpose
   x selected boundary and viewpoint
   x elements and membership rule
   x part-whole and lifecycle semantics
   x capabilities and required conditions
   x interfaces and interaction contracts
   x dependency source, target, and direction
   x environment and external actors
   x behavior, state, and emergent properties
   x authority, provenance, and effective time
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| System vs. collection | both contain selected items | organized interaction and whole-level purpose/behavior vs. mere grouping |
| System element vs. component | both can be inside the boundary | membership in the selected view vs. asserted constituent semantics |
| Component vs. capability | a component may support a capability | what is assembled vs. what outcome can be produced |
| Boundary vs. environment | both define system context | inclusion decision vs. external actors and circumstances |
| Boundary vs. interface | an interface may cross a boundary | scope demarcation vs. interaction locus and contract |
| Interface vs. dependency | interaction can satisfy reliance | how parties meet/exchange vs. why one relies on another |
| Relationship vs. dependency | both connect subjects | general connection vs. directional reliance with consequence |
| Capability vs. behavior | behavior can realize capability | offered ability under conditions vs. observed or modeled activity |

## Diagnostic examples

- A contractor can be a system element in an operational view without being
  an owned organizational component.
- A database is a component of one deployed service view and an external
  dependency in another team's ownership view.
- An HTTP API is an interface; the service's ability to authorize a request is
  a capability.
- A network boundary does not by itself define the semantic contract of every
  interface crossing it.
- A library import records a software dependency only when the relying
  subject, required behavior/version, and failure consequence are stated.
- A subsystem may retain its own identity while acting as a component in a
  larger system.

## Specialized view

The linked
[System Composition Integrity Constraints](../constraints/system-composition-integrity.md)
records the minimum distinctions needed to keep membership, composition,
capability, interaction, and reliance valid.

## Selection procedure

1. Name the system of interest, purpose, observer, and viewpoint.
2. Draw the selected boundary and state the membership rule.
3. List elements without assuming every element is an owned component.
4. State part-whole, assembly, replacement, and lifecycle semantics for each
   claimed component.
5. Describe capabilities as outcomes with beneficiaries, conditions, and
   measures.
6. For each interface, identify participants, interaction locus, exchanged
   items, protocol or contract, direction, and failure behavior.
7. For each dependency, identify relying source, relied-on target, required
   property, condition, consequence, and effective period.
8. Record external actors and environmental influences separately from
   internal elements.
9. Re-evaluate the model when viewpoint, ownership, deployment, or lifecycle
   stage changes.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines system, component, capability, interface, boundary, environment, and dependency | Places nearby senses under distinct governing questions |
| Thesaurus | Links part, element, module, ability, edge, connection, and reliance | Prevents lexical proximity from implying semantic equivalence |
| Encyclopedia or systems standard | Explains systems, emergence, architecture, and lifecycle | Supplies a compact viewpoint, membership, interaction, and reliance contract |
| Architecture or dependency diagram | Shows one selected structure | Requires direction, ownership, conditions, and failure consequences |
| Factorium | Connects canonical senses to roles, constraints, and mechanism mappings | Keeps implementation mechanisms from defining domain concepts |

## Constraints and failure signs

- Every system states viewpoint, boundary, environment, and the behavior,
  meaning, or purpose that makes the selected whole relevant.
- Membership in one view does not prove ownership or lifecycle control.
- Components state their part-whole and replacement semantics.
- Capabilities state beneficiary, outcome, conditions, and evaluation basis.
- Interfaces name participants, exchanged items, contract, and direction.
- Dependencies name source, target, required property, condition, and
  consequence.
- A relationship is not called a dependency merely because two subjects are
  connected.
- An external dependency is not silently drawn inside the system boundary.
- Whole-level behavior is not attributed to one component without evidence.
- Changing viewpoint may change role assignments without changing canonical
  entity identity.

## Cross-references

- [Root Table](../foundations/ROOT-TABLE.md)
- [Factor Role Table](../foundations/FACTOR-ROLES.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Factor Role to Mechanism Crosswalk](../mappings/factor-role-mechanisms.md)
- architecture - `unresolved-candidate`
- subsystem - `unresolved-candidate`
- service - `unresolved-candidate`
- contract - `unresolved-candidate`

## Sources and provenance

1. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
2. NIST CSRC Glossary, "system":
   https://csrc.nist.gov/glossary/term/system
3. NIST CSRC Glossary, "system element":
   https://csrc.nist.gov/glossary/term/system_element
4. NIST CSRC Glossary, "system component":
   https://csrc.nist.gov/glossary/term/system_component
5. NIST CSRC Glossary, "interface":
   https://csrc.nist.gov/glossary/term/interface
6. NIST CSRC Glossary, "operational environment":
   https://csrc.nist.gov/glossary/term/operational_environment
7. SEBoK, "Introduction to Systems Engineering Fundamentals":
   https://sebokwiki.org/wiki/Introduction_to_Systems_Engineering_Fundamentals

Comparator access date: 2026-08-14. Factorium's cross-domain distinctions,
especially the generic dependency contract, remain `candidate`.
