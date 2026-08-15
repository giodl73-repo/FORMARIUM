# Causal Claim Evidence Table

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Association and Causal Reasoning](../entries/causal-reasoning.md)

Canonical senses: `association`, `causal-effect`, `influence`,
`causal-mechanism`, `intervention`, `causal-attribution`

## Governing question

What evidence supports, contradicts, or limits an association, effect,
influence, mechanism, intervention-effect, or actual-case attribution claim?

## Claim-type contract

| Claim type | Required target | Evidence that may bear | Does not establish by itself |
|---|---|---|---|
| Association | variables/events, population, data-generating and sampling scope, dependence measure | observations, sampling record, measurement quality, model diagnostics, replication | direction, intervention effect, mechanism, or attribution |
| Causal effect | units/population, exposure versions, alternative, outcome, horizon, estimand | assignment/comparison design, identification argument, estimates, uncertainty, sensitivity, negative controls | mechanism, transport, or cause of one case |
| Influence | source, channel, target, context, direction, claimed contribution | process trace, perturbation, comparative cases, receiver evidence, alternatives | sole cause or stable quantitative effect |
| Causal mechanism | initiating cause, pathway entities/activities/states, ordering, outcome | direct observation, perturbation of pathway, mediation under assumptions, convergent domain evidence | complete total effect or absence of alternate pathways |
| Intervention effect | action/assignment, implementation, comparator, target outcome and side effects | fidelity, exposure receipt, comparison outcomes, harms, interference and context | effect of merely intending or naming the intervention |
| Causal attribution | realized case, candidate causes, contingencies, actual-cause rule, evidence threshold | case timeline, state/effect trace, counterfactual analysis, population evidence, alternatives | responsibility, blame, liability, or policy decision automatically |

## Evidence row contract

| Field | Required content |
|---|---|
| Claim identity | exact proposition, claim type, version, author, and decision use |
| Target question | unit/population, cause or exposure, alternatives, outcome, horizon, and scope |
| Causal model | variables/entities, arrows or pathways, boundary, interference, competing models, and version |
| Design | assignment, comparison, sampling, inclusion, follow-up, missingness, measurement, and controls |
| Identification | estimand and explicit assumptions needed to connect design/data to the causal target |
| Estimation | estimator/model, parameters, estimate, uncertainty, diagnostics, and sensitivity |
| Mechanism evidence | pathway observations, perturbations, intermediate states, timing, and alternate paths |
| Contradiction and alternatives | nulls, negative evidence, rival causes, bias, confounding, reverse direction, and selection |
| Transport | supported populations, settings, versions, times, heterogeneity, and exclusions |
| Attribution addendum | case facts, candidate cause, contingencies, governing rule, threshold, and responsibility separation |
| Disposition | supports, contradicts, qualifies, no bearing, or untested, with rationale |
| Provenance and review | sources, activities, agents, code/data identity, reviewer, revision, and supersession |

## Worked audit

| Statement | Correct disposition | Missing before stronger claim |
|---|---|---|
| “X and Y move together.” | association result | direction, alternatives, design, and causal assumptions |
| “X predicts Y in held-out data.” | predictive result | intervention target and identification argument |
| “Randomized group difference favors X.” | candidate effect evidence | protocol execution, treatment versions, attrition, uncertainty, interference, target scope |
| “M statistically mediates X and Y.” | candidate pathway evidence | mediator-outcome identification, timing, perturbation, and alternate mechanisms |
| “The action was followed by recovery.” | temporal/process evidence | comparator, concurrent changes, measurement, and competing explanations |
| “X caused this incident.” | attribution claim | case model, contingencies, alternate causes, evidence rule, and separation from responsibility |

## Review procedure

1. Freeze the exact claim and classify its causal question.
2. Audit whether its target contrast and scope are well defined.
3. Trace observations, measurements, results, and inferences through the general
   Observation-to-Inference Evidence view.
4. Record the causal model and identification assumptions as reviewable inputs.
5. Compare the design actually executed with the design named in the report.
6. Separate identification from estimation and mechanism from effect.
7. Retain contradictory, null, negative-control, sensitivity, and alternate-
   explanation evidence.
8. Limit transport and actual-case attribution to separately supported claims.
9. Record a disposition and the smallest evidence needed to change it.

## Failure signs

- a regression coefficient, feature importance, or temporal sequence is called
  a causal effect without a target contrast;
- a diagram is treated as evidence for its own arrows;
- the study label replaces assignment, adherence, attrition, or interference
  evidence;
- the estimate is reported without estimand, uncertainty, or sensitivity;
- a mediator name substitutes for mechanism evidence;
- nulls and competing explanations disappear;
- average effects automatically determine the cause of one case;
- causal attribution automatically assigns responsibility or liability;
- transport beyond population, setting, version, or horizon is unstated.

## Sources and provenance

1. [Causal reasoning research note](../../docs/research/2026-08-15-causal-reasoning.md)
2. Hernán and Robins, *Causal Inference: What If*:
   https://www.hsph.harvard.edu/miguel-hernan/wp-content/uploads/sites/1268/2024/04/hernanrobins_WhatIf_26apr24.pdf
3. AGReMA reporting guideline: https://pmc.ncbi.nlm.nih.gov/articles/PMC8974292/
4. Pearl, “Causes of Effects and Effects of Causes”:
   https://doi.org/10.1177/0049124114562614

This view audits evidence organization; it does not identify or estimate causal
effects and does not replace domain-specific methods or review.
