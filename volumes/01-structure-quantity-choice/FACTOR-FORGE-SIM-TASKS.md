# Factor Forge Simulation Tasks

Status: neutral internal `sim-03` prompts; not participant observations

Use these prompts to rehearse coverage of the 60-record Factor Forge
supplement. Do not consult the author-only rubric while walking a route. Record
only artifact-level `SIM3-*` notes: plausible first title, headings followed,
available distinctions, alternate landings, and missing or broken material.

Do not invent task timing, difficulty, completion, quotes, preferences,
application success, accessibility outcomes, or return use.

## Task H - Whole, component, capability, or dependency

A service diagram contains a payment API, an external identity provider, a
fraud-checking ability, an HTTP boundary, and arrows in both directions. The
diagram labels every item a "component."

Use Factorium to identify which distinctions must be recovered before the
diagram can support a dependency review. State what must be recorded for a
directional dependency and what would make the selected system boundary stale.

## Task I - Responsible but not authorized

An operations team is responsible for service reliability and answerable for
incidents, but only a release manager may stop a deployment. During an absence,
an engineer is told informally to approve emergency changes.

Separate responsibility, authority, accountability, delegation, and technical
action traceability. Identify what an organizational assignment record must
preserve before the emergency approval can be treated as legitimate.

## Task J - From observation to claim

A monitoring system records a sensor signal, applies a correction, calculates
a daily summary, and a report concludes that the process improved. The report
stores only the final chart.

Use the reference to reconstruct the distinct stages that should remain
traceable. Identify where measurement, result, inference, claim implication,
limitation, confidence, and provenance belong without treating them as one
evidence field.

## Task K - Targets without response

A service dashboard crosses an alert threshold. Its SLO remains green because
the affected requests are excluded from the indicator. A controller then
changes a set point and acknowledges its command, but the actuator is saturated,
the controlled value does not move, no person owns an intervention, and the
undesirable user outcome continues.

Determine which parts are objective, set point, observed value, indicator,
SLO, threshold, alert, controller, actuator, intervention, feedback, agreement,
and outcome. Use the diagnostic view to locate discriminating tests without
claiming that a green status, acknowledgment, or symptom proves one cause.

## Task L - Compliant but ineffective

An organization passes an audit because required control records exist. The
same harmful incidents continue, and an exception has no expiry date.

Separate governance, obligation, compliance, evidence existence, enforcement,
effectiveness, ethics, safety, and outcome. Identify the authority, scope,
version, assessment, exception, remediation, and effectiveness records that
must not collapse into the audit result.

## Task M - Program construct pile

An implementation note calls a Rust struct, one JSON instance, and a validation
function "the type."

Separate type, value, and function, then use the program-construct Mapping view
to identify contextual Rust, Haskell, or relational mechanisms and explicit
non-equivalences.

## Task N - Architecture subject pile

A deployment inventory calls a source module, a reachable HTTP service, a
resource URL, a Kubernetes manifest, and the running managed object all
"services."

Separate module, service, resource, representation, and platform object. Use
the architecture Mapping view without letting a file, endpoint, deployment,
manifest, or target-platform object become the general definition.

## Task O - Interaction obligation pile

An API review calls a request message, a database transaction, an OpenAPI
schema, and a set of behavioral obligations "the contract."

Separate transaction, message, and contract, then use the interaction Mapping
view to state what each candidate mechanism preserves and what it does not
prove about acknowledgment, commit, business completion, or compatibility.

## Task P - Paid, timed out, retried, and cancelled

A purchase instance times out after the payment participant accepts a charge.
The coordinator retries, fulfillment sees two requests, cancellation stops the
local workflow, and the customer still has one charge and one notification.

Separate the workflow, its coordinator-owned orchestration, and the
cross-participant choreography. Identify concurrency and correlation questions,
then distinguish retry, idempotency, cancellation, rollback, compensation, and
forward repair. Use the diagnostic without treating one participant's state or
acknowledgment as proof of end-to-end completion.

## Task Q - The feature that predicted the incident

A model finds that deployments strongly predict service incidents. A report
says deployments cause incidents, identifies configuration change as the
mechanism, and attributes yesterday's outage to one release. The release
preceded the outage, but traffic, a shared dependency, and missing telemetry
also changed.

Separate association, prediction, causal effect, influence, mechanism,
intervention, and actual-case attribution. Use the Evidence view to state the
target contrast, design, assumptions, alternatives, missing evidence, and
scope required before strengthening each claim. Do not turn population
evidence into automatic blame for the incident.

## Task R - The representative benchmark

A benchmark reports 98% accuracy on a large random test split and calls the
result representative of production. Duplicate identities and templates occur
across the split, the corpus excludes one decision-critical environment, and
preprocessing was fitted before splitting. The deployed population has also
shifted since corpus collection.

