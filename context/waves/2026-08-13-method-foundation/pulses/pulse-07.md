# Pulse 07: Portable Result Packet

## Goal

Publish versioned benchmark evidence that an independent consumer can validate
without importing FACTOR internals.

## Planned changes

- Freeze schema, corpus, split, model, executable, and result identities.
- Define canonical result serialization and fail-closed validation.
- Retain nulls, alias records, controls, and interpretation boundaries.
- Add reproduction instructions and an onboarding guide.
- Prove one independent consumer or implementation target.

## Validation

- `git diff --check`
- Packet round-trip, identity, reproduction, and onboarding smoke checks.

## Status

Pending.
