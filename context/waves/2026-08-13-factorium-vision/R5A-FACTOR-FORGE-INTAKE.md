# R5A - Factor Forge Intake

Status: in progress

Parent milestone: R5 - First substantial volume

Parallel evidence track: R4E - The Sieve

## Objective

Resume reviewed corpus growth toward the approximately 250-entry first
substantial volume without waiting on external reader scheduling, while
preserving the integrity of the frozen R4 usability baseline.

## Lane contract

- `sieve-01` evaluates commit `817e779`, tagged `sieve-01-prototype`.
- R5 additions are not retroactively covered by Sieve observations.
- New entries continue to use the canonical interchange, generated
  projections, source custody, and fixed-point role review.
- Relevant Sieve findings must be forward-applied to R5 before publication.
- R4 closure and R5 publication remain separate gates; neither is waived.

## Baseline

The canonical corpus currently contains 33 anchor entries, 203 senses, 341
ordered factors, and 45 specialized views. It is strong in foundational
quantities and has pilots for systems, governance, evidence, economics,
identity, and publication. R5 must turn those pilots into balanced volume
coverage rather than add isolated headwords.

## Intake batches

### F1 - System composition and dependency

Separate system, component, capability, interface, dependency, boundary, and
environment. Connect these to the existing identity and lifecycle anchors.

Status: first slice implemented with one canonical anchor and one Constraint
view.

### F2 - Organization and authority

Separate organization, role, responsibility, authority, accountability,
delegation, and ownership. Connect governing assignments to the existing
policy and decision anchor without treating organizational mechanisms as
universal definitions.

Status: first slice implemented. The anchor separates organizational
answerability from technical action traceability and links a contextual,
many-to-many organizational assignment Mapping view.

### F3 - Observation and inference

Separate observation, measurement, result, claim, evidence, inference,
confidence, and limitation. Extend the current Claim and Evidence anchor with
traceable scientific and operational views.

Status: first slice implemented. The stable Claim and Evidence anchor now owns
observation, measurement, and inference senses, plus an Evidence Table that
preserves the full source-to-claim chain.

### F4 - Control and response

Separate objective, control, feedback, indicator, threshold, alert,
intervention, and outcome. Link decisions, constraints, diagnostics, and
transitions without collapsing monitoring into control.

Status: first slice implemented. The anchor separates monitoring from action,
feedback control from governance controls, alerts from interventions, and
outputs from outcomes. A Diagnostic view owns control-chain failure isolation.

### F5 - Software mechanism bridge

Add canonical concept entries needed by the existing cross-paradigm mapping:
type, value, function, module, service, resource, transaction, message, and
contract. Mechanism assignments remain contextual Mapping views.

Status: first slice implemented as three connected canonical anchors and three
Mapping views. It resolves the recurrent `message`, `service`, and `contract`
candidates without adding adjacent vocabulary merely for growth.

### F6 - Governance Ledger

Separate governance, obligation, and compliance while preserving links to
organization, authority, policy, rules, controls, enforcement, evidence, and
outcomes. Map organizational and technical records contextually rather than
treating them as universal definitions.

Status: first slice implemented as one canonical anchor and one Mapping view.
It resolves governance and obligation, repairs already-owned authority,
compatibility, organization, event, and enforcement-point declarations, and
leaves adjacent appeal, audit, assurance, and remedy vocabulary deferred.

### F7 - Coordinated Work

Separate workflow, orchestration, choreography, concurrency, and compensation
while preserving links to lifecycle, organization, transactions, messages,
contracts, controls, and obligations. Diagnose stalls, duplicates, conflicts,
partial effects, and disagreement about completion without assigning every
failure to one engine or controller.

Status: first slice implemented as one canonical anchor and one Diagnostic
view. It resolves the lifecycle anchor's workflow, concurrency, and
compensation candidates while keeping parallelism, retry, idempotency,
cancellation, rollback, and compensation non-equivalent.

### F8 - Causal Reasoning

Separate association, causal effect, contextual influence, causal mechanism,
intervention, and actual-case attribution. Connect claim/evidence and control
without treating prediction, temporal precedence, a diagram, a randomized
label, a mediator, or a successful action as universal causal proof.

Status: first slice implemented as one canonical anchor and one Evidence view.
It resolves causal model and influence while preserving distinct effect,
mechanism, transport, attribution, and responsibility questions.

### F9 - Sampling and Generalization

Separate target population, sampling frame, observed sample, analytic sample,
estimand, estimator, estimate, generalization, and transport. Connect evidence,
causal, uncertainty, arithmetic mean, and benchmark interpretation without
treating sample size, randomization, weighting, or representativeness as
universal proof.

Status: first slice implemented as one canonical anchor and one Diagnostic
view. It resolves the arithmetic-mean sample declaration and adds portable
coverage, selection, leakage, estimation, and source-to-target failure tests.

### F10 - Stock, Flow, Balance, and Conservation

Separate point-in-time stocks, boundary or period flows, flow totals and rates,
accumulation, accounting balance, and domain conservation. Connect quantities,
systems, control, evidence, populations, energy, electricity, materials, and
economics without treating arithmetic closure as physical or custody proof.

Status: first slice implemented as one canonical anchor and one Diagnostic
view. The existing General Accounting Balance Formula view moves from an
energy-only owner to the new structural anchor.

### F11 - Measurement Quality and Calibration

Separate measurement error, bias, accuracy, trueness, precision, instrument
resolution, metrological calibration, and probability calibration. Connect
measurement, uncertainty, sampling, control, formula, and benchmark material
without treating repeatability, display digits, a calibration certificate, or
a bounded score as universal quality proof.

Status: first slice implemented as one canonical anchor and one Diagnostic
view. It resolves the probability-range calibration declaration specifically
to probability calibration while measurement uncertainty retains its existing
owner.