Separate the target population, corpus frame, observed and analytic samples,
estimand, estimator, estimate, and uncertainty. Use the Diagnostic view to
audit leakage, exclusions, stage denominators, dependence, source-target
differences, support, and time/version drift. Replace `representative` with the
exact performance result, target, criterion, and evidence.

## Task S - The warehouse that balances

A warehouse dashboard shows the same opening and closing inventory, so the
report calls operations inactive and the balance proven. In fact, large
receipts and shipments cancelled in the net value, one transfer between two
internal locations was counted twice, and a final unexplained adjustment made
the spreadsheet close.

Separate stock, gross flows, net flow, accumulation, balance, steady state,
and conservation. Use the Diagnostic view to freeze property, boundary,
compartments, interval, units, signs, consolidation, residual, and uncertainty.
Identify what independent evidence would distinguish a legitimate correction
from an omitted transfer or measurement error.

## Task T - Precise, calibrated, and still wrong

A sensor repeats within `0.01` units and displays three decimal places. Its
certificate covers a narrower range and cooler environment than deployment,
and comparison with a current reference shows a stable offset. A separate
model score is called a calibrated probability because it lies in `[0,1]`,
but outcome frequencies have never been checked.

Separate measurement error, bias, accuracy, trueness, precision, resolution,
measurement uncertainty, metrological calibration, adjustment, verification,
and probability calibration. Use the Diagnostic view to identify the
references, conditions, range, replicate design, support, uncertainty, and
fitness-for-use tests required before either `calibrated` claim is accepted.

## Task U - The average with a tiny error bar

A dashboard reports an “average” response time of 120 ms with `SD = 2 ms` and
a 95% error bar. Most requests are near 70 ms, a few retries exceed 2 seconds,
enterprise customers were upweighted with undocumented weights, and thousands
of requests came from only twelve clustered sessions. Another tool reports a
different 90th percentile.

Separate arithmetic mean, weighted mean, median, quantile, variance, standard
deviation, standard error, and confidence interval. Use the Diagnostic view to
audit the analytic set, units, weights, quantile convention, independent
sampling units, estimator, interval target, procedure, assumptions, and
practical decision threshold before interpreting the average or error bar.

## Task V - The solver says it converged

A program rewrites `sqrt(x^2) = x`, calls it an identity, and uses Newton's
method to solve a related equation. It starts from an undocumented value,
stops when one update is tiny, and reports the final iterate as the unique
exact root. The derivative is nearly zero near one iterate, another valid root
exists, and the real-domain sign restriction was lost during rewriting.

Separate mathematical function, variable, equation, identity, solution, root,
derivative, iteration, and convergence. Use the Diagnostic view to audit the
domain, symbol roles, transformation implications, complete solution target,
initial state, derivative conditions, arithmetic, residual, stopping reason,
error status, basin, and convergence evidence before accepting the result.

## Task W - The map says the object moved

Two systems report different coordinate tuples for the same surveyed point,
so a dashboard claims the object moved. One layer uses longitude-latitude axis
order, another reverses it, their datums and epochs differ, and one transform
is a lossy projection. A simplified closed path is also shorter than the raw
route, while a shape matcher silently removes scale and reflection.

Separate geometric object, point, curve, path, length, shape, angle,
coordinate system, reference frame, and unit circle. Use the Diagnostic view
to freeze the metric, units, raw traversal, equivalence rule, axes, datum/frame,
epoch, transformation direction and loss, residuals, and physical-motion
evidence before accepting any identity, shape, distance, or motion claim.

## Task X - The formula names a family

A learning page treats `molecule`, `compound`, and `substance` as synonyms.
It then promotes halogen, halide, chloride, oxide, sugar, and every neighboring
named family into canonical sibling concepts. A lab result labeled `chloride`
does not state whether it means free ion, analyte basis, or compound, while a
food label treats carbohydrate, sugar, total sugars, and added sugars as one class.

Separate chemical entity, species, substance, compound, formula unit, compound
class, classification criterion, mixture, and chemical solution. Use halide and
sugar only as swappable teaching examples. Apply the Diagnostic view to audit
level, composition, charge, structure, constituent and reporting basis, class
criterion, authority, and the stopping boundary before admitting canonical senses.

## Task Y - Balanced, fast, and supposedly at equilibrium

A dashboard shows a balanced reaction equation, copies its coefficients into a
rate law, and calls the proposed single-step mechanism proven. Species rates
differ by constant factors, volume changes during the run, and a plateau is
called equilibrium without a perturbation test. After adding a material, the
plateau is reached sooner, so the report claims the catalyst changed the
equilibrium constant.

