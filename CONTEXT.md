# Factorium Context

Factorium is an encyclopedia of decomposition patterns. Books and Factor
Tables are the primary deliverables; guides, evidence, software, and
experiments support them.

The repository began as FACTOR, the hardware-neutral home of
Factor-Preserving Semantic Encoding. That work remains immutable founding
evidence and one tested Factorium domain.

## Operating model

- `AGENTS.md` is the startup router.
- `VISION.md` is the canonical grand vision.
- `README.md` explains the project.
- `PRODUCT_PLAN.md` records the thesis, waves, and non-goals.
- `context/waves/` records execution history.
- `tables/` holds Factor Tables and examples.
- `docs/research/` holds cited design and benchmark research.
- Existing research specifications preserve strong factored and packed
  controls.

## Current wave

`context/waves/2026-08-13-factorium-vision/WAVE.md`

Current pulse: **03 - Pilot Factor Tables**

Pulse 02 now begins with the candidate Root Table at
`tables/foundations/ROOT-TABLE.md`: twelve recurring coordinates, five
overlapping navigation families, and ten reusable decomposition grammars.
Every root coordinate resolves to a scoped candidate entry under
`tables/roots/`. The roots are view-relative starting points rather than a
universal ontology. Review is recorded at
`context/waves/2026-08-13-factorium-vision/ROOT-TABLE-ROLE-REVIEW.md`.

Pulse 02 is complete with the Factor Role Table at
`tables/foundations/FACTOR-ROLES.md`. It separates root coordinates from
view-relative structural jobs: pivot, component, capability, variant, state,
policy, relationship, boundary, context, constraint, and derived view.
Mechanism mappings remain many-to-many assignments rather than definitions.
Review is recorded at
`context/waves/2026-08-13-factorium-vision/FACTOR-ROLES-ROLE-REVIEW.md`.

Pulse 03 now promotes and extends the deliberately varied pilot Factor Tables.
It also introduces Formula Tables for major sourced equations. Formula Tables
separate exact mathematical operators from Factorium decomposition marks and
require relation kind, symbol contracts, units, dimensions, scope,
assumptions, equivalent forms, conceptual factors, and provenance. The draft
format is `specs/FORMULA-TABLE-ENTRY.md`; Newton's second-law force relation is
the first pilot at `tables/formulas/force.md`. Research and review are recorded
at `docs/research/2026-08-14-formula-table-architecture.md` and
`context/waves/2026-08-13-factorium-vision/FORMULA-TABLE-ROLE-REVIEW.md`.

The Formula Table pilot now includes force, average mass density, Ohm's law,
and the sample arithmetic mean. These intentionally test different relation
kinds: physical law, definition, empirical constitutive relation, and
statistic. `tables/formulas/INDEX.md` tracks coverage and prioritizes identity,
conservation/balance, algorithm/recurrence, and constraint entries next.
Selection research and review are
`docs/research/2026-08-14-formula-pilot-selection.md` and
`context/waves/2026-08-13-factorium-vision/FORMULA-PILOTS-ROLE-REVIEW.md`.

Formula relation-kind coverage is complete at pilot depth with four additional
entries: the Pythagorean trigonometric identity, a general accounting balance,
Newton's method, and the event probability range. This covers identity,
conservation/balance, algorithm/recurrence, and constraint. It does not claim
broad subject coverage. Research and review are
`docs/research/2026-08-14-remaining-formula-relation-kinds.md` and
`context/waves/2026-08-13-factorium-vision/FORMULA-RELATION-KINDS-ROLE-REVIEW.md`.

Factorium now has a candidate umbrella architecture for eleven reference table
families at `specs/REFERENCE-TABLE-FAMILIES.md`. Factor, Formula, Reference
Value, Mapping, Decision, Transition, Constraint, Procedure, Diagnostic,
Scale, and Evidence Tables answer distinct governing questions while sharing
one canonical entry graph. Mapping Tables are the first new prototype:
`tables/mappings/temperature-scales.md` separates exact affine point
conversion from interval scaling. Research and review are
`docs/research/2026-08-14-reference-table-families.md` and
`context/waves/2026-08-13-factorium-vision/REFERENCE-TABLE-FAMILIES-ROLE-REVIEW.md`.
The full-panel fixed-point rereview requires exactly one primary table-family
kind per view, resolves Formula/Constraint/Procedure and Value/Scale overlap,
keeps provenance separate from Evidence Tables, and applies practitioner
review through family-specific contracts.

Substantial entries now carry a compact Reference Delta comparing dictionary,
lexical-network, thesaurus, encyclopedia, handbook, and standard ownership
with Factorium's structured contribution. `tables/entries/force.md` is the
first polysemous anchor: five separated senses share one canonical headword,
while the existing Newtonian relation becomes a linked Formula Table view.
The schema, research, and review are `specs/REFERENCE-DELTA.md`,
`docs/research/2026-08-14-reference-delta-and-force-polysemy.md`, and
`context/waves/2026-08-13-factorium-vision/REFERENCE-DELTA-ROLE-REVIEW.md`.

