# MCC-01 Curriculum View Design Specification

Status: candidate design; no canonical content admitted

## 1. Intent

Design the smallest two no-new-anchor views earned by the frozen MUNDUS/FONTES
curriculum closure baseline:

1. an Optimization Problem Structure Mapping Table; and
2. a Prototype, Test, and Iteration Procedure Table.

The designs reuse existing V1 owners. They do not import course taxonomies,
named methods, tools, or a general curriculum ontology.

## 2. Evidence boundary

The design consumes the exact baseline at
`fixtures/coverage/mundus-curriculum-dispositions-01.json` and the established-
source review at
`signals/discover/websearch/mundus-curriculum-view-research-2026-08-18.md`.
Course subjects and headings establish recurring pressure; the source review
establishes the proposed distinctions. Neither establishes reader value,
curriculum consensus, or automatic admission.

## 3. Existing-owner audit

| Need | Existing owner | Already owned | Small missing view | Decision |
|---|---|---|---|---|
| mathematical optimization structure and decision handoff | `choice-alternative-selection` | question, alternatives, feasibility, criteria, preferences, decision rules, sensitivity, recommendation, selection | mapping from application question through variables/domains, objective, constraints, solution status, optimality evidence, and back to an authorized choice | design one Mapping Table; no optimization anchor |
| prototype-led learning and revision | `requirement-specification-verification-validation` | need, requirement, specification, verification, validation, nonconformity, intended-use evidence | procedure connecting learning question, prototype fidelity, users/tasks/context, evaluation, findings, revision, and stop rule | design one Procedure Table; no prototype/usability anchor |

## 4. Design A — Optimization Problem Structure Mapping

### 4.1 Candidate identity

- Proposed path: `tables/mappings/optimization-problem-structure.md`
- Proposed view ID: `mapping-optimization-problem-structure`
- Owner: `choice-alternative-selection`
- Existing senses: `choice`, `alternative`, `decision-criterion`, `trade-off`,
  `recommendation`, and `selection`
- Adds no canonical sense or relation

### 4.2 Governing question

How was an application question translated into an optimization problem, what
exactly does the reported solution establish inside that model, and what work
remains before recommendation or authorized selection?

### 4.3 Row contract

| Field | Required distinction |
|---|---|
| Application question | subject, decision owner, affected parties, horizon, and desired outcome |
| Model boundary | included/excluded mechanisms, states, actors, resources, and assumptions |
| Decision variables | identity, interpretation, domain, units, controllability, and mapping to possible action |
| Parameters and data | fixed inputs, estimates, provenance, version, units, and uncertainty |
| Objective | function, direction, scale, weights, aggregation, and relation to real-world criteria/preferences |
| Constraints | mathematical form, source, hard/soft status, tolerance, and relation to policy, feasibility, safety, or resource limits |
| Feasible set | assignments satisfying the declared model constraints; not automatically available, acceptable, safe, or authorized |
| Candidate solution | variable assignment, objective value, constraint residuals, and scenario/model identity |
| Result status | feasible, infeasible, unbounded, locally optimal, globally optimal, approximate, interrupted, or unresolved under declared definitions |
| Optimality support | theorem/conditions, certificate or bound, gap, tolerances, numerical diagnostics, and solver status |
| Sensitivity | perturbation, parameter range, active constraints, dual/shadow interpretation, and invalidation boundary |
| Decision handoff | reconstruction into alternatives/outcomes, evidence, preferences, authority, recommendation, implementation, and monitoring |

### 4.4 Decisive contrasts

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| desired outcome vs. objective function | both orient action | stakeholder/application result vs. mathematical scalar/vector criterion inside a model |
| real action vs. decision variable | both may use the same label | authorized controllable act vs. unknown modeled quantity with a domain |
| requirement/policy vs. mathematical constraint | both restrict | governed statement or obligation vs. admitted-set condition in one formulation |
| feasible vs. acceptable | both pass a boundary | satisfies modeled constraints vs. passes the wider evidence, preference, ethics, safety, and authority frame |
| optimal solution vs. recommendation | both can influence choice | best under exact model and criterion vs. evidence-bounded advice to an owner |
| solver termination vs. optimality proof | both end a run | computational stop/status vs. support for a defined optimality claim |
| local vs. global optimum | both satisfy an optimality condition | best in a neighborhood vs. best over the declared feasible set |
| sensitivity vs. real-world robustness | both vary inputs | modeled perturbation response vs. maintained outcome/capability under relevant conditions |

