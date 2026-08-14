# Formula Table Entry Format V0

Status: draft

## Purpose

A Formula Table is a Factorium entry view for a mathematical relation that
defines, models, constrains, estimates, or computes a concept. It preserves
operator semantics and domain conditions while adding Factorium navigation and
conceptual decomposition.

Formula Tables supplement rather than replace proofs, standards, textbooks,
and domain review.

## Required structure

### Headword and orientation

Use the concept or relation a practitioner is likely to seek. State what the
formula relates and distinguish it from nearby senses.

### Relation kind

Choose the narrowest applicable kind:

| Kind | Claim |
|---|---|
| Definition | Introduces a quantity or operation by stipulated relation |
| Identity | Equality follows from definitions or valid transformations |
| Law or principle | States a sourced domain relation with declared scope |
| Conservation or balance | Accounts for accumulation, transfer, source, and sink |
| Constitutive model | Relates material or system response under assumptions |
| Empirical relation | Fits observed behavior within a measured domain |
| Estimator or statistic | Computes an estimate or summary from observations |
| Algorithm or recurrence | Specifies a computational update or construction |
| Constraint | Declares valid values or combinations |

Do not call a law a definition merely because one variable can be isolated.

### Canonical expression

Render the sourced mathematical expression without substituting Factorium
marks for mathematical operators.

```text
sum(F_external) = m a
```

Factorium `:=`, `x`, `^`, `!`, `@`, and `=` remain graph/display aliases
outside the canonical mathematical expression.

### Symbol contract

| Field | Meaning |
|---|---|
| Symbol | Exact local notation |
| Concept | Canonical entry or visible unresolved candidate |
| Quantity kind | Scalar, vector, tensor, set, function, probability, and so on |
| Unit | Unit contract, when applicable |
| Dimension | Dimensional signature, when applicable |
| Domain | Allowed values or mathematical space |
| Role | Input, output, parameter, state, index, operator, or derived value |

### Scope and assumptions

Declare:

- applicable domain or theory;
- system and boundary;
- reference frame or coordinate convention;
- aggregation and sign conventions;
- regularity, independence, continuity, or approximation assumptions;
- excluded regimes and known failure conditions.

### Equivalent and alternative forms

Separate:

- algebraic rearrangements of the same relation;
- equivalent formulations under stated assumptions;
- approximations;
- competing or superseding models.

Denominator restrictions and other transformation conditions remain visible.

### Dimensional and unit audit

For quantity equations:

- show the dimensional signature of each side;
- identify dimensionless constants and arguments;
- distinguish quantity equality from equality of numerical values in a chosen
  unit system;
- retain unit conventions and conversions in examples.

Dimensional consistency is necessary but does not prove that a relation is
scientifically correct.

### Conceptual Factor Table

Show the concepts required to choose and interpret the formula separately from
the mathematical equation.

```text
formula-use
  := subject x boundary x quantities x relation kind
   @ context
   ! assumptions
```

This table may include factors absent from the equation, such as system
boundary, provenance, measurement method, or model regime.

### Provenance and maturity

Record separately:

- authority and status of the mathematical relation;
- source, edition/version, and stable location;
- Factorium editorial maturity;
- reviewer disciplines;
- unresolved notation or scope questions.

## Quality questions

1. Is the relation kind accurate?
2. Are mathematical and Factorium operators unmistakable?
3. Does every symbol have one local meaning?
4. Are vector/scalar and domain distinctions visible?
5. Are units and dimensions consistent?
6. Are boundary, aggregation, and frame assumptions explicit?
7. Are rearrangements distinguished from alternative models?
8. Are singularities and excluded regimes visible?
9. Is the relation sourced at the claimed authority level?
10. Can a reader tell what the formula does not establish?

