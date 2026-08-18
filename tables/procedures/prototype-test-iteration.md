# Prototype, Test, and Iteration Procedure

Status: candidate Procedure Table

Primary family: Procedure Table

Canonical headword: [Requirement, Specification, Verification, and
Validation](../entries/requirement-specification-verification-validation.md)

Canonical senses: `stakeholder-need`, `requirement`, `specification`,
`verification`, `validation`, `nonconformity`

## Governing question

What uncertainty is this prototype and evaluation intended to reduce, for
which users, tasks, and context; what was observed; what changed; and why
should the team continue, revise, escalate, or stop?

## Procedure table

| Step | Question | Required output |
|---|---|---|
| 1. Frame | Which decision, learning question, risky assumption, and current evidence justify this iteration? | question, owner, evidence state, intended decision, and prohibited inference |
| 2. Bound | What is the smallest artifact and fidelity capable of exposing the relevant behavior? | prototype purpose, scope, represented/omitted behavior, and fidelity rationale |
| 3. Identify | Which exact artifact/version, data, dependencies, environment, and limitations will be evaluated? | immutable prototype identity and production/security/privacy boundary |
| 4. Contextualize | Which users/evaluators, goals, tasks, environment, tools, assistive technologies, and relevant variation define use? | context-of-use and inclusion/exclusion record |
| 5. Select method | Which inspection, conformance check, walkthrough, usability session, experiment, simulation, technical test, pilot, or other method answers the question? | method identity, fit, authority, assumptions, and limits |
| 6. Freeze protocol | Which tasks, criteria, measures, facilitation, interventions, observations, recording, consent, and custody apply before execution? | versioned neutral protocol and data plan |
| 7. Execute | What occurred under which conditions, deviations, assistance, and failures? | observation/event record separated from interpretation |
| 8. Interpret | Which finding follows from which observations under what criterion and limitation? | observation-to-finding trace, contradiction, severity, and confidence |
| 9. Decide change | Which exact need, requirement, specification, design choice, or assumption changes—or remains unchanged—and under whose authority? | bounded disposition, rationale, owner, and new artifact version |
| 10. Rerun or stop | What new evidence does the revision require, and which condition permits continuation, escalation, production review, or stopping? | comparison plan, unresolved ledger, stop/escalation rule, and next evidence owner |

## Required iteration record

| Record | Required fields | Invalid shortcut |
|---|---|---|
| learning frame | question, assumption, decision, owner, current evidence, prohibited inference | “see if users like it” |
| prototype | subject, version, fidelity, represented/omitted capability, data, dependencies, security/performance/production boundary | “latest mockup” |
| use context | users, goals, tasks, environment, tools/assistive technology, relevant variation | “typical users” |
| evaluation | method, participant/evaluator boundary, criteria/standard, task/scenario, conditions, facilitation, deviations | “tested internally” |
| evidence custody | consent/authority, minimization, recording, access, retention, privacy, provenance, correction | “notes available” |
| result chain | observation, interpretation, finding, criterion, severity, limitation, confidence, contradiction | “test passed” |
| change | exact design/specification delta, reason, owner, affected risks, new version | “improved UX” |
| stop/escalation | learning completion, unresolved issues, escalation trigger, production gate, next owner | “ready to ship” |

## Method boundary table

| Method role | Primary question | Must retain | Must not imply |
|---|---|---|---|
| inspection | what issue is visible against expertise or a declared heuristic? | inspector, method, scope, criteria, finding, limitation | user behavior or conformance by default |
| standards/conformance assessment | does the exact subject satisfy applicable criteria under the method? | standard/version, applicability, sample, tools, evidence, exceptions | general usability or every user's accessibility experience |
| walkthrough | can an evaluator trace the intended task/action sequence under assumptions? | evaluator perspective, task, state, assumptions, breakdowns | observed target-user behavior |
| usability session | can selected users pursue declared goals/tasks in context, and what occurs? | participant boundary, task, context, observation, assistance, privacy, limitation | population-wide usability or demand |
| experiment | what comparative or causal estimand is tested under a design? | alternatives, assignment, outcome, assumptions, uncertainty | causal effect from an uncontrolled demonstration |
| simulation | what behavior does an executed model produce under inputs/conditions? | model, implementation, run, result, discrepancy, validity | actual user or operational outcome |
| technical test | does an implementation exhibit specified behavior under conditions? | article/version, input, environment, oracle, result | suitability for intended use |
| pilot | what happens in a bounded operational or near-operational deployment? | population/site, duration, support, risks, evidence, rollback | universal readiness or scale performance |

