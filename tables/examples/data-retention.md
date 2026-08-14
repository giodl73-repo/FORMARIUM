# Data Retention

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
pilot graph review.

Data retention determines how long information remains available and what
event starts, pauses, or ends that period. A single duration attached to a
database table usually hides several governing factors.

## Sense `retention-policy-decision`

**Tagline:** Derive an enforceable retention obligation for a class of data.

```text
retention-case
  := data-category
   x jurisdiction
   x processing-purpose
   x subject-or-record-relationship
   x lifecycle-trigger
   x legal-hold-state
   x contractual-obligation
   x deletion-capability

retention-obligation = evaluate(retention-case, policy-version)
```

| Lens | Pivot | Factor emphasis | Use when | Watch for |
|---|---|---|---|---|
| Record-class | data category | record type, sensitivity, evidentiary value | Governance is organized around record schedules | One record contains fields with different obligations |
| Purpose-first | processing purpose | consent, use, completion trigger | Purpose limitation determines continued storage | Purposes are vague or multiply inherited |
| Subject-first | person or account relationship | active, former, applicant, customer | Lifecycle of the relationship starts the clock | Shared records concern several subjects |
| Event-first | lifecycle trigger | creation, closure, settlement, expiry | The trigger is legally or operationally decisive | Trigger events are missing or mutable |
| System-first | deletion capability | backup, archive, legal hold, propagation | Execution feasibility must be planned | Technical limits are treated as legal justification |

### Constraints

- Legal hold suspends disposal without replacing the original obligation.
- Jurisdiction and contractual obligation may impose competing minimums and
  maximums.
- One physical object may contain several logical data categories.
- Backup expiration and primary-record deletion are distinct enforcement
  events.
- The final date is derived from policy and trigger facts; it is not an
  independent descriptive factor.

### Failure signs

- Every table receives one unexplained number of days.
- “Keep forever” substitutes for missing classification.
- Policy text has no corresponding lifecycle trigger or deletion mechanism.
- A legal hold becomes a permanent untracked state.

### Cross-references

- data category
- lifecycle trigger
- policy
- purpose
- jurisdiction

### Maturity

`candidate` — requires legal and records-management source review before any
normative use.
