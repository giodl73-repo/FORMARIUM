# Choice, Alternative, Criterion, Preference, Recommendation, and Selection

Status: candidate anchor entry

## Orientation

A choice compares two or more possible courses, including a status-quo or
no-action course where applicable. Alternatives become feasible only under a
declared scope and constraints. Criteria describe how admitted alternatives
are compared; preferences state comparative priorities or desirability;
trade-offs expose gains and losses across criteria. Evaluation may support a
recommendation, but the authorized final selection remains a separate record.

This entry does not replace rule-derived case decisions. For those, use
[Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md).

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `choice` | What bounded selection must be made, by whom, and for what purpose? | decision question and authority context |
| `alternative` | Which candidate course could be selected? | selectable or retainable option |
| `decision-criterion` | On which operationally defined dimension are admitted alternatives compared? | comparison basis with direction and scale |
| `preference` | Which prospect is comparatively favored, by whom, and under what stated values or priorities? | comparative ordering that may be partial |
| `trade-off` | Which criterion gain is accompanied by which loss, under whose preference? | non-dominance or compensation relation |
| `recommendation` | Which alternative or retained set is advised from the evaluation, with what limitations? | analytical disposition and rationale |
| `selection` | Which alternative is finally chosen by the authorized decision owner? | authority-owned final choice |

Feasible, excluded, and unresolved are statuses of an `alternative`; they are
not separate senses. A decision rule is a declared mechanism for producing a
comparison or disposition; it does not become a universal sense of choice.

## Choice structure

```text
bounded question and authority
  + objectives and affected parties
  + candidate alternatives
  + applicable hard constraints
  -> feasible / excluded / unresolved alternative statuses

feasible alternatives
  x possible states or scenarios
  -> outcome or consequence cells

outcome evidence and uncertainty
  x operational criteria
  x declared preference or decision rule
  -> comparison record
  -> recommendation or retained set

authorized decision owner
  + recommendation and limitations
  -> final selection or deferral
```

An alternative-state cell may be `observed`, `estimated`, `missing`,
`contested`, or `not-applicable`. Missing and contested cells do not default to
neutral or favorable values.

## Root factorization

```text
choice-alternative-selection-use
  := decision question, scope, and owner
   x objectives, desired outcomes, and affected parties
   x candidate alternatives and generation boundary
   x feasibility constraints and exclusion rationale
   x states, scenarios, horizon, and controllability
   x alternative-state outcomes and consequences
   x evidence quality, applicability, and uncertainty
   x criteria definitions, measurement bases, and directions
   x preferences, priorities, weights, and provenance
   x aggregation, decision rule, and noncompensatory gates
   x sensitivity, robustness, ties, and information value
   x recommendation, rationale, limitations, and review state
   x final selection, authority, implementation, and reconsideration trigger
```

These factors are dependent. In particular, outcomes depend on an alternative
and state; feasibility depends on applicable constraints; a trade-off depends
on compared criteria and preference; and robustness depends on declared
sensitivity changes.

## Alternative status

| Status | Meaning | Required record |
|---|---|---|
| `candidate` | considered inside the generation boundary but not yet screened | origin and enough description to evaluate |
| `feasible` | no known applicable hard constraint excludes it | constraint versions and unresolved caveats |
| `excluded` | an applicable hard constraint excludes it | exact constraint, authority, version, and rationale |
| `unresolved` | feasibility cannot yet be determined | missing authority, fact, constraint status, or evidence |

An enhancing criterion cannot exclude an alternative merely because its
performance is weak. Conversely, a mandatory constraint cannot be traded away
by a high score on another criterion unless an authorized exception changes
the applicable constraint record.

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Choice vs. rule-derived decision | both produce a case-specific result | comparison among alternatives vs. conclusion derived from governing logic |
| Alternative vs. state | both affect what may happen | selected course vs. condition not selected by that choice |
| State vs. outcome | both appear in consequence analysis | condition that obtains vs. result of alternative under that condition |
| Candidate vs. feasible alternative | both remain visible in analysis | considered option vs. option surviving applicable hard constraints |
| Objective vs. criterion | both guide evaluation | desired result vs. operational comparison dimension |
| Constraint vs. criterion | both test an alternative | admissibility gate vs. comparison basis among admitted alternatives |
| Probability vs. preference | both can affect a decision | belief/model weight over states vs. comparative desirability of prospects |
| Utility vs. preference | utility may represent preference under assumptions | numerical representation vs. comparative attitude and its provenance |
| Criterion weight vs. criterion measurement | both may be numeric | declared importance vs. observed or estimated performance |
| Trade-off vs. dominance | both compare alternatives | gain paired with loss vs. no-worse and at-least-one-better relation |
| Evaluation vs. recommendation | recommendation uses evaluation | retained comparison record vs. advised disposition |
| Recommendation vs. selection | both may name the same alternative | analytical advice vs. authority-owned final choice |
| Robustness vs. certainty | both concern stability | unchanged disposition under declared variations vs. absence of uncertainty |

