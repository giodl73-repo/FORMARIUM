---
skill: roles-check
topic: economic-basis-inflation-npv
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Economic Basis, Inflation, and Net Present Value Roles Check

Artifact: revised Cost/Price/Value anchor and Formula view, new Diagnostic
view, source review, reference registration, and book route. Domain signals:
accounting scope, price indexes, time-value models, units, uncertainty,
decisions, and taxonomy boundaries.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Recognition and cash timing could compose arbitrarily. | P2 | Ladder | Require authority-owned triggers. Closed. |
| 2 | Inflation conversion could combine incompatible index scopes. | P2 | Formula | Require one compatible series contract. Closed. |
| 3 | NPV could combine flows with unmatched currency or price bases. | P2 | Factors | Freeze the cash-flow basis. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Accounting basis and valuation method could collapse. | P2 | Contrasts | Separate recognition from amount assignment. Closed. |
| 2 | Inflation rate and index level could collapse. | P2 | Contrasts | Separate interval change from level. Closed. |
| 3 | Named standards could determine the decomposition. | P2 | Boundary | Use authority/recognition/index/timing pivots. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Index choices could be selected after seeing the desired adjustment. | P2 | Procedure | Freeze series and interval first. Closed. |
| 2 | Discount rates could be chosen after seeing the NPV sign. | P2 | Diagnostic | Prespecify source and sensitivity range. Closed. |
| 3 | Forecast misses could disappear from revisions. | P2 | Provenance | Compare estimated and realized flows separately. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Accounting output could imply economic truth. | P2 | Claim boundary | Preserve framework scope. Closed. |
| 2 | CPI change could imply every person's cost of living. | P2 | Inflation | Preserve population and basket scope. Closed. |
| 3 | Positive NPV could imply certain profit or approval. | P2 | NPV | Separate model result and decision. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Annual average and endpoint inflation could be compared. | P2 | Diagnostic | Align intervals and denominators. Closed. |
| 2 | Initial investment could be counted twice. | P2 | Formula | Reconcile each signed flow once. Closed. |
| 3 | Sensitivity could hide opposing assumptions in one score. | P2 | NPV | Report parameter ranges separately. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Basis has broad ordinary and accounting uses. | P2 | Sense table | Use accounting recognition/measurement question. Closed. |
| 2 | Inflation could mean one price increase colloquially. | P2 | Contrasts | Lead with declared aggregate index. Closed. |
| 3 | Present value and NPV need a fast discriminator. | P2 | Contrasts | Use selected flow versus all signed flows. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Three new anchors would fragment authority. | P2 | Whole artifact | Deepen the economic-value anchor. Closed. |
| 2 | Existing time-value formulas could drift. | P2 | Formula | Extend the same Formula view. Closed. |
| 3 | Only the new Diagnostic belongs in the book delta. | P3 | Book | Reuse revised base paths. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Accounting standards could multiply as senses. | P2 | Boundary | Keep authorities external. Closed. |
| 2 | Named price indexes could become inflation senses. | P2 | Boundary | Preserve population/basket/index criteria. Closed. |
| 3 | Asset and valuation-method catalogs could replace the NPV contract. | P2 | Boundary | Keep examples swappable. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | IRS examples could universalize tax accounting. | P2 | Sources | Mark authority scope and retain FASAB contrast. Closed. |
| 2 | CPI could become universal inflation authority. | P2 | Sources | Retain declared population and purpose. Closed. |
| 3 | OMB discount policy could become universal finance advice. | P2 | Sources | Use it for model distinctions only. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Basis changes could overwrite prior reports. | P2 | Diagnostic | Version policies and bridge changes. Closed. |
| 2 | Revised index vintages could silently replace inputs. | P2 | Inflation | Record series and publication vintage. Closed. |
| 3 | Cash-flow and rate assumptions could lose source custody. | P2 | NPV | Bind each assumption to provenance. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Index levels could be treated as currency. | P2 | Symbols | Keep them dimensionless. Closed. |
| 2 | NPV periods and rate periods could mismatch. | P2 | Formula | Require one period basis. Closed. |
| 3 | Irregular timing could misuse integer exponents. | P2 | Scope | Restrict the displayed relation. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Price-level conversion direction could reverse. | P2 | Formula | Name source and target periods. Closed. |
| 2 | Rebasing could appear to change inflation. | P2 | Diagnostic | Round-trip ratios under one series. Closed. |
| 3 | Index conversion could erase population mismatch. | P2 | Mapping | Preserve scope and exclusions. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a three-stage selection ladder. | P2 | Orientation | Add record/index/discount route. Closed. |
| 2 | NPV disagreements need contribution and sensitivity checks. | P2 | Diagnostic | Vary one assumption at a time. Closed. |
| 3 | Advice exclusions should be quickly visible. | P3 | Use contract | Add explicit boundary. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 37  |  P3 notes: 2
Verdict: APPROVED
```

Top finding: recognition basis, aggregate price change, and discounted-flow
aggregation must remain separate. Cross-role consensus: authority, index
scope, interval, cash-flow timing, rate basis, uncertainty, and sensitivity
cannot be implicit. All findings are closed.

## Amendments

1. Deepened one existing anchor instead of creating three isolated authorities.
2. Added recognition, index, price-basis mapping, NPV, and sensitivity contracts.
3. Kept named standards, indexes, products, and valuation methods outside canonical senses.
