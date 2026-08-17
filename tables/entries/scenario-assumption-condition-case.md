# Assumption, Condition, Scenario, Case, and Feasibility

Status: candidate anchor entry

## Orientation

An assumption is a proposition provisionally accepted for a declared purpose.
A condition is a circumstance, state, or rule whose presence, value, or change
matters to another claim or result. A scenario is a coherent, versioned set of
conditions and developments used to explore a question. A case is one exact
subject or configured instance to which evidence or rules are applied.

A counterfactual describes what would obtain under a contrary or alternative
condition; stronger causal interpretation requires additional identification
assumptions. Feasibility means that an option can satisfy declared
requirements under a particular frame. It is not desirability, selection,
success, or proof that the scenario will occur.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `assumption` | Which proposition is provisionally accepted for this purpose, why, by whom, and with what sensitivity? | declared provisional premise |
| `condition` | Which circumstance, state, value, rule, or event qualifies another claim, action, or result? | conditional qualifier |
| `scenario` | Which coherent set of conditions, developments, and uncertainties frames exploration of a question? | configured possibility frame |
| `case` | Which exact subject, instance, configuration, or record is being evaluated? | case-specific evaluation subject |
| `counterfactual` | What alternative condition or course is posited contrary to, or instead of, the selected factual/reference frame? | contrary-condition comparison |
| `benchmark-comparison` | Which external, historical, normative, or constructed reference supports a bounded comparison? | reference comparison role |
| `control-comparison` | Which comparison condition is intended to isolate or contextualize a change, under what assignment or matching basis? | controlled comparison role |
| `eligibility` | Does the subject belong to the population or set governed by this rule or process? | membership gate |
| `admissibility` | Is the subject or evidence permitted under the declared governing rules? | rule-acceptance gate |
| `feasibility` | Can the option satisfy declared requirements under the selected scenario, resources, dependencies, and evidence? | conditional possibility status |
| `sufficiency` | Is the available set enough for one stated purpose under declared criteria? | purpose-bounded adequacy claim |

## Scenario-to-feasibility chain

```text
question and exact case
  + assumptions and evidence status
  + scenario conditions, developments, and dependencies
  + alternative, benchmark, control, or counterfactual comparison
  + applicable requirements and admissibility rules
  + resources, capacity, demand, allocation, and timing
  + compatibility, blockers, substitutions, and unresolved shortfall
  -> conditional feasibility result
  -> limitations, sensitivity, disposition, and revisit triggers
```

## Root factorization

```text
scenario-feasibility-use
  := reader question, purpose, and decision horizon
   x exact case, subject, alternative, and version
   x source state, factual or reference frame, and comparison role
   x assumptions, conditions, events, developments, and dependencies
   x scenario inclusion rule, coherence, coverage, and invalid combinations
   x evidence status, source, confidence, uncertainty, and applicability
   x benchmark, control, counterfactual, matching, and adjustment basis
   x requirements, eligibility, admissibility, and sufficiency criteria
   x resource, capacity, demand, allocation, and time conditions
   x compatibility, prerequisite, blocker, enabler, and substitution conditions
   x feasible, infeasible, conditional, unresolved, or out-of-scope result
   x sensitivity, alternate scenarios, residuals, and stop reason
   x authority, provenance, review, revision, and invalidation
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Assumption vs. condition | both can qualify a result | provisionally accepted proposition vs. circumstance/state/rule that may be observed, imposed, or varied |
| Condition vs. scenario | scenarios contain conditions | one qualifier vs. a coherent configured set and development path |
| Scenario vs. forecast | both concern possibilities | exploratory frame vs. claim about future occurrence or distribution |
| Scenario vs. case | both can be configured | possibility frame applied across subjects vs. exact subject/instance under evaluation |
| Alternative vs. scenario | both affect outcomes | selectable course vs. condition set under which a course is evaluated |
| Counterfactual vs. alternative | both posit another possibility | contrary/alternative condition relative to a reference world vs. selectable course in a choice set |
| Benchmark vs. control | both support comparison | bounded reference for performance/context vs. comparison condition with a design intended to isolate/contextualize change |
| Eligibility vs. admissibility | both can gate entry | membership in governed population/set vs. permission under a rule |
| Admissibility vs. feasibility | both can exclude | allowed under governing rules vs. practically capable of satisfying requirements under conditions |
| Feasibility vs. sufficiency | both concern adequacy | possibility of an option vs. enough resources/evidence/content for one purpose |
| Feasibility vs. desirability | both inform decisions | can work under conditions vs. should be preferred |

## Scenario record

```text
scenario-record
  := identity, title, purpose, owner, and version
   x exact case/population and boundary
   x source state and factual/reference frame
   x assumptions with evidence status and sensitivity
   x conditions with domains, dependence, and invalid combinations
   x developments, order, time, horizon, and branching
   x resource and dependency correspondence
   x evidence, uncertainty, applicability, and unresolved frontier
   x comparison mappings, losses, and prohibited claims
   x revision triggers and superseded history
