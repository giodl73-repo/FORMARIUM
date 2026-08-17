# Factor Forge Simulation Supplement

Status: internal `sim-02` selection; not part of `sieve-01` or `preview-01`

Selected current-corpus delta: **60 records** — 26 canonical entries and 34
specialized views

## Purpose

This supplement tests whether completed Factor Forge batches F1-F50 extend
*Structure, Quantity, and Choice* as connected book material rather than as a
repository changelog. It adds every current canonical entry and specialized
view whose Markdown path is absent from the 78-record volume selection.

The base volume paths are rendered from their current source revisions for
this simulation. That does not rewrite the frozen `sieve-01` tag or make later
content part of its reader-evidence baseline.

## Part VI - Systems, organizations, and coordinated work

### Systems and structural integrity

79. [System Composition, Architecture, Capability, Interface, and Dependency](../../tables/entries/system-composition-dependency.md)
80. [System Composition and Architecture Integrity Constraints](../../tables/constraints/system-composition-integrity.md)

Begin with the selected whole, viewpoint, boundary, environment, architecture,
architecture description, interfaces, and directional dependencies. Treat a
subsystem as a contextual role in a containing-system view, not a permanent
entity type. The Constraint view then tests whether descriptions, views,
diagrams, and assignments preserve those distinctions through change.

### Organizational assignment and governance

81. [Organization, Role, Responsibility, Authority, and Accountability](../../tables/entries/organization-role-authority.md)
82. [Organizational Assignment Semantics](../../tables/mappings/organizational-assignment-semantics.md)
83. [Governance, Obligation, and Compliance](../../tables/entries/governance-obligation-compliance.md)
84. [Governance and Compliance Mechanisms](../../tables/mappings/governance-compliance-mechanisms.md)

Move from system membership and boundaries to coordinated actors, duties,
decision rights, answerability, delegation, and stewardship. Governance then
adds legitimate direction, obligation applicability, evidenced conformity,
enforcement, remediation, and separate effectiveness questions.

### Observation, inference, monitoring, and response

85. [Observation-to-Inference Evidence Chain](../../tables/evidence/observation-inference-chain.md)
86. [Objective, Control, Monitoring, and Response](../../tables/entries/control-monitoring-response.md)
87. [Control and Response Failure Diagnostic](../../tables/diagnostics/control-response-failures.md)

The Evidence view preserves the route from source and activity through
observation, measurement, result, inference, implication, limitation, and
confidence. The control cluster then separates objectives, set points,
controller commands, actuators, observations, indicators, service-level
objectives, thresholds, alerts, agreements, interventions, feedback, and
outcomes before diagnosing failures by stage.

### Software mechanisms without mechanism authority

#### Program constructs

88. [Software Type, Value, and Function](../../tables/entries/software-type-value-function.md)
89. [Software Program Construct Mechanisms](../../tables/mappings/software-program-constructs.md)

#### Architecture subjects

90. [Software Module, Service, and Resource](../../tables/entries/software-module-service-resource.md)
91. [Software Architecture Mechanisms](../../tables/mappings/software-architecture-mechanisms.md)

#### Interactions and obligations

92. [Software Transaction, Message, and Contract](../../tables/entries/software-transaction-message-contract.md)
93. [Software Interaction Mechanisms](../../tables/mappings/software-interaction-mechanisms.md)

The three pairs begin from canonical concept distinctions, then map them into
bounded language, database, protocol, service, API-description, and platform
mechanisms. The mappings are contextual and many-to-many; they do not let Rust,
Haskell, PostgreSQL, HTTP, Kubernetes, or another mechanism define the general
entry.

### Coordinated work and recovery

#### Workflow and interaction failure

94. [Coordinated Work: Workflow, Orchestration, Choreography, Concurrency, and Compensation](../../tables/entries/coordinated-work.md)
95. [Coordinated Work Failure Diagnostic](../../tables/diagnostics/coordinated-work-failures.md)

The anchor separates organized work, coordinator-owned execution, participant
interaction, independently progressing activity, and effect-aware recovery.
The Diagnostic view traces stalls, duplicates, conflicts, disagreement about
completion, and partial effects across trigger, correlation, branch, join,
ownership, concurrency, commitment, and recovery.

## Part VII - Claims, sampling, measurement, and statistics

### From association to attributable cause

96. [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../tables/entries/causal-reasoning.md)
97. [Causal Claim Evidence Table](../../tables/evidence/causal-claim-evidence.md)

