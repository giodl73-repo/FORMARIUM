# Synthetic Distinctive-Terms Ranking Plan

Date: 2026-08-17

Status: frozen before holdout execution

Campaign: `SUJ-11`

## Product problem

The sole SUJ-10 no-foothold task asks whether a green dashboard dot is a fact,
judgment, or label. The intended State, Evaluation, and Control Tables already
contain the distinction, and Control explicitly discusses dashboards. The
current literal ranker nevertheless gives common editorial terms nearly the
same influence as the rarer operational term and returns no intended ownership
family in its first ten groups. This is a ranking-mechanics gap, not evidence
for a new headword or dashboard-specific alias.

## Candidate control

Test standard BM25 over the existing search-index fields concatenated once,
using the current tokenizer and stop-word list, `k1=1.2`, `b=0.75`, Robertson-
Walker IDF, and title-ascending ties. No query expansion, alias, ontology,
profile, semantic inference, content edit, or canonical relation is allowed.

The candidate was inspected on the 25 SUJ-02 first queries before this freeze:
it moves first-five intended-family coverage from 16/25 to 19/25, recovers the
dashboard task, gains five tasks, and loses two. Those values are disclosed
development observations, not confirmatory evidence and not permission to
replace the current ranker.

## Independent holdout

Execute both unchanged rankers on the 48 queries frozen in QLD-02. For each
attempt, deduplicate the first five results by canonical ownership family and
use the packet's already frozen selected-sense paths as intended families.
QLD-02 predates this candidate and may not be edited or reinterpreted.

Admission requires all of the following:

1. BM25 reaches an intended family for the second `QLD-02-07` dashboard query.
2. At least four query attempts change from current miss to candidate hit.
3. Candidate-only gains exceed current-only losses by at least four.
4. No more than four current hits become candidate misses.

If all pass, the largest admissible product batch is one optional
**Distinctive terms** ranking lens beside the unchanged default ranking. A
default replacement, merged rank, automatic mode choice, synonym expansion,
or new edition remains prohibited until a separate implementation contract.
Any failed gate records the null without parameter tuning.

## Claims boundary

The holdout can compare deterministic owner exposure under two lexical
rankers. It cannot establish relevance, findability, reader understanding,
preference, usefulness, or successful interpretation of a dashboard.
