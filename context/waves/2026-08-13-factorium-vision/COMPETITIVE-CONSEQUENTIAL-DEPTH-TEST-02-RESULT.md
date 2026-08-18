# Competitive Consequential-Depth Test 02 Result

Date: 2026-08-17

Campaign: `CAD-02`

Decision: the frozen internal consequential-depth hypothesis **survives**.
Maintain clean `sim-48`; admit no product or content batch.

## Result

The test replays the six exact CAD-01 cases where Merriam-Webster's Synonym
Chooser already showed genuine contrast. No source was recaptured, no query or
task changed, and no Factorium content, ranking, metadata, or UI changed.

| Packet | Factorium dimensions | Thesaurus dimensions | At least 4/5 | Advantage at least 2 |
|---|---:|---:|---|---|
| `force` | 5/5 | 0/5 | pass | pass |
| `power` | 2/5 | 0/5 | **fail** | pass |
| `value` | 4/5 | 0/5 | pass | pass |
| `model` | 5/5 | 0/5 | pass | pass |
| `system` | 5/5 | 0/5 | pass | pass |
| `evidence` | 5/5 | 0/5 | pass | pass |

| Frozen gate | Result | Required | Decision |
|---|---:|---:|---|
| Factorium consequence-coverage packets | 5/6 | at least 5 | pass |
| Factorium comparative-depth packets | 6/6 | at least 4 | pass |
| Route cost within one additional result open | 6/6 | 6/6 | pass |
| Factorium false equivalence | 0 | at most 0 | pass |
| Unresolved replay disagreement | 0/60 | 0 | pass |

All gates are conjunctive. The result therefore rejects the null description
“merely a schematized thesaurus” for these tested outputs. The supported
distinction is precise: after lexical contrast, Factorium can expose governing
inputs, invalid transfers, stopping boundaries, and bounded inspections.

This does not make the thesaurus comparison valueless. Merriam-Webster remains
the stronger familiar surface for synonym discovery and usage nuance in this
test. CAD-02 asks a later application question which its captured output is not
designed to answer.

## Retained misses

`power` fails the Factorium packet. Its first two visible routes cover
mechanical and electrical power deeply but omit organizational authority or
influence. Consequently it earns no scope-coverage, cross-sense invalid-
transfer, or organizational stopping-condition credit. The three misses are
recorded separately as `scope-coverage`, `boundary`, and `stopping-condition`.

`value` passes with four dimensions but earns no `handoff` credit. The visible
search results cover numerical value and the first opened Table covers price,
assessed value, utility, perspective, basis, date, exclusions, and unresolved
model dependence. Its retained text ends before an explicit next-inspection
procedure, and governing questions are not double-counted as a handoff.

These are isolated findings under different owners. Neither earns an immediate
content or product batch. They remain inputs to a later portfolio decision.

## Reconciliation and custody

The direct pass and shuffled blind-label replay each contain 60 binary
observations: six packets by two products by five dimensions. They disagree on
zero observations. Both passes are procedural checks by one internal evaluator,
not independent readers. Exact SHA-256 custody for the frozen campaign,
CAD-01 captures, and scoring artifact is recorded in `result-02.json`; execution
made zero network requests.

## Product decision

Factorium includes a schematized thesaurus layer—headwords, senses, related
concepts, and contrasts—and should say so plainly. On this portfolio it also
earns a second layer: a compact reference instrument for applying distinctions
without silently transferring assumptions across meanings or descriptive
levels.

Maintain `sim-48`. Do not add a “better than a thesaurus” claim, a comparison
UI, or content from this result. A later real-reader paired task must test
whether people notice and benefit from the extra structure. Until then,
recognition, comprehension, usefulness, preference, trust, adoption, and return
use remain unknown.

## Validation

- `node tools/check_competitive_consequential_depth_02_plan.js`
- two identical runs of `node tools/score_competitive_consequential_depth_02.js`
- repository roles check: `OK .`
- `cargo fmt --check`
- `cargo clippy --all-targets --all-features -- -D warnings`
- `cargo test --all-targets`: 70 passed, 0 failed
