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

Complete.

## Outcome

- Added exhaustive 64-meaning navigation and 256-meaning event families.
- Grouped active/passive event surfaces under stable meanings.
- Added semantic-hash IID, lexical, cross-feature, and template-transfer
  manifests.
- Enforced non-transfer meaning disjointness and surface grouping.
- Enforced atom and pairwise test coverage in training.
- Preserved the rejected ordinal-modulo IID rule as a coverage failure.
- Added schema, corpus, surface, and split SHA-256 custody.
- Added `factor fixtures`, tests, a normative specification, and role review.
