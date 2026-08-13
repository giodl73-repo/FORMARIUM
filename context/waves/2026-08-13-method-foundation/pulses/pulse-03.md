# Pulse 03: Prior Art and Benchmark Custody

## Goal

Review established semantic-representation and compositional-generalization
methods before FACTOR standardizes a benchmark or claims a distinct method.

## Planned changes

- Record feature structures, attribute-value matrices, typed records,
  compositional semantic parsing, SCAN/COGS-style generalization, role/filler
  binding, disentangled representations, and vector-symbolic controls.
- Separate established prior art from FACTOR's packaging and evidence protocol.
- Freeze source identity, license, redistribution, generation, and revision
  custody for the first benchmark families.
- Define which claims are adopt-now, prototype-only, or rejected.
- Run the repo `.roles` panel over the research decision.

## Validation

- `git diff --check`
- `python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .`
- Citation and source-identity review recorded in the pulse.

## Status

Complete.

## Outcome

Recorded nine cited findings in
`docs/research/2026-08-13-prior-art-and-benchmark-custody.md`.

The decision is:

- FACTOR does not claim invention of feature structures, compositional splits,
  role/filler binding, distributed compositional representations, or formal
  named axes;
- FACTOR standardizes canonical custody, conformance, exact aliases, strong
  controls, separate decision classes, and portable evidence;
- V1 uses deterministic FACTOR-owned generated fixtures;
- external datasets require immutable revision, license, transformation, and
  digest custody before adoption.
