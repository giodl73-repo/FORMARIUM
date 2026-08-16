# Choice, Alternative, and Selection Research

Date: 2026-08-16

Status: candidate F27 architecture decision

## Question

Can the existing policy, probability/risk, cost/value, causal, evidence, and
control entries own choice among alternatives without distortion, or does the
reference need a separate canonical anchor before admitting cross-entry
closure?

## Existing-owner test

The current policy entry owns a rule-derived case conclusion:

```text
case facts + applicable versioned rules -> decision -> enforcement
```

That contract correctly covers adjudication, authorization, classification,
and other case-to-output decisions. It does not own a candidate set, feasible
subset, state-contingent outcomes, comparison criteria, preferences,
trade-offs, recommendation, or the decision authority's final selection.

The other relevant entries own inputs to a choice but not the choice contract:

- Claim and Evidence owns observations, results, implications, limitations,
  confidence, provenance, and review.
- Causal Reasoning owns association, effect, intervention, mechanism,
  attribution, and their assumptions.
- Probability, Risk, and Uncertainty owns model probability, likelihood,
  consequences, expected loss, and uncertainty representations.
- Cost, Price, Value, Utility, and Return owns distinct value senses and their
  bases; it does not make one of them a universal objective.
- Control and Response owns objectives, indicators, interventions, and
  observed outcomes.
- Policy and Constraint owns authority, hard validity boundaries, rule logic,
  and enforcement.

Forcing alternative selection into any one of these owners would make that
input layer authoritative over the others. Adding more factors to the policy
entry would also collapse rule adjudication with choice under uncertainty.
The existing-owner test therefore fails.

## Source findings

1. NASA's Decision Analysis process separately records the decision need,
   criteria, alternatives, evaluation method and results, recommendation, and
   final decision. It treats uncertainty that could change a ranking as a
   reason to reduce uncertainty or retain close alternatives.
2. NASA distinguishes mandatory criteria from enhancing criteria and requires
   operational definitions when different measurement bases are normalized.
3. The 2026 UK Green Book separates option generation, feasibility filtering,
   shortlist appraisal, and preferred-option recommendation. It rejects
   ungrounded simple weighting and scoring as insufficiently transparent.
4. A common decision-theory model distinguishes acts, possible states, and
   outcomes; preferences compare prospects rather than becoming probability.
   This is a useful contrast pattern, not a mandatory ontology or rationality
   claim for every domain.
5. NIST describes a risky outcome as depending on both the selected
   alternative and an uncertain event, with further uncertainty possible in
   assessed attributes.

## Architecture decision

Add one candidate anchor, `choice-alternative-selection`, with one Decision
view. Its recurring lookup question is:

> Given a bounded decision question, which alternatives remain feasible, how
> do their possible outcomes compare under declared criteria and preferences,
> what does uncertainty leave unresolved, and how do recommendation and final
> selection differ?

The anchor owns reusable roles and contrasts. It does not own a universal
algorithm, optimizer, score, preference scale, probability model, causal
estimate, policy authority, or domain option catalog.

## Inclusion and stopping rule

A concept belongs in the anchor only when it is needed to distinguish the
choice contract across at least two source domains and cannot be represented
without ambiguity as an existing sense or local guide field. The anchor stops
before:

- named decision-analysis methods;
- elicitation or preference-scale families;
- optimization algorithms;
- risk frameworks and scoring products;
- domain-specific option, criterion, or consequence catalogs;
- claims that a recommendation is correct merely because one calculation
  ranks it first.

## Required distinctions

| Pair | Governing distinction |
|---|---|
| Candidate vs. feasible alternative | considered option vs. option surviving hard constraints |
| Alternative vs. state | controllable or selectable course vs. uncertain condition not selected by that choice |
| State vs. outcome | condition that may obtain vs. consequence produced by alternative and state |
| Objective vs. criterion | desired result vs. operational comparison dimension |
| Constraint vs. criterion | admissibility gate vs. basis for comparing admitted alternatives |
| Probability vs. preference | belief or model weight over states vs. comparative valuation of prospects |
| Cost/value vs. criterion | owned quantity or valuation sense vs. its scoped use in this decision |
| Evaluation vs. recommendation | retained comparison record vs. advised disposition with rationale |
| Recommendation vs. final selection | analytical advice vs. authority-owned choice |
| Robustness vs. certainty | stability under declared changes vs. absence of uncertainty |

## Candidate bridge boundary

F27 may propose only five cross-entry joins, each outside the canonical
relation sidecar until its kind and qualifier grammar are frozen. The joins
connect evidence, causal outcome scope, risk consequences, value criteria, and
policy constraints to exact factors in the new anchor. Each join owns a check
that can fail independently of either endpoint.

## Primary sources

- NASA, “6.8 Decision Analysis”:
  https://www.nasa.gov/reference/6-8-decision-analysis/
- NASA, *Systems Engineering Handbook*, Rev. 2, section 6.8:
  https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf
- HM Treasury, *The Green Book 2026*, chapters 5, 6, and 9:
  https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026
- Stanford Encyclopedia of Philosophy, “Decision Theory,” revised 2025:
  https://plato.stanford.edu/entries/decision-theory/
- NIST, “Decision Analysis Methods for Selecting Consumer Services with
  Attribute Value Uncertainty”:
  https://www.nist.gov/publications/decision-analysis-methods-selecting-consumer-services-attribute-value-uncertainty

Comparator access date: 2026-08-16. Source models remain scoped to their
domains. Factorium's synthesis remains `candidate`.