### F12 - Statistical Summaries and Intervals

Separate arithmetic mean, weighted mean, median, quantile, variance, standard
deviation, standard error, and confidence interval. Connect sampling,
measurement, probability, benchmark, and decision interpretation without
treating one average, error bar, denominator, or interval label as universal.

Status: first slice implemented as one canonical anchor and one Diagnostic
view. It gives the Sample Arithmetic Mean Formula view a canonical owner and
resolves median, weighted mean, and confidence interval while leaving
likelihood and broader statistical inference for later work.

## Batch gate

Each batch must:

- state the research question and bounded source basis;
- add connected canonical entries rather than an unreviewed vocabulary dump;
- separate senses, factors, alternatives, constraints, and failure signs;
- declare exactly one primary family for every specialized view;
- update deterministic projections through the reference tooling;
- close critical and major `.roles` findings;
- preserve a clean distinction between tested R4 content and new R5 content.

## Portfolio scaling gates

The full-panel review at `FACTOR-FORGE-PORTFOLIO-ROLE-REVIEW.md` adds these
continuation rules:

- unresolved candidates are admitted only for recurrence, graph centrality,
  reader demand, or a current batch need;
- raw unresolved count is not a growth target;
- new views choose their family by reader question and should broaden
  non-formula coverage where semantics justify it;
- a bounded typed-relation compatibility study begins before 50 canonical
  anchors or Workbench implementation;
- review coverage becomes machine-validated before 50 canonical anchors;
- candidate content requires qualified domain review before promotion;
- later R5 content remains outside the frozen Sieve evidence baseline.

## Scaling-safety slice

The bounded typed-relation and review-coverage prototype is complete at
`docs/research/2026-08-14-typed-relation-review-coverage.md`, with plan and
result review at `TYPED-RELATION-COMPATIBILITY-ROLE-REVIEW.md`. It keeps V0
unchanged and implements deterministic relation and assurance sidecars before
any V1 decision. The six-edge F1-F6 fixture passes directed queries,
referential integrity, canonical round trips, failure tests, and fixed-point
review. Assurance now covers all 33 V0 entries, 45 V0 views, and six admitted
relations with 84 exact source-digest bindings. FFP-008 is closed; broader
typed-relation coverage and a V1 decision remain open scaling gates.

## F1 first slice

The source-backed system-composition cluster now separates system, system
element, component, capability, boundary, environment, interface, and
dependency. Its linked Constraint Table makes membership, part-whole
semantics, capability conditions, interface contracts, and dependency
direction explicit.

Research concluded that V0 can preserve this slice through ordered senses,
factors, and a linked specialized view. Richer machine-queryable relation
payloads remain deferred behind a future versioned compatibility boundary.

Narrower F1 terms remain deferred until recurrence, reader demand, or a later
batch need justifies admission. F5 now provides canonical service and contract
custody without promoting subsystem or architecture automatically.

## F5 first slice

The software mechanism bridge now groups the nine admitted concepts into:

- `tables/entries/software-type-value-function.md`;
- `tables/entries/software-module-service-resource.md`;
- `tables/entries/software-transaction-message-contract.md`.

Each anchor owns one contextual Mapping view. The bridge separates types from
classes, modules from files, services from capabilities, resources from
representations, transactions from requests, messages from events, and
contracts from schemas. Research and fixed-point review are
`docs/research/2026-08-14-software-mechanism-bridge.md` and
`SOFTWARE-MECHANISM-BRIDGE-ROLE-REVIEW.md`.

The F5 relation payloads add concrete requirements to the typed-relation
compatibility study but do not change V0. Next: select the next R5 coverage
batch from repeated unresolved candidates and volume balance rather than
expanding the software vocabulary automatically.

## F6 first slice

The Governance Ledger at
`tables/entries/governance-obligation-compliance.md` separates governing
direction and oversight from management; obligation sources and applicability
from responsibility, rules, and controls; and evidence-scoped compliance from
effectiveness, ethics, safety, legitimacy, and good outcomes.

`tables/mappings/governance-compliance-mechanisms.md` maps charters, mandates,
requirements registers, policies, controls, decision and enforcement points,
assessments, attestations, findings, and remediation records without granting
them universal or many-to-one semantic identity. Research and fixed-point
review are `docs/research/2026-08-14-governance-ledger.md` and
`GOVERNANCE-LEDGER-ROLE-REVIEW.md`.

F6 closes seven unresolved declarations while adding no new unresolved terms.
V0 remains unchanged; obligation-source, obligation-control,
control-evidence, and finding-remediation edges remain inputs to the
typed-relation compatibility study. Next-batch selection remains governed by
recurrence, graph centrality, reader demand, and domain balance.

## F7 first slice

The Coordinated Work anchor at `tables/entries/coordinated-work.md` separates
workflow, coordinator-owned orchestration, participant choreography,
concurrency, and effect-aware compensation through completion, boundary,
ordering, authority, interaction, synchronization, commitment, and recovery
factors.

`tables/diagnostics/coordinated-work-failures.md` maps stalls, duplicated
effects, conflicting branches, completion disagreement, cancellation leakage,
and incomplete recovery to multiple candidate causes and discriminating tests.
Research and fixed-point review are
`docs/research/2026-08-15-coordinated-work.md` and
`COORDINATED-WORK-ROLE-REVIEW.md`.

F7 resolves the three lifecycle declarations for workflow, concurrency, and
compensation without adding unresolved vocabulary. The current Factor Forge
book delta was 17 records: eight entries and nine specialized views.

## F8 first slice

The Causal Reasoning anchor at `tables/entries/causal-reasoning.md` separates
association, causal effect, influence, mechanism, intervention, and actual-case
attribution through target contrast, design, assumptions, estimand, estimation,
pathway evidence, alternatives, transport, and case-specific factors.