Separate reaction, equation, reactant/product/intermediate roles,
stoichiometric numbers, extent, species and reaction rates, rate law,
equilibrium, activity, catalyst, and mechanism. Use the Formula and Diagnostic
views to audit direction, equation scale, units, normalization, standard states,
conditions, alternative mechanisms, and evidence before accepting any claim.

## Task Z - Closed, steady, and called one phase

A sealed vessel is called isolated because its lid is closed, even though it
loses heat and is sampled during the run. Pressure and temperature reach a
plateau, so the report calls the contents equilibrium and one phase by visual
appearance. Heating and cooling produce different transition points. Two runs
reach the same endpoint states by different paths, yet their heat and work
records differ and the report calls one record impossible.

Separate thermodynamic system, surroundings, boundary, open, closed, and
isolated systems; state, state variables, equation of state, process, and path;
and phase from phase transition. Use the Diagnostic view to audit allowed
transfers, equilibrium versus steady or transient scope, property sufficiency,
intensive/extensive scaling, model validity, phase inventory, coexistence,
metastability, hysteresis, kinetics, conditions, and uncertainty before
accepting the labels or rejecting the path-dependent records.

## Task AA - One peak, three amplitudes, and the speed of information

Three analysts report different amplitudes for the same retained waveform:
one uses peak excursion from zero, one root-mean-square after detrending, and
one a windowed spectral component. Their spectra use different record lengths,
windows, normalizations, and one- versus two-sided conventions. A peak that
moves when sampling changes is called a natural mode and causal source. In a
dispersive medium, a broadband pulse reshapes, yet its peak arrival is reported
as phase velocity, group velocity, energy velocity, and information speed.

Separate oscillation, amplitude, waveform, spectrum, phase velocity, and group
velocity. Use the Formula and Diagnostic views to freeze the baseline,
amplitude measure, sampling, window, transform, normalization, axes,
resolution, medium, mode, dispersion branch, bandwidth, distortion, and
transport target before comparing values or accepting physical claims.

## Task AB - Same ohms, different electrical story

A report divides a voltage by distance and calls the result the electric field
everywhere. Two specimens of the same material have different resistance, so
their resistivities are declared different without accounting for length,
area, contacts, direction, or temperature. Stored charge changes and is
reported as changed capacitance. At one AC frequency, two devices have the
same impedance magnitude but opposite phase, yet both are replaced by the same
DC resistance. Moving the measurement fixture changes the result.

Separate electric field, potential difference, resistivity, resistance,
capacitance, charge, impedance, and impedance magnitude. Use the Formula and
Diagnostic views to freeze spatial model, geometry, material state, conductor
configuration, terminals, frequency, phasor convention, equivalent model,
fixture, calibration plane, parasitics, and uncertainty before comparing values.

## Task AC - Same bytes, shared dependence, and a claimed capacity

Two systems exchange identical byte strings but decode them under different
versions and assign different meanings. A report names the cable and protocol
as the channel without declaring input-output variables or transition behavior.
Mutual information estimated after adaptive feature construction is called
shared meaning and causal influence. The value for one convenient input
distribution is labeled channel capacity, then compared directly with payload
throughput in bits per second and spectral efficiency in bits per second per
hertz.

Separate encoding, interpretation, channel model, mutual information, channel
capacity, and achieved rate. Use the Formula and Diagnostic views to freeze
source and target spaces, mapping direction and version, decoder and loss,
channel law and state, joint model, sample and estimator, admissible inputs,
constraints, logarithm base, use clock, bandwidth, error criterion, coding
regime, overhead, and uncertainty before accepting any equality or claim.

## Task AD - Same dollars, different economic basis

A service is performed in December and paid in January. One report records it
when earned and another when cash arrives, then calls the difference an error.
The price of one frequently purchased item rises sharply and is reported as
the inflation rate for everyone. Two analysts compare index levels from
different regional series as costs of living. A project has positive total
undiscounted cash flow, but its NPV changes sign when timing, inflation basis,
discount rate, and terminal value change; the positive case is called certain
profit and mandatory approval.

Separate accounting basis, cash movement, price, inflation, index level,
present value, net present value, profit, and decision. Use the Formula and
Diagnostic views to freeze authority, reporting purpose, recognition and
measurement rules, index series and vintage, population, basket, weights,
interval, seasonal treatment, signed flow timing, valuation date, discount
rate, nominal/real and tax basis, horizon, terminal value, uncertainty, and
sensitivity before reconciling the results.

## Task AE - Same quantity, different number

