# Founding FACTOR Evidence

Status: candidate Evidence Table

Canonical headword: [Claim and Evidence](../entries/claim-evidence.md)

Primary family: Evidence Table

Purpose: compare the narrow claims supported, contradicted, and excluded by
the two accepted founding synthetic bakeoffs.

## Evidence table

| Claim | Evidence artifact | Observed result | Disposition | Limitation |
|---|---|---|---|---|
| Declared factors can recombine across frozen unseen combinations | `docs/STRONG-CONTROL-BAKEOFF-RESULT.md` | factored representations reconstruct systematic holdouts; whole-meaning lookup fails | supported in frozen synthetic families | does not establish open-vocabulary parsing or unique decomposition |
| Named product-state encoding has a representation-specific advantage | same V1 result | ordinary packed features and strong factored controls tie exactly | contradicted | no comparable runtime kernel was evaluated |
| Explicit role/filler structure supports frozen role transfer | `docs/ROLE-AMBIGUITY-RESULT.md` | exact structured and factored controls reconstruct all decision holdouts | supported in generated role families | candidate meanings are supplied, not inferred from text |
| Explicit familiar meanings can compose into unseen candidate sets | same Wave 2 result | factored controls and HRR-256 preserve all 64 ambiguity sets | supported in frozen candidate-set task | does not choose the preferred reading |
| HRR owns a unique semantic benefit | same Wave 2 result | exact records, sparse TPR, one-hot, and dense factored controls tie HRR-256 | contradicted | HRR-64 retains interference failures |
| Founding results demonstrate broad NLP quality | both results | no open-vocabulary language task is present | excluded/untested | synthetic exact-match evidence only |

## Custody

| Artifact | Canonical identity | Reproduction |
|---|---|---|
| V1 strong-control result | `5b90a6de6f86c9b7b844c9416c7a89fb08a4a5eed62f024a2cef036e96da0615` | `cargo run --quiet -- bakeoff` |
| Wave 2 role/ambiguity result | `c23fa50ece30254d8a4d2e819d065cf26e7463f56569d4faa20a1b7fc38dae8d` | `cargo run --quiet -- role-bakeoff` |

## Interpretation

The accepted classification remains `semantic-only`: explicit reusable
structure helps in the frozen tasks, while strong conventional controls tie
the named representations. This view does not replace the full reports,
specifications, packets, or independent verifiers.

## Sources and provenance

1. `docs/STRONG-CONTROL-BAKEOFF-RESULT.md`
2. `docs/ROLE-AMBIGUITY-RESULT.md`

Evidence is accepted within the reports' narrow scope. Evidence Table
presentation remains `candidate`.

