# Cost, Value, and Return Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Cost, Price, Value, Utility, and Return](../entries/cost-price-value-return.md)

## Orientation

These relations calculate one holding-period return, time-value mappings, a
price-index change, a price-level conversion, and net present value. They do
not define accounting recognition, universal inflation, profit, investment
merit, or a complete decision. Cash-flow boundary, dates, index identity, rate
basis, periods, compounding, currency basis, and uncertainty remain mandatory.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Total dollar return | `R_dollar = C_income + V_end - V_begin` | accounting definition for selected flows |
| Holding-period return | `HPR = (C_income + V_end - V_begin) / V_begin` | baseline-normalized return |
| Future value | `FV = PV (1 + r)^n` | compound time-value mapping |
| Present value | `PV = FV / (1 + r)^n` | inverse time-value mapping |
| Effective annualized return | `EAR = (1 + HPR)^(1/y) - 1` | conditional annualization |
| Price-index change | `pi_(a,b) = P_b / P_a - 1` | relative index change over declared interval |
| Price-level conversion | `A^(b) = A^(a) P_b / P_a` | index-based purchasing-basis mapping |
| Net present value | `NPV_0 = sum_(t=0)^N CF_t / (1 + r)^t` | discounted signed-flow aggregation |

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
| `P_a`, `P_b` | values of one price-index series in earlier and later periods | positive index levels | dimension one | same series, scope, method, and compatible base |
| `pi_(a,b)` | price-index change from period `a` to `b` | scalar relative change | `1` or percent over interval | interval and seasonal/revision status declared |
| `A^(a)` | amount expressed on period-`a` price-level basis | monetary amount | declared currency at basis `a` | compatible with selected index and scope |
| `A^(b)` | equivalent amount expressed on period-`b` price-level basis | monetary amount | same currency at basis `b` | mapping is index-relative, not universal purchasing power |
| `CF_t` | included signed net cash flow at time `t` | monetary flow amount | one compatible currency and price basis | inflow/outflow sign and timing policy declared |
| `t`, `N` | period index and final modeled period | nonnegative integers | periods | period length matches `r`; terminal treatment declared |
| `NPV_0` | net present value at time zero | monetary aggregate | currency at valuation date | all admitted flows included once |

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

## Price-index contract

`P_a` and `P_b` must come from the same index series or a documented compatible
splice. Population, geography, basket, weights, item scope, base, seasonal
adjustment, publication vintage, and comparison interval remain part of the
quantity. Rebasing one unchanged series alters its levels but not the exact
ratio. An index change estimates inflation only for that declared scope.

The price-level mapping expresses one amount on another period's selected index
basis. It is not a universal statement about every household, producer, asset,
or use of money, and it does not replace item-specific prices or a required
authority-specific adjustment rule.

## Net-present-value contract

The displayed NPV relation assumes end-of-period, equally spaced flows and one
effective rate per matching period. Time zero is undiscounted. Irregular timing,
multiple rates, term structures, continuous discounting, stochastic flows,
options, and authority-specific conventions require a different model.

Cash flows must share currency, tax treatment, and nominal or real basis. A
nominal rate accompanies nominal flows; a compatible real rate accompanies
constant-price flows. The rate source, purpose, horizon, terminal value,
uncertainty, and sensitivity range remain visible. NPV is a model output, not a
forecast guarantee or complete choice rule.

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
- Index levels from different series or areas are compared as price levels.
- A one-item price change is called general inflation.
- Annual-average and endpoint-to-endpoint index changes are interchanged.
- A nominal amount is converted with an incompatible population or item index.
- Initial cost is omitted from NPV or counted twice outside and inside the sum.
- Beginning- and end-of-period flows use the same exponent without adjustment.
- Nominal flows are discounted with a real rate, or vice versa.
- A positive NPV is called realized profit or sufficient decision authority.
- Rate, cash-flow, inflation, or terminal assumptions change without sensitivity analysis.

## Reference Delta

The canonical
[Cost, Price, Value, Utility, and Return entry](../entries/cost-price-value-return.md)
owns the full comparison. Relative to a formula sheet, this view adds owner,
cash-flow boundary, baseline, recognition exclusion, index identity, dates,
compounding, nominal/real alignment, sensitivity, risk, and nonfinancial
exclusion contracts.

## Sources and provenance

1. OpenStax, *Principles of Finance*, sections 7.2, 7.4, and 15.1:
   https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics
   https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance
   https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset
2. OpenStax, *Principles of Economics 3e*, section 6.1:
   https://openstax.org/books/principles-economics-3e/pages/6-1-consumption-choices
3. U.S. Bureau of Labor Statistics, CPI percent changes:
   https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm
4. OMB Circular A-94:
   https://www.whitehouse.gov/wp-content/uploads/2025/12/a094.pdf

Formula authority: introductory finance relations within stated scope.
Factorium presentation remains `candidate`.
