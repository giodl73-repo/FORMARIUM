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

Complete.

## Outcome

- Added canonical packet generation and fail-closed Rust validation.
- Chained producer, model, schema, corpus, split, result, file, and packet
  identities.
- Exported the committed V1 packet under `artifacts/factor-v1`.
- Embedded MIT licensing, interpretation boundaries, and onboarding guidance.
- Added a Python standard-library verifier that imports no FACTOR code.
- Independently checked closed-world files, semantic custody, references,
  aliases, strong controls, negative controls, and classification.
- Froze packet identity
  `70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9`.
- Added focused tests and role review.
