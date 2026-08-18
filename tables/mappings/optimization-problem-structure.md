# Optimization Problem Structure Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Choice, Alternative, Criterion, Preference,
Recommendation, and Selection](../entries/choice-alternative-selection.md)

Canonical senses: `choice`, `alternative`, `decision-criterion`, `trade-off`,
`recommendation`, `selection`

## Governing question

How was an application question translated into an optimization problem, what
does the reported solution establish inside that model, and what remains before
recommendation or authorized selection?

## Problem-structure table

| Role | Required record | Supports | Does not establish |
|---|---|---|---|
| application question | subject, decision owner, affected parties, horizon, desired outcome | exact purpose and handoff target | mathematical solvability or shared preferences |
| model boundary | included/excluded mechanisms, states, actors, resources, assumptions | scope of the formal problem | complete real-world representation |
| decision variable | identity, interpretation, domain, units, controllability, action mapping | modeled degrees of freedom | an available or authorized real action |
| parameter/data | fixed input, estimate, provenance, version, unit, uncertainty | exact problem instance | truth, stationarity, or future validity |
| objective | function, direction, scale, weights, aggregation, criteria mapping | modeled comparison of feasible assignments | stakeholder value, ethics, or preference by default |
| constraint | mathematical form, source, hard/soft status, tolerance, applicability | admitted assignments under the formulation | legal compliance, safety, availability, or obligation satisfaction by default |
| feasible set | variable assignments satisfying declared constraints | model-relative admissibility | acceptability, desirability, robustness, or implementability |
| candidate solution | assignment, objective value, residuals, model/scenario identity | one evaluated modeled result | optimality, recommendation, or selection without further support |
| result status | definition and evidence for feasible, infeasible, unbounded, local/global optimal, approximate, interrupted, or unresolved | bounded interpretation of the run/result | universal success or failure |
| optimality support | theorem/conditions, certificate/bound, gap, tolerance, numerical diagnostics, solver status | exact strength of an optimality claim | correctness of the application model |
| sensitivity | perturbation, parameter range, active constraints, dual/shadow interpretation, invalidation boundary | modeled response to declared variation | real-world resilience or causal importance |
| decision handoff | alternatives/outcomes, evidence, preferences, authority, recommendation, implementation, monitoring | accountable move from model result to action | automatic authorization |

## Directional mapping table

| Source role | Target role | Direction and conditions | Retained loss or mismatch |
|---|---|---|---|
| possible application action | variable assignment | application to model; only when action identity, units, timing, and controllability are represented | omitted operational detail, dependencies, authority, and implementation state |
| desired outcome | objective term | application to model; only under a declared measure, direction, aggregation, and scope | nonmeasurable value, affected-party differences, uncompensated criteria, and external effects |
| criterion or preference | objective/constraint | application to model; compensatory criteria may enter an objective while vetoes/noncompensation may require constraints | preference provenance, legitimacy, ethical limits, and sensitivity to weights |
| requirement, policy, resource, or physical limit | mathematical constraint | application to model; only through an explicit interpretation and applicability rule | authority, exceptions, enforcement, uncertainty, and unmodeled failure modes |
| scenario or assumption | parameter/data instance | application to model; under exact version, units, provenance, and uncertainty | alternative scenarios, distribution shift, and unresolved facts |
| solver output | result claim | computation to evidence; under exact formulation, algorithm/run, tolerances, and diagnostics | model error, data error, numerical limits, and unsupported optimality |
| result claim | recommendation | model to decision; only after wider evidence, alternatives, preferences, constraints, and limitations are restored | disagreement, unmodeled outcomes, authority, implementation, and accountability |
| recommendation | authorized selection | advice to governed decision; only under named authority and rule | adoption, execution, achieved outcome, and later validity |

Mappings are contextual and many-to-many. A criterion may affect several
objective terms and constraints; one constraint may represent several source
limits. Shared labels do not establish identity or reversibility.

## Decisive contrasts

