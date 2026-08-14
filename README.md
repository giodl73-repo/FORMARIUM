# FACTOR

**Meaning is made of reusable parts.**

FACTOR develops **Factor-Preserving Semantic Encoding**: representing meaning
as explicit, independently reusable factors instead of assigning every complete
meaning an arbitrary symbol.

For example:

```text
walk left slowly twice
```

can be represented as:

```text
action=walk
direction=left
manner=slowly
count=twice
polarity=affirmative
```

The central hypothesis is that preserving this structure improves systematic
generalization to unseen combinations. FACTOR is hardware-neutral: packed
bitfields, typed product states, feature structures, vectors, and other
representations are compared as implementations of the same semantic factors.

## Initial scope

- define explicit semantic-factor schemas;
- create leakage-resistant compositional holdouts;
- compare factored and whole-symbol representations;
- preserve exact packed/product alias controls;
- measure reconstruction, systematic generalization, edit locality, storage,
  and model cost;
- export small reproducible benchmark packets.

## Evidence inherited from Squarebit

Squarebit's first synthetic language experiment found that factored
representations generalized across unseen combinations while whole-symbol
controls failed. Ordinary packed features tied the named product-state encoding
exactly. FACTOR begins from that narrow result:

> Factorization was useful; specialized Squarebit packing was not required.

The result is a starting hypothesis, not proof of general language
understanding.

## Non-goals

- claiming novelty for feature structures or compositional representation;
- claiming that synthetic exact-match predicts broad NLP quality;
- replacing tokenizers, embeddings, or language models without evidence;
- tying the method to Squarebit hardware;
- hiding ordinary packed or structured controls;
- promoting hardware, compression, or runtime advantages from semantics alone.

## Project workflow

Read `CONTEXT.md`, `PRODUCT_PLAN.md`, and `context/waves/PHASES.md`. Work is
organized into small waves and pulses with explicit validation.

## Specifications

- [Semantic Factor Schema v1](specs/SEMANTIC-FACTOR-SCHEMA.md)
- [Compositional Split Fixtures v1](specs/COMPOSITIONAL-SPLITS.md)

## Schema conformance

The Rust reference validates canonical schema documents, computes schema and
document identities, and checks exact packed aliases:

```powershell
cargo run --quiet -- check fixtures\schemas\navigation.factor
```

Canonicalize an admitted CRLF transport or verify exact canonical output:

```powershell
cargo run --quiet -- canonicalize fixtures\schemas\navigation.factor
```

Inspect the frozen generated corpus and split identities:

```powershell
cargo run --quiet -- fixtures
```

## Research

- [Prior art and benchmark custody](docs/research/2026-08-13-prior-art-and-benchmark-custody.md)

## Validation

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
cargo run --quiet -- check fixtures\schemas\navigation.factor
cargo run --quiet -- fixtures
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```
