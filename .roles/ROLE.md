# FACTOR Role Index

FACTOR is a semantic-representation research repo. Reviews return `pass`,
`finding`, or `defer`. Findings name severity (`critical`, `major`, or
`minor`), the affected artifact, and a closure condition.

## Parliament

| File | Role | Primary tension |
|---|---|---|
| `parliament/compositional-semantics-steward.md` | Compositional Semantics Steward | Useful factorization vs. an arbitrary decomposition |
| `parliament/experimental-methodologist.md` | Experimental Methodologist | Systematic evidence vs. favorable synthetic examples |
| `parliament/representation-control-auditor.md` | Representation Control Auditor | Named encodings vs. equally expressive conventional controls |
| `parliament/data-split-leakage-auditor.md` | Data Split & Leakage Auditor | Genuine recombination vs. surface or identity leakage |

## Editorial

| File | Role | Gate |
|---|---|---|
| `editorial/evidence-claims-editor.md` | Evidence & Claims Editor | Synthetic, semantic, model, and runtime claims stay separate |
| `editorial/benchmark-numeracy-checker.md` | Benchmark Numeracy Checker | Denominators, storage, parameters, and uncertainty remain visible |

## Assurance

| File | Role | Gate |
|---|---|---|
| `assurance/research-integrity-provenance.md` | Research Integrity & Provenance | Inputs, prior art, revisions, nulls, and results are reconstructable |

## Stakeholders

| File | Stakeholder | Primary concern |
|---|---|---|
| `stakeholders/schema-implementer.md` | Schema Implementer | Can an independent implementation parse and validate the contract? |
| `stakeholders/benchmark-consumer.md` | Benchmark Consumer | Can another project reproduce and interpret the result without FACTOR internals? |

## Review order

1. Parliament reviews semantics, controls, splits, and experimental design.
2. Editorial reviews claims and numeracy.
3. Assurance reviews source custody, prior art, and reproduction.
4. Stakeholders review implementability and independent consumption.

A fixed point requires no unresolved critical or major actionable finding.
