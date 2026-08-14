# Cost, Value, and Return Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Cost, Price, Value, Utility, and Return](../entries/cost-price-value-return.md)

## Orientation

These relations calculate one holding-period return and single-cash-flow
present/future value. They do not define all cost, price, value, utility, or
investment decisions. Cash-flow boundary, dates, rate basis, periods,
compounding, currency basis, and risk assumptions remain mandatory.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Total dollar return | `R_dollar = C_income + V_end - V_begin` | accounting definition for selected flows |
| Holding-period return | `HPR = (C_income + V_end - V_begin) / V_begin` | baseline-normalized return |
| Future value | `FV = PV (1 + r)^n` | compound time-value mapping |
| Present value | `PV = FV / (1 + r)^n` | inverse time-value mapping |
| Effective annualized return | `EAR = (1 + HPR)^(1/y) - 1` | conditional annualization |

## Symbol contract

| Symbol | Meaning | Kind | Unit | Restriction |
|---|---|---|---|---|
| `V_begin` | opening investment value or basis | monetary amount | declared currency/date | positive for ordinary HPR |
| `V_end` | ending value | monetary amount | same currency basis | holding date declared |
| `C_income` | included income distributions during period | monetary amount | same currency basis | cash-flow policy declared |
| `R_dollar` | selected total dollar return | monetary difference | same currency | fees/taxes inclusion declared |
| `HPR` | holding-period return | scalar ratio | `1` or percent | actual holding period declared |
| `PV`, `FV` | present and future equivalent values | monetary amounts | currency at named dates | one cash flow in this pilot |
| `r` | effective rate per compounding period | scalar | `1` or percent per period | `1 + r > 0` for real powers |
| `n` | number of compounding periods | scalar or integer by model | periods | matches rate period |
| `y` | holding period in years | positive scalar | year | annualization convention declared |
| `EAR` | effective annualized return | scalar rate | `1` or percent per year | reinvestment/equivalence assumption |

## Baseline and cash-flow contract

The holding-period relation requires:

- one opening basis and ending valuation boundary;
- all included income flows;
- treatment of contributions and withdrawals;
- treatment of fees, taxes, and currency conversion;
- the exact holding interval.

If external contributions or withdrawals occur, this simple formula may not
represent investor performance without a cash-flow-aware method.

## Time-value contract

`r` and `n` use the same period. An annual rate with monthly compounding must
be converted to a monthly per-period rate and paired with the number of
months. Present value is a model output, not an observed transaction price.

Nominal cash flows use nominal rates; real cash flows use compatible real
rates. Risk adjustment, inflation, taxes, and liquidity are not silently
embedded.

## Annualization scope

The `EAR` form maps one holding-period growth factor to an equivalent
one-year compounded rate. It does not claim that the realized path repeated,
that future returns will match it, or that volatility and cash-flow timing are
irrelevant.

## Failure signs

- Price, cost, and value are substituted because all use currency.
- Income distributions are omitted from total return.
- Contributions are counted as investment gain.
- A percentage return omits its beginning-value denominator.
- Holding-period return is labeled annual without transformation.
- Rate period and number of periods do not match.
- Nominal cash flows are discounted with an incompatible real rate.
- Present value is reported without valuation date and rate source.
- A selected discount rate is presented as universal or risk-free.
- Utility or nonfinancial value is forced into the monetary formula.

## Reference Delta

The canonical
[Cost, Price, Value, Utility, and Return entry](../entries/cost-price-value-return.md)
owns the full comparison. Relative to a formula sheet, this view adds owner,
cash-flow boundary, baseline, dates, compounding, nominal/real, risk, and
nonfinancial exclusion contracts.

## Sources and provenance

1. OpenStax, *Principles of Finance*, sections 7.2, 7.4, and 15.1:
   https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics
   https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance
   https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset
2. OpenStax, *Principles of Economics 3e*, section 6.1:
   https://openstax.org/books/principles-economics-3e/pages/6-1-consumption-choices

Formula authority: introductory finance relations within stated scope.
Factorium presentation remains `candidate`.
