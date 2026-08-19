# Formography Comparative Slice 02 Result

Date: 2026-08-18
Status: quantitative case validated; third case remains open

## Result

Amount, Concentration, and Composition was encoded as a concept map, generic
scoped property graph, and candidate formograph using the same ten-feature
core as Access Authorization.

| Encoding | Core features retained | Quantity extension retained |
|---|---:|---|
| Concept map | 4/10 | descriptive only |
| Scoped property graph | 10/10 | yes |
| Candidate formograph | 10/10 | yes and required |

The Formography core transfers without redefining its objects. Quantitative
correctness nevertheless requires an explicit domain extension for quantity
identity, numerator and denominator bases, units, conditions, uncertainty, and
closure.

The invalid fixture omits a concentration denominator and fails with:

```text
FG-QUANTITY-BASIS-MISSING: quantity_contract.denominator_basis
```

## Verdict

`CORE_TRANSFERS_WITH_EXPLICIT_DOMAIN_EXTENSION_METHOD_PROFILE_REMAINS_NARROWED`

The property graph again carries the full information. The result strengthens
only the method-profile hypothesis: Formography may require inspectable core
and domain contracts while remaining compatible with ordinary graph
representation.

## Deletion boundary

Still deleted:

- distinct graph-representation novelty;
- universal domain semantics for `factor` or `relation`;
- any implication that a formograph validates a measurement.

New risk:

- repeated domain extensions may reveal Formography as only a governance
  wrapper over existing domain schemas.

## Next gate

Run the third case in an evaluative or interpretive domain. It must predeclare
which extension fields are essential and reject case-specific schema growth.
Independent coding begins only after that packet freezes.
