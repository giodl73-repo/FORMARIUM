# Incident Severity

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
pilot graph review.

Incident severity is a derived classification, not one directly observed
property. Different organizations emphasize service impact, safety, security,
contractual exposure, or operational urgency.

## Sense `service-incident-assessment`

**Tagline:** Describe the consequences and response conditions of an
operational disruption.

```text
incident-assessment
  := affected-population
   x functional-impact
   x duration
   x geographic-scope
   x data-or-security-exposure
   x recoverability
   x contractual-or-regulatory-exposure
   x response-urgency

severity = classify(incident-assessment, severity-policy)
```

| Lens | Pivot | Factor emphasis | Use when | Watch for |
|---|---|---|---|---|
| Customer-impact | affected population | reach, lost function, duration | Service restoration is the principal objective | Internal catastrophic failures with few current users |
| Safety/security | exposure | harm, confidentiality, integrity, exploitability | Security or safety consequences dominate | Combining uncertain risk and confirmed impact |
| Contractual | obligation | SLA, regulated process, reporting deadline | External commitments determine escalation | Treating every contract breach as equal harm |
| Recovery | recoverability | workaround, restoration path, data repair | Operational effort and reversibility matter | Confusing difficult recovery with broad impact |

### Constraints

- Urgency and severity are related but not identical.
- A short incident may still create irreversible exposure.
- A workaround may reduce functional impact without removing security risk.
- Geographic scope and affected population may overlap and require a declared
  counting rule.
- Severity policy is versioned; changing thresholds changes the derived label,
  not the underlying incident facts.

### Failure signs

- One adjective such as `critical` encodes impact, urgency, and ownership.
- Severity changes when the responding team changes.
- Teams debate labels without exposing the underlying factors.
- A numeric score hides a veto condition such as safety or legal reporting.

### Cross-references

- impact
- priority
- recoverability
- risk
- urgency

### Maturity

`candidate` — ready for comparison with operational, safety, and security
incident frameworks.
