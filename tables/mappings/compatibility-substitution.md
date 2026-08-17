# Compatibility, Conflict, Substitution, and Interchangeability Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Operational Resource, Capacity, Demand, and Allocation](../entries/operational-resource-capacity-demand.md)

Canonical senses: `operational-resource`, `capacity`, `demand`, `shortage`

## Governing question

Can one resource, component, service, input, or option coexist with or replace
another for this exact use, in which direction, and with what loss?

## Mapping table

| Claim | Required test | Does not imply |
|---|---|---|
| compatible | subjects can interact/coexist under exact interface, environment, version, quantity, and policy conditions | identity, equivalence, substitution, or absence of all conflict |
| conflicting | one or more declared requirements, states, uses, interfaces, or allocations cannot jointly hold | global incompatibility outside scope |
| substitute | target can fulfill a declared source role/use under stated conditions and losses | symmetric replacement or identical outcome |
| interchangeable | each can replace the other for a declared use over a domain with acceptable loss | universal equivalence |
| equivalent-for-purpose | declared relevant properties/results agree within criteria for one purpose | same identity, provenance, mechanism, or every property |

## Substitution contract

```text
substitution
  := source and target identities/versions
   x exact role, function, requirement, or use
   x mapping direction and cardinality
   x interface, quantity, unit/scale, quality, location, and timing
   x operating conditions, dependencies, authority, and constraints
   x retained properties, changed behavior, side effects, and loss
   x capacity/availability, transition cost, reversibility, and residual
   x evidence, test, uncertainty, inverse limits, and invalid cases
```

## Constraints

- Compatibility, substitution, interchangeability, and equivalence are
  separately supported claims.
- Substitution may be directional, partial, conditional, quantity-limited,
  time-limited, or irreversible.
- Matching interface shape does not establish semantic, physical, safety,
  legal, performance, or authority compatibility.
- A substitute closes shortage only for the exact compatible quantity,
  quality, location, time, and use.
- Named standards, versions, products, materials, qualifications, and
  compatibility catalogs remain external authorities.

## Sources and provenance

See the canonical entry, System Interface/Dependency, Version Compatibility,
Unit Conversion, and Projection/Basis Mapping owners. This view preserves
direction and loss; it does not certify domain compatibility.
