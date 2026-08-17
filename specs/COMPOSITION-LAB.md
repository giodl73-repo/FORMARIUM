# Bounded Composition Lab Simulation Contract

Status: `sim-16` interactive simulation; not Composition Query V1, canonical
interchange, or production Workbench

## Purpose

The Composition Lab lets a reader construct one bounded working graph over the
an exact six-ID allowlist of reviewed F1-F6 relations from the ten-record
canonical sidecar. The reader explicitly supplies the problem,
seed artifacts, relation allowlist, direction, context, budgets, and optional
exclusion requests. The local browser runtime then performs deterministic
closure, exposes its boundary, assigns unresolved structural checks, and
flattens a noncanonical draft for reading.

This is the first automatic closure simulation. It does not infer seeds or
relations from the problem statement, discover semantic similarity, evaluate
domain evidence, or emit a valid `factorium-composition-query-v0` document.
The existing trace contract remains unchanged and authoritative for committed
worked examples.

## Exact inputs

| Input | Requirement | Effect |
|---|---|---|
| Problem | 10-240 visible characters | names the local work product; never selects semantics |
| Context profile ID | lower-kebab identifier | names the local context declaration |
| Context selections | one or more sorted `key=value` pairs, including `reference-frame` | enter identity and warnings; do not silently alter relation semantics |
| Seeds | 1-3 exact relation endpoint artifacts | Add admits required depth-zero nodes |
| Relation allowlist | 1-6 exact V0 relation IDs | Multiply may traverse only these edges |
| Direction | `forward` or `reverse` | determines predecessor and derived endpoint for every admitted edge |
| Edge budget | 1-6 | limits admitted relation records |
| Node budget | 3-24 | limits distinct working nodes, including evaluative scopes |
| Depth budget | 1-6 | limits derived-node depth |
| Exclusion requests | zero or more exact relation artifacts | Subtract records intent; required/evaluative reached nodes remain and conflict |

All identifiers come from the digest-bound reference and relation payload
generated with the site. There is no free-form artifact or relation ID input.

## Deterministic closure

1. Sort and admit seeds as required nodes at depth zero.
2. Sort the explicit relation allowlist by stable relation ID.
3. Repeatedly scan that allowlist until no working node changes.
4. A relation is eligible only when its direction-specific predecessor is
   already a working node.
5. Before traversal, require one remaining edge slot, a permitted next depth,
   and enough node slots for its derived endpoint and evaluative scope.
6. If an eligible relation would exceed a budget, do not admit it; record its
   derived endpoint as a frontier with exact relation and budget reason.
7. Otherwise admit the relation once, its derived endpoint as `required`, and
   its scope as `evaluative`, each with exact origin and predecessor.
8. Stop at stable artifact and relation identity. Markdown links, names,
   lexical similarity, and the ordinary-language problem never become edges.

An allowlisted relation whose predecessor is never reached becomes an explicit
unresolved requirement. It is not silently ignored and is not called a budget
frontier.

## Subtract, evaluate, and flatten

After closure, each requested exclusion is compared with the working graph.
If the target is a reached required or evaluative node, the node remains and a
conflict is recorded. An unreached target is reported as an inactive exclusion
request and does not create a graph conflict.

Each admitted relation contributes one unresolved structural check owned by
its exact scope view. Constraint and Diagnostic scopes preserve those check
kinds; Mapping and Evidence scopes use `completeness`. The simulation has no
domain observations or reviewer decision, so it cannot return a passed or
failed check.

Flatten emits one draft projection row per working node. Reached exclusion
targets have disposition `rejected`; all other rows are `selected`. Every row
declares `simulation-draft` loss. The draft summarizes graph structure only
and cannot be published as a Factor Guide without manual sense review,
context review, domain evaluation, source custody, and `.roles` review.

## State rules

State precedence is deterministic:

1. `contradictory` when at least one reached required/evaluative node has an
   exclusion conflict;
2. `truncated` when no conflict exists and at least one eligible traversal was
   stopped by a reached budget;
3. `incomplete` otherwise, because admitted checks remain unresolved or an
   allowlisted predecessor was not reached.

This simulation never emits `complete`. A complete structural trace requires
declared check outcomes that this browser lab is not authorized to invent.

## Identity and custody

The runtime builds canonical JSON with lexically sorted object keys and sorted
sets. The identity is lowercase SHA-256 over UTF-8 canonical result JSON. It
includes:

- exact reference and relation source digests;
- problem and context declaration;
- direction and budgets;
- seeds, relation allowlist, and exclusions;
- working nodes and edges;
- frontiers, unresolved requirements, conflicts, and checks;
- projection rows and state.

The same normalized request and source payload produce the same identity.
Changing problem, context, seed, relation, direction, budget, or exclusion
changes the canonical bytes and identity even when the visible graph happens
to be the same.

The result exists only in the current page. The lab uses no storage, URL-state
serialization, network request, analytics, account, collaboration, or
publication action. Reloading deletes the work product.

## Required interface disclosures

- Problem text does not choose concepts or edges.
- Only the six reviewed F1-F6 relations in the edition-local allowlist are
  available; canonical membership alone does not expose a relation here.
- Relation qualification is displayed before selection.
- Budget frontiers and unreachable predecessors remain visible.
- Unresolved checks prevent `complete`.
- Exclusion conflicts retain their required targets.
- The draft is not canonical content, a domain answer, or a reviewed guide.
- Canonical tables and full worked Factor Guides remain linked and primary.

## Conformance cases

| Case | Expected result |
|---|---|
| F1 source seed, F1 allowlisted, forward, sufficient budgets | F1 target and scope admitted; unresolved check; `incomplete` |
| Same normalized request twice | byte-identical canonical JSON and SHA-256 |
| Direction changes | predecessor/derived interpretation and identity change |
| Context selection changes only | graph may match, identity must change |
| Edge budget reached before second eligible relation | second derived endpoint is a visible frontier; `truncated` |
| Required reached node is excluded | node remains, conflict and rejected projection appear; `contradictory` |
| Allowlisted relation predecessor is unreachable | unresolved relation requirement; `incomplete` |
| Seed or relation order changes only | normalized result and identity remain unchanged |
| Problem text suggests an unselected relation | graph does not change |
| Reload | no prior query survives |

Adversarial tests must also reject unknown artifacts or relations, duplicate
IDs, missing `reference-frame`, invalid budgets, malformed context pairs, and
payload digest omissions.

## Evolution boundary

Promotion beyond this simulation requires a versioned successor contract for
sense selection/rejection, relation compatibility, check inputs and outcomes,
canonical trace export, persistence sensitivity, and publication workflow.
Those capabilities must not be inferred from this local prototype.
