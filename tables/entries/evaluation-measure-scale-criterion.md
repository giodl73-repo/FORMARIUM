# Evaluation Measure, Scale, Criterion, and Score

Status: candidate anchor entry

## Orientation

An evaluation relates evidence about a declared subject to a purpose and a
rule. A measure states what is quantified and how. A metric is a defined
measure or calculation used for comparison or monitoring in a bounded domain.
An indicator selects a measure or signal as a proxy for a condition of
interest. An index combines or transforms components under a declared rule. A
score is a reported evaluation result; its number does not carry its meaning
without the source measure, scale, direction, comparison, and rule.

These are evaluation roles, not universal renamings. Domain authorities may
use the words differently. The exact local definition governs.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `evaluation-frame` | What subject is being evaluated, for whom, for what use, over which population, context, and time? | evaluation scope contract |
| `baseline` | Which declared state, value, distribution, or case supplies the starting comparison? | starting comparison basis |
| `comparator` | Which alternative, reference, control, benchmark, or prior result is compared with the subject? | comparison counterpart |
| `target` | Which desired value, range, state, or trajectory is sought under the declared objective? | desired comparison reference |
| `tolerance` | Which deviation from a reference is treated as acceptable for the declared use? | acceptable-deviation contract |
| `measure` | What property or result is quantified or assessed, by which method, unit or scale, and uncertainty? | defined assessment quantity |
| `metric` | Which defined measure or calculation is used to monitor or compare performance for a bounded purpose? | purpose-bound comparison measure |
| `indicator` | Which measure or signal is selected to stand for a condition or objective, and with what proxy limitations? | selected observable proxy |
| `index` | Which components are transformed and combined into a derived comparative result? | composite derived measure |
| `score` | Which reported value or category results from applying an evaluation rule? | displayed evaluation result |
| `evaluation-scale` | Which values or categories are admissible, ordered, spaced, and transformable, and which comparisons are meaningful? | interpretation domain |
| `criterion` | Which feature or rule is relevant when judging an alternative, claim, result, or case? | declared judgment basis |
| `evaluation-result` | What value, interval, category, rank, disposition, or unresolved status did the rule produce? | scoped evaluation output |

## Interpretation chain

```text
subject and intended use
  -- bounded by --> evaluation frame
observations or assertions
  -- operationalized by --> measure or indicator
measure values
  -- interpreted on --> scale with direction and uncertainty
baseline, comparator, target, or tolerance
  -- supplies --> comparison basis
criteria, preferences, constraints, and weights
  -- governed by --> evaluation rule
normalization and combination
  -- may derive --> index or score
threshold or classification rule
  -- may produce --> status or disposition
credible variation
  -- tests --> sensitivity, stability, robustness, and fragility
```

## Root factorization

```text
evaluation-use
  := reader question, decision, and intended use
   x subject, alternative, claim, or system boundary
   x eligible population, cases, exclusions, and missingness
   x context, operating conditions, time, horizon, and version
   x baseline, comparator, reference, target, and tolerance
   x property, measure definition, method, unit or scale, and direction
   x observation, source data, statistic, numerator, and denominator
   x indicator purpose, proxy assumptions, and limitations
   x criteria, constraints, preferences, priorities, and authorities
   x normalization, weighting, aggregation, interaction, and residual
   x threshold, gate, veto, boundary behavior, and acceptance region
   x uncertainty, support, sensitivity domain, and alternate assumptions
   x result, rank, class, disposition, explanation, and limitations
   x provenance, applicability, review, revision, and invalidation
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Measure vs. metric | both can yield quantities or categories | defined assessment of a property vs. a measure/calculation selected for bounded comparison or monitoring |
| Measure vs. indicator | both can use observations | what is assessed vs. what is selected as a proxy for another condition or objective |
| Metric vs. indicator | both can summarize performance | defined comparison calculation vs. selected evidential/proxy role |
| Index vs. score | both can be derived displays | declared composite measure vs. any reported evaluation result, composite or not |
| Score vs. observation | both may be stored as numbers | rule-derived result vs. source encounter or measurement |
| Baseline vs. comparator | both support comparison | starting state/reference case vs. the counterpart used in a particular comparison |
| Reference vs. target | both may be numeric | basis for interpretation or comparison vs. desired result |
| Target vs. tolerance | both can bound acceptable behavior | desired value/range vs. allowed deviation under a use |
| Criterion vs. measure | both inform judgment | relevance/judgment basis vs. operational assessment |
| Criterion vs. threshold | both affect a result | what matters vs. the boundary at which classification or action changes |
| Scale vs. rank | both impose order in some uses | admissible values and comparisons vs. relative ordering with lost distance information |
| Evaluation vs. decision | evaluation may support a decision | rule-bound assessment vs. authoritative selection or action |

## Compact evaluation record

```text
evaluation-record
  := frame(subject, purpose, population, context, time, version)
   x comparison(baseline, comparator, target, tolerance)
   x measure(property, method, statistic, unit-or-scale, direction)
   x evidence(source, missingness, support, uncertainty, status)
   x judgment(criteria, constraints, preferences, authority)
   x derivation(transformations, weights, interactions, aggregation, loss)
   x boundary(thresholds, gates, vetoes, ties, indeterminate behavior)
   x result(value-or-category, disposition, explanation, limitations)
   x sensitivity(variation domain, alternate assumptions, stability)
   x provenance(rule, implementation, reviewer, revision, invalidation)
