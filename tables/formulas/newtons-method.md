# Newton's Method

Status: candidate Formula Table

## Orientation

Newton's method iteratively approximates a root of a differentiable function
by intersecting the tangent at the current estimate with the horizontal axis.
Its familiar fast convergence is local and conditional, not guaranteed from
every starting value.

## Relation

| Field | Value |
|---|---|
| Sense | scalar root-finding iteration |
| Relation kind | Algorithm or recurrence |
| Canonical expression | `x_(k+1) = x_k - f(x_k) / f'(x_k)` |
| Relation authority | established numerical method |
| Factorium entry maturity | `candidate` |

## Symbol contract

| Symbol | Concept | Mathematical kind | Domain | Role |
|---|---|---|---|---|
| `f` | target function | differentiable function | real domain to real codomain in this entry | input |
| `f'` | derivative of `f` | function | defined near relevant iterates | operator input |
| `x_k` | current approximation | real scalar | domain of `f` and `f'` | state |
| `k` | iteration index | nonnegative integer | `0, 1, ...` | index |
| `x_(k+1)` | next approximation | real scalar | computed candidate | derived state |

Function, derivative, root, and convergence remain `unresolved-candidate`
Factorium headwords.

## Scope and assumptions

- This entry covers scalar real root finding for `f(x) = 0`.
- `f'(x_k)` must exist and be nonzero at every executed iteration.
- Quadratic local convergence requires a twice continuously differentiable
  function, a simple root, and an initial estimate sufficiently near it.
- A stopping rule and numerical tolerance are external policy factors.
- Finite-precision arithmetic may change practical behavior.

## Recurrence and stopping

```text
x_(k+1) = x_k - f(x_k) / f'(x_k)
```

The recurrence does not itself choose when to stop. Common stopping policies
inspect residual, step size, iteration count, or a combination; these policies
require separate numerical-analysis review.

## Dimensional audit

If `x` has dimension `D_x` and `f(x)` has dimension `D_f`:

```text
[f'(x)]        = D_f D_x^-1
[f(x)/f'(x)]   = D_x
[x - f(x)/f']  = D_x
```

## Conceptual Factor Table

```text
newton-iteration-use
  := target function
   x derivative
   x initial estimate
   x update recurrence
   x stopping policy
   x numerical precision
   @ convergence neighborhood
   ! zero derivative and excluded domain
```

## Failure signs

- `f'(x_k)` is zero or too small for a stable update.
- The starting estimate lies outside a useful convergence basin.
- Iterates diverge, cycle, or leave the function domain.
- A multiple root is assumed to have the simple-root convergence rate.
- A small step is treated as proof of a small residual.
- Iteration limits and floating-point behavior are omitted from operational
  use.

## Cross-references

- [Policy](../roles/policy.md)
- [State](../roots/state.md)
- [Transformation](../roots/transformation.md)
- derivative — `unresolved-candidate`
- root — `unresolved-candidate`
- convergence — `unresolved-candidate`

## Sources and provenance

1. *Encyclopedia of Mathematics*, "Newton method":
   https://encyclopediaofmath.org/wiki/Newton_method

Formula authority: established numerical method. Factorium representation
remains a candidate pending numerical-analysis and practitioner review.

