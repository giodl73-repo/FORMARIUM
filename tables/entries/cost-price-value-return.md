# Cost, Price, Value, Utility, and Return

Status: candidate anchor entry

## Orientation

Cost, price, value, utility, return, accounting basis, inflation, and net
present value can all produce monetary numbers, but they answer different
questions. Accounting basis governs when and how events enter a scoped record;
inflation describes change in a declared price index; net present value combines
signed, timed flows after discounting them to one valuation date. None is a
context-free property of money, an asset, or a decision.

## Sense table

| Sense | Governing question | Role | Unit or basis |
|---|---|---|---|
| `explicit-cost` | What out-of-pocket resources were or will be paid? | recorded or forecast sacrifice | currency and date |
| `opportunity-cost` | What valued alternative is forgone by this choice? | counterfactual sacrifice | value measure under selected perspective |
| `price` | What amount is paid, received, offered, or quoted under these exchange terms? | transaction or market term | currency per declared unit and time |
| `assessed-value` | What worth does this method assign for this owner, purpose, scenario, and date? | model- or judgment-derived assessment | currency or domain-specific scale |
| `utility` | How does this agent rank or represent satisfaction from outcomes? | preference representation | ordinal or model-specific |
| `dollar-return` | What income plus gain or loss occurred over the holding period? | outcome difference | currency |
| `rate-of-return` | What return occurred relative to the opening investment basis? | baseline-normalized outcome | dimension one or percent |
| `present-value` | What current equivalent does this model assign to future cash flow? | time-discounted model result | currency at valuation date |
| `accounting-basis` | Under which authority, purpose, recognition triggers, timing, and measurement rules does this event enter the record? | scoped recognition and measurement contract | reporting-framework and period specific |
| `inflation` | How did a declared price index change between specified periods for its population, basket, weights, and method? | aggregate price-level change estimate | dimension one or percent over interval |
| `net-present-value` | What is the sum of all included signed cash flows after mapping them to one valuation date under a declared discount model? | discounted net-flow total | currency at valuation date |

## Role ladder

```text
resources used or alternatives forgone
  -- under perspective --> cost

buyer, seller, market, unit, and terms
  -- at a time --> price

benefits, cash flows, preferences, risks, and method
  -- for owner and purpose --> assessed value or utility

opening basis, ending value, and intervening flows
  -- over holding period --> return

future cash flow
  -- under rate and compounding convention --> present value

economic event
  -- under authority, recognition, timing, and measurement rules --> accounting record

priced basket and population
  -- under index method and interval --> inflation estimate

signed cash-flow timeline
  -- discounted to one date and summed --> net present value
```

## Root factorization

