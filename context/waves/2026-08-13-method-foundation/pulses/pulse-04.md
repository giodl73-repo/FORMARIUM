# Pulse 04: Schema Parser and Conformance

## Goal

Turn Semantic Factor Schema v1 into an independently testable contract.

## Planned changes

- Implement a dependency-light fail-closed parser and canonical writer.
- Validate identifiers, uniqueness, ordering, completeness, ordinals, packed
  widths/offsets, invalid patterns, and SHA-256 identities.
- Add canonical valid fixtures and structured invalid fixtures.
- Round-trip exact canonical bytes.
- Expose a focused validation command for independent implementations.

## Validation

- `git diff --check`
- Parser unit and integration tests introduced by this pulse.
- Canonical round-trip and invalid-fixture smoke commands.

## Status

Pending.
