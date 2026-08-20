# Lexicon Reference Interchange

Status: current canonical contract

## Canonical files

- `reference/lexicon-reference-v4.lexicon`
- `reference/lexicon-relations-v2.lexicon`
- `reference/lexicon-assurance-v4.lexicon`
- `fixtures/composition/*.lexicon-query`
- `volumes/01-structure-quantity-choice/lexicon-pointer-registry-v1.lexicon`

The canonical headers are `lexicon-reference-v4`,
`lexicon-relations-v2`, `lexicon-assurance-v4`,
`lexicon-composition-query-v2`, and `lexicon-pointer-registry-v1`.

`tools/build_lexicon_contracts.js` deterministically derives the initial
Lexicon contracts from the last reviewed Factorium artifacts. The migration
changes namespace and the publication-entry owner only; it does not add
semantic records, relations, review claims, or pointer labels.

## Legacy imports

The parser continues to accept the frozen `factorium-reference-v0` through
`factorium-reference-v2`, `factorium-relations-v0`,
`factorium-assurance-v0` through `factorium-assurance-v2`, and
`factorium-composition-query-v0` envelopes. It also accepts the frozen
`formarium-reference-v3`, `formarium-relations-v1`,
`formarium-assurance-v3`, and `formarium-composition-query-v1` envelopes.
These are read compatibility formats. New files, examples, tests, generated
projections, and documentation must use Lexicon headers and extensions.

## Validation

```powershell
node tools\build_lexicon_contracts.js --check
cargo run --quiet -- reference-check reference\lexicon-reference-v4.lexicon .
cargo run --quiet -- reference-sidecar-check reference\lexicon-reference-v4.lexicon reference\lexicon-relations-v2.lexicon reference\lexicon-assurance-v4.lexicon .
```
