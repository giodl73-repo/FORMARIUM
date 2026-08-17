# Factor Interaction Integrity Constraint Table

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword: [Decomposition Modes and Combination Contracts](../entries/decomposition-modes-combination-contracts.md)

Canonical senses: `interaction`, `combination-contract`, `decomposition-mode`

## Governing question

Which invariants must hold before separate factors and their joint behavior can
be interpreted as one valid combination?

## Constraints

| ID | Requirement | Invalid when | Evidence to retain |
|---|---|---|---|
| `FI-01` | bind the exact factors, domains, roles, and selected view | labels refer to different senses or populations | canonical factor identities and frame |
| `FI-02` | declare dependence as tested, assumed, structural, derived, or unknown | separate fields imply independence | dependence record and basis |
| `FI-03` | define interaction relative to a result/model/comparison | “works together” substitutes for semantics | joint contract and counterexample |
| `FI-04` | preserve main and joint contributions separately where the model does | interaction is silently assigned to one factor | model terms and allocation rule |
| `FI-05` | state operator kind, order, domain, units/scale, and failure behavior | `+`, `x`, or “multiply” is unexplained | operator contract and tests |
| `FI-06` | retain invalid combinations, exclusions, and missing states | Cartesian product creates impossible cases | constraint set and rejected cases |
| `FI-07` | distinguish statistical interaction, semantic dependence, and causal mechanism | one interaction label proves another | claim type and required evidence |
| `FI-08` | expose unmodeled interaction and residual policy | model closure is asserted from fitted terms | residual, diagnostics, and limitations |

## Failure signs

- factors are called orthogonal because they have different names;
- an interaction plot is treated as mechanism evidence;
- a joint term has no main-factor interpretation;
- units or scales make the stated operator meaningless;
- missing combinations disappear rather than remain constrained;
- a model-specific interaction becomes a universal property of the concepts.

## Sources and provenance

See the canonical entry and NIST factorial-design sources. This view validates
a declared combination record; it does not identify a causal interaction or
certify a model.

