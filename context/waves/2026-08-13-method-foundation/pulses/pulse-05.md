# Pulse 05: Portable Result Packet

## Goal

Publish a versioned benchmark result and provenance packet that an independent
implementation can reproduce.

## Planned changes

- Freeze corpus, schema, split, model, and result identities.
- Define canonical result serialization and validation.
- Add reproduction instructions and an onboarding guide.
- Record one independent consumer or implementation target.

## Validation

- `git diff --check`
- Packet round-trip and reproduction checks introduced by this pulse.

## Status

Pending.
