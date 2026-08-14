# Policy Decision Table

Status: candidate Decision Table

Canonical headword:
[Policy, Rule, Constraint, Decision, and Exception](../entries/policy-rule-constraint-decision-exception.md)

Primary family: Decision Table

Purpose: select a case outcome from versioned policy facts while preserving
missing information, precedence, and exception handling.

## Decision pattern

| Rule priority | Applicable policy? | Required facts complete? | Blocking constraint? | Valid exception? | Decision output |
|---:|---|---|---|---|---|
| 1 | no | any | any | any | `not-applicable` |
| 2 | yes | no | unknown | any | `needs-information` |
| 3 | yes | yes | yes | no | `deny-or-block` |
| 4 | yes | yes | yes | yes | `allow-with-exception-controls` |
| 5 | yes | yes | no | any | `evaluate-substantive-rules` |

## Input contract

- governed case and subject;
- policy identifier, version, authority, and effective date;
- evidence-backed facts;
- explicit missing and unknown values;
- applicable constraints;
- exception record with approver, scope, controls, and expiry.

## Output contract

The output is derived. It records:

- decision;
- rule identifiers and version;
- facts/evidence used;
- timestamp and evaluator;
- required enforcement action;
- review or appeal path.

## Failure signs

- Missing facts default to approval.
- Rule order is accidental document order.
- Exception presence bypasses scope or expiry checks.
- Decision output is fed back as if it were an original fact.
- Enforcement success is assumed from decision success.

## Sources and provenance

1. RFC 3198:
   https://www.rfc-editor.org/rfc/rfc3198
2. OMG DMN 1.5:
   https://www.omg.org/spec/DMN/1.5/About-DMN

Decision logic is an illustrative Factorium pattern, not a universal policy.
Maturity remains `candidate`.

