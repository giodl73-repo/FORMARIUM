# Rust Access-Control Evaluation Guide

Guide ID: `rust-access-control-evaluation`

Status: candidate Factor Guide

Review: fixed point at
`context/waves/2026-08-13-factorium-vision/RUST-ACCESS-CONTROL-GUIDE-ROLE-REVIEW.md`

## Local problem and decision

Design the authorization evaluation boundary for a Rust multi-tenant document
service.

The service supports human and workload subjects, workspace-scoped documents,
and `view`, `edit`, `share`, and `delete` actions. The guide must choose how
request facts, policy, decision, and enforcement are represented without
reducing authorization to one role enum or one Boolean.

Intended reader: service architect or Rust implementer preparing a reviewed
design.

## Scope

Local evidence supplied for this guide:

- every document belongs to exactly one workspace tenant;
- a subject may be a human account or service workload;
- tenant membership and document relationship affect authorization;
- `share` and `delete` require stronger authentication assurance than `view`;
- policy is versioned and can change without changing request facts;
- HTTP handlers and background jobs can both mutate documents;
- enforcement must cover every mutation path;
- missing membership, assurance, or policy facts must not default to allow.

Non-goals:

- authentication protocol selection;
- cryptographic token validation;
- database schema implementation;
- distributed policy-cache consistency;
- legal or regulatory authorization requirements;
- executable Rust code.

## Canonical trace

| Guide concern | Canonical source |
|---|---|
| Complete request shape | [`access-control-request`](../tables/composites/access-control-request.md) |
| Policy, decision, exception, enforcement | [`policy-rule-constraint-decision-exception`](../tables/entries/policy-rule-constraint-decision-exception.md) |
| Decision precedence and missing facts | [`decision-policy-decision`](../tables/decisions/policy-decision.md) |
| Version, evidence, authority, enforcement, audit | [`constraint-policy-constraints`](../tables/constraints/policy-constraints.md) |
| Rust mechanism candidates | [`mapping-factor-role-mechanisms`](../tables/mappings/factor-role-mechanisms.md) |
| State and event distinction | [`state-event-transition-process-lifecycle`](../tables/entries/state-event-transition-process-lifecycle.md) |

## Narrowing record

| Alternative | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|
| Minimal subject-action-object tuple | Access-control request alternative view | Relationship, assurance, context, policy version, and enforcement all affect the case | rejected | Too narrow for the supplied facts |
| Attribute-oriented evaluation | Access-control request alternative view | Subject, object, action, and context facts feed policy | selected | Fits the decision input but must retain stable identities and relationship records |
| Role-only RBAC check | Policy and relationship entries | Membership and document relationship matter; assurance varies by action | rejected | A role enum cannot own all request semantics |
| Continuous zero-trust request | Access-control request alternative view | No device posture or session-risk requirement was supplied | not-applicable | Would introduce unsupported factors |
| Boolean allow/deny output | Policy Decision Table | Missing facts and audit reasons are required | rejected | Hides `needs-information`, rule identity, and enforcement action |
| Derived structured decision | Policy Decision Table | Policy version, reason, evaluator, and required enforcement are required | selected | Preserves output provenance and failure states |

## Selected factorization

```text
authorization-request
  := subject-identity
   x authentication-assurance
   x requested-action
   x protected-object
   x subject-object-relationship
   x authorization-policy
   x request-context
   x enforcement-point

authorization-decision = evaluate(authorization-request, policy-version)
```

## Rust role and mechanism assignment

| Factor | Role in this guide | Candidate Rust mechanism | Mapping condition | Local validation |
|---|---|---|---|---|
| `subject-identity` | relationship participant and identity reference | `SubjectId` newtype plus `SubjectKind` enum | Identity and closed local subject kinds are separate | Human and workload IDs cannot be confused |
| `authentication-assurance` | context and constraint input | explicit assurance enum/value in request facts | Current evidence affects high-risk actions without changing subject identity | `share` and `delete` reject insufficient assurance |
| `requested-action` | closed variant | `Action` enum | The service owns a bounded action vocabulary | Exhaustive match covers all admitted actions |
| `protected-object` | pivot | `DocumentId` newtype and loaded document facts | Document identity organizes policy and relationship lookup | Tenant and object IDs are both checked |
| `subject-object-relationship` | relationship | explicit membership/ownership relation value loaded from authority | Connection is not object ownership in Rust | Missing or stale relationship returns `needs-information` or deny |
| `authorization-policy` | policy | immutable `PolicyVersion` plus evaluator function/trait boundary | Rules change independently of request facts | Decision records exact policy version |
| `request-context` | context | explicit `RequestContext` struct | Circumstance is passed, not read from hidden globals | Tests can vary tenant, time, and assurance independently |
| `enforcement-point` | boundary and mechanism | private authorization module API used by HTTP and job mutation adapters | Every mutation path crosses the same checked boundary | Integration inventory covers both path families |
| `authorization-decision` | derived view | result enum/struct with `permit`, `deny`, `needs-information`, reasons, policy version, and required action | Output is computed and auditable | Decision is never accepted as an input fact |

The mechanisms are candidates, not generated code. A trait is not the policy,
an enum is not the complete domain model, and module privacy does not prove
that every runtime path is enforced.

## Required controls

- Constructors or loaders validate tenant/document consistency.
- Missing required facts produce `needs-information` or deny according to
  explicit policy; they never become permissive defaults.
- Policy versions are immutable after use.
- The decision records subject, object, action, evidence references, policy
  version, evaluator, time, and required enforcement action.
- Enforcement success is recorded separately from decision success.
- Exceptions require authority, scope, controls, and expiry.
- Background mutation paths cannot bypass the authorization module.
- Caches retain policy and relationship freshness semantics.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| A document moves to another workspace | protected-object tenant facts and relationship lookup change | subject identity and action vocabulary |
| `share` begins requiring stronger assurance | policy and resulting decision change | document identity and membership evidence |
| A workload subject is introduced | subject variant and applicable policy rows expand | object, action, and enforcement semantics |
| HTTP enforcement exists but a background job bypasses it | guide fails boundary validation | policy decision logic may still be correct |
| Membership fact is missing | output becomes `needs-information` or deny | missing must not become a default role |
| Device posture becomes a policy input | zero-trust/context alternative becomes a retained option | existing stable identities |

## Rejected shortcuts

- one `Role` enum as the entire authorization request;
- inheritance-shaped subject or object hierarchies without independent
  variation evidence;
- `bool` decisions;
- policy rules embedded separately in every handler;
- global ambient request context;
- treating compile-time visibility as runtime authorization;
- marking a request complete before enforcement evidence exists.

## Unresolved choices

- policy language and evaluator implementation;
- relationship source and freshness contract;
- exception storage and approval workflow;
- cache invalidation and cross-service enforcement evidence;
- audit retention period.

These are local design decisions, not guessed canonical joins.

## Sources

1. NIST SP 800-162 Rev. 2, *Guide to Attribute Based Access Control*:
   https://csrc.nist.gov/pubs/sp/800/162/upd2/final
2. The Rust Reference:
   https://doc.rust-lang.org/reference/
3. Factorium canonical sources listed in the trace table.
