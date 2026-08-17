# System Composition and Architecture Integrity Constraints

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword:
[System Composition, Architecture, Capability, Interface, and Dependency](../entries/system-composition-dependency.md)

Canonical senses: `system`, `system-element`, `component`, `architecture`,
`architecture-description`, `capability`, `boundary`, `environment`,
`interface`, `dependency`

## Governing question

Which minimum invariants keep a system and architecture account from
collapsing entity, description, viewpoint, membership, ownership, ability,
interaction, and reliance into one undirected diagram?

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
| `SC-11` | subsystem role | Name the selected system and its containing-system context separately | nesting creates a new entity identity or makes subsystem a permanent intrinsic type | entity identity, containing view, and role rationale |
| `SC-12` | architecture | Name the entity, environment, stakeholders, concerns, fundamental concepts/properties, material relationships, and organizing principles | a component inventory or fashionable style label is presented as the complete architecture | architecture claim, concern coverage, and decision rationale |
| `SC-13` | architecture description | Separate the entity's architecture from the work product expressing it | a diagram, model repository, or document is called the architecture without qualification | description identity, scope, version, provenance, and represented architecture |
| `SC-14` | viewpoint and view | State which concerns a viewpoint frames and which conventions govern each resulting view/model | one view is treated as complete for every stakeholder and concern | viewpoint specification, view/model identity, and concern correspondence |
| `SC-15` | description consistency | Record correspondences, assumptions, decisions, rationale, omissions, and unresolved inconsistencies across views | conflicting views are silently merged or one is selected without disposition | correspondence, issue, decision, and revision ledger |

## Invalid combination examples

| Combination | Why invalid | Repair |
|---|---|---|
| `connected = component` | connection does not prove part-whole or ownership | state the relation and lifecycle semantics |
| `interface = capability` | a meeting contract does not prove an outcome can be delivered | state capability conditions and supporting elements |
| `outside = irrelevant` | environmental actors can influence or interact across the boundary | model external influence and interface explicitly |
| `dependency(A,B) = dependency(B,A)` | reliance is directional unless both directions are separately supported | record two assertions when mutual |
| `system = components` | relationships, behavior, purpose, and context are omitted | restore the complete selected system view |
| `architecture = diagram` | the entity's organizing concepts/properties are collapsed into one representation | identify the architecture claim, description, viewpoint, view, and known loss |
| `subsystem = intrinsic type` | a contextual containing-system role is mistaken for a permanent entity class | retain system identity and state the containing view separately |
| `view = complete description` | one concern-framed representation is generalized to every concern | add required viewpoints/views or declare the uncovered concerns |

## Change tests

| Change | Required review |
|---|---|
| Move an element across the boundary | membership, interfaces, dependencies, ownership, and controls |
| Replace a component | capability support, interface compatibility, lifecycle, and failure behavior |
| Change an interface contract | all dependent subjects and capability claims |
| Change the operating environment | capability conditions, constraints, risks, and external dependencies |
| Change viewpoint | every component, boundary, environment, and dependency assignment |
| Add or remove a stakeholder concern | viewpoint coverage, views/models, decisions, assumptions, and known omissions |
| Revise one architecture view | cross-view correspondences, consistency, affected decisions, rationale, and description version |
| Move a system under a different containing system | subsystem/component role, boundary, interfaces, dependencies, and retained entity identity |

## Failure signs

- diagrams use unlabeled lines for both composition and dependency;
- every dependency is described as a component;
- capabilities are nouns copied from module or service names;
- interfaces omit version, direction, or failure behavior;
- the same boundary is assumed for ownership, deployment, security, and
  observation;
- environment is reduced to a miscellaneous context box;
- whole-level outcomes have no relationship or interaction explanation.
- architecture is used as a synonym for one diagram, component inventory,
  implementation stack, or named style;
- the architecture description has no entity, scope, version, provenance,
  stakeholder concern, or intended decision;
- viewpoints, views, and model kinds are unnamed or treated as synonyms;
- cross-view inconsistency, assumptions, decisions, rationale, and known
  omissions have no visible disposition;
- subsystem labels survive a changed containing-system view as intrinsic
  entity types.

## Sources and provenance

1. [System composition research](../../docs/research/2026-08-14-system-composition-dependency.md)
2. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
3. NIST CSRC Glossary, "interface":
   https://csrc.nist.gov/glossary/term/interface
4. SEBoK, "Introduction to Systems Engineering Fundamentals":
   https://sebokwiki.org/wiki/Introduction_to_Systems_Engineering_Fundamentals
5. ISO/IEC/IEEE 42010:2022, *Software, systems and enterprise — Architecture
   description*: https://www.iso.org/standard/74393.html
6. NIST CSRC Glossary, "architecture viewpoint":
   https://csrc.nist.gov/glossary/term/architecture_viewpoint
7. ISO/IEC/IEEE 42030:2019, *Software, systems and enterprise — Architecture
   evaluation framework*: https://www.iso.org/standard/73436.html
8. [System architecture and description ownership research](../../docs/research/2026-08-16-system-architecture-description.md)

The constraints are a candidate Factorium synthesis. They do not certify an
architecture, architecture description, evaluation, or conformance result.
Named architecture styles, frameworks, description languages, model kinds,
methods, tools, and domain-specific safety, security, or organizational rules
remain outside this general view.
