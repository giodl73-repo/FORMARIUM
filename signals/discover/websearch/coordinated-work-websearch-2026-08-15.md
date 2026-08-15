---
signal: discover-websearch
topic: coordinated-work
date: 2026-08-15
status: complete
claims_tested: 4
verdict: grounded-with-scope-limits
---

# Coordinated Work Web Evidence

## Investigation contract

Factorium needs a source-backed distinction among workflow, orchestration,
choreography, concurrency, and compensation. This tests four claims using
primary standards, original research, and official technical documentation;
it does not test whether one notation or product is best.

## Query log

| Claim | Query A | Query B |
|---|---|---|
| C1 | `OMG BPMN process sequence flow activities definition` | `workflow patterns sequence parallel split synchronization` |
| C2 | `OMG BPM orchestration choreography independent collaborating entities` | `OASIS WS-BPEL orchestration executable process participant` |
| C3 | `Go concurrency is not parallelism independently executing processes` | `workflow patterns parallel split synchronization concurrent branches` |
| C4 | `original Sagas paper compensating transaction semantic undo` | `Microsoft compensating transaction pattern not rollback idempotent retry` |

## Findings

| Claim | Direct evidence | Source | Verdict |
|---|---|---|---|
| C1. A workflow or process organizes activities and has separable control-flow concerns. | The initiative describes recurring requirements in the “control-flow perspective” and enumerates sequence, parallel split, synchronization, exclusive choice, and simple merge. | [Workflow Patterns](https://www.workflowpatterns.com/patterns/control/) | grounded |
| C1 | BPMN defines notation and semantics for Process, Collaboration, and Choreography diagrams rather than treating them as one view. | [OMG BPMN](https://www.omg.org/bpmn/) | grounded |
| C2. Orchestration and choreography are distinct coordination views. | OMG describes orchestration as the traditional process view and choreography as interaction protocols among independent collaborators. | [OMG Business Process Management](https://www.omg.org/bpm/) | grounded |
| C2 | A choreography is an ordered message-exchange sequence with “no central controller” or responsible entity. | [OMG issue BPMN2-197](https://issues.omg.org/issues/BPMN2-197) | grounded |
| C2 | The primer calls WS-BPEL “a language for business process orchestration” and distinguishes executable from abstract behavior. | [OASIS WS-BPEL Primer](https://docs.oasis-open.org/wsbpel/2.0/Primer/wsbpel-v2.0-Primer.html) | grounded, technology-scoped |
| C3. Concurrency is not simultaneous execution, and concurrent branches need explicit synchronization. | Go defines concurrency as composition of independently executing processes and parallelism as simultaneous execution. | [Go: Concurrency is not parallelism](https://go.dev/blog/waza-talk) | grounded, software example |
| C3 | The workflow literature separates concurrently executable split threads from their synchronization. | [Pattern-based Analysis of BPMN](https://www.workflowpatterns.com/documentation/documents/BPM-06-17.pdf) | grounded, process-model scope |
| C4. Compensation is semantic recovery, not ordinary rollback; retry and idempotency are separate. | The saga model associates committed subtransactions with actions that semantically undo their effects despite interleaving. | [Garcia-Molina and Salem, *Sagas*](https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) | grounded, database origin |
| C4 | Compensation is application-specific, may not restore initial state, can run in another order, and can itself fail. | [Microsoft Compensating Transaction](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction) | grounded, architecture guidance |
| C4 | HTTP defines idempotency by intended effect across identical requests and uses it to constrain automatic retry. | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) | grounded, protocol scope |

## Scope and contradictions

- `Workflow`, `process`, and `orchestration` overlap across communities. The
  sources support separate governing questions, not one universal hierarchy.
- BPMN and WS-BPEL are evidence for recurring distinctions, not definitions of
  all human, organizational, scientific, or computational work.
- Workflow modeling sometimes calls concurrently executable branches
  `parallel`; Factorium reserves simultaneous execution for a narrower runtime
  claim requiring resource evidence.
- Compensation does not promise literal reversal. Irreversible effects,
  concurrent changes, business obligations, and failed recovery remain visible.

## Amendments

1. Use `coordinated-work` as the anchor rather than `orchestration`.
2. Give all five concepts separate senses and governing questions.
3. Factor sequence, branch, join, correlation, authority, effects, and recovery;
   do not factor BPMN symbols or workflow engines.
4. Keep retry, idempotency, rollback, cancellation, and compensation distinct.
5. Label the cross-domain organization a Factorium candidate synthesis.

## Ungrounded or deferred

- No claim that choreography or orchestration is generally superior.
- No claim that every workflow has a central coordinator.
- No claim that compensation always restores a prior state.
- No claim that concurrent branches actually run at the same instant.
