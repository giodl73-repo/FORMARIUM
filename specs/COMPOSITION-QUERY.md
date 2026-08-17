# Composition Query Trace V0

Status: bounded manual-rehearsal contract

## Purpose

A Composition Query Trace records one author-declared closure over canonical
Factorium artifacts. It makes the selected concepts, context, admitted typed
relations, bounded working graph, evaluations, unresolved frontier, and
flattened projection reproducible. It does not discover relations, infer a
domain answer, or create canonical reference content.

The trace is the machine-readable manifest beneath a human-readable worksheet.
The worksheet owns explanatory prose; the trace owns exact identity and graph
custody.

## Canonical grammar

```text
factorium-composition-query-v0
query <lower-kebab-id>
problem <single-line ordinary-language statement>
source <reference-sha256> | <relations-sha256>
context <profile-id> | <sorted-key=value selections>
policy direction=<forward|reverse>,follow=evaluative-required,stop=stable-identity
budget depth=<nonnegative>,edges=<positive>,nodes=<positive>,work=<positive>
seed <artifact-ref>
node <artifact-ref> | <class> | <depth> | <origin> | <predecessor-or-none>
edge <relation-id>
frontier <artifact-ref> | <reason-id>
conflict <conflict-id> | <artifact-ref> | <reason-id>
check <check-id> | <kind> | <artifact-ref> | <outcome>
projection <artifact-ref> | <disposition> | <loss-id>
state <complete|incomplete|contradictory|truncated>
end-query
```

Records occur in the shown section order. Repeated records are strictly sorted
and unique by their first field. Text is UTF-8, LF-only, canonically spaced,
and ends in LF. Artifact references use the V0 sidecar forms `entry:`,
`sense:`, `factor:`, and `view:`. Context selections and budget keys are
strictly sorted.

The V0 policy admits one direction and the fixed `evaluative-required` follow
set; broader policies require a successor contract. Node classes are
`required`, `evaluative`, `explanatory`, `provenance`,
`optional`, `excluded`, and `unresolved`. Origins are `seed`,
`relation:<relation-id>`, `scope:<relation-id>`, or `manual:<reason-id>`.
Relation and scope origins name an exact predecessor node; other origins use
`none`.
Check kinds are `constraint`, `diagnostic`, `procedure`, `formula-scope`, and
`completeness`; outcomes are `pass`, `fail`, and `unresolved`. Projection
dispositions are `selected`, `rejected`, and `unresolved`. A loss ID names
what the readable projection retains or omits; `retained` means no declared
loss for that row.

## Validation invariants

- Source digests match the exact canonical reference and relation sidecars.
- Every seed, node, frontier, conflict target, check target, and projection
  target resolves through the selected reference.
- Every edge resolves through the selected relation sidecar. Its source,
  target, and scope nodes are present and not excluded.
- Multiple edges may share one canonical node. The node origin retains one
  valid discovery path; the complete sorted edge set retains all incident
  admitted traversals required by the query.
- A seed is a depth-zero `required` node with origin `seed`.
- A relation-derived node names an admitted edge, exact predecessor, and
  policy-consistent direction; a scope-derived node names an admitted edge,
  exact predecessor, and equals that edge's scope.
- Node, edge, depth, and total-work counts do not exceed declared budgets.
- `complete` has no frontier, conflict, unresolved node, unresolved check, or
  failed check.
- `incomplete` has at least one unresolved node, unresolved check, or frontier.
- `contradictory` has at least one explicit conflict.
- `truncated` has a frontier and reaches at least one declared budget exactly.
- At least one check and one projection are declared. Projection rows point
  only to working-graph nodes.

These are structural invariants, not proof that the chosen closure is
semantically sufficient. `add`, `multiply`, `subtract`, `evaluate`, and
`flatten` remain interface labels over these typed records, not arithmetic.

## Boundary and evolution

V0 is intentionally a manual fixture contract over the eleven-edge reviewed
relation sidecar. The current interactive Composition Lab separately exposes
only its exact six-ID F1-F6 allowlist. The trace contract leaves
natural-language intent, rejected sense narratives,
relation discovery, compatibility inference, automatic expansion, graph
editing, persistence, collaboration, and publication to later reviewed
contracts. New semantics require a versioned successor, not reinterpretation
of these records.