`tables/evidence/causal-claim-evidence.md` audits six claim types without
computing an effect or assigning responsibility. Research and fixed-point
review are `docs/research/2026-08-15-causal-reasoning.md` and
`CAUSAL-REASONING-ROLE-REVIEW.md`.

F8 resolves `causal model` and `influence` without adding unresolved
vocabulary. The current Factor Forge book delta is 19 records: nine entries
and ten specialized views.

## F9 first slice

The Sampling and Generalization anchor at
`tables/entries/sampling-generalization.md` separates the population target,
operational frame, observed and analytic samples, estimand, estimator,
estimate, and source-to-target inference through selection, response,
transformation, uncertainty, error, heterogeneity, support, and provenance.

`tables/diagnostics/sampling-generalization-failures.md` maps coverage,
nonresponse, attrition, weighting instability, dependence, split leakage,
measurement, processing, and transport symptoms to candidate causes,
discriminating tests, and repair owners. Research and fixed-point review are
`docs/research/2026-08-15-sampling-generalization.md` and
`SAMPLING-GENERALIZATION-ROLE-REVIEW.md`.

F9 resolves the arithmetic-mean `sample` declaration without adding unresolved
vocabulary. The current Factor Forge book delta is 21 records: ten entries and
eleven specialized views.

## F10 first slice

The Stock, Flow, Balance, and Conservation anchor at
`tables/entries/stock-flow-balance.md` separates point-in-time amounts,
boundary and period changes, rates, net accumulation, reconciliation grammar,
and domain conservation constraints through property, boundary, interval,
unit, direction, gross/net, internal/external, residual, and authority factors.

`tables/diagnostics/stock-flow-balance-failures.md` maps nonclosure,
suspicious closure, amount-rate confusion, hidden gross flows, compartment
errors, slow drift, and residuals to candidate causes, discriminating tests,
and repair owners. The General Accounting Balance Formula view is reassigned
to the structural anchor. Research and fixed-point review are
`docs/research/2026-08-15-stock-flow-balance.md` and
`STOCK-FLOW-BALANCE-ROLE-REVIEW.md`.

F10 resolves `flow` and `conservation` in the general balance view without
adding unresolved vocabulary. The current Factor Forge book delta is 23
records: eleven entries and twelve specialized views.

## F11 first slice

The Measurement Quality anchor at `tables/entries/measurement-quality.md`
separates signed reference difference, estimated systematic error, accuracy,
trueness, replicate precision, instrument resolution, standards-based
calibration, and probability reliability through reference, conditions,
range, uncertainty, support, time, and fitness-for-use factors.

`tables/diagnostics/measurement-quality-failures.md` maps reference offsets,
replicate scatter, cosmetic digits, deployment drift, certificate misuse, and
forecast reliability failures to candidate causes, discriminating tests, and
repair owners. Research and fixed-point review are
`docs/research/2026-08-15-measurement-quality.md` and
`MEASUREMENT-QUALITY-ROLE-REVIEW.md`.

F11 resolves `calibration` in the probability-range view without adding
unresolved vocabulary. The current Factor Forge book delta is 25 records:
twelve entries and thirteen specialized views.

## F12 first slice

The Statistical Summary and Interval anchor at
`tables/entries/statistical-summary-interval.md` separates equal and weighted
centers, rank summaries, squared- and original-unit spread, estimator sampling
variability, and confidence-procedure coverage through analytic-set, weight,
denominator, dependence, method, unit, convention, and provenance factors.

`tables/diagnostics/statistical-summary-interval-failures.md` maps center
conflicts, tail sensitivity, weight instability, quantile drift, denominator
errors, pseudo-replication, narrow biased intervals, and interval-type collapse
to candidate causes, discriminating tests, and repair owners. Research and
fixed-point review are `docs/research/2026-08-15-statistical-summary-interval.md`
and `STATISTICAL-SUMMARY-INTERVAL-ROLE-REVIEW.md`.

F12 resolves the arithmetic-mean view owner plus `median`, `weighted mean`, and
`confidence interval` without adding unresolved vocabulary. The current Factor
Forge book delta is 27 records: thirteen entries and fourteen specialized views.

## F13 first slice

The Mathematical Relation and Solving anchor at
`tables/entries/mathematical-relation-solving.md` separates mathematical
functions, symbol roles, equations, identities, solutions, roots, derivatives,
iteration, and convergence through object, representation, domain,
quantification, transformation, method, start, stopping, error, and proof
factors.

`tables/diagnostics/mathematical-relation-solving-failures.md` maps domain and
notation drift, invalid identity claims, lost or extraneous solutions,
derivative failures, Newton instability, premature stopping, and unsupported
convergence rates to candidate causes, discriminating tests, and repair owners.
Research and fixed-point review are
`docs/research/2026-08-15-mathematical-relation-solving.md` and
`MATHEMATICAL-RELATION-SOLVING-ROLE-REVIEW.md`.

F13 assigns the two remaining unresolved Formula view owners and resolves
`derivative`, `root`, and `convergence` in Newton's Method. Specialized angle
and unit-circle vocabulary remains explicit graph debt. The current Factor
Forge book delta is 29 records: fourteen entries and fifteen specialized views.

## F14 first slice

The Geometric Reference Structure anchor at
`tables/entries/geometric-reference-structure.md` separates geometric objects,
points, curves, ordered paths, metric length, criterion-dependent shape,
angles, coordinate systems, reference frames, and the unit circle through
ambient-space, metric, parameterization, transformation, axes, frame, epoch,
uncertainty, and provenance factors.

