---
topic: motive-intention-rationale-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Motive, Desire, Intention, and Rationale

## Decision question

Does Lexicon need an owner for what an agent favors, is settled on, aims at
under a description, and records as justification, given that Purpose already
factors as beneficiary, desired outcome, and rationale, and that canonical
`objective` already owns which desired result, state, or performance level is
being pursued?

## Bounded thesis

Desire, motive, intention, and rationale are not one state under different
names. A desire imposes no consistency demand; an intention is a settled
commitment subject to means-end coherence; a motive is the further end that
explains the aim; a rationale is a recorded justification addressed to an
audience.

No `goal` sense is proposed. Canonical `objective` already governs which desired
result, state, or performance level is being pursued, and that question is not
restricted to quantified targets. Goal, aim, and target remain contextual
vocabulary: a row expressed in goal language is routed to `objective`, and
goal-derived structure such as specificity, difficulty, commitment, softgoals,
and goal refinement is recorded as factor vocabulary on the routed row or on an
intention row.

Admit a candidate only if this family positions itself as supplying the internal
structure of the Purpose root's desired-outcome and rationale factors rather
than as a rival to Purpose, and only if it adds no second owner for pursued
results.

The thesis is falsified if objective and indicator, preference and criteria,
requirement and validation, causal attribution, warrant, plan artifacts, and the
Purpose root already express every counterexample below without losing
settledness, act description, attribution basis, or the
explanation-versus-justification split.

Motivation is deliberately bounded. This family owns `motive` as an explanatory
background end and does not own motivation as a psychological subject matter:
no needs taxonomies, no ranked motivation theories, no engagement constructs.
Intrinsic and extrinsic motivation remain factors of a motive row.

## Proposed senses

| Sense | Governing question |
|---|---|
| `desire` | Which state of affairs does this agent favor or is disposed to pursue, absent any settled plan? |
| `motive` | Which further end or concern explains why this agent wanted or did this? |
| `intention-prospective` | To what future act is this agent settled, with what commitment, consistency, and means-end coherence? |
| `intention-in-action` | Under which description is this act being done intentionally, and with which intention? |
| `rationale` | Which recorded reasons, alternatives, assumptions, and trade-offs justify this decision, requirement, or design, to whom, when the record is not already held by a decision, requirement, or architecture owner? |

Not proposed: `goal`. Goal, aim, end-state, and target are contextual aliases
routed to canonical `objective`.

## Candidate contract

```text
motive-intention-rationale-use
  := agent, group, or system attributed the state
   x attitude type: desire, motive, or intention
   x object under a description, scope, and horizon
   x commitment strength, settledness, and reconsideration trigger
   x means-end structure, plan, subordinate ends, and refinement
   x pursued-result vocabulary, goal-language alias, and routing to objective
   x satisfaction test, partial attainment, and abandonment
   x motivating reasons, normative reasons, and defeaters
   x explanation vs. justification, audience, and record
   x record binding: decision, requirement, architecture, or unbound
   x attribution basis: avowal, behavior, artifact, or inference
   x conflict, ambivalence, competing ends, and priority
   x revision, failure, and post-hoc rationalization
```

## Existing-owner audit

- [Purpose](../../../tables/roots/purpose.md) already factors as beneficiary,
  desired outcome, and rationale in context. This family supplies internal
  structure for those two factors and does not replace the root. It is also the
  fourth existing home for recorded justification.
- [Agency](../../../tables/roots/agency.md) owns the actor and capacity to act.
- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns `objective` as the desired result, state, or performance level being
  pursued, plus set point, indicator, threshold, service-level objective, and
  outcome. This is the reason no `goal` sense is proposed.
- [Choice, Alternative, Criterion, Preference, Recommendation, and Selection](../../../tables/entries/choice-alternative-selection.md)
  owns preference, criteria, weights, decision rules, recommendation, and the
  rationale field of a decision record.
- [Requirement, Specification, Verification, and Validation](../../../tables/entries/requirement-specification-verification-validation.md)
  owns requirement and specification statements, their traceability, and the
  rationale recorded against them.
- [Governance, Obligation, and Compliance](../../../tables/entries/governance-obligation-compliance.md)
  owns `obligation` as the binding duty on a subject.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns causal mechanism and causal attribution.
- [Epistemic Standing, Inquiry, and Warrant](../../../tables/evidence/epistemic-standing-inquiry-warrant.md)
  owns the warrant rule linking grounds to a proposition.
- [Planned Work Procedure](../../../tables/procedures/planned-work.md) owns plan
  artifacts and treats a plan as a revisable intention.
