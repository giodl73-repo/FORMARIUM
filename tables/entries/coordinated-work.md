# Coordinated Work: Workflow, Orchestration, Choreography, Concurrency, and Compensation

Status: candidate anchor entry

## Orientation

Coordinated work connects activities, participants, decisions, interactions,
and recovery toward a completion condition. A workflow describes the organized
work; orchestration describes sequencing and decisions owned inside a selected
coordinator or participant boundary; choreography describes observable
interactions among participants; concurrency describes independently
progressing work; compensation addresses effects that cannot simply be rolled
back. These are compatible views, not interchangeable implementation styles.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `workflow` | What activities, decisions, dependencies, and flows organize the work toward completion? | work-and-flow model |
| `orchestration` | Which bounded participant or coordinator owns sequencing, decisions, and invocation of other work? | coordinator-owned execution view |
| `choreography` | What exchanges and ordering obligations are observable among independent participants? | participant-interaction view |
| `concurrency` | Which activities can progress independently or overlap, and what orders or synchronizes them? | composition and ordering property |
| `compensation` | What action addresses effects of already-completed work when the larger work cannot complete as intended? | effect-aware recovery |

## View ladder

```text
activities + dependencies + completion condition
  -- organized as --> workflow

sequencing + decisions owned within one execution boundary
  -- viewed as --> orchestration

exchanges + participant obligations across boundaries
  -- viewed as --> choreography

independently progressing activities
  -- constrained by ordering/synchronization --> concurrency model

committed or externally visible effects + later failure
  -- addressed by domain action --> compensation or repair
```

## Root factorization

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

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Work graph | activity x dependency x branch x join x completion | activity dependency | designing or explaining the work | a diagram that omits ownership, data, or failure semantics |
| Coordinator view | trigger x state x decision x invoked work x result | coordinator boundary | one participant owns execution logic | calling every multi-step interaction centrally controlled |
| Participant interaction | participant x exchange x order x correlation x obligation | observable exchange | reasoning across independent boundaries | hidden internal steps being treated as shared truth |
| Concurrency control | progressing work x permitted order x exclusion x join | happens-before constraint | overlap, races, capacity, or synchronization matter | equating concurrency with simultaneous execution |
| Effect and recovery | effect x visibility x reversibility x recovery action x residual obligation | effect boundary | work may partly complete before a later failure | naming a retry or delete “compensation” without semantic repair |
| Operational instance | identity x version x state x owner x deadline x evidence | work instance | operating and auditing running work | one status field replacing event, state, and provenance |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Process vs. workflow | both organize activities and flow | broad work/change organization vs. a selected operational model; usage varies by domain |
| Workflow vs. orchestration | both can show sequence and decisions | organized work vs. an execution view owned within a coordinator boundary |
| Orchestration vs. choreography | both coordinate participants | internal coordinator-owned logic vs. observable inter-participant obligations |
| Concurrency vs. parallelism | both concern more than one activity | independent composition or overlap vs. simultaneous execution on resources |
| Synchronization vs. exclusion | both constrain concurrency | waiting for required progress vs. preventing conflicting overlap |
| Retry vs. compensation | both respond to failure | repeat an operation vs. address effects of completed work |
| Rollback vs. compensation | both seek recovery | restore within an atomicity model vs. domain action after visible effects |
| Cancellation vs. compensation | both change the intended path | prevent or halt future work vs. address effects already produced |
| Idempotency vs. compensation | both support robust recovery | same intended effect under repetition vs. a distinct semantic repair action |

## Diagnostic examples

- Two branches may be concurrent on one processor without executing at the
  same instant; their allowed order and join still matter.
- A purchase workflow can be orchestrated inside one service while payment,
  fulfillment, and notification exchanges form a cross-owner choreography.
- An acknowledgment proves receipt under a protocol, not completion of the
  workflow or business outcome.
- Retrying a timed-out request is unsafe when its completion is unknown and no
  idempotency or deduplication contract exists.
- Refunding a charge may compensate a financial effect but cannot erase that a
  notification was seen or restore inventory sold to another party.
- A validly waiting instance can be mislabeled failed when its expected join
  condition is absent from the status projection.

## Selection procedure

1. State the objective, completion condition, subject, instance, and boundary.
2. List activities and their data, resource, and state dependencies.
3. Declare triggers, choices, permitted ordering, branches, joins, and terminal
   conditions.
4. Assign participant roles, authority, ownership, and any coordinator boundary.
5. Separate internal orchestration from externally observable choreography.
6. For concurrent work, state allowed overlap, exclusion, synchronization,
   scheduling assumptions, and conflict resolution.
7. Mark when each effect becomes visible, committed, irreversible, or owned by
   another participant.
8. Define timeout, cancellation, retry, correlation, deduplication, and
   idempotency semantics independently.
9. For partial-completion failure, select compensation, forward repair,
   escalation, acceptance, or another domain response and retain residual
   obligations.
10. Record instance state, events, evidence, governing versions, and outcomes.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines the five headwords | Places them under separate governing questions |
| Thesaurus | Links process, task, coordination, parallelism, rollback, and recovery | Prevents lexical proximity from implying equivalence |
| Process standard or pattern catalog | Defines notation and recurring patterns | Adds boundary, authority, effect, and recovery factors across views |
| Workflow engine or service platform | Executes one mechanism family | Keeps product mechanisms from defining general factor roles |
| Factorium | Connects lifecycle, organization, messages, transactions, controls, and obligations | Supplies one selection and failure-isolation spine without claiming a universal workflow model |

## Constraints and failure signs

- A workflow states its objective and completion condition; activity completion
  alone does not prove the outcome.
- Orchestration declares the coordinator boundary rather than assuming one
  global controller.
- Choreography exposes participant, exchange, correlation, ordering, and
  obligation without pretending to reveal private internal work.
- Concurrent work declares joins, exclusions, races, and conflict policy.
- Parallel execution is claimed only with runtime/resource evidence.
- Message receipt, acknowledgment, local commit, workflow completion, and
  business completion remain distinct.
- Retry states uncertainty, duplication, idempotency, and attempt limits.
- Compensation names the prior effect, recovery intent, authority, failure
  behavior, and residual obligation.
- Irreversible effects and failed compensation remain visible.
- A status field does not replace instance state, events, versions, and provenance.

## Specialized view

The [Coordinated Work Failure Diagnostic](../diagnostics/coordinated-work-failures.md)
maps stalls, duplicates, races, and partial completion to candidate causes and
discriminating tests.

## Cross-references

- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Organization, Role, Responsibility, Authority, and Accountability](organization-role-authority.md)
- [Software Transaction, Message, and Contract](software-transaction-message-contract.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Governance, Obligation, and Compliance](governance-obligation-compliance.md)
- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)

## Sources and provenance

1. [Coordinated Work research note](../../docs/research/2026-08-15-coordinated-work.md)
2. OMG, *Business Process Model and Notation*: https://www.omg.org/bpmn/
3. Workflow Patterns Initiative: https://www.workflowpatterns.com/patterns/control/
4. OASIS, *WS-BPEL 2.0*: https://docs.oasis-open.org/wsbpel/2.0/OS/wsbpel-v2.0-OS.html
5. Garcia-Molina and Salem, *Sagas*:
   https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf
6. IETF, *RFC 9110*: https://www.rfc-editor.org/rfc/rfc9110.html

Comparator access date: 2026-08-15. The cross-domain factorization remains a
Factorium `candidate`; standards and mechanism examples retain native scope.
