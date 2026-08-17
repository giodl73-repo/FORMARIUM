---
skill: roles-check
topic: f61-f70-evaluation-grammar
date: 2026-08-16
roles_used: 13
p1_count: 0
verdict: APPROVED-WITH-CONDITIONS
---

# F61-F70 Evaluation Grammar Roles Check

Artifact: `docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md`

Artifact type: editorial/reference architecture proposal

Domain signals: measurement, indicators, scales, comparison, criteria,
aggregation, thresholds, sensitivity, provenance, book navigation

## Role selection

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | audits whether scores, criteria, thresholds, and aggregation retain exact semantics |
| Factorization Method Steward | audits evaluation decomposition, alternatives, interactions, and residuals |
| Reference Lexicographer | separates measure, metric, indicator, score, scale, rank, grade, and criterion |
| Reference Architecture Editor | audits one coherent reader route rather than phase-labelled fragments |
| Concept & Taxonomy Boundary Editor | prevents named metrics, scales, and rating systems from becoming catalogs |
| Evidence & Claims Editor | separates an evaluation record from truth, validity, quality, and outcome claims |
| Benchmark Numeracy Checker | requires denominators, populations, uncertainty, cost dimensions, and comparison bases |
| Research Integrity & Provenance | requires reconstructable sources, rules, revisions, identities, and dispositions |
| Domain Source Reviewer | bounds metrology, statistics, decision analysis, and control terminology |
| Mapping Integrity Auditor | audits normalization, scale transformation, ranking, aggregation, and information loss |
| Reference Practitioner | requires a fast route for interpreting an unfamiliar score or judgment |
| Schema Implementer | requires exact owners, stable records, and fail-closed synchronization |
| Product Owner | audits reader value, portfolio cost, coherent batch outcome, and stop decisions |

