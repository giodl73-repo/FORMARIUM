# State

Status: candidate

## Sense: current configuration

State describes a condition that can differ while the subject is still treated
as the same identifiable thing.

`state := variable values @ observation time`

Treat state as prime when only the current condition matters. Factor it further
when lifecycle stages, substates, histories, or independently varying
properties affect behavior.

Related: [Identity](identity.md), [Time](time.md),
[Transformation](transformation.md).

## Sense: structural role

As a factor role, state carries changeable condition while the view preserves
the subject's identity. It should not become a variant or subtype merely
because different states produce different behavior.

`subject := identity x state`
