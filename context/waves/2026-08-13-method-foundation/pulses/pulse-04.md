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

Complete.

## Outcome

- Added a Rust library for strict schema parsing and canonical writing.
- Added separate canonical `schema_sha256` and `document_sha256` identities.
- Added exact packed encode/decode with unused-ordinal and high-bit rejection.
- Added a `factor check` and `factor canonicalize` CLI.
- Added canonical valid fixtures and structured invalid fixtures.
- Added unit, integration, and CLI conformance tests.
- Closed the implementation role review in `PULSE-04-ROLE-REVIEW.md`.