```

## Selection procedure

1. State the reader question, subject, intended use, eligible population,
   context, time, horizon, and exact version.
2. Identify the source observations, assertions, or simulations and their
   epistemic status before naming a measure or score.
3. Define the measured or assessed property, method, statistic or
   numerator/denominator, unit or scale, direction, missingness, and
   uncertainty.
4. State whether the result serves as a direct measure, domain metric, proxy
   indicator, composite index, or displayed score; retain the local definition.
5. Declare the baseline, comparator, reference, target, and tolerance roles
   separately; omit unused roles rather than silently merging them.
6. Record criteria, hard constraints, preferences, priorities, weights, and
   authorities without treating them as one numeric importance field.
7. Preserve every normalization, transformation, interaction, aggregation,
   noncompensation rule, veto, threshold, and information loss.
8. Report component values beside any index or score; keep incomparable cost,
   quality, time, risk, and burden dimensions separate unless a common basis is
   justified.
9. Test credible changes to inputs, ranges, assumptions, missing-data rules,
   weights, thresholds, and comparators.
10. Bind the result to source, rule, implementation, reviewer, date, version,
    applicability, limitations, disposition, and invalidation conditions.

## Constraints and failure signs

- A score never defines its own subject, direction, scale, or quality.
- Separate component columns do not establish independence or comparability.
- A weight is not automatically causal contribution, evidence strength,
  probability, organizational importance, or moral value.
- Normalization does not create commensurability.
- Ranking loses distance and may hide ties or incomparable cases.
- A threshold crossing does not by itself prove validity, safety, quality,
  effectiveness, or success.
- Passing one rule does not close missing data, uncertainty, applicability, or
  authority questions.
- Robustness is always relative to a declared result, variation set, and
  acceptability condition.
- Named metrics, scales, ratings, indexes, methods, and standards remain
  bounded examples or external authorities.

## Specialized views

- [Evaluation Comparison Frame Mapping](../mappings/evaluation-comparison-frame.md)
- [Evaluation Scale and Ranking Mapping](../mappings/evaluation-scale-ranking.md)
- [Criterion, Preference, and Priority Decision Table](../decisions/criterion-preference-priority.md)
- [Evaluation Threshold and Acceptance Constraint Table](../constraints/evaluation-threshold-acceptance.md)
- [Evaluation Aggregation Procedure](../procedures/evaluation-aggregation.md)
- [Evaluation Sensitivity Diagnostic](../diagnostics/evaluation-sensitivity.md)
- [Evaluation Applicability Evidence Table](../evidence/evaluation-applicability.md)
- [Evaluation Review and Disposition Procedure](../procedures/evaluation-review-disposition.md)

## Cross-references

- [Measurement Quality](measurement-quality.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Choice, Alternative, and Selection](choice-alternative-selection.md)
- [Statistical Summary and Interval](statistical-summary-interval.md)
- [Decomposition Modes and Combination Contracts](decomposition-modes-combination-contracts.md)
- [Claim and Evidence](claim-evidence.md)

## Sources and provenance

1. [F51-F100 campaign research](../../docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md)
2. JCGM, International Vocabulary of Metrology, quantities, measurement, and
   measurement results: https://jcgm.bipm.org/vim/en/index.html
3. NIST/SEMATECH Engineering Statistics Handbook, process modeling and
   performance measurement: https://www.itl.nist.gov/div898/handbook/
4. W3C PROV-O, entities, activities, agents, and derivations:
   https://www.w3.org/TR/prov-o/

Comparator access date: 2026-08-16. Formal source definitions retain their
scope. The cross-domain evaluation grammar remains `candidate` Factorium
synthesis, not a universal scoring or decision algebra.
