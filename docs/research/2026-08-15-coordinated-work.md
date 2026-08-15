# Coordinated Work Research Note

Status: source-backed candidate synthesis

## Research question

What compact factorization distinguishes organized work, participant
coordination, overlapping activity, and recovery after effects without turning
one workflow notation or software architecture into a universal model?

## Admission rationale

`workflow`, `concurrency`, and `compensation` recur as unresolved candidates in
the lifecycle anchor. Orchestration and choreography explain who owns
sequencing and what is visible across participant boundaries. Together the
cluster connects the existing system, organization, lifecycle, transaction,
message, contract, control, and governance entries.

## Source basis

The evidence campaign is recorded in
[Coordinated Work Web Evidence](../../signals/discover/websearch/coordinated-work-websearch-2026-08-15.md).
It uses OMG material for process and choreography, Workflow Patterns research
for control flow, OASIS WS-BPEL for an orchestration example, Go documentation
for concurrency versus parallelism, the original saga paper for compensation,
and RFC 9110 for idempotent retry semantics.

## Editorial decisions

- The canonical parent is `coordinated-work`, not a product or notation.
- A workflow organizes activities and flow toward a completion condition; it
  need not be automated or centrally executed.
- Orchestration is a participant or coordinator view that owns sequencing and
  decisions inside a boundary.
- Choreography is the interaction view among participants without assuming a
  central controller.
- Concurrency is a composition/ordering property. Parallel execution is a
  narrower runtime property requiring evidence of simultaneous execution.
- Compensation is semantic recovery for already-produced effects. Rollback,
  retry, idempotency, cancellation, and repair remain separate.
- A Diagnostic view best exposes missing joins, correlation, ownership, effect
  boundaries, and recovery obligations.

## Candidate factor spine

```text
coordinated-work-use
  := objective and completion condition
   x subject, instance, and boundary
   x activities and dependencies
   x trigger, branch, join, and ordering semantics
   x participant, role, authority, and coordinator placement
   x interaction, message, correlation, and contract
   x concurrency, scheduling, exclusion, and synchronization
   x state, effect, visibility, and commitment boundary
   x failure, timeout, cancellation, retry, and idempotency policy
   x compensation, repair, escalation, and residual obligation
   x observation, provenance, and version
```

## Claim limits

This is a candidate cross-domain organization. It does not claim a universal
workflow calculus, recommend one notation, or provide safety-critical recovery
guidance. Software and business-process examples are mechanism evidence, not
the definitions of coordinated work.
