# Policy

Status: candidate

## Sense: replaceable governing rule

A policy is a factor that selects, classifies, permits, prioritizes, or
otherwise governs an outcome from supplied facts.

`decision = evaluate(facts, policy) @ context`

Policies should be explicit and versioned when changing them can change the
result without changing the source facts. A policy may contain constraints,
but a preference rule is not automatically an absolute constraint.

Related: [Constraint](../roots/constraint.md),
[Authorization policy](../primes/authorization-policy.md).