| Pair | Decisive distinction |
|---|---|
| desired outcome vs. objective function | application result sought by affected parties vs. mathematical criterion inside one model |
| real action vs. decision variable | authorized controllable act vs. modeled unknown with a declared domain |
| requirement/policy vs. mathematical constraint | governed statement or obligation vs. admitted-set condition in a formulation |
| feasible vs. acceptable | satisfies modeled constraints vs. passes the wider evidence, preference, ethics, safety, and authority frame |
| optimal solution vs. recommendation | best under exact model/criterion vs. evidence-bounded advice to a decision owner |
| recommendation vs. selection | advice with rationale and limits vs. authorized choice with implementation responsibility |
| solver termination vs. optimality support | computational stop/status vs. evidence for a defined optimality claim |
| local vs. global optimum | best in a neighborhood vs. best over the declared feasible set |
| sensitivity vs. real-world robustness | modeled perturbation response vs. maintained outcome/capability under relevant operating conditions |

## Minimal result and handoff record

```text
optimization-result-handoff
  := application question, owner, affected parties, and horizon
   x model identity, version, boundary, assumptions, and scenario
   x variables, domains, units, interpretation, and action mapping
   x parameters, data, provenance, uncertainty, and validity
   x objective, direction, scale, weights, and criteria mapping
   x constraints, sources, tolerances, hard/soft status, and exceptions
   x feasible-set and candidate-solution identity
   x result status, objective value, residuals, gap, and diagnostics
   x optimality support, algorithm/run, tolerances, and unresolved state
   x sensitivity, perturbations, active limits, and invalidation boundary
   x recommendation, authority, implementation, monitoring, and review trigger
```

## Constraints and failure signs

- Infeasible means no assignment satisfies the declared formulation under the
  stated status evidence; it does not prove the real problem has no solution.
- Unbounded may reveal a missing application limit, but does not identify which
  limit or authorize adding one.
- A feasible solution need not satisfy the objective optimally and need not be
  acceptable outside the model.
- A globally optimal model result may still be based on the wrong boundary,
  data, variables, objective, constraints, or scenario.
- Soft-constraint penalties are objective terms under a chosen scale; they are
  not silent permission to violate an obligation or safety boundary.
- Dual values and shadow prices retain mathematical assumptions, units,
  perturbation direction, and local/global scope; they are not context-free
  prices or causal effects.
- Solver names, iteration counts, or status strings do not replace independent
  interpretation of optimality support and diagnostics.
- Multiple objectives require an explicit aggregation, ordering, frontier, or
  unresolved trade-off contract; “optimized all objectives” is invalid.
- Recommendation and final selection retain evidence, preference, authority,
  implementation, and reconsideration records outside the solver result.

## Enumeration stop

Linear, quadratic, convex, integer, stochastic, robust, dynamic,
multiobjective, and other optimization families are examples, not canonical
rows. Simplex, interior-point, branch-and-bound, gradient, evolutionary, and
other methods remain external or example-local. This Table owns the reusable
problem/result/handoff roles, not an optimization taxonomy.

## Compact example

A scheduling model assigns work slots to people, minimizes a declared weighted
delay measure, and enforces modeled availability and capacity constraints. A
solver reports a feasible assignment with a bounded optimality gap. The result
supports a model-relative schedule candidate; it does not prove the availability
data are current, the weights are fair, the schedule is acceptable to affected
people, or the manager has authorized it.

## Sources and provenance

- Stephen Boyd and Lieven Vandenberghe, *Convex Optimization*, official source
  site: <https://stanford.edu/~boyd/cvxbook/>.
- Stanford Engineering Everywhere EE364A, Lecture 5, feasibility and
  local/global optimality: <https://see.stanford.edu/Course/EE364A/78>.
- Stanford Engineering Everywhere EE364A, Lecture 9, optimality conditions,
  duality, reformulation, and sensitivity:
  <https://see.stanford.edu/Course/EE364A/83>.
- IBM CPLEX Optimization Studio glossary, feasible/optimal/solution terms:
  <https://www.ibm.com/docs/en/icos/22.1.2?topic=appendixes-glossary>.
- IBM CPLEX Optimization Studio, decision variables and domains:
  <https://www.ibm.com/docs/en/icos/22.1.2?topic=model-decision-variables>.

The Stanford sources establish the mathematical distinctions. IBM supplies a
concrete implementation vocabulary and does not define the universal Table.
