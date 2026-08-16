# Composition Result Reconciliation Contract

Status: `sim-25` deterministic projection of one identified local Composition
Lab result; not a recommendation, semantic verdict, canonical trace, or reader
evidence

## Purpose

The Composition Lab exposes the full execution audit, closure map, and reading
route, but a reader still has to reconcile the pre-run controls with several
post-run sections to answer: what was selected, what was admitted, what
stopped, what stayed unresolved, what conflicted, and which budgets were used?

The reconciliation view answers only those record-accounting questions. It is
computed from the identified result and digest-matched relation and reading
payloads. It does not rerun closure, inspect problem prose, infer an omitted
relation, score relevance, interpret a domain check, or change the result.

## Pure record

`buildReconciliation(result, labPayload, readingPayload, resultSha256)` returns
`factorium-composition-reconciliation-v0` containing:

- the inherited result SHA-256 and repeated source digests;
- the exact closure state and a structural explanation derived only from
  conflicts, frontiers, unresolved selected relations, and unresolved checks;
- one seed decision per selected seed, each verified as a required depth-zero
  working node with origin `seed`;
- one relation decision per selected relation, classified into exactly one of
  `admitted`, `stopped`, `capacity-limited`, or `predecessor-unreached`;
- one exclusion decision per selected exclusion, classified into exactly one
  of `conflict` or `inactive`;
- a finite budget ledger for depth, edges, nodes, and work with declared cap,
  observed use, and `reached` or `remaining` status;
- counts that reconcile exactly to the selected request sets.

Relation decisions preserve canonical source and target separately from the
request's direction-aware predecessor and derived endpoint. `admitted` binds
the exact edge and unresolved check. `stopped` binds the exact frontier and
reason. `capacity-limited` and `predecessor-unreached` bind the exact unresolved
record and reason. A selected relation may appear in no more and no fewer than
one class. The projection fails closed on overlap, omission, unknown identity,
payload digest disagreement, malformed result records, or noncanonical reason
classes.

Unselected relations and exclusions are absent. Their absence does not mean
they were evaluated and rejected.

## State explanation

State explanation follows the Lab's existing precedence without inventing a
second state machine:

1. `contradictory`: name the number of reached exclusion conflicts;
2. `truncated`: name the number of explicit budget frontiers;
3. `incomplete`: name unresolved checks and selected relations whose
   predecessor or atomic capacity remains unresolved.

The reconciliation never emits `complete`, `valid`, `approved`, `compatible`,
or `recommended`. An admitted relation means structurally traversed under the
explicit request, not substantively satisfied.

## Interface

After execution and before the detailed map/audit, show `What happened to your
request` with:

- a one-sentence structural state explanation;
- compact totals for selected seeds, selected/admitted relations, exclusions,
  and finite work used;
- a four-row budget ledger showing used / cap and reached / remaining;
- a decision list for every selected relation and exclusion using human labels
  and F-codes, with exact reasons retained in Full;
- a permanent note that unselected routes were not evaluated.

Book is the default and shows human route, decision, reason in plain language,
and budget ledger. Compact retains totals, state explanation, every decision
label, and the unselected boundary while reducing metadata. Abbreviated keeps
short reasons. Full exposes exact artifacts, relation qualifications, raw
reason tokens, source digests, and inherited result identity. The view does
not alter form controls, focus order, result identity, map, reading route, or
the existing six-stage audit.

If the reconciliation asset is absent or rejects a result, all `sim-24`
execution, audit, map, and reading behavior remains usable. A local unavailable
notice may be shown only inside the reconciliation shell.

## Conformance

- Default F1: one seed admitted, F1 admitted, no exclusions, depth/edge/work
  reached, nodes remaining, one unresolved check, state incomplete.
- Conflict starter: F1 admitted, one exclusion classified conflict, state
  contradictory, no relation is relabelled rejected.
- Frontier starter: F2 admitted, F6 stopped with its exact edge-budget reason,
  two seeds retained, state truncated.
- Work-capacity case: F1 capacity-limited with its exact atomic work reason,
  no admitted relation, state incomplete.
- Unreachable selection: selected relation classified predecessor-unreached.
- Reverse starter: displayed predecessor/derived route reverses while canonical
  source/target remains unchanged.
- Reordered result arrays produce byte-equivalent reconciliation JSON.
- Selected relation and exclusion partition counts reconcile exactly.
- `sim-24` retains exact site and standalone identities.

## Claim boundary

This establishes deterministic request/result reconciliation mechanics only.
It does not establish reader comprehension, useful choices, useful defaults,
semantic validity, compatibility, domain correctness, task success,
accessibility for a population, performance, canonical-query emission,
publication, or `preview-01` evidence.
