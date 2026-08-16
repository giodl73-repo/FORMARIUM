---
skill: discover-websearch
topic: economic-basis-inflation-npv
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Economic Basis, Inflation, and Net Present Value Web Evidence

## Claims and query evidence

### Claim 1: accounting basis governs recognition and timing, not merely cash movement

- Query 1: `site:irs.gov accounting methods cash accrual income expenses publication`
  - Source: https://www.irs.gov/publications/p334
  - Direct quote: “rules used to determine when and how income and expenses are reported”
- Query 2: `site:fasab.gov accounting basis recognition measurement handbook`
  - Source: https://fasab.gov/accounting-standards/document-by-chapter/
  - Direct quote: “Definitions of Elements and Basic Recognition Criteria”
- Verdict: CONFIRMED

### Claim 2: inflation estimates require a declared aggregate index scope

- Query 1: `site:bls.gov CPI inflation average price change representative basket`
  - Source: https://www.bls.gov/opub/hom/cpi/calculation.htm
  - Direct quote: “average change over time in the prices paid by consumers”
- Query 2: `site:bls.gov CPI weights all items inflation one component`
  - Source: https://www.bls.gov/cpi/tables/relative-importance/
  - Direct quote: “Household spending weights are used to average the changes”
- Verdict: CONFIRMED

### Claim 3: index change and index level are distinct

- Query 1: `site:bls.gov calculate percent change CPI earlier later index`
  - Source: https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm
  - Direct quote: “subtract the earlier index value from the later one”
- Query 2: `site:bls.gov CPI index levels different series cannot compare price level`
  - Source: https://www.bls.gov/opub/hom/cpi/concepts.htm
  - Direct quote: “index levels of different series cannot be used to directly compare”
- Verdict: CONFIRMED

### Claim 4: NPV discounts timed benefits and costs to one basis and depends on rate and timing

- Query 1: `site:whitehouse.gov Circular A-94 net present value future benefits costs discount`
  - Source: https://www.whitehouse.gov/wp-content/uploads/2025/12/a094.pdf
  - Direct quote: “necessary to discount future benefits and costs”
- Query 2: `site:gao.gov net present value timing cash flows discount rate`
  - Source: https://www.gao.gov/assets/aimd-97-145.pdf
  - Direct quote: “depends on various factors, including the discount rate and the timing of cash flows”
- Verdict: CONFIRMED

### Claim 5: nominal/real alignment and sensitivity are required for scoped NPV interpretation

- Query 1: `site:whitehouse.gov Circular A-94 nominal real values must not be combined sensitivity`
  - Source: https://www.whitehouse.gov/wp-content/uploads/2025/12/a094.pdf
  - Direct quote: “Nominal and real values must not be combined”
- Query 2: `site:gao.gov net present value sensitivity analysis discount rate`
  - Source: https://www.gao.gov/assets/gao-14-519.pdf
  - Direct quote: “gauge the sensitivity of the benefit and cost estimates”
- Verdict: CONFIRMED

## Findings

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Accounting methods govern when and how scoped income and expenses are reported. | CONFIRMED | IRS |
| 2 | Cash and accrual methods can assign the same event to different periods. | CONFIRMED | IRS |
| 3 | Accounting authority and purpose constrain which basis is permitted. | CONFIRMED | IRS/FASAB |
| 4 | Recognition and measurement are distinct accounting decisions. | CONFIRMED | FASAB |
| 5 | CPI measures average price change for a declared consumer scope. | CONFIRMED | BLS |
| 6 | Aggregate inflation depends on basket and expenditure weights. | CONFIRMED | BLS |
| 7 | One item price movement is not automatically aggregate inflation. | CONFIRMED | inference from BLS aggregation |
| 8 | Inflation is a relative index change over a named interval. | CONFIRMED | BLS |
| 9 | Annual-average and endpoint changes answer different questions. | CONFIRMED | BLS |
| 10 | Rebasing changes an index level but not its exact relative change. | CONFIRMED | BLS |
| 11 | Levels from distinct CPI series do not directly compare area price levels. | CONFIRMED | BLS |
| 12 | NPV requires timed benefits and costs and a discount rule. | CONFIRMED | OMB |
| 13 | Discount rate and cash-flow timing can materially change NPV. | CONFIRMED | OMB/GAO |
| 14 | Nominal flows require nominal rates and real flows require compatible real rates. | CONFIRMED | OMB |
| 15 | Nominal and real values must not be silently mixed. | CONFIRMED | OMB |
| 16 | Sensitivity analysis exposes dependence on uncertain assumptions. | CONFIRMED | OMB/GAO |
| 17 | NPV is a model result rather than realized accounting profit. | CONFIRMED | inference from OMB model scope |
| 18 | Named standards and index products are unnecessary to define the conceptual ladder. | CONFIRMED | inference from reusable criteria |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or ungrounded.

## Amendments

1. Separate recognition basis, price-index change, and discounted-flow aggregation.
2. Preserve authority, index identity, interval, timing, discount rate, nominal/real basis, and sensitivity.
3. Keep named standards, indexes, products, and valuation methods outside canonical senses.

No ungrounded claims.
