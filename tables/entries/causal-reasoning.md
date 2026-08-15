# Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution

Status: candidate anchor entry

## Orientation

Association describes observed dependence; a causal effect compares outcomes
under specified alternatives; influence is a broader contextual contribution
claim; a causal mechanism describes how change is produced; an intervention is
an action or assignment; attribution asks what caused one realized outcome.
These senses often appear in one explanation, but they require different
evidence. Temporal order, prediction, a diagram, a randomized label, or a
successful action does not by itself settle every causal question.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `association` | How do observed variables or events vary together in the selected data and population? | observed dependence |
| `causal-effect` | How would the outcome differ under specified alternatives for selected units, population, and horizon? | counterfactual or interventional contrast |
| `influence` | How might a source contribute to, shape, or change a target through a context and channel? | scoped contribution claim |
| `causal-mechanism` | Through which entities, activities, states, and pathways is change produced? | change-producing process or pathway |
| `intervention` | What deliberate assignment or action changes the subject, process, or environment? | applied causal input |
| `causal-attribution` | Did a candidate cause contribute to this particular realized outcome under the governing attribution model? | actual-case causal assignment |

## Question ladder

```text
observed variables or events
  -- summarized as --> association

specified alternative exposures or actions
  + outcome + units/population + horizon + assumptions
  -- contrasted as --> causal effect

source + channel/path + receptive context
  -- may support --> influence claim

entities + activities + states + pathway
  -- proposed and tested as --> causal mechanism

deliberate assignment or action
  -- applied as --> intervention

realized case + candidate cause + counterfactual contingencies
  + domain attribution rule
  -- assessed as --> causal attribution
```

## Root factorization

