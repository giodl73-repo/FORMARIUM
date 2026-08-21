---
topic: human-action-error-recovery
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Human Action Error and Recovery

## Decision question

Does Lexicon need a descriptive owner for intention-relative action divergence
and its detection-correction-stabilization process, distinct from item-state
error, system recovery, normative violation, causal attribution, and safety
assessment?

## Bounded thesis

Proceed only with `action-error` and `error-recovery`. The candidate classifies
an observed action divergence and a bounded corrective process; it never
diagnoses an actor, attributes cause, assigns blame, determines compliance, or
gives safety advice. Slip, lapse, mistake, rule-based/knowledge-based values,
and deliberate departure/violation remain factors.

## Proposed senses

| Sense | Governing question |
|---|---|
| `action-error` | Where does an agent's action or omission diverge from the agent's stated intention, plan, or applicable procedure, under which descriptive divergence mechanism and context? |
| `error-recovery` | By which detection, correction, and stabilization process does an agent or team respond to an identified action-error and return the bounded activity to its stated intended or required course? |

## Candidate contract

```text
action-error-recovery
  := agent/team, task, context, and source of intention/plan/procedure
   x observed action or omission and divergence stage
   x slip, lapse, mistake, rule-based, knowledge-based, or deliberate-departure factor
   x contributing conditions and attribution basis
   x detection, correction, stabilization, residual state, evidence, and uncertainty
```

## Existing-owner audit

- The fault/error candidate explicitly separates human action from
  `dependability-error`, an item-state deviation.
- Dependability recovery restores system capability after disruption; it cannot
  represent correction of an action caught before system failure.
- Governance and deontic owners state obligations and compliance, not the
  descriptive cognitive/behavioral mechanism of an action divergence.
- Causal reasoning owns causal attribution; action classification does not show
  that the divergence caused a realized outcome.
- Hazard/safety owners determine harm and acceptability; no safety claim belongs
  here. Control/intervention can support recovery but is not its specific loop.

## Source matrix

| Source | Contribution | Limitation |
|---|---|---|
| [Reason (2000)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1117770/) | active failures, latent conditions, and non-blame framing | does not supply diagnosis or causal attribution for an individual case |
| [SKYbrary Human Error Types](https://skybrary.aero/articles/human-error-types) | accessible slip/lapse/mistake and SRK synthesis | aviation-oriented secondary source |
| [SKYbrary TEM](https://skybrary.aero/articles/threat-and-error-management-tem) | detection, trapping, and recovery model | operational aviation framework, not universal safety advice |
| [NCBI Patient Safety](https://www.ncbi.nlm.nih.gov/books/NBK2673/) | design-for-recovery context | health-care design literature does not define all action errors |
| [ISO/IEC 25010 catalogue](https://www.iso.org/standard/78176.html) | current product-quality context for error recovery | catalogue-level evidence; it is not a behavioral taxonomy |

## Counterevidence and limits

- An adverse outcome without evidence of the actor's intention, plan, or
  procedure does not establish an action error.
- A deliberate departure can be descriptively recorded but does not establish
  blame, culpability, or a deontic violation finding.
- A system may fail without an action error, and an action error may be caught
  without system failure.
- Correction can be incomplete or require another owner's compensation,
  intervention, compliance assessment, or causal investigation.
- The candidate provides no diagnosis, causal conclusion, or safety advice.

## Admission gates

1. Preserve exactly the two proposed senses; classify all named error types and
   deliberate departure/violation as factors.
2. Require an attribution basis for intention, plan, procedure, and observed
   divergence.
3. Preserve boundaries to item-state error, dependability recovery, deontic
   violation, compliance, causal attribution, and safety.
4. Do not turn a descriptive factor into blame, diagnosis, or response advice.
5. Remain noncanonical; do not modify canonical tables or relations.

## Disposition

**PROCEED TO NONCANONICAL CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.**
The divergence event and its corrective loop are independently answerable and
cross-domain, while their diagnostic, causal, deontic, and safety implications
remain outside the candidate.