### 4.5 Mapping rows

The candidate Table must map, without identifying:

1. application alternatives to variable assignments;
2. application criteria/preferences to objective terms and noncompensatory
   constraints;
3. requirements, resources, and physical limits to model constraints;
4. scenarios/assumptions to parameters and data instances;
5. solver outputs to evidence-bounded result claims; and
6. model results back to recommendation, selection authority, implementation,
   monitoring, and reconsideration.

Every mapping records direction, scope, loss, and invalid combinations.

### 4.6 Enumeration stop

Do not enumerate linear, quadratic, convex, integer, stochastic, robust,
dynamic, multiobjective, or other optimization families as canonical rows. Do
not enumerate simplex, interior-point, branch-and-bound, gradient, evolutionary,
or other algorithms. Families and methods may appear only as bounded examples
testing the row contract.

### 4.7 Invalid fixture

```text
question: choose the best service design
variables: omitted
objective: maximize value
constraints: budget
result: optimal
recommendation: build option A
authority: omitted
```

Invalid because variable/domain identity, value definition, constraint source,
feasible set, optimality support, uncertainty, mapping loss, and selection
authority are absent.

## 5. Design B — Prototype, Test, and Iteration Procedure

### 5.1 Candidate identity

- Proposed path: `tables/procedures/prototype-test-iteration.md`
- Proposed view ID: `procedure-prototype-test-iteration`
- Owner: `requirement-specification-verification-validation`
- Existing senses: `stakeholder-need`, `requirement`, `specification`,
  `verification`, `validation`, and `nonconformity`
- Adds no canonical sense or relation

### 5.2 Governing question

What exact uncertainty is this prototype and evaluation intended to reduce,
for which users/tasks/context, what was observed, what changed, and why should
the team continue, revise, escalate, or stop?

### 5.3 Procedure

1. Name the decision, learning question, risky assumption, and current evidence.
2. Select the smallest prototype boundary and fidelity capable of exposing the
   relevant behavior without being mistaken for production.
3. Declare prototype identity, version, represented and omitted capabilities,
   data, dependencies, safety/security limits, and disposal/access policy.
4. Declare intended users or evaluators, goals, tasks, environment, context,
   inclusion/exclusion criteria, accessibility needs, and consent/privacy
   boundary.
5. Choose a method matched to the question: inspection, standards/conformance
   check, walkthrough, usability session, experiment, simulation, technical
   test, pilot, or another source-governed method. Do not collapse them.
6. Freeze neutral tasks, criteria, measures, observation fields, facilitation,
   intervention rules, data custody, and prohibited claims before evaluation.
7. Record observations separately from interpretation, finding, severity,
   recommendation, and decision.
8. Map each admitted finding to the affected need, requirement, specification,
   design choice, or unresolved assumption; preserve contradictions and nulls.
9. Decide one bounded change, no-change, further research, escalation, or stop;
   create a new prototype/version identity before rerun.
10. Compare rerun evidence under declared changes and stop when the learning
    question is resolved enough for the next decision—not when the artifact is
    called finished.

### 5.4 Required record

| Field | Requirement |
|---|---|
| Learning frame | question, assumption, decision, owner, evidence state, and prohibited inference |
| Prototype | subject, version, fidelity, represented/omitted behavior, data, dependencies, and production boundary |
| Use context | users, goals, tasks, environment, tools/assistive technology, and relevant variation |
| Evaluation | method, evaluator/facilitator, participants or inspection authority, criteria/standard, tasks, scenario, and conditions |
| Evidence custody | consent, minimization, recording, access, retention, privacy, provenance, and correction |
| Result chain | observation, interpretation, finding, severity, limitation, confidence, and contradiction |
| Change | exact design/specification delta, rationale, owner, affected risks, and new version |
| Stop/escalation | completion condition, unresolved issues, escalation trigger, production gate, and next evidence owner |

