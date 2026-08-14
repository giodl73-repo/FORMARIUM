# Work Prioritization

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
pilot graph review.

Work prioritization chooses which action should receive scarce attention or
capacity. Priority is a derived decision under a policy; it should not erase
the underlying value, urgency, cost, dependency, and uncertainty factors.

## Sense `portfolio-ordering`

**Tagline:** Compare candidate work under an explicit decision policy.

```text
work-candidate
  := beneficiary
   x desired-outcome
   x expected-impact
   x urgency
   x confidence
   x effort
   x dependency-state
   x delivery-risk
   x reversibility

priority = rank(work-candidate, portfolio-policy)
```

| Lens | Pivot | Factor emphasis | Use when | Watch for |
|---|---|---|---|---|
| Outcome-first | desired outcome | beneficiary, impact, confidence | Strategy defines measurable outcomes | Outcomes are vague restatements of projects |
| Urgency-first | deadline or decay | time sensitivity, obligation, consequence | Delay changes value materially | Every stakeholder declares maximum urgency |
| Flow-first | dependency state | unblock value, queue age, batch size | System throughput matters | Local flow displaces strategic importance |
| Risk-first | exposure reduction | probability, impact, reversibility | Safety, security, or compliance dominates | Speculative risks crowd out observed needs |
| Effort/value | ratio or frontier | impact, confidence, effort | Rough portfolio shaping | False precision and gaming of estimates |

### Constraints

- Impact and confidence should remain separate.
- Urgency describes value decay or deadline effects, not stakeholder volume.
- Dependencies can make sequencing useful without making the dependency itself
  more valuable.
- Reversibility changes the cost of learning and error.
- Veto obligations should be explicit rather than hidden inside a weighted
  score.

### Failure signs

- Priority is stored as an unexplained integer.
- A score changes while the underlying facts remain invisible.
- Effort estimates dominate because they are easier to quantify than value.
- Every criterion is normalized into one number despite non-compensable rules.

### Cross-references

- decision policy
- impact
- sequencing
- urgency
- value

### Maturity

`candidate` — ready for comparison with established portfolio and product
prioritization methods.
