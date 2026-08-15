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

## Task P expected route

- Coordinated Work: Workflow, Orchestration, Choreography, Concurrency, and
  Compensation;
- Coordinated Work Failure Diagnostic;
- workflow, coordinator boundary, participant exchange, correlation,
  concurrency, effect visibility, and completion condition remain distinct;
- retry, idempotency, cancellation, rollback, compensation, and forward repair
  retain separate contracts;
- acknowledgment, local commit, and local cancellation do not prove global or
  business completion.

Critical artifact failure: retry or cancellation is presented as compensation,
concurrency as simultaneous execution, or one participant's state as the whole
workflow outcome.

## Task Q expected route

- Association, Causal Effect, Influence, Mechanism, Intervention, and
  Attribution;
- Causal Claim Evidence Table;
- association and prediction remain distinct from a defined causal effect;
- mechanism requires pathway evidence rather than a configuration label;
- attribution requires case facts, contingencies, alternatives, and a
  governing rule beyond a population association;
- target contrast, design, assumptions, estimator, uncertainty, sensitivity,
  transport, and responsibility limits remain visible.

Critical artifact failure: prediction, temporal precedence, a diagram, or one
model feature is treated as sufficient proof of effect, mechanism, individual
cause, or blame.

## Task R expected route

- Population, Sample, Estimand, Estimate, and Generalization;
- Sampling and Generalization Failure Diagnostic;
- target population, corpus frame, observed sample, analytic sample,
  estimand, estimator, estimate, and uncertainty remain distinct;
- random record splitting does not prove identity, template, temporal,
  environment, or semantic independence;
- exclusions, preprocessing provenance, dependence, source-target
  differences, support, and unsupported groups remain visible;
- `representative` is replaced by an exact result, target, criterion, and
  evidence.

Critical artifact failure: sample size, random splitting, narrow uncertainty,
or a representativeness label is treated as proof of deployment coverage or
generalizability.

## Task S expected route

- Stock, Flow, Accumulation, Balance, and Conservation;
- Stock-Flow Balance Failure Diagnostic;
- opening and closing stock remain distinct from gross interval flows, flow
  rates, capacity, net flow, and accumulation;
- internal and external transfers plus gross and consolidated views retain
  declared boundaries;
- zero accumulation does not imply inactivity, equilibrium, or zero flow;
- arithmetic closure does not prove conservation, complete terms, correct
  measurement, or evidence custody;
- the unexplained adjustment remains a residual until uncertainty and
  competing omitted-term hypotheses are tested.

Critical artifact failure: net zero or a balancing adjustment is treated as
proof that no movement occurred or that every reported term is true.

## Task T expected route

- Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration;
- Measurement Quality Failure Diagnostic;
- measurement error remains distinct from uncertainty, and estimated bias
  remains distinct from realized error;
- accuracy, trueness, precision, resolution, and sensitivity retain their
  different comparisons and conditions;
- metrological calibration does not imply adjustment, verification, validity
  outside range/conditions, or fitness for use;
- probability calibration requires declared outcomes, target population,
  horizon, support, procedure, and uncertainty rather than a bounded score.

Critical artifact failure: repeatability, display digits, a certificate, or a
unit-interval score is treated as sufficient proof of accuracy or calibration.

## Task U expected route

- Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval;
- Statistical Summary and Interval Failure Diagnostic;
- the exact mean/median/quantile target, analytic set, units, transformations,
  and tail behavior remain visible;
- weight meaning, provenance, normalization, distribution, and effective
  sample size are explicit;
- variance, standard deviation, and standard error retain different units and
  distribution ownership;
- session clustering and estimator design determine independent replication;
- confidence, prediction, tolerance, credible, and specification bounds remain
  distinct and narrowness does not prove accuracy or decision value.

Critical artifact failure: `average`, `SD`, record count, or `95%` is accepted
without identifying the statistic, target, denominator, design, and procedure.

## Task V expected route

- Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence;
- Mathematical Relation and Solver Failure Diagnostic;
- function objects, formulas, variables, evaluated values, and software
  functions retain different contracts;
- equations, identities, solutions, and roots retain domain, quantification,
  target, and completeness;
- derivative existence, recurrence, initial state, stopping, residual, error,
  and convergence remain separate;
- Newton's familiar quadratic rate remains local and conditional.

Critical artifact failure: successful substitution, a returned iterate, or a
small step is accepted as proof of identity, complete solution, or convergence.

## Task W expected route

- Geometric Object, Point, Curve, Path, Length, Shape, Angle, Coordinate System, Reference Frame, and Unit Circle;
- Geometric Reference Failure Diagnostic;
- objects, drawings, meshes, equations, points, and coordinates retain distinct identities;
- curve locus, path traversal, path length, endpoint separation, shape, size,
  and pose remain distinct;
- angle quantity and degree/radian convention remain explicit;
- coordinate system, datum/reference frame, epoch, transformation, and
  physical motion remain separate.

Critical artifact failure: matching or changing coordinate tuples are accepted
as sufficient proof of object identity, geometric equivalence, or physical motion.

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
- `tables/entries/coordinated-work.md`
- `tables/diagnostics/coordinated-work-failures.md`
- `tables/entries/causal-reasoning.md`
- `tables/evidence/causal-claim-evidence.md`
- `tables/entries/sampling-generalization.md`
- `tables/diagnostics/sampling-generalization-failures.md`
- `tables/entries/stock-flow-balance.md`
- `tables/diagnostics/stock-flow-balance-failures.md`
- `tables/entries/measurement-quality.md`
- `tables/diagnostics/measurement-quality-failures.md`
- `tables/entries/statistical-summary-interval.md`
- `tables/diagnostics/statistical-summary-interval-failures.md`
- `tables/entries/mathematical-relation-solving.md`
- `tables/diagnostics/mathematical-relation-solving-failures.md`
- `tables/entries/geometric-reference-structure.md`
- `tables/diagnostics/geometric-reference-structure-failures.md`

## Claim boundary

A passing route audit means the expected distinctions exist in the selected
artifacts and every delta record has at least one task owner. It does not mean
that a reader would find, understand, trust, apply, or return to the material.
