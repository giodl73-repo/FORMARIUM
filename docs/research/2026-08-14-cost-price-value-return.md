# Cost, Price, Value, Utility, and Return Research

Status: candidate research basis

## Research question

How should Factorium separate cost, price, value, utility, return, and
discounted present value when the same currency unit can represent different
owners, times, models, and decisions?

Decision supported: publication of an economic-value anchor and a Formula
view for holding-period return and time-value mappings.

## Local evidence

- `tables/entries/comparative-quantity.md` requires explicit baselines,
  numerator/denominator order, and percentage-point distinctions.
- `tables/entries/probability-risk-uncertainty.md` separates model probability,
  consequences, risk, and expected loss.
- `tables/entries/work-energy-power.md` demonstrates that shared units do not
  imply shared semantic roles.
- `tables/formulas/general-accounting-balance.md` requires a boundary and
  accounting basis.

## Findings

### FACTORIUM-CPVR-01 - Cost depends on perspective and included sacrifices

Source:

- OpenStax, *Principles of Economics 3e*, chapter 7 key terms:
  https://openstax.org/books/principles-economics-3e/pages/7-key-terms
- OpenStax, chapter 2 key terms:
  https://openstax.org/books/principles-economics-3e/pages/2-key-terms

Observed constraint: explicit cost records out-of-pocket payments, implicit
cost captures forgone use of owned resources, and opportunity cost concerns
the value of the best forgone alternative.

Implication: a cost value requires decision maker, resource boundary, time
horizon, accounting/economic perspective, included categories, and
counterfactual where applicable.

Confidence: high.

### FACTORIUM-CPVR-02 - Price is an exchange term, not intrinsic value

Source:

- OpenStax, *Principles of Economics 3e*, production and market chapters:
  https://openstax.org/books/principles-economics-3e/pages/7-introduction-to-production-costs-and-industry-structure
  https://openstax.org/books/principles-economics-3e/pages/3-introduction-to-demand-and-supply

Observed constraint: price is an amount paid, received, offered, or quoted in
an exchange context and can vary by market, time, quantity, terms, and party.

Implication: price does not automatically equal seller cost, buyer utility,
fair value, or long-term worth.

Confidence: high.

### FACTORIUM-CPVR-03 - Utility is preference- and person-relative

Source:

- OpenStax, *Principles of Economics 3e*, section 6.1:
  https://openstax.org/books/principles-economics-3e/pages/6-1-consumption-choices

Observed constraint: utility models satisfaction from choices under
constraints. OpenStax explicitly cautions that numerical "utils" are
subjective and not directly comparable across individuals.

Implication: utility must not be treated as a currency amount, intrinsic
property, or interpersonal cardinal measure without a specialized model.

Confidence: high.

### FACTORIUM-CPVR-04 - Return requires baseline, cash flows, and holding period

Source:

- OpenStax, *Principles of Finance*, section 15.1:
  https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset

Observed constraint: total dollar return combines income and capital gain;
percent return divides the total by beginning value. A holding-period return
does not become annual merely because it is displayed as a percentage.

Implication: Factorium must expose opening value, ending value, intermediate
flows, holding period, reinvestment, fees, taxes, and annualization method.

Confidence: high.

### FACTORIUM-CPVR-05 - Discounting is a model-dependent time mapping

Source:

- OpenStax, *Principles of Finance*, sections 7.2 and 7.4:
  https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics
  https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance

Observed constraint: present and future value are related by a per-period rate,
number of periods, and compounding convention. Rate and period units must
match.

Implication: present value is not an observed price or universal worth; it is
the output of declared cash-flow, timing, rate, and compounding assumptions.

Confidence: high.

### FACTORIUM-CPVR-06 - Nominal and real values use different purchasing bases

Source:

- OpenStax, *Principles of Finance*, section 7.4:
  https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance

Observed constraint: nominal values and rates include the price-level basis of
their period, while real values and rates adjust for inflation or purchasing
power under a selected index.

Implication: monetary comparisons across time must state nominal/real basis,
currency, date, and index rather than compare raw amounts.

Confidence: high.

### FACTORIUM-CPVR-07 - Value is model- and purpose-relative

Source:

- OpenStax finance time-value and return sections:
  https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics
  https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset
- `tables/entries/probability-risk-uncertainty.md`

Observed constraint: finance derives values from modeled future benefits,
rates, and risks; economics distinguishes preference utility and opportunity
cost; observed market price remains another quantity.

Implication: Factorium should treat value as an assessed result with named
subject, owner, purpose, method, date, scenario, and uncertainty.

Confidence: medium-high.

## Recommendations

### Adopt now

- Publish one anchor separating cost, price, assessed value, utility, return,
  and discounted value.
- Publish a Formula view for dollar return, holding-period return, present
  value, and future value.
- Require owner, perspective, cash-flow boundary, time, baseline, rate,
  compounding, nominal/real basis, and uncertainty.

Owner: Factorium.

Validation: Domain Source Reviewer, Evidence & Claims Editor, Equation &
Units Auditor, Reference Lexicographer, role registry, and links.

### Prototype behind a compatibility boundary

- Treat NPV, IRR, WACC, option value, consumer surplus, welfare, and accounting
  measurement bases as later specialized entries.
- Defer machine-readable cash-flow timelines and currency bases to R2.

### Reject or defer

- Reject price as universal value.
- Reject utility numbers as directly interpersonal.
- Reject an unlabeled percentage return without holding period.
- Reject present value without a discount-rate and timing contract.

## Non-goals

- investment advice or valuation of a real asset;
- selecting a universal discount rate;
- replacing accounting, finance, tax, or appraisal standards;
- claiming that all forms of value reduce to money.