```text
causal-reasoning-use
  := exact claim and claim type
   x subject or population and unit
   x exposure, action, or candidate cause
   x alternative or counterfactual contrast
   x outcome, measure, and time horizon
   x temporal order and causal boundary
   x causal model, variables, paths, and interference
   x design, assignment, comparison, and data provenance
   x identification assumptions and estimand
   x estimator, uncertainty, sensitivity, and diagnostics
   x mechanism evidence and competing explanations
   x transport scope, heterogeneity, and applicability
   x actual-case facts, attribution rule, and responsibility boundary
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Association description | variables x population x sampling x dependence measure x uncertainty | observed joint distribution | describing patterns without causal interpretation | causal verbs attached to coefficients or predictive importance |
| Potential-outcome contrast | units x treatment versions x alternatives x outcomes x assignment x horizon | counterfactual contrast | estimating an average or conditional effect | an ill-defined treatment or missing relevant alternative |
| Structural causal model | endogenous/exogenous variables x functions x graph x intervention x disturbance | model intervention | representing pathways, confounding, and intervention queries | arrows being mistaken for evidence rather than assumptions |
| Mechanistic account | entities x activities x organization x initiation x propagation x termination | change-producing pathway | explaining how an effect could occur | naming a mediator without pathway evidence |
| Influence trace | source x channel x target x receptive context x direction x contribution evidence | source-target relation | the claim is contextual or qualitative | treating salience, authority, or sequence as quantified effect |
| Actual-case attribution | case facts x candidate causes x contingencies x necessity/sufficiency test x attribution rule | realized outcome | incident, legal, historical, or fault analysis | importing population averages as automatic individual proof |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Association vs. causal effect | both compare patterned outcomes | observed dependence vs. outcome contrast under specified alternatives |
| Prediction vs. causal effect | both may use the same variables and model | forecast under observed regime vs. change expected under an intervention |
| Influence vs. causal effect | both concern contribution to change | broader contextual contribution vs. identified contrast with estimand and assumptions |
| Cause vs. mechanism | mechanism may explain a causal relation | that a change occurs vs. how it is produced |
| Mediator vs. mechanism | mediator may lie on a pathway | modeled intermediate variable vs. supported change-producing account |
| Intervention vs. effect | interventions are used to learn or produce effects | action or assignment vs. comparative outcome |
| Total vs. direct effect | both compare alternatives | all modeled pathways vs. a contrast excluding selected pathways under assumptions |
| Population effect vs. attribution | both bear on causation | distribution across units vs. cause of one realized case |
| Causal attribution vs. responsibility | attribution may inform responsibility | actual-cause assessment vs. normative or legal assignment of answerability |

## Diagnostic examples

- Ice-cream sales and sunburn can be associated because both vary with weather;
  the association alone does not identify either as the cause of the other.
- A feature can improve prediction while changing it would have no useful
  effect under the intended intervention.
- Random assignment supports an exposure-outcome comparison, but a poorly
  specified treatment, noncompliance, interference, attrition, or measurement
  failure can still change the claim.
- A treatment can have an average benefit while harming some units; the target
  population and heterogeneity remain part of the result.
- A measured intermediate variable can statistically mediate an association
  without establishing the proposed mechanism.
- A deployment may precede an incident and still be only one candidate cause;
  shared dependencies, workload, configuration, and missing evidence remain
  competing explanations.
- Showing that a policy lowers average risk does not by itself prove the policy
  prevented one person's outcome.

## Selection procedure

1. State the exact claim and select association, effect, influence, mechanism,
   intervention, or attribution before choosing a method.
2. Define subject or population, unit, exposure/action, treatment versions,
   alternative, outcome, measure, and horizon.
3. State the causal boundary, temporal order, possible interference, and
   relevant pathways or common causes.
4. Draw or describe the causal model as an assumption-bearing proposal; record
   omitted variables and credible competing models.
5. Name the design, assignment/comparison process, inclusion, missingness,
   measurement, and provenance.
6. State the estimand separately from the estimator and observed estimate.
7. Declare identification assumptions such as consistency, exchangeability,
   positivity, no relevant interference, and correct measurement where used.
8. Preserve uncertainty, nulls, contradictory evidence, sensitivity analyses,
   diagnostics, and alternative explanations.
9. For mechanisms, test pathway entities, activities, ordering, perturbations,
   and alternative routes rather than relying on a mediator label.
10. For attribution, add realized case facts, candidate causes, contingencies,
    domain rule, evidentiary threshold, and responsibility boundary.
11. Limit transport to populations, settings, versions, and times supported by
    evidence; separate intended outcomes from side effects.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines cause, association, influence, mechanism, intervention, and attribution | Separates six governing questions and evidence contracts |
| Thesaurus | Links cause, correlate, affect, explain, produce, and blame | Prevents related causal language from becoming interchangeable |
| Causal-inference text | Defines formal effects, estimands, assumptions, designs, and estimators | Connects formal effect questions to mechanism and attribution without replacing the text |
| Domain investigation standard | Owns field-specific causal and responsibility criteria | Keeps domain authority and attribution rules explicit |
| Factorium | Connects claims, evidence, systems, control, risk, and incidents | Supplies a compact selection spine and linked evidence audit |

## Constraints and failure signs

- Causal claims name exposure or candidate cause, alternative, outcome, unit or
  population, and horizon.
- Association, prediction, and temporal precedence are not relabeled effects.
- A causal model exposes assumptions and boundaries; it is not self-validating.
- Estimand, estimator, estimate, uncertainty, and interpretation remain separate.
- Randomization is described as implemented, not inferred from a study label.
- Mechanism evidence names pathway entities, activities, ordering, and tests.
- Interventions remain actions; their effects require comparison.
- Influence claims state source, channel, target, context, direction, and basis.
- Average effects do not erase heterogeneity or decide individual attribution.
- Attribution does not automatically establish blame, duty, liability, or
  organizational accountability.
- Transport, interference, side effects, missingness, and competing
  explanations remain visible.

## Specialized view

The [Causal Claim Evidence Table](../evidence/causal-claim-evidence.md) audits
the target question, design, assumptions, results, mechanism evidence,
alternatives, and claim limits without computing a causal estimate.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- [Coordinated Work](coordinated-work.md)
- [Organization, Role, Responsibility, Authority, and Accountability](organization-role-authority.md)

## Sources and provenance

1. [Causal reasoning research note](../../docs/research/2026-08-15-causal-reasoning.md)
2. Hernán and Robins, *Causal Inference: What If*:
   https://www.hsph.harvard.edu/miguel-hernan/wp-content/uploads/sites/1268/2024/04/hernanrobins_WhatIf_26apr24.pdf
3. Rubin, “Estimating Causal Effects of Treatments in Randomized and
   Nonrandomized Studies”: https://files.eric.ed.gov/fulltext/ED069724.pdf
4. Pearl, “An Introduction to Causal Inference”:
   https://escholarship.org/uc/item/5wk4j60p
5. Halpern and Pearl, “Causes and Explanations”:
   https://doi.org/10.1093/bjps/axi147

Comparator access date: 2026-08-15. Formal sources retain their native
assumptions and domains; the six-sense Factorium organization remains
`candidate`.
