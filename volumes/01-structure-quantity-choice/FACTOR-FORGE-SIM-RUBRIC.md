# Factor Forge Simulation Rubric

Status: author-only `sim-03` route contract; exclude from rendered proof

This rubric checks expected-answer support and exact delta coverage. It does
not score a fictional participant or create usability evidence.

## Task H expected route

- System Composition, Architecture, Capability, Interface, and Dependency;
- System Composition and Architecture Integrity Constraints;
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
- objective, set point, observed value, indicator, service-level objective,
  threshold, alert, controller, actuator, intervention, feedback, agreement,
  output, and outcome remain distinct;
- the reader tests event eligibility and SLI scope, then traces controller
  command, actuator response, manipulated influence, and controlled value;
- missing ownership, authority, routing, actuation, measurement coverage, or
  action are candidate failure stages rather than proven causes.

Critical artifact failure: green SLO status, alert delivery, set-point change,
or command acknowledgment is treated as completed control, agreement
compliance, or proof of outcome improvement.

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

## Task X expected route

- Chemical Entity, Substance, Compound Class, Mixture, and Solution;
- Chemical Classification Failure Diagnostic;
- entity, species, substance, compound, mixture, and phase retain distinct levels;
- molecule and formula unit remain distinct representations or entity roles;
- compound classes retain explicit membership criteria and authority;
- halide and sugar remain examples rather than open-ended canonical taxonomies;
- chemical solution remains distinct from mathematical solution.

Critical artifact failure: a list of familiar named chemical families is
accepted as the reusable conceptual factorization, or a class label is accepted
as proof of identity, purity, safety, nutrition, or regulatory status.

## Task Y expected route

- Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst;
- Chemical Reaction Relations;
- Chemical Reaction Failure Diagnostic;
- reaction process, equation, and mechanism retain distinct identities;
- signed stoichiometric numbers connect species changes, extent, and rate;
- rate laws remain empirical and distinct from balanced equations;
- dynamic equilibrium retains activities, standard states, conditions, and equation convention;
- catalyst changes kinetic pathway/rate rather than equilibrium under matched conditions.

Critical artifact failure: balance, a fitted rate curve, a composition plateau,
or faster catalyzed approach is accepted as proof of a unique mechanism or
changed equilibrium position.

## Task Z expected route

- Thermodynamic System, Boundary, State, Process, Phase, and Transition;
- Thermodynamic System and Phase Failure Diagnostic;
- system, surroundings, and boundary retain explicit identities and transfer rules;
- open, closed, and isolated classify allowed exchanges rather than container appearance;
- state and state variables remain distinct from process and path;
- intensive and extensive quantities retain their scaling rules;
- equation-of-state claims retain model and validity conditions;
- phase uses a uniformity and interface criterion rather than a named-state list;
- transition claims retain driver, coexistence, metastability, hysteresis, and kinetics.

Critical artifact failure: a sealed container, steady reading, familiar phase
name, or matching endpoint states is accepted as sufficient proof of isolation,
equilibrium, phase count, or path-independent heat and work.

## Task AA expected route

- Periodic and Wave Quantity;
- Periodic and Wave Quantities;
- Oscillation, Spectrum, and Dispersion Failure Diagnostic;
- oscillation and propagating wave remain distinct;
- amplitude retains reference, measure, component, interval, and unit;
- spectrum retains coordinate, ordinate, sampling, window, transform,
  normalization, resolution, and bandwidth;
- a spectral peak does not prove a physical mode or causal source;
- phase velocity follows a constant-phase component;
- group velocity follows a local dispersion derivative in a narrowband regime;
- energy, causal-signal, information, and material transport require separate evidence.

Critical artifact failure: matching units, a transform peak, pulse arrival, or
the word velocity is accepted as sufficient proof that amplitude conventions,
physical modes, causal sources, and transport speeds are interchangeable.

## Task AB expected route

- Electrical Quantity;
- Electrical Quantities;
- Ohm's Law;
- Electrical Field, Material, Storage, and Impedance Failure Diagnostic;
- local electric field and point-pair potential difference remain distinct;
- material resistivity and specimen resistance retain geometry and state;
- capacitance and stored charge remain property and state, respectively;
- complex impedance retains magnitude, phase, terminals, and frequency;
- ideal component equations retain electrostatic, uniform, linear, lumped,
  sinusoidal, and nonzero-denominator restrictions;
- fixture, parasitics, and calibration plane remain measurement context.

Critical artifact failure: shared volts or ohms, a fitted equivalent circuit,
or one terminal ratio is accepted as proof of identical fields, materials,
configurations, mechanisms, frequency responses, or safe designs.

## Task AC expected route

- Information, Data, Signal, and Noise;
- Information and Signal Measures;
- Information, Encoding, Channel, and Capacity Failure Diagnostic;
- encoding mapping remains distinct from interpretation and semantic meaning;
- a channel retains inputs, outputs, transition law, state, and assumptions;
- mutual information remains a statistical-dependence measure, not causation
  or semantic agreement;
- capacity optimizes over admissible inputs for a fixed channel and constraints;
- bits/use, bits/s, and bits/s/Hz remain distinct normalizations;
- model capacity, achievable code rate, line rate, and payload throughput remain
  distinct claims.

Critical artifact failure: byte equality, positive mutual information, or a
single modeled rate is accepted as proof of meaning, causation, interoperability,
capacity achievement, or universal system performance.

## Task AD expected route

- Cost, Price, Value, Utility, and Return;
- Cost, Value, and Return Relations;
- Economic Basis, Inflation, and Net Present Value Failure Diagnostic;
- accounting recognition remains distinct from cash movement and valuation;
- aggregate price-index change remains distinct from one price and index level;
- present value remains distinct from NPV and realized accounting profit;
- every NPV flow retains sign, timing, currency, price, tax, and inclusion basis;
- nominal flows/rates and real flows/rates remain aligned;
- NPV remains a scoped model output rather than certainty or decision authority.