```text
economic-value-use
  := subject or asset
   x owner, buyer, seller, or decision maker
   x requested cost, price, value, utility, or return sense
   x resource or cash-flow boundary
   x market and transaction terms
   x baseline and counterfactual
   x valuation or holding dates
   x rate, periods, and compounding convention
   x nominal or real currency basis
   x risk, uncertainty, fees, and taxes
   x purpose and decision policy
   x governing authority and reporting purpose
   x recognition trigger and accounting period
   x measurement basis, classification, and consistency policy
   x price-index population, basket, scope, and weights
   x index series, reference periods, and adjustment status
   x cash-flow timing, sign, horizon, and terminal treatment
   x discount-rate source, nominal-real alignment, and sensitivity range
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Cost vs. price | both may be currency amounts | sacrifice borne by a perspective vs. exchange term between parties |
| Price vs. value | price may inform valuation | observed/quoted transaction term vs. purpose- and model-dependent assessment |
| Value vs. utility | both concern desirability or worth | assessed result under method vs. preference representation for an agent |
| Explicit vs. opportunity cost | both concern a choice | paid resource outflow vs. forgone alternative |
| Dollar vs. percent return | same investment outcome | currency gain/loss vs. baseline-normalized comparison |
| Holding-period vs. annualized return | both report performance | actual interval outcome vs. transformed per-year equivalent |
| Present value vs. current price | both may be current currency amounts | discounted model result vs. observed or quoted market term |
| Nominal vs. real value | both use monetary scales | current price-level units vs. inflation-adjusted purchasing basis |
| Accounting basis vs. cash movement | cash events may trigger recognition | rules for recognition/measurement vs. receipt or payment itself |
| Accounting basis vs. valuation method | both affect reported numbers | record-admission and timing contract vs. method for assigning an amount |
| Inflation vs. one price change | one price may contribute to an index | aggregate scoped index change vs. movement of one item |
| Inflation rate vs. index level | both come from a price index | relative change over an interval vs. normalized level at one period |
| Present value vs. net present value | both discount future flows | one or selected gross flow equivalence vs. sum of all included signed flows |
| Net present value vs. profit | both can be net monetary results | discounted model result at one date vs. result under a declared accounting basis |
| Net present value vs. decision | NPV may inform a choice | quantitative model output vs. policy including risk, constraints, distribution, and nonmonetized effects |

## Diagnostic examples

- A seller's production cost, asking price, transaction price, and buyer's
  assessed value can all differ.
- Using an owned building has no rent payment but can carry an opportunity cost
  equal to a forgone alternative use.
- A person's utility ranking need not be measured in dollars or compared
  cardinally with another person's ranking.
- An asset can fall in price yet have a positive total return when income
  received exceeds the capital loss.
- A `15%` return over three months is not automatically a `15%` annual return.
- Two analysts can compute different present values from the same cash flows
  when their rates, timing, or risk assumptions differ.
- A December service paid in January can enter different periods under scoped
  cash and accrual rules without either record being a transcription error.
- A sharp increase in one product's price is not automatically general
  inflation; the index population, basket, weights, and interval decide scope.
- Equal inflation rates from two differently rebased versions of the same
  series can coexist with different index levels.
- A project can have positive undiscounted net cash flow and negative NPV when
  costs arrive early, benefits arrive late, and the declared discount rate is
  positive.

## Formula view

The linked [Cost, Value, and Return Formula Table](../formulas/cost-value-return.md)
owns holding-period return, time-value, price-index change, price-level
conversion, and net-present-value relations.

The linked [Economic Basis, Inflation, and Net Present Value Failure Diagnostic](../diagnostics/economic-basis-inflation-npv-failures.md)
tests recognition, index, timing, discounting, and decision-claim failures.

## Selection procedure

1. Name the subject, parties, owner, and decision purpose.
2. Decide whether the target is sacrifice, transaction term, assessed worth,
   preference, realized outcome, or time-equivalent amount.
3. Define included resources, cash flows, fees, taxes, and counterfactuals.
4. State currency, quantity unit, market, transaction terms, and dates.
5. For return, declare opening basis, ending value, intermediate flows, and
   holding period.
6. For discounting, align per-period rate with the number and length of
   periods and state compounding.
7. Declare nominal or real basis and any inflation index.
8. Report model, risk, uncertainty, and nonfinancial exclusions.
9. For accounting basis, identify authority, reporting purpose, entity,
   recognition trigger, accounting period, measurement basis, classification,
   materiality, consistency, and permitted changes.
10. For inflation, identify index series, population, geography, basket,
    weights, base and comparison periods, seasonal status, revision, and
    uncertainty; do not infer an aggregate from one item.
11. For NPV, freeze every included signed flow, timing convention, horizon,
    terminal value, valuation date, rate source, compounding, nominal/real and
    tax basis, uncertainty, and sensitivity range.
12. Keep accounting recognition, price-level adjustment, discounted value,
    observed price, realized profit, and decision policy separate.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines cost, price, value, utility, return, and discount senses | Separates owner, transaction, preference, outcome, and model roles |
| Thesaurus | Links worth, expense, charge, benefit, profit, yield, and value | Prevents lexical proximity from turning neighboring concepts into synonyms |
| Encyclopedia or textbook | Explains markets, utility, opportunity cost, returns, and finance | Supplies a compact perspective, baseline, time, and model selection path |
| Formula sheet | Lists return and present-value formulas | Adds cash-flow boundary, holding period, compounding, nominal/real basis, and exclusions |
| Accounting or valuation standard | Owns specific recognition and measurement bases | Preserves authority and purpose rather than universalizing one value model |

## Constraints and failure signs

- Every cost states whose cost and which resources are included.
- Opportunity cost names the forgone alternative and valuation basis.
- Price states currency, unit, market or parties, terms, and date.
- Assessed value states owner, purpose, method, scenario, and valuation date.
- Utility is not presumed interpersonally cardinal.
- Return includes income and capital change under one cash-flow boundary.
- Percent return identifies its denominator and holding period.
- Annualization names its compounding transformation.
- Present value states future cash flow, timing, rate, and compounding.
- Nominal and real amounts are not compared without an explicit conversion
  basis.
- Accounting basis is scoped to an authority, purpose, entity, period,
  recognition rule, and measurement policy; cash and accrual are examples,
  not universal exhaustive senses.
- Inflation identifies the exact price-index series and interval; one price,
  an index level, and a cost-of-living claim are not substituted for it.
- Index comparisons use compatible series, population, scope, base, seasonal
  treatment, and revision status.
- Net present value includes all admitted signed flows exactly once and aligns
  timing, rate period, compounding, currency, tax, and nominal/real bases.
- A positive NPV is not presented as observed profit, certainty, fairness,
  affordability, or sufficient authorization for a decision.
- Named standards, index products, asset classes, and appraisal methods remain
  scoped authorities or examples unless they introduce a reusable distinction.

## Cross-references

- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [Comparative Quantity](comparative-quantity.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Time](../roots/time.md)
- [Purpose](../roots/purpose.md)
- [Context](../roots/context.md)
- cash flow — economic specialization of the canonical `flow` sense under a
  declared recognition, currency, boundary, and time basis

## Sources and provenance

1. OpenStax, *Principles of Economics 3e*, chapters 2, 3, 6, and 7:
   https://openstax.org/books/principles-economics-3e/pages/2-key-terms
   https://openstax.org/books/principles-economics-3e/pages/3-introduction-to-demand-and-supply
   https://openstax.org/books/principles-economics-3e/pages/6-1-consumption-choices
   https://openstax.org/books/principles-economics-3e/pages/7-key-terms
2. OpenStax, *Principles of Finance*, sections 7.2, 7.4, and 15.1:
   https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics
   https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance
   https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset
3. IRS Publication 334, accounting methods:
   https://www.irs.gov/publications/p334
4. U.S. Bureau of Labor Statistics, CPI concepts and calculations:
   https://www.bls.gov/opub/hom/cpi/concepts.htm
   https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm
5. OMB Circular A-94, discounting, inflation, and uncertainty:
   https://www.whitehouse.gov/wp-content/uploads/2025/12/a094.pdf

Comparator access date: 2026-08-15. Economic, accounting, and finance distinctions remain
source-scoped; Factorium organization remains `candidate`.

