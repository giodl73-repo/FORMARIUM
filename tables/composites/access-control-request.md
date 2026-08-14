# Access-Control Request

**Resolution status:** The eight primary factors resolve canonically. Unlinked
terms in alternative views and relations are `unresolved-candidate`.

**Tagline:** The complete input considered when deciding whether an attempted
operation should be permitted.

## Eight-factor view

```text
access-control-request
  := subject-identity
   x authentication-assurance
   x requested-action
   x protected-object
   x subject-object-relationship
   x authorization-policy
   x request-context
   x enforcement-point

access-decision = evaluate(access-control-request)
```

| Factor entry | Role in this view | Characteristic question |
|---|---|---|
| [subject identity](../primes/subject-identity.md) | subject reference | Who is acting? |
| [authentication assurance](../primes/authentication-assurance.md) | evidence quality | How strongly was the claim established? |
| [requested action](../primes/requested-action.md) | operation | What is being attempted? |
| [protected object](../primes/protected-object.md) | pivot candidate | What is being acted upon? |
| [subject-object relationship](../primes/subject-object-relationship.md) | relationship | How are subject and object connected? |
| [authorization policy](../primes/authorization-policy.md) | policy | Which rules derive the decision? |
| [request context](../primes/request-context.md) | context | Which situational facts affect evaluation? |
| [enforcement point](../primes/enforcement-point.md) | boundary/mechanism | Where and how will the decision be applied? |

This is one composite level with eight factors. Opening any factor follows a
graph edge into another entry; it does not create a universal fixed-depth
hierarchy.

## Constraints

- Object type constrains meaningful actions.
- Authentication assurance may constrain high-risk actions.
- Policy authority must cover the protected object.
- Relationship validity and context require freshness rules.
- Enforcement must cover the actual operation path.
- The access decision is derived rather than independently selected.

## Alternative views

| Lens | Alternative factorization | Use when | Watch for |
|---|---|---|---|
| Minimal authorization tuple | subject x action x object | Explaining the irreducible request shape | Hiding policy, context, evidence, and enforcement assumptions |
| Policy evaluation | subject-attributes x object-attributes x action x environment x policy-set | Attribute-oriented policy engines | Losing stable identity and relationship semantics |
| Zero-trust request | identity x device x workload x resource x session-risk x policy x enforcement | Continuous adaptive access | Treating a marketing architecture as one universal model |

## Relations

- `BROADER-THAN`: individual policy-engine request formats
- `NARROWER-THAN`: security/access-control
- `DERIVED-FROM`: access decision
- `RELATED-TO`: audit event, authentication event, capability invocation

## Maturity

`candidate` — ready for source review and comparison with established access
control models.
