# Access Authorization Integrity Constraint Table

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword: [Access, Permission, Authorization, and Entitlement](../entries/access-permission-authorization-entitlement.md)

Canonical senses: `access`, `permission`, `authorization-decision`,
`entitlement`, `access-control`

## Governing question

Which invariants must hold for an access decision and its enforcement record to
remain interpretable and reviewable?

## Constraints

| ID | Requirement | Invalid when | Evidence to retain |
|---|---|---|---|
| `AA-01` | bind exact subject/session, operation, resource, and context | request identity is partial or mutable | canonical request record |
| `AA-02` | bind policy authority, version, applicable permissions/entitlements, and facts | decision cannot be reconstructed | decision trace and source versions |
| `AA-03` | distinguish authentication evidence from authorization result | login success implies access | evidence and separate decision |
| `AA-04` | fail according to explicit missing/indeterminate policy | missing facts become implicit allow | indeterminate reason and handling |
| `AA-05` | bind enforcement action to decision and point | allow/deny result differs silently from behavior | enforcement telemetry and correlation |
| `AA-06` | apply expiry, revocation, and context changes within stated propagation bounds | stale grant remains active beyond contract | grant lifecycle and propagation evidence |
| `AA-07` | constrain delegated administration and privilege escalation | grantor exceeds authority | authority and delegation chain |
| `AA-08` | retain privacy-minimized review evidence | logs are absent, excessive, or unverifiable | protected audit record and retention rule |

## Failure signs

- user, role, group, permission, and entitlement share one field;
- deny and system error are indistinguishable;
- cached decisions have no invalidation contract;
- resource aliases bypass the policy boundary;
- audit evidence cannot link request, decision, and enforcement.

## Sources and provenance

See the canonical entry. These constraints do not certify an access-control
system, prescribe one model, or authorize access.
