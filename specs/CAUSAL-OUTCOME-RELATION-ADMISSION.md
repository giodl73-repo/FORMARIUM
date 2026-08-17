# Causal-Scope-to-Outcome Relation Admission

Status: F32 admitted canonical relation

## Decision

Admit one exact cross-entry relation record:

```text
relation f27-causal-scope-qualifies-outcome | qualifies-outcome-scope-of | factor:causal-reasoning/outcome-measure-and-time-horizon | factor:choice-alternative-selection/alternative-state-outcomes-and-consequences | view:decision-alternative-selection | causal-status=declared-causal-status,contrast=declared-contrast,horizon=declared-horizon,outcome=declared-outcome,population=declared-population | tables/decisions/alternative-selection.md
```

This is a canonical type-level review route. It says that declared causal
scope can qualify an alternative-state outcome only under the complete
qualifier contract. It does not identify a causal effect or assert that an
intervention produced an outcome.

## Direction, cardinality, and loss

- Direction: causal outcome scope -> alternative-state outcome.
- Type-level cardinality: one reviewed factor type to one reviewed factor type.
- Guide-instance cardinality: many local scopes may qualify many local outcomes
  only through explicit bindings and checks.
- Inverse: none implied. Reverse traversal does not establish a causal design,
  contrast, identification strategy, or estimate.
- Loss: the edge carries no full causal artifact, design, assumptions,
  identification result, estimate, uncertainty, transport judgment, local
  binding, alternative ranking, or recommendation.

## Fail-closed boundary

Association, temporal order, before/after change, and shadow-mode observation
must not be promoted to an intervention effect. Causal Reasoning retains
authority for design, identification, estimation, uncertainty, and transport;
Choice owns only the alternative-state outcome description used by the
decision view.

The canonical query retains `f27-check-causal-outcome-scope` as `unresolved`
and closure as `incomplete`. Canonical structure cannot decide causal status,
the relevant contrast, identification, transport, effect size, benefit, harm,
or option ranking. The negative fixture rejects an incorrect predecessor.

## Guide and Lab boundaries

The authored guide may show this route separately from its synthetic local
evaluation. Its local `fail` records that `SYN-02` is shadow-mode association,
not an intervention effect; it does not change the canonical query outcome.

F32 keeps the Composition Lab on its exact six-ID F1-F6 allowlist. This edge
must not appear in Lab controls, starters, closure, or continuations without a
separate interaction review.

## Claim boundary

Admission establishes a reviewed directional graph assertion and a bounded
structural trace. It establishes no causal identification, causal effect,
estimate, transport, benefit, harm, alternative ranking, recommendation,
decision quality, reader success, or preview evidence.

## Published identities

- Canonical relation sidecar SHA-256: `76ff0bb2215449b2b751a4052551bd1134a0e358e60f0af1c12ffb1ee9f8fbbb`
- Exact assurance sidecar SHA-256: `ae5e63d86e31b359a5958da5cd0ca580f1d4048f53f9b4ed37bbccaa44987c45`
- Composition Lab allowlist SHA-256:
  `35f17d2e24190be1be8897f38477a1c138d974223a73f850665e8439ef645f5a`
- Canonical query SHA-256: `aabda3688998a26d00f3862cd00cbb10b13e8f2524811e6fc47dea184899b1e5`
