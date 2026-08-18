# Synthetic Whole-Question and Clause Lenses Result

Date: 2026-08-17

Campaign: `SUJ-08`

Decision: reject the whole-question and clause-lenses candidate, close this
automatic literal-segmentation branch, and retain `sim-45` unchanged.

Evidence class: deterministic dependent whole-question and syntactic-lens
rehearsal. No reader participated.

## Exact result

Thirty-six independently ranked literal lenses ran against the exact `sim-45`
index: the whole question plus two or three frozen SUJ-07 clauses for each of
ten tasks.

| Gate | Result | Required | Decision |
|---|---:|---:|---|
| Tasks with three or four exact lenses | 10/10 | 10/10 | Pass |
| Tasks exposing at least two intended families | 4/10 | 10/10 | Fail |
| Tasks adding an intended family beyond SUJ-06 | 2/10 | 4/10 | Fail |
| SUJ-06 intended families lost | 11 across 7 tasks | 0 | Fail |

The result is identical to SUJ-07 at the aggregate coverage boundary. Keeping
the full question does not lift any of the six clause-only failures above two
intended families. The status/checkout task still recovers Access/Permission,
but that isolated gain coexists with substantial loss against the authored
dual-query control.

## Product disposition

- Do not add whole-question/automatic-clause panels.
- Do not mint `sim-46`; retain the explicit dual literal lookup in `sim-45`.
- Do not tune splitter rules or add task-specific lexical hints after scoring.
- Close automatic surface segmentation as the current question-to-concepts
  bridge: both clause-only and context-preserving variants are dominated by
  explicit alternate phrasing.
- Preserve exact results in
  `fixtures/synthetic-users/whole-question-clause-lenses-baseline-08.json`.

The next product hypothesis, if reopened, must use an explicitly different
mechanism and retain the whole task context without silently inventing semantic
structure. Repackaging the same literal strings into more panels is stopped.

## Custody and claim boundary

Campaign custody is commit `c02b373`. The exact baseline is clean `sim-45`,
rendered from `e54a36e7c119670b279ea48760795f33f4775d63`, with site identity
`e79e341036734b4f808fba9ac840eabed9a6c278c36f3cc05247af4b56553022`
and search-index SHA-256
`d12640ffba616fcb83d909466628c1d3b4df0cdf4a0c4b0df0554f4e66e5b1df`.

This null establishes only comparative mechanical coverage on ten dependent
tasks. It provides no reader, relevance, comprehension, usefulness,
preference, demand, or language-understanding evidence.