- [System Composition, Architecture, Capability, Interface, and Dependency](../../../tables/entries/system-composition-dependency.md)
  owns architecture description elements, including recorded design rationale.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [SEP, Intention](https://plato.stanford.edu/entries/intention/) | prospective intention, intentional action, and intention-with-which | the Davidson, Anscombe, and Bratman disagreement is preserved, not resolved |
| [SEP, Desire](https://plato.stanford.edu/entries/desire/) | action-based, pleasure-based, and good-based theories | no single theory of desire is adopted |
| [SEP, Reasons for Action: Justification vs. Explanation](https://plato.stanford.edu/entries/reasons-just-vs-expl/) | motivating vs. normative reasons | the split is contested in detail |
| [Davidson, Actions, Reasons, and Causes](https://doi.org/10.2307/2023177) | primary reason as pro-attitude plus belief | reasons-as-causes is a theory, not a licence to re-own causation |
| Anscombe, *Intention*, 2nd ed., Harvard University Press, 2000, ISBN 978-0-674-00399-9 | intention under a description; the "Why?" test | act descriptions multiply; no canonical description exists |
| Bratman, *Intention, Plans, and Practical Reason*, CSLI Publications, 1999, ISBN 978-1-57586-192-7 | intention is not desire plus belief; planning role | planning theory is one account among several |
| [Cohen and Levesque, Intention is choice with commitment](https://doi.org/10.1016/0004-3702(90)90055-5) | formal commitment and persistence for artificial agents | formalization does not settle human intention |
| [Gollwitzer, Implementation intentions](https://doi.org/10.1037/0003-066X.54.7.493) | goal intention vs. implementation intention | goal-usage source: supplies factor vocabulary for intention rows, not an ownership boundary |
| [Locke and Latham, Goal setting and task motivation](https://doi.org/10.1037/0003-066X.57.9.705) | specificity, difficulty, and commitment as attributes of a pursued result | goal-usage source: factor vocabulary attached to a routed `objective` row; not a boundary between goal and objective |
| [van Lamsweerde, Goal-oriented requirements engineering](https://doi.org/10.1109/ISRE.2001.948567) | goal refinement, softgoals, operationalization toward requirements | goal-usage source: refinement vocabulary only; requirement statements stay with their owner |
| [OMG, Business Motivation Model v1.3](https://www.omg.org/spec/BMM/1.3/) | vocabulary relating ends and means in business motivation models | one model's vocabulary; no ownership split between goal and objective is claimed from it |
| [ISO/IEC/IEEE 42010:2022](https://www.iso.org/standard/74393.html) | architecture rationale as a recorded element | that rationale stays with the architecture owner |
| American Law Institute, *Model Penal Code* §2.02, 1962 | enumerates kinds of culpability as purposely, knowingly, recklessly, and negligently | motive is not among the enumerated kinds; the treatment of motive varies by jurisdiction and context, and this brief states no doctrine |

## Counterevidence and limits

- desire without intention, and intention without any felt desire;
- an intentional act under one description that is unintentional under another;
- a motive that explains an act without being what the agent intended;
- a pursued result stated only in qualitative goal language, which is still
  routed to `objective` rather than given a second owner;
- an objective that is met while the concern that motivated it is not served;
- a rationale recorded after the fact that does not report the actual motive;
- a stated rationale that justifies a decision made for a different reason;
- a rationale already bound to a decision record, requirement, or architecture
  description, which stays with that owner;
- a plan revised without abandoning the intention it serves;
- an organization or system credited with an intention that no individual holds;
- conflicting desires held simultaneously without incoherence.

## Admission gates

1. Position the family as internal structure for the Purpose root's
   desired-outcome and rationale factors; do not restate or rival the root.
2. Propose no `goal` sense. Route goal, aim, end-state, and target language to
   canonical `objective`, and keep goal-derived attributes as factor vocabulary.
3. Bind `rationale` by a hard routing rule: rationale recorded inside a decision
   record, a requirement or specification, or an architecture description
   belongs to that owner; only otherwise-unbound recorded justification belongs
   here.
4. Keep desire, motive, and intention non-equivalent, and keep prospective
   intention separate from intention in action.
5. Require an explicit attribution basis on every row that ascribes a state to a
   group, organization, or system; no anthropomorphism by default.
6. Keep motivating and normative reasons distinct and do not re-own causation.
7. Keep motivation bounded to factors of a motive row.
8. State no legal doctrine; cite culpability enumerations as enumerations only.
9. Stop before ranked motivation theories, needs and personality taxonomies,
   objective-and-key-result method catalogs, goal-modeling notations as
   canonical, jurisdiction-specific culpability doctrine, and metaphysics of
   free will and intentionality.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The desire,
intention, motive, and rationale distinctions are strongly supported. The
goal-versus-objective collision is closed by dropping `goal` entirely, and
`rationale` now has four acknowledged existing homes, so the routing rule is the
condition of admission. This brief is not legal advice.
