# Strong-Control Bakeoff Result

Status: accepted, semantic-only

## Result

The deterministic V1 bakeoff classifies the current evidence as:

- factorization useful: `true`;
- representation specific: `false`;
- strong conventional factored controls tie: `true`;
- classification: `semantic-only`.

Canonical evidence identity:

```text
5b90a6de6f86c9b7b844c9416c7a89fb08a4a5eed62f024a2cef036e96da0615
```

Across navigation and event lexical and cross-feature holdouts, product state,
ordinary packed features, typed feature structures, factored one-hot, and the
factored dense codebook reconstruct every held semantic vector. Whole one-hot
and whole dense reconstruct their training meanings but have no entry for an
unseen complete meaning, so they score zero exact and per-factor holdout
accuracy on those splits.

Event template transfer is a required negative control. Because its active and
passive sides share meanings, every representation passes, including both
whole-symbol controls. The result does not mislabel surface transfer as
unseen-meaning generalization.

## Alias and cost outcome

`product-state` and `packed-features` are identical in every admitted field.
For navigation they carry six logical bits in one canonical byte; for event
they carry eight logical bits in one canonical byte. Naming the axes creates
no semantic, storage, parameter, edit, temporary-memory, or runtime result.

Strong controls expose different costs without changing the semantic result:

- typed feature structures use a larger field container but no learned state;
- factored one-hot uses two canonical bytes in both families;
- factored dense uses a 16-coordinate `f64` container and factor/value
  codebook parameters;
- whole dense parameters scale with observed complete meanings rather than
  reusable factor values.

No scalar cost score is used. Logical payload, container bytes, metadata,
parameters, temporary bytes, and edit locality remain separate.

## Interpretation

The accepted claim is narrow: declared factors can be reused across these
frozen synthetic combinations, and whole-meaning lookup cannot. The result
does not show that FACTOR invented feature structures, that its decomposition
is uniquely correct, that a named product representation beats ordinary
packing, or that the method improves open-vocabulary NLP.

The dense controls are deterministic supervised codebooks, not neural language
models. Runtime is excluded because V1 has no comparable execution kernel
beyond representation construction and lookup.

## Reproduction

```powershell
cargo run --quiet -- bakeoff
cargo test --test bakeoff
```