```

## Selection procedure

1. State the reader question, exact case or population, purpose, decision
   horizon, authority, and version.
2. Separate source facts, observations, assertions, assumptions, estimates,
   simulations, and unresolved propositions.
3. Define each condition's domain, source, time, dependence, interaction, and
   invalid combinations before bundling scenarios.
4. Give every scenario an inclusion rule, boundary, development path,
   uncertainty, coverage status, and coherent resource/dependency frame.
5. Name the exact role of every comparison: alternative, historical/external
   benchmark, control condition, or counterfactual.
6. Apply eligibility and admissibility rules before feasibility; preserve
   excluded and unresolved cases.
7. Test requirements against resource capacity, demand/load, allocation,
   timing, dependencies, compatibility, and substitution limits.
8. State whether the result is feasible, infeasible, conditional, unresolved,
   or out of scope under this exact frame.
9. Test alternate assumptions, scenarios, demand, capacity, blockers,
   substitutions, and evidence gaps.
10. Preserve limitations, decision/action separation, review triggers,
    superseded versions, and unresolved shortfall.

## Constraints and failure signs

- Assumptions never become observations because they were useful.
- A scenario is not a prediction or probability distribution unless separately
  specified and supported.
- A hypothetical counterfactual does not establish an identified causal effect.
- Benchmarks and controls retain population, time, method, assignment/matching,
  and adjustment differences.
- Feasibility is relative to requirements, conditions, resources, dependencies,
  compatibility, evidence, and authority.
- Passing feasibility does not establish value, recommendation, selection,
  authorization, implementation, or outcome.
- Sufficiency for one purpose is not completeness for every purpose.
- Named scenario methods, families, domains, and standards remain examples or
  bounded external authorities.

## Specialized views

- [Scenario Comparison Mapping](../mappings/scenario-comparison.md)
- [Scenario Applicability Evidence Table](../evidence/scenario-applicability.md)
- [Trade-off, Dominance, and Conflict Decision Table](../decisions/tradeoff-dominance-conflict.md)
- [Eligibility, Admissibility, Feasibility, and Sufficiency Constraint Table](../constraints/feasibility-sufficiency.md)

## Cross-references

- [Choice, Alternative, and Selection](choice-alternative-selection.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Evaluation Measure, Scale, Criterion, and Score](evaluation-measure-scale-criterion.md)
- [Claim and Evidence](claim-evidence.md)
- [Model, Representation, and Simulation](model-representation-simulation.md)
- [Operational Resource, Capacity, Demand, and Allocation](operational-resource-capacity-demand.md)

## Sources and provenance

1. [F51-F100 campaign research](../../docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md)
2. NASA Systems Engineering Handbook, decision analysis, technical planning,
   and assessment: https://www.nasa.gov/reference/systems-engineering-handbook/
3. GAO, *Schedule Assessment Guide*, dependencies, resources, critical path,
   and risk: https://www.gao.gov/products/gao-16-89g
4. Existing Factorium causal, choice, model, risk, evidence, and evaluation
   owner research.

Comparator access date: 2026-08-16. Source terms retain their native scope.
The cross-domain organization remains `candidate` Factorium synthesis, not a
universal scenario or feasibility calculus.
