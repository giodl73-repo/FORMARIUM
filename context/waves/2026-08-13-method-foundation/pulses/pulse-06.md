# Pulse 06: Alias and Strong-Control Bakeoff

## Goal

Measure factor preservation against equally expressive conventional controls
under a frozen decision rule.

## Planned changes

- Compare packed features and named product states as exact aliases.
- Retain typed feature structures, factored one-hot, and learned factored
  controls.
- Include whole-symbol controls only as memorization/deletion targets.
- Report reconstruction, systematic holdout accuracy, edit locality, payload,
  container storage, metadata, parameters, temporary memory, and descriptive
  runtime separately.
- Classify factorization usefulness separately from representation
  specificity.

## Validation

- `git diff --check`
- Benchmark correctness, alias, control-strength, and decision-rule tests.

## Status

Complete.

## Outcome

- Added seven representation owners over the same canonical semantic vectors.
- Enforced exact product/packed alias identity.
- Retained typed feature structures, factored one-hot, and a fitted factored
  dense codebook as strong controls.
- Restricted whole one-hot and whole dense to training-meaning lookup.
- Scored every frozen corpus and split with explicit exact and per-factor
  denominators.
- Kept payload, container, metadata, parameters, temporary bytes, locality,
  and runtime disposition separate.
- Froze the `semantic-only` decision and canonical evidence SHA-256.
- Added `factor bakeoff`, focused tests, a result document, and role review.
