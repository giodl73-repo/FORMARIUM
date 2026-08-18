# Synthetic Syntactic Clause Lookup Plan

Date: 2026-08-17

Status: frozen before execution

Campaign: `SUJ-07`

Evidence class: deterministic dependent syntactic-splitting rehearsal

## Product question

SUJ-06 shows that two manually authored literal phrasings expose two intended
families for nine of ten question tasks. Test whether a small, inspectable
syntax rule can recover the remaining miss and add repeated coverage without
pretending to understand the question.

The conditional candidate is a visible, editable **syntactic clause helper**.
It may split literal text at sentence punctuation and the explicit contrast
markers `even though`, `although`, `but`, `yet`, and `while`. It may not name a
concept, insert a synonym, choose a family, merge rankings, infer a relation,
or compute closure.

## Frozen execution

Reuse the ten SUJ-06 question tasks. Collapse whitespace, split case-
insensitively at `.`, `!`, `?`, `;`, or one of the five listed markers, trim
punctuation, retain fragments with at least two non-stopword alphanumeric
tokens, and keep at most the first three. There is no fallback query. Run each
retained clause as an independent literal search against exact `sim-45`, keep
the first ten ownership groups per clause, and compare their set union only by
canonical-family identity.

Compare coverage with the already-custodied SUJ-06 union. Freeze all rules,
stopwords, tasks, intended paths, thresholds, and baseline identity before
scoring.

## Admission gate

All conditions must pass:

1. 10/10 tasks yield two or three clauses.
2. 10/10 clause unions expose at least two intended canonical families.
3. At least 4/10 add an intended family absent from the SUJ-06 dual-query union.
4. No task that passed the SUJ-06 two-family threshold regresses below it.
5. The interface boundary remains explicit: clauses are text fragments, not
   concepts or a semantic parse.

If any condition fails, preserve the null, retain `sim-45`, and do not mint
`sim-46`.

## Claims boundary

This mechanical dependent test cannot establish reader recognition,
relevance, comprehension, usefulness, preference, demand, or language
understanding. Tables and books remain canonical; the helper, if admitted,
would remain optional publication-shell navigation with no persistence,
network, account, canonical write, or authority.