`tables/diagnostics/geometric-reference-structure-failures.md` maps object and
representation confusion, path-length mismatch, shape-criterion drift,
degree/radian errors, CRS offsets, frame/epoch conflicts, and unit-circle
failures to candidate causes, discriminating tests, and repair owners.
Research and fixed-point review are
`docs/research/2026-08-15-geometric-reference-structure.md` and
`GEOMETRIC-REFERENCE-STRUCTURE-ROLE-REVIEW.md`.

F14 resolves `length`, `shape`, `path`, `frame of reference`, `angle`, and
`unit circle` across geometric measure, motion, and the Pythagorean identity.
The current Factor Forge book delta is 31 records: fifteen entries and sixteen
specialized views.

## F15 first slice

The Chemical Substance Classification anchor at
`tables/entries/chemical-substance-classification.md` separates element,
entity, species, substance, compound, formula unit, compound class, mixture,
and chemical solution through level, composition, charge, structure,
classification-criterion, constituent-role, quantity, authority, and
provenance factors.

`tables/diagnostics/chemical-substance-classification-failures.md` maps level
collapse, formula-unit confusion, unsupported identity, class-criterion drift,
mixture/solution ambiguity, and subtype explosion to discriminating checks.
Halide and sugar remain teaching examples rather than canonical sibling
taxonomies. Research and fixed-point review are
`docs/research/2026-08-15-chemical-substance-classification.md` and
`CHEMICAL-SUBSTANCE-CLASSIFICATION-ROLE-REVIEW.md`.

F15 resolves `mixture` in the amount/composition anchor and adds the Concept &
Taxonomy Boundary Editor so named-domain catalogs do not displace reusable
conceptual structure. The current Factor Forge book delta is 33 records:
sixteen entries and seventeen specialized views.

## F16 first slice

The Chemical Reaction anchor at
`tables/entries/chemical-reaction-stoichiometry-equilibrium.md` separates
reaction process, symbolic equation, reactant/product/intermediate roles,
signed stoichiometry, extent, rate, empirical rate law, dynamic equilibrium,
activity, catalyst, and evidence-qualified mechanism.

`tables/formulas/chemical-reaction-relations.md` owns extent, rate, activity
quotient, Gibbs-energy, and equilibrium relations under exact equation,
normalization, standard-state, and condition contracts.
`tables/diagnostics/chemical-reaction-failures.md` maps balance, rate,
equilibrium, catalysis, and mechanism overclaims to discriminating checks.
Research and fixed-point review are
`docs/research/2026-08-15-chemical-reaction-stoichiometry-equilibrium.md` and
`CHEMICAL-REACTION-STOICHIOMETRY-EQUILIBRIUM-ROLE-REVIEW.md`.

F16 resolves thermodynamic `activity` in the amount/composition anchor without
admitting named reaction or catalyst families. The current Factor Forge book
delta is 36 records: seventeen entries and nineteen specialized views.

## F17 first slice

The Thermodynamic System, State, and Phase anchor at
`tables/entries/thermodynamic-system-state-phase.md` begins with the selected
system, surroundings, boundary, and allowed transfers, then separates state
from process path, intensive from extensive scaling, equations of state from
universal identities, and phase criteria from familiar phase names.

`tables/diagnostics/thermodynamic-system-state-phase-failures.md` maps false
isolation, steady-state/equilibrium collapse, insufficient state variables,
invalid model scope, path erasure, appearance-based phase counts, and omitted
transition history to discriminating checks. Research and fixed-point review
are `docs/research/2026-08-15-thermodynamic-system-state-phase.md` and
`THERMODYNAMIC-SYSTEM-STATE-PHASE-ROLE-REVIEW.md`.

F17 resolves material `phase` and `thermodynamic system` in the thermal anchor
without conflating material phase with wave phase or lifecycle stage, and
without admitting named phase catalogs. The current Factor Forge book delta is
38 records: eighteen entries and twenty specialized views.

## F18 first slice

F18 deepens the existing `tables/entries/periodic-wave-quantity.md` authority
rather than creating a competing wave anchor. It adds oscillation, amplitude,
spectrum, phase velocity, and group velocity through reference, measure,
sampling, window, transform, normalization, spectral-axis, dispersion-branch,
bandwidth, distortion, and transport-target factors.

The revised `tables/formulas/periodic-wave-quantities.md` adds a scoped
sinusoidal oscillation, finite DFT pair, component phase velocity, and local
group-velocity derivative. The new
`tables/diagnostics/oscillation-spectrum-dispersion-failures.md` maps amplitude,
detrending, aliasing, transform, peak-interpretation, and propagation failures
to discriminating tests. Research and fixed-point review are
`docs/research/2026-08-15-oscillation-spectrum-dispersion.md` and
`OSCILLATION-SPECTRUM-DISPERSION-ROLE-REVIEW.md`.

F18 resolves all five remaining periodic-wave candidates without admitting
named bands, wave families, modes, or instruments as canonical senses. Because
the anchor and Formula view already belong to the base volume, the Factor Forge
book delta grows by only the new Diagnostic view to 39 records: eighteen
entries and twenty-one specialized views.

## F19 first slice

F19 deepens `tables/entries/electrical-quantity.md` across four descriptive
levels: local electric field, material resistivity, configuration capacitance,
and complex frequency-dependent impedance. It preserves their relations to
potential difference, specimen resistance, stored charge, current, power, and
energy without treating shared units or familiar circuit metaphors as identity.

The revised `tables/formulas/electrical-quantities.md` adds scoped field,
uniform-specimen resistivity, linear capacitance, and sinusoidal impedance
relations. The new
`tables/diagnostics/electrical-field-material-impedance-failures.md` maps
spatial, geometry, contact, material-state, charge/capacitance, complex-phase,
fixture, parasitic, and calibration-plane failures to discriminating tests.
Research and fixed-point review are
`docs/research/2026-08-15-electrical-field-material-impedance.md` and
`ELECTRICAL-FIELD-MATERIAL-IMPEDANCE-ROLE-REVIEW.md`.

