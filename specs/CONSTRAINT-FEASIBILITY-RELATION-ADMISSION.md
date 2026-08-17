# Constraint-to-Feasibility Relation Admission

Status: F31 admitted canonical relation

## Decision

Admit one exact cross-entry relation record:

```text
relation f27-constraint-filters-feasibility | constrains-feasibility-of | factor:policy-rule-constraint-decision-exception/constraints-and-invariants | factor:choice-alternative-selection/feasibility-constraints-and-exclusion-rationale | view:decision-alternative-selection | applicability=declared-applicability,authority=declared-authority,effective-period=declared-effective-period,hard-or-soft=declared-hard-or-soft,version=declared-version | tables/decisions/alternative-selection.md
```

This is a canonical type-level review route. It says that a governing
constraint can constrain an alternative's feasibility only under the complete
declared qualifier contract. It does not say that a particular constraint is
authoritative, effective, applicable, hard, satisfied, violated, enforced, or
sufficient to exclude an alternative.

## Why this relation next

The F27 guide already distinguishes hard feasibility constraints from soft
criteria and retains different statuses for three alternatives. This edge
teaches a reusable noncompensatory boundary: preference or score cannot erase
an applicable hard constraint, while a soft criterion cannot silently become
an exclusion. It connects two existing authorities without copying policy
custody into the Choice entry.

## Direction, cardinality, and loss

- Direction: governing constraint source -> alternative-feasibility target.
- Type-level cardinality: one reviewed factor type to one reviewed factor type.
- Guide-instance cardinality: many local constraints may constrain many local
  alternatives only through explicit bindings and checks.
- Inverse: none implied. Reverse traversal may locate the governing source but
  does not assert `governed-by`, applicability, compliance, or exclusion.
- Loss: the edge carries no full policy/rule/exception artifact, policy intent,
  derived decision, enforcement state, local constraint-to-alternative
  binding, satisfaction result, option status, ranking, or recommendation.

## Canonical closure fixture

The positive Composition Query starts at the Policy/Rule constraint factor,
follows only this relation forward, and retains the Decision view as its
evaluative scope. `f27-check-constraint-applicability` and closure state remain
`unresolved`/`incomplete`: canonical structure cannot decide authority,
version, effective period, applicability, hard/soft status, exception status,
or whether an alternative satisfies the constraint.

Negative coverage must reject an incorrect relation-derived predecessor and a
source-digest mismatch. Existing relation-kind fixtures continue to reject
missing, extra, duplicate, unordered, and inverse-looking qualifier forms. The
authored guide retains expired/soft-as-hard and unknown-exception boundaries.

## Guide boundary

The Evidence-Informed Intervention Choice Guide may display this canonical
route separately from its local synthetic evaluation. Its local pass applies
only to the limited trial under the authored `ESC-04` assumptions; broad
adoption remains unresolved. That local record does not change the canonical
query's unresolved state or prove enforcement, compliance, benefit, or final
selection.

## Composition Lab boundary

Canonical graph membership and interactive availability remain separate. F31
keeps the Composition Lab on its exact six-ID edition-local F1-F6 allowlist.
The new edge must not appear in Lab controls, palette, starters, closure, or
continuations without a separate reader-facing interaction review.

## Assurance and claim boundary

The changed relation-sidecar digest requires fixed-point review bindings for
every record in that shared source. All canonical Composition Query fixtures
must bind the new exact relation digest.

Admission establishes a reviewed directional graph assertion and a valid
bounded structural trace. It establishes no local constraint applicability,
legal or policy interpretation, compliance, exclusion, optimality,
recommendation validity, decision quality, reader success, or preview evidence.

## Published identities

- Canonical relation sidecar SHA-256:
  `76ff0bb2215449b2b751a4052551bd1134a0e358e60f0af1c12ffb1ee9f8fbbb`
- Exact assurance sidecar SHA-256:
  `ae5e63d86e31b359a5958da5cd0ca580f1d4048f53f9b4ed37bbccaa44987c45`
- Composition Lab allowlist SHA-256:
  `35f17d2e24190be1be8897f38477a1c138d974223a73f850665e8439ef645f5a`
- Canonical query SHA-256:
  `f3e1cbeea6d7cfa143c173e89bc2ef666562020f144c7a2ee108b8faf261ee7d`
