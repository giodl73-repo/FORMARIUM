# Factor Forge Simulation Rubric

Status: author-only `sim-03` route contract; exclude from rendered proof

This rubric checks expected-answer support and exact delta coverage. It does
not score a fictional participant or create usability evidence.

## Task H expected route

- System Composition, Capability, Interface, and Dependency;
- System Composition Integrity Constraints;
- component, capability, boundary, environment, interface, relationship, and
  directional dependency remain distinct;
- dependency retains source, target, required property, condition,
  consequence, provenance, and effective time;
- viewpoint or boundary change triggers reassessment.

Critical artifact failure: the reference supports treating every connected
item as a component or leaves dependency direction unowned.

## Task I expected route

- Organization, Role, Responsibility, Authority, and Accountability;
- Organizational Assignment Semantics;
- duty, legitimate right, answerability, bounded transfer, and action
  attribution remain distinct;
- delegation retains source, recipient, scope, limits, duration, revocation,
  and retained obligations;
- title or activity log alone does not prove authority.

Critical artifact failure: responsibility or action attribution is presented
as sufficient authority.

## Task J expected route

- Observation-to-Inference Evidence Chain;
- Claim and Evidence anchor from the base selection;
- source, activity, observation, measurement, correction/transformation,
  result, inference, claim implication, limitation, confidence, and provenance
  remain traceable;
- the final chart does not overwrite prior stages.

Critical artifact failure: a result, inference, or confidence label can replace
the underlying evidence and transformations.

## Task K expected route

- Objective, Control, Monitoring, and Response;
- Control and Response Failure Diagnostic;
- monitoring, indicator, threshold, alert, control, intervention, feedback,
  output, and outcome remain distinct;
- missing decision ownership, authority, routing, or action are candidate
  failure stages rather than proven causes.

Critical artifact failure: alert delivery is treated as completed control or
as proof of outcome improvement.

## Task L expected route

- Governance, Obligation, and Compliance;
- Governance and Compliance Mechanisms;
- Organization and Claim/Evidence cross-references from the base and
  supplement selections;
- obligation applicability, evidence, assessment, compliance, enforcement,
  effectiveness, ethics, safety, legitimacy, and outcomes remain separate;
- an exception retains authority, scope, controls, expiry, and review.

Critical artifact failure: control presence or audit passage is presented as
proof of effectiveness, ethics, safety, or good outcomes.

## Task M expected route

- Software Type, Value, and Function;
- Software Program Construct Mechanisms;
- language types, runtime values, callable behavior, schemas, variables, and
  representations remain distinct.

Critical artifact failure: a Rust struct, JSON instance, schema, variable, or
function becomes the universal definition of type or value.

## Task N expected route

- Software Module, Service, and Resource;
- Software Architecture Mechanisms;
- module organization, capability access, addressed subject, representation,
  deployment, and managed platform object remain distinct.

Critical artifact failure: a file, endpoint, deployment, manifest, or
Kubernetes object becomes the universal definition of module, service, or
resource.

## Task O expected route

- Software Transaction, Message, and Contract;
- Software Interaction Mechanisms;
- request/message acceptance, transaction commit, business completion,
  structural validation, behavioral obligation, and compatibility remain
  distinct.

Critical artifact failure: an HTTP message, database transaction, OpenAPI
schema, or generated client becomes the universal definition of a contract or
proof of business completion.

## Exact task-coverage manifest

The renderer compares these paths with the exact canonical delta derived for
the supplement. Missing or extra paths fail `sim-03`.

- `tables/entries/system-composition-dependency.md`
- `tables/constraints/system-composition-integrity.md`
- `tables/entries/organization-role-authority.md`
- `tables/mappings/organizational-assignment-semantics.md`
- `tables/evidence/observation-inference-chain.md`
- `tables/entries/control-monitoring-response.md`
- `tables/diagnostics/control-response-failures.md`
- `tables/entries/governance-obligation-compliance.md`
- `tables/mappings/governance-compliance-mechanisms.md`
- `tables/entries/software-type-value-function.md`
- `tables/mappings/software-program-constructs.md`
- `tables/entries/software-module-service-resource.md`
- `tables/mappings/software-architecture-mechanisms.md`
- `tables/entries/software-transaction-message-contract.md`
- `tables/mappings/software-interaction-mechanisms.md`

## Claim boundary

A passing route audit means the expected distinctions exist in the selected
artifacts and every delta record has at least one task owner. It does not mean
that a reader would find, understand, trust, apply, or return to the material.
