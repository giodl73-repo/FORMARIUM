---
skill: roles-check
topic: synthetic-distinctive-terms-ranking-plan
date: 2026-08-17
roles_used: 9
p1_count: 0
verdict: APPROVED-WITH-CONDITIONS
---

# Synthetic Distinctive-Terms Ranking Plan — Role Review

## Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | SUJ-02 was inspected before freeze. | P3 | Candidate control | Label it development evidence only. |
| 2 | QLD-02 predates the candidate. | P3 | Independent holdout | Preserve exact bytes. |
| 3 | Parameters and thresholds are frozen before holdout execution. | P3 | Admission | Do not tune after scoring. |

## Data-Split and Leakage Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | QLD-02 includes a related dashboard packet but different frozen wording. | P3 | Independent holdout | Keep it in the denominator. |
| 2 | Intended families come from pre-candidate selected senses. | P3 | Independent holdout | Do not add destinations. |
| 3 | All 48 query attempts remain scored. | P3 | Admission | Report losses as well as gains. |

## Evidence and Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Ranking exposure is not relevance or findability. | P3 | Claims boundary | Keep reader claims open. |
| 2 | Development values are explicitly nonconfirmatory. | P3 | Candidate control | Retain disclosure. |
| 3 | A pass supports only a candidate lens. | P3 | Admission | Avoid broad Search claims. |

## Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Existing owners already contain the dashboard distinction. | P3 | Product problem | Add no headword. |
| 2 | IDF tests distinctive vocabulary without inventing synonyms. | P3 | Candidate control | Keep expansion disabled. |
| 3 | Ownership-family scoring prevents views from masquerading as new concepts. | P3 | Independent holdout | Preserve family deduplication. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Search remains auxiliary to Tables. | P3 | Admission | Preserve book authority. |
| 2 | Default replacement is prohibited. | P3 | Admission | Test an optional lens only after a pass. |
| 3 | No edition should be minted for a null. | P3 | Admission | Stop cleanly on failure. |

## Concept and Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Dashboard is an example context, not a canonical class. | P3 | Product problem | Add no dashboard taxonomy. |
| 2 | The candidate changes retrieval, not concept identity. | P3 | Candidate control | Change no schema. |
| 3 | Selected owners remain distinct. | P3 | Independent holdout | Do not collapse State, Evaluation, and Control. |

## Research Integrity and Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Baseline, development, and holdout digests are frozen. | P3 | Custody | Verify mechanically. |
| 2 | Conventional BM25 parameters are fully declared. | P3 | Candidate control | Record exact implementation. |
| 3 | A null remains a required result. | P3 | Admission | Preserve failed output. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Distinctive terms may help when ordinary words dominate. | P3 | Product problem | Test broad tasks, not one query. |
| 2 | Two unexplained rank modes could increase burden. | P3 | Admission | Require a meaningful holdout margin. |
| 3 | Local dashboard meaning still belongs to product documentation. | P3 | Claims boundary | Preserve outward handoff. |

## Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The candidate addresses the last known no-foothold task. | P3 | Product problem | Test the smallest lexical control. |
| 2 | An optional lens has interface and explanation cost. | P3 | Admission | Require gains to exceed losses by four. |
| 3 | Default replacement would risk working routes. | P3 | Admission | Keep the current ranker primary. |

## Synthesis

Roles reviewed: 9

P1 blockers: 0 | P2 issues: 0 | P3 notes: 27

Verdict: APPROVED-WITH-CONDITIONS

Top finding: the development portfolio cannot validate the candidate because
it was inspected before freeze. Cross-role consensus: execute unchanged BM25
on exact QLD-02, preserve every loss, and admit at most an optional lens.

## Amendments applied

1. Separated development observations from the independent holdout.
2. Froze conventional parameters, exact custody, and a net-gain gate.
3. Prohibited aliases, default replacement, and reader claims.