F19 resolves all four remaining electrical candidates without admitting named
components, materials, bands, or circuit topologies as canonical senses. The
Factor Forge book delta grows only by the new Diagnostic view to 40 records:
eighteen entries and twenty-two specialized views.

## F20 first slice

F20 deepens `tables/entries/information-data-signal-noise.md` from semantic
content through representation mapping, conditional channel behavior,
statistical dependence, and constrained communication limits. It preserves
encoding direction and version, source and target spaces, decoder and loss,
channel law and state, admissible inputs, estimator and sample, logarithm base,
use clock, bandwidth, error criterion, and coding regime.

The revised `tables/formulas/information-signal-measures.md` adds discrete
mutual-information identities and a scoped discrete-memoryless-channel capacity
definition. The new
`tables/diagnostics/information-encoding-channel-failures.md` maps decoding,
semantic-collapse, channel-model, dependence, leakage, estimator, optimization,
throughput, and normalization failures to discriminating tests. Research and
fixed-point review are
`docs/research/2026-08-15-information-encoding-channel-capacity.md` and
`INFORMATION-ENCODING-CHANNEL-CAPACITY-ROLE-REVIEW.md`.

F20 resolves encoding, channel, mutual information, and channel capacity
without admitting named formats, codes, protocols, media, or channel families
as canonical senses. The Factor Forge book delta grows only by the new
Diagnostic view to 41 records: eighteen entries and twenty-three specialized
views.

## F21 first slice

F21 deepens `tables/entries/cost-price-value-return.md` across three monetary
contracts: authority-owned accounting recognition and measurement, aggregate
price-index change, and discounted aggregation of signed cash flows. It
preserves entity and reporting purpose, recognition trigger, index population,
basket, weights and vintage, interval, signed timing, currency and tax basis,
discount-rate source, nominal/real alignment, terminal treatment, uncertainty,
and sensitivity.

The revised `tables/formulas/cost-value-return.md` adds price-index change,
price-level conversion, and a scoped end-of-period NPV relation. The new
`tables/diagnostics/economic-basis-inflation-npv-failures.md` maps recognition,
basis-change, index, interval, spatial-level, conversion, cash-flow,
discounting, sensitivity, and decision-claim failures to discriminating tests.
Research and fixed-point review are
`docs/research/2026-08-15-economic-basis-inflation-npv.md` and
`ECONOMIC-BASIS-INFLATION-NPV-ROLE-REVIEW.md`.

F21 resolves accounting basis, inflation, and net present value without
admitting named standards, indexes, products, assets, or valuation methods as
canonical senses. The Factor Forge book delta grows only by the new Diagnostic
view to 42 records: eighteen entries and twenty-four specialized views.

## F22 first slice

F22 deepens `tables/entries/control-monitoring-response.md` across two linked
contracts: reference-command-actuation-process control and
service-SLI-target-window performance management. It separates objectives,
set points, observed values, thresholds, controller commands, actuator
influence, SLO targets, observed service levels, agreements, and wider outcomes.

The revised `tables/diagnostics/control-response-failures.md` adds set-point,
actuation, transient-response, SLI-coverage, compliance-replay, agreement, and
outcome-gap tests. Research and fixed-point review are
`docs/research/2026-08-15-control-target-actuation-service-objective.md` and
`CONTROL-TARGET-ACTUATION-SERVICE-OBJECTIVE-ROLE-REVIEW.md`.

F22 resolves set point, actuator, and service-level objective without admitting
named controller families, actuator types, monitoring products, or service
tiers as canonical senses. It deepens the existing Diagnostic and Task K route,
so the Factor Forge book delta remains 42 records: eighteen entries and
twenty-four specialized views.

## F23 first slice

F23 deepens `tables/entries/comparative-quantity.md` and
`tables/entries/amount-concentration-composition.md` around the shared
part-whole and mass/amount bridge. Fraction becomes the bounded member/whole
specialization of a ratio, with separate exhaustiveness, overlap, and remainder
contracts. Molar mass becomes the specified-material mass-per-amount quantity
that supports directed mass/amount and composition-basis transformations.

The two existing Formula views add partition closure, molar-mass relations,
mixture mean molar mass, and normalized mass/amount fraction conversions.
Research and fixed-point review are
`docs/research/2026-08-15-fraction-molar-mass-composition-basis.md` and
`FRACTION-MOLAR-MASS-COMPOSITION-BASIS-ROLE-REVIEW.md`.
The dedicated dimensional audit checks 31 relations with zero P1 errors.

F23 resolves fraction and molar mass without admitting named substances,
component catalogs, tabulation sources, or specialist molar-mass-average
families as canonical senses. It deepens current base-volume sources, so the
Factor Forge book delta remains 42 records: eighteen entries and twenty-four
specialized views.

## F24 first slice

F24 deepens `tables/entries/motion-measure.md`,
`tables/entries/matter-load-measure.md`, and
`tables/entries/work-energy-power.md` as one mechanics-and-continuum route.
Momentum is a system state distinct from velocity, force, impulse, and energy;
torque is a reference-dependent axial turning effect distinct from work;
stress maps surface orientation to traction; gravitational field is distinct
from the force on a test body; and local density is a resolution-scoped field
whose volume integral recovers mass.

Five existing Formula views now carry the corresponding momentum, impulse,
torque, traction, stress, field, and density relations. Research and
fixed-point review are
`docs/research/2026-08-15-momentum-torque-stress-field-density.md` and
`MOMENTUM-TORQUE-STRESS-FIELD-DENSITY-ROLE-REVIEW.md`. The dedicated
dimensional audit checks 60 relations with zero P1 errors.

