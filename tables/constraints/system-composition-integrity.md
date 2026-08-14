# System Composition Integrity Constraints

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword:
[System Composition, Capability, Interface, and Dependency](../entries/system-composition-dependency.md)

Canonical senses: `system`, `system-element`, `component`, `capability`,
`boundary`, `environment`, `interface`, `dependency`

## Governing question

Which minimum invariants keep a system-composition view from collapsing
membership, ownership, ability, interaction, and reliance into one undirected
diagram?

## Constraint table

| ID | Applies to | Requirement | Invalid when | Evidence to retain |
|---|---|---|---|---|
| `SC-01` | system | State viewpoint, observer, effective time, and relevant behavior, meaning, or purpose | a collection is labeled a system without its organizing view | model scope and authority |
| `SC-02` | boundary | State the membership rule and crossing treatment | inside/outside is inferred from drawing position alone | boundary decision and rationale |
| `SC-03` | system element | Treat membership as view-relative | membership is assumed universal across operational, ownership, and deployment views | selected view and element identity |
| `SC-04` | component | State part-whole, replacement, and lifecycle semantics | every connected or used element becomes an owned part | composition relation and lifecycle rule |
| `SC-05` | capability | State beneficiary, outcome, conditions, and measure | a component or interface name is presented as an ability | capability claim and evaluation basis |
| `SC-06` | interface | State participants, exchanged items, contract, direction, and failure behavior | a boundary line or adjacency is treated as a complete interface | interface specification and version |
| `SC-07` | dependency | State source, target, required property, condition, consequence, and time scope | reliance direction or failure consequence is missing | dependency assertion and observed basis |
| `SC-08` | environment | Keep external actors and influences outside the selected boundary | an external dependency is silently modeled as an internal component | context model and boundary version |
| `SC-09` | whole behavior | Separate system-level from element-level claims | one element is credited with an emergent result without support | behavior model, observation, or test |
| `SC-10` | revision | Re-evaluate assignments when viewpoint or boundary changes | old component and dependency labels survive a changed model unreviewed | revision and migration record |

## Invalid combination examples

| Combination | Why invalid | Repair |
|---|---|---|
| `connected = component` | connection does not prove part-whole or ownership | state the relation and lifecycle semantics |
| `interface = capability` | a meeting contract does not prove an outcome can be delivered | state capability conditions and supporting elements |
| `outside = irrelevant` | environmental actors can influence or interact across the boundary | model external influence and interface explicitly |
| `dependency(A,B) = dependency(B,A)` | reliance is directional unless both directions are separately supported | record two assertions when mutual |
| `system = components` | relationships, behavior, purpose, and context are omitted | restore the complete selected system view |

## Change tests

| Change | Required review |
|---|---|
| Move an element across the boundary | membership, interfaces, dependencies, ownership, and controls |
| Replace a component | capability support, interface compatibility, lifecycle, and failure behavior |
| Change an interface contract | all dependent subjects and capability claims |
| Change the operating environment | capability conditions, constraints, risks, and external dependencies |
| Change viewpoint | every component, boundary, environment, and dependency assignment |

## Failure signs

- diagrams use unlabeled lines for both composition and dependency;
- every dependency is described as a component;
- capabilities are nouns copied from module or service names;
- interfaces omit version, direction, or failure behavior;
- the same boundary is assumed for ownership, deployment, security, and
  observation;
- environment is reduced to a miscellaneous context box;
- whole-level outcomes have no relationship or interaction explanation.

## Sources and provenance

1. [System composition research](../../docs/research/2026-08-14-system-composition-dependency.md)
2. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
3. NIST CSRC Glossary, "interface":
   https://csrc.nist.gov/glossary/term/interface
4. SEBoK, "Introduction to Systems Engineering Fundamentals":
   https://sebokwiki.org/wiki/Introduction_to_Systems_Engineering_Fundamentals

The constraints are a candidate Factorium synthesis. Domain-specific
architecture, safety, security, and organizational rules remain outside this
general view.
