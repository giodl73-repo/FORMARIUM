# Reference Table Families

Status: candidate

## Orientation

Factorium uses several compact table forms because not every useful question is
a decomposition or equation. The families below are specialized views attached
to canonical entries. They share one graph, source system, maturity model, and
review process.

## Family table

| Reader asks | Use | Core contract |
|---|---|---|
| What is it structured from? | **Factor Table** | senses, views, factors, pivots, constraints |
| How do quantities relate? | **Formula Table** | relation kind, symbols, units, domain, assumptions |
| What sourced value applies? | **Reference Value Table** | value, unit, conditions, uncertainty, version |
| How does it translate? | **Mapping Table** | direction, domain, exactness, inverse, loss |
| Which choice follows? | **Decision Table** | conditions, rules, priorities, outputs, completeness |
| How can it change? | **Transition Table** | state, event, guard, action, resulting state |
| What is valid? | **Constraint Table** | domain, allowed and forbidden cases, invariants |
| What steps produce it? | **Procedure Table** | preconditions, ordered steps, checks, outcome |
| What explains this symptom? | **Diagnostic Table** | observation, candidate cause, discriminating test, action |
| How should magnitude be interpreted? | **Scale Table** | ordering, bands, thresholds, anchors, uncertainty |
| What supports the claim? | **Evidence Table** | claim, source, method, result, limitation, confidence |

## Neighbor distinctions

| Often confused | Distinction |
|---|---|
| Formula vs. mapping | Formula relates quantities within a model; mapping translates between systems |
| Decision vs. scale | Decision selects an outcome; scale orders or bands observations |
| Transition vs. procedure | Transition states what changes; procedure states ordered work |
| Diagnostic vs. decision | Diagnosis narrows causes through evidence; decision selects an action |
| Constraint vs. truth table | Constraint declares validity; a truth table may enumerate logic for decision or validation |
| Reference value vs. formula | Value tables curate sourced data; formulas compute or relate |
| Evidence vs. every other family | Evidence supports a view but does not replace the view's domain semantics |

## Family composition

Families can link without merging:

```text
diagnostic result
  => Decision Table for response
  => Procedure Table for repair

Transition Table
  ! Constraint Table
  @ Decision Table for guard evaluation

Reference Value Table
  @ Formula Table calculation
  => Scale Table interpretation
```

## Maturity and provenance

- Taxonomy maturity: `candidate`
- Current stable forms: general Factor Table and draft Formula Table
- First new prototype: Mapping Table
- Promotion gate: three diverse examples per family, overlap review,
  practitioner lookup testing, and complete role review

