# Synthetic Whole-Question and Clause Lenses Plan

Date: 2026-08-17

Status: complete; see `SYNTHETIC-WHOLE-QUESTION-CLAUSE-LENSES-RESULT.md`

Campaign: `SUJ-08`

Evidence class: deterministic dependent whole-question and syntactic-lens rehearsal

## Product question

SUJ-07 shows that clause-only literal search loses useful context. Test the
smallest context-preserving automatic control: keep the exact whole question
as the primary literal query and add the unchanged SUJ-07 clauses as secondary
lenses. This asks whether context retention can recover the losses without
introducing a semantic parser, synonyms, ontology expansion, or hidden model.

The conditional candidate is one visible question field followed by three or
four visibly independent, editable literal lenses. It remains a search aid,
not a Composition Query or question-to-concepts engine.

## Frozen execution

Reuse all ten SUJ-07 tasks, intended paths, and exact splitter. For each task,
run the unedited whole task text first, then each of its two or three frozen
clauses. Preserve the first ten ownership groups and existing rank for every
lens. Compare only the canonical-family identity union, then compare intended
families task by task with the custodied SUJ-06 dual-query control.

No lens may use an authored SUJ-02 query, intended title, search result,
synonym, inserted vocabulary, retry, or task-specific rule.

## Admission gate

All conditions must pass:

1. 10/10 tasks yield one whole-question lens and two or three clause lenses.
2. 10/10 lens unions expose at least two intended canonical families.
3. No intended family exposed by SUJ-06 is lost on any task.
4. At least 4/10 tasks add an intended family absent from the SUJ-06 union.
5. The interface boundary remains explicit: lenses are literal text, not
   concepts, semantic decomposition, relations, closure, or recommendation.

The set-retention gate is stricter than threshold-only non-regression because
this candidate costs more visible rankings than the existing two-query
surface. If any gate fails, preserve the null, keep `sim-45`, and do not mint
`sim-46`.

## Product value and claims boundary

Reader: a person with a question who does not yet know Factorium vocabulary.
Job: obtain several inspectable literal footholds without manually inventing a
second phrasing. Current friction: SUJ-06 requires two authored queries, while
SUJ-07 loses context. The smallest possible change is a transparent whole-plus-
clauses search shell; no Table or book authority changes.

This test can establish only deterministic mechanical coverage and comparative
cost. It cannot establish relevance, recognition, comprehension, usefulness,
preference, demand, language understanding, or reader value.