## Diagnostic examples

- A long list of ideas is not yet a feasible set.
- “Lowest price” is not a complete decision criterion until the priced object,
  date, scope, and desired direction are declared.
- A high expected value can coexist with an unacceptable hard constraint.
- A preference weight does not turn qualitative evidence into measured data.
- Adding unlike criterion values without an explicit mapping hides a value
  judgement rather than resolving it.
- Two close alternatives may remain jointly recommended when uncertainty can
  credibly reverse their order.
- A review team can recommend one alternative while the authorized owner
  selects another and records a separate rationale.

## Specialized view

- [Alternative Selection Decision Table](../decisions/alternative-selection.md)
  owns feasibility, alternative-state outcomes, comparison, recommendation,
  and final-selection records without requiring one scoring method.

## Selection procedure

1. State the exact choice question, scope, owner, affected parties, horizon,
   and intended outcome.
2. Generate candidate alternatives within a visible boundary; include current
   practice or no action when it is genuinely available.
3. Apply authoritative hard constraints and retain excluded and unresolved
   alternatives with reasons.
4. Separate alternatives from uncertain states or scenarios and populate an
   outcome cell for each material valid combination.
5. Bind evidence, applicability, limitations, and uncertainty to each outcome
   claim rather than to the alternative name alone.
6. Define each comparison criterion, measurement basis, direction, and
   missing-value behavior.
7. Record whose preferences, priorities, or weights apply and whether the
   ordering is incomplete, tied, or noncompensatory.
8. Choose and disclose an evaluation rule proportionate to the problem; do not
   make a method canonical merely because it computes a ranking.
9. Test sensitivity, ties, unresolved cells, and whether more information
   could change the disposition.
10. Separate the evaluation record, recommendation, and authorized final
    selection; name implementation and reconsideration triggers.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines choice, alternative, criterion, preference, recommendation, and selection | Adds their distinct roles in one bounded selection contract |
| Thesaurus | Links option, decision, priority, value, ranking, and judgement | Prevents lexical proximity from collapsing probability, preference, score, and authority |
| Decision-analysis handbook | Supplies one or more evaluation processes and methods | Preserves method choice while keeping the reusable semantic roles stable |
| Policy or rule system | Derives case outputs from governing logic | Keeps rule adjudication separate from choice among alternatives |
| Optimization or scoring tool | Computes a result under encoded objective and constraints | Makes omitted alternatives, criteria, preferences, uncertainty, and authority visible |

## Constraints and failure signs

- The decision question, scope, owner, affected parties, and horizon are
  explicit.
- Candidate generation has a stated boundary; familiarity does not define the
  option set.
- Alternative statuses retain exact constraints and unknowns.
- Alternatives, states, outcomes, and evidence are not stored in one label.
- Missing or contested outcome cells remain visible.
- Criteria state operational definition, measurement basis, direction, and
  missing-value behavior.
- Preference is attributed and may remain incomplete or tied.
- Hard constraints remain noncompensatory unless an authorized exception is
  explicitly applicable.
- Probability, expected loss, price, cost, value, utility, and score do not
  substitute for one another.
- Sensitivity reports the declared changes tested; it does not prove universal
  robustness.
- Recommendation retains alternatives, limitations, and uncertainty that
  could change it.
- Final selection records authority, rationale, implementation, and a trigger
  for reconsideration.

## Cross-references

- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)
- [Claim and Evidence](claim-evidence.md)
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](causal-reasoning.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Cost, Price, Value, Utility, and Return](cost-price-value-return.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [Factorization Quality](factorization-quality.md)
- [Purpose](../roots/purpose.md)
- [Constraint](../roots/constraint.md)
- [Alternative Selection Decision Table](../decisions/alternative-selection.md)

## Sources and provenance

1. NASA, “6.8 Decision Analysis”:
   https://www.nasa.gov/reference/6-8-decision-analysis/
2. NASA, *Systems Engineering Handbook*, Rev. 2, section 6.8:
   https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf
3. HM Treasury, *The Green Book 2026*, chapters 5, 6, and 9:
   https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026
4. Stanford Encyclopedia of Philosophy, “Decision Theory,” revised 2025:
   https://plato.stanford.edu/entries/decision-theory/
5. NIST, “Decision Analysis Methods for Selecting Consumer Services with
   Attribute Value Uncertainty”:
   https://www.nist.gov/publications/decision-analysis-methods-selecting-consumer-services-attribute-value-uncertainty

Comparator access date: 2026-08-16. The sources retain their engineering,
public-appraisal, philosophical, and analytical scope. This cross-domain
Factorium synthesis remains `candidate`.
