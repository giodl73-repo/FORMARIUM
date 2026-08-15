# Coordinated Work Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Coordinated Work](../entries/coordinated-work.md)

Canonical senses: `workflow`, `orchestration`, `choreography`, `concurrency`,
`compensation`

## Governing question

Which coordination defect could explain a stalled, duplicated, conflicting, or
partly completed unit of work, and what observation would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Work never starts after its trigger | trigger not observed; correlation failed; guard false; wrong version | trace trigger identity, correlation, guard inputs, and selected version | intake and workflow definition |
| One branch finishes but the instance waits forever | branch never started; join mismatched; completion event missing; cancellation not propagated | enumerate expected join tokens/events and compare branch histories | workflow control flow |
| The same effect occurs twice | ambiguous timeout; non-idempotent retry; duplicate delivery; narrow deduplication scope | correlate attempts, messages, effect identity, and idempotency key across the effect boundary | caller, receiver, and contract owners |
| Participants disagree about completion | local commit treated as global completion; acknowledgment confused with outcome; obligation underspecified | compare each participant's completion condition and exchange evidence | interaction contract and process owners |
| Concurrent branches overwrite or contradict | hidden shared state; missing exclusion; stale read; no conflict policy | replay legal interleavings and inspect version/conflict checks | state and concurrency design |
| Work is serialized despite safe independence | accidental dependency; coarse lock; coordinator bottleneck; capacity policy | remove each claimed dependency in a controlled model and measure permitted overlap | workflow and resource scheduling |
| Failure leaves a partly completed external effect | atomic boundary ended earlier; effect irreversible; compensation absent or unauthorized | mark commit/visibility points and test recovery against real external state | effect owner and recovery policy |
| Compensation runs but harm remains | recovery too narrow; concurrent changes intervened; action failed; obligation ignored | compare prior effect, current state, recovery result, and outstanding obligations | domain owner, operations, and governance |
| Cancellation stops one participant but others continue | cancellation local only; propagation absent; message already accepted | trace cancellation scope, delivery, acknowledgment, and participant state | choreography and participant owners |
| Dashboard says failed while work is validly waiting | timeout shorter than contract; waiting flattened into failure; dependency invisible | compare history with deadline, wait condition, and dependency evidence | observability and lifecycle model |

## Use contract

1. Identify one work instance, governing versions, boundary, and completion
   condition.
2. Preserve trigger, message, state-transition, effect, retry, and recovery
   evidence with participant-local timestamps and identities.
3. Draw both the coordinator-owned path and participant exchange path.
4. List multiple causes across trigger, correlation, routing, branch, join,
   ownership, concurrency, effect, and recovery.
5. Run the smallest discriminating test, including legal alternate interleavings.
6. Repair the owning contract or stage and retest completion, duplicates,
   residual effects, and obligations.

## Failure signs

- every defect is blamed on the workflow engine;
- acknowledgment, local transaction, or green dashboard means end-to-end completion;
- retry is enabled without uncertainty and idempotency semantics;
- concurrent branches have no join, exclusion, or conflict rule;
- compensation is named without the effect it addresses;
- irreversible effects and residual obligations disappear from the record;
- one participant's internal sequence is presented as the entire choreography.

## Sources and provenance

1. [Coordinated Work research note](../../docs/research/2026-08-15-coordinated-work.md)
2. Workflow Patterns Initiative: https://www.workflowpatterns.com/patterns/control/
3. Microsoft, *Compensating Transaction*:
   https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
4. IETF, *RFC 9110*: https://www.rfc-editor.org/rfc/rfc9110.html

This is a candidate synthesis. Safety-critical, financial, clinical, and
regulated workflows require domain review and recovery authority.
