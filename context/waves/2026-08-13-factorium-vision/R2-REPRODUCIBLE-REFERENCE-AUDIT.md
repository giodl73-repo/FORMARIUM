# R2 Reproducible Reference Audit

Status: complete

Date: 2026-08-15

## Gate decision

R2 passes. Factorium now has one canonical metadata corpus, deterministic
round-trip identity, fail-closed workspace validation, generated navigation,
and a fixed-point role review. Hand-maintained anchor and Formula catalogs no
longer own copied metadata.

## Canonical corpus

Source:

- `reference/factorium-reference-v0.factorium`

Measured by `factor reference-check`:

| Record | Count |
|---|---:|
| Canonical Factor Table entries | 20 |
| Aliases | 1 |
| Senses | 121 |
| Ordered root factors | 193 |
| Specialized views | 30 |
| Views with resolved entry/sense ownership | 27 |
| Views with visible unresolved owners | 3 |
| Primary table families represented | 11 |

Canonical corpus SHA-256:

```text
7a23cf2bd81f77078e52390795ff97bf1446167b89da909702735c14ff26caa3
```

## Interchange coverage

| Required R2 concept | V0 representation |
|---|---|
| Entry | Stable `entry` ID, title, domain, maturity, source, summary |
| Alias | Ordered `alias` record |
| Sense | Stable ordered `sense` ID and label |
| Factor | Stable ordered `factor` ID and source phrase |
| View | Stable `view` ID, title, source, summary |
| Relation | Typed structural ownership through entry-to-sense and sense-to-view links |
| Primary family | One enumerated family per specialized view; Factor is the canonical entry family |
| Source custody | Repository-relative Markdown source with exact cross-checks |
| Maturity | Closed editorial maturity enumeration |
| Unresolved candidate | Explicit `unresolved-...` owner or generated marked source declaration |

Family-specific payload semantics and richer cross-entry relation types remain
behind versioned compatibility boundaries. V0 does not flatten Formula,
Mapping, Decision, Transition, Evidence, or other family contracts.

## Migration result

All 20 R1 anchors and all 30 specialized views are registered. Existing
headings, senses, root factor phrases, maturity, source locations, and primary
family declarations are checked against the manifest.

Three early Formula pilots did not already have canonical headword owners:

- Sample Arithmetic Mean
- Newton's Method
- Pythagorean Trigonometric Identity

The migration preserves that editorial state as explicit unresolved owners
rather than assigning plausible but unreviewed entries. Their source files
already expose unresolved-candidate terms.

## Generated projections

The canonical corpus generates and validates:

- `tables/CATALOG.md`
- `tables/formulas/INDEX.md`
- `tables/UNRESOLVED.md`

`tables/INDEX.md` now curates only foundations, examples, roots, roles, primes,
and composites. It links the generated catalogs instead of copying anchor and
view metadata.

## Determinism and validation

The Rust reference implementation:

- rejects CR, blank lines, trailing whitespace, invalid identifiers, reserved
  delimiters, duplicate records, invalid maturity, unknown families, unknown
  owners or senses, unsafe paths, and shared view source paths;
- preserves semantic sense and factor order;
- requires parse-serialize byte equality;
- validates source heading, maturity, sense markers, factor phrases, family
  declaration, and canonical owner link;
- generates projections only when bytes differ;
- rejects missing or stale committed projections.

Validation completed:

```text
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets --quiet
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
repository-wide relative Markdown link walk
```

The complete Rust suite passed, including 18 library tests and 36 integration
tests across the existing conformance, packet, fixture, split, bakeoff, and new
reference CLI surfaces.

## Review

Research:

- `docs/research/2026-08-15-factorium-reference-interchange.md`

Specification:

- `specs/FACTORIUM-REFERENCE-INTERCHANGE.md`

Fixed-point review:

- `REFERENCE-INTERCHANGE-ROLE-REVIEW.md`

No critical or major R2 finding remains open.

## R3 inputs

R3 can now:

- assign general roles to mechanisms using stable entry, sense, factor, and
  view IDs;
- add Mapping views without creating duplicate headword authority;
- generate navigation after each mapping or guide checkpoint;
- keep unresolved ownership visible until editorial admission;
- trace two Factor Guides back to canonical metadata and local evidence.
