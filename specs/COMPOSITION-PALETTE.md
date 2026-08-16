# Composition Concept Palette Simulation Contract

Status: `sim-19` progressive interface simulation; not semantic search,
automatic seed selection, relation recommendation, or reader evidence

## Purpose

The bounded Composition Lab exposes exact reviewed inputs, but a flat list of
12 factor artifacts makes readers parse identifiers before they can frame a
query. The Composition Concept Palette groups those same controls by their six
owning anchor entries, replaces slug-derived display text with exact reference
labels, and reports which typed relations are structurally reachable from the
current explicit selections.

The palette changes presentation only. It does not add, remove, preselect,
disable, rank, or automatically traverse a concept or relation. The submitted
request and closure engine remain unchanged.

## Exact concept groups

The palette consumes the digest-bound Composition Reading payload and requires:

- exactly 12 anchor factor bindings;
- exactly six distinct fragment-free owning entry destinations;
- exactly two reviewed endpoint factors per owning entry in this prototype;
- exact factor label, artifact ID, page title, and owning page for every
  checkbox already emitted by the Composition Lab;
- no extra or missing checkbox compared with the binding set.

The group containing the default selected seed appears first; other groups
sort by human page title, and factors sort by exact label and artifact ID.
Each group uses native `details` and `summary`. The selected group opens
initially; the other five remain compact. `Open all topics` opens every group,
and `Collapse topics` returns to selected groups only. Toggling disclosure
never changes checkbox state.

If the palette extension is unavailable after the base lab initializes, the
original flat exact controls remain usable. Without JavaScript, the lab's
boundary remains readable but its generated controls and closure do not run.

## Relation readiness

Readiness is deterministic display metadata over explicit controls:

1. Start with the exact selected endpoint seeds.
2. Use only currently selected relations, sorted by relation ID.
3. Repeatedly add a direction-specific derived endpoint when that relation's
   predecessor is already reachable.
4. Stop at a stable endpoint set.
5. Classify every reviewed relation:
   - `seed-ready` when its predecessor is an explicit seed;
   - `route-ready` when its predecessor is reachable through other selected
     relations;
   - `needs-predecessor` otherwise, naming the exact missing predecessor label.

Readiness ignores problem prose, lexical similarity, scope links, Context
Profile values, check results, popularity, and unselected relations. It does
not account for finite budgets and therefore does not promise that a ready
edge will be admitted in the submitted run. The closure result remains the
only authority for actual admission, frontier, conflict, and state.

Every relation remains enabled and selectable in every readiness state.
Selecting an unreachable relation is valid and continues to produce an
explicit unresolved requirement after submission.

## Interface contract

- Lead concept choices with owning entry title and human factor label.
- Keep exact artifact IDs visible on every choice.
- Show one readiness badge per relation and one live summary count.
- Use `Ready from selected seed`, `Reachable through selected relations`, or
  `Needs <factor label>` rather than recommendation language.
- State beside the summary that all relations remain selectable and that
  readiness is structural, not evaluative.
- Preserve keyboard-native disclosure, checkboxes, select, and button behavior.
- Store no disclosure or selection state outside the current page.

## Conformance cases

| Case | Expected palette state |
|---|---|
| Default F1 source seed, forward | System Composition group open; F1 `seed-ready`; other five need predecessors |
| Direction changed to reverse | F1 needs its target unless that target is selected |
| F1 target selected, reverse | F1 `seed-ready` |
| Selected relation chain reaches another predecessor | downstream relation `route-ready` |
| Problem prose changes only | groups and readiness unchanged |
| Unready relation selected | remains enabled, selected, and described as needing predecessor |
| Open all then collapse | all groups open, then only groups with selected seeds remain open |
| Palette extension unavailable | base lab retains its original flat controls |

Adversarial checks reject duplicate or missing anchor bindings, an unknown
seed or relation, invalid direction, duplicate relation IDs, and a mismatch
between exact checkbox values and payload bindings.

## Claim and evolution boundary

This simulation establishes deterministic grouping and structural readiness
mechanics only. It does not show that readers understand the choices faster,
choose better seeds, discover the right relation, or complete a real task.

Faceted concept search, synonym lookup, sense disambiguation, relation
recommendation, budget-aware preview, saved palettes, and observed default
quality remain separate future contracts.