Critical artifact failure: shared currency units, an index number, or a positive
discounted total is accepted as proof of accounting error, universal inflation,
realized profit, fairness, affordability, or mandatory approval.

## Task AE expected route

- Quantity Value, Numerical Value, Unit, Dimension, and Conversion;
- Unit Conversion Mapping;
- quantity value remains distinct from its unit-dependent numerical value;
- same dimension remains insufficient to establish the same quantity kind;
- conversion remains distinct from measurement, calibration, and correction;
- compound-unit factors retain every power and denominator direction;
- affine point conversion remains distinct from interval scaling;
- exact factor status remains distinct from measurement-result uncertainty;
- rounding preserves source information without inventing precision;
- conversion does not create accuracy, validity, or fitness for use.

Critical artifact failure: matching dimensions, successful cancellation, or an
exact factor is accepted as proof of quantity-kind identity, added measurement
quality, physical validity, or semantic substitutability.

## Task AF expected route

- Choice, Alternative, Criterion, Preference, Recommendation, and Selection;
- Alternative Selection Decision Table;
- choice among alternatives remains distinct from rule-derived case decision;
- current practice remains visible inside the candidate-generation boundary;
- candidate, feasible, excluded, and unresolved are statuses with exact
  constraint and evidence reasons;
- alternative, uncertain state, and outcome remain distinct;
- evidence applicability and causal status remain explicit;
- constraints are noncompensatory while criteria and preferences retain their
  own roles;
- cost, value, utility, probability, expected loss, and score remain distinct;
- missing and contested outcome cells do not receive favorable defaults;
- recommendation remains separate from authority-owned final selection;
- sensitivity and reconsideration triggers remain visible.

Critical artifact failure: a retrospective association, incomplete score, or
structural route is accepted as proof of benefit, optimality, authority, or
final selection.

## Task AG expected route

- Model, Representation, and Simulation;
- Model and Simulation Failure Diagnostic;
- no verification, calibration, or visual-realism overclaim.

## Task AH expected route

- Requirement, Specification, Verification, and Validation;
- Requirement Verification and Validation Evidence Table;
- exact subject, criterion, method, environment, evidence, and intended-use scope.

## Task AI expected route

- Reliability, Availability, Maintainability, Resilience, and Recovery;
- Dependability Failure Diagnostic;
- service boundary, denominator, dependency, recovery-time, recovery-data, and
  residual-loss distinctions.

## Task AJ expected route

- Instant, Duration, Interval, Deadline, and Schedule;
- Temporal Representation Mapping;
- scale, zone, calendar, bounds, authority, logic, and milestone criteria.

## Task AK expected route

- Data Structure Mapping plus the revised Information/Data anchor;
- record, schema, field, interpretation, identity, cardinality, missingness,
  unit, and declared loss remain visible.

## Task AL expected route

- Access, Permission, Authorization, and Entitlement;
- Access Authorization Integrity Constraint Table;
- authentication, grant, decision, enforcement, revocation, indeterminate
  result, and audit correlation remain separate.

## Task AM expected route

- Assurance, Assessment, Audit, Certification, and Accreditation;
- Assurance and Conformity Evidence Table;
- subject, scheme, party, scope, version, time, status, and excluded claims
  bound the conclusion.

## Task AN expected route

- Planned Work Procedure plus revised Coordinated Work;
- plan, task, milestone, dependency, resource, schedule, baseline, actual, and
  outcome remain separate.

Critical artifact failure: any route treats a representation, pass flag,
percentage, date, matching field, login, certificate, or plan as universal
proof of meaning, validity, dependability, authority, assurance, or outcome.

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
- `tables/entries/chemical-substance-classification.md`
- `tables/diagnostics/chemical-substance-classification-failures.md`
- `tables/entries/chemical-reaction-stoichiometry-equilibrium.md`
- `tables/formulas/chemical-reaction-relations.md`
- `tables/diagnostics/chemical-reaction-failures.md`
- `tables/entries/thermodynamic-system-state-phase.md`
- `tables/diagnostics/thermodynamic-system-state-phase-failures.md`
- `tables/diagnostics/oscillation-spectrum-dispersion-failures.md`
- `tables/diagnostics/electrical-field-material-impedance-failures.md`
- `tables/diagnostics/information-encoding-channel-failures.md`
- `tables/diagnostics/economic-basis-inflation-npv-failures.md`
- `tables/entries/quantity-value-unit-conversion.md`
- `tables/mappings/unit-conversion.md`
- `tables/entries/choice-alternative-selection.md`
- `tables/decisions/alternative-selection.md`
- `tables/entries/model-representation-simulation.md`
- `tables/diagnostics/model-simulation-failures.md`
- `tables/entries/requirement-specification-verification-validation.md`
- `tables/evidence/requirement-verification-validation.md`
- `tables/entries/dependability-reliability-availability-resilience.md`
- `tables/diagnostics/dependability-failures.md`
- `tables/entries/temporal-organization.md`
- `tables/mappings/temporal-representation.md`
- `tables/mappings/data-structure.md`
- `tables/entries/access-permission-authorization-entitlement.md`
- `tables/constraints/access-authorization-integrity.md`
- `tables/procedures/planned-work.md`
- `tables/entries/assurance-assessment-audit-certification.md`
- `tables/evidence/assurance-conformity.md`

## Claim boundary

A passing route audit means the expected distinctions exist in the selected
artifacts and every delta record has at least one task owner. It does not mean
that a reader would find, understand, trust, apply, or return to the material.
