# FACTOR Product Plan

## Product thesis

Factor-Preserving Semantic Encoding keeps reusable meaning components explicit
through encoding, training, evaluation, editing, and interchange. Its value
must be demonstrated against equally expressive conventional feature
structures, packed fields, and learned factored controls.

## Product identity

- Name: **FACTOR**
- General method: **Factor-Preserving Semantic Encoding**
- Compact representation family: **Semantic Product Encoding**
- Repo type: public research method and reference benchmark
- Initial series placement: Knowledge Systems

## Principles

1. Split data by meaning before rendering surface forms.
2. Compare factorization against strong factored controls, not only weak
   whole-symbol baselines.
3. Treat identical packed and named product states as semantic aliases.
4. Separate semantic quality, storage, model parameters, and runtime.
5. Preserve null results and boundary failures.
6. Generalize from synthetic corpora only after materially different fixtures
   reproduce.

## Waves

### Wave 1: Method foundation

Define the terminology, schema contract, benchmark protocol, controls, and
first reproducible reference corpus.

### Wave 2: Role and ambiguity

Test role/filler binding, repeated factor values, ambiguity, and alternative
surface forms against feature structures and vector-symbolic controls.

### Wave 3: Portable benchmark packets

Define versioned corpus, split, schema, result, and provenance artifacts that
other implementations can reproduce.

### Wave 4: External adoption

Onboard one independent consumer or implementation without coupling it to
FACTOR internals.

## First-wave pulses

1. Workspace foundation.
2. Semantic-factor schema contract.
3. Prior art and benchmark custody.
4. Schema parser and conformance.
5. Compositional split fixtures.
6. Alias and strong-control bakeoff.
7. Portable result packet and onboarding guide.

## Non-goals

- broad NLP, reasoning, or language-understanding claims from toy corpora;
- Squarebit-specific hardware or performance claims;
- arbitrary whole-symbol baselines presented as state of the art;
- outcome-selected splits, dimensions, or metrics;
- production framework scope before the method contract stabilizes.

## Validation

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
cargo run --quiet -- check fixtures\schemas\navigation.factor
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

Each implementation pulse must add focused correctness and smoke commands
before code is admitted.
