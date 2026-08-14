# Software Interaction Mechanisms

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Software Transaction, Message, and Contract](../entries/software-transaction-message-contract.md)

Canonical senses: `transaction`, `message`, `contract`

## Mapping identity

| Field | Value |
|---|---|
| Source system | Factorium software transaction, message, and contract concepts |
| Target systems | PostgreSQL current; HTTP Semantics; OASIS SOA-RM 1.0; OpenAPI 3.2; Eiffel/Design by Contract |
| Direction | canonical concept to candidate target mechanism |
| Mapping kind | contextual and partial mechanism assignment |
| Cardinality | many-to-many |
| Authority | cited target-system specifications plus candidate Factorium comparison |
| Factorium maturity | `candidate` |

No one target mechanism owns every transaction, message, or contract sense.
The mapping preserves local and distributed failure differences.

## Interaction mappings

| Source concept | Candidate target mechanisms | Required condition | Not equivalent to |
|---|---|---|---|
| transaction | PostgreSQL transaction block/savepoint/isolation level; unit of work; distributed saga or compensating workflow | operations, commit/abort, visibility, isolation, durability, retry, and compensation semantics are stated | request, process, session, or ACID guarantee by name alone |
| message | HTTP request/response; service interaction message; queue record; command/event notification envelope | sender, recipient, protocol, identity, correlation, payload, ordering, delivery, acknowledgment, and duplicate semantics are stated | event, resource, representation, data, or successful effect |
| contract | Eiffel pre/postconditions and invariants; OASIS service contract/policy; OpenAPI description; protocol and compatibility specification | parties, scope, assumptions, obligations, guarantees, errors, security, operations, and change rules are stated | interface, schema, generated client, policy, or document alone |

## Completion distinctions

| Signal | What it may establish | What it does not establish by itself |
|---|---|---|
| message accepted | recipient or broker accepted a communication unit | business operation committed |
| response success | protocol operation reported success in scope | downstream effects are durable or globally complete |
| transaction commit | declared transaction effects committed under target semantics | external systems or later workflows completed |
| acknowledgment | named delivery/processing stage was acknowledged | exactly-once business effect |
| contract validation | selected structural/assertion checks passed | all behavioral, operational, or compatibility obligations hold |

## Change tests

| Change | Required review |
|---|---|
| Isolation level changes | anomalies, retries, invariants, client assumptions, and observability |
| Delivery mode changes | ordering, duplicates, loss, acknowledgment, idempotency, and replay |
| Payload schema changes | readers, writers, compatibility, defaults, and semantic interpretation |
| Contract obligation changes | parties, versioning, rollout, monitoring, and failure handling |
| Local call becomes remote | timeout, cancellation, partial failure, authorization, and tracing |

## Failure signs

- every transaction is labeled ACID without stated guarantees;
- acknowledgment, response, commit, and business completion are merged;
- a message is called an event because it is asynchronous;
- exactly-once effect is inferred from broker delivery settings;
- a schema is treated as the whole behavioral contract;
- retries omit idempotency, duplicate, or compensation behavior;
- reverse mapping ignores protocol and ownership boundaries.

## Sources and provenance

1. [Software mechanism bridge research](../../docs/research/2026-08-14-software-mechanism-bridge.md)
2. PostgreSQL:
   https://www.postgresql.org/docs/current/tutorial-transactions.html
   https://www.postgresql.org/docs/current/transaction-iso.html
3. RFC 9110:
   https://www.rfc-editor.org/rfc/rfc9110.html
4. OASIS SOA-RM 1.0:
   https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html
5. ECMA-367:
   https://ecma-international.org/publications-and-standards/standards/ecma-367/
6. OpenAPI Specification 3.2.0:
   https://spec.openapis.org/oas/v3.2.0.html

The target specifications own their precise guarantees. Factorium's
cross-system mapping remains contextual, partial, and `candidate`.
