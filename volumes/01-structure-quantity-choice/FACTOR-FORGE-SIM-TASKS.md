# Factor Forge Simulation Tasks

Status: neutral internal `sim-03` prompts; not participant observations

Use these prompts to rehearse coverage of the 19-record Factor Forge
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

## Task K - Alert without response

A dashboard crosses a threshold and sends an alert. The alert is acknowledged,
but no person owns a decision, no intervention occurs, and the undesirable
state continues.

Determine which parts are monitoring, indicator, threshold, alert, control,
intervention, feedback, and outcome. Use the diagnostic view to locate the
likely failure stages without claiming that the symptom proves one cause.

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

## Rehearsal boundary

The ten prompts collectively exercise every entry and specialized view in the
current Factor Forge delta. Route coverage is checked mechanically against the
author-only rubric; successful reader use is not simulated.
