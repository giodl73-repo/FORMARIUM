# Cost, Price, Value, Utility, and Return Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-cost-price-value-return.md`
- `tables/entries/cost-price-value-return.md`
- `tables/formulas/cost-value-return.md`
- related index and cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Owner, perspective, exchange, counterfactual, baseline, cash flow, and time remain explicit. |
| Experimental Methodologist | defer | No market-performance experiment is introduced. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | Sacrifice, transaction, assessment, preference, outcome, and time mapping remain separate. |
| Evidence & Claims Editor | pass after findings | Finance formulas are not presented as universal value theory or advice. |
| Benchmark Numeracy Checker | pass | Denominators, time periods, compounding, and nominal/real bases are explicit. |
| Reference Lexicographer | pass after findings | Ordinary worth language is separated into cost, price, value, utility, and return senses. |
| Reference Architecture Editor | pass | One anchor owns the semantic distinctions and one Formula view owns scoped calculations. |
| Research Integrity & Provenance | pass | OpenStax economics and finance sources support actionable claims. |
| Cross-Paradigm Mapping Auditor | defer | No mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Sources support introductory pilot depth; standards-specific valuation is deferred. |
| Equation & Units Auditor | pass after findings | Currency basis, dates, cash flows, rates, periods, and restrictions are visible. |
| Mapping Integrity Auditor | pass | Discounting is a scoped time-value mapping and does not overwrite observed prices. |
| Schema Implementer | defer | Cash-flow timelines remain Markdown-first until R2. |
| Benchmark Consumer | defer | Founding evidence packets are unchanged. |
| Reference Practitioner | pass | Selection procedure prevents price/value and return/time substitutions. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| CVR-001 | critical | Cost, price, and value could be collapsed by shared currency units. | Closed: perspective, exchange, and assessment roles are separate. |
| CVR-002 | major | Opportunity cost could omit its counterfactual. | Closed: the forgone alternative and valuation basis are required. |
| CVR-003 | critical | Utility could be treated as interpersonal cardinal value. | Closed: utility remains agent- and model-relative. |
| CVR-004 | critical | Return could omit income or baseline. | Closed: opening value, ending value, included flows, and denominator are explicit. |
| CVR-005 | critical | A holding-period return could be called annual. | Closed: interval and annualization transformation are separate. |
| CVR-006 | critical | Present value could be treated as observed market price. | Closed: it is explicitly a model result with rate, timing, and purpose. |
| CVR-007 | major | Rate and period units could mismatch. | Closed: per-period rate and period count must align. |
| CVR-008 | major | Nominal and real amounts could be mixed. | Closed: price-level basis and compatible rates are required. |
| CVR-009 | critical | The entry could imply investment advice. | Closed: real valuation, rate selection, and advice are explicit non-goals. |

No critical or major finding remains open.

