# Formarium Reference Interchange

Status: current canonical contract

## Canonical files

- `reference/formarium-reference-v3.formarium`
- `reference/formarium-relations-v1.formarium`
- `reference/formarium-assurance-v3.formarium`
- `fixtures/composition/*.formarium-query`
- `volumes/01-structure-quantity-choice/formarium-pointer-registry-v1.formarium`

The canonical headers are `formarium-reference-v3`,
`formarium-relations-v1`, `formarium-assurance-v3`,
`formarium-composition-query-v1`, and `formarium-pointer-registry-v1`.

`tools/build_formarium_contracts.js` deterministically derives the initial
Formarium contracts from the last reviewed Factorium artifacts. The migration
changes namespace and the publication-entry owner only; it does not add
semantic records, relations, review claims, or pointer labels.

## Legacy imports

The parser continues to accept the frozen `factorium-reference-v0` through
`factorium-reference-v2`, `factorium-relations-v0`,
`factorium-assurance-v0` through `factorium-assurance-v2`, and
`factorium-composition-query-v0` envelopes. These are read compatibility
formats. New files, examples, tests, generated projections, and documentation
must use Formarium headers and extensions.

## Validation

```powershell
node tools\build_formarium_contracts.js --check
cargo run --quiet -- reference-check reference\formarium-reference-v3.formarium .
cargo run --quiet -- reference-sidecar-check reference\formarium-reference-v3.formarium reference\formarium-relations-v1.formarium reference\formarium-assurance-v3.formarium .
```