The anchor selects the causal question before the method and separates
observed dependence, counterfactual effect, contextual contribution, pathway,
action, and actual-case attribution. The Evidence view audits the target,
design, assumptions, estimation, mechanism evidence, alternatives, transport,
and claim limits without computing an effect or assigning responsibility.

### Sampling, estimation, and generalization

#### From a selected sample to a scoped target claim

98. [Population, Sample, Estimand, Estimate, and Generalization](../../tables/entries/sampling-generalization.md)
99. [Sampling and Generalization Failure Diagnostic](../../tables/diagnostics/sampling-generalization-failures.md)

The anchor separates population, frame, observed sample, analytic sample,
target quantity, estimation rule, realized result, and source-to-target
inference. The Diagnostic view traces coverage, response, attrition,
measurement, processing, weighting, dependence, split leakage, and support
failures without treating sample size or `representative` as proof.

### Measurement quality and calibration

#### From a quality label to the governing comparison

100. [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](../../tables/entries/measurement-quality.md)
101. [Measurement Quality Failure Diagnostic](../../tables/diagnostics/measurement-quality-failures.md)

The anchor separates signed reference difference, estimated systematic error,
individual and replicate agreement, indication granularity, standards-based
calibration, and probability reliability. The Diagnostic view tests reference
offsets, replicate scatter, coarse indications, drift, calibration misuse, and
forecast reliability without treating one quality label as proof of fitness.

### Statistical summaries and intervals

#### From one average or error bar to the correct target

102. [Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval](../../tables/entries/statistical-summary-interval.md)
103. [Statistical Summary and Interval Failure Diagnostic](../../tables/diagnostics/statistical-summary-interval-failures.md)

The anchor separates equally and unequally weighted centers, order summaries,
squared- and original-unit spread, estimator sampling variability, and
parameter coverage. The Diagnostic view tests distribution shape, extremes,
weight semantics, quantile conventions, denominators, dependence, and interval
targets without treating narrowness or one `95%` label as validity proof.

## Part VIII - Mathematics, geometry, and units

### From notation to a scoped solution or convergence claim

104. [Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence](../../tables/entries/mathematical-relation-solving.md)
105. [Mathematical Relation and Solver Failure Diagnostic](../../tables/diagnostics/mathematical-relation-solving-failures.md)

The anchor separates mathematical objects from representations and values,
conditional equations from domain-scoped identities, general solutions from
function roots, and sequence generation from convergence. The Diagnostic view
tests symbol roles, domains, transformations, derivative existence, starting
states, residuals, stopping, and convergence conditions without treating a
returned number as proof.

### Geometric objects and reference frames

#### From a geometric subject to a represented and anchored result

106. [Geometric Object, Point, Curve, Path, Length, Shape, Angle, Coordinate System, Reference Frame, and Unit Circle](../../tables/entries/geometric-reference-structure.md)
107. [Geometric Reference Failure Diagnostic](../../tables/diagnostics/geometric-reference-structure-failures.md)

The anchor separates objects from drawings and coordinates, loci from ordered
paths, metric length from coordinate difference, shape from size and pose, and
coordinate systems from reference frames. The Diagnostic view tests metric,
parameterization, angle-unit, axes, datum/frame, epoch, transformation, and
unit-circle failures without treating changed coordinates as physical motion.

### Quantity values, units, and conversion

#### From one numerical display to the same scoped quantity

108. [Quantity Value, Numerical Value, Unit, Dimension, and Conversion](../../tables/entries/quantity-value-unit-conversion.md)
109. [Unit Conversion Mapping](../../tables/mappings/unit-conversion.md)

The anchor separates a quantity value from its unit-dependent numerical value,
a unit from a dimension, same dimension from same quantity kind, and conversion
from measurement, calibration, correction, and validity. The Mapping view
preserves direction, compound-unit powers, point-versus-interval sense,
factor exactness, uncertainty, inverse domain, and rounding without becoming a
catalog of named units.

## Part IX - Matter, reaction, and thermodynamic state

### From a family name to its reusable classification rule

110. [Chemical Entity, Substance, Compound Class, Mixture, and Solution](../../tables/entries/chemical-substance-classification.md)
111. [Chemical Classification Failure Diagnostic](../../tables/diagnostics/chemical-substance-classification-failures.md)

The anchor separates entity, species, substance, compound, formula unit,
compound class, mixture, and solution while making classification criterion the
reusable pivot. Halide and sugar demonstrate family/member, charge,
stoichiometry, and chemical/reporting scope without expanding into a catalog.
The Diagnostic view tests level, representation, criterion, constituent basis,
and subtype explosion before named examples acquire canonical status.

### Chemical change, rate, and equilibrium

