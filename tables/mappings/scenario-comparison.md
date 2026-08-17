# Scenario Comparison Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Assumption, Condition, Scenario, Case, and Feasibility](../entries/scenario-assumption-condition-case.md)

Canonical senses: `scenario`, `counterfactual`, `benchmark-comparison`,
`control-comparison`, `case`

## Governing question

Which facts, conditions, subjects, and rules correspond across alternative,
benchmark, control, and counterfactual frames, and what prevents a direct
comparison?

## Comparison mapping

| Comparison role | Required record | Supports | Does not automatically support |
|---|---|---|---|
| alternative scenario | changed conditions/developments and held correspondences | structured contrast among possible frames | occurrence probability or selection |
| historical benchmark | prior subject/population, time, method, context, version | bounded change or contextual comparison | causal effect or current attainability |
| external benchmark | external subject/population, selection, method, conditions | contextual or performance contrast | fairness, equivalence, or best practice |
| normative benchmark | authority, rule/target, applicability, effective time | comparison to a declared norm | empirical typicality or desirability |
| control comparison | assignment/matching, concurrent conditions, intervention/exposure, outcomes | designed contextualization or isolation under assumptions | causal identification without design assumptions |
| counterfactual | factual/reference frame, contrary condition, model/assumptions, target result | hypothetical contrast | observed alternative world |

## Frame correspondence

```text
comparison-mapping
  := source and target subjects/populations
   x case identity and eligibility
   x time, context, conditions, method, and version
   x measure/outcome, scale, direction, and uncertainty
   x assignment, matching, adjustment, or translation rule
   x held conditions, changed conditions, dependencies, and interactions
   x retained distinctions, exclusions, unmapped cases, and loss
   x claim type, authority, applicability, and prohibited inference
```

## Constraints

- Comparison roles remain explicit even when one reference plays several roles.
- Unlike populations, times, methods, conditions, or measures require a
  declared adjustment or remain incomparable.
- Matching or normalization does not establish exchangeability.
- A counterfactual is not observed evidence.
- A benchmark is not automatically a target, control, norm, optimum, or causal
  reference.

## Sources and provenance

See the canonical entry and existing Choice, Causal Reasoning, Sampling, and
Evaluation owners. This mapping records correspondence and loss; it does not
certify comparison validity.
