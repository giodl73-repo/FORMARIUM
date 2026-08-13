# Pulse 02: Semantic-Factor Schema Contract

## Goal

Define the smallest typed contract for factors, values, schemas, complete
meanings, and representation aliases.

## Planned changes

- Specify stable factor and value identifiers.
- Specify canonical factor ordering and complete assignments.
- Define missing, unknown, repeated-role, and invalid assignments.
- Define packed-feature and named-product alias requirements.
- Add hand-worked navigation and event examples.

## Validation

- `git diff --check`
- Manual conformance review of both canonical fixtures against
  `specs/SEMANTIC-FACTOR-SCHEMA.md`.

## Status

Complete.

## Outcome

Specification-complete only. Executable parser and interoperability evidence
remain assigned to Pulse 04.

Added Semantic Factor Schema v1 with:

- stable lower-kebab identifiers and revision rules;
- canonical factor and value ordinals;
- complete single-valued assignments;
- explicit missing and unknown semantics;
- declared role slots for repeated participants;
- dependency-free canonical text interchange;
- minimum-width LSB-first packed encoding;
- exact named-product versus ordinary-packed alias gates;
- navigation and event fixtures.
