# Strong-Control Bakeoff V1

Status: normative

## Question

Does preserving declared factors help systematic reuse, and does any benefit
belong to one named representation rather than to factorization itself?

This is a representation-custody experiment over synthetic semantic vectors.
It is not a language model or a claim about open-vocabulary language.

## Owners

The same canonical meaning is compiled into:

1. `product-state`: named axes packed to the minimum bit payload;
2. `packed-features`: ordinary integer fields with exactly the same bits;
3. `typed-feature-structure`: ordered factor/value fields;
4. `factored-one-hot`: one categorical coordinate set per factor;
5. `factored-dense`: a training-fitted dense codebook shared by factor/value;
6. `whole-one-hot`: one fitted coordinate per complete training meaning;
7. `whole-dense`: one fitted dense code per complete training meaning.

Product state and packed features are exact semantic aliases. Their accuracy,
edit locality, payload, container, metadata, parameters, and temporary storage
must match. A difference is a benchmark defect.

The dense controls use a frozen 16-coordinate code. Factored dense fits entries
at factor/value granularity. Whole dense fits entries at complete-meaning
granularity. Atom coverage therefore permits the factored codebook to compile
new combinations, while the whole codebook has no entry for an unseen meaning.
This is an explicit deletion target, not a state-of-the-art learned model.

## Tasks

For every frozen corpus and split:

- reconstruct the complete semantic vector;
- report exact and per-factor train/test counts;
- report whether factors are independently addressable;
- report average changed coordinates for a one-factor edit;
- report logical payload, canonical container bytes, shared metadata,
  fitted parameter bits, and temporary bytes separately.

Template transfer intentionally reuses meanings. Every representation should
pass it, including whole-symbol controls. It is not evidence of unseen-meaning
generalization.

Runtime is descriptive and excluded from the V1 decision and evidence digest.
No runtime or hardware claim is admitted.

## Frozen decision rule

Evaluate lexical and cross-feature splits in both corpora.

- `factorization_useful=true` only when every factor-preserving owner achieves
  perfect exact and per-factor holdout reconstruction and both whole-symbol
  controls fail to reconstruct at least one held-out complete meaning.
- `representation_specific=true` only when product state strictly improves a
  declared metric over packed features without greater cost.
- `strong_controls_tie=true` only when typed feature structures, factored
  one-hot, and factored dense all match the factor owners.
- `semantic-only` requires useful factorization, no alias separation, and a
  tie with every strong conventional factored control.
- `null` means factor preservation provides no systematic or locality benefit.
- `held` means custody, alias, or decision invariants fail.

Whole-symbol failure can establish the value of sharing factors. It cannot
establish a FACTOR-specific representation advantage.

## Reproduction

```powershell
cargo run --quiet -- bakeoff
cargo test --test bakeoff
```

The command emits canonical evidence and a SHA-256 identity over all
non-runtime fields.
