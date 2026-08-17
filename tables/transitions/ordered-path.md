# Ordered Path Transition Table

Status: candidate Transition Table

Primary family: Transition Table

Canonical headword: [Instant, Duration, Interval, Deadline, and Schedule](../entries/temporal-organization.md)

Canonical senses: `time-instant`, `duration`, `time-interval`, `schedule`,
`milestone`

## Governing question

What must be retained when order, lag, accumulated history, or intermediate
state can change the meaning or outcome of a path?

## Transition table

| Source | Event/action | Guard and context | Delay/memory | Target | Failure or alternative path |
|---|---|---|---|---|---|
| selected state | first operation | applicable preconditions and authority | start time and prior history | intermediate state | reject, retry, compensate, or remain |
| intermediate state | second operation | state produced by first operation | lag and expiry window | candidate result | alternate ordering or timeout |
| candidate result | observation/review | measurement and completion criteria | observation window | accepted or unresolved result | late effect, missing evidence, residual state |

## Path contract

- event and state identities are stable;
- order is explicit, including permitted concurrency or commutation;
- durations, lags, windows, and clock/time-scale assumptions are retained;
- intermediate state and accumulated history are not projected away when they
  affect later behavior;
- reversible, compensating, irreversible, and residual effects remain distinct;
- an endpoint match does not prove path equivalence;
- temporal precedence alone does not establish causal production.

## Reordering test

Compare the declared path with at least one reordering, omitted step, repeated
step, delayed step, and alternate intermediate state. Record whether the result
is equivalent, merely similar, invalid, or unresolved and under which model.

## Sources and provenance

See the canonical temporal entry, Coordinated Work, and Generic Lifecycle
Transition Table. This is a path-record pattern, not a scheduling or causal
validity result.

