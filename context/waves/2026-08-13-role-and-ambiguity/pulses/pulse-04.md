# Pulse 04: Binding Controls

## Goal

Implement exact and approximate role/filler owners without weakening ordinary
structured controls.

## Planned changes

- Typed role/filler records.
- Exact sparse tensor-product matrix and contraction.
- Factored one-hot and dense controls.
- HRR circular convolution at dimensions `64/128/256`.
- Frozen seed, involution unbinding, and nearest-cosine cleanup.
- Separate payload, container, metadata, parameters, and temporary memory.

## Status

Complete.

## Outcome

- Added one representation-neutral binding frame per fixture family.
- Added exact typed record, sparse TPR, factored one-hot, and factored dense
  owners.
- Preserved shared filler bases across distinct roles and ordered slots.
- Added deterministic HRR circular convolution, involution unbinding, and
  domain-restricted cosine cleanup.
- Retained dimensions `64/128/256`, fixed seed, and decision owner `256`.
- Preserved imperfect 64-dimensional and perfect 128/256 diagnostics.
- Separated payload, dimensions, container, metadata, parameters, temporary
  memory, and runtime disposition.
- Froze canonical binding evidence, tests, CLI output, specification, and role
  review.
