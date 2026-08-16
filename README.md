# Factorium

**Tables for the structure of things.**

Factorium is an encyclopedia of decomposition patterns. Its primary
deliverables are books and **Factor Tables** that help a reader look up a
problem, distinguish its senses, compare several credible factorizations,
choose a pivot, and assign supporting factors to suitable structural
mechanisms. Specialized **Formula Tables** preserve major sourced equations
with their symbols, units, dimensions, assumptions, and conceptual structure.
Additional reference families cover values, mappings, decisions, transitions,
constraints, procedures, diagnostics, scales, and evidence while sharing one
canonical entry graph.

Factorium combines the lookup form of a dictionary, the alternatives of a
thesaurus, and the compact utility of an engineering handbook. It does not
promise one universal decomposition; it makes the available choices,
constraints, tradeoffs, counterexamples, and maturity visible.

Read the [grand vision](VISION.md), the active [roadmap](ROADMAP.md), the draft
[Factor Table entry format](specs/FACTOR-TABLE-ENTRY.md), the specialized
[Formula Table format](specs/FORMULA-TABLE-ENTRY.md), and the first
[environment example](tables/examples/environment.md).
The candidate [reference table family architecture](specs/REFERENCE-TABLE-FAMILIES.md)
defines how specialized views remain one coherent reference.

The [entry graph](specs/FACTORIUM-ENTRY-GRAPH.md) defines progressive
decomposition, typed joins, relative primes and composites, notation, and
faceted search. The [security example](tables/examples/security.md) leads to an
[eight-factor access-control request](tables/composites/access-control-request.md)
whose factors each have their own entries.

Browse the [generated reference catalog](tables/CATALOG.md) for canonical
anchors and specialized views. The [curated table index](tables/INDEX.md)
retains examples, foundations, roots, roles, primes, and composites without
copying the generated catalog. The [Factor Guide pilots](guides/INDEX.md)
demonstrate traceable narrowing in software security and laboratory
measurement.

The first [78-record volume prototype](volumes/01-structure-quantity-choice/VOLUME.md)
is ready for external reader testing with a separate
[usability protocol](volumes/01-structure-quantity-choice/USABILITY-PROTOCOL.md),
reader packet, evaluator rubric, and de-identified observation record.

## Primary deliverables

- **Factorium books** — the enduring reference;
- **Factor Tables** — canonical entries and competing decompositions;
- **Formula Tables** — sourced mathematical relations with scope and units;
- **specialized reference tables** — mappings, decisions, transitions,
  constraints, procedures, diagnostics, scales, values, and evidence;
- **Factor Guides** — narrowed recommendations for a particular problem;
- **evidence and reviews** — provenance, maturity, and limitations;
- **software and experiments** — auxiliary construction and validation tools.

## Founding research

The repository began as **FACTOR**, a hardware-neutral investigation of
Factor-Preserving Semantic Encoding. That work remains as one tested Factorium
domain and as evidence infrastructure:

- explicit semantic schemas and constraints;
- compositional and role/ambiguity fixtures;
- exact conventional controls and bounded HRR diagnostics;
- `.roles` reviews and retained nulls;
- independently verifiable evidence packets.

## Evidence inherited from Squarebit

Squarebit's first synthetic language experiment found that factored
representations generalized across unseen combinations while whole-symbol
controls failed. Ordinary packed features tied the named product-state encoding
exactly. FACTOR begins from that narrow result:

> Factorization was useful; specialized Squarebit packing was not required.

This narrow result helped establish Factorium's discipline. It does not prove
the encyclopedia or any universal factorization.

## Non-goals

- presenting one convenient factorization as universally canonical;
- allowing AI-generated plausibility to substitute for review and provenance;
- letting software become more important than the reference work;
- claiming novelty for feature structures or compositional representation;
- claiming that synthetic exact-match predicts broad NLP quality;
- replacing tokenizers, embeddings, or language models without evidence;
- tying the method to Squarebit hardware;
- hiding ordinary packed or structured controls;
- promoting hardware, compression, or runtime advantages from semantics alone.

## Project workflow

Read `CONTEXT.md`, `PRODUCT_PLAN.md`, `ROADMAP.md`, and
`context/waves/PHASES.md`. Work is organized into small waves and pulses with
explicit validation.

## Reference specifications

- [Factor Table Entry Format V0](specs/FACTOR-TABLE-ENTRY.md)
- [Factorium Entry Graph V0](specs/FACTORIUM-ENTRY-GRAPH.md)
- [Factor Guide Format V0](specs/FACTOR-GUIDE.md)
- [Composition Query Trace V0](specs/COMPOSITION-QUERY.md)

## Founding research specifications

- [Semantic Factor Schema v1](specs/SEMANTIC-FACTOR-SCHEMA.md)
- [Compositional Split Fixtures v1](specs/COMPOSITIONAL-SPLITS.md)
- [Strong-Control Bakeoff v1](specs/STRONG-CONTROL-BAKEOFF.md)
- [Portable Evidence Packet v1](specs/PORTABLE-PACKET.md)
- [Role Frames and Analysis Sets v1](specs/ROLE-ANALYSIS-SETS.md)
- [Role and Ambiguity Fixtures v1](specs/ROLE-AMBIGUITY-FIXTURES.md)
- [Role/Filler Binding Controls v1](specs/BINDING-CONTROLS.md)
- [Role and Ambiguity Bakeoff v1](specs/ROLE-AMBIGUITY-BAKEOFF.md)
- [Portable Role and Ambiguity Packet v1](specs/ROLE-PORTABLE-PACKET.md)

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

