# Pulse 05: Compositional Split Fixtures

## Goal

Freeze deterministic splits that distinguish interpolation, recombination, and
role transfer without leaking through surface rendering.

## Planned changes

- Add IID, lexical, cross-feature, and role/template transfer fixtures.
- Use at least two materially different schema families.
- Compute membership from semantic assignments before rendering.
- Verify atom and declared pairwise coverage.
- Group paraphrases and duplicate meanings before splitting.
- Record schema, corpus, surface, and split identities separately.

## Validation

- `git diff --check`
- Deterministic corpus, grouping, coverage, and split tests.

## Status

Pending.