F24 resolves momentum, torque, stress, gravitational field, and local density
without admitting named material, loading, field-model, or constitutive
families as canonical senses. It adds no record or chapter, so the Factor
Forge book delta remains 42 records: eighteen entries and twenty-four
specialized views.

## F25 first slice

F25 adds `tables/entries/quantity-value-unit-conversion.md` as the missing
representation layer between quantity selection and formula use. It separates
quantity value, numerical value, measurement unit, quantity dimension,
conversion factor, and unit conversion while making same quantity kind a
stronger gate than dimensional agreement alone.

The new `tables/mappings/unit-conversion.md` owns multiplicative, compound,
affine-point, interval, inverse, uncertainty, and rounding contracts. The
existing Temperature Scale Conversion becomes its worked specialist view.
Research and fixed-point review are
`docs/research/2026-08-15-quantity-value-unit-conversion.md` and
`QUANTITY-VALUE-UNIT-CONVERSION-ROLE-REVIEW.md`. The dimensional audit checks
46 equations with zero P1 errors.

F25 resolves unit conversion without admitting named units, unit systems,
historical conversion catalogs, ordinal scales, or logarithmic-level families
as canonical senses. The Factor Forge book delta grows to 44 records:
nineteen entries and twenty-five specialized views.

## F26 first slice

F26 deepens `tables/entries/probability-risk-uncertainty.md` with likelihood
function as the fixed-observation, variable-parameter reading of a declared
sampling model. It keeps event probability, qualitative likelihood assessment,
parameter probability, posterior distribution, model fit, evidence, and
decision roles separate.

The existing `tables/formulas/probability-risk-uncertainty.md` adds discrete
mass and continuous-density likelihood, observation contribution,
independent-product, relative-likelihood, relative-log-likelihood, and
maximum-likelihood relations. Research and fixed-point review are
`docs/research/2026-08-15-probability-likelihood-function.md` and
`PROBABILITY-LIKELIHOOD-FUNCTION-ROLE-REVIEW.md`. The dimensional audit checks
28 equations with zero P1 errors.

F26 resolves likelihood function without admitting named distributions,
estimators, tests, priors, or software implementations as canonical senses. It
deepens existing base-volume sources, so the Factor Forge book delta remains
44 records: nineteen entries and twenty-five specialized views.

## F27 Decision and Evidence Bridge

The reproducible current-reference closure stocktake finds 39 entries, 297
senses, 466 factors, 56 views, and 101 exact assurance bindings. All entries
belong to one editorial Markdown-link component, but the six reviewed typed
relations touch only twelve factors in six entries and contain no cross-entry
edge. Treating 140 editorial link pairs as symmetric semantics reaches all 39
entries within four hops and is rejected as nonselective.

F27 implements a bounded **Decision and Evidence Bridge**, not a
broad relation import. Research distinguishes rule-derived case decision from
choice among feasible alternatives under evidence, uncertainty,
consequence, value, and constraint. It may admit a new owner only if the full
choice contract cannot be represented by existing entries without duplicated
or contradictory authority. The first packet is limited to three to five
cross-entry relation candidates, one independently fail-able check per join,
negative and ambiguous fixtures, and one authored synthetic guide. Named
decision methods, risk frameworks, preference scales, optimization families,
and option catalogs remain outside the canonical core.

The existing-owner test required one new canonical
`choice-alternative-selection` entry and one Decision view. They distinguish
alternative status, partial alternative-state outcome maps, criteria,
preference, noncompensatory gates, recommendation, and authority-owned final
selection without copying evidence, causal, risk, value, or policy authority.
One synthetic Factor Guide retains current practice, a limited monitored
trial, and broad adoption; its five candidate join checks close as one pass,
one fail, and three unresolved outcomes, and final selection remains
`not-recorded`. The five relation candidates remain outside the canonical
sidecar and Composition Lab.

Stocktake, ownership research, contract, guide, and fixed-point review are
`docs/research/2026-08-16-reference-closure-stocktake.md` and
`docs/research/2026-08-16-choice-alternative-selection.md`,
`specs/DECISION-EVIDENCE-BRIDGE.md`,
`guides/evidence-informed-intervention-choice.md`, and
`CHOICE-ALTERNATIVE-SELECTION-ROLE-REVIEW.md`. The current corpus has 40
entries, 304 senses, 479 factors, 57 views, and 103 exact assurance bindings.

## F28 relation-kind grammar slice

F28 makes the five F27 bridge verbs parser-visible with exact, lexically
ordered qualifier contracts while keeping parser acceptance separate from
canonical record admission. One external fixture covers all five kinds; five
invalid fixtures cover missing, extra, duplicate, unordered, and
inverse-looking forms. A combined validation fixture resolves all endpoints
against the current 40-entry corpus.

The canonical relation sidecar remains byte-identical at six records and
SHA-256
`4c4bf8c68985c341d3ee20d2731c70038afb0c5787cbe16126928d9896ddd4df`.
No candidate kind becomes a Composition Lab edge, assurance artifact, or
closure permission. Exact records can be considered individually in a later
batch after relation-specific loss, negative behavior, assurance, and
traversal review.

## F29 first cross-entry relation

F29 admits only `f27-evidence-qualifies-evaluation`, connecting Claim/Evidence
supporting-and-contradicting implications to Choice evidence quality,
applicability, and uncertainty under the Alternative Selection Decision view.
The complete claim, population, outcome, horizon, provenance, and limitation
qualifier contract is mandatory. The edge carries no evidence artifact,
support direction, truth, sufficiency, causal status, local binding, or
recommendation, and it has no implied inverse.

