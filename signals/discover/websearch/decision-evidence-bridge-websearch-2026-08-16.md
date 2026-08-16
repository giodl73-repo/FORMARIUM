---
skill: discover-websearch
topic: decision-evidence-bridge
date: 2026-08-16
claims_checked: 6
confirmed: 6
---

# Decision and Evidence Bridge Web Evidence

## Claims to ground

| # | Claim | Why it matters |
|---:|---|---|
| 1 | Alternative selection has a recurring contract distinct from rule-derived case adjudication. | Determines canonical ownership. |
| 2 | Objectives, alternatives, feasibility constraints, criteria, recommendation, and final selection remain distinct. | Prevents one `decision` field from collapsing the process. |
| 3 | Evidence and uncertainty can change evaluation or ranking without selecting an alternative by themselves. | Bounds cross-entry relation semantics. |
| 4 | Criteria with unlike measurement bases cannot be added without an explicit comparison contract. | Prevents accidental scoring. |
| 5 | An alternative and an uncertain state jointly determine an outcome in common decision models. | Separates action, state, and consequence roles. |
| 6 | A summary score or expected value need not exhaust the decision basis. | Keeps recommendation qualified and plural where warranted. |

## Web evidence

### Claims 1 and 2

- Query: `site:nasa.gov systems engineering handbook decision analysis alternatives criteria uncertainty`
  - NASA's Decision Analysis process separately records the decision need,
    criteria, alternatives, evaluation methods and results, recommendation,
    and final decision.
  - https://www.nasa.gov/reference/6-8-decision-analysis/
- Query: `site:gov.uk Green Book options appraisal uncertainty decision criteria`
  - The Green Book separates options generation, feasibility/critical-success
    filtering, shortlist appraisal, recommendation, and decision use.
  - https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026
- Verdict: CONFIRMED.

### Claim 3

- NASA states that assumptions and supporting evidence should be evaluated and
  that uncertainty reduction should be considered when uncertainty could
  change the alternative evaluation or ranking.
  - https://www.nasa.gov/reference/6-8-decision-analysis/
- NIST describes risky decisions in which the selected alternative and an
  uncertain event jointly define the outcome, with additional uncertainty in
  assessed attribute values.
  - https://www.nist.gov/publications/decision-analysis-methods-selecting-consumer-services-attribute-value-uncertainty
- Verdict: CONFIRMED.

### Claim 4

- NASA requires operational definitions when unlike criteria are normalized
  to a common comparison scale and says the meanings of scales and weights
  must be understood.
  - https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf
- The 2026 Green Book rejects simple weighting and scoring where it lacks an
  objective basis and reduces transparency.
  - https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026
- Verdict: CONFIRMED.

### Claim 5

- Stanford's Decision Theory entry presents the act/state/outcome distinction:
  an act maps possible states to outcomes, while preferences compare options.
  - https://plato.stanford.edu/entries/decision-theory/
- NIST's risky-decision description independently distinguishes selected
  alternative, uncertain event, and resulting outcome.
  - https://www.nist.gov/publications/decision-analysis-methods-selecting-consumer-services-attribute-value-uncertainty
- Verdict: CONFIRMED.

### Claim 6

- NASA retains closely ranked alternatives when uncertainty reduction could
  credibly change the ranking and distinguishes recommendation from final
  selection.
  - https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf
- The Green Book says one summary social-value metric is not sufficient for a
  balanced judgement and requires risks, uncertainties, unmonetisable effects,
  and distributional effects to remain visible.
  - https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026
- Verdict: CONFIRMED.

## Findings

| # | Finding | Verdict |
|---:|---|---|
| 1 | Decision question and authority precede method selection. | confirmed |
| 2 | Candidate alternatives are not automatically feasible alternatives. | confirmed |
| 3 | Mandatory constraints differ from enhancing criteria. | confirmed |
| 4 | Alternative, state/scenario, and outcome are separate roles. | confirmed |
| 5 | Criteria require operational definitions and direction. | confirmed |
| 6 | Unlike criteria need a declared comparison or normalization contract. | confirmed |
| 7 | Evidence qualifies assumptions and estimated performance. | confirmed |
| 8 | Uncertainty may leave alternatives closely ranked or unresolved. | confirmed |
| 9 | Recommendation and final selection are separate records. | confirmed |
| 10 | A score does not by itself establish a preferred option. | confirmed |

Summary: 6 of 6 claims and 10 findings confirmed. The sources support a
reusable choice contract, not one universal decision method.

## Amendments

1. Give alternative selection a canonical owner separate from policy-rule
   adjudication.
2. Preserve alternatives, feasibility, states, outcomes, evidence,
   uncertainty, criteria, preference, recommendation, and final selection as
   distinct roles.
3. Keep candidate cross-entry relations neutral, qualified, independently
   checked, and non-scoring.