A report converts `2.4 m^2` to square centimetres using the unsquared length
factor. Another converts `90 km/h` by changing kilometres to metres but leaves
hours unchanged. A Celsius point temperature and a temperature interval both
receive the `273.15` offset. A torque is converted into an energy record because
both use newton metres. Finally, an exact unit factor produces twelve reported
digits from a coarsely rounded measurement, and the converted result is called
more accurate and physically valid.

Separate quantity value, numerical value, measurement unit, quantity
dimension, conversion factor, and unit conversion. Use the Mapping view to
freeze quantity kind, source and target unit authorities, direction,
compound-unit powers, point-versus-interval sense, factor exactness,
uncertainty, inverse domain, and rounding before accepting the conversions or
their quality claims.

## Task AF - The score chose broad adoption

A team compares current practice, a limited monitored trial, and broad
adoption of an escalation intervention. A retrospective shadow record covers
one group and has missing follow-up. A spreadsheet treats earlier notification
as proven benefit, converts incomplete cost ranges and qualitative burden into
one score, drops current practice, treats a soft preference as a hard
constraint, and copies the highest-ranked alternative into the final-decision
field.

Separate choice from rule-derived decision; candidate from feasible,
excluded, and unresolved alternative; alternative from state and outcome;
objective from criterion; constraint from preference; evidence from causal
effect; probability from utility; and recommendation from final selection.
Use the Decision view to retain missing and contested outcome cells, exact
measurement bases, noncompensatory gates, sensitivity, ties, authority, and
reconsideration triggers without inventing a universal score.

## Task AG - The model passed, so reality must agree

Two teams use the same equations but different discretization, solver,
tolerance, seed, and input versions. One run matches a calibration dataset and
is declared validated for every operating regime.

Separate subject, model, representation, implementation, simulation, run, and
result. Localize disagreement and state what verification, validation,
sensitivity, uncertainty, and reproducibility records are still required.

## Task AH - Verified, validated, and accepted

A product passes one test, so a dashboard marks every requirement verified,
the complete specification valid, and every intended use accepted.

Separate stakeholder need, requirement, specification, verification,
validation, test method, nonconformity, exception, and acceptance authority.
Use the Evidence view to bind each conclusion to exact versions and scope.

## Task AI - Five nines and no recovery

Component request success is high, but a shared dependency causes a long user
outage. Restoration meets the time target while losing more data than allowed;
the service is still called resilient because it has redundant instances.

Separate reliability, availability, maintainability, resilience, recovery,
failure, SLO, dependency, recovery-time, and recovery-data objectives. Use the
Diagnostic view to test the claim at the service boundary.

## Task AJ - One time field

A record stores local date-times without zones, mixes seconds with calendar
months, treats an end date as sometimes inclusive, copies a forecast into a
contractual deadline, and gives a milestone three days of work.

Separate instant, duration, interval, deadline, schedule, milestone, calendar,
timezone, and authority. Use the Mapping view to propose a loss-aware record.

## Task AK - Same field names, same meaning

Two systems have `owner`, `status`, and `time` fields with matching storage
types. One means legal title, one means steward; one status is lifecycle state,
the other an event; one time is an instant, the other a duration.

Separate data, record, schema, field, value, identity, and interpretation. Use
the Data Structure Mapping to state the version, cardinality, missingness,
unit/reference, provenance, and declared loss needed for migration.

## Task AL - Logged in means allowed

A user authenticates successfully, inherits a stale group grant, and requests
an operation on an aliased resource. The policy lookup times out, the system
allows access, and the audit log records only the username.

Separate authentication evidence, permission, entitlement, authorization
decision, enforcement, access event, organizational authority, and resource
identity. Apply the Constraint view to revocation, indeterminate handling, and
request-decision-enforcement correlation.

## Task AM - Certified means safe forever

A vendor shows an expired certificate and an accreditation logo. A buyer
concludes that the product is secure, legally compliant, effective, and
continuously monitored, without checking scheme, subject, scope, version,
issuer, findings, surveillance, or status.

Separate assurance, assessment, audit, attestation, certification,
accreditation, conformity, and effectiveness. Use the Evidence view to bound
the exact supported claim and reject broader conclusions.

## Task AN - The date list is the plan

A project lists tasks and promised dates but omits completion evidence,
dependencies, resource contention, assumptions, baseline history, and change
authority. Actual dates overwrite the original plan, and every dated item is
called a milestone.

Separate plan, task, work milestone, workflow, schedule, resource, baseline,
forecast, actual event, and outcome. Use the Planned Work Procedure to produce
a reviewable course without treating the plan as prediction.

## Rehearsal boundary

The thirty-three prompts collectively exercise every entry and specialized view in the
current Factor Forge delta. Route coverage is checked mechanically against the
author-only rubric; successful reader use is not simulated.
