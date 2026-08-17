# Value-to-Criterion Relation Admission

Status: F34 admitted canonical relation; F27 bridge packet complete

## Decision

Admit one exact cross-entry relation record:

```text
relation f27-value-contributes-criterion | contributes-criterion-to | factor:cost-price-value-return/requested-cost-price-value-utility-or-return-sense | factor:choice-alternative-selection/criteria-definitions-measurement-bases-and-directions | view:decision-alternative-selection | basis=declared-basis,desired-direction=declared-desired-direction,horizon=declared-horizon,owner=declared-owner,unit-or-scale=declared-unit-or-scale,value-sense=declared-value-sense | tables/decisions/alternative-selection.md
```

This type-level route says that one exact declared value sense can contribute
to a decision criterion under the complete qualifier contract. It does not
equate cost, price, value, utility, or return; make unlike scales comparable;
supply a weight or aggregation rule; or choose an objective for the owner.

## Direction, cardinality, and loss

- Direction: scoped value sense -> decision criterion definition.
- Type-level cardinality: one reviewed factor type to one reviewed factor type.
- Guide-instance cardinality: many local value records may contribute to many
  local criteria only through explicit bindings and checks.
- Inverse: none implied. Reverse traversal does not identify a value sense,
  basis, unit, owner, mapping, or preference.
- Loss: no full value artifact, source date, uncertainty, exchange/conversion
  mapping, local criterion binding, comparability result, normalization,
  weight, aggregation rule, utility, ranking, or recommendation crosses the
  edge.

## Fail-closed boundary

Cost/Price/Value/Return retains authority for the exact value sense, basis,
unit or scale, date/horizon, and uncertainty. Choice owns the criterion,
measurement basis, desired direction, and any later preference or trade-off.
Price is not utility; cost is not value; return is not a universal objective;
and unlike values cannot be added without an explicit reviewed mapping.

The canonical query retains `f27-check-value-basis` as `unresolved` and
closure as `incomplete`. Structure cannot decide the exact local sense,
owner, basis, horizon, scale, comparability, preference, or weight. The
negative fixture rejects an incorrect predecessor.

## Guide, Lab, and packet boundaries

The authored guide may show this route separately from its local synthetic
evaluation. Its local `unresolved` record says that cost ranges are incomplete
and supply neither utility nor a common preference scale. It does not change
the canonical query outcome.

F34 keeps the Composition Lab on its exact six-ID F1-F6 allowlist. All five
F27 bridge relations are now canonical but unavailable in Lab controls,
starters, closure, or continuations without a separate interaction review.

F34 completes admission review for the bounded five-relation F27 packet. It
does not establish that this packet is a complete decision ontology or that
future cross-entry relations should be admitted without independent review.

## Claim boundary

Admission establishes a directional graph assertion and bounded structural
trace. It establishes no value equivalence, comparability, price, cost,
utility, return, preference, weight, aggregation, objective, ranking,
recommendation, decision quality, reader success, or preview evidence.

## Published identities

- Canonical relation sidecar SHA-256: `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634`
- Exact assurance sidecar SHA-256: `11a17d3077bd32be242a256e64cec2096a3edc8ab90d3fbfa3d9d4d4c3b4b7db`
- Composition Lab allowlist SHA-256:
  `35f17d2e24190be1be8897f38477a1c138d974223a73f850665e8439ef645f5a`
- Canonical query SHA-256: `9e3928da4790197267dbbd1bdd7cca90d12349b98ec583c32e6b0b9ed711626d`