Validate the canonical Factorium reference metadata, linked Markdown, and
generated projections:

```powershell
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
```

Validate the bounded typed-relation and digest-bound review-coverage
sidecars without changing V0:

```powershell
cargo run --quiet -- reference-sidecar-check reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium reference\factorium-assurance-v0.factorium .
```

See [Factorium Reference Sidecars V0 Prototype](specs/FACTORIUM-REFERENCE-SIDECARS.md).

Validate one bounded, author-declared Composition Query trace against exact
reference and relation identities:

```powershell
cargo run --quiet -- composition-query-check fixtures\composition\system-dependency.factorium-query reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium
```

Build the disposable Proof Set simulation rendering with Pandoc:

```powershell
.\tools\render_proof_set.ps1
```

The command writes a standalone core-book HTML file and exact-source manifest
under `target\proof-set-sim-01`. It is an internal rehearsal artifact, not
`preview-01` or reader evidence.

Render the current-source expanded simulation with the exact 15-record Factor
Forge delta:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-02
```

Render the expanded edition with twenty-three neutral Factor Forge coverage tasks while
excluding the author-only rubric:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-03
```

Render the same book with a static in-browser search surface over all 120
selected records and the two application guides:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-04
```

The generated search index is a disposable publication projection. Canonical
Markdown and reference metadata remain authoritative, and the simulation is
not reader evidence or the later Factorium Workbench.

Render the adaptive reader edition with Compact, Abbreviated, Book, and Full
profiles plus independent detail, metadata, and spacing controls:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-05
```

Book is the default. The profile contract is
[`specs/PROOF-SET-READER-VIEWS.md`](specs/PROOF-SET-READER-VIEWS.md).

Render the bounded Context Profile prototype over the adaptive reader:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-06
```

The prototype distinguishes inherited defaults and conventions from choices
that remain required at use time. See
[`specs/CONTEXT-PROFILE.md`](specs/CONTEXT-PROFILE.md).

Render the current proof-edition composition-worksheet simulation:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-10
```

Open `target/proof-set-sim-10/index.html` for the five-step first journey,
kind-and-domain search, twelve subsectioned chapter routes, dedicated reading
pages, and two trace-bound Composition Query worksheets under Applications.
The systems and evidence examples share one worksheet grammar while retaining
relation-specific semantics and separate local outcomes. The generated site
remains a disposable publication projection; see
[`specs/PROOF-SET-BOOK-SITE.md`](specs/PROOF-SET-BOOK-SITE.md).

After an intentional metadata or source change, regenerate the catalog and
unresolved-candidate report:

```powershell
cargo run --quiet -- reference-sync reference\factorium-reference-v0.factorium .
```

See [Factorium Reference Interchange V0](specs/FACTORIUM-REFERENCE-INTERCHANGE.md).

Inspect the frozen generated corpus and split identities:

```powershell
cargo run --quiet -- fixtures
```

Inspect the ordered-role and ambiguity fixture identities:

```powershell
cargo run --quiet -- role-fixtures
```

Inspect exact TPR, structured, factored, and bounded HRR control evidence:

```powershell
cargo run --quiet -- binding-controls
```

Run the role/ambiguity split bakeoff:

```powershell
cargo run --quiet -- role-bakeoff
```

The [accepted Wave 2 result](docs/ROLE-AMBIGUITY-RESULT.md) is
`semantic-only`: role sharing and explicit candidate-set composition help, but
exact conventional controls tie HRR.

Validate the self-contained Wave 2 packet without importing the Rust crate:

```powershell
cd artifacts\factor-role-v1
python verify_role_packet.py .
```

See [independent role packet onboarding](docs/ROLE-PACKET-ONBOARDING.md).

Run the deterministic strong-control comparison:

```powershell
cargo run --quiet -- bakeoff
```

The founding result is
[accepted, semantic-only](docs/STRONG-CONTROL-BAKEOFF-RESULT.md): factor
preservation beats whole-meaning lookup on the systematic synthetic holdouts,
while packed aliases, feature structures, one-hot factors, and dense factored
controls tie.

Validate the committed self-contained evidence packet without importing the
Rust crate:

```powershell
cd artifacts\factor-v1
python verify_packet.py .
```

See [independent packet onboarding](docs/ONBOARDING.md).

## Research

- [Prior art and benchmark custody](docs/research/2026-08-13-prior-art-and-benchmark-custody.md)
- [Role binding and ambiguity research](docs/research/2026-08-13-role-binding-and-ambiguity.md)
- [Reference scale and Factorium entry size](docs/research/2026-08-13-reference-scale-and-entry-size.md)

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
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
cargo run --quiet -- reference-sidecar-check reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium reference\factorium-assurance-v0.factorium .
cargo run --quiet -- composition-query-check fixtures\composition\system-dependency.factorium-query reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium
python artifacts\factor-role-v1\verify_role_packet.py artifacts\factor-role-v1
python artifacts\factor-v1\verify_packet.py artifacts\factor-v1
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

## License

[MIT](LICENSE) - Copyright 2026 Gio Della-Libera.
