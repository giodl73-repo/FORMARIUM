# Evidence-to-Evaluation Relation Admission

Status: F29 admitted canonical relation

## Decision

Admit one exact cross-entry relation record:

```text
relation f27-evidence-qualifies-evaluation | qualifies-evaluation-of | factor:claim-evidence/supporting-and-contradicting-implications | factor:choice-alternative-selection/evidence-quality-applicability-and-uncertainty | view:decision-alternative-selection | claim=declared-claim,horizon=declared-horizon,limitation=declared-limitations,outcome=declared-outcome,population=declared-population,provenance=declared-provenance | tables/decisions/alternative-selection.md
```

This is a canonical type-level edge template. It says that the stated
evidence factor can qualify an alternative evaluation only under the complete
declared qualifier contract. It does not say that any particular evidence is
applicable, supportive, true, sufficient, or decision-determining.

## Why this relation first

The synthetic F27 guide already exercises this join as unresolved, making its
failure boundary visible. The relation connects two existing authorities
without transferring the evidence record itself or copying evidence custody
into the choice entry. It is narrower than admitting all five bridge edges at
once and can be tested with one three-node closure.

## Direction, cardinality, and loss

- Direction: evidence qualification source -> alternative-evaluation target.
- Type-level cardinality: one reviewed factor type to one reviewed factor type.
- Guide-instance cardinality: many local evidence records may qualify many
  local alternative evaluations only through explicit bindings and checks.
- Inverse: none implied. Reverse traversal may locate the canonical source but
  does not assert `evaluated-by`, applicability, support, or sufficiency.
- Loss: the edge carries no full evidence artifact, observation, estimate,
  support direction, causal status, local binding, or recommendation.

## Canonical closure fixture

The positive Composition Query starts at the evidence factor, follows only
this relation forward, and retains the Decision view as its evaluative scope.
Its check outcome and closure state are `unresolved`/`incomplete`: structural
admission cannot decide whether evidence matches the local claim, population,
outcome, horizon, provenance, and limitation.

Negative coverage must reject an unknown or omitted edge, an incorrect
relation-derived predecessor, and a source-digest mismatch. The existing F28
fixtures continue to reject missing, extra, duplicate, unordered, and
inverse-looking relation grammar.

## Composition Lab boundary

Canonical graph membership and interactive availability are separate. F29
keeps the current Lab on an exact six-ID edition-local allowlist while the
canonical sidecar grows independently. F31 brings it to eight records without
widening the Lab. The allowlist has its own source
file and digest. The Lab must not display, select, discover, or traverse the
new edge until its reader-facing controls and evaluation behavior receive a
separate design review.

## Assurance and claim boundary

The changed relation-sidecar digest requires a fixed-point review binding for
every record in that shared source. Existing F1-F6 records are byte-identical
apart from their containing manifest and are re-bound through the F29
whole-sidecar review. Query fixtures must bind the new relation digest.

Admission establishes a reviewed directional graph assertion and a valid
bounded structural trace. It establishes no evidence applicability, causal
effect, alternative ranking, recommendation, decision quality, semantic
completeness, reader success, or preview evidence.

## Published identities

- Canonical relation sidecar SHA-256:
  `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634`
- Exact assurance sidecar SHA-256:
  `11a17d3077bd32be242a256e64cec2096a3edc8ab90d3fbfa3d9d4d4c3b4b7db`
- Composition Lab allowlist SHA-256:
  `35f17d2e24190be1be8897f38477a1c138d974223a73f850665e8439ef645f5a`
- Canonical query SHA-256:
  `c954068e094d5052a5345f67d10faac2906bf57df34ee2840e792962bf46b675`

These current identities include the F31 whole-sidecar assurance and query
digest migration; the evidence relation record itself is byte-identical to
its F29 admission.