#### From a balanced representation to scoped process claims

112. [Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst](../../tables/entries/chemical-reaction-stoichiometry-equilibrium.md)
113. [Chemical Reaction Relations](../../tables/formulas/chemical-reaction-relations.md)
114. [Chemical Reaction Failure Diagnostic](../../tables/diagnostics/chemical-reaction-failures.md)

The anchor separates reaction process, symbolic equation, stoichiometric
accounting, progress, kinetics, thermodynamic equilibrium, catalysis, and
mechanism evidence. The Formula view preserves signed coefficients, units,
normalizations, dimensionless activities, standard states, direction, and
equation scaling. The Diagnostic view tests balance, extent consistency, rate,
false equilibrium, catalyst comparisons, and mechanism overclaims.

### Thermodynamic systems, states, processes, and phases

#### From a chosen system to scoped state and transition claims

115. [Thermodynamic System, Boundary, State, Process, Phase, and Transition](../../tables/entries/thermodynamic-system-state-phase.md)
116. [Thermodynamic System and Phase Failure Diagnostic](../../tables/diagnostics/thermodynamic-system-state-phase-failures.md)

The anchor begins with the analyst's system boundary and allowed transfers,
then separates state from process path, property scaling from numerical size,
and phase criteria from familiar names. The Diagnostic view tests false
isolation, incomplete state descriptions, invalid equations of state,
phase-count shortcuts, and transition claims that omit coexistence,
metastability, hysteresis, kinetics, conditions, or uncertainty.

## Part X - Waves, electrical response, and information

### From one waveform to scoped amplitude, spectrum, and velocity claims

117. [Oscillation, Spectrum, and Dispersion Failure Diagnostic](../../tables/diagnostics/oscillation-spectrum-dispersion-failures.md)

The revised base-volume Periodic and Wave anchor and Formula view own
oscillation, amplitude, spectrum, phase velocity, group velocity, the finite
transform pair, and dispersion contracts. This new Diagnostic view tests
baseline, amplitude measure, preprocessing, sampling, windowing, normalization,
aliasing, spectral interpretation, branch, bandwidth, distortion, and transport
overclaims without duplicating the existing canonical entry in the supplement.

### Electrical field, material, storage, and response

#### From shared units to the correct descriptive level

118. [Electrical Field, Material, Storage, and Impedance Failure Diagnostic](../../tables/diagnostics/electrical-field-material-impedance-failures.md)

The revised base-volume Electrical Quantity anchor and Formula view own local
field, material resistivity, specimen resistance, configuration capacitance,
complex impedance, and their scoped relations. This Diagnostic view tests
spatial-model, geometry, contact, state, frequency, phase, equivalent-circuit,
fixture, parasitic, and calibration failures without creating a catalog of
named components or materials.

### Encoding, channels, dependence, and limits

#### From a representation contract to a scoped communication bound

119. [Information, Encoding, Channel, and Capacity Failure Diagnostic](../../tables/diagnostics/information-encoding-channel-failures.md)

The revised base-volume Information anchor and Formula view own encoding,
channel, mutual information, channel capacity, and their mapping, probability,
constraint, and normalization contracts. This Diagnostic view tests decoder,
version, loss, channel-law, nonstationarity, leakage, estimator, optimization,
throughput, and unit failures without creating a catalog of named encodings,
codes, protocols, media, or channel families.

## Part XI - Balances, accounting, and value

### Stocks, flows, balances, and conservation

#### From apparent closure to a scoped accounting contract

120. [Stock, Flow, Accumulation, Balance, and Conservation](../../tables/entries/stock-flow-balance.md)
121. [Stock-Flow Balance Failure Diagnostic](../../tables/diagnostics/stock-flow-balance-failures.md)

The anchor separates point-in-time amounts, interval transfers, rates, net
stock change, reconciliation, and domain conservation constraints. The
Diagnostic view tests suspicious closure and nonclosure through property,
boundary, interval, unit, gross/net, compartment, residual, uncertainty, and
evidence checks without treating a balanced equation as proof that its terms
are complete or true.

### Accounting basis, inflation, and discounted value

#### From one currency display to the correct economic contract

122. [Economic Basis, Inflation, and Net Present Value Failure Diagnostic](../../tables/diagnostics/economic-basis-inflation-npv-failures.md)

The revised base-volume Cost/Price/Value anchor and Formula view own accounting
basis, aggregate price-index change, price-level conversion, and net present
value. This Diagnostic view tests recognition, basis changes, index scope,
intervals, spatial-level misuse, cash-flow timing, discounting, sensitivity,
and decision overclaims without creating a catalog of named accounting
standards, price indexes, products, assets, or valuation methods.

