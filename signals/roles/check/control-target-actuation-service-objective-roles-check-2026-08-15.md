---
skill: roles-check
topic: control-target-actuation-service-objective
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Control Target, Actuation, and Service Objective Roles Check

Artifact: revised canonical Factor Table and Diagnostic view, reference and
assurance bindings, and existing book task projection. Signals: control loops,
set points, actuation, service measurement, objectives, agreements, and outcomes.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Set point could be interpreted without controlled variable or mode. | P2 | Senses | Bind reference, variable, schedule, and mode. Closed. |
| 2 | Command could collapse into process influence. | P2 | Ladder | Preserve controller, actuator, and process stages. Closed. |
| 3 | SLO status could compose without its SLI contract. | P2 | Factors | Require service, eligibility, measure, target, and window. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Objective, set point, and threshold could collapse. | P2 | Contrasts | Separate result, tracking reference, and decision boundary. Closed. |
| 2 | Controller and actuator could become synonyms. | P2 | Contrasts | Separate command selection from command conversion. Closed. |
| 3 | SLO could become a universal reliability sense. | P2 | Boundary | Keep it a scoped service-performance objective. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Set-point change could be treated as target attainment. | P2 | Diagnostic | Trace observed response under a bounded test. Closed. |
| 2 | Controller acknowledgment could prove actuator success. | P2 | Diagnostic | Require actuator feedback and independent response. Closed. |
| 3 | Green aggregate SLO could hide failed segments. | P2 | Diagnostic | Recompute by journey, segment, and measurement point. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Loop success could imply broader objective success. | P2 | Examples | Compare local target with wider outcomes. Closed. |
| 2 | SLO attainment could imply correctness or satisfaction. | P2 | Constraints | Exclude universal outcome claims. Closed. |
| 3 | SLO miss could be called contractual breach. | P2 | Contrasts | Preserve agreement parties and consequences. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Set point and observation may use mismatched units or clocks. | P2 | Procedure | Require unit, schedule, tolerance, and timestamps. Closed. |
| 2 | SLO could omit numerator or denominator. | P2 | Procedure | Preserve raw eligible and good-event counts. Closed. |
| 3 | Window and timezone changes could alter compliance silently. | P2 | Diagnostic | Replay a frozen event set through versioned contracts. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Target” could hide objective, set point, threshold, or SLO. | P2 | Contrasts | Name each comparison role explicitly. Closed. |
| 2 | Actuator and intervention could collapse. | P2 | Contrasts | Separate mechanism role from contextual action. Closed. |
| 3 | SLO and achieved level could share one percentage label. | P2 | Contrasts | Separate desired target from observation. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | New senses could create isolated anchors. | P2 | Registration | Deepen the existing control authority. Closed. |
| 2 | A second diagnostic could duplicate the existing failure route. | P2 | Views | Revise the current Diagnostic view. Closed. |
| 3 | Book expansion could create a redundant chapter. | P3 | Projection | Forward-apply Task K and Part VI only. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Named controller families could multiply as senses. | P2 | Boundary | Keep role and contract primary. Closed. |
| 2 | Actuator device catalogs could displace reusable structure. | P2 | Boundary | Retain named devices as examples. Closed. |
| 3 | Monitoring products and SLA tiers could become taxonomy branches. | P2 | Boundary | Keep them scoped implementations or commitments. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Control language varies by engineering domain. | P2 | Sources | Use NIST spine and retain domain authority. Closed. |
| 2 | SRE vocabulary could be generalized beyond service operations. | P2 | Sources | Keep the SLO sense service-scoped. Closed. |
| 3 | Agreement interpretation needs governing documents. | P2 | Claim boundary | Exclude contractual advice. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Set-point changes could overwrite prior modes. | P2 | Use contract | Version references, schedules, and authority. Closed. |
| 2 | Aggregated SLO results could replace raw events. | P2 | Use contract | Preserve eligible events and numerator/denominator inputs. Closed. |
| 3 | Tuning tests could erase unsafe or contradictory transients. | P2 | Diagnostic | Retain raw telemetry and safe test bounds. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Set point and controlled value may differ in basis. | P2 | Procedure | Declare variable, unit, scale, and tolerance. Closed. |
| 2 | Actuator range, rate, and delay could disappear. | P2 | Factors | Preserve limits and dynamics. Closed. |
| 3 | SLO percentages could hide ratio versus percentile semantics. | P2 | Procedure | Declare statistic, operator, and measurement point. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Controller output could map exactly to actuator action. | P2 | Ladder | Record interface, conversion, loss, and feedback. Closed. |
| 2 | SLI implementation could be equated with its specification. | P2 | Procedure | Preserve both versions and measurement mapping. Closed. |
| 3 | SLO could map one-to-one to an agreement obligation. | P2 | Contrasts | Keep mapping contextual and authority-owned. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need one visible loop chain. | P2 | Ladder | Show reference, command, influence, and response. Closed. |
| 2 | “Green SLO, unhappy users” needs a usable test route. | P2 | Diagnostic | Add segment and measurement-point recomputation. Closed. |
| 3 | The default book route must expose the distinctions. | P3 | Task K | Extend the existing scenario and rubric. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 36  |  P3 notes: 3
Verdict: APPROVED
```

Top finding: reference, command, physical or logical influence, measurement,
service target, agreement, and outcome must remain separately traceable. All
findings are closed.

## Amendments

1. Deepened the existing control anchor and Diagnostic view instead of adding
   another authority or book route.
2. Added explicit set-point, actuator, and SLO contracts and contrasts.
3. Kept named mechanisms, products, tiers, and agreements outside canonical senses.
