# Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence

Status: candidate anchor entry

## Orientation

A mathematical function assigns each admitted input exactly one output. A
variable is a symbol with a declared role and range, not the function or its
value. An equation asks which admitted assignments make an equality true; an
identity holds throughout its declared domain. A solution satisfies the stated
problem, while a root or zero is an input where a selected function equals
zero. A derivative is a local limit-defined object where it exists. Iteration
generates successive states; convergence is a separate claim that those states
approach a declared target under stated conditions.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `mathematical-function` | What domain-to-codomain assignment gives one output for each admitted input? | mathematical object |
| `variable` | What symbol ranges over which domain, and is it free, bound, input, output, parameter, or unknown? | symbolic role |
| `equation` | For which admitted assignments are the two expressions equal? | equality condition |
| `identity` | Does the equality hold for every admitted assignment in the declared domain? | universally valid equality within scope |
| `solution` | What assignment or object satisfies the stated equation, constraint, or problem? | satisfying result |
| `root` | At what admitted input does the selected function equal zero? | zero-producing input |
| `derivative` | What local limit-defined change object exists at the selected point or domain? | local operator result |
| `iteration` | What update map generates each next state from prior state and controls? | sequence-generating process |
| `convergence` | To what target, under what criterion and conditions, does a sequence or method approach? | limiting property or claim |

## Chain view

```text
domain + mathematical function + input assignment
  -- evaluation --> output value

expressions + variables + domain + equality
  -- quantify over assignments --> equation / identity
  -- solve --> solution set
  -- specialize as f(x)=0 --> roots or zeros

function + local point + limit conditions
  -- differentiate --> derivative where defined

update map + initial state
  -- iterate --> state sequence
  -- analyze against target/criterion --> converges / diverges / unresolved
```

## Root factorization

