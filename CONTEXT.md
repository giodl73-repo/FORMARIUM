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

`context/waves/2026-08-13-method-foundation/WAVE.md`

Current pulse: **06 - Alias and strong-control bakeoff**

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
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```
