# Actor, Action, Object, Instrument, Recipient, and Outcome Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Interaction, Request, Response, Acknowledgment, Notification, and Correlation](../entries/interaction-request-response-correlation.md)

Canonical senses: `interaction-exchange`, `request`, `response`,
`acknowledgment`, `notification`, `correlation`

## Governing question

Which semantic participant roles does each interaction record express, and how
do those roles map across messages, actions, systems, and outcomes?

## Role mapping

| Role | Governing question | Common mechanism confusion |
|---|---|---|
| actor/agent | who or what performs/initiates the action in this view? | sender, owner, or cause by default |
| action | what bounded activity/change/communication is represented? | message name or outcome |
| object/theme | what subject is acted on, moved, described, or changed? | representation or payload only |
| instrument | through which means/resource is the action performed? | actor or cause |
| recipient/beneficiary | who receives the object/message/effect or is intended to benefit? | addressee, affected party, or owner collapse |
| source | from where/whom does movement, information, or state originate? | causal origin |
| destination | where/to whom does it go under the selected path? | successful receipt/completion |
| result/outcome | what immediate result or selected longer-horizon effect follows? | response, acknowledgment, or intent |

## Mapping contract

Preserve source/target record identities, sense, direction, cardinality,
unexpressed roles, role alternation, passives/proxies, nested actions,
correlation, authority, time, evidence, and loss. Semantic roles are
view-relative and do not establish responsibility, ownership, or causation.

## Sources and provenance

See the canonical entry and Organization, Causal Reasoning, Message/Contract,
and Factor Role owners. This is a bounded semantic crosswalk, not a universal
linguistic role inventory.
