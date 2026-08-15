# Policy, Rule, Constraint, Decision, and Exception

Status: candidate anchor entry

## Orientation

Policy states governing intent; rules operationalize conditions and outputs or
actions; constraints define valid, required, or forbidden situations;
decisions derive conclusions from inputs and governing logic; exceptions are
authorized, bounded deviations. Mixing them causes policy prose, validation,
choice, enforcement, and override records to compete for one field.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `policy` | What intent, obligation, or governing direction applies? | authoritative guidance or mandate |
| `rule` | When these conditions hold, what result or action follows? | operational condition-output binding |
| `constraint` | What combinations are valid, required, forbidden, or invariant? | validity boundary |
| `decision` | Which conclusion or action is derived for this case? | evaluated output |
| `exception` | Which approved deviation applies, by whose authority, and until when? | bounded override record |
| `enforcement` | Where and how is the governing result made effective? | implementation and control mechanism |

## Role ladder

```text
governing intent and authority
  -- operationalized as --> rules and constraints

case facts
  + applicable versioned rules
  -- evaluate --> decision

decision
  -- assigned to mechanism --> enforcement action

approved deviation
  -- bounded by scope, authority, controls, and expiry --> exception
```

## Root factorization

```text
policy-decision-use
  := governed subject and case
   x policy owner and authority
   x policy version and effective period
   x facts and evidence
   x rule conditions, priority, and outputs
   x constraints and invariants
   x decision procedure and result
   x enforcement point and action
   x exception scope, approver, reason, controls, and expiry
   x audit, appeal, and review
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Policy vs. rule | rules implement policy | governing intent vs. executable/evaluable condition-output logic |
| Rule vs. constraint | both restrict behavior | selected output/action vs. valid/invalid boundary |
| Rule vs. decision | decision follows rules | reusable logic vs. case-specific evaluated result |
| Decision vs. enforcement | decision may authorize action | conclusion vs. mechanism that makes it effective |
| Exception vs. rule change | both alter ordinary outcome | bounded approved deviation vs. new governing logic |
| Exception vs. violation | both depart from ordinary policy | authorized deviation vs. noncompliance |

## Diagnostic examples

- "Retain records as required by law" is policy intent, not an executable
  retention rule.
- A rule may derive `retain-until = trigger + duration`; the derived date is
  the decision output, not another input.
- A constraint can forbid deletion during legal hold without selecting the
  final retention date.
- An access decision can be correct while enforcement fails at the control
  point.
- A temporary exception with no expiry quietly becomes undocumented policy.
- Adding a special-case rule to hide a data-quality problem is not a governed
  exception.

## Specialized views

- [Policy Decision Table](../decisions/policy-decision.md) owns case-to-output
  selection.
- [Policy Constraint Table](../constraints/policy-constraints.md) owns
  validity, prohibition, and invariants.

## Selection procedure

1. Identify governed subject, authority, policy owner, version, and effective
   period.
2. Separate intent statements from evaluable rules.
3. Define case inputs, evidence, missing/unknown handling, and precedence.
4. Put allowed, forbidden, required, and invariant cases in constraints.
5. Derive one decision output without recounting it as an input.
6. Assign enforcement to a visible mechanism and owner.
7. Record exceptions with scope, authority, reason, controls, expiry, and
   review.
8. Preserve audit, appeal, supersession, and rollback paths.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines policy, rule, constraint, decision, exception, and enforcement | Places intent, logic, validity, output, deviation, and mechanism roles together |
| Thesaurus | Links governance, requirement, law, choice, exemption, and control | Prevents lexical proximity from erasing authority and evaluation roles |
| Encyclopedia or standard | Explains policy systems, decision models, and controls | Supplies a compact case, version, priority, exception, and audit contract |
| Rule engine or policy language | Executes one representation | Separates executable mechanism from canonical policy meaning |
| Factorium | Links Decision and Constraint views to one policy anchor | Keeps derived outputs, enforcement, and exceptions independently reviewable |

## Constraints and failure signs

- Policy owner, authority, version, and effective period are visible.
- Rules declare inputs, missing/unknown handling, conditions, outputs, and
  priority.
- Constraints own validity rather than hiding inside prose.
- Decisions record the exact facts and rule version used.
- Derived outputs are not duplicated as independent inputs.
- Enforcement owner and failure behavior are visible.
- Exceptions require approver authority, bounded scope, reason, controls,
  expiry, and review.
- A violation is not relabeled as an exception after the fact.
- Rule changes supersede versions rather than rewriting history.

## Cross-references

- [Data Retention](../examples/data-retention.md)
- [Incident Severity](../examples/incident-severity.md)
- [Work Prioritization](../examples/work-prioritization.md)
- [Policy](../roles/policy.md)
- [Constraint](../roots/constraint.md)
- [Purpose](../roots/purpose.md)
- [Governance, Obligation, and Compliance](governance-obligation-compliance.md)
- [Governance and Compliance Mechanisms](../mappings/governance-compliance-mechanisms.md)
- Enforcement point is owned by the `enforcement` sense above.
- appeal - `unresolved-candidate`

## Sources and provenance

1. RFC 3198, *Terminology for Policy-Based Management*:
   https://www.rfc-editor.org/rfc/rfc3198
2. OMG, *Decision Model and Notation 1.5*:
   https://www.omg.org/spec/DMN/1.5/About-DMN

Comparator access date: 2026-08-14. Standards remain domain-scoped;
Factorium organization remains `candidate`.
