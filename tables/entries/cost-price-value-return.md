# Cost, Price, Value, Utility, and Return

Status: candidate anchor entry

## Orientation

Cost, price, value, utility, and return can all be expressed with numbers, and
several can share the same currency unit, but they answer different questions.
Cost records included sacrifice from a perspective; price is an exchange term;
value is an assessment for a purpose and date; utility represents preference
or satisfaction; return compares an investment outcome with its baseline;
discounting maps amounts across time under a model.

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

## Formula view

The linked [Cost, Value, and Return Formula Table](../formulas/cost-value-return.md)
owns holding-period return and single-cash-flow time-value relations.

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

## Cross-references

- [Comparative Quantity](comparative-quantity.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Time](../roots/time.md)
- [Purpose](../roots/purpose.md)
- [Context](../roots/context.md)
- accounting basis - `unresolved-candidate`
- cash flow - `unresolved-candidate`
- inflation - `unresolved-candidate`
- net present value - `unresolved-candidate`

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

Comparator access date: 2026-08-14. Economic and finance distinctions remain
source-scoped; Factorium organization remains `candidate`.

