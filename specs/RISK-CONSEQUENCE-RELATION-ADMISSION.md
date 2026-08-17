# Risk-to-Consequence Relation Admission

Status: F33 admitted canonical relation

## Decision

Admit one exact cross-entry relation record:

```text
relation f27-risk-characterizes-consequence | characterizes-consequence-for | factor:probability-risk-uncertainty/consequence-set | factor:choice-alternative-selection/alternative-state-outcomes-and-consequences | view:decision-alternative-selection | affected-entity=declared-affected-entity,consequence-basis=declared-consequence-basis,control-state=declared-control-state,horizon=declared-horizon,scenario=declared-scenario | tables/decisions/alternative-selection.md
```

This type-level route says that a declared consequence characterization can
qualify an alternative-state consequence only under the complete qualifier
contract. It supplies no probability, expected loss, risk appetite, utility,
decision weight, or option ranking.

## Direction, cardinality, and loss

- Direction: risk consequence characterization -> alternative consequence.
- Type-level cardinality: one reviewed factor type to one reviewed factor type.
- Guide-instance cardinality: many local consequence records may bind to many
  alternative cells only through explicit bindings and checks.
- Inverse: none implied. Reverse traversal does not assert risk ownership,
  probability, valuation, or completeness.
- Loss: no probability model, likelihood, expected-loss computation, controls,
  risk attitude, affected-party trade-off, local binding, decision weight,
  ranking, or recommendation crosses the edge.

## Fail-closed boundary

Probability/Risk/Uncertainty retains authority for the consequence set and
any probability or expected-loss model. Choice owns the alternative-state
outcome and consequence cell. A consequence is not a probability; expected
loss is not the complete preference model; severity does not supply likelihood
or decision weight; and risk appetite is not inferred.

The canonical query retains `f27-check-consequence-alignment` as `unresolved`
and closure as `incomplete`. Structure cannot decide the affected entity,
scenario, horizon, control state, consequence basis, completeness, valuation,
or attitude. The negative fixture rejects an incorrect predecessor.

## Guide and Lab boundaries

The authored guide may show this route separately from its local synthetic
evaluation. Its local `unresolved` record says that additional escalations lack
a complete benefit, burden, and affected-party consequence basis. It does not
change the canonical query outcome.

F33 keeps the Composition Lab on its exact six-ID F1-F6 allowlist. This edge
must not appear in Lab controls, starters, closure, or continuations without a
separate interaction review.

## Claim boundary

Admission establishes a directional graph assertion and bounded structural
trace. It establishes no probability, expected loss, likelihood, severity,
risk acceptability, preference, decision weight, ranking, recommendation,
decision quality, reader success, or preview evidence.

## Published identities

- Canonical relation sidecar SHA-256: `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634`
- Exact assurance sidecar SHA-256: `9a566c472fc07c3d553cf13744be3a00565b04fe409a406161da287abfcf8edc`
- Composition Lab allowlist SHA-256:
  `35f17d2e24190be1be8897f38477a1c138d974223a73f850665e8439ef645f5a`
- Canonical query SHA-256: `3947d10e3d432f61c6ab67920b1bcfb54356993c17673659595d278b33719c85`
