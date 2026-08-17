---
skill: roles-check
topic: f71-f80-scenario-operational-closure
date: 2026-08-16
roles_used: 13
p1_count: 0
verdict: APPROVED-WITH-CONDITIONS
---

# F71-F80 Scenario and Operational Closure Roles Check

Artifact: `docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md`

Artifact type: editorial/reference architecture proposal

Domain signals: assumptions, scenarios, comparison, feasibility, resources,
capacity, allocation, dependency, compatibility, evidence, book navigation

## Role selection

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | audits conditional scenarios, shared dependencies, invalid combinations, and feasibility composition |
| Factorization Method Steward | audits scenario pivots, resource decompositions, alternatives, residuals, and bottlenecks |
| Reference Lexicographer | separates assumptions, conditions, scenarios, cases, feasibility statuses, and resource roles |
| Reference Architecture Editor | audits two coherent owners and a single scenario-to-feasibility reader route |
| Concept & Taxonomy Boundary Editor | prevents scenario types, resources, and compatibility schemes from becoming open catalogs |
| Evidence & Claims Editor | separates assumed, modeled, observed, feasible, sufficient, and achieved claims |
| Benchmark Numeracy Checker | requires capacity/demand units, windows, denominators, uncertainty, and utilization bases |
| Research Integrity & Provenance | requires reconstructable scenario, resource, dependency, rule, and revision custody |
| Domain Source Reviewer | bounds systems-engineering, planning, causal, and operational terminology |
| Mapping Integrity Auditor | audits scenario correspondence, substitution, compatibility, equivalence, and loss |
| Reference Practitioner | requires a fast answer to “can this option work under these conditions?” |
| Schema Implementer | requires exact owners, stable records, and fail-closed synchronization |
| Product Owner | audits reader value, owner count, navigation cost, coherent route, and stop decisions |

