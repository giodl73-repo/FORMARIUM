# Role and Ambiguity Bakeoff V1

Status: normative

## Question

Do reusable role/filler bindings preserve unseen combinations and compose
familiar candidate meanings into a previously unseen ambiguity set, and does
any benefit belong uniquely to HRR rather than to ordinary structured
controls?

This is a semantic representation experiment. Candidate meanings are supplied
by the canonical analysis artifact. The bakeoff does not infer analyses from
surface text and is not a semantic parser.

## Owners

Strong role/filler owners:

1. typed records;
2. exact sparse tensor-product representation;
3. factored one-hot;
4. factored dense;
5. HRR at `64`, `128`, and the frozen decision dimension `256`.

Deletion targets:

1. `whole-meaning`: lookup for complete meanings observed in training;
2. `whole-analysis-set`: lookup for complete candidate sets observed in
   training.

Whole-meaning lookup is intentionally generous: when all candidate meanings
are familiar, it may reconstruct an unseen candidate set. Whole-analysis-set
lookup cannot.

## Scoring unit

For every split side and representation:

- exact candidate-set matches over surfaces;
- candidate true-positive, predicted, and target counts;
- exact candidate-meaning occurrences;
- correct role fillers;
- role addressability and edit coordinates;
- logical payload, dimensions, container, metadata, parameters, and temporary
  bytes.

Counts are reported directly. A representation that predicts no candidates has
zero predicted candidates and zero true positives; no undefined precision is
converted into a favorable scalar.

## Split interpretation

### Ordinary systematic splits

The decision uses transfer slot recombination, transfer shared filler, and
attachment object recombination. Candidate meanings are disjoint across train
and test.

### Surface disambiguation

Training contains the two explicit singleton readings for every family. Test
contains the corresponding two-candidate ambiguous surface. Candidate meanings
overlap completely.

This tests composition and preservation of an analysis set from familiar
complete meanings. It does not test discovery of ambiguity from words.

### IID

IID records remain interpolation diagnostics and do not own the decision.

## Frozen decision rule

- `role_factorization_useful=true` only when typed records, sparse TPR,
  factored one-hot, factored dense, and HRR-256 are perfect on every systematic
  holdout while both whole lookup controls fail at least one test set.
- `ambiguity_composition_useful=true` only when the same factor owners are
  perfect on surface disambiguation, whole-meaning lookup passes because both
  meanings are familiar, and whole-analysis-set lookup fails because the pair
  is unseen.
- `strong_controls_tie=true` only when every exact conventional factored owner
  is perfect on every split side.
- `representation_specific=true` requires HRR-256 to improve a declared
  semantic metric over all exact controls without greater cost.
- `semantic-only` requires both usefulness decisions, a strong-control tie,
  and no representation-specific separation.

HRR-64 and HRR-128 are retained diagnostics. They cannot replace HRR-256 as
decision owner after outcomes are observed.

## Edit locality

The canonical edit count is the representation-coordinate change for replacing
one role filler:

- typed record: one field;
- sparse TPR and one-hot: remove one coordinate and add one;
- factored dense: mean signed-code coordinate changes, scaled by 1000;
- HRR: every fixed vector coordinate may change;
- whole lookups: replace one complete symbol and are not role-addressable.

Edit counts describe representation locality; they are not combined with
accuracy into one score.

## Frozen result

The decision is:

```text
role_factorization_useful true
ambiguity_composition_useful true
strong_controls_tie true
representation_specific false
classification semantic-only
```

Canonical evidence identity:

```text
c23fa50ece30254d8a4d2e819d065cf26e7463f56569d4faa20a1b7fc38dae8d
```

Exact controls and HRR-256 are perfect on all decision splits. Whole-meaning
and whole-analysis-set lookup both fail unseen systematic meanings.

On surface disambiguation:

- whole-meaning lookup reconstructs all `64/64` candidate sets because all
  `128` candidate meanings appeared explicitly in training;
- whole-analysis-set lookup reconstructs `0/64` because no two-candidate set
  appeared in training;
- exact controls and HRR-256 reconstruct `64/64`;
- HRR-64 retains `56/64`, consistent with its bounded interference failures.

## Reproduction

```powershell
cargo run --quiet -- role-bakeoff
cargo test --test role_bakeoff
```

## Boundaries

- no surface-to-semantics model is trained;
- no ambiguity probability or preferred reading is predicted;
- no broad semantic parsing, SRL, reasoning, runtime, or hardware claim is
  supported;
- exact TPR and structured controls remain established conventional
  alternatives.
