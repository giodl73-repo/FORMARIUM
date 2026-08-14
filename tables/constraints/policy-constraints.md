# Policy Constraint Table

Status: candidate Constraint Table

Canonical headword:
[Policy, Rule, Constraint, Decision, and Exception](../entries/policy-rule-constraint-decision-exception.md)

Primary family: Constraint Table

Purpose: make policy validity and exception invariants directly discoverable
without embedding them in one decision procedure.

## Constraint pattern

| Constraint | Required condition | Invalid condition | Failure treatment |
|---|---|---|---|
| Version custody | every decision references one immutable policy version | mutable or missing rule version | reject evaluation |
| Evidence completeness | every required fact is present or explicitly unknown | silent null/default | return `needs-information` |
| Authority | policy and exception approvers possess scoped authority | self-approval or out-of-scope approval | reject decision/exception |
| Exception boundedness | scope, reason, controls, start, expiry, and review exist | permanent or unowned waiver | treat as invalid exception |
| Derived-output separation | decisions are outputs, not source facts | decision copied into its own input set | reject circular evaluation |
| Enforcement visibility | required action has owner and observable result | decision marked complete without enforcement evidence | report unenforced decision |
| Audit retention | facts, rules, output, actor, and time remain reconstructable | overwritten history | fail auditability gate |

## Scope

This table defines reusable integrity constraints for policy evaluation. It
does not determine the substantive policy outcome and does not replace
domain-specific legal, safety, security, or operational constraints.

## Sources and provenance

1. RFC 3198:
   https://www.rfc-editor.org/rfc/rfc3198
2. OMG DMN 1.5:
   https://www.omg.org/spec/DMN/1.5/About-DMN

Constraint organization is a candidate Factorium pattern.

