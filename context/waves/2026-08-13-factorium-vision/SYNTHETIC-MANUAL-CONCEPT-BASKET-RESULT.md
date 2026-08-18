# Synthetic Manual Concept Basket Result

Date: 2026-08-17

Campaign: `SUJ-05`

Decision: reject the one-query concept basket and retain `sim-44` unchanged.

Evidence class: deterministic interface feasibility rehearsal. No reader
participated.

## Exact result

The ten frozen question tasks ran against the exact `sim-44` search index. Each
used its first previously frozen literal query and inspected only the first ten
canonical ownership groups. No retry, expansion, inferred concept, reordered
result, or changed target was allowed.

| Intended canonical families visible | Assignments |
|---|---:|
| None | 1 |
| One | 7 |
| Two | 1 |
| Three | 1 |

Only 2/10 assignments expose at least two intended families. The predeclared
admission threshold was 8/10, so the candidate fails and is not implemented.
Nine of ten expose at least one intended family; that descriptive observation
supports Search as a first foothold but does not satisfy multi-concept assembly.

The two passing routes concern mixed quantity/composition and threshold/
exception/decision questions. The other routes would produce a basket that
looks plural while retaining zero or one of the task's intended families.
Adding such a control would increase product and semantic confusion without
making the recognizable question-to-concepts job mechanically possible.

## Disposition

- No manual basket is added.
- No search rank, family ownership, content, relation, closure, Guide,
  persistence, or canonical artifact changes.
- No `sim-45` is minted.
- The exact failed denominator and all first-ten groups remain in
  `fixtures/synthetic-users/concept-basket-baseline-05.json`.

The next plausible investigation is not a larger basket. It is whether people
can explicitly decompose one question into two or three independent lookup
clauses before selecting concepts. That would require a separately frozen
authored task protocol and must not use intended family titles as query hints.

## Claim boundary

This result establishes only that the existing literal ranking rarely exposes
two already-declared intended families from one frozen query. It does not show
that readers would choose those families, understand their distinctions, value
a basket, decompose questions successfully, or prefer Factorium to another
tool. External reader gates remain open.
