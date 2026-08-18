---
skill: roles-check
topic: sim-46-internal-fixed-point-refresh-plan
date: 2026-08-17
roles_used: 9
p1_count: 0
verdict: APPROVED-WITH-CONDITIONS
---

# Sim-46 Internal Fixed-Point Refresh Plan — Role Review

## Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The artifact already exists and is clean-rendered. | P3 | Exact artifact | Bind exact bytes. |
| 2 | The refresh introduces no new experiment. | P3 | Claims boundary | Make no performance claim. |
| 3 | Historical nulls and editions remain unchanged. | P3 | Smallest batch | Preserve prior custody. |

## Data-Split and Leakage Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | No corpus, split, query, or denominator changes. | P3 | Smallest batch | Keep artifacts immutable. |
| 2 | Later repairs do not retroactively cover earlier evidence. | P3 | Claims boundary | State the evidence boundary. |
| 3 | Reader gates remain external. | P3 | Claims boundary | Do not infer tested coverage. |

## Evidence and Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Maintained” must not become “preview-ready.” | P3 | Claims boundary | Preserve the distinction. |
| 2 | No reader participated in `sim-46`. | P3 | Claims boundary | Keep reader claims open. |
| 3 | V1 and publication remain inadmissible labels. | P3 | Validation and stop | Add explicit exclusions. |

## Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Source, record, page, entry, and view counts are distinct. | P3 | Exact artifact | Keep denominators named. |
| 2 | Standalone, index, and site identities are separate. | P3 | Exact artifact | Record all three. |
| 3 | Connection count is navigation, not relation count. | P3 | Exact artifact | Retain untyped wording. |

## Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Current authority documents disagree on the maintained edition. | P3 | Maintenance trigger | Reconcile four files. |
| 2 | Historical preflights should remain edition-specific. | P3 | Smallest batch | Do not bulk replace. |
| 3 | Tables and Reader content remain unchanged. | P3 | Smallest batch | Keep software auxiliary. |

## Research Integrity and Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Exact manifest custody is available. | P3 | Exact artifact | Freeze it mechanically. |
| 2 | Superseded maintained statements need an explicit refresh record. | P3 | Maintenance trigger | Record plan and result. |
| 3 | No tag or distribution event occurred. | P3 | Claims boundary | Preserve negative custody. |

## Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The machine-readable refresh fixture removes guesswork. | P3 | Exact artifact | Validate all fields. |
| 2 | Manifest field locations differ by measure. | P3 | Validation | Check exact paths. |
| 3 | No interchange schema version changes. | P3 | Smallest batch | Keep V0 untouched. |

## Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Maintainers need one unambiguous artifact to open. | P3 | Maintenance trigger | Name `sim-46`. |
| 2 | This does not improve observed reader use. | P3 | Claims boundary | Avoid usability language. |
| 3 | The outward documentation handoff remains intact. | P3 | Smallest batch | Change no reader surface. |

## Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reconciliation reduces maintenance error without adding product scope. | P3 | Maintenance trigger | Admit the refresh. |
| 2 | A new render or tag has no value here. | P3 | Smallest batch | Reuse exact `sim-46`. |
| 3 | Work must stop after authority consistency. | P3 | Validation and stop | Make one result commit. |

## Synthesis

Roles reviewed: 9

P1 blockers: 0 | P2 issues: 0 | P3 notes: 27

Verdict: APPROVED-WITH-CONDITIONS

Top finding: the maintained-artifact authorities are stale while the exact
`sim-46` artifact is already validated. Cross-role consensus: reconcile only
current authority, retain historical custody, and admit no preview claim.

## Amendments applied

1. Froze exact counts and three distinct artifact identities.
2. Capped the refresh at four current authority files.
3. Prohibited a new render, tag, distribution, V1, or reader claim.