The new canonical Composition Query reaches the three exact source, target,
and scope nodes but remains `incomplete` because evidence applicability is
unresolved. A relation-specific wrong-predecessor fixture fails closed. The
canonical sidecar now has seven reviewed relations with one cross-entry edge;
assurance has 104 exact bindings. A separately hashed six-ID F1-F6 allowlist
keeps the new relation out of the interactive Composition Lab pending a later
reader-facing design review. The other four F27 bridge relations remain
candidate-only.

## F30 Decision/Evidence reading route

F30 completes the reader-facing design review without adding another relation
or changing the Lab. The existing Evidence-Informed Intervention Choice Guide
now begins its cross-entry analysis with an exact five-stage reading route over
`f27-evidence-qualifies-evaluation`. Add names the Claim/Evidence source;
Multiply names the relation, Choice target, and Decision scope; Evaluate keeps
applicability `unresolved`; Stop keeps the closure `incomplete`; and Flatten
retains all three declared losses.

The proof home and read-only Composition Explorer now expose six exact traces
and two incomplete examples. The new problem card links only to the book guide
and states that Compose is unavailable. The interactive payload remains five
authored starters over the separate six-ID F1-F6 allowlist. The route adds no
local binding, evidence applicability, support, causal status, ranking,
recommendation validity, or final selection.

## F31 constraint-to-feasibility relation

F31 admits only `f27-constraint-filters-feasibility`, connecting the exact
Policy/Rule constraints-and-invariants factor to Choice feasibility,
constraints, and exclusion rationale under the Alternative Selection Decision
view. Authority, version, effective period, applicability, and hard/soft
status are mandatory declarative qualifiers. The edge carries no full policy,
rule, exception, enforcement, local binding, satisfaction result, option
status, exclusion, ranking, or recommendation, and it has no implied inverse.

The canonical three-node query remains `incomplete` because constraint
applicability and alternative satisfaction are unresolved. The guide adds a
separate book route and preserves its local pass only for the authored limited
trial; broad adoption remains unresolved. The canonical sidecar now has eight
relations, including two cross-entry edges, with 105 exact assurance bindings.
The interactive Lab remains on its separate six-ID F1-F6 allowlist, and the
other three F27 bridge relations remain candidate-only.

## F32 causal-scope-to-outcome relation

F32 admits only `f27-causal-scope-qualifies-outcome`, connecting Causal
Reasoning's outcome-measure-and-time-horizon factor to Choice's
alternative-state outcomes and consequences under the Alternative Selection
Decision view. Causal status, contrast, horizon, outcome, and population are
mandatory declarative qualifiers. The edge carries no causal design,
identification result, estimate, uncertainty, transport judgment, local
binding, effect size, benefit, harm, ranking, or recommendation.

The canonical three-node query remains `incomplete` with its causal-scope
check `unresolved`; a wrong-predecessor fixture fails closed. The guide adds a
separate book route while preserving the local `fail` for `SYN-02` because
shadow-mode association is not an intervention effect. The canonical sidecar
now has nine relations, including three cross-entry edges, with 106 exact
assurance bindings. The Lab remains on F1-F6, and the risk/consequence and
value/criterion F27 relations remain candidate-only.

## F33 risk-to-consequence relation

F33 admits only `f27-risk-characterizes-consequence`, connecting the
Probability/Risk/Uncertainty consequence-set factor to Choice alternative-
state outcomes and consequences under the Alternative Selection Decision
view. Affected entity, consequence basis, control state, horizon, and scenario
are mandatory declarative qualifiers. The edge carries no probability,
expected loss, controls, risk attitude, affected-party trade-off, local
binding, decision weight, ranking, or recommendation.

The canonical three-node query remains `incomplete` with consequence alignment
`unresolved`; a wrong-predecessor fixture fails closed. The guide adds a
separate book route and retains its local unresolved record because additional
escalations lack a complete benefit, burden, and affected-party consequence
basis. The canonical sidecar now has ten relations, including four cross-entry
edges, with 107 exact assurance bindings. The Lab remains on F1-F6, and only
the value-to-criterion F27 relation remains candidate-only.

## F34 value-to-criterion relation and packet closure

F34 admits `f27-value-contributes-criterion`, connecting the exact requested
Cost/Price/Value/Return sense to Choice criterion definitions, measurement
bases, and directions under the Alternative Selection Decision view. Basis,
desired direction, horizon, owner, unit or scale, and value sense are mandatory
declarative qualifiers. The edge carries no full value artifact, mapping,
comparability result, normalization, preference, weight, aggregation rule,
utility, objective, ranking, or recommendation.

The canonical three-node query remains `incomplete` with value-basis review
`unresolved`; a wrong-predecessor fixture fails closed. The guide adds a fifth
book route and retains its local unresolved record because incomplete cost
ranges supply neither utility nor a common preference scale. The canonical
sidecar now has eleven relations, including five cross-entry edges, with 108
exact assurance bindings. All five bounded F27 packet records are admitted,
while the Lab remains on F1-F6. Packet closure is not ontology completeness or
permission for unreviewed relation expansion.

## F35 combined Decision bridge closure

F35 adds no relation and changes no sidecar identity. It publishes one
canonical multi-relation query over all five admitted F27 edges. Five explicit
source seeds join four deduplicated Choice targets and one Decision scope in a
ten-node graph; causal scope and risk consequence share one alternative-
outcome node while both edge identities remain explicit. All five canonical
checks remain `unresolved`, closure remains `incomplete`, and ten projection
rows retain exact loss.

The existing V0 grammar is sufficient: one node origin records one valid
discovery path, while the complete edge set retains all admitted traversals.
A negative fixture removes the shared target and fails closed. The combined
trace imports none of the guide's local outcomes, changes no Lab allowlist,
adds no homepage trace or Compose starter, and establishes no sufficiency,
ranking, recommendation, final selection, or ontology-completeness claim.

## F37 system architecture and description

