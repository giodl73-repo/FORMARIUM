# Economic Basis, Inflation, and Net Present Value Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Cost, Price, Value, Utility, and Return](../entries/cost-price-value-return.md)

Canonical senses: `explicit-cost`, `opportunity-cost`, `price`, `assessed-value`,
`utility`, `dollar-return`, `rate-of-return`, `present-value`,
`accounting-basis`, `inflation`, `net-present-value`

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Equal cash movements produce different period results | cash/accrual timing, recognition trigger, entity, or authority differs | replay events under both declared recognition contracts | accounting-policy owner |
| A basis change creates a trend break | recognition, measurement, classification, materiality, or transition treatment changed | produce a bridge under old and new policies with effective dates | reporting owner |
| Payment date is treated as the economic event date | earning, delivery, obligation, constructive receipt, or settlement differs | build an event timeline with each authority-owned trigger | record owner |
| One product price rises and the report declares inflation | item movement was substituted for an aggregate weighted index | compare the item contribution with the declared all-scope index | index owner |
| Two inflation rates disagree | series, population, geography, basket, weights, interval, seasonal status, or vintage differs | recompute from the same frozen index observations | statistics owner |
| Different index levels are read as different costs of living | series have different bases or are not level-comparable across areas | rebase one series and compare rates, then use an authorized spatial measure | mapping owner |
| Annual-average inflation differs from December-to-December | averaging and endpoint intervals answer different questions | align the comparison periods and calculate both explicitly | numeracy owner |
| Real amounts reverse rank after adjustment | incompatible index scope, price basis, direction, or reference period | round-trip each amount through one declared index ratio | economic-measure owner |
| Positive undiscounted net flow becomes negative NPV | early costs, late benefits, positive discount rate, or terminal assumptions | inspect signed flow timing and cumulative discounted contributions | valuation owner |
| Two NPVs disagree for identical nominal totals | timing, sign, rate, compounding, horizon, tax, inflation, or terminal value differs | freeze one cash-flow timeline and vary one assumption at a time | model owner |
| Initial investment is missing or counted twice | time-zero flow sits both outside and inside the model | reconcile every admitted flow exactly once against source records | cash-flow owner |
| Positive NPV is reported as certain profit or mandatory approval | forecast, discount model, risk, constraints, distribution, or nonmonetized effects were collapsed | run sensitivity and apply the separate decision policy | decision owner |
| Named standards, indexes, or valuation methods multiply as senses | authority catalog replaced recognition, index, and time-value criteria | swap examples and verify the conceptual ladder survives | concept-taxonomy editor |

## Use contract and claim boundary

Preserve authority, purpose, entity, event and cash-flow boundaries, recognition
and measurement rules, accounting period, index identity and vintage,
population, geography, basket, weights, intervals, seasonal treatment,
currencies, price basis, signed flow timing, valuation date, discount-rate
source, compounding, taxes, horizon, terminal value, uncertainty, and
sensitivity runs. Agreement under one contract does not establish agreement
under another. An accounting result, inflation estimate, or NPV does not by
itself establish economic welfare, realized profit, fairness, affordability,
legal compliance, investment suitability, or decision authorization.

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-economic-basis-inflation-npv.md)
2. IRS Publication 334: https://www.irs.gov/publications/p334
3. BLS CPI Concepts: https://www.bls.gov/opub/hom/cpi/concepts.htm
4. BLS, Calculating Percent Changes: https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm
5. OMB Circular A-94: https://www.whitehouse.gov/wp-content/uploads/2025/12/a094.pdf

This diagnostic is educational and does not provide accounting, tax, legal, or investment advice.