### 5.5 Decisive contrasts

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| prototype vs. production artifact | both may behave realistically | provisional learning boundary vs. governed operational subject |
| prototype vs. simulation | both may imitate behavior | artifact used to expose/test selected interactions vs. execution/evolution of a model |
| prototype evaluation vs. experiment | both collect observations | bounded design learning method vs. design with an explicit causal/comparative estimand and assignment assumptions |
| usability vs. accessibility | both concern use | effectiveness/efficiency/satisfaction for specified use vs. ability across a wide range of needs/capabilities and contexts |
| user evaluation vs. conformance | both find problems | observations with selected people/tasks vs. criteria-based assessment against a standard |
| verification vs. validation | both evaluate | conformity to specified requirements vs. suitability for intended use |
| finding vs. change decision | evidence can motivate both | interpreted issue under scope vs. authorized disposition considering other evidence and constraints |
| internal rehearsal vs. reader evidence | both execute tasks | author/synthetic mechanics check vs. observations from declared target readers |

### 5.6 Enumeration stop

Do not enumerate design-thinking brands, workshop formats, UX methods,
prototype tools, research platforms, accessibility technologies, participant
taxonomies, or maturity frameworks. The Table owns the reusable record and
procedure; named methods remain scoped examples or external authorities.

### 5.7 Invalid fixture

```text
question: is the product intuitive?
prototype: latest mockup
participants: five users
task: explore freely
result: users liked it
change: ship
```

Invalid because the user/task/context boundary, prototype version/fidelity,
method, criteria, observations, evidence custody, limitations, design delta,
production gates, and decision authority are absent. Five sessions do not
establish accessibility, general usability, demand, or readiness to ship.

## 6. Compatibility and projection

- Both views inherit canonical definitions and sense identities from their
  owners; they may not redefine choice, constraint, requirement, verification,
  validation, evidence, or selection.
- Compact and Book projections may hide detail but must preserve result status,
  unresolved state, scope, and the decision/production boundary.
- Full projection exposes sources, versions, assumptions, methods, evidence,
  loss, authority, review, and supersession.
- Neither view creates graph relations, solver execution, automated scoring,
  participant records, or a second content authority.

## 7. Acceptance checks

1. Exactly two proposed views and zero anchors/relations.
2. Every view has one existing owner and only existing sense IDs.
3. Optimization distinguishes feasible, optimal, recommended, and selected.
4. Optimization retains direction, domain, units, tolerances, status, and loss.
5. Optimization names solver status separately from optimality support.
6. Prototype evaluation distinguishes user evidence, inspection, conformance,
   verification, validation, experiment, simulation, and pilot.
7. Prototype records user/task/context and privacy/accessibility boundaries.
8. Observations, interpretations, findings, changes, and decisions stay separate.
9. Named families, methods, products, and tools fail the enumeration boundary.
10. No canonical admission or reader-value claim occurs during design.

## 8. Product-owner decision

| Field | Decision |
|---|---|
| Reader | A practitioner translating a real question into a model or a learning artifact into a next decision. |
| Job | Determine what the model/test actually established and what remains before action. |
| Current friction | Objectives, constraints, prototypes, tests, findings, and decisions are frequently collapsed into one success label. |
| Product change | Two compact owner-backed views exposing the missing handoff structure. |
| Evidence now | Repeated course pressure, established-source distinctions, owner fit, and deterministic role review. |
| Evidence later | Faster lookup, fewer decision errors, better prototype decisions, and reader comprehension require external observation. |
| Cost/displacement | Two views and cross-links; no anchor, relation, software, solver, method catalog, or UX framework. |
| Continue/merge/stop | Continue both to admission review if roles reach fixed point; merge or stop if either duplicates an existing view after fixture testing. |
