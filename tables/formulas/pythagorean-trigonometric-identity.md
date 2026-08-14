# Pythagorean Trigonometric Identity

Status: candidate Formula Table

## Orientation

The Pythagorean trigonometric identity states a relation that holds for every
real angle under the standard sine and cosine definitions. It is an identity,
not an empirical law and not an equation that selects particular solutions.

## Relation

| Field | Value |
|---|---|
| Sense | sine-cosine unit-circle identity |
| Relation kind | Identity |
| Canonical expression | `sin(theta)^2 + cos(theta)^2 = 1` |
| Relation authority | established mathematical identity |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Mathematical kind | Unit | Domain | Role |
|---|---|---|---|---|---|
| `theta` | angle parameter | real scalar | radian or another declared angle unit | real numbers | input |
| `sin(theta)` | sine of the angle | real scalar | dimensionless | `[-1, 1]` | function value |
| `cos(theta)` | cosine of the angle | real scalar | dimensionless | `[-1, 1]` | function value |

Angle, sine, and cosine remain `unresolved-candidate` Factorium headwords.

## Scope and assumptions

- Sine and cosine use one consistent angle convention.
- The canonical identity applies for every real `theta`.
- Trigonometric function values are dimensionless.
- A unit-circle interpretation uses coordinates
  `(cos(theta), sin(theta))`.
- Extensions to complex arguments require a narrower entry with its own
  function definitions and domain.

## Equivalent and derived forms

| Form | Relationship | Restriction |
|---|---|---|
| `1 - sin(theta)^2 = cos(theta)^2` | algebraic rearrangement | none beyond the canonical domain |
| `1 + tan(theta)^2 = sec(theta)^2` | derived identity | `cos(theta) != 0` |
| `cot(theta)^2 + 1 = csc(theta)^2` | derived identity | `sin(theta) != 0` |

The denominator restrictions arise when dividing the canonical identity.

## Dimensional audit

```text
[sin(theta)^2] = 1
[cos(theta)^2] = 1
[1]            = 1
```

All terms are dimensionless.

## Conceptual Factor Table

```text
identity-use
  := angle domain
   x sine definition
   x cosine definition
   x unit-circle relation
   x algebraic transformation
   ! denominator restrictions
```

## Failure signs

- The identity is checked only at one angle and treated as empirical evidence.
- Degrees and radians are mixed inside numerical evaluation.
- A derived tangent or cotangent identity is used where its denominator is
  zero.
- Squared functions are confused with doubled angles.
- The real-domain identity is extended to another function definition without
  review.

## Cross-references

- [Constraint](../roots/constraint.md)
- [Identity](../roots/identity.md)
- [Measure](../roots/measure.md)
- angle — `unresolved-candidate`
- unit circle — `unresolved-candidate`

## Sources and provenance

1. OpenStax, *Precalculus 2e*, section 7.1:
   https://openstax.org/books/precalculus-2e/pages/7-1-simplifying-and-verifying-trigonometric-identities

Formula authority: established identity. Factorium representation remains a
candidate pending mathematics and practitioner review.

