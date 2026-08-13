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

Pending.
