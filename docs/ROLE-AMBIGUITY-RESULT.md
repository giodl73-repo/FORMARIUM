# Role and Ambiguity Result

Status: accepted, semantic-only

## Result

The frozen Wave 2 bakeoff reports:

- role factorization useful: `true`;
- ambiguity composition useful: `true`;
- strong conventional controls tie: `true`;
- representation specific: `false`;
- classification: `semantic-only`.

Evidence identity:

```text
c23fa50ece30254d8a4d2e819d065cf26e7463f56569d4faa20a1b7fc38dae8d
```

Typed records, exact sparse TPR, factored one-hot, factored dense, and HRR-256
reconstruct every decision holdout. Complete-meaning and complete-analysis-set
lookup fail on unseen systematic combinations.

For the explicit-to-ambiguous transfer, all candidate meanings are familiar.
Whole-meaning lookup therefore reconstructs every target pair, while
whole-analysis-set lookup reconstructs none because the two-member sets were
not observed. The strong factored controls and HRR-256 compose and preserve all
64 ambiguity sets.

## HRR boundary

HRR does not own a unique semantic benefit:

- HRR-64 retains interference failures, including 56/64 ambiguity sets;
- HRR-128 and HRR-256 are perfect;
- exact records, TPR, and factored controls are also perfect with smaller
  containers and no approximate cleanup.

The predeclared decision owner remains HRR-256 despite HRR-128's perfect
diagnostic result.

## Interpretation

The evidence supports a narrow claim: explicit role/filler sharing preserves
the generated role combinations, and familiar complete meanings can be
composed into an explicit candidate set without storing that whole set as one
symbol.

The experiment receives candidate meanings from the canonical analysis
artifact. It does not discover ambiguity from surface text, choose a preferred
reading, or evaluate open-vocabulary semantic parsing.
