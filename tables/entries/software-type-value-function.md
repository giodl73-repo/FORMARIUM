# Software Type, Value, and Function

Status: candidate anchor entry

## Orientation

In software, a type governs how values are interpreted and which operations
are valid; a value is a particular result, datum, reference, or callable
entity under a language or runtime model; a function is a callable
abstraction with parameters, results, evaluation behavior, and possibly
effects. Languages realize these concepts differently. A class, struct,
schema, function item, closure, method, query, or callable object can
implement part of the model, but none is the universal definition.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `type` | Which set or category of values, interpretation rules, operations, and validity constraints apply here? | value classification and operation contract |
| `value` | Which particular datum, reference, result, or callable entity exists under the selected type and evaluation model? | typed computational content |
| `function` | Which callable transformation or computation accepts which inputs and produces which results or effects? | callable behavior |

## Root factorization

```text
software-program-construct-use
  := language, runtime, and version
   x selected type, value, or function sense
   x identity, name, and namespace
   x representation and interpretation
   x inputs, outputs, and parameter binding
   x operations, capabilities, and constraints
   x evaluation strategy and control behavior
   x effects, mutation, errors, and exceptions
   x ownership, lifetime, and concurrency
   x compatibility, provenance, and change policy
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Type vs. class | a class can introduce a type | language-level value interpretation and operations vs. one nominal declaration mechanism |
| Type vs. schema | both constrain structure | program/runtime semantics vs. data-description and validation contract |
| Value vs. variable | a variable can denote or store a value | computational content vs. binding or storage location |
| Value vs. representation | a value has some representation | language/runtime entity vs. encoded or in-memory form |
| Function vs. method | a method is callable | general callable abstraction vs. function associated with or dispatched through a receiver/type |
| Function vs. procedure | both execute behavior | result-oriented or general callable category vs. conventionally effect-oriented routine |
| Function vs. mathematical function | both relate inputs and outputs | executable construct may diverge, fail, mutate, or interact with context |
| Function vs. closure | a closure is callable | general callable behavior vs. value that captures an environment under language-specific rules |

## Diagnostic examples

- A Rust `struct` introduces a nominal type, but primitive, reference,
  function, tuple, and trait-object types are not classes.
- A function item can itself be a value with a function-item type.
- Two values with the same byte representation can have different types and
  interpretations.
- A pure function and an I/O function can share a parameter/result shape
  while differing materially in effects.
- A database function, query, closure, method, and remote operation are
  callable mechanisms with different transaction, failure, and context rules.
- A type alias may provide another name without creating a distinct nominal
  type in systems that define aliases that way.

## Specialized view

The linked
[Software Program Construct Mechanisms](../mappings/software-program-constructs.md)
maps these concepts into Rust, Haskell, and relational mechanisms without
claiming one-to-one correspondence.

## Selection procedure

1. Name the language, runtime, specification version, and execution boundary.
2. Decide whether the question concerns a type, one value, or callable
   behavior.
3. For a type, record membership, representation interpretation, available
   operations, construction rules, and invalid states.
4. For a value, record its type, identity/equality basis, mutability,
   ownership, lifetime, and representation.
5. For a function, record parameters, result, calling convention, evaluation
   behavior, effects, errors, and termination expectations.
6. Distinguish declarations from runtime values and storage locations.
7. Record generic parameters, dispatch, coercion, subtyping, and inference
   only where the selected language defines them.
8. Test one valid use, one invalid operation, and one compatibility change.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines type, value, function, method, and class | Places the three software senses under distinct governing questions |
| Language reference | Defines exact syntax and semantics for one language/version | Preserves language scope while exposing comparable roles and failure signs |
| API documentation | Lists callable signatures and data structures | Requires effects, errors, lifecycle, compatibility, and hidden context |
| Type or schema browser | Shows declarations and relationships | Separates declaration mechanisms from canonical concept identity |
| Factorium | Connects program constructs to roles and contextual mappings | Prevents one paradigm's class, trait, closure, or schema from defining the general concept |

## Constraints and failure signs

- Every claim is scoped to a named language, runtime, or interface contract.
- A type is not assumed to be a class, record, schema, or storage layout.
- A value is not confused with its variable, identifier, serialization, or
  memory address.
- Function purity, totality, determinism, termination, and thread safety are
  not assumed.
- Input/output types do not fully describe effects, errors, resource use, or
  ambient context.
- Generic constraints, subtyping, coercion, and dispatch remain
  language-specific.
- Compatibility includes behavioral obligations, not signature equality
  alone.
- Representation details receive no semantic credit unless the language or
  interface contract assigns it.

## Cross-references

- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)
- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- [Software Module, Service, and Resource](software-module-service-resource.md)
- [Software Transaction, Message, and Contract](software-transaction-message-contract.md)
- [Factor Role to Mechanism Crosswalk](../mappings/factor-role-mechanisms.md)

## Sources and provenance

1. The Rust Reference, "Types":
   https://doc.rust-lang.org/reference/types.html
2. The Rust Reference, "Functions":
   https://doc.rust-lang.org/reference/items/functions.html
3. Haskell 2010 Language Report, Chapters 3-5:
   https://www.haskell.org/onlinereport/haskell2010/haskellch3.html
   https://www.haskell.org/onlinereport/haskell2010/haskellch4.html
   https://www.haskell.org/onlinereport/haskell2010/haskellch5.html
4. PostgreSQL, "Data Types" and "User-Defined Functions":
   https://www.postgresql.org/docs/current/datatype.html
   https://www.postgresql.org/docs/current/xfunc.html

Comparator access date: 2026-08-14. Exact language semantics belong to the
cited language or database specifications; the cross-system Factorium
synthesis remains `candidate`.
