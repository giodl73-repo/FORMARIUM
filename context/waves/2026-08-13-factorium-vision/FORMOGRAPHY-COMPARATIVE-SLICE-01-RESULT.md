# Formography Comparative Slice 01 Result

Date: 2026-08-18
Status: first case validated; field claim remains blocked

## Result

The same Access Authorization source case was encoded as:

1. a conventional concept map;
2. a generic scoped property graph;
3. a candidate formograph.

Across ten predeclared features:

| Encoding | Features retained | Features required by profile |
|---|---:|---:|
| Concept map | 4/10 | 3/10 |
| Scoped property graph | 10/10 | 1/10 |
| Candidate formograph | 10/10 | 10/10 |

The property graph preserved the full information. Therefore this slice
**disproves** the claim that Formography is a distinct graph representation
needed to encode the proposed objects.

The narrowed surviving claim is:

> Formography may be a governed, representation-compatible method profile
> whose contribution is required source, boundary, relation, alternative,
> unresolved-state, and projection-loss custody.

The formograph validator rejects an otherwise structured fixture when its
reader projection does not declare omitted content:

```text
FG-PROJECTION-LOSS-MISSING: projections[0].omitted
```

## Verdict

`SURVIVES_AS_GOVERNED_METHOD_PROFILE_NOT_DISTINCT_GRAPH_REPRESENTATION`

This is stronger than a vocabulary result but weaker than representation
novelty. It leaves open whether the method profile is sufficiently coherent,
repeatable, and useful to warrant a field name.

## Deletion and migration mapping

Deleted:

- the claim that ordinary graphs cannot encode Formography's information;
- any implication that `formograph-v0` should replace Factorium interchange;
- any unique-visualization claim.

Retained:

- canonical Factorium authority and assurance;
- property-graph compatibility;
- fail-closed source, relation, boundary, unresolved-state, and projection-loss
  requirements as the candidate method contribution.

## Next gate

Repeat the frozen comparison with:

1. one physical or quantitative case;
2. one evaluative or interpretive case.

Then give the three cases to independent coders. Pivot if a plain
`governed property graph` description is equally precise and cheaper to teach.
