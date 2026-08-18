# Competitive Ambiguity-to-Decision Test Blueprint

Date: 2026-08-17

Status: proposed next competitive test; not yet frozen or executed

## Question

Does clean `sim-48` turn ambiguous concept words into more explicit,
inspectable decision structure than the familiar search/reference bundle,
without imposing prohibitive navigation cost?

This is an internal comparative output audit. It cannot establish reader
preference, comprehension, usefulness, adoption, or market advantage.

## Frozen candidate portfolio

Use twelve exact queries spanning overloaded cross-domain language:
`scale`, `force`, `power`, `value`, `state`, `risk`, `field`, `role`, `measure`,
`model`, `system`, and `evidence`.

Compare the same query against:

1. Factorium `sim-48`;
2. Google Search first screen plus at most two result opens;
3. Wikipedia landing/disambiguation plus at most two article opens;
4. Merriam-Webster Thesaurus first result screen;
5. OneLook Thesaurus/Reverse Dictionary first result screen;
6. WordNet's available sense and relation output.

Record Wolfram|Alpha only for a declared quantitative subset; do not score
unsupported-domain failures as a general loss.

## Observation rubric

For every query and product, record only visible output:

- distinct meanings surfaced;
- explicit relation labels;
- near-neighbor contrast or exclusion;
- governing factors or pivots;
- source/authority visibility;
- explicit uncertainty or stopping boundary;
- a bounded next route;
- interactions required to reach the first useful distinction;
- false equivalence, forced single meaning, or dead end.

Two independent internal passes must score from captured outputs. Reconcile
disagreements without changing queries, products, budgets, or `sim-48`.

## Decision rule

The differentiation hypothesis survives only if:

- Factorium exposes an authored factor, contrast, or stopping structure on at
  least 9 of 12 queries;
- against each lexical comparator, Factorium exposes more such decision
  structure on at least 8 of 12 queries;
- Factorium reaches its first useful distinction within one additional
  interaction of the search/Wikipedia route on at least 9 of 12 queries;
- no Factorium route asserts false equivalence or silently collapses a retained
  meaning; and
- every failure is classified as vocabulary, owner/content, navigation,
  presentation, competitor-advantage, or no-Factorium-job.

Any failed threshold falsifies the stated internal hypothesis. Do not tune
during execution. Disposition first; admit only the smallest repeated repair
batch under a separately frozen plan.

## Why this is next

THS-01 showed that the current reference can perform a bounded thesaurus-like
job, and SCL-01 repaired its single observed navigation miss. The unresolved
product question is now comparative: whether Factorium's structural output is
meaningfully different from existing lexical and encyclopedic routes. This
test addresses that question without pretending simulated users are readers.
