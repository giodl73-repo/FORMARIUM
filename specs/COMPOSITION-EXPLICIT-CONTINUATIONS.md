# Composition Explicit Continuations Contract

Status: `sim-26` explicit next-request control edits derived from one identified
local result; not automatic repair, recommendation, result prediction, or
canonical query evolution

## Purpose

Result Reconciliation explains why a selected relation did not traverse or an
exclusion conflicted, but it leaves the reader to translate that reason back
into the staged form. Explicit Continuations offer one exact control edit for
the next request when the previous result determines that edit without
semantic inference.

Every action is optional, visible, and single-purpose. Activating it changes
one finite budget, one seed checkbox, or one exclusion checkbox. It never
submits the form, reruns closure, changes the displayed result, predicts the
next state, chooses a relation, interprets problem prose, or claims the edit is
useful. The Query Plan must mark the previous result stale until the reader
uses the existing `Run bounded closure` button.

## Pure continuation record

`buildContinuations(result, labPayload, readingPayload, resultSha256)` returns
`factorium-composition-continuations-v0` with inherited result and source
identity, sorted action records, exact input preconditions, and a permanent
no-prediction boundary.

An action has:

- stable edition-local ID and source result decision;
- kind: `raise-budget`, `add-seed`, or `remove-exclusion`;
- exact target control and before/after value;
- human label and structural explanation;
- `available` plus an exact unavailable reason when UI limits prohibit it;
- the previous result SHA-256, but no new digest.

Only non-traversed selected relations and selected exclusions yield actions.
Admitted relations, checks, problem prose, context controls, direction, and
unselected identities yield none.

## Deterministic action rules

| Result decision | Exact proposed edit |
|---|---|
| `edge-budget-before-*` frontier | raise edges from declared cap to cap + 1 |
| `depth-budget-before-*` frontier | raise depth to predecessor depth + 1 |
| `node-budget-before-*` frontier | raise nodes to current nodes plus missing derived/scope nodes |
| `atomic-relation-needs-N-node-slots` | raise nodes to current node count + N |
| `atomic-relation-needs-N-work-slots` | raise work to observed work + N |
| `depth-budget-not-reached-by-working-graph` | raise depth to predecessor depth + 1 |
| `atomic-frontier-needs-1-work-slot` | raise work to observed work + 1 |
| `selected-predecessor-not-reached` | add the exact traversal predecessor as a seed |
| reached exclusion conflict | remove that exact exclusion request |
| inactive exclusion | remove that exact exclusion request |

Budget actions are available only within the Lab maxima: depth/edges 6, nodes
24, work 64. Add-seed is available only when the predecessor is an exact
relation endpoint, is not already selected, and fewer than three seeds are
selected. An action outside these limits remains visible as unavailable and
names the limit; it does not invent a broader repair.

Every derived target is revalidated from digest-bound relation, reading, and
working-node records. Unknown reasons, missing predecessors, inconsistent frontier
artifacts, mismatched relation records, duplicate controls, or source digest
drift fail closed.

## Application behavior

Actions appear inside `What happened to your request` under `Possible next
request edits`. Each button states the exact edit, such as `Raise edge budget:
1 → 2`, `Add obligation source as a seed`, or `Remove interface exclusion`.
Nearby text says the edit may expose another boundary and does not predict the
next result.

Before mutation, the runtime verifies the target control still matches the
action's before-value. If the reader already changed it, no value is
overwritten and the action reports `Not applied: controls changed since this
result.` A successful action:

1. changes exactly one form control;
2. emits the control's normal bubbling input/change event;
3. moves no focus away from the activated button;
4. leaves the previous identified result, map, route, and reconciliation visible;
5. reports the applied edit beside the actions;
6. causes the Query Plan to say `controls-changed`;
7. never submits or invokes closure.

Multiple actions may be applied deliberately, one button activation per edit,
provided each target control still satisfies its own precondition. Reload
removes the result and actions as before. No query, action, or result is stored.

Compact, Abbreviated, Book, and Full retain all available action labels and
the no-prediction boundary. Full additionally exposes exact action ID, source
reason, control name, and inherited result identity.

## Conformance

- Frontier starter proposes edges 1 → 2 and does not rerun.
- Atomic work case proposes work 8 → 9 and admits no partial relation before rerun.
- Node atomic capacity proposes the exact node count required for the bundle.
- Depth capacity proposes predecessor depth + 1.
- Unreachable predecessor proposes its exact endpoint as a seed when a slot exists.
- Conflict and inactive exclusions each propose removal of only that checkbox.
- Controls already edited are not overwritten by stale actions.
- Applying an action leaves the prior result identity intact and changes the
  live Query Plan alignment to `controls-changed`.
- Input-order changes produce byte-equivalent action records.
- No action path calls submit, closure, identity, storage, URL, or network APIs.
- `sim-25` retains exact site and standalone identities.

## Claim boundary

This establishes deterministic, explicit control-edit mechanics. It does not
establish that an edit is desirable, minimal across all future boundaries,
sufficient for admission, semantically valid, compatible, domain-correct,
understood, accessible for a population, performant, successful in a task,
canonical, publishable, or `preview-01` evidence.
