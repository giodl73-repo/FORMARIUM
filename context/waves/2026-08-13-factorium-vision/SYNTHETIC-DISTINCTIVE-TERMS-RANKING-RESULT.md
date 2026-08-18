# Synthetic Distinctive-Terms Ranking Result

Date: 2026-08-17

Campaign: `SUJ-11`

Decision: reject the standard BM25 Distinctive terms lens, retain the current
literal ranker and clean `sim-46`, and stop without tuning.

## Exact result

On the disclosed 25-query development set, BM25 moves first-five intended-
family exposure from 16/25 to 19/25 and reaches the SUJ dashboard owner. This
is the inspected development observation that motivated the holdout, not
confirmatory evidence.

On the independently frozen 48-query QLD-02 holdout, the current ranker reaches
an intended ownership family on 44 attempts and BM25 on 45. BM25 produces three
candidate-only gains and two current-only losses, a net gain of one. The frozen
gates required at least four gains and a net gain of four. Both fail.

The independent `dashboard reported label readiness` attempt is worse under
BM25: the current ranker reaches Identity/Naming at rank four, while BM25
reaches no selected QLD-02-07 family in its first five. The other dashboard
query reaches State/Lifecycle under both rankers.

The candidate-only gains are `QLD-02-09` (available but unusable service),
`QLD-02-11` (delivery, receipt, and effect), and `QLD-02-21` (sample
composition uncertainty). The current-only losses are `QLD-02-07` (dashboard
reported label) and `QLD-02-19` (ordinary safety statement).

## Disposition

- Do not add a Distinctive terms ranking mode.
- Do not replace or merge the current ranker.
- Do not tune `k1`, `b`, field weights, stop words, or thresholds.
- Do not add dashboard-specific aliases or content.
- Do not mint `sim-47`.

The null is informative: rare-token weighting helps availability, delivery,
and sample-composition attempts, but loses the dashboard-label and ordinary-
safety routes. The isolated SUJ miss therefore does not justify a second
ranking model or its interface and maintenance cost.

## Custody

- frozen campaign commit: `6597980`
- executed source commit: `20139f9c6d2f75d231efbb9d1c35ab1fe2d17e03`
- site identity: `42fd224b43684f0212e3e77b9c6ee5cd44baa17c67d9c3d00ca0deb7b746985a`
- search-index SHA-256: `03d37ea27f06a11d60c7ace38b74114505c076ab9830e7d2bffd680967f13186`
- exact result: `fixtures/synthetic-users/distinctive-terms-holdout-11.json`

## Claims boundary

This is deterministic authored lexical-ranking evidence. It establishes
neither relevance nor reader findability, comprehension, preference, or
usefulness. The remaining SUJ dashboard query should continue to hand outward
to the dashboard schema or product documentation until a broader independently
motivated Search mechanism earns another test.
