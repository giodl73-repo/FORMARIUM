# FACTOR Context

FACTOR is the hardware-neutral home of Factor-Preserving Semantic Encoding.
It begins from Squarebit's accepted synthetic-language result: explicit
factorization generalized, while named product states tied ordinary packed
features.

## Operating model

- `AGENTS.md` is the startup router.
- `README.md` explains the public purpose.
- `PRODUCT_PLAN.md` records the thesis, waves, and non-goals.
- `context/waves/` records execution history.
- `docs/research/` will hold cited design and benchmark research.
- Future specifications must preserve strong factored and packed controls.

## Current wave

`context/waves/2026-08-13-role-and-ambiguity/WAVE.md`

Current pulse: **03 - Role and ambiguity fixtures**

The completed method-foundation wave remains at
`context/waves/2026-08-13-method-foundation/WAVE.md`.

Pulse 02 froze `specs/SEMANTIC-FACTOR-SCHEMA.md`, including stable identifiers,
complete assignments, explicit missing/unknown values, role slots, canonical
text interchange, and exact packed/product alias rules.

The method-foundation role review is recorded at
`context/waves/2026-08-13-method-foundation/ROLE-REVIEW.md`. The review repaired
the execution order so research and source custody precede parser, fixture, and
benchmark implementation.

Pulse 03 is recorded at
`docs/research/2026-08-13-prior-art-and-benchmark-custody.md`. FACTOR's
foundation contribution is a portable custody, conformance, control, and
evidence protocol. Feature structures, compositional splits, role/filler
binding, distributed representations, and formal axes remain established prior
art.

Pulse 04 implements the fail-closed Rust conformance owner in `src/lib.rs` and
the `factor` CLI in `src/main.rs`. The implementation normalizes admitted CRLF
transport to canonical LF, separates schema and document SHA-256 identities,
round-trips canonical bytes, computes exact packed aliases, and rejects unused
ordinal patterns. Its role review is
`context/waves/2026-08-13-method-foundation/PULSE-04-ROLE-REVIEW.md`.

Pulse 05 implements two deterministic generated corpus families and seven
validated manifests in `src/corpus.rs`. Non-transfer splits group all surfaces
by meaning and require atom plus pairwise coverage; event template transfer
declares complete semantic overlap. Frozen identities and boundaries are in
`specs/COMPOSITIONAL-SPLITS.md`, with review at
`context/waves/2026-08-13-method-foundation/PULSE-05-ROLE-REVIEW.md`.

Pulse 06 implements the frozen representation comparison in `src/bakeoff.rs`.
Exact product/packed aliases, typed feature structures, factored one-hot, and
factored dense controls tie on every systematic holdout; whole-meaning
codebooks fail only where complete meanings are unseen. The accepted
classification is `semantic-only`, with canonical evidence and boundaries in
`docs/STRONG-CONTROL-BAKEOFF-RESULT.md` and review at
`context/waves/2026-08-13-method-foundation/PULSE-06-ROLE-REVIEW.md`.

Pulse 07 exports the self-contained packet at `artifacts/factor-v1`. The
manifest chains producer, model, schema, corpus, split, result, file, and packet
identities. Its embedded Python standard-library verifier independently checks
closed-world contents, custody, aliases, controls, and classification without
importing FACTOR. The onboarding guide is `docs/ONBOARDING.md`; the role review
is `context/waves/2026-08-13-method-foundation/PULSE-07-ROLE-REVIEW.md`.

Wave 2 begins with
`docs/research/2026-08-13-role-binding-and-ambiguity.md`. It keeps complete V1
meanings unchanged, adds corpus-level candidate analysis sets, separates role,
ordered slot, and filler identity, and requires typed records plus exact sparse
TPR before bounded HRR. The reviewed plan is
`context/waves/2026-08-13-role-and-ambiguity/ROLE-REVIEW.md`.

Pulse 02 freezes `specs/ROLE-ANALYSIS-SETS.md`. Shared filler domains establish
identity across V1 factors; roles use explicit ordered slots; constraints
remove uninterpreted Cartesian combinations before generation; exact surfaces
reference duplicate-free candidate meaning sets grouped into leakage-resistant
analysis families. Its review is
`context/waves/2026-08-13-role-and-ambiguity/PULSE-02-ROLE-REVIEW.md`.

## Boundary

Do not infer broad NLP, hardware, compression, or runtime advantage from the
initial synthetic result. FACTOR studies semantic structure first.

## Validation

```powershell
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets
cargo run --quiet -- check fixtures\schemas\navigation.factor
cargo run --quiet -- fixtures
cargo run --quiet -- bakeoff
cargo run --quiet -- packet-check artifacts\factor-v1
python artifacts\factor-v1\verify_packet.py artifacts\factor-v1
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```