## Decisive contrasts

| Pair | Decisive distinction |
|---|---|
| prototype vs. production artifact | provisional learning boundary vs. governed operational subject |
| prototype vs. simulation | artifact exposing selected interactions vs. execution/evolution of a model |
| prototype evaluation vs. experiment | bounded design-learning method vs. comparative/causal design with an estimand and assignment assumptions |
| usability vs. accessibility | effectiveness/efficiency/satisfaction for specified use vs. ability across a wide range of needs, capabilities, and contexts |
| user evaluation vs. conformance | observations with selected people/tasks vs. criteria-based assessment against a standard |
| verification vs. validation | conformity to specified requirements vs. suitability for intended use |
| observation vs. finding | recorded occurrence/evidence vs. criterion-governed interpretation |
| finding vs. change decision | scoped issue vs. authorized disposition considering other evidence and constraints |
| internal rehearsal vs. reader evidence | author/synthetic mechanics check vs. observations from declared target readers |

## Constraints and failure signs

- Select fidelity for the learning question. Greater realism can expose some
  interactions while increasing cost, risk, and the chance of being mistaken
  for production.
- Prototype code or data handling is not production-secure, scalable,
  reliable, accessible, or supportable unless separately evidenced.
- A participant is not the test subject in the sense of personal competence;
  the evaluation investigates the artifact/use interaction under a protocol.
- Assistance, facilitator intervention, task deviation, technical failure, and
  missing observation remain visible rather than being normalized into success.
- Small or narrow participant sets can expose issues but do not justify
  population generalization or statistical significance without a suitable
  design.
- User evaluation complements but does not replace accessibility standards and
  conformance assessment; conformance does not replace observation of use.
- “No issue observed” is a bounded null under the task, users, conditions, and
  method—not proof that no issue exists.
- A finding does not authorize a change; a change does not prove improvement;
  a successful rerun does not prove market demand or achieved outcomes.
- Personal or sensitive data require explicit authority, minimization, access,
  retention, correction, and disposal records. Dummy data limitations remain
  visible.
- Production progression requires its own security, performance, reliability,
  operational, legal, accessibility, and decision gates.

## Enumeration stop

Design-thinking brands, workshop formats, UX methods, prototype tools,
research platforms, accessibility technologies, participant taxonomies, and
maturity frameworks are examples or external authorities. This Table owns the
reusable learning/evaluation/change procedure, not a UX-method catalog.

## Compact example

A team builds a low-fidelity application flow to test whether likely users can
find and understand a consent choice. It freezes the exact prototype version,
neutral task, participant boundary, accessibility needs, observation fields,
recording consent, and prohibited generalizations. Two participants miss the
choice under the tested flow. The result supports a scoped finding and a
revised-label/navigation hypothesis; it does not establish prevalence,
accessibility conformance, legal sufficiency, demand, or production readiness.

## Sources and provenance

- ISO 9241-210:2019 official standard identity and abstract, human-centred
  design for interactive systems: <https://www.iso.org/standard/77520.html>.
  The copyrighted standard body is not reproduced.
- ISO 9241-11:2018 official standard identity and abstract, usability concepts:
  <https://www.iso.org/standard/63500.html>.
- NIST, Human Centered Design, iterative activities and evaluation:
  <https://www.nist.gov/itl/iad/human-centered-technologies/human-factors-human-centered-design>.
- W3C WAI, Involving Users in Evaluating Web Accessibility, user/conformance
  and generalization boundaries:
  <https://www.w3.org/WAI/test-evaluate/involving-users/>.
- GOV.UK Service Manual, Making Prototypes, fidelity and production boundary:
  <https://www.gov.uk/service-manual/design/making-prototypes>.
- GOV.UK Service Manual, Using Moderated Usability Testing, research question,
  participant, task, observation, and data-handling guidance:
  <https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing>.

These sources support the generic procedure and its limits. They do not make
one branded design process or government-service workflow universal.