Pulse 01 established `VISION.md`, the draft Factor Table grammar at
`specs/FACTOR-TABLE-ENTRY.md`, the first environment entry, and expanded
Factorium roles for factorization method, lexicography, reference architecture,
cross-paradigm mapping, and practitioner lookup. Its fixed-point review is
`context/waves/2026-08-13-factorium-vision/PULSE-01-ROLE-REVIEW.md`.

Reference-scale research compares dictionaries, thesauri, encyclopedias, and
pattern catalogs at
`docs/research/2026-08-13-reference-scale-and-entry-size.md`. The provisional
targets are 25–50 pilot entries, about 250 entries for the first volume, about
1,000 core headwords, and 3,000–5,000 only as a mature reviewed collection.
Brief, standard, and anchor entry classes preserve table-first lookup.

The entry graph contract at `specs/FACTORIUM-ENTRY-GRAPH.md` separates
headwords, senses, views, factor count, and recursive depth. Prime/composite
status is relative to a view; every published factor resolves to an entry or
visible unresolved candidate; textual typed edges own joins and symbols are
aliases. The security example demonstrates one eight-factor access-control
composite with eight linked factor entries. Review is recorded at
`context/waves/2026-08-13-factorium-vision/ENTRY-GRAPH-ROLE-REVIEW.md`.
The graph pilot also adds a 50–150-word prime entry class so base terms resolve
without artificial exposition.

The varied pilot set is indexed at `tables/INDEX.md`. It tests hierarchy pivots,
derived incident severity, policy-derived retention, deployment identity, and
work prioritization alongside environment and security. Its review is
`context/waves/2026-08-13-factorium-vision/PILOT-EXAMPLES-ROLE-REVIEW.md`;
all entries remain candidates pending cited domain review.
The full panel review added a Domain Source Reviewer and makes clear that the
pilot index is a non-normative projection until generated from a stable entry
interchange format.

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

Pulse 03 implements both generated families in `src/role_fixtures.rs`.
Transfer retains ordered recipient slots and equal fillers; attachment retains
two valid candidates for ambiguous surfaces plus reading-specific paraphrases.
Six manifests enforce ordinary family/candidate disjointness and explicit
disambiguation overlap. Frozen identities are in
`specs/ROLE-AMBIGUITY-FIXTURES.md`, with review at
`context/waves/2026-08-13-role-and-ambiguity/PULSE-03-ROLE-REVIEW.md`.

Pulse 04 implements the shared binding compiler in `src/binding.rs`. Typed
records, sparse exact TPR, factored one-hot, and factored dense reconstruct
every binding. HRR retains its frozen 64-dimensional failures and perfect
128/256 diagnostics with 256 still owning the later decision. Configuration,
costs, counts, and identity are in `specs/BINDING-CONTROLS.md`, with review at
`context/waves/2026-08-13-role-and-ambiguity/PULSE-04-ROLE-REVIEW.md`.

Pulse 05 implements split scoring in `src/role_bakeoff.rs`. Role reuse and
explicit candidate-set composition are useful, while exact records, sparse
TPR, and factored controls tie HRR-256. The result is `semantic-only`; it
preserves supplied candidate analyses and does not infer ambiguity from text.
The contract is `specs/ROLE-AMBIGUITY-BAKEOFF.md`, the result is
`docs/ROLE-AMBIGUITY-RESULT.md`, and the review is
`context/waves/2026-08-13-role-and-ambiguity/PULSE-05-ROLE-REVIEW.md`.

Pulse 06 exports the self-contained Wave 2 packet at
`artifacts/factor-role-v1`. It chains schemas, role frames, constrained
corpora, candidate analyses, splits, binding controls, bakeoff results, files,
and producer source. Its embedded Python verifier independently checks custody,
leakage declarations, denominators, owner matrices, and the `semantic-only`
decision without importing FACTOR. The foundation packet remains unchanged.
The contract is `specs/ROLE-PORTABLE-PACKET.md`, onboarding is
`docs/ROLE-PACKET-ONBOARDING.md`, and the review is
`context/waves/2026-08-13-role-and-ambiguity/PULSE-06-ROLE-REVIEW.md`.

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
cargo run --quiet -- role-fixtures
cargo run --quiet -- binding-controls
cargo run --quiet -- role-bakeoff
cargo run --quiet -- role-packet-check artifacts\factor-role-v1
cargo run --quiet -- bakeoff
cargo run --quiet -- packet-check artifacts\factor-v1
python artifacts\factor-role-v1\verify_role_packet.py artifacts\factor-role-v1
python artifacts\factor-v1\verify_packet.py artifacts\factor-v1
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```
