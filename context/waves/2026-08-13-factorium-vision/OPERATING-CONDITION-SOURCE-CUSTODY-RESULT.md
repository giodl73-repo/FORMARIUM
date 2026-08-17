# Operating-Condition Source-Custody Result

Date: 2026-08-17

Status: fixed point; canonical maintenance repair; no new preview edition

## Result

The bounded repair added explicit primary-source provenance to the only two
canonical entry/view paths that lacked it:

- `tables/diagnostics/operating-condition-failures.md` now cites NASA and
  NIST for bounded operating-environment, integration, verification, and
  validation distinctions;
- `tables/procedures/risk-treatment-response.md` now cites NIOSH and FEMA as
  bounded workplace-control and emergency-preparedness examples.

Both views explicitly identify their cross-domain structures as Factorium
editorial synthesis. They remain candidate views and do not become universal
diagnostics, exhaustive taxonomies, safety guidance, or evidence of cause,
effectiveness, outcome, or reader value.

## Fixed-point custody

The canonical inventory remains 53 entries, 412 senses, 627 factors, and 95
views. All 148 unique canonical entry/view paths now expose a Sources and
Provenance, References, or Provenance heading. The relation sidecar remains at
eleven reviewed relations.

The canonical reference is unchanged at SHA-256
`489c17a656b33582d848fe69a06d954da550a80fd9eec170c0ce8558b79f0324`.
The assurance sidecar migrates exactly the two changed view digests to this
result review and has SHA-256
`0bb512a41133031b82797ca67334a02ec8fb7f090d8392ca4e510d49d9c32085`.
The relation sidecar remains
`df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634`.

## Role result review

The six-role review at
`signals/roles/check/operating-condition-source-custody-roles-check-2026-08-17.md`
reported zero P1 blockers. Its three amendments are closed:

1. every source has a bounded use and explicit domain limit;
2. both cross-domain structures are labeled editorial synthesis;
3. deterministic validation proves 148-of-148 source-heading coverage,
   unchanged inventory and relations, and exact assurance migration.

## Validation

Passed:

- `node tools/check_operating_condition_source_custody.js`;
- `cargo run --quiet -- reference-check reference/factorium-reference-v0.factorium .`;
- `cargo run --quiet -- reference-sidecar-check reference/factorium-reference-v0.factorium reference/factorium-relations-v0.factorium reference/factorium-assurance-v0.factorium .`;
- `cargo fmt --all -- --check`;
- `cargo clippy --all-targets --all-features -- -D warnings`;
- `cargo test --all-targets --all-features`;
- `git diff --check`.

## Product decision

Decision: **accept the two-view custody repair and stop**.

This is repository completeness evidence, not external reader evidence. It
does not mutate `sim-42`, mint `sim-43`, reopen speculative content production,
or change the requirement for real R4E worksheets when readers become
available.
