# Pulse 03: Compositional Split Fixtures

## Goal

Freeze deterministic splits that distinguish interpolation, recombination, and
role transfer without leaking through surface rendering.

## Planned changes

- Add IID, lexical, cross-feature, and role/template transfer fixtures.
- Compute membership from semantic assignments before rendering.
- Verify atom and pairwise coverage.
- Record corpus, schema, and split digests.

## Validation

- `git diff --check`
- Deterministic corpus and split tests introduced by this pulse.

## Status

Pending.