## Findings

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A scalar score can hide differently typed factors. | P2 | F62-F66 | Require subject, measure, scale, direction, basis, and combination contract before interpretation. |
| 2 | Weighting can be mistaken for physical contribution or causal importance. | P2 | F64-F66 | Keep preference weight, evidence strength, quantity coefficient, and causal effect separate. |
| 3 | A pass/fail result can erase distance from, uncertainty around, and behavior at a threshold. | P2 | F65 | Retain comparison operator, boundary policy, tolerance, and uncertainty. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Ten slices could become ten overlapping owners. | P2 | F61-F70 | Admit at most one evaluation anchor and use existing owners plus distinct views. |
| 2 | One aggregate can conceal interactions, noncompensation, or vetoes. | P2 | F66 | Require component, interaction, missingness, residual, and noncompensation records. |
| 3 | Sensitivity may depend on an arbitrary baseline or range. | P3 | F67 | Preserve selected variation domain and credible alternate ranges. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Measure, metric, indicator, index, and score are often used interchangeably. | P2 | F62 | Give each a governing question and allow domain usage only when explicitly scoped. |
| 2 | Scale, rating, rank, grade, and classification can collapse numeric, ordinal, and categorical results. | P2 | F63 | Record allowable comparisons and transformations, not the label alone. |
| 3 | Criterion, threshold, target, and tolerance can all look like comparison values. | P2 | F61/F64/F65 | Contrast relevance rule, desired state, acceptable deviation, and decision boundary. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Specialized views could repeat the anchor instead of answering distinct questions. | P2 | Batch architecture | Give every view one lookup task and centralize vocabulary in one anchor. |
| 2 | The book could present evaluation metadata without a usable interpretive sequence. | P2 | F70 | Compose frame, measure, scale, criterion, combination, threshold, sensitivity, and disposition as one route. |
| 3 | Phase numbering could leak into the book organization. | P3 | Publication | Organize by reader questions and tasks, not F61-F70. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Named metrics and rating systems form open-ended catalogs. | P2 | F62-F63 | Keep named systems as bounded examples or external authorities. |
| 2 | Robustness has incompatible domain meanings. | P2 | F67 | Define a variation-and-claim procedure rather than a universal robustness taxonomy. |
| 3 | Disposition labels vary by authority and workflow. | P3 | F69 | Preserve local vocabulary, authority, and mapping instead of standardizing outcomes globally. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A computed score can be mistaken for direct observation. | P2 | F62/F68 | Retain source observations, derivation rule, assumptions, and epistemic status. |
| 2 | Passing a threshold can be mistaken for validity, safety, quality, or success. | P2 | F65/F69 | State the exact rule and separate conformance from broader claims. |
| 3 | Internal evaluation tasks could be summarized as reader success. | P2 | Result review | Limit evidence claims to sources, structure, coverage, and mechanics. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Metrics without populations or denominators make comparisons irreproducible. | P2 | F61-F62 | Require eligible population, numerator/denominator or statistic, missingness, window, and uncertainty. |
| 2 | One composite score may hide opposing quality, time, storage, cost, or risk dimensions. | P2 | F66 | Retain the component vector and report noncommensurate dimensions separately. |
| 3 | Rank changes can look meaningful without ties, support, or uncertainty. | P3 | F63/F67 | Preserve ties, sample support, interval or perturbation behavior, and practical consequence. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Evaluation rules can change while retaining the same display label. | P2 | F68-F69 | Bind rule, implementation, data/corpus, authority, time, and version. |
| 2 | Normalized or aggregate outputs can lose derivation custody. | P2 | F66/F68 | Preserve source values, transformations, parameters, exclusions, and loss. |
| 3 | Superseded evaluations may disappear. | P3 | Revision | Preserve prior record, reason, reviewer, and changed disposition. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Measurement, monitoring, benchmarking, and decision-analysis terms have bounded source meanings. | P2 | All | Cite bounded authorities and label the cross-domain grammar as Factorium synthesis. |
| 2 | A target is not universally a reference value or control set point. | P2 | F61 | Preserve owner, purpose, unit/scale, horizon, and comparison role. |
| 3 | Classification performance does not define every use of score or rating. | P3 | F62-F63 | Use it as one example only. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Normalization can erase units, direction, bounds, and reference populations. | P2 | F66 | Record source/target scales, rule, fitted population, invariants, and inverse limits. |
| 2 | Ranking is a lossy many-to-one projection. | P2 | F63 | Retain ties, incomparable cases, source values, and nonreconstructable differences. |
| 3 | Aggregation can imply comparability that transformation did not establish. | P2 | F66 | Require a declared common basis or retain separate components. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | An unfamiliar score currently requires reconstructing definitions across several entries. | P2 | Anchor/F70 | Add a compact evaluation record and a question-led interpretation procedure. |
| 2 | Full metadata can overwhelm the first reading. | P2 | Book | Lead with what, compared with what, on which scale, by which rule, and with what sensitivity. |
| 3 | Abstract distinctions need a worked but neutral rehearsal. | P3 | F70 | Rehearse one bounded evaluation without supplying a preferred decision. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Free-form score prose would require consumers to guess required fields. | P2 | Anchor | Specify mandatory textual records in canonical Markdown without changing V0. |
| 2 | New sources require exact assurance migration. | P2 | Integration | Bind every changed entry/view to the F70 result review and recompute identities. |
| 3 | Generated catalogs, queries, task manifests, and expected counts can drift. | P2 | Validation | Synchronize once at F70 and fail closed on every exact dependent. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Evaluation vocabulary can become metadata that readers must learn without improving a real job. | P2 | Batch outcome | Make “interpret an unfamiliar evaluation” the batch job and test the whole route. |
| 2 | Nine proposed views carry navigation and maintenance cost. | P2 | Portfolio | Merge scale with mapping and provenance with the evaluation record; defer any view without distinct work saved. |
| 3 | Author rehearsal cannot establish usefulness or comprehension. | P3 | Evidence | Report intended and internally rehearsed utility only; reserve reader-value claims. |

## Synthesis

Roles reviewed: 13

P1 blockers: 0 | P2 issues: 31 | P3 notes: 8

Verdict: APPROVED-WITH-CONDITIONS

Top finding: an evaluation result is uninterpretable unless its subject,
population, baseline, measure, scale, direction, criteria, combination rule,
threshold behavior, uncertainty, sensitivity, and provenance remain available.

Cross-role consensus: one owner-first grammar, loss-aware transformations,
visible component dimensions, noncompensation and veto boundaries, honest
evidence status, and a recognizable score-interpretation route are mandatory.

## Amendments

1. Admit at most one evaluation anchor; deepen existing Measurement Quality,
   Control/Monitoring, Choice/Alternative, and Statistical Summary owners.
2. Merge overlapping scale/mapping and provenance/record work; add only views
   with distinct reader questions.
3. Preserve source observations, denominators, populations, units/scales,
   direction, rules, uncertainty, missingness, interactions, loss, authority,
   versions, and unresolved residuals wherever applicable.
4. Bind F70 to an integrated neutral rehearsal, exact assurance migration,
   full book validation, and a Product Owner continue/merge/defer/stop decision.
