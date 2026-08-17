# Interaction, Request, Response, Acknowledgment, Notification, and Correlation

Status: candidate anchor entry

## Orientation

An interaction is a bounded exchange or mutually conditioned activity among
participants. A request asks a recipient or system to perform, provide, or
return something under a declared contract. A response is the correlated
reply or result communication. An acknowledgment confirms one exact fact—such
as receipt, acceptance for processing, or another named state—and does not by
itself prove completion. A notification communicates a condition or event
without necessarily requesting a correlated response. Correlation associates
records that belong to the same interaction or work context; matching labels
do not establish causation or semantic identity.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `interaction-exchange` | Which participants and bounded actions or communications mutually condition one another under what contract? | participant exchange frame |
| `request` | What is asked of which recipient, with which inputs, authority, deadline, and expected result? | soliciting interaction action |
| `response` | Which correlated reply, result, status, or refusal answers the request? | replying interaction action |
| `acknowledgment` | Which exact fact or transition is confirmed, by whom, and what remains unconfirmed? | bounded confirmation |
| `notification` | Which event, condition, or status is communicated to whom without requiring request-response semantics? | directed information action |
| `correlation` | By which identity and rule are interaction records associated, with what cardinality and collision behavior? | interaction association contract |

## Root factorization

```text
interaction-exchange-use
  := purpose, protocol or social contract, and boundary
   x participants, roles, identities, authority, and addresses
   x action or message kind, content, representation, and version
   x request identity, inputs, preconditions, deadline, and expected result
   x response identity, status, result, refusal, error, and limitations
   x acknowledgment subject, level, evidence, and remaining completion
   x notification event/condition, audience, priority, and expected attention
   x correlation identifiers, scope, cardinality, collision, and unmatched cases
   x order, timing, retries, duplicates, cancellation, and idempotency
   x state, commitment, queue, location, and operating conditions
   x outcome, evidence, provenance, privacy, retention, and revision
```

## Contrast table

| Pair | Decisive distinction |
|---|---|
| Interaction vs. message | participant activity/exchange frame vs. one communication unit |
| Request vs. command | asks under a contract vs. directs under asserted authority; domain usage varies |
| Response vs. outcome | correlated reply/result communication vs. selected effect over a horizon |
| Acknowledgment vs. response | confirmation of one exact fact vs. reply that may carry result/status/refusal |
| Receipt vs. acceptance | arrived at a boundary vs. admitted for processing or obligation |
| Acceptance vs. completion | admitted/approved state vs. required work or outcome finished |
| Notification vs. request | communicates condition/event vs. solicits a correlated action/result |
| Correlation vs. causation | records associated under an identity rule vs. change-producing relation |

## Selection procedure

1. State boundary, contract/protocol, participants, roles, authority, identity,
   version, and privacy constraints.
2. Separate action, message/representation, state transition, and outcome.
3. Define request inputs, preconditions, deadline, expected response/result,
   cancellation, and failure behavior.
4. Define every response and acknowledgment status by the exact fact it proves
   and the completion it does not prove.
5. Define notifications by event/condition, audience, routing, deduplication,
   priority, and expected attention/action.
6. Specify correlation scope, cardinality, identifier generation, collision,
   replay, unmatched records, and cross-system mapping loss.
7. Preserve ordering, timing, retries, duplicates, queue state, commitments,
   operating conditions, outcomes, evidence, and provenance.

## Constraints and failure signs

- Receipt, acknowledgment, acceptance, processing, commit, completion, and
  outcome never share an unlabeled status.
- Correlation identifiers do not establish semantic identity or causation.
- Requests and notifications retain sender, recipient/audience, authority,
  content/version, time, and failure behavior.
- Retries preserve uncertainty, duplication, idempotency, and attempt history.
- Named protocols, operations, status codes, message types, and interaction
  patterns remain examples or bounded external authorities.

## Specialized view

- [Semantic Participant Role Mapping](../mappings/semantic-participant-roles.md)

## Cross-references

- [Software Transaction, Message, and Contract](software-transaction-message-contract.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Coordinated Work](coordinated-work.md)
- [Organization and Authority](organization-role-authority.md)

## Sources and provenance

1. IETF RFC 9110, HTTP semantics: https://www.rfc-editor.org/rfc/rfc9110.html
2. OASIS WS-BPEL 2.0, partner interactions and correlation:
   https://docs.oasis-open.org/wsbpel/2.0/OS/wsbpel-v2.0-OS.html
3. Existing Factorium software interaction, control, work, and evidence owners.

Comparator access date: 2026-08-16. Protocol meanings remain source-owned;
the cross-domain organization is `candidate` Factorium synthesis.
