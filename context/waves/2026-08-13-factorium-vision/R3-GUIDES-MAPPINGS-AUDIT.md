# R3 Guides and Mappings Audit

Status: complete

Date: 2026-08-15

## Gate decision

R3 passes. General factor roles remain distinct from target mechanisms, and
two independently reviewed Factor Guides narrow canonical material in
materially different domains with explicit local evidence and rejected
alternatives.

## Cross-paradigm mapping

Canonical view:

- `mapping-factor-role-mechanisms`
- `tables/mappings/factor-role-mechanisms.md`

Coverage:

| Measure | Count |
|---|---:|
| General source roles | 11 |
| Target paradigm slices | 6 |
| Role-to-mechanism assignment rows | 66 |
| Primary Mapping views added in R3 | 1 |

Target slices:

- UML-shaped object-oriented design;
- Rust;
- Haskell-shaped functional design;
- relational databases;
- Kubernetes-shaped cloud-native systems;
- organizational design.

Every row records candidate mechanisms, a mapping condition, and a
non-equivalence. The view declares contextual, partial, many-to-many
cardinality and no general inverse.

Research and fixed-point review:

- `docs/research/2026-08-15-cross-paradigm-role-mappings.md`
- `FACTOR-ROLE-MAPPING-ROLE-REVIEW.md`

## Factor Guide method

Specification and research:

- `specs/FACTOR-GUIDE.md`
- `docs/research/2026-08-15-factor-guide-method.md`

The method requires:

- separate canonical and local evidence custody;
- selected, retained, rejected, not-applicable, and unresolved alternatives;
- factor, role, mechanism, condition, constraint, and validation trace;
- derived-output separation;
- expected-change, invalid-case, and changed-evidence tests;
- domain-appropriate fixed-point review.

## Independently reviewed pilots

### Software security

Guide:

- `guides/rust-access-control-evaluation.md`

Review:

- `RUST-ACCESS-CONTROL-GUIDE-ROLE-REVIEW.md`

Result:

- preserves all eight access-request factors;
- maps them to conditional Rust mechanisms;
- rejects role-only and Boolean authorization shortcuts;
- separates request facts, immutable policy, derived decision, enforcement,
  and audit evidence;
- tests policy change, object movement, missing facts, new subject kinds, and
  enforcement bypass.

### Laboratory quantity selection

Guide:

- `guides/aqueous-solution-amount-concentration.md`

Review:

- `SOLUTION-CONCENTRATION-GUIDE-ROLE-REVIEW.md`

Result:

- selects `amount-concentration` from seven nearby senses;
- applies `c = n/V` only after entity, numerator, denominator, final-volume,
  unit, state, and uncertainty selection;
- independently checks liter and SI-unit arithmetic;
- rejects mass, fraction, solvent-volume, and uncited molar-mass shortcuts;
- stops before procedure, safety, purity, and certified-reporting claims.

## Traceability gate

Both guides:

- identify a stable guide ID;
- state local facts and non-goals;
- link canonical entries and specialized views;
- retain rejected alternatives;
- trace selected factors to roles and local mechanisms or record fields;
- expose unresolved choices;
- include change and invalid-case tests;
- reached separate fixed-point `.roles` reviews.

## Reproducible reference state

After the mapping registration:

| Record | Count |
|---|---:|
| Canonical entries | 20 |
| Senses | 121 |
| Ordered factors | 193 |
| Specialized views | 31 |
| Unresolved view owners | 3 |

Canonical corpus SHA-256:

```text
f11fb8ee8ec9a786df0aec828af3c01b6384f8d6e8527921857ae50d71c1023d
```

## Validation

Completed:

```text
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
Factor Guide required-heading contract
repository-wide relative Markdown link walk
```

No critical or major R3 finding remains open.

## R4 inputs

R4 can now curate a table-first reading path that includes:

- generated canonical catalog navigation;
- cross-paradigm role assignment;
- one software guide and one scientific guide;
- explicit unresolved-candidate queues;
- a repeatable reader task protocol.

R4 completion requires observed readers. Author-only review can produce the
prototype and protocol but cannot substitute for usability evidence.