## Part XII - Evidence, alternatives, and selection

### From rule-derived decisions to bounded choice

123. [Choice, Alternative, Criterion, Preference, Recommendation, and Selection](../../tables/entries/choice-alternative-selection.md)
124. [Alternative Selection Decision Table](../../tables/decisions/alternative-selection.md)

The anchor distinguishes selection among feasible alternatives from a
rule-derived case conclusion. It keeps alternatives, states, outcomes,
evidence, criteria, preferences, trade-offs, recommendation, and final
selection in separate roles. The Decision view retains excluded and unresolved
alternatives, missing or contested outcome cells, unlike measurement bases,
noncompensatory constraints, sensitivity, and authority without prescribing a
universal score or named decision method.

## Part XIII - Models, time, access, and assurance

### From model language to a reproducible run

125. [Model, Representation, and Simulation](../../tables/entries/model-representation-simulation.md)
126. [Model and Simulation Failure Diagnostic](../../tables/diagnostics/model-simulation-failures.md)

The anchor separates subject, model, representation, implementation, run, and
result. The Diagnostic view localizes discrepancies without treating code
verification, calibration, visual realism, or numerical precision as
intended-use validation.

### From stakeholder need to bounded evidence

127. [Requirement, Specification, Verification, and Validation](../../tables/entries/requirement-specification-verification-validation.md)
128. [Requirement Verification and Validation Evidence Table](../../tables/evidence/requirement-verification-validation.md)

The anchor separates need, requirement, specification, verification,
validation, and nonconformity. The Evidence view binds every conclusion to
exact subject, criteria, version, method, environment, evidence, and limit.

### From uptime language to service-bound dependability

129. [Reliability, Availability, Maintainability, Resilience, and Recovery](../../tables/entries/dependability-reliability-availability-resilience.md)
130. [Dependability Failure Diagnostic](../../tables/diagnostics/dependability-failures.md)

The anchor distinguishes continuity, usable state, restoration support,
adversity response, recovery, and failure. The Diagnostic view tests measure,
dependency, maintenance, data, and user-boundary explanations.

### From one time field to explicit temporal roles

131. [Instant, Duration, Interval, Deadline, and Schedule](../../tables/entries/temporal-organization.md)
132. [Temporal Representation Mapping](../../tables/mappings/temporal-representation.md)

The anchor separates scale points, elapsed quantities, bounded regions,
authority-backed deadlines, schedules, and milestones. The Mapping view
preserves scale, zone, bounds, calendars, dependencies, resources, and history.

### From data containers to governed structure

133. [Data Structure Mapping](../../tables/mappings/data-structure.md)

The revised base-volume Information/Data anchor now owns record, schema, and
field roles. The Mapping view preserves subject, identity, interpretation,
cardinality, missingness, evolution, provenance, and declared loss.

### From login to a reconstructable access decision

134. [Access, Permission, Authorization, and Entitlement](../../tables/entries/access-permission-authorization-entitlement.md)
135. [Access Authorization Integrity Constraint Table](../../tables/constraints/access-authorization-integrity.md)

The anchor separates authentication evidence, permission relations,
entitlements, authorization decisions, enforcement, and access events. The
Constraint view makes missing facts, revocation, propagation, delegation, and
review behavior fail-able.

### From activity list to governed planned work

136. [Planned Work Procedure](../../tables/procedures/planned-work.md)

The revised Coordinated Work anchor now owns plan, task, and work-milestone
roles. The Procedure view connects outcomes, work, dependencies, resources,
baselines, actuals, evidence, and change without presenting a plan as a
prediction.

### From assurance language to scoped conformity evidence

137. [Assurance, Assessment, Audit, Certification, and Accreditation](../../tables/entries/assurance-assessment-audit-certification.md)
138. [Assurance and Conformity Evidence Table](../../tables/evidence/assurance-conformity.md)

The anchor separates confidence cases, assessment, audit, attestation,
certification, and accreditation. The Evidence view prevents a logo,
certificate, audit completion, or accreditation scope from becoming universal
proof of quality, safety, legality, effectiveness, or future performance.

## Selection boundary

- Every added path is present in the current canonical interchange.
- No current canonical entry or view absent from the base volume is omitted.
- Roots, roles, primes, research notes, sidecar relations, and review records
  are not counted as canonical delta records.
- Existing base-volume paths may have later revisions; the supplement counts
  path admission, not historical line-level change.
- The 138-record combined simulation remains a rehearsal projection, not a
  publication or evidence-bearing preview candidate.
