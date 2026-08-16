# Authored Composition Starters Simulation Contract

Status: `sim-22` edition-local navigation and explicit-control convenience;
not prose inference, a canonical query, persistence, recommendation, or reader
evidence

## Purpose

Five reviewed Composition Query traces already demonstrate complete,
incomplete, contradictory, and truncated structural patterns. Authored starters
let a reader load those exact starting configurations into the bounded
Composition Lab, inspect the controls, alter them, and run a new local closure.
They connect problem-led reading to composition without making problem prose a
semantic selector.

## Exact derivation

The renderer emits one starter for each of the five exact trace files. A
starter repeats the trace ID, problem, context, direction, finite depth/edge/
node budgets, seeds, reviewed state, SHA-256, and Factor Guide destination.
Its relation allowlist is the union of admitted `edge` records and relation IDs
in strict `*-budget-before-<relation-id>` frontier reasons. Its exclusions are
the exact artifact fields in conflict records.

The proof edition may contain additional read-only canonical traces. F30
publishes the Decision/Evidence trace as the sixth problem-led and Explorer
route, but it remains outside this five-record starter payload because its
relation is not in the Composition Lab allowlist.

Generation fails closed on an unknown or duplicate ID, malformed context,
unknown seed/relation/exclusion, frontier reason without an exact reviewed
relation, guide mismatch, source digest drift, or coverage other than five
starters and all four trace states. Starter order follows the fixed worked-trace
order; it is presentation order, not ranking.

## Interaction

The Compose page presents five visible starter cards. Each names the worked
trace state and links to its full Factor Guide. `Load explicit controls` sets
only the visible problem, context, direction, budgets, seed, relation, and
exclusion controls. It clears any prior result, opens the selected concept
groups, reports the loaded trace identity, and leaves `Run bounded closure` as
a separate explicit action.

Homepage problem cards link to fixed fragments of the form
`compose.html#starter-<trace-id>`. On load, the allowlisted fragment performs
the same visible configuration step. The fragment carries only an authored,
edition-local starter ID. It never serializes arbitrary problem text, context,
selections, budgets, results, or reader data. Any subsequent control edit marks
the configuration modified and removes the fragment without persistence.

Problem text is copied for reader orientation only. It is never parsed and
never chooses a concept, relation, direction, budget, or exclusion.

## Trace and lab distinction

Each card states that the linked guide is the reviewed trace while the lab will
recompute a new unresolved local draft. Loading does not reproduce or inherit
the trace's check outcomes, state, projections, or canonical identity. Even
when the new graph has the same structural shape, all lab checks remain
unresolved and its local result SHA-256 is a distinct work-product identity.

## Failure and claim boundary

If the starter payload or fragment is invalid, no control changes and the base
`sim-21` lab remains usable. The runtime uses no network, storage, analytics,
publication, natural-language extraction, relation discovery, or arbitrary URL
state.

This simulation establishes deterministic authored-control loading and static
navigation mechanics only. It does not establish useful defaults for a reader
population, semantic relevance, query completeness, domain validity,
comprehension, task success, or readiness for `preview-01`.

## Conformance cases

| Starter | Exact configuration consequence |
|---|---|
| System dependency | forward F1, one seed, no exclusion |
| Claim and evidence | forward F3, one seed, no exclusion |
| Feedback and outcome | reverse F4 from its canonical target |
| Required-interface conflict | forward F1 plus exact required-target exclusion |
| Delegated compliance frontier | two seeds, F2 and stopped F6, edge budget one |

Static checks cover trace-derived payload identity, five homepage links, five
cards, fixed-fragment routing, no arbitrary URL serialization, asset order, and
the no-network/no-storage boundary. Browser checks cover loading, visible
control values, modified-state clearing, conflict and frontier recomputation,
and the separate Run action.