## Findings

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A scenario can be mistaken for a conjunction of independent conditions. | P2 | F71 | Record dependence, interactions, invalid combinations, and completeness. |
| 2 | Feasibility can be mistaken for positive evaluation or selection. | P2 | F75 | Keep admissibility, feasibility, sufficiency, desirability, recommendation, and selection separate. |
| 3 | Substitute resources may have conditional or partial equivalence. | P2 | F79 | Require function, interface, quantity, quality, timing, authority, and loss conditions. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | One owner for both scenarios and resources would mix two independent pivots. | P2 | Batch ownership | Admit one scenario owner and one resource/capacity owner, then use views. |
| 2 | Capacity can move when the system boundary, bottleneck, mix, or service level changes. | P2 | F76 | Preserve boundary, resource pool, unit, time, operating policy, and bottleneck. |
| 3 | Critical path labels can hide alternate dependency graphs and uncertainty. | P3 | F78 | Retain graph version, path ties, lags, resources, and sensitivity. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Assumption, condition, scenario, and case overlap in ordinary language. | P2 | F71 | Give each a governing question and explicit contrasts. |
| 2 | Eligibility, admissibility, feasibility, and sufficiency can collapse into “allowed.” | P2 | F75 | Separate membership, rule acceptance, practical possibility, and enough-for-purpose claims. |
| 3 | Capacity, demand, load, utilization, allocation, reservation, commitment, consumption, and shortage need distinct roles. | P2 | F76-F77 | Centralize them under one operational-resource owner. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The scenario and resource material could become two disconnected mini-books. | P2 | F80 | Compose them through feasibility, dependency, and compatibility in one reader route. |
| 2 | Existing Choice, Risk, Work, and System owners could be duplicated. | P2 | All | State ownership boundaries and cross-references explicitly. |
| 3 | Phase order could dictate publication order. | P3 | Book | Organize the chapter by the feasibility question, not F71-F80. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Scenario families and resource types invite unlimited named-member catalogs. | P2 | F71/F76 | Keep types as examples and define reusable admission questions. |
| 2 | Compatibility standards and substitution catalogs remain domain-owned. | P2 | F79 | Preserve external authority, version, direction, and scope. |
| 3 | “Enabler” can expand into an arbitrary favorable-factor taxonomy. | P3 | F78 | Treat it as a dependency role relative to a result. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Scenario outputs can be relabeled predictions or observations. | P2 | F71-F73 | Preserve assumed, asserted, simulated, estimated, and observed status. |
| 2 | Feasible-under-model can be reported as feasible in practice. | P2 | F75/F80 | Bind feasibility to frame, evidence, resource, dependency, and authority limits. |
| 3 | Resource allocation can be mistaken for availability, delivery, or outcome. | P2 | F77 | Keep plan, reservation, commitment, consumption, release, and result separate. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Utilization is uninterpretable without capacity basis, demand/load measure, and window. | P2 | F76 | Require numerator/denominator, units, horizon, eligible load, and uncertainty. |
| 2 | Aggregate capacity can hide bottlenecks, quality constraints, and incompatible resource units. | P2 | F76-F77 | Retain resource vectors and limiting constraints. |
| 3 | Shortage severity may depend on priority and unmet-demand consequence. | P3 | F77 | Preserve allocation policy, affected subject, duration, and consequence. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Scenario assumptions and comparison bases can drift behind stable labels. | P2 | F71-F73 | Bind exact inputs, authorities, source states, models, dates, and versions. |
| 2 | Resource commitments and releases need event history. | P2 | F77 | Preserve request, decision, reservation, allocation, consumption, release, and reconciliation events. |
| 3 | Superseded feasibility results must remain reconstructable. | P3 | F80 | Preserve prior graph, rule, evidence, result, and revision rationale. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Scenario, control comparison, capacity, and critical path have domain-specific meanings. | P2 | All | Cite bounded authorities and label the cross-domain grammar as synthesis. |
| 2 | Counterfactual comparison carries stronger causal assumptions in causal analysis. | P2 | F72 | Keep hypothetical alternative and identified causal counterfactual claims separate. |
| 3 | Software resources do not own physical, financial, human, or temporal capacity. | P2 | F76 | Give operational resources an independent cross-domain owner with explicit contrasts. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A benchmark/control mapping can compare unlike populations, times, or methods. | P2 | F72 | Require frame correspondence and declared adjustment/loss. |
| 2 | Substitution can be asymmetric, conditional, quantity-limited, or irreversible. | P2 | F79 | Record direction, domain, cardinality, conditions, inverse, and loss. |
| 3 | Compatibility does not imply identity, equivalence, interchangeability, or coexistence. | P2 | F79 | Give each claim a separate test and authority. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Feasibility currently requires reconstruction across Choice, Work, System, Risk, and Evidence entries. | P2 | F80 | Add a question-led scenario-to-feasibility procedure and book route. |
| 2 | Full operational metadata can obscure the first decision. | P2 | Book | Lead with conditions, requirements, capacity, demand, blockers, and shortfall. |
| 3 | Resource examples can bias the route toward software or projects. | P3 | Tasks | Use cross-domain-neutral prompts and preserve units. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Free-form feasibility prose would require guessed fields. | P2 | Anchors/views | Specify mandatory textual records without changing V0. |
| 2 | New sources require exact assurance migration. | P2 | Integration | Bind every admitted path to the F80 result review. |
| 3 | Catalog, query, task, and renderer counts can drift. | P2 | Validation | Synchronize at F80 and fail closed on all dependents. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Operational vocabulary can become a planning glossary rather than a valuable reader route. | P2 | Batch outcome | Make “can this option work under these conditions?” the integrated job. |
| 2 | Two anchors and seven views add substantial navigation cost. | P2 | Portfolio | Require independent owner tests and merge comparison/evidence or dependency views when tasks overlap. |
| 3 | Internal scenario rehearsal cannot establish real-world feasibility. | P3 | Evidence | Report structural and mechanical coverage only. |

## Synthesis

Roles reviewed: 13

P1 blockers: 0 | P2 issues: 32 | P3 notes: 8

Verdict: APPROVED-WITH-CONDITIONS

Top finding: feasibility is meaningful only relative to an exact scenario,
requirements, admissibility rules, resource/capacity basis, demand/load,
allocation state, dependencies, compatibility, evidence, and unresolved
shortfall.

Cross-role consensus: scenario and operational resource deserve separate
owners; Choice, Risk, Work, System, and Evaluation retain their existing
authority; every feasibility result stays conditional and reconstructable.

## Amendments

1. Admit two anchors—scenario/condition and operational resource/capacity—and
   no more than seven distinct views.
2. Preserve epistemic status, frame correspondence, resource units, time,
   allocation events, bottlenecks, dependency direction, compatibility scope,
   substitution loss, and unresolved shortage.
3. Bind F80 to one integrated neutral rehearsal, exact assurance migration,
   full book validation, and a Product Owner continue/merge/defer/stop decision.
