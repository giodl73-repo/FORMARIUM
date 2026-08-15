---
skill: roles-check
topic: statistical-summary-interval
date: 2026-08-15
roles_used: 10
p1_count: 0
verdict: APPROVED
---

# Statistical Summary and Interval Roles Check

## Phase 1 - Artifact identification

Artifact type: canonical Factor Table anchor, Diagnostic Table view,
reassigned Formula Table owner, source review, graph-debt resolution, and
proposed interchange/book registration.

Domain signals: descriptive statistics, survey weights, estimation, sampling
distributions, measurement, benchmarks, confidence coverage, units,
provenance, and practitioner reporting.

## Phase 2 - Role selection

| Role | Why selected |
|---|---|
| Factorization Method Steward | Tests whether distinct target questions become one statistical recipe. |
| Experimental Methodologist | Audits selection, dependence, replication, assumptions, and coverage checks. |
| Evidence & Claims Editor | Prevents summary narrowness from becoming accuracy or validity proof. |
| Benchmark Numeracy Checker | Audits weights, denominators, degrees of freedom, units, sample sizes, and intervals. |
| Reference Lexicographer | Common terms such as average, spread, error, and interval need precise sense separation. |
| Reference Architecture Editor | Reassigns arithmetic mean and connects sampling, probability, and measurement. |
| Domain Source Reviewer | Statistical method claims require authoritative sources and retained assumptions. |
| Research Integrity & Provenance | Data stages, weights, conventions, software, and exclusions must be reconstructable. |
| Equation & Units Auditor | Mean, variance, SD, and SE have different dimensional and denominator contracts. |
| Reference Practitioner | Readers need a fast route from a reporting symptom to a discriminating audit. |

## Phase 3 - Review

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | One location or interval method could appear universally correct. | P2 | Candidate factorizations | Preserve data-location, order, weighted, spread, estimator, interval, and decision pivots. Closed. |
| 2 | Factors are dependent contract fields rather than freely combinable dimensions. | P2 | Root factorization | Sequence target, data, estimator/design, and interval method in the procedure. Closed. |
| 3 | Descriptive and inferential roles could collapse because they share formulas. | P2 | Chain view | Separate observed-data summaries from repeated-sampling estimator properties. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Standard error could count records instead of independent experimental or sampling units. | P2 | Procedure | Require dependence, clusters, weights, design, and effective replication. Closed. |
| 2 | Outcome-dependent exclusions could make intervals look narrower. | P2 | Diagnostic use contract | Preserve analytic-stage flow, missingness, censoring, and exclusions. Closed. |
| 3 | Coverage claims could rest on untested assumptions. | P2 | Confidence interval sense | Require procedure, target, level, assumptions, and simulation/analytic coverage checks where appropriate. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A narrow interval could be summarized as accurate or unbiased. | P2 | Constraints | Explicitly deny narrowness as validity, bias, transport, or decision proof. Closed. |
| 2 | `95% confidence` could become posterior probability for one realized frequentist interval. | P2 | Contrast table | State long-run procedure coverage and contrast credible intervals. Closed. |
| 3 | Candidate synthesis could be treated as statistical certification. | P2 | Claim limits | Retain candidate maturity and deny method certification. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Weighted results could omit weight sums, meaning, and effective sample size. | P2 | Weighted lens | Require weight provenance, normalization, distribution, design effect, and stage denominators. Closed. |
| 2 | Variance, SD, and SE could share units or labels. | P2 | Constraints | Preserve squared units, original units, and estimator-sampling-distribution ownership. Closed. |
| 3 | One `n` could hide records, analytic cases, weighted population, and independent units. | P2 | Procedure | Report all stage and independence denominators explicitly. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `average` could ambiguously mean mean, median, or another location summary. | P2 | Orientation | Require the exact statistic name. Closed. |
| 2 | Median is not always one observed central order statistic for even samples. | P2 | Orientation | Define it as a rank-based center under a declared finite-sample convention. Closed. |
| 3 | Error bar could collapse SD, SE, confidence, prediction, or other bounds. | P2 | Contrasts | Separate each target and procedure. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The arithmetic-mean Formula view lacks a canonical owner. | P2 | Interchange | Reassign it to `arithmetic-mean` in the new anchor. Closed. |
| 2 | Confidence interval remains graph debt in probability/uncertainty. | P2 | Cross-reference | Resolve that exact sense while leaving likelihood unresolved. Closed. |
| 3 | The long anchor could displace table-first reading. | P3 | Whole entry | Lead with sense, chain, factorization, contrast, and selection tables. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | One quantile interpolation rule could be presented as universal. | P2 | Quantile sense | Require the declared convention and software/version. Closed. |
| 2 | One confidence method could be generalized to every parameter or design. | P2 | Confidence sense | Keep target, estimator, reference/resampling method, sidedness, and assumptions explicit. Closed. |
| 3 | Survey, precision, frequency, and preference weights could become equivalent. | P2 | Weighted mean | Preserve weight meaning and native method authority. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Summary values could overwrite raw data and analytic-stage identity. | P2 | Diagnostic contract | Preserve raw, selected, analytic, transformed, and summarized artifacts separately. Closed. |
| 2 | Software defaults could silently change quantiles or variance denominators. | P2 | Root factors | Record software, version, method, options, and revision. Closed. |
| 3 | Factorium synthesis could blur with source definitions. | P2 | Provenance | Bind 19 findings to URLs and label the cross-domain organization candidate. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Means could combine incompatible quantities or units. | P2 | Formula contract | Require a common quantity kind/unit or a justified common scale. Closed. |
| 2 | Variance and SD could be reported with the same unit. | P2 | Contrast table | Preserve squared and original-unit contracts. Closed. |
| 3 | `s/sqrt(n)` could be applied despite weighting, clustering, or another estimator. | P2 | Standard error sense | Require estimator/design-specific SE calculation. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a first question before a formula. | P2 | Procedure | Begin with descriptive, inferential, or decision target. Closed. |
| 2 | Abstract distinctions need recognizable examples. | P2 | Diagnostic examples | Include salary skew, changing weights, quantile defaults, clustered timings, and future predictions. Closed. |
| 3 | The diagnostic needs a next test and repair owner. | P2 | Diagnostic view | Pair each symptom with candidate causes, discriminating tests, and owners. Closed. |

## Phase 4 - Synthesis

```text
Roles reviewed: 10
P1 blockers: 0  |  P2 issues: 29  |  P3 notes: 1

Verdict: APPROVED
Top finding: standard deviation, standard error, and interval bounds must name
their target distribution or procedure rather than sharing an error-bar label.
Cross-role consensus: target, analytic set, weights, denominator, independent
units, estimator, design, method, assumptions, units, and provenance remain explicit.
```

All P2 and P3 findings were amended in the reviewed artifacts; no actionable
finding remains open.

## Phase 5 - Amend

1. Split eight senses and added separate descriptive, estimator, and interval
   chains with alternative pivots.
2. Added weight, denominator, units, dependence, effective replication,
   quantile-convention, and interval-target constraints.
3. Reassigned the arithmetic-mean Formula view, resolved confidence interval,
   and added a symptom/test/owner diagnostic.
