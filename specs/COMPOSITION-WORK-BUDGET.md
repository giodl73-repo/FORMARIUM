# Composition Lab Work Budget Contract

Status: `sim-24` finite live-simulation control; not canonical-query export,
domain evaluation, performance evidence, or production resource accounting

## Purpose

The canonical composition-query contract requires finite depth, edge, node,
and work budgets. The Composition Lab currently declares and enforces only the
first three while reporting work after execution. `sim-24` closes that visible
contract gap: work becomes an explicit input, an enforced hard cap, and part
of the pre-execution Query Plan.

## Exact accounting

Work uses the canonical trace definition:

`seeds + nodes + edges + frontiers + conflicts + checks + projections`

The live range is 3-64 records. A request must provide enough work for its
sorted distinct seeds: every seed necessarily produces one seed record, one
working node, and one projection. No unresolved-relation, capacity-requirement,
or inactive-exclusion display record enters canonical work accounting.

Each admitted relation is atomic. Before admission, the engine projects the
complete record cost of the edge, unresolved check, newly introduced required
and evaluative nodes, their projections, and any newly reached exclusion
conflicts. If that atomic unit would exceed the work bound, the relation is not
partly admitted; it becomes an explicit `atomic-relation-needs-N-work-slots`
capacity requirement. A frontier caused by a reached edge, node, or depth
budget is emitted only when the frontier record itself fits the work cap;
otherwise that relation becomes an explicit work-capacity requirement.

Every successful result therefore satisfies `result.work <= request.budget.work`.
The result reports `Work used / cap`. Work-capacity insufficiency alone leaves
the draft `incomplete`; it does not claim a reached-budget frontier or
`truncated` state.

## Interface and propagation

The Bound stage adds a required numeric Work control beside direction, depth,
edges, and nodes. The default F1 request uses 9, exactly matching its emitted
record count. Each reviewed starter loads the canonical trace's declared work
budget. The Query Plan repeats work with every other finite bound and includes
it in completeness diagnostics. Starter loading still never runs closure.

The generated manifest identifies work accounting as `canonical-record-count`
and enforcement as `hard-cap`. Prior editions remain byte-identical.

## Conformance

- Default F1 emits 9 of 9 work records.
- A work cap below the atomic F1 cost admits no partial edge or nodes, records
  one exact capacity requirement, remains incomplete, and stays within cap.
- A reached non-work budget emits a frontier only when the frontier fits work.
- A request whose seeds alone exceed the work budget fails closed.
- Reordering set-like inputs retains identical work and canonical result JSON.
- All five starters load their exact canonical work controls without auto-run.
- The live Query Plan and executed request agree on all four finite budgets.
- `sim-23` retains exact site and standalone identities.

## Claim boundary

This establishes deterministic finite-record accounting in the local
simulation. It does not establish runtime cost, memory cost, scalability,
reader understanding, useful budget defaults, semantic completeness, domain
correctness, canonical-query emission, publication, or `preview-01` evidence.
