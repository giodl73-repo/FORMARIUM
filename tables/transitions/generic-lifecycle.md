# Generic Lifecycle Transition Table

Status: candidate Transition Table

Canonical headword:
[State, Event, Transition, Process, and Lifecycle](../entries/state-event-transition-process-lifecycle.md)

Primary family: Transition Table

Purpose: show the minimum information needed to interpret lifecycle changes;
the labels are illustrative and not a universal lifecycle.

## Transition table

| Source state | Event | Guard | Action or effect | Target state | Failure behavior |
|---|---|---|---|---|---|
| `candidate` | `submit` | required evidence present | freeze submission revision | `under-review` | remain candidate; report missing evidence |
| `under-review` | `approve` | reviewer authority and gates pass | record decision and effective version | `active` | remain under review; surface failed gate |
| `under-review` | `request-change` | review finding exists | record finding and reopen editing | `candidate` | retain review audit |
| `active` | `suspend` | suspension authority and reason valid | inhibit governed operation | `suspended` | remain active; escalate unauthorized request |
| `suspended` | `reinstate` | blocking condition closed | record reinstatement | `active` | remain suspended |
| `active` | `retire` | replacement/disposition plan complete | mark end of active use | `retired` | remain active until disposition is valid |

## Contract

- States are examples, not universal definitions.
- Events have stable identity and provenance.
- Guards are evaluated against one stated snapshot or transaction model.
- Actions and state changes specify atomicity or compensating behavior.
- Unauthorized or invalid events do not silently disappear.
- Lifecycle history is append-only even if current status is projected as one
  field.

## Sources and provenance

1. W3C, *State Chart XML (SCXML)*:
   https://www.w3.org/TR/scxml/

Transition authority: illustrative Factorium pattern informed by SCXML
semantics. Maturity remains `candidate`.