```text
mathematical-relation-solving-use
  := relation object and representation
   x symbols, variables, bound/free roles, and assignments
   x domain, codomain, restrictions, and exceptional points
   x equality kind and quantification
   x exact or approximate status and error measure
   x target equation, solution object, and multiplicity
   x operator, derivative order, point, and existence conditions
   x iteration map, initial state, and generated sequence
   x stopping rule, tolerance, precision, and resource limit
   x convergence target, criterion, rate, basin, and proof basis
   x provenance, notation convention, implementation, and verification
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Function object | domain x codomain x assignment x representation | assignment | defining or comparing functions | formula or graph mistaken for the whole function |
| Symbol role | symbol x domain x free/bound status x assignment | role | reading formulas and quantified statements | parameter, input, and unknown collapsed |
| Equality | left expression x right expression x domain x quantification | quantification | equations and identities | one successful substitution used as identity proof |
| Solving | problem x unknowns x constraints x solution set x multiplicity | target | exact solution and root finding | one root treated as the complete solution set |
| Differentiation | function x point/domain x variable x limit x order | existence | local sensitivity or tangent models | derivative assumed where undefined |
| Iterative method | update map x initial state x arithmetic x stop policy | recurrence | numerical approximation | termination treated as mathematical convergence |
| Convergence claim | sequence x target x metric/criterion x basin x rate | claim scope | proving or reporting limiting behavior | local result generalized globally |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Function vs. formula | a formula may represent a function | mathematical assignment vs. one representation, possibly partial |
| Function vs. software function | both map supplied material to results informally | mathematical object vs. executable behavior with effects, state, errors, and implementation contracts |
| Variable vs. value | values may be assigned to variables | symbol/role vs. one member of its admitted domain |
| Equation vs. identity | both display equality | true for selected satisfying assignments vs. all admitted assignments |
| Solution vs. root | both satisfy a condition | general satisfying object vs. input satisfying `f(x)=0` |
| Exact solution vs. approximation | both can answer a solving task | equality under the model vs. value with stated residual/error |
| Derivative vs. finite difference | both compare function values | limit-defined local object vs. nonzero-step quotient/approximation |
| Iteration vs. convergence | both concern a sequence of states | generation rule vs. limiting property |
| Stopping vs. convergence | both may end a computation | operational decision vs. mathematical or numerical claim |

## Diagnostic examples

- `f(x)=x^2` names a function only after its domain and codomain are fixed;
  the expression `x^2` alone does not carry the full contract.
- `x^2=1` has selected real solutions, while `(x+1)^2=x^2+2x+1`
  is an identity over every domain on which both sides are defined.
- A solver returning `1.4142` for `x^2-2=0` reports an approximation whose
  residual and error policy still need stating.
- Newton iterates can stop because the step is small even when the residual is
  unacceptable or the intended root was not reached.
- A derivative formula may exist on most of a domain while failing at a cusp,
  boundary, discontinuity, or excluded point.

## Selection procedure

1. Name the mathematical object, task, and representation separately.
2. Declare domains, codomains, units or quantity kinds, restrictions, and
   exceptional points before manipulating symbols.
3. Label each symbol as free, bound, input, output, parameter, index, or
   unknown and record permitted assignments.
4. For equality, state whether the claim is conditional, universal on a
   domain, approximate, or definitional.
5. For solving, state the complete target, solution domain, constraints,
   multiplicity, equivalence transformations, and verification test.
6. For roots, bind the root to a specific function and distinguish the input
   from the zero output and from polynomial-specific multiplicity.
7. For derivatives, state variable, point/domain, order, existence and
   regularity conditions, and whether the value is exact or approximated.
8. For iteration, record recurrence, initial state, arithmetic/precision,
   domain guards, stopping rule, tolerance, and resource limit.
9. For convergence, state target, criterion or metric, local/global scope,
   basin, rate, proof or empirical basis, and failure alternatives.
10. Substitute or otherwise verify candidate solutions and report residual,
    error bound, and unresolved completeness separately.

## Formula views

- [Newton's Method](../formulas/newtons-method.md) specializes function, root,
  derivative, iteration, and convergence contracts for scalar root finding.
- [Pythagorean Trigonometric Identity](../formulas/pythagorean-trigonometric-identity.md)
  specializes identity and equation while retaining angle and unit-circle debt.

## Constraints and failure signs

- Domains and excluded points are never inferred solely from notation.
- A representation is not treated as the complete mathematical object.
- One verified assignment does not establish an identity.
- Algebraic transformations preserve or explicitly qualify solution sets.
- Roots remain attached to a selected function and domain.
- Derivatives are not used where their defining conditions fail.
- An iterative recurrence does not imply convergence, correctness, or a rate.
- Stopping tolerance, residual, forward error, and proof of convergence remain
  separate fields.
- Local or conditional convergence is not promoted to a global guarantee.

## Specialized view

The [Mathematical Relation and Solver Failure Diagnostic](../diagnostics/mathematical-relation-solving-failures.md)
maps notation, domain, equality, solution-set, derivative, iteration, and
convergence symptoms to candidate causes and discriminating checks.

## Cross-references

- [Identity](../roots/identity.md)
- [Constraint](../roots/constraint.md)
- [Transformation](../roots/transformation.md)
- [State](../roots/state.md)
- [Software Type, Value, and Function](software-type-value-function.md)
- [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](measurement-quality.md)

## Sources and provenance

1. [Mathematical relation and solving research note](../../docs/research/2026-08-15-mathematical-relation-solving.md)
2. NIST DLMF, “Calculus of One Variable”: https://dlmf.nist.gov/1.4
3. NIST DLMF, “Nonlinear Equations”: https://dlmf.nist.gov/3.8
4. OpenStax, “Functions and Function Notation”:
   https://openstax.org/books/algebra-and-trigonometry-2e/pages/3-1-functions-and-function-notation
5. OpenStax, “Newton's Method”:
   https://openstax.org/books/calculus-volume-1/pages/4-9-newtons-method

Comparator access date: 2026-08-15. Native mathematical and numerical methods
retain authority; this cross-domain organization remains `candidate`.
