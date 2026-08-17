# Access, Permission, Authorization, and Entitlement

Status: candidate anchor entry

## Orientation

Access is an attempted or realized interaction with a protected subject.
Permission is an allowed subject-operation-resource relation under a policy.
Authorization is the decision that a request may proceed in its current
context. An entitlement is a governed grant or assignment from which
permissions or eligibility may be derived. Authentication evidence and
organizational authority can inform the decision but do not equal it.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `access` | Which subject attempted or performed which operation on which resource under what context? | interaction event or capability use |
| `permission` | Which operation on which resource is allowed for which subject/role under which conditions? | policy-governed allow relation |
| `authorization-decision` | Is this exact request allowed, denied, or unresolved under the applicable policy and facts? | request-time decision |
| `entitlement` | Which rights, permissions, benefits, or eligibility have been granted to a subject from which source and until when? | governed grant/assignment |
| `access-control` | Which policy and enforcement arrangement mediates attempted access? | decision-and-enforcement system |

## Request structure

```text
authenticated or otherwise identified subject
  + requested operation and protected resource
  + environment, purpose, session, and relevant attributes
  + applicable policy, permissions, entitlements, and constraints
  -> authorization decision
  -> enforcement action
  -> access event and audit evidence
```

## Root factorization

```text
access-use
  := subject identity, authentication evidence, and session
   x resource identity, boundary, owner, and classification
   x operation, parameters, effect, and requested purpose
   x permission relation and entitlement source
   x policy, authority, precedence, and version
   x environmental attributes, time, location, device, and risk
   x decision, reason, obligations, and unresolved facts
   x enforcement point, failure behavior, revocation, and propagation
   x event, provenance, review, and privacy limits
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Authentication vs. authorization | identity evidence can inform decision | evidence about claimant/credential vs. permission for a request |
| Permission vs. authorization | permission can support authorization | standing relation/rule vs. contextual decision instance |
| Entitlement vs. permission | entitlement may grant permissions | governed assignment package/right vs. allowed operation relation |
| Authority vs. permission | authority may justify granting | organizational decision right vs. technical/policy allow relation |
| Decision vs. enforcement | enforcement acts on decision | semantic result vs. mechanism that permits/blocks action |
| Denial vs. failure | both prevent access | policy result vs. mechanism or availability defect |

## Specialized view

[Access Authorization Integrity Constraint Table](../constraints/access-authorization-integrity.md)
defines fail-able invariants across request, decision, enforcement, and review.

## Selection procedure

1. Identify subject, resource, operation, boundary, and requested context.
2. Separate identity/authentication evidence from permissions and entitlement.
3. Resolve applicable policy authority, version, precedence, and missing facts.
4. Produce allow, deny, or unresolved with reasons and obligations.
5. Enforce at named points with fail behavior and propagation semantics.
6. Record access event, decision, versions, enforcement result, and review path.
7. Re-evaluate on expiry, revocation, role/attribute change, or context change.

## Constraints and failure signs

- Authentication success does not imply authorization.
- Permissions include subject/role, operation, resource, conditions, and source.
- Entitlements include grantor, authority, scope, issue/expiry, and revocation.
- Missing policy or facts do not silently become allow.
- Decision and enforcement results are separately observable.
- Denial messages and logs disclose no more than policy allows.
- Named access-control models, products, roles, and privileges remain examples.

## Cross-references

- [Identity, Namespace, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Organization, Position, Role, Competency, Responsibility, Authority, and Accountability](organization-role-authority.md)
- [Policy, Rule, Constraint, Decision, Review, Appeal, and Exception](policy-rule-constraint-decision-exception.md)
- [Software Module, Service, and Resource](software-module-service-resource.md)
- [Authentication Assurance](../primes/authentication-assurance.md)

## Sources and provenance

1. NIST IR 7316, *Assessment of Access Control Systems*:
   https://doi.org/10.6028/NIST.IR.7316
2. NIST SP 800-63C-4 Glossary:
   https://pages.nist.gov/800-63-4/sp800-63c/glossary/
3. NIST, Role Based Access Control FAQ:
   https://csrc.nist.gov/projects/role-based-access-control/faqs

Comparator access date: 2026-08-16. Security, privacy, legal, and organizational
authorities retain their scopes; this cross-domain entry remains `candidate`.
