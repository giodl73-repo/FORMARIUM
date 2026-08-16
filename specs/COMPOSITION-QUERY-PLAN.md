# Composition Query Plan Simulation Contract

Status: `sim-23` live projection of visible explicit controls; not closure,
semantic inference, a canonical query, recommendation, persistence, or reader
evidence

## Purpose

The Composition Lab exposes every control, but a reader must currently scan
five separate form stages to answer a simpler question: “What exactly am I
about to ask Factorium to do?” The Composition Query Plan condenses the current
visible controls into one compact pre-execution receipt beside the form. It
makes authored starters inspectable and makes subsequent edits visible before
`Run bounded closure` remains a separate action.

The plan is a projection, not an execution preview. It does not predict which
relations will be admitted, which nodes will close, which checks will exist,
or whether the result will be incomplete, contradictory, or truncated.

## Exact input and record

The pure projection receives only:

- current problem, Context Profile ID and selections, direction, and finite
  depth, edge, and node controls;
- checked seed, relation, and exclusion identities;
- the digest-bound six-relation Composition Lab allowlist payload;
- the digest-bound 18-record Composition Reading payload.

It returns `factorium-composition-query-plan-v0` with the repeated reference
and relation digests, graph-inert problem text, exact frame and budget
controls, human-bound seed and exclusion records, direction-aware traversal
records for selected relations, deterministic counts, and one control state:
`control-complete` or `needs-explicit-controls`.

Seed, relation, and exclusion identities sort lexically and must be unique.
Every artifact resolves through an exact reading binding; every relation
resolves through the six-record allowlist. Reverse direction changes the
displayed traversal predecessor and derived endpoint but never rewrites the
canonical source-to-target relation. Generation fails closed on payload digest
disagreement, unknown or duplicate identities, missing bindings, or malformed
payload structure.

The problem text is trimmed for display but never parsed. Context selections
are validated only as unique lower-kebab `key=value` controls with an explicit
`reference-frame`; their domain meaning is not interpreted. Control
completeness uses the same visible ranges as the lab: problem length 10-240,
one valid Context Profile ID, valid context pairs, forward or reverse
direction, depth and edges 1-6, nodes 3-24, one to three seeds, and one to six
relations. A partial or invalid form yields exact control diagnostics without
inventing defaults.

The plan mints no digest or work-product identity. Only a successfully executed
lab result owns a local SHA-256 over canonical result JSON.

## Interface

The existing sticky “Before you run it” card begins with `Your explicit query
plan` and shows:

- the current control state and the graph-inert problem label;
- **Add** with selected human concept labels and owning entry links;
- **Multiply** with selected F1-F6 code, verb, direction-aware human route,
  and direction word;
- **Subtract** with selected human exclusion labels or `No exclusion
  requested`;
- **Frame** with Context Profile ID and exact selections;
- **Bound** with direction and all three finite budgets;
- a visible statement that closure, evaluation, state, and results have not
  been computed.

Full view additionally exposes exact artifact IDs, canonical relation order,
qualifications, and source digests. Book retains human labels, relation codes,
route, context, and bounds. Compact and Abbreviated may reduce explanation and
exact metadata but never hide selected controls, direction, budgets, control
state, or the no-execution boundary.

The plan updates on `input` and `change`, including authored-starter loads. It
uses a polite status region, never moves focus, never changes a form value,
and never submits the form. Runtime-only alignment distinguishes `not-run`,
`matches-displayed-result`, and `controls-changed`. A successful local result
captures the deterministic plan record in memory without hashing or exposing
an identity. A later edit retains the prior result but warns that it describes
the previous controls and requires another explicit Run. Loading a starter
clears the result and returns alignment to `not-run`. Reload deletes both the
result and this ephemeral comparison.

## Failure and evolution boundary

If plan assets are absent, the complete `sim-22` form, static contract card,
starter routes, execution, map, audit, and reading route remain usable. If the
projection rejects a runtime input, the plan shows one local unavailable
notice and changes no control or result.

The runtime uses no network, storage, URL state, analytics, closure call,
result hashing, recommendation, semantic search, or publishing action. The
reader-view preference remains the only optional persisted display state and
is not an input to the plan record.

## Conformance cases

| Case | Required plan |
|---|---|
| Default F1 | one Add concept, one forward F1 human route, no subtraction, exact finite bounds |
| Reverse F4 starter | target seed retained; route displays target-to-source traversal while Full preserves canonical source-to-target relation |
| Required-interface conflict starter | exact required interface appears under Subtract; no contradiction is predicted before Run |
| Delegated-compliance frontier starter | two Add concepts and F2/F6 appear; one-edge bound is visible; no frontier is predicted |
| Seed removed | `needs-explicit-controls` names Seeds while retaining all other selected controls |
| Invalid context selection | diagnostic names Context selections; no inferred repair |
| Input arrays reordered | byte-equivalent pure plan record |
| Profile change | same pure plan record and controls; display detail only changes |
| Starter load | one update reflects every loaded explicit control without auto-run and resets result alignment |
| Edit after Run | plan says controls changed and the displayed result belongs to the previous request |
| Plan runtime absent or rejects input | base `sim-22` interaction remains usable |

Pure checks cover default, reverse, conflict, frontier, partial/invalid
controls, unknown and duplicate IDs, payload drift, ordering invariance, and
profile-independent bytes. Generated-site checks cover manifest boundaries,
asset ordering, required labels, and no storage/network/execution mechanism.
Browser checks cover initial rendering, live edits, all starter consequences,
profile display, unchanged control snapshots, separate Run, result/plan
agreement on request controls, reload, mobile layout, and fallback surfaces.

## Claim boundary

This simulation establishes deterministic control-summary mechanics only. It
does not establish that readers understand the plan, choose useful concepts or
relations, avoid mistakes, predict closure, complete a task, prefer the
defaults, or can use the interface accessibly. It is not a canonical query,
semantic parser, result preview, compatibility check, domain evaluation,
recommendation, persistence, collaboration, publication, or `preview-01`
evidence.
