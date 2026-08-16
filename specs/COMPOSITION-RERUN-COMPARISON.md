# Composition Rerun Comparison Contract

Status: proposed `sim-27` ephemeral comparison of one continuation source
result with the next explicitly executed local result; not history,
recommendation, repair scoring, or canonical query lineage

## Purpose

Explicit Continuations can stage exact next-request edits, but the current Lab
replaces the previous result after the reader separately chooses `Run bounded
closure`. A reader can therefore see the new result but cannot audit which
request changes were actually executed or which structural records changed.

Rerun Comparison retains one prior identified result in page memory only after
at least one continuation action is successfully applied. On the next explicit
form submission it compares that source result with the newly identified
result. It reports observed differences without calling them improvement,
progress, repair, resolution, success, or regression.

## Pure comparison record

`buildRerunComparison(previousIdentified, currentIdentified, appliedActions,
labPayload, readingPayload)` returns
`factorium-composition-rerun-comparison-v0` with:

- exact previous and current result SHA-256 identities;
- repeated reference and relation source digests, which must agree across both
  results and both payloads;
- the exact successfully activated continuation action records;
- one action disposition per action: `present-in-executed-request` or
  `superseded-before-run`;
- atomic request changes across problem, Context Profile and selections,
  direction, four budgets, seeds, relations, and exclusions;
- exact before/after state, work, graph, relation-decision, exclusion-decision,
  and evaluation differences;
- deterministic counts and a permanent non-evaluative boundary;
- no new digest or canonical identity.

Both results are revalidated against the exact six Lab relation records and 18
reading bindings. Selected relations must partition into admitted edge,
frontier, or unresolved records; selected exclusions must partition into
conflict or inactive records; unselected boundary records, duplicate
identities, unknown reasons, mismatched edges, malformed checks, source drift,
and invalid SHA-256 values fail closed.

## Request comparison

Scalar request fields compare by normalized exact value. Set-valued controls
compare as sorted exact identities and emit one atomic addition or removal per
artifact. Context selections compare by sorted key/value identity.

An atomic change is attributed to a continuation action only when it exactly
matches that action's declared target and before/after value. Every other
change is labelled `additional-control-edit`. If a reader applies an action
and then changes that control again before Run, the action is
`superseded-before-run`; the actually executed difference remains visible as
an additional edit. No difference is inferred from button labels or prose.

The `sim-27` runtime reconstructs the prior result's exact continuation record
from digest-bound inputs and matches the clicked edition-local action ID after
the existing button reports successful application. Pure parity tests require
that this reconstruction match the `sim-26` continuation projection for every
covered reason class. A refused or unavailable click is never captured.

## Result comparison

The result comparison reports only structural records:

- closure state before and after, with no ordered good/bad scale;
- work and node/edge/frontier/unresolved/conflict/check counts before and after;
- each selected relation's decision transition among `admitted`, `stopped`,
  `capacity-limited`, `predecessor-unreached`, and `not-selected`;
- each exclusion's transition among `conflict`, `inactive`, and
  `not-selected`;
- working nodes added, removed, or changed in class, depth, origin, or
  predecessor;
- evaluation checks added, removed, or changed in kind, target, or outcome.

Unchanged relation, exclusion, node, and check counts remain in the record for
accounting. The reader surface leads with changes and folds exact unchanged
custody. An admitted relation still has an unresolved structural check and is
never labelled semantically satisfied.

## Runtime lifecycle

1. The first result renders normally and establishes no comparison.
2. A successful continuation button activation records its exact action and
   the currently displayed identified result in page memory.
3. Additional successful actions from that same result may join the pending
   set; each activation remains a separate explicit control edit.
4. Manual control edits may follow and are not forbidden or attributed to an
   action.
5. Only the existing explicit form submit executes closure.
6. After the current result, reconciliation, and continuation actions render,
   the comparison appears between Result Reconciliation and the Closure Map.
7. The pending source/actions are consumed. A later run without a newly
   applied continuation shows no comparison.
8. Reload removes all results, actions, and comparison state.

The feature uses no local/session storage, IndexedDB, URL state, network,
export, canonical trace, or multi-step history. Loading a starter or making
many manual edits may produce a broad next-request comparison; the receipt
must expose those edits rather than attribute the whole result delta to the
continuation action.

## Reader views

Book leads with `Compared with your previous run`, the identities of recorded
edits in human language, whether each survived into the executed request,
atomic additional edits, the exact state pair, and changed relation/exclusion
decisions. Compact retains action disposition, all request changes, state,
changed decision counts, and the non-evaluative boundary. Abbreviated retains
short node/check summaries. Full exposes every exact artifact, raw
before/after record, source digest, and both inherited result identities.

If comparison validation fails, the current result, reconciliation, map,
audit, and reading route remain authoritative. A local comparison-unavailable
notice may not erase or relabel either result.

## Conformance

- Frontier edges 1 → 2 followed by explicit Run records the budget action as
  present, the exact budget change, and F6 `stopped at edge budget → stopped at
  node budget`. The frontier remains visible with its newly exposed reason;
  the receipt does not call the edit a success. A later separately derived
  node edit may be required.
- Conflict exclusion removal followed by Run records that action as present,
  the exact exclusion removal, and `conflict → not-selected`; it does not call
  the current result valid.
- Work 8 → 9 records exact work budget and capacity-limited → admitted
  structural changes.
- An applied action changed again before Run is `superseded-before-run`, and
  the executed control difference is labelled additional.
- Additional problem, context, direction, seed, relation, exclusion, or budget
  edits are listed atomically and never attributed to the action.
- Reordered source arrays produce byte-equivalent comparison JSON.
- A manual Run with no newly applied continuation emits no comparison.
- A second Run without another continuation clears the prior comparison.
- No path submits, runs closure, predicts state, scores an action, stores,
  transmits, exports, or mints identity.
- `sim-26` retains exact site and standalone identities.

## Claim boundary

This establishes deterministic local before/after accounting after an explicit
rerun. It does not establish that the action caused every observed difference,
was desirable, minimal, sufficient, successful, semantically valid,
compatible, domain-correct, understood, accessible for a population,
performant, canonical, publishable, or `preview-01` evidence.