F37 resolves the System Composition entry's `architecture` and `subsystem`
candidates through an existing-owner test. `Architecture` and
`architecture-description` become separate canonical senses: the former owns
fundamental concepts/properties and organizing principles of an entity in its
environment; the latter owns the versioned work product expressing an
architecture for declared stakeholders, concerns, viewpoints, and uses.
`Subsystem` does not become a sense or subtype. It is a contextual role formed
when an already identified system is treated as an element or component of a
containing-system view.

The entry adds four factors for stakeholder concerns/decision use,
fundamental concepts/properties/principles, description viewpoints/views/model
kinds, and assumptions/decisions/rationale/consistency/version. The existing
Constraint view adds five fail-able rules for subsystem role, architecture
claim, description identity, viewpoint/view coverage, and cross-view
consistency. ISO/IEC/IEEE 42010:2022, NIST SP 800-160-derived terminology,
ISO/IEC/IEEE 42030:2019, and NASA systems-engineering material bound the
source claims. Named styles, frameworks, languages, methods, tools, domains,
evaluations, and conformance results remain outside the canonical slice.

The corpus remains 40 entries and 57 views while growing to 306 senses and 483
factors. Exact assurance remains 108 bindings. The unresolved catalog drops
from nine terms to seven, and the Factor Forge book delta remains 46 records.
Reference SHA-256 is
`108f2d424d8cb3ac4145ca2727fcbd2fa1b43067d81a462506616ad6110f13ae`;
assurance SHA-256 is
`11a17d3077bd32be242a256e64cec2096a3edc8ab90d3fbfa3d9d4d4c3b4b7db`.

## F38-F50 bounded content campaign

F38-F42 close the seven remaining generated candidates through existing
owners: namespace under Identity/Naming; position, competency, and ownership
custody under Organization/Role; appeal under Policy/Decision; and coercion
and operative validity under Force polysemy. F43-F50 then fill six independent
anchor gaps and deepen two existing owners: model/simulation;
requirement/verification/validation; dependability; temporal organization;
data/record/schema structure; access authorization; planned work; and
assurance/conformity assessment.

The owner test rejects duplicate Data/Record and Plan/Task anchors because
Information/Data and Coordinated Work already own their decisive pivots. Each
F43-F50 slice receives one specialized view. All content remains candidate,
named methods and member catalogs remain examples only, and no typed relation
or Composition Lab expansion is authorized. Source and role plans are
`docs/research/2026-08-16-f38-f50-content-ownership.md` and
`F38-F50-CONTENT-CAMPAIGN-ROLE-REVIEW.md`.

The completed campaign contains 46 entries, 351 senses, 542 factors, and 65
views. Eleven relations remain unchanged. Exact assurance grows to 122
bindings. The generated unresolved catalog is empty. The Factor Forge delta is
60 records—26 entries and 34 views—and its 33 synthetic rehearsal tasks cover
every delta path. Reference SHA-256 is
`4ff6d4a6b2a5c3587212e5e5d6d5e0526d7700177d1eeceb374e0706a092394f`;
assurance SHA-256 is
`857f653bc0acd34b5edda94d129ef15d7125d0e50eddbbbfba167c6f9e6defe3`.

The regenerated 176-source `sim-29` edition has 146 searchable destinations,
fourteen chapters, and 192 site pages with zero missing targets. Its site
identity is
`5cafd894665ef8e353e605002790c9686c3f2653689c2ffad3ace482884f25b5`
and standalone SHA-256 is
`4242883425693c4734cc6347fdda9d6d286af84054eaaae12d0654c647fa627e`.
All Rust tests, Clippy, reference/sidecar, canonical/adversarial query, source,
task coverage, search, local and generated composition, link, roles, browser,
and diff checks pass.

## F51-F100 factoring and evaluation campaign

The next fifty Factor Forge phases are organized into five ten-phase batches,
each with a separate `.roles` plan and result review. F51-F60 makes factoring
mode and combination contracts explicit; F61-F70 supplies evaluation grammar;
F71-F80 adds scenario and operational closure; F81-F90 adds interaction and
operating-condition material; F91-F100 proves bounded composition and one
candidate Book One route. Phase numbers are execution custody, not an entry
quota or publication evidence.

The permanent `.roles` organization now includes a Product Owner. This role
requires every batch to improve a recognizable reader job, justify added
navigation and maintenance cost, keep software subordinate to the book, state
the available evidence level, and issue a continue/merge/defer/stop portfolio
decision. The detailed campaign plan is
`docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md`; the first
batch review is `F51-F60-FACTORING-GRAMMAR-ROLE-REVIEW.md`.

## F51-F60 factoring grammar

F51-F60 add one Decomposition Modes and Combination Contracts anchor plus nine
distinct views for interaction validity, contribution reconciliation,
hierarchy/granularity, ordered paths, mechanism evidence, uncertainty sources,
perspective projection, basis transformation, and factor-status/completeness
evidence. The owner test rejects nine extra anchors. The Product Owner decision
is continue to F61-F70 because the batch makes the pre-evaluation job—deciding
how factors combine and what remains unknown—materially more explicit.

The fixed point contains 47 entries, 361 senses, 556 factors, 74 views, and 132
assurance bindings at reference SHA-256
`a2934766eecde6dd8fd8139a0929888cc1ea497c2bdfe1328e0ef9dadf80fc9a`
and assurance SHA-256
`0ce7dd65f1ede28c2b86ab0a2be18c60f988c89a14db2ff35f96f45a4010678c`.
The relation sidecar remains eleven records. The 70-record Factor Forge delta
and 38 tasks produce a 148-record book with 156 searchable destinations,
fifteen chapters, 203 pages, and zero missing targets. Internal checks establish
structure and mechanics only, not reader value or publication readiness.
