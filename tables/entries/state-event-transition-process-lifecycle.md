# State, Event, Transition, Process, and Lifecycle

Status: candidate anchor entry

## Orientation

A state is a condition or active configuration; an event is an occurrence; a
transition changes state when triggers and guards permit; a process organizes
activities and flow; a lifecycle selects meaningful stages across an entity's
existence. Status lists often mix all five and therefore hide causes,
validity, and progression.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `state` | What condition or configuration currently holds? | persistent situation or configuration |
| `event` | What occurrence happened or was observed? | time-located trigger or fact |
| `transition` | Under what trigger and guard can the system move from source to target state? | state-change relation |
| `process` | What ordered or networked activities produce an outcome? | work/flow organization |
| `lifecycle-stage` | Which meaningful phase of existence is the subject in? | selected coarse-grained state view |
| `status` | Which reporting label summarizes selected state or progress? | audience-specific projection |

## Role ladder

```text
current state or configuration
  + event
  + satisfied guard
  -- transition action/effect --> target state

activities, events, decisions, and flows
  -- organized as --> process

states and transitions selected for a purpose
  -- projected as --> lifecycle stages and status
```

## Root factorization

```text
state-lifecycle-use
  := subject and boundary
   x state variables or active configuration
   x event identity and source
   x transition trigger and guard
   x action, side effect, and target
   x process activities and flow
   x lifecycle-stage abstraction
   x concurrency and ordering semantics
   x failure, cancellation, retry, and compensation
   x authority, provenance, and observation time
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| State vs. event | events may change state | condition that holds vs. occurrence in time |
| Event vs. transition | event may trigger transition | observed occurrence vs. enabled source-to-target relation |
| Transition vs. process | both describe change | one guarded state change vs. network of activities and flows |
| Lifecycle stage vs. state | stage summarizes state | purpose-selected coarse phase vs. complete active configuration |
| Status vs. lifecycle stage | both are labels | audience projection vs. modeled phase with transition semantics |
| Action vs. outcome | action may produce outcome | work performed vs. resulting state or effect |

## Diagnostic examples

- Receiving `payment.received` is an event; `paid` is a state; moving from
  `pending` to `paid` is a transition.
- A transition can be invalid even when its event occurs because a guard fails.
- One process instance can wait while its underlying service remains healthy.
- `active` can be a status label that hides several state variables.
- A lifecycle stage such as `retired` can be terminal for one process but
  reversible under a different business policy.
- Parallel state regions cannot always be represented by one flat status.

## Specialized view

The linked [Generic Lifecycle Transition Table](../transitions/generic-lifecycle.md)
owns a minimal event/guard/source/target transition pattern.

## Selection procedure

1. Select the subject and modeled boundary.
2. Decide whether the fact is a condition, occurrence, state change, activity
   flow, lifecycle stage, or reporting label.
3. Define state variables or active configuration.
4. For each transition, declare source, event, guard, action/effect, and
   target.
5. State ordering, concurrency, and conflict resolution.
6. Model failure, cancellation, timeout, retry, compensation, and terminality.
7. Derive lifecycle stages and statuses from the underlying model.
8. Record event source, effective time, observation time, and provenance.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines state, event, transition, process, lifecycle, and status | Places condition, occurrence, relation, flow, phase, and projection roles together |
| Thesaurus | Links change, stage, step, event, action, workflow, and status | Prevents lexical proximity from erasing execution semantics |
| Encyclopedia or standard | Explains statecharts, workflows, processes, and lifecycles | Supplies a compact source/event/guard/action/target contract |
| State diagram or workflow | Shows one selected model | Makes abstraction, authority, failures, and alternate views explicit |
| Factorium | Connects state and process views through typed sibling tables | Prevents flat status fields from owning hidden lifecycle logic |

## Constraints and failure signs

- Events have identity, source, and time.
- States describe conditions rather than historical occurrences.
- Transitions declare source, trigger, guard, effect, and target.
- An event does not guarantee a transition when guards fail.
- Side effects and state updates have an explicit execution/atomicity model.
- Concurrent states are not forced into one flat enumeration.
- Lifecycle stages state their purpose and derivation.
- Terminal, cancelled, failed, and suspended meanings are not conflated.
- Status labels do not replace the underlying state model.

## Cross-references

- [Data Retention](../examples/data-retention.md)
- [Incident Severity](../examples/incident-severity.md)
- [State](../roots/state.md)
- [Transformation](../roots/transformation.md)
- [Time](../roots/time.md)
- workflow - `unresolved-candidate`
- compensation - `unresolved-candidate`
- concurrency - `unresolved-candidate`

## Sources and provenance

1. W3C, *State Chart XML (SCXML)*:
   https://www.w3.org/TR/scxml/
2. OMG, *Business Process Model and Notation*:
   https://www.omg.org/bpmn/

Comparator access date: 2026-08-14. Standards remain scoped to state-machine
and process modeling; Factorium organization remains `candidate`.

