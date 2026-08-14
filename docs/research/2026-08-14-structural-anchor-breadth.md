# Structural Anchor Breadth Research

Status: candidate research basis

## Research question

Can Factorium's entry architecture clarify three non-scientific concept
clusters—identity and versioning, state and lifecycle, and policy and
decision—while also exercising Mapping, Transition, Decision, and Constraint
table families?

Decision supported: whether the R1 editorial pilot has enough structural
breadth to test the encyclopedia beyond physical and quantitative concepts.

## Local evidence

- `tables/examples/deployment-identity.md` shows that names project identity
  factors but should not own them.
- `tables/examples/data-retention.md` derives an obligation from facts and a
  policy version rather than treating the result as an independent factor.
- `tables/foundations/FACTOR-ROLES.md` separates state, policy, constraint,
  relationship, and derived-view roles.
- `specs/REFERENCE-TABLE-FAMILIES.md` distinguishes Mapping, Decision,
  Transition, and Constraint reader questions.
- `specs/FACTORIUM-ENTRY-GRAPH.md` requires stable canonical identity and
  visible typed relationships.

## Findings

### FACTORIUM-SAB-01 - Identity, identifier, and name are different roles

Source:

- RFC 3986, *Uniform Resource Identifier: Generic Syntax*:
  https://www.rfc-editor.org/rfc/rfc3986
- `tables/examples/deployment-identity.md`

Observed constraint: a URI identifies a resource through a scheme-governed
syntax, while a human-readable name may be an alias, label, or locator
projection. Uniqueness and persistence exist only within a declared namespace
and authority.

Implication: Factorium must separate the entity's continuity criteria from
the identifier token, namespace, authority, and mutable display name.

Confidence: high.

### FACTORIUM-SAB-02 - Classification is purpose-relative

Source:

- `tables/foundations/ROOT-TABLE.md`
- `tables/foundations/FACTOR-ROLES.md`
- RFC 3986 resource and representation distinctions:
  https://www.rfc-editor.org/rfc/rfc3986

Observed constraint: one entity can participate in several classifications
under different schemes and purposes. A class assignment is a typed
relationship, not the entity's complete identity.

Implication: classification requires scheme, class, criteria, authority,
effective period, and confidence or status.

Confidence: medium-high.

### FACTORIUM-SAB-03 - Version semantics belong to a versioning scheme

Source:

- Semantic Versioning 2.0.0:
  https://semver.org/spec/v2.0.0.html

Observed constraint: SemVer communicates public-API compatibility only after
a public API is declared. Major, minor, patch, prerelease, build metadata, and
precedence have specific meanings that do not automatically apply to every
document, dataset, object, or deployment.

Implication: every version identifier must name its subject, scheme, release
boundary, compatibility contract, and precedence rules.

Confidence: high.

### FACTORIUM-SAB-04 - State is a situation/configuration, not an event

Source:

- W3C, *State Chart XML (SCXML): State Machine Notation for Control
  Abstraction*:
  https://www.w3.org/TR/scxml/

Observed constraint: SCXML maintains an active state configuration and
processes internal and external events that may enable transitions. Events
occur; states hold; transitions relate source configurations to targets under
triggers and conditions.

Implication: Factorium must separate state, event, transition, guard, action,
and resulting state.

Confidence: high.

### FACTORIUM-SAB-05 - Process and lifecycle are different views

Source:

- W3C SCXML:
  https://www.w3.org/TR/scxml/
- OMG Business Process Model and Notation:
  https://www.omg.org/bpmn/

Observed constraint: a state machine emphasizes enabled transitions and
configurations; a process model emphasizes ordered activities, flows, events,
and completion. A lifecycle is a selected progression of meaningful stages,
often derived from lower-level events and states.

Implication: process sequence, state transition, and lifecycle stage must be
linked views rather than one overloaded status list.

Confidence: high.

### FACTORIUM-SAB-06 - A transition requires more than before and after labels

Source:

- W3C SCXML:
  https://www.w3.org/TR/scxml/

Observed constraint: enabled transitions depend on current configuration,
event matching, conditions, conflict resolution, and ordered execution.

Implication: a Factorium Transition Table requires source state, event,
guard, action/effect, target state, failure behavior, and authority.

Confidence: high.

### FACTORIUM-SAB-07 - Policy intent and executable rules are separate

Source:

- RFC 3198, *Terminology for Policy-Based Management*:
  https://www.rfc-editor.org/rfc/rfc3198

Observed constraint: policy-based management distinguishes policy goals,
rules, conditions, actions, roles, and enforcement. A policy rule commonly
binds conditions to actions.

Implication: high-level policy should not be treated as executable merely
because prose sounds mandatory; operational rules need explicit inputs,
conditions, outputs/actions, priority, and enforcement.

Confidence: high.

### FACTORIUM-SAB-08 - Decisions are derived outputs

Source:

- OMG, *Decision Model and Notation 1.5*:
  https://www.omg.org/spec/DMN/1.5/About-DMN
- `tables/examples/data-retention.md`
- `tables/examples/incident-severity.md`

Observed constraint: DMN separates decision requirements, input data,
knowledge, decision logic, and outputs. Existing Factorium pilots similarly
derive severity or retention obligation from inputs and a policy version.

Implication: a decision output must not be counted again as an independent
input factor.

Confidence: high.

### FACTORIUM-SAB-09 - Constraints define validity independently of action

Source:

- `specs/REFERENCE-TABLE-FAMILIES.md`
- RFC 3198:
  https://www.rfc-editor.org/rfc/rfc3198

Observed constraint: a constraint can prohibit or require a combination
without selecting a complete action. A Decision Table selects an output; a
Constraint Table owns allowed, forbidden, required, or invariant cases.

Implication: policy decisions and validity constraints should be sibling
views when both lookup questions matter.

Confidence: high.

### FACTORIUM-SAB-10 - An exception is a governed deviation

Source:

- RFC 3198:
  https://www.rfc-editor.org/rfc/rfc3198
- `tables/examples/data-retention.md`

Observed constraint: exceptions and overrides require scope, authority, time,
reason, compensating controls, and review. An exception does not erase the
underlying policy or convert a temporary deviation into a new default.

Implication: Factorium must model exception records separately from policy
rules and decisions.

Confidence: medium-high.

## Recommendations

### Adopt now

- Publish three canonical anchors:
  - Identity, Naming, Classification, and Versioning;
  - State, Event, Transition, Process, and Lifecycle;
  - Policy, Rule, Constraint, Decision, and Exception.
- Publish a version-semantics Mapping Table, a lifecycle Transition Table, a
  policy Decision Table, and a policy Constraint Table.
- Link existing deployment, retention, incident, and prioritization examples.

Owner: Factorium.

Validation: Reference Architecture, Mapping Integrity, Cross-Paradigm Mapping,
Schema, Practitioner, Research Integrity, role registry, and links.

### Prototype behind a compatibility boundary

- Keep table rows Markdown-first until R2 defines typed interchange.
- Treat SemVer as one mapping scheme rather than Factorium's universal version
  model.
- Defer executable SCXML, BPMN, and DMN generation.

### Reject or defer

- Reject a name as sole identity custody.
- Reject one universal lifecycle or status sequence.
- Reject policy prose as executable decision logic.
- Reject exceptions without authority, expiry, and review.

## Non-goals

- designing a universal identity system;
- standardizing all classification or versioning schemes;
- implementing a workflow engine or rules engine;
- replacing URI, SemVer, SCXML, BPMN, DMN, or policy-management standards.

