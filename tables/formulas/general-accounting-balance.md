# General Accounting Balance

Status: candidate Formula Table

## Orientation

An accounting balance tracks a countable property inside a chosen system over
time. Input and generation add to the system; output and consumption remove
from it. When the property is strictly conserved, generation and consumption
are zero.

## Relation

| Field | Value |
|---|---|
| Sense | dynamic system accounting |
| Relation kind | Conservation or balance |
| Canonical expression | `dQ_system/dt = sum(Qdot_in) - sum(Qdot_out) + Qdot_generation - Qdot_consumption` |
| Relation authority | established engineering accounting pattern |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Mathematical kind | Unit | Dimension | Role |
|---|---|---|---|---|---|
| `Q_system` | amount of the counted property inside the boundary | extensive quantity | property-specific | `D_Q` | state |
| `t` | time | scalar | second or declared unit | `T` | independent variable |
| `Qdot_in` | inbound transfer rate | scalar or signed component | `Q` per time | `D_Q T^-1` | source across boundary |
| `Qdot_out` | outbound transfer rate | scalar or signed component | `Q` per time | `D_Q T^-1` | sink across boundary |
| `Qdot_generation` | internal creation rate | scalar | `Q` per time | `D_Q T^-1` | internal source |
| `Qdot_consumption` | internal destruction rate | scalar | `Q` per time | `D_Q T^-1` | internal sink |

The counted property and transfer terms remain domain-specific candidate
headwords.

## Scope and assumptions

- Define the system, surroundings, boundary, and time interval.
- Every term refers to the same counted property and compatible units.
- Declare positive directions and whether rates are signed or nonnegative
  magnitudes paired with explicit subtraction.
- Include every transfer crossing the selected boundary.
- For a strictly conserved property, set generation and consumption to zero.
- Steady state means zero accumulation, not necessarily zero flow.

## Special forms

| Form | Use | Restriction |
|---|---|---|
| `dQ_system/dt = sum(Qdot_in) - sum(Qdot_out)` | Strict conservation | Property cannot be created or destroyed in the model |
| `0 = sum(Qdot_in) - sum(Qdot_out) + generation - consumption` | Steady-state accounting | Accumulation is zero over the chosen interval |
| `Delta Q_system = Q_in - Q_out + Q_generated - Q_consumed` | Finite-interval algebraic balance | Terms are totals over the same interval |

## Dimensional audit

```text
[dQ_system/dt]    = D_Q T^-1
[Qdot_in]         = D_Q T^-1
[Qdot_out]        = D_Q T^-1
[Qdot_generation] = D_Q T^-1
[Qdot_consumption]= D_Q T^-1
```

## Conceptual Factor Table

```text
balance-use
  := counted property
   x system
   x boundary
   x time interval
   x transfers
   x internal sources
   x internal sinks
   x sign convention
   = accumulation
```

## Failure signs

- Inlet and outlet terms use different boundaries or intervals.
- A reacting or transforming property is called conserved while source and
  sink terms are omitted.
- Steady state is confused with an empty or closed system.
- One transfer path is omitted because it is inconvenient to measure.
- Rate terms and interval totals are added directly.
- Positive and negative signs are applied twice.

## Cross-references

- [Boundary](../roots/boundary.md)
- [State](../roots/state.md)
- [Time](../roots/time.md)
- [Work, Energy, and Power](../entries/work-energy-power.md)
- conservation — `unresolved-candidate`
- flow — `unresolved-candidate`

## Sources and provenance

1. Rice University, "Foundations of Conservation Principles":
   https://www.ruf.rice.edu/~bioewhit/foundations/bioe252/docs/Ch%5B1%5D.2.htm
2. APMonitor, "Balance Equations":
   https://apmonitor.com/pdc/index.php/Main/PhysicsBasedModels

Formula authority: established engineering accounting pattern. Factorium
representation remains a candidate pending engineering and practitioner
review.
