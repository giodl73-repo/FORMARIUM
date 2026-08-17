# Query-Led Campaign 01 Baseline

Status: Q1 complete; frozen internal baseline

Date: 2026-08-17

Campaign: `fixtures/query-led-discovery/campaign-01.json`

Result contract: `fixtures/query-led-discovery/result-contract-01.json`

Lexical trace: `fixtures/query-led-discovery/baseline-lookups-01.json`

Authored analysis: `fixtures/query-led-discovery/baseline-analysis-01.json`

Expanded results: `fixtures/query-led-discovery/baseline-results-01.json`

Validators: `tools/run_query_led_lookup.js`,
`tools/run_query_led_baseline.js`, and `tools/check_query_led_baseline.js`

## Result review

All 24 frozen packets were executed against the unchanged `sim-41` artifact.
The lexical layer ran 48 declared queries over the exact 185-record search
index. Its custody is:

- source commit `0f28e15df31b14f1ded7ea4ba2584f4bc4da4879`;
- site identity
  `b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9`;
- standalone SHA-256
  `fcab6402c50c5b29420599666d624e63f43041ee2ba1cc919d15dbb70857e005`;
- search-index SHA-256
  `0d40926f828605265960987d85f023f6704092b5b1afac5696de0b449f8b51f1`.

Each expanded result records the exact selected senses, local context,
admitted relation IDs, finite graph budgets, checks, closure state, reading
route, projection losses, manual concepts, mechanical observations, gap owner,
disposition, and claim boundary required by `QLD-RC-01`.

## Mechanical stocktake

| Measure | Result |
|---|---:|
| Frozen packets | 24 |
| Lexical queries | 48 |
| Complete structural routes | 9 |
| Incomplete stops | 15 |
| Contradictory / truncated results | 0 / 0 |
| Route hops across authored routes | 106 |
| Manual concepts | 9 |
| QG-0 no-change findings | 12 |
| QG-1 discovery findings | 5 |
| QG-3 view findings | 5 |
| QG-4 anchor findings | 0 |
| QG-5 relation findings | 0 |
| QG-6 Guide-local findings | 1 |
| QG-7 external-catalog findings | 3 |

The absence of contradictory and truncated results does not violate the
frozen challenge design. Design flags applied pressure; they were not expected
labels. Several subtraction cases were represented as failed checks or
noncompensatory exclusions inside otherwise incomplete routes rather than as a
contradictory graph.

## Pressure visible before clustering

Five independent packets—QLD-01-09, 12, 20, 22, and 24—require a manual
distinction among a capacity shortage, queue or service-order limit,
dependency or critical-path blocker, binding policy/safety constraint, and
evidentiary limitation. Existing entries own each concept, so this is not an
anchor gap. The provisional QG-3 owner is a compact diagnostic view with
recurrence key `limiting-factor-bottleneck`.

Five QG-1 findings record ordinary lexical friction for unit expressions,
access explanations, revision provenance, qualified label claims, and the
word bottleneck. These are distinct wordings and do not yet justify a general
alias or query-expansion system. Three high-domain-specific requests remain
external, and one compliance mechanism remains Guide-local.

Q2 must now test the repeated view pressure against existing-owner fit,
source basis, navigation cost, and the possibility that cross-references or an
existing view already suffice. No content or product repair is admitted by
this baseline alone.

These are authored route and artifact facts only. No count represents reader
success, comprehension, time, usefulness, or preview evidence.
